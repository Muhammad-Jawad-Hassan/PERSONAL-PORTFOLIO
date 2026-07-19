"use client";

import { useInView } from "@/lib/useInView";
import type { Testimonial } from "@/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";

type Props = {
  testimonials: Testimonial[];
  direction: "left" | "right";
  speedSeconds: number;
};

export function TestimonialRow({
  testimonials,
  direction,
  speedSeconds,
}: Props) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  if (testimonials.length === 0) return null;
  // Duplicate so the marquee can loop seamlessly via translateX -50%.
  const list = [...testimonials, ...testimonials];
  const animationName =
    direction === "left" ? "skill-marquee-left" : "skill-marquee-right";

  return (
    <div
      ref={ref}
      className="relative w-full overflow-x-clip"
      aria-label="Testimonials"
    >
      {/* Padded + masked middle layer. py provides vertical breathing room
          so hover-lifted cards don't clip against the marquee bounds. */}
      <div
        className="py-8 md:py-10"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        {/* Marquee track. Animation longhands are inline so play-state
            stays free for :has() to override on card hover. */}
        <div
          className="flex w-max items-stretch gap-6 has-[article:hover]:[animation-play-state:paused] md:gap-8"
          style={{
            animationName,
            animationDuration: `${speedSeconds}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {list.map((t, i) => (
            <TestimonialCard
              key={`${t.id}-${i}`}
              testimonial={t}
              active={inView}
              index={i % testimonials.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
