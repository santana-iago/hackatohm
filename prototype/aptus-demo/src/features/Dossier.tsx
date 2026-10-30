import { useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Download,
  FileCheck2,
  FileText,
  Link2,
  ShieldCheck,
} from "lucide-react";
import { useDemo } from "../demo/context";
import { canExportDossier, getDossierChecklist } from "../demo/selectors";
import { buildDossierPdf, DOSSIER_FILENAME } from "../export/dossierPdf";
import type { DossierSnapshot } from "../demo/types";

const ruleNames: Record<string, string> = {
  "G-PMP": "PMP vigente",
  "G-POS": "Pós-graduação",
  "G-ENERGIA": "Projetos de energia",
  "E-SEC": "Security+ vigente",
  "E-PROJETOS": "Projetos de segurança",
};

export function Dossier() {
  const demo = useDemo();
  const { state, command, inspect, setActor, generation, busy, runActivity } =
    demo;
  const latest = useRef(state);
  latest.current = state;
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const checklist = getDossierChecklist(state);
  const actor = state.actors[state.demo.actorId];
  const approved = state.dossier.approved;
  const preview = state.dossier.preview;
  const snapshot: DossierSnapshot | null =
    approved &&
    approved.inputRevision === preview?.inputRevision &&
    approved.version === preview.version
      ? approved
      : preview || approved;
  const current =
    state.evaluation.status === "current" && !!state.evaluation.selected;
  const reviewAllowed =
    !!preview &&
    current &&
    preview.inputRevision === state.inputRevision &&
    !state.dossier.reviewed;
  const exportAllowed = canExportDossier(state);
  const allRequired = checklist.every((item) => !item.required || item.status);
  const approvedIsCurrent =
    approved && approved.inputRevision === state.inputRevision && exportAllowed;

  async function download() {
    if (
      !approved ||
      !exportAllowed ||
      actor.role !== "bids" ||
      busy ||
      exporting
    )
      return;
    const token = generation();
    const revision = state.inputRevision;
    const scene = state.demo.sceneId;
    setExporting(true);
    setExportError("");
    try {
      await runActivity(async () => {
        const blob = await buildDossierPdf(approved);
        const active = latest.current;
        if (
          generation() !== token ||
          active.inputRevision !== revision ||
          active.demo.sceneId !== scene ||
          active.dossier.approved?.id !== approved.id ||
          active.actors[active.demo.actorId]?.role !== "bids" ||
          !canExportDossier(active)
        )
          return;
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = DOSSIER_FILENAME;
        document.body.append(anchor);
        anchor.click();
        anchor.remove();
        // Revocation follows the browser download handoff; it never mutates a scene.
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        await command({
          type: "RECORD_DOSSIER_EXPORT",
          snapshotId: approved.id,
          filename: DOSSIER_FILENAME,
        });
      });
    } catch (error) {
      if (generation() === token)
        setExportError(
          error instanceof Error
            ? error.message
            : "Não foi possível gerar o resumo local. Tente novamente.",
        );
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="stack">
      <header className="page-heading">
        <div>
          <p className="eyebrow">NEXORA · PROPOSTAS TÉCNICAS</p>
          <h1>Dossiê da equipe-chave</h1>
          <p className="muted">
            Conteúdo revisado, memória de cálculo e provas da composição.
          </p>
        </div>
        <button
          className="btn"
          data-testid="dossier-prepare"
          disabled={busy || !current || actor.role !== "bids"}
          onClick={() => void command({ type: "PREPARE_DOSSIER" })}
        >
          <FileText size={17} />
          {preview ? "Atualizar prévia" : "Preparar dossiê"}
        </button>
      </header>

      {!current && (
        <div className="notice notice-warning">
          <AlertCircle size={20} />
          <div>
            <strong>
              {state.evaluation.status === "stale"
                ? "Recálculo necessário"
                : "Equipe atual ainda não confirmada"}
            </strong>
            <p>
              Prepare a prévia com uma avaliação atual e válida. O histórico
              permanece disponível.
            </p>
            <button
              className="btn btn-small"
              onClick={() => demo.navigate("/oportunidades/ENE-001/equipe")}
            >
              Conferir equipe <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
      {approved && !exportAllowed && (
        <div className="notice notice-warning">
          <ShieldCheck size={20} />
          <div>
            <strong>Snapshot preservado · exportação atual bloqueada</strong>
            <p>
              Uma dependência, permissão ou versão exige nova revisão. O
              conteúdo aprovado anteriormente não foi reescrito.
            </p>
          </div>
        </div>
      )}
      {exportError && (
        <div className="notice notice-warning" role="alert">
          <AlertCircle size={19} />
          <span>{exportError}</span>
        </div>
      )}

      <div className="dossier-layout">
        <section className="panel" aria-labelledby="dossier-preview-title">
          <div className="panel-header">
            <div>
              <p className="eyebrow">PRÉVIA EDITORIAL</p>
              <h2 id="dossier-preview-title">Resumo demonstrativo</h2>
            </div>
            <span
              className={`tag ${approvedIsCurrent ? "tag-success" : "tag-warning"}`}
            >
              <FileCheck2 size={14} />
              {approvedIsCurrent
                ? `Snapshot aprovado · v${approved.version}`
                : snapshot
                  ? "Em revisão"
                  : "Ainda não preparado"}
            </span>
          </div>
          {snapshot ? (
            <article className="document-page dossier-document">
              <div className="dossier-brand">
                <div>
                  <strong>NEXORA</strong>
                  <p>Propostas técnicas · Aptus</p>
                </div>
                <span>ENE-001</span>
              </div>
              <p className="document-demo-label">
                Demonstração · dados fictícios
              </p>
              <p className="eyebrow">ESCOPO · EQUIPE-CHAVE</p>
              <h2>Modernização de operações de energia</h2>
              <p className="muted">Consórcio Horizonte Energia — fictício</p>
              <div className="dossier-score">
                <strong>{snapshot.score}</strong>
                <div>
                  <b>Pontos da equipe-chave</b>
                  <p className="muted">
                    Resultado referente à amostra e às versões desta
                    demonstração.
                  </p>
                </div>
              </div>
              <dl className="dossier-facts">
                <div>
                  <dt>Gerente de projeto</dt>
                  <dd>{snapshot.team.manager} · 32 h/semana</dd>
                </div>
                <div>
                  <dt>Especialista em segurança</dt>
                  <dd>{snapshot.team.specialist} · 20 h/semana</dd>
                </div>
                <div>
                  <dt>Período exigido</dt>
                  <dd>{snapshot.window}</dd>
                </div>
                <div>
                  <dt>Regras e universo</dt>
                  <dd>
                    {snapshot.ruleVersion}
                    <br />
                    {snapshot.universeVersion}
                  </dd>
                </div>
              </dl>
              <p>{snapshot.texts.scope}</p>
              <h3>Memória de cálculo</h3>
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Profissional e critério</th>
                      <th>Pontos</th>
                      <th>Origem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {snapshot.components.map((component) => (
                      <tr key={`${component.personId}-${component.ruleId}`}>
                        <td>
                          <strong>
                            {component.roleId === "manager"
                              ? snapshot.team.manager
                              : snapshot.team.specialist}
                          </strong>
                          <small className="muted" style={{ display: "block" }}>
                            {component.ruleId} ·{" "}
                            {ruleNames[component.ruleId] || component.ruleId}
                          </small>
                        </td>
                        <td>
                          <strong>{component.points}</strong>
                        </td>
                        <td>
                          <button
                            className="btn btn-small"
                            onClick={() =>
                              component.evidenceIds[0] &&
                              inspect("evidence", component.evidenceIds[0])
                            }
                          >
                            <Link2 size={14} /> Trilha do ponto
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h3>Currículos direcionados</h3>
              <h4>{snapshot.team.manager}</h4>
              <p>{snapshot.texts.managerCv}</p>
              <h4>{snapshot.team.specialist}</h4>
              <p>{snapshot.texts.specialistCv}</p>
              <h3>Índice de evidências</h3>
              <p className="muted">
                O resumo contém o índice; os documentos originais não estão
                anexados.
              </p>
              <ul className="dossier-evidence-list">
                {snapshot.evidence.map((evidence) => (
                  <li key={evidence.id}>
                    <button onClick={() => inspect("evidence", evidence.id)}>
                      <FileText size={16} />
                      <span>
                        <strong>{evidence.title}</strong>
                        <small>
                          {evidence.person} · {evidence.unitId} · v
                          {evidence.version}
                        </small>
                      </span>
                      <ArrowRight size={15} />
                    </button>
                  </li>
                ))}
              </ul>
              <footer className="muted">
                <p>
                  Snapshot {snapshot.id} · revisão de entradas{" "}
                  {snapshot.inputRevision} · versão {snapshot.version}
                </p>
                <p>
                  {snapshot.approvedAt
                    ? `Aprovado em ${snapshot.approvedAt}`
                    : "Conteúdo em revisão. Ainda não aprovado para exportação."}
                </p>
                <p>Demonstração · dados fictícios</p>
              </footer>
            </article>
          ) : (
            <div className="empty-state">
              <FileText size={34} />
              <h3>As provas formam o documento</h3>
              <p className="muted">
                A prévia será composta pelos fatos aceitos da equipe avaliada. O
                checklist indica os próximos passos.
              </p>
            </div>
          )}
        </section>

        <aside className="stack dossier-review">
          <section className="panel">
            <div className="panel-header">
              <h2>Conferência para aprovação</h2>
              <ShieldCheck size={20} />
            </div>
            <div className="panel-body stack">
              <ul className="checklist" data-testid="dossier-checklist">
                {checklist.map((item) => (
                  <li key={item.id}>
                    <span
                      className={
                        item.status
                          ? "checklist-icon success"
                          : "checklist-icon pending"
                      }
                    >
                      {item.status ? (
                        <Check size={17} />
                      ) : (
                        <AlertCircle size={17} />
                      )}
                    </span>
                    <div>
                      <strong>{item.label}</strong>
                      <small className="muted" style={{ display: "block" }}>
                        {item.reason}
                      </small>
                      {!item.required && (
                        <small className="muted">Opcional</small>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {actor.role !== "bids" && (
                <div className="notice notice-warning">
                  <ShieldCheck size={17} />
                  <div>
                    A revisão dos textos e a aprovação final cabem a Juliana, de
                    Licitações.
                    <p>
                      <button
                        className="btn btn-small"
                        onClick={() => setActor("juliana")}
                      >
                        Ver como Licitações
                      </button>
                    </p>
                  </div>
                </div>
              )}
              <button
                className="btn"
                data-testid="dossier-review-texts"
                disabled={busy || actor.role !== "bids" || !reviewAllowed}
                onClick={() => void command({ type: "REVIEW_DOSSIER" })}
              >
                <Check size={17} />
                {state.dossier.reviewed
                  ? "Textos conferidos por Licitações"
                  : "Conferi os textos desta prévia"}
              </button>
              <button
                className="btn btn-primary"
                data-testid="dossier-approve"
                disabled={
                  busy ||
                  actor.role !== "bids" ||
                  !preview ||
                  !allRequired ||
                  !!approvedIsCurrent
                }
                onClick={() =>
                  preview &&
                  void command({
                    type: "APPROVE_DOSSIER",
                    version: preview.version,
                  })
                }
              >
                <FileCheck2 size={17} />
                {approvedIsCurrent
                  ? "Dossiê da equipe aprovado"
                  : "Aprovar dossiê da equipe"}
              </button>
              {!allRequired && (
                <p className="muted">
                  Conclua os itens obrigatórios indicados antes da aprovação.
                </p>
              )}
            </div>
          </section>
          <section className="panel">
            <div className="panel-header">
              <h2>Resumo local em PDF</h2>
            </div>
            <div className="panel-body stack">
              <p>
                Quatro páginas com equipe, cálculo, currículos e índice das
                provas preservadas no snapshot.
              </p>
              <button
                className="btn btn-primary"
                data-testid="dossier-export"
                disabled={
                  !exportAllowed || actor.role !== "bids" || busy || exporting
                }
                onClick={() => void download()}
              >
                <Download size={17} />
                {exporting
                  ? "Preparando PDF local…"
                  : "Baixar resumo do dossiê (.pdf)"}
              </button>
              <p className="muted">
                Aprovação e permissões atuais são exigidas. Nenhum envio será
                realizado.
              </p>
              {state.dossier.exports.some(
                (item) => item.snapshotId === approved?.id,
              ) && (
                <div className="notice notice-success">
                  <Check size={18} />
                  <div>
                    Resumo do dossiê exportado. Nenhum envio foi realizado.
                  </div>
                </div>
              )}
            </div>
          </section>
          {state.dossier.history.length > 0 && (
            <details className="panel">
              <summary className="panel-header">
                Histórico preservado · {state.dossier.history.length}{" "}
                versão(ões)
              </summary>
              <div className="panel-body stack">
                {state.dossier.history.map((item) => (
                  <p key={item.id}>
                    <strong>
                      v{item.version} · {item.score} pontos
                    </strong>
                    <br />
                    <small className="muted">
                      {item.ruleVersion} · {item.approvedAt}
                      <br />
                      {item.id}
                    </small>
                  </p>
                ))}
              </div>
            </details>
          )}
        </aside>
      </div>
    </div>
  );
}
