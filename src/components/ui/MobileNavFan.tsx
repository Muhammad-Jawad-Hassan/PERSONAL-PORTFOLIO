"use client";

import { useEffect, useState } from "react";
import { moons } from "@/lib/orbits";

const ARC_RADIUS = 115;
const ARC_START_DEG = 90;
const ARC_END_DEG = 180;

export function MobileNavFan() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const positions = moons.map((_, i) => {
    const t = moons.length === 1 ? 0 : i / (moons.length - 1);
    const deg = ARC_START_DEG + t * (ARC_END_DEG - ARC_START_DEG);
    const rad = (deg * Math.PI) / 180;
    return {
      x: Math.cos(rad) * ARC_RADIUS,
      y: -Math.sin(rad) * ARC_RADIUS,
    };
  });

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div className="fixed right-5 bottom-5 z-50">
        {moons.map((m, i) => {
          const { x, y } = positions[i];
          const delay = open ? i * 35 : (moons.length - 1 - i) * 25;
          return (
            <a
              key={m.id}
              href={`#${m.id}`}
              aria-label={m.label}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="bg-raised/85 absolute right-0.5 bottom-0.5 flex h-10 w-10 items-center justify-center rounded-full border-2 backdrop-blur-md will-change-transform"
              style={{
                borderColor: m.edgeColor,
                boxShadow: `0 0 14px ${m.edgeColor}55, inset 0 0 6px ${m.edgeColor}22`,
                transform: open
                  ? `translate(${x}px, ${y}px) scale(1)`
                  : "translate(0px, 0px) scale(0.4)",
                opacity: open ? 1 : 0,
                pointerEvents: open ? "auto" : "none",
                transition: `transform 420ms cubic-bezier(0.2, 0.7, 0.1, 1.05) ${delay}ms, opacity 260ms ease ${delay}ms`,
              }}
            >
              <span
                aria-hidden
                className="block h-[18px] w-[18px]"
                style={{
                  backgroundColor: m.edgeColor,
                  WebkitMaskImage: `url(${m.iconSrc})`,
                  maskImage: `url(${m.iconSrc})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </a>
          );
        })}

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close section navigator" : "Open section navigator"}
          onClick={() => setOpen((o) => !o)}
          className="bg-raised/80 relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 backdrop-blur-md transition-transform active:scale-95"
          style={{
            borderColor: "var(--accent)",
            boxShadow: open
              ? "0 0 28px var(--accent-glow), inset 0 0 12px var(--accent-glow)"
              : "var(--glow-soft)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="absolute h-7 w-7 transition-all duration-300"
            style={{
              opacity: open ? 0 : 1,
              transform: open
                ? "rotate(140deg) scale(0.55)"
                : "rotate(0deg) scale(1)",
            }}
          >
            <defs>
              <radialGradient id="mobile-fab-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent-bright)" />
                <stop offset="60%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-deep)" />
              </radialGradient>
            </defs>

            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.22"
              strokeWidth="0.6"
              strokeDasharray="1.5 2.4"
            />
            <circle
              cx="12"
              cy="12"
              r="6.6"
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.14"
              strokeWidth="0.5"
              strokeDasharray="1 2"
            />

            <circle
              className="mobile-fab-core-pulse"
              cx="12"
              cy="12"
              r="2.1"
              fill="url(#mobile-fab-core)"
            />

            <g transform="translate(12 12)">
              <g className="mobile-fab-orbit-a">
                <circle cx="6.4" cy="0" r="1.5" fill="#8B5CF6" />
                <circle cx="6.4" cy="0" r="2.6" fill="#8B5CF6" fillOpacity="0.18" />
              </g>
              <g className="mobile-fab-orbit-b">
                <circle cx="0" cy="-7.6" r="1.4" fill="#EC4899" />
                <circle cx="0" cy="-7.6" r="2.4" fill="#EC4899" fillOpacity="0.16" />
              </g>
              <g className="mobile-fab-orbit-c">
                <circle cx="-9" cy="3.2" r="1.3" fill="#10B981" />
                <circle cx="-9" cy="3.2" r="2.2" fill="#10B981" fillOpacity="0.16" />
              </g>
            </g>
          </svg>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="absolute h-5 w-5 transition-all duration-300"
            style={{
              color: "var(--accent)",
              opacity: open ? 1 : 0,
              transform: open
                ? "rotate(0) scale(1)"
                : "rotate(-140deg) scale(0.55)",
            }}
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
