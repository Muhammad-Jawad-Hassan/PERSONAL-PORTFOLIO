"use client";

import { useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import {
  SPARKLES_VERTEX_SHADER,
  SPARKLES_FRAGMENT_SHADER,
} from "./sparkles/shaders";
import { generateSparkleAttributes } from "./sparkles/attributes";

type PlanetSparklesProps = {
  planetRadius?: number;
  count?: number;
  spinRate?: number;
};

export function PlanetSparkles({
  planetRadius = 2.3,
  count = 4800,
  spinRate = 0.12,
}: PlanetSparklesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const targetMouseLocal = useRef(new THREE.Vector3(0, 0, -10));
  const targetStrength = useRef(0);

  const { positions, sizes, phases } = useMemo(
    () => generateSparkleAttributes(count, planetRadius),
    [count, planetRadius],
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, -10) },
      uMouseStrength: { value: 0 },
      uMouseRadius: { value: planetRadius * 0.55 },
      uColorBase: { value: new THREE.Color("#00E5FF") },
      uColorHot: { value: new THREE.Color("#ffffff") },
    }),
    [planetRadius],
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * spinRate;
    }

    if (!materialRef.current) return;
    const u = materialRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;

    u.uMouse.value.lerp(targetMouseLocal.current, Math.min(delta * 7, 1));
    u.uMouseStrength.value = THREE.MathUtils.lerp(
      u.uMouseStrength.value,
      targetStrength.current,
      Math.min(delta * 5, 1),
    );
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!groupRef.current) return;
    // World→local so uMouse follows the dust as the group rotates.
    const local = e.point.clone();
    groupRef.current.worldToLocal(local);
    targetMouseLocal.current.copy(local);
    targetStrength.current = 1;
  };
  const handlePointerOut = () => {
    targetStrength.current = 0;
  };

  return (
    <group ref={groupRef}>
      <mesh
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        renderOrder={-1}
      >
        <sphereGeometry args={[planetRadius * 1.2, 48, 48]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={SPARKLES_VERTEX_SHADER}
          fragmentShader={SPARKLES_FRAGMENT_SHADER}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
