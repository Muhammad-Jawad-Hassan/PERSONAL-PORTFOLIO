"use client";

import { useCallback } from "react";
import type { ExperienceEntry } from "@/data/experience";
import { useInView } from "@/lib/useInView";
import { useCardSpotlight } from "@/lib/useCardSpotlight";
import { COLOR, GLOW, PANEL_BG, TRACK } from "@/lib/theme";
import { CornerTicks } from "@/components/ui/CornerTicks";

type TimelineCardProps = {
  entry: ExperienceEntry;
  isCurrent: boolean;
  index: number;
  onOpen: () => void;
};

export function TimelineCard({
  entry,
  isCurrent,
  index,
  onOpen,
}: TimelineCardProps) {
  const [inViewRef, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const spotlight = useCardSpotlight({ maxTilt: 5, parallax: 4 });
  const floatDelay = `${(index % 4) * -1.6}s`;
  const enterDelay = 220 + index * 180;

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      inViewRef.current = node;
      spotlight.ref.current = node;
    },
    [inViewRef, spotlight.ref],
  );

  const period =
    entry.end === "Present"
      ? `${entry.start} — Present`
      : `${entry.start} — ${entry.end}`;

  return (
    <div
      ref={setRefs}
      onMouseMove={spotlight.handlers.onMouseMove}
      onMouseEnter={spotlight.handlers.onMouseEnter}
      onMouseLeave={spotlight.handlers.onMouseLeave}
      className={`relative ${inView ? "card-materialize" : "opacity-0"}`}
      style={{
        animationDelay: `${enterDelay}ms`,
        perspective: "1200px",
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        onFocus={spotlight.handlers.onMouseEnter}
        onBlur={spotlight.handlers.onMouseLeave}
        aria-label={`Open ${entry.role} at ${entry.company}`}
        className={`group/card relative w-full overflow-hidden rounded-lg border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
          spotlight.active ? "" : "card-float"
        }`}
        style={{
          ...spotlight.style,
          background: PANEL_BG,
          borderColor: spotlight.active ? COLOR.accent : COLOR.borderDefault,
          backdropFilter: "blur(6px)",
          boxShadow: spotlight.active
            ? "0 0 32px rgba(0,229,255,0.22), 0 24px 60px rgba(0,0,0,0.5)"
            : "0 6px 18px rgba(0,0,0,0.25)",
          transform: spotlight.transform || undefined,
          transition: spotlight.active
            ? "border-color 320ms, box-shadow 320ms"
            : "transform 560ms cubic-bezier(0.2,0.7,0.1,1), border-color 320ms, box-shadow 320ms",
          transformStyle: "preserve-3d",
          animationDelay: floatDelay,
        }}
      >
        <CornerTicks />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(360px circle at var(--mx) var(--my), rgba(0,229,255,0.18), transparent 60%)",
            opacity: spotlight.active ? 1 : 0,
            mixBlendMode: "screen",
          }}
        />

        {spotlight.active && (
          <span
            aria-hidden
            className="card-scan-sweep pointer-events-none absolute inset-x-0 top-0 z-[1] h-[30%]"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(0,229,255,0.32), transparent)",
            }}
          />
        )}

        {inView && (
          <>
            <span
              aria-hidden
              className="card-edge-flash pointer-events-none absolute inset-0 z-[2] rounded-lg"
              style={{ animationDelay: `${enterDelay}ms` }}
            />
            <span
              aria-hidden
              className="card-beam-once pointer-events-none absolute inset-x-0 top-0 z-[2] h-[42%]"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(0,229,255,0.55), transparent)",
                animationDelay: `${enterDelay}ms`,
                mixBlendMode: "screen",
              }}
            />
          </>
        )}

        <div className="relative z-10 p-5 sm:p-6 md:p-7">
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

          <div className="mt-4">
            <h3
              className="font-display text-display-md md:text-display-lg"
              style={{
                color: COLOR.fgDefault,
                textShadow: isCurrent ? GLOW.textStrong : undefined,
              }}
            >
              {entry.role}
            </h3>
            <p className="mt-1.5 text-lead">
              <span
                style={{
                  color: isCurrent ? COLOR.accentBright : COLOR.accent,
                  fontWeight: 500,
                  textShadow: isCurrent ? "0 0 14px var(--accent-glow)" : undefined,
                }}
              >
                {entry.company}
              </span>
            </p>
          </div>

          <p
            className="mt-4 max-w-prose text-base leading-relaxed md:text-lead"
            style={{ color: COLOR.fgBody }}
          >
            {entry.tagline}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <span
              aria-hidden
              className="block h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, var(--border-default), transparent)",
              }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-300"
              style={{
                color: spotlight.active ? COLOR.accent : COLOR.fgSubtle,
                transform: spotlight.active
                  ? "translateX(0)"
                  : "translateX(-4px)",
              }}
            >
              open case file →
            </span>
          </div>
        </div>

        <span
          aria-hidden
          className="absolute right-6 bottom-0 left-6 h-px opacity-30 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLOR.accent}, transparent)`,
          }}
        />
      </button>
    </div>
  );
}
