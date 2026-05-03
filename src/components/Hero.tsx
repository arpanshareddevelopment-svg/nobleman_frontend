"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";

type OrbKey = "careers" | "support" | "partners";

type Slide = {
  id: string;
  tag: string;
  titleTop: string;
  titleBottom: string;
  summary: string;
  cta: string;
  gradient: [string, string];
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

function useThemeMode() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      setIsDark(root.classList.contains("dark"));
    };

    update();
    setMounted(true);

    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return mounted ? isDark : false;
}

const SLIDES: Slide[] = [
  {
    id: "blue-green",
    tag: "Blue × Green",
    titleTop: "Build AI-first skills",
    titleBottom: "that actually convert.",
    summary:
      "Live cohorts, real projects, and focused placement support for outcome-driven learners.",
    cta: "Explore programs",
    gradient: ["#62d9ff", "#57f0a2"],
    highlight: "careers",
  },
  {
    id: "green-yellow",
    tag: "Green × Yellow",
    titleTop: "Mentorship that moves",
    titleBottom: "at the pace of momentum.",
    summary:
      "Structured practice, direct feedback, and interview prep that keep progress visible.",
    cta: "Meet mentors",
    gradient: ["#7bf56f", "#ffd84d"],
    highlight: "support",
  },
  {
    id: "yellow-blue",
    tag: "Yellow × Blue",
    titleTop: "Hiring outcomes",
    titleBottom: "with staying power.",
    summary:
      "Referrals, mock interviews, and partner access designed to keep the offer pipeline moving.",
    cta: "See outcomes",
    gradient: ["#ffd95c", "#55c9ff"],
    highlight: "partners",
  },
];

