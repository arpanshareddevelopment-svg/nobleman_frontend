"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const startTimers = useCallback(() => {
    clearTimers();

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
  const navRef = useRef<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-120px" });

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const container = navRef.current;
    const tab = tabRefs.current[active];

    if (!container || !tab) return;

    const left =
      tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;

    container.scrollTo({
      left,
      behavior: "smooth",
    });
  }, [active]);

  const goTo = (i: number) => {
    setActive(i);
    setProgress(0);
    startTimers();
  };

  const prev = () => goTo((active - 1 + PROGRAMS.length) % PROGRAMS.length);
  const next = () => goTo((active + 1) % PROGRAMS.length);

  const p = PROGRAMS[active];

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative overflow-hidden py-12 lg:py-20 text-[var(--fg-primary)] [font-family:'Space_Grotesk',sans-serif]"
      style={{ background: "var(--bg-page)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-24 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-page) 0%, transparent 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), " +
            "linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--brand-green-glow) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1060px] px-4 sm:px-6 lg:px-9">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex items-center gap-3 text-[10px] sm:text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-[0.2em]"
          style={{ color: "var(--brand-green-dark)" }}
        >
          <span
            className="h-[1.5px] w-6 flex-shrink-0"
            style={{ background: "var(--brand-green)" }}
          />
          Career Accelerators
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-5"
        >
          <h2
            className="font-normal leading-[1.08] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              color: "var(--fg-primary)",
            }}
          >
            Programs built to &nbsp;
            <span style={{ color: "var(--brand-green-dark)" }}>
              set you apart
            </span>
          </h2>

          <p
            className="max-w-full text-left text-lg leading-[1.7] md:text-right"
            style={{ color: "var(--fg-muted)" }}
          >
            Learn from industry veterans. Earn credentials that open doors.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="relative">
          <nav
            ref={navRef}
            className="program-tabs mb-9 flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {" "}
            <div className="w-[35vw] flex-shrink-0 md:hidden" />
            {SHORT_NAMES.map((name, i) => (
              <button
                key={i}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                onClick={() => goTo(i)}
                className="relative flex-shrink-0 snap-center border-none bg-transparent px-4 sm:px-5 pb-[11px] pt-[13px] text-[10px] sm:text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-[0.12em] transition-colors duration-200"
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
                  className={`absolute bottom-[-1px] left-0 right-0 block h-[2px] origin-left transition-transform duration-200 ${
                    i === active ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{ background: "var(--brand-green)" }}
                />
              </button>
            ))}
            <div className="w-[35vw] flex-shrink-0 md:hidden" />
          </nav>
        </div>
        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="grid overflow-hidden rounded-2xl grid-cols-1 lg:grid-cols-2"
          style={{
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Cell 1 */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="p-7 sm:p-8 lg:col-start-1 lg:row-start-1 lg:p-10"
            style={{
              background: "var(--bg-page)",
            }}
          >
            <p
              className="mb-3 text-[10px] sm:text-[clamp(0.65rem,0.8vw,0.75rem)] tracking-[0.1em]"
              style={{ color: "var(--fg-muted)" }}
            >
              {p.id} / 06
            </p>

            <h3
              className="mb-3 font-normal leading-[1.12] tracking-[-0.01em] text-[clamp(1.35rem,2.4vw,1.75rem)]"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                color: "var(--fg-primary)",
              }}
            >
              {p.name}
            </h3>

            <p
              className="max-w-full text-[12.5px] leading-[1.8] sm:max-w-[320px]"
              style={{ color: "var(--fg-secondary)" }}
            >
              {p.desc}
            </p>
          </motion.div>

          {/* Cell 2 */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-col justify-between p-6 sm:p-7 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:border-l lg:border-t-0 lg:p-9 border-t border-[var(--border)]"
            style={{
              background: "var(--bg-card)",
            }}
          >
            <div className="flex flex-row items-stretch gap-3 sm:gap-0">
              {[
                { label: "Duration", value: p.duration, unit: "months" },
                { label: "Placed", value: p.students, unit: "students" },
                { label: "Avg hike", value: p.hike, unit: "salary increase" },
              ].map((s, idx) => (
                <div
                  key={s.label}
                  className="flex min-w-0 flex-1 items-stretch"
                >
                  {idx > 0 && (
                    <div className="mx-3 w-px flex-shrink-0 self-stretch bg-[var(--border)] sm:mx-4" />
                  )}

                  <div className="flex flex-col">
                    <span
                      className="mb-1.5 text-[clamp(0.6rem,0.75vw,0.7rem)] uppercase tracking-[0.16em]"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {s.label}
                    </span>

                    <span className="text-[clamp(1.35rem,2vw,1.65rem)] font-extrabold leading-none tracking-[-0.02em] text-[var(--brand-green-dark)]">
                      {s.value}
                    </span>

                    <span
                      className="mt-1 text-[clamp(0.6rem,0.75vw,0.7rem)] tracking-[0.04em]"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {s.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="mt-8 w-full cursor-pointer rounded-lg border-none px-5 py-[11px] text-[10px] sm:text-[clamp(0.65rem,0.8vw,0.75rem)] font-bold uppercase tracking-[0.16em] transition-colors duration-200 bg-[var(--brand-green)] text-[#0d1117] hover:bg-[var(--brand-green-dark)] hover:text-white"
              style={{
                fontFamily: "inherit",
              }}
            >
              Explore Program →
            </button>
          </motion.div>

          {/* Cell 3 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="px-7 py-6 sm:px-9 sm:py-[22px] lg:col-start-1 lg:row-start-2"
            style={{
              background: "var(--bg-card)",
            }}
          >
            <p
              className="mb-3 text-[clamp(0.6rem,0.75vw,0.7rem)] uppercase tracking-[0.18em]"
              style={{ color: "var(--fg-muted)" }}
            >
              Curriculum stack
            </p>

            <div className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-md px-3 py-[5px] text-[10px] sm:text-[clamp(0.6rem,0.75vw,0.7rem)] tracking-[0.04em]"
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
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="mt-7 flex flex-wrap items-center justify-between gap-4 pt-5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span
            className="flex-shrink-0 text-[clamp(0.65rem,0.75vw,0.75rem)] tracking-[0.1em]"
            style={{ color: "var(--fg-muted)" }}
          >
            {String(active + 1).padStart(2, "0")} / 06
          </span>

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

          <div className="flex flex-shrink-0 gap-2">
            <button
              onClick={prev}
              aria-label="Previous program"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-sm transition-all duration-200 bg-[var(--bg-card)] border-[var(--border)] text-[var(--fg-muted)] hover:bg-[var(--brand-green-glow)] hover:border-[var(--brand-green)] hover:text-[var(--brand-green-dark)]"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Next program"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-sm transition-all duration-200 bg-[var(--bg-card)] border-[var(--border)] text-[var(--fg-muted)] hover:bg-[var(--brand-green-glow)] hover:border-[var(--brand-green)] hover:text-[var(--brand-green-dark)]"
            >
              →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
