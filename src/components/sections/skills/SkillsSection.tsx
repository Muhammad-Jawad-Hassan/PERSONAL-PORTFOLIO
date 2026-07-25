"use client";

import type { SkillCategory } from "@/data/skills";
import { skillCategories } from "@/data/skills";
import { SkillCategoryCard } from "./SkillCategoryCard";

const ACCENT = "#00E5FF";

/**
 * Explicit two-column placement by category id. CSS multi-column decides this
 * from content height instead, so the columns are laid out by hand.
 * Any category missing from both lists is appended to the right column, so
 * adding one to src/data/skills.ts can never make it silently disappear.
 */
const LEFT_COLUMN = ["ai-ml", "cloud-devops"];
const RIGHT_COLUMN = ["backend", "data", "tooling"];

function buildColumns() {
  const byId = new Map(skillCategories.map((c) => [c.id, c]));
  const pick = (ids: string[]) =>
    ids
      .map((id) => byId.get(id))
      .filter((c): c is SkillCategory => Boolean(c));

  const placed = new Set([...LEFT_COLUMN, ...RIGHT_COLUMN]);
  const left = pick(LEFT_COLUMN);
  const right = [
    ...pick(RIGHT_COLUMN),
    ...skillCategories.filter((c) => !placed.has(c.id)),
  ];

  // Stagger the entry animation in visual reading order: left, right, left…
  const order = new Map<string, number>();
  let n = 0;
  for (let row = 0; row < Math.max(left.length, right.length); row++) {
    for (const column of [left, right]) {
      const cat = column[row];
      if (cat) order.set(cat.id, n++);
    }
  }

  return { columns: [left, right], order } as const;
}

// skillCategories is static, so this is computed once rather than per render.
const { columns, order } = buildColumns();

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-12 px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="relative mb-12 flex flex-col items-center text-center md:mb-16">
          <h2 className="font-display text-fg text-display-xl text-balance">
            The <span style={{ color: ACCENT }}>Toolkit</span>
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
              Categories &amp; Tools
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

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-7">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6 md:gap-7">
              {column.map((cat) => (
                <SkillCategoryCard
                  key={cat.id}
                  category={cat}
                  index={order.get(cat.id) ?? 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
