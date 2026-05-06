"use client";

import { Children } from "react";
import { useReveal } from "../hooks/useReveal";

export default function Section({
  id,
  children,
  className = "",
  stagger = false,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const { ref, visible } = useReveal();

  return (
    <section
      id={id}
      ref={ref}
      data-revealed={visible}
      className={
        stagger
          ? className
          : `transition-[opacity,transform] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${className}`
      }
    >
      {stagger
        ? Children.map(children, (child, i) => (
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </section>
  );
}
