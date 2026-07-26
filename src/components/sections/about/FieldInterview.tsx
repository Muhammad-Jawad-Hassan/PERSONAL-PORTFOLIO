"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/lib/useInView";
import { useCardSpotlight } from "@/lib/useCardSpotlight";

const ACCENT = "#00E5FF";

type QA = {
  question: string;
  answer: string[];
};

const QA_PAIRS: QA[] = [
  {
    question: "What do you build?",
    answer: [
      "Production AI systems and the backends under them.",
      "Multi-agent platforms, RAG pipelines, knowledge graphs.",
    ],
  },
  {
    question: "What's your stack?",
    answer: [
      "Python, FastAPI, LangGraph, LangChain, MCP.",
      "Postgres, Neo4j, Redis, Temporal, Docker, AWS.",
    ],
  },
  {
    question: "How do you build?",
    answer: [
      "Object-oriented thinking. CI/CD.",
      "Tests on AI pipelines. Same rigor as backend engineering.",
    ],
  },
  {
    question: "What's your edge?",
    answer: [
      "I treat AI like infrastructure, not a demo.",
      "Edge cases get the same attention as the golden path.",
    ],
  },
  {
    question: "What have you shipped?",
    answer: [
      "Production AI across healthcare, fintech, and insurance.",
      "From multi-agent platforms to edge computer vision.",
    ],
  },
  {
    question: "What's next?",
    answer: [
      "Agentic platforms. Sharper evals.",
      "The quiet, hard parts of the field.",
    ],
  },
];

export function FieldInterview() {
  const total = QA_PAIRS.length;
  const isOdd = total % 2 === 1;

  return (
    <ol
      className="grid grid-cols-1 gap-5 sm:grid-cols-4 md:gap-7"
      style={{ perspective: "1400px" }}
    >
      {QA_PAIRS.map((qa, i) => {
        const isLastAlone = isOdd && i === total - 1;
        return (
          <li
            key={qa.question}
            className={
              isLastAlone ? "sm:col-span-2 sm:col-start-2" : "sm:col-span-2"
            }
          >
            <QACard qa={qa} index={i} />
          </li>
        );
      })}
    </ol>
  );
}

function QACard({ qa, index }: { qa: QA; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const spotlight = useCardSpotlight({ maxTilt: 7, parallax: 5 });
  const num = String(index + 1).padStart(2, "0");
  const tiltDir = index % 2 === 0 ? -1 : 1;
  const baseDelay = index * 140;

  const wrapperStyle = {
    animationDelay: `${baseDelay}ms`,
    "--tilt": `${tiltDir * 4}deg`,
  } as CSSProperties;

  return (
    <div ref={ref} className="relative h-full" style={{ perspective: "1200px" }}>
      <div
        className={`h-full ${inView ? "about-card-deal" : "opacity-0"}`}
        style={wrapperStyle}
      >
        <article
          ref={spotlight.ref}
          onMouseMove={spotlight.handlers.onMouseMove}
          onMouseEnter={spotlight.handlers.onMouseEnter}
          onMouseLeave={spotlight.handlers.onMouseLeave}
          className="group relative h-full overflow-hidden rounded-lg border p-6 sm:p-7"
          style={{
            background:
              "linear-gradient(180deg, rgba(19, 26, 45, 0.55) 0%, rgba(12, 17, 32, 0.55) 100%)",
            borderColor: spotlight.active ? ACCENT : "var(--border-default)",
            boxShadow: spotlight.active
              ? "0 0 32px rgba(0,229,255,0.20), 0 24px 48px rgba(0,0,0,0.45)"
              : "0 6px 18px rgba(0,0,0,0.25)",
            backdropFilter: "blur(6px)",
            transformStyle: "preserve-3d",
            transform: spotlight.transform || undefined,
            transition:
              "border-color 400ms ease, box-shadow 400ms ease, transform 220ms ease-out",
            ...spotlight.style,
          }}
        >
          {/* Cursor spotlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(0, 229, 255, 0.12), transparent 60%)",
              opacity: spotlight.active ? 1 : 0,
            }}
          />

          {/* Top hairline */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
              opacity: spotlight.active ? 1 : 0.35,
              transition: "opacity 300ms ease",
            }}
          />

          {/* Entry sweep beam */}
          {inView && (
            <span
              aria-hidden
              className="card-beam-once pointer-events-none absolute inset-x-0 top-0 z-[2] h-[55%]"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(0,229,255,0.5), transparent)",
                animationDelay: `${baseDelay + 220}ms`,
                mixBlendMode: "screen",
              }}
            />
          )}

          {/* Faded background numeral */}
          <span
            aria-hidden
            className={`font-display pointer-events-none absolute -top-3 right-4 z-0 select-none text-[6rem] leading-none ${
              inView ? "about-card-num" : "opacity-0"
            }`}
            style={{
              color: `${ACCENT}14`,
              animationDelay: `${baseDelay + 300}ms`,
            }}
          >
            {num}
          </span>

          {/* Corner pin */}
          <span
            aria-hidden
            className={`absolute top-3 left-3 block h-1.5 w-1.5 ${
              inView ? "about-card-pin" : "opacity-0"
            }`}
            style={{
              background: ACCENT,
              boxShadow: `0 0 12px ${ACCENT}`,
              animationDelay: `${baseDelay + 360}ms`,
            }}
          />

          {/* Lifted content layer */}
          <div
            className="relative z-10"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="flex items-center gap-3 pl-4">
              <span
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{
                  color: ACCENT,
                  textShadow: `0 0 12px ${ACCENT}55`,
                }}
              >
                Q · {num}
              </span>
              <span
                aria-hidden
                className="h-px flex-1 origin-left"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT}55, transparent)`,
                  transform: inView ? "scaleX(1)" : "scaleX(0)",
                  transition: `transform 700ms cubic-bezier(0.7,0,0.2,1) ${baseDelay + 320}ms`,
                }}
              />
            </div>

            <p
              className={`mt-4 pl-4 font-mono text-[11px] tracking-[0.26em] uppercase sm:text-[12px] ${
                inView ? "about-question-slide" : "opacity-0"
              }`}
              style={{
                color: "rgba(232, 236, 245, 0.55)",
                animationDelay: `${baseDelay + 440}ms`,
              }}
            >
              {qa.question}
            </p>

            <div className="mt-5 space-y-1">
              {qa.answer.map((line, li) => (
                <p
                  key={li}
                  className={`font-display text-balance leading-[1.15] tracking-tight ${
                    inView ? "about-answer-rise" : "opacity-0"
                  }`}
                  style={{
                    color:
                      li === 0
                        ? "var(--fg-default)"
                        : "rgba(232, 236, 245, 0.85)",
                    fontSize: "clamp(1.2rem, 2.6vw, 1.7rem)",
                    animationDelay: `${baseDelay + 600 + li * 140}ms`,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
