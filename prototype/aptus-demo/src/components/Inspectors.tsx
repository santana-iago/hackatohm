import { useState } from "react";
import {
  FileText,
  Link2,
  Check,
  UserRound,
  CalendarDays,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useDemo } from "../demo/context";
import { getDocument } from "../demo/documents";
import { Dialog, Status, CommandButton, handleTabListKeyDown } from "./ui";
import type { Evidence } from "../demo/types";
const information = {
  detected: "Detectada",
  declared: "Declarada",
  confirmed: "Confirmada pelo titular",
  contested: "Contestada",
};
const documents = {
  missing: "Ausente",
  received: "Recebido",
  reviewing: "Em verificação",
  verified: "Verificado",
  rejected: "Rejeitado",
};
const validity = {
  valid: "Válida na data",
  expired: "Vencida na data",
  na: "Não se aplica",
  unknown: "Desconhecida",
};
export function EvidenceInspector({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const { state, busy, setActor, command } = useDemo();
  const [source, setSource] = useState(false),
    [choose, setChoose] = useState(false),
    [reason, setReason] = useState(
      "O documento não comprova a participação gerencial neste projeto.",
    );
  const e = state.evidence[id];
  if (!e) return null;
  const actor = state.actors[state.demo.actorId];
  const acceptance = state.acceptances.find(
    (a) =>
      a.evidenceId === id &&
      a.ruleVersion === state.tender.ruleVersion &&
      a.ruleId === e.ruleId,
  );
  const task = Object.values(state.recoveryTasks).find(
    (t) => t.evidenceId === id,
  );
  const person = state.people[e.personId];
  const rule = state.rules.find((r) => r.id === e.ruleId);
  const doc = getDocument(e);
  const accepted = acceptance?.decision === "accepted";
  const rejected = acceptance?.decision === "rejected";
  const switchTo = (id: string, label: string) => (
    <button className="btn btn-small" onClick={() => setActor(id)}>
      Ver como {label}
      <ArrowRight size={14} />
    </button>
  );
  return (
    <Dialog
      title="Trilha da evidência"
      onClose={onClose}
      wide
      variant="preview"
    >
      <div className="evidence-layout">
        <div className="stack">
          <div>
            <p className="eyebrow">
              {person?.name} · {e.unitId}
            </p>
            <h3>{e.title}</h3>
            <p className="caption">{e.filename}</p>
          </div>
          <div className="evidence-states">
            <div>
              <small>Informação</small>
              <Status
                tone={e.information === "confirmed" ? "success" : "neutral"}
              >
                {information[e.information]}
              </Status>
            </div>
            <div>
              <small>Documento</small>
              <Status
                tone={
                  e.document === "rejected"
                    ? "danger"
                    : e.document === "verified"
                      ? "neutral"
                      : "warning"
                }
              >
                {documents[e.document]}
              </Status>
            </div>
            <div>
              <small>Vigência</small>
              <Status
                tone={
                  e.validity === "expired"
                    ? "danger"
                    : e.validity === "unknown"
                      ? "warning"
                      : "neutral"
                }
              >
                {validity[e.validity]}
              </Status>
            </div>
            <div>
              <small>Uso neste edital</small>
              <Status
                tone={accepted ? "success" : rejected ? "danger" : "warning"}
              >
                {accepted ? "Aceito" : rejected ? "Não aceito" : "Em análise"}
              </Status>
            </div>
          </div>
          <div className="point-trail">
            <div>
              <span>
                <Link2 size={17} />
              </span>
              <section>
                <small>Regra</small>
                <strong>
                  {rule
                    ? `${rule.id} · ${rule.title}`
                    : "Atualização para novas oportunidades"}
                </strong>
                <p>
                  {rule?.description ??
                    "Esta credencial não integra o universo fechado de ENE-001."}
                </p>
              </section>
            </div>
            <div>
              <span>
                <UserRound size={17} />
              </span>
              <section>
                <small>Participação</small>
                <strong>{person?.name}</strong>
                <p>
                  {e.project ??
                    (e.kind === "project"
                      ? "Projeto identificado pela unidade"
                      : "Titular da credencial")}{" "}
                  · {e.unitId}
                </p>
              </section>
            </div>
            <div>
              <span>
                <FileText size={17} />
              </span>
              <section>
                <small>Documento</small>
                <strong>{e.title}</strong>
                <p>
                  {e.kind === "project" || e.kind === "postgraduate"
                    ? "Sem prazo de validade aplicável à regra"
                    : `Validade: ${e.validUntil ?? "a confirmar"}`}
                </p>
                <button className="text-btn" onClick={() => setSource(!source)}>
                  {source ? "Recolher fonte" : "Abrir fonte"}
                  <ArrowRight size={14} />
                </button>
              </section>
            </div>
            <div>
              <span>
                <ShieldCheck size={17} />
              </span>
              <section>
                <small>Aceite no edital</small>
                <strong>
                  {accepted
                    ? "Juliana Ramos · Licitações"
                    : rejected
                      ? "Prova não aceita"
                      : "Aguardando decisão específica"}
                </strong>
                <p>
                  {acceptance
                    ? `${acceptance.ruleVersion} · ${acceptance.decidedAt}`
                    : "Conferência de RH e aceite no edital são decisões distintas."}
                </p>
                {acceptance?.reason ? <p>{acceptance.reason}</p> : null}
              </section>
            </div>
          </div>
          {e.reason ? (
            <div className="notice notice-warning">
              <AlertCircle size={18} />
              {e.reason}
            </div>
          ) : null}
          <div className="inspector-actions">
            {task ? (
              <>
                {e.document === "missing" ? (
                  <>
                    <p className="muted">
                      Informação pendente de comprovação. O atestado ainda não
                      foi apresentado.
                    </p>
                    {task.status === "open" ? (
                      actor.role === "bids" ? (
                        <CommandButton
                          className="btn btn-primary"
                          command={{ type: "REQUEST_PROOF", taskId: task.id }}
                        >
                          Solicitar atestado
                        </CommandButton>
                      ) : (
                        switchTo("juliana", "Licitações")
                      )
                    ) : actor.id === e.personId ? (
                      <button
                        className="btn btn-primary"
                        disabled={busy}
                        data-testid={`evidence-receive-${id}`}
                        onClick={() => setChoose(true)}
                      >
                        Apresentar documento de exemplo
                      </button>
                    ) : (
                      switchTo(e.personId, person.name)
                    )}
                  </>
                ) : null}
                {e.document === "received" || e.document === "reviewing" ? (
                  <>
                    <div className="notice notice-warning">
                      Documento recebido. A pontuação ainda não mudou.
                    </div>
                    {actor.role === "hr" ? (
                      <CommandButton
                        className="btn btn-primary"
                        data-testid={`evidence-verify-${id}`}
                        command={{
                          type: "VERIFY_EVIDENCE",
                          evidenceId: id,
                          result: true,
                          reason:
                            "Titular, projeto e participação gerencial conferidos no documento de exemplo.",
                        }}
                      >
                        Verificar documento
                      </CommandButton>
                    ) : (
                      switchTo("beatriz", "RH")
                    )}
                  </>
                ) : null}
                {e.document === "verified" && !accepted && !rejected ? (
                  <>
                    <div className="notice">
                      Documento verificado. Uso neste edital em análise.
                    </div>
                    {actor.role === "bids" ? (
                      <>
                        <CommandButton
                          className="btn btn-primary"
                          data-testid={`evidence-accept-${id}`}
                          command={{
                            type: "ACCEPT_EVIDENCE_FOR_RULE",
                            evidenceId: id,
                            ruleId: e.ruleId!,
                            ruleVersion: state.tender.ruleVersion,
                          }}
                        >
                          Aceitar prova para este critério
                        </CommandButton>
                        <details>
                          <summary>Não aceitar esta prova</summary>
                          <label className="field">
                            Motivo da rejeição
                            <textarea
                              className="resize-none"
                              value={reason}
                              onChange={(ev) => setReason(ev.target.value)}
                            />
                          </label>
                          <CommandButton
                            className="btn btn-danger"
                            disabled={!reason.trim()}
                            command={{
                              type: "REJECT_EVIDENCE_FOR_RULE",
                              evidenceId: id,
                              ruleId: e.ruleId!,
                              reason,
                            }}
                          >
                            Rejeitar prova
                          </CommandButton>
                        </details>
                      </>
                    ) : (
                      switchTo("juliana", "Licitações")
                    )}
                  </>
                ) : null}
                {accepted ? (
                  <div className="notice notice-success">
                    <Check size={18} />
                    {state.evaluation.status === "stale"
                      ? "Prova aceita para este critério. Recalcule a equipe."
                      : "Prova aceita para este critério e versão."}
                  </div>
                ) : null}
                {rejected ? (
                  <div className="notice notice-warning">
                    {acceptance.reason} A outra prova válida foi preservada.
                  </div>
                ) : null}
              </>
            ) : (
              <p className="caption">
                {e.verifiedBy
                  ? `Conferência RH: ${state.actors[e.verifiedBy]?.name ?? e.verifiedBy} · ${e.verifiedAt ?? "26/10/2026"}`
                  : "A verificação ocorre no fluxo de atualização da base."}
              </p>
            )}
          </div>
          <p className="caption">
            Documento v{e.version} ·{" "}
            {e.exportAllowed
              ? "Permissão de exportação disponível"
              : "Exportação não permitida para o destinatário"}{" "}
            · Dados fictícios
          </p>
        </div>
        {source ? (
          <MockDocument document={doc} />
        ) : (
          <div className="evidence-preview">
            <FileText size={38} />
            <h3>Da informação ao ponto.</h3>
            <p>
              Confira o documento e acompanhe a decisão para a regra, pessoa e
              projeto correspondentes.
            </p>
            <button className="btn" onClick={() => setSource(true)}>
              Abrir documento de exemplo
            </button>
            <small>Texto acessível · fonte local</small>
          </div>
        )}
      </div>
      {choose ? (
        <div className="example-selector">
          <h3>Documentos de exemplo disponíveis</h3>
          <label className="radio-choice">
            <input type="radio" defaultChecked name="proof" />
            <FileText size={22} />
            <span>
              <strong>{e.filename}</strong>
              <small>
                {person.name} · {e.unitId} · atestado demonstrativo
              </small>
            </span>
          </label>
          <button
            className="btn btn-primary"
            disabled={busy}
            onClick={async () => {
              await command({
                type: "RECEIVE_EVIDENCE",
                evidenceId: id,
                documentFixtureId: e.documentFixtureId,
              });
              setChoose(false);
            }}
          >
            Usar este documento de exemplo
          </button>
          <button className="btn" onClick={() => setChoose(false)}>
            Cancelar seleção
          </button>
        </div>
      ) : null}
    </Dialog>
  );
}
export function MockDocument({
  document,
}: {
  document: ReturnType<typeof getDocument>;
}) {
  const [page, setPage] = useState(0);
  const data = document.pages[page];
  if (!data) return null;
  const parts = data.highlight ? data.text.split(data.highlight) : [data.text];
  return (
    <div className="mock-document">
      <div className="document-toolbar">
        <FileText size={16} />
        <strong>Documento de exemplo</strong>
        <span>
          Página {page + 1} de {document.pages.length}
        </span>
      </div>
      <article className="document-page">
        <div className="doc-brand">
          NEXORA <span>ACERVO DEMONSTRATIVO</span>
        </div>
        <p className="doc-watermark">DEMONSTRAÇÃO · DADOS FICTÍCIOS</p>
        <h3>{data.title}</h3>
        <p>
          {parts.map((p, i) => (
            <span key={i}>
              {i > 0 ? <mark>{data.highlight}</mark> : null}
              {p}
            </span>
          ))}
        </p>
        <p className="doc-footer">
          Documento sintético do protótipo APTUS. Sem validade documental.
        </p>
      </article>
      {document.pages.length > 1 ? (
        <div className="document-pagination">
          <button
            className="btn btn-small"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>
          <span>
            {page + 1} / {document.pages.length}
          </span>
          <button
            className="btn btn-small"
            disabled={page === document.pages.length - 1}
            onClick={() => setPage(page + 1)}
          >
            Próxima
          </button>
        </div>
      ) : null}
    </div>
  );
}
export function PersonInspector({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const { state, inspect, setActor } = useDemo();
  const [tab, setTab] = useState("Resumo");
  const p = state.people[id];
  if (!p) return null;
  const evidence = Object.values(state.evidence).filter(
    (e) => e.personId === id,
  );
  const a = state.availability[id];
  const actor = state.actors[state.demo.actorId];
  return (
    <Dialog
      title={`Perfil · ${p.name}`}
      onClose={onClose}
      wide
      variant="inspector"
    >
      <div className="profile-heading">
        <span className="avatar avatar-large">{p.initials}</span>
        <div>
          <h3>{p.name}</h3>
          <p className="muted">
            {p.area} · Currículo v{p.profileVersion}
          </p>
        </div>
        <Status tone={p.updateStatus === "verified" ? "success" : "warning"}>
          {p.updateStatus === "verified"
            ? "Revisão concluída"
            : "Atualização pendente"}
        </Status>
      </div>
      <div
        className="subtabs"
        onKeyDown={handleTabListKeyDown}
        role="tablist"
        aria-label="Seções do perfil"
      >
        {["Resumo", "Experiências", "Documentos", "Agenda"].map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={t === tab}
            tabIndex={t === tab ? 0 : -1}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="stack">
        {tab === "Resumo" ? (
          <>
            <p className="muted">
              Perfil sintético da amostra Nexora. Última revisão: {p.lastReview}
              .
            </p>
            <div className="skills">
              {p.competencies.map((c) => (
                <span className="skill" key={c}>
                  {c}
                </span>
              ))}
            </div>
            {id === "p-carla" && p.updateStatus !== "verified" ? (
              <div className="profile-review">
                <h3>Nova versão de currículo · v2</h3>
                <p>
                  Origem: atualização de exemplo apresentada por Carla. Aurora e
                  Vale do Sol já eram participações conhecidas; seus atestados
                  ainda exigem aceite específico.
                </p>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Campo</th>
                      <th>Antes</th>
                      <th>Atualização</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Projetos no currículo</td>
                      <td>Serra Norte</td>
                      <td>Serra Norte, Aurora e Vale do Sol</td>
                    </tr>
                    <tr>
                      <td>Titular</td>
                      <td>Carla Mendes</td>
                      <td>Carla Mendes · mesmo perfil</td>
                    </tr>
                  </tbody>
                </table>
                {p.updateStatus === "pending" ? (
                  actor.id === id ? (
                    <CommandButton
                      className="btn btn-primary"
                      command={{ type: "CONFIRM_PROFILE_UPDATE", personId: id }}
                    >
                      Confirmar meus dados como titular
                    </CommandButton>
                  ) : (
                    <button className="btn" onClick={() => setActor(id)}>
                      Ver como Carla · confirmar titular
                    </button>
                  )
                ) : actor.role === "hr" ? (
                  <CommandButton
                    className="btn btn-primary"
                    command={{ type: "VERIFY_PROFILE_UPDATE", personId: id }}
                  >
                    Aprovar atualização como RH
                  </CommandButton>
                ) : (
                  <button className="btn" onClick={() => setActor("beatriz")}>
                    Ver como RH · revisar atualização
                  </button>
                )}
                <p className="caption">
                  A revisão do currículo não concede pontos e não cria outro
                  profissional.
                </p>
              </div>
            ) : (
              <div className="notice">
                Informações e documentos possuem revisões independentes.
                Ausências permanecem a confirmar.
              </div>
            )}
          </>
        ) : null}
        {tab === "Experiências" ? (
          <>
            {evidence
              .filter((e) => e.kind === "project")
              .map((e) => (
                <EvidenceRow
                  key={e.id}
                  e={e}
                  onClick={() => inspect("evidence", e.id)}
                />
              ))}
            {!evidence.some((e) => e.kind === "project") ? (
              <p className="muted">
                Experiências relevantes aceitas para este cenário: não
                informadas.
              </p>
            ) : null}
          </>
        ) : null}
        {tab === "Documentos"
          ? evidence.map((e) => (
              <EvidenceRow
                key={e.id}
                e={e}
                onClick={() => inspect("evidence", e.id)}
              />
            ))
          : null}
        {tab === "Agenda" ? (
          <>
            <p className="muted">
              Período exigido: 02/11/2026 a 29/01/2027, inclusive.
            </p>
            <div className="metric">
              {a?.capacity === null || !a
                ? "A confirmar"
                : `${a.capacity} h/semana`}
            </div>
            <button className="btn" onClick={() => inspect("availability", id)}>
              <CalendarDays size={17} />
              Conferir disponibilidade
            </button>
          </>
        ) : null}
      </div>
    </Dialog>
  );
}
function EvidenceRow({ e, onClick }: { e: Evidence; onClick: () => void }) {
  return (
    <button className="evidence-row" onClick={onClick}>
      <span className="file-icon">
        <FileText size={20} />
      </span>
      <span>
        <strong>{e.title}</strong>
        <small>
          {e.unitId} ·{" "}
          {e.kind === "project"
            ? "Participação identificada"
            : "Credencial de exemplo"}
        </small>
      </span>
      <Status
        tone={
          e.validity === "expired" || e.document === "rejected"
            ? "danger"
            : e.document === "missing"
              ? "warning"
              : "neutral"
        }
      >
        {e.validity === "expired" ? "Vencido" : documents[e.document]}
      </Status>
      <ArrowRight size={16} />
    </button>
  );
}
export function AvailabilityInspector({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const { state } = useDemo();
  const p = state.people[id],
    a = state.availability[id];
  if (!p) return null;
  const required = id === state.selectedTeam.managerId ? 32 : 20;
  return (
    <Dialog title="Disponibilidade e capacidade" onClose={onClose}>
      <div className="stack">
        <div className="profile-heading">
          <span className="avatar">{p.initials}</span>
          <div>
            <h3>{p.name}</h3>
            <p className="muted">{p.area}</p>
          </div>
        </div>
        <div className="period-box">
          <CalendarDays size={20} />
          <div>
            <strong>02 nov 2026 → 29 jan 2027</strong>
            <p>Todo o período exigido · inclusive</p>
          </div>
        </div>
        <div className="capacity-grid">
          <div>
            <small>Capacidade restante</small>
            <strong>
              {a?.capacity === null || !a ? "A confirmar" : `${a.capacity} h`}
            </strong>
            <span>por semana</span>
          </div>
          <div>
            <small>Carga proposta</small>
            <strong>{required} h</strong>
            <span>por semana</span>
          </div>
        </div>
        <Status tone={!a?.confirmed || !a?.capacity ? "warning" : "success"}>
          {id === "p-bruno"
            ? "Indisponível no período de execução exigido."
            : a?.confirmed
              ? "Agenda individual conferida"
              : "Agenda a confirmar"}
        </Status>
        {id === "p-bruno" ? (
          <div className="notice notice-warning">
            Um compromisso existente cobre todo o intervalo. Capacidade
            restante: 0 h/semana. A pontuação aritmética não torna esta
            composição válida.
          </div>
        ) : null}
        <dl className="details-list">
          <div>
            <dt>Conferido por</dt>
            <dd>André Costa · PMO</dd>
          </div>
          <div>
            <dt>Conferência do cenário</dt>
            <dd>26/10/2026</dd>
          </div>
          <div>
            <dt>Válida até</dt>
            <dd>27/10/2026, 18h</dd>
          </div>
        </dl>
        <p className="muted">
          A conferência individual e a confirmação do uso pela composição são
          decisões distintas. A confirmação representa esta proposta
          demonstrativa.
        </p>
      </div>
    </Dialog>
  );
}
