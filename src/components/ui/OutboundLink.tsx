import type { CSSProperties, ReactNode } from "react";

type Props = {
  /** When omitted, the label renders as plain styled text with no arrow. */
  href?: string;
  children: ReactNode;
  /** Text colour. Defaults to the accent. */
  color?: string;
  /** Adds the accent text-glow used on active/current items. */
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Outbound company / client link. Renders the label with a trailing arrow glyph
 * that lifts on hover, matching the blueprint chrome used across the sections.
 * Falls back to plain text when no href is available, so callers don't need to
 * branch on it themselves.
 */
export function OutboundLink({
  href,
  children,
  color = "var(--accent)",
  glow,
  className,
  style,
}: Props) {
  const textStyle: CSSProperties = {
    color,
    textShadow: glow ? "0 0 14px var(--accent-glow)" : undefined,
    ...style,
  };

  if (!href) {
    return (
      <span className={className} style={textStyle}>
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/out inline-flex items-baseline gap-1 transition-opacity duration-300 hover:opacity-85 ${className ?? ""}`}
      style={textStyle}
    >
      <span className="underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover/out:decoration-current">
        {children}
      </span>
      <span
        aria-hidden
        className="text-[0.72em] transition-transform duration-300 group-hover/out:translate-x-[2px] group-hover/out:-translate-y-[2px]"
      >
        ↗
      </span>
    </a>
  );
}
