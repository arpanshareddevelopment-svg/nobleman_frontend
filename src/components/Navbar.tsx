"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";

const SECTION_COLORS: { id: string; color: string; glow: string }[] = [
  { id: "home", color: "#00c4ff", glow: "rgba(0,196,255,0.25)" },
  { id: "mission", color: "#c8ff00", glow: "rgba(200,255,0,0.25)" },
  { id: "values", color: "#ff6b6b", glow: "rgba(255,107,107,0.25)" },
  { id: "instructors", color: "#ffe600", glow: "rgba(255,230,0,0.25)" },
  { id: "programs", color: "#a78bfa", glow: "rgba(167,139,250,0.25)" },
  { id: "certifications", color: "#34d399", glow: "rgba(52,211,153,0.25)" },
  { id: "placement", color: "#fb923c", glow: "rgba(251,146,60,0.25)" },
  { id: "why", color: "#f472b6", glow: "rgba(244,114,182,0.25)" },
  { id: "testimonials", color: "#38bdf8", glow: "rgba(56,189,248,0.25)" },
];

function BrandLogo({
  isOpen,
  isDark,
  mounted,
}: {
  isOpen: boolean;
  isDark: boolean;
  mounted: boolean;
}) {
  // Don't render until client is mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className="relative flex items-center justify-center transition-all duration-300 rounded-full overflow-hidden"
        style={{
          height: 52,
          width: isOpen ? 180 : 52,
          background: "transparent",
        }}
      >
        <div className="h-full w-full bg-transparent" />
      </div>
    );
  }

  const src = isOpen
    ? isDark
      ? "/branding/brand_dark.png"
      : "/branding/brand_light.png"
    : isDark
      ? "/branding/logo_dark.png"
      : "/branding/logo_light.png";

  return (
    <div
      className="relative flex items-center justify-center transition-all duration-300 rounded-full overflow-hidden"
      style={{
        height: 52,
        width: isOpen ? 180 : 52,
        background: "transparent",
      }}
    >
      <Image
        src={src}
        alt="Brand"
        fill
        sizes={isOpen ? "180px" : "52px"}
        className={`object-contain ${!isOpen ? "scale-110" : ""}`}
        priority
      />
    </div>
  );
}

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clickedOpen, setClickedOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sectionColor, setSectionColor] = useState(SECTION_COLORS[0]);

  // Track whether mouse is inside the navbar at all
  const isInsideNav = useRef(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Get theme on mount (after hydration)
    const darkMode = document.documentElement.classList.contains("dark");
    setIsDark(darkMode);
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);

      let active = SECTION_COLORS[0];
      for (const section of SECTION_COLORS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) active = section;
        }
      }
      setSectionColor(active);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isOpen = isAtTop || hovered || clickedOpen;

  function handleNavMouseEnter() {
    isInsideNav.current = true;
    if (!isAtTop) setHovered(true);
  }

  function handleNavMouseLeave(e: React.MouseEvent) {
    isInsideNav.current = false;
    if (isAtTop) return;

    // relatedTarget is where the mouse went — if it's still inside nav, ignore
    const related = e.relatedTarget as Node | null;
    if (navRef.current && related && navRef.current.contains(related)) return;

    setHovered(false);
    setClickedOpen(false);
  }

  function handleNavClick() {
    if (!isAtTop) setClickedOpen((prev) => !prev);
  }

  function handleBrandClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setHovered(false);
    setClickedOpen(false);
  }

  function toggleTheme() {
    const nowDark = document.documentElement.classList.toggle("dark");
    setIsDark(nowDark);
    try {
      localStorage.setItem("theme", nowDark ? "dark" : "light");
    } catch {}
  }

  return (
    <div className="fixed z-50 left-5 top-5">
      <motion.nav
        ref={navRef}
        aria-label="Main navigation"
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
        onClick={handleNavClick}
        animate={{
          width: isOpen ? 600 : 52,
          height: isOpen ? 64 : 52,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.9 }}
        className="relative flex items-center justify-center h-[52px] rounded-full border"
        style={{
          background: isOpen
            ? `color-mix(in srgb, ${sectionColor.color} 8%, var(--bg-nav))`
            : "var(--bg-nav)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: isOpen
            ? `0 0 0 1px ${sectionColor.color}40, var(--shadow-nav)`
            : `0 0 0 1px ${sectionColor.color}, 0 0 16px ${sectionColor.glow}, var(--shadow-nav)`,
          borderColor: isOpen ? `${sectionColor.color}40` : sectionColor.color,
          overflow: "visible",
          paddingLeft: isOpen ? 8 : 0,
          paddingRight: isOpen ? 8 : 0,
          cursor: !isAtTop ? "pointer" : "default",
          transition: "border-color 0.6s ease, box-shadow 0.6s ease",
        }}
      >
        {/* Inner wrapper — overflow-hidden clips the expanding content */}
        <div className="flex items-center w-full overflow-hidden rounded-full">
          {/* Logo / brand button
              ─ NO onMouseLeave here — let the parent nav handle all leave events */}
          <div className="flex-shrink-0">
            <button
              type="button"
              aria-label="Back to top"
              onClick={handleBrandClick}
              className="flex items-center justify-center rounded-full overflow-hidden transition-all duration-300"
              style={
                !isOpen
                  ? {
                      boxShadow: hovered
                        ? `0 0 0 2px ${sectionColor.color}, 0 0 20px ${sectionColor.glow}`
                        : "none",
                      background: hovered ? sectionColor.glow : "transparent",
                    }
                  : {}
              }
            >
              <BrandLogo isOpen={isOpen} isDark={isDark} mounted={mounted} />
            </button>
          </div>

          {/* Links row */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18 }}
                className="flex items-center flex-1 justify-between pl-4 pr-1"
              >
                <div className="flex items-center gap-5 text-sm font-medium text-[var(--fg-primary)]">
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
                {mounted && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheme();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer ml-4 flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.72)",

                      border: isDark
                        ? "1px solid rgba(255,255,255,0.14)"
                        : "1px solid rgba(0,0,0,0.08)",

                      color: isDark ? "#ffe600" : "#0096ff",

                      boxShadow: isDark
                        ? "0 0 18px rgba(255,230,0,0.18)"
                        : "0 4px 18px rgba(0,150,255,0.12)",

                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}
