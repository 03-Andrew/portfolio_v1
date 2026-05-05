"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectData } from "./ProjectModal";
import ProjectVisual from "./ProjectVisual";

export default function BentoCard({
  project,
  index,
  className = "",
  large,
  wide,
  onClick,
}: {
  project: ProjectData;
  index: number;
  className?: string;
  large?: boolean;
  wide?: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 6, y: x * 6 });
  };

  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${visible ? 0 : 32}px)`,
        opacity: visible ? 1 : 0,
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.7s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s",
      }}
      className={`${className} group/card text-left relative rounded-3xl bg-surface border border-border hover:border-orange/20 overflow-hidden cursor-pointer hover:shadow-lg`}
    >
      <div className="absolute top-3 right-5 font-heading text-[6rem] sm:text-[7rem] leading-none text-orange/[0.04] select-none pointer-events-none">
        {String(index).padStart(2, "0")}
      </div>

      <div className="flex items-center justify-center p-6 sm:p-8 bg-surface-elevated/30 group-hover/card:bg-surface-elevated/60 transition-colors duration-500">
        <div className={`${large ? "scale-110" : ""} group-hover/card:scale-105 transition-transform duration-500`}>
          <ProjectVisual type={project.visual!} />
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-3">
        <span className="font-mono text-xs tracking-widest uppercase text-orange-muted bg-orange/8 px-3 py-1 rounded-full w-fit">
          {project.tech}
        </span>
        <h3 className="font-heading text-xl sm:text-2xl text-text-primary tracking-tight group-hover/card:text-orange transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          {project.description.slice(0, wide ? 120 : 80)}&hellip;
        </p>
        <p className="text-xs text-text-muted mt-1">
          {project.role.split(".")[0]}.
        </p>
      </div>
    </button>
  );
}
