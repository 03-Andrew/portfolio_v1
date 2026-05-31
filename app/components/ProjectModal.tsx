"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export interface ProjectData {
  title: string;
  tech: string;
  label: string;
  date: string;
  description: string;
  shortDescription: string;
  role: string;
  findings: string[];
  links?: {
    code?: string;
    video?: string;
    manuscript?: string;
  };
  stack?: string[];
  visual?: "gantt" | "grid" | "wave";
  images?: string[];
  architectureUrl?: string;
  architectureDescription?: string;
}

const PROJECT_ACTIONS = [
  { key: "code", label: "Code" },
  { key: "video", label: "Video" },
  { key: "manuscript", label: "Manuscript" },
] as const;

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

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
  const projectActions = PROJECT_ACTIONS.filter(
    (action) => project.links?.[action.key]
  );

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
        className="relative w-full max-w-6xl max-h-[90svh] overflow-y-auto rounded-sm bg-surface border border-border shadow-2xl outline-none lg:grid lg:grid-cols-[minmax(360px,0.45fr)_minmax(0,0.55fr)]"
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

        {/* Header (Full-width on desktop, first in scroll flow on mobile) */}
        <header className="lg:col-span-2 border-b border-border/40 bg-surface-elevated/20 p-6 sm:p-8 lg:p-10 pb-5 lg:pb-6 flex flex-col gap-3 pr-16">
          <div className="flex flex-wrap gap-2">
            <span className="inline-block max-w-full rounded-full bg-orange/8 px-3 py-1 font-mono text-xs uppercase leading-relaxed tracking-widest text-orange-muted break-words">
              {project.label}
            </span>
            <span className="inline-block max-w-full rounded-full border border-border px-3 py-1 font-mono text-xs uppercase leading-relaxed tracking-widest text-text-muted break-words">
              {project.date}
            </span>
          </div>
          <h2 className="font-heading text-2xl tracking-tight text-text-primary sm:text-3xl lg:text-4xl pr-4">
            {project.title}
          </h2>
        </header>

        {/* Spec rail */}
        <aside className="flex flex-col gap-6 bg-surface-elevated/50 p-6 sm:p-8 lg:p-10 lg:border-r lg:border-border/70">
          {project.images && project.images.length > 0 ? (
            <div className="relative aspect-[3/2] w-full max-w-[460px] overflow-hidden rounded-lg border border-orange/15 bg-canvas/70 group shadow-lg shadow-orange/5">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} Screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
              />
              
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev === 0 ? project.images!.length - 1 : prev - 1));
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-border/40 text-white flex items-center justify-center hover:bg-orange hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-200"
                    aria-label="Previous image"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M7.5 9L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev === project.images!.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-border/40 text-white flex items-center justify-center hover:bg-orange hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-200"
                    aria-label="Next image"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
              
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "bg-orange w-3" : "bg-white/40 hover:bg-white/70"}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex aspect-[3/2] w-full max-w-[460px] items-center justify-center rounded-lg border border-orange/15 bg-canvas/70 p-8 shadow-lg shadow-orange/5">
              {project.visual ? (
                <Visual type={project.visual} />
              ) : (
                <div className="w-24 h-24 rounded-3xl bg-orange/8 flex items-center justify-center">
                  <span className="font-heading text-4xl text-orange/30">~</span>
                </div>
              )}
            </div>
          )}

          <section className="flex flex-col gap-2">
            <h3 className="font-mono text-[11px] uppercase leading-relaxed tracking-widest text-orange-muted">
              Role
            </h3>
            <p className="font-heading text-2xl leading-tight text-text-primary sm:text-3xl">
              {project.role}
            </p>
          </section>

          {project.stack && project.stack.length > 0 && (
            <section className="flex flex-col gap-3">
              <h3 className="font-mono text-[11px] uppercase leading-relaxed tracking-widest text-orange-muted">
                Tech stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-ful border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-secondary rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Key tasks / findings (Desktop only) */}
          <section className="hidden lg:flex flex-col gap-3 pt-6 border-t border-border/40">
            <h3 className="font-mono text-[11px] uppercase leading-relaxed tracking-widest text-orange-muted">
              Key tasks / findings
            </h3>
            <ul className="grid gap-3">
              {project.findings.map((finding) => (
                <li
                  key={finding}
                  className="flex gap-2.5 text-sm leading-relaxed text-text-secondary text-left align-top"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* Content */}
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
          <p className="max-w-[68ch] text-text-secondary leading-relaxed">
            {project.description}
          </p>

          {/* Key tasks / findings (Mobile only - after description) */}
          <section className="flex lg:hidden flex-col gap-3 pt-6 border-t border-border/40">
            <h3 className="font-mono text-[11px] uppercase leading-relaxed tracking-widest text-orange-muted">
              Key tasks / findings
            </h3>
            <ul className="grid gap-3">
              {project.findings.map((finding) => (
                <li
                  key={finding}
                  className="flex gap-2.5 text-sm leading-relaxed text-text-secondary text-left align-top"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* System Architecture Section */}
          <section className="flex flex-col gap-4 pt-6 border-t border-border/40">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-orange-muted">
                Infrastructure
              </span>
              <h3 className="font-heading text-lg text-text-primary">
                System Architecture
              </h3>
            </div>
            
            <div className="relative aspect-[16/10] w-full rounded-md border border-dashed border-orange/20 bg-orange/4 p-4 flex flex-col items-center justify-center gap-3 group overflow-hidden">
              {project.architectureUrl ? (
                <img
                  src={project.architectureUrl}
                  alt={`${project.title} System Architecture`}
                  className="w-full h-full object-cover rounded-sm transition-transform duration-500 hover:scale-102"
                />
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-orange/10 border border-orange/20 flex items-center justify-center text-orange animate-pulse">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="9" rx="1" />
                      <rect x="14" y="3" width="7" height="5" rx="1" />
                      <rect x="14" y="12" width="7" height="9" rx="1" />
                      <rect x="3" y="16" width="7" height="5" rx="1" />
                      <path d="M7 12v4M17 8v4" />
                    </svg>
                  </div>
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider text-center">
                    System Architecture Diagram Placeholder
                  </p>
                </>
              )}
            </div>

            {project.architectureDescription && (
              <p className="text-xs leading-relaxed text-text-muted max-w-[65ch]">
                {project.architectureDescription}
              </p>
            )}
          </section>

          {projectActions.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-6 border-t border-border/40">
              {projectActions.map((action) => (
                <a
                  key={action.key}
                  href={project.links?.[action.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-orange/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-orange transition-colors duration-200 hover:border-orange/45 hover:bg-orange/8 hover:text-orange-bright"
                >
                  {action.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H4m7 0v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
