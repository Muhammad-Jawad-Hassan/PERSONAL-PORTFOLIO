"use client";

import { Suspense, useRef, useState } from "react";
import { type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { MoonConfig } from "@/lib/orbits";
import { MotionTrail } from "./MotionTrail";
import { IconShape } from "./IconShape";
import { useMoonAnimation } from "./moon/useMoonAnimation";
import { MoonLabel } from "./moon/MoonLabel";

type MoonProps = {
  config: MoonConfig;
  onActivate?: (id: string) => void;
};

function dispatchCursorState(state: "pointer" | "default") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cursor-state", { detail: state }));
}

export function Moon({ config, onActivate }: MoonProps) {
  const angleGroupRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const angleRef = useRef(config.initialAngle);
  const hoverScaleRef = useRef(1);
  const lightIntensityRef = useRef(0.3);

  const [hovered, setHovered] = useState(false);

  useMoonAnimation(config, {
    angleGroup: angleGroupRef,
    moon: moonRef,
    light: lightRef,
    angle: angleRef,
    hoverScale: hoverScaleRef,
    lightIntensity: lightIntensityRef,
    hovered,
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    dispatchCursorState("pointer");
  };
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    dispatchCursorState("default");
  };
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onActivate?.(config.id);
  };

  return (
    <group rotation={[0, config.axisRotation, 0]}>
      <group rotation={[config.inclination, 0, 0]}>
        <MotionTrail
          radius={config.radius}
          angleRef={angleRef}
          color={config.edgeColor}
          arcLength={hovered ? Math.PI / 1.8 : Math.PI / 2.5}
          lineWidth={hovered ? 2 : 1.3}
        />

        <group ref={angleGroupRef} rotation={[0, config.initialAngle, 0]}>
          <group position={[config.radius, 0, 0]}>
            <group
              ref={moonRef}
              onPointerOver={handleOver}
              onPointerOut={handleOut}
              onClick={handleClick}
            >
              <mesh>
                <sphereGeometry args={[config.size * 1.3, 16, 12]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              <Suspense fallback={null}>
                <IconShape
                  src={config.iconSrc}
                  size={config.size}
                  color={config.edgeColor}
                  emissiveIntensity={hovered ? 2.2 : 1.4}
                />
              </Suspense>
            </group>

            <pointLight
              ref={lightRef}
              color={config.edgeColor}
              intensity={0.35}
              distance={config.size * 6}
              decay={2}
            />

            <MoonLabel config={config} hovered={hovered} />
          </group>
        </group>
      </group>
    </group>
  );
}
