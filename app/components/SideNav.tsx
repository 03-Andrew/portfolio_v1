"use client";

import { useCallback } from "react";
import { sections } from "../data/sections";
import { useActiveSection } from "../hooks/useActiveSection";

export default function SideNav() {
  const active = useActiveSection();

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-1"
    >
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className="group flex items-center gap-3 py-1.5 pr-1"
          aria-label={s.label}
        >
          <span className="text-[0.6875rem] font-medium text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-orange transition-all duration-200 pointer-events-none select-none">
            {s.label}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === s.id
                ? "w-11 h-2.5 bg-orange shadow-[0_0_8px_var(--color-orange)]/40"
                : "w-2.5 h-2.5 bg-text-muted/25 group-hover:w-5 group-hover:bg-orange/35"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
