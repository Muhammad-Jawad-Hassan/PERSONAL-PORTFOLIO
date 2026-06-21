"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { silenceThreeClockDeprecation } from "@/lib/silenceThreeWarnings";
import { use3DQuality } from "@/lib/use3DQuality";

silenceThreeClockDeprecation();

// Page-wide star background. Lightweight by design: low DPR, no AA, low-power GPU.
export function StarField() {
  const { isMobile } = use3DQuality();
  const dpr: [number, number] = isMobile ? [1, 1] : [1, 1.5];
  const count = isMobile ? 1100 : 2000;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 0], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
      >
        <Suspense fallback={null}>
          <Stars
            radius={120}
            depth={60}
            count={count}
            factor={3}
            saturation={0}
            fade
            speed={0.15}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
