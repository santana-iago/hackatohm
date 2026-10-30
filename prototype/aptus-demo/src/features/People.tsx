import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  FileClock,
  FileText,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useDemo } from "../demo/context";
import type { DemoState, Person } from "../demo/types";

type DirectoryFilter = "all" | "pending" | "expired" | "availability";

function personPending(state: DemoState, person: Person) {
  return (
    (person.id === "p-carla" && person.updateStatus !== "verified") ||
    Object.values(state.evidence).some(
      (e) =>
        e.personId === person.id &&
        (e.document !== "verified" || e.validity === "expired"),
    ) ||
    !state.availability[person.id]?.confirmed
  );
}

function DirectoryStatus({
  state,
  person,
}: {
  state: DemoState;
  person: Person;
}) {
  const proofs = Object.values(state.evidence).filter(
    (e) => e.personId === person.id,
  );
  if (proofs.some((e) => e.validity === "expired"))
    return (
      <span className="tag tag-danger">
        <FileClock size={14} /> Documento vencido
      </span>
    );
  if (proofs.some((e) => e.document === "rejected"))
    return (
      <span className="tag tag-danger">
        <X size={14} /> Documento rejeitado
      </span>
    );
  if (person.id === "p-carla" && person.updateStatus !== "verified")
    return (
      <span className="tag tag-warning">
        <FileText size={14} /> Currículo v2 em revisão
      </span>
    );
  if (
    proofs.some((e) => e.document === "received" || e.document === "reviewing")
  )
    return (
      <span className="tag tag-warning">
        <FileText size={14} /> Verificação pendente
      </span>
    );
  if (proofs.some((e) => e.document === "missing"))
    return (
      <span className="tag tag-warning">
        <FileText size={14} /> Comprovação pendente
      </span>
    );
  if (!state.availability[person.id]?.confirmed)
    return (
      <span className="tag tag-warning">
        <CalendarDays size={14} /> Agenda a confirmar
      </span>
    );
  return (
    <span className="tag tag-success">
      <BadgeCheck size={14} /> Revisão registrada
    </span>
  );
}

