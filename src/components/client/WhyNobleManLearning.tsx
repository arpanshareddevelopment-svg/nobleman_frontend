"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Star } from "lucide-react";

const TABLE_COLUMNS = [
  { key: "nobleman", label: "Nobleman Learning", highlight: true },
  { key: "online", label: "Online Courses", highlight: false },
  { key: "coaching", label: "Coaching Centres", highlight: false },
];

const COMPARISON_DATA = [
  {
    feature: "Live instructor-led classes",
    exclusive: false,
    nobleman: true,
    online: false,
    coaching: true,
  },
  {
    feature: "Real industry projects + 1:1 mentor",
    exclusive: false,
    nobleman: true,
    online: false,
    coaching: "Partial",
  },
  {
    feature: "Physical certificate on request",
    exclusive: true,
    nobleman: true,
    online: false,
    coaching: false,
  },
  {
    feature: "Detailed project certificate",
    exclusive: true,
    nobleman: true,
    online: false,
    coaching: false,
  },
  {
    feature: "Interview & operational-round prep",
    exclusive: true,
    nobleman: true,
    online: false,
    coaching: "Partial",
  },
  {
    feature: "Support continues after you finish",
    exclusive: true,
    nobleman: true,
    online: false,
    coaching: false,
  },
  {
    feature: "Placement assistance & recruiter referrals",
    exclusive: false,
    nobleman: true,
    online: false,
    coaching: "Limited",
  },
  {
    feature: "Internship support",
    exclusive: false,
    nobleman: true,
    online: false,
    coaching: "Limited",
  },
  {
    feature: "Free demo before you pay",
    exclusive: false,
    nobleman: true,
    online: "Sometimes",
    coaching: false,
  },
  {
    feature: "Lifetime platform access",
    exclusive: false,
    nobleman: true,
    online: "Sometimes",
    coaching: false,
  },
];

