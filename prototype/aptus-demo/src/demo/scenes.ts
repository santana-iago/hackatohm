import { createInitialState } from "./seed";
import { applyDemoCommand } from "./reducer";
import { getInitialEvidenceIds } from "./selectors";
import type { DemoCommand, DemoState, SceneId } from "./types";
export { getInitialEvidenceIds } from "./selectors";

export const SCENES: { id: SceneId; label: string; note: string }[] = [
  {
    id: "overview",
    label: "01 · Visão geral",
    note: "Estado inicial: critérios em revisão e nenhuma nota publicada.",
  },
  {
    id: "base-viva",
    label: "02 · Base Viva",
    note: "Carla confirma a atualização; RH revisa o currículo v2, sem acrescentar provas ou pontos.",
  },
  {
    id: "criteria-review",
    label: "03 · Revisão dos critérios",
    note: "Matriz proposta e documentos centrais verificados; ainda sem aceites para esta matriz.",
  },
  {
    id: "team-comparison",
    label: "04 · Comparação 30 / 31",
    note: "Matriz e correspondências aceitas. Amostra com alternativas válidas 31, 30 e 29.",
  },
  {
    id: "availability",
    label: "05 · Agenda e PMO",
    note: "31 pontos atuais; composição ainda precisa de aprovação do PMO.",
  },
  {
    id: "recovery-start",
    label: "06 · Recovery · 31 pontos",
    note: "Dois projetos conhecidos, sem atestados aceitos. Até 35 condicionados a provas.",
  },
  {
    id: "recovery-received",
    label: "07 · Aurora recebido",
    note: "Carla apresentou o documento. Sem verificação do RH; permanecem 31 pontos.",
  },
  {
    id: "recovery-verified",
    label: "08 · Aurora verificado",
    note: "RH conferiu o atestado. Uso neste edital ainda em análise; permanecem 31 pontos.",
  },
  {
    id: "recovery-one",
    label: "09 · Recovery · 33 pontos",
    note: "Aurora aceito e equipe recalculada. Vale do Sol ainda pendente.",
  },
  {
    id: "recovery-complete",
    label: "10 · Recovery · 35 pontos",
    note: "Duas provas distintas aceitas e recalculadas. Conferir composição atual pelo PMO.",
  },
  {
    id: "dossier-review",
    label: "11 · Dossiê em revisão",
    note: "35 atuais, PMO confirmado, prévia preparada e revisão final pendente.",
  },
  {
    id: "dossier-approved",
    label: "12 · Dossiê aprovado",
    note: "Snapshot em 35 preservado. O PDF só é baixado após uma ação explícita.",
  },
  {
    id: "discovery",
    label: "13 · Descoberta · Lia",
    note: "Dossiê fechado; campanha aberta e indício de reembolso ainda não confirmado.",
  },
  {
    id: "connect",
    label: "14 · Connect · Marina",
    note: "Lia verificada; Marina ainda precisa aceitar a indicação de Eva.",
  },
  {
    id: "recognition",
    label: "15 · Reconhecimento",
    note: "Lia +10, Marina +10 e Eva +3; resultado técnico fechado continua em 35.",
  },
  {
    id: "second-rejected",
    label: "Exceção · Segundo atestado rejeitado",
    note: "Aurora preservado e 33 pontos atuais. Vale do Sol rejeitado pelo RH, com motivo.",
  },
  {
    id: "duplicate-proof",
    label: "Exceção · Arquivo duplicado",
    note: "Outro arquivo do projeto Aurora não cria nova experiência; permanecem 33 pontos.",
  },
  {
    id: "expired-credential",
    label: "Exceção · Certificado vencido",
    note: "PMP de Pedro: documento verificado, vigência encerrada em 30/09/2026.",
  },
  {
    id: "availability-unknown",
    label: "Exceção · Agenda de Diego desconhecida",
    note: "Diego não é tratado como livre. Carla e Eva formam a alternativa confirmada de 29.",
  },
  {
    id: "tender-amended",
    label: "Exceção · Retificação v2",
    note: "O resultado v1 fica histórico; a retificação requer revisão. Sem nova nota inventada.",
  },
  {
    id: "export-blocked",
    label: "Exceção · Exportação não permitida",
    note: "Consulta interna permanece disponível; prova usada sem permissão bloqueia exportação.",
  },
  {
    id: "connect-external",
    label: "Extra · Convite externo",
    note: "Lucas ainda não existe no diretório antes do aceite. Esta cena é isolada do percurso principal.",
  },
];
function actorCommand(
  state: DemoState,
  actorId: string,
  command: DemoCommand,
): DemoState {
  const next = applyDemoCommand(state, {
    commandId: `scene-command-${state.appliedCommandIds.length + 1}`,
    actorId,
    command,
  });
  if (next.error)
    throw new Error(`Checkpoint inválido: ${command.type}: ${next.message}`);
  return next;
}
function initialReview(state: DemoState): DemoState {
  state = actorCommand(state, "p-carla", {
    type: "CONFIRM_PROFILE_UPDATE",
    personId: "p-carla",
  });
  return actorCommand(state, "beatriz", {
    type: "VERIFY_PROFILE_UPDATE",
    personId: "p-carla",
  });
}
function initialComparison(state: DemoState): DemoState {
  for (const rule of state.rules)
    state = actorCommand(state, "juliana", {
      type: "REVIEW_RULE",
      ruleId: rule.id,
      decision: true,
    });
  state = actorCommand(state, "juliana", {
    type: "APPROVE_RULES",
    ruleVersion: state.tender.ruleVersion,
  });
  state = actorCommand(state, "juliana", {
    type: "ACCEPT_INITIAL_EVIDENCE",
    ruleVersion: state.tender.ruleVersion,
    evidenceIds: getInitialEvidenceIds(state),
  });
  return actorCommand(state, "juliana", { type: "EVALUATE_TEAMS" });
}
function receive(state: DemoState, evidenceId: string): DemoState {
  const task = Object.values(state.recoveryTasks).find(
    (t) => t.evidenceId === evidenceId,
  )!;
  state = actorCommand(state, "juliana", {
    type: "REQUEST_PROOF",
    taskId: task.id,
  });
  return actorCommand(state, "p-carla", {
    type: "RECEIVE_EVIDENCE",
    evidenceId,
    documentFixtureId: evidenceId,
  });
}
function verify(state: DemoState, evidenceId: string): DemoState {
  return actorCommand(state, "beatriz", {
    type: "VERIFY_EVIDENCE",
    evidenceId,
    result: true,
    reason:
      "Titular, projeto, atuação gerencial e documento de exemplo conferidos.",
  });
}
function acceptAndCalculate(state: DemoState, evidenceId: string): DemoState {
  state = actorCommand(state, "juliana", {
    type: "ACCEPT_EVIDENCE_FOR_RULE",
    evidenceId,
    ruleId: "G-ENERGIA",
    ruleVersion: state.tender.ruleVersion,
  });
  return actorCommand(state, "juliana", { type: "EVALUATE_TEAMS" });
}
function liaComplete(state: DemoState): DemoState {
  state = actorCommand(state, "p-lia", {
    type: "RESPOND_TO_CAMPAIGN",
    campaignId: "campaign-security",
    personId: "p-lia",
  });
  state = actorCommand(state, "p-lia", {
    type: "RECEIVE_EVIDENCE",
    evidenceId: "ev-lia-sec",
    documentFixtureId: "ev-lia-sec",
  });
  return verify(state, "ev-lia-sec");
}
export function createScene(sceneId: SceneId): DemoState {
  const valid = SCENES.some((s) => s.id === sceneId);
  if (!valid) sceneId = "overview";
  let state = createInitialState();
  const baseOnly = ["overview", "base-viva", "expired-credential"].includes(
    sceneId,
  );
  if (!baseOnly) state = initialReview(state);
  const criteriaOnly = baseOnly || sceneId === "criteria-review";
  if (!criteriaOnly) state = initialComparison(state);
  const beforeRecovery =
    criteriaOnly ||
    ["team-comparison", "availability", "availability-unknown"].includes(
      sceneId,
    );
  if (!beforeRecovery)
    state = actorCommand(state, "andre", { type: "CONFIRM_TEAM_PMO" });
  const receivedStages = [
    "recovery-received",
    "recovery-verified",
    "recovery-one",
    "recovery-complete",
    "dossier-review",
    "dossier-approved",
    "discovery",
    "connect",
    "recognition",
    "second-rejected",
    "duplicate-proof",
    "tender-amended",
    "export-blocked",
    "connect-external",
  ];
  if (receivedStages.includes(sceneId))
    state = receive(state, "ev-carla-aurora");
  if (receivedStages.includes(sceneId) && sceneId !== "recovery-received")
    state = verify(state, "ev-carla-aurora");
  const firstComplete =
    receivedStages.includes(sceneId) &&
    !["recovery-received", "recovery-verified"].includes(sceneId);
  if (firstComplete) state = acceptAndCalculate(state, "ev-carla-aurora");
  const bothComplete = [
    "recovery-complete",
    "dossier-review",
    "dossier-approved",
    "discovery",
    "connect",
    "recognition",
    "tender-amended",
    "export-blocked",
    "connect-external",
  ].includes(sceneId);
  if (bothComplete) {
    state = receive(state, "ev-carla-vale");
    state = verify(state, "ev-carla-vale");
    state = acceptAndCalculate(state, "ev-carla-vale");
  }
  const prepared = [
    "dossier-review",
    "dossier-approved",
    "discovery",
    "connect",
    "recognition",
    "tender-amended",
    "export-blocked",
    "connect-external",
  ].includes(sceneId);
  if (prepared) {
    state = actorCommand(state, "andre", { type: "CONFIRM_TEAM_PMO" });
    state = actorCommand(state, "juliana", { type: "PREPARE_DOSSIER" });
  }
  const approved = prepared && sceneId !== "dossier-review";
  if (approved) {
    state = actorCommand(state, "juliana", { type: "REVIEW_DOSSIER" });
    state = actorCommand(state, "juliana", {
      type: "APPROVE_DOSSIER",
      version: state.dossier.preview!.version,
    });
  }
  if (["connect", "recognition"].includes(sceneId)) state = liaComplete(state);
  if (sceneId === "recognition") {
    state = actorCommand(state, "p-marina", {
      type: "ACCEPT_REFERRAL",
      referralId: "referral-marina",
      personId: "p-marina",
    });
    state = actorCommand(state, "p-marina", {
      type: "RECEIVE_EVIDENCE",
      evidenceId: "ev-marina-cloud",
      documentFixtureId: "ev-marina-cloud",
    });
    state = verify(state, "ev-marina-cloud");
    state = actorCommand(state, "beatriz", {
      type: "VALIDATE_REFERRAL",
      referralId: "referral-marina",
    });
  }
  if (sceneId === "second-rejected") {
    state = receive(state, "ev-carla-vale");
    state = actorCommand(state, "beatriz", {
      type: "VERIFY_EVIDENCE",
      evidenceId: "ev-carla-vale",
      result: false,
      reason:
        "O exemplo alternativo não identifica a função gerencial de Carla com clareza. Solicitar atestado corrigido.",
    });
  }
  if (sceneId === "duplicate-proof")
    state = actorCommand(state, "p-carla", {
      type: "RECEIVE_EVIDENCE",
      evidenceId: "ev-carla-aurora",
      documentFixtureId: "ev-carla-aurora",
    });
  if (sceneId === "availability-unknown") {
    state = actorCommand(state, "andre", {
      type: "SET_AVAILABILITY",
      personId: "p-diego",
      capacity: null,
      confirmed: false,
    });
    state = actorCommand(state, "juliana", { type: "EVALUATE_TEAMS" });
  }
  if (sceneId === "tender-amended")
    state = actorCommand(state, "juliana", { type: "AMEND_TENDER" });
  if (sceneId === "export-blocked")
    state = actorCommand(state, "juliana", {
      type: "SET_EXPORT_PERMISSION",
      evidenceId: "ev-carla-aurora",
      allowed: false,
    });
  const route = "/oportunidades/ENE-001";
  const locations: Record<
    SceneId,
    {
      route: string;
      actorId: string;
      inspector?: DemoState["demo"]["inspector"];
    }
  > = {
    overview: { route: "/inicio", actorId: "juliana" },
    "base-viva": {
      route: "/pessoas",
      actorId: "p-carla",
      inspector: { type: "person", id: "p-carla" },
    },
    "criteria-review": { route: `${route}/criterios`, actorId: "juliana" },
    "team-comparison": { route: `${route}/equipe`, actorId: "juliana" },
    availability: { route: `${route}/equipe`, actorId: "andre" },
    "recovery-start": { route: `${route}/recovery`, actorId: "juliana" },
    "recovery-received": {
      route: `${route}/recovery`,
      actorId: "beatriz",
      inspector: { type: "evidence", id: "ev-carla-aurora" },
    },
    "recovery-verified": {
      route: `${route}/recovery`,
      actorId: "juliana",
      inspector: { type: "evidence", id: "ev-carla-aurora" },
    },
    "recovery-one": { route: `${route}/recovery`, actorId: "juliana" },
    "recovery-complete": { route: `${route}/recovery`, actorId: "andre" },
    "dossier-review": { route: `${route}/dossie`, actorId: "juliana" },
    "dossier-approved": { route: `${route}/dossie`, actorId: "juliana" },
    discovery: { route: "/descoberta", actorId: "p-lia" },
    connect: { route: "/connect", actorId: "p-marina" },
    recognition: { route: "/participacao", actorId: "p-eva" },
    "second-rejected": {
      route: `${route}/recovery`,
      actorId: "juliana",
      inspector: { type: "evidence", id: "ev-carla-vale" },
    },
    "duplicate-proof": {
      route: `${route}/recovery`,
      actorId: "p-carla",
      inspector: { type: "evidence", id: "ev-carla-aurora" },
    },
    "expired-credential": {
      route: "/pessoas",
      actorId: "beatriz",
      inspector: { type: "evidence", id: "ev-pedro-pmp" },
    },
    "availability-unknown": { route: `${route}/equipe`, actorId: "andre" },
    "tender-amended": { route: `${route}/dossie`, actorId: "juliana" },
    "export-blocked": { route: `${route}/dossie`, actorId: "juliana" },
    "connect-external": { route: "/connect/externo", actorId: "p-lucas" },
  };
  const location = locations[sceneId];
  state.demo = {
    ...state.demo,
    sceneId,
    route: location.route,
    actorId: location.actorId,
    inspector: location.inspector ?? null,
  };
  return state;
}
