"use client";

import { useEffect, useRef, useState } from "react";

export default function CredentialBadge({
  label,
  detail,
  type,
  delay,
}: {
  label: string;
  detail: string;
  type: "cert" | "award";
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isCert = type === "cert";

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-4"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`w-px bg-gradient-to-b from-transparent via-orange/30 to-transparent transition-all duration-1000 ${
          visible ? "h-12 opacity-100" : "h-0 opacity-0"
        }`}
      />

      <div
        className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center gap-1 border-2 transition-all duration-700 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        } ${
          isCert
            ? "border-orange/30 bg-orange/[0.04]"
            : "border-orange-bright/30 bg-orange-bright/[0.04]"
        }`}
      >
        <div
          className={`absolute inset-0 rounded-full border ${
            isCert ? "border-orange/10" : "border-orange-bright/10"
          } ${visible ? "animate-ping" : ""}`}
          style={{ animationDuration: "3s", animationDelay: `${delay + 400}ms` }}
        />

        <span className="text-2xl sm:text-3xl">
          {isCert ? (
            <svg width="28" height="28" viewBox="0 0 20 20" fill="none" className="text-orange">
              <path d="M10 2L3 6v4c0 4.4 3 8.5 7 9.5 4-1 7-5.1 7-9.5V6l-7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 20 20" fill="none" className="text-orange-bright">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 6v5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7 9l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>

        <span className="font-heading text-base sm:text-lg text-text-primary">
          {label}
        </span>

        <span
          className={`font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full ${
            isCert ? "bg-orange/10 text-orange" : "bg-orange-bright/10 text-orange-bright"
          }`}
        >
          {type}
        </span>
      </div>

      <p
        className={`text-xs text-text-muted text-center max-w-[160px] leading-relaxed transition-all duration-700 delay-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {detail}
      </p>

      <div
        className={`w-px bg-gradient-to-b from-orange/30 via-transparent to-transparent transition-all duration-1000 delay-500 ${
          visible ? "h-8 opacity-100" : "h-0 opacity-0"
        }`}
      />
    </div>
  );
}
