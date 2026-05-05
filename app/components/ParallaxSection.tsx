"use client";

import { useReveal } from "../hooks/useReveal";

export default function ParallaxSection({
  id,
  children,
  className = "",
  z = 1,
  bg = "canvas",
  first = false,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  bg?: "canvas" | "surface";
  z?: number;
  first?: boolean;
}) {
  const { ref, visible } = useReveal();
  const bgClass = bg === "surface" ? "bg-surface" : "bg-canvas";

  const stickyClasses = first
    ? ""
    : "sticky top-0 rounded-t-3xl shadow-[0_-1px_0_var(--color-border),0_-16px_40px_rgba(0,0,0,0.08)]";

  return (
    <section
      id={id}
      ref={ref}
      style={first ? undefined : { zIndex: z }}
      className={`${bgClass} relative ${stickyClasses} transition-opacity duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
      data-parallax-section
    >
      {children}
    </section>
  );
}
