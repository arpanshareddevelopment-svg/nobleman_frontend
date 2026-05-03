"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: "01",
    name: "Data Analyst Masterclass",
    duration: "3",
    students: "1,200+",
    hike: "86%",
    desc: "Become an advanced Data Analyst in 3 months. Master Excel, SQL, Power BI, and Python through live classes with practitioner instructors.",
    stack: ["Python", "Excel", "SQL", "Power BI"],
  },
  {
    id: "02",
    name: "Full-Stack Engineering",
    duration: "4",
    students: "980+",
    hike: "92%",
    desc: "Zero to deployed in 4 months. Build production-ready applications with React, Node.js, and modern DevOps practices.",
    stack: ["React", "Node.js", "MongoDB", "AWS"],
  },
  {
    id: "03",
    name: "Product Management",
    duration: "3.5",
    students: "740+",
    hike: "78%",
    desc: "Think like a PM, ship like a pro. Learn strategy, execution, and analytics from industry experts at BCG and Amazon.",
    stack: ["Figma", "Analytics", "Strategy", "Metrics"],
  },
  {
    id: "04",
    name: "AI & Machine Learning",
    duration: "4",
    students: "620+",
    hike: "95%",
    desc: "Master cutting-edge AI/ML from Google researchers. Build real-world models and deploy them to production at scale.",
    stack: ["Python", "TensorFlow", "PyTorch", "LLMs"],
  },
  {
    id: "05",
    name: "UX/UI Design Masterclass",
    duration: "3",
    students: "530+",
    hike: "82%",
    desc: "Design systems that 100M+ users love. Learn from Flipkart's design lead with hands-on projects and a real portfolio.",
    stack: ["Figma", "Design Systems", "Research", "Prototyping"],
  },
  {
    id: "06",
    name: "DevOps & Cloud Architecture",
    duration: "3.5",
    students: "480+",
    hike: "88%",
    desc: "Demystify Kubernetes & AWS. Scale infrastructure for Fortune 500 clients with confidence and a job-ready portfolio.",
    stack: ["Kubernetes", "AWS", "CI/CD", "Docker"],
  },
];

const SHORT_NAMES = [
  "Data Analyst",
  "Full-Stack",
  "Product Mgmt",
  "AI / ML",
  "UX / UI",
  "DevOps",
];

const INTERVAL = 4000;

