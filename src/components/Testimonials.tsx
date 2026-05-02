"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Desai",
    role: "Data Analyst at Amazon",
    image: "👩‍💻",
    rating: 5,
    text: "The live classes were game-changing. My mentor helped me land my dream job in just 3 months!",
  },
  {
    id: 2,
    name: "Arjun Kumar",
    role: "Full-Stack Engineer at Microsoft",
    image: "👨‍💻",
    rating: 5,
    text: "Best investment I made. Real projects, real mentors, real results. The placement support is unbeatable.",
  },
  {
    id: 3,
    name: "Sophia Patel",
    role: "Product Manager at Google",
    image: "👩‍🔬",
    rating: 5,
    text: "From zero experience to PM at Google in 4 months. The curriculum is industry-aligned and practical.",
  },
  {
    id: 4,
    name: "Rahul Singh",
    role: "ML Engineer at Deepmind",
    image: "👨‍🔬",
    rating: 5,
    text: "The AI/ML course is comprehensive. Learned cutting-edge techniques from researchers. Highly recommended!",
  },
];

export default function Testimonials() {
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
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
          top: "50%",
          right: "-15%",
          transform: "translateY(-50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: "var(--fg-primary)" }}
          >
            Loved by 12,000+ learners
          </h2>
          <p className="text-lg" style={{ color: "var(--fg-secondary)" }}>
            Real stories from real graduates who transformed their careers.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-8 hover:scale-105 transition-all duration-300"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="var(--brand-yellow-light)"
                    style={{ color: "var(--brand-yellow-light)" }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-lg leading-relaxed mb-6 italic"
                style={{ color: "var(--fg-secondary)" }}
              >
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <span className="text-4xl">{testimonial.image}</span>
                <div>
                  <div
                    className="font-bold"
                    style={{ color: "var(--fg-primary)" }}
                  >
                    {testimonial.name}
                  </div>
                  <div className="text-sm" style={{ color: "var(--fg-muted)" }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
