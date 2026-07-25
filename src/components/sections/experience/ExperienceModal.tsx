"use client";

import { useEffect } from "react";
import type { ExperienceEntry } from "@/data/experience";
import { COLOR, GLOW, PANEL_BG_OPAQUE, TRACK } from "@/lib/theme";
import { CornerTicks } from "@/components/ui/CornerTicks";
import { Chip } from "@/components/ui/Chip";
import { OutboundLink } from "@/components/ui/OutboundLink";
import { TenureBar } from "./TenureBar";
import { tenureMonths } from "./utils";

type Props = {
  entry: ExperienceEntry;
  isCurrent: boolean;
  open: boolean;
  onClose: () => void;
};

const ENTER_DELAY = 60;
const TENURE_DELAY = ENTER_DELAY + 320;
const HIGHLIGHTS_DELAY = ENTER_DELAY + 360;
const CHIPS_DELAY = ENTER_DELAY + 700;

export function ExperienceModal({ entry, isCurrent, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const months = tenureMonths(entry.start, entry.end);
  const period =
    entry.end === "Present"
      ? `${entry.start} — Present`
      : `${entry.start} — ${entry.end}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.role} at ${entry.company}`}
      onClick={onClose}
      className="project-detail-fadein fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto px-3 py-6 sm:px-4 sm:py-12"
      style={{
        background: "rgba(3, 5, 11, 0.86)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="experience-card-enter group/modal relative w-full max-w-3xl overflow-hidden rounded-lg border"
        style={{
          background: PANEL_BG_OPAQUE,
          borderColor: COLOR.borderDefault,
          backdropFilter: "blur(8px)",
          boxShadow:
            "0 0 80px rgba(0, 229, 255, 0.18), 0 30px 80px rgba(0, 0, 0, 0.6)",
          animationDelay: `${ENTER_DELAY}ms`,
        }}
      >
        <CornerTicks opacity={0.55} zIndex={20} />

        <span
          aria-hidden
          className="experience-card-scan pointer-events-none absolute inset-x-0 top-0 z-0 h-[35%]"
          style={{
            background:
              "linear-gradient(180deg, transparent, var(--accent-glow), transparent)",
            animationDelay: `${ENTER_DELAY + 100}ms`,
            opacity: 0.4,
          }}
        />

        <CloseButton onClose={onClose} />

        <div className="relative z-10 p-5 sm:p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className="font-mono text-mono-label uppercase"
              style={{ color: COLOR.blueprint, letterSpacing: TRACK }}
            >
              {period}
            </span>

            {isCurrent ? (
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="experience-now-pulse block h-2 w-2 rounded-full"
                  style={{ background: COLOR.accentBright }}
                />
                <span
                  className="font-mono text-mono-label uppercase"
                  style={{
                    color: COLOR.accentBright,
                    letterSpacing: TRACK,
                    textShadow: "0 0 12px var(--accent-glow)",
                  }}
                >
                  Now
                </span>
              </span>
            ) : (
              <span
                className="font-mono text-mono-label uppercase"
                style={{ color: COLOR.fgSubtle, letterSpacing: TRACK }}
              >
                {entry.location}
              </span>
            )}
          </div>

          <div className="mt-5">
            <h2
              className="font-display text-display-lg md:text-display-xl"
              style={{
                color: COLOR.fgDefault,
                textShadow: isCurrent ? GLOW.textStrong : undefined,
              }}
            >
              {entry.role}
            </h2>
            <p className="mt-2 text-lead">
              <OutboundLink
                href={entry.companyUrl}
                color={isCurrent ? COLOR.accentBright : COLOR.accent}
                glow={isCurrent}
                style={{ fontWeight: 500 }}
              >
                {entry.company}
              </OutboundLink>
              {isCurrent && (
                <span style={{ color: COLOR.fgMuted }}> · {entry.location}</span>
              )}
            </p>
          </div>

          <p
            className="mt-5 max-w-prose text-lead leading-relaxed"
            style={{ color: COLOR.fgDefault }}
          >
            {entry.tagline}
          </p>

          <p
            className="mt-3 max-w-prose text-base leading-relaxed md:text-lead"
            style={{ color: COLOR.fgBody }}
          >
            {entry.summary}
          </p>

          <div className="mt-7 max-w-md">
            <TenureBar months={months} active delay={TENURE_DELAY} />
          </div>

          <div className="mt-8">
            <p
              className="mb-3 font-mono text-mono-label uppercase"
              style={{ color: COLOR.fgMuted, letterSpacing: TRACK }}
            >
              What I built
            </p>
            <ul className="space-y-3">
              {entry.highlights.map((h, i) => (
                <li
                  key={i}
                  className="experience-chip-in flex gap-3.5"
                  style={{ animationDelay: `${HIGHLIGHTS_DELAY + i * 80}ms` }}
                >
                  <span
                    aria-hidden
                    className="mt-[0.65em] block h-[7px] w-[7px] flex-shrink-0 rotate-45"
                    style={{
                      background: isCurrent ? COLOR.accentBright : COLOR.accent,
                      boxShadow: isCurrent ? GLOW.hard : GLOW.soft,
                    }}
                  />
                  <span
                    className="text-base leading-relaxed md:text-lead"
                    style={{ color: COLOR.fgBody }}
                  >
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <p
              className="mb-3 font-mono text-mono-label uppercase"
              style={{ color: COLOR.fgMuted, letterSpacing: TRACK }}
            >
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {entry.stack.map((s, i) => (
                <Chip key={s} label={s} delay={CHIPS_DELAY + i * 38} />
              ))}
            </div>
          </div>
        </div>

        <span
          aria-hidden
          className="absolute right-6 bottom-0 left-6 h-px opacity-40 transition-opacity duration-500 group-hover/modal:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLOR.accent}, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 sm:top-4 sm:right-4"
      style={{
        background: "rgba(12, 17, 32, 0.75)",
        borderColor: COLOR.borderDefault,
        color: COLOR.fgMuted,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = COLOR.accent;
        e.currentTarget.style.color = COLOR.fgDefault;
        e.currentTarget.style.boxShadow = "0 0 14px var(--accent-glow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = COLOR.borderDefault;
        e.currentTarget.style.color = COLOR.fgMuted;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="h-4 w-4"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}
