"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
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
      setCopied(false);
    }, 250);
  }, [onClose]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("andreinadela052@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: prefersReduced ? "none" : "impeccable-fade-in 0.25s ease-out",
      }}
      onClick={(e) => {
        if (e.target === overlayRef.current) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Contact options"
        tabIndex={-1}
        className="relative w-full max-w-md overflow-hidden rounded-sm bg-surface border border-border shadow-2xl outline-none"
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

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-orange">
              Get in Touch
            </span>
            <h2 className="font-heading text-xl sm:text-2xl text-text-primary tracking-tight mt-2">
              andreinadela052@gmail.com
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mt-2">
              Choose your preferred method to contact me.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Option 1: Copy to clipboard */}
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-between w-full p-4 rounded-sm border border-border bg-surface-elevated hover:border-orange/30 transition-colors duration-200 group text-left cursor-pointer"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-text-primary">
                  {copied ? "Copied!" : "Copy Email Address"}
                </span>
                <span className="text-xs text-text-muted">
                  {copied ? "Saved to your clipboard" : "Copy to paste in any browser or app"}
                </span>
              </div>
              <div className="text-text-muted group-hover:text-orange transition-colors duration-200">
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </div>
            </button>

            {/* Option 2: Open Gmail (Web) */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=andreinadela052@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex items-center justify-between w-full p-4 rounded-sm border border-border bg-surface-elevated hover:border-orange/30 transition-colors duration-200 group text-left"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-text-primary">
                  Open in Gmail
                </span>
                <span className="text-xs text-text-muted">
                  Compose in your browser (Gmail tab)
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-muted group-hover:text-orange transition-colors duration-200"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            {/* Option 3: Open Outlook (Web) */}
            <a
              href="https://outlook.live.com/mail/0/deeplink/compose?to=andreinadela052@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex items-center justify-between w-full p-4 rounded-sm border border-border bg-surface-elevated hover:border-orange/30 transition-colors duration-200 group text-left"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-text-primary">
                  Open in Outlook Web
                </span>
                <span className="text-xs text-text-muted">
                  Compose in your browser (Outlook Webmail)
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-muted group-hover:text-orange transition-colors duration-200"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            {/* Option 4: Open default app */}
            <a
              href="mailto:andreinadela052@gmail.com"
              onClick={close}
              className="flex items-center justify-between w-full p-4 rounded-sm border border-border bg-surface-elevated hover:border-orange/30 transition-colors duration-200 group text-left"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-text-primary">
                  Open Mail App
                </span>
                <span className="text-xs text-text-muted">
                  Use your native email client fallback
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-muted group-hover:text-orange transition-colors duration-200"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
