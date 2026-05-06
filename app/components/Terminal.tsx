const SKILLS = [
  "django  fastapi  nextjs  n8n  typescript",
  "react_native  python  postgres  fastify",
  "docker  redis  postgresql  prisma  celery",
  "aws  git  linux  REST  graphql",
];

export default function Terminal() {
  return (
    <div className="flex flex-col font-mono text-xs sm:text-sm text-orange/50 leading-relaxed bg-surface/70 rounded-lg border border-border/50 backdrop-blur-sm overflow-hidden h-[280px] w-full">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 shrink-0">
        <span className="w-3 h-3 rounded-full bg-orange/30" />
        <span className="w-3 h-3 rounded-full bg-orange/15" />
        <span className="w-3 h-3 rounded-full bg-orange/5" />
        <span className="ml-3 text-[10px] sm:text-xs text-text-muted tracking-widest uppercase">
          andrew@portfolio ~
        </span>
      </div>

      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-center gap-3">
        <div className="text-orange/40">$ skills</div>
        {SKILLS.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div className="flex items-center gap-1.5 mt-3">
          <span>$</span>
          <span className="w-2 h-[1.1em] bg-orange/40 inline-block animate-pulse" />
        </div>
      </div>
    </div>
  );
}
