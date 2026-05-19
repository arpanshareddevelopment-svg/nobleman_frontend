"use client";

import { ClipboardList, Clock, FileText, Users } from "lucide-react";

const exams = [
  { code: "EX-001", title: "Full Stack Dev — Final Assessment", student: "Acme LMS", questions: 50, duration: "90 min", attempts: 142, avgScore: "74%", status: "Active" },
  { code: "EX-002", title: "Digital Marketing Fundamentals Quiz", student: "EdgeLearn", questions: 30, duration: "45 min", attempts: 98, avgScore: "81%", status: "Active" },
  { code: "EX-003", title: "Data Analytics Mid-Term", student: "BrightPath", questions: 40, duration: "60 min", attempts: 67, avgScore: "68%", status: "Active" },
  { code: "EX-004", title: "Leadership Principles — Module 2", student: "SkillHub", questions: 25, duration: "30 min", attempts: 210, avgScore: "88%", status: "Active" },
  { code: "EX-005", title: "Sales Strategies Assessment", student: "SkillHub", questions: 35, duration: "50 min", attempts: 0, avgScore: "—", status: "Draft" },
];

const stats = [
  { icon: <ClipboardList size={18} />, label: "Total Exams", val: "38", sub: "Published: 32", iconStyle: { background: "rgba(59,130,246,0.15)", color: "#60a5fa" } },
  { icon: <FileText size={18} />, label: "Drafts", val: "6", sub: "Needs review", iconStyle: { background: "rgba(251,146,60,0.15)", color: "#fb923c" } },
  { icon: <Users size={18} />, label: "Total Attempts", val: "2,840", sub: "All time", iconStyle: { background: "rgba(52,211,153,0.15)", color: "#34d399" } },
  { icon: <Clock size={18} />, label: "Avg Duration", val: "55 min", sub: "Per exam", iconStyle: { background: "rgba(167,139,250,0.15)", color: "#a78bfa" } },
];

export default function ExamsPage() {
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

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm" style={{ background: "var(--bg-card)" }}>
        <div className="flex flex-wrap gap-2.5 border-b border-[var(--border)] p-4 md:flex-nowrap" style={{ background: "rgba(255,255,255,0.03)" }}>
          <input
            type="text"
            placeholder="Search exams…"
            className="flex-1 rounded-lg px-3 py-2 text-sm placeholder-[var(--fg-muted)] outline-none transition-all focus:ring-4 focus:ring-[rgba(200,255,0,0.12)]"
            style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-primary)" }}
          />
          <select
            className="rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
            style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}
          >
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
              <tr className="border-b border-[var(--border)]" style={{ background: "rgba(255,255,255,0.03)" }}>
                {["Exam", "Student", "Questions", "Duration", "Attempts", "Avg Score", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left font-bold ${h === "Actions" ? "text-center" : ""}`} style={{ color: "var(--fg-primary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exams.map((e) => (
                <tr
                  key={e.code}
                  className="border-b border-[var(--border)] transition-colors"
                  onMouseEnter={(ev) => (ev.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] text-[10px] font-bold text-[#06110c]">
                        {e.code}
                      </div>
                      <div>
                        <div className="font-semibold" style={{ color: "var(--fg-primary)" }}>{e.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--fg-secondary)" }}>{e.student}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{e.questions}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-secondary)" }}>{e.duration}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{e.attempts}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "var(--fg-primary)" }}>{e.avgScore}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest"
                      style={e.status === "Active"
                        ? { background: "rgba(52,211,153,0.15)", color: "#34d399" }
                        : { background: "rgba(251,146,60,0.15)", color: "#fb923c" }
                      }
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1.5">
                      <button
                        className="rounded px-2 py-1 text-xs font-semibold transition-colors"
                        style={{ color: "#60a5fa" }}
                        onMouseEnter={(ev) => (ev.currentTarget.style.background = "rgba(59,130,246,0.1)")}
                        onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                      >View</button>
                      <button
                        className="rounded px-2 py-1 text-xs font-semibold transition-colors"
                        style={{ color: "#60a5fa" }}
                        onMouseEnter={(ev) => (ev.currentTarget.style.background = "rgba(59,130,246,0.1)")}
                        onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                      >Edit</button>
                      <button
                        className="rounded px-2 py-1 text-xs font-semibold transition-colors"
                        style={{ color: "#f87171" }}
                        onMouseEnter={(ev) => (ev.currentTarget.style.background = "rgba(239,68,68,0.1)")}
                        onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                      >Delete</button>
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
