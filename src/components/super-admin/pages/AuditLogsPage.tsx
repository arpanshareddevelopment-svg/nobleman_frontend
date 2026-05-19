"use client";

import { Download, FileText, Shield, ShieldAlert, Users } from "lucide-react";

const logs = [
  { dot: "#10b981", course: "Rahul Kumar", student: "Acme LMS", action: "Added student", detail: "Rohit Sharma enrolled in Full Stack Dev", time: "2 min ago", type: "tg", typeLabel: "Create" },
  { dot: "#2563eb", course: "Priya Singh", student: "EdgeLearn", action: "Published course", detail: "Digital Marketing Pro — set to Published", time: "18 min ago", type: "tb", typeLabel: "Update" },
  { dot: "#ef4444", course: "Arjun Mehta", student: "BrightPath", action: "Login failed", detail: "3 consecutive failed login attempts", time: "1 hr ago", type: "tr", typeLabel: "Security" },
  { dot: "#f59e0b", course: "Neha Kapoor", student: "SkillHub", action: "Exported student data", detail: "Downloaded 1,200 student records as CSV", time: "3 hr ago", type: "ty", typeLabel: "Export" },
  { dot: "#8b5cf6", course: "Super Admin", student: "Platform", action: "Created student", detail: "New student LearnPro onboarded on Starter plan", time: "5 hr ago", type: "tp", typeLabel: "Create" },
  { dot: "#10b981", course: "Vikram Rao", student: "LearnPro", action: "Reset student password", detail: "Password reset for student ID #STU-0421", time: "8 hr ago", type: "tg", typeLabel: "Update" },
  { dot: "#ef4444", course: "Super Admin", student: "Platform", action: "Suspended student", detail: "EduNext suspended — payment overdue 30 days", time: "1 day ago", type: "tr", typeLabel: "Course Action" },
  { dot: "#2563eb", course: "Sneha Das", student: "EduNext", action: "Created exam", detail: "Data Analytics — Final Assessment (50 MCQs)", time: "2 days ago", type: "tb", typeLabel: "Create" },
];

const stats = [
  { icon: <FileText size={18} />, label: "Total Events", val: "2,840", sub: "All time", iconStyle: { background: "rgba(167,139,250,0.15)", color: "#a78bfa" } },
  { icon: <Shield size={18} />, label: "Security Events", val: "14", sub: "Last 7 days", iconStyle: { background: "rgba(239,68,68,0.15)", color: "#f87171" } },
  { icon: <Download size={18} />, label: "Data Exports", val: "38", sub: "Last 30 days", iconStyle: { background: "rgba(255,207,51,0.15)", color: "#ffcf33" } },
  { icon: <Users size={18} />, label: "Course Actions", val: "420", sub: "Last 30 days", iconStyle: { background: "rgba(59,130,246,0.15)", color: "#60a5fa" } },
];

const tagStyles: Record<string, React.CSSProperties> = {
  tg: { background: "rgba(52,211,153,0.15)", color: "#34d399" },
  tb: { background: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  tr: { background: "rgba(239,68,68,0.15)", color: "#f87171" },
  ty: { background: "rgba(255,207,51,0.15)", color: "#ffcf33" },
  tp: { background: "rgba(59,130,246,0.15)", color: "#60a5fa" },
};

export default function AuditLogsPage() {
  return (
    <div>
      {/* Stats */}
      <div className="mb-5 grid grid-cols-4 gap-3.5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[var(--border)] p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ background: "var(--bg-card)" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center flex-shrink-0 rounded-lg" style={s.iconStyle}>
                {s.icon}
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: "var(--fg-muted)" }}>{s.label}</div>
                <div className="text-2xl font-extrabold" style={{ color: "var(--fg-primary)" }}>{s.val}</div>
                <div className="text-xs" style={{ color: "var(--fg-muted)" }}>{s.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Audit table */}
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm" style={{ background: "var(--bg-card)" }}>
        <div className="flex flex-wrap items-center gap-2.5 border-b border-[var(--border)] px-4.5 py-3.5" style={{ background: "var(--bg-card)" }}>
          <input
            placeholder="Search course, action…"
            className="rounded-lg px-2.5 py-1.5 text-xs font-medium placeholder-[var(--fg-secondary)] transition-all focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)]"
            style={{ width: "200px", background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-primary)" }}
          />
          <select
            className="rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] cursor-pointer"
            style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}
          >
            <option>All Students</option>
            <option>Acme LMS</option>
            <option>EdgeLearn</option>
            <option>Platform</option>
          </select>
          <select
            className="rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] cursor-pointer"
            style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}
          >
            <option>All Types</option>
            <option>Create</option>
            <option>Update</option>
            <option>Delete</option>
            <option>Security</option>
            <option>Export</option>
          </select>
          <select
            className="rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] cursor-pointer"
            style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <button className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-transparent px-3 py-1.5 text-xs font-bold transition-all hover:text-[var(--fg-primary)]" style={{ color: "var(--fg-secondary)" }}>
            <Download size={14} /> Export Logs
          </button>
        </div>

        <div>
          {logs.map((l, i) => (
            <div
              key={i}
              className="flex items-start gap-3 border-b border-[var(--border)] px-4 py-2.5 last:border-b-0 transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: l.dot }} />
              <div className="flex-1 min-w-0">
                <div className="mb-0.5 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: "var(--fg-primary)" }}>{l.course}</span>
                  <span className="text-xs" style={{ color: "var(--fg-secondary)" }}>·</span>
                  <span className="text-xs" style={{ color: "var(--fg-secondary)" }}>{l.student}</span>
                  <span
                    className="inline-flex rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-widest"
                    style={tagStyles[l.type as keyof typeof tagStyles]}
                  >
                    {l.typeLabel}
                  </span>
                </div>
                <div className="mb-0.5 text-xs font-semibold" style={{ color: "var(--fg-primary)" }}>
                  {l.action}
                </div>
                <div className="text-xs" style={{ color: "var(--fg-secondary)" }}>
                  {l.detail}
                </div>
              </div>
              <div className="flex-shrink-0 text-xs" style={{ color: "var(--fg-muted)" }}>
                {l.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
