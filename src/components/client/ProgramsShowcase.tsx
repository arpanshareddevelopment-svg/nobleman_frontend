"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MoveRight, MoveLeft } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: "01",
    name: "Data Analyst Masterclass",
    duration: "3",
    students: "1,200+",
    hike: "86%",
    cover: "/course/data_analyst.png",
    desc: "Become an advanced Data Analyst in 3 months. Master Excel, SQL, Power BI, and Python through live classes with practitioner instructors.",
    stack: ["Python", "Excel", "SQL", "Power BI"],
  },
  {
    id: "02",
    name: "Full-Stack Engineering",
    duration: "4",
    students: "980+",
    hike: "92%",
    cover: "/course/fullstack.png",
    desc: "Zero to deployed in 4 months. Build production-ready applications with React, Node.js, and modern DevOps practices.",
    stack: ["React", "Node.js", "MongoDB", "AWS"],
  },
  {
    id: "03",
    name: "Product Management",
    duration: "3.5",
    students: "740+",
    hike: "78%",
    cover: "/course/product_management.png",
    desc: "Think like a PM, ship like a pro. Learn strategy, execution, and analytics from industry experts at BCG and Amazon.",
    stack: ["Figma", "Analytics", "Strategy", "Metrics"],
  },
  {
    id: "04",
    name: "AI & Machine Learning",
    duration: "4",
    students: "620+",
    hike: "95%",
    cover: "/course/ai.png",
    desc: "Master cutting-edge AI/ML from Google researchers. Build real-world models and deploy them to production at scale.",
    stack: ["Python", "TensorFlow", "PyTorch", "LLMs"],
  },
  {
    id: "05",
    name: "UX/UI Design Masterclass",
    duration: "3",
    students: "530+",
    hike: "82%",
    cover: "/course/uxui.png",
    desc: "Design systems that 100M+ users love. Learn from Flipkart's design lead with hands-on projects and a real portfolio.",
    stack: ["Figma", "Design Systems", "Research", "Prototyping"],
  },
  {
    id: "06",
    name: "DevOps & Cloud Architecture",
    duration: "3.5",
    students: "480+",
    hike: "88%",
    cover: "/course/devops.png",
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
  const mobileNavRef = useRef<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-120px" });

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

  // Mobile: auto-scroll active tab into view
  useEffect(() => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    const container = mobileNavRef.current;
    const tab = tabRefs.current[active];
    if (!container || !tab) return;
    const left =
      tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;
    container.scrollTo({ left, behavior: "smooth" });
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
      className="relative overflow-x-hidden overflow-y-hidden py-12 lg:py-20 text-[var(--fg-primary)] [font-family:'Space_Grotesk',sans-serif]"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-24 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-page) 0%, transparent 100%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), " +
            "linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-9">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex items-center gap-3 text-[10px] sm:text-[clamp(0.7rem,0.9vw,1rem)] uppercase tracking-[0.2em]"
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
            className="text-[clamp(2.2rem,3.8vw,3.8rem)] font-bold leading-[1.05] tracking-tight"
            style={{ color: "var(--fg-primary)" }}
          >
            Programs built to&nbsp;
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #84ff3d 0%, #c8ff74 60%, #55c9ff 100%)",
              }}
            >
              set you apart
            </span>
          </h2>

          <p
            className="max-w-full text-left text-lg md:text-xl leading-[1.7] md:text-right font-medium"
            style={{ color: "var(--fg-muted)" }}
          >
            Learn from industry veterans. Earn credentials that open doors.
          </p>
        </motion.div>

        {/* ── MOBILE: horizontal scrollable tabs ── */}
        <nav
          ref={mobileNavRef}
          className="lg:hidden program-tabs mb-6 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="w-4 flex-shrink-0" />
          {SHORT_NAMES.map((name, i) => (
            <button
              key={i}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              onClick={() => goTo(i)}
              className="relative flex-shrink-0 snap-center border-none bg-transparent px-4 py-3 text-[clamp(0.75rem,2.5vw,0.9rem)] uppercase tracking-[0.12em] transition-colors duration-200"
              style={{
                borderRight: "1px solid var(--border)",
                color:
                  i === active
                    ? "var(--brand-green-dark)"
                    : "var(--fg-primary)",
                fontFamily: "inherit",
                cursor: "pointer",
                fontWeight: i === active ? 700 : 400,
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
          <div className="w-4 flex-shrink-0" />
        </nav>

        {/* ── MAIN CONTENT AREA ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-0 overflow-hidden rounded-xl max-w-7xl"
          style={{
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* ── DESKTOP: vertical sidebar tabs ── */}
          <aside
            className="hidden lg:flex flex-col flex-shrink-0 w-[240px] xl:w-[260px]"
            style={{
              background: "var(--bg-card)",
              borderRight: "1px solid var(--border)",
            }}
          >
            {PROGRAMS.map((prog, i) => {
              const isActive = i === active;
              return (
                <button
                  key={prog.id}
                  onClick={() => goTo(i)}
                  className="relative flex items-center gap-3 px-5 py-[22px] text-left transition-all duration-200 group"
                  style={{
                    borderBottom: "1px solid var(--border)",
                    background: isActive
                      ? "var(--brand-green-glow, rgba(0,200,100,0.08))"
                      : "transparent",
                    cursor: "pointer",
                    border: "none",
                   
                    fontFamily: "inherit",
                  }}
                >
                  {/* Active indicator bar */}
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full transition-all duration-200"
                    style={{
                      background: isActive
                        ? "var(--brand-green)"
                        : "transparent",
                    }}
                  />

                  {/* Index */}
                  <span
                    className="flex-shrink-0 text-[10px] font-mono tracking-widest"
                    style={{
                      color: isActive
                        ? "var(--brand-green)"
                        : "var(--fg-muted)",
                    }}
                  >
                    {prog.id}
                  </span>

                  {/* Name */}
                  <span
                    className="text-[clamp(0.75rem,0.9vw,0.95rem)] uppercase tracking-[0.1em] leading-tight"
                    style={{
                      color: isActive
                        ? "var(--brand-green-dark)"
                        : "var(--fg-primary)",
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    {SHORT_NAMES[i]}
                  </span>

                  {/* Progress bar for active item */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 h-[2px] transition-[width] duration-[40ms] ease-linear"
                      style={{
                        width: `${progress}%`,
                        background: "var(--brand-green)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </aside>

          {/* ── CARD CONTENT ── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="flex flex-col lg:flex-row h-full"
              >
                {/* ── Image (narrower on desktop, full-width on mobile) ── */}
                <div
                  className="relative overflow-hidden flex-shrink-0 w-full  xl:w-[560px]"
                  style={{
                    background: "var(--bg-page)",
                    // aspectRatio: "16/9",
                  }}
                >
                  <img
                    src={p.cover}
                    alt={p.name}
                    className="w-full h-full object-cover bg-black"
                  />

              
                </div>

                {/* ── Description + CTA (fills remaining space on desktop) ── */}
                <div
                  className="flex flex-col flex-1 justify-between gap-5 p-5 sm:p-6 lg:p-7"
                  style={{
                    background: "var(--bg-card)",
                    borderLeft: "1px solid var(--border)",
                    borderTop: "none",
                  }}
                >
                  {/* Program name + description */}
                  <div>
                    <h3
                      className="mb-3 text-[clamp(1rem,1.4vw,1.3rem)] font-bold tracking-tight leading-snug"
                      style={{ color: "var(--fg-primary)" }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="text-[clamp(0.8rem,0.95vw,0.95rem)] leading-[1.75]"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {p.desc}
                    </p>
                  </div>

                  {/* Stack pills */}
                  <div>
                    <p
                      className="mb-2 text-[10px] uppercase tracking-[0.16em]"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      Curriculum stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-md px-3 py-[5px] text-[clamp(0.65rem,0.8vw,0.85rem)] tracking-[0.04em]"
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

                  {/* CTA */}
                  <button
                    className="flex items-center justify-center gap-3 w-full cursor-pointer rounded-full border-none px-5 py-[11px] text-[10px] sm:text-[clamp(0.7rem,0.8vw,1rem)] font-bold uppercase tracking-[0.16em] transition-colors duration-200 bg-[var(--brand-green)] text-[#0d1117] hover:bg-[var(--brand-green-dark)] hover:text-white"
                    style={{ fontFamily: "inherit" }}
                  >
                    Explore Program
                    <MoveRight size={14} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      
      </div>
    </section>
  );
}
