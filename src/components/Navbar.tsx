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

// ─── Nav links (full + abbreviated) ──────────────────────────────────────────
const NAV_LINKS = [
  { href: "#programs", label: "Programs", short: "Programs" },
  { href: "#subscriptions", label: "Pricing", short: "Pricing" },
  { href: "#resources", label: "Resources", short: "Resources" },
];

// ─── User dropdown link config ────────────────────────────────────────────────
const USER_LINKS = [
  { icon: Bell, label: "Notifications & Messages", href: "#notifications" },
  { icon: ShoppingBag, label: "My Purchases", href: "#purchases" },
  { icon: CreditCard, label: "Payment Method", href: "#payment" },
  { icon: HelpCircle, label: "Help & Support", href: "#support" },
];

// ─── BrandLogo ────────────────────────────────────────────────────────────────
// KEY FIX: accepts `isMobile` as a prop — no `window.innerWidth` during render.
// The placeholder (mounted=false) uses the same fixed widths on both server
// and client, eliminating the hydration attribute mismatch.
function BrandLogo({
  isOpen,
  isDark,
  mounted,
  isMobile,
}: {
  isOpen: boolean;
  isDark: boolean;
  mounted: boolean;
  isMobile: boolean;
}) {
  // Widths are deterministic and never read from `window` during render.
  const expandedWidth = isMobile ? 110 : 180;
  const collapsedWidth = isMobile ? 40 : 52;
  const displayWidth = isOpen ? expandedWidth : collapsedWidth;

  if (!mounted) {
    // Both server and client first-render agree on this placeholder.
    // `isMobile` starts as `false` on both sides until the hydration
    // is complete, so the placeholder dimensions always match.
    return (
      <div
        className="relative flex items-center justify-center transition-all duration-300 rounded-full overflow-hidden"
        style={{ height: isMobile ? 34 : 52, width: displayWidth, background: "transparent" }}
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
      style={{ height: isMobile ? 34 : 52, width: displayWidth, background: "transparent" }}
    >
      <Image
        src={src}
        alt="Brand"
        fill
        sizes={isOpen ? `${expandedWidth}px` : `${collapsedWidth}px`}
        className={`object-contain py-[2px] ${!isOpen ? "scale-110" : ""}`}
        priority
      />
    </div>
  );
}

// ─── Floating User Avatar + Dropdown ─────────────────────────────────────────
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

  const avatarBg = "#00f7ff";
  const avatarFg = "#001a20";

  return (
    <div ref={ref} className="fixed z-50 right-5 top-6">
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="User menu"
        aria-expanded={open}
        className="flex items-center justify-center rounded-full font-bold text-sm select-none cursor-pointer"
        style={{
          width: 30,
          height: 30,
          background: avatarBg,
          color: avatarFg,
          letterSpacing: "0.05em",
          fontFamily: "inherit",
          boxShadow: open
            ? `0 0 0 2.5px ${avatarBg}, 0 0 24px rgba(200,255,0,0.50), 0 4px 20px rgba(0,0,0,0.22)`
            : `0 0 0 2px rgba(0, 234, 255, 0.45), 0 4px 18px rgba(0,0,0,0.18)`,
          transition: "box-shadow 0.3s ease",
        }}
      >
        <User size={20} strokeWidth={2.2} />
      </motion.button>

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
  // KEY FIX: `mounted` guards ALL browser-dependent state.
  // Both server and client render mounted=false initially → no mismatch.
  const [mounted, setMounted] = useState(false);
  const [sectionColor, setSectionColor] = useState<SectionColor>(
    SECTION_COLORS[0],
  );
  // KEY FIX: `isMobile` starts false on both server and client.
  // It only becomes true after hydration (inside useEffect), so the
  // initial HTML always matches.
  const [isMobile, setIsMobile] = useState(false);

  const isInsideNav = useRef(false);
  const navRef = useRef<HTMLElement | null>(null);

  // ── Mount (client-only — runs after hydration is complete) ─────────────────
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  // ── Responsive — runs after mount, safe to read window ────────────────────
  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [mounted]);

  // ── Scroll + section detection ─────────────────────────────────────────────
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

  // ── Close on outside click / scroll ───────────────────────────────────────
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        clickedOpen &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setClickedOpen(false);
      }
    }
    function handleScrollClose() {
      if (clickedOpen) setClickedOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScrollClose, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScrollClose);
    };
  }, [clickedOpen]);

  // ── Theme ──────────────────────────────────────────────────────────────────
  function toggleTheme() {
    const nowDark = document.documentElement.classList.toggle("dark");
    setIsDark(nowDark);
    try {
      localStorage.setItem("theme", nowDark ? "dark" : "light");
    } catch {}
  }

  const isOpen = isMobile ? clickedOpen : isAtTop || hovered || clickedOpen;

  // ── Event handlers ─────────────────────────────────────────────────────────
  function handleNavMouseEnter() {
    if (isMobile) return;
    isInsideNav.current = true;
    if (!isAtTop) setHovered(true);
  }

  function handleNavMouseLeave(e: React.MouseEvent) {
    if (isMobile) return;
    isInsideNav.current = false;
    if (isAtTop) return;
    const rel = e.relatedTarget;
    if (navRef.current && rel instanceof Node && navRef.current.contains(rel))
      return;
    setHovered(false);
    setClickedOpen(false);
  }

  function handleNavClick() {
    if (isMobile) {
      setClickedOpen(true);
      return;
    }
    if (!isAtTop) setClickedOpen((p) => !p);
  }

  function handleBrandClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (isMobile) {
      setClickedOpen(true);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setHovered(false);
    setClickedOpen(false);
  }

  // ── Mobile pill width — snug but never overflows ───────────────────────────
  // logo(110) + pl-2(8) + links(~180) + gap(8) + toggle(32) + pr-2(8) ≈ 346px
  // safe at min(calc(100vw - 32px), 360px)
  const mobilePillWidth = "min(calc(100vw - 32px), 360px)";

  return (
    <>
      {/* Floating user avatar — top-right, independent of navbar */}
      <UserAvatar isDark={isDark} userName={userName} />

      {/* Navbar pill — top-left */}
      <div
        className={`fixed z-50 ${isMobile ? "left-4 top-4" : "left-5 top-5"}`}
      >
        <motion.nav
          ref={navRef}
          aria-label="Main navigation"
          onMouseEnter={handleNavMouseEnter}
          onMouseLeave={handleNavMouseLeave}
          onClick={handleNavClick}
          animate={{
            width: isOpen
              ? isMobile
                ? mobilePillWidth
                : 580
              : isMobile
                ? 40
                : 52,
            height: isOpen ? (isMobile ? 46 : 64) : isMobile ? 40 : 52,
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
            paddingLeft: 0,
            paddingRight: isOpen ? (isMobile ? 4 : 8) : 0,
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
                className="flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 "
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
                {/* isMobile is passed as a prop — no window reads inside BrandLogo */}
                <BrandLogo
                  isOpen={isOpen}
                  isDark={isDark}
                  mounted={mounted}
                  isMobile={isMobile}
                />
              </button>
            </div>

            {/* Expanded content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                  className={`flex items-center flex-1 justify-between min-w-0 ${
                    isMobile ? "pl-1 pr-1" : "pl-4 pr-2"
                  }`}
                >
                  {/* Nav links */}
                  <div
                    className={`flex items-center min-w-0 ${
                      isMobile ? "gap-2.5 text-[13px]" : "gap-5 text-sm"
                    } font-medium text-[var(--fg-primary)]`}
                  >
                    {NAV_LINKS.map(({ href, label, short }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={(e) => {
                          e.stopPropagation();
                          setClickedOpen(false);
                        }}
                        className="opacity-75 hover:opacity-100 transition-opacity whitespace-nowrap"
                      >
                        {isMobile ? short : label}
                      </Link>
                    ))}
                  </div>

                  {/* Theme toggle */}
                  {mounted && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTheme();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Toggle theme"
                      className="cursor-pointer flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300 ml-1"
                      style={{
                        height: isMobile ? 30 : 32,
                        width: isMobile ? 30 : 32,
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
                      {isDark ? (
                        <Sun size={isMobile ? 14 : 16} />
                      ) : (
                        <Moon size={isMobile ? 14 : 16} />
                      )}
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
