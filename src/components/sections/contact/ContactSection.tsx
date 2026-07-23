"use client";

import { Chassis } from "./Chassis";
import { useInView } from "@/lib/useInView";

export function ContactSection() {
  const [sentinelRef, drawerInView] = useInView<HTMLDivElement>({
    rootMargin: "0px 0px -10% 0px",
    threshold: 0,
  });

  return (
    <section
      id="contact"
      className="relative flex min-h-[55svh] scroll-mt-12 flex-col overflow-hidden pt-8 md:pt-12"
    >
      <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      <div className="flex-1" />
      <div
        className="will-change-transform"
        style={{
          transform: drawerInView ? "translateY(0)" : "translateY(105%)",
          opacity: drawerInView ? 1 : 0,
          transition:
            "transform 1000ms cubic-bezier(0.16, 0.84, 0.24, 1), opacity 600ms ease 120ms",
        }}
      >
        <Chassis />
      </div>
    </section>
  );
}
