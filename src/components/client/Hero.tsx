"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type OrbKey = "careers" | "support" | "partners";

type Slide = {
  id: "blue" | "green" | "yellow";
  tag: string;
  titleTop: string;
  titleBottom: string;
  summary: string;
  cta: string;
  solid: string;
  highlight: OrbKey;
};

type Orb = {
  key: OrbKey;
  value: string;
  label: string;
  tone: string;
  size: string;
  position: CSSProperties;
};

type ParsedCounter = {
  target: number;
  suffix: string;
  useCommas: boolean;
};

function parseCounter(value: string): ParsedCounter {
  const digits = value.replace(/[^\d]/g, "");
  const target = Number(digits) || 0;
  const suffix = value.includes("%")
    ? "%"
    : value.trim().endsWith("+")
      ? "+"
      : "";
  return {
    target,
    suffix,
    useCommas: value.includes(",") || target >= 1000,
  };
}

function formatCounterValue(value: number, parsed: ParsedCounter): string {
  const base = parsed.useCommas ? value.toLocaleString() : String(value);
  return `${base}${parsed.suffix}`;
}

// ─── Dark-mode detector ───────────────────────────────────────────────────────
function useThemeMode() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();
    setMounted(true);
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return { isDark, mounted };
}

// ─── Data ────────────────────────────────────────────────────────────────────
const SLIDES: Slide[] = [
  {
    id: "blue",
    tag: "Blue",
    titleTop: "Build AI-first skills",
    titleBottom: "that actually convert.",
    summary:
      "Live cohorts, real projects, and focused placement support for outcome-driven learners.",
    cta: "Explore programs",

    solid: "#2ea8ff",
    highlight: "careers",
  },

  {
    id: "green",
    tag: "Green",
    titleTop: "Mentorship that moves",
    titleBottom: "at the pace of momentum.",
    summary:
      "Structured practice, direct feedback, and interview prep that keep progress visible.",
    cta: "Meet mentors",

    solid: "#84ff3d",
    highlight: "support",
  },

  {
    id: "yellow",
    tag: "Yellow",
    titleTop: "Hiring outcomes",
    titleBottom: "with staying power.",
    summary:
      "Referrals, mock interviews, and partner access designed to keep the offer pipeline moving.",
    cta: "See outcomes",

    solid: "#ffcf33",
    highlight: "partners",
  },
];

const ORBS: Orb[] = [
  {
    key: "careers",
    value: "12,000+",
    label: "Careers transformed",
    tone: "#57f0a2",
    size: "clamp(7.5rem, 18vw, 11rem)",
    position: { top: "10%", left: "8%" },
  },
  {
    key: "support",
    value: "100%",
    label: "Placement support",
    tone: "#55c9ff",
    size: "clamp(7.5rem, 18vw, 11rem)",
    position: { top: "6%", right: "8%" },
  },
  {
    key: "partners",
    value: "400+",
    label: "Hiring partners",
    tone: "#ffd84d",
    size: "clamp(7.5rem, 18vw, 11rem)",
    position: { left: "50%", bottom: "8%", transform: "translateX(-50%)" },
  },
];

// ─── Mentor accent map ────────────────────────────────────────────────────────
const MENTOR_ACCENT = {
  blue: {
    dark: {
      text: "#ffcf33",
      border: "#ffcf3399",
      gradient: "linear-gradient(135deg, #ffcf33, #ffe98a)",
    },

    light: {
      text: "#ffb800",
      border: "#ffd54a88",
      gradient: "linear-gradient(135deg, #ffb800, #ffd84d)",
    },
  },

  green: {
    dark: {
      text: "#2ea8ff",
      border: "#2ea8ff99",
      gradient: "linear-gradient(135deg, #2ea8ff, #7ed8ff)",
    },

    light: {
      text: "#1b8fff",
      border: "#66b8ff88",
      gradient: "linear-gradient(135deg, #1b8fff, #64c7ff)",
    },
  },

  yellow: {
    dark: {
      text: "#84ff3d",
      border: "#84ff3d99",
      gradient: "linear-gradient(135deg, #84ff3d, #c8ff74)",
    },

    light: {
      text: "#4fd14f",
      border: "#8df58d88",
      gradient: "linear-gradient(135deg, #4fd14f, #8cff66)",
    },
  },
} as const;

