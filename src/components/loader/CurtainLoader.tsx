"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { profile } from "@/data/profile";
import { JOB_TITLE } from "@/components/HeroCaption";

const HARD_TIMEOUT_MS = 5500;
const HERO_NAME_SELECTOR = "[data-hero-name]";
const HERO_ROLE_SELECTOR = "[data-hero-role]";
const CURTAIN_OPENING_EVENT = "portfolio:curtain-opening";
const LOADER_DONE_EVENT = "portfolio:loader-done";

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCE_MOTION_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getReducedMotion() {
  return window.matchMedia(REDUCE_MOTION_QUERY).matches;
}
function getServerReducedMotion() {
  return false;
}

export function CurtainLoader() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!prefersReducedMotion) return;
    window.dispatchEvent(new Event(CURTAIN_OPENING_EVENT));
    window.dispatchEvent(new Event(LOADER_DONE_EVENT));
  }, [prefersReducedMotion]);

  useGSAP(
    () => {
      const container = containerRef.current;
      const curtain = curtainRef.current;
      const seam = seamRef.current;
      const name = nameRef.current;
      const label = labelRef.current;
      const hud = hudRef.current;
      const barFill = barFillRef.current;
      const percent = percentRef.current;
      if (
        !container ||
        !curtain ||
        !seam ||
        !name ||
        !label ||
        !hud ||
        !barFill ||
        !percent
      )
        return;

      const computeFlip = (from: HTMLElement, to: HTMLElement | null) => {
        if (!to) return { x: 0, y: 0, scale: 1 };
        const startRect = from.getBoundingClientRect();
        const targetRect = to.getBoundingClientRect();
        const scale = targetRect.height / Math.max(startRect.height, 1);
        const dx =
          targetRect.left +
          targetRect.width / 2 -
          (startRect.left + startRect.width / 2);
        const dy =
          targetRect.top +
          targetRect.height / 2 -
          (startRect.top + startRect.height / 2);
        return { x: dx, y: dy, scale };
      };

      const flip = computeFlip(
        name,
        document.querySelector<HTMLElement>(HERO_NAME_SELECTOR),
      );
      const flipLabel = computeFlip(
        label,
        document.querySelector<HTMLElement>(HERO_ROLE_SELECTOR),
      );

      gsap.set(name, { opacity: 0, y: 28 });
      gsap.set(label, { opacity: 0, y: 10 });
      gsap.set(hud, { opacity: 0, y: 12 });
      gsap.set(barFill, { width: "0%" });
      gsap.set(seam, { scaleY: 0, opacity: 0 });

      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      tl.to(seam, { scaleY: 1, opacity: 0.45, duration: 0.6, ease: "power2.out" }, 0.05);
      tl.to(name, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, 0.15);
      tl.to(label, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.45);
      tl.to(hud, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.55);

      tl.to(barFill, { width: "100%", duration: 1.95, ease: "power1.inOut" }, 0.7);
      tl.to(
        counter,
        {
          v: 100,
          duration: 1.95,
          ease: "power1.inOut",
          onUpdate: () => {
            percent.textContent = `${Math.round(counter.v)}%`;
          },
        },
        0.7,
      );

      tl.to(hud, { opacity: 0, y: -8, duration: 0.4, ease: "power2.in" }, 2.75);
      tl.to(seam, { opacity: 1, duration: 0.2, ease: "power2.out" }, 2.85);

      tl.call(
        () => window.dispatchEvent(new Event(CURTAIN_OPENING_EVENT)),
        [],
        2.95,
      );
      tl.to(
        curtain,
        {
          clipPath: "inset(0 50% 0 50%)",
          duration: 1.05,
          ease: "power3.inOut",
        },
        2.95,
      );
      tl.to(seam, { opacity: 0, duration: 0.7, ease: "power2.in" }, 3.15);

      tl.to(
        name,
        {
          x: flip.x,
          y: flip.y,
          scale: flip.scale,
          duration: 1.1,
          ease: "power2.inOut",
        },
        3.05,
      );

      tl.to(
        label,
        {
          x: flipLabel.x,
          y: flipLabel.y,
          scale: flipLabel.scale,
          duration: 1.1,
          ease: "power2.inOut",
        },
        3.05,
      );

      tl.call(
        () => window.dispatchEvent(new Event(LOADER_DONE_EVENT)),
        [],
        4.15,
      );

      tl.to(container, { opacity: 0, duration: 0.3, ease: "power1.in" }, 4.2);

      tlRef.current = tl;
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (done) return;
    const skip = () => {
      const tl = tlRef.current;
      if (!tl) {
        window.dispatchEvent(new Event(CURTAIN_OPENING_EVENT));
        window.dispatchEvent(new Event(LOADER_DONE_EVENT));
        setDone(true);
        return;
      }
      if (tl.timeScale() < 4) tl.timeScale(5);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [done]);

  useEffect(() => {
    if (done) return;
    const fallback = window.setTimeout(() => {
      window.dispatchEvent(new Event(CURTAIN_OPENING_EVENT));
      window.dispatchEvent(new Event(LOADER_DONE_EVENT));
      setDone(true);
    }, HARD_TIMEOUT_MS);
    return () => window.clearTimeout(fallback);
  }, [done]);

  if (prefersReducedMotion || done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden"
      aria-busy="true"
      aria-label="Loading portfolio"
    >
      <div ref={curtainRef} className="curtain-panel absolute inset-0">
        <div className="curtain-color absolute inset-0" />
        <div
          aria-hidden
          className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.06]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.18) 0%, transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 55%)",
          }}
        />
        <div
          ref={seamRef}
          aria-hidden
          className="curtain-seam pointer-events-none absolute inset-y-0 left-1/2"
        />
      </div>

      <div className="pointer-events-none relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-balance leading-[0.92] tracking-tight">
          <span
            ref={nameRef}
            className="text-fg block text-[clamp(2.25rem,7vw,5.25rem)] font-medium"
            style={{
              transformOrigin: "center center",
              willChange: "transform, opacity",
              textShadow: "0 0 36px rgba(0,229,255,0.35)",
            }}
          >
            {profile.name}
          </span>
        </h1>

        <div
          ref={labelRef}
          className="mt-6 font-mono text-[10px] tracking-[0.36em] uppercase sm:text-[11px] sm:tracking-[0.42em]"
          style={{
            color: "var(--accent)",
            textShadow: "0 0 14px var(--accent-glow)",
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        >
          {JOB_TITLE}
        </div>
      </div>

      <div
        ref={hudRef}
        className="absolute bottom-16 left-1/2 z-10 w-[min(72vw,440px)] -translate-x-1/2 sm:bottom-20"
      >
        <div className="text-muted mb-3 flex items-center justify-between font-mono text-[9px] tracking-[0.32em] uppercase sm:text-[10px] sm:tracking-[0.4em]">
          <span>loading</span>
          <span ref={percentRef} className="text-accent tabular-nums">
            0%
          </span>
        </div>
        <div
          className="relative h-[3px] w-full overflow-hidden rounded-[2px]"
          style={{ background: "var(--border-subtle)" }}
        >
          <div
            ref={barFillRef}
            className="curtain-bar-fill absolute inset-y-0 left-0 rounded-[2px]"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
