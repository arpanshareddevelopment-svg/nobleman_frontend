"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Radio, Sparkles } from "lucide-react";

type Slide = {
  id: "blue" | "green" | "yellow";
  tag: string;
  titleTop: string;
  titleBottom: string;
  cta: string;
  solid: string;
  highlight: "careers" | "support" | "partners";
};

type Certificate = {
  src: string;
  alt: string;
  orientation: "portrait" | "landscape";
};

const SLIDES: Slide[] = [
  {
    id: "blue",
    tag: "Blue",
    titleTop: "Build AI skills",
    titleBottom: "that Actually matters.",
    cta: "Explore Courses",
    solid: "#2ea8ff",
    highlight: "careers",
  },
  {
    id: "green",
    tag: "Green",
    titleTop: "Mentorship that moves",
    titleBottom: "at the pace of momentum.",
    cta: "Explore Courses",
    solid: "#84ff3d",
    highlight: "support",
  },
  {
    id: "yellow",
    tag: "Yellow",
    titleTop: "Hiring outcomes",
    titleBottom: "with staying power.",
    cta: "Explore Courses",
    solid: "#ffcf33",
    highlight: "partners",
  },
];

const CERTIFICATES: Certificate[] = [
  {
    src: "/certificates/course.jpeg",
    alt: "Course completion certificate",
    orientation: "landscape",
  },
  {
    src: "/certificates/internship.jpeg",
    alt: "Internship certificate",
    orientation: "portrait",
  },
  {
    src: "/certificates/project_report.jpeg",
    alt: "Project report certificate",
    orientation: "portrait",
  },
];

const HERO_STATS = [
  { value: "15000+", label: "Careers Transformed" },
  { value: "100%", label: "Placement Support" },
  { value: "400+", label: "Hiring Partners" },
  { value: "97%", label: "Reported Salary Hike" },
];

function parseStat(value: string) {
  const target = Number(value.replace(/[^\d]/g, "")) || 0;
  const suffix = value.includes("%") ? "%" : value.includes("+") ? "+" : "";
  return { target, suffix };
}



// ─── Mentor accent map ────────────────────────────────────────────────────────
const MENTOR_ACCENT = {
  blue: {
    text: "#ffcf33",
    border: "#ffcf3399",
    gradient: "linear-gradient(135deg, #ffcf33, #ffe98a)",
  },
  green: {
    text: "#2ea8ff",
    border: "#2ea8ff99",
    gradient: "linear-gradient(135deg, #2ea8ff, #7ed8ff)",
  },
  yellow: {
    text: "#84ff3d",
    border: "#84ff3d99",
    gradient: "linear-gradient(135deg, #84ff3d, #c8ff74)",
  },
} as const;

// ─── LiveCohortChip ───────────────────────────────────────────────────────────
function LiveCohortChip() {
  const [ping, setPing] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPing(true);
      setTimeout(() => setPing(false), 900);
    }, 2500);

    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 inline-flex items-center gap-2 rounded-full px-4 py-2 select-none cursor-default"
      style={{
        background:
          "linear-gradient(135deg, #ff2d55 0%, #ff3b30 50%, #ff6b6b 100%)",
        border: "1.5px solid rgba(255,255,255,0.45)",
        boxShadow:
          "0 0 20px rgba(255,59,48,0.45), 0 0 40px rgba(255,45,85,0.25), inset 0 1px 0 rgba(255,255,255,0.35)",
      }}
    >
      {/* Live dot */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {ping && (
          <span
            className="absolute inline-flex h-full w-full rounded-full animate-ping"
            style={{ background: "#ffffff", opacity: 0.8 }}
          />
        )}
        <span
          className="relative inline-flex h-2.5 w-2.5 rounded-full"
          style={{
            background: "#ffffff",
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.8)",
          }}
        />
      </span>

      {/* Label */}
      <span
        className="text-[11px] font-bold tracking-[0.24em] uppercase"
        style={{ color: "#ffffff", textShadow: "0 1px 4px rgba(0,0,0,0.18)" }}
      >
        Live Cohorts
      </span>

      <Radio
        size={13}
        style={{ color: "#ffffff", opacity: 0.9, flexShrink: 0 }}
      />
    </motion.div>
  );
}


function useTypewriter(text: string, speed = 45) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let index = 0;
    const clearFrame = requestAnimationFrame(() => setDisplay(""));
    const interval = setInterval(() => {
      setDisplay(text.slice(0, index + 1));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => {
      cancelAnimationFrame(clearFrame);
      clearInterval(interval);
    };
  }, [text, speed]);

  return display;
}

