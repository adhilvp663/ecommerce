export type SizeUnit = "UK" | "EU" | "US";

export const SIZE_UNITS: SizeUnit[] = ["UK", "EU", "US"];

const EU_SIZES: Record<string, string> = {
  "6": "39",
  "6.5": "39.5",
  "7": "40.5",
  "7.5": "41",
  "8": "42",
  "8.5": "42.5",
  "9": "43",
  "9.5": "44",
  "10": "44.5",
  "10.5": "45",
  "11": "46",
  "12": "47",
  "One Size": "One Size",
};

export function convertSize(size: string, unit: SizeUnit) {
  if (size === "One Size") return size;
  if (unit === "UK") return size;
  if (unit === "EU") return EU_SIZES[size] ?? size;
  const numeric = Number(size);
  if (!Number.isFinite(numeric)) return size;
  return String(numeric + 1);
}

export function sizeLabel(size: string, unit: SizeUnit) {
  if (size === "One Size") return "One Size";
  return `${unit} ${convertSize(size, unit)}`;
}
