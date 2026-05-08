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
    title: "Resources",
    links: ["Community", "Mentors", "Placements", "Scholarships"],
  },
];

const SOCIAL = [
  { icon: Github, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Mail, href: "#" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h5 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-white">
        {title}
      </h5>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <button className="cursor-pointer text-left text-sm text-white/55 transition hover:text-white">
              {link}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialButton({
  icon: Icon,
  href,
}: {
  icon: React.ComponentType<{ size?: number }>;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3 }}
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:border-[var(--brand-blue-light)] hover:bg-[var(--brand-blue-light)]/10 hover:text-[var(--brand-blue-light)]"
    >
      <Icon size={18} />
    </motion.a>
  );
}

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
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#020617]">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0) 0%, #020617 18%, #000 100%)",
        }}
      />

      <div
        className="absolute inset-0 z-[1] opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          filter: "blur(90px)",
          background: `
            radial-gradient(circle at 10% 10%, rgba(255,220,0,0.18), transparent 30%),
            radial-gradient(circle at 90% 20%, rgba(0,180,255,0.16), transparent 35%),
            radial-gradient(circle at 50% 100%, rgba(0,255,180,0.12), transparent 45%)
          `,
        }}
      />

      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-14 py-14 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.4fr_1fr]">
          <div>
            <a href="#home" className="inline-flex" aria-label="Go to home">
              <Image
                src={
                  isDark
                    ? "/branding/brand_light.png"
                    : "/branding/brand_dark.png"
                }
                alt="brand"
                width={170}
                height={40}
                priority
              />
            </a>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55">
              NobleMan Learning helps students and professionals break into
              high-growth careers through immersive learning and mentorship from
              industry experts.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {SOCIAL.map(({ icon, href }, i) => (
                <SocialButton key={`${href}-${i}`} icon={icon} href={href} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {FOOTER_SECTIONS.map((section) => (
              <FooterColumn
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/40 sm:flex-row sm:items-center">
          <p>© 2026 NobleMan Learning. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-5">
            <button className="cursor-pointer transition hover:text-white">
              Privacy Policy
            </button>

            <button className="cursor-pointer transition hover:text-white">
              Terms
            </button>

            <button className="cursor-pointer transition hover:text-white">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
