"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { KernelMark } from "@/components/three/KernelMark";
import { silenceThreeClockDeprecation } from "@/lib/silenceThreeWarnings";
import { use3DQuality } from "@/lib/use3DQuality";

silenceThreeClockDeprecation();

export function KernelCanvas({ className }: { className?: string }) {
  const quality = use3DQuality();

  return (
    <div className={className}>
      <Canvas
        dpr={quality.dpr}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{
          antialias: quality.antialias,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <StarSpray count={quality.isMobile ? 14 : 24} />
          <KernelMark scale={1.35} speed={1.4} />
          {quality.postFx && (
            <EffectComposer>
              <Bloom
                intensity={1.4}
                luminanceThreshold={0.18}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.3} darkness={0.55} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

const STAR_GEOMETRY = new THREE.SphereGeometry(0.012, 6, 6);
const STAR_MATERIAL = new THREE.MeshBasicMaterial({ color: "#9AA3B7" });

// Deterministic golden-angle scatter so SSR and CSR hydrate identically.
function StarSpray({ count }: { count: number }) {
  const positions = useMemo<[number, number, number][]>(() => {
    const out: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const a = (i * 137.508) % 360;
      const r = 4 + ((i * 13) % 7);
      const theta = (a * Math.PI) / 180;
      const phi = ((i * 17) % 60) * 0.05;
      out.push([
        r * Math.cos(theta) * Math.cos(phi),
        r * Math.sin(phi),
        r * Math.sin(theta) * Math.cos(phi),
      ]);
    }
    return out;
  }, [count]);

  return (
    <group>
      {positions.map((p, i) => (
        <mesh
          key={i}
          position={p as unknown as THREE.Vector3Tuple}
          geometry={STAR_GEOMETRY}
          material={STAR_MATERIAL}
        />
      ))}
    </group>
  );
}
