"use client";

import clsx from "clsx";
import { Lock, ShieldCheck, Users, KeyRound } from "lucide-react";
import { useState } from "react";

const roles = [
  {
    name: "Super Admin",
    desc: "Full platform access — all students, all settings",
    users: 1,
    iconStyle: { background: "rgba(167,139,250,0.15)", color: "#a78bfa" },
    permissions: ["Manage Students", "Manage Admins", "View Revenue", "System Settings", "Audit Logs", "Access Control", "Announcements", "Reports"],
  },
  {
    name: "Student Admin",
    desc: "Full access within their assigned student",
    users: 18,
    iconStyle: { background: "rgba(59,130,246,0.15)", color: "#60a5fa" },
    permissions: ["Manage Courses", "Manage Students", "Manage Instructors", "View Revenue", "Manage Exams", "Announcements", "Support Tickets"],
  },
  {
    name: "Instructor",
    desc: "Can manage their own courses and students",
    users: 42,
    iconStyle: { background: "rgba(52,211,153,0.15)", color: "#34d399" },
    permissions: ["View Courses", "Manage Own Courses", "View Students", "Create Exams", "View Reports"],
  },
  {
    name: "Student",
    desc: "Access to enrolled courses only",
    users: 4820,
    iconStyle: { background: "rgba(251,146,60,0.15)", color: "#fb923c" },
    permissions: ["View Enrolled Courses", "Take Exams", "Download Certificates", "View Profile"],
  },
];

const stats = [
  { icon: <ShieldCheck size={18} />, label: "Total Roles", val: "4", sub: "Platform-wide", iconStyle: { background: "rgba(167,139,250,0.15)", color: "#a78bfa" } },
  { icon: <Users size={18} />, label: "Total Users", val: "4,881", sub: "All roles", iconStyle: { background: "rgba(59,130,246,0.15)", color: "#60a5fa" } },
  { icon: <Lock size={18} />, label: "Locked Accounts", val: "3", sub: "Needs review", iconStyle: { background: "rgba(239,68,68,0.15)", color: "#f87171" } },
  { icon: <KeyRound size={18} />, label: "2FA Enabled", val: "62%", sub: "Admin users", iconStyle: { background: "rgba(52,211,153,0.15)", color: "#34d399" } },
];

export default function AccessControlPage() {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3.5 rounded-2xl border border-[var(--border)] px-4 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ background: "var(--bg-card)" }}>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={s.iconStyle}>
              {s.icon}
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--fg-secondary)" }}>{s.label}</p>
              <p className="text-2xl font-extrabold" style={{ color: "var(--fg-primary)" }}>{s.val}</p>
              <p className="text-xs" style={{ color: "var(--fg-muted)" }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Role Cards + Permissions */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1.4fr" }}>
        {/* Role list */}
        <div className="space-y-2.5">
          {roles.map((r, i) => (
            <div
              key={r.name}
              onClick={() => setActiveRole(i)}
              className={clsx(
                "flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all",
                activeRole === i
                  ? "border-[rgba(200,255,0,0.5)] bg-gradient-to-br from-[rgba(200,255,0,0.08)] to-[rgba(255,230,0,0.08)] shadow-md"
                  : "border-[var(--border)] hover:shadow-sm",
              )}
              style={activeRole !== i ? { background: "var(--bg-card)" } : undefined}
              onMouseEnter={(e) => {
                if (activeRole !== i) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                if (activeRole !== i) (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
              }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={r.iconStyle}>
                <ShieldCheck size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold" style={{ color: "var(--fg-primary)" }}>{r.name}</div>
                <div className="text-xs truncate" style={{ color: "var(--fg-muted)" }}>{r.desc}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-bold" style={{ color: "var(--fg-primary)" }}>{r.users.toLocaleString()}</div>
                <div className="text-[10px]" style={{ color: "var(--fg-muted)" }}>users</div>
              </div>
            </div>
          ))}
        </div>

        {/* Permissions panel */}
        <div className="rounded-2xl border border-[var(--border)] p-5 shadow-sm" style={{ background: "var(--bg-card)" }}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold font-[Manrope]" style={{ color: "var(--fg-primary)" }}>
                {roles[activeRole].name} — Permissions
              </div>
              <div className="text-xs" style={{ color: "var(--fg-muted)" }}>{roles[activeRole].desc}</div>
            </div>
            <button className="rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-3 py-1.5 text-xs font-bold text-[#06110c] shadow hover:shadow-md transition-all">
              Edit Role
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {roles[activeRole].permissions.map((p) => (
              <div
                key={p}
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium" style={{ color: "#34d399" }}>{p}</span>
              </div>
            ))}
          </div>
          <div
            className="mt-4 rounded-lg px-3 py-2 text-xs"
            style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)", color: "#fb923c" }}
          >
            Changes to role permissions apply to all users with this role immediately.
          </div>
        </div>
      </div>
    </div>
  );
}
