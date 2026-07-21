import { profile } from "@/data/profile";

export type ChannelId =
  | "email"
  | "linkedin"
  | "github"
  | "hire"
  | "twitter"
  | "whatsapp"
  | "medium"
  | "resume";

export type KeycapColor =
  | "cyan"
  | "blue"
  | "navy"
  | "black"
  | "green"
  | "cream"
  | "orange"
  | "pink";

export type Channel = {
  id: ChannelId;
  /** Physical key on the keyboard (single uppercase letter). */
  key: string;
  /** Big label printed on the keycap. */
  short: string;
  /** Small caption under the keycap label. */
  caption: string;
  /** Human-readable name used in status / aria. */
  label: string;
  /** Display value, e.g. "mianjawad938@gmail.com". */
  value: string;
  href: string;
  external: boolean;
  download?: boolean;
  color: KeycapColor;
  /** 0 = top, clockwise. Used to place the radar blip on the CRT. */
  angleDeg: number;
  /** When true the keycap occupies 2 grid cells. */
  wide?: boolean;
};

const HIRE_BODY = encodeURIComponent(
  "Hi Jawad,\n\nI'd like to talk about working together.\n\n— ",
);
const HIRE_SUBJECT = encodeURIComponent("Available?");

export const channels: Channel[] = [
  {
    id: "email",
    key: "E",
    short: "@",
    caption: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
    color: "cyan",
    angleDeg: 0,
  },
  {
    id: "linkedin",
    key: "L",
    short: "LI",
    caption: "linkedin",
    label: "LinkedIn",
    value: "in/m-jawad-hassan",
    href: profile.links.linkedin,
    external: true,
    color: "blue",
    angleDeg: 45,
  },
  {
    id: "github",
    key: "G",
    short: "GH",
    caption: "github",
    label: "GitHub",
    value: "Muhammad-Jawad-Hassan",
    href: profile.links.github,
    external: true,
    color: "black",
    angleDeg: 90,
  },
  {
    id: "hire",
    key: "H",
    short: "HIRE ME",
    caption: "let's talk",
    label: "Hire me",
    value: "let's build something",
    href: `mailto:${profile.email}?subject=${HIRE_SUBJECT}&body=${HIRE_BODY}`,
    external: false,
    color: "pink",
    angleDeg: 315,
    wide: true,
  },
  {
    id: "twitter",
    key: "X",
    short: "X",
    caption: "twitter",
    label: "Twitter / X",
    value: "@MIANJAWADAMIN",
    href: profile.links.twitter,
    external: true,
    color: "navy",
    angleDeg: 135,
  },
  {
    id: "whatsapp",
    key: "W",
    short: "WA",
    caption: "whatsapp",
    label: "WhatsApp",
    value: "+92 303 268 8998",
    href: profile.links.whatsapp,
    external: true,
    color: "green",
    angleDeg: 180,
  },
  {
    id: "medium",
    key: "M",
    short: "MD",
    caption: "medium",
    label: "Medium",
    value: "@muhammad-jawad-hassan",
    href: profile.links.medium,
    external: true,
    color: "cream",
    angleDeg: 225,
  },
  {
    id: "resume",
    key: "R",
    short: "CV",
    caption: "resume",
    label: "Resume",
    value: "PDF · 2026",
    href: profile.links.resume,
    external: true,
    download: true,
    color: "orange",
    angleDeg: 270,
  },
];

/** Reading order on the keyboard grid. Hire is wide. */
export const KEYBOARD_ORDER: ChannelId[] = [
  "email",
  "linkedin",
  "github",
  "hire",
  "twitter",
  "whatsapp",
  "medium",
  "resume",
];

export const SIGNAL_EVENT = "contact-signal";

export type ContactSignalDetail = {
  id: ChannelId;
};

export function emitContactSignal(id: ChannelId) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ContactSignalDetail>(SIGNAL_EVENT, { detail: { id } }),
  );
}
