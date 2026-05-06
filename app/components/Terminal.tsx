"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Line = { type: "input" | "output" | "error"; text: string };

export default function Terminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: 'Type "help" to get started.' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const addLines = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const execute = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      if (!trimmed) return;

      setHistory((prev) => [...prev, cmd]);
      setHistoryIdx(-1);
      addLines([{ type: "input", text: `$ ${cmd}` }]);

      if (trimmed === "clear") {
        setLines([]);
        return;
      }

      if (trimmed === "help") {
        addLines([
          { type: "output", text: "Available commands:" },
          { type: "output", text: "  whoami      about me" },
          { type: "output", text: "  skills      tech stack" },
          { type: "output", text: "  experience  work history" },
          { type: "output", text: "  projects    view projects" },
          { type: "output", text: "  contact     get in touch" },
          { type: "output", text: "  clear       clear terminal" },
        ]);
        return;
      }

      if (trimmed === "whoami") {
        addLines([{ type: "output", text: "andrew :: backend_dev :: cloud_aspirant" }]);
        return;
      }

      if (trimmed === "skills") {
        addLines([
          { type: "output", text: "django  fastapi  nextjs  n8n  typescript" },
          { type: "output", text: "react_native  python  postgres  fastify" },
        ]);
        return;
      }

      if (trimmed === "experience") {
        addLines([
          { type: "output", text: "Backend Developer Intern — 3 months" },
          { type: "output", text: "Built mobile app backend with Fastify API," },
          { type: "output", text: "n8n workflows, and React Native frontend." },
          { type: "output", text: "Owned auth, data sync, push notifications." },
        ]);
        return;
      }

      if (trimmed === "projects") {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
        addLines([{ type: "output", text: "Scrolling to projects..." }]);
        return;
      }

      if (trimmed === "contact") {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
        addLines([{ type: "output", text: "Scrolling to contact..." }]);
        return;
      }

      addLines([
        { type: "error", text: `command not found: ${trimmed.split(" ")[0]}` },
        { type: "output", text: 'Type "help" for available commands.' },
      ]);
    },
    [addLines]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      execute(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const newIdx = historyIdx + 1;
      if (newIdx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
      return;
    }
  };

  return (
    <div
      className="relative flex flex-col font-mono text-xs sm:text-sm text-orange/60 leading-relaxed select-none bg-surface/70 rounded-2xl border border-border/50 backdrop-blur-sm terminal-grid overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30">
        <span className="w-3 h-3 rounded-full bg-orange/30" />
        <span className="w-3 h-3 rounded-full bg-orange/15" />
        <span className="w-3 h-3 rounded-full bg-orange/5" />
        <span className="ml-3 text-[10px] sm:text-xs text-text-muted tracking-widest uppercase">
          terminal
        </span>
      </div>

      <div
        ref={containerRef}
        className="flex-1 p-4 sm:p-5 overflow-y-auto max-h-[300px] sm:max-h-[360px]"
        aria-label="Interactive terminal"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`leading-relaxed ${
              line.type === "error"
                ? "text-red-400/80"
                : line.type === "input"
                  ? "text-orange/40"
                  : "text-orange/50"
            }`}
          >
            {line.text}
          </div>
        ))}

        <div className="flex items-center gap-1.5 text-orange/50">
          <span>$</span>
          <span>{input}</span>
          <span
            className={`w-2 h-[1.1em] bg-orange/40 inline-block align-middle transition-opacity duration-100 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 w-0 h-0"
        aria-label="Terminal input"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
