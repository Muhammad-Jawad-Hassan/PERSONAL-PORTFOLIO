"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

/** Single-sourced from profile data so the hero, loader, and metadata never drift. */
export const JOB_TITLE = profile.role;
const CURTAIN_OPENING_EVENT = "portfolio:curtain-opening";
const LOADER_DONE_EVENT = "portfolio:loader-done";

function handleScrollToFirst() {
  const el = document.getElementById("about");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroCaption() {
  const [chromeRevealed, setChromeRevealed] = useState(false);
  const [nameRevealed, setNameRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onCurtainOpening = () => setChromeRevealed(true);
    const onLoaderDone = () => {
      setChromeRevealed(true);
      setNameRevealed(true);
    };

    window.addEventListener(CURTAIN_OPENING_EVENT, onCurtainOpening);
    window.addEventListener(LOADER_DONE_EVENT, onLoaderDone);

    return () => {
      window.removeEventListener(CURTAIN_OPENING_EVENT, onCurtainOpening);
      window.removeEventListener(LOADER_DONE_EVENT, onLoaderDone);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-16 z-10 flex flex-col items-center px-5 text-center sm:bottom-20 md:bottom-24 md:px-6">
        <h1 className="font-display text-balance leading-[0.92] tracking-tight">
          <span
            data-hero-name
            className="text-fg block text-[clamp(1.5rem,4.5vw,3.4rem)] font-medium"
            style={{
              visibility: nameRevealed ? "visible" : "hidden",
            }}
          >
            {profile.name}
          </span>
        </h1>

        <p
          data-hero-role
          className="mt-4 max-w-2xl px-2 font-mono text-[9px] tracking-[0.22em] uppercase sm:tracking-[0.28em] md:mt-5 md:px-4 md:text-[11px] md:tracking-[0.34em]"
          style={{
            color: "var(--accent)",
            textShadow: "0 0 14px var(--accent-glow)",
            visibility: nameRevealed ? "visible" : "hidden",
          }}
        >
          {JOB_TITLE}
        </p>
      </div>

      <button
        type="button"
        onClick={handleScrollToFirst}
        className="group bg-raised/40 hover:bg-raised/70 pointer-events-auto absolute inset-x-0 bottom-4 z-10 mx-auto flex w-max items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.32em] uppercase backdrop-blur-md transition-all duration-700 sm:bottom-5 md:bottom-6"
        style={{
          borderColor: "var(--border-default)",
          opacity: chromeRevealed ? 1 : 0,
        }}
        aria-label="Scroll to begin"
        aria-hidden={!chromeRevealed}
        tabIndex={chromeRevealed ? 0 : -1}
      >
        <span className="text-muted group-hover:text-fg transition-colors">
          Scroll Down
        </span>
        <span
          aria-hidden
          className="flex h-4 w-4 items-center justify-center rounded-full border"
          style={{ borderColor: "var(--accent)" }}
        >
          <span className="scroll-cue-arrow" style={{ color: "var(--accent)" }}>
            ↓
          </span>
        </span>
      </button>
    </>
  );
}
