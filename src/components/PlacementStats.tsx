"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const COMPANIES = [
  { id: 1, name: "Amazon", logo: "🔶", category: "Tech" },
  { id: 2, name: "Microsoft", logo: "⬜", category: "Tech" },
  { id: 3, name: "Google", logo: "🔴", category: "Tech" },
  { id: 4, name: "Deloitte", logo: "🔷", category: "Consulting" },
  { id: 5, name: "Tech Mahindra", logo: "🔵", category: "Tech" },
  { id: 6, name: "Juniper", logo: "⚫", category: "Tech" },
  { id: 7, name: "IOPEX", logo: "📊", category: "Data" },
  { id: 8, name: "Sony Pictures", logo: "🎬", category: "Media" },
  { id: 9, name: "AT&T", logo: "🌐", category: "Telecom" },
  { id: 10, name: "AXA", logo: "🟥", category: "Finance" },
];

function CircularProgress({
  percentage,
  displayPercentage,
  trigger,
}: {
  percentage: number;
  displayPercentage: number;
  trigger: boolean;
}) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg className="-rotate-90" width="180" height="180">
        <circle
          cx="90"
          cy="90"
          r="45"
          stroke="var(--brand-green-light)"
          strokeWidth="8"
          fill="none"
          className="opacity-10"
        />

        <motion.circle
          cx="90"
          cy="90"
          r="45"
          stroke="var(--brand-green-light)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: trigger ? offset : circumference,
          }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </svg>

      {/* Animated % */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={trigger ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1 }}
        className="absolute text-4xl font-black"
        style={{ color: "var(--brand-green-light)" }}
      >
        {displayPercentage}%
      </motion.div>
    </div>
  );
}

export default function PlacementStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [visibleCompanies, setVisibleCompanies] = useState<typeof COMPANIES>(
    [],
  );

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayPercentage(Math.round(91 * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [inView]);

  // stagger reveal companies
  useEffect(() => {
    if (inView) {
      setVisibleCompanies([]);
      COMPANIES.forEach((c, i) => {
        setTimeout(() => {
          setVisibleCompanies((prev) => [...prev, c]);
        }, i * 70);
      });
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-28"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Ambient glow (premium) */}
      <div
        className="absolute -z-10"
        style={{
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--brand-green-glow) 0%, transparent 70%)",
          top: "50%",
          left: "-5%",
          transform: "translateY(-50%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-14">
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <CircularProgress
              percentage={91}
              displayPercentage={displayPercentage}
              trigger={inView}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-3xl md:text-4xl font-black leading-tight mb-3"
              style={{ color: "var(--fg-primary)" }}
            >
              91% of our graduates
              <br />
              <span style={{ color: "var(--brand-green-light)" }}>
                are placed at top global brands
              </span>
            </h3>

            <p className="text-lg" style={{ color: "var(--fg-secondary)" }}>
              Direct placements with 400+ hiring partners across Fortune 500
              companies.
            </p>
          </motion.div>
        </div>

        {/* TITLE */}
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center text-xl font-bold mb-2"
          style={{ color: "var(--fg-primary)" }}
        >
          Where your career could take you next
        </motion.h4>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-3xl font-black mb-12"
        >
          <span style={{ color: "var(--brand-green-light)" }}>
            Top teams are actively
          </span>{" "}
          <span style={{ color: "var(--brand-yellow-light)" }}>hiring</span>
        </motion.p>

        {/* COMPANIES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visibleCompanies.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{
                scale: 1.05,
                y: -6,
              }}
              className="rounded-xl p-4 flex flex-col items-center justify-center gap-2"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* subtle floating loop */}
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 2 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-3xl"
              >
                {company.logo}
              </motion.span>

              <span
                className="text-sm font-semibold text-center"
                style={{ color: "var(--fg-primary)" }}
              >
                {company.name}
              </span>

              <span className="text-xs" style={{ color: "var(--fg-muted)" }}>
                {company.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
