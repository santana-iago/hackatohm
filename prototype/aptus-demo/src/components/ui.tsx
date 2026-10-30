import {
  useEffect,
  useRef,
  useId,
  type ReactNode,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
} from "react";
import { Check, Clock3, AlertCircle, X, ArrowUpRight } from "lucide-react";
import { useDemo } from "../demo/context";
import type { DemoCommand } from "../demo/types";
export function Status({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  const Icon =
    tone === "success" ? Check : tone === "danger" ? AlertCircle : Clock3;
  return (
    <span className={`tag tag-${tone}`}>
      <Icon size={13} />
      {children}
    </span>
  );
}
export function CommandButton({
  command,
  children,
  reason,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  command: DemoCommand;
  reason?: string;
  children: ReactNode;
}) {
  const demo = useDemo();
  return (
    <>
      <button
        {...props}
        disabled={props.disabled || demo.busy}
        onClick={() => void demo.command(command)}
        title={reason}
      >
        {children}
      </button>
      {reason && props.disabled ? (
        <small className="control-reason">{reason}</small>
      ) : null}
    </>
  );
}
export function Panel({
  title,
  meta,
  children,
  className = "",
}: {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      {title ? (
        <div className="panel-header">
          <h2>{title}</h2>
          {meta}
        </div>
      ) : null}
      {children}
    </section>
  );
}
export function Dialog({
  title,
  onClose,
  children,
  wide = false,
  variant = "dialog",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
  variant?: "dialog" | "inspector" | "preview";
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const el = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    el?.showModal();
    return () => {
      el?.close();
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`dialog dialog-${variant} ${wide ? "dialog-wide" : ""}`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby={titleId}
    >
      <div className="dialog-heading">
        <div>
          <h2 id={titleId}>{title}</h2>
          <span className="dialog-demo-label">
            Demonstração · dados fictícios
          </span>
        </div>
        <button
          className="icon-btn"
          onClick={onClose}
          aria-label="Fechar diálogo"
        >
          <X size={20} />
        </button>
      </div>
      <div className="dialog-content">{children}</div>
    </dialog>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
export function LinkArrow() {
  return <ArrowUpRight size={16} />;
}

export function handleTabListKeyDown(event: KeyboardEvent<HTMLElement>) {
  const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
  if (!keys.includes(event.key)) return;
  const tabs = Array.from(
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
  );
  if (!tabs.length) return;
  const index = tabs.findIndex((tab) => tab === document.activeElement);
  if (index < 0) return;
  event.preventDefault();
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? tabs.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) %
          tabs.length;
  tabs[next].focus();
  tabs[next].click();
}
