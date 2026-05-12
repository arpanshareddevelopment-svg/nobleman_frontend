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
  { icon: <FileText size={18} />, label: "Total Events", val: "2,840", sub: "All time", bgColor: "bg-purple-100" },
  { icon: <Shield size={18} />, label: "Security Events", val: "14", sub: "Last 7 days", bgColor: "bg-red-100" },
  { icon: <Download size={18} />, label: "Data Exports", val: "38", sub: "Last 30 days", bgColor: "bg-yellow-100" },
  { icon: <Users size={18} />, label: "Course Actions", val: "420", sub: "Last 30 days", bgColor: "bg-blue-100" },
];

const tagColors = {
  tg: "bg-green-100 text-green-700",
  tb: "bg-blue-100 text-blue-700",
  tr: "bg-red-100 text-red-700",
  ty: "bg-yellow-100 text-yellow-800",
  tp: "bg-blue-100 text-blue-700",
};

export default function AuditLogsPage() {
  return (
    <div>
      {/* Stats */}
      <div className="mb-5 grid grid-cols-4 gap-3.5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[var(--border)] bg-white/70 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center flex-shrink-0 rounded-lg text-gray-900 ${s.bgColor}`}>
                {s.icon}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500">{s.label}</div>
                <div className="text-2xl font-extrabold text-gray-900">{s.val}</div>
                <div className="text-xs text-gray-500">{s.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Audit table */}
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden bg-white/80 shadow-sm">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-[var(--border)] bg-white/80 px-4.5 py-3.5">
          <input
            placeholder="Search course, action…"
            className="rounded-lg border border-[rgba(15,23,42,0.14)] bg-white/80 px-2.5 py-1.5 text-xs font-medium text-[var(--fg-primary)] placeholder-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)]"
            style={{ width: "200px" }}
          />
          <select className="rounded-lg border border-[rgba(15,23,42,0.14)] bg-white/80 px-2.5 py-1.5 text-xs font-medium text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] cursor-pointer">
            <option>All Students</option>
            <option>Acme LMS</option>
            <option>EdgeLearn</option>
            <option>Platform</option>
          </select>
          <select className="rounded-lg border border-[rgba(15,23,42,0.14)] bg-white/80 px-2.5 py-1.5 text-xs font-medium text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] cursor-pointer">
            <option>All Types</option>
            <option>Create</option>
            <option>Update</option>
            <option>Delete</option>
            <option>Security</option>
            <option>Export</option>
          </select>
          <select className="rounded-lg border border-[rgba(15,23,42,0.14)] bg-white/80 px-2.5 py-1.5 text-xs font-medium text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] cursor-pointer">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <button className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-[rgba(15,23,42,0.14)] bg-transparent px-3 py-1.5 text-xs font-bold text-[var(--fg-secondary)] transition-all hover:text-[var(--fg-primary)] hover:border-opacity-50">
            <Download size={14} /> Export Logs
          </button>
        </div>

        <div>
          {logs.map((l, i) => (
            <div key={i} className="flex items-start gap-3 border-b border-[var(--border)] px-4 py-2.5 last:border-b-0 hover:bg-white/50 transition-colors">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: l.dot }} />
              <div className="flex-1 min-w-0">
                <div className="mb-0.5 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gray-900">{l.course}</span>
                  <span className="text-xs text-[var(--fg-secondary)]">·</span>
                  <span className="text-xs text-[var(--fg-secondary)]">{l.student}</span>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-widest ${tagColors[l.type as keyof typeof tagColors]}`}>
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

