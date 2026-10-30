import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createDemoController } from "./controller";
import { createScene, SCENES } from "./scenes";
import type { DemoState, SceneId } from "./types";
function initialState() {
  const query = new URLSearchParams(window.location.search);
  const id = query.get("scene");
  const valid = SCENES.some((s) => s.id === id);
  const s = createScene(valid ? (id as SceneId) : "overview");
  s.demo.capture = query.get("capture") === "1";
  s.demo.motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "reduced"
    : "normal";
  if (!id && window.location.hash) s.demo.route = window.location.hash.slice(1);
  if (id && !valid)
    s.message = "Cena desconhecida. Cenário inicial restaurado.";
  return s;
}
type Controller = ReturnType<typeof createDemoController>;
const Context = createContext<Controller | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [controller] = useState(() => createDemoController(initialState()));
  const state = useSyncExternalStore(controller.subscribe, controller.getState);
  const busy = useSyncExternalStore(controller.subscribe, controller.getBusy);
  useEffect(() => {
    window.aptusDemo = controller.api;
    const onHash = () =>
      controller.update((s) => ({
        ...s,
        demo: {
          ...s.demo,
          route: window.location.hash.slice(1) || "/inicio",
          inspector: null,
        },
      }));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [controller]);
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.demoBusy = String(busy);
    html.dataset.capture = String(state.demo.capture);
    html.dataset.motion = state.demo.motion;
    html.dataset.demoReady = "true";
  }, [busy, state.demo.capture, state.demo.motion]);
  return <Context.Provider value={controller}>{children}</Context.Provider>;
}
export function useDemo() {
  const controller = useContext(Context);
  if (!controller) throw new Error("DemoProvider ausente");
  const state = useSyncExternalStore(controller.subscribe, controller.getState);
  const busy = useSyncExternalStore(controller.subscribe, controller.getBusy);
  return {
    state,
    busy,
    command: controller.command,
    runActivity: controller.runActivity,
    loadScene: controller.loadScene,
    api: controller.api,
    generation: controller.getGeneration,
    navigate: (route: string) => {
      controller.update((s) => ({
        ...s,
        demo: { ...s.demo, route, inspector: null },
      }));
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#${route}`,
      );
      document.querySelector("main")?.scrollTo(0, 0);
    },
    inspect: (type: "evidence" | "person" | "availability", id: string) =>
      controller.update((s) => ({
        ...s,
        demo: { ...s.demo, inspector: { type, id } },
      })),
    closeInspector: () =>
      controller.update((s) => ({
        ...s,
        demo: { ...s.demo, inspector: null },
      })),
    setActor: (actorId: string) =>
      controller.update((s) =>
        s.actors[actorId] ? { ...s, demo: { ...s.demo, actorId } } : s,
      ),
    updateUI: (fn: (s: DemoState) => DemoState) => controller.update(fn),
  };
}
