import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.32em] text-muted select-none",
        className,
      )}
    >
      <span className="text-accent">/</span>
      <span> jawad-hassan</span>
    </div>
  );
}
