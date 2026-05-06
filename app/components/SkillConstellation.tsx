"use client";

import { useEffect, useRef, useState } from "react";

interface StackRow {
  category: string;
  techs: string;
}

const STACK: StackRow[] = [
  { category: "Backend", techs: "FastAPI · Django · Node.js" },
  { category: "Frontend", techs: "Next.js" },
  { category: "Infrastructure", techs: "Docker · DigitalOcean" },
  { category: "Database", techs: "PostgreSQL" },
  { category: "Automation", techs: "n8n" },
];

export default function SkillConstellation() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      aria-hidden="true"
      className="font-mono text-xs leading-relaxed select-none"
      style={{
        width: 280,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="mb-3">
        <span className="text-[10px] tracking-[0.25em] uppercase text-orange-muted">
          Stack
        </span>
        <div className="mt-1.5 h-px bg-gradient-to-r from-orange/30 to-transparent" />
      </div>

      <div className="flex flex-col gap-1.5">
        {STACK.map((row, i) => (
          <div
            key={row.category}
            className="flex gap-3"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
            }}
          >
            <span className="text-text-secondary shrink-0 w-[92px] tracking-tight">
              {row.category}
            </span>
            <span className="text-text-muted/75">{row.techs}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
