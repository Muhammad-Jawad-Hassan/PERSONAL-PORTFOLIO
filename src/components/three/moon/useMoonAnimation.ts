"use client";

import { type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MoonConfig } from "@/lib/orbits";

const _worldPosTemp = new THREE.Vector3();

export type MoonAnimationRefs = {
  angleGroup: RefObject<THREE.Group | null>;
  moon: RefObject<THREE.Group | null>;
  light: RefObject<THREE.PointLight | null>;
  angle: RefObject<number>;
  hoverScale: RefObject<number>;
  lightIntensity: RefObject<number>;
  hovered: boolean;
};

export function useMoonAnimation(
  config: MoonConfig,
  refs: MoonAnimationRefs,
) {
  const angleRef = refs.angle;
  const angleGroupRef = refs.angleGroup;
  const moonRef = refs.moon;
  const lightRef = refs.light;
  const hoverScaleRef = refs.hoverScale;
  const lightIntensityRef = refs.lightIntensity;

  useFrame((_, delta) => {
    if (!refs.hovered) {
      angleRef.current += delta * config.speed;
    }
    if (angleGroupRef.current) {
      angleGroupRef.current.rotation.y = angleRef.current;
    }

    if (moonRef.current) {
      const targetScale = refs.hovered ? 1.55 : 1;
      hoverScaleRef.current = THREE.MathUtils.lerp(
        hoverScaleRef.current,
        targetScale,
        Math.min(delta * 9, 1),
      );

      moonRef.current.getWorldPosition(_worldPosTemp);
      const zNorm = THREE.MathUtils.clamp(_worldPosTemp.z / 6.5, -1, 1);
      // Front-pass amplification kept gentle so foreground moons don't bloat.
      const distanceScale = 1 + zNorm * 0.08;

      moonRef.current.scale.setScalar(hoverScaleRef.current * distanceScale);
      moonRef.current.rotation.y -= delta * 0.45;
    }

    if (lightRef.current) {
      const targetIntensity = refs.hovered ? 1.4 : 0.35;
      lightIntensityRef.current = THREE.MathUtils.lerp(
        lightIntensityRef.current,
        targetIntensity,
        Math.min(delta * 8, 1),
      );
      lightRef.current.intensity = lightIntensityRef.current;
    }
  });
}
