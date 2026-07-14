import { COLOR } from "@/lib/theme";
import { NODE_SIZE, ROD_LEFT_PX } from "./utils";

type NodeMarkerProps = {
  isCurrent: boolean;
  active: boolean;
  delay: number;
};

export function NodeMarker({ isCurrent, active, delay }: NodeMarkerProps) {
  return (
    <div
      aria-hidden
      className={`absolute z-10 ${active ? "experience-node-pop" : "opacity-0"}`}
      style={{
        top: 56,
        left: ROD_LEFT_PX + 3,
        width: NODE_SIZE,
        height: NODE_SIZE,
        animationDelay: `${delay}ms`,
      }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          border: `1.5px solid ${COLOR.accentBright}`,
          background: COLOR.bgBase,
          boxShadow: isCurrent
            ? "0 0 28px rgba(0, 229, 255, 0.95), 0 0 8px var(--accent-bright)"
            : "0 0 16px var(--accent-glow)",
        }}
      />
      <span
        className="absolute rounded-full"
        style={{
          inset: 5,
          background: `radial-gradient(circle, ${COLOR.accentBright}, ${COLOR.accent})`,
          boxShadow: isCurrent
            ? "0 0 16px var(--accent-bright)"
            : "0 0 10px var(--accent-glow)",
        }}
      />
      {isCurrent && (
        <span
          className="experience-now-pulse absolute inset-0 rounded-full"
          style={{ pointerEvents: "none" }}
        />
      )}
    </div>
  );
}
