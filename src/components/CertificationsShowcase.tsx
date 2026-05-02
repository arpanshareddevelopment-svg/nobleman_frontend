"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, BookOpen, Briefcase } from "lucide-react";

const CERTIFICATIONS = [
  {
    id: 1,
    type: "Course Completion",
    icon: BookOpen,
    color: "var(--brand-blue-light)",
    title: "Master the Skills",
    description:
      "Earn a professionally designed certificate recognized by 400+ hiring partners.",
  },
  {
    id: 2,
    type: "Project Completion",
    icon: Briefcase,
    color: "var(--brand-green-light)",
    title: "Prove Your Expertise",
    description:
      "Showcase real hands-on projects you've built. Your work speaks louder than words.",
  },
  {
    id: 3,
    type: "Internship",
    icon: Award,
    color: "var(--brand-yellow-light)",
    title: "Real-World Experience",
    description:
      "Gain industry experience with guided projects and placement support.",
  },
];

export default function CertificationsShowcase() {
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
          background: "var(--brand-blue-glow)",
          top: "-10%",
          left: "10%",
        }}
      />
      <div
        className="absolute -z-10 pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)",
          bottom: "-5%",
          right: "15%",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border mb-4"
            style={{
              background: "var(--brand-blue-glow)",
              borderColor: "rgba(59, 130, 246, 0.40)",
              color: "var(--brand-blue-light)",
            }}
          >
            Recognized Credentials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black leading-tight mb-2"
            style={{ color: "var(--fg-primary)" }}
          >
            Credentials that matter
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--fg-secondary)" }}
          >
            Every certificate validates real skills. From completion to
            internships, we certify capability—not just participation.
          </motion.p>
        </div>

        {/* Certifications grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid var(--border)`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10"
                  style={{
                    background: `linear-gradient(135deg, ${cert.color}, transparent)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${cert.color}15`,
                    color: cert.color,
                  }}
                >
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <div
                    className="text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: cert.color }}
                  >
                    {cert.type}
                  </div>
                  <h3
                    className="text-xl font-black leading-tight mb-2"
                    style={{ color: "var(--fg-primary)" }}
                  >
                    {cert.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--fg-secondary)" }}
                >
                  {cert.description}
                </p>

                {/* Accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${cert.color}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg mb-6" style={{ color: "var(--fg-secondary)" }}>
            12,000+ certificates issued • 92% career growth • 400+ hiring
            partners trust our credentials
          </p>
          <button
            className="px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-blue-light), var(--brand-blue-dark))",
              boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
            }}
          >
            View Programs →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