// ─── FloatingOrb ─────────────────────────────────────────────────────────────
function FloatingOrb({
  orb,
  active,
  gradient,
  index,
  registerRef,
  isDark,
  mounted,
}: {
  orb: Orb;
  active: boolean;
  gradient: [string, string];
  index: number;
  registerRef: (node: HTMLDivElement | null, key: OrbKey) => void;
  isDark: boolean;
  mounted: boolean;
}) {
  const parsed = useMemo(() => parseCounter(orb.value), [orb.value]);
  const [displayValue, setDisplayValue] = useState(parsed.target);

  useEffect(() => {
    if (!active) {
      return;
    }

    const duration = 2200;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayValue(Math.round(parsed.target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame((now) => {
      setDisplayValue(0);
      tick(now);
    });

    return () => cancelAnimationFrame(frame);
  }, [active, parsed.target]);

  // Don't render until mounted
  if (!mounted) {
    return (
      <div
        className="absolute"
        style={{ width: orb.size, height: orb.size, ...orb.position }}
      />
    );
  }

  const [g0, g1] = gradient;

  // ── Active orb: colored 3-D sphere
  // Dark mode  → deep dark core + neon rim glow (glassy ball look)
  // Light mode → bright solid gradient sphere + colored shadow
  const activeBg = `radial-gradient(circle at 35% 32%,
        #ffffff 0%,
        ${g0}ee 22%,
        ${g0} 55%,
        ${g1}cc 80%,
        ${g1}99 100%)`;

  // ── Inactive orb: neutral frosted glass
  const inactiveBg = isDark
    ? `radial-gradient(circle at 35% 32%,
        rgba(255,255,255,0.07) 0%,
        rgba(255,255,255,0.02) 35%,
        #080c12 60%,
        #020406 100%)`
    : `radial-gradient(circle at 35% 28%,
    rgba(255,255,255,0.96) 0%,
    rgba(248,250,255,0.92) 22%,
    rgba(220,228,240,0.88) 52%,
    rgba(185,198,220,0.82) 78%,
    rgba(155,172,198,0.74) 100%)`;
  const activeBoxShadow = isDark
    ? `0 0 60px 18px ${g0}50,
       0 0 120px 40px ${g0}22,
       0 0 0 2px ${g0}70,
       inset 0 0 40px 10px #000000cc,
       inset 0 0 0 1.5px ${g0}40`
    : `0 8px 40px 4px ${g0}88,
       0 0 0 2.5px ${g0}cc,
       0 20px 60px ${g0}44,
       inset 0 2px 12px rgba(255,255,255,0.6)`;

  const inactiveBoxShadow = isDark
    ? `0 0 28px 4px rgba(255,255,255,0.05),
       0 0 0 1.5px rgba(255,255,255,0.10),
       inset 0 0 40px 10px #000000bb`
    : `0 18px 40px rgba(120,140,170,0.18),
   0 4px 18px rgba(80,100,130,0.10),
   0 0 0 1.5px rgba(170,190,220,0.72),
   inset 0 2px 10px rgba(255,255,255,0.92),
   inset 0 -10px 24px rgba(120,140,170,0.10)`;

  // ── Text colours depend on theme + active state

  const valueColor = active
    ? "#0d1117"
    : isDark
      ? "rgba(255,255,255,0.52)"
      : "var(--orb-inactive-value)";

  const valueShadow = active
    ? isDark
      ? `0 0 14px ${g0}, 0 0 28px ${g0}99`
      : "none"
    : "none";

  const labelColor = active
    ? "#0d1117bb"
    : isDark
      ? "rgba(255,255,255,0.32)"
      : "var(--orb-inactive-label)";

  const labelShadow = active && isDark ? `0 0 8px ${g0}88` : "none";

  return (
    <div
      ref={(node) => registerRef(node, orb.key)}
      className="absolute"
      style={{ width: orb.size, height: orb.size, ...orb.position }}
    >
      <motion.div
        animate={{
          scale: active ? [1, 1.06, 1] : [1, 1.02, 1],
          opacity: active ? [0.97, 1, 0.97] : [0.82, 0.9, 0.82],
        }}
        transition={{
          duration: active ? 2.8 : 5.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.15,
        }}
        className="relative flex h-full w-full items-center justify-center rounded-full"
        style={{
          background: active ? activeBg : inactiveBg,
          boxShadow: active ? activeBoxShadow : inactiveBoxShadow,
        }}
      >
        {/* Neon rim ring — dark + active only */}
        {active && isDark && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%,
                transparent 54%,
                ${g0}50 72%,
                ${g0}88 80%,
                ${g0}50 88%,
                transparent 100%)`,
              filter: "blur(2px)",
            }}
          />
        )}

        {/* Colored inner sheen — light + active only */}
        {active && !isDark && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%,
                transparent 50%,
                ${g0}30 72%,
                ${g1}50 84%,
                transparent 100%)`,
            }}
          />
        )}

        {/* Specular highlight (top-left glint) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "42%",
            height: "32%",
            top: "10%",
            left: "14%",
            background: active
              ? `radial-gradient(ellipse at 40% 40%,
                  rgba(255,255,255,${isDark ? "0.55" : "0.85"}) 0%,
                  rgba(255,255,255,${isDark ? "0.18" : "0.40"}) 45%,
                  transparent 75%)`
              : `radial-gradient(ellipse at 40% 40%,
                  rgba(255,255,255,${isDark ? "0.20" : "0.75"}) 0%,
                  transparent 70%)`,
            filter: "blur(1.5px)",
          }}
        />

        {/* Bottom bounce glow — active only */}
        {active && (
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "60%",
              height: "30%",
              bottom: "8%",
              left: "20%",
              background: `radial-gradient(ellipse, ${g0}${isDark ? "35" : "25"} 0%, transparent 70%)`,
              filter: "blur(4px)",
            }}
          />
        )}

        {/* Text content */}
        <div className="relative z-10 flex flex-col items-center gap-1 px-4">
          <span
            className="text-[clamp(1.4rem,2vw,2rem)] font-black tracking-tight leading-none"
            style={{ color: valueColor, textShadow: valueShadow }}
          >
            {formatCounterValue(displayValue, parsed)}
          </span>
          <span
            className="text-[0.6rem] font-bold uppercase tracking-[0.32em] text-center"
            style={{ color: labelColor, textShadow: labelShadow }}
          >
            {orb.label}
          </span>
        </div>
      </motion.div>

      {/* Floor reflection */}
      {active && (
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            bottom: "-12%",
            width: "70%",
            height: "14%",
            background: `radial-gradient(ellipse, ${g0}${isDark ? "60" : "44"} 0%, transparent 70%)`,
            filter: "blur(6px)",
            opacity: isDark ? 0.6 : 0.5,
          }}
        />
      )}
    </div>
  );
}

