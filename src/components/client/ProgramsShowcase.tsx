"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: "01",
    name: "Data Analyst Masterclass",
    tag: "Most Popular",
    tagColor: "#84ff3d",
    duration: "3 months",
    students: "1,200+",
    hike: "86%",
    cover: "/course/data_analyst.png",
    desc: "Become an advanced Data Analyst. Master Excel, SQL, Power BI, and Python through live classes with practitioner instructors.",
    stack: ["Python", "Excel", "SQL", "Power BI"],
    accent: "#84ff3d",
  },
  {
    id: "02",
    name: "Full-Stack Engineering",
    tag: "High Demand",
    tagColor: "#2ea8ff",
    duration: "4 months",
    students: "980+",
    hike: "92%",
    cover: "/course/fullstack.png",
    desc: "Zero to deployed in 4 months. Build production-ready applications with React, Node.js, and modern DevOps practices.",
    stack: ["React", "Node.js", "MongoDB", "AWS"],
    accent: "#2ea8ff",
  },
  {
    id: "03",
    name: "Product Management",
    tag: "BCG Mentors",
    tagColor: "#ffcf33",
    duration: "3.5 months",
    students: "740+",
    hike: "78%",
    cover: "/course/product_management.png",
    desc: "Think like a PM, ship like a pro. Learn strategy, execution, and analytics from industry experts at BCG and Amazon.",
    stack: ["Figma", "Analytics", "Strategy", "Metrics"],
    accent: "#ffcf33",
  },
  {
    id: "04",
    name: "AI & Machine Learning",
    tag: "Flagship",
    tagColor: "#ff6b6b",
    duration: "4 months",
    students: "620+",
    hike: "95%",
    cover: "/course/ai.png",
    desc: "Master cutting-edge AI/ML from Google researchers. Build real-world models and deploy them to production at scale.",
    stack: ["Python", "TensorFlow", "PyTorch", "LLMs"],
    accent: "#ff6b6b",
  },
  {
    id: "05",
    name: "UX/UI Design Masterclass",
    tag: "Creative Track",
    tagColor: "#c084fc",
    duration: "3 months",
    students: "530+",
    hike: "82%",
    cover: "/course/uxui.png",
    desc: "Design systems that 100M+ users love. Learn from Flipkart's design lead with hands-on projects and a real portfolio.",
    stack: ["Figma", "Design Systems", "Research", "Prototyping"],
    accent: "#c084fc",
  },
  {
    id: "06",
    name: "DevOps & Cloud Architecture",
    tag: "Enterprise Ready",
    tagColor: "#34d399",
    duration: "3.5 months",
    students: "480+",
    hike: "88%",
    cover: "/course/devops.png",
    desc: "Demystify Kubernetes & AWS. Scale infrastructure for Fortune 500 clients with confidence and a job-ready portfolio.",
    stack: ["Kubernetes", "AWS", "CI/CD", "Docker"],
    accent: "#34d399",
  },
];

// ─── Program Card ───────────────────────────────────────────────────────────
function ProgramCard({
  program,
  index,
}: {
  program: (typeof PROGRAMS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl "
      style={{
        background: "var(--bg-card, #0d1117)",
        border: `1px solid ${hovered ? program.accent + "44" : "var(--border, rgba(255,255,255,0.08))"}`,
        boxShadow: hovered
          ? `0 0 0 1px ${program.accent}22, 0 24px 48px rgba(0,0,0,0.4), 0 0 60px ${program.accent}12`
          : "0 4px 24px rgba(0,0,0,0.2)",
        transition:
          "border 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Cover image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={program.cover}
          alt={program.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,17,23,0.85) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
          }}
        />

        {/* Accent glow on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${program.accent}20, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Tag badge */}
        <div
          className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{
            background: program.accent + "18",
            border: `1px solid ${program.accent}55`,
            color: program.accent,
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: program.accent }}
          />
          {program.tag}
        </div>

        {/* ID number */}
        <span
          className="absolute bottom-3 right-3 text-[10px] font-mono tracking-widest"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          {program.id}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Title */}
        <h3
          className="text-[1rem] font-bold leading-snug tracking-tight"
          style={{
            color: "var(--fg-primary, #f0f6ff)",
            transition: "color 0.2s",
          }}
        >
          {program.name}
        </h3>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{ background: "var(--border, rgba(255,255,255,0.07))" }}
        />

        {/* Description */}
        <p
          className="text-[0.82rem] leading-[1.7] flex-1"
          style={{ color: "var(--fg-muted, rgba(255,255,255,0.5))" }}
        >
          {program.desc}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {program.stack.map((t) => (
            <span
              key={t}
              className="rounded-full px-2.5 py-1 text-[10px] tracking-[0.04em] font-medium"
              style={{
                border: `1px solid ${program.accent + "74"}`,
                color: "var(--fg-secondary, rgba(255,255,255,0.55))",
                background: `${program.accent + "14"}`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          className="group/btn mt-1 flex items-center justify-between w-full rounded-xl px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer"
          style={{
            background: hovered ? program.accent : "rgba(255,255,255,0.04)",
            color: hovered ? "#0d1117" : program.accent,
            border: `1px solid ${hovered ? "transparent" : program.accent + "44"}`,
          }}
        >
          Explore Program
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Section ───────────────────────────────────────────────────────────
export default function ProgramsShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-120px" });

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative overflow-x-hidden py-16 lg:py-28"
      style={{ background: "var(--bg-page, #08090c)" }}
    >
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Remove these two existing top-fade divs and replace with one: */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none -z-0"
        style={{
          background:
            "linear-gradient(to bottom, #08090c 0%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-9">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex items-center gap-3 text-[10px] sm:text-[clamp(0.7rem,0.9vw,1rem)] uppercase tracking-[0.2em]"
          style={{ color: "var(--brand-green-dark, #84ff3d)" }}
        >
          <span
            className="h-[1.5px] w-6 flex-shrink-0"
            style={{ background: "var(--brand-green, #84ff3d)" }}
          />
          Career Accelerators
        </motion.div>

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <h2
            className="text-[clamp(2.2rem,3.8vw,3.8rem)] font-bold leading-[1.05] tracking-tight"
            style={{ color: "var(--fg-primary, #f0f6ff)" }}
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
            className="max-w-xs text-left text-base md:text-right leading-[1.7] font-medium"
            style={{ color: "var(--fg-muted, rgba(255,255,255,0.45))" }}
          >
            Learn from industry veterans. Earn credentials that open doors.
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROGRAMS.map((program, i) => (
            <ProgramCard key={program.id} program={program} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#counselling"
            className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-[2px]"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Not sure which program?
            <span
              className="flex justify-center itens-center gap-2 font-bold"
              style={{ color: "#84ff3d" }}
            >
              Book Free Counselling <ArrowRight size={16} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
