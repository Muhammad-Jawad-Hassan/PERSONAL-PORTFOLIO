export function BlueprintFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-3 z-30 sm:inset-4 md:inset-6"
    >
      <span className="absolute top-0 left-0 h-4 w-4 border-t border-l border-blueprint/50 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      <span className="absolute top-0 right-0 h-4 w-4 border-t border-r border-blueprint/50 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-blueprint/50 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-blueprint/50 sm:h-5 sm:w-5 md:h-6 md:w-6" />
    </div>
  );
}
