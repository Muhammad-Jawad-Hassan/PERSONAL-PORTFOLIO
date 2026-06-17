"use client";

import { Html } from "@react-three/drei";
import type { MoonConfig } from "@/lib/orbits";

type MoonLabelProps = {
  config: MoonConfig;
  hovered: boolean;
};

export function MoonLabel({ config, hovered }: MoonLabelProps) {
  return (
    <Html
      center
      distanceFactor={12}
      zIndexRange={[40, 0]}
      style={{ pointerEvents: "none", userSelect: "none" }}
    >
      <div
        className="-translate-y-12 select-none whitespace-nowrap text-center"
        style={{ pointerEvents: "none" }}
      >
        <div
          aria-hidden
          className="mx-auto mb-1.5 h-3 w-px"
          style={{
            background: `linear-gradient(to top, ${config.edgeColor}, transparent)`,
          }}
        />

        <div
          className="font-mono text-[10px] tracking-[0.4em] uppercase transition-colors duration-200"
          style={{
            color: config.edgeColor,
            textShadow: hovered
              ? `0 0 12px ${config.edgeColor}aa`
              : `0 0 6px ${config.edgeColor}55`,
            opacity: hovered ? 1 : 0.78,
          }}
        >
          {config.label}
        </div>
      </div>
    </Html>
  );
}
