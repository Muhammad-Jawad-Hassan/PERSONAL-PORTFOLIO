"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

export function ProfileBadge() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <div className="pointer-events-none fixed top-5 right-5 z-40 sm:top-7 sm:right-7 md:top-10 md:right-10">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open ${profile.name} profile photo`}
          className="pointer-events-auto group relative block h-11 w-11 overflow-hidden rounded-full border-2 bg-raised/40 backdrop-blur-md transition-all hover:scale-[1.04] sm:h-12 sm:w-12 md:h-14 md:w-14"
          style={{
            borderColor: "var(--accent)",
            boxShadow: "var(--glow-soft)",
          }}
        >
          <Image
            src="/Profile-Photo.png"
            alt={profile.name}
            fill
            sizes="56px"
            className="object-cover"
            priority
          />
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${profile.name} profile photo`}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="project-detail-fadein relative w-full max-w-md"
          >
            <div
              className="relative aspect-square w-full overflow-hidden rounded-2xl border-2"
              style={{
                borderColor: "var(--accent)",
                boxShadow: "var(--glow-hard)",
              }}
            >
              <Image
                src="/Profile-Photo.png"
                alt={profile.name}
                fill
                sizes="(min-width: 768px) 28rem, 90vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.28em] uppercase">
              <div>
                <p className="text-fg">{profile.name}</p>
                <p className="text-muted mt-1 text-[9px] tracking-[0.32em]">
                  {profile.role}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-muted hover:text-fg flex h-9 w-9 items-center justify-center rounded-full border bg-raised/60 backdrop-blur-md transition-colors hover:bg-elevated/80"
                style={{ borderColor: "var(--border-default)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
