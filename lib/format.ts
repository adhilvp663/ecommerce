export function formatINR(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function roundTo90(value: number) {
  const n = Math.max(9990, Math.round(value / 1000) * 1000 - 10);
  return Math.min(39990, n);
}
