"use client";

import { Planet } from "./Planet";
import { PlanetSparkles } from "./PlanetSparkles";
import { Moon } from "./Moon";
import { moons } from "@/lib/orbits";

const PLANET_RADIUS = 3;

type OrreryProps = {
  onMoonActivate?: (id: string) => void;
};

export function Orrery({ onMoonActivate }: OrreryProps) {
  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight position={[4, 3, 6]} intensity={0.35} color="#ffffff" />

      <group position={[0, 0.6, 0]}>
        <Planet radius={PLANET_RADIUS} />
        <PlanetSparkles planetRadius={PLANET_RADIUS} count={4800} />
        {moons.map((m) => (
          <Moon key={m.id} config={m} onActivate={onMoonActivate} />
        ))}
      </group>
    </>
  );
}
