// URL-safe slug helper (shared between server and client components)
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word/space/hyphen chars
    .replace(/[\s_-]+/g, "-") // replace spaces and underscores with hyphens
    .trim()
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
};
