"use client";

import { Crt } from "./Crt";
import { Keyboard } from "./Keyboard";

export function Chassis() {
  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 bottom-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 100%, rgba(0, 229, 255, 0.12) 0%, rgba(0, 229, 255, 0) 60%)",
        }}
      />

      <div
        className="relative w-full overflow-hidden rounded-t-[32px] sm:rounded-t-[44px]"
        style={{
          background:
            "linear-gradient(180deg, #0a0e18 0%, #050810 60%, #02040a 100%)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 -8px 24px rgba(0, 229, 255, 0.05)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(108, 211, 255, 0.45), transparent)",
          }}
        />

        <div className="relative mx-auto flex w-full max-w-[1600px] flex-col items-center gap-3 px-4 py-4 sm:gap-5 sm:px-6 sm:py-6 md:flex-row md:items-end md:gap-6 md:px-10 md:py-7 lg:gap-8">
          <div className="order-2 flex-shrink-0 md:order-1">
            <Keyboard />
          </div>

          <div className="order-1 w-full md:order-2 md:w-auto md:flex-1 md:self-stretch">
            <Grille />
          </div>

          <div className="order-3 w-[clamp(240px,65vw,320px)] flex-shrink-0 self-center md:w-[320px] md:self-end">
            <div className="aspect-square w-full">
              <Crt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Grille() {
  return (
    <div
      className="relative h-full min-h-[120px] overflow-hidden rounded-xl sm:min-h-[170px] md:min-h-[210px]"
      style={{
        background: "linear-gradient(180deg, #060a14 0%, #03060c 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 32px rgba(0,0,0,0.7)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-3"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 5px), repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0 4px, transparent 4px 5px)",
          borderRadius: "6px",
          boxShadow: "inset 0 0 18px rgba(0,0,0,0.7)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-4 sm:gap-3 sm:px-6 md:gap-4">
        <h2
          className="text-balance text-center text-[clamp(2rem,5.6vw,4.4rem)] leading-[1.05] font-semibold"
          style={{
            fontFamily: "var(--font-script), cursive",
            color: "#6cd3ff",
            textShadow:
              "0 0 22px rgba(108, 211, 255, 0.55), 0 2px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          Let&rsquo;s build something.
        </h2>

        <p
          className="text-balance max-w-md text-center text-[12px] leading-relaxed sm:text-[13px] md:text-sm"
          style={{
            color: "rgba(220, 235, 250, 0.72)",
            textShadow: "0 1px 6px rgba(0, 0, 0, 0.65)",
          }}
        >
          Production AI by day, side experiments by night. Pick a key — each one
          opens a real channel.
        </p>
      </div>

      {[
        { top: 8, left: 8 },
        { top: 8, right: 8 },
        { bottom: 8, left: 8 },
        { bottom: 8, right: 8 },
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            ...pos,
            background:
              "radial-gradient(circle at 30% 30%, #2c3a5a, #0a0e18 70%)",
          }}
        />
      ))}
    </div>
  );
}
