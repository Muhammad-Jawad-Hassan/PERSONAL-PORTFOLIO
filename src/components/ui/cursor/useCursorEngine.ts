"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import {
  COLOR_MATCH_THRESHOLD,
  CURSOR_PALETTE,
  INTERACTIVE_SELECTOR,
} from "./constants";

type Refs = {
  sphere: RefObject<HTMLDivElement | null>;
};

export type CursorEngineState = {
  hovering: boolean;
  pressed: boolean;
};

type RGB = [number, number, number];

const PALETTE_RGB: RGB[] = CURSOR_PALETTE.map(hexToRgb);

function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function parseRgbString(str: string): RGB | null {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
  if (parts.length < 3 || parts.some(Number.isNaN)) return null;
  if (parts.length >= 4 && parts[3] === 0) return null;
  return [parts[0], parts[1], parts[2]];
}

function effectiveBg(el: Element | null): RGB | null {
  let cur: Element | null = el;
  while (cur) {
    const bg = getComputedStyle(cur).backgroundColor;
    const rgb = parseRgbString(bg);
    if (rgb) return rgb;
    cur = cur.parentElement;
  }
  return null;
}

function rgbDist(a: RGB, b: RGB): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

export function useCursorEngine(enabled: boolean, refs: Refs): CursorEngineState {
  const target = useRef({ x: -50, y: -50 });
  const sphere = useRef({ x: -50, y: -50 });
  const visibleRef = useRef(false);
  const nativeHoverRef = useRef(false);
  const sceneHoverRef = useRef(false);
  const colorIndexRef = useRef(0);
  const lastTargetRef = useRef<Element | null>(null);

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const recomputeHovering = () => {
      const next = nativeHoverRef.current || sceneHoverRef.current;
      setHovering((prev) => (prev === next ? prev : next));
    };

    const setOpacity = (value: string) => {
      refs.sphere.current?.style.setProperty("opacity", value);
    };

    const swapColor = () => {
      let next = colorIndexRef.current;
      // Pick any other palette entry; loop until we find a non-match.
      for (let i = 0; i < 6; i++) {
        const candidate = Math.floor(Math.random() * CURSOR_PALETTE.length);
        if (candidate !== colorIndexRef.current) {
          next = candidate;
          break;
        }
      }
      colorIndexRef.current = next;
      refs.sphere.current?.style.setProperty(
        "--cursor-color",
        CURSOR_PALETTE[next],
      );
    };

    const maybeSwapForTarget = (el: Element | null) => {
      if (!el || el === lastTargetRef.current) return;
      lastTargetRef.current = el;

      const bg = effectiveBg(el);
      if (!bg) return;

      const current = PALETTE_RGB[colorIndexRef.current];
      if (rgbDist(bg, current) < COLOR_MATCH_THRESHOLD) {
        swapColor();
      }
    };

    const handleMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        setOpacity("1");
      }

      const el = e.target as Element | null;
      const interactive = !!el?.closest?.(INTERACTIVE_SELECTOR);
      if (interactive !== nativeHoverRef.current) {
        nativeHoverRef.current = interactive;
        recomputeHovering();
      }

      maybeSwapForTarget(el);
    };

    const handleLeave = () => {
      visibleRef.current = false;
      setOpacity("0");
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    const handleSceneHover = (e: Event) => {
      const detail = (e as CustomEvent<"pointer" | "default">).detail;
      sceneHoverRef.current = detail === "pointer";
      recomputeHovering();
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    window.addEventListener("cursor-state", handleSceneHover as EventListener);

    let raf = 0;
    const animate = () => {
      sphere.current.x += (target.current.x - sphere.current.x) * 0.32;
      sphere.current.y += (target.current.y - sphere.current.y) * 0.32;
      if (refs.sphere.current) {
        refs.sphere.current.style.transform = `translate3d(${sphere.current.x}px, ${sphere.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener(
        "cursor-state",
        handleSceneHover as EventListener,
      );
    };
  }, [enabled, refs.sphere]);

  return { hovering, pressed };
}
