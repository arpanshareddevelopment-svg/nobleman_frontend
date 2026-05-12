"use client";

import { CheckCircle2, Clock, MessageSquare, AlertCircle } from "lucide-react";

const tickets = [
  { id: "TKT-042", subject: "Unable to access course after payment", tenant: "Acme LMS", user: "Rohit Sharma", priority: "High", status: "Open", time: "10 min ago" },
  { id: "TKT-041", subject: "Certificate not generated after completion", tenant: "EdgeLearn", user: "Priya Mehta", priority: "Medium", status: "In Progress", time: "1 hr ago" },
  { id: "TKT-040", subject: "Video not loading on mobile devices", tenant: "BrightPath", user: "Arjun Das", priority: "Medium", status: "Open", time: "3 hr ago" },
  { id: "TKT-039", subject: "Bulk student import failing with CSV", tenant: "SkillHub", user: "Admin", priority: "High", status: "In Progress", time: "5 hr ago" },
  { id: "TKT-038", subject: "Password reset email not received", tenant: "LearnPro", user: "Sneha Rao", priority: "Low", status: "Resolved", time: "1 day ago" },
  { id: "TKT-037", subject: "Exam timer not working correctly", tenant: "Acme LMS", user: "Vikram K", priority: "High", status: "Resolved", time: "2 days ago" },
];

const stats = [
  { icon: <MessageSquare size={18} />, label: "Open Tickets", val: "5", sub: "Needs attention", bg: "bg-red-100", text: "text-red-600" },
  { icon: <Clock size={18} />, label: "In Progress", val: "2", sub: "Being handled", bg: "bg-amber-100", text: "text-amber-600" },
  { icon: <CheckCircle2 size={18} />, label: "Resolved Today", val: "8", sub: "Closed tickets", bg: "bg-emerald-100", text: "text-emerald-600" },
  { icon: <AlertCircle size={18} />, label: "Avg Response", val: "2.4h", sub: "Last 7 days", bg: "bg-blue-100", text: "text-blue-600" },
];

const priorityColors: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-gray-100 text-gray-600",
};

const statusColors: Record<string, string> = {
  Open: "bg-red-100 text-red-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
};

export default function SupportTicketsPage() {
  return (
    <div>
      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-3.5">
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

      {/* Tickets Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white/70 shadow-sm">
        <div className="flex flex-wrap gap-2.5 border-b border-[var(--border)] bg-white/50 p-4 md:flex-nowrap">
          <input
            type="text"
            placeholder="Search tickets…"
            className="flex-1 rounded-lg border border-black/12 dark:border-white/12 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-muted)] outline-none transition-all focus:border-[rgba(200,255,0,0.5)] focus:ring-4 focus:ring-[rgba(200,255,0,0.12)]"
          />
          <select className="rounded-lg border border-black/12 dark:border-white/12 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-[var(--fg-secondary)] outline-none cursor-pointer">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <select className="rounded-lg border border-black/12 dark:border-white/12 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-[var(--fg-secondary)] outline-none cursor-pointer">
            <option>All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-white/50">
                {["Ticket", "Subject", "Tenant", "User", "Priority", "Status", "Time", "Actions"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left font-bold text-[var(--fg-primary)] ${h === "Actions" ? "text-center" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b border-[var(--border)] hover:bg-white/40 transition-colors">
                  <td className="px-4 py-3 text-xs font-bold text-[var(--fg-secondary)]">{t.id}</td>
                  <td className="px-4 py-3 font-medium text-[var(--fg-primary)] max-w-[220px] truncate">{t.subject}</td>
                  <td className="px-4 py-3 text-xs text-[var(--fg-secondary)]">{t.tenant}</td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{t.user}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest ${priorityColors[t.priority]}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest ${statusColors[t.status]}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--fg-muted)]">{t.time}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1.5">
                      <button className="rounded px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors">View</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors">Reply</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors">Close</button>
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
