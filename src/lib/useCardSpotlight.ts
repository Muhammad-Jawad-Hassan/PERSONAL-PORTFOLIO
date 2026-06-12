"use client";

import { useCallback, useRef, useState } from "react";

type Options = {
  /** Max tilt angle in degrees. Default 6. */
  maxTilt?: number;
  /** Max translate (px) toward cursor for parallax depth. Default 4. */
  parallax?: number;
};

type SpotlightStyle = React.CSSProperties & {
  "--mx": string;
  "--my": string;
};

/**
 * Cursor-driven 3D tilt + radial spotlight follow.
 * Returns a ref + handlers + style vars to spread onto any card root.
 *
 * The card root must set `transform-style: preserve-3d` (or just rely on
 * `perspective` set by the parent) for the rotateX/Y to render.
 */
export function useCardSpotlight({
  maxTilt = 6,
  parallax = 4,
}: Options = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [transform, setTransform] = useState<string>("");
  const [style, setStyle] = useState<SpotlightStyle>({
    "--mx": "50%",
    "--my": "50%",
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;

      const rotY = (px - 0.5) * 2 * maxTilt;
      const rotX = -(py - 0.5) * 2 * maxTilt;
      const tx = (px - 0.5) * 2 * parallax;
      const ty = (py - 0.5) * 2 * parallax;

      setTransform(
        `perspective(900px) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`,
      );
      setStyle({
        "--mx": `${(px * 100).toFixed(1)}%`,
        "--my": `${(py * 100).toFixed(1)}%`,
      });
    },
    [maxTilt, parallax],
  );

  const onMouseEnter = useCallback(() => setActive(true), []);

  const onMouseLeave = useCallback(() => {
    setActive(false);
    setTransform("");
  }, []);

  return {
    ref,
    active,
    transform,
    style,
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
  };
}
