"use client";
import { useRef } from "react";
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
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" ref={ref} className="relative py-12 md:py-28 overflow-hidden isolate">
      {/* BASE GRADIENT */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(160deg, #020617 0%, #07142a 40%, #000000 100%)",
        }}
      />

    

      {/* FLOATING BLOBS — yellow · blue · green */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          filter: "blur(80px)",
          background: `
            radial-gradient(ellipse 55% 45% at 12% 18%,  rgba(255,230,0,0.16)   0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 88% 22%,  rgba(0,196,255,0.1)   0%, transparent 58%),
            radial-gradient(ellipse 45% 50% at 50% 88%,  rgba(160,255,0,0.05)   0%, transparent 55%)
          `,
        }}
      />

      <div className="relative z-[2] max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Loved by{" "}
            <span className="text-[var(--brand-blue-light)]">
              12,000+ learners
            </span>
          </h2>
          <p className="text-white/60">
            Real stories from people who actually changed their careers.
          </p>
        </motion.div>

        {/* 🔥 DIFFERENT CARD STYLE */}
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="relative p-8 rounded-2xl 
              bg-white/5 backdrop-blur-xl border border-white/10 
              hover:border-[var(--brand-blue-light)] transition-all duration-300"
            >
              {/* QUOTE MARK */}
              <span className="absolute text-6xl top-4 right-6 opacity-10 text-white font-serif">
                “
              </span>

              {/* TEXT */}
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                {t.text}
              </p>

              {/* RATING */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="var(--brand-yellow-light)"
                    className="text-[var(--brand-yellow-light)]"
                  />
                ))}
              </div>

              {/* NAME ONLY */}
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-sm text-white/50">{t.role}</p>
              </div>

              {/* subtle accent line */}
              <div
                className="absolute bottom-0 left-0 w-full h-[2px] 
                bg-gradient-to-r from-[var(--brand-blue-light)] to-transparent opacity-40"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
