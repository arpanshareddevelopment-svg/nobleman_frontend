"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Who are the instructors at NobleMan Learning?",
    answer: "Our instructors are active practitioners and leaders working at top product companies and engineering teams. They don't just teach theory—they bring current, real-world case studies and operational best practices to every live cohort class.",
  },
  {
    question: "How does the 1:1 mentorship program work?",
    answer: "Every student is paired with a dedicated mentor. You can schedule 1:1 video calls to clear doubts, get detailed code/design feedback on your portfolio projects, optimize your LinkedIn profile, and do mock interviews.",
  },
  {
    question: "What happens if I miss a live class?",
    answer: "No class will be recorded. ",
  },
  {
    question: "Do you offer placement assistance and recruiter referrals?",
    answer: "Yes. We have a dedicated placement cell that prepares you for technical and behavioral rounds. We actively refer top-performing students directly to our network of partner companies, hiring managers, and recruiters.",
  },
  {
    question: "Can I request a physical certificate?",
    answer: "Absolutely! After completing your program requirements and graduating, you can request a high-quality physical certificate of completion. We ship it to your address worldwide at no extra cost.",
  },
  {
    question: "Is there a free demo or trial session?",
    answer: "Yes, we regularly host free live masterclasses and program orientations. You can sign up, meet the instructors, ask questions, and experience the learning platform environment before committing financially.",
  },
];

function FAQCard({ question, answer, isOpen, onToggle }: FAQItem & { isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      className="cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 select-none"
      style={{
        background: isOpen ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.01)",
        border: isOpen ? "1px solid rgba(132, 255, 61, 0.3)" : "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: isOpen 
          ? "0 8px 30px rgba(132, 255, 61, 0.05), inset 0 1px 0 rgba(255,255,255,0.05)" 
          : "none",
      }}
    >
      <div className="flex items-center justify-between p-5 md:p-6">
        <span
          className="text-base md:text-lg font-bold text-white transition-colors duration-200"
          style={{ color: isOpen ? "#c8ff00" : "#ffffff" }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{ color: isOpen ? "#c8ff00" : "rgba(255, 255, 255, 0.45)" }}
        >
          <ChevronDown size={20} strokeWidth={2.5} />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base leading-relaxed"
              style={{ color: "rgba(255, 255, 255, 0.65)" }}
            >
              <div className="h-px w-full bg-white/5 mb-4" />
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="relative isolate overflow-hidden py-14 md:py-28"
      style={{
        background: `
          radial-gradient(circle at 50% 80%, rgba(200, 255, 0, 0.04), transparent 40%),
          #08090c
        `,
      }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45 }}
          className="mb-12 text-center"
        >
          <div
            className="mb-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#c8ff00" }}
          >
            <span className="h-[1.5px] w-5" style={{ background: "#c8ff00" }} />
            Got Questions?
            <span className="h-[1.5px] w-5" style={{ background: "#c8ff00" }} />
          </div>
          
          <h2
            className="text-[clamp(2.2rem,3.8vw,3.8rem)] font-black leading-tight"
            style={{ color: "var(--fg-primary)" }}
          >
            Frequently Asked{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #c8ff00 0%, #00c4ff 100%)",
              }}
            >
              Questions
            </span>
          </h2>
        </motion.div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <FAQCard
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
