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
  { icon: <GraduationCap size={18} />, label: "Total Instructors", val: "42", sub: "Across all students", bg: "bg-blue-100", text: "text-blue-600" },
  { icon: <BookOpen size={18} />, label: "Active Courses", val: "96", sub: "Being taught", bg: "bg-emerald-100", text: "text-emerald-600" },
  { icon: <Users size={18} />, label: "Total Students", val: "4,820", sub: "Under instruction", bg: "bg-amber-100", text: "text-amber-600" },
  { icon: <Star size={18} />, label: "Avg Rating", val: "4.6", sub: "Platform-wide", bg: "bg-purple-100", text: "text-purple-600" },
];

export default function InstructorsPage() {
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
            placeholder="Search instructors…"
            className="flex-1 rounded-lg border border-black/12 dark:border-white/12 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-muted)] outline-none transition-all focus:border-[rgba(200,255,0,0.5)] focus:ring-4 focus:ring-[rgba(200,255,0,0.12)]"
          />
          <select className="rounded-lg border border-black/12 dark:border-white/12 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-[var(--fg-secondary)] outline-none cursor-pointer">
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
              <tr className="border-b border-[var(--border)] bg-white/50">
                {["Instructor", "Student", "Courses", "Students", "Rating", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left font-bold text-[var(--fg-primary)] ${h === "Actions" ? "text-center" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {instructors.map((i) => (
                <tr key={i.email} className="border-b border-[var(--border)] hover:bg-white/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${i.gradient} text-xs font-bold text-white`}>
                        {i.init}
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--fg-primary)]">{i.name}</div>
                        <div className="text-xs text-[var(--fg-muted)]">{i.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--fg-secondary)] text-xs">{i.student}</td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{i.courses}</td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{i.students.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-[var(--fg-primary)]">{i.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest ${i.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1.5">
                      <button className="rounded px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors">View</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors">Edit</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors">Remove</button>
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

