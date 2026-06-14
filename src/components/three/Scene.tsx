"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, type ReactNode } from "react";
import { silenceThreeClockDeprecation } from "@/lib/silenceThreeWarnings";
import { use3DQuality } from "@/lib/use3DQuality";

silenceThreeClockDeprecation();

type SceneProps = {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  postFx?: boolean;
  vignette?: boolean;
};

export function Scene({
  children,
  className,
  cameraPosition = [0, 0, 4],
  fov = 50,
  postFx,
  vignette = true,
}: SceneProps) {
  const quality = use3DQuality();
  const enablePostFx = postFx ?? quality.postFx;

  return (
    <Canvas
      className={className}
      dpr={quality.dpr}
      camera={{ position: cameraPosition, fov }}
      gl={{
        antialias: quality.antialias,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ touchAction: "manipulation" }}
    >
      <Suspense fallback={null}>
        {children}
        {enablePostFx && (
          <EffectComposer>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            {vignette ? (
              <Vignette eskil={false} offset={0.25} darkness={0.7} />
            ) : (
              <></>
            )}
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
