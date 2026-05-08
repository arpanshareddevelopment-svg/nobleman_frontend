"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MissionStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="mission"
      ref={ref}
      className="relative isolate overflow-hidden py-12 md:py-28"
    >
      {/* ── seamless blend from hero above ── */}
      <div className="absolute inset-x-0 top-0 h-40 -z-10 bg-gradient-to-b from-black/80 to-transparent dark:from-black/90 pointer-events-none" />

      {/* ── radial dot grid, prominent at center ── */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--fg-muted) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, black 30%, transparent 80%)",
          opacity: 0.2,
        }}
      />

      {/* ── ambient green glow ── */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, var(--brand-green-glow) 0%, transparent 70%)",
        }}
      />

      {/* ── secondary blue accent glow ── */}
      <div
        className="absolute -z-10 blur-2xl opacity-30"
        style={{
          width: "40%",
          height: "60%",
          top: "20%",
          left: "-5%",
          background:
            "radial-gradient(circle, rgba(46,168,255,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] overflow-hidden p-8 md:p-12"
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
            animate={inView ? { opacity: 1, y: 0 } : {}}
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
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 font-black leading-[1.05] tracking-tight text-[clamp(2.2rem,3.8vw,3.8rem)] text-white"
          >
            Your aspirational career{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #84ff3d 0%, #c8ff74 60%, #55c9ff 100%)",
              }}
            >
              is our mission.
            </span>
          </motion.h2>

          {/* BODY */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-5 max-w-full text-base md:text-xl leading-[1.8] text-white/60"
          >
            Our support doesn&apos;t end with your certificate. Our mentors stay
            with you — through your first interview, your first offer, and every
            milestone that follows.
          </motion.p>

          {/* bottom right accent orb */}
          <div
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(circle, #84ff3d 0%, transparent 70%)",
            }}
          />
        </motion.div>
      </div>
      {/* ── blend into ValuesSection below ── */}
<div className="absolute inset-x-0 bottom-0 h-32 -z-10 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </section>
  );
}