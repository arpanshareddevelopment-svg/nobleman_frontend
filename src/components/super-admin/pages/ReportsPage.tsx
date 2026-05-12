"use client";

import { Download, FileBarChart2, FileText, TrendingUp, Users } from "lucide-react";

const reports = [
  {
    icon: <Users size={20} />,
    title: "Student Enrollment Report",
    desc: "All enrollments, payment status, and access expiry across tenants",
    lastGenerated: "Today, 9:00 AM",
    format: "CSV / PDF",
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Revenue & Billing Report",
    desc: "Platform fees, tenant payments, discounts, and pending dues",
    lastGenerated: "Today, 8:30 AM",
    format: "CSV / PDF",
    bg: "bg-emerald-100",
    text: "text-emerald-600",
  },
  {
    icon: <FileBarChart2 size={20} />,
    title: "Course Performance Report",
    desc: "Completion rates, average scores, and engagement metrics",
    lastGenerated: "Yesterday, 6:00 PM",
    format: "CSV / PDF",
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  {
    icon: <FileText size={20} />,
    title: "Exam & Assessment Report",
    desc: "Attempt counts, pass rates, and score distributions",
    lastGenerated: "May 10, 2025",
    format: "CSV / PDF",
    bg: "bg-amber-100",
    text: "text-amber-600",
  },
  {
    icon: <Users size={20} />,
    title: "Instructor Activity Report",
    desc: "Courses taught, student ratings, and content updates",
    lastGenerated: "May 9, 2025",
    format: "CSV",
    bg: "bg-cyan-100",
    text: "text-cyan-600",
  },
  {
    icon: <FileBarChart2 size={20} />,
    title: "Tenant Health Report",
    desc: "Active users, course completion, and subscription status per tenant",
    lastGenerated: "May 8, 2025",
    format: "PDF",
    bg: "bg-rose-100",
    text: "text-rose-600",
  },
];

const summaryStats = [
  { label: "Reports Generated", val: "284", sub: "All time" },
  { label: "Last Export", val: "Today", sub: "9:00 AM" },
  { label: "Scheduled Reports", val: "3", sub: "Weekly auto-send" },
  { label: "Data Retention", val: "1 Year", sub: "Per policy" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-5">
      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-3.5">
        {summaryStats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-3.5 shadow-sm">
            <div className="text-xs font-semibold text-[var(--fg-secondary)]">{s.label}</div>
            <div className="mt-0.5 text-xl font-extrabold text-[var(--fg-primary)]">{s.val}</div>
            <div className="text-[10px] text-[var(--fg-muted)]">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Report cards */}
      <div className="grid grid-cols-2 gap-4">
        {reports.map((r) => (
          <div
            key={r.title}
            className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-white/80 p-4.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${r.bg} ${r.text}`}>
              {r.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-0.5 text-sm font-bold text-[var(--fg-primary)] font-[Manrope]">{r.title}</div>
              <div className="mb-2 text-xs text-[var(--fg-secondary)]">{r.desc}</div>
              <div className="flex items-center gap-3 text-[10px] text-[var(--fg-muted)]">
                <span>Last: {r.lastGenerated}</span>
                <span className="rounded bg-black/5 dark:bg-white/8 px-1.5 py-0.5 font-semibold">{r.format}</span>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-1.5">
              <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-3 py-1.5 text-xs font-bold text-[#06110c] shadow hover:shadow-md transition-all">
                <Download size={12} /> Export
              </button>
              <button className="rounded-lg border border-[var(--border)] bg-transparent px-3 py-1.5 text-xs font-semibold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-all">
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
