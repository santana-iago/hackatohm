import type { Actor, DemoState, Evidence, Person, RoleId, Rule } from "./types";

export const RULE_VERSION = "RULES-ENE-001-v1";
export const WINDOW_LABEL = "02/11/2026 a 29/01/2027";
export const DEMO_START = "2026-10-27T10:00:00-03:00";
export const CENTRAL_PEOPLE = ["p-bruno", "p-carla", "p-diego", "p-eva"];

const person = (
  id: string,
  name: string,
  area: string,
  competencies: string[],
  pending = false,
): Person => ({
  id,
  name,
  initials: name
    .split(" ")
    .map((n) => n[0])
    .join(""),
  area,
  competencies,
  profileVersion: 1,
  updateStatus: pending ? "pending" : "verified",
  lastReview: "26/10/2026",
});
function makeEvidence(
  id: string,
  personId: string,
  title: string,
  kind: Evidence["kind"],
  unitId: string,
  ruleId: string,
  roleId?: RoleId,
  project?: string,
): Evidence {
  return {
    id,
    personId,
    title,
    filename: `${title.replaceAll(" ", "_")}_DEMO.pdf`,
    kind,
    roleId,
    unitId,
    project,
    information: "confirmed",
    document: "verified",
    validity: kind === "project" || kind === "postgraduate" ? "na" : "valid",
    validUntil:
      kind === "project" || kind === "postgraduate" ? undefined : "31/12/2027",
    exportAllowed: true,
    version: 1,
    ruleId,
    documentFixtureId: id,
    verifiedBy: "beatriz",
    verifiedAt: "26/10/2026, 14:00",
  };
}
export function createInitialState(): DemoState {
  const people: Record<string, Person> = Object.fromEntries(
    [
      person("p-bruno", "Bruno Almeida", "Gestão de projetos", [
        "PMP",
        "Pós-graduação",
        "Energia",
      ]),
      person(
        "p-carla",
        "Carla Mendes",
        "Gestão de projetos",
        ["PMP", "Pós-graduação", "Energia"],
        true,
      ),
      person("p-diego", "Diego Santos", "Projetos e segurança", [
        "PMP",
        "Security+",
        "Energia",
        "Segurança",
      ]),
      person("p-eva", "Eva Lima", "Segurança da informação", [
        "Security+",
        "Segurança",
      ]),
      person("p-lia", "Lia Costa", "Segurança da informação", [
        "Segurança",
        "Exame a confirmar",
      ]),
      person("p-marina", "Marina Torres", "Tecnologia", [
        "Tecnologia",
        "Competência em nuvem a confirmar",
      ]),
      person("p-rafael", "Rafael Nunes", "Tecnologia", [
        "Certificação em análise",
      ]),
      person("p-pedro", "Pedro Rocha", "Gestão de projetos", ["PMP vencido"]),
      person("p-ana", "Ana Ribeiro", "Análise de dados", [
        "Análise de dados",
        "Saúde",
      ]),
      person("p-tiago", "Tiago Martins", "Segurança da informação", [
        "Segurança declarada",
      ]),
    ].map((p) => [p.id, p]),
  );
  const actors: Record<string, Actor> = {
    juliana: {
      id: "juliana",
      name: "Juliana Ramos",
      role: "bids",
      label: "Licitações",
    },
    beatriz: { id: "beatriz", name: "Beatriz Souza", role: "hr", label: "RH" },
    andre: { id: "andre", name: "André Costa", role: "pmo", label: "PMO" },
  };
  Object.values(people).forEach((p) => {
    actors[p.id] = {
      id: p.id,
      name: p.name,
      role: "collaborator",
      personId: p.id,
      label: `Colaborador · ${p.name.split(" ")[0]}`,
    };
  });
  actors["p-lucas"] = {
    id: "p-lucas",
    name: "Lucas Azevedo",
    role: "collaborator",
    personId: "p-lucas",
    label: "Convidado · Lucas",
  };
  const evidence: Record<string, Evidence> = {};
  const add = (e: Evidence) => {
    evidence[e.id] = e;
  };
  for (const id of ["p-bruno", "p-carla", "p-diego"])
    add(
      makeEvidence(
        `ev-${id.slice(2)}-pmp`,
        id,
        `PMP · ${people[id].name}`,
        "pmp",
        `${id}-PMP`,
        "G-PMP",
        "manager",
      ),
    );
  for (const id of ["p-bruno", "p-carla"])
    add(
      makeEvidence(
        `ev-${id.slice(2)}-pos`,
        id,
        `Pós-graduação · ${people[id].name}`,
        "postgraduate",
        `${id}-POS`,
        "G-POS",
        "manager",
      ),
    );
  for (const id of ["p-diego", "p-eva"])
    add(
      makeEvidence(
        `ev-${id.slice(2)}-sec`,
        id,
        `Security+ · ${people[id].name}`,
        "security",
        `${id}-SEC`,
        "E-SEC",
        "specialist",
      ),
    );
  add(
    makeEvidence(
      "ev-carla-serra",
      "p-carla",
      "Atestado Serra Norte",
      "project",
      "CAR-G01",
      "G-ENERGIA",
      "manager",
      "Serra Norte — integração de operações de energia",
    ),
  );
  const sets: {
    personId: string;
    roleId: RoleId;
    prefix: string;
    projects: string[];
  }[] = [
    {
      personId: "p-bruno",
      roleId: "manager",
      prefix: "BR-G",
      projects: ["Leste Energia", "Planalto Energia", "Costa Energia"],
    },
    {
      personId: "p-diego",
      roleId: "manager",
      prefix: "DG-G",
      projects: [
        "Matriz Solar",
        "Rede Horizonte",
        "Operação Cedro",
        "Parque Ventos",
      ],
    },
    {
      personId: "p-diego",
      roleId: "specialist",
      prefix: "DG-E",
      projects: [
        "Proteção Atlas",
        "Segurança Boreal",
        "Rede Íris",
        "Acesso Nascente",
      ],
    },
    {
      personId: "p-eva",
      roleId: "specialist",
      prefix: "EV-E",
      projects: ["Proteção Safira", "Rede Prisma", "Operação Âmbar"],
    },
  ];
  for (const set of sets)
    set.projects.forEach((project, index) => {
      const unitId = `${set.prefix}${String(index + 1).padStart(2, "0")}`;
      const id = `ev-${set.personId.slice(2)}-${set.roleId === "manager" ? "g" : "e"}${String(index + 1).padStart(2, "0")}`;
      add(
        makeEvidence(
          id,
          set.personId,
          `Atestado ${project}`,
          "project",
          unitId,
          set.roleId === "manager" ? "G-ENERGIA" : "E-PROJETOS",
          set.roleId,
          project,
        ),
      );
    });
  const aurora = makeEvidence(
    "ev-carla-aurora",
    "p-carla",
    "Atestado Carla · Aurora",
    "project",
    "CAR-G02",
    "G-ENERGIA",
    "manager",
    "Aurora — modernização de operações de energia",
  );
  const vale = makeEvidence(
    "ev-carla-vale",
    "p-carla",
    "Atestado Carla · Vale do Sol",
    "project",
    "CAR-G03",
    "G-ENERGIA",
    "manager",
    "Vale do Sol — governança de operações de energia",
  );
  aurora.filename = "Atestado_Carla_Aurora_DEMO.pdf";
  vale.filename = "Atestado_Carla_ValeDoSol_DEMO.pdf";
  for (const e of [aurora, vale])
    add({
      ...e,
      document: "missing",
      verifiedBy: undefined,
      verifiedAt: undefined,
    });
  add({
    ...makeEvidence(
      "ev-lia-sec",
      "p-lia",
      "Credencial Security+ · Lia Costa",
      "security",
      "DEMO-SEC-LIA-001",
      "E-SEC",
      "specialist",
    ),
    filename: "Credencial_SecurityPlus_Lia_DEMO.pdf",
    information: "detected",
    document: "missing",
    validUntil: "01/08/2029",
    verifiedBy: undefined,
    verifiedAt: undefined,
  });
  add({
    ...makeEvidence(
      "ev-marina-cloud",
      "p-marina",
      "Arquitetura de soluções em nuvem",
      "cloud",
      "DEMO-CLOUD-MARINA-001",
      "",
    ),
    information: "declared",
    document: "missing",
    validUntil: "15/08/2029",
    verifiedBy: undefined,
    verifiedAt: undefined,
  });
  add({
    ...makeEvidence(
      "ev-rafael-sec",
      "p-rafael",
      "Registro com divergência de titular",
      "security",
      "DEMO-RAFAEL-001",
      "E-SEC",
    ),
    information: "contested",
    document: "rejected",
    reason:
      "O titular no documento de exemplo diverge de Rafael Nunes. Prova rejeitada; nenhum ponto concedido.",
  });
  add({
    ...makeEvidence(
      "ev-pedro-pmp",
      "p-pedro",
      "PMP · Pedro Rocha",
      "pmp",
      "PED-PMP",
      "G-PMP",
      "manager",
    ),
    validity: "expired",
    validUntil: "30/09/2026",
  });
  const rules: Rule[] = [
    {
      id: "G-PMP",
      roleId: "manager",
      title: "PMP vigente",
      description:
        "Credencial PMP vigente e aceita na data de corte; uma única vez por credencial.",
      points: 10,
      cap: 10,
      mandatory: true,
      page: 4,
      clause: "7.1.1",
      reviewed: false,
    },
    {
      id: "G-ENERGIA",
      roleId: "manager",
      title: "Projetos de energia",
      description:
        "2 pontos por projeto distinto de energia, com atuação gerencial comprovada; teto de 8 pontos.",
      points: 2,
      cap: 8,
      mandatory: false,
      page: 4,
      clause: "7.2.1",
      reviewed: false,
    },
    {
      id: "G-POS",
      roleId: "manager",
      title: "Pós-graduação na área",
      description: "Pós-graduação aceita na área. Ausência não elimina.",
      points: 5,
      cap: 5,
      mandatory: false,
      page: 4,
      clause: "7.2.2",
      reviewed: false,
    },
    {
      id: "E-SEC",
      roleId: "specialist",
      title: "Security+ vigente",
      description: "Credencial Security+ vigente e aceita para a função.",
      points: 6,
      cap: 6,
      mandatory: true,
      page: 4,
      clause: "7.3.1",
      reviewed: false,
    },
    {
      id: "E-PROJETOS",
      roleId: "specialist",
      title: "Projetos relevantes",
      description:
        "2 pontos por projeto distinto com participação comprovada como Especialista; teto de 8 pontos.",
      points: 2,
      cap: 8,
      mandatory: false,
      page: 4,
      clause: "7.3.2",
      reviewed: false,
    },
    {
      id: "EQ-PAPEIS",
      roleId: "team",
      title: "Pessoas distintas",
      description: "Gerente e Especialista devem ser pessoas distintas.",
      points: 0,
      cap: 0,
      mandatory: true,
      page: 4,
      clause: "7.4",
      reviewed: false,
    },
    {
      id: "EQ-AGENDA",
      roleId: "team",
      title: "Disponibilidade e capacidade",
      description:
        "Confirmar todo o período: 32 h/semana para Gerente e 20 h/semana para Especialista.",
      points: 0,
      cap: 0,
      mandatory: true,
      page: 2,
      clause: "Equipe e período",
      reviewed: false,
    },
    {
      id: "EQ-DOCS",
      roleId: "team",
      title: "Documentação exportável",
      description:
        "Titular, participação, vigência, aceite e permissão de uso documental conferidos.",
      points: 0,
      cap: 0,
      mandatory: true,
      page: 3,
      clause: "Apresentação de provas",
      reviewed: false,
    },
  ];
  const availability: DemoState["availability"] = {};
  Object.keys(people).forEach((id) => {
    availability[id] = {
      personId: id,
      capacity:
        (
          { "p-bruno": 0, "p-carla": 40, "p-diego": 32, "p-eva": 20 } as Record<
            string,
            number
          >
        )[id] ?? null,
      confirmed: CENTRAL_PEOPLE.includes(id),
      revision: 1,
      from: "2026-11-02",
      to: "2027-01-29",
      validUntil: "2026-10-27T18:00:00-03:00",
      confirmedAt: "26/10/2026, 16:00",
      responsible: "André Costa",
    };
  });
  return {
    schemaVersion: 1,
    demo: {
      sceneId: "overview",
      actorId: "juliana",
      route: "/inicio",
      inspector: null,
      clockMinutes: 0,
      capture: false,
      motion: "normal",
    },
    actors,
    people,
    claims: {
      "p-carla":
        "Currículo v2 recebido: os projetos Aurora e Vale do Sol já eram conhecidos por outras fontes. A atualização não substitui atestados.",
      "p-lia": "Há reembolso de exame. O pagamento não comprova aprovação.",
      "p-tiago": "Experiência em segurança declarada; Security+ não informado.",
      "p-marina":
        "Conhecimento em nuvem indicado por Eva; aguardando aceite da titular.",
    },
    evidence,
    acceptances: [],
    rules,
    tender: {
      id: "ENE-001",
      version: "ENE-001-v1",
      ruleVersion: RULE_VERSION,
      universeVersion: "UNIVERSE-ENE-001-v1",
      rulesApproved: false,
      initialEvidenceAccepted: false,
      amended: false,
    },
    availability,
    availabilityRevision: 1,
    inputRevision: 1,
    selectedTeam: { managerId: "p-diego", specialistId: "p-eva" },
    pmo: null,
    recoveryTasks: {
      "CAR-G02": {
        id: "CAR-G02",
        evidenceId: "ev-carla-aurora",
        projectId: "CAR-G02",
        title: "Atestado do projeto Aurora",
        personId: "p-carla",
        responsible: "p-carla",
        deadline: "27/10/2026, 15:00",
        status: "open",
      },
      "CAR-G03": {
        id: "CAR-G03",
        evidenceId: "ev-carla-vale",
        projectId: "CAR-G03",
        title: "Atestado do projeto Vale do Sol",
        personId: "p-carla",
        responsible: "p-carla",
        deadline: "27/10/2026, 15:00",
        status: "open",
      },
    },
    evaluation: {
      inputRevision: 0,
      ruleVersion: RULE_VERSION,
      status: "not_calculated",
      teams: [],
      blocked: [],
      selected: null,
      lastScore: null,
      history: [],
    },
    dossier: {
      preview: null,
      approved: null,
      history: [],
      reviewed: false,
      exports: [],
    },
    campaigns: {
      "campaign-security": {
        id: "campaign-security",
        title: "Ampliar a base de especialistas com Security+",
        personId: "p-lia",
        status: "open",
      },
    },
    referrals: {
      "referral-marina": {
        id: "referral-marina",
        fromPersonId: "p-eva",
        personId: "p-marina",
        status: "pending",
      },
      "invite-lucas": {
        id: "invite-lucas",
        fromPersonId: "p-eva",
        personId: "p-lucas",
        status: "pending",
        external: true,
      },
    },
    engagement: [],
    audit: [],
    appliedCommandIds: [],
    message:
      "Aguardando critérios aprovados. Dados e ações inteiramente simulados.",
    error: false,
  };
}
