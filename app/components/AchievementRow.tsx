"use client";

import { useEffect, useRef, useState } from "react";

interface AchievementRowProps {
  label: string;
  detail: string;
  type: "cert" | "award";
  skills?: string[];
}

export default function AchievementRow({
  label,
  detail,
  type,
  skills,
}: AchievementRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-lg bg-surface border border-border hover:border-orange/15 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_-4px_var(--color-orange)/0.1] transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-orange/[0.06] flex items-center justify-center text-base sm:text-lg">
        {type === "cert" ? <ShieldIcon /> : <TrophyIcon />}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-heading text-sm sm:text-base text-text-primary">
            {label}
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-orange-muted bg-orange/8 px-2 py-0.5 rounded-full">
            {type === "cert" ? "certification" : "award"}
          </span>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed">
          {detail}
        </p>

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-[10px] text-text-muted bg-surface-elevated px-2 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="shrink-0 self-center hidden sm:block">
        <div className="w-1.5 h-1.5 rounded-full bg-orange/20 group-hover:bg-orange/50 transition-colors duration-500" />
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
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
  );
}

function TrophyIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      className="text-orange-bright"
    >
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 6v5M10 13.5v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 9l3-3 3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
