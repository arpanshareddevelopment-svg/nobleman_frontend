"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MissionStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-28"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--fg-muted) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.05,
        }}
      />

      {/* Green ambient glow */}
      <div
        className="absolute -z-10 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "var(--brand-green-glow)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border"
          style={{
            background: "var(--brand-green-glow)",
            borderColor: "rgba(34, 197, 94, 0.30)",
            color: "var(--brand-green-light)",
          }}
        >
          Our Promise
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl xl:text-[52px] font-black leading-[1.1] tracking-tight"
          style={{ color: "var(--fg-primary)" }}
        >
          Your aspirational career{" "}
          <span
            style={{
              background:
                "linear-gradient(125deg, var(--brand-green-light), var(--brand-green-dark))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            is our mission.
          </span>
        </motion.h2>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-base md:text-lg max-w-2xl leading-[1.85]"
          style={{ color: "var(--fg-secondary)" }}
        >
          Our support doesn&apos;t end with your certificate. Our mentors stay
          with you — every step of the way — through your first interview, your
          first offer, and every milestone that follows.
        </motion.p>
      </div>
    </section>
  );
}
