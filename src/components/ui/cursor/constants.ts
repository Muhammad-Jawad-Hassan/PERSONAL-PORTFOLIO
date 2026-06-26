export const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-cursor-pointer]';

export const CURSOR_PALETTE = [
  "#00e5ff", // accent / cyan
  "#5bfaff", // accent-bright
  "#6cd3ff", // blueprint
  "#34d399", // success / mint
  "#a78bfa", // soft violet — keeps contrast in cyan-heavy regions
] as const;

export type CursorColor = (typeof CURSOR_PALETTE)[number];

// rgb-distance below which the cursor is considered "the same color" as the
// surface beneath it and must swap to a different palette entry.
export const COLOR_MATCH_THRESHOLD = 90;
