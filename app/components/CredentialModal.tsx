"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { CredentialData } from "../data/credentials";

function normalizeImageSrc(src: string) {
  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `/${src}`;
}

export default function CredentialModal({
  credential,
  isOpen,
  onClose,
}: {
  credential: CredentialData | null;
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

  if (!isOpen || !credential) return null;

  const isCert = credential.type === "cert";

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const imageSrc = credential.image
    ? normalizeImageSrc(credential.image.src)
    : null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
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
        aria-label={credential.label}
        tabIndex={-1}
        className="relative w-full max-w-lg max-h-[90svh] overflow-y-auto rounded-sm bg-surface border border-border shadow-2xl outline-none"
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
            <path
              d="M2 2l10 10M12 2L2 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Badge header */}
        <div className="relative flex h-[320px] items-center justify-center overflow-hidden bg-surface-elevated/50">
          {credential.image && imageSrc ? (
            <>
              <Image
                src={imageSrc}
                alt={credential.image.alt}
                width={900}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-surface/18 to-surface/85" />
            </>
          ) : (
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${
                isCert
                  ? "border-orange/30 bg-orange/[0.06]"
                  : "border-orange-bright/30 bg-orange-bright/[0.06]"
              }`}
            >
              {isCert ? (
              <svg
                width="32"
                height="32"
                viewBox="0 0 20 20"
                fill="none"
                className="text-orange"
              >
                <path
                  d="M10 2L3 6v4c0 4.4 3 8.5 7 9.5 4-1 7-5.1 7-9.5V6l-7-4z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 20 20"
                fill="none"
                className="text-orange-bright"
              >
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 6v5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7 9l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-5">
          <div>
            <span
              className={`font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full ${
                isCert
                  ? "text-orange bg-orange/8"
                  : "text-orange-bright bg-orange-bright/8"
              }`}
            >
              {credential.type === "cert" ? "Certification" : "Award"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary tracking-tight mt-4">
              {credential.label}
            </h2>
            <p className="text-text-secondary leading-relaxed mt-2">
              {credential.detail}
            </p>
          </div>

          {credential.skills.length > 0 && (
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2 block">
                Skills
              </span>
              <div className="flex flex-wrap gap-2">
                {credential.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1.5 rounded-full bg-surface-elevated text-text-secondary border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {credential.verifyUrl && (
            <a
              href={credential.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-orange hover:text-orange-bright transition-colors duration-200 font-mono text-sm tracking-widest uppercase w-fit"
            >
              Verify
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 11L11 1M11 1H4m7 0v7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
