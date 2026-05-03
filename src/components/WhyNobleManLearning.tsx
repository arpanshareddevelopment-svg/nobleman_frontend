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
  if (value === true)
    return (
      <Check size={20} className="text-[var(--brand-green-light)] mx-auto" />
    );

  if (value === false) return <X size={20} className="text-red-400 mx-auto" />;

  return <span className="text-sm text-[var(--fg-secondary)]">{value}</span>;
}

export default function WhyNobleManLearning() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative isolate py-28 overflow-hidden">
      {/* DOT PATTERN — same as Hero */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.6]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 235, 120, 0.26) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* GLOW BLOBS — same as Hero */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at 18% 20%, rgba(255, 220, 80, 0.15), transparent 25%),
                   radial-gradient(circle at 75% 70%, rgba(255,165,0,0.18), transparent 42%)`,
        }}
      />

      {/* rest of your JSX... */}
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center text-4xl md:text-5xl font-black mb-16 text-white"
        >
          Why{" "}
          <span className="text-[var(--brand-yellow-light)]">
            NobleMan Learning
          </span>
        </motion.h2>

        {/* 🔥 TABLE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          className="rounded-2xl border backdrop-blur-2xl overflow-hidden
          bg-white/5 border-white/10"
        >
          <table className="w-full">
            {/* HEADER */}
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-5 text-left text-sm text-white font-bold">
                  Features
                </th>
                <th className="p-5 text-center text-sm text-[var(--brand-blue-light)] font-bold">
                  NobleMan
                </th>
                <th className="p-5 text-center text-sm text-white/60">
                  Online Courses
                </th>
                <th className="p-5 text-center text-sm text-white/60">
                  Coaching
                </th>
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
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-5 text-white font-medium">{row.feature}</td>

                  <td className="p-5 text-center">
                    <ComparisonCell value={row.skillxindia} />
                  </td>

                  <td className="p-5 text-center">
                    <ComparisonCell value={row.typical} />
                  </td>

                  <td className="p-5 text-center">
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
          className="text-center mt-14"
        >
          <button
            className="px-8 py-3 rounded-xl font-bold text-black 
            bg-[var(--brand-yellow-light)] hover:scale-105 transition"
          >
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}
