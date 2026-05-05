"use client";

import { useEffect, useRef, useState } from "react";

export function useParallax(speed = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowH = window.innerHeight;
        const raw = (rect.top - windowH) * speed;
        setY(Math.min(0, Math.max(-windowH * 0.4, raw)));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return {
    ref,
    style: {
      transform: `translateY(${y}px)`,
      willChange: "transform",
    } as React.CSSProperties,
  };
}
