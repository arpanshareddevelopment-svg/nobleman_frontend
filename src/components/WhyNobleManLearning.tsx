"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";

const TABLE_COLUMNS = [
  {
    key: "skillxindia",
    label: "NobleMan",
    className: "text-[var(--brand-blue-light)] font-bold",
  },
  {
    key: "typical",
    label: "Online Courses",
    className: "text-white/60",
  },
  {
    key: "coaching",
    label: "Coaching",
    className: "text-white/60",
  },
];

const COMPARISON_DATA = [
  {
    feature: "Live instructor-led classes",
    skillxindia: true,
    typical: false,
    coaching: true,
  },
  {
    feature: "Courses start from ₹999",
    skillxindia: true,
    typical: "₹5k – ₹80k",
    coaching: true,
  },
  {
    feature: "Industry mentor + real projects",
    skillxindia: true,
    typical: false,
    coaching: "Partial",
  },
  {
    feature: "Placement assistance & referrals",
    skillxindia: true,
    typical: false,
    coaching: "Limited",
  },
  {
    feature: "Free demo before paying",
    skillxindia: true,
    typical: "Sometimes",
    coaching: false,
  },
];

function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <Check size={20} className="mx-auto text-[var(--brand-green-light)]" />
    );
  }

  if (value === false) {
    return <X size={20} className="mx-auto text-red-400" />;
  }

  return (
    <span className="text-xs sm:text-sm text-[var(--fg-secondary)]">
      {value}
    </span>
  );
}

export default function WhyNobleManLearning() {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="why"
      ref={ref}
      className="relative isolate overflow-hidden py-14 md:py-28"
    >
      {/* DOT PATTERN */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.6]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 235, 120, 0.26) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* GLOW BLOBS */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 18% 20%, rgba(255, 220, 80, 0.15), transparent 25%),
            radial-gradient(circle at 75% 70%, rgba(255,165,0,0.18), transparent 42%)
          `,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center text-3xl sm:text-4xl md:mb-16 md:text-5xl font-black leading-tight text-white"
        >
          Why{" "}
          <span className="text-[var(--brand-yellow-light)]">
            NobleMan Learning
          </span>
        </motion.h2>

        {/* ───────────────── DESKTOP TABLE ───────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.45 }}
          className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl md:block"
        >
          <table className="w-full">
            {/* HEADER */}
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-5 text-left text-sm font-bold text-white">
                  Features
                </th>

                {TABLE_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={`p-5 text-center text-sm ${col.className}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {COMPARISON_DATA.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 transition hover:bg-white/5"
                >
                  <td className="p-5 font-medium text-white">{row.feature}</td>

                  {TABLE_COLUMNS.map((col) => (
                    <td key={col.key} className="p-5 text-center">
                      <ComparisonCell
                        value={
                          row[col.key as keyof typeof row] as boolean | string
                        }
                      />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* ───────────────── MOBILE CARDS ───────────────── */}
        <div className="space-y-4 md:hidden">
          {COMPARISON_DATA.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            >
              {/* FEATURE */}
              <h3 className="mb-5 text-base font-semibold leading-relaxed text-white">
                {row.feature}
              </h3>

              {/* VALUES */}
              <div className="space-y-4">
                {TABLE_COLUMNS.map((col) => (
                  <div
                    key={col.key}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className={`text-sm ${col.className}`}>
                      {col.label}
                    </span>

                    <ComparisonCell
                      value={
                        row[col.key as keyof typeof row] as boolean | string
                      }
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mt-12 text-center md:mt-14"
        >
          <button className="rounded-xl bg-[var(--brand-yellow-light)] px-6 py-3 text-sm font-bold text-black transition hover:scale-105 sm:px-8">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}