// ─── OrbCluster ───────────────────────────────────────────────────────────────
function OrbCluster({
  slide,
  isDark,
  mounted,
}: {
  slide: Slide;
  isDark: boolean;
  mounted: boolean;
}) {
  const orbRefs = useRef<Record<OrbKey, HTMLDivElement | null>>({
    careers: null,
    support: null,
    partners: null,
  });

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];
    ORBS.forEach((orb, index) => {
      const node = orbRefs.current[orb.key];
      if (!node) return;
      tweens.push(
        gsap.to(node, {
          y: index === 2 ? -12 : index === 1 ? 10 : -8,
          x: index === 1 ? 7 : -6,
          duration: 4.2 + index * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.18,
        }),
      );
    });
    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-[clamp(16rem,82vw,500px)] sm:w-[min(62vw,500px)]">
      {/* Ambient centre glow */}
      {mounted && (
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-[12%] rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle at center,
              ${slide.gradient[0]}${isDark ? "33" : "44"} 0%,
              ${slide.gradient[1]}${isDark ? "22" : "30"} 38%,
              transparent 72%)`,
            }}
          />
        </AnimatePresence>
      )}

      {/* Dashed orbit ring */}
      <div
        className="absolute inset-[18%] rounded-full backdrop-blur-2xl"
        style={{
          border: "1px dashed var(--hero-orbit-border)",
        }}
      />

      {ORBS.map((orb, index) => (
        <FloatingOrb
          key={orb.key}
          orb={orb}
          active={slide.highlight === orb.key}
          gradient={slide.gradient}
          index={index}
          registerRef={(node, key) => {
            orbRefs.current[key] = node;
          }}
          isDark={isDark}
          mounted={mounted}
        />
      ))}
    </div>
  );
}
function useScrambleText(text: string, speed = 40) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let frame = 0;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const interval = setInterval(() => {
      frame++;

      const progress = frame / (text.length + 8);

      const output = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";

          if (index < progress * text.length) {
            return text[index];
          }

          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplay(output);

      if (progress >= 1) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return display;
}
// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isDark, mounted } = useThemeMode();

  useEffect(() => {
    const id = window.setInterval(
      () => setActiveIndex((c) => (c + 1) % SLIDES.length),
      5600,
    );

    return () => window.clearInterval(id);
  }, []);

  const slide = SLIDES[activeIndex];

  const gradientMap = {
    blue: isDark ? ["#2ea8ff", "#7ed8ff"] : ["#1da1ff", "#5ecbff"],

    green: isDark ? ["#84ff3d", "#c8ff74"] : ["#32d74b", "#7dff5a"],

    yellow: isDark ? ["#ffcf33", "#ffe98a"] : ["#ffb000", "#ffe14d"],
  } as const;

  const currentGradient = gradientMap[slide.id];

  const scrambledBottom = useScrambleText(slide.titleBottom, 35);

  const accent = MENTOR_ACCENT[slide.id][isDark ? "dark" : "light"];

  if (!mounted) {
    return (
      <section
        id="home"
        className="relative isolate overflow-hidden py-10 md:py-12 lg:py-0 min-h-screen flex flex-col justify-center"
        style={{
          background: "var(--hero-bg)",
        }}
      />
    );
  }

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden py-0 md:py-12 lg:py-0 min-h-screen flex flex-col justify-center"
      style={{
        background: "var(--hero-bg)",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(circle at 12% 18%,
              var(--hero-ambient-1),
              transparent 30%),

            radial-gradient(circle at 88% 82%,
              var(--hero-ambient-2),
              transparent 32%),

            radial-gradient(circle at 70% 25%,
              var(--hero-ambient-3),
              transparent 24%)
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
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

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-white/70 to-transparent dark:from-transparent" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-6 md:px-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-6 xl:px-14">
        {/* LEFT */}
        <div className="relative w-full min-w-0">
          <AnimatePresence mode="wait">
            <div className="rounded-[2rem] p-6 md:p-8 lg:p-9 xl:py-10">
              {/* Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-4 py-1.5 mt-16 text-[11px] font-semibold tracking-[0.28em]  uppercase transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",

                    color: "var(--hero-tag-text)",

                    background: "var(--hero-tag-bg)",

                    boxShadow: `
    5px 5px 12px rgba(0,0,0,0.10),
    -3px -3px 8px rgba(255,255,255,0.10),
    inset 0 1px 0 rgba(255,255,255,0.16)
  `,

                    backdropFilter: "blur(12px)",
                  }}
                >
                  Live cohorts
                </span>
              </div>

              {/* Headline */}
              <motion.h1
                key={`${slide.id}-title`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: 0.04 }}
                className="mt-6 font-black leading-[1.05] tracking-tight text-[clamp(2rem,3.2vw,5rem)]"
                style={{
                  color: "var(--hero-title)",
                  textShadow: "var(--hero-title-shadow)",
                }}
              >
                <span>{slide.titleTop}</span>
                &nbsp;
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(
                      135deg,
                      ${currentGradient[0]} 0%,
                      ${currentGradient[1]} 100%
                    )`,
                  }}
                >
                  {scrambledBottom}
                </span>
              </motion.h1>

              {/* Mentor badge */}
              <div
                className="relative mt-6 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 transition-all duration-500 overflow-hidden"
                style={{
                  background: "var(--mentor-bg)",
                  border: `1px solid ${
                    isDark ? accent.border : "var(--mentor-border)"
                  }`,
                  boxShadow: isDark
                    ? `0 0 0 1px ${accent.text}18,
                       0 4px 28px ${accent.text}40,
                       inset 0 1px 0 rgba(255,255,255,0.12)`
                    : "var(--mentor-shadow)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px pointer-events-none"
                  style={{
                    background: `linear-gradient(
                      90deg,
                      transparent 10%,
                      ${accent.text}99 50%,
                      transparent 90%
                    )`,
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
              <motion.p
                key={`${slide.id}-summary`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.08 }}
                className="mt-5 max-w-full text-base font-medium leading-8 md:text-xl"
                style={{
                  color: "var(--hero-summary)",
                }}
              >
                {slide.summary}
              </motion.p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#programs"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-[2px] hover:scale-[1.01] active:translate-y-[1px]"
                  style={{
                    background: `linear-gradient(
    135deg,
    ${currentGradient[0]} 0%,
    ${currentGradient[1]} 100%
  )`,

                    color: "#0d1117",

                    border: "1px solid rgba(255,255,255,0.08)",

                    boxShadow: `
    8px 8px 18px rgba(0,0,0,0.16),
    -4px -4px 12px rgba(255,255,255,0.14),
    inset 0 1px 0 rgba(255,255,255,0.18)
  `,

                    backdropFilter: "blur(12px)",
                  }}
                >
                  {slide.cta}
                  <ArrowRight size={16} />
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
                          ? `linear-gradient(
                              135deg,
                              ${currentGradient[0]} 0%,
                              ${currentGradient[1]} 100%
                            )`
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
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${slide.id}-halo`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 rounded-[2.5rem]"
              style={{
                background: isDark
                  ? `radial-gradient(
                      circle at center,
                      ${currentGradient[0]}18 0%,
                      ${currentGradient[1]}10 42%,
                      transparent 72%
                    )`
                  : `radial-gradient(
                      circle at center,
                      ${currentGradient[0]}55 0%,
                      ${currentGradient[1]}18 45%,
                      transparent 75%
                    )`,
              }}
            />
          </AnimatePresence>

          <div className="relative w-full max-w-[540px] aspect-square rounded-[2.5rem] p-4 sm:p-6">
            <OrbCluster
              slide={{
                ...slide,
                gradient: currentGradient,
              }}
              isDark={isDark}
              mounted={mounted}
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 -z-10 bg-gradient-to-t to-transparent"
        style={{
          background: "linear-gradient(to top, var(--bg-page), transparent)",
        }}
      />
    </section>
  );
}
