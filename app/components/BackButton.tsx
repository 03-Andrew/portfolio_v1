"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BackButton() {
  const [hasHistory, setHasHistory] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      document.referrer &&
      document.referrer.includes(window.location.host)
    ) {
      setHasHistory(true);
    }
  }, []);

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isNavigating) {
      e.preventDefault();
      return;
    }

    setIsNavigating(true);

    if (hasHistory) {
      e.preventDefault();
      window.history.back();
    }
  };

  return (
    <Link
      href="/projects"
      onClick={handleBack}
      className={`inline-flex items-center gap-2.5 text-[11px] font-mono tracking-widest uppercase text-text-secondary transition-colors duration-200 group ${
        isNavigating ? "opacity-40 pointer-events-none cursor-default" : "hover:text-orange"
      }`}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="none"
        className="group-hover:-translate-x-0.5 transition-transform duration-200"
      >
        <path
          d="M10 12L4 8l6-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {isNavigating ? "Navigating..." : "Back"}
    </Link>
  );
}
