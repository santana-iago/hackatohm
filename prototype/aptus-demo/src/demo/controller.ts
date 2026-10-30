import { applyDemoCommand } from "./reducer";
import { createScene, SCENES } from "./scenes";
import { calculateConditionalPotential } from "./evaluate";
import { dossierStatus, getCurrentScore } from "./selectors";
import type { DemoState, DemoCommand, SceneId, DemoApi } from "./types";

export function createDemoController(initial: DemoState) {
  let state = initial,
    generation = 0,
    busy = false,
    activityCount = 0,
    commandSequence = 0;
  const isBusy = () => busy || activityCount > 0;
  const listeners = new Set<() => void>();
  const pending = new Map<ReturnType<typeof setTimeout>, () => void>();
  const notify = () => {
    listeners.forEach((fn) => fn());
  };
  const update = (fn: (s: DemoState) => DemoState) => {
    state = fn(state);
    notify();
  };
  const cancel = () => {
    generation++;
    pending.forEach((resolve, timer) => {
      clearTimeout(timer);
      resolve();
    });
    pending.clear();
    busy = false;
    activityCount = 0;
  };
  const delay = (ms: number) =>
    new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        pending.delete(timer);
        resolve();
      }, ms);
      pending.set(timer, resolve);
    });
  const stable = () =>
    new Promise<void>((resolve) => {
      if (typeof requestAnimationFrame === "undefined") {
        resolve();
        return;
      }
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
  const controller = {
    getState: () => state,
    getBusy: isBusy,
    getGeneration: () => generation,
    subscribe: (fn: () => void) => {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    update,
    async command(command: DemoCommand) {
      if (
        busy ||
        (activityCount > 0 && command.type !== "RECORD_DOSSIER_EXPORT")
      )
        return;
      const epoch = generation,
        actorId = state.demo.actorId;
      busy = true;
      notify();
      await delay(
        state.demo.motion === "reduced"
          ? 0
          : command.type === "EVALUATE_TEAMS" ||
              command.type === "PREPARE_DOSSIER"
            ? 650
            : 180,
      );
      if (epoch !== generation) return;
      state = applyDemoCommand(state, {
        commandId: `ui-${generation}-${++commandSequence}`,
        actorId,
        command,
      });
      await stable();
      if (epoch !== generation) return;
      busy = false;
      notify();
    },
    async runActivity<T>(work: () => Promise<T>) {
      const epoch = generation;
      activityCount++;
      notify();
      try {
        return await work();
      } finally {
        if (epoch === generation) {
          activityCount--;
          notify();
        }
      }
    },
    async loadScene(sceneId: SceneId) {
      if (!SCENES.some((s) => s.id === sceneId))
        throw new Error(`Cena desconhecida: ${sceneId}`);
      cancel();
      const { capture, motion } = state.demo;
      state = createScene(sceneId);
      state.demo.capture = capture;
      state.demo.motion = motion;
      if (typeof window !== "undefined")
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}#${state.demo.route}`,
        );
      notify();
      await stable();
    },
    async waitUntilIdle() {
      const start = performance.now();
      while (isBusy()) {
        if (performance.now() - start > 10000)
          throw new Error("A cena não estabilizou em 10 segundos.");
        await new Promise((r) => setTimeout(r, 20));
      }
      await stable();
    },
    dispose() {
      cancel();
      listeners.clear();
    },
  };
  const api: DemoApi = {
    loadScene: controller.loadScene,
    reset: async () => {
      try {
        if (typeof localStorage !== "undefined")
          localStorage.removeItem("aptus-demo-v1");
      } catch {
        /* Armazenamento opcional. */
      }
      await controller.loadScene("overview");
    },
    setCaptureMode: (capture) =>
      update((s) => ({ ...s, demo: { ...s.demo, capture } })),
    setMotion: (motion) =>
      update((s) => ({ ...s, demo: { ...s.demo, motion } })),
    waitUntilIdle: controller.waitUntilIdle,
    getSceneState: () => {
      const potential = calculateConditionalPotential(state);
      return {
        sceneId: state.demo.sceneId,
        busy: isBusy(),
        evaluationStatus: state.evaluation.status,
        currentScore: getCurrentScore(state),
        lastScore:
          state.evaluation.selected?.score ?? state.evaluation.lastScore,
        potentialScore: potential.potentialScore,
        ruleVersion: state.tender.ruleVersion,
        dossierStatus: dossierStatus(state),
      };
    },
  };
  return { ...controller, api };
}
