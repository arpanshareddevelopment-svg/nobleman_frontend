"use client";

import clsx from "clsx";
import { Lock, ShieldCheck, Users, KeyRound } from "lucide-react";
import { useState } from "react";

const roles = [
  {
    name: "Super Admin",
    desc: "Full platform access — all tenants, all settings",
    users: 1,
    color: "text-purple-600",
    bg: "bg-purple-100",
    permissions: ["Manage Tenants", "Manage Admins", "View Revenue", "System Settings", "Audit Logs", "Access Control", "Announcements", "Reports"],
  },
  {
    name: "Tenant Admin",
    desc: "Full access within their assigned tenant",
    users: 18,
    color: "text-blue-600",
    bg: "bg-blue-100",
    permissions: ["Manage Courses", "Manage Students", "Manage Instructors", "View Revenue", "Manage Exams", "Announcements", "Support Tickets"],
  },
  {
    name: "Instructor",
    desc: "Can manage their own courses and students",
    users: 42,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    permissions: ["View Courses", "Manage Own Courses", "View Students", "Create Exams", "View Reports"],
  },
  {
    name: "Student",
    desc: "Access to enrolled courses only",
    users: 4820,
    color: "text-amber-600",
    bg: "bg-amber-100",
    permissions: ["View Enrolled Courses", "Take Exams", "Download Certificates", "View Profile"],
  },
];

const stats = [
  { icon: <ShieldCheck size={18} />, label: "Total Roles", val: "4", sub: "Platform-wide", bg: "bg-purple-100", text: "text-purple-600" },
  { icon: <Users size={18} />, label: "Total Users", val: "4,881", sub: "All roles", bg: "bg-blue-100", text: "text-blue-600" },
  { icon: <Lock size={18} />, label: "Locked Accounts", val: "3", sub: "Needs review", bg: "bg-red-100", text: "text-red-600" },
  { icon: <KeyRound size={18} />, label: "2FA Enabled", val: "62%", sub: "Admin users", bg: "bg-emerald-100", text: "text-emerald-600" },
];

export default function AccessControlPage() {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3.5 rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${s.bg} ${s.text}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--fg-secondary)]">{s.label}</p>
              <p className="text-2xl font-extrabold text-[var(--fg-primary)]">{s.val}</p>
              <p className="text-xs text-[var(--fg-muted)]">{s.sub}</p>
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
                  : "border-[var(--border)] bg-white/70 hover:border-black/15 dark:hover:border-white/15 hover:shadow-sm",
              )}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${r.bg} ${r.color}`}>
                <ShieldCheck size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[var(--fg-primary)]">{r.name}</div>
                <div className="text-xs text-[var(--fg-muted)] truncate">{r.desc}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-bold text-[var(--fg-primary)]">{r.users.toLocaleString()}</div>
                <div className="text-[10px] text-[var(--fg-muted)]">users</div>
              </div>
            </div>
          ))}
        </div>

        {/* Permissions panel */}
        <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-[var(--fg-primary)] font-[Manrope]">
                {roles[activeRole].name} — Permissions
              </div>
              <div className="text-xs text-[var(--fg-muted)]">{roles[activeRole].desc}</div>
            </div>
            <button className="rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-3 py-1.5 text-xs font-bold text-[#06110c] shadow hover:shadow-md transition-all">
              Edit Role
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {roles[activeRole].permissions.map((p) => (
              <div
                key={p}
                className="flex items-center gap-2 rounded-lg border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">{p}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
            Changes to role permissions apply to all users with this role immediately.
          </div>
        </div>
      </div>
    </div>
  );
}
