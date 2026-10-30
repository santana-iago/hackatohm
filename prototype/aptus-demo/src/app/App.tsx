import { useEffect, useState } from "react";
import {
  Home as HomeIcon,
  Users,
  BriefcaseBusiness,
  Radar,
  Network,
  Award,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Clapperboard,
  Info,
  ArrowRight,
} from "lucide-react";
import { useDemo } from "../demo/context";
import { DemoController } from "../components/DemoController";
import { Dialog, Status } from "../components/ui";
import {
  EvidenceInspector,
  PersonInspector,
  AvailabilityInspector,
} from "../components/Inspectors";
import { Home, Opportunities, Tender } from "../features/Tender";
import { People } from "../features/People";
import { Discovery } from "../features/Discovery";
import { Connect } from "../features/Connect";
import { Recognition } from "../features/Recognition";
import { routeTitle } from "./routes";
const nav = [
  { path: "/inicio", name: "Hoje", id: "home", icon: HomeIcon },
  { path: "/pessoas", name: "Base Viva", id: "people", icon: Users },
  {
    path: "/oportunidades",
    name: "Oportunidades",
    id: "opportunities",
    icon: BriefcaseBusiness,
  },
  { path: "/descoberta", name: "Descoberta", id: "discovery", icon: Radar },
  { path: "/connect", name: "Connect", id: "connect", icon: Network },
  {
    path: "/participacao",
    name: "Minha participação",
    id: "recognition",
    icon: Award,
  },
];
export function App() {
  const {
    state,
    busy,
    navigate,
    setActor,
    closeInspector,
    inspect,
    generation,
  } = useDemo();
  const [collapsed, setCollapsed] = useState(false),
    [demoOpen, setDemoOpen] = useState(false),
    [searchOpen, setSearchOpen] = useState(false),
    [about, setAbout] = useState(false),
    [query, setQuery] = useState("");
  const epoch = generation();
  useEffect(() => {
    setSearchOpen(false);
    setAbout(false);
    setQuery("");
    document.querySelector("main")?.scrollTo(0, 0);
  }, [epoch]);
  const route = state.demo.route;
  const actor = state.actors[state.demo.actorId];
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    if (window.innerWidth < 1024) setCollapsed(true);
    const toolbar = document.querySelector(".toolbar");
    if (!toolbar) return;
    const observer = new ResizeObserver(() =>
      document.documentElement.style.setProperty(
        "--toolbar-height",
        `${(toolbar as HTMLElement).offsetHeight}px`,
      ),
    );
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, []);
  const people = Object.values(state.people).filter((p) =>
    `${p.name} ${p.competencies.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Ir para o conteúdo
      </a>
      <aside className="sidebar" aria-label="Navegação principal">
        <a
          aria-label="Aptus · início"
          className="product-brand"
          href="#/inicio"
          onClick={(e) => {
            e.preventDefault();
            navigate("/inicio");
          }}
        >
          <img src="./brand/aptus.svg" alt="" />
          <span>Aptus</span>
        </a>
        <div className="workspace">
          <span className="workspace-icon">N</span>
          <div>
            <strong>Nexora</strong>
            <small>Workspace corporativo</small>
          </div>
        </div>
        <div className="nav-label">Biblioteca</div>
        <nav aria-label="Biblioteca">
          {nav.slice(0, 3).map((item) => (
            <a
              key={item.id}
              href={`#${item.path}`}
              aria-label={item.name}
              data-testid={`nav-${item.id}`}
              aria-current={route.startsWith(item.path) ? "page" : undefined}
              className={route.startsWith(item.path) ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
            >
              <item.icon size={17} />
              <span>{item.name}</span>
              {item.id === "opportunities" ? (
                <span className="nav-count">1</span>
              ) : null}
            </a>
          ))}
        </nav>
        <div className="nav-label nav-label-spaced">Contribuições</div>
        <nav aria-label="Contribuições">
          {nav.slice(3).map((item) => (
            <a
              key={item.id}
              href={`#${item.path}`}
              aria-label={item.name}
              data-testid={`nav-${item.id}`}
              aria-current={route.startsWith(item.path) ? "page" : undefined}
              className={route.startsWith(item.path) ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
            >
              <item.icon size={17} />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-projects">
          <div className="nav-label">Em andamento</div>
          <button
            className="sidebar-project"
            onClick={() => navigate("/oportunidades/ENE-001")}
          >
            <BriefcaseBusiness size={16} />
            <span>
              <strong>ENE-001</strong>
              <small>Operações de energia</small>
            </span>
          </button>
        </div>
        <div className="sidebar-bottom">
          <button
            className="sidebar-action"
            aria-label="Demonstração"
            onClick={() => setDemoOpen(true)}
          >
            <Clapperboard size={16} />
            <span>Demonstração</span>
          </button>
          <button
            className="sidebar-action"
            aria-label="Sobre o protótipo"
            onClick={() => setAbout(true)}
          >
            <Info size={16} />
            <span>Sobre o Aptus</span>
          </button>
          <div className="account">
            <span className="avatar">
              {actor?.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <strong>{actor?.name}</strong>
              <small>Visão demonstrativa</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="app-workspace">
        <header className="toolbar">
          <div className="toolbar-breadcrumb">
            <button
              className="icon-btn sidebar-toggle"
              aria-label={
                collapsed ? "Expandir navegação" : "Recolher navegação"
              }
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <PanelLeftOpen size={20} />
              ) : (
                <PanelLeftClose size={20} />
              )}
            </button>
            <div className="toolbar-title">
              <strong>
                {route.startsWith("/oportunidades/ENE-001")
                  ? "ENE-001"
                  : routeTitle(route)}
              </strong>
              <small>Nexora</small>
            </div>
          </div>
          <div className="toolbar-actions">
            <button
              className="search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar na base"
            >
              <Search size={17} />
              <span>Buscar</span>
              <kbd>⌘ K</kbd>
            </button>
            <label
              className="role-switcher"
              title="Troca de visão demonstrativa; sem login ou permissões reais"
            >
              <span>Visão:</span>
              <select
                data-testid="demo-role-switcher"
                aria-label="Visão demonstrativa"
                value={state.demo.actorId}
                onChange={(e) => setActor(e.target.value)}
                disabled={busy}
              >
                {Object.values(state.actors).map((a) => (
                  <option value={a.id} key={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="icon-btn demo-toolbar"
              onClick={() => setDemoOpen(true)}
              aria-label="Abrir demonstração"
            >
              <Clapperboard size={19} />
            </button>
          </div>
        </header>
        <div className="demo-strip">
          <span data-testid="demo-badge">
            <span className="demo-dot" />
            Demonstração · dados fictícios
          </span>
          <span className="clock-label">
            27 out 2026 ·{" "}
            {`${10 + Math.floor(state.demo.clockMinutes / 60)}`.padStart(
              2,
              "0",
            )}
            :{`${state.demo.clockMinutes % 60}`.padStart(2, "0")} · Brasília
          </span>
        </div>
        <main
          id="main-content"
          tabIndex={-1}
          aria-busy={busy}
          key={`${state.demo.sceneId}-${generation()}`}
        >
          <div className="content-wrap">
            {route === "/pessoas" ? (
              <People />
            ) : route === "/descoberta" ? (
              <Discovery />
            ) : route.startsWith("/connect") ? (
              <Connect />
            ) : route === "/participacao" ? (
              <Recognition />
            ) : route.startsWith("/oportunidades/ENE-001") ? (
              <Tender />
            ) : route === "/oportunidades" ? (
              <Opportunities />
            ) : (
              <Home />
            )}
          </div>
        </main>
        <footer className="app-footer">
          {" "}
          {state.message ? (
            <div
              role={state.error ? "alert" : "status"}
              className={`status-message ${state.error ? "status-error" : ""}`}
            >
              <Info size={18} />
              <span title={state.message}>{state.message}</span>
              {busy ? <span className="spinner" /> : null}
            </div>
          ) : null}
          <span className="footer-context">Nexora · ambiente local</span>
        </footer>
      </div>
      {state.demo.inspector?.type === "evidence" ? (
        <EvidenceInspector
          key={`${state.demo.inspector.id}-${epoch}`}
          id={state.demo.inspector.id}
          onClose={closeInspector}
        />
      ) : null}
      {state.demo.inspector?.type === "person" ? (
        <PersonInspector
          key={`${state.demo.inspector.id}-${epoch}`}
          id={state.demo.inspector.id}
          onClose={closeInspector}
        />
      ) : null}
      {state.demo.inspector?.type === "availability" ? (
        <AvailabilityInspector
          key={`${state.demo.inspector.id}-${epoch}`}
          id={state.demo.inspector.id}
          onClose={closeInspector}
        />
      ) : null}
      {demoOpen ? <DemoController onClose={() => setDemoOpen(false)} /> : null}
      {searchOpen ? (
        <Dialog
          title="Buscar na Base Viva"
          onClose={() => setSearchOpen(false)}
        >
          <label className="field">
            Nome ou competência
            <input
              autoFocus
              placeholder="Buscar pessoas, PMP, segurança…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="search-results">
            {people.map((p) => (
              <button
                className="person-row"
                key={p.id}
                onClick={() => {
                  setSearchOpen(false);
                  navigate("/pessoas");
                  inspect("person", p.id);
                }}
              >
                <span className="avatar">{p.initials}</span>
                <span>
                  <strong>{p.name}</strong>
                  <small>{p.area}</small>
                </span>
                <ArrowRight size={16} />
              </button>
            ))}
            {!people.length ? (
              <p className="muted">
                Nenhuma pessoa com este nome ou competência.
              </p>
            ) : null}
          </div>
        </Dialog>
      ) : null}
      {about ? (
        <Dialog title="Sobre o Aptus" onClose={() => setAbout(false)}>
          <div className="stack">
            <img
              className="about-logo"
              src="./brand/aptus.svg"
              alt="Símbolo Aptus"
            />
            <h3>Protótipo APTUS para o case Nexora</h3>
            <p>HackatOhm 2026 · Desafio EloGroup.</p>
            <p className="muted">
              Nexora é uma empresa fictícia. Sua identidade nesta aplicação é
              conceitual, inspirada nas cores do material do desafio. EloGroup é
              a empresa do desafio.
            </p>
            <Status tone="warning">Demonstração acadêmica</Status>
            <p className="muted">
              Dados sintéticos, decisões e processamento locais. O protótipo não
              representa um sistema implantado ou validado.
            </p>
          </div>
        </Dialog>
      ) : null}
    </div>
  );
}
