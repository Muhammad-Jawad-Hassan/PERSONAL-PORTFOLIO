"use client";

import { useMediaQuery } from "./useMediaQuery";

export type ThreeQuality = {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  dpr: [number, number];
  postFx: boolean;
  antialias: boolean;
};

export function use3DQuality(): ThreeQuality {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return {
    isMobile,
    prefersReducedMotion,
    dpr: isMobile ? [1, 1.5] : [1, 2],
    postFx: !isMobile && !prefersReducedMotion,
    antialias: !isMobile,
  };
}
