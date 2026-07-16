"use client";

import { useState } from "react";
import { experience } from "@/data/experience";
import { useInView } from "@/lib/useInView";
import { COLOR, TRACK } from "@/lib/theme";
import { TimelineCard } from "./TimelineCard";
import { NodeMarker } from "./NodeMarker";
import { ExperienceModal } from "./ExperienceModal";
import { NODE_SIZE, ROD_LEFT_PX, SPUR_LEN } from "./utils";

export function ExperienceSection() {
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>({
    threshold: 0.05,
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? experience[openIndex] : null;

  return (
    <>
      <section
        id="experience"
        className="relative scroll-mt-12 px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24"
      >
        <div className="mx-auto w-full max-w-5xl">
          <header className="relative mb-14 flex flex-col items-center text-center md:mb-20">
            <h2 className="font-display text-fg text-balance text-display-xl">
              <span style={{ color: COLOR.accent }}>Trajectory</span>
            </h2>

            <div className="mt-5 flex items-center gap-3 md:mt-6">
              <span
                aria-hidden
                className="block h-px w-10 sm:w-14"
                style={{
                  background: `linear-gradient(90deg, transparent, ${COLOR.accent})`,
                }}
              />
              <span
                className="font-mono text-mono-label uppercase"
                style={{ color: COLOR.fgBody, letterSpacing: TRACK }}
              >
                Experience · Career Path
              </span>
              <span
                aria-hidden
                className="block h-px w-10 sm:w-14"
                style={{
                  background: `linear-gradient(90deg, ${COLOR.accent}, transparent)`,
                }}
              />
            </div>

            <p
              className="mt-6 max-w-2xl text-base leading-relaxed md:text-lead"
              style={{ color: COLOR.fgBody }}
            >
              Three roles. Tap any card to open the case file.
            </p>
          </header>

          <div ref={sectionRef} className="relative">
            <div
              aria-hidden
              className={`pointer-events-none absolute top-0 bottom-0 z-0 ${sectionInView ? "experience-rod-draw" : "scale-y-0"}`}
              style={{
                left: `${ROD_LEFT_PX}px`,
                width: 6,
                transform: sectionInView ? undefined : "scaleY(0)",
                transformOrigin: "top center",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,107,122,0) 0%, rgba(0,107,122,0.85) 18%, rgba(91,250,255,0.95) 50%, rgba(0,107,122,0.85) 82%, rgba(0,107,122,0) 100%)",
                  borderRadius: 999,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  boxShadow:
                    "0 0 18px rgba(0, 229, 255, 0.55), 0 0 38px rgba(0, 229, 255, 0.25)",
                  borderRadius: 999,
                }}
              />
              <span
                aria-hidden
                className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                style={{
                  background: COLOR.accentBright,
                  boxShadow: "0 0 14px var(--accent-glow)",
                }}
              />
              <span
                aria-hidden
                className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                style={{
                  background: COLOR.accentBright,
                  boxShadow: "0 0 14px var(--accent-glow)",
                }}
              />
            </div>

            <ol className="relative">
              {experience.map((entry, i) => (
                <li
                  key={entry.id}
                  className="relative pb-10 last:pb-0 md:pb-12"
                  style={{
                    paddingLeft: ROD_LEFT_PX + NODE_SIZE / 2 + SPUR_LEN + 8,
                  }}
                >
                  <NodeMarker
                    isCurrent={i === 0}
                    active={sectionInView}
                    delay={400 + i * 220}
                  />

                  <span
                    aria-hidden
                    className={`absolute z-0 h-px ${sectionInView ? "experience-spur-extend" : "scale-x-0"}`}
                    style={{
                      top: 56,
                      left: ROD_LEFT_PX + NODE_SIZE / 2,
                      width: SPUR_LEN,
                      background: `linear-gradient(90deg, ${COLOR.accent}, transparent)`,
                      boxShadow: "0 0 8px var(--accent-glow)",
                      animationDelay: `${600 + i * 220}ms`,
                      transformOrigin: "left center",
                    }}
                  />

                  <TimelineCard
                    entry={entry}
                    index={i}
                    isCurrent={i === 0}
                    onOpen={() => setOpenIndex(i)}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {active && openIndex !== null && (
        <ExperienceModal
          entry={active}
          isCurrent={openIndex === 0}
          open={openIndex !== null}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
