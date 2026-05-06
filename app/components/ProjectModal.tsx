"use client";

import { useEffect, useRef, useCallback } from "react";

export interface ProjectData {
  title: string;
  tech: string;
  description: string;
  role: string;
  stack?: string[];
  visual?: "gantt" | "grid" | "wave";
}

function Visual({ type }: { type: string }) {
  if (type === "gantt") {
    return (
      <div className="flex flex-col gap-2 w-full max-w-[300px]">
        {[80, 60, 90, 40, 70].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-orange-muted w-6 text-right">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="h-2.5 rounded-full bg-orange/15" style={{ width: `${w}%` }}>
              <div className="h-full rounded-full bg-orange/45" style={{ width: `${w * 0.7}%` }} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (type === "grid") {
    return (
      <div className="grid grid-cols-3 gap-2 w-full max-w-[200px]">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={`aspect-square rounded-lg ${[0, 2, 4, 6].includes(i) ? "bg-orange/25" : "bg-orange/8"}`} />
        ))}
      </div>
    );
  }
  if (type === "wave") {
    return (
      <div className="flex items-end gap-1.5 h-24 w-full max-w-[220px]">
        {[0.4, 0.7, 0.5, 0.9, 0.6, 1, 0.5, 0.8, 0.3, 0.7].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm bg-orange/25" style={{ height: `${h * 100}%` }} />
        ))}
      </div>
    );
  }
  return null;
}

export default function ProjectModal({
  project,
  triggerRect,
  isOpen,
  onClose,
}: {
  project: ProjectData | null;
  triggerRect: DOMRect | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      panelRef.current?.focus();
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKey]);

  const close = useCallback(() => {
    if (animating.current) return;
    animating.current = true;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) {
      onClose();
      return;
    }
    overlay.style.opacity = "0";
    panel.style.opacity = "0";
    panel.style.transform = "scale(0.96) translateY(8px)";
    setTimeout(() => {
      animating.current = false;
      onClose();
    }, 250);
  }, [onClose]);

  if (!isOpen || !project) return null;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      style={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: prefersReduced
          ? "none"
          : "impeccable-fade-in 0.25s ease-out",
      }}
      onClick={(e) => {
        if (e.target === overlayRef.current) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        tabIndex={-1}
        className="relative w-full max-w-2xl max-h-[90svh] overflow-y-auto rounded-sm bg-surface border border-border shadow-2xl outline-none"
        style={{
          animation: prefersReduced
            ? "none"
            : "impeccable-modal-in 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-md bg-surface-elevated border border-border flex items-center justify-center text-text-muted hover:text-orange hover:border-orange/30 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Visual header */}
        <div className="flex items-center justify-center p-10 sm:p-14 bg-surface-elevated/50">
          {project.visual ? (
            <Visual type={project.visual} />
          ) : (
            <div className="w-24 h-24 rounded-3xl bg-orange/8 flex items-center justify-center">
              <span className="font-heading text-4xl text-orange/30">~</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-5">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-orange-muted bg-orange/8 px-3 py-1 rounded-full">
              {project.tech}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary tracking-tight mt-4">
              {project.title}
            </h2>
          </div>

          <p className="text-text-secondary leading-relaxed">
            {project.description}
          </p>

          <p className="text-sm text-text-muted leading-relaxed bg-surface-elevated rounded-lg p-4 border border-border">
            {project.role}
          </p>

          {project.stack && project.stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-xs px-3 py-1.5 rounded-md bg-surface-elevated text-text-secondary border border-border"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 mt-2 text-orange hover:text-orange-bright transition-colors duration-200 font-mono text-sm tracking-widest uppercase w-fit"
          >
            View project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4m7 0v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