function ComparisonCell({
  value,
  isHighlight,
}: {
  value: boolean | string;
  isHighlight: boolean;
}) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <Check
          size={20}
          strokeWidth={2.5}
          style={{ color: isHighlight ? "#84ff3d" : "#84ff3d" }}
        />
      </div>
    );
  }

  if (value === false) {
    return (
      <div className="flex justify-center">
        <X size={18} strokeWidth={2.5} style={{ color: "#ff4d4d" }} />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <span
        className="rounded-full px-3 py-[3px] text-[11px] font-medium"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.14)",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {value}
      </span>
    </div>
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
      style={{ background: "#08090c" }}
    >
      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45 }}
          className="mb-12 text-center"
        >
          <div
            className="mb-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#84ff3d" }}
          >
            <span className="h-[1.5px] w-5" style={{ background: "#84ff3d" }} />
            Why Choose Us
            <span className="h-[1.5px] w-5" style={{ background: "#84ff3d" }} />
          </div>
          <h2
            className="text-[clamp(2.2rem,3.8vw,3.8rem)] font-black leading-tight"
            style={{ color: "var(--fg-primary, #f0f6ff)" }}
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
          </h2>
        </motion.div>

        {/* ── DESKTOP TABLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="hidden overflow-hidden rounded-2xl md:block"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {/* Features label */}
                <th
                  className="p-5 text-left text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "rgba(255,255,255,0.35)", width: "36%" }}
                >
                  Features
                </th>

                {TABLE_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="p-5 text-center text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{
                      width: "21.3%",
                      background: col.highlight
                        ? "rgba(132,255,61,0.06)"
                        : "transparent",
                      borderLeft: col.highlight
                        ? "1px solid rgba(132,255,61,0.18)"
                        : "1px solid rgba(255,255,255,0.06)",
                      borderRight: col.highlight
                        ? "1px solid rgba(132,255,61,0.18)"
                        : "none",
                      color: col.highlight
                        ? "#84ff3d"
                        : "rgba(255,255,255,0.4)",
                    }}
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
                  initial={{ opacity: 0, x: -8 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }
                  }
                  transition={{ delay: 0.1 + i * 0.04 }}
                  className="group transition-colors duration-150"
                  style={{
                    borderBottom:
                      i < COMPARISON_DATA.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                  }}
                >
                  {/* Feature label */}
                  <td className="p-5">
                    <div className="flex items-center gap-2.5">
                      {row.exclusive && (
                        <Star
                          size={13}
                          fill="#ffcf33"
                          stroke="none"
                          style={{ flexShrink: 0 }}
                        />
                      )}
                      <span
                        className="text-[0.9rem] font-medium leading-snug"
                        style={{
                          color: row.exclusive
                            ? "var(--fg-primary, #f0f6ff)"
                            : "rgba(255,255,255,0.75)",
                          fontWeight: row.exclusive ? 700 : 500,
                        }}
                      >
                        {row.feature}
                      </span>
                      {row.exclusive && (
                        <span
                          className="ml-1 rounded-full px-2.5 py-[3px] text-[9px] font-bold uppercase tracking-[0.12em]"
                          style={{
                            background: "rgba(255,207,51,0.12)",
                            border: "1px solid rgba(255,207,51,0.35)",
                            color: "#ffcf33",
                          }}
                        >
                          Only at Nobleman
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Nobleman column */}
                  <td
                    className="p-5 transition-colors duration-150 group-hover:bg-[rgba(132,255,61,0.05)]"
                    style={{
                      background: "rgba(132,255,61,0.04)",
                      borderLeft: "1px solid rgba(132,255,61,0.18)",
                      borderRight: "1px solid rgba(132,255,61,0.18)",
                    }}
                  >
                    <ComparisonCell value={row.nobleman} isHighlight={true} />
                  </td>

                  {/* Online courses */}
                  <td
                    className="p-5 transition-colors duration-150 group-hover:bg-white/[0.02]"
                    style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <ComparisonCell value={row.online} isHighlight={false} />
                  </td>

                  {/* Coaching centres */}
                  <td className="p-5 transition-colors duration-150 group-hover:bg-white/[0.02]">
                    <ComparisonCell value={row.coaching} isHighlight={false} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Footer bar */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.015)",
            }}
          >
            <div className="flex items-center gap-2">
              <Star size={12} fill="#ffcf33" stroke="none" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "#ffcf33" }}
              >
                Exclusive to Nobleman Learning
              </span>
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              The teaching of a classroom · the flexibility of online · the
              outcomes nobody else commits to
            </p>
          </div>
        </motion.div>

        {/* ── MOBILE CARDS ── */}
        <div className="space-y-3 md:hidden">
          {COMPARISON_DATA.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Feature name */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                {row.exclusive && (
                  <Star size={12} fill="#ffcf33" stroke="none" />
                )}
                <span
                  className="text-sm font-semibold leading-snug"
                  style={{ color: "var(--fg-primary, #f0f6ff)" }}
                >
                  {row.feature}
                </span>
                {row.exclusive && (
                  <span
                    className="ml-auto rounded-full px-2 py-[2px] text-[9px] font-bold uppercase tracking-[0.1em]"
                    style={{
                      background: "rgba(255,207,51,0.12)",
                      border: "1px solid rgba(255,207,51,0.3)",
                      color: "#ffcf33",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Only at Nobleman
                  </span>
                )}
              </div>

              {/* Columns */}
              <div className="divide-y divide-white/[0.06]">
                {TABLE_COLUMNS.map((col) => (
                  <div
                    key={col.key}
                    className="flex items-center justify-between px-4 py-3"
                    style={{
                      background: col.highlight
                        ? "rgba(132,255,61,0.04)"
                        : "transparent",
                    }}
                  >
                    <span
                      className="text-[11px] font-medium uppercase tracking-[0.1em]"
                      style={{
                        color: col.highlight
                          ? "#84ff3d"
                          : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {col.label}
                    </span>
                    <ComparisonCell
                      value={
                        row[col.key as keyof typeof row] as boolean | string
                      }
                      isHighlight={col.highlight}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Mobile footer */}
          <p
            className="pt-2 text-center text-[11px]"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            The teaching of a classroom · the flexibility of online · the
            outcomes nobody else commits to
          </p>
        </div>
      </div>
    </section>
  );
}
