"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";

// ─── Brand tokens (replaces missing CSS vars) ───────────────────────────────
const BRAND = {
  yellow: "#ffcf33",
  yellowLight: "#ffe98a",
  yellowGlow: "rgba(255,207,51,0.18)",
  yellowDark: "#e6a800",

  blue: "#2ea8ff",
  blueLight: "#7ed8ff",
  blueGlow: "rgba(46,168,255,0.18)",
  blueDark: "#0080e6",

  green: "#84ff3d",
  greenLight: "#c8ff74",
  greenGlow: "rgba(132,255,61,0.18)",
  greenDark: "#50cc00",
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────
type OrbKey = "careers" | "support" | "partners";

type Slide = {
  id: "blue" | "green" | "yellow";
  tag: string;
  titleTop: string;
  titleBottom: string;
  summary: string;
  cta: string;
  gradient: [string, string];
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

  return mounted ? isDark : false;
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
    gradient: ["#2ea8ff", "#7ed8ff"],
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
    gradient: ["#84ff3d", "#c8ff74"],
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
    gradient: ["#ffcf33", "#ffe98a"],
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
const MENTOR_ACCENT: Record<
  "blue" | "green" | "yellow",
  { text: string; border: string; gradient: string }
> = {
  blue: {
    text: BRAND.yellow,
    border: `${BRAND.yellow}99`,
    gradient: `linear-gradient(135deg, ${BRAND.yellow}, ${BRAND.yellowLight})`,
  },
  green: {
    text: BRAND.blue,
    border: `${BRAND.blue}99`,
    gradient: `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.blueLight})`,
  },
  yellow: {
    text: BRAND.green,
    border: `${BRAND.green}99`,
    gradient: `linear-gradient(135deg, ${BRAND.green}, ${BRAND.greenLight})`,
  },
};

// ─── FloatingOrb ─────────────────────────────────────────────────────────────
function FloatingOrb({
  orb,
  active,
  gradient,
  index,
  registerRef,
  isDark,
}: {
  orb: Orb;
  active: boolean;
  gradient: [string, string];
  index: number;
  registerRef: (node: HTMLDivElement | null, key: OrbKey) => void;
  isDark: boolean;
}) {
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
    : `radial-gradient(circle at 35% 32%,
        rgba(255,255,255,0.95) 0%,
        rgba(255,255,255,0.80) 35%,
        rgba(220,230,245,0.70) 65%,
        rgba(200,215,235,0.55) 100%)`;

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
    : `0 4px 24px rgba(0,0,0,0.10),
       0 0 0 1.5px rgba(180,200,230,0.55),
       inset 0 2px 8px rgba(255,255,255,0.7)`;

  // ── Text colours depend on theme + active state
  // Dark + active  → white text with neon glow
  // Light + active → near-black text (sphere is bright colored)
  // Dark + inactive → muted white
  // Light + inactive → medium dark
  const valueColor = active
    ? "#0d1117"
    : isDark
      ? "rgba(255,255,255,0.52)"
      : "rgba(40,55,80,0.65)";

  const valueShadow = active
    ? isDark
      ? `0 0 14px ${g0}, 0 0 28px ${g0}99`
      : "none"
    : "none";

  const labelColor = active
    ? "#0d1117bb"
    : isDark
      ? "rgba(255,255,255,0.32)"
      : "rgba(40,55,80,0.42)";

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
            {orb.value}
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
function OrbCluster({ slide, isDark }: { slide: Slide; isDark: boolean }) {
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

      {/* Dashed orbit ring */}
      <div
        className="absolute inset-[18%] rounded-full backdrop-blur-2xl"
        style={{
          border: isDark
            ? "1px dashed rgba(255,255,255,0.22)"
            : "1px dashed rgba(0,0,0,0.12)",
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
        />
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isDark = useThemeMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const id = window.setInterval(
      () => setActiveIndex((c) => (c + 1) % SLIDES.length),
      5600,
    );
    return () => window.clearInterval(id);
  }, []);

  if (!mounted) return null;

  const slide = SLIDES[activeIndex];
  const accent = MENTOR_ACCENT[slide.id];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden py-10 md:py-12 lg:py-0 min-h-screen flex flex-col justify-center"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #06182b 0%, #02040a 52%, #000000 100%)"
          : "linear-gradient(135deg, #f7fbff 0%, #eef4ff 46%, #ffffff 100%)",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: isDark
            ? "radial-gradient(circle at top left, rgba(85,201,255,0.16), transparent 26%), radial-gradient(circle at bottom right, rgba(123,245,111,0.10), transparent 24%)"
            : "radial-gradient(circle at top left, rgba(85,201,255,0.16), transparent 26%), radial-gradient(circle at bottom right, rgba(87,240,162,0.14), transparent 24%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? "rgba(255,255,255,0.35)" : "rgba(80,100,140,0.25)"} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, black 30%, transparent 80%)",
        }}
      />

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-white/70 to-transparent dark:from-transparent" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-6 md:px-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-6 xl:px-14">
        {/* ── Left column ── */}
        <div className="relative w-full min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[2rem] p-6 md:p-8 lg:p-9 xl:py-10"
            >
              {/* Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full border px-3 py-1 mt-16 text-[11px] font-semibold tracking-[0.28em] uppercase"
                  style={{
                    borderColor: isDark
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(0,0,0,0.12)",
                    color: isDark
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(30,40,60,0.65)",
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
                className="mt-6 font-black leading-[1.05] tracking-tight text-[clamp(2rem,3.2vw,4.5rem)]"
                style={{ color: isDark ? "#ffffff" : "#0d1117" }}
              >
                <span>{slide.titleTop}</span>
                &nbsp;
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${slide.gradient[0]} 0%, ${slide.gradient[1]} 100%)`,
                  }}
                >
                  {slide.titleBottom}
                </span>
              </motion.h1>

              {/* Mentor badge */}
              <div
                className="relative mt-6 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 transition-all duration-500 overflow-hidden"
                style={{
                  border: `1px solid ${accent.border}`,
                  background: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(16px)",
                  boxShadow: `0 0 0 1px ${accent.text}18, 0 4px 28px ${accent.text}40, inset 0 1px 0 rgba(255,255,255,0.12)`,
                }}
              >
                {/* Top shimmer */}
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
              <motion.p
                key={`${slide.id}-summary`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.08 }}
                className="mt-5 max-w-[34rem] text-base leading-8 md:text-[1.05rem]"
                style={{
                  color: isDark
                    ? "rgba(255,255,255,0.62)"
                    : "rgba(30,40,60,0.70)",
                }}
              >
                {slide.summary}
              </motion.p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#programs"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${slide.gradient[0]} 0%, ${slide.gradient[1]} 100%)`,
                    color: "#0d1117",
                    boxShadow: `0 18px 38px ${slide.gradient[0]}44`,
                  }}
                >
                  {slide.cta}
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Slide dots */}
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
                          ? `linear-gradient(135deg, ${slide.gradient[0]} 0%, ${slide.gradient[1]} 100%)`
                          : isDark
                            ? "rgba(255,255,255,0.18)"
                            : "rgba(0,0,0,0.18)",
                      boxShadow:
                        index === activeIndex
                          ? `0 0 18px ${slide.gradient[0]}66`
                          : "none",
                      opacity: index === activeIndex ? 1 : 0.4,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right column ── */}
        <div className="relative flex items-center justify-center">
          {/* Background halo behind cluster */}
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
                  ? `radial-gradient(circle at center, ${slide.gradient[0]}18 0%, ${slide.gradient[1]}10 42%, transparent 72%)`
                  : `radial-gradient(circle at center, ${slide.gradient[0]}30 0%, ${slide.gradient[1]}18 45%, transparent 75%)`,
              }}
            />
          </AnimatePresence>

          <div className="relative w-full max-w-[540px] aspect-square rounded-[2.5rem] p-4 sm:p-6">
            <OrbCluster slide={slide} isDark={isDark} />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 -z-10 bg-gradient-to-t to-transparent"
        style={{ from: isDark ? "#000000" : "#ffffff" } as CSSProperties}
      />
    </section>
  );
}
