"use client";

import { profile } from "@/data/profile";

type SocialItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const ITEMS: SocialItem[] = [
  {
    href: profile.links.linkedin,
    label: "LinkedIn",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="h-[14px] w-[14px] sm:h-4 sm:w-4"
      >
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.83v1.64h.05c.53-.95 1.84-1.95 3.78-1.95 4.04 0 4.79 2.5 4.79 5.74V21H17.6v-5.66c0-1.35-.03-3.08-1.97-3.08-1.97 0-2.27 1.46-2.27 2.98V21H9V9Z" />
      </svg>
    ),
  },
  {
    href: profile.links.github,
    label: "GitHub",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="h-[14px] w-[14px] sm:h-4 sm:w-4"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
];

export function SocialDock() {
  return (
    <div className="pointer-events-none fixed top-5 left-5 z-40 flex items-center gap-2 sm:top-7 sm:left-7 md:top-10 md:left-10 md:gap-2.5">
      {ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="text-muted hover:text-fg pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border bg-raised/40 backdrop-blur-md transition-all hover:scale-[1.06] hover:bg-elevated/70 sm:h-10 sm:w-10 md:h-11 md:w-11"
          style={{ borderColor: "var(--border-default)" }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
