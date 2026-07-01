const ACCENT = "var(--accent)";
const ACCENT_BRIGHT = "var(--accent-bright)";

export function SectionDivider() {
  return (
    <div
      aria-hidden
      role="presentation"
      className="mx-auto flex w-full max-w-5xl items-center justify-center gap-4 px-5 sm:px-6 md:px-12"
    >
      <span
        className="block h-px flex-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${ACCENT})`,
          opacity: 0.6,
        }}
      />
      <span
        className="block h-1.5 w-1.5 rotate-45"
        style={{
          background: ACCENT_BRIGHT,
          boxShadow:
            "0 0 14px var(--accent-glow), 0 0 6px var(--accent-bright)",
        }}
      />
      <span
        className="block h-px flex-1"
        style={{
          background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
          opacity: 0.6,
        }}
      />
    </div>
  );
}
