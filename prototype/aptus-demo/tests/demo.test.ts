import { describe, expect, it } from "vitest";
import { createInitialState } from "../src/demo/seed";
import { createScene, SCENES } from "../src/demo/scenes";
import { applyDemoCommand } from "../src/demo/reducer";
import { calculateConditionalPotential } from "../src/demo/evaluate";
import {
  canExportDossier,
  getCurrentScore,
  getDossierChecklist,
  getInitialEvidenceIds,
  recognitionTotal,
} from "../src/demo/selectors";
import type { DemoCommand, DemoState } from "../src/demo/types";
let sequence = 0;
const run = (
  state: DemoState,
  actorId: string,
  command: DemoCommand,
  commandId = `test-${++sequence}`,
) => applyDemoCommand(state, { commandId, actorId, command });
function recover(state: DemoState, id: string) {
  const taskId = id.endsWith("aurora") ? "CAR-G02" : "CAR-G03";
  state = run(state, "juliana", { type: "REQUEST_PROOF", taskId });
  state = run(state, "p-carla", {
    type: "RECEIVE_EVIDENCE",
    evidenceId: id,
    documentFixtureId: id,
  });
  state = run(state, "beatriz", {
    type: "VERIFY_EVIDENCE",
    evidenceId: id,
    result: true,
    reason: "Titular, projeto e participação conferidos.",
  });
  return run(state, "juliana", {
    type: "ACCEPT_EVIDENCE_FOR_RULE",
    evidenceId: id,
    ruleId: "G-ENERGIA",
    ruleVersion: state.tender.ruleVersion,
  });
}
describe("domínio da demonstração Aptus", () => {
  it("initial_team_is_31", () => {
    const state = createScene("team-comparison");
    expect(getCurrentScore(state)).toBe(31);
    expect(state.evaluation.teams.map((t) => t.score)).toEqual([31, 30, 29]);
    expect(
      state.evaluation.teams.every((t) => t.managerId !== t.specialistId),
    ).toBe(true);
    expect(
      state.evaluation.blocked.some(
        (t) =>
          t.managerId === "p-bruno" &&
          t.blockers.some((x) => x.includes("Indisponível")),
      ),
    ).toBe(true);
    expect(
      state.evaluation.teams.some(
        (t) => t.managerId === "p-diego" && t.score === 30,
      ),
    ).toBe(true);
    const initial = createInitialState();
    expect(initial.acceptances).toHaveLength(0);
    expect(getCurrentScore(initial)).toBeNull();
    expect(getInitialEvidenceIds(state)).not.toContain("ev-carla-aurora");
  });
  it("receive_and_verify_do_not_score", () => {
    let state = createScene("recovery-start");
    state = run(state, "juliana", { type: "REQUEST_PROOF", taskId: "CAR-G02" });
    state = run(state, "p-carla", {
      type: "RECEIVE_EVIDENCE",
      evidenceId: "ev-carla-aurora",
      documentFixtureId: "ev-carla-aurora",
    });
    expect(getCurrentScore(state)).toBe(31);
    state = run(state, "beatriz", {
      type: "VERIFY_EVIDENCE",
      evidenceId: "ev-carla-aurora",
      result: true,
      reason: "Conferido",
    });
    expect(getCurrentScore(state)).toBe(31);
    expect(
      state.acceptances.some(
        (a) => a.evidenceId === "ev-carla-aurora" && a.decision === "accepted",
      ),
    ).toBe(false);
  });
  it("accept_requires_recalculation", () => {
    let state = recover(createScene("recovery-start"), "ev-carla-aurora");
    expect(state.evaluation.status).toBe("stale");
    expect(getCurrentScore(state)).toBeNull();
    expect(state.evaluation.lastScore).toBe(31);
    expect(calculateConditionalPotential(state).potentialScore).toBeNull();
    state = run(state, "juliana", { type: "EVALUATE_TEAMS" });
    expect(getCurrentScore(state)).toBe(33);
    expect(calculateConditionalPotential(state).remainingGain).toBe(2);
    state = recover(state, "ev-carla-vale");
    state = run(state, "juliana", { type: "EVALUATE_TEAMS" });
    expect(getCurrentScore(state)).toBe(35);
  });
  it("reject_or_duplicate_does_not_add_points", () => {
    let state = createScene("recovery-one");
    const count = state.audit.length;
    state = run(
      state,
      "p-carla",
      {
        type: "RECEIVE_EVIDENCE",
        evidenceId: "ev-carla-aurora",
        documentFixtureId: "ev-carla-aurora",
      },
      "dup",
    );
    expect(getCurrentScore(state)).toBe(33);
    expect(state.audit).toHaveLength(count);
    const repeated = run(
      state,
      "p-carla",
      {
        type: "RECEIVE_EVIDENCE",
        evidenceId: "ev-carla-aurora",
        documentFixtureId: "ev-carla-aurora",
      },
      "dup",
    );
    expect(repeated).toEqual(state);
    state = createScene("second-rejected");
    expect(getCurrentScore(state)).toBe(33);
    expect(state.evidence["ev-carla-vale"].document).toBe("rejected");
    expect(
      state.acceptances.find((a) => a.evidenceId === "ev-carla-aurora")
        ?.decision,
    ).toBe("accepted");
    expect(calculateConditionalPotential(state).remainingGain).toBe(0);
  });
  it("rejected_used_document_requires_new_licitacoes_acceptance_after_resubmission", () => {
    let state = createScene("dossier-approved");
    const originalSnapshot = JSON.stringify(state.dossier.approved);
    state = run(state, "beatriz", {
      type: "VERIFY_EVIDENCE",
      evidenceId: "ev-carla-aurora",
      result: false,
      reason: "Atestado retificado pelo emissor fictício.",
    });
    state = run(state, "juliana", { type: "EVALUATE_TEAMS" });
    expect(getCurrentScore(state)).toBe(33);
    state = run(state, "juliana", { type: "REQUEST_PROOF", taskId: "CAR-G02" });
    state = run(state, "p-carla", {
      type: "RECEIVE_EVIDENCE",
      evidenceId: "ev-carla-aurora",
      documentFixtureId: "ev-carla-aurora",
    });
    state = run(state, "beatriz", {
      type: "VERIFY_EVIDENCE",
      evidenceId: "ev-carla-aurora",
      result: true,
      reason: "Nova versão conferida pelo RH.",
    });
    expect(getCurrentScore(state)).toBe(33);
    expect(
      state.acceptances.some(
        (a) => a.evidenceId === "ev-carla-aurora" && a.decision === "accepted",
      ),
    ).toBe(false);
    expect(state.recoveryTasks["CAR-G02"].status).toBe("verified");
    state = run(state, "juliana", { type: "EVALUATE_TEAMS" });
    expect(getCurrentScore(state)).toBe(33);
    expect(JSON.stringify(state.dossier.approved)).toBe(originalSnapshot);
    expect(canExportDossier(state)).toBe(false);
    state = run(state, "juliana", {
      type: "ACCEPT_EVIDENCE_FOR_RULE",
      evidenceId: "ev-carla-aurora",
      ruleId: "G-ENERGIA",
      ruleVersion: state.tender.ruleVersion,
    });
    expect(state.evaluation.status).toBe("stale");
    state = run(state, "juliana", { type: "EVALUATE_TEAMS" });
    expect(getCurrentScore(state)).toBe(35);
  });
  it("selecting_another_team_requires_a_new_matching_preview_and_review", () => {
    let state = createScene("dossier-approved");
    const oldId = state.dossier.approved!.id;
    state = run(state, "juliana", {
      type: "SELECT_TEAM",
      managerId: "p-diego",
      specialistId: "p-eva",
    });
    expect(getCurrentScore(state)).toBe(30);
    expect(canExportDossier(state)).toBe(false);
    expect(
      getDossierChecklist(state).find((c) => c.id === "team")?.status,
    ).toBe(false);
    state = run(state, "juliana", { type: "REVIEW_DOSSIER" });
    expect(state.error).toBe(true);
    state = run(state, "juliana", { type: "PREPARE_DOSSIER" });
    expect(state.dossier.preview!.id).not.toBe(oldId);
    expect(state.dossier.preview!.team.manager).toBe("Diego Santos");
    expect(state.dossier.preview!.score).toBe(30);
    expect(
      getDossierChecklist(state).find((c) => c.id === "team")?.status,
    ).toBe(true);
    expect(
      getDossierChecklist(state).find((c) => c.id === "review")?.status,
    ).toBe(false);
  });
  it("availability_changes_team", () => {
    const state = createScene("availability-unknown");
    expect(getCurrentScore(state)).toBe(29);
    expect(state.evaluation.selected?.specialistId).toBe("p-eva");
    expect(
      state.evaluation.teams.some(
        (t) => t.managerId === "p-diego" || t.specialistId === "p-diego",
      ),
    ).toBe(false);
  });
  it("dossier_export_is_version_bound", () => {
    let state = createScene("dossier-approved");
    expect(
      getDossierChecklist(state)
        .filter((c) => c.required)
        .every((c) => c.status),
    ).toBe(true);
    expect(canExportDossier(state)).toBe(true);
    const snapshot = JSON.stringify(state.dossier.approved);
    state = run(state, "juliana", {
      type: "SET_EXPORT_PERMISSION",
      evidenceId: "ev-carla-aurora",
      allowed: false,
    });
    expect(canExportDossier(state)).toBe(false);
    expect(JSON.stringify(state.dossier.approved)).toBe(snapshot);
    expect(canExportDossier(createScene("dossier-review"))).toBe(false);
    expect(canExportDossier(createScene("tender-amended"))).toBe(false);
    state = run(state, "juliana", {
      type: "SET_EXPORT_PERMISSION",
      evidenceId: "ev-carla-aurora",
      allowed: true,
    });
    state = run(state, "juliana", { type: "REVIEW_DOSSIER" });
    expect(state.error).toBe(true);
    state = run(state, "juliana", { type: "PREPARE_DOSSIER" });
    expect(state.dossier.preview?.version).toBe(2);
    state = run(state, "juliana", { type: "REVIEW_DOSSIER" });
    state = run(state, "juliana", { type: "APPROVE_DOSSIER", version: 2 });
    expect(canExportDossier(state)).toBe(true);
    expect(state.dossier.history).toHaveLength(2);
    let s33 = createScene("second-rejected");
    s33 = run(s33, "andre", { type: "CONFIRM_TEAM_PMO" });
    s33 = run(s33, "juliana", { type: "PREPARE_DOSSIER" });
    s33 = run(s33, "juliana", { type: "REVIEW_DOSSIER" });
    s33 = run(s33, "juliana", {
      type: "APPROVE_DOSSIER",
      version: s33.dossier.preview!.version,
    });
    expect(s33.dossier.approved?.score).toBe(33);
    expect(canExportDossier(s33)).toBe(true);
  });
  it("recognition_does_not_change_technical_score", () => {
    let state = createScene("recognition");
    expect(recognitionTotal(state, "p-lia")).toBe(10);
    expect(recognitionTotal(state, "p-marina")).toBe(10);
    expect(recognitionTotal(state, "p-eva")).toBe(3);
    expect(recognitionTotal(state, "p-carla")).toBe(0);
    expect(state.dossier.approved?.score).toBe(35);
    const count = state.engagement.length;
    state = run(state, "beatriz", {
      type: "VALIDATE_REFERRAL",
      referralId: "referral-marina",
    });
    expect(state.engagement).toHaveLength(count);
    expect(canExportDossier(state)).toBe(true);
  });
  it("scenes_reset_has_no_residual_state_and_preconditions_hold", () => {
    for (const scene of SCENES)
      expect(createScene(scene.id).demo.sceneId).toBe(scene.id);
    const state = createScene("overview");
    expect(state.engagement).toHaveLength(0);
    expect(state.acceptances).toHaveLength(0);
    expect(state.demo.clockMinutes).toBe(0);
    expect(state.dossier.approved).toBeNull();
    const denied = run(state, "p-carla", {
      type: "APPROVE_RULES",
      ruleVersion: state.tender.ruleVersion,
    });
    expect(denied.error).toBe(true);
    expect(denied.tender.rulesApproved).toBe(false);
  });
});
