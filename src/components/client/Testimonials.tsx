"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Frontend Engineer",
    company: "Microsoft",
    logo: "/companies/microsoft-com-logo.png",
    text: "The mentorship completely changed how I approach development. Every project felt industry-level and pushed me to think like a real engineer.",
    bg: "#f5e642",          // yellow
    textColor: "#111",
    cols: 2,
  },
  {
    id: 2,
    name: "Sophia Lee",
    role: "Product Designer",
    company: "Amazon",
    logo: "/companies/amazon-com-logo.png",
    text: "Beautiful curriculum, beautiful community, and insane support throughout the journey. I finally landed my dream role.",
    bg: "#ddd6fe",          // lavender
    textColor: "#111",
    cols: 2,
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    role: "Software Engineer",
    company: "Deloitte",
    logo: "/companies/deloitte-com-logo.png",
    text: "I cracked my first tech role after struggling for almost a year. The mock interviews were gold.",
    bg: "#bfdbfe",          // light blue
    textColor: "#111",
    cols: 1,
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "Data Analyst",
    company: "Capgemini",
    logo: "/companies/capgemini-engineering-com-ua-logo.png",
    text: "The AI roadmap was crystal clear and beginner-friendly while still being advanced enough to challenge me every week.",
    bg: "#fbcfe8",          // pink
    textColor: "#111",
    cols: 2,
  },
  {
    id: 5,
    name: "Kabir Singh",
    role: "Backend Engineer",
    company: "Razorpay",
    logo: "/companies/razorpay-com-logo.png",
    text: "Every assignment pushed me to think like a real engineer instead of just solving tutorial problems.",
    bg: "#d1fae5",          // mint green
    textColor: "#111",
    cols: 1,
  },
  {
    id: 6,
    name: "Ananya Roy",
    role: "Data Scientist",
    company: "Genpact",
    logo: "/companies/genpact-digital-logo.png",
    text: "The community alone is worth joining. People genuinely help each other grow and the instructors are always available.",
    bg: "#fde68a",          // amber
    textColor: "#111",
    cols: 1,
  },
  {
    id: 7,
    name: "Jason Park",
    role: "Cloud Engineer",
    company: "Sprinklr",
    logo: "/companies/sprinklr-com-logo.png",
    text: "The projects helped me stand out during interviews. Recruiters literally asked about them.",
    bg: "#e0e7ff",          // indigo tint
    textColor: "#111",
    cols: 1,
  },
  {
    id: 8,
    name: "Nina Sharma",
    role: "UI Engineer",
    company: "Booking.com",
    logo: "/companies/booking-com-logo.png",
    text: "I finally understood animations, design systems, and responsive architecture properly. The curriculum is world-class.",
    bg: "#fce7f3",          // rose
    textColor: "#111",
    cols: 1,
  },
  {
    id: 9,
    name: "Marcus Hill",
    role: "DevOps Engineer",
    company: "Tech Mahindra",
    logo: "/companies/techmahindra-com-br-logo.png",
    text: "The deployment and scaling modules were ridiculously practical. Learned more here than in four years of college.",
    bg: "#ccfbf1",          // teal
    textColor: "#111",
    cols: 1,
  },
  {
    id: 10,
    name: "Ishita Verma",
    role: "Software Engineer",
    company: "Juniper",
    logo: "/companies/juniper-net-logo.png",
    text: "The structure kept me disciplined and consistent. That's what changed everything for me.",
    bg: "#ede9fe",          // violet
    textColor: "#111",
    cols: 2,
  },
  {
    id: 11,
    name: "Daniel Cruz",
    role: "Product Manager",
    company: "Sony Pictures",
    logo: "/companies/sonypictures-com-logo.png",
    text: "Our startup hired two learners from here. Their practical skills were seriously impressive and they hit the ground running.",
    bg: "#fee2e2",          // red tint
    textColor: "#111",
    cols: 1,
  },
  {
    id: 12,
    name: "Sara Kim",
    role: "Full Stack Developer",
    company: "iOPEX",
    logo: "/companies/iopex-com-logo.png",
    text: "I loved how modern everything felt — from the UI to the teaching style and project reviews.",
    bg: "#ecfccb",          // lime
    textColor: "#111",
    cols: 1,
  },
];

/* ─── CARD ──────────────────────────────────────────────────────────────── */
function TestimonialCard({
  t,
  index,
  inView,
}: {
  t: (typeof TESTIMONIALS)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.015 }}
      className={`rounded-2xl p-6 flex flex-col justify-between gap-4 min-h-[200px] ${
        t.cols === 2 ? "lg:col-span-2" : "col-span-1"
      }`}
      style={{ backgroundColor: t.bg }}
    >
      {/* Quote mark */}
      <div>
        <span
          className="text-5xl font-black leading-none select-none"
          style={{ color: "rgba(0,0,0,0.25)", lineHeight: 1 }}
        >
          "
        </span>
        <p
          className="mt-2 text-[0.95rem] leading-relaxed font-medium"
          style={{ color: t.textColor }}
        >
          {t.text}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mt-2">
        {/* Avatar placeholder */}
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
          style={{ background: "rgba(0,0,0,0.18)" }}
        >
          {t.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight" style={{ color: t.textColor }}>
            {t.name}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(0,0,0,0.6)" }}>
            {t.role}
          </p>
        </div>

        {/* Company logo */}
        <div className="flex-shrink-0 h-7 w-20 relative">
          <Image
            src={t.logo}
            alt={t.company}
            fill
            className="object-contain object-right"
            sizes="80px"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── SECTION ───────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: `linear-gradient(160deg, #05030d 0%, #07111e 40%, #07101b 70%, #05070f 100%)`,
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Ambient blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: "blur(100px)",
          background: `
            radial-gradient(circle at 10% 20%, rgba(0,196,255,0.1), transparent 35%),
            radial-gradient(circle at 85% 15%, rgba(200,255,0,0.07), transparent 35%),
            radial-gradient(circle at 50% 85%, rgba(255,200,100,0.06), transparent 40%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-12"
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase"
            style={{ color: "var(--brand-yellow, #f5e642)" }}
          >
            //// Testimonials
          </span>

          <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.0] font-black text-white">
              Loved by people
              <br />
              from{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#00c2ff 0%,#c8ff00 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                top companies
              </span>
            </h2>

            <p
              className="max-w-xs text-sm leading-relaxed lg:text-right"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Real experiences from professionals who upskilled, transitioned,
              and leveled up with us.
            </p>
          </div>
        </motion.div>

        {/* ── BENTO GRID ── */}
        {/* Row 1: col-2 + col-2  (4 cols total) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.slice(0, 2).map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} inView={inView} />
          ))}
        </div>

        {/* Row 2: col-1 + col-2 + col-1  (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
          {TESTIMONIALS.slice(2, 5).map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i + 2} inView={inView} />
          ))}
        </div>

        {/* Row 3: col-1 + col-1 + col-1 + col-1  (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
          {TESTIMONIALS.slice(5, 9).map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i + 5} inView={inView} />
          ))}
        </div>

        {/* Row 4: col-1 + col-2 + col-1  (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
          {TESTIMONIALS.slice(9, 12).map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i + 9} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
