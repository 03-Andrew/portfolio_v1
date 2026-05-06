"use client";

import { useEffect, useRef, useState } from "react";

const nodes = [
  { id: 0, cx: 15, cy: 20, r: 4, delay: "0s" },
  { id: 1, cx: 85, cy: 15, r: 5, delay: "1.5s" },
  { id: 2, cx: 90, cy: 60, r: 3, delay: "3s" },
  { id: 3, cx: 10, cy: 75, r: 5, delay: "2s" },
  { id: 4, cx: 50, cy: 85, r: 4, delay: "0.5s" },
  { id: 5, cx: 70, cy: 40, r: 6, delay: "4s" },
  { id: 6, cx: 30, cy: 50, r: 3, delay: "2.5s" },
];

const edges = [
  [0, 1], [0, 3], [0, 6],
  [1, 2], [1, 5],
  [2, 4], [2, 5],
  [3, 4], [3, 6],
  [4, 5],
  [5, 6],
];

export default function SystemGraph() {
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].cx}
            y1={nodes[a].cy}
            x2={nodes[b].cx}
            y2={nodes[b].cy}
            stroke="var(--color-orange)"
            strokeOpacity="0.12"
            strokeWidth="0.3"
            className="transition-all duration-[2000ms] ease-in-out"
            style={{
              animationName: visible ? "edge-pulse" : "none",
              animationDuration: `${3 + (a + b) * 0.4}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${(a + b) * 0.3}s`,
            }}
          />
        ))}

        {nodes.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r * 1.8}
              fill="var(--color-orange)"
              fillOpacity="0.04"
              className="animate-blob-slow"
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="var(--color-orange)"
              fillOpacity="0.25"
              stroke="var(--color-orange)"
              strokeOpacity="0.15"
              strokeWidth="0.3"
              style={{
                animationName: visible ? "node-float" : "none",
                animationDuration: `${4 + n.id * 0.5}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: n.delay,
              }}
            />
          </g>
        ))}
      </svg>

    </div>
  );
}
