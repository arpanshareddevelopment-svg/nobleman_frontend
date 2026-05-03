"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";

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
    typical: "Varies (₹5k-₹80k)",
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

function ComparisonCell({
  value,
  type = "text",
}: {
  value: boolean | string;
  type?: "text" | "check";
}) {
  if (type === "check") {
    if (value === true)
      return (
        <div className="flex justify-center">
          <Check size={24} style={{ color: "var(--brand-green-light)" }} />
        </div>
      );
    if (value === false)
      return (
        <div className="flex justify-center">
          <X size={24} style={{ color: "var(--color-error)" }} />
        </div>
      );
  }

  return (
    <span
      className="text-sm"
      style={{
        color:
          value === true
            ? "var(--brand-green-light)"
            : value === false
              ? "var(--color-error)"
              : "var(--fg-secondary)",
      }}
    >
      {value === true ? "✓" : value === false ? "✗" : value}
    </span>
  );
}

export default function WhyNobleManLearning() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-28"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -z-10 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          bottom: "-10%",
          right: "10%",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-14">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-4xl md:text-5xl font-black mb-16"
          style={{ color: "var(--fg-primary)" }}
        >
          Why{" "}
          <span style={{ color: "var(--brand-green-light)" }}>
            NobleMan Learning
          </span>
          ?
        </motion.h2>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-2xl border"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <table className="w-full">
            <thead>
              <tr
                style={{
                  background: "var(--fg-primary)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <th className="p-6 text-left">
                  <span className="font-black text-white">
                    NobleMan Learning
                  </span>
                </th>
                <th className="p-6 text-center">
                  <span className="font-bold text-gray-400">
                    Typical Online Courses
                  </span>
                </th>
                <th className="p-6 text-center">
                  <span className="font-bold text-gray-400">
                    Coaching Institutes
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    background:
                      i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.02)",
                  }}
                >
                  <td className="p-6">
                    <span
                      className="font-semibold"
                      style={{ color: "var(--fg-primary)" }}
                    >
                      {row.feature}
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    <ComparisonCell value={row.skillxindia} type="check" />
                  </td>
                  <td className="p-6 text-center">
                    <ComparisonCell value={row.typical} />
                  </td>
                  <td className="p-6 text-center">
                    <ComparisonCell value={row.coaching} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            className="px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-green-light), var(--brand-green-dark))",
              boxShadow: "0 8px 24px rgba(34,197,94,0.4)",
            }}
          >
            Start Your Journey →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
