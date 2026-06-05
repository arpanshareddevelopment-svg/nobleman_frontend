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
    handle: "@aarav_m",
    logo: "/companies/microsoft-com-logo.png",
    text: "The mentorship completely changed how I approach development. Every project felt industry-level and pushed me to think like a real engineer — not just someone following tutorials.",
    cols: 2,
  },
  {
    id: 2,
    name: "Sophia Lee",
    role: "Product Designer",
    company: "Amazon",
    handle: "@sophia_lee",
    logo: "/companies/amazon-com-logo.png",
    text: "Beautiful curriculum, incredible community, and insane support throughout the journey. I finally landed my dream role after two failed attempts before joining.",
    cols: 2,
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    role: "Software Engineer",
    company: "Deloitte",
    handle: "@rohan_k",
    logo: "/companies/deloitte-com-logo.png",
    text: "I cracked my first tech role after struggling for almost a year. The mock interviews were gold — nothing else came close.",
    cols: 1,
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "Data Analyst",
    company: "Capgemini",
    handle: "@emily_chen",
    logo: "/companies/capgemini-engineering-com-ua-logo.png",
    text: "The AI roadmap was crystal clear and beginner-friendly while still being advanced enough to challenge me every single week.",
    cols: 2,
  },
  {
    id: 5,
    name: "Kabir Singh",
    role: "Backend Engineer",
    company: "Razorpay",
    handle: "@kabir_s",
    logo: "/companies/razorpay-com-logo.png",
    text: "Every assignment pushed me to think like a real engineer instead of just solving tutorial problems. That shift made all the difference.",
    cols: 1,
  },
  {
    id: 6,
    name: "Ananya Roy",
    role: "Data Scientist",
    company: "Genpact",
    handle: "@ananya_r",
    logo: "/companies/genpact-digital-logo.png",
    text: "The community alone is worth joining. People genuinely help each other grow and the instructors are always available when you need them.",
    cols: 1,
  },
  {
    id: 7,
    name: "Jason Park",
    role: "Cloud Engineer",
    company: "Sprinklr",
    handle: "@jason_p",
    logo: "/companies/sprinklr-com-logo.png",
    text: "The projects helped me stand out during interviews. Recruiters literally asked me to walk them through what I built here.",
    cols: 1,
  },
  {
    id: 8,
    name: "Nina Sharma",
    role: "UI Engineer",
    company: "Booking.com",
    handle: "@nina_s",
    logo: "/companies/booking-com-logo.png",
    text: "I finally understood animations, design systems, and responsive architecture properly. The curriculum is genuinely world-class.",
    cols: 1,
  },
  {
    id: 9,
    name: "Marcus Hill",
    role: "DevOps Engineer",
    company: "Tech Mahindra",
    handle: "@marcus_h",
    logo: "/companies/techmahindra-com-br-logo.png",
    text: "The deployment and scaling modules were ridiculously practical. I learned more here than in four years of college.",
    cols: 1,
  },
  {
    id: 10,
    name: "Ishita Verma",
    role: "Software Engineer",
    company: "Juniper",
    handle: "@ishita_v",
    logo: "/companies/juniper-net-logo.png",
    text: "The structure kept me disciplined and consistent throughout. That's honestly what changed everything — accountability baked into the program.",
    cols: 2,
  },
  {
    id: 11,
    name: "Daniel Cruz",
    role: "Product Manager",
    company: "Sony Pictures",
    handle: "@daniel_c",
    logo: "/companies/sonypictures-com-logo.png",
    text: "Our startup hired two learners from here. Their practical skills were seriously impressive and they hit the ground running from day one.",
    cols: 1,
  },
  {
    id: 12,
    name: "Sara Kim",
    role: "Full Stack Developer",
    company: "iOPEX",
    handle: "@sara_k",
    logo: "/companies/iopex-com-logo.png",
    text: "I loved how modern everything felt — from the platform UI to the teaching style, the code reviews, and the project feedback loop.",
    cols: 1,
  },
];

/* ─── INITIALS AVATAR ───────────────────────────────────────────────────── */
const AVATAR_COLORS = [
  { bg: "rgba(132,255,61,0.15)", color: "#84ff3d" },
  { bg: "rgba(46,168,255,0.15)", color: "#2ea8ff" },
  { bg: "rgba(255,207,51,0.15)", color: "#ffcf33" },
  { bg: "rgba(255,107,107,0.15)", color: "#ff6b6b" },
  { bg: "rgba(192,132,252,0.15)", color: "#c084fc" },
  { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
];

function Avatar({ name, index }: { name: string; index: number }) {
  const { bg, color } = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div
      className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
      style={{ background: bg, color }}
    >
      {initials}
    </div>
  );
}

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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.055,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col justify-between gap-5 rounded-2xl p-5 overflow-hidden transition-all duration-300 col-span-1"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, rgba(132,255,61,0.05), transparent 60%)`,
        }}
      />

      {/* Top: quote mark + text */}
      <div className="relative z-10">
        <span
          className="block font-black leading-none select-none mb-3"
          style={{
            color: "rgba(132,255,61,0.35)",
            fontSize: "2.5rem",
            lineHeight: 1,
          }}
        >
          "
        </span>
        <p
          className="text-[0.88rem] leading-[1.75] font-normal"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {t.text}
        </p>
      </div>

      {/* Divider */}
      <div
        className="relative z-10 h-px w-full"
        style={{ background: "rgba(255,255,255,0.07)" }}
      />

      {/* Bottom: author */}
      <div className="relative z-10 flex items-center gap-3">
        <Avatar name={t.name} index={index} />

        <div className="flex-1 min-w-0">
          <p
            className="text-[0.82rem] font-semibold leading-tight truncate"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            {t.name}
          </p>
          <p
            className="text-[0.72rem] mt-0.5 truncate"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            {t.role} · {t.company}
          </p>
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
        background:
          "linear-gradient(180deg, #050608 0%, #000514 50%, #000503 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-9">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div
            className="mb-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#84ff3d" }}
          >
            <span className="h-[1.5px] w-5" style={{ background: "#84ff3d" }} />
            Testimonials
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="text-[clamp(2.2rem,3.8vw,3.8rem)] font-black leading-[1.05] tracking-tight"
              style={{ color: "var(--fg-primary, #f0f6ff)" }}
            >
              Loved by people from{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #84ff3d 0%, #c8ff74 60%, #55c9ff 100%)",
                }}
              >
                top companies
              </span>
            </h2>

            <p
              className="max-w-xs text-sm leading-relaxed lg:text-right"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Real experiences from professionals who upskilled, transitioned,
              and leveled up with us.
            </p>
          </div>
        </motion.div>

        {/* ── UNIFORM GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
