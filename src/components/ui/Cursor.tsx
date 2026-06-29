"use client";

import { useRef } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useCursorEngine } from "./cursor/useCursorEngine";
import { Sphere } from "./cursor/Sphere";

export function Cursor() {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");
  const sphereRef = useRef<HTMLDivElement | null>(null);

  const { hovering, pressed } = useCursorEngine(enabled, { sphere: sphereRef });

  if (!enabled) return null;

  return <Sphere sphereRef={sphereRef} hovering={hovering} pressed={pressed} />;
}
