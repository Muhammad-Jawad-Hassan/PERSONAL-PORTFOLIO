"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS: { id: string; label: string; color: string }[] = [
  { id: "about", label: "About", color: "#8B5CF6" },
  { id: "credentials", label: "Credentials", color: "#FBBF24" },
  { id: "projects", label: "Projects", color: "#00E5FF" },
  { id: "experience", label: "Experience", color: "#F97316" },
  { id: "skills", label: "Skills", color: "#EC4899" },
  { id: "testimonials", label: "Testimonials", color: "#FACC15" },
  { id: "contact", label: "Contact", color: "#10B981" },
];

export function TopNav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    let frame = 0;
    const compute = () => {
      frame = 0;
      const triggerY = window.innerHeight * 0.4;
      // Pick the last section (in document order) whose top has scrolled
      // above the trigger line. Robust for sections shorter than the
      // viewport — unlike a "trigger inside section" test, which can skip
      // short sections on tall viewports.
      let best: string | null = null;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          best = el.id;
        } else {
          break;
        }
      }
      // Snap to the final section when scrolled to the bottom.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) best = elements[elements.length - 1].id;
      setActiveId(best);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 top-5 z-40 hidden justify-center px-4 sm:top-7 md:top-10 md:flex"
    >
      <ul
        className="bg-raised/55 pointer-events-auto flex items-center gap-1 rounded-full border px-1.5 py-1 backdrop-blur-md"
        style={{
          borderColor: "var(--border-default)",
          boxShadow: "0 8px 28px rgba(0, 0, 0, 0.35)",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                className="group flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.24em] uppercase whitespace-nowrap transition-all"
                style={
                  isActive
                    ? {
                        backgroundColor: `${item.color}1f`,
                        color: item.color,
                        boxShadow: `inset 0 0 0 1px ${item.color}55, 0 0 18px ${item.color}33`,
                      }
                    : {
                        color: "var(--fg-muted)",
                      }
                }
              >
                <span
                  aria-hidden
                  className="block h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 group-hover:scale-125"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: isActive
                      ? `0 0 12px ${item.color}cc`
                      : `0 0 6px ${item.color}66`,
                    transform: isActive ? "scale(1.4)" : undefined,
                  }}
                />
                <span
                  className="transition-colors duration-200 group-hover:text-fg"
                  style={isActive ? { color: item.color } : undefined}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
