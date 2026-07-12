// Strokes start with full strokeDashoffset; GSAP tweens it to 0 to draw them in.
const STROKE_DASH = 2400;

export function BlueprintDraft() {
  const stroke = "currentColor";
  const dash = STROKE_DASH;
  return (
    <svg
      viewBox="-260 -260 520 520"
      className="aspect-square w-[min(82vw,640px)] max-w-full text-blueprint"
      fill="none"
      stroke={stroke}
      strokeWidth="0.7"
      strokeLinecap="round"
    >
      <circle
        cx="0"
        cy="0"
        r="220"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.65"
      />
      <circle
        cx="0"
        cy="0"
        r="160"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.55"
      />
      <circle
        cx="0"
        cy="0"
        r="100"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.7"
      />
      <circle
        cx="0"
        cy="0"
        r="40"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.5"
      />

      <ellipse
        cx="0"
        cy="0"
        rx="200"
        ry="68"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.4"
      />
      <ellipse
        cx="0"
        cy="0"
        rx="225"
        ry="92"
        transform="rotate(28)"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.32"
      />
      <ellipse
        cx="0"
        cy="0"
        rx="180"
        ry="50"
        transform="rotate(-15)"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.28"
      />

      <line
        x1="-240"
        y1="0"
        x2="240"
        y2="0"
        strokeDasharray="2 6"
        opacity="0.32"
      />
      <line
        x1="0"
        y1="-240"
        x2="0"
        y2="240"
        strokeDasharray="2 6"
        opacity="0.32"
      />

      <line
        x1="-180"
        y1="-180"
        x2="180"
        y2="180"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.22"
      />
      <line
        x1="-180"
        y1="180"
        x2="180"
        y2="-180"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.22"
      />

      {/* Rounded coords keep SSR/CSR hydration consistent. */}
      {Array.from({ length: 24 }, (_, i) => i * 15).map((deg) => {
        const r1 = 220;
        const r2 = deg % 90 === 0 ? 240 : 232;
        const rad = (deg * Math.PI) / 180;
        const round = (n: number) => Math.round(n * 1000) / 1000;
        return (
          <line
            key={deg}
            x1={round(Math.cos(rad) * r1)}
            y1={round(Math.sin(rad) * r1)}
            x2={round(Math.cos(rad) * r2)}
            y2={round(Math.sin(rad) * r2)}
            className="blueprint-path"
            strokeDasharray={dash}
            strokeDashoffset={dash}
            opacity={deg % 90 === 0 ? "0.7" : "0.4"}
          />
        );
      })}

      <path
        d="M -240 -200 L -240 -240 L -200 -240"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.65"
      />
      <path
        d="M 240 -200 L 240 -240 L 200 -240"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.65"
      />
      <path
        d="M -240 200 L -240 240 L -200 240"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.65"
      />
      <path
        d="M 240 200 L 240 240 L 200 240"
        className="blueprint-path"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        opacity="0.65"
      />

      <g className="text-subtle font-mono" style={{ fontSize: "9px" }}>
        <text x="0" y="-244" textAnchor="middle" fill="currentColor">
          N
        </text>
        <text x="244" y="3" textAnchor="start" fill="currentColor">
          E
        </text>
        <text x="0" y="252" textAnchor="middle" fill="currentColor">
          S
        </text>
        <text x="-244" y="3" textAnchor="end" fill="currentColor">
          W
        </text>
      </g>
    </svg>
  );
}
