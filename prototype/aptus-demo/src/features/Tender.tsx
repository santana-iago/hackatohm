import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  CalendarDays,
  Users,
  Check,
  ShieldCheck,
  Clock3,
  BriefcaseBusiness,
  Link2,
  AlertTriangle,
  RefreshCw,
  Plus,
  Layers3,
} from "lucide-react";
import { useDemo } from "../demo/context";
import {
  getCurrentScore,
  getInitialEvidenceIds,
  pendingCounts,
  teamKey,
} from "../demo/selectors";
import { calculateConditionalPotential, personScore } from "../demo/evaluate";
import { editalPages } from "../demo/documents";
import type { ScoreComponent } from "../demo/types";
import {
  Panel,
  Status,
  Dialog,
  CommandButton,
  handleTabListKeyDown,
} from "../components/ui";
import { AuditTimeline } from "../components/AuditTimeline";
import { Dossier } from "./Dossier";
import { tenderPath, tenderTabs } from "../app/routes";

export function ScoreSummary({ compact = false }: { compact?: boolean }) {
  const { state } = useDemo();
  const score = getCurrentScore(state),
    potential = calculateConditionalPotential(state),
    last = state.evaluation.selected?.score ?? state.evaluation.lastScore;
  return (
    <div className={`score-summary ${compact ? "score-compact" : ""}`}>
      <div className="score-main">
        {score !== null ? (
          <div className="score-line">
            <strong className="score-value" data-testid="team-score-current">
              {score}
            </strong>
            <span className="score-label">
              Pontos da equipe-chave
              <small>Avaliação atual · {state.tender.version}</small>
            </span>
            <Status tone="success">Atual</Status>
          </div>
        ) : state.evaluation.status === "stale" ? (
          <>
            <div className="score-line">
              <strong className="score-value" data-testid="team-score-last">
                {last}
              </strong>
              <span className="score-label">
                Último cálculo<small>Recálculo necessário</small>
              </span>
              <Status tone="warning">Em revisão</Status>
            </div>
            <p className="muted">
              A comparação será atualizada após o recálculo.
            </p>
          </>
        ) : (
          <div className="score-pending">
            <Clock3 size={18} />
            <div>
              <h3>
                {state.evaluation.status === "no_confirmed_team"
                  ? "Sem equipe confirmada"
                  : "Aguardando critérios aprovados"}
              </h3>
              <p>Confira a matriz e as provas antes de publicar uma nota.</p>
            </div>
          </div>
        )}
      </div>
      {score !== null &&
      potential.potentialScore !== null &&
      potential.potentialScore > score ? (
        <div className="score-potential">
          <span className="score-label">Condicionado a provas</span>
          <strong data-testid="team-score-potential">
            Até {potential.potentialScore} pontos
          </strong>
          <p>
            {score === 31
              ? "Aceitação de dois atestados"
              : `Mais ${potential.remainingGain} pontos · uma prova distinta`}
          </p>
        </div>
      ) : score !== null ? (
        <div className="score-potential complete">
          <ShieldCheck size={18} />
          <div>
            <strong>
              {score === 35 ? "Provas aceitas" : "Sem ganho condicionado"}
            </strong>
            <p>
              {score === 35
                ? "Os dois projetos recuperados têm provas aceitas."
                : "Provas aceitas desta composição."}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export function Home() {
  const { state, navigate, inspect } = useDemo();
  const counts = pendingCounts(state);
  return (
    <div className="home-workspace">
      <div className="workspace-title">
        <h1>Hoje</h1>
        <span className="muted">Terça-feira, 27 de outubro de 2026</span>
      </div>
      <section
        className="opportunity-summary"
        aria-label="Disputa em andamento"
      >
        <div className="opportunity-summary-main">
          <span className="tender-file-icon">
            <FileText size={24} />
          </span>
          <div>
            <span className="caption">Nexora · Propostas técnicas</span>
            <h2>ENE-001 · Modernização de operações de energia</h2>
            <p className="muted">Consórcio Horizonte Energia · fictício</p>
          </div>
          <Status tone={state.dossier.approved ? "success" : "warning"}>
            {state.dossier.approved
              ? "Dossiê aprovado"
              : state.tender.rulesApproved
                ? "Em composição"
                : "Critérios em revisão"}
          </Status>
        </div>
        <div className="summary-facts">
          <span>
            <CalendarDays size={15} />
            Prazo fictício · hoje, 18h
          </span>
          <span>
            <Users size={15} />
            Gerente e Especialista
          </span>
          <span>{state.tender.version}</span>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`${tenderPath}/resumo`)}
          >
            Continuar análise da disputa
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
      <ScoreSummary compact />
      <div className="home-layout">
        <div className="stack">
          <Panel
            className="home-section"
            title="Próximas ações"
            meta={<span className="muted">ENE-001</span>}
          >
            <div className="action-list">
              <button onClick={() => navigate(`${tenderPath}/criterios`)}>
                <FileText size={18} />
                <span>
                  <strong>
                    {state.tender.rulesApproved
                      ? "Conferir origem dos critérios"
                      : "Revisar os critérios da equipe"}
                  </strong>
                  <small>
                    Licitações · matriz e correspondências documentais
                  </small>
                </span>
                <ArrowUpRight size={19} />
              </button>
              <button onClick={() => navigate(`${tenderPath}/recovery`)}>
                <RefreshCw size={18} />
                <span>
                  <strong>Recuperar atestados de Carla</strong>
                  <small>
                    {counts.recovery} tarefas abertas · prazo interno 15h
                  </small>
                </span>
                <ArrowUpRight size={19} />
              </button>
              <button onClick={() => navigate(`${tenderPath}/dossie`)}>
                <BriefcaseBusiness size={18} />
                <span>
                  <strong>Revisar o dossiê da equipe-chave</strong>
                  <small>
                    Checklist, origem dos pontos e resumo exportável
                  </small>
                </span>
                <ArrowUpRight size={19} />
              </button>
            </div>
          </Panel>
        </div>
        <div className="stack">
          <Panel className="home-section" title="Atualizações da base">
            <div className="action-list">
              <button onClick={() => inspect("person", "p-carla")}>
                <FileText size={18} />
                <span>
                  <strong>Nova versão de currículo de Carla</strong>
                  <small>Revisar atualização · mesmo perfil</small>
                </span>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => inspect("evidence", "ev-pedro-pmp")}>
                <AlertTriangle size={18} />
                <span>
                  <strong>PMP de Pedro vencido</strong>
                  <small>Validade encerrada em 30/09/2026</small>
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </Panel>
        </div>
      </div>
      <Panel className="home-section" title="Atividade do cenário">
        <div className="panel-body">
          <AuditTimeline limit={4} />
        </div>
      </Panel>
      <div className="home-counts" aria-label="Resumo da amostra">
        <span>{counts.profiles} perfis na amostra</span>
        <span>{counts.documents} revisões pendentes</span>
        <span>{counts.recovery} tarefas Recovery</span>
        <span>{counts.campaigns} campanha ativa</span>
      </div>
      <p className="caption">
        Responsáveis fictícios: Juliana Ramos · Licitações, Beatriz Souza · RH e
        André Costa · PMO.
      </p>
    </div>
  );
}
export function Opportunities() {
  const { navigate, state } = useDemo();
  return (
    <div className="opportunities-workspace">
      <div className="workspace-title">
        <h1>Oportunidades</h1>
        <span className="muted">Nexora · Propostas técnicas</span>
      </div>
      <Panel>
        <button
          className="opportunity-list-item"
          onClick={() => navigate(tenderPath)}
        >
          <span className="tender-file-icon">
            <FileText size={24} />
          </span>
          <span>
            <strong>ENE-001 · Modernização de operações de energia</strong>
            <small>Consórcio Horizonte Energia · fictício</small>
          </span>
          <span className="opportunity-list-meta">
            <Status tone="warning">
              {state.tender.rulesApproved
                ? "Em análise"
                : "Critérios em revisão"}
            </Status>
            <small>Prazo fictício · 27/10, 18h</small>
          </span>
          <ArrowRight size={20} />
        </button>
      </Panel>
      <p className="caption">
        Resultado referente à amostra e às versões desta demonstração.
      </p>
    </div>
  );
}
export function Tender() {
  const { state, navigate } = useDemo();
  const current = state.demo.route.split("/").at(-1);
  const tab = tenderTabs.some((t) => t[0] === current) ? current : "resumo";
  return (
    <div className="tender-workspace">
      <div className="tender-heading">
        <div className="tender-identity">
          <span className="tender-file-icon">
            <FileText size={24} />
          </span>
          <div>
            <h1>ENE-001 · Modernização de operações de energia</h1>
            <p className="muted">Consórcio Horizonte Energia · fictício</p>
          </div>
        </div>
        <div className="deadline">
          <CalendarDays size={18} />
          <div>
            <small>Prazo fictício</small>
            <strong>27 out · 18h</strong>
          </div>
        </div>
      </div>
      <div className="tender-context">
        <span>
          <FileText size={15} />
          {state.tender.version}
        </span>
        <span>
          <CalendarDays size={15} />
          02 nov 2026 — 29 jan 2027
        </span>
        <span>
          <Users size={15} />
          Gerente + Especialista
        </span>
      </div>
      <div
        className="tender-tabs"
        onKeyDown={handleTabListKeyDown}
        role="tablist"
        aria-label="Áreas da disputa"
      >
        {tenderTabs.map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => navigate(`${tenderPath}/${id}`)}
          >
            {label}
            {id === "recovery" ? (
              <span>
                {
                  Object.values(state.recoveryTasks).filter(
                    (t) => !["accepted", "rejected"].includes(t.status),
                  ).length
                }
              </span>
            ) : null}
          </button>
        ))}
        <span className="context-version">{state.tender.ruleVersion}</span>
      </div>
      <div className="tender-content">
        {tab === "resumo" ? (
          <TenderOverview />
        ) : tab === "criterios" ? (
          <Criteria />
        ) : tab === "equipe" ? (
          <Team />
        ) : tab === "recovery" ? (
          <Recovery />
        ) : (
          <Dossier />
        )}
      </div>
    </div>
  );
}
function TenderOverview() {
  const { state, navigate } = useDemo();
  const stages = [
    ["Critérios", state.tender.initialEvidenceAccepted],
    ["Composição", getCurrentScore(state) !== null],
    [
      "Provas",
      Object.values(state.recoveryTasks).every((t) => t.status === "accepted"),
    ],
    ["Aprovação", Boolean(state.dossier.approved)],
  ];
  return (
    <div className="stack">
      <div className="stage-strip">
        {stages.map(([label, done], i) => (
          <div key={String(label)} className={done ? "done" : ""}>
            <span>{done ? <Check size={15} /> : i + 1}</span>
            <strong>{label}</strong>
            {i < 3 ? <ArrowRight size={16} /> : null}
          </div>
        ))}
      </div>
      <ScoreSummary />
      <div className="grid-2">
        <Panel title="Escopo da equipe-chave">
          <div className="panel-body stack">
            <div className="scope-role">
              <span className="role-icon">
                <BriefcaseBusiness size={22} />
              </span>
              <div>
                <h3>Gerente de projeto</h3>
                <p className="muted">
                  PMP vigente · 32 h/semana · projetos de energia
                </p>
              </div>
            </div>
            <div className="scope-role">
              <span className="role-icon">
                <ShieldCheck size={22} />
              </span>
              <div>
                <h3>Especialista em segurança</h3>
                <p className="muted">
                  Security+ vigente · 20 h/semana · projetos relevantes
                </p>
              </div>
            </div>
            <p className="caption">
              Pessoas distintas, com capacidade confirmada para todo o período
              exigido.
            </p>
          </div>
        </Panel>
        <Panel title="Origem e conferência">
          <div className="panel-body stack">
            <div className="file-summary">
              <FileText size={27} />
              <div>
                <strong>Edital demonstrativo ENE-001-v1</strong>
                <small>Texto sintético local · 4 páginas</small>
              </div>
            </div>
            <dl className="details-list">
              <div>
                <dt>Peças</dt>
                <dd>Conferência de exemplo</dd>
              </div>
              <div>
                <dt>Universo</dt>
                <dd>10 perfis sintéticos</dd>
              </div>
              <div>
                <dt>Qualificação central</dt>
                <dd>4 perfis modelados para comparação</dd>
              </div>
            </dl>
            <button
              className="btn"
              onClick={() => navigate(`${tenderPath}/criterios`)}
            >
              Conferir matriz e documento
              <ArrowRight size={16} />
            </button>
          </div>
        </Panel>
      </div>
      <Panel title="Trilha das decisões">
        <div className="panel-body">
          <AuditTimeline limit={5} />
        </div>
      </Panel>
    </div>
  );
}
function Criteria() {
  const { state, busy, command, setActor, inspect, generation } = useDemo();
  const [selected, setSelected] = useState("G-ENERGIA"),
    [load, setLoad] = useState(false),
    [initial, setInitial] = useState(false),
    [checked, setChecked] = useState(false),
    [processed, setProcessed] = useState(false);
  const rule = state.rules.find((r) => r.id === selected) ?? state.rules[0],
    page = editalPages.find((p) => p.page === rule.page)!;
  const actor = state.actors[state.demo.actorId];
  const ids = getInitialEvidenceIds(state);
  const allReviewed = state.rules.every((r) => r.reviewed);
  const isBids = actor.role === "bids";
  return (
    <div className="stack">
      <div className="section-heading">
        <div>
          <h2>Matriz de critérios</h2>
          <p className="muted">
            Regras sugeridas por uma extração simulada. A revisão é de
            Licitações.
          </p>
        </div>
        <button className="btn" onClick={() => setLoad(true)}>
          <FileText size={16} />
          Carregar edital demonstrativo
        </button>
      </div>
      {!isBids ? (
        <div className="notice notice-warning">
          A revisão da matriz é de Licitações.
          <button className="text-btn" onClick={() => setActor("juliana")}>
            Ver como Licitações
            <ArrowRight size={14} />
          </button>
        </div>
      ) : null}
      <div className="criteria-layout">
        <Panel
          title="Regras da equipe"
          meta={
            <Status tone={state.tender.rulesApproved ? "success" : "warning"}>
              {state.tender.rulesApproved
                ? "Aprovada"
                : `${state.rules.filter((r) => r.reviewed).length} de ${state.rules.length} revisadas`}
            </Status>
          }
        >
          <div className="criteria-list">
            {state.rules.map((r) => (
              <button
                key={r.id}
                data-testid={`criterion-${r.id}`}
                className={`criterion-row ${r.id === selected ? "selected" : ""}`}
                onClick={() => setSelected(r.id)}
              >
                <span className="criterion-id">{r.id}</span>
                <div>
                  <strong>{r.title}</strong>
                  <small>
                    {r.roleId === "manager"
                      ? "Gerente"
                      : r.roleId === "specialist"
                        ? "Especialista"
                        : "Equipe"}{" "}
                    · {r.mandatory ? "Obrigatória" : "Pontuável"} · p. {r.page}
                  </small>
                </div>
                <span className="criterion-points">
                  {r.cap ? `${r.points} pts` : <Link2 size={18} />}
                </span>
                <span
                  aria-label={
                    r.reviewed ? "Regra revisada" : "Revisão pendente"
                  }
                  className={`review-dot ${r.reviewed ? "done" : ""}`}
                >
                  {r.reviewed ? <Check size={14} /> : <Clock3 size={14} />}
                </span>
              </button>
            ))}
          </div>
          <div className="criterion-detail">
            <div className="section-heading">
              <h3>
                {rule.id} · {rule.title}
              </h3>
              <span className="caption">Cláusula {rule.clause}</span>
            </div>
            <p>{rule.description}</p>
            {rule.id === "G-ENERGIA" ? (
              <div className="notice notice-warning">
                Confirmar interpretação: “projeto distinto” conta projetos, e
                não quantidade de arquivos.
              </div>
            ) : null}
            <CommandButton
              className="btn btn-small"
              disabled={rule.reviewed || !isBids}
              command={{ type: "REVIEW_RULE", ruleId: rule.id, decision: true }}
            >
              {rule.reviewed
                ? "Regra revisada"
                : rule.id === "G-ENERGIA"
                  ? "Confirmar: contar projetos distintos"
                  : "Conferir e revisar esta regra"}
            </CommandButton>
            {!allReviewed ? (
              <button
                className="btn btn-small"
                disabled={
                  busy ||
                  !isBids ||
                  !state.rules.find((r) => r.id === "G-ENERGIA")?.reviewed
                }
                onClick={async () => {
                  const token = generation();
                  for (const r of state.rules.filter(
                    (r) => r.id !== "G-ENERGIA" && !r.reviewed,
                  )) {
                    if (generation() !== token) break;
                    await command({
                      type: "REVIEW_RULE",
                      ruleId: r.id,
                      decision: true,
                    });
                  }
                }}
              >
                Revisar demais regras conferidas
              </button>
            ) : null}
          </div>
        </Panel>
        <div className="mock-document criteria-document">
          <div className="document-toolbar">
            <FileText size={16} />
            <strong>Fonte do critério</strong>
            <span>Página {rule.page} de 4</span>
          </div>
          <article className="document-page">
            <div className="doc-brand">
              NEXORA <span>EDITAL DEMONSTRATIVO</span>
            </div>
            <p className="doc-watermark">DEMONSTRAÇÃO · DADOS FICTÍCIOS</p>
            <h3>{page.title}</h3>
            {page.clauses.map((c) => (
              <p
                key={c.id}
                className={c.id === rule.clause ? "highlight-clause" : ""}
              >
                {c.text}
              </p>
            ))}
            <div className="doc-footer">
              Edital_ENE-001_v1_DEMONSTRATIVO.pdf
              <br />
              {state.tender.ruleVersion} · página {rule.page}
            </div>
          </article>
        </div>
      </div>
      <div className="action-bar">
        <div>
          <strong>
            {state.tender.initialEvidenceAccepted
              ? "Matriz e correspondências aprovadas"
              : state.tender.rulesApproved
                ? "Próximo passo: conferir provas iniciais"
                : allReviewed
                  ? "Matriz pronta para aprovação"
                  : "Revisão obrigatória pendente"}
          </strong>
          <p className="muted">
            {!allReviewed
              ? "Conclua a interpretação crítica e confira as demais regras."
              : state.tender.rulesApproved
                ? "O aceite é específico para cada documento, regra e versão."
                : "A aprovação das regras não aceita automaticamente o uso de documentos."}
          </p>
        </div>
        {!state.tender.rulesApproved ? (
          <CommandButton
            className="btn btn-primary"
            data-testid="criteria-approve"
            disabled={!allReviewed || !isBids}
            command={{
              type: "APPROVE_RULES",
              ruleVersion: state.tender.ruleVersion,
            }}
          >
            Aprovar matriz
            <Check size={17} />
          </CommandButton>
        ) : (
          <button className="btn btn-primary" onClick={() => setInitial(true)}>
            {state.tender.initialEvidenceAccepted
              ? "Consultar aceites iniciais"
              : "Conferir provas iniciais"}
            <ArrowRight size={17} />
          </button>
        )}
      </div>
      {load ? (
        <Dialog title="Edital demonstrativo" onClose={() => setLoad(false)}>
          <div className="stack">
            <div className="radio-choice">
              <FileText size={26} />
              <div>
                <strong>Edital_ENE-001_v1_DEMONSTRATIVO.pdf</strong>
                <p className="muted">
                  4 páginas · regras pré-definidas da equipe-chave
                </p>
              </div>
            </div>
            <p className="muted">
              Este seletor usa os documentos locais do cenário. O processamento
              é simulado.
            </p>
            {processed ? (
              <Status tone="success">
                Regras sugeridas disponíveis para revisão
              </Status>
            ) : null}
            <button
              className="btn btn-primary"
              onClick={() => {
                setProcessed(true);
                setLoad(false);
              }}
            >
              Usar este exemplo
            </button>
          </div>
        </Dialog>
      ) : null}
      {initial ? (
        <Dialog
          title="Conferir provas iniciais"
          onClose={() => setInitial(false)}
          wide
        >
          <div className="stack">
            <p className="muted">
              Os documentos já têm conferência histórica de RH. Esta lista será
              aceita por Licitações para {state.tender.ruleVersion}. Aurora e
              Vale do Sol permanecem fora da lista.
            </p>
            <div className="initial-evidence-list">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Documento / titular</th>
                    <th>Regra</th>
                    <th>Conferência</th>
                  </tr>
                </thead>
                <tbody>
                  {ids.map((id) => {
                    const e = state.evidence[id];
                    return (
                      <tr key={id}>
                        <td>
                          <button
                            className="text-btn"
                            onClick={() => {
                              setInitial(false);
                              inspect("evidence", id);
                            }}
                          >
                            {e.title}
                          </button>
                          <small>
                            {state.people[e.personId].name} · {e.unitId}
                          </small>
                        </td>
                        <td>{e.ruleId}</td>
                        <td>RH · verificado</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <label className="check-row">
              <input
                type="checkbox"
                checked={checked || state.tender.initialEvidenceAccepted}
                disabled={state.tender.initialEvidenceAccepted}
                onChange={(e) => setChecked(e.target.checked)}
              />
              Conferi os titulares, as regras e os documentos desta lista.
            </label>
            <CommandButton
              className="btn btn-primary"
              data-testid="criteria-initial-evidence-approve"
              disabled={
                !checked || state.tender.initialEvidenceAccepted || !isBids
              }
              command={{
                type: "ACCEPT_INITIAL_EVIDENCE",
                ruleVersion: state.tender.ruleVersion,
                evidenceIds: ids,
              }}
            >
              Aceitar provas revisadas para esta matriz
            </CommandButton>
            <button className="btn" onClick={() => setInitial(false)}>
              Concluir conferência
            </button>
          </div>
        </Dialog>
      ) : null}
    </div>
  );
}
function Team() {
  const { state, busy, command, navigate, inspect, setActor } = useDemo();
  const actor = state.actors[state.demo.actorId];
  const current = getCurrentScore(state);
  const selected = state.evaluation.selected;
  const manager = state.people[state.selectedTeam.managerId],
    specialist = state.people[state.selectedTeam.specialistId];
  const components = selected?.components ?? [];
  const pmoOk = state.pmo?.key === teamKey(state);
  const ready =
    state.tender.rulesApproved &&
    state.tender.initialEvidenceAccepted &&
    !state.tender.amended;
  return (
    <div className="stack">
      <div className="section-heading">
        <div>
          <h2>Composição da equipe</h2>
          <p className="muted">
            Duas funções. Uma decisão que considera o conjunto.
          </p>
        </div>
        <button
          className="btn btn-primary"
          data-testid="team-compare"
          disabled={busy || !ready || actor.role !== "bids"}
          title={
            actor.role !== "bids"
              ? "A comparação exige a visão Licitações."
              : undefined
          }
          onClick={() => void command({ type: "EVALUATE_TEAMS" })}
        >
          <Layers3 size={17} />
          Comparar composições
        </button>
      </div>
      {!ready ? (
        <div className="notice notice-warning">
          <AlertTriangle size={18} />
          <span>
            Conclua a revisão da matriz e os aceites documentais iniciais para
            comparar.
          </span>
          <button
            className="text-btn"
            onClick={() => navigate(`${tenderPath}/criterios`)}
          >
            Conferir provas iniciais
            <ArrowRight size={15} />
          </button>
        </div>
      ) : null}
      <ScoreSummary />
      <Panel
        title="Alternativas válidas"
        meta={<span className="caption">Amostra desta demonstração</span>}
      >
        <div className="table-wrap">
          <table className="data-table comparison-table">
            <thead>
              <tr>
                <th>Gerente</th>
                <th>Especialista</th>
                <th>Pontos</th>
                <th>Leitura da composição</th>
                <th>
                  <span className="sr-only">Ação</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {state.evaluation.teams.length ? (
                state.evaluation.teams.map((t, i) => (
                  <tr
                    key={`${t.managerId}-${t.specialistId}`}
                    className={
                      t.managerId === manager.id &&
                      t.specialistId === specialist.id
                        ? "row-selected"
                        : ""
                    }
                  >
                    <td>
                      <span className="table-person">
                        <span className="avatar avatar-small">
                          {state.people[t.managerId!].initials}
                        </span>
                        {state.people[t.managerId!].name}
                      </span>
                    </td>
                    <td>{state.people[t.specialistId!].name}</td>
                    <td>
                      <strong className="table-score">{t.score}</strong>
                    </td>
                    <td>
                      {t.managerId === "p-diego"
                        ? "Escolha isolada por função"
                        : i === 0
                          ? "Composição sugerida no cenário demonstrativo"
                          : "Alternativa válida"}
                    </td>
                    <td>
                      <CommandButton
                        className="btn btn-small"
                        disabled={
                          state.evaluation.status !== "current" ||
                          actor.role !== "bids"
                        }
                        command={{
                          type: "SELECT_TEAM",
                          managerId: t.managerId!,
                          specialistId: t.specialistId!,
                        }}
                      >
                        Selecionar
                      </CommandButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="empty-state">
                      <Users size={26} />
                      <h3>Escolha isolada por função</h3>
                      <p>
                        Diego como Gerente e Eva como Especialista. Compare para
                        conhecer as alternativas válidas.
                      </p>
                      {ready ? (
                        <strong className="table-score">
                          {personScore(state, "p-diego", "manager") +
                            personScore(state, "p-eva", "specialist")}{" "}
                          pontos na prévia
                        </strong>
                      ) : null}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {current !== null ? (
          <div className="comparison-note">
            <Link2 size={18} />
            <span>
              Diego contribui mais na função de Especialista para esta
              composição.{" "}
              <small>Reconhecimento pessoal não integra a nota técnica.</small>
            </span>
          </div>
        ) : null}
      </Panel>
      <div className="team-slots">
        {[
          { role: "Gerente de projeto", p: manager, id: "manager", load: 32 },
          {
            role: "Especialista em segurança",
            p: specialist,
            id: "specialist",
            load: 20,
          },
        ].map((item) => (
          <Panel key={item.id}>
            <div className="team-person">
              <div className="team-role">
                <span className="eyebrow">{item.role}</span>
                <span>{item.load} h/semana</span>
              </div>
              <div className="team-person-header">
                <span
                  className={`avatar avatar-large ${item.id === "manager" ? "avatar-blue" : ""}`}
                >
                  {item.p.initials}
                </span>
                <div>
                  <h3>{item.p.name}</h3>
                  <button
                    className="text-btn"
                    onClick={() => inspect("person", item.p.id)}
                  >
                    Conferir perfil
                    <ArrowUpRight size={14} />
                  </button>
                </div>
                <strong className="person-score">
                  {components.length
                    ? components
                        .filter(
                          (c) =>
                            c.personId === item.p.id && c.roleId === item.id,
                        )
                        .reduce((n, c) => n + c.points, 0)
                    : ready
                      ? personScore(
                          state,
                          item.p.id,
                          item.id as "manager" | "specialist",
                        )
                      : "—"}
                  <small>pontos</small>
                </strong>
              </div>
              <div className="score-components">
                {components
                  .filter(
                    (c) => c.personId === item.p.id && c.roleId === item.id,
                  )
                  .map((c) => (
                    <ComponentBreakdown key={c.ruleId} component={c} />
                  ))}
              </div>
              <button
                className="availability-link"
                onClick={() => inspect("availability", item.p.id)}
              >
                <CalendarDays size={16} />
                {state.availability[item.p.id]?.confirmed
                  ? `${state.availability[item.p.id].capacity} h/semana disponíveis`
                  : "Agenda a confirmar"}
                <ArrowUpRight size={14} />
              </button>
            </div>
          </Panel>
        ))}
      </div>
      <details className="panel blockers">
        <summary>
          <AlertTriangle size={18} />
          Impedimentos explicáveis<span>Agenda e funções</span>
        </summary>
        <div className="panel-body grid-2">
          <div>
            <h3>Por que Bruno não entrou?</h3>
            <p>
              35 pontos aritméticos com Diego. Indisponível no período de
              execução exigido.
            </p>
            <button
              className="btn"
              data-testid="availability-p-bruno"
              onClick={() => inspect("availability", "p-bruno")}
            >
              Conferir agenda de Bruno
            </button>
          </div>
          <div>
            <h3>Diego nas duas funções</h3>
            <p>32 pontos aritméticos. O edital exige pessoas distintas.</p>
            <CommandButton
              className="btn"
              command={{
                type: "SELECT_TEAM",
                managerId: "p-diego",
                specialistId: "p-diego",
              }}
            >
              Tentar Diego nas duas funções
            </CommandButton>
          </div>
        </div>
      </details>
      <div className="action-bar">
        <div>
          <strong>
            {pmoOk
              ? "Composição conferida pelo PMO"
              : "Confirmação desta composição pelo PMO"}
          </strong>
          <p className="muted">
            Pessoas, funções, período e capacidade. A documentação opcional pode
            ser recuperada depois.
          </p>
        </div>
        {actor.role === "pmo" ? (
          <CommandButton
            className="btn btn-primary"
            data-testid="team-confirm-pmo"
            disabled={current === null || pmoOk}
            command={{
              type: "CONFIRM_TEAM_PMO",
              key: teamKey(state),
              availabilityRevision: state.availabilityRevision,
            }}
          >
            {pmoOk ? "Equipe confirmada" : "Confirmar esta equipe"}
            <Check size={16} />
          </CommandButton>
        ) : (
          <button className="btn" onClick={() => setActor("andre")}>
            Ver como PMO
            <ArrowRight size={16} />
          </button>
        )}
      </div>
      <p className="caption">
        Universo analisado: amostra desta demonstração ·{" "}
        {state.tender.universeVersion}. Resultado referente à amostra e às
        versões desta demonstração.
      </p>
    </div>
  );
}
function ComponentBreakdown({ component: c }: { component: ScoreComponent }) {
  const { state, inspect } = useDemo();
  return (
    <div className="component-group">
      <div>
        <span>
          {state.rules.find((r) => r.id === c.ruleId)?.title ?? c.ruleId}
        </span>
        <strong>{c.points} pts</strong>
      </div>
      <div className="proof-links">
        {c.evidenceIds.map((id) => {
          const e = state.evidence[id];
          return (
            <button key={id} onClick={() => inspect("evidence", id)}>
              <Link2 size={13} />
              {e.kind === "project"
                ? `+2 · ${e.project?.split(" — ")[0] ?? e.unitId}`
                : e.kind === "pmp"
                  ? "+10 · PMP"
                  : e.kind === "security"
                    ? "+6 · Security+"
                    : "+5 · Pós-graduação"}
              <ArrowUpRight size={12} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
function Recovery() {
  const { state, busy, command, navigate, inspect, setActor } = useDemo();
  const actor = state.actors[state.demo.actorId];
  const score = getCurrentScore(state);
  const statuses = {
    open: "A solicitar",
    requested: "Solicitado",
    received: "Documento recebido",
    verified: "Verificado · em análise",
    accepted: "Aceito no critério",
    rejected: "Não aceito",
  };
  return (
    <div className="stack">
      <div className="section-heading">
        <div>
          <h2>Recovery de provas</h2>
          <p className="muted">
            Participações conhecidas. O ponto depende da prova aceita.
          </p>
        </div>
        <button
          className="btn btn-primary"
          data-testid="team-recalculate"
          disabled={
            busy ||
            !state.tender.initialEvidenceAccepted ||
            actor.role !== "bids"
          }
          title={
            actor.role !== "bids"
              ? "O recálculo exige a visão Licitações."
              : undefined
          }
          onClick={() => void command({ type: "EVALUATE_TEAMS" })}
        >
          <RefreshCw size={17} />
          Recalcular equipe
        </button>
      </div>
      <ScoreSummary />
      {actor.role !== "bids" ? (
        <div className="notice">
          O aceite e o recálculo da equipe são decisões de Licitações.
          <button className="text-btn" onClick={() => setActor("juliana")}>
            Ver como Licitações
            <ArrowRight size={14} />
          </button>
        </div>
      ) : null}
      {state.evaluation.status === "stale" ? (
        <div className="notice notice-warning">
          <RefreshCw size={19} />
          <span>
            Prova aceita · recálculo necessário. O último cálculo permanece no
            histórico; o potencial será atualizado junto com a equipe.
          </span>
        </div>
      ) : null}
      {score === null && state.evaluation.status === "not_calculated" ? (
        <button
          className="btn"
          onClick={() => navigate(`${tenderPath}/criterios`)}
        >
          Conferir critérios e provas iniciais
        </button>
      ) : null}
      <div className="recovery-grid">
        {Object.values(state.recoveryTasks).map((task) => {
          const e = state.evidence[task.evidenceId];
          const accepted = task.status === "accepted",
            rejected = task.status === "rejected";
          return (
            <section
              className={`panel recovery-card ${accepted ? "recovery-accepted" : ""}`}
              key={task.id}
              data-testid={`recovery-${task.id}`}
            >
              <div className="recovery-card-heading">
                <span className="project-icon">
                  <BriefcaseBusiness size={20} />
                </span>
                <div className="recovery-card-title">
                  <h3>
                    {task.projectId === "CAR-G02"
                      ? "Projeto Aurora"
                      : "Projeto Vale do Sol"}
                  </h3>
                  <p>
                    Carla Mendes · participação gerencial · {task.projectId} ·
                    G-ENERGIA
                  </p>
                </div>
                <Status
                  tone={accepted ? "success" : rejected ? "danger" : "warning"}
                >
                  {statuses[task.status]}
                </Status>
                <div
                  className={`recovery-impact ${rejected ? "rejected" : ""}`}
                >
                  {accepted ? <Check size={15} /> : <Plus size={15} />}
                  <strong>
                    {accepted
                      ? "2 pontos com prova aceita"
                      : rejected
                        ? "Documento não pontuado"
                        : "2 pontos condicionados"}
                  </strong>
                </div>
              </div>
              <ol className="task-steps">
                {[
                  { name: "Solicitação a Carla", done: task.status !== "open" },
                  {
                    name: "Documento recebido",
                    done: e.document !== "missing",
                  },
                  {
                    name: "Verificação do RH",
                    done: e.document === "verified",
                  },
                  { name: "Aceite no edital", done: accepted },
                ].map((s, i) => (
                  <li key={s.name} className={s.done ? "done" : ""}>
                    <span>{s.done ? <Check size={12} /> : i + 1}</span>
                    {s.name}
                  </li>
                ))}
              </ol>
              <div className="recovery-actions">
                {task.status === "open" ? (
                  actor.role === "bids" ? (
                    <CommandButton
                      className="btn btn-primary"
                      command={{ type: "REQUEST_PROOF", taskId: task.id }}
                    >
                      Solicitar atestado
                      <ArrowRight size={15} />
                    </CommandButton>
                  ) : (
                    <button className="btn" onClick={() => setActor("juliana")}>
                      Ver como Licitações
                    </button>
                  )
                ) : null}
                <button
                  className={`btn ${task.status !== "open" && !accepted ? "btn-primary" : ""}`}
                  onClick={() => inspect("evidence", task.evidenceId)}
                >
                  {accepted
                    ? "Abrir trilha dos +2 pontos"
                    : e.document === "missing"
                      ? "Apresentar / revisar documento"
                      : "Conferir documento e decisão"}
                  <ArrowUpRight size={15} />
                </button>
              </div>
              <details className="task-detail-disclosure">
                <summary>Detalhes da solicitação</summary>
                <dl className="task-details">
                  <div>
                    <dt>Prova requerida</dt>
                    <dd>Atestado de participação gerencial</dd>
                  </div>
                  <div>
                    <dt>Responsável</dt>
                    <dd>Carla Mendes</dd>
                  </div>
                  <div>
                    <dt>Prazo interno fictício</dt>
                    <dd>27/10/2026, 15h</dd>
                  </div>
                  <div>
                    <dt>Fonte possível</dt>
                    <dd>Coordenação do projeto · exemplo local</dd>
                  </div>
                </dl>
              </details>
              {rejected ? (
                <p className="caption">
                  {e.reason ??
                    state.acceptances.find((a) => a.evidenceId === e.id)
                      ?.reason}
                </p>
              ) : null}
            </section>
          );
        })}
      </div>
      <div className="notice">
        <Link2 size={18} />
        <span>
          Receber e verificar não altera a nota. O ganho só entra no cálculo
          após o aceite de Licitações para esta regra e versão.
        </span>
      </div>
      <Panel title="Decisões e recálculos">
        <div className="panel-body">
          <AuditTimeline limit={5} />
        </div>
      </Panel>
      <div className="action-bar">
        <div>
          <strong>Da prova ao dossiê</strong>
          <p className="muted">
            Cada atestado mantém sua origem e sua decisão.
          </p>
        </div>
        <button
          className="btn"
          onClick={() => navigate(`${tenderPath}/dossie`)}
        >
          Revisar dossiê
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
