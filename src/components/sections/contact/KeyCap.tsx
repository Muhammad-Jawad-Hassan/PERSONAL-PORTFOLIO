"use client";

import { useState, type CSSProperties } from "react";
import type { Channel, KeycapColor } from "./channels";

type ColorSet = {
  top: string;
  mid: string;
  side: string;
  stem: string;
  text: string;
  glow: string;
};

const COLORS: Record<KeycapColor, ColorSet> = {
  cyan: {
    top: "#9CFCFF",
    mid: "#00E5FF",
    side: "#007089",
    stem: "#00313F",
    text: "#001114",
    glow: "#00E5FF",
  },
  blue: {
    top: "#9DC8F8",
    mid: "#1E78D6",
    side: "#0A4078",
    stem: "#03172E",
    text: "#FFFFFF",
    glow: "#3B82F6",
  },
  navy: {
    top: "#46568A",
    mid: "#222B4A",
    side: "#11182F",
    stem: "#040714",
    text: "#C7D2FE",
    glow: "#7DB3FF",
  },
  black: {
    top: "#384057",
    mid: "#161B2D",
    side: "#0B0F1A",
    stem: "#02040A",
    text: "#D7DCE8",
    glow: "#9EB1D6",
  },
  green: {
    top: "#6EE9BC",
    mid: "#10B981",
    side: "#06734F",
    stem: "#022817",
    text: "#01170E",
    glow: "#34D399",
  },
  cream: {
    top: "#FFFBEC",
    mid: "#EBDFC4",
    side: "#A18B58",
    stem: "#5A4621",
    text: "#3F2C12",
    glow: "#F5D38A",
  },
  orange: {
    top: "#FFC18A",
    mid: "#F97316",
    side: "#A0380E",
    stem: "#3F1505",
    text: "#1A0A02",
    glow: "#FB923C",
  },
  pink: {
    top: "#FF9AB6",
    mid: "#EC4899",
    side: "#9F1A52",
    stem: "#3D0A1F",
    text: "#FFFFFF",
    glow: "#F472B6",
  },
};

type KeyCapProps = {
  channel: Channel;
  isActive: boolean;
  isHot: boolean;
  onActivate: (channel: Channel) => void;
};

const STEM_DEPTH = 7;

export function KeyCap({ channel, isActive, isHot, onActivate }: KeyCapProps) {
  const [pressed, setPressed] = useState(false);
  const c = COLORS[channel.color];
  const down = pressed || isHot;

  const depth = down ? 1 : STEM_DEPTH;
  const lift = down ? STEM_DEPTH - 1 : 0;

  const capStyle: CSSProperties = {
    background: `linear-gradient(180deg, ${c.top} 0%, ${c.mid} 55%, ${c.side} 100%)`,
    color: c.text,
    transform: `translateY(${lift}px)`,
    boxShadow: [
      // top-edge highlight (the lit rim)
      "inset 0 1px 0 rgba(255,255,255,0.45)",
      "inset 0 2px 0 rgba(255,255,255,0.18)",
      // bottom-edge shadow (cap's lower lip)
      "inset 0 -2px 0 rgba(0,0,0,0.32)",
      // side stem (chunky body of the cap)
      `0 ${depth}px 0 ${c.stem}`,
      // floor shadow
      `0 ${depth + 6}px 14px -2px rgba(0,0,0,${0.55 - lift * 0.04})`,
      // active flare
      isActive
        ? `0 0 22px ${c.glow}cc, 0 0 6px ${c.glow}`
        : "0 0 0 rgba(0,0,0,0)",
    ].join(", "),
    transition:
      "transform 70ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 110ms ease",
    touchAction: "manipulation",
  };

  // The "side face" rendered behind the cap so the stem looks beveled instead of flat.
  const sideStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    background: `linear-gradient(180deg, ${c.side} 0%, ${c.stem} 100%)`,
    transform: `translateY(${STEM_DEPTH + 2}px)`,
    pointerEvents: "none",
    opacity: 0.85,
    filter: "blur(0.5px)",
    zIndex: 0,
  };

  return (
    <div
      className={
        channel.wide
          ? "relative col-span-2 h-[78px] sm:h-[88px]"
          : "relative h-[68px] sm:h-[88px]"
      }
    >
      <span aria-hidden style={sideStyle} />
      <button
        type="button"
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
        onClick={() => onActivate(channel)}
        aria-label={`${channel.label} — press ${channel.key}`}
        className="font-display relative z-10 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-[14px] tracking-tight select-none"
        style={capStyle}
      >
        <span
          aria-hidden
          className="absolute top-1.5 left-2 font-mono text-[10px] tracking-widest opacity-50 sm:top-2 sm:left-2.5"
        >
          {channel.key}
        </span>
        <span
          className={
            channel.wide
              ? "text-[18px] leading-none font-bold sm:text-[22px]"
              : "text-[20px] leading-none font-bold sm:text-[24px]"
          }
        >
          {channel.short}
        </span>
        <span
          aria-hidden
          className="mt-1.5 font-mono text-[8px] tracking-[0.22em] uppercase opacity-55 sm:text-[9px]"
        >
          {channel.caption}
        </span>
      </button>
    </div>
  );
}
