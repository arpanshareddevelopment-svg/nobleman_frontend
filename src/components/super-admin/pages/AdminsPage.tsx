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

export default function AdminsPage({ openAddAdmin }: Props) {
  return (
    <div>
      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-4 gap-3.5">
        {[
          { icon: <BookOpen size={18} />, label: "Total Courses", val: "96", sub: "Published: 82", color: "from-yellow-50 to-yellow-100/50", dotColor: "bg-yellow-400" },
          { icon: <Users size={18} />, label: "Instructors", val: "42", sub: "Active: 38", color: "from-blue-50 to-blue-100/50", dotColor: "bg-blue-400" },
          { icon: <FileText size={18} />, label: "Active Enrollments", val: "4,820", sub: "+18% this month", color: "from-green-50 to-green-100/50", dotColor: "bg-green-400" },
          { icon: <Tag size={18} />, label: "Drafts", val: "14", sub: "Needs review", color: "from-red-50 to-red-100/50", dotColor: "bg-red-400" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl bg-gradient-to-br ${s.color} border border-[var(--border)] p-4 shadow-sm`}>
            <div className="mb-3 flex items-start justify-between">
              <div className={`rounded-full p-2 ${s.dotColor}`}>{s.icon}</div>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)]">{s.label}</div>
            <div className="mt-1 text-2xl font-bold text-[var(--fg-primary)]">{s.val}</div>
            <div className="mt-2 text-xs text-[var(--fg-secondary)]">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white/70 shadow-sm">
        <div className="flex flex-wrap gap-2.5 border-b border-[var(--border)] bg-white/50 p-4 md:flex-nowrap">
          <input
            type="text"
            placeholder="Search courses, instructors�"
            className="flex-1 rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)]"
          />
          <select className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] cursor-pointer">
            <option>All Students</option>
            <option>Acme LMS</option>
            <option>EdgeLearn</option>
          </select>
          <select className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] cursor-pointer">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
          <button
            className="ml-auto rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-4 py-2 text-xs font-bold text-[#06110c] shadow-lg hover:shadow-xl transition-all"
            onClick={openAddAdmin}
          >
            + Add Course
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-white/50">
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Course</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Instructor</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Students</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Student</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Status</th>
                <th className="px-4 py-3 text-center font-bold text-[var(--fg-primary)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.code} className="border-b border-[var(--border)] hover:bg-white/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] text-xs font-bold text-[#06110c]">
                        {c.code}
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--fg-primary)]">{c.title}</div>
                        <div className="text-xs text-[var(--fg-secondary)]">{c.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{c.instructor}</td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{c.students}</td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{c.student}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.75 text-xs font-bold uppercase tracking-widest ${c.status === "Published" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {c.status}
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

