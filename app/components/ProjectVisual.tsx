export default function ProjectVisual({ type }: { type: string }) {
  if (type === "gantt") {
    return (
      <div className="flex flex-col gap-2 w-full max-w-[260px]">
        {[80, 60, 90, 40, 70].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-orange-muted w-6 text-right">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="h-2 rounded-full bg-orange/20" style={{ width: `${w}%` }}>
              <div className="h-full rounded-full bg-orange/50" style={{ width: `${w * 0.7}%` }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "grid") {
    return (
      <div className="grid grid-cols-3 gap-1.5 w-full max-w-[180px]">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-md ${[0, 2, 4, 6].includes(i) ? "bg-orange/30" : "bg-orange/10"}`}
          />
        ))}
      </div>
    );
  }

  if (type === "wave") {
    return (
      <div className="flex items-end gap-1 h-20 w-full max-w-[200px]">
        {[0.4, 0.7, 0.5, 0.9, 0.6, 1, 0.5, 0.8, 0.3, 0.7].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-orange/30"
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>
    );
  }

  return null;
}
