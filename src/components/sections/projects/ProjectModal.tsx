"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { COLOR, GLOW, PANEL_BG_OPAQUE, TRACK } from "@/lib/theme";
import { CornerTicks } from "@/components/ui/CornerTicks";
import { Chip } from "@/components/ui/Chip";
import { OutboundLink } from "@/components/ui/OutboundLink";

type Props = {
  project: Project;
  open: boolean;
  onClose: () => void;
};

const ENTER_DELAY = 60;
const HIGHLIGHTS_DELAY = ENTER_DELAY + 360;
const CHIPS_DELAY = ENTER_DELAY + 700;

export function ProjectModal({ project, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const projectIndex = projects.findIndex((p) => p.id === project.id);
  const idx = String(Math.max(projectIndex, 0) + 1).padStart(2, "0");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case file`}
      onClick={onClose}
      className="project-detail-fadein fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto px-3 py-6 sm:px-4 sm:py-12"
      style={{
        background: "rgba(3, 5, 11, 0.86)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="experience-card-enter group/modal relative w-full max-w-4xl overflow-hidden rounded-lg border"
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

        <ModalHero project={project} idx={idx} />

        <div className="relative z-10 grid gap-8 px-5 py-7 sm:gap-10 sm:px-8 sm:py-8 md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] md:gap-12 md:px-10 md:py-10">
          <ModalBody project={project} />
          <ModalAside project={project} />
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
      aria-label="Close case file"
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

function ModalHero({ project, idx }: { project: Project; idx: string }) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden border-b sm:aspect-[16/9]"
      style={{
        borderColor: "rgba(0, 229, 255, 0.22)",
        background: "rgba(12, 17, 32, 0.4)",
      }}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 56rem, 100vw"
          priority
          className="object-cover"
        />
      ) : (
        <ModalPlaceholder id={project.id} index={idx} />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 50%, rgba(3, 5, 11, 0.94) 100%)",
        }}
      />

      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-x-2 gap-y-1 pr-12 sm:top-5 sm:left-5 sm:gap-x-2.5 sm:pr-14">
        <span
          className="font-mono text-mono-label uppercase"
          style={{ color: COLOR.accent, letterSpacing: TRACK }}
        >
          World {idx}
        </span>
        <span
          aria-hidden
          className="font-mono text-mono-label"
          style={{ color: COLOR.fgSubtle, letterSpacing: TRACK }}
        >
          –
        </span>
        <span
          className="font-mono text-mono-label uppercase"
          style={{ color: COLOR.accent, letterSpacing: TRACK }}
        >
          {project.category}
        </span>
      </div>

      <div className="absolute right-5 bottom-4 left-5 sm:right-6 sm:bottom-5 sm:left-6">
        <h2
          className="font-display text-display-lg max-w-3xl text-balance"
          style={{ color: COLOR.fgDefault, textShadow: GLOW.textStrong }}
        >
          {project.title}
        </h2>
        {project.client && (
          <p
            className="mt-2 font-mono text-mono-label uppercase"
            style={{ color: COLOR.fgMuted, letterSpacing: TRACK }}
          >
            Built for{" "}
            <OutboundLink href={project.url} color={COLOR.accentBright} glow>
              {project.client}
            </OutboundLink>
          </p>
        )}
      </div>
    </div>
  );
}

function ModalBody({ project }: { project: Project }) {
  return (
    <div>
      <p
        className="text-lead leading-relaxed"
        style={{ color: COLOR.fgDefault }}
      >
        {project.tagline}
      </p>
      <p
        className="mt-4 max-w-prose text-base leading-relaxed md:text-lead"
        style={{ color: COLOR.fgBody }}
      >
        {project.summary}
      </p>

      <div className="mt-8">
        <p
          className="mb-4 font-mono text-mono-label uppercase"
          style={{ color: COLOR.fgMuted, letterSpacing: TRACK }}
        >
          What I built
        </p>
        <ul className="space-y-3">
          {project.highlights.map((h, i) => (
            <li
              key={i}
              className="experience-chip-in flex gap-3.5"
              style={{ animationDelay: `${HIGHLIGHTS_DELAY + i * 80}ms` }}
            >
              <span
                aria-hidden
                className="mt-[0.65em] block h-[7px] w-[7px] flex-shrink-0 rotate-45"
                style={{ background: COLOR.accent, boxShadow: GLOW.soft }}
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
    </div>
  );
}

function ModalAside({ project }: { project: Project }) {
  return (
    <aside className="space-y-8">
      <div>
        <p
          className="mb-3 font-mono text-mono-label uppercase"
          style={{ color: COLOR.fgMuted, letterSpacing: TRACK }}
        >
          Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s, i) => (
            <Chip key={s} label={s} delay={CHIPS_DELAY + i * 38} />
          ))}
        </div>
      </div>

      <div>
        <p
          className="mb-3 font-mono text-mono-label uppercase"
          style={{ color: COLOR.fgMuted, letterSpacing: TRACK }}
        >
          World concept
        </p>
        <div
          className="relative overflow-hidden rounded-md border-l-2 px-4 py-3.5"
          style={{
            borderColor: COLOR.accentBright,
            background: "rgba(0, 229, 255, 0.05)",
            boxShadow: "inset 0 0 24px rgba(0, 229, 255, 0.05)",
          }}
        >
          <p
            className="text-base leading-relaxed italic"
            style={{ color: COLOR.fgBody }}
          >
            {project.worldConcept}
          </p>
        </div>
      </div>
    </aside>
  );
}

function ModalPlaceholder({ id, index }: { id: string; index: string }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(70% 60% at 30% 35%, rgba(0,229,255,0.22), rgba(0,107,122,0.06) 55%, transparent 100%), linear-gradient(135deg, #060912 0%, #0c1120 55%, #03050b 100%)",
      }}
    >
      <div
        aria-hidden
        className="bg-blueprint-grid absolute inset-0 opacity-[0.16]"
      />
      <span
        aria-hidden
        className="font-display absolute inset-0 flex items-center justify-center text-[18vw] leading-none tracking-tighter md:text-[12rem]"
        style={{
          color: "rgba(0,229,255,0.08)",
          mixBlendMode: "screen",
        }}
      >
        {index}
      </span>
      <span
        aria-hidden
        className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.32em] uppercase opacity-70"
        style={{ color: "rgba(0,229,255,0.7)" }}
      >
        {id}
      </span>
    </div>
  );
}
