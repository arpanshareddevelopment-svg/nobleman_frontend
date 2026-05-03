"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const FOOTER_SECTIONS = [
  {
    title: "Programs",
    links: [
      { label: "Data Analyst", href: "#" },
      { label: "Full-Stack Engineering", href: "#" },
      { label: "Product Management", href: "#" },
      { label: "AI & Machine Learning", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@skillxindia.com" },
];

export default function Footer() {
  return (
    <footer
      className="relative w-full"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-page) 0%, rgba(0,0,0,0.02) 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -z-10 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
          bottom: "-10%",
          right: "5%",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Top section */}
        <div
          className="py-16 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 mb-12"
          >
            {/* Brand & description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-green-light), var(--brand-green-dark))",
                  }}
                >
                  SX
                </div>
                <span
                  className="text-2xl font-black"
                  style={{ color: "var(--fg-primary)" }}
                >
                  NobleMan Learning
                </span>
              </div>
              <p className="max-w-sm" style={{ color: "var(--fg-secondary)" }}>
                Transforming careers through live, mentor-led programs. Learn
                from industry veterans, build real projects, and land your dream
                job.
              </p>
            </div>

            {/* Newsletter CTA */}
            <div>
              <h4
                className="font-bold mb-4"
                style={{ color: "var(--fg-primary)" }}
              >
                Stay Updated
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 rounded-lg border outline-none transition-all duration-200 focus:border-green-500"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border)",
                    color: "var(--fg-primary)",
                  }}
                />
                <button
                  className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-green-light), var(--brand-green-dark))",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>

          {/* Footer sections grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {FOOTER_SECTIONS.map((section, i) => (
              <div key={i}>
                <h5
                  className="font-bold mb-4"
                  style={{ color: "var(--fg-primary)" }}
                >
                  {section.title}
                </h5>
                <ul className="space-y-2.5">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors duration-200 hover:text-green-500"
                        style={{ color: "var(--fg-secondary)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="py-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
            © 2026 NobleMan Learning. All rights reserved. | Built with ❤️ in
            India
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social, i) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--fg-primary)",
                  }}
                  aria-label={social.label}
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
