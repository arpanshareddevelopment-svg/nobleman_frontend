"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Code2, Target } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   SLIDE DATA
───────────────────────────────────────────────────────────── */
const SLIDES = [
  /* ── Slide 1: GREEN ─────────────────────────────────────── */
  {
    tag: "AI-First Learning",
    heading: ["Build Skills That", "Actually Get You Hired"],
    /* heading[1] gradient stays in the green family */
    headingGradient: ["var(--brand-green-light)", "var(--brand-green-dark)"],
    sub: "Live mentor-led programs with real projects, placement support, and industry veterans from BCG, Amazon & Microsoft.",
    cta: "Explore Programs",
    accent: "var(--brand-green-light)",
    accentDark: "var(--brand-green-dark)",
    cardBg:
      "linear-gradient(145deg, rgba(22, 163, 74, 0.1) 0%, var(--brand-green-dark) 55%, rgba(10, 26, 14, 0.8) 100%)",
    card: {
      icon: "chart",
      badge: "Most Popular",
      title: "Data Analyst Masterclass",
      desc: "Job-ready in 3 months",
    },
    /*
      Each chip:
        from  — translate offset for the entrance animation (px)
        style — final position glued to the card (absolute, relative to card's inset-0 wrapper)
    */
    stats: [
      {
        value: "12,000+",
        label: "Careers",
        color: "var(--brand-green-light)",
        from: { x: 0, y: -80 },
        style: { top: "-20px", left: "80%", transform: "translateX(-50%)" },
      },
      {
        value: "100%",
        label: "Placement",
        color: "var(--brand-green-light)",
        from: { x: -120, y: 0 },
        style: { left: "-40%", top: "50%", transform: "translateY(-50%)" },
      },
      {
        value: "400+",
        label: "Partners",
        color: "var(--brand-green-light)",
        from: { x: 0, y: 80 },
        style: { bottom: "-18px", left: "50%", transform: "translateX(-50%)" },
      },
    ],
  },

  /* ── Slide 2: BLUE ───────────────────────────────────────── */
  {
    tag: "Live & Interactive",
    heading: ["Learn from the Best,", "Land the Best"],
    /* heading[1] gradient stays in the blue family */
    headingGradient: ["var(--brand-blue-light)", "var(--brand-blue-dark)"],
    sub: "Every session is live. Every mentor is a practitioner. Every project is portfolio-worthy. No recordings, no shortcuts.",
    cta: "See Mentors",
    accent: "var(--brand-blue-light)",
    accentDark: "var(--brand-blue-dark)",
    cardBg:
      "linear-gradient(145deg, rgba(29, 78, 216, 0.1) 0%, var(--brand-blue-dark) 55%, rgba(10, 15, 30, 0.8) 100%)",
    card: {
      icon: "code",
      badge: "Trending",
      title: "Full-Stack Engineering",
      desc: "Zero to deployed in 4 months",
    },
    stats: [
      {
        value: "50+",
        label: "Expert Mentors",
        color: "var(--brand-blue-light)",
        from: { x: -120, y: -60 },
        style: { top: "-18px", left: "-20px" },
      },
      {
        value: "6 mo",
        label: "Post-Placement Support",
        color: "var(--brand-blue-light)",
        from: { x: 120, y: 0 },
        style: { right: "-60%", top: "50%", transform: "translateY(-50%)" },
      },
      {
        value: "4.9★",
        label: "Learner Rating",
        color: "var(--brand-blue-light)",
        from: { x: 100, y: 80 },
        style: { bottom: "-18px", right: "16px" },
      },
    ],
  },

  /* ── Slide 3: YELLOW ─────────────────────────────────────── */
  {
    tag: "Outcome Focused",
    heading: ["Your Next Role", "Starts Here"],
    /* heading[1] gradient stays in the yellow/amber family */
    headingGradient: ["var(--brand-yellow-light)", "var(--brand-yellow-dark)"],
    sub: "We don't just teach — we place. Dedicated career coaches, mock interviews, and direct referrals to 400+ hiring partners.",
    cta: "View Outcomes",
    accent: "var(--brand-yellow-light)",
    accentDark: "var(--brand-yellow-dark)",
    cardBg:
      "linear-gradient(145deg, rgba(202, 138, 4, 0.1) 0%, var(--brand-yellow-dark) 55%, rgba(15, 10, 0, 0.8) 100%)",
    card: {
      icon: "target",
      badge: "High ROI",
      title: "Product Management",
      desc: "Think like a PM, ship like a pro",
    },
    stats: [
      {
        value: "8L+",
        label: "Avg. Salary Hike",
        color: "var(--brand-yellow-light)",
        from: { x: 0, y: -80 },
        style: { top: "-18px", left: "50%", transform: "translateX(-50%)" },
      },
      {
        value: "90 days",
        label: "Avg. Time to Offer",
        color: "var(--brand-yellow-light)",
        from: { x: -120, y: 60 },
        style: { bottom: "-18px", left: "-8px" },
      },
      {
        value: "3,200+",
        label: "Active Alumni",
        color: "var(--brand-yellow-light)",
        from: { x: 120, y: -60 },
        style: { top: "58%", left: "-50%" },
      },
    ],
  },
];

