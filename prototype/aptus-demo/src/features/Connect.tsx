import { useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Check,
  Copy,
  FileText,
  Link2,
  MailPlus,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { useDemo } from "../demo/context";

export function Connect() {
  const { state, command, inspect, setActor, navigate, loadScene, busy } =
    useDemo();
  const referral = state.referrals["referral-marina"];
  const proof = state.evidence["ev-marina-cloud"];
  const actor = state.actors[state.demo.actorId];
  const external = state.demo.sceneId === "connect-external";
  const [consent, setConsent] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const inviteInput = useRef<HTMLInputElement>(null);
  const invitation = `${window.location.origin}${window.location.pathname}?scene=connect-external&guest=1`;
  const isMarina = actor?.personId === "p-marina";
  const isHr = actor?.role === "hr";
  const accepted = referral.status !== "pending";
  const received = proof.document !== "missing";
  const verified = proof.document === "verified";
  const validated = referral.status === "validated";
  const lucas = state.people["p-lucas"];
  const copyInvite = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard indisponível");
      await navigator.clipboard.writeText(invitation);
      setCopyMessage(
        "Convite de demonstração copiado. Nenhuma mensagem foi enviada.",
      );
    } catch {
      inviteInput.current?.focus();
      inviteInput.current?.select();
      setCopyMessage(
        "Texto selecionado. Use ⌘C ou Ctrl+C para copiar o convite local.",
      );
    }
  };
  return (
    <div className="stack">
      <header className="page-heading">
        <div>
          <p className="eyebrow">CONHECIMENTO POR CONEXÕES</p>
          <h1>Connect</h1>
          <p className="muted">
            Uma indicação abre uma conversa com o titular e uma conferência com
            RH.
          </p>
        </div>
        {!external && (
          <button
            className="btn"
            onClick={() => void loadScene("connect-external")}
          >
            <MailPlus size={17} /> Criar convite local de exemplo
          </button>
        )}
      </header>
      {external ? (
        <>
          <div className="notice notice-warning">
            <Link2 size={21} />
            <div>
              <strong>Variante externa · cena isolada.</strong>
              <p>
                Este convite usa dados fictícios. Restaurar o percurso principal
                remove Lucas da amostra base.
              </p>
            </div>
          </div>
          <section className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">CONVITE LOCAL · INVITE-LUCAS</p>
                <h2>Lucas Azevedo</h2>
                <p className="muted">
                  Indicado externo · arquitetura de soluções
                </p>
              </div>
              <span className={`tag ${lucas ? "tag-success" : "tag-warning"}`}>
                <UserCheck size={15} />
                {lucas ? "Participação aceita" : "Aceite pendente"}
              </span>
            </div>
            <div className="panel-body stack">
              <p>
                Um convite permite que Lucas aceite participar e apresente seus
                dados fictícios. Até esse aceite, ele não integra o diretório de
                profissionais.
              </p>
              <label className="field">
                <span>Convite de demonstração</span>
                <input
                  ref={inviteInput}
                  readOnly
                  value={invitation}
                  onFocus={(e) => e.target.select()}
                />
              </label>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn" onClick={() => void copyInvite()}>
                  <Copy size={17} /> Copiar convite de demonstração
                </button>
                <button className="btn" onClick={() => setActor("p-lucas")}>
                  Abrir visão do convidado
                </button>
              </div>
              {copyMessage && (
                <p className="notice" role="status">
                  {copyMessage}
                </p>
              )}
              {!lucas && (
                <section className="panel">
                  <div className="panel-body stack">
                    <h3>Aceite do convidado</h3>
                    <p>
                      Dados de exemplo: Lucas Azevedo · arquitetura de soluções
                      · profissional externo. Vínculo e disponibilidade ainda
                      não foram conferidos.
                    </p>
                    {actor?.id === "p-lucas" ? (
                      <>
                        <label
                          className="field"
                          style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                          />{" "}
                          Aceito participar desta demonstração com os dados
                          fictícios apresentados.
                        </label>
                        <div>
                          <button
                            className="btn btn-primary"
                            data-testid="external-invite-accept"
                            disabled={!consent || busy}
                            onClick={() =>
                              void command({
                                type: "ACCEPT_EXTERNAL_INVITE",
                                inviteId: "invite-lucas",
                              })
                            }
                          >
                            <UserCheck size={17} /> Aceitar convite e apresentar
                            dados
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="muted">
                        Abra a visão do convidado para realizar o aceite. Não há
                        cadastro profissional antes dessa decisão.
                      </p>
                    )}
                  </div>
                </section>
              )}
              {lucas && (
                <div className="notice notice-success">
                  <UserCheck size={22} />
                  <div>
                    <strong>Lucas aparece como externo no diretório.</strong>
                    <p>
                      Vínculo e agenda pendentes. Aceite não equivale a
                      contratação. Nenhum ponto foi atribuído: não há
                      qualificação verificada nesta variante mínima.
                    </p>
                    <button
                      className="btn btn-small"
                      onClick={() => inspect("person", lucas.id)}
                    >
                      Ver perfil externo <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
          <button className="btn" onClick={() => void loadScene("connect")}>
            Restaurar percurso principal do Connect
          </button>
        </>
      ) : (
        <>
          <section
            className="panel"
            data-testid="referral-marina"
            aria-labelledby="referral-title"
          >
            <div className="panel-header">
              <div>
                <p className="eyebrow">
                  INDICAÇÃO INTERNA · COMPETÊNCIA DE NUVEM
                </p>
                <h2 id="referral-title">Eva indicou Marina Torres</h2>
                <p className="muted">
                  “Marina possui conhecimento de arquitetura em nuvem ainda não
                  registrado no perfil.”
                </p>
              </div>
              <span
                className={`tag ${validated ? "tag-success" : "tag-warning"}`}
              >
                {validated ? <BadgeCheck size={15} /> : <Users size={15} />}
                {validated
                  ? "Indicação validada"
                  : !accepted
                    ? "Aguardando aceite"
                    : "Em conferência"}
              </span>
            </div>
            <div className="panel-body stack">
              <div className="grid-2">
                <div className="stack">
                  <div className="person-row">
                    <span className="avatar">EL</span>
                    <div>
                      <h3>Eva Lima</h3>
                      <p className="muted">
                        Indicadora · segurança da informação
                      </p>
                    </div>
                    <ArrowRight size={20} aria-hidden="true" />
                    <span className="avatar">MT</span>
                    <div>
                      <h3>Marina Torres</h3>
                      <p className="muted">Pessoa indicada · nuvem</p>
                    </div>
                  </div>
                  <ol className="progress-list">
                    <li>
                      <span className="tag tag-success">
                        <Check size={15} /> 1
                      </span>
                      <div>
                        <strong>Indicação registrada</strong>
                        <p className="muted">
                          Eva identifica um conhecimento útil para a base.
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className={`tag ${accepted ? "tag-success" : ""}`}>
                        <UserCheck size={15} /> 2
                      </span>
                      <div>
                        <strong>Marina aceita participar</strong>
                        <p className="muted">
                          {accepted
                            ? "Aceite da própria indicada registrado."
                            : "A indicação depende da confirmação de Marina."}
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className={`tag ${verified ? "tag-success" : ""}`}>
                        <ShieldCheck size={15} /> 3
                      </span>
                      <div>
                        <strong>RH verifica a credencial</strong>
                        <p className="muted">
                          {verified
                            ? "Arquitetura de soluções em nuvem comprovada."
                            : "Documento de exemplo e titular precisam ser conferidos."}
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className={`tag ${validated ? "tag-success" : ""}`}>
                        <BadgeCheck size={15} /> 4
                      </span>
                      <div>
                        <strong>
                          Indicação validada de forma independente
                        </strong>
                        <p className="muted">
                          Eva não aprova a própria indicação.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
                <section className="panel growth-action-panel">
                  <div className="panel-body stack">
                    <h3>
                      {validated
                        ? "Perfil atualizado para novas oportunidades"
                        : !accepted
                          ? "O próximo passo é de Marina"
                          : !received
                            ? "Apresentar a credencial"
                            : !verified
                              ? "Conferir o documento"
                              : "Validar a indicação"}
                    </h3>
                    {!accepted && (
                      <>
                        <p>
                          Marina pode confirmar a indicação antes de apresentar
                          qualquer documento.
                        </p>
                        {isMarina ? (
                          <button
                            className="btn btn-primary"
                            data-testid="referral-accept"
                            disabled={busy}
                            onClick={() =>
                              void command({
                                type: "ACCEPT_REFERRAL",
                                referralId: referral.id,
                                personId: "p-marina",
                              })
                            }
                          >
                            <UserCheck size={17} /> Aceitar indicação
                          </button>
                        ) : (
                          <>
                            <p className="muted">
                              Somente a própria indicada pode realizar o aceite.
                            </p>
                            <button
                              className="btn"
                              onClick={() => setActor("p-marina")}
                            >
                              Ver como Marina
                            </button>
                          </>
                        )}
                      </>
                    )}
                    {accepted && !received && (
                      <>
                        <span className="tag tag-success">
                          <UserCheck size={15} /> Aceite de Marina registrado
                        </span>
                        <p>
                          Credencial demonstrativa “Arquitetura de soluções em
                          nuvem”, do Instituto Horizonte de Tecnologia —
                          fictício.
                        </p>
                        <button
                          className="btn"
                          onClick={() => inspect("evidence", proof.id)}
                        >
                          <FileText size={17} /> Ver exemplo disponível
                        </button>
                        {isMarina ? (
                          <button
                            className="btn btn-primary"
                            data-testid="evidence-receive-ev-marina-cloud"
                            disabled={busy}
                            onClick={() =>
                              void command({
                                type: "RECEIVE_EVIDENCE",
                                evidenceId: proof.id,
                                documentFixtureId: proof.documentFixtureId,
                              })
                            }
                          >
                            <FileText size={17} /> Apresentar credencial de
                            exemplo
                          </button>
                        ) : (
                          <button
                            className="btn"
                            onClick={() => setActor("p-marina")}
                          >
                            Ver como Marina para apresentar
                          </button>
                        )}
                      </>
                    )}
                    {received && !verified && (
                      <>
                        <span className="tag tag-warning">
                          <FileText size={15} /> Documento recebido
                        </span>
                        <p>
                          Titular Marina Torres · identificação
                          DEMO-CLOUD-MARINA-001 · validade fictícia até
                          15/08/2029.
                        </p>
                        <button
                          className="btn"
                          onClick={() => inspect("evidence", proof.id)}
                        >
                          <FileText size={17} /> Conferir documento de Marina
                        </button>
                        {isHr ? (
                          <button
                            className="btn btn-primary"
                            data-testid="evidence-verify-ev-marina-cloud"
                            disabled={busy}
                            onClick={() =>
                              void command({
                                type: "VERIFY_EVIDENCE",
                                evidenceId: proof.id,
                                result: true,
                                reason:
                                  "Titularidade, credencial demonstrativa de nuvem e validade conferidas por RH.",
                              })
                            }
                          >
                            <ShieldCheck size={17} /> Verificar credencial de
                            Marina
                          </button>
                        ) : (
                          <button
                            className="btn"
                            onClick={() => setActor("beatriz")}
                          >
                            Ver como RH
                          </button>
                        )}
                      </>
                    )}
                    {verified && !validated && (
                      <>
                        <span className="tag tag-success">
                          <ShieldCheck size={15} /> Credencial verificada ·
                          Marina +10
                        </span>
                        <p>
                          A nova credencial já está comprovada no perfil. A
                          validação independente da indicação registra a
                          contribuição de Eva.
                        </p>
                        {isHr ? (
                          <button
                            className="btn btn-primary"
                            data-testid="referral-validate"
                            disabled={busy}
                            onClick={() =>
                              void command({
                                type: "VALIDATE_REFERRAL",
                                referralId: referral.id,
                              })
                            }
                          >
                            <BadgeCheck size={17} /> Validar indicação de Eva
                          </button>
                        ) : (
                          <>
                            <p className="muted">
                              Somente RH pode validar; Eva não pode aprovar a
                              própria indicação.
                            </p>
                            <button
                              className="btn"
                              onClick={() => setActor("beatriz")}
                            >
                              Ver como RH
                            </button>
                          </>
                        )}
                      </>
                    )}
                    {validated && (
                      <>
                        <div className="notice notice-success">
                          <Award size={23} />
                          <div>
                            <strong>
                              Contribuições diferentes, registros separados.
                            </strong>
                            <p>
                              Marina: +10 pela credencial comprovada.
                              <br />
                              Eva: +3 pela indicação interna confirmada.
                            </p>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => inspect("person", "p-marina")}
                        >
                          Ver perfil de Marina <ArrowRight size={16} />
                        </button>
                        <button
                          className="btn"
                          onClick={() => navigate("/participacao")}
                        >
                          Ver reconhecimento
                        </button>
                      </>
                    )}
                  </div>
                </section>
              </div>
              <div className="notice">
                <ShieldCheck size={20} />
                <div>
                  <strong>Perfil atualizado para novas oportunidades.</strong>
                  <p>
                    A qualificação de nuvem não faz parte das regras de ENE-001.
                    Esta indicação não altera a equipe, a nota técnica ou o
                    dossiê aprovado.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <p className="muted">
            Toda comunicação é representada localmente. Nenhum convite ou
            mensagem é enviado por esta aplicação.
          </p>
        </>
      )}
    </div>
  );
}
