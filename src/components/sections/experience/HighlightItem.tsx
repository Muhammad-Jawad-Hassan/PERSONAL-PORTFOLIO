import { COLOR, GLOW } from "@/lib/theme";

type HighlightItemProps = {
  text: string;
  isCurrent: boolean;
  index: number;
  active: boolean;
  baseDelay: number;
};

export function HighlightItem({
  text,
  isCurrent,
  index,
  active,
  baseDelay,
}: HighlightItemProps) {
  const delay = baseDelay + index * 80;
  const transition = `opacity 540ms cubic-bezier(0.2, 0.6, 0.1, 1) ${delay}ms, transform 540ms cubic-bezier(0.2, 0.6, 0.1, 1) ${delay}ms`;

  return (
    <li
      className="group/h flex gap-3.5"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateX(0)" : "translateX(8px)",
        transition,
      }}
    >
      <span
        aria-hidden
        className="mt-[0.65em] block h-[7px] w-[7px] flex-shrink-0 rotate-45"
        style={{
          background: isCurrent ? COLOR.accentBright : COLOR.accent,
          boxShadow: isCurrent ? GLOW.hard : GLOW.soft,
        }}
      />
      <span className="text-lead leading-relaxed" style={{ color: COLOR.fgBody }}>
        {text}
      </span>
    </li>
  );
}
