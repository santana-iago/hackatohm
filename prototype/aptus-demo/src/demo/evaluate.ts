import type {
  DemoState,
  EvaluationSnapshot,
  Evidence,
  PotentialResult,
  RoleId,
  ScoreComponent,
  TeamResult,
} from "./types";

export function isEvidenceAccepted(
  state: DemoState,
  e: Evidence,
  ruleId = e.ruleId,
): boolean {
  return (
    e.document === "verified" &&
    (e.validity === "valid" || e.validity === "na") &&
    state.acceptances.some(
      (a) =>
        a.evidenceId === e.id &&
        a.personId === e.personId &&
        a.roleId === e.roleId &&
        a.ruleId === ruleId &&
        a.ruleVersion === state.tender.ruleVersion &&
        a.decision === "accepted",
    )
  );
}
export function personComponents(
  state: DemoState,
  personId: string,
  roleId: RoleId,
): ScoreComponent[] {
  return state.rules
    .filter((r) => r.roleId === roleId)
    .map((rule) => {
      const items = Object.values(state.evidence).filter(
        (e) =>
          e.personId === personId &&
          e.roleId === roleId &&
          isEvidenceAccepted(state, e, rule.id),
      );
      const unique = [
        ...new Map(items.map((e) => [e.unitId, e])).values(),
      ].slice(0, rule.points > 0 ? Math.floor(rule.cap / rule.points) : 0);
      return {
        ruleId: rule.id,
        personId,
        roleId,
        points: Math.min(rule.cap, unique.length * rule.points),
        unitIds: unique.map((e) => e.unitId),
        evidenceIds: unique.map((e) => e.id),
      };
    })
    .filter((c) => c.points > 0);
}
export function personScore(
  state: DemoState,
  personId: string,
  roleId: RoleId,
): number {
  return personComponents(state, personId, roleId).reduce(
    (n, c) => n + c.points,
    0,
  );
}
function roleBlockers(
  state: DemoState,
  personId: string,
  roleId: RoleId,
): string[] {
  const name = state.people[personId]?.name ?? personId;
  const credential = roleId === "manager" ? "G-PMP" : "E-SEC";
  const problems: string[] = [];
  if (
    !personComponents(state, personId, roleId).some(
      (c) => c.ruleId === credential,
    )
  )
    problems.push(
      `${name} · ${roleId === "manager" ? "PMP" : "Security+"} obrigatório sem prova vigente aceita.`,
    );
  const a = state.availability[personId];
  const needed = roleId === "manager" ? 32 : 20;
  if (!a || !a.confirmed || a.capacity === null)
    problems.push(`${name} · Agenda a confirmar em todo o período exigido.`);
  else if (a.capacity < needed)
    problems.push(
      `${name} · Indisponível no período de execução exigido. Capacidade restante: ${a.capacity} h/semana; exigidas ${needed}.`,
    );
  else if (a.from > "2026-11-02" || a.to < "2027-01-29")
    problems.push(`${name} · Disponibilidade não cobre o intervalo integral.`);
  const now =
    new Date("2026-10-27T10:00:00-03:00").getTime() +
    state.demo.clockMinutes * 60000;
  if (a && Date.parse(a.validUntil) < now)
    problems.push(`${name} · Confirmação de agenda vencida.`);
  const used = personComponents(state, personId, roleId).flatMap(
    (c) => c.evidenceIds,
  );
  if (used.some((id) => !state.evidence[id].exportAllowed))
    problems.push(
      `${name} · Documento usado sem permissão para integrar o dossiê.`,
    );
  return problems;
}
export function evaluateDemoTeams(state: DemoState): EvaluationSnapshot {
  if (
    !state.tender.rulesApproved ||
    !state.tender.initialEvidenceAccepted ||
    state.tender.amended
  )
    return {
      ...state.evaluation,
      status: state.evaluation.selected ? "stale" : "not_calculated",
    };
  const teams: TeamResult[] = [];
  const blocked: TeamResult[] = [];
  for (const managerId of ["p-bruno", "p-carla", "p-diego"])
    for (const specialistId of ["p-diego", "p-eva"]) {
      const components = [
        ...personComponents(state, managerId, "manager"),
        ...personComponents(state, specialistId, "specialist"),
      ];
      const blockers = [
        ...roleBlockers(state, managerId, "manager"),
        ...roleBlockers(state, specialistId, "specialist"),
      ];
      if (managerId === specialistId)
        blockers.unshift(
          "Diego já ocupa outra função. Este edital exige pessoas distintas.",
        );
      const result: TeamResult = {
        inputRevision: state.inputRevision,
        ruleVersion: state.tender.ruleVersion,
        status: blockers.length ? "no_confirmed_team" : "current",
        managerId,
        specialistId,
        score: components.reduce((n, c) => n + c.points, 0),
        components,
        blockers,
        mode: "simulated",
      };
      if (blockers.length) blocked.push(result);
      else teams.push(result);
    }
  teams.sort(
    (a, b) =>
      (b.score ?? 0) - (a.score ?? 0) ||
      (a.managerId ?? "").localeCompare(b.managerId ?? ""),
  );
  const selected = teams[0] ?? null;
  return {
    inputRevision: state.inputRevision,
    ruleVersion: state.tender.ruleVersion,
    status: selected ? "current" : "no_confirmed_team",
    teams,
    blocked,
    selected,
    lastScore: selected?.score ?? state.evaluation.lastScore,
    history: [
      ...state.evaluation.history,
      ...(state.evaluation.selected
        ? [structuredClone(state.evaluation.selected)]
        : []),
    ],
  };
}
export function calculateConditionalPotential(
  state: DemoState,
): PotentialResult {
  if (
    state.evaluation.status !== "current" ||
    !state.evaluation.selected ||
    state.evaluation.inputRevision !== state.inputRevision
  )
    return {
      currentScore: null,
      potentialScore: null,
      remainingGain: null,
      assumptions: [],
      status: "Comparação será atualizada após o recálculo.",
    };
  const score = state.evaluation.selected.score ?? 0;
  const selected = state.evaluation.selected;
  const recoverable = Object.values(state.recoveryTasks).filter((t) => {
    const e = state.evidence[t.evidenceId];
    return (
      selected.managerId === e.personId &&
      t.status !== "rejected" &&
      e.document !== "rejected" &&
      !state.acceptances.some(
        (a) =>
          a.evidenceId === e.id &&
          a.ruleVersion === state.tender.ruleVersion &&
          a.decision === "rejected",
      ) &&
      !isEvidenceAccepted(state, e)
    );
  });
  const draft = structuredClone(state);
  for (const task of recoverable) {
    const e = draft.evidence[task.evidenceId];
    e.document = "verified";
    draft.acceptances = draft.acceptances.filter(
      (a) =>
        !(a.evidenceId === e.id && a.ruleVersion === draft.tender.ruleVersion),
    );
    draft.acceptances.push({
      evidenceId: e.id,
      personId: e.personId,
      roleId: "manager",
      ruleId: "G-ENERGIA",
      ruleVersion: draft.tender.ruleVersion,
      decision: "accepted",
      reviewerId: "juliana",
      decidedAt: "Condicionado",
      reason: "Hipótese demonstrativa; ainda não aceita.",
    });
  }
  const potential =
    personScore(draft, selected.managerId!, "manager") +
    personScore(draft, selected.specialistId!, "specialist");
  return {
    currentScore: score,
    potentialScore: potential,
    remainingGain: Math.max(0, potential - score),
    assumptions: recoverable.map(
      (t) => `${t.title}: receber, conferir e aceitar para G-ENERGIA.`,
    ),
    status: recoverable.length
      ? "Condicionado a provas"
      : "Nenhuma lacuna recuperável destas duas tarefas.",
  };
}
