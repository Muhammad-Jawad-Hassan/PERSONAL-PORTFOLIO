"use client";

import { useState } from "react";
import type { Testimonial } from "@/data/testimonials";

const ACCENT = "#00E5FF";

type Props = {
  testimonial: Testimonial;
  active: boolean;
  index: number;
};

export function TestimonialCard({ testimonial, active, index }: Props) {
  const [hover, setHover] = useState(false);
  const enterDelay = index * 130;

  return (
    <div
      className={active ? "card-materialize-soft" : "opacity-0"}
      style={{
        animationDelay: `${enterDelay}ms`,
        perspective: "1200px",
      }}
    >
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative flex h-full min-h-[380px] w-[clamp(320px,30vw,400px)] shrink-0 flex-col justify-center overflow-hidden rounded-lg border p-8 transition-all duration-500 sm:min-h-[420px] sm:p-9"
        style={{
          background:
            "linear-gradient(180deg, rgba(19, 26, 45, 0.55) 0%, rgba(12, 17, 32, 0.55) 100%)",
          borderColor: hover ? ACCENT : "var(--border-default)",
          backdropFilter: "blur(6px)",
          boxShadow: hover
            ? "0 0 32px rgba(0,229,255,0.2), 0 24px 48px rgba(0,0,0,0.45)"
            : "0 6px 18px rgba(0,0,0,0.25)",
          transform: hover ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Decorative opening quote */}
        <span
          aria-hidden
          className="font-display absolute -top-4 left-5 select-none text-[8.5rem] leading-none transition-opacity duration-500"
          style={{
            color: hover ? `${ACCENT}66` : `${ACCENT}33`,
          }}
        >
          “
        </span>

        {/* Top hairline */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
            opacity: hover ? 1 : 0.35,
          }}
        />

        {/* One-shot entrance overlays: edge flash + scan beam */}
        {active && (
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

        <p
          className="relative z-10 text-[17px] leading-relaxed sm:text-[18px]"
          style={{ color: "rgba(232, 236, 245, 0.9)" }}
        >
          {testimonial.quote}
        </p>

        <span
          aria-hidden
          className="mt-8 mb-6 block h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--border-default), transparent)",
          }}
        />

        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p
              className="truncate font-mono text-[14px] tracking-[0.16em] uppercase"
              style={{ color: "var(--fg-default)" }}
            >
              {testimonial.author}
            </p>
            <p
              className="mt-1.5 truncate font-mono text-[12px] tracking-[0.22em] uppercase"
              style={{ color: "rgba(232, 236, 245, 0.55)" }}
            >
              {testimonial.role}
              <span aria-hidden style={{ color: ACCENT, margin: "0 0.4em" }}>
                ·
              </span>
              {testimonial.company}
            </p>
          </div>

          <span
            aria-hidden
            className="block h-2 w-2 rotate-45 transition-shadow duration-500"
            style={{
              background: ACCENT,
              boxShadow: hover ? `0 0 14px ${ACCENT}` : `0 0 6px ${ACCENT}88`,
            }}
          />
        </div>
      </article>
    </div>
  );
}
