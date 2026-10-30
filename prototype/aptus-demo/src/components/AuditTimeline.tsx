import { History } from "lucide-react";
import { useDemo } from "../demo/context";
export function AuditTimeline({ limit = 6 }: { limit?: number }) {
  const { state } = useDemo();
  const events = state.audit.slice(-limit).reverse();
  return (
    <div className="audit-list">
      {events.length ? (
        events.map((e) => (
          <div className="audit-event" key={e.id}>
            <span className="audit-dot">
              <History size={14} />
            </span>
            <div>
              <strong>{e.action}</strong>
              <p>{e.object}</p>
              <small>
                {e.actorName} · {e.at.replace("T", " ").replace("-03:00", "")} ·{" "}
                {e.version}
              </small>
            </div>
          </div>
        ))
      ) : (
        <p className="muted">As decisões da demonstração aparecerão aqui.</p>
      )}
    </div>
  );
}
