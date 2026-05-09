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

function CircularProgress({
  trigger,
  isDark,
}: {
  trigger: boolean;
  isDark: boolean;
}) {
  const radius = 102;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const startTime = performance.now();
    const animate = (time: number) => {
      const t = Math.min((time - startTime) / 1800, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(91 * eased));
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [trigger]);

  const filled = (progress / 100) * circumference;
  const gap = circumference - filled;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 260, height: 260 }}
    >
      {/* ambient bg glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.14) 0%, rgba(0,255,136,0.07) 55%, transparent 75%)",
          filter: "blur(18px)",
        }}
      />

      <svg
        width="260"
        height="260"
        viewBox="0 0 260 260"
        className="-rotate-90"
      >
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffcc" />
            <stop offset="30%" stopColor="#00e5ff" />
            <stop offset="65%" stopColor="#00aaff" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
          <linearGradient id="arcHL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#90ffee" />
            <stop offset="100%" stopColor="#70ddff" />
          </linearGradient>
          <filter id="glowF" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* depth shadow */}
        <circle
          cx="130"
          cy="133"
          r={radius}
          fill="none"
          stroke={isDark ? "#000" : "#bfefff"}
          strokeWidth="30"
          strokeOpacity={isDark ? 0.75 : 0.35}
        />

        {/* track */}
        <circle
          cx="130"
          cy="130"
          r={radius}
          fill="none"
          stroke={isDark ? "#0e1e20" : "#dff8ff"}
          strokeWidth="24"
        />

        {/* outer track rims */}
        <circle
          cx="130"
          cy="130"
          r={radius - 11}
          fill="none"
          stroke={isDark ? "#0d1e1e" : "#b7ecff"}
          strokeWidth="0.8"
          strokeOpacity={isDark ? 0.7 : 0.5}
        />

        <circle
          cx="130"
          cy="130"
          r={radius + 11}
          fill="none"
          stroke={isDark ? "#0d1e1e" : "#b7ecff"}
          strokeWidth="0.8"
          strokeOpacity={isDark ? 0.5 : 0.35}
        />

        {/* wide halo glow */}
        <circle
          cx="130"
          cy="130"
          r={radius}
          fill="none"
          stroke="#00ccff"
          strokeWidth="42"
          strokeOpacity="0.08"
          strokeDasharray={`${filled} ${gap}`}
          strokeLinecap="round"
          style={{ filter: "blur(10px)" }}
        />

        {/* mid glow */}
        <circle
          cx="130"
          cy="130"
          r={radius}
          fill="none"
          stroke="#00e5ff"
          strokeWidth="30"
          strokeOpacity="0.15"
          strokeDasharray={`${filled} ${gap}`}
          strokeLinecap="round"
          style={{ filter: "blur(5px)" }}
        />

        {/* main arc */}
        <circle
          cx="130"
          cy="130"
          r={radius}
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="22"
          strokeDasharray={`${filled} ${gap}`}
          strokeLinecap="round"
          filter="url(#glowF)"
        />

        {/* highlight ribbon */}
        <circle
          cx="130"
          cy="130"
          r={radius}
          fill="none"
          stroke="url(#arcHL)"
          strokeWidth="5"
          strokeOpacity="0.8"
          strokeDasharray={`${filled} ${gap}`}
          strokeLinecap="round"
        />
      </svg>

      {/* inner well */}
      <div
        className="absolute rounded-full flex flex-col items-center justify-center"
        style={{
          width: 176,
          height: 176,
          background: isDark ? "#05090b" : "#ffffff",
          border: isDark
            ? "1px solid rgba(0,229,255,0.2)"
            : "1px solid rgba(2,6,23,0.06)",
          boxShadow: isDark
            ? "inset 0 0 30px rgba(0,180,255,0.05)"
            : "inset 0 6px 18px rgba(7,18,37,0.04)",
        }}
      >
        <span
          className="font-black leading-none"
          style={{
            fontSize: 48,
            color: "#00e5ff",
            textShadow: isDark
              ? "0 0 18px rgba(0,220,255,0.7), 0 0 40px rgba(0,180,255,0.35)"
              : "0 0 8px rgba(82,216,79,0.06)",
          }}
        >
          {progress}%
        </span>
        <span
          style={{
            fontSize: 11,
            letterSpacing: 3,
            marginTop: 4,
            color: isDark ? "#3ab8cc" : "var(--fg-muted)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          PLACED
        </span>
      </div>

      {/* floor reflection */}
      <div
        className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 130,
          height: 12,
          background: "rgba(0,170,255,0.1)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}

export default function PlacementSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });
  const { isDark, mounted } = useThemeMode();

  // Early return placeholder to prevent hydration mismatch
  if (!mounted) {
    return (
      <section
        id="placement"
        ref={ref}
        className="relative py-12 md:py-28 overflow-hidden isolate"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #ffffff 100%)",
        }}
      >
        {/* Placeholder - invisible until hydrated */}
      </section>
    );
  }

  /*  columns logic OUTSIDE map */
  const columns: Company[][] = Array.from({ length: 4 }, () => []);

  COMPANIES.forEach((item, index) => {
    columns[index % 4].push(item);
  });

  return (
    <section
      id="placement"
      ref={ref}
      className="relative py-12 md:py-28 overflow-hidden isolate"
    >
      {/* blobs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          filter: "blur(90px)",
          background: isDark
            ? `
            radial-gradient(ellipse 50% 45% at 8% 15%,  rgba(255,230,0,0.13)  0%, transparent 55%),
            radial-gradient(ellipse 45% 40% at 92% 12%, rgba(160,255,0,0.11)  0%, transparent 52%),
            radial-gradient(ellipse 55% 50% at 50% 92%, rgba(0,196,255,0.15)  0%, transparent 58%)
          `
            : `
            radial-gradient(ellipse 50% 45% at 8% 15%,  rgba(255,230,0,0.08)  0%, transparent 55%),
            radial-gradient(ellipse 45% 40% at 92% 12%, rgba(160,255,0,0.07)  0%, transparent 52%),
            radial-gradient(ellipse 55% 50% at 50% 92%, rgba(0,196,255,0.08)  0%, transparent 58%)
          `,
        }}
      />

      {/* grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: isDark ? 0.04 : 0.06,
        }}
      />

      <div className="relative z-[2] max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-14 ">
          <CircularProgress trigger={inView} isDark={isDark} />

          <div className="max-w-lg">
            <h3
              className="text-3xl md:text-4xl font-black leading-tight text-white"
              style={{ color: "var(--fg-primary)" }}
            >
              91% of our graduates <br />
              <span className="text-[var(--brand-blue-light)]">
                are placed at top companies
              </span>
            </h3>

            <p
              className="mt-4 text-white/60"
              style={{ color: "var(--fg-secondary)" }}
            >
              Join a network of 400+ hiring partners across industries.
            </p>
          </div>
        </div>

        <div className="text-center mb-10">
          <h4
            className="text-2xl font-black "
            style={{ color: "var(--fg-secondary)" }}
          >
            <span className="text-[var(--brand-blue-light)]">Top teams</span>{" "}
            are hiring
          </h4>
        </div>

        <div className="relative overflow-hidden mt-12">
          <div
            className="pointer-events-none absolute inset-0 z-10 
            [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          />

          <div className="hidden md:grid grid-cols-4 gap-4 h-[400px]">
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
                            <p
                              className="text-sm font-semibold "
                              style={{ color: "var(--fg-primary)" }}
                            >
                              {c.name}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: "var(--fg-secondary)" }}
                            >
                              {c.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>

          <div className="md:hidden flex flex-col gap-3 overflow-hidden">
            {Array.from({ length: 4 }).map((_, rowIndex) => {
              const rowItems = COMPANIES.slice(rowIndex * 5, rowIndex * 5 + 5);

              return (
                <div key={rowIndex} className="relative overflow-hidden">
                  <motion.div
                    animate={{
                      x: rowIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
                    }}
                    transition={{
                      duration: 20 + rowIndex * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="flex w-max gap-3"
                  >
                    {[0, 1].map((group) => (
                      <div key={group} className="flex gap-3">
                        {rowItems.map((c, i) => (
                          <div
                            key={`${group}-${i}`}
                            className="flex w-[220px] flex-shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                          >
                            <Image
                              src={c.logo}
                              alt={`${c.name} logo`}
                              width={32}
                              height={32}
                              className="h-8 w-8 object-contain"
                            />

                            <div>
                              <p
                                className="text-sm font-semibold"
                                style={{ color: "var(--fg-primary)" }}
                              >
                                {c.name}
                              </p>

                              <p
                                className="text-xs"
                                style={{
                                  color: "var(--fg-secondary)",
                                }}
                              >
                                {c.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