export function People() {
  const { state, command, inspect, setActor, busy } = useDemo();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DirectoryFilter>("all");
  const [reviewOpen, setReviewOpen] = useState(
    state.demo.sceneId === "base-viva",
  );
  const [reviewed, setReviewed] = useState(false);
  const [hrReviewed, setHrReviewed] = useState(false);
  const carla = state.people["p-carla"];
  const actor = state.actors[state.demo.actorId];
  const people = useMemo(
    () =>
      Object.values(state.people).filter((person) => {
        const haystack =
          `${person.name} ${person.area} ${person.competencies.join(" ")}`
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("pt-BR");
        const term = search
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLocaleLowerCase("pt-BR");
        if (!haystack.includes(term)) return false;
        if (filter === "pending") return personPending(state, person);
        if (filter === "expired")
          return Object.values(state.evidence).some(
            (e) => e.personId === person.id && e.validity === "expired",
          );
        if (filter === "availability")
          return !state.availability[person.id]?.confirmed;
        return true;
      }),
    [state, search, filter],
  );
  const isCarla = actor?.personId === "p-carla";
  const isHr = actor?.role === "hr";
  return (
    <div className="stack">
      <header className="page-heading">
        <div>
          <p className="eyebrow">CONHECIMENTO CORPORATIVO</p>
          <h1>Base Viva</h1>
          <p className="muted">
            Pessoas, experiências e documentos ligados à sua origem.
          </p>
        </div>
        <button
          className="btn"
          onClick={() => {
            setReviewOpen(true);
            setReviewed(false);
          }}
        >
          <FileClock size={17} /> Revisar atualização de Carla
        </button>
      </header>

      {reviewOpen && (
        <section className="panel" aria-labelledby="profile-review-title">
          <div className="panel-header">
            <div>
              <p className="eyebrow">REVISÃO DE PERFIL · CARLA MENDES</p>
              <h2 id="profile-review-title">Uma atualização, o mesmo perfil</h2>
            </div>
            <button
              className="btn btn-small"
              aria-label="Fechar revisão de currículo"
              onClick={() => setReviewOpen(false)}
            >
              <X size={17} /> Fechar
            </button>
          </div>
          <div className="panel-body stack">
            <p className="muted">
              Origem: Currículo_Carla_v2_DEMO.pdf · recebido em 27/10/2026, às
              09:45. Os projetos Aurora e Vale do Sol já constavam em fontes
              internas fictícias.
            </p>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Campo conferido</th>
                    <th>Currículo anterior · v1</th>
                    <th>Nova versão · v2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Titular</th>
                    <td>Carla Mendes</td>
                    <td>
                      Carla Mendes{" "}
                      <span className="tag">
                        <Check size={13} /> Mesmo perfil
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Formação</th>
                    <td>PMP e pós-graduação</td>
                    <td>PMP e pós-graduação preservados</td>
                  </tr>
                  <tr>
                    <th scope="row">Experiências descritas</th>
                    <td>Serra Norte</td>
                    <td>Serra Norte, Aurora e Vale do Sol</td>
                  </tr>
                  <tr>
                    <th scope="row">Provas de Aurora e Vale do Sol</th>
                    <td>Ausentes</td>
                    <td>Continuam pendentes de atestado aceito</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="notice">
              <ShieldCheck size={19} />
              <div>
                A atualização do currículo registra informações. Ela não cria
                outra pessoa, não aceita provas no edital e não altera os pontos
                da equipe-chave.
              </div>
            </div>
            {carla.updateStatus === "pending" && (
              <div className="stack">
                {isCarla ? (
                  <>
                    <label
                      className="field"
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <input
                        type="checkbox"
                        checked={reviewed}
                        onChange={(e) => setReviewed(e.target.checked)}
                      />{" "}
                      Sou Carla nesta simulação e conferi a identidade e os
                      campos acima.
                    </label>
                    <div>
                      <button
                        className="btn btn-primary"
                        data-testid="profile-confirm"
                        disabled={!reviewed || busy}
                        onClick={() =>
                          void command({
                            type: "CONFIRM_PROFILE_UPDATE",
                            personId: carla.id,
                          })
                        }
                      >
                        <Check size={17} /> Confirmar meus dados
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="notice notice-warning">
                    <Users size={19} />
                    <div>
                      A confirmação de titularidade é feita por Carla na visão
                      Colaborador.{" "}
                      <button
                        className="btn btn-small"
                        onClick={() => setActor("p-carla")}
                      >
                        Ver como Carla
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {carla.updateStatus === "confirmed" && (
              <div className="stack">
                <span className="tag tag-success">
                  <Check size={14} /> Titularidade confirmada por Carla ·
                  conferência RH pendente
                </span>
                {isHr ? (
                  <>
                    <label
                      className="field"
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <input
                        type="checkbox"
                        checked={hrReviewed}
                        onChange={(e) => setHrReviewed(e.target.checked)}
                      />{" "}
                      Conferi a identidade, a origem e a correspondência dos
                      campos.
                    </label>
                    <div>
                      <button
                        className="btn btn-primary"
                        data-testid="profile-verify"
                        disabled={!hrReviewed || busy}
                        onClick={() =>
                          void command({
                            type: "VERIFY_PROFILE_UPDATE",
                            personId: carla.id,
                          })
                        }
                      >
                        <ShieldCheck size={17} /> Aprovar atualização como RH
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="notice">
                    <ShieldCheck size={19} />
                    <div>
                      A próxima conferência cabe a Beatriz, do RH.{" "}
                      <button
                        className="btn btn-small"
                        onClick={() => {
                          setHrReviewed(false);
                          setActor("beatriz");
                        }}
                      >
                        Ver como RH
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {carla.updateStatus === "verified" && (
              <div className="notice notice-success">
                <BadgeCheck size={21} />
                <div>
                  <strong>
                    Currículo v{carla.profileVersion} revisado por RH.
                  </strong>
                  <p>
                    Origem e revisão registradas no perfil único de Carla. As
                    provas dos projetos seguem seus próprios estados.
                  </p>
                  <button
                    className="btn btn-small"
                    onClick={() => inspect("person", carla.id)}
                  >
                    Abrir perfil de Carla <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="panel" aria-labelledby="directory-title">
        <div className="panel-header">
          <div>
            <h2 id="directory-title">Diretório de profissionais</h2>
            <p className="muted">
              {Object.keys(state.people).length} perfis sintéticos · nenhuma
              consulta a sistema de RH
            </p>
          </div>
          <span className="tag">
            <Users size={15} /> Amostra da demonstração
          </span>
        </div>
        <div
          className="panel-body"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "end",
          }}
        >
          <label className="field" style={{ flex: "1 1 280px" }}>
            <span>Buscar por nome ou competência</span>
            <div style={{ position: "relative" }}>
              <Search
                size={17}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  color: "var(--text-secondary)",
                }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nome, segurança, energia…"
                style={{ paddingLeft: 38, width: "100%" }}
              />
            </div>
          </label>
          <label className="field" style={{ minWidth: 210 }}>
            <span>Filtrar perfis</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as DirectoryFilter)}
            >
              <option value="all">Todos os perfis</option>
              <option value="pending">Com pendências</option>
              <option value="expired">Documento vencido</option>
              <option value="availability">Agenda a confirmar</option>
            </select>
          </label>
          {(filter !== "all" || search) && (
            <button
              className="btn"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
            >
              Limpar filtros
            </button>
          )}
        </div>
        {people.length ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Profissional</th>
                  <th>Área e competências</th>
                  <th>Última revisão</th>
                  <th>Situação documental</th>
                  <th>Disponibilidade</th>
                  <th>
                    <span className="muted">Perfil</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {people.map((person) => {
                  const availability = state.availability[person.id];
                  return (
                    <tr key={person.id}>
                      <td>
                        <button
                          className="person-row"
                          onClick={() => inspect("person", person.id)}
                          style={{
                            background: "none",
                            border: 0,
                            color: "inherit",
                            padding: 0,
                            textAlign: "left",
                            cursor: "pointer",
                          }}
                        >
                          <span className="avatar">{person.initials}</span>
                          <span>
                            <strong>{person.name}</strong>
                            <small
                              className="muted"
                              style={{ display: "block" }}
                            >
                              {person.external
                                ? "Externo · vínculo pendente"
                                : `Perfil v${person.profileVersion}`}
                            </small>
                          </span>
                        </button>
                      </td>
                      <td>
                        <strong>{person.area}</strong>
                        <small
                          className="muted"
                          style={{ display: "block", maxWidth: 250 }}
                        >
                          {person.competencies.length
                            ? person.competencies.join(" · ")
                            : "Competências a confirmar"}
                        </small>
                      </td>
                      <td>{person.lastReview || "Não informado"}</td>
                      <td>
                        <DirectoryStatus state={state} person={person} />
                      </td>
                      <td>
                        <button
                          className="btn btn-small"
                          data-testid={
                            person.id === "p-bruno"
                              ? "availability-p-bruno"
                              : undefined
                          }
                          onClick={() => inspect("availability", person.id)}
                        >
                          <CalendarDays size={15} />
                          {availability?.confirmed
                            ? availability.capacity === 0
                              ? "Indisponível · 0 h"
                              : `${availability.capacity} h/semana`
                            : "A confirmar"}
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-small"
                          aria-label={`Abrir perfil de ${person.name}`}
                          onClick={() => inspect("person", person.id)}
                        >
                          <ArrowRight size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <Search size={30} />
            <h3>Nenhum perfil corresponde à busca</h3>
            <p className="muted">
              A amostra contém dez perfis iniciais. Tente outro nome,
              competência ou filtro.
            </p>
            <button
              className="btn"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>
      <p className="muted">
        Informações ausentes permanecem “Não informado” ou “A confirmar”. Um
        documento verificado pode continuar pendente de aceite para um edital
        específico.
      </p>
    </div>
  );
}
