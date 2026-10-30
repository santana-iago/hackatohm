import { it, expect } from "vitest";
import { createDemoController } from "../src/demo/controller";
import { createScene } from "../src/demo/scenes";
it("scene_reset_cancels_pending_work", async () => {
  const controller = createDemoController(createScene("criteria-review"));
  const old = controller.command({
    type: "REVIEW_RULE",
    ruleId: "G-PMP",
    decision: true,
  });
  expect(controller.getBusy()).toBe(true);
  await controller.api.reset();
  await old;
  await controller.api.waitUntilIdle();
  expect(controller.getState().demo.sceneId).toBe("overview");
  expect(controller.getState().rules.every((r) => !r.reviewed)).toBe(true);
  expect(controller.getState().audit).toHaveLength(0);
  expect(controller.getBusy()).toBe(false);
  controller.dispose();
});
it("capture API reflects export dependencies and stable score", () => {
  const controller = createDemoController(createScene("export-blocked"));
  expect(controller.api.getSceneState().dossierStatus).toBe("review_required");
  expect(controller.api.getSceneState().currentScore).toBe(35);
  controller.dispose();
});
