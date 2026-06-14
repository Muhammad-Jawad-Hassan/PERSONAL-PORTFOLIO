"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PlanetMeridians } from "./PlanetMeridians";

export function Planet({ radius = 2.3 }: { radius?: number }) {
  const meridianGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meridianGroupRef.current) {
      meridianGroupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius * 0.985, 64, 64]} />
        <meshBasicMaterial color="#0A1A2C" transparent opacity={0.55} />
      </mesh>

      <group ref={meridianGroupRef}>
        <PlanetMeridians radius={radius} longitudes={20} opacity={0.34} />
      </group>
    </group>
  );
}