function CertificateCarousel({
  currentGradient,
  certIndex,
}: {
  currentGradient: [string, string];
  certIndex: number;
}) {
  const total = CERTIFICATES.length;

  return (
    <div className="relative h-[24rem] w-full max-w-[46rem] md:h-[28rem]">
      {CERTIFICATES.map((cert, index) => {
        const relative = (index - certIndex + total) % total;
        const slot = relative === 0 ? 0 : relative === 1 ? 1 : -1;
        const isActive = slot === 0;
        const isLandscape = cert.orientation === "landscape";

        const width = isLandscape
          ? isActive
            ? 360
            : 292
          : isActive
            ? 230
            : 190;

        const height = isLandscape
          ? isActive
            ? 232
            : 188
          : isActive
            ? 328
            : 272;

        return (
          <motion.div
            key={cert.src}
            initial={false}
            animate={{
              x: slot * 134,
              y: 0,
              rotateY: slot * -18,
              width,
              height,
              scale: isActive ? 1.04 : 0.86,
              opacity: isActive ? 1 : 0.6,
              zIndex: isActive ? 30 : 10,
            }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.15rem]"
            style={{
              boxShadow: isActive
                ? `0 22px 45px rgba(0,0,0,0.45), 0 0 30px ${currentGradient[0]}55`
                : "0 14px 30px rgba(0,0,0,0.34)",
              transformStyle: "preserve-3d",
              background: "transparent",
            }}
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              fill
              sizes="(max-width: 768px) 300px, 360px"
              className="object-contain object-center"
              priority={index === 0}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.26) 0%, rgba(0,0,0,0.04) 52%, rgba(0,0,0,0) 80%)",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function CountUpStat({
  value,
  label,
  shouldStart,
  compact = false,
}: {
  value: string;
  label: string;
  shouldStart: boolean;
  compact?: boolean;
}) {
  const parsed = useMemo(() => parseStat(value), [value]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let frame = 0;
    const duration = 1450;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(parsed.target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldStart, parsed.target]);

  return (
    <div
      className={compact ? "flex w-full flex-col items-center text-center" : "flex min-w-[9rem] flex-1 flex-col px-2 py-1 md:min-w-0 md:px-5"}
    >
      <span className={compact ? "text-[1.4rem] font-semibold leading-none tracking-tight text-white" : "text-[1.15rem] font-semibold leading-none tracking-tight text-white md:text-[2rem]"}>
        {current}
        {parsed.suffix}
      </span>
      <span className={compact ? "mt-2 w-full whitespace-nowrap text-[0.7rem] leading-tight text-white/85" : "mt-2 text-lg leading-tight text-white/90 md:text-[1rem]"}>{label}</span>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [certIndex, setCertIndex] = useState(0);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const id = window.setInterval(
      () => setActiveIndex((c) => (c + 1) % SLIDES.length),
      5600,
    );
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(
      () => setCertIndex((current) => (current + 1) % CERTIFICATES.length),
      2400,
    );
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const node = statsRef.current;
    if (!node || statsStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [statsStarted]);

  const slide = SLIDES[activeIndex];

  const gradientMap = {
    blue: ["#2ea8ff", "#7ed8ff"],
    green: ["#84ff3d", "#c8ff74"],
    yellow: ["#ffcf33", "#ffe98a"],
  } as const;

  const currentGradient = gradientMap[slide.id] as [string, string];
  const typedBottom = useTypewriter(slide.titleBottom, 55);
  const accent = MENTOR_ACCENT[slide.id];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden py-0 md:py-12 lg:py-0 min-h-screen flex flex-col justify-center"
      style={{ background: "var(--hero-bg)" }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(circle at 12% 18%, var(--hero-ambient-1), transparent 30%),
            radial-gradient(circle at 88% 82%, var(--hero-ambient-2), transparent 32%),
            
          `,
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--grid-dot) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, rgba(0,0,0,0.92) 58%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, rgba(0,0,0,0.92) 58%, transparent 100%)",
        }}
      />

      <div className="mx-auto grid w-full  grid-cols-1 items-center gap-6 px-3 md:px-6  lg:grid-cols-[1.05fr_0.95fr] lg:gap-2 ">
        {/* LEFT */}
        <div className="relative w-full min-w-0 max-w-[960px] ">
          <AnimatePresence mode="wait">
            <div className="rounded-[2rem] p-2 md:p-3 lg:p-4 xl:py-10">
              {/* ── Live Cohort Chip ── */}
              <LiveCohortChip />

              {/* Headline */}
              <motion.h1
                key={`${slide.id}-title`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: 0.04 }}
                className="mt-6 min-h-[8rem] md:min-h-[2.5em] font-black leading-[1.05] tracking-tight text-[clamp(2rem,3.2vw,5rem)]"
                style={{
                  color: "var(--hero-title)",
                  textShadow: "var(--hero-title-shadow)",
                }}
              >
                <span>{slide.titleTop} </span>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${currentGradient[0]} 0%, ${currentGradient[1]} 100%)`,
                  }}
                >
                  {typedBottom}
                  <span className="animate-pulse">|</span>
                </span>
              </motion.h1>

              {/* Mentor badge */}
              <div
                className="relative mt-6 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 transition-all duration-500 overflow-hidden"
                style={{
                  background: "var(--mentor-bg)",
                  border: `1px solid ${accent.border}`,
                  boxShadow: `0 0 0 1px ${accent.text}18, 0 4px 28px ${accent.text}40, inset 0 1px 0 rgba(255,255,255,0.12)`,
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent 10%, ${accent.text}99 50%, transparent 90%)`,
                  }}
                />
                <Sparkles
                  size={18}
                  style={{
                    color: accent.text,
                    filter: `drop-shadow(0 0 6px ${accent.text})`,
                    flexShrink: 0,
                  }}
                />
                <span
                  className="text-sm font-semibold md:text-[1.02rem] bg-clip-text text-transparent"
                  style={{
                    backgroundImage: accent.gradient,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  Ongoing mentor support for 6 months, even after placement.
                </span>
              </div>

              {/* Summary */}
              <p
                className="mt-5 max-w-full text-base font-medium leading-8 md:text-md"
                style={{ color: "var(--hero-summary)" }}
              >
                Live, hands-on programs designed to help you build real-world
                projects. Learn from industry veterans at{" "}
                <strong className="text-white">Boston Consulting (BCG)</strong>,{" "}
                <strong className="text-white">Amazon</strong>,{" "}
                <strong className="text-white">Microsoft</strong>, and{" "}
                <strong className="text-white">Deloitte</strong> through
                interactive live classes, mentorship, and practical project
                experience.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#programs"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-[2px] hover:scale-[1.01] active:translate-y-[1px]"
                  style={{
                    background: `linear-gradient(135deg, ${currentGradient[0]} 0%, ${currentGradient[1]} 100%)`,
                    color: "#0d1117",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: `8px 8px 18px rgba(0,0,0,0.16), -4px -4px 12px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.18)`,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {slide.cta}
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#counselling"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-[2px] hover:scale-[1.01] active:translate-y-[1px] bg-clip-text"
                  style={{
                    background: "transparent",
                    backgroundImage: `linear-gradient(135deg, ${currentGradient[0]} 0%, ${currentGradient[1]} 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    border: `2px solid ${currentGradient[0]}`,
                  }}
                >
                  Book Free Counselling
                </a>
              </div>

              {/* Dots */}
              <div className="mt-8 flex items-center gap-2">
                {SLIDES.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: index === activeIndex ? 24 : 8,
                      height: 8,
                      background:
                        index === activeIndex
                          ? `linear-gradient(135deg, ${currentGradient[0]} 0%, ${currentGradient[1]} 100%)`
                          : "var(--hero-dot-inactive)",
                      boxShadow:
                        index === activeIndex
                          ? `0 0 18px ${currentGradient[0]}66`
                          : "none",
                      opacity: index === activeIndex ? 1 : 0.4,
                    }}
                  />
                ))}
              </div>
            </div>
          </AnimatePresence>
        </div>

        {/* RIGHT */}
        <div className="relative mt-8 flex items-center justify-center lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${slide.id}-halo`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 rounded-[2.5rem]"
              style={{
                background: `radial-gradient(circle at center, ${currentGradient[0]}18 0%, ${currentGradient[1]}10 42%, transparent 72%)`,
              }}
            />
          </AnimatePresence>

          <div className="relative z-10 flex w-full max-w-[48rem] flex-col items-center rounded-[1.8rem]">
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase text-white">
              Certificates & outcomes
            </p>

            <CertificateCarousel
              currentGradient={currentGradient}
              certIndex={certIndex}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 w-full max-w-[1800px] px-3 md:px-6 xl:px-[7.5rem]">
     
          <div ref={statsRef}>
            {/* MOBILE */}
            <div className="md:hidden">
              <div
                className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[rgba(7,10,17,0.94)] backdrop-blur-xl"
                style={{
                  boxShadow:
                    "0 18px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Vertical line */}
                <div
                  className="absolute left-1/2 top-[12%] h-[76%] w-px -translate-x-1/2"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.18) 80%, transparent)",
                  }}
                />

                {/* Horizontal line */}
                <div
                  className="absolute top-1/2 left-[12%] h-px w-[76%] -translate-y-1/2"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.18) 80%, transparent)",
                  }}
                />

                {/* Center glow */}
                <div
                  className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                  }}
                />

                {/* Grid */}
                <div className="relative grid grid-cols-2">
                  {HERO_STATS.map((item) => (
                    <div
                      key={item.label}
                      className="flex min-h-[7.5rem] items-center justify-center px-4 py-6"
                    >
                      <CountUpStat
                        value={item.value}
                        label={item.label}
                        shouldStart={statsStarted}
                        compact
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden w-full max-w-7xl mx-auto rounded-[1.2rem] px-2 py-4 md:block md:px-3 ">
              <div className="flex flex-wrap items-center justify-center gap-10 md:flex-nowrap md:gap-16 xl:gap-24">
                {HERO_STATS.map((item, index) => (
                  <div key={item.label} className="contents">
                    <CountUpStat
                      value={item.value}
                      label={item.label}
                      shouldStart={statsStarted}
                    />

                    {index !== HERO_STATS.length - 1 && (
                      <div
                        className="h-14 w-px -rotate-[13deg]"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.7), transparent)",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
      
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 -z-10"
        style={{
          background: "linear-gradient(to top, var(--bg-page), transparent)",
        }}
      />
    </section>
  );
}
