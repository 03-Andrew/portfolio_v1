"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BackButton() {
  const [backUrl, setBackUrl] = useState("/projects");
  const [hasHistory, setHasHistory] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prevPath = sessionStorage.getItem("previousPath");
      if (prevPath === "/") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBackUrl("/");
      } else {
        setBackUrl("/projects");
      }

      let isInternalReferrer = false;
      if (typeof document !== "undefined" && document.referrer) {
        try {
          const referrerUrl = new URL(document.referrer);
          if (referrerUrl.host === window.location.host) {
            isInternalReferrer = true;
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hasClientNavigation = !!(window as any).__navigatedWithinApp;
      if (hasClientNavigation || isInternalReferrer) {
        setHasHistory(true);
      }

      // Reset navigating state when page is shown (BFcache restore support)
      const handlePageShow = () => {
        setIsNavigating(false);
      };
      window.addEventListener("pageshow", handlePageShow);
      return () => {
        window.removeEventListener("pageshow", handlePageShow);
      };
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
      href={backUrl}
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
