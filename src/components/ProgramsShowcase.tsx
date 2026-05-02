"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const PROGRAMS = [
  {
    id: "01",
    name: "Data Analyst Masterclass",
    duration: "3",
    students: "1,200+",
    hike: "86",
    desc: "Become an advanced Data Analyst in 3 months. Master Excel, SQL, Power BI, and Python through live classes with practitioner instructors.",
    stack: ["Python", "Excel", "SQL", "Power BI"],
    orig: "₹50,000",
    disc: "₹9,999",
  },
  {
    id: "02",
    name: "Full-Stack Engineering",
    duration: "4",
    students: "980+",
    hike: "92",
    desc: "Zero to deployed in 4 months. Build production-ready applications with React, Node.js, and modern DevOps practices.",
    stack: ["React", "Node.js", "MongoDB", "AWS"],
    orig: "₹60,000",
    disc: "₹12,999",
  },
  {
    id: "03",
    name: "Product Management",
    duration: "3.5",
    students: "740+",
    hike: "78",
    desc: "Think like a PM, ship like a pro. Learn strategy, execution, and analytics from industry experts at BCG and Amazon.",
    stack: ["Figma", "Analytics", "Strategy", "Metrics"],
    orig: "₹55,000",
    disc: "₹11,499",
  },
  {
    id: "04",
    name: "AI & Machine Learning",
    duration: "4",
    students: "620+",
    hike: "95",
    desc: "Master cutting-edge AI/ML from Google researchers. Build real-world models and deploy them to production at scale.",
    stack: ["Python", "TensorFlow", "PyTorch", "LLMs"],
    orig: "₹70,000",
    disc: "₹14,999",
  },
  {
    id: "05",
    name: "UX/UI Design Masterclass",
    duration: "3",
    students: "530+",
    hike: "82",
    desc: "Design systems that 100M+ users love. Learn from Flipkart's design lead with hands-on projects and a real portfolio.",
    stack: ["Figma", "Design Systems", "Research", "Prototyping"],
    orig: "₹45,000",
    disc: "₹8,999",
  },
  {
    id: "06",
    name: "DevOps & Cloud Architecture",
    duration: "3.5",
    students: "480+",
    hike: "88",
    desc: "Demystify Kubernetes & AWS. Scale infrastructure for Fortune 500 clients with confidence and a job-ready portfolio.",
    stack: ["Kubernetes", "AWS", "CI/CD", "Docker"],
    orig: "₹65,000",
    disc: "₹13,499",
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

export default function ProgramsShowcase() {
  const [active, setActive] = useState(0);
  const [hoverNav, setHoverNav] = useState<number | null>(null);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [hoverEnroll, setHoverEnroll] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const INTERVAL = 4000; // ms per slide
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const startTimers = useCallback(() => {
    clearTimers();
    setProgress(0);
    // Progress ticker — updates every 40ms (~100 steps over INTERVAL)
    const step = 100 / (INTERVAL / 40);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 40);
    // Slide advance
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % PROGRAMS.length);
      setProgress(0);
    }, INTERVAL);
  }, []);

  // Start on mount, pause/resume on hover
  useEffect(() => {
    if (!paused) startTimers();
    else clearTimers();
    return clearTimers;
  }, [paused, startTimers]);

  const p = PROGRAMS[active];

  // Manual nav — reset timer
  const goTo = (i: number) => {
    setActive(i);
    setProgress(0);
    if (!paused) startTimers();
  };
  const prev = () => goTo((active - 1 + PROGRAMS.length) % PROGRAMS.length);
  const next = () => goTo((active + 1) % PROGRAMS.length);

  return (
    <>
      {/* Font import — scoped to this component */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');
      `}</style>

      <section
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          position: "relative",
          padding: "72px 0 80px",
          background: "var(--bg-page)",
          overflow: "hidden",
        }}
      >
        {/* Ruled background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 79px, var(--border) 79px, var(--border) 80px)",
            pointerEvents: "none",
            opacity: 0.5,
          }}
        />

        {/* Green ambient glow top-right */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, var(--brand-green-glow) 0%, transparent 70%)",
            top: -80,
            right: -80,
            pointerEvents: "none",
          }}
        />

        {/* ── Inner wrapper ── */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 40px",
            position: "relative",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--brand-green)",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 28,
                height: 1,
                background: "var(--brand-green)",
                opacity: 0.5,
              }}
            />
            Career Accelerators
          </div>

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              marginBottom: 48,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(34px, 4.8vw, 56px)",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--fg-primary)",
                margin: 0,
              }}
            >
              Programs built to
              <br />
              <em style={{ fontStyle: "italic", color: "var(--brand-green)" }}>
                set you apart
              </em>
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "var(--fg-muted)",
                lineHeight: 1.7,
                maxWidth: 220,
                textAlign: "right",
                fontWeight: 300,
                margin: 0,
              }}
            >
              Learn from industry veterans. Earn credentials that open doors.
            </p>
          </div>

          {/* Tab nav */}
          <nav
            style={{
              display: "flex",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              marginBottom: 40,
              overflowX: "auto",
              scrollbarWidth: "none" as const,
            }}
          >
            {SHORT_NAMES.map((name, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                onMouseEnter={() => setHoverNav(i)}
                onMouseLeave={() => setHoverNav(null)}
                style={{
                  background: "none",
                  border: "none",
                  borderRight: "1px solid var(--border)",
                  cursor: "pointer",
                  padding: "14px 22px 12px",
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color:
                    i === active
                      ? "var(--brand-green)"
                      : hoverNav === i
                        ? "var(--fg-secondary)"
                        : "var(--fg-muted)",
                  position: "relative",
                  whiteSpace: "nowrap" as const,
                  transition: "color 0.2s",
                  flexShrink: 0,
                }}
              >
                {name}
                <span
                  style={{
                    position: "absolute",
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "var(--brand-green)",
                    transform: i === active ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 0.25s ease",
                    display: "block",
                  }}
                />
              </button>
            ))}
          </nav>

          {/* ── Card grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              background: "var(--border)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Cell 1 — Title + desc */}
            <div
              style={{
                background: "var(--bg-page)",
                padding: "40px 44px",
                gridColumn: 1,
                gridRow: 1,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 10,
                  color: "var(--fg-muted)",
                  letterSpacing: "0.1em",
                  marginBottom: 18,
                }}
              >
                {p.id} / 06
              </p>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 32,
                  fontWeight: 400,
                  lineHeight: 1.12,
                  color: "var(--fg-primary)",
                  marginBottom: 14,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.name}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--fg-secondary)",
                  lineHeight: 1.8,
                  maxWidth: 340,
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                {p.desc}
              </p>
            </div>

            {/* Cell 2 — Stats (in rows on right) */}
            <div
              style={{
                background: "var(--bg-card)",
                borderLeft: "1px solid var(--border)",
                gridColumn: 2,
                gridRow: "1 / 4",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "28px 44px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                {[
                  { label: "Duration", value: p.duration, unit: "months" },
                  {
                    label: "Graduates placed",
                    value: p.students,
                    unit: "and counting",
                  },
                  {
                    label: "Avg. salary hike",
                    value: `${p.hike}%`,
                    unit: "post-placement",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-geist-mono, monospace)",
                        fontSize: 9,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--fg-muted)",
                        marginBottom: 8,
                      }}
                    >
                      {s.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Serif Display', Georgia, serif",
                        fontSize: 40,
                        fontWeight: 400,
                        lineHeight: 1,
                        color: "var(--brand-green)",
                        letterSpacing: "-0.02em",
                        margin: 0,
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--fg-muted)",
                        marginTop: 4,
                        fontWeight: 300,
                      }}
                    >
                      {s.unit}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div style={{ textAlign: "right", width: "100%" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: 11,
                      color: "var(--fg-muted)",
                      textDecoration: "line-through",
                      marginBottom: 4,
                    }}
                  >
                    {p.orig}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: 34,
                      color: "var(--fg-primary)",
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}
                  >
                    {p.disc}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--fg-muted)",
                      marginTop: 4,
                      fontWeight: 300,
                    }}
                  >
                    All-inclusive · EMI available
                  </p>
                </div>

                {/* CTA Button in stats cell */}
                <button
                  onMouseEnter={() => setHoverEnroll(true)}
                  onMouseLeave={() => setHoverEnroll(false)}
                  style={{
                    background: hoverEnroll
                      ? "var(--brand-green-dark)"
                      : "var(--brand-green)",
                    border: "none",
                    cursor: "pointer",
                    padding: "13px 30px",
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#fff",
                    fontWeight: 500,
                    borderRadius: 4,
                    transition: "background 0.2s",
                    alignSelf: "flex-start",
                  }}
                >
                  Enroll Now
                </button>
              </div>
            </div>

            {/* Cell 3 — Stack */}
            <div
              style={{
                background: "var(--bg-card)",
                borderTop: "1px solid var(--border)",
                padding: "28px 44px",
                gridColumn: 1,
                gridRow: 2,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                  marginBottom: 14,
                }}
              >
                Curriculum stack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.stack.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: 10,
                      letterSpacing: "0.06em",
                      padding: "6px 12px",
                      border: "1px solid var(--border)",
                      color: "var(--fg-secondary)",
                      background: "var(--bg-page)",
                      borderRadius: 4,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer — counter + progress + arrows */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 32,
              paddingTop: 20,
              borderTop: "1px solid var(--border)",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 10,
                color: "var(--fg-muted)",
                letterSpacing: "0.1em",
                flexShrink: 0,
              }}
            >
              {String(active + 1).padStart(2, "0")} / 06
            </span>

            {/* Progress bar */}
            <div
              style={{
                flex: 1,
                height: 2,
                background: "var(--border)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: paused ? "var(--fg-muted)" : "var(--brand-green)",
                  borderRadius: 99,
                  transition: "width 40ms linear, background 0.3s",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              {[
                {
                  label: "←",
                  hover: hoverPrev,
                  setHover: setHoverPrev,
                  fn: prev,
                },
                {
                  label: "→",
                  hover: hoverNext,
                  setHover: setHoverNext,
                  fn: next,
                },
              ].map(({ label, hover, setHover, fn }) => (
                <button
                  key={label}
                  onClick={fn}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  aria-label={label === "←" ? "Previous" : "Next"}
                  style={{
                    background: hover
                      ? "var(--brand-green-glow)"
                      : "var(--bg-card)",
                    border: hover
                      ? "1px solid var(--brand-green)"
                      : "1px solid var(--border)",
                    width: 38,
                    height: 38,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: hover ? "var(--brand-green)" : "var(--fg-muted)",
                    fontSize: 15,
                    borderRadius: 6,
                    transition:
                      "background 0.2s, color 0.2s, border-color 0.2s",
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
