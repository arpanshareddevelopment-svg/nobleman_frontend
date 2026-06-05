"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function MissionStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      id="mission"
      ref={ref}
      className="relative isolate overflow-hidden py-12 md:py-28"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(85,201,255,0.08), transparent 30%),
          radial-gradient(circle at 80% 70%, rgba(132,255,61,0.06), transparent 32%),
          linear-gradient(180deg, #05060a 0%, #070b12 45%, #05070d 100%)
        `,
      }}
    >
      {/* seamless blend from hero above */}
      <div
        className="absolute inset-x-0 top-0 h-40 -z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, var(--bg-page), transparent)",
        }}
      />

      {/* ambient green glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.45, 0.65, 0.45],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, var(--brand-green-glow) 0%, transparent 70%)",
        }}
      />

      {/* secondary blue accent glow */}
      <div
        className="absolute -z-10 blur-3xl opacity-12"
        style={{
          width: "40%",
          height: "60%",
          top: "20%",
          left: "-5%",
          background:
            "radial-gradient(circle, rgba(46,168,255,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 md:px-10">
        <motion.div
          whileHover={{ y: -4, scale: 1.005 }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] overflow-hidden p-6 md:p-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04), 0 40px 120px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* inner glass highlight */}
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.12),transparent_55%)] pointer-events-none" />

          {/* top shimmer line */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 5%, rgba(132,255,61,0.6) 40%, rgba(255,255,255,0.4) 55%, rgba(46,168,255,0.4) 70%, transparent 95%)",
            }}
          />

          {/* EYEBROW */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.28em] uppercase"
            style={{
              background: "rgba(132,255,61,0.12)",
              border: "1px solid rgba(132,255,61,0.3)",
              color: "var(--brand-green-light)",
              boxShadow: "0 0 20px rgba(132,255,61,0.15)",
            }}
          >
            Our Promise
          </motion.span>

          {/* HEADLINE */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 font-black leading-[1.05] tracking-tight text-[clamp(2.2rem,3.8vw,3.8rem)] text-[var(--fg-primary)]"
          >
            Your aspirational career{" "}
            <motion.span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #84ff3d 0%, #c8ff74 60%, #55c9ff 100%)",
              }}
            >
              is our mission.
            </motion.span>
          </motion.h2>

          {/* BODY */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-5 max-w-full text-base md:text-xl leading-[1.8] text-[var(--fg-secondary)]"
          >
            Our support doesn&apos;t end with your certificate. Our mentors stay
            with you - through your first interview, your first offer, and every
            milestone that follows.
          </motion.p>

          {/* bottom right accent orb */}
          <motion.div
            animate={{ y: [0, -18, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(circle, #84ff3d 0%, transparent 70%)",
            }}
          />
        </motion.div>
      </div>

      {/* blend into ValuesSection below */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 -z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
        }}
      />
    </section>
  );
}
