"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Desai",
    role: "Data Analyst at Amazon",
    rating: 5,
    text: "The live classes were game-changing. My mentor helped me land my dream job in just 3 months!",
  },
  {
    id: 2,
    name: "Arjun Kumar",
    role: "Full-Stack Engineer at Microsoft",
    rating: 5,
    text: "Best investment I made. Real projects, real mentors, real results. The placement support is unbeatable.",
  },
  {
    id: 3,
    name: "Sophia Patel",
    role: "Product Manager at Google",
    rating: 5,
    text: "From zero experience to PM at Google in 4 months. The curriculum is industry-aligned and practical.",
  },
  {
    id: 4,
    name: "Rahul Singh",
    role: "ML Engineer at Deepmind",
    rating: 5,
    text: "The AI/ML course is comprehensive. Learned cutting-edge techniques from researchers. Highly recommended!",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      setIsDark(root.classList.contains("dark"));
    };

    update();
    setMounted(true);

    const observer = new MutationObserver(update);

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Early return placeholder to prevent hydration mismatch
  if (!mounted) {
    return (
      <section
        id="testimonials"
        ref={ref}
        className="relative overflow-hidden isolate py-14 md:py-28"
        style={{
          background:
            "linear-gradient(160deg, #f8fbff 0%, #f4f8ff 35%, #ffffff 100%)",
        }}
      >
        {/* Placeholder - invisible until hydrated */}
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative overflow-hidden isolate py-14 md:py-28"
    >
      {/* MAIN BG */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: isDark
            ? `
              linear-gradient(
                160deg,
                #06040f 0%,
                #071220 45%,
                #080e1a 75%,
                #060a12 100%
              )
            `
            : `
              linear-gradient(
                160deg,
                #f8fbff 0%,
                #f4f8ff 35%,
                #ffffff 100%
              )
            `,
        }}
      />

      {/* LIGHT THEME PREMIUM BLOBS */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          filter: isDark ? "blur(90px)" : "blur(110px)",
          opacity: isDark ? 1 : 0.95,
          background: isDark
            ? `
              radial-gradient(
                ellipse 55% 45% at 12% 18%,
                rgba(255,230,0,0.16) 0%,
                transparent 60%
              ),

              radial-gradient(
                ellipse 50% 40% at 88% 22%,
                rgba(0,196,255,0.12) 0%,
                transparent 58%
              ),

              radial-gradient(
                ellipse 45% 50% at 50% 88%,
                rgba(160,255,0,0.07) 0%,
                transparent 55%
              )
            `
            : `
              radial-gradient(
                ellipse 50% 45% at 10% 15%,
                rgba(255,230,0,0.18) 0%,
                transparent 58%
              ),

              radial-gradient(
                ellipse 50% 40% at 90% 18%,
                rgba(0,196,255,0.14) 0%,
                transparent 56%
              ),

              radial-gradient(
                ellipse 40% 45% at 50% 85%,
                rgba(200,255,0,0.12) 0%,
                transparent 54%
              )
            `,
        }}
      />

      {/* GRID GLOW */}
      {!isDark && (
        <div
          className="absolute inset-0 z-[1] opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      )}

      <div className="relative z-[2] mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-20 text-center"
        >
          <h2
            className="text-[clamp(2.2rem,3.8vw,3.8rem)] font-black mb-5"
            style={{
              color: isDark ? "white" : "#0f172a",
            }}
          >
            Loved by{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #00c4ff 0%, #5fdfff 40%, #c8ff00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              12,000+ learners
            </span>
          </h2>

          <p
            className="max-w-2xl mx-auto text-base md:text-lg"
            style={{
              color: isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.65)",
            }}
          >
            Real stories from people who actually changed their careers.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{
                y: -6,
              }}
              className="group relative overflow-hidden rounded-3xl p-8 transition-all duration-500"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.72)",

                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(15,23,42,0.08)",

                backdropFilter: "blur(18px)",

                boxShadow: isDark
                  ? "0 10px 30px rgba(0,0,0,0.28)"
                  : `
                    0 10px 40px rgba(15,23,42,0.06),
                    0 2px 12px rgba(15,23,42,0.04)
                  `,
              }}
            >
              {/* TOP GLOW */}
              <div
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #00c4ff, #c8ff00, transparent)",
                  opacity: isDark ? 0.6 : 0.9,
                }}
              />

              {/* QUOTE */}
              <span
                className="absolute top-4 right-6 text-7xl font-serif pointer-events-none"
                style={{
                  color: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(15,23,42,0.06)",
                }}
              >
                “
              </span>

              {/* TEXT */}
              <p
                className="relative text-lg leading-relaxed mb-7"
                style={{
                  color: isDark ? "white" : "#0f172a",
                }}
              >
                {t.text}
              </p>

              {/* STARS */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={17}
                    fill="var(--brand-yellow)"
                    className="text-[var(--brand-yellow)]"
                  />
                ))}
              </div>

              {/* USER */}
              <div>
                <p
                  className="font-bold text-lg"
                  style={{
                    color: isDark ? "white" : "#0f172a",
                  }}
                >
                  {t.name}
                </p>

                <p
                  className="text-sm"
                  style={{
                    color: isDark
                      ? "rgba(255,255,255,0.5)"
                      : "rgba(15,23,42,0.5)",
                  }}
                >
                  {t.role}
                </p>
              </div>

              {/* HOVER ORB */}
              <div
                className="absolute -bottom-20 -right-20 w-52 h-52 rounded-full transition-all duration-500 group-hover:scale-110"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, rgba(0,196,255,0.08), transparent 70%)"
                    : "radial-gradient(circle, rgba(0,196,255,0.10), transparent 70%)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
