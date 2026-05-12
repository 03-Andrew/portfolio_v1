"use client";

import { useEffect, useRef, useState } from "react";

interface StackRow {
  category: string;
  techs: string;
}

const STACK: StackRow[] = [
  { category: "Backend", techs: "FastAPI · Django · Node.js" },
  { category: "Frontend", techs: "Next.js · React" },
  { category: "Infra", techs: "Docker · DigitalOcean" },
  { category: "Data", techs: "PostgreSQL" },
  { category: "Automation", techs: "n8n · OpenAI" },
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
      aria-label="Technology stack"
      className="font-mono text-xs leading-relaxed text-text-muted"
      style={{
        width: 280,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="border-y border-orange/20 py-3">
        <span className="mb-3 block text-xs tracking-[0.2em] uppercase text-orange-muted">
          Current Stack
        </span>

        <dl className="grid gap-2">
          {STACK.map((row, i) => (
            <div
              key={row.category}
              className="grid grid-cols-[88px_1fr] gap-3"
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
              }}
            >
              <dt className="text-orange-muted tracking-tight">
                {row.category}
              </dt>
              <dd className="text-text-secondary">{row.techs}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
