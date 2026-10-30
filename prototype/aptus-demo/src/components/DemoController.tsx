import { useState } from "react";
import { Clapperboard, RotateCcw, Info } from "lucide-react";
import { useDemo } from "../demo/context";
import { SCENES } from "../demo/scenes";
import type { SceneId } from "../demo/types";
import { Dialog } from "./ui";
export function DemoController({ onClose }: { onClose: () => void }) {
  const { state, api, loadScene } = useDemo();
  const [scene, setScene] = useState<SceneId>(state.demo.sceneId);
  const normal = SCENES.filter(
    (s) =>
      ![
        "second-rejected",
        "duplicate-proof",
        "expired-credential",
        "availability-unknown",
        "tender-amended",
        "export-blocked",
        "connect-external",
      ].includes(s.id),
  );
  const extra = SCENES.filter((s) => !normal.includes(s));
  return (
    <Dialog title="Demonstração" onClose={onClose}>
      <div data-testid="demo-controller" className="stack">
        <div className="notice">
          <Info size={18} />
          <span>
            Cenas completas e repetíveis. Todos os dados, documentos e
            processamentos são simulados neste navegador.
          </span>
        </div>
        <label className="field">
          Cena
          <select
            value={scene}
            onChange={(e) => setScene(e.target.value as SceneId)}
          >
            <optgroup label="Percurso principal">
              {normal.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Variantes controladas">
              {extra.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
        <p className="muted">{SCENES.find((s) => s.id === scene)?.note}</p>
        <button
          className="btn btn-primary"
          onClick={async () => {
            await loadScene(scene);
            onClose();
          }}
        >
          <RotateCcw size={16} />
          Restaurar cena
        </button>
        <div className="divider" />
        <label className="toggle-row">
          <span>
            <strong>Modo gravação</strong>
            <small>Texto ampliado, controles discretos, selo preservado.</small>
          </span>
          <input
            type="checkbox"
            checked={state.demo.capture}
            onChange={(e) => api.setCaptureMode(e.target.checked)}
          />
        </label>
        <label className="toggle-row">
          <span>
            <strong>Movimento reduzido</strong>
            <small>Mesmos estados, transições curtas.</small>
          </span>
          <input
            type="checkbox"
            checked={state.demo.motion === "reduced"}
            onChange={(e) =>
              api.setMotion(e.target.checked ? "reduced" : "normal")
            }
          />
        </label>
        <details>
          <summary>Notas do apresentador</summary>
          <p className="muted">
            Mostre 30 → 31 → 33 → 35. Receber e verificar um atestado conserva a
            nota. Depois do aceite, apresente o recálculo antes de avançar.
            Descoberta e Connect atualizam a base para novas oportunidades.
          </p>
          <p className="muted">
            A retificação encerra na necessidade de revisão. Este protótipo
            cobre apenas as regras do cenário ENE-001.
          </p>
        </details>
        <button
          className="btn"
          onClick={async () => {
            await api.reset();
            onClose();
          }}
        >
          <RotateCcw size={16} />
          Reiniciar tudo
        </button>
        <p className="caption">
          <Clapperboard size={15} />
          Relógio do cenário: 27/10/2026, a partir de 10h.
        </p>
      </div>
    </Dialog>
  );
}
