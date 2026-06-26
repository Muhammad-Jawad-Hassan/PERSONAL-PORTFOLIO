"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

export function KernelMark({
  scale = 1,
  speed = 1,
}: {
  scale?: number;
  speed?: number;
}) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.3 * speed;
      outerRef.current.rotation.x += delta * 0.12 * speed;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.6 * speed;
      innerRef.current.rotation.z += delta * 0.4 * speed;
    }
  });

  return (
    <group ref={outerRef} scale={scale}>
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#03050b" transparent opacity={0.35} />
        <Edges threshold={1} color="#00E5FF" lineWidth={1.4} />
      </mesh>

      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#5BFAFF" wireframe />
      </mesh>

      <pointLight color="#00E5FF" intensity={6} distance={8} />
    </group>
  );
}
