"use client";

import { ClipboardList, Clock, FileText, Users } from "lucide-react";

const exams = [
  { code: "EX-001", title: "Full Stack Dev — Final Assessment", tenant: "Acme LMS", questions: 50, duration: "90 min", attempts: 142, avgScore: "74%", status: "Active" },
  { code: "EX-002", title: "Digital Marketing Fundamentals Quiz", tenant: "EdgeLearn", questions: 30, duration: "45 min", attempts: 98, avgScore: "81%", status: "Active" },
  { code: "EX-003", title: "Data Analytics Mid-Term", tenant: "BrightPath", questions: 40, duration: "60 min", attempts: 67, avgScore: "68%", status: "Active" },
  { code: "EX-004", title: "Leadership Principles — Module 2", tenant: "SkillHub", questions: 25, duration: "30 min", attempts: 210, avgScore: "88%", status: "Active" },
  { code: "EX-005", title: "Sales Strategies Assessment", tenant: "SkillHub", questions: 35, duration: "50 min", attempts: 0, avgScore: "—", status: "Draft" },
];

const stats = [
  { icon: <ClipboardList size={18} />, label: "Total Exams", val: "38", sub: "Published: 32", bg: "bg-blue-100", text: "text-blue-600" },
  { icon: <FileText size={18} />, label: "Drafts", val: "6", sub: "Needs review", bg: "bg-amber-100", text: "text-amber-600" },
  { icon: <Users size={18} />, label: "Total Attempts", val: "2,840", sub: "All time", bg: "bg-emerald-100", text: "text-emerald-600" },
  { icon: <Clock size={18} />, label: "Avg Duration", val: "55 min", sub: "Per exam", bg: "bg-purple-100", text: "text-purple-600" },
];

export default function ExamsPage() {
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

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white/70 shadow-sm">
        <div className="flex flex-wrap gap-2.5 border-b border-[var(--border)] bg-white/50 p-4 md:flex-nowrap">
          <input
            type="text"
            placeholder="Search exams…"
            className="flex-1 rounded-lg border border-black/12 dark:border-white/12 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-muted)] outline-none transition-all focus:border-[rgba(200,255,0,0.5)] focus:ring-4 focus:ring-[rgba(200,255,0,0.12)]"
          />
          <select className="rounded-lg border border-black/12 dark:border-white/12 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-[var(--fg-secondary)] outline-none cursor-pointer">
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
          </select>
          <button className="ml-auto rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-4 py-2 text-xs font-bold text-[#06110c] shadow-lg hover:shadow-xl transition-all">
            + Create Exam
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-white/50">
                {["Exam", "Tenant", "Questions", "Duration", "Attempts", "Avg Score", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left font-bold text-[var(--fg-primary)] ${h === "Actions" ? "text-center" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exams.map((e) => (
                <tr key={e.code} className="border-b border-[var(--border)] hover:bg-white/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] text-[10px] font-bold text-[#06110c]">
                        {e.code}
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--fg-primary)]">{e.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--fg-secondary)]">{e.tenant}</td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{e.questions}</td>
                  <td className="px-4 py-3 text-[var(--fg-secondary)]">{e.duration}</td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{e.attempts}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--fg-primary)]">{e.avgScore}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest ${e.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1.5">
                      <button className="rounded px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors">View</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors">Edit</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors">Delete</button>
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
