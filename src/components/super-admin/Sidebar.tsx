"use client";

import { useState, useRef } from "react";
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
import { useTheme } from "../../lib/useTheme";
import type { PageId } from "./SuperAdminShell";

interface Props {
  activePage: PageId;
  setPage: (p: PageId) => void;
  openAddAdmin: () => void;
  openAddTenant: () => void;
}

// ─── Tooltip (collapsed mode only) ────────────────────────────
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
      setPos({ top: rect.top + rect.height / 2 });
    }
  };
  const hide = () => setPos(null);

  if (!collapsed) return <>{children}</>;

  return (
    <div ref={ref} onMouseEnter={show} onMouseLeave={hide} className="relative">
      {children}
      {pos && (
        <div
          className="fixed z-[9999] whitespace-nowrap rounded-lg bg-gray-900 text-xs font-medium text-white shadow-2xl border border-white/10 backdrop-blur-sm px-2.5 py-1.5 pointer-events-none"
          style={{ top: pos.top, left: 68, transform: "translateY(-50%)" }}
        >
          {label}
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 block h-0 w-0 rotate-45 border-t-4 border-r-4 border-b-transparent border-l-transparent border-transparent border-r-gray-900" />
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  activePage,
  setPage,
  openAddAdmin,
  openAddTenant,
}: Props) {
  const { isDark, toggle } = useTheme();

  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({
    "sub-courses": true,
    "sub-students": false,
    "sub-instructors": false,
    "sub-exams": false,
  });
  const [collapsed, setCollapsed] = useState(false);

  const toggleSub = (id: string) =>
    setOpenSubs((prev) => ({ ...prev, [id]: !prev[id] }));

  // ── Flat nav item ──────────────────────────────────────────────
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
          className={clsx(
            "flex items-center gap-2.5 mx-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 select-none relative",
            collapsed ? "justify-center p-2.5 px-0" : "p-2",
            isActive
              ? "bg-gradient-to-br from-emerald-500 to-amber-500 text-gray-900 font-semibold shadow-lg"
              : "hover:bg-[var(--sb-hover)]",
          )}
          style={isActive ? {} : { color: "var(--sb-text)" }}
          onClick={() => setPage(id)}
        >
          <span className="flex items-center justify-center w-5 shrink-0">
            {icon}
          </span>
          {!collapsed && (
            <span className="flex-1 min-w-0 truncate">{label}</span>
          )}
          {!collapsed && badge ? (
            <span className="ml-auto bg-emerald-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {badge}
            </span>
          ) : null}
          {collapsed && badge ? (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          ) : null}
        </div>
      </NavTooltip>
    );
  };

  // ── Sub-item ───────────────────────────────────────────────────
  const subItem = (label: string, onClick: () => void, isActive = false) => (
    <div
      className="flex items-center gap-2 p-1.5 pl-10 mx-1.5 rounded cursor-pointer text-sm font-normal transition-all duration-100 whitespace-nowrap select-none"
      style={{
        color: isActive ? "var(--sb-sub-active)" : "var(--sb-sub-text)",
        fontWeight: isActive ? 500 : 400,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--sb-hover)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      onClick={onClick}
    >
      <span className="w-1 h-1 bg-current rounded-full opacity-50 shrink-0" />
      {label.replace(/^•\s*/, "")}
    </div>
  );

  // ── Collapsible section ────────────────────────────────────────
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
        setOpenSubs((prev) => ({ ...prev, [subId]: true }));
        return;
      }
      toggleSub(subId);
    };

    return (
      <div className="relative">
        <NavTooltip label={label} collapsed={collapsed}>
          <div
            className={clsx(
              "flex items-center gap-2.5 mx-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 select-none relative",
              collapsed ? "justify-center p-2.5 px-0" : "p-2",
              isActive
                ? "bg-gradient-to-br from-emerald-500 to-amber-500 text-gray-900 font-semibold shadow-lg"
                : "hover:bg-[var(--sb-hover)]",
            )}
            style={isActive ? {} : { color: "var(--sb-text)" }}
            onClick={handleToggle}
          >
            <span className="flex items-center justify-center w-5 shrink-0">
              {icon}
            </span>
            {!collapsed && (
              <>
                <span className="flex-1 min-w-0 truncate">{label}</span>
                <span
                  className={clsx(
                    "ml-auto flex items-center shrink-0 transition-transform duration-200",
                    isOpen && "rotate-90",
                  )}
                  style={{ color: "var(--sb-text-muted)" }}
                >
                  <ChevronRight size={13} />
                </span>
              </>
            )}
            {collapsed && (
              <span
                className={clsx(
                  "absolute right-2 top-1/2 -translate-y-1/2 flex items-center transition-transform duration-200 pointer-events-none",
                  isOpen && "rotate-90",
                )}
                style={{ color: "var(--sb-text-muted)" }}
              >
                <ChevronRight size={11} />
              </span>
            )}
          </div>
        </NavTooltip>

        {/* Expanded dropdown */}
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

        {/* Collapsed popup */}
        {collapsed && isOpen && (
          <div
            className="absolute top-0 left-20 w-48 rounded-2xl p-1.5 shadow-2xl z-[9999] backdrop-blur-sm border"
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

  // ── Section label ──────────────────────────────────────────────
  const sectionLabel = (text: string) =>
    collapsed ? (
      <div
        className="mx-2.5 my-2 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--sb-divider), transparent)",
        }}
      />
    ) : (
      <div
        className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-widest"
        style={{ color: "var(--sb-section-lbl)" }}
      >
        {text}
      </div>
    );

  return (
    <aside
      className={clsx(
        "sticky top-0 z-40 h-screen flex flex-col shrink-0 shadow-xl transition-all duration-200 overflow-hidden",
        collapsed ? "w-[72px] min-w-[72px] overflow-visible" : "w-60 min-w-60",
      )}
      style={{
        background: "var(--sb-bg)",
        borderRight: "1px solid var(--sb-border)",
      }}
    >
      {/* ── Logo + collapse toggle ── */}
      <div
        className="flex items-center p-3.5 gap-2 min-h-[60px] shrink-0"
        style={{ borderBottom: "1px solid var(--sb-border)" }}
      >
        {!collapsed && (
          <div className="flex flex-col gap-0.5 flex-1 overflow-hidden">
            {/* Light mode logo */}
            <img
              src="/branding/brand_light.png"
              alt="Nobleman"
              className="block dark:hidden h-9 w-auto"
            />
            {/* Dark mode logo */}
            <img
              src="/branding/brand_dark.png"
              alt="Nobleman"
              className="hidden dark:block h-[46px] w-auto"
            />
            <small
              className="text-[10px] font-medium uppercase tracking-widest"
              style={{ color: "var(--sb-section-lbl)" }}
            >
              Super Admin
            </small>
          </div>
        )}

        {collapsed && (
          <div
            className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center shrink-0"
            style={{ border: "1px solid var(--sb-logo-border)" }}
          >
            <img
              src="/branding/logo_light.png"
              alt="NL"
              className="block dark:hidden w-full h-full object-contain p-1"
            />
            <img
              src="/branding/logo_dark.png"
              alt="NL"
              className="hidden dark:block w-full h-full object-contain p-1"
            />
          </div>
        )}

        <button
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="ml-auto bg-transparent border-0 p-1.5 cursor-pointer rounded-lg transition-all duration-150 flex items-center justify-center shrink-0 relative z-10"
          style={{ color: "var(--sb-toggle-text)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--sb-toggle-hover-bg)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--sb-sub-active)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--sb-toggle-text)";
          }}
          onClick={() => {
            setCollapsed((prev) => {
              if (!prev) {
                setOpenSubs({
                  "sub-courses": false,
                  "sub-students": false,
                  "sub-instructors": false,
                  "sub-exams": false,
                });
              }
              return !prev;
            });
          }}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto overflow-x-visible p-1.5 scrollbar-hide">
        <div className="py-1">
          {sectionLabel("Overview")}
          {navItem("dashboard", <LayoutDashboard size={16} />, "Dashboard")}
        </div>

        <div className="py-1">
          {sectionLabel("Platform")}
          {collapsibleSection(
            "sub-courses",
            <BookOpen size={16} />,
            "Courses",
            "admins",
            <>
              {subItem("All Courses", () => setPage("admins"), activePage === "admins")}
              {subItem("Add Course", openAddAdmin)}
              {subItem("Course Content", openAddAdmin)}
            </>,
          )}
          {collapsibleSection(
            "sub-students",
            <Users size={16} />,
            "Students",
            "tenants",
            <>
              {subItem("All Students", () => setPage("tenants"), activePage === "tenants")}
              {subItem("Add Student", openAddTenant)}
              {subItem("Enrollments", openAddTenant)}
            </>,
          )}
          {collapsibleSection(
            "sub-instructors",
            <UserCheck size={16} />,
            "Instructors",
            "instructors",
            <>
              {subItem("All Instructors", () => setPage("instructors"), activePage === "instructors")}
              {subItem("Add Instructor", () => setPage("instructors"))}
            </>,
          )}
          {collapsibleSection(
            "sub-exams",
            <FileText size={16} />,
            "Quiz / Exams",
            "exams",
            <>
              {subItem("All Exams", () => setPage("exams"), activePage === "exams")}
              {subItem("Create Exam", () => setPage("exams"))}
              {subItem("Results", () => setPage("exams"))}
            </>,
          )}
        </div>

        <div className="py-1">
          {sectionLabel("Business")}
          {navItem("sales", <BarChart3 size={16} />, "Sales Dashboard")}
          {navItem("revenue", <BadgeDollarSign size={16} />, "Platform Revenue")}
          {navItem("tickets", <MessageSquare size={16} />, "Support Tickets", 5)}
          {navItem("access", <Lock size={16} />, "Access Control")}
          {navItem("announcements", <Megaphone size={16} />, "Announcements")}
        </div>

        <div className="py-1">
          {sectionLabel("System")}
          {navItem("reports", <FileBarChart2 size={16} />, "Reports")}
          {navItem("audit", <ShieldCheck size={16} />, "Audit Logs")}
          {navItem("settings", <Settings size={16} />, "System Settings")}
        </div>
      </nav>

      {/* ── Footer ── */}
      <div
        className="flex items-center gap-2 p-2.5 shrink-0"
        style={{
          borderTop: "1px solid var(--sb-border)",
          background: "var(--sb-footer-bg)",
        }}
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-xs font-black text-gray-900 shrink-0">
          SA
        </div>

        {!collapsed && (
          <>
            <div className="flex flex-col min-w-0 overflow-hidden flex-1">
              <span
                className="text-sm font-semibold truncate"
                style={{ color: "var(--sb-footer-name)" }}
              >
                Super Admin
              </span>
              <span
                className="text-[10px] truncate"
                style={{ color: "var(--sb-footer-email)" }}
              >
                superadmin@noblemanlearning.com
              </span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Light mode" : "Dark mode"}
              className={clsx(
                "flex items-center justify-center w-7 h-7 rounded-lg shrink-0 transition-all duration-150 cursor-pointer border",
                isDark
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-400 hover:bg-amber-500/25"
                  : "border-black/12 text-slate-500 hover:bg-black/6 hover:text-slate-700",
              )}
            >
              {isDark ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </>
        )}

        {/* Collapsed: theme toggle floats above footer */}
        {collapsed && (
          <button
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            className={clsx(
              "absolute bottom-[52px] left-1/2 -translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 cursor-pointer border",
              isDark
                ? "bg-amber-500/15 border-amber-500/30 text-amber-400 hover:bg-amber-500/25"
                : "border-black/12 text-slate-500 hover:bg-black/6 hover:text-slate-700",
            )}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        )}
      </div>
    </aside>
  );
}
