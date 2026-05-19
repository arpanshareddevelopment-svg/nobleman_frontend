"use client";

import Image from "next/image";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

const FOOTER_SECTIONS = [
  {
    title: "Programs",
    links: ["Data Analyst", "Full-Stack Engineering", "Product Management", "AI & ML"],
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

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h5
        className="mb-5 text-sm font-bold uppercase tracking-[0.14em]"
        style={{ color: "white" }}
      >
        {title}
      </h5>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <button
              className="cursor-pointer text-left text-sm transition-all duration-300"
              style={{ color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialButton({ icon: Icon, href }: { icon: React.ComponentType<{ size?: number }>; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4 }}
      className="flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300"
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.05)",
        color: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Icon size={18} />
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative isolate overflow-hidden border-t"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      {/* BG */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(2,6,23,0) 0%, #020617 18%, #000000 100%)
          `,
        }}
      />

      {/* GRID */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* BLOBS */}
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
          {/* LEFT */}
          <div>
            <a href="#home" className="inline-flex" aria-label="Go to home">
              <Image
                src="/branding/brand_dark.png"
                alt="brand"
                width={170}
                height={40}
                priority
              />
            </a>

            <p
              className="mt-5 max-w-md text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
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

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {FOOTER_SECTIONS.map((section) => (
              <FooterColumn key={section.title} title={section.title} links={section.links} />
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="flex flex-col items-start justify-between gap-4 border-t py-6 text-sm sm:flex-row sm:items-center"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <p>
            © 2026 NobleMan Learning. Powered by Aurelian Vulcan Group Pvt Ltd.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            {["Privacy Policy", "Terms", "Cookies"].map((item) => (
              <button
                key={item}
                className="cursor-pointer transition-all duration-300"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "white"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
