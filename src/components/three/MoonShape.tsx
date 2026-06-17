"use client";

import { type Ref } from "react";
import * as THREE from "three";
import { Outlines } from "@react-three/drei";

type MoonShapeProps = {
  size: number;
  edgeColor: string;
  bodyOpacity?: number;
  // Forwarded so the parent can lerp body opacity per frame.
  materialRef?: Ref<THREE.MeshBasicMaterial>;
};

export function MoonShape({
  size,
  edgeColor,
  bodyOpacity = 0.45,
  materialRef,
}: MoonShapeProps) {
  return (
    <mesh>
      <sphereGeometry args={[size, 48, 32]} />
      <meshBasicMaterial
        ref={materialRef}
        color={edgeColor}
        transparent
        opacity={bodyOpacity}
      />
      <Outlines
        thickness={0.006}
        color={edgeColor}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}
