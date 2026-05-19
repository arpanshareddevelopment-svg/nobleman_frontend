"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";

const TABLE_COLUMNS = [
  { key: "skillxindia", label: "NobleMan", labelClass: "font-bold" },
  { key: "typical", label: "Online Courses", labelClass: "text-[var(--fg-secondary)]" },
  { key: "coaching", label: "Coaching", labelClass: "text-[var(--fg-secondary)]" },
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
    return <X size={20} className="mx-auto text-red-400" />;
  }

  return (
    <span
      className="rounded-full px-3 py-1 text-xs sm:text-sm"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.20))",
        border: "1px solid rgba(255,255,255,0.45)",
        backdropFilter: "blur(16px)",
        color: "var(--fg-secondary)",
      }}
    >
      {value}
    </span>
  );
}

export default function WhyNobleManLearning() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      id="why"
      ref={ref}
      className="relative isolate overflow-hidden py-14 md:py-28"
      style={{
        background: `
          linear-gradient(180deg, #05060a 0%, #070b12 45%, #05070d 100%)
        `,
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(circle at 12% 18%, rgba(46,168,255,0.10), transparent 30%),
            radial-gradient(circle at 88% 82%, rgba(132,255,61,0.08), transparent 32%),
            radial-gradient(circle at 70% 25%, rgba(255,208,64,0.08), transparent 24%)
          `,
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--grid-dot) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, rgba(0,0,0,0.92) 58%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, rgba(0,0,0,0.92) 58%, transparent 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-6xl px-4 sm:px-6">
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center text-[clamp(2.2rem,3.8vw,3.8rem)] font-black leading-tight text-[var(--fg-primary)]"
        >
          Why{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #2ea8ff 0%, #84ff3d 50%, #ffcf33 100%)",
            }}
          >
            NobleMan Learning
          </span>
        </motion.h2>

        {/* DESKTOP TABLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45 }}
          className="hidden overflow-hidden rounded-[2rem] md:block"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="p-5 text-left text-sm font-bold text-[var(--fg-secondary)]">
                  Features
                </th>
                {TABLE_COLUMNS.map((col, idx) => (
                  <th
                    key={col.key}
                    className={`p-5 text-center text-sm ${col.labelClass}`}
                  >
                    {idx === 0 ? (
                      <span
                        className="bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, #2ea8ff 0%, #84ff3d 50%, #ffcf33 100%)",
                        }}
                      >
                        {col.label}
                      </span>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-[var(--border)] transition last:border-0 hover:bg-white/5"
                >
                  <td className="p-5 font-medium text-[var(--fg-primary)]">
                    {row.feature}
                  </td>
                  {TABLE_COLUMNS.map((col) => (
                    <td key={col.key} className="p-5 text-center">
                      <ComparisonCell
                        value={row[col.key as keyof typeof row] as boolean | string}
                      />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* MOBILE */}
        <div className="space-y-4 md:hidden">
          {COMPARISON_DATA.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-[2rem] p-5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <h3 className="mb-5 text-base font-semibold leading-relaxed text-[var(--fg-primary)]">
                {row.feature}
              </h3>
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
                      value={row[col.key as keyof typeof row] as boolean | string}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
