"use client";

import { BookOpen, Users, FileText, Tag } from "lucide-react";

interface Props {
  openAddAdmin: () => void;
}

const courses = [
  { code: "NBL-101", title: "Principles of Leadership", instructor: "Rahul Kumar", students: 420, student: "Acme LMS", status: "Published" },
  { code: "NBL-202", title: "Advanced Communication", instructor: "Priya Singh", students: 220, student: "EdgeLearn", status: "Published" },
  { code: "NBL-303", title: "Team Management", instructor: "Arjun Mehta", students: 120, student: "BrightPath", status: "Draft" },
  { code: "NBL-404", title: "Sales Strategies", instructor: "Neha Kapoor", students: 86, student: "SkillHub", status: "Published" },
];

const statCards = [
  { icon: <BookOpen size={18} />, label: "Total Courses", val: "96", sub: "Published: 82", iconBg: "rgba(255,207,51,0.15)", iconColor: "#ffcf33" },
  { icon: <Users size={18} />, label: "Instructors", val: "42", sub: "Active: 38", iconBg: "rgba(59,130,246,0.15)", iconColor: "#60a5fa" },
  { icon: <FileText size={18} />, label: "Active Enrollments", val: "4,820", sub: "+18% this month", iconBg: "rgba(52,211,153,0.15)", iconColor: "#34d399" },
  { icon: <Tag size={18} />, label: "Drafts", val: "14", sub: "Needs review", iconBg: "rgba(239,68,68,0.15)", iconColor: "#f87171" },
];

export default function AdminsPage({ openAddAdmin }: Props) {
  return (
    <div>
      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-3.5">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="mb-3 flex items-start justify-between">
              <div className="rounded-full p-2" style={{ background: s.iconBg, color: s.iconColor }}>{s.icon}</div>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>{s.label}</div>
            <div className="mt-1 text-2xl font-bold" style={{ color: "var(--fg-primary)" }}>{s.val}</div>
            <div className="mt-2 text-xs" style={{ color: "var(--fg-secondary)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <div className="flex flex-wrap gap-2.5 p-4 md:flex-nowrap" style={{ borderBottom: "1px solid var(--border)" }}>
          <input
            type="text"
            placeholder="Search courses, instructors…"
            className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-all"
            style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-primary)" }}
          />
          <select className="rounded-lg px-3 py-2 text-sm cursor-pointer outline-none" style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}>
            <option>All Students</option><option>Acme LMS</option><option>EdgeLearn</option>
          </select>
          <select className="rounded-lg px-3 py-2 text-sm cursor-pointer outline-none" style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}>
            <option>All Status</option><option>Published</option><option>Draft</option>
          </select>
          <button
            className="ml-auto rounded-lg px-4 py-2 text-xs font-bold text-[#06110c] shadow-lg hover:shadow-xl transition-all"
            style={{ background: "linear-gradient(135deg, var(--brand-green), var(--brand-yellow))" }}
            onClick={openAddAdmin}
          >
            + Add Course
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.03)" }}>
                {["Course", "Instructor", "Students", "Student", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left font-bold ${h === "Actions" ? "text-center" : ""}`} style={{ color: "var(--fg-primary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.code} style={{ borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold text-[#06110c]" style={{ background: "linear-gradient(135deg, var(--brand-green), var(--brand-yellow))" }}>
                        {c.code.split("-")[1]}
                      </div>
                      <div>
                        <div className="font-semibold" style={{ color: "var(--fg-primary)" }}>{c.title}</div>
                        <div className="text-xs" style={{ color: "var(--fg-muted)" }}>{c.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{c.instructor}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{c.students}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{c.student}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest"
                      style={c.status === "Published"
                        ? { background: "rgba(52,211,153,0.15)", color: "#34d399" }
                        : { background: "rgba(239,68,68,0.15)", color: "#f87171" }}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1.5">
                      <button className="rounded px-2 py-1 text-xs font-semibold transition-colors" style={{ color: "#60a5fa" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>View</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold transition-colors" style={{ color: "#60a5fa" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>Edit</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold transition-colors" style={{ color: "#f87171" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>Delete</button>
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
