"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
} | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

function getStored(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return null;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Track navigation synchronously during render so child mount effects
  // (e.g. BackButton) see the updated values — parent update effects can
  // run after child mount effects in React's effect ordering.
  if (typeof window !== "undefined") {
    const current = sessionStorage.getItem("currentPath");
    if (current !== pathname) {
      if (current) {
        sessionStorage.setItem("previousPath", current);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__navigatedWithinApp = true;
      }
      sessionStorage.setItem("currentPath", pathname);
    }
  }

  useEffect(() => {
    const stored = getStored();
    const preferred =
      stored ??
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(preferred);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
