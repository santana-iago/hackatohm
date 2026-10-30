import {
  ArrowRight,
  Award,
  BadgeCheck,
  Check,
  Circle,
  FileCheck2,
  FileText,
  Lightbulb,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useDemo } from "../demo/context";

export function Discovery() {
  const { state, command, inspect, setActor, navigate, busy } = useDemo();
  const campaign = state.campaigns["campaign-security"];
  const proof = state.evidence["ev-lia-sec"];
  const actor = state.actors[state.demo.actorId];
  const isLia = actor?.personId === "p-lia";
  const isHr = actor?.role === "hr";
  const declared =
    proof.information === "confirmed" ||
    (campaign && campaign.status !== "open");
  const received = proof.document !== "missing";
  const verified = proof.document === "verified";
  const recognition = state.engagement.filter((e) => e.personId === "p-lia");
  const steps = [
    {
      label: "Indício identificado",
      text: "Reembolso de exame a confirmar",
      done: true,
    },
    {
      label: "Confirmação da titular",
      text: declared ? "Lia confirmou a certificação" : "Aguardando Lia",
      done: declared,
    },
    {
      label: "Comprovante apresentado",
      text: received
        ? "Registro demonstrativo recebido"
        : "Ainda não apresentado",
      done: received,
    },
    {
      label: "Verificação de RH",
      text: verified
        ? "Competência comprovada no perfil"
        : "Uso interno, sem aceite em ENE-001",
      done: verified,
    },
  ];
  return (
    <div className="stack">
      <header className="page-heading">
        <div>
          <p className="eyebrow">BASE EM MOVIMENTO</p>
          <h1>Descoberta</h1>
          <p className="muted">
            Revelar competências que ainda não aparecem no currículo.
          </p>
        </div>
        <span className={`tag ${verified ? "tag-success" : "tag-warning"}`}>
          {verified ? <BadgeCheck size={15} /> : <Search size={15} />}
          {verified ? "Campanha concluída" : "Campanha ativa"}
        </span>
      </header>
      <section
        className="panel"
        data-testid="campaign-security"
        aria-labelledby="campaign-title"
      >
        <div className="panel-header">
          <div>
            <p className="eyebrow">CAMPANHA · SECURITY+</p>
            <h2 id="campaign-title">
              Ampliar a base de especialistas com Security+
            </h2>
            <p className="muted">
              Diego e Eva já possuem a qualificação registrada. Esta campanha
              procura informações ainda ausentes.
            </p>
          </div>
          <span className="avatar" aria-hidden="true">
            LC
          </span>
        </div>
        <div className="panel-body stack">
          <div className="notice">
            <Lightbulb size={21} />
            <div>
              <strong>Um indício, uma pergunta para Lia.</strong>
              <p>
                Há um reembolso de exame associado a Lia Costa. Pagamento de
                exame não comprova aprovação: precisamos da confirmação da
                titular e do documento.
              </p>
            </div>
          </div>
          <div className="grid-2">
            <div className="stack">
              <div className="person-row">
                <span className="avatar">LC</span>
                <div>
                  <h3>Lia Costa</h3>
                  <p className="muted">
                    Segurança da informação · Security+ ainda não registrada no
                    currículo inicial
                  </p>
                </div>
              </div>
              <ol className="progress-list">
                {steps.map((step, index) => (
                  <li key={step.label}>
                    <span className={`tag ${step.done ? "tag-success" : ""}`}>
                      {step.done ? <Check size={15} /> : <Circle size={13} />}{" "}
                      {index + 1}
                    </span>
                    <div>
                      <strong>{step.label}</strong>
                      <p className="muted">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <section
              className="panel growth-action-panel"
              aria-labelledby="lia-action-title"
            >
              <div className="panel-body stack">
                <h3 id="lia-action-title">
                  {verified
                    ? "Uma nova prova na Base Viva"
                    : !declared
                      ? "Convite para confirmar a informação"
                      : !received
                        ? "Apresentar o comprovante"
                        : "Conferência da credencial"}
                </h3>
                {!declared && (
                  <>
                    <p>
                      “Lia, você possui Security+ vigente? Confirme a informação
                      e apresente um comprovante para atualização do seu
                      perfil.”
                    </p>
                    {isLia ? (
                      <button
                        className="btn btn-primary"
                        data-testid="campaign-respond"
                        disabled={busy}
                        onClick={() =>
                          void command({
                            type: "RESPOND_TO_CAMPAIGN",
                            campaignId: campaign.id,
                            personId: "p-lia",
                          })
                        }
                      >
                        <UserCheck size={17} /> Confirmar certificação
                      </button>
                    ) : (
                      <>
                        <p className="muted">
                          Somente Lia pode confirmar a própria informação nesta
                          visão demonstrativa.
                        </p>
                        <button
                          className="btn"
                          onClick={() => setActor("p-lia")}
                        >
                          Ver como Lia
                        </button>
                      </>
                    )}
                  </>
                )}
                {declared && !received && (
                  <>
                    <span className="tag tag-success">
                      <UserCheck size={15} /> Confirmada pela titular
                    </span>
                    <p>
                      A declaração está registrada. A competência ainda precisa
                      de comprovação.
                    </p>
                    <button
                      className="btn"
                      onClick={() => inspect("evidence", proof.id)}
                    >
                      <FileText size={17} /> Ver documento de exemplo disponível
                    </button>
                    {isLia ? (
                      <button
                        className="btn btn-primary"
                        data-testid="evidence-receive-ev-lia-sec"
                        disabled={busy}
                        onClick={() =>
                          void command({
                            type: "RECEIVE_EVIDENCE",
                            evidenceId: proof.id,
                            documentFixtureId: proof.documentFixtureId,
                          })
                        }
                      >
                        <FileText size={17} /> Apresentar comprovante de exemplo
                      </button>
                    ) : (
                      <button className="btn" onClick={() => setActor("p-lia")}>
                        Ver como Lia para apresentar
                      </button>
                    )}
                  </>
                )}
                {received && !verified && (
                  <>
                    <span className="tag tag-warning">
                      <FileText size={15} /> Documento recebido · RH pendente
                    </span>
                    <p>
                      Credencial_SecurityPlus_Lia_DEMO.pdf · titular Lia Costa ·
                      validade fictícia até 01/08/2029.
                    </p>
                    <button
                      className="btn"
                      onClick={() => inspect("evidence", proof.id)}
                    >
                      <FileText size={17} /> Conferir identidade e documento
                    </button>
                    {isHr ? (
                      <button
                        className="btn btn-primary"
                        data-testid="evidence-verify-ev-lia-sec"
                        disabled={busy}
                        onClick={() =>
                          void command({
                            type: "VERIFY_EVIDENCE",
                            evidenceId: proof.id,
                            result: true,
                            reason:
                              "Identidade, registro demonstrativo e validade conferidos por Beatriz Souza.",
                          })
                        }
                      >
                        <ShieldCheck size={17} /> Verificar comprovante de Lia
                      </button>
                    ) : (
                      <>
                        <p className="muted">
                          A verificação pertence ao RH; a confirmação de Lia não
                          substitui essa conferência.
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
                {verified && (
                  <>
                    <span className="tag tag-success">
                      <FileCheck2 size={16} /> Documento verificado pelo RH
                    </span>
                    <p>
                      Security+ comprovada no perfil de Lia. Sua agenda continua{" "}
                      <strong>A confirmar</strong>.
                    </p>
                    <div className="notice notice-success">
                      <Award size={21} />
                      <div>
                        <strong>
                          {recognition.reduce(
                            (total, e) => total + e.points,
                            0,
                          )}{" "}
                          pontos de reconhecimento
                        </strong>
                        <p>
                          Nova credencial verificada, registrada uma única vez.
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => inspect("person", "p-lia")}
                    >
                      Ver perfil atualizado <ArrowRight size={16} />
                    </button>
                  </>
                )}
              </div>
            </section>
          </div>
          <div className="notice">
            <ShieldCheck size={20} />
            <div>
              <strong>Atualização para próximas oportunidades.</strong>
              <p>
                O certificado de Lia não seleciona uma equipe, não confirma
                agenda e não altera o dossiê fechado de ENE-001. Reconhecimento
                não altera a pontuação em editais.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="btn" onClick={() => navigate("/connect")}>
          Conhecer uma indicação no Connect <ArrowRight size={16} />
        </button>
        <button className="btn" onClick={() => navigate("/pessoas")}>
          Voltar à Base Viva
        </button>
      </div>
    </div>
  );
}
