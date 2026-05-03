"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Company = {
  name: string;
  role: string;
  logo: string;
};

const COMPANIES: Company[] = [
  {
    name: "Amazon",
    role: "Cloud Architect",
    logo: "/companies/amazon-com-logo.png",
  },
  {
    name: "Microsoft",
    role: "Data Scientist",
    logo: "/companies/microsoft-com-logo.png",
  },
  {
    name: "Deloitte",
    role: "Analytics Consultant",
    logo: "/companies/deloitte-com-logo.png",
  },
  {
    name: "Tech Mahindra",
    role: "DevOps Engineer",
    logo: "/companies/techmahindra-com-br-logo.png",
  },

  {
    name: "IOPEX",
    role: "Data Engineer",
    logo: "/companies/iopex-com-logo.png",
  },
  {
    name: "Sony Pictures",
    role: "Media Tech Lead",
    logo: "/companies/sonypictures-com-logo.png",
  },
  {
    name: "AT&T",
    role: "Platform Engineer",
    logo: "/companies/att-com-logo.png",
  },

  { name: "AXA", role: "ML Operations", logo: "/companies/axa-com-logo.png" },
  {
    name: "Juniper",
    role: "Network Automation",
    logo: "/companies/juniper-net-logo.png",
  },
  {
    name: "HUL",
    role: "Supply Chain AI",
    logo: "/companies/hul-co-in-logo.png",
  },

  {
    name: "Sprinklr",
    role: "NLP Engineer",
    logo: "/companies/sprinklr-com-logo.png",
  },

  { name: "MUFG", role: "Quant Analyst", logo: "/companies/mufg-jp-logo.png" },
  {
    name: "MiQ",
    role: "Programmatic Data",
    logo: "/companies/wearemiq-com-logo.png",
  },

  {
    name: "Genpact",
    role: "Process Automation",
    logo: "/companies/genpact-digital-logo.png",
  },
  {
    name: "Bandhan Bank",
    role: "Credit Risk ML",
    logo: "/companies/bandhanbank-com-logo.png",
  },

  {
    name: "Booking.com",
    role: "Data Analyst",
    logo: "/companies/booking-com-logo.png",
  },
  {
    name: "EaseMyTrip",
    role: "BI Developer",
    logo: "/companies/easemytrip-co-uk-logo.png",
  },
  {
    name: "Razorpay",
    role: "Backend Engineer",
    logo: "/companies/razorpay-com-logo.png",
  },
  {
    name: "Capgemini",
    role: "Data Architect",
    logo: "/companies/capgemini-engineering-com-ua-logo.png",
  },
];

function CircularProgress({ trigger }: { trigger: boolean }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();

    const animate = (time: number) => {
      const t = Math.min((time - startTime) / 1400, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(91 * eased));

      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [trigger]);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="10"
          fill="none"
        />

        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="var(--brand-blue-light)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
        />
      </svg>

      <div className="absolute text-4xl font-black text-[var(--brand-blue-light)]">
        {progress}%
      </div>
    </div>
  );
}

export default function PlacementSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });

  /* ✅ FIX: columns logic OUTSIDE map */
  const columns: Company[][] = Array.from({ length: 4 }, () => []);

  COMPANIES.forEach((item, index) => {
    columns[index % 4].push(item);
  });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden isolate">
      {/* BASE GRADIENT — deep blue */}
      <div
        className="absolute inset-0 z-0"
       
      />

      {/* FLOATING BLOBS — yellow · green · blue */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          filter: "blur(80px)",
          background: `
            radial-gradient(ellipse 50% 45% at 8%  15%,  rgba(255,230,0,0.15)   0%, transparent 55%),
            radial-gradient(ellipse 45% 40% at 92% 12%,  rgba(160,255,0,0.14)   0%, transparent 52%),
            radial-gradient(ellipse 55% 50% at 50% 92%,  rgba(0,196,255,0.18)   0%, transparent 58%),
            radial-gradient(ellipse 35% 30% at 75% 45%,  rgba(255,230,0,0.08)   0%, transparent 48%)
          `,
        }}
      />

     

      <div className="relative z-[2] max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-14 mb-20">
          <CircularProgress trigger={inView} />

          <div className="max-w-lg">
            <h3 className="text-3xl md:text-4xl font-black leading-tight text-white">
              91% of our graduates <br />
              <span className="text-[var(--brand-blue-light)]">
                are placed at top companies
              </span>
            </h3>

            <p className="mt-4 text-white/60">
              Join a network of 400+ hiring partners across industries.
            </p>
          </div>
        </div>

        <div className="text-center mb-10">
          <h4 className="text-2xl font-black text-white">
            <span className="text-[var(--brand-blue-light)]">Top teams</span>{" "}
            are hiring
          </h4>
        </div>

        <div className="relative overflow-hidden mt-12">
          <div
            className="pointer-events-none absolute inset-0 z-10 
            [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px]">
            {columns.map((columnItems, colIndex) => (
              <div key={colIndex} className="relative overflow-hidden">
                <motion.div
                  animate={{
                    y: colIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
                  }}
                  transition={{
                    duration: 20 + colIndex * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex flex-col will-change-transform"
                >
                  {[0, 1].map((groupIndex) => (
                    <div key={groupIndex} className="flex flex-col gap-3">
                      {columnItems.map((c, i) => (
                        <div
                          key={`${groupIndex}-${i}`}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                        >
                          <Image
                            src={c.logo}
                            alt={`${c.name} logo`}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                          />
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {c.name}
                            </p>
                            <p className="text-xs text-white/50">{c.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
