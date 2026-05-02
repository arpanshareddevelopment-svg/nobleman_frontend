"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

/* ─── Instructor data ──────────────────────────────────────── */
const INSTRUCTORS = [
  {
    name: "Priya Sharma",
    role: "Senior Data Scientist",
    company: "Amazon",
    expertise: ["Python", "ML", "SQL"],
    accent: "var(--brand-green-light)",
    accentDark: "var(--brand-green-dark)",
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
    accent: "var(--brand-blue-light)",
    accentDark: "var(--brand-blue-dark)",
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
    accent: "var(--brand-yellow-light)",
    accentDark: "var(--brand-yellow-dark)",
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
    accent: "var(--brand-purple-light)",
    accentDark: "var(--brand-purple-dark)",
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
    accent: "var(--brand-pink-light)",
    accentDark: "var(--brand-pink-dark)",
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
    accent: "var(--brand-orange-light)",
    accentDark: "var(--brand-orange-dark)",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "Scaled infrastructure for Fortune 500 clients. Demystifies cloud and DevOps for working engineers.",
    rating: 4.7,
    students: "530+",
    experience: "11 yrs",
    index: "06",
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

/* ─── Vertical thumb strip ─────────────────────────────────── */
function ThumbStrip({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  // Only display the first 4 instructors
  const displayInstructors = INSTRUCTORS.slice(0, 4);

  return (
    <div className="hidden lg:flex flex-col gap-3 flex-shrink-0">
      {displayInstructors.map((inst, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="relative w-[72px] h-[72px] rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 group"
          style={{
            outline:
              i === active
                ? `2px solid ${inst.accent}`
                : "2px solid transparent",
            outlineOffset: 2,
            opacity: i === active ? 1 : 0.38,
            transform: i === active ? "scale(1.06)" : "scale(1)",
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
          {i === active && (
            <motion.div
              layoutId="thumb-glow"
              className="absolute inset-0 rounded-2xl"
              style={{ background: `${inst.accent}22` }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

/* ─── Main carousel ────────────────────────────────────────── */
export default function InstructorCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = INSTRUCTORS.length;

  const advance = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => advance(1), 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, advance]);

  function select(i: number) {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }

  function handleArrow(dir: 1 | -1) {
    advance(dir);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }

  const inst = INSTRUCTORS[active];

  return (
    <section
      className="relative w-full overflow-hidden py-24"
      style={{ background: "var(--bg-page)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Animated ambient background ── */}
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
              radial-gradient(ellipse 70% 60% at 30% 50%, ${inst.accent}0d 0%, transparent 65%),
              radial-gradient(ellipse 50% 40% at 75% 30%, ${inst.accentDark}12 0%, transparent 60%)
            `,
          }}
        />
      </AnimatePresence>

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--fg-muted) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.05,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* ── Section header ── */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.span
              key={`pill-${active}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border mb-4"
              style={{
                background: `${inst.accent}14`,
                borderColor: `${inst.accent}40`,
                color: inst.accent,
              }}
            >
              Meet the Mentors
            </motion.span>
            <h2
              className="text-3xl md:text-[42px] font-black leading-[1.1] tracking-tight"
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
                    background: `linear-gradient(125deg, ${inst.accent}, ${inst.accentDark})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
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
            {[-1 as 1 | -1, 1 as 1 | -1].map((dir, di) => (
              <button
                key={di}
                onClick={() => handleArrow(dir)}
                aria-label={dir === -1 ? "Previous" : "Next"}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${inst.accent}50`,
                  color: inst.accent,
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
        <div className="flex gap-6 items-start">
          {/* Vertical thumb strip */}
          <ThumbStrip active={active} onSelect={select} />

          {/* Portrait — large, dominant */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`photo-${active}`}
              initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex-shrink-0 rounded-3xl overflow-hidden"
              style={{
                width: "clamp(220px, 28vw, 360px)",
                height: "clamp(280px, 35vw, 420px)",
                boxShadow: `0 32px 80px ${inst.accent}28, 0 0 0 1px ${inst.accent}20`,
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
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
                    to top,
                    ${inst.accentDark}ee 0%,
                    ${inst.accent}08 45%,
                    transparent 70%
                  )`,
                }}
              />

              {/* Name overlay on photo */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div
                  className="text-[10px] font-black tracking-[0.2em] uppercase mb-1"
                  style={{ color: inst.accent }}
                >
                  {inst.company}
                </div>
                <div className="text-xl font-black text-white leading-tight">
                  {inst.name}
                </div>
                <div className="text-xs mt-0.5 text-white/60">{inst.role}</div>
              </div>

              {/* Index badge — top right */}
              <div
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black"
                style={{
                  background: `${inst.accent}22`,
                  border: `1px solid ${inst.accent}55`,
                  color: inst.accent,
                  backdropFilter: "blur(8px)",
                }}
              >
                {inst.index}
              </div>

              {/* Accent corner glow */}
              <div
                className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full pointer-events-none"
                style={{
                  background: inst.accent,
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
              className="flex-1 flex flex-col gap-6 min-w-0"
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
                      background: `${inst.accent}0e`,
                      border: `1px solid ${inst.accent}25`,
                    }}
                  >
                    <span
                      className="text-[22px] font-black leading-none"
                      style={{ color: inst.accent }}
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
                        background: `${inst.accent}14`,
                        color: inst.accent,
                        border: `1px solid ${inst.accent}30`,
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
                  <Stars rating={inst.rating} color={inst.accent} />
                  <span
                    className="text-sm font-bold"
                    style={{ color: inst.accent }}
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
                <a
                  href="#"
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all duration-200 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${inst.accent}, ${inst.accentDark})`,
                    boxShadow: `0 4px 20px ${inst.accent}44`,
                  }}
                >
                  Book a Session →
                </a>
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
                      background: `linear-gradient(90deg, ${inst.accent}, ${inst.accentDark})`,
                    }}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Mobile dot strip ── */}
        <div className="flex items-center justify-center gap-2 mt-10 lg:hidden">
          {INSTRUCTORS.map((inst, i) => (
            <button
              key={i}
              onClick={() => select(i)}
              aria-label={`Go to ${inst.name}`}
              className="rounded-full transition-all duration-300"
              style={{
                height: 7,
                width: i === active ? 24 : 7,
                background: i === active ? inst.accent : "var(--border)",
                opacity: i === active ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
