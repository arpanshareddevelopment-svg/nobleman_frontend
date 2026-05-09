"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

/* ─── Instructor data ──────────────────────────────────────── */
const INSTRUCTORS = [
  {
    name: "Priya Sharma",
    role: "Senior Data Scientist",
    company: "Amazon",
    expertise: ["Python", "ML", "SQL"],

    /* Replace with real portrait URLs */
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    bio: "8 years building recommendation systems at Amazon. Helped 1,200+ students break into data science.",
    rating: 4.9,
    students: "1,200+",
    experience: "8 yrs",
    index: "01",
  },
  {
    name: "Arjun Mehta",
    role: "Principal Engineer",
    company: "Microsoft",
    expertise: ["React", "Node.js", "System Design"],

    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    bio: "Led full-stack teams at Microsoft for 10 years. Passionate about turning beginners into senior engineers.",
    rating: 4.8,
    students: "980+",
    experience: "10 yrs",
    index: "02",
  },
  {
    name: "Neha Kapoor",
    role: "Product Lead",
    company: "BCG Digital",
    expertise: ["Product Strategy", "Agile", "Analytics"],

    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
    bio: "Shipped 30+ products across fintech and healthtech. Mentors aspiring PMs on strategy and execution.",
    rating: 5.0,
    students: "740+",
    experience: "12 yrs",
    index: "03",
  },
  {
    name: "Rohan Verma",
    role: "ML Engineer",
    company: "Google DeepMind",
    expertise: ["Deep Learning", "NLP", "PyTorch"],

    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    bio: "Researcher turned engineer. Specialises in LLMs and making cutting-edge AI accessible to everyone.",
    rating: 4.9,
    students: "860+",
    experience: "6 yrs",
    index: "04",
  },
  {
    name: "Divya Nair",
    role: "UX Design Lead",
    company: "Flipkart",
    expertise: ["Figma", "Design Systems", "Research"],

    photo:
      "https://images.unsplash.com/photo-1614644147724-2d4785d69962?w=600&q=80",
    bio: "Designed experiences used by 300M+ users. Teaches design thinking with a product-first mindset.",
    rating: 4.8,
    students: "620+",
    experience: "9 yrs",
    index: "05",
  },
  {
    name: "Karan Singh",
    role: "DevOps Architect",
    company: "Infosys",
    expertise: ["Kubernetes", "AWS", "CI/CD"],

    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "Scaled infrastructure for Fortune 500 clients. Demystifies cloud and DevOps for working engineers.",
    rating: 4.7,
    students: "530+",
    experience: "11 yrs",
    index: "06",
  },
];

// Color rotation: blue → green → yellow
const COLOR_THEMES = [
  {
    light: {
      accent: "var(--brand-blue-dark)",
      accentDark: "var(--brand-blue-dark)",
    },
    dark: {
      accent: "var(--brand-blue-light)",
      accentDark: "var(--brand-blue-dark)",
    },
  },
  {
    light: {
      accent: "var(--brand-green-dark)",
      accentDark: "var(--brand-green-dark)",
    },
    dark: {
      accent: "var(--brand-green-light)",
      accentDark: "var(--brand-green-dark)",
    },
  },
  {
    light: {
      accent: "var(--brand-yellow-dark)",
      accentDark: "var(--brand-yellow-dark)",
    },
    dark: {
      accent: "var(--brand-yellow-light)",
      accentDark: "var(--brand-yellow-dark)",
    },
  },
];

/* ─── Star rating ──────────────────────────────────────────── */
function Stars({ rating, color }: { rating: number; color: string }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          fill={s <= Math.round(rating) ? color : "none"}
          stroke={color}
          strokeWidth="2.5"
        />
      ))}
    </span>
  );
}

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

