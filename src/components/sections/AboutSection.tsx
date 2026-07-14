"use client";

import { FieldInterview } from "./about/FieldInterview";

const ACCENT = "#00E5FF";

function SectionHeader() {
  return (
    <header className="relative mb-12 flex flex-col items-center text-center md:mb-16">
      <h2 className="font-display text-fg text-display-xl text-balance">
        Field <span style={{ color: ACCENT }}>Interview</span>
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
          Six Questions · No Resume
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

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-12 px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader />
        <FieldInterview />
      </div>
    </section>
  );
}
