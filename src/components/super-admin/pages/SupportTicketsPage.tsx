"use client";

import { CheckCircle2, Clock, MessageSquare, AlertCircle } from "lucide-react";

const tickets = [
  { id: "TKT-042", subject: "Unable to access course after payment", student: "Acme LMS", user: "Rohit Sharma", priority: "High", status: "Open", time: "10 min ago" },
  { id: "TKT-041", subject: "Certificate not generated after completion", student: "EdgeLearn", user: "Priya Mehta", priority: "Medium", status: "In Progress", time: "1 hr ago" },
  { id: "TKT-040", subject: "Video not loading on mobile devices", student: "BrightPath", user: "Arjun Das", priority: "Medium", status: "Open", time: "3 hr ago" },
  { id: "TKT-039", subject: "Bulk student import failing with CSV", student: "SkillHub", user: "Admin", priority: "High", status: "In Progress", time: "5 hr ago" },
  { id: "TKT-038", subject: "Password reset email not received", student: "LearnPro", user: "Sneha Rao", priority: "Low", status: "Resolved", time: "1 day ago" },
  { id: "TKT-037", subject: "Exam timer not working correctly", student: "Acme LMS", user: "Vikram K", priority: "High", status: "Resolved", time: "2 days ago" },
];

const stats = [
  { icon: <MessageSquare size={18} />, label: "Open Tickets", val: "5", sub: "Needs attention", iconStyle: { background: "rgba(239,68,68,0.15)", color: "#f87171" } },
  { icon: <Clock size={18} />, label: "In Progress", val: "2", sub: "Being handled", iconStyle: { background: "rgba(251,146,60,0.15)", color: "#fb923c" } },
  { icon: <CheckCircle2 size={18} />, label: "Resolved Today", val: "8", sub: "Closed tickets", iconStyle: { background: "rgba(52,211,153,0.15)", color: "#34d399" } },
  { icon: <AlertCircle size={18} />, label: "Avg Response", val: "2.4h", sub: "Last 7 days", iconStyle: { background: "rgba(59,130,246,0.15)", color: "#60a5fa" } },
];

const priorityStyles: Record<string, React.CSSProperties> = {
  High: { background: "rgba(239,68,68,0.15)", color: "#f87171" },
  Medium: { background: "rgba(251,146,60,0.15)", color: "#fb923c" },
  Low: { background: "rgba(255,255,255,0.08)", color: "var(--fg-muted)" },
};

const statusStyles: Record<string, React.CSSProperties> = {
  Open: { background: "rgba(239,68,68,0.15)", color: "#f87171" },
  "In Progress": { background: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  Resolved: { background: "rgba(52,211,153,0.15)", color: "#34d399" },
};

export default function SupportTicketsPage() {
  return (
    <div>
      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-3.5">
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

      {/* Tickets Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm" style={{ background: "var(--bg-card)" }}>
        <div className="flex flex-wrap gap-2.5 border-b border-[var(--border)] p-4 md:flex-nowrap" style={{ background: "rgba(255,255,255,0.03)" }}>
          <input
            type="text"
            placeholder="Search tickets…"
            className="flex-1 rounded-lg px-3 py-2 text-sm placeholder-[var(--fg-muted)] outline-none transition-all focus:ring-4 focus:ring-[rgba(200,255,0,0.12)]"
            style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-primary)" }}
          />
          <select
            className="rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
            style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}
          >
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <select
            className="rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
            style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}
          >
            <option>All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]" style={{ background: "rgba(255,255,255,0.03)" }}>
                {["Ticket", "Subject", "Student", "User", "Priority", "Status", "Time", "Actions"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left font-bold ${h === "Actions" ? "text-center" : ""}`} style={{ color: "var(--fg-primary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-[var(--border)] transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: "var(--fg-secondary)" }}>{t.id}</td>
                  <td className="px-4 py-3 font-medium max-w-[220px] truncate" style={{ color: "var(--fg-primary)" }}>{t.subject}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--fg-secondary)" }}>{t.student}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{t.user}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest" style={priorityStyles[t.priority]}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest" style={statusStyles[t.status]}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--fg-muted)" }}>{t.time}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1.5">
                      <button
                        className="rounded px-2 py-1 text-xs font-semibold transition-colors"
                        style={{ color: "#60a5fa" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(59,130,246,0.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >View</button>
                      <button
                        className="rounded px-2 py-1 text-xs font-semibold transition-colors"
                        style={{ color: "#34d399" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(52,211,153,0.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >Reply</button>
                      <button
                        className="rounded px-2 py-1 text-xs font-semibold transition-colors"
                        style={{ color: "var(--fg-muted)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >Close</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
