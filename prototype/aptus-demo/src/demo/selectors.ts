import { isEvidenceAccepted } from "./evaluate";
import { CENTRAL_PEOPLE, WINDOW_LABEL } from "./seed";
import type { ChecklistItem, DemoState, DossierSnapshot } from "./types";

export function demoTime(state: DemoState): string {
  const total = 10 * 60 + state.demo.clockMinutes;
  return `27/10/2026, ${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}
export function getInitialEvidenceIds(state: DemoState): string[] {
  return Object.values(state.evidence)
    .filter(
      (e) =>
        CENTRAL_PEOPLE.includes(e.personId) &&
        e.document === "verified" &&
        !["ev-carla-aurora", "ev-carla-vale"].includes(e.id),
    )
    .map((e) => e.id)
    .sort();
}
export function getCurrentScore(state: DemoState): number | null {
  return state.evaluation.status === "current" &&
    state.evaluation.inputRevision === state.inputRevision
    ? (state.evaluation.selected?.score ?? null)
    : null;
}
export function teamKey(state: DemoState): string {
  return `${state.selectedTeam.managerId}|manager32|${state.selectedTeam.specialistId}|specialist20|2026-11-02|2027-01-29|${state.availabilityRevision}`;
}
export function recognitionTotal(state: DemoState, personId: string): number {
  return state.engagement
    .filter((e) => e.personId === personId)
    .reduce((n, e) => n + e.points, 0);
}
export function snapshotDependenciesCurrent(
  state: DemoState,
  snapshot: DossierSnapshot | null,
): boolean {
  return Boolean(
    snapshot &&
      snapshot.inputRevision === state.inputRevision &&
      snapshot.ruleVersion === state.tender.ruleVersion &&
      snapshot.universeVersion === state.tender.universeVersion &&
      !state.tender.amended &&
      snapshot.managerId === state.selectedTeam.managerId &&
      snapshot.specialistId === state.selectedTeam.specialistId &&
      snapshot.evidence.every(
        (e) =>
          state.evidence[e.id]?.version === e.version &&
          isEvidenceAccepted(state, state.evidence[e.id]),
      ),
  );
}
export function getDossierChecklist(state: DemoState): ChecklistItem[] {
  const result = state.evaluation.selected;
  const current = getCurrentScore(state) !== null;
  const previewMatchesTeam =
    !state.dossier.preview ||
    (state.dossier.preview.managerId === state.selectedTeam.managerId &&
      state.dossier.preview.specialistId === state.selectedTeam.specialistId);
  const used = result?.components.flatMap((c) => c.evidenceIds) ?? [];
  const ids = [...new Set(used)];
  const allAccepted =
    ids.length > 0 &&
    ids.every((id) => isEvidenceAccepted(state, state.evidence[id]));
  const requiredCredentials = ["G-PMP", "E-SEC"].every((ruleId) =>
    result?.components.some((c) => c.ruleId === ruleId && c.points > 0),
  );
  const pmo = Boolean(
    state.pmo &&
      state.pmo.key === teamKey(state) &&
      state.pmo.availabilityRevision === state.availabilityRevision,
  );
  return [
    {
      id: "rules",
      label: "Matriz aprovada e versão conferida",
      required: true,
      status: state.tender.rulesApproved && !state.tender.amended,
      reason: state.tender.amended
        ? "Retificação v2 em revisão. Reaprovar matriz e correspondências."
        : state.tender.rulesApproved
          ? "Regras fixadas para esta versão."
          : "Aprovar matriz e conferir provas iniciais.",
    },
    {
      id: "team",
      label: "Composição atual e pessoas distintas",
      required: true,
      status:
        current &&
        Boolean(result) &&
        result!.managerId !== result!.specialistId &&
        previewMatchesTeam,
      reason: !previewMatchesTeam
        ? "A prévia pertence à composição anterior. Prepare novamente para as pessoas selecionadas."
        : current
          ? "Resultado atual da amostra demonstrativa."
          : "Recalcular uma equipe válida antes de revisar.",
    },
    {
      id: "pmo",
      label: "Aprovação desta composição pelo PMO",
      required: true,
      status: pmo,
      reason: pmo
        ? "Pessoas, funções, período e capacidade conferidos."
        : "PMO precisa confirmar o uso da composição e a agenda atuais.",
    },
    {
      id: "acceptances",
      label: "Provas usadas aceitas para esta regra e versão",
      required: true,
      status: allAccepted,
      reason: allAccepted
        ? "Cada parcela aponta para os aceites correspondentes."
        : "Há aceite ausente, rejeitado ou em outra versão.",
    },
    {
      id: "mandatory",
      label: "Documentos obrigatórios presentes e vigentes",
      required: true,
      status: requiredCredentials && allAccepted,
      reason:
        requiredCredentials && allAccepted
          ? "PMP e Security+ vigentes, com titular conferido."
          : "Conferir PMP, Security+, vigência e titular.",
    },
    {
      id: "export",
      label: "Permissão para exportar documentos usados",
      required: true,
      status:
        ids.length > 0 && ids.every((id) => state.evidence[id].exportAllowed),
      reason: ids.some((id) => !state.evidence[id].exportAllowed)
        ? `Exportação bloqueada: ${ids
            .filter((id) => !state.evidence[id].exportAllowed)
            .map((id) => state.evidence[id].title)
            .join(", ")}.`
        : "O PDF resumido inclui índice; não anexa todos os originais.",
    },
    {
      id: "review",
      label: "Revisão final dos textos por Licitações",
      required: true,
      status:
        state.dossier.reviewed &&
        snapshotDependenciesCurrent(state, state.dossier.preview),
      reason: state.dossier.reviewed
        ? "Conteúdo da prévia revisado para esta composição."
        : "Preparar e revisar os textos da prévia atual.",
    },
    {
      id: "recovery",
      label: "Atestados opcionais do Recovery",
      required: false,
      status: Object.values(state.recoveryTasks).every(
        (t) => t.status === "accepted",
      ),
      reason:
        "Pendências opcionais não impedem aprovar um dossiê válido de 33 pontos.",
    },
  ];
}
export function createDossierSnapshot(state: DemoState): DossierSnapshot {
  const current = state.evaluation.selected;
  if (
    getCurrentScore(state) === null ||
    !current?.managerId ||
    !current.specialistId
  )
    throw new Error(
      "É necessária uma equipe válida atual para preparar o dossiê.",
    );
  const manager = state.people[current.managerId],
    specialist = state.people[current.specialistId];
  const evidenceIds = [
    ...new Set(current.components.flatMap((c) => c.evidenceIds)),
  ];
  const projects = (id: string) =>
    evidenceIds
      .map((e) => state.evidence[e])
      .filter((e) => e.personId === id && e.kind === "project")
      .map((e) => `${e.project} (${e.unitId})`)
      .join("; ");
  const version =
    Math.max(
      0,
      ...state.dossier.history.map((d) => d.version),
      state.dossier.approved?.version ?? 0,
      state.dossier.preview?.version ?? 0,
    ) + 1;
  return {
    id: `dossier-ENE-001-v${version}`,
    version,
    scope: "KEY_TEAM",
    mode: "simulated",
    inputRevision: state.inputRevision,
    ruleVersion: state.tender.ruleVersion,
    universeVersion: state.tender.universeVersion,
    score: current.score!,
    managerId: current.managerId,
    specialistId: current.specialistId,
    team: { manager: manager.name, specialist: specialist.name },
    window: WINDOW_LABEL,
    approvedAt: null,
    approvers: [],
    components: structuredClone(current.components),
    evidence: evidenceIds.map((id) => {
      const e = state.evidence[id];
      return {
        id,
        title: e.title,
        filename: e.filename,
        person: state.people[e.personId].name,
        version: e.version,
        unitId: e.unitId,
        exportAllowed: e.exportAllowed,
      };
    }),
    texts: {
      scope:
        "Amostra demonstrativa da parcela técnica referente à equipe-chave de ENE-001 · Modernização de operações de energia. Contratante fictício: Consórcio Horizonte Energia. Não constitui proposta oficial ou envio externo.",
      managerCv: `${manager.name} — Gerente de projeto. PMP vigente até 31/12/2027.${current.components.some((c) => c.personId === manager.id && c.ruleId === "G-POS") ? " Pós-graduação aceita na área." : ""} Participações com prova aceita: ${projects(manager.id)}. Disponibilidade: 32 h/semana no período ${WINDOW_LABEL}.`,
      specialistCv: `${specialist.name} — Especialista em segurança. Security+ vigente até 31/12/2027. Participações como Especialista com prova aceita: ${projects(specialist.id)}. Disponibilidade: 20 h/semana no período ${WINDOW_LABEL}.`,
    },
    pmoKey: teamKey(state),
  };
}
export function canExportDossier(state: DemoState): boolean {
  const s = state.dossier.approved;
  return Boolean(
    s?.approvedAt &&
      snapshotDependenciesCurrent(state, s) &&
      getCurrentScore(state) !== null &&
      s.managerId === state.selectedTeam.managerId &&
      s.specialistId === state.selectedTeam.specialistId &&
      state.pmo?.key === s.pmoKey &&
      s.evidence.every(
        (e) =>
          state.evidence[e.id]?.version === e.version &&
          state.evidence[e.id]?.exportAllowed &&
          isEvidenceAccepted(state, state.evidence[e.id]),
      ),
  );
}
export function dossierStatus(state: DemoState): string {
  return state.dossier.approved
    ? canExportDossier(state)
      ? "approved"
      : "review_required"
    : state.dossier.preview
      ? "prepared"
      : "not_prepared";
}
export function pendingCounts(state: DemoState) {
  return {
    profiles: Object.keys(state.people).length,
    documents:
      Object.values(state.evidence).filter(
        (e) => e.document === "received" || e.document === "reviewing",
      ).length + (state.people["p-carla"].updateStatus === "verified" ? 0 : 1),
    recovery: Object.values(state.recoveryTasks).filter(
      (t) => !["accepted", "rejected"].includes(t.status),
    ).length,
    campaigns: Object.values(state.campaigns).filter(
      (c) => c.status !== "verified",
    ).length,
  };
}
