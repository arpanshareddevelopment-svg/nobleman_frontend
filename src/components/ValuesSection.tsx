"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Radio, MessageCircle, Zap, Users } from "lucide-react";

const VALUES = [
  {
    id: 1,
    icon: Radio,
    title: "Live interactive sessions",
    description:
      "Get valuable industry insights from your instructors who have dedicated years of learning and experience.",
    color: "var(--brand-orange-light)",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Dedicated sessions to solve queries",
    description:
      "We offer doubt-solving sessions with mentors to help you stay on track with each course topic.",
    color: "var(--brand-green-light)",
  },
  {
    id: 3,
    icon: Zap,
    title: "Hands-on projects to apply learning",
    description:
      "Our programs prioritize hands-on learning. Build real projects at the end of each module to reinforce each topic.",
    color: "var(--brand-blue-light)",
  },
  {
    id: 4,
    icon: Users,
    title: "Active community to help you grow",
    description:
      "Our programs offer a college-like learning experience with a supportive community of like-minded individuals.",
    color: "var(--brand-purple-light)",
  },
];

export default function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-28"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Ambient glows */}
      <div
        className="absolute -z-10 pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "var(--brand-orange-glow)",
          top: "10%",
          left: "-5%",
        }}
      />
      <div
        className="absolute -z-10 pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "var(--brand-blue-glow)",
          bottom: "-10%",
          right: "5%",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-14">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black text-center mb-16"
          style={{ color: "var(--fg-primary)" }}
        >
          Presenting the{" "}
          <span style={{ color: "var(--brand-green-light)" }}>
            SkillsXIndia
          </span>{" "}
          way!
        </motion.h2>

        {/* Values grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl p-6 hover:scale-105 transition-all duration-300 relative overflow-hidden"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Icon background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{ background: value.color }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${value.color}15`,
                    color: value.color,
                  }}
                >
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3
                  className="font-bold text-lg mb-2 leading-tight"
                  style={{ color: "var(--fg-primary)" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--fg-secondary)" }}
                >
                  {value.description}
                </p>

                {/* Accent bottom line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: value.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
