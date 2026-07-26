import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} · ${profile.role} · Portfolio`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const BG_VOID = "#03050b";
const FG = "#e8ecf5";
const MUTED = "#9aa3b7";
const ACCENT = "#00E5FF";
const BLUEPRINT = "#6cd3ff";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: BG_VOID,
          backgroundImage: [
            "radial-gradient(ellipse 60% 50% at 8% 0%, rgba(0,229,255,0.20), transparent 70%)",
            "radial-gradient(ellipse 70% 60% at 100% 100%, rgba(0,229,255,0.10), transparent 70%)",
            "linear-gradient(135deg, #060912 0%, #03050b 60%, #02040a 100%)",
          ].join(", "),
          padding: 64,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            backgroundImage: [
              "linear-gradient(to right, rgba(108,211,255,0.07) 1px, transparent 1px)",
              "linear-gradient(to bottom, rgba(108,211,255,0.07) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "64px 64px",
          }}
        />

        <CornerTick anchor="tl" />
        <CornerTick anchor="tr" />
        <CornerTick anchor="bl" />
        <CornerTick anchor="br" />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 56,
                height: 1,
                background: ACCENT,
                marginRight: 18,
              }}
            />
            <div
              style={{
                display: "flex",
                color: ACCENT,
                fontSize: 20,
                letterSpacing: 6,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Portfolio · 2026
            </div>
          </div>

          <div style={{ display: "flex", flex: 1 }} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 104,
                fontWeight: 700,
                color: FG,
                letterSpacing: -3,
                lineHeight: 1,
              }}
            >
              Muhammad Jawad Hassan
            </div>

            <div
              style={{
                marginTop: 32,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 96,
                  height: 2,
                  background: ACCENT,
                  marginRight: 20,
                }}
              />
              <div
                style={{
                  display: "flex",
                  color: ACCENT,
                  fontSize: 30,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Senior AI / ML · Backend Engineer
              </div>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 28,
                color: MUTED,
                fontSize: 26,
                lineHeight: 1.4,
                maxWidth: 880,
              }}
            >
              Agentic AI, RAG architectures, computer vision, scalable
              backends.
            </div>
          </div>

          <div style={{ display: "flex", flex: 1 }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  width: 8,
                  height: 8,
                  background: ACCENT,
                  transform: "rotate(45deg)",
                  marginRight: 12,
                }}
              />
              <div
                style={{
                  display: "flex",
                  color: MUTED,
                  fontSize: 18,
                  letterSpacing: 6,
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                / jawad-hassan
              </div>
            </div>
            <div
              style={{
                display: "flex",
                color: MUTED,
                fontSize: 18,
                letterSpacing: 6,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Lahore, Pakistan
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

type Anchor = "tl" | "tr" | "bl" | "br";

function CornerTick({ anchor }: { anchor: Anchor }) {
  const OFFSET = 28;
  const SIZE = 22;
  const base = {
    position: "absolute" as const,
    width: SIZE,
    height: SIZE,
    display: "flex",
    opacity: 0.55,
  };
  switch (anchor) {
    case "tl":
      return (
        <div
          style={{
            ...base,
            top: OFFSET,
            left: OFFSET,
            borderTop: `1px solid ${BLUEPRINT}`,
            borderLeft: `1px solid ${BLUEPRINT}`,
          }}
        />
      );
    case "tr":
      return (
        <div
          style={{
            ...base,
            top: OFFSET,
            right: OFFSET,
            borderTop: `1px solid ${BLUEPRINT}`,
            borderRight: `1px solid ${BLUEPRINT}`,
          }}
        />
      );
    case "bl":
      return (
        <div
          style={{
            ...base,
            bottom: OFFSET,
            left: OFFSET,
            borderBottom: `1px solid ${BLUEPRINT}`,
            borderLeft: `1px solid ${BLUEPRINT}`,
          }}
        />
      );
    case "br":
      return (
        <div
          style={{
            ...base,
            bottom: OFFSET,
            right: OFFSET,
            borderBottom: `1px solid ${BLUEPRINT}`,
            borderRight: `1px solid ${BLUEPRINT}`,
          }}
        />
      );
  }
}
