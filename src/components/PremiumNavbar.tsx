"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
type PremiumNavbarProps = {
  collapsed: boolean;
  hasScrolled: boolean;
};

export default function PremiumNavbar(_props: PremiumNavbarProps) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clickedOpen, setClickedOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const linksRef = useRef<HTMLDivElement | null>(null);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync dark mode on mount
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Reset when back to top
  useEffect(() => {
    if (isAtTop) {
      setHovered(false);
      setClickedOpen(false);
    }
  }, [isAtTop]);

  // Final open state logic
  const isOpen = isAtTop || hovered || clickedOpen;

  function toggleTheme() {
    const nowDark = document.documentElement.classList.toggle("dark");
    setIsDark(nowDark);
  }

  // GSAP animation for links
  useEffect(() => {
    if (isOpen && linksRef.current) {
      gsap.fromTo(
        linksRef.current.children,
        { x: -12, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.28,
          ease: "power2.out",
          delay: 0.12,
        },
      );
    }
  }, [isOpen]);

  const Logo = (
    <div
      className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full shadow-lg ring-1 ring-white/20"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-purple-light), var(--brand-blue-light))",
      }}
    >
      <span className="text-white text-sm font-bold select-none">SX</span>
    </div>
  );

  return (
    <motion.div className="fixed z-50 left-5 top-5">
      <motion.nav
        aria-label="Main navigation"
        onMouseEnter={() => {
          if (!isAtTop) setHovered(true);
        }}
        onMouseLeave={() => {
          if (!isAtTop) {
            setHovered(false);
            setClickedOpen(false);
          }
        }}
        onClick={() => {
          if (!isAtTop) {
            setClickedOpen((prev) => !prev);
          }
        }}
        animate={{
          width: isOpen ? 520 : 44,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        style={{
          background: "var(--bg-nav)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "var(--shadow-nav)",
          border: "1px solid var(--border)",
          overflow: "hidden",
          height: 44,
          display: "flex",
          alignItems: "center",
          paddingBlock: "26px",
          paddingLeft: isOpen ? "6px" : "2px",
          paddingRight: isOpen ? "6px" : "2px",
          borderRadius: "9999px",
          cursor: !isAtTop ? "pointer" : "default",
        }}
      >
        {/* Logo */}
        <div className="flex-shrink-0">{Logo}</div>

        {/* Links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center flex-1 justify-between pl-4 pr-1"
            >
              <div
                ref={linksRef}
                className="flex items-center gap-5 text-sm font-medium"
                style={{ color: "var(--fg-primary)" }}
              >
                <Link
                  href="#programs"
                  className="opacity-75 hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  Programs
                </Link>
                <Link
                  href="#subscriptions"
                  className="opacity-75 hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  Subscriptions
                </Link>
                <Link
                  href="#resources"
                  className="opacity-75 hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  Resources
                </Link>
              </div>

              {/* Theme toggle */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation(); // prevent nav click toggle
                  toggleTheme();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="ml-4 flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full"
                style={{
                  background: "var(--border)",
                  color: "var(--fg-primary)",
                }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.div>
  );
}
