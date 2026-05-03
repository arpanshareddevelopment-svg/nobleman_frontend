"use client";

import Image from "next/image";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FOOTER_SECTIONS = [
  {
    title: "Programs",
    links: [
      "Data Analyst",
      "Full-Stack Engineering",
      "Product Management",
      "AI & ML",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Refund", "Cookies"],
  },
];

const SOCIAL = [
  { icon: Github, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Mail, href: "#" },
];

export default function Footer() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="relative w-full overflow-hidden isolate">
      {/* BASE GRADIENT */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #020617 0%, #07142a 50%, #000000 100%)",
        }}
      />

      {/* GRID PATTERN */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* FLOATING BLOBS — yellow · green · blue */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          filter: "blur(80px)",
          background: `
            radial-gradient(ellipse 50% 45% at 5%  10%,  rgba(255,230,0,0.28)   0%, transparent 55%),
            radial-gradient(ellipse 45% 40% at 95% 8%,   rgba(160,255,0,0.22)   0%, transparent 52%),
            radial-gradient(ellipse 55% 50% at 70% 85%,  rgba(0,196,255,0.26)   0%, transparent 58%),
            radial-gradient(ellipse 35% 30% at 30% 75%,  rgba(255,200,0,0.18)   0%, transparent 48%)
          `,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-[2] max-w-7xl mx-auto px-6 md:px-14 py-16">
        {/* TOP */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <Image
              src={
                isDark
                  ? "/branding/brand_light.png"
                  : "/branding/brand_dark.png"
              }
              alt="brand"
              width={160}
              height={40}
              priority
            />
            <p className="text-white/60 mt-4 max-w-sm">
              Transforming careers through live mentor-led programs with
              real-world outcomes.
            </p>
          </div>
        </div>

        {/* LINKS */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {FOOTER_SECTIONS.map((section, i) => (
            <div key={i}>
              <h5 className="text-white font-bold mb-4">{section.title}</h5>
              <ul className="space-y-2 text-white/60">
                {section.links.map((link, j) => (
                  <li
                    key={j}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
          <p className="text-white/50 text-sm">© 2026 NobleMan Learning.</p>

          <div className="flex gap-4">
            {SOCIAL.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={i}
                  href={s.href}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full 
                  bg-white/5 border border-white/10 text-white"
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
