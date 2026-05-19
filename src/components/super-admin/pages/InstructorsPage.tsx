"use client";

import { GraduationCap, Star, Users, BookOpen } from "lucide-react";

const instructors = [
  { init: "RK", name: "Rahul Kumar", email: "rahul@acme.com", student: "Acme LMS", courses: 6, students: 420, rating: 4.8, status: "Active", gradient: "from-blue-500 to-blue-400" },
  { init: "PS", name: "Priya Singh", email: "priya@edge.com", student: "EdgeLearn", courses: 4, students: 220, rating: 4.6, status: "Active", gradient: "from-emerald-500 to-emerald-400" },
  { init: "AM", name: "Arjun Mehta", email: "arjun@bright.com", student: "BrightPath", courses: 3, students: 120, rating: 4.3, status: "Active", gradient: "from-amber-500 to-amber-400" },
  { init: "NK", name: "Neha Kapoor", email: "neha@skillhub.com", student: "SkillHub", courses: 8, students: 640, rating: 4.9, status: "Active", gradient: "from-purple-500 to-purple-400" },
  { init: "VR", name: "Vikram Rao", email: "vikram@learnpro.com", student: "LearnPro", courses: 2, students: 80, rating: 4.1, status: "Inactive", gradient: "from-rose-500 to-rose-400" },
];

const stats = [
  { icon: <GraduationCap size={18} />, label: "Total Instructors", val: "42", sub: "Across all students", iconStyle: { background: "rgba(59,130,246,0.15)", color: "#60a5fa" } },
  { icon: <BookOpen size={18} />, label: "Active Courses", val: "96", sub: "Being taught", iconStyle: { background: "rgba(52,211,153,0.15)", color: "#34d399" } },
  { icon: <Users size={18} />, label: "Total Students", val: "4,820", sub: "Under instruction", iconStyle: { background: "rgba(251,146,60,0.15)", color: "#fb923c" } },
  { icon: <Star size={18} />, label: "Avg Rating", val: "4.6", sub: "Platform-wide", iconStyle: { background: "rgba(167,139,250,0.15)", color: "#a78bfa" } },
];

export default function InstructorsPage() {
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
            placeholder="Search instructors…"
            className="flex-1 rounded-lg px-3 py-2 text-sm placeholder-[var(--fg-muted)] outline-none transition-all focus:ring-4 focus:ring-[rgba(200,255,0,0.12)]"
            style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-primary)" }}
          />
          <select
            className="rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
            style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}
          >
            <option>All Students</option>
            <option>Acme LMS</option>
            <option>EdgeLearn</option>
          </select>
          <button className="ml-auto rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-4 py-2 text-xs font-bold text-[#06110c] shadow-lg hover:shadow-xl transition-all">
            + Add Instructor
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]" style={{ background: "rgba(255,255,255,0.03)" }}>
                {["Instructor", "Student", "Courses", "Students", "Rating", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left font-bold ${h === "Actions" ? "text-center" : ""}`} style={{ color: "var(--fg-primary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {instructors.map((i) => (
                <tr
                  key={i.email}
                  className="border-b border-[var(--border)] transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${i.gradient} text-xs font-bold text-white`}>
                        {i.init}
                      </div>
                      <div>
                        <div className="font-semibold" style={{ color: "var(--fg-primary)" }}>{i.name}</div>
                        <div className="text-xs" style={{ color: "var(--fg-muted)" }}>{i.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--fg-secondary)" }}>{i.student}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{i.courses}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{i.students.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="font-semibold" style={{ color: "var(--fg-primary)" }}>{i.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest"
                      style={i.status === "Active"
                        ? { background: "rgba(52,211,153,0.15)", color: "#34d399" }
                        : { background: "rgba(255,255,255,0.08)", color: "var(--fg-muted)" }
                      }
                    >
                      {i.status}
                    </span>
                  </td>
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
                        style={{ color: "#60a5fa" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(59,130,246,0.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >Edit</button>
                      <button
                        className="rounded px-2 py-1 text-xs font-semibold transition-colors"
                        style={{ color: "#f87171" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >Remove</button>
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
