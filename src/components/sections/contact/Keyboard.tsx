"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  channels,
  emitContactSignal,
  KEYBOARD_ORDER,
  type Channel,
  type ChannelId,
} from "./channels";
import { KeyCap } from "./KeyCap";

const ACTIVE_LINGER_MS = 1500;

const KEY_INDEX = new Map<string, Channel>(
  channels.map((c) => [c.key.toUpperCase(), c]),
);

const BY_ID = new Map<ChannelId, Channel>(channels.map((c) => [c.id, c]));

export function Keyboard() {
  const [hotKey, setHotKey] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<ChannelId | null>(null);
  const lingerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const layout = useMemo(
    () => KEYBOARD_ORDER.map((id) => BY_ID.get(id)).filter(Boolean) as Channel[],
    [],
  );

  const activate = useCallback((channel: Channel) => {
    setActiveId(channel.id);
    emitContactSignal(channel.id);

    if (lingerRef.current) clearTimeout(lingerRef.current);
    lingerRef.current = setTimeout(() => {
      setActiveId(null);
    }, ACTIVE_LINGER_MS);

    if (typeof window === "undefined") return;
    if (channel.id === "email" || channel.id === "hire") {
      window.location.href = channel.href;
      return;
    }
    if (channel.download) {
      const a = document.createElement("a");
      a.href = channel.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.download = "";
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }
    window.open(
      channel.href,
      channel.external ? "_blank" : "_self",
      channel.external ? "noopener,noreferrer" : undefined,
    );
  }, []);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) {
          return;
        }
      }
      const key = e.key.toUpperCase();
      const channel = KEY_INDEX.get(key);
      if (!channel) return;
      e.preventDefault();
      setHotKey(key);
      activate(channel);
    };
    const onUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setHotKey((prev) => (prev === key ? null : prev));
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [activate]);

  useEffect(
    () => () => {
      if (lingerRef.current) clearTimeout(lingerRef.current);
    },
    [],
  );

  return (
    <div
      className="grid grid-cols-[repeat(3,78px)] gap-2 rounded-2xl p-3 sm:grid-cols-[repeat(3,110px)] sm:gap-2.5 sm:p-4"
      style={{
        background: "linear-gradient(180deg, #0a0e18 0%, #050810 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 24px rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {layout.map((c) => (
        <KeyCap
          key={c.id}
          channel={c}
          isActive={activeId === c.id}
          isHot={hotKey === c.key.toUpperCase()}
          onActivate={activate}
        />
      ))}
    </div>
  );
}
