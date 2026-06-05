"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, Users, Compass } from "lucide-react";

const PILLARS = [
  {
    icon: Users,
    title: "Industry Mentorship",
    description: "Learn directly from practitioners working at top product and engineering organizations worldwide.",
    color: "#00c4ff",
    glow: "rgba(0, 196, 255, 0.15)",
  },
  {
    icon: BookOpen,
    title: "Outcome-Driven Curriculum",
    description: "Focus on practical, hands-on skills with capstone projects and live case-studies instead of passive lectures.",
    color: "#c8ff00",
    glow: "rgba(200, 255, 0, 0.15)",
  },
  {
    icon: Award,
    title: "Verified Certifications",
    description: "Earn recognizable program completion and specialization credentials to showcase your expertise.",
    color: "#ffe600",
    glow: "rgba(255, 230, 0, 0.15)",
  },
  {
    icon: Compass,
    title: "Career Acceleration",
    description: "Resume reviews, mock interviews, and strategic recruiter referrals to fast-track your next big career step.",
    color: "#ff6b6b",
    glow: "rgba(255, 107, 107, 0.15)",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative isolate overflow-hidden py-14 md:py-28"
      style={{
        background: `
          radial-gradient(circle at 80% 20%, rgba(0, 196, 255, 0.05), transparent 30%),
          radial-gradient(circle at 20% 80%, rgba(200, 255, 0, 0.03), transparent 30%),
          #06040f
        `,
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Heading and Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div
              className="mb-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "#00c4ff" }}
            >
              <span className="h-[1.5px] w-5" style={{ background: "#00c4ff" }} />
              About NobleMan
            </div>
            
            <h2
              className="text-[clamp(2rem,3.5vw,3.2rem)] font-black leading-tight text-[var(--fg-primary)]"
            >
              Bridging the gap between{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #00c4ff 0%, #c8ff00 50%, #ffe600 100%)",
                }}
              >
                aspiration & outcome.
              </span>
            </h2>
            
            <p className="mt-6 text-base md:text-lg leading-[1.8] text-[var(--fg-secondary)]">
              At NobleMan Learning, we believe traditional education is outdated. 
              We build specialized, cohort-based cohort models led by active industry professionals. 
              Our focus is not just teaching, but helping you master skills, build a high-quality portfolio, 
              and stand out in a competitive job market.
            </p>

            <p className="mt-4 text-sm md:text-base leading-[1.7] text-[var(--fg-muted)]">
              Whether you are transitioning to Product Management, AI Engineering, or Software development, 
              our dedicated network of mentors remains with you long after the program ends.
            </p>
          </motion.div>

          {/* Right Column: Pillars Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {PILLARS.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {/* Subtle hover glow backplate */}
                  <div
                    className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 10% 10%, ${pillar.glow}, transparent 50%)`,
                    }}
                  />

                  {/* Icon Frame */}
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: `${pillar.glow}`,
                      border: `1px solid ${pillar.color}40`,
                      color: pillar.color,
                    }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--fg-secondary)]">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
