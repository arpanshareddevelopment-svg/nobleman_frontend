"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Award, BookOpen, Briefcase } from "lucide-react";

const CERTIFICATIONS = [
  {
    id: 1,
    type: "Course Completion Certificate",
    icon: BookOpen,
    color: "var(--brand-blue-light)",
    title: "Master the Skills",
    description:
      "Earn a professionally designed certificate recognized by 400+ hiring partners.",
  },
  {
    id: 2,
    type: "Project Completion Certificate",
    icon: Briefcase,
    color: "var(--brand-green-light)",
    title: "Prove Your Expertise",
    description:
      "Showcase real hands-on projects you've built. Your work speaks louder than words.",
  },
  {
    id: 3,
    type: "Internship Completion Certificate",
    icon: Award,
    color: "var(--brand-yellow-light)",
    title: "Real-World Experience",
    description:
      "Gain industry experience with guided projects and placement support.",
  },
];

function useThemeMode() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();
    setMounted(true);
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return { isDark, mounted };
}

export default function CertificationsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const { isDark, mounted } = useThemeMode();

  // Early return placeholder to prevent hydration mismatch
  if (!mounted) {
    return (
      <section
        id="certifications"
        ref={ref}
        className="relative w-full overflow-hidden py-12 md:py-28"
        style={{
          background:
            "linear-gradient(155deg, #f8fbff 0%, #eef4ff 45%, #ffffff 100%)",
        }}
      >
        {/* Placeholder - invisible until hydrated */}
      </section>
    );
  }

  return (
    <section
      id="certifications"
      ref={ref}
      className="relative w-full overflow-hidden py-12 md:py-28"
      style={{
        background: isDark
          ? "linear-gradient(155deg, #010b27ff 0%, #00090489 45%, #000000 100%)"
          : `
  radial-gradient(circle at 15% 20%, rgba(46,168,255,0.12), transparent 28%),
  radial-gradient(circle at 85% 75%, rgba(255,208,64,0.10), transparent 30%),
  radial-gradient(circle at 50% 50%, rgba(132,255,61,0.08), transparent 38%),
  linear-gradient(
    155deg,
    #f8fbff 0%,
    #eef5ff 35%,
    #edf7f1 100%
  )
`,
      }}
    >
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--fg-muted) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: isDark ? 0.08 : 0.06,
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none blur-3xl"
        style={{
          background: `
            radial-gradient(circle at 15% 25%, var(--brand-blue-glow), transparent 40%),
            radial-gradient(circle at 85% 75%, var(--brand-yellow-glow), transparent 45%),
            radial-gradient(circle at 50% 50%, var(--brand-green-glow), transparent 55%)
          `,
          opacity: isDark ? 1 : 0.72,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="inline-flex mb-6 px-4 py-1 rounded-full font-medium text-white transition-all duration-200 hover:-translate-y-2 hover:scale-[1.02] active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-blue-light), var(--brand-blue-dark))",
              boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
            }}
          >
            Recognized Credentials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[clamp(2.2rem,3.8vw,3.8rem)] font-black leading-tight mb-2"
            style={{ color: "var(--fg-primary)" }}
          >
            Credentials that{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(135deg, #2ea8ff 0%, #84ff3d 50%, #ffcf33 100%)"
                  : "linear-gradient(135deg, #1da1ff 0%, #32d74b 50%, #ffb000 100%)",
              }}
            >
              matter
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: isDark
                    ? `
      linear-gradient(
        135deg,
        rgba(255,255,255,0.06) 0%,
        rgba(255,255,255,0.03) 100%
      )
    `
                    : `
      linear-gradient(
        135deg,
        rgba(255,255,255,0.34) 0%,
        rgba(255,255,255,0.16) 42%,
        rgba(240,248,255,0.12) 100%
      )
    `,

                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",

                  border: isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(255,255,255,0.42)",

                  boxShadow: isDark
                    ? `
      0 10px 40px rgba(0,0,0,0.35),
      inset 0 1px 0 rgba(255,255,255,0.08)
    `
                    : `
      0 12px 40px rgba(120,140,180,0.12),
      0 2px 8px rgba(0,0,0,0.05),
      inset 0 1px 0 rgba(255,255,255,0.75)
    `,
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${cert.color}18, transparent 65%)`,
                  }}
                />
                <div className="flex gap-2 items-center">
                  {" "}
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center  transition-all duration-300 group-hover:scale-110 "
                    style={{
                      background: `${cert.color}15`,
                      color: cert.color,
                    }}
                  >
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  {/* Content */}
                  <div className="">
                    <div
                      className="text-xs font-bold tracking-widest uppercase  bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          cert.id === 1
                            ? isDark
                              ? "var(--blue-gradient-dark)"
                              : "var(--blue-gradient-light)"
                            : cert.id === 2
                              ? isDark
                                ? "var(--green-gradient-dark)"
                                : "var(--green-gradient-light)"
                              : isDark
                                ? "var(--yellow-gradient-dark)"
                                : "var(--yellow-gradient-light)",

                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                      }}
                    >
                      {cert.type}
                    </div>
                  </div>
                </div>
                <h3
                  className="text-xl font-black leading-tight mb-2"
                  style={{ color: "var(--fg-primary)" }}
                >
                  {cert.title}
                </h3>
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
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg mb-6" style={{ color: "var(--fg-secondary)" }}>
            12,000+ certificates issued • 92% career growth • 400+ hiring
            partners trust our credentials
          </p>
          <button
            className="px-8 py-3 rounded-full font-bold text-white transition-all duration-200 hover:-translate-y-2 hover:scale-[1.02] active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-blue-light), var(--brand-blue-dark))",
              boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
            }}
          >
            View Programs
          </button>
        </motion.div>
      </div>
    </section>
  );
}
