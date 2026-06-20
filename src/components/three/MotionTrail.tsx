"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

type LineLikeRef = {
  geometry?: {
    setPositions: (positions: Float32Array | number[]) => void;
    setColors: (colors: Float32Array | number[]) => void;
  };
};

type MotionTrailProps = {
  radius: number;
  angleRef: RefObject<number>;
  color: string;
  arcLength?: number;
  samples?: number;
  lineWidth?: number;
  fadePower?: number;
};

export function MotionTrail({
  radius,
  angleRef,
  color,
  arcLength = Math.PI / 2.5,
  samples = 36,
  lineWidth = 1.4,
  fadePower = 1.8,
}: MotionTrailProps) {
  const lineRef = useRef<LineLikeRef>(null);
  const baseColor = useMemo(() => new THREE.Color(color), [color]);

  // Mutable per-frame buffers via refs to avoid Float32Array allocations each frame.
  const positionsRef = useRef<Float32Array>(new Float32Array((samples + 1) * 3));
  const colorsRef = useRef<Float32Array>(new Float32Array((samples + 1) * 3));

  const initialPoints = useMemo<[number, number, number][]>(
    () => Array.from({ length: samples + 1 }, () => [0, 0, 0]),
    [samples],
  );
  const initialColors = useMemo<[number, number, number][]>(
    () =>
      Array.from({ length: samples + 1 }, (_, i) => {
        const fade = Math.pow(1 - i / samples, fadePower);
        return [baseColor.r * fade, baseColor.g * fade, baseColor.b * fade];
      }),
    [samples, baseColor, fadePower],
  );

  useFrame(() => {
    const currentAngle = angleRef.current;
    const positions = positionsRef.current;
    const colors = colorsRef.current;

    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const a = currentAngle - t * arcLength;

      // Z negation matches parent moon's orbit direction under R_y(θ).
      positions[i * 3] = Math.cos(a) * radius;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = -Math.sin(a) * radius;

      const fade = Math.pow(1 - t, fadePower);
      colors[i * 3] = baseColor.r * fade;
      colors[i * 3 + 1] = baseColor.g * fade;
      colors[i * 3 + 2] = baseColor.b * fade;
    }

    const geom = lineRef.current?.geometry;
    if (geom) {
      geom.setPositions(positions);
      geom.setColors(colors);
    }
  });

  return (
    <Line
      // @ts-expect-error Line ref is Line2 with setPositions/setColors at runtime.
      ref={lineRef}
      points={initialPoints}
      vertexColors={initialColors}
      lineWidth={lineWidth}
      transparent
      depthWrite={false}
    />
  );
}
