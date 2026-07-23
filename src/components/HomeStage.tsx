"use client";

import { useCallback } from "react";
import { Scene } from "@/components/three/Scene";
import { Orrery } from "@/components/three/Orrery";

export function HomeStage() {
  const handleMoonActivate = useCallback((id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="absolute inset-0">
      <Scene cameraPosition={[0, 2.0, 15]} fov={45}>
        <Orrery onMoonActivate={handleMoonActivate} />
      </Scene>
    </div>
  );
}
