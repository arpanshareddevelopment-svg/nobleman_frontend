"use client";

import Image from "next/image";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

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
    title: "Legal",
    links: [
      "Terms & Conditions",
      "Privacy Policy",
      "Refund Policy",
      "Contact Us",
    ],
  },
  {
    title: "Resources",
    links: ["Reviews", "Hire From Us", "Business", "Career", "Blogs"],
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
        className="mb-6 text-xs font-bold uppercase tracking-[0.22em]"
        style={{
          color: "#fff",
          textShadow: "0 0 20px rgba(255,255,255,0.15)",
        }}
      >
        {title}
      </h5>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="group inline-flex items-center text-sm transition-all duration-300"
              style={{
                color: "rgba(255,255,255,0.58)",
              }}
            >
              <span className="relative">
                {link}

                <span
                  className="
                    absolute
                    left-0
                    -bottom-1
                    h-px
                    w-0
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                  style={{
                    background: "linear-gradient(90deg,#84ff3d,#2ea8ff)",
                  }}
                />
              </span>
            </a>
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
  icon: LucideIcon;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{
        y: -5,
        scale: 1.08,
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex h-11 w-11 items-center justify-center rounded-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.03)",
        color: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div
        className="
    absolute inset-0 opacity-0
    transition-opacity duration-300
    group-hover:opacity-100
  "
        style={{
          background:
            "radial-gradient(circle, rgba(46,168,255,0.25), rgba(132,255,61,0.15), transparent 70%)",
          filter: "blur(12px)",
        }}
      />
      <Icon
        size={18}
        className="relative z-10 transition-all duration-300
    group-hover:scale-110
  "
      />
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative isolate overflow-hidden "
      style={{
        background: `
  radial-gradient(circle at 50% 100%, rgba(0,82,255,0.18), transparent 45%),
  radial-gradient(circle at 20% 80%, rgba(0,119,255,0.08), transparent 35%),
  radial-gradient(circle at 80% 80%, rgba(0,119,255,0.08), transparent 35%),
  linear-gradient(
    180deg,
    #020305 0%,
    #030814 45%,
    #02060d 75%,
    #000000 100%
  )
`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
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
            <div
              className="mt-4 h-px w-24"
              style={{
                background:
                  "linear-gradient(90deg,#2ea8ff,#84ff3d,transparent)",
              }}
            />
            <p
              className="mt-6 max-w-md text-sm leading-7"
              style={{
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Empowering ambitious learners with industry-led programs,
              real-world projects, mentorship, and career acceleration
              opportunities designed for the modern workforce.
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
              <FooterColumn
                key={section.title}
                title={section.title}
                links={section.links}
              />
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
            {["Terms & Conditions", "Privacy Policy", "Refund Policy"].map(
              (item) => (
                <button
                  key={item}
                  className="cursor-pointer transition-all duration-300"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                  }}
                >
                  {item}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
