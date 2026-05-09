"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";

const TABLE_COLUMNS = [
  {
    key: "skillxindia",
    label: "NobleMan",
    labelClass:
      "text-[var(--brand-blue-light)] font-bold dark:text-[var(--brand-blue-light)]",
  },
  {
    key: "typical",
    label: "Online Courses",
    labelClass: "text-[var(--fg-secondary)]",
  },
  {
    key: "coaching",
    label: "Coaching",
    labelClass: "text-[var(--fg-secondary)]",
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
      <Check size={20} className="mx-auto text-[var(--brand-green-dark)]" />
    );
  }
  if (value === false) {
    return <X size={20} className="mx-auto text-red-500 dark:text-red-400" />;
  }
  return (
    <span className="rounded-full border border-[var(--border)] bg-black/5 px-3 py-0.5 text-xs text-[var(--fg-secondary)] dark:bg-white/10 sm:text-sm">
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
        className="absolute inset-0 -z-10 opacity-40 dark:opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 200, 0, 0.3) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* GLOW BLOBS */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 18% 20%, rgba(255, 220, 80, 0.08), transparent 25%),
            radial-gradient(circle at 75% 70%, rgba(255,165,0,0.10), transparent 42%)
          `,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center text-3xl font-black leading-tight text-[var(--fg-primary)] sm:text-4xl md:mb-16 md:text-5xl"
        >
          Why{" "}
          <span className="text-amber-500 dark:text-[var(--brand-yellow-light)]">
            NobleMan Learning
          </span>
        </motion.h2>

        {/* ───────────────── DESKTOP TABLE ───────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.45 }}
          className="hidden overflow-hidden rounded-2xl md:block"
          style={{
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
          }}
        >
          <table className="w-full">
            <thead>
              <tr
                className="border-b border-[var(--border)]"
                style={{ background: "var(--bg-card)" }}
              >
                <th className="p-5 text-left text-sm font-bold text-[var(--fg-secondary)]">
                  Features
                </th>
                {TABLE_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={`p-5 text-center text-sm ${col.labelClass}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {COMPARISON_DATA.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-[var(--border)] transition last:border-0 hover:bg-black/[0.03] dark:hover:bg-white/5"
                >
                  <td className="p-5 font-medium text-[var(--fg-primary)]">
                    {row.feature}
                  </td>
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
              className="rounded-2xl p-5"
              style={{
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
              }}
            >
              {/* FEATURE */}
              <h3 className="mb-5 text-base font-semibold leading-relaxed text-[var(--fg-primary)]">
                {row.feature}
              </h3>

              {/* VALUES */}
              <div className="space-y-4">
                {TABLE_COLUMNS.map((col) => (
                  <div
                    key={col.key}
                    className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-3 last:border-0 last:pb-0"
                  >
                    <span className={`text-sm ${col.labelClass}`}>
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
          <button className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-white transition hover:scale-105 hover:bg-amber-600 dark:bg-[var(--brand-yellow-light)] dark:text-black dark:hover:bg-[var(--brand-yellow)] sm:px-8">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}
