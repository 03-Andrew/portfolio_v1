"use client";

import { useEffect } from "react";

// URL-safe slug helper
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word/space/hyphen chars
    .replace(/[\s_-]+/g, "-") // replace spaces and underscores with hyphens
    .trim()
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
};

interface UseModalUrlSyncProps<T> {
  paramName: string;
  items: T[];
  getSlug: (item: T) => string;
  setSelectedItem: (item: T | null) => void;
}

export function useModalUrlSync<T>({
  paramName,
  items,
  getSlug,
  setSelectedItem,
}: UseModalUrlSyncProps<T>) {
  // Sync from URL to component state
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get(paramName);
      if (slug) {
        const found = items.find((item) => getSlug(item) === slug);
        if (found) {
          setSelectedItem(found);
          return;
        }
      }
      setSelectedItem(null);
    };

    // Run on initial mount
    handleUrlChange();

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("urlchange", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("urlchange", handleUrlChange);
    };
  }, [paramName, items, getSlug, setSelectedItem]);

  // Sync from component interaction to URL
  const selectItem = (item: T | null) => {
    const params = new URLSearchParams(window.location.search);
    const currentSlug = params.get(paramName);
    const newSlug = item ? getSlug(item) : null;

    if (currentSlug === newSlug) return;

    if (newSlug) {
      params.set(paramName, newSlug);
    } else {
      params.delete(paramName);
    }

    const search = params.toString();
    const newUrl = `${window.location.pathname}${search ? `?${search}` : ""}`;

    window.history.pushState(null, "", newUrl);
    window.dispatchEvent(new Event("urlchange"));
  };

  return selectItem;
}
