"use client";

import { useEffect, useState } from "react";

export default function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
    let frame = 0;
    const maxFrames = 30;
    const interval = setInterval(() => {
      frame++;
      if (frame >= maxFrames) {
        setDisplay(text);
        clearInterval(interval);
        return;
      }
      const progress = frame / maxFrames;
      setDisplay(
        text
          .split("")
          .map((c) => {
            if (c === " " || c === "\n") return c;
            if (Math.random() > progress) return chars[Math.floor(Math.random() * chars.length)];
            return c;
          })
          .join("")
      );
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
}
