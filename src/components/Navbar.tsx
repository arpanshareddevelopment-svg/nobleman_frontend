"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sun,
  Moon,
  Bell,
  ShoppingBag,
  CreditCard,
  HelpCircle,
  LogOut,
  X,
  User,
} from "lucide-react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
type SectionColor = { id: string; color: string; glow: string };

// ─── Section accent colors ────────────────────────────────────────────────────
const SECTION_COLORS: SectionColor[] = [
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

// ─── User dropdown link config ────────────────────────────────────────────────
const USER_LINKS = [
  { icon: Bell, label: "Notifications & Messages", href: "#notifications" },
  { icon: ShoppingBag, label: "My Purchases", href: "#purchases" },
  { icon: CreditCard, label: "Payment Method", href: "#payment" },
  { icon: HelpCircle, label: "Help & Support", href: "#support" },
];

// ─── BrandLogo ────────────────────────────────────────────────────────────────
function BrandLogo({
  isOpen,
  isDark,
  mounted,
}: {
  isOpen: boolean;
  isDark: boolean;
  mounted: boolean;
}) {
  if (!mounted) {
    return (
      <div
        className="relative flex items-center justify-center transition-all duration-300 rounded-full overflow-hidden"
        style={{
          height: 52,
          width: isOpen ? 180 : 52,
          background: "transparent",
        }}
      />
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

// ─── Floating User Avatar + Dropdown ─────────────────────────────────────────
// Fixed top-right, completely outside the navbar pill
function UserAvatar({
  isDark,
  userName = "Alex Johnson",
}: {
  isDark: boolean;
  userName?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const avatarBg = "#c8ff00";
  const avatarFg = "#1a2000";

  return (
    <div ref={ref} className="fixed z-50 right-5 top-5">
      {/* Avatar circle */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="User menu"
        aria-expanded={open}
        className="flex items-center justify-center rounded-full font-bold text-sm select-none cursor-pointer"
        style={{
          width: 48,
          height: 48,
          background: avatarBg,
          color: avatarFg,
          letterSpacing: "0.05em",
          fontFamily: "inherit",
          boxShadow: open
            ? `0 0 0 2.5px ${avatarBg}, 0 0 24px rgba(200,255,0,0.50), 0 4px 20px rgba(0,0,0,0.22)`
            : `0 0 0 2px rgba(200,255,0,0.45), 0 4px 18px rgba(0,0,0,0.18)`,
          transition: "box-shadow 0.3s ease",
        }}
      >
        <User size={20} strokeWidth={2.2} />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 360,
              damping: 28,
              mass: 0.65,
            }}
            className="absolute right-0 top-[calc(100%+10px)] rounded-2xl overflow-hidden"
            style={{
              width: 244,
              background: isDark
                ? "rgba(12,13,17,0.96)"
                : "rgba(255,255,255,0.96)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: "1px solid rgba(200,255,0,0.20)",
              boxShadow:
                "0 12px 48px rgba(0,0,0,0.22), 0 0 0 1px rgba(200,255,0,0.08)",
              zIndex: 100,
            }}
          >
            {/* Greeting header */}
            <div
              className="px-4 py-3.5 border-b flex items-center gap-3"
              style={{ borderColor: "rgba(200,255,0,0.14)" }}
            >
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
                style={{
                  width: 32,
                  height: 32,
                  background: avatarBg,
                  color: avatarFg,
                  letterSpacing: "0.05em",
                }}
              >
                <User size={14} strokeWidth={2.3} />
              </span>
              <div className="min-w-0">
                <p
                  className="text-[11px] opacity-40 font-medium leading-none mb-1"
                  style={{ color: "var(--fg-primary)" }}
                >
                  Signed in as
                </p>
                <p
                  className="text-sm font-semibold truncate leading-none"
                  style={{ color: "#c8ff00" }}
                >
                  Hi, {userName.split(" ")[0]} 👋
                </p>
              </div>
            </div>

            {/* Menu links */}
            <div className="py-1.5">
              {USER_LINKS.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 group"
                  style={{ color: "var(--fg-primary)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = isDark
                      ? "rgba(200,255,0,0.07)"
                      : "rgba(160,200,0,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                  }}
                >
                  <Icon
                    size={14}
                    strokeWidth={1.8}
                    className="flex-shrink-0 opacity-75 group-hover:opacity-100 transition-opacity"
                    style={{ color: isDark ? "#c8ff00" : "#7c8f00" }}
                  />
                  <span className="opacity-65 group-hover:opacity-100 transition-opacity">
                    {label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div
              className="px-2 pb-2.5 pt-1 border-t"
              style={{ borderColor: "rgba(200,255,0,0.10)" }}
            >
              <button
                className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm transition-all duration-150 group"
                style={{ color: isDark ? "#ff6b6b" : "#dc2626" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,107,107,0.10)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }}
              >
                <LogOut
                  size={14}
                  strokeWidth={1.8}
                  className="opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
                <span className="opacity-90 group-hover:opacity-100 transition-opacity font-medium">
                  Logout
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile sidebar ───────────────────────────────────────────────────────────
function MobileSidebar({
  open,
  onClose,
  isDark,
  toggleTheme,
  sectionColor,
  mounted,
}: {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  sectionColor: SectionColor;
  mounted: boolean;
}) {
  const NAV_LINKS = [
    { href: "#programs", label: "Programs" },
    { href: "#subscriptions", label: "Subscriptions" },
    { href: "#resources", label: "Resources" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{
              background: "rgba(0,0,0,0.50)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.85,
            }}
            className="fixed left-0 top-0 bottom-0 z-50 flex flex-col"
            style={{
              width: 288,
              background: isDark
                ? "rgba(10,10,14,0.97)"
                : "rgba(252,252,255,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRight: `1px solid ${sectionColor.color}20`,
              boxShadow: "4px 0 48px rgba(0,0,0,0.24)",
            }}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: `${sectionColor.color}18` }}
            >
              <div className="flex items-center">
                <BrandLogo isOpen={true} isDark={isDark} mounted={mounted} />
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.05)",
                  color: "var(--fg-primary)",
                }}
              >
                <X size={15} strokeWidth={2} />
              </button>
            </div>

            {/* Nav links */}
            <div className="px-3 pt-4 pb-2">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.04 + i * 0.055,
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  }}
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-medium transition-all mb-0.5 group"
                    style={{ color: "var(--fg-primary)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        `${sectionColor.color}10`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ background: sectionColor.color }}
                    />
                    <span className="opacity-75 group-hover:opacity-100 transition-opacity">
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom: theme toggle */}
            <div
              className="mt-auto px-5 pb-6 pt-4 border-t"
              style={{ borderColor: `${sectionColor.color}18` }}
            >
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm mb-3 transition-all"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.04)",
                    border: `1px solid ${sectionColor.color}18`,
                    color: "var(--fg-primary)",
                  }}
                >
                  <span className="opacity-65 font-medium">
                    {isDark ? "Dark mode" : "Light mode"}
                  </span>
                  <span
                    className="flex items-center justify-center rounded-full w-7 h-7"
                    style={{
                      background: isDark
                        ? "rgba(255,230,0,0.14)"
                        : "rgba(0,150,255,0.10)",
                      color: isDark ? "#ffe600" : "#0096ff",
                    }}
                  >
                    {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  </span>
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Navbar({
  userName = "Alex Johnson",
}: {
  userName?: string;
}) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clickedOpen, setClickedOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sectionColor, setSectionColor] = useState<SectionColor>(
    SECTION_COLORS[0],
  );
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isInsideNav = useRef(false);
  const navRef = useRef<HTMLElement | null>(null);

  // ── Mount ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  // ── Responsive ────────────────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // ── Scroll + section detection ────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY < 10);
      let active = SECTION_COLORS[0];
      for (const s of SECTION_COLORS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5)
          active = s;
      }
      setSectionColor(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Theme ─────────────────────────────────────────────────────────────────
  function toggleTheme() {
    const nowDark = document.documentElement.classList.toggle("dark");
    setIsDark(nowDark);
    try {
      localStorage.setItem("theme", nowDark ? "dark" : "light");
    } catch {}
  }

  // ── Desktop open state ────────────────────────────────────────────────────
  const isOpen = !isMobile && (isAtTop || hovered || clickedOpen);

  // ── Event handlers ────────────────────────────────────────────────────────
  function handleNavMouseEnter() {
    if (isMobile) return;
    isInsideNav.current = true;
    if (!isAtTop) setHovered(true);
  }

  function handleNavMouseLeave(e: React.MouseEvent) {
    if (isMobile) return;
    isInsideNav.current = false;
    if (isAtTop) return;
    const rel = e.relatedTarget as Node | null;
    if (navRef.current && rel && navRef.current.contains(rel)) return;
    setHovered(false);
    setClickedOpen(false);
  }

  function handleNavClick() {
    if (isMobile) {
      setSidebarOpen(true);
      return;
    }
    if (!isAtTop) setClickedOpen((p) => !p);
  }

  function handleBrandClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (isMobile) {
      setSidebarOpen(true);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setHovered(false);
    setClickedOpen(false);
  }

  // ── Shared floating user avatar (top-right, outside navbar) ───────────────
  const floatingUser = (
    <UserAvatar isDark={isDark} userName={userName} />
  );

  // ══════════════════════════════════════════════════════════════════════════
  // MOBILE render
  // ══════════════════════════════════════════════════════════════════════════
  if (isMobile) {
    return (
      <>
        {floatingUser}

        <MobileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isDark={isDark}
          toggleTheme={toggleTheme}
          sectionColor={sectionColor}
          mounted={mounted}
        />

        {/* Hamburger pill — top-left */}
        {!sidebarOpen && (
          <div className="fixed z-50 left-4 top-4">
            <motion.button
              onClick={() => setSidebarOpen(true)}
              whileTap={{ scale: 0.92 }}
              className="relative flex items-center justify-center rounded-full overflow-hidden"
              aria-label="Open navigation"
              style={{
                width: 52,
                height: 52,
                background: "var(--bg-nav)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: `1.5px solid ${sectionColor.color}`,
                boxShadow: `0 0 0 1px ${sectionColor.color}40, 0 0 18px ${sectionColor.glow}, var(--shadow-nav)`,
                color: sectionColor.color,
                transition: "border-color 0.6s ease, box-shadow 0.6s ease",
              }}
            >
              <BrandLogo isOpen={false} isDark={isDark} mounted={mounted} />
            </motion.button>
          </div>
        )}
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // DESKTOP render
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <>
      {/* Floating user avatar — top-right, independent of navbar */}
      {floatingUser}

      {/* Navbar pill — top-left */}
      <div className="fixed z-50 left-5 top-5">
        <motion.nav
          ref={navRef}
          aria-label="Main navigation"
          onMouseEnter={handleNavMouseEnter}
          onMouseLeave={handleNavMouseLeave}
          onClick={handleNavClick}
          animate={{
            width: isOpen ? 580 : 52,
            height: isOpen ? 64 : 52,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 24,
            mass: 0.9,
          }}
          className="relative flex items-center justify-center rounded-full border"
          style={{
            background: isOpen
              ? `color-mix(in srgb, ${sectionColor.color} 8%, var(--bg-nav))`
              : "var(--bg-nav)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: isOpen
              ? `0 0 0 1px ${sectionColor.color}40, var(--shadow-nav)`
              : `0 0 0 1px ${sectionColor.color}, 0 0 16px ${sectionColor.glow}, var(--shadow-nav)`,
            borderColor: isOpen
              ? `${sectionColor.color}40`
              : sectionColor.color,
            overflow: "visible",
            paddingLeft: isOpen ? 8 : 0,
            paddingRight: isOpen ? 8 : 0,
            cursor: !isAtTop ? "pointer" : "default",
            transition: "border-color 0.6s ease, box-shadow 0.6s ease",
          }}
        >
          {/* Inner clip wrapper */}
          <div className="flex items-center w-full overflow-hidden rounded-full">
            {/* Brand button */}
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

            {/* Expanded content — nav links + theme toggle ONLY (no user here) */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center flex-1 justify-between pl-4 pr-2"
                >
                  {/* Nav links */}
                  <div className="flex items-center gap-5 text-sm font-medium text-[var(--fg-primary)]">
                    {[
                      { href: "#programs", label: "Programs" },
                      { href: "#subscriptions", label: "Subscriptions" },
                      { href: "#resources", label: "Resources" },
                    ].map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-75 hover:opacity-100 transition-opacity whitespace-nowrap"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>

                  {/* Theme toggle — only right-side control in navbar */}
                  {mounted && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTheme();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Toggle theme"
                      className="cursor-pointer flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300"
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
    </>
  );
}