const ORBS: Orb[] = [
  {
    key: "careers",
    value: "12,000+",
    label: "Careers transformed",
    tone: "#57f0a2",
    size: "clamp(7.8rem, 18vw, 11rem)",
    position: {
      top: "10%",
      left: "8%",
    },
  },
  {
    key: "support",
    value: "100%",
    label: "Placement support",
    tone: "#55c9ff",
    size: "clamp(8rem, 18vw, 11.2rem)",
    position: {
      top: "6%",
      right: "8%",
    },
  },
  {
    key: "partners",
    value: "400+",
    label: "Hiring partners",
    tone: "#ffd84d",
    size: "clamp(8.2rem, 19vw, 11.4rem)",
    position: {
      left: "50%",
      bottom: "8%",
      transform: "translateX(-50%)",
    },
  },
];

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
  const activeColor = gradient[0];
  return (
    <div
      ref={(node) => registerRef(node, orb.key)}
      className="absolute"
      style={{
        width: orb.size,
        height: orb.size,
        ...orb.position,
      }}
    >
      <motion.div
        animate={{
          scale: active ? [1, 1.06, 1] : [1, 1.02, 1],
          opacity: active ? [0.96, 1, 0.96] : [0.9, 0.95, 0.9],
        }}
        transition={{
          duration: active ? 2.8 : 5.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.15,
        }}
        className="relative flex h-full w-full items-center justify-center rounded-full border text-center backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
        style={{
          background: active
            ? `linear-gradient(
      135deg,
      ${gradient[0]}55 0%,
      ${gradient[1]}55 100%
    )`
            : isDark
              ? "rgba(255,255,255,0.12)"
              : "rgba(255,255,255,0.72)",
          color: active
            ? activeColor
            : isDark
              ? "rgb(255, 255, 255)"
              : "var(--fg-primary)",
          borderColor: active ? `${gradient[0]}88` : "rgba(255,255,255,0.56)",

          boxShadow: active
            ? `0 28px 80px ${gradient[0]}26, 0 0 0 1px ${gradient[0]}35`
            : "0 18px 48px rgba(1, 7, 18, 0.16)",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.55),transparent_42%)] opacity-80" />
        <div className="relative z-10 flex flex-col items-center gap-1 px-4">
          <span className="text-[clamp(1.4rem,2vw,2rem)] font-black tracking-tight">
            {orb.value}
          </span>
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.34em] text-[color:var(--fg-secondary)]">
            {orb.label}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

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

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-[min(82vw,520px)]">
      <motion.div
        key={slide.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-[12%] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at center, ${slide.gradient[0]}33 0%, ${slide.gradient[1]}24 38%, transparent 72%)`,
        }}
      />

      {/* OUTER + INNER CIRCLES */}
      <div
        className="absolute inset-[18%] rounded-full backdrop-blur-2xl"
        style={{
          background: isDark
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.65)",

          border: isDark
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(0,0,0,0.08)",

          boxShadow: isDark
            ? "0 0 0 1px rgba(255,255,255,0.04) inset"
            : "0 0 0 1px rgba(0,0,0,0.03) inset",
        }}
      />

      <div
        className="absolute inset-[24%] rounded-full"
        style={{
          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : `1px solid ${slide.gradient[0]}33`, // subtle colored ring in light

          boxShadow: isDark
            ? "0 0 0 1px rgba(255,255,255,0.03) inset"
            : "0 0 20px rgba(0,0,0,0.04)",
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

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isDark = useThemeMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, 5600);

    return () => window.clearInterval(interval);
  }, []);
  if (!mounted) return null;

  const slide = SLIDES[activeIndex];

  function goTo(index: number) {
    setActiveIndex(index);
  }

  return (
    <section
      className="relative isolate overflow-hidden py-20 md:py-24 lg:py-28"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #06182b 0%, #02040a 52%, #000000 100%)"
          : "linear-gradient(135deg, #f7fbff 0%, #eef4ff 46%, #ffffff 100%)",
      }}
    >
      <div className="absolute inset-0 -z-20 dark:hidden bg-[radial-gradient(circle_at_top_left,rgba(85,201,255,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(87,240,162,0.14),transparent_24%)]" />
      <div className="absolute inset-0 -z-20 hidden dark:block bg-[radial-gradient(circle_at_top_left,rgba(85,201,255,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(123,245,111,0.1),transparent_24%)]" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.12] dark:opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--fg-muted) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-white/70 to-transparent dark:from-transparent" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-8 xl:px-14">
        <div className="relative w-full min-w-0">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-white/60 blur-2xl dark:bg-white/5" />

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_24px_90px_rgba(7,18,37,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 md:p-8 lg:p-9"
            >
              <div className="flex flex-wrap items-center gap-2 ">
                <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-semibold tracking-[0.28em] text-[var(--fg-secondary)] uppercase">
                  Live cohorts
                </span>
              </div>

              <motion.h1
                key={`${slide.id}-title`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: 0.04 }}
                className="mt-6 font-black leading-[1.05] tracking-tight text-[color:var(--fg-primary)] text-[clamp(2rem,3.2vw,4.5rem)]"
              >
                <span className="">{slide.titleTop}</span>
                &nbsp;
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(120deg, ${slide.gradient[0]} 0%, ${slide.gradient[1]} 42%, var(--fg-primary) 120%)`,
                  }}
                >
                  {slide.titleBottom}
                </span>
              </motion.h1>
              <p
                className="mt-5 text-sm font-semibold md:text-lg"
                style={{ color: "var(--fg-secondary)" }}
              >
                <span
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${slide.gradient[0]} 0%, ${slide.gradient[1]} 48%, var(--fg-primary) 112%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  * Ongoing mentor support for 6 months, even after placement.
                </span>
              </p>
              <motion.p
                key={`${slide.id}-summary`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.08 }}
                className="mt-5 max-w-[34rem] text-base leading-8 text-[color:var(--fg-secondary)] md:text-[1.05rem]"
              >
                {slide.summary}
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#programs"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${slide.gradient[0]}, ${slide.gradient[1]})`,
                    boxShadow: `0 18px 38px ${slide.gradient[0]}33`,
                  }}
                >
                  {slide.cta}
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#programs"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--fg-primary)] transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                  onClick={(event) => {
                    event.preventDefault();
                    setActiveIndex((index) => (index + 1) % SLIDES.length);
                  }}
                >
                  View all slides
                </a>
              </div>

              <div className="mt-8 flex items-center gap-2">
                {SLIDES.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => goTo(index)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: index === activeIndex ? 24 : 8,
                      height: 8,
                      background:
                        index === activeIndex
                          ? `linear-gradient(135deg, ${slide.gradient[0]}, ${slide.gradient[1]})`
                          : "var(--border)",
                      opacity: index === activeIndex ? 1 : 0.55,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-8 -z-10 rounded-[2.5rem] blur-3xl"
            style={{
              background: isDark
                ? "radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 68%)"
                : `radial-gradient(
          circle at center,
          ${slide.gradient[0]}22 0%,
          ${slide.gradient[1]}18 35%,
          rgba(0,0,0,0.03) 70%,
          transparent 100%
        )`,
            }}
          />

          <motion.div
            key={`${slide.id}-halo`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-[2.5rem]"
            style={{
              background: isDark
                ? `radial-gradient(circle at center, ${slide.gradient[0]}18 0%, ${slide.gradient[1]}10 42%, transparent 72%)`
                : `radial-gradient(circle at center, ${slide.gradient[0]}30 0%, ${slide.gradient[1]}20 45%, transparent 75%)`,
            }}
          />

          <div className="relative w-full max-w-[540px] aspect-square rounded-[2.5rem] border border-white/40 bg-white/40 p-4 shadow-[0_26px_90px_rgba(7,18,37,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 sm:p-6">
            <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.25),transparent_60%)]" />
            <OrbCluster slide={slide} isDark={isDark} />
          </div>
        </div>
      </div>
    </section>
  );
}