// ─── Component ─────────────────────────────────────────────────────────────
export default function ProgramsShowcase() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  // Always-on autoplay — no hover pause whatsoever
  const startTimers = useCallback(() => {
    clearTimers();
    setProgress(0);
    const step = 100 / (INTERVAL / 40);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 40);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % PROGRAMS.length);
      setProgress(0);
    }, INTERVAL);
  }, []);

  useEffect(() => {
    startTimers();
    return clearTimers;
  }, [startTimers]);

  const goTo = (i: number) => {
    setActive(i);
    setProgress(0);
    startTimers();
  };

  const prev = () => goTo((active - 1 + PROGRAMS.length) % PROGRAMS.length);
  const next = () => goTo((active + 1) % PROGRAMS.length);

  const p = PROGRAMS[active];

  return (
    <>
      {/*
        Font import — remove if DM Serif Display & Manrope are already
        loaded in your layout.tsx or globals.css.
        Space Grotesk is already imported in your globals.css.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@200..800&display=swap');

        .prog-tab-line { transform: scaleX(0); transition: transform 0.25s ease; }
        .prog-tab-active .prog-tab-line { transform: scaleX(1); }
        .prog-arrow:hover {
          background: var(--brand-green-glow) !important;
          border-color: var(--brand-green) !important;
          color: var(--brand-green-dark) !important;
        }
        .prog-enroll:hover {
          background: var(--brand-green-dark) !important;
          color: #fff !important;
        }
      `}</style>

      <section
        className="relative overflow-hidden py-16 lg:py-20"
        style={{
          background: "var(--bg-page)",
          color: "var(--fg-primary)",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* Ruled grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), " +
              "linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Brand-green ambient glow */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--brand-green-glow) 0%, transparent 70%)",
          }}
        />

        {/* ── Inner wrapper ── */}
        <div className="relative mx-auto max-w-[1060px] px-6 lg:px-9">
          {/* Eyebrow */}
          <div
            className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--brand-green-dark)" }}
          >
            <span
              className="h-[1.5px] w-6 flex-shrink-0"
              style={{ background: "var(--brand-green)" }}
            />
            Career Accelerators
          </div>

          {/* Header */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <h2
              className="font-normal leading-[1.08] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "var(--fg-primary)",
              }}
            >
              Programs built to &nbsp;
              <span style={{ color: "var(--brand-green-dark)" }}>
                set you apart
              </span>
            </h2>
            <p
              className="max-w-[200px] text-right text-[12px] leading-[1.7]"
              style={{ color: "var(--fg-muted)" }}
            >
              Learn from industry veterans. Earn credentials that open doors.
            </p>
          </div>

          {/* Tab nav */}
          <nav
            className="mb-9 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {SHORT_NAMES.map((name, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative flex-shrink-0 border-none bg-transparent px-5 pb-[11px] pt-[13px] text-[10px] uppercase tracking-[0.12em] transition-colors duration-200 ${
                  i === active ? "prog-tab-active" : ""
                }`}
                style={{
                  borderRight: "1px solid var(--border)",
                  color:
                    i === active
                      ? "var(--brand-green-dark)"
                      : "var(--fg-muted)",
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                {name}
                <span
                  className="prog-tab-line absolute bottom-[-1px] left-0 right-0 block h-[2px]"
                  style={{ background: "var(--brand-green)" }}
                />
              </button>
            ))}
          </nav>

          {/* ── Card grid ── */}
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              background: "var(--border)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Cell 1 — Title + description */}
            <div
              className="p-9 lg:p-10"
              style={{
                background: "var(--bg-page)",
                gridColumn: 1,
                gridRow: 1,
              }}
            >
              <p
                className="mb-3 text-[10px] tracking-[0.1em]"
                style={{ color: "var(--fg-muted)" }}
              >
                {p.id} / 06
              </p>
              <h3
                className="mb-3 font-normal leading-[1.12] tracking-[-0.01em]"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: "28px",
                  color: "var(--fg-primary)",
                }}
              >
                {p.name}
              </h3>
              <p
                className="max-w-[320px] text-[12.5px] leading-[1.8]"
                style={{ color: "var(--fg-secondary)" }}
              >
                {p.desc}
              </p>
            </div>

            {/* Cell 2 — Stats + CTA (spans rows 1–3) */}
            <div
              className="flex flex-col justify-between p-7 lg:p-9"
              style={{
                background: "var(--bg-card)",
                borderLeft: "1px solid var(--border)",
                gridColumn: 2,
                gridRow: "1 / 4",
              }}
            >
              {/* Stats with vertical dividers */}
              <div className="flex items-stretch">
                {[
                  { label: "Duration", value: p.duration, unit: "months" },
                  { label: "Placed", value: p.students, unit: "students" },
                  { label: "Avg hike", value: p.hike, unit: "salary increase" },
                ].map((s, idx) => (
                  <div key={s.label} className="flex items-stretch">
                    {/* Vertical divider between stats */}
                    {idx > 0 && (
                      <div
                        className="mx-4 w-px flex-shrink-0 self-stretch"
                        style={{ background: "var(--border)" }}
                      />
                    )}
                    <div className="flex flex-col">
                      <span
                        className="mb-1.5 text-[9px] uppercase tracking-[0.16em]"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {s.label}
                      </span>
                      <span
                        className="text-[26px] font-extrabold leading-none tracking-[-0.02em]"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          color: "var(--brand-green-dark)",
                        }}
                      >
                        {s.value}
                      </span>
                      <span
                        className="mt-1 text-[10px] tracking-[0.04em]"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {s.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <button
                className="prog-enroll w-full cursor-pointer rounded-lg border-none px-5 py-[11px] text-[10px] font-bold uppercase tracking-[0.16em] transition-colors duration-200"
                style={{
                  background: "var(--brand-green)",
                  color: "#0d1117", // dark text on lime — works in both modes
                  fontFamily: "inherit",
                }}
              >
                Explore Program →
              </button>
            </div>

            {/* Cell 3 — Curriculum stack pills */}
            <div
              className="px-9 py-[22px]"
              style={{
                background: "var(--bg-card)",
                borderTop: "1px solid var(--border)",
                gridColumn: 1,
                gridRow: 2,
              }}
            >
              <p
                className="mb-3 text-[9px] uppercase tracking-[0.18em]"
                style={{ color: "var(--fg-muted)" }}
              >
                Curriculum stack
              </p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md px-3 py-[5px] text-[10px] tracking-[0.04em]"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--fg-secondary)",
                      background: "var(--bg-page)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer — counter + progress bar + arrows */}
          <div
            className="mt-7 flex items-center justify-between gap-4 pt-5"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span
              className="flex-shrink-0 text-[10px] tracking-[0.1em]"
              style={{ color: "var(--fg-muted)" }}
            >
              {String(active + 1).padStart(2, "0")} / 06
            </span>

            {/* Progress bar */}
            <div
              className="h-[2px] flex-1 overflow-hidden rounded-full"
              style={{ background: "var(--border)" }}
            >
              <div
                className="h-full rounded-full transition-[width] duration-[40ms] ease-linear"
                style={{
                  width: `${progress}%`,
                  background: "var(--brand-green)",
                }}
              />
            </div>

            {/* Arrow buttons */}
            <div className="flex flex-shrink-0 gap-2">
              {[
                { label: "←", fn: prev, aria: "Previous program" },
                { label: "→", fn: next, aria: "Next program" },
              ].map(({ label, fn, aria }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={aria}
                  className="prog-arrow flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-sm transition-all duration-200"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border)",
                    color: "var(--fg-muted)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
