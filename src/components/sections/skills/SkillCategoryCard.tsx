"use client";

import { useCallback } from "react";
import type { SkillCategory } from "@/data/skills";
import { categoryColor } from "@/lib/lattice";
import { getSkillIcon } from "@/data/skillIcons";
import { useInView } from "@/lib/useInView";
import { useCardSpotlight } from "@/lib/useCardSpotlight";

type Props = {
  category: SkillCategory;
  index: number;
};

export function SkillCategoryCard({ category, index }: Props) {
  const [inViewRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const spotlight = useCardSpotlight({ maxTilt: 6, parallax: 4 });
  const color = categoryColor(category.id);
  const skillCount = String(category.skills.length).padStart(2, "0");
  const floatDelay = `${(index % 4) * -1.4}s`;

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      inViewRef.current = node;
      spotlight.ref.current = node;
    },
    [inViewRef, spotlight.ref],
  );

  const enterDelay = index * 160;

  return (
    <div
      ref={setRefs}
      onMouseMove={spotlight.handlers.onMouseMove}
      onMouseEnter={spotlight.handlers.onMouseEnter}
      onMouseLeave={spotlight.handlers.onMouseLeave}
      className={inView ? "card-materialize" : "opacity-0"}
      style={{
        animationDelay: `${enterDelay}ms`,
        perspective: "1200px",
      }}
    >
      <div
        className={`group bg-raised/40 relative flex flex-col overflow-hidden rounded-md border p-6 sm:p-7 ${
          spotlight.active ? "" : "card-float"
        }`}
        style={{
          ...spotlight.style,
          borderColor: spotlight.active ? color : "var(--border-default)",
          boxShadow: spotlight.active
            ? `0 0 28px ${color}33, 0 24px 60px rgba(0,0,0,0.5)`
            : "0 6px 18px rgba(0,0,0,0.25)",
          transform: spotlight.transform || undefined,
          transition: spotlight.active
            ? "border-color 320ms, box-shadow 320ms"
            : "transform 560ms cubic-bezier(0.2,0.7,0.1,1), border-color 320ms, box-shadow 320ms",
          transformStyle: "preserve-3d",
          animationDelay: floatDelay,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
          style={{
            background: `radial-gradient(320px circle at var(--mx) var(--my), ${color}24, transparent 60%)`,
            opacity: spotlight.active ? 1 : 0,
            mixBlendMode: "screen",
          }}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
            opacity: spotlight.active ? 1 : 0.4,
          }}
        />

        {spotlight.active && (
          <span
            aria-hidden
            className="card-scan-sweep pointer-events-none absolute inset-x-0 top-0 z-[1] h-[30%]"
            style={{
              background: `linear-gradient(180deg, transparent, ${color}33, transparent)`,
            }}
          />
        )}

        {inView && (
          <>
            <span
              aria-hidden
              className="card-edge-flash pointer-events-none absolute inset-0 z-[2] rounded-md"
              style={
                {
                  animationDelay: `${enterDelay}ms`,
                  "--flash-color": `${color}E6`,
                } as React.CSSProperties
              }
            />
            <span
              aria-hidden
              className="card-beam-once pointer-events-none absolute inset-x-0 top-0 z-[2] h-[42%]"
              style={{
                background: `linear-gradient(180deg, transparent, ${color}88, transparent)`,
                animationDelay: `${enterDelay}ms`,
                mixBlendMode: "screen",
              }}
            />
          </>
        )}

        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="block h-2.5 w-2.5 rounded-full transition-shadow duration-300"
              style={{
                background: color,
                boxShadow: spotlight.active
                  ? `0 0 14px ${color}`
                  : `0 0 6px ${color}80`,
              }}
            />
            <h3
              className="font-display text-[1.2rem] tracking-tight md:text-[1.35rem]"
              style={{ color: "var(--fg-default)" }}
            >
              {category.label}
            </h3>
          </div>
          <span
            className="font-mono text-[11px] tracking-[0.3em] uppercase transition-colors duration-300"
            style={{ color: spotlight.active ? color : "var(--fg-subtle)" }}
          >
            {skillCount}
          </span>
        </div>

        <p className="text-subtle relative z-10 mt-3 text-[14px] leading-relaxed md:text-[15px]">
          {category.description}
        </p>

        <div className="relative z-10 mt-6 flex flex-wrap gap-2.5">
          {category.skills.map((name, i) => (
            <SkillPill
              key={name}
              name={name}
              color={color}
              active={inView}
              delay={index * 110 + 220 + i * 40}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillPill({
  name,
  color,
  active,
  delay,
}: {
  name: string;
  color: string;
  active: boolean;
  delay: number;
}) {
  const Icon = getSkillIcon(name);
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[12px] tracking-[0.12em] uppercase backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 sm:px-4 sm:py-2 sm:text-[13px]"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(6px)",
        transition: `opacity 460ms cubic-bezier(0.2,0.6,0.1,1) ${delay}ms, transform 460ms cubic-bezier(0.2,0.6,0.1,1) ${delay}ms, border-color 200ms, box-shadow 200ms`,
        borderColor: `${color}40`,
        background: "rgba(255,255,255,0.03)",
        color: "rgba(232, 236, 245, 0.92)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 0 14px ${color}66`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}40`;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Icon
        className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]"
        style={{ color }}
      />
      {name}
    </span>
  );
}
