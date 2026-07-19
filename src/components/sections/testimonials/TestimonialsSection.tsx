"use client";

import { testimonials } from "@/data/testimonials";
import { TestimonialRow } from "./TestimonialRow";

const ACCENT = "#00E5FF";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-12 px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="relative mb-12 flex flex-col items-center text-center md:mb-16">
          <h2 className="font-display text-fg text-display-xl text-balance">
            On <span style={{ color: ACCENT }}>Record</span>
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
              What People Said
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
      </div>

      {/* Single marquee row, escaping the max-w container for edge-to-edge flow. */}
      <TestimonialRow
        testimonials={testimonials}
        direction="left"
        speedSeconds={70}
      />
    </section>
  );
}
