"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function ProjectsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? projects[openIndex] : null;

  return (
    <>
      <section
        id="projects"
        className="relative scroll-mt-12 px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20"
      >
        <div className="mx-auto w-full max-w-6xl">
          <header className="relative mb-12 flex flex-col items-center text-center md:mb-16">
            <h2 className="font-display text-fg text-display-xl text-balance">
              Five <span style={{ color: "var(--accent)" }}>Worlds</span>
            </h2>

            <div className="mt-5 flex items-center gap-3 md:mt-6">
              <span
                aria-hidden
                className="block h-px w-10 sm:w-14"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--accent))",
                }}
              />
              <span className="text-fg/70 font-mono text-mono-label uppercase">
                Production AI Systems
              </span>
              <span
                aria-hidden
                className="block h-px w-10 sm:w-14"
                style={{
                  background:
                    "linear-gradient(90deg, var(--accent), transparent)",
                }}
              />
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 md:gap-7">
            {projects.map((p, i) => {
              const isLastAlone =
                projects.length % 2 === 1 && i === projects.length - 1;
              return (
                <div
                  key={p.id}
                  className={
                    isLastAlone
                      ? "sm:col-span-2 sm:col-start-2"
                      : "sm:col-span-2"
                  }
                >
                  <ProjectCard
                    project={p}
                    index={i}
                    onOpen={() => setOpenIndex(i)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {active && (
        <ProjectModal
          project={active}
          open={openIndex !== null}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
