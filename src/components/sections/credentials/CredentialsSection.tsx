"use client";

import type { CSSProperties, ReactNode } from "react";
import { achievements, education } from "@/data/achievements";
import { CornerTicks } from "@/components/ui/CornerTicks";
import { useInView } from "@/lib/useInView";
import { useCardSpotlight } from "@/lib/useCardSpotlight";
import { COLOR, GLOW, PANEL_BG, TRACK } from "@/lib/theme";

const ACCENT = "#00E5FF";

function SectionHeader() {
  return (
    <header className="relative mb-12 flex flex-col items-center text-center md:mb-16">
      <h2 className="font-display text-fg text-display-xl text-balance">
        Credentials
      </h2>

      <div className="mt-5 flex items-center gap-3 md:mt-6">
        <span
          aria-hidden
          className="block h-px w-10 sm:w-14"
          style={{
            background: `linear-gradient(90deg, transparent, ${ACCENT})`,
          }}
        />
        <span className="text-fg/70 font-mono text-mono-label uppercase">
          On Record
        </span>
        <span
          aria-hidden
          className="block h-px w-10 sm:w-14"
          style={{
            background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
          }}
        />
      </div>
    </header>
  );
}

export function CredentialsSection() {
  return (
    <section
      id="credentials"
      className="relative scroll-mt-12 px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader />

        <div className="grid gap-5 md:grid-cols-2 md:gap-7">
          <EducationCard />
          <AchievementsCard />
        </div>
      </div>
    </section>
  );
}

function Panel({
  children,
  delay = 0,
  label,
}: {
  children: ReactNode;
  delay?: number;
  label: string;
}) {
  const [inViewRef, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const spotlight = useCardSpotlight({ maxTilt: 5, parallax: 4 });

  return (
    <div
      ref={inViewRef}
      className="relative h-full"
      style={{ perspective: "1200px" }}
    >
      <div
        className={`h-full ${inView ? "card-materialize-soft" : "opacity-0"}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <article
          ref={spotlight.ref}
          onMouseMove={spotlight.handlers.onMouseMove}
          onMouseEnter={spotlight.handlers.onMouseEnter}
          onMouseLeave={spotlight.handlers.onMouseLeave}
          className="group relative h-full overflow-hidden rounded-lg border p-6 sm:p-7 md:p-8"
          style={{
            background: PANEL_BG,
            borderColor: spotlight.active ? ACCENT : COLOR.borderDefault,
            boxShadow: spotlight.active
              ? "0 0 32px rgba(0,229,255,0.22), 0 24px 48px rgba(0,0,0,0.45)"
              : "0 6px 18px rgba(0,0,0,0.25)",
            backdropFilter: "blur(6px)",
            transformStyle: "preserve-3d",
            transform: spotlight.transform || undefined,
            transition: spotlight.active
              ? "border-color 320ms ease, box-shadow 320ms ease"
              : "transform 560ms cubic-bezier(0.2,0.7,0.1,1), border-color 320ms ease, box-shadow 320ms ease",
            ...spotlight.style,
          }}
        >
          <CornerTicks opacity={0.55} />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(0, 229, 255, 0.14), transparent 60%)",
              opacity: spotlight.active ? 1 : 0,
            }}
          />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300"
            style={{
              background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
              opacity: spotlight.active ? 1 : 0.4,
            }}
          />

          {inView && (
            <span
              aria-hidden
              className="card-beam-once pointer-events-none absolute inset-x-0 top-0 z-[2] h-[40%]"
              style={{
                background: `linear-gradient(180deg, transparent, rgba(0,229,255,0.45), transparent)`,
                animationDelay: `${delay + 220}ms`,
                mixBlendMode: "screen",
              }}
            />
          )}

          {spotlight.active && (
            <span
              aria-hidden
              className="card-scan-sweep pointer-events-none absolute inset-x-0 top-0 z-[1] h-[28%]"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(0,229,255,0.22), transparent)",
              }}
            />
          )}

          <div
            className="relative z-10 flex h-full flex-col"
            style={{ transform: "translateZ(20px)" }}
          >
            <p
              className="mb-5 font-mono text-mono-label uppercase"
              style={{ color: COLOR.fgMuted, letterSpacing: TRACK }}
            >
              {label}
            </p>
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}

function EducationCard() {
  return (
    <Panel label="Education" delay={0}>
      <div className="flex flex-1 flex-col">
        <h3
          className="font-display text-balance text-display-lg leading-[1.05] tracking-tight"
          style={{ color: COLOR.fgDefault }}
        >
          {education.degree}
        </h3>

        <p
          className="mt-3 text-lead leading-relaxed"
          style={{ color: COLOR.fgBody }}
        >
          {education.institution} · {education.location}
        </p>

        <div className="mt-5 flex items-center gap-2.5">
          <span
            aria-hidden
            className="block h-2 w-2 flex-shrink-0 rotate-45"
            style={{ background: ACCENT, boxShadow: GLOW.soft }}
          />
          <span
            className="font-mono text-[0.875rem] uppercase tracking-[0.28em]"
            style={{ color: ACCENT, textShadow: GLOW.text }}
          >
            {education.honor}
          </span>
        </div>

        <div className="flex-1" />

        <div
          className="mt-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-6 border-t pt-7"
          style={{ borderColor: COLOR.borderSubtle }}
        >
          <Metric
            label="Term"
            value={`${formatYear(education.start)}–${formatYear(education.end)}`}
          />
          <Metric label="CGPA" value={education.cgpa} highlight />
        </div>
      </div>
    </Panel>
  );
}

function AchievementsCard() {
  return (
    <Panel label="Achievements" delay={140}>
      <ul className="flex flex-1 flex-col justify-between gap-y-6">
        {achievements.map((a, i) => (
          <AchievementRow
            key={a.id}
            title={a.title}
            emphasis={a.emphasis}
            delay={300 + i * 100}
          />
        ))}
      </ul>
    </Panel>
  );
}

function AchievementRow({
  title,
  emphasis,
  delay,
}: {
  title: string;
  emphasis?: string;
  delay: number;
}) {
  return (
    <li
      className="experience-chip-in flex gap-3.5"
      style={{ animationDelay: `${delay}ms` } as CSSProperties}
    >
      <span
        aria-hidden
        className="mt-[0.5em] block h-[7px] w-[7px] flex-shrink-0 rotate-45"
        style={{ background: ACCENT, boxShadow: GLOW.soft }}
      />
      <div className="flex flex-1 flex-col gap-y-1">
        <h4
          className="font-display text-display-md leading-snug tracking-tight"
          style={{ color: COLOR.fgDefault }}
        >
          {title}
        </h4>
        {emphasis && (
          <span
            className="font-mono text-mono-meta uppercase"
            style={{ color: COLOR.fgMuted, letterSpacing: TRACK }}
          >
            {emphasis}
          </span>
        )}
      </div>
    </li>
  );
}

function Metric({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span
        className="font-mono text-mono-meta uppercase"
        style={{ color: COLOR.fgMuted, letterSpacing: TRACK }}
      >
        {label}
      </span>
      <span
        className="mt-1 font-display text-display-md leading-none tracking-tight"
        style={{
          color: highlight ? ACCENT : COLOR.fgDefault,
          textShadow: highlight ? GLOW.text : undefined,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function formatYear(value: string) {
  const match = value.match(/(\d{4})/);
  return match ? match[1] : value;
}
