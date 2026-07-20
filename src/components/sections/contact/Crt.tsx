"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  channels,
  SIGNAL_EVENT,
  type ChannelId,
  type ContactSignalDetail,
} from "./channels";

const PING_DURATION_MS = 1500;

type Blip = {
  id: ChannelId;
  short: string;
  x: number;
  y: number;
};

const BLIP_RADIUS = 62;

function blipFor(angleDeg: number): { x: number; y: number } {
  // 0° at top, clockwise.
  const r = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: Math.cos(r) * BLIP_RADIUS,
    y: Math.sin(r) * BLIP_RADIUS,
  };
}

const BLIPS: Blip[] = channels.map((c) => ({
  id: c.id,
  short: c.short,
  ...blipFor(c.angleDeg),
}));

export function Crt() {
  const [activePings, setActivePings] = useState<
    { id: ChannelId; ts: number }[]
  >([]);
  const lastTickRef = useRef(0);

  useEffect(() => {
    const onSignal = (e: Event) => {
      const detail = (e as CustomEvent<ContactSignalDetail>).detail;
      if (!detail) return;
      const ts = performance.now();
      lastTickRef.current = ts;
      setActivePings((prev) => [
        ...prev.filter((p) => ts - p.ts < PING_DURATION_MS),
        { id: detail.id, ts },
      ]);
      window.setTimeout(() => {
        setActivePings((prev) => prev.filter((p) => p.ts !== ts));
      }, PING_DURATION_MS + 50);
    };
    window.addEventListener(SIGNAL_EVENT, onSignal as EventListener);
    return () =>
      window.removeEventListener(SIGNAL_EVENT, onSignal as EventListener);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[18%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.16) 0%, rgba(0,229,255,0) 60%)",
          filter: "blur(28px)",
        }}
      />

      <div
        className="relative h-full w-full rounded-[28px] p-[3.5%] sm:rounded-[36px] sm:p-[4%]"
        style={{
          background:
            "linear-gradient(165deg, #0d1320 0%, #03050b 60%, #0a1020 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.55), 0 28px 60px -16px rgba(0,0,0,0.7)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {[
          { top: "3%", left: "3%" },
          { top: "3%", right: "3%" },
          { bottom: "3%", left: "3%" },
          { bottom: "3%", right: "3%" },
        ].map((pos, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5"
            style={{
              ...pos,
              background:
                "radial-gradient(circle at 30% 30%, #2c3a5a, #0a0e18 70%)",
              boxShadow:
                "inset 0 -1px 0 rgba(0,0,0,0.6), 0 1px 1px rgba(255,255,255,0.05)",
            }}
          />
        ))}

        <div
          className="relative h-full w-full overflow-hidden rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 38%, #061a1f 0%, #02090c 70%, #000204 100%)",
            boxShadow:
              "inset 0 0 60px rgba(0, 229, 255, 0.20), inset 0 0 140px rgba(0,0,0,0.7)",
          }}
        >
          <Phosphor blips={BLIPS} activePings={activePings} />
          <Sweep />
          <Scanlines />
          <Glare />
        </div>
      </div>
    </div>
  );
}

function Phosphor({
  blips,
  activePings,
}: {
  blips: Blip[];
  activePings: { id: ChannelId; ts: number }[];
}) {
  const activeIds = new Set(activePings.map((p) => p.id));

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="-100 -100 200 200"
      style={{ filter: "drop-shadow(0 0 4px rgba(0, 229, 255, 0.45))" }}
    >
      <defs>
        <radialGradient id="crt-vignette" cx="50%" cy="50%" r="60%">
          <stop offset="60%" stopColor="rgba(0,229,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
        </radialGradient>
      </defs>

      {[25, 50, 75].map((r) => (
        <circle
          key={r}
          cx={0}
          cy={0}
          r={r}
          fill="none"
          stroke="#00E5FF"
          strokeOpacity={0.18}
          strokeWidth={0.6}
        />
      ))}
      <circle
        cx={0}
        cy={0}
        r={92}
        fill="none"
        stroke="#00E5FF"
        strokeOpacity={0.32}
        strokeWidth={0.8}
      />

      {[0, 45, 90, 135].map((deg) => {
        const r = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={Math.cos(r) * -92}
            y1={Math.sin(r) * -92}
            x2={Math.cos(r) * 92}
            y2={Math.sin(r) * 92}
            stroke="#00E5FF"
            strokeOpacity={0.12}
            strokeWidth={0.5}
          />
        );
      })}

      <line x1={-6} y1={0} x2={6} y2={0} stroke="#5BFAFF" strokeOpacity={0.9} strokeWidth={1.1} />
      <line x1={0} y1={-6} x2={0} y2={6} stroke="#5BFAFF" strokeOpacity={0.9} strokeWidth={1.1} />
      <circle cx={0} cy={0} r={1.6} fill="#5BFAFF" />

      {blips.map((b) => {
        const isActive = activeIds.has(b.id);
        return (
          <g key={b.id}>
            <circle
              cx={b.x}
              cy={b.y}
              r={isActive ? 4.5 : 2.4}
              fill={isActive ? "#5BFAFF" : "#00E5FF"}
              opacity={isActive ? 1 : 0.78}
              style={{ transition: "all 200ms ease" }}
            />
            <text
              x={b.x}
              y={b.y - 7}
              fill={isActive ? "#5BFAFF" : "#00E5FF"}
              fillOpacity={isActive ? 1 : 0.55}
              fontSize={6}
              fontFamily="var(--font-mono), monospace"
              textAnchor="middle"
              letterSpacing={0.5}
              style={{ transition: "fill-opacity 200ms ease" }}
            >
              {b.short}
            </text>
          </g>
        );
      })}

      {activePings.map((p) => {
        const blip = blips.find((b) => b.id === p.id);
        if (!blip) return null;
        return (
          <circle
            key={`${p.id}-${p.ts}`}
            cx={blip.x}
            cy={blip.y}
            r={3}
            fill="none"
            stroke="#5BFAFF"
            strokeWidth={1.1}
            className="crt-ping"
          />
        );
      })}

      <rect x={-100} y={-100} width={200} height={200} fill="url(#crt-vignette)" pointerEvents="none" />
    </svg>
  );
}

function Sweep() {
  const style: CSSProperties = {
    background:
      "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(0, 229, 255, 0.04) 290deg, rgba(0, 229, 255, 0.18) 340deg, rgba(91, 250, 255, 0.55) 358deg, rgba(91, 250, 255, 0.95) 359.5deg, transparent 360deg)",
    mixBlendMode: "screen",
    animation: "crt-sweep 4.5s linear infinite",
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-full"
      style={style}
    />
  );
}

function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-full opacity-25"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.45) 0px, rgba(0,0,0,0.45) 1px, transparent 1px, transparent 3px)",
      }}
    />
  );
}

function Glare() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-full"
      style={{
        background:
          "radial-gradient(ellipse 70% 35% at 50% 18%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
      }}
    />
  );
}
