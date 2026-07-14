"use client";

import { type ReactNode } from "react";
import type { MoonConfig } from "@/lib/orbits";

type SectionShellProps = {
  id: string;
  moon: MoonConfig;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  moon,
  title,
  subtitle,
  children,
}: SectionShellProps) {
  const accent = moon.edgeColor;

  return (
    <section
      id={id}
      className="relative scroll-mt-12 px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20"
    >
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-10 md:mb-14">
          <div className="mb-5 flex items-center gap-3 font-mono text-mono-meta uppercase md:mb-6">
            <span
              aria-hidden
              className="h-px w-8 sm:w-10"
              style={{
                background: `linear-gradient(to right, ${accent}, transparent)`,
              }}
            />
            <span style={{ color: accent }}>{moon.label}</span>
          </div>

          <h2 className="font-display text-fg text-balance text-display-xl">
            {title}
          </h2>

          {subtitle && (
            <p className="text-fg/65 mt-3 max-w-xl text-base md:mt-4">
              {subtitle}
            </p>
          )}
        </header>

        <div>{children}</div>
      </div>
    </section>
  );
}
