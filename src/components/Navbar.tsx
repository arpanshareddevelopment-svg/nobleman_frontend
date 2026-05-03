"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";

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
      className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
        isOpen ? "border border-[var(--border)] px-3" : "p-0"
      }`}
      style={{
        height: isOpen ? 52 : 52,
        width: isOpen ? 180 : 52,
        background: isDark ? "#000" : "#fff",
      }}
    >
      {isOpen ? (
        <Image
          src={src}
          alt="Brand"
          fill
          sizes="180px"
          className="object-contain px-2"
          priority
        />
      ) : (
        <Image
          src={src}
          alt="Brand"
          fill
          sizes="52px"
          className="object-contain scale-110"
          style={{
            transformOrigin: "center",
          }}
          priority
        />
      )}
    </div>
  );
}
export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clickedOpen, setClickedOpen] = useState(false);
const [isDark, setIsDark] = useState(false);

  // Sync state with the class applied by the inline layout script on mount
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  const linksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
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
        className="relative flex items-center justify-center h-[52px] rounded-full border border-[var(--border)]"
        style={{
          background: "var(--bg-nav)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "var(--shadow-nav)",
          // overflow must be visible to avoid Y-clip on the logo
          overflow: "visible",
          paddingLeft: isOpen ? 8 : 0,
          paddingRight: isOpen ? 8 : 0,
          cursor: !isAtTop ? "pointer" : "default",
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
              className="flex items-center justify-center rounded-full  overflow-hidden"
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
                  className="cursor-pointer ml-4 flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-[var(--border)] text-[var(--fg-primary)]"
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
