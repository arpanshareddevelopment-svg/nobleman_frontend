"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";

// One color per page section (in scroll order)
const SECTION_COLORS: { id: string; color: string; glow: string }[] = [
  { id: "home",               color: "#00c4ff", glow: "rgba(0,196,255,0.25)" },   // Hero – blue
  { id: "mission",            color: "#c8ff00", glow: "rgba(200,255,0,0.25)" },   // Mission – green
  { id: "values",             color: "#ff6b6b", glow: "rgba(255,107,107,0.25)" }, // Values – coral
  { id: "instructors",        color: "#ffe600", glow: "rgba(255,230,0,0.25)" },   // Instructors – yellow
  { id: "programs",           color: "#a78bfa", glow: "rgba(167,139,250,0.25)" }, // Programs – violet
  { id: "certifications",     color: "#34d399", glow: "rgba(52,211,153,0.25)" },  // Certs – emerald
  { id: "placement",          color: "#fb923c", glow: "rgba(251,146,60,0.25)" },  // Placement – orange
  { id: "why",                color: "#f472b6", glow: "rgba(244,114,182,0.25)" }, // Why – pink
  { id: "testimonials",       color: "#38bdf8", glow: "rgba(56,189,248,0.25)" },  // Testimonials – sky
];

function BrandLogo({ isOpen, isDark }: { isOpen: boolean; isDark: boolean }) {
  const src = isOpen
    ? isDark
      ? "/branding/brand_dark.png"
      : "/branding/brand_light.png"
    : isDark
      ? "/branding/logo_dark.png"
      : "/branding/logo_light.png";

  return (
    <div
      className={`
        relative flex items-center justify-center
        transition-all duration-300
        rounded-full overflow-hidden
      `}
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
        className={`
          object-contain
          ${!isOpen ? "scale-110" : ""}
        `}
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
  const [sectionColor, setSectionColor] = useState(SECTION_COLORS[0]);

  // Sync state with the class applied by the inline layout script on mount
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  const linksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsAtTop(scrollY < 10);

      // Find which section is currently most visible
      let active = SECTION_COLORS[0];
      for (const section of SECTION_COLORS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Section is "active" when its top has passed the middle of the viewport
          if (rect.top <= window.innerHeight * 0.5) {
            active = section;
          }
        }
      }
      setSectionColor(active);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isOpen = isAtTop || hovered || clickedOpen;

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
    } catch (e) {}
  }

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isOpen && linksRef.current && !hasAnimated.current) {
      hasAnimated.current = true;

      gsap.fromTo(
        linksRef.current.children,
        { x: -12, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.28,
        },
      );
    }
  }, [isOpen]);

  return (
    <div className="fixed z-50 left-5 top-5">
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
          if (!isAtTop) setClickedOpen((prev) => !prev);
        }}
        animate={{
          width: isOpen ? 600 : 52,
          height: isOpen ? 64 : 52,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
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
          // overflow must be visible to avoid Y-clip on the logo
          overflow: "visible",
          paddingLeft: isOpen ? 8 : 0,
          paddingRight: isOpen ? 8 : 0,
          cursor: !isAtTop ? "pointer" : "default",
          transition: "border-color 0.6s ease, box-shadow 0.6s ease",
        }}
      >
        {/* Clip only on X axis using a wrapper that is overflow-hidden but tall enough */}
        <div className="flex items-center w-full overflow-hidden rounded-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              type="button"
              aria-label="Back to top"
              onClick={handleBrandClick}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
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
              <BrandLogo isOpen={isOpen} isDark={isDark} />
            </button>
          </div>

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
                  className="flex items-center gap-5 text-sm font-medium text-[var(--fg-primary)]"
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

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTheme();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer ml-4 flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    background: sectionColor.glow,
                    border: `1px solid ${sectionColor.color}`,
                    color: sectionColor.color,
                    boxShadow: `0 0 8px ${sectionColor.glow}`,
                  }}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}
