"use client";

import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import clsx from "clsx";
import {
  BarChart3,
  ChevronRight,
  LayoutDashboard,
  Users,
  Megaphone,
  Settings,
  BadgeDollarSign,
  ShieldCheck,
  FileText,
  MessageSquare,
  Lock,
  FileBarChart2,
  BookOpen,
  UserCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Moon,
  Sun,
} from "lucide-react";

import type { PageId } from "./SuperAdminShell";

interface Props {
  activePage: PageId;
  setPage: (p: PageId) => void;
  openAddAdmin: () => void;
  openAddStudent: () => void;
}

// ─────────────────────────────────────────────────────────────
// Tooltip
// ─────────────────────────────────────────────────────────────
function NavTooltip({
  label,
  collapsed,
  children,
}: {
  label: string;
  collapsed: boolean;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState<{ top: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const show = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();

      setPos({
        top: rect.top + rect.height / 2,
      });
    }
  };

  const hide = () => setPos(null);

  if (!collapsed) return <>{children}</>;

  return (
    <div ref={ref} onMouseEnter={show} onMouseLeave={hide} className="relative">
      {children}

      {pos && (
        <div
          className="fixed z-[9999] whitespace-nowrap rounded-xl border border-white/10 bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-2xl backdrop-blur-sm pointer-events-none"
          style={{
            top: pos.top,
            left: 74,
            transform: "translateY(-50%)",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  activePage,
  setPage,
  openAddAdmin,
  openAddStudent,
}: Props) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialDark = document.documentElement.classList.contains("dark");

    setIsDark(initialDark);
    setMounted(true);

    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");

      setIsDark(isDarkNow);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  function toggle() {
    const nowDark = document.documentElement.classList.toggle("dark");
    setIsDark(nowDark);
    try {
      localStorage.setItem("theme", nowDark ? "dark" : "light");
    } catch {}
  }

  const [collapsed, setCollapsed] = useState(false);

  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({
    "sub-courses": true,
    "sub-students": false,
    "sub-instructors": false,
    "sub-exams": false,
  });

  const toggleSub = (id: string) => {
    setOpenSubs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ─────────────────────────────────────────────────────────────
  // Nav Item
  // ─────────────────────────────────────────────────────────────
  const navItem = (
    id: PageId,
    icon: React.ReactNode,
    label: string,
    badge?: number,
  ) => {
    const isActive = activePage === id;

    return (
      <NavTooltip label={label} collapsed={collapsed}>
        <div
          onClick={() => setPage(id)}
          className={clsx(
            "relative mx-1.5 flex cursor-pointer items-center rounded-xl text-sm font-medium transition-all duration-200",
            collapsed ? "justify-center p-3" : "gap-2.5 px-3 py-2.5",
            isActive
              ? "bg-gradient-to-br from-emerald-400 via-lime-300 to-amber-400 text-gray-900 shadow-lg"
              : "hover:bg-[var(--sb-hover)]",
          )}
          style={{
            color: isActive ? "#111827" : "var(--sb-text)",
          }}
        >
          <span className="flex w-5 shrink-0 items-center justify-center">
            {icon}
          </span>

          {!collapsed && <span className="flex-1 truncate">{label}</span>}

          {!collapsed && badge ? (
            <span className="ml-auto rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {badge}
            </span>
          ) : null}

          {collapsed && badge ? (
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
          ) : null}
        </div>
      </NavTooltip>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // Sub Item
  // ─────────────────────────────────────────────────────────────
  const subItem = (label: string, onClick: () => void, isActive = false) => (
    <div
      onClick={onClick}
      className={clsx(
        "mx-1.5 flex cursor-pointer items-center gap-2 rounded-lg py-2 pl-10 pr-2 text-sm transition-all duration-150",
        isActive
          ? "text-emerald-500"
          : "text-[var(--sb-sub-text)] hover:bg-[var(--sb-hover)]",
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current opacity-60" />

      {label}
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // Collapsible Section
  // ─────────────────────────────────────────────────────────────
  const collapsibleSection = (
    subId: string,
    icon: React.ReactNode,
    label: string,
    defaultPage: PageId,
    children: React.ReactNode,
  ) => {
    const isOpen = openSubs[subId];
    const isActive = collapsed && activePage === defaultPage;

    const handleToggle = () => {
      if (collapsed) {
        setCollapsed(false);

        setOpenSubs((prev) => ({
          ...prev,
          [subId]: true,
        }));

        return;
      }

      toggleSub(subId);
    };

    return (
      <div className="relative">
        <NavTooltip label={label} collapsed={collapsed}>
          <div
            onClick={handleToggle}
            className={clsx(
              "relative mx-1.5 flex cursor-pointer items-center rounded-xl text-sm font-medium transition-all duration-200",
              collapsed ? "justify-center p-3" : "gap-2.5 px-3 py-2.5",
              isActive
                ? "bg-gradient-to-br from-emerald-400 via-lime-300 to-amber-400 text-gray-900 shadow-lg"
                : "hover:bg-[var(--sb-hover)]",
            )}
            style={{
              color: isActive ? "#111827" : "var(--sb-text)",
            }}
          >
            <span className="flex w-5 shrink-0 items-center justify-center">
              {icon}
            </span>

            {!collapsed && (
              <>
                <span className="flex-1 truncate">{label}</span>

                <span
                  className={clsx(
                    "transition-transform duration-200",
                    isOpen && "rotate-90",
                  )}
                >
                  <ChevronRight size={14} />
                </span>
              </>
            )}
          </div>
        </NavTooltip>

        {/* Expanded */}
        {!collapsed && (
          <div
            className={clsx(
              "overflow-hidden transition-all duration-200",
              isOpen ? "max-h-80" : "max-h-0",
            )}
          >
            {children}
          </div>
        )}

        {/* Collapsed Popup */}
        {collapsed && isOpen && (
          <div
            className="absolute left-20 top-0 z-[9999] w-52 rounded-2xl border p-1.5 shadow-2xl backdrop-blur-sm"
            style={{
              background: "var(--sb-bg)",
              borderColor: "var(--sb-border)",
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // Section Label
  // ─────────────────────────────────────────────────────────────
  const sectionLabel = (text: string) =>
    collapsed ? (
      <div
        className="mx-3 my-3 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--sb-divider), transparent)",
        }}
      />
    ) : (
      <div
        className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{
          color: "var(--sb-section-lbl)",
        }}
      >
        {text}
      </div>
    );

  return (
    <aside
      className={clsx(
        "sticky top-0 z-40 flex h-screen shrink-0 flex-col overflow-hidden border-r shadow-xl transition-all duration-300",
        collapsed ? "w-[78px] min-w-[78px]" : "w-[260px] min-w-[260px]",
      )}
      style={{
        background: "var(--sb-bg)",
        borderColor: "var(--sb-border)",
      }}
    >
      {/* ───────────────── Header ───────────────── */}
      <div
        className="flex h-[78px] shrink-0 items-center border-b px-4"
        style={{
          borderColor: "var(--sb-border)",
        }}
      >
        {!collapsed ? (
          <>
            {/* Brand */}
            <div className="flex min-w-0 flex-1 flex-col justify-center items-start">
              {mounted && (
                <Image
                  src={
                    isDark
                      ? "/branding/brand_dark.png"
                      : "/branding/brand_light.png"
                  }
                  alt="Brand"
                  width={175}
                  height={40}
                  priority
                  unoptimized
                  className="h-9 w-auto object-contain"
                />
              )}

              <span
                className="mt-0.5 pl-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{
                  color: "var(--sb-section-lbl)",
                }}
              >
                Super Admin Panel
              </span>
            </div>

            {/* Collapse */}
            <button
              onClick={() => {
                setCollapsed(true);

                setOpenSubs({
                  "sub-courses": false,
                  "sub-students": false,
                  "sub-instructors": false,
                  "sub-exams": false,
                });
              }}
              className="flex h-9 w-9  items-center justify-center rounded-xl transition-all duration-150 hover:bg-[var(--sb-hover)]"
            >
              <PanelLeftClose size={17} />
            </button>
          </>
        ) : (
          <div className="relative flex w-full items-center justify-center">
            {/* Logo */}
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl border"
              style={{
                borderColor: "var(--sb-logo-border)",
              }}
            >
              {mounted && (
                <Image
                  src={
                    isDark
                      ? "/branding/logo_dark.png"
                      : "/branding/logo_light.png"
                  }
                  alt="Logo"
                  width={38}
                  height={38}
                  priority
                  unoptimized
                  className="h-full w-full object-contain p-[6px]"
                />
              )}
            </div>

            {/* Expand */}
            <button
              onClick={() => setCollapsed(false)}
              className="absolute -right-6 z-30 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg transition-all duration-150 hover:bg-[var(--sb-hover)]"
            >
              <PanelLeftOpen size={15} />
            </button>
          </div>
        )}
      </div>

      {/* ───────────────── Navigation ───────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-1.5 py-2">
        {/* Overview */}
        <div className="py-1">
          {sectionLabel("Overview")}

          {navItem("dashboard", <LayoutDashboard size={17} />, "Dashboard")}
        </div>

        {/* Learning */}
        <div className="py-1">
          {sectionLabel("Learning")}

          {collapsibleSection(
            "sub-courses",
            <BookOpen size={17} />,
            "Courses",
            "instructors",
            <>
              {subItem(
                "All Courses",
                () => setPage("instructors"),
                activePage === "instructors",
              )}

              {subItem("Add Course", openAddAdmin)}

              {subItem("Course Content", () => setPage("instructors"))}
            </>,
          )}

          {collapsibleSection(
            "sub-students",
            <Users size={17} />,
            "Students",
            "Students",
            <>
              {subItem(
                "All Students",
                () => setPage("Students"),
                activePage === "Students",
              )}

              {subItem("Add Student", openAddStudent)}

              {subItem("Enrollments", () => setPage("Students"))}
            </>,
          )}

          {collapsibleSection(
            "sub-instructors",
            <UserCheck size={17} />,
            "Instructors",
            "instructors",
            <>
              {subItem(
                "All Instructors",
                () => setPage("instructors"),
                activePage === "instructors",
              )}

              {subItem("Add Instructor", () => setPage("instructors"))}
            </>,
          )}

          {collapsibleSection(
            "sub-exams",
            <FileText size={17} />,
            "Quiz / Exams",
            "exams",
            <>
              {subItem(
                "All Exams",
                () => setPage("exams"),
                activePage === "exams",
              )}

              {subItem("Create Exam", () => setPage("exams"))}

              {subItem("Results", () => setPage("exams"))}
            </>,
          )}
        </div>

        {/* Business */}
        <div className="py-1">
          {sectionLabel("Business")}

          {navItem("sales", <BarChart3 size={17} />, "Sales Dashboard")}

          {navItem("revenue", <BadgeDollarSign size={17} />, "Revenue")}

          {navItem(
            "tickets",
            <MessageSquare size={17} />,
            "Support Tickets",
            5,
          )}

          {navItem("access", <Lock size={17} />, "Access Control")}

          {navItem("announcements", <Megaphone size={17} />, "Announcements")}
        </div>

        {/* System */}
        <div className="py-1">
          {sectionLabel("System")}

          {navItem("reports", <FileBarChart2 size={17} />, "Reports")}

          {navItem("audit", <ShieldCheck size={17} />, "Audit Logs")}

          {navItem("settings", <Settings size={17} />, "Settings")}
        </div>
      </nav>

      {/* ───────────────── Footer ───────────────── */}
      <div
        className="border-t p-2.5"
        style={{
          borderColor: "var(--sb-border)",
          background: "var(--sb-footer-bg)",
        }}
      >
        {!collapsed ? (
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-amber-400 text-sm font-black text-gray-900">
              SA
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div
                className="truncate text-sm font-semibold"
                style={{
                  color: "var(--sb-footer-name)",
                }}
              >
                Super Admin
              </div>

              <div
                className="truncate text-[11px]"
                style={{
                  color: "var(--sb-footer-email)",
                }}
              >
                admin@platform.com
              </div>
            </div>

            {/* Theme */}
            <button
              onClick={toggle}
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-150",
                isDark
                  ? "border-amber-500/30 bg-amber-500/15 text-amber-400 hover:bg-amber-500/25"
                  : "border-black/10 text-slate-500 hover:bg-black/5",
              )}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={toggle}
              className={clsx(
                "flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-150",
                isDark
                  ? "border-amber-500/30 bg-amber-500/15 text-amber-400 hover:bg-amber-500/25"
                  : "border-black/10 text-slate-500 hover:bg-black/5",
              )}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
