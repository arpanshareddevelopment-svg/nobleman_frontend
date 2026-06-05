"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, BookOpen, Briefcase, Award } from "lucide-react";

const CERTS = [
  {
    id: 1,
    icon: BookOpen,
    label: "Course Completion Certificate",
    color: "#2ea8ff",
    src: "/certificates/course.jpeg",
    orientation: "landscape" as const,
    title: "Master the Skills",
    description:
      "Earn a professionally designed certificate upon completing every module. Recognized by 400+ hiring partners across India - it validates what you know, not just that you showed up.",
    points: [
      "Issued on completion of all modules",
      "Verified digital + physical copy",
      "Accepted by 400+ hiring partners",
    ],
  },
  {
    id: 2,
    icon: Briefcase,
    label: "Project Completion Certificate",
    color: "#84ff3d",
    src: "/certificates/project_report.jpeg",
    orientation: "portrait" as const,
    title: "Prove Your Expertise",
    description:
      "Every project you build gets reviewed by an industry mentor and earns you a dedicated project certificate. Your work speaks louder than any exam score.",
    points: [
      "Mentor-reviewed projects",
      "Detailed project report included",
      "Stands out in interviews",
    ],
  },
  {
    id: 3,
    icon: Award,
    label: "Internship Certificate",
    color: "#ffcf33",
    src: "/certificates/internship.jpeg",
    orientation: "portrait" as const,
    title: "Real-World Experience",
    description:
      "Complete your guided internship and walk away with a certificate that proves industry exposure - not classroom theory. Employers know the difference.",
    points: [
      "Live project under real mentorship",
      "Industry-standard evaluation",
      "Boosts placement profile significantly",
    ],
  },
];

function CertRow({ cert, index }: { cert: (typeof CERTS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const isEven = index % 2 === 0;
  const Icon = cert.icon;

  const imgW = cert.orientation === "landscape" ? 450 : 240;
  const imgH = cert.orientation === "landscape" ? 320 : 300;

  return (
    <div ref={ref} className="relative">
      <div
        className={`flex flex-col gap-10 lg:gap-20 pt-6 items-center  ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -56 : 56 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-shrink-0 flex items-center justify-center"
        >
          {/* Glow behind */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: imgW * 0.9,
              height: imgH * 0.7,
              background: cert.color,
              opacity: 0.07,
              filter: "blur(56px)",
            }}
          />

          <motion.div
            whileHover={{ y: -10, scale: 1.025 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`relative rounded-2xl overflow-hidden ${
              cert.orientation === "landscape"
                ? "w-[400px] h-[280px]"
                : "w-[250px] h-[340px]"
            }`}
            style={{
              rotate: isEven ? -1.5 : 1.5,
              boxShadow: `0 32px 72px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), 0 0 60px ${cert.color}14`,
            }}
          >
            <Image
              src={cert.src}
              alt={cert.label}
              fill
              className="object-cover"
              sizes={`${imgW}px`}
              priority={index === 0}
            />

            {/* Shine overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%, rgba(0,0,0,0.1) 100%)",
              }}
            />

            {/* Verified chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.55,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                background: "rgba(8,9,12,0.88)",
                border: `1px solid ${cert.color}44`,
                backdropFilter: "blur(10px)",
              }}
            >
              <ShieldCheck size={11} style={{ color: cert.color }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.1em]"
                style={{ color: cert.color }}
              >
                Verified
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* TEXT SIDE */}
        <div className="flex-1 min-w-0">
          {/* Icon + label */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="flex items-center gap-3 mb-5"
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
              style={{
                background: cert.color + "15",
                border: `1px solid ${cert.color}30`,
                color: cert.color,
              }}
            >
              <Icon size={20} strokeWidth={1.6} />
            </div>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: cert.color }}
            >
              {cert.label}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[clamp(1.9rem,2.8vw,2.7rem)] font-black leading-[1.06] tracking-tight mb-4"
            style={{ color: "var(--fg-primary, #f0f6ff)" }}
          >
            {cert.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.27, duration: 0.5 }}
            className="text-[0.95rem] leading-[1.85] mb-7"
            style={{ color: "rgba(255,255,255,0.48)" }}
          >
            {cert.description}
          </motion.p>

          {/* Points */}
          <ul className="flex flex-col gap-3">
            {cert.points.map((point, pi) => (
              <motion.li
                key={pi}
                initial={{ opacity: 0, x: isEven ? 16 : -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + pi * 0.09, duration: 0.42 }}
                className="flex items-center gap-3"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ background: cert.color }}
                />
                <span
                  className="text-[0.875rem] font-medium"
                  style={{ color: "rgba(255,255,255,0.62)" }}
                >
                  {point}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Row divider - not on last */}
      {index < CERTS.length - 1 && (
        <div
          className="mt-10 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
          }}
        />
      )}
    </div>
  );
}

export default function CertificationsShowcase() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="certifications"
      className="relative w-full overflow-hidden py-20 md:py-32"
      style={{
        background: `
    linear-gradient(
      145deg,
      #060a129e 0%,
      #000000 12%,
      #0b0c0fc0 35%,
      #010102 100%
    )
  `,
      }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 8% 35%, rgba(46, 168, 255, 0.14), transparent 40%), radial-gradient(ellipse at 92% 65%, rgba(132, 255, 61, 0.05), transparent 40%), radial-gradient(ellipse at 50% 80%, rgba(255, 207, 51, 0.05), transparent 35%)",
        }}
      />{" "}
      {/* Dot grid */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--grid-dot) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, rgba(0,0,0,0.22) 58%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, rgba(0,0,0,0.62) 8%, transparent 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-9">
        {/* HEADER */}
        <div ref={headerRef} className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#84ff3d" }}
          >
            <span className="h-[1.5px] w-5" style={{ background: "#84ff3d" }} />
            Credentials
            <span className="h-[1.5px] w-5" style={{ background: "#84ff3d" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-[clamp(2.2rem,3.8vw,3.8rem)] font-black leading-[1.05] tracking-tight"
            style={{ color: "var(--fg-primary, #f0f6ff)" }}
          >
            Credentials that{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #2ea8ff 0%, #84ff3d 55%, #ffcf33 100%)",
              }}
            >
              open doors
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mt-4 text-[0.95rem] leading-[1.8] max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            Every certificate validates real skills. From completion to
            internships, we certify capability-not just participation.
          </motion.p>
        </div>

        {/* ALTERNATING ROWS */}
        <div className="flex flex-col gap-0">
          {CERTS.map((cert, i) => (
            <CertRow key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
