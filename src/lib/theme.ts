export const COLOR = {
  accent: "var(--accent)",
  accentBright: "var(--accent-bright)",
  accentDeep: "var(--accent-deep)",
  accentGlow: "var(--accent-glow)",
  blueprint: "var(--blueprint)",
  borderDefault: "var(--border-default)",
  borderSubtle: "var(--border-subtle)",
  bgBase: "var(--bg-base)",
  bgVoid: "var(--bg-void)",
  fgDefault: "#e8ecf5",
  fgBody: "rgba(232, 236, 245, 0.92)",
  fgMuted: "rgba(232, 236, 245, 0.62)",
  fgSubtle: "var(--fg-subtle)",
} as const;

export const GLOW = {
  soft: "0 0 14px var(--accent-glow)",
  hard: "0 0 22px rgba(0, 229, 255, 0.85), 0 0 6px var(--accent-bright)",
  text: "0 0 12px var(--accent-glow)",
  textStrong: "0 0 22px var(--accent-glow)",
  inset: "inset 0 0 0 1px var(--accent), 0 0 18px var(--accent-glow)",
} as const;

export const TRACK = "0.32em";

export const PANEL_BG =
  "linear-gradient(180deg, rgba(19, 26, 45, 0.55) 0%, rgba(12, 17, 32, 0.55) 100%)";

export const PANEL_BG_OPAQUE =
  "linear-gradient(180deg, rgba(19, 26, 45, 0.78) 0%, rgba(12, 17, 32, 0.78) 100%)";

export const CHIP_BG = "rgba(255, 255, 255, 0.025)";
