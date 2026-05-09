"use client";

import { motion } from "framer-motion";
import { Radio, MessageCircle, Zap, Users } from "lucide-react";
import { useEffect, useState } from "react";

const VALUES = [
  {
    id: 1,
    icon: Radio,
    title: "Live interactive sessions",
    description:
      "Learn directly from industry experts with real-world experience.",
    color: "var(--brand-blue-light)",
    glow: "var(--brand-blue-glow)",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Dedicated doubt solving",
    description: "Stay on track with focused mentor sessions for every topic.",
    color: "var(--brand-green-light)",
    glow: "var(--brand-green-glow)",
  },
  {
    id: 3,
    icon: Zap,
    title: "Hands-on project learning",
    description:
      "Build real-world projects to reinforce every concept you learn.",
    color: "var(--brand-yellow-light)",
    glow: "var(--brand-yellow-glow)",
  },
  {
    id: 4,
    icon: Users,
    title: "Community-driven growth",
    description: "Grow with a strong peer network and collaborative learning.",
    color: "var(--brand-blue)",
    glow: "var(--brand-blue-glow)",
  },
];

/* 🔥 SSR-safe theme hook */
function useThemeMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      setIsDark(root.classList.contains("dark"));
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

export default function ValuesSection() {
  const isDark = useThemeMode();

  return (
    <section
      id="values"
      className="relative isolate overflow-hidden py-12 md:py-28"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #000000 0%, #030712 40%, #020617 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f8fbff 40%, #eef4ff 100%)",
      }}
    >
      {/* ── seamless blend from MissionStatement above ── */}
      <div
        className="absolute inset-x-0 top-0 h-40 -z-10 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)"
            : "linear-gradient(to bottom, rgba(248,251,255,1), transparent)",
        }}
      />

      {/* GRID BG */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `
            linear-gradient(var(--fg-muted) 1px, transparent 1px),
            linear-gradient(90deg, var(--fg-muted) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: isDark ? 0.08 : 0.12,
        }}
      />

      {/* GLOW */}
      <div
        className="absolute inset-0 top-10 -z-10 blur-3xl"
        style={{
          background: `
            radial-gradient(circle at 50% 30%, var(--brand-green-glow), transparent 40%),
            radial-gradient(circle at 80% 80%, var(--brand-blue-glow), transparent 50%)
          `,
          opacity: isDark ? 0.9 : 0.85,
        }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10 xl:px-14">
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="text-center font-black leading-[1.05] tracking-tight text-[clamp(2.2rem,3.8vw,3.8rem)] text-[color:var(--fg-primary)]"
        >
          Presenting the{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(120deg, var(--brand-green-light), var(--brand-green-dark))",
            }}
          >
            Nobleman Learning
          </span>{" "}
          way
        </motion.h2>

        {/*  CARDS */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[1.5rem] border p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: isDark
                    ? `
      linear-gradient(
        135deg,
        rgba(255,255,255,0.07) 0%,
        rgba(255,255,255,0.03) 100%
      )
    `
                    : `
      linear-gradient(
        135deg,
        rgba(255,255,255,0.38) 0%,
        rgba(255,255,255,0.18) 42%,
        rgba(240,248,255,0.14) 100%
      )
    `,

                  border: isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(255,255,255,0.45)",

                  boxShadow: isDark
                    ? `
      0 12px 40px rgba(0,0,0,0.35),
      inset 0 1px 0 rgba(255,255,255,0.08)
    `
                    : `
      0 12px 40px rgba(120,140,180,0.14),
      0 2px 10px rgba(0,0,0,0.05),
      inset 0 1px 0 rgba(255,255,255,0.75)
    `,

                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                }}
              >
                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-[1.5rem] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, ${value.glow}, transparent 70%)`,
                  }}
                />
                <div className="flex gap-3 ">
                  {/* Icon */}
                  <div
                    className="relative z-10  flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${value.color}20`,
                      color: value.color,
                    }}
                  >
                    <Icon size={26} strokeWidth={1.6} />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 font-bold text-lg text-[color:var(--fg-primary)]">
                    {value.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="relative z-10 mt-2 text-sm text-[color:var(--fg-secondary)]">
                  {value.description}
                </p>

                {/* Bottom line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
                  style={{
                    background: `linear-gradient(90deg, ${value.color}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
