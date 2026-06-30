import { COLOR } from "@/lib/theme";

type CornerTicksProps = {
  color?: string;
  opacity?: number;
  size?: string;
  zIndex?: number;
};

export function CornerTicks({
  color = COLOR.blueprint,
  opacity = 0.5,
  size = "h-3 w-3",
  zIndex,
}: CornerTicksProps) {
  const base = `absolute ${size} pointer-events-none`;
  const style = { borderColor: color, opacity, zIndex };
  return (
    <>
      <span aria-hidden className={`${base} top-0 left-0 border-t border-l`} style={style} />
      <span aria-hidden className={`${base} top-0 right-0 border-t border-r`} style={style} />
      <span aria-hidden className={`${base} bottom-0 left-0 border-b border-l`} style={style} />
      <span aria-hidden className={`${base} right-0 bottom-0 border-r border-b`} style={style} />
    </>
  );
}
