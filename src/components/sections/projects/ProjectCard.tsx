"use client";

import Image from "next/image";
import { useCallback } from "react";
import type { Project } from "@/data/projects";
import { useInView } from "@/lib/useInView";
import { useCardSpotlight } from "@/lib/useCardSpotlight";

const ACCENT = "#00E5FF";

type Props = {
  project: Project;
  index: number;
  onOpen: () => void;
};

export function ProjectCard({ project, index, onOpen }: Props) {
  const [inViewRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const spotlight = useCardSpotlight({ maxTilt: 7, parallax: 5 });
  const idx = String(index + 1).padStart(2, "0");
  const floatDelay = `${(index % 4) * -1.4}s`;

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      inViewRef.current = node;
      spotlight.ref.current = node;
    },
    [inViewRef, spotlight.ref],
  );

  const enterDelay = index * 140;

  return (
    <div
      ref={setRefs}
      onMouseMove={spotlight.handlers.onMouseMove}
      onMouseEnter={spotlight.handlers.onMouseEnter}
      onMouseLeave={spotlight.handlers.onMouseLeave}
      className={`h-full ${inView ? "card-materialize" : "opacity-0"}`}
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
        aria-label={`Open ${project.title} case file`}
        className={`group bg-raised/40 relative flex h-full w-full flex-col overflow-hidden rounded-md border text-left transition-[border-color,box-shadow] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
          spotlight.active ? "" : "card-float"
        }`}
        style={{
          ...spotlight.style,
          borderColor: spotlight.active ? ACCENT : "var(--border-default)",
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

        {inView && (
          <>
            <span
              aria-hidden
              className="card-edge-flash pointer-events-none absolute inset-0 z-[2] rounded-md"
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

        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
          ) : (
            <PlaceholderArt index={idx} />
          )}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(3,5,11,0.85) 100%)",
              opacity: spotlight.active ? 1 : 0.7,
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-500"
            style={{
              background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
              opacity: spotlight.active ? 1 : 0.4,
            }}
          />

          {spotlight.active && (
            <span
              aria-hidden
              className="card-scan-sweep pointer-events-none absolute inset-x-0 top-0 h-[35%]"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(0,229,255,0.32), transparent)",
              }}
            />
          )}

          <span
            aria-hidden
            className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: ACCENT, opacity: 0.85 }}
          >
            {idx} / {project.category}
          </span>

          <span
            className="bg-raised/90 absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 font-mono text-[10px] tracking-[0.28em] uppercase backdrop-blur-md transition-all duration-300"
            style={{
              borderColor: ACCENT,
              color: ACCENT,
              transform: spotlight.active ? "translateX(0)" : "translateX(8px)",
              opacity: spotlight.active ? 1 : 0,
            }}
          >
            open
            <span aria-hidden>→</span>
          </span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-2 p-5 sm:p-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-fg text-[clamp(1.15rem,1.8vw,1.4rem)] leading-tight tracking-tight text-balance">
              {project.title}
            </h3>
            {project.client && (
              <p
                className="font-mono text-[10px] tracking-[0.28em] uppercase"
                style={{ color: ACCENT, opacity: 0.85 }}
              >
                {project.client}
              </p>
            )}
          </div>
          <p className="text-subtle line-clamp-2 text-[14px] leading-relaxed">
            {project.tagline}
          </p>

          <div className="mt-auto flex items-center gap-2 pt-3">
            <span
              aria-hidden
              className="block h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, var(--border-default), transparent)",
              }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
              style={{ color: spotlight.active ? ACCENT : "var(--fg-subtle)" }}
            >
              case file
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}

function PlaceholderArt({ index }: { index: string }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(70% 60% at 28% 32%, rgba(0,229,255,0.22), rgba(0,107,122,0.06) 55%, transparent 100%), linear-gradient(135deg, #060912 0%, #0c1120 55%, #03050b 100%)",
      }}
    >
      <div
        aria-hidden
        className="bg-blueprint-grid absolute inset-0 opacity-[0.16]"
      />
      <span
        aria-hidden
        className="font-display absolute inset-0 flex items-center justify-center text-[8rem] leading-none tracking-tighter"
        style={{
          color: "rgba(0,229,255,0.08)",
          mixBlendMode: "screen",
        }}
      >
        {index}
      </span>
    </div>
  );
}

