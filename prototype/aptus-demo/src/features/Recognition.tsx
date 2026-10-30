import { useState } from "react";
import {
  ArrowRight,
  Award,
  CalendarDays,
  FileClock,
  History,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { useDemo } from "../demo/context";

function displayTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
}

export function Recognition() {
  const { state, inspect, navigate } = useDemo();
  const actor = state.actors[state.demo.actorId];
  const [personId, setPersonId] = useState(
    actor?.personId && state.people[actor.personId] ? actor.personId : "p-eva",
  );
  const person = state.people[personId] ?? state.people["p-eva"];
  const entries = state.engagement.filter(
    (entry) => entry.personId === person.id,
  );
  const total = entries.reduce((sum, entry) => sum + entry.points, 0);
  const approved = state.dossier.approved;
  const pedroProof = Object.values(state.evidence).find(
    (e) => e.personId === "p-pedro" && e.kind === "pmp",
  );
  const policy = [
    ["Certificação comprovada", "+10"],
    ["Experiência antes ausente, com prova aceita", "+5"],
    ["Indicação interna confirmada", "+3"],
    ["Indicação externa aceita e qualificação verificada", "+8"],
    ["Correção relevante comprovada", "+3"],
  ];
  return (
    <div className="stack">
      <header className="page-heading">
        <div>
          <p className="eyebrow">MANUTENÇÃO CONTÍNUA</p>
          <h1>Minha participação</h1>
          <p className="muted">
            Contribuições reconhecidas pela atualização da Base Viva.
          </p>
        </div>
        <label className="field">
          <span>Participante da demonstração</span>
          <select
            aria-label="Participante da demonstração"
            value={person.id}
            onChange={(e) => setPersonId(e.target.value)}
          >
            {Object.values(state.people).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </header>
      <div className="grid-3">
        <section className="panel">
          <div className="panel-body stack">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span className="avatar">{person.initials}</span>
              <Award size={25} aria-hidden="true" />
            </div>
            <div>
              <p className="muted">{person.name} · outubro de 2026</p>
              <h2>Pontos de reconhecimento</h2>
              <div className="metric" data-testid="recognition-points">
                {total}
              </div>
              <p className="muted">
                Teto mensal: 30 pontos · {Math.max(0, 30 - total)} ainda
                disponíveis
              </p>
            </div>
            <progress
              value={Math.min(total, 30)}
              max={30}
              aria-label={`${total} de 30 pontos mensais de reconhecimento`}
              style={{
                width: "100%",
                height: 8,
                accentColor: "var(--brand-primary)",
              }}
            />
          </div>
        </section>
        <section className="panel">
          <div className="panel-body stack">
            <UserCheck size={25} aria-hidden="true" />
            <div>
              <h2>Contribuições validadas</h2>
              <div className="metric">{entries.length}</div>
              <p className="muted">
                Cada evento é contabilizado uma única vez, após a conferência
                elegível.
              </p>
            </div>
            <button
              className="btn btn-small"
              onClick={() => inspect("person", person.id)}
            >
              Abrir meu perfil <ArrowRight size={15} />
            </button>
          </div>
        </section>
        <section className="panel">
          <div className="panel-body stack">
            <ShieldCheck size={25} aria-hidden="true" />
            <h2>A nota técnica tem outra origem</h2>
            <p>
              <strong>Reconhecimento não altera a pontuação em editais.</strong>
            </p>
            <p className="muted">
              {approved
                ? `ENE-001 conserva o snapshot aprovado de ${approved.score} pontos da equipe-chave, com suas provas e versões.`
                : "A nota da equipe-chave depende exclusivamente das regras, das provas aceitas e da disponibilidade."}
            </p>
            <button
              className="btn btn-small"
              onClick={() => navigate("/oportunidades/ENE-001/dossie")}
            >
              Ver dossiê do cenário <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </div>
      <section
        className="panel"
        data-testid="recognition-history"
        aria-labelledby="recognition-history-title"
      >
        <div className="panel-header">
          <div>
            <h2 id="recognition-history-title">Histórico de contribuições</h2>
            <p className="muted">
              Somente contribuições validadas de {person.name}.
            </p>
          </div>
          <History size={20} aria-hidden="true" />
        </div>
        {entries.length ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Contribuição</th>
                  <th>Conferência</th>
                  <th>Reconhecimento</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <strong>{entry.description}</strong>
                      <small className="muted" style={{ display: "block" }}>
                        Registro {entry.id} · contribuição validada
                      </small>
                    </td>
                    <td>
                      {displayTime(entry.at)}
                      <small className="muted" style={{ display: "block" }}>
                        Horário da demonstração
                      </small>
                    </td>
                    <td>
                      <span className="tag tag-success">
                        <Award size={15} /> +{entry.points} pontos
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <Award size={30} />
            <h3>Nenhuma contribuição validada neste mês</h3>
            <p className="muted">
              Abrir uma tela, responder a uma campanha ou enviar um arquivo não
              concede pontos por si só.
            </p>
            <button className="btn" onClick={() => navigate("/descoberta")}>
              Conhecer a campanha Security+ <ArrowRight size={15} />
            </button>
          </div>
        )}
      </section>
      <div className="grid-2">
        <section className="panel">
          <div className="panel-header">
            <h2>Próximas atualizações</h2>
            <CalendarDays size={20} aria-hidden="true" />
          </div>
          <div className="panel-body stack">
            <div className="notice">
              <CalendarDays size={20} />
              <div>
                <strong>Revisão de perfil</strong>
                <p>
                  Confira experiências, competências e disponibilidade. A
                  revisão a cada 90 dias é uma política demonstrativa
                  configurada.
                </p>
                <button
                  className="btn btn-small"
                  onClick={() => inspect("person", person.id)}
                >
                  Conferir meu perfil
                </button>
              </div>
            </div>
            <div className="notice notice-warning">
              <FileClock size={20} />
              <div>
                <strong>Exemplo de vencimento · Pedro Rocha</strong>
                <p>
                  PMP com validade encerrada em 30/09/2026. Documento verificado
                  não significa credencial vigente.
                </p>
                {pedroProof && (
                  <button
                    className="btn btn-small"
                    onClick={() => inspect("evidence", pedroProof.id)}
                  >
                    Abrir credencial vencida <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>
            <p className="muted">
              Alertas de 90 e 30 dias são exemplos da política desta
              demonstração; não representam exigência legal ou serviço de
              agendamento ativo.
            </p>
          </div>
        </section>
        <section className="panel">
          <div className="panel-header">
            <h2>Política demonstrativa</h2>
            <Sparkles size={20} aria-hidden="true" />
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Contribuição elegível</th>
                  <th>Pontos</th>
                </tr>
              </thead>
              <tbody>
                {policy.map(([name, points]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>
                      <strong>{points}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="panel-body">
            <p className="muted">
              Teto de 30 pontos no mês. Os projetos recuperados de Carla já eram
              conhecidos: o Recovery não gera +5 por “nova experiência”. Não há
              ranking público ou remuneração associada.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
