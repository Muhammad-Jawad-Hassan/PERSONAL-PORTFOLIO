import { type RefObject } from "react";
import { CURSOR_PALETTE } from "./constants";

export function Sphere({
  sphereRef,
  hovering,
  pressed,
}: {
  sphereRef: RefObject<HTMLDivElement | null>;
  hovering: boolean;
  pressed: boolean;
}) {
  const size = pressed ? 11 : hovering ? 18 : 14;
  return (
    <div
      ref={sphereRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full opacity-0"
      style={{
        width: size,
        height: size,
        ["--cursor-color" as string]: CURSOR_PALETTE[0],
        background:
          "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, var(--cursor-color) 42%, color-mix(in srgb, var(--cursor-color) 55%, #000) 100%)",
        boxShadow:
          "0 0 10px var(--cursor-color), 0 0 26px color-mix(in srgb, var(--cursor-color) 55%, transparent)",
        transition:
          "width 180ms ease-out, height 180ms ease-out, opacity 200ms, background 320ms, box-shadow 320ms",
        willChange: "transform",
      }}
    />
  );
}