/* ── Card SVG icons ───────────────────────────────────────── */
function CardIcon({ type, color }: { type: string; color: string }) {
  if (type === "chart")
    return <BarChart3 size={44} stroke={color} strokeWidth={1.6} fill="none" />;
  if (type === "code")
    return <Code2 size={44} stroke={color} strokeWidth={1.6} fill="none" />;
  return <Target size={44} stroke={color} strokeWidth={1.6} fill="none" />;
}

/* ── Stat chip ─────────────────────────────────────────────── */
/*
  `from`  — the x/y offset it starts at (off-screen/away from card)
  `style` — the final CSS position (stuck to the card edge)
*/
type Stat = {
  value: string;
  label: string;
  color: string;
  from: { x: number; y: number };
  style: React.CSSProperties;
};

function StatChip({
  value,
  label,
  color,
  from,
  style,
  delay,
}: Stat & { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from.x, y: from.y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: from.x, y: from.y }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className="absolute"
      style={style}
    >
      <div
        className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
        style={{
          background: `${color}22`,
          color,
          border: `1px solid ${color}55`,
          backdropFilter: "blur(8px)",
        }}
      >
        {value} • {label}
      </div>
    </motion.div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!auto) return;
    timerRef.current = setInterval(
      () => setIdx((i) => (i + 1) % SLIDES.length),
      4400,
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [auto, idx]);

  function goTo(i: number) {
    if (i === idx) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setIdx(i);
    setAuto(false);
    setTimeout(() => setAuto(true), 8000);
  }

  const slide = SLIDES[idx];

  return (
    <section
      className="relative w-full min-h-[90vh] flex items-center overflow-hidden"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `radial-gradient(circle, var(--fg-muted) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.07,
        }}
      />

      {/* Accent glow — changes per slide */}
      <AnimatePresence>
        <motion.div
          key={`glow-${idx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 55% 50% at 70% 50%, ${slide.accent}16 0%, transparent 70%),
              radial-gradient(ellipse 40% 35% at 15% 60%, ${slide.accentDark}20 0%, transparent 65%)
            `,
          }}
        />
      </AnimatePresence>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-14 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ════════════════ LEFT ════════════════ */}
        <div className="flex flex-col gap-6">
          {/* Tag + LIVE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${idx}`}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.28 }}
              className="flex items-center gap-2 self-start"
            >
              <span
                className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border"
                style={{
                  background: `${slide.accent}18`,
                  borderColor: `${slide.accent}45`,
                  color: slide.accent,
                }}
              >
                {slide.tag}
              </span>
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold tracking-widest"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  borderColor: "rgba(239,68,68,0.25)",
                  color: "#f87171",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                LIVE
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h1-${idx}`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl xl:text-[56px] font-black leading-[1.08] tracking-tight"
              style={{ color: "var(--fg-primary)" }}
            >
              {slide.heading[0]}{" "}
              {/* ── heading[1]: gradient uses only this slide's own accent colors ── */}
              <span
                style={{
                  background: `linear-gradient(125deg, ${slide.headingGradient[0]}, ${slide.headingGradient[1]})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {slide.heading[1]}
              </span>
            </motion.h1>
          </AnimatePresence>

          {/* Sub-text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${idx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              className="text-sm md:text-[15px] max-w-[420px] leading-[1.75]"
              style={{ color: "var(--fg-secondary)" }}
            >
              {slide.sub}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, delay: 0.1 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#programs"
                className="btn-pill px-7 py-3 text-sm font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${slide.accent}, ${slide.accentDark})`,
                  boxShadow: `0 4px 20px ${slide.accent}44`,
                }}
              >
                {slide.cta} &rarr;
              </a>
              <a
                href="#"
                className="btn-pill btn-ghost px-7 py-3 text-sm font-semibold"
              >
                Watch Demo
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Social proof */}
          <div
            className="pt-5 mt-1 flex flex-col gap-2"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p className="text-sm" style={{ color: "var(--fg-secondary)" }}>
              <span
                className="font-bold"
                style={{ color: "var(--fg-primary)" }}
              >
                12,000+ careers transformed.
              </span>{" "}
              Yours is next.
            </p>
            <p className="text-sm font-semibold relative inline-block w-fit">
              <span
                style={{
                  backgroundImage: `linear-gradient(90deg, ${slide.accent}, var(--fg-primary))`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Ongoing mentor support for 6 months, even after placement.
              </span>
              <span
                className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${slide.accent}, var(--fg-primary))`,
                }}
              />
            </p>
          </div>

          {/* Slide dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  height: 7,
                  width: i === idx ? 24 : 7,
                  background: i === idx ? slide.accent : "var(--border)",
                  opacity: i === idx ? 1 : 0.45,
                }}
              />
            ))}
          </div>
        </div>

        {/* ════════════════ RIGHT ════════════════ */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: 460 }}
        >
          {/* Outer orbit ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 420,
              height: 420,
              border: `2px dashed ${slide.accent}35`,
            }}
          />
          {/* Inner orbit ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 350,
              height: 350,
              border: `2px dashed ${slide.accent}20`,
            }}
          />

          {/* Dashed connector lines */}
          <svg
            className="absolute pointer-events-none"
            style={{
              width: 320,
              height: 320,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              overflow: "visible",
            }}
          >
            {[
              { x2: 310, y2: 40 },
              { x2: 10, y2: 160 },
              { x2: 160, y2: 310 },
            ].map((p, i) => (
              <line
                key={i}
                x1={160}
                y1={160}
                x2={p.x2}
                y2={p.y2}
                stroke={`${slide.accent}22`}
                strokeWidth={1}
                strokeDasharray="5 5"
              />
            ))}
          </svg>

          {/* ── Program card ─────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${idx}`}
              initial={{ opacity: 0, scale: 0.82, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              /*
                `relative` + known dimensions so chips positioned with
                absolute offsets land exactly on the card edges.
              */
              className="relative overflow-visible shadow-2xl"
              style={{
                width: 300,
                height: 300,
                background: slide.cardBg,
                borderRadius: 28,
                border: `1px solid ${slide.accent}30`,
                boxShadow: `0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px ${slide.accent}18`,
              }}
            >
              {/* Glow blob inside card */}
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background: slide.accent,
                  filter: "blur(40px)",
                  opacity: 0.28,
                }}
              />

              {/* Card content */}
              <div className="relative z-10 flex flex-col items-center text-center px-7 py-9">
                <div
                  className="mb-4 p-3 rounded-2xl"
                  style={{
                    background: `${slide.accent}18`,
                    border: `1px solid ${slide.accent}30`,
                  }}
                >
                  <CardIcon type={slide.card.icon} color={slide.accent} />
                </div>
                <span
                  className="px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest mb-3"
                  style={{
                    background: `${slide.accent}22`,
                    color: slide.accent,
                    border: `1px solid ${slide.accent}40`,
                  }}
                >
                  {slide.card.badge}
                </span>
                <div className="text-[18px] font-black text-white leading-snug">
                  {slide.card.title}
                </div>
                <div
                  className="text-[11px] mt-2"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {slide.card.desc}
                </div>
              </div>

              {/* ── Stat chips — positioned relative to the card ── */}
              <AnimatePresence mode="wait">
                <motion.div key={`chips-${idx}`}>
                  {slide.stats.map((b, i) => (
                    <StatChip
                      key={i}
                      value={b.value}
                      label={b.label}
                      color={b.color}
                      from={b.from}
                      style={b.style}
                      delay={0.25 + i * 0.15}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
