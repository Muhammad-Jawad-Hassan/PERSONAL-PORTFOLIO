"use client";

import { useMemo } from "react";
import { Line } from "@react-three/drei";

type PlanetMeridiansProps = {
  radius: number;
  longitudes?: number;
  /** Latitudes as fraction in [-0.5, 0.5] (0 = equator). */
  latitudes?: number[];
  color?: string;
  opacity?: number;
};

export function PlanetMeridians({
  radius,
  longitudes = 18,
  latitudes = [-0.32, -0.16, 0, 0.16, 0.32],
  color = "#5BFAFF",
  opacity = 0.22,
}: PlanetMeridiansProps) {
  const meridians = useMemo(() => {
    const segs = 64;
    const lines: [number, number, number][][] = [];
    for (let i = 0; i < longitudes; i++) {
      const lon = (i / longitudes) * Math.PI * 2;
      const points: [number, number, number][] = [];
      for (let j = 0; j <= segs; j++) {
        const lat = (j / segs - 0.5) * Math.PI;
        const cosLat = Math.cos(lat);
        const x = radius * cosLat * Math.cos(lon);
        const y = radius * Math.sin(lat);
        const z = radius * cosLat * Math.sin(lon);
        points.push([x, y, z]);
      }
      lines.push(points);
    }
    return lines;
  }, [radius, longitudes]);

  const latRings = useMemo(() => {
    const segs = 96;
    return latitudes.map((latNorm) => {
      const lat = latNorm * Math.PI;
      const r = radius * Math.cos(lat);
      const y = radius * Math.sin(lat);
      const points: [number, number, number][] = [];
      for (let j = 0; j <= segs; j++) {
        const t = (j / segs) * Math.PI * 2;
        points.push([r * Math.cos(t), y, r * Math.sin(t)]);
      }
      return points;
    });
  }, [radius, latitudes]);

  return (
    <group>
      {meridians.map((pts, i) => (
        <Line
          key={`mer-${i}`}
          points={pts}
          color={color}
          lineWidth={0.5}
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      ))}
      {latRings.map((pts, i) => (
        <Line
          key={`lat-${i}`}
          points={pts}
          color={color}
          lineWidth={0.5}
          transparent
          opacity={opacity * 0.85}
          depthWrite={false}
        />
      ))}
    </group>
  );
}
