import { COLOR, TRACK } from "@/lib/theme";
import { formatTenure, MAX_TENURE } from "./utils";

type TenureBarProps = {
  months: number;
  active: boolean;
  delay: number;
};

export function TenureBar({ months, active, delay }: TenureBarProps) {
  const pct = months / MAX_TENURE;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-mono-label uppercase"
          style={{ color: COLOR.fgMuted, letterSpacing: TRACK }}
        >
          Tenure
        </span>
        <span
          className="font-mono text-base"
          style={{
            color: COLOR.accentBright,
            letterSpacing: "0.04em",
            textShadow: "0 0 12px var(--accent-glow)",
          }}
        >
          {formatTenure(months)}
        </span>
      </div>
      <div
        className="relative h-1.5 w-full overflow-hidden rounded-full"
        style={{ background: "rgba(255, 255, 255, 0.06)" }}
      >
        <span
          aria-hidden
          className={active ? "experience-tenure-fill" : ""}
          style={
            {
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: `linear-gradient(90deg, ${COLOR.accent}, ${COLOR.accentBright})`,
              boxShadow: "0 0 12px var(--accent-glow)",
              transformOrigin: "left center",
              transform: active ? `scaleX(${pct})` : "scaleX(0)",
              "--tenure-target": pct,
              animationDelay: `${delay}ms`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
