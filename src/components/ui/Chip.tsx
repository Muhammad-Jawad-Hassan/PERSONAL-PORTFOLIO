import { COLOR, CHIP_BG } from "@/lib/theme";

type ChipProps = {
  label: string;
  active?: boolean;
  delay?: number;
};

export function Chip({ label, active = true, delay = 0 }: ChipProps) {
  const className = active
    ? "experience-chip-in group/chip rounded-md border px-3 py-1.5 font-mono text-[13px] tracking-wide transition-all duration-300 hover:-translate-y-0.5"
    : "group/chip rounded-md border px-3 py-1.5 font-mono text-[13px] tracking-wide opacity-0";

  return (
    <span
      className={className}
      style={{
        color: COLOR.fgBody,
        borderColor: COLOR.borderDefault,
        background: CHIP_BG,
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = COLOR.accent;
        e.currentTarget.style.color = COLOR.fgDefault;
        e.currentTarget.style.boxShadow = "0 0 14px var(--accent-glow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = COLOR.borderDefault;
        e.currentTarget.style.color = COLOR.fgBody;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {label}
    </span>
  );
}

type ChipListProps = {
  items: string[];
  active?: boolean;
  baseDelay?: number;
  step?: number;
  className?: string;
};

export function ChipList({
  items,
  active = true,
  baseDelay = 0,
  step = 38,
  className = "flex flex-wrap gap-2",
}: ChipListProps) {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <Chip
          key={item}
          label={item}
          active={active}
          delay={baseDelay + i * step}
        />
      ))}
    </div>
  );
}
