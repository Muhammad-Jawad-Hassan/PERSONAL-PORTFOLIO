import { experience } from "@/data/experience";

const TODAY = { year: 2026, month: 7 };

export function tenureMonths(start: string, end: string | "Present") {
  const [sm, sy] = start.split("/").map(Number);
  const [em, ey] =
    end === "Present" ? [TODAY.month, TODAY.year] : end.split("/").map(Number);
  return Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
}

export function formatTenure(months: number) {
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"}`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (m === 0) return `${y} ${y === 1 ? "year" : "years"}`;
  return `${y}y ${m}m`;
}

export const MAX_TENURE = Math.max(
  ...experience.map((e) => tenureMonths(e.start, e.end)),
);

export const ROD_LEFT_PX = 28;
export const NODE_SIZE = 22;
export const SPUR_LEN = 36;
