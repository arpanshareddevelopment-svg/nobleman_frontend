"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MissionStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden py-24 md:py-28"
      style={{ background: "var(--bg-page)" }}
    >
      {/* GRID */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--fg-muted) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* AMBIENT GLOW */}
      <div
        className="absolute inset-0 -z-10 blur-3xl"
        style={{
          background: `radial-gradient(circle at center,
            var(--brand-green-glow) 0%,
            transparent 65%)`,
        }}
      />

      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] border border-white/60 bg-white/70 p-8 md:p-10 shadow-[0_30px_100px_rgba(7,18,37,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
        >
          {/* subtle glass highlight */}
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)] pointer-events-none" />

          {/* EYEBROW */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center rounded-full border px-4 py-1.5 text-[11px] font-bold tracking-[0.28em] uppercase"
            style={{
              background: "var(--brand-green-glow)",
              borderColor: "rgba(34,197,94,0.25)",
              color: "var(--brand-green-light)",
            }}
          >
            Our Promise
          </motion.span>

          {/* HEADLINE */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 font-black leading-[1.05] tracking-tight text-[clamp(2.2rem,3.8vw,3.8rem)] text-[color:var(--fg-primary)]"
          >
            Your aspirational career{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, var(--brand-green-light), var(--brand-green-dark))",
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
            className="mt-5 max-w-full text-base md:text-xl leading-[1.8] text-[color:var(--fg-secondary)]"
          >
            Our support doesn&apos;t end with your certificate. Our mentors stay
            with you — through your first interview, your first offer, and every
            milestone that follows.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