/* ─── Vertical thumb strip ─────────────────────────────────── */
function ThumbStrip({
  active,
  onSelect,
  isDark,
  mounted,
}: {
  active: number;
  onSelect: (i: number) => void;
  isDark: boolean;
  mounted: boolean;
}) {
  // Don't render until mounted
  if (!mounted) {
    return (
      <div className="hidden lg:flex flex-col justify-between h-[380px] flex-shrink-0" />
    );
  }

  // Show a sliding window of up to 4 instructors that keeps the `active`
  // instructor visible. Center the active one when possible.
  const visibleCount = 4;
  const total = INSTRUCTORS.length;

  let start = 0;
  if (total <= visibleCount) start = 0;
  else if (active <= 1) start = 0;
  else if (active >= total - 2) start = total - visibleCount;
  else start = active - 1;

  const displayInstructors = INSTRUCTORS.slice(
    start,
    Math.min(start + visibleCount, total),
  );

  return (
    <div className="hidden lg:flex flex-col justify-between h-[380px] flex-shrink-0">
      {displayInstructors.map((inst, i) => {
        const globalIndex = start + i;
        const themeSet = COLOR_THEMES[globalIndex % COLOR_THEMES.length];
        const theme = isDark ? themeSet.dark : themeSet.light;

        return (
          <button
            key={globalIndex}
            onClick={() => onSelect(globalIndex)}
            className="relative w-[72px] h-[72px] rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 group"
            style={{
              outline:
                globalIndex === active
                  ? `2px solid ${theme.accent}`
                  : "2px solid transparent",
              outlineOffset: 2,
              opacity: globalIndex === active ? 1 : 0.38,
              transform: globalIndex === active ? "scale(1.06)" : "scale(1)",
            }}
            aria-label={inst.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={inst.photo}
              alt={inst.name}
              className="w-full h-full object-cover"
            />
            {/* active overlay */}
            {globalIndex === active && (
              <motion.div
                layoutId="thumb-glow"
                className="absolute inset-0 rounded-2xl"
                style={{ background: `${theme.accent}22` }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Main carousel ────────────────────────────────────────── */
export default function InstructorCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { isDark, mounted } = useThemeMode();
  const containerRef = useRef<HTMLElement | null>(null);
  const inView = useInView(containerRef, { once: false, margin: "-120px" });

  const total = INSTRUCTORS.length;

  const themeSet = COLOR_THEMES[active % COLOR_THEMES.length];
  const theme = isDark ? themeSet.dark : themeSet.light;

  const advance = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + total) % total),
    [total],
  );

  useEffect(() => {
    // Only start if mounted
    if (!mounted) return;

    const id = setInterval(() => {
      if (!paused) advance(1);
    }, 5000);

    return () => clearInterval(id);
  }, [paused, advance, mounted]);

  function select(i: number) {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 2500);
  }

  function handleArrow(dir: 1 | -1) {
    advance(dir);
    setPaused(true);
    setTimeout(() => setPaused(false), 2500);
  }

  const inst = INSTRUCTORS[active];

  // Overlay theme colors onto the instructor
  const displayInst = {
    ...inst,
    accent: theme.accent,
    accentDark: theme.accentDark,
  };

  // Don't render anything until client hydration is done
  if (!mounted) {
    return (
      <section
        id="instructors"
        className="relative w-full overflow-hidden py-12 md:py-24"
        style={{
          background:
            "linear-gradient(180deg, #eef4ff 0%, #f8fbff 20%, #eef4ff 80%, #ffffff 100%)",
        }}
      >
        {/* Empty placeholder - no theme-dependent content */}
      </section>
    );
  }

  return (
    <section
      id="instructors"
      className="relative w-full overflow-hidden py-12 md:py-24"
      ref={containerRef}
      style={{
        background: isDark
          ? "linear-gradient(180deg, #020617 0%, #030712 30%, #000000 70%, #020617 100%)"
          : "linear-gradient(180deg, #eef4ff 0%, #f8fbff 20%, #eef4ff 80%, #ffffff 100%)",
      }}
    >
      {/* ── Animated per-instructor accent glow ── */}
      <AnimatePresence>
        <motion.div
          key={`bg-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 30% 50%, ${displayInst.accent}0d 0%, transparent 65%),
              radial-gradient(ellipse 50% 40% at 75% 30%, ${displayInst.accentDark}12 0%, transparent 60%)
            `,
          }}
        />
      </AnimatePresence>

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--fg-muted) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: isDark ? 0.06 : 0.14,
        }}
      />

      {/* Ambient glow behind content */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none blur-3xl"
        style={{
          background: `radial-gradient(circle at center, ${displayInst.accent}22 0%, transparent 60%)`,
          opacity: isDark ? 1 : 0.92,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-14">
        {/* Glass wrapper matching other sections */}
        <div
          className="relative rounded-[2rem] border p-4 sm:p-6 md:p-8 overflow-hidden"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.04)"
              : "rgba(255,255,255,0.75)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderColor: "var(--border)",
            boxShadow: isDark
              ? "0 30px 100px rgba(0,0,0,0.6)"
              : "0 30px 100px rgba(7,18,37,0.08)",
          }}
        >
          {/* ── Section header ── */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border mb-4 transition-colors duration-500"
                style={{
                  background: `${displayInst.accent}14`,
                  borderColor: `${displayInst.accent}40`,
                  color: displayInst.accent,
                }}
              >
                Meet the Mentors
              </span>
              <h2
                className="text-[2rem] sm:text-[2.4rem] md:text-[42px] font-black leading-[1.05] tracking-tight "
                style={{ color: "var(--fg-primary)" }}
              >
                Learn from people who&apos;ve{" "}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`grad-${active}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      backgroundImage: isDark
                        ? `linear-gradient(
          125deg,
          ${displayInst.accent},
          ${displayInst.accentDark}
        )`
                        : `linear-gradient(
          125deg,
          ${themeSet.dark.accent},
          ${themeSet.dark.accentDark}
        )`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    been there.
                  </motion.span>
                </AnimatePresence>
              </h2>
            </div>

            {/* Arrow controls */}
            <div className="hidden sm:flex items-center gap-3">
              <span
                className="text-xs font-mono tracking-widest"
                style={{ color: "var(--fg-muted)" }}
              >
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
              {([-1, 1] as const).map((dir, di) => (
                <button
                  key={di}
                  onClick={() => handleArrow(dir)}
                  aria-label={dir === -1 ? "Previous" : "Next"}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    background: "var(--bg-card)",
                    border: `1px solid ${displayInst.accent}50`,
                    color: displayInst.accent,
                  }}
                >
                  {dir === -1 ? (
                    <ChevronLeft size={15} strokeWidth={2.5} />
                  ) : (
                    <ChevronRight size={15} strokeWidth={2.5} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Main content row ── */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Vertical thumb strip */}
            <ThumbStrip
              active={active}
              onSelect={select}
              isDark={isDark}
              mounted={mounted}
            />

            {/* Portrait — large, dominant */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`photo-${active}`}
                initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full lg:flex-shrink-0 rounded-3xl overflow-hidden self-stretch"
                style={{
                  width: "100%",
                  maxWidth: "360px",
                  height: "380px",
                  boxShadow: isDark
                    ? `0 32px 80px ${displayInst.accent}28, 0 0 0 1px ${displayInst.accent}20`
                    : `0 20px 60px rgba(7,18,37,0.06), 0 0 0 1px ${displayInst.accent}14`,
                }}
              >
                {/* Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={inst.photo}
                  alt={inst.name}
                  className="w-full h-full object-cover object-top"
                />

                {/* Gradient overlay — bottom fade */}
                {/* Cinematic readability overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
      linear-gradient(
        to top,
        rgba(0,0,0,0.92) 0%,
        rgba(0,0,0,0.72) 18%,
        rgba(0,0,0,0.38) 38%,
        rgba(0,0,0,0.10) 58%,
        transparent 78%
      )
    `,
                  }}
                />

                {/* subtle accent tint */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
      linear-gradient(
        to top,
        ${displayInst.accentDark}44 0%,
        transparent 45%
      )
    `,
                    mixBlendMode: "screen",
                  }}
                />

                {/* Name overlay on photo */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div
                    className="text-[10px] font-black tracking-[0.2em] uppercase mb-1"
                    style={{ color: displayInst.accent }}
                  >
                    {inst.company}
                  </div>
                  <div className="text-xl font-black text-white leading-tight">
                    {inst.name}
                  </div>
                  <div className="text-xs mt-0.5 text-white/60">
                    {inst.role}
                  </div>
                </div>

                {/* Index badge — top right */}
                <div
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black"
                  style={{
                    background: `${displayInst.accent}22`,
                    border: `1px solid ${displayInst.accent}55`,
                    color: displayInst.accent,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {inst.index}
                </div>

                {/* Accent corner glow */}
                <div
                  className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full pointer-events-none"
                  style={{
                    background: displayInst.accent,
                    filter: "blur(40px)",
                    opacity: 0.3,
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Info panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${active}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex flex-col gap-5 min-w-0 w-full"
              >
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Students", value: inst.students },
                    { label: "Experience", value: inst.experience },
                    { label: "Rating", value: inst.rating.toFixed(1) },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-2xl px-4 py-3 flex flex-col gap-1"
                      style={{
                        background: `${displayInst.accent}0e`,
                        border: `1px solid ${displayInst.accent}25`,
                      }}
                    >
                      <span
                        className="text-[22px] font-black leading-none"
                        style={{ color: displayInst.accent }}
                      >
                        {value}
                      </span>
                      <span
                        className="text-[10px] tracking-widest uppercase"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--fg-secondary)" }}
                  >
                    {inst.bio}
                  </p>
                </div>

                {/* Expertise */}
                <div>
                  <div
                    className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2.5"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    Expertise
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {inst.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{
                          background: `${displayInst.accent}14`,
                          color: displayInst.accent,
                          border: `1px solid ${displayInst.accent}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Star rating + CTA */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Stars rating={inst.rating} color={displayInst.accent} />
                    <span
                      className="text-sm font-bold"
                      style={{ color: displayInst.accent }}
                    >
                      {inst.rating.toFixed(1)}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      · {inst.students} students
                    </span>
                  </div>
                </div>

                {/* Progress bar — autoplay indicator */}
                <div
                  className="h-px w-full rounded-full overflow-hidden mt-auto"
                  style={{ background: "var(--border)" }}
                >
                  {!paused && (
                    <motion.div
                      key={`bar-${active}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${displayInst.accent}, ${displayInst.accentDark})`,
                      }}
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Mobile dot strip ── */}
          <div className="flex items-center justify-center gap-2 mt-10 lg:hidden">
            {INSTRUCTORS.map((inst, i) => {
              const themeSet = COLOR_THEMES[i % COLOR_THEMES.length];
              const mobileTheme = isDark ? themeSet.dark : themeSet.light;

              return (
                <button
                  key={i}
                  onClick={() => select(i)}
                  aria-label={`Go to ${inst.name}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    height: 7,
                    width: i === active ? 24 : 7,
                    background:
                      i === active ? mobileTheme.accent : "var(--border)",
                    opacity: i === active ? 1 : 0.4,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
