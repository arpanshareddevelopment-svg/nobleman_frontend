"use client";

import { BadgeCheck, Building2, CircleAlert, TimerReset } from "lucide-react";

interface Props {
  openAddStudent: () => void;
}

const Students = [
  { init: "AL", name: "Acme LMS",    domain: "acme.noblemanlearning.com",    plan: "Enterprise", admins: 4, students: 820, courses: 18, revenue: "?14.2L", status: "tg", statusLabel: "Active",  joined: "Jan 2024" },
  { init: "EL", name: "EdgeLearn",   domain: "edge.noblemanlearning.com",    plan: "Growth",     admins: 2, students: 540, courses: 12, revenue: "?8.6L",  status: "tg", statusLabel: "Active",  joined: "Mar 2024" },
  { init: "BP", name: "BrightPath",  domain: "bright.noblemanlearning.com",  plan: "Growth",     admins: 3, students: 390, courses: 9,  revenue: "?6.1L",  status: "tg", statusLabel: "Active",  joined: "Apr 2024" },
  { init: "SH", name: "SkillHub",    domain: "skillhub.noblemanlearning.com",plan: "Enterprise", admins: 5, students: 1200,courses: 24, revenue: "?22.4L", status: "tg", statusLabel: "Active",  joined: "Nov 2023" },
  { init: "LP", name: "LearnPro",    domain: "learnpro.noblemanlearning.com",plan: "Starter",    admins: 1, students: 120, courses: 4,  revenue: "?1.8L",  status: "ty", statusLabel: "Trial",   joined: "Apr 2025" },
  { init: "EN", name: "EduNext",     domain: "edunext.noblemanlearning.com", plan: "Starter",    admins: 1, students: 80,  courses: 3,  revenue: "?0.9L",  status: "tr", statusLabel: "Suspended",joined: "Feb 2024" },
];

const planColors: Record<string, { bg: string; text: string }> = { 
  Enterprise: { bg: "bg-purple-100", text: "text-purple-700" },
  Growth: { bg: "bg-blue-100", text: "text-blue-700" },
  Starter: { bg: "bg-green-100", text: "text-green-700" }
};

const statusColors: Record<string, { bg: string; text: string }> = {
  tg: { bg: "bg-green-100", text: "text-green-700" },
  ty: { bg: "bg-yellow-100", text: "text-yellow-800" },
  tr: { bg: "bg-red-100", text: "text-red-700" },
};

export default function StudentsPage({ openAddStudent }: Props) {
  return (
    <div>
      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-4 gap-3.5">
        {[
          { icon: <Building2 size={18} />, label: "Total Students",  val: "12", sub: "All organisations",  color: "from-purple-50 to-purple-100/50", dotColor: "bg-purple-400" },
          { icon: <BadgeCheck size={18} />, label: "Active",          val: "10", sub: "Running smoothly",   color: "from-green-50 to-green-100/50", dotColor: "bg-green-400" },
          { icon: <TimerReset size={18} />, label: "Trial",           val: "2",  sub: "Expiring soon",      color: "from-yellow-50 to-yellow-100/50", dotColor: "bg-yellow-400" },
          { icon: <CircleAlert size={18} />, label: "Suspended",       val: "1",  sub: "Needs resolution",   color: "from-red-50 to-red-100/50", dotColor: "bg-red-400" },
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
            placeholder="Search student, domain�"
            className="flex-1 rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)]"
          />
          <select className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] cursor-pointer">
            <option>All Plans</option>
            <option>Enterprise</option>
            <option>Growth</option>
            <option>Starter</option>
          </select>
          <select className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] cursor-pointer">
            <option>All Status</option>
            <option>Active</option>
            <option>Trial</option>
            <option>Suspended</option>
          </select>
          <button
            className="ml-auto rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-4 py-2 text-xs font-bold text-[#06110c] shadow-lg hover:shadow-xl transition-all"
            onClick={openAddStudent}
          >
            + Add Student
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-white/50">
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Student</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Domain</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Plan</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Admins</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Students</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Courses</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Revenue</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Joined</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Status</th>
                <th className="px-4 py-3 text-center font-bold text-[var(--fg-primary)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Students.map((t) => (
                <tr key={t.domain} className="border-b border-[var(--border)] hover:bg-white/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] text-xs font-bold text-[#06110c]">
                        {t.init}
                      </div>
                      <span className="font-semibold text-[var(--fg-primary)]">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--fg-secondary)]">{t.domain}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.75 text-xs font-bold uppercase tracking-widest ${planColors[t.plan]?.bg || "bg-gray-100"} ${planColors[t.plan]?.text || "text-gray-700"}`}>
                      {t.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{t.admins}</td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{t.students.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{t.courses}</td>
                  <td className="px-4 py-3 font-bold text-green-600">{t.revenue}</td>
                  <td className="px-4 py-3 text-xs text-[var(--fg-secondary)]">{t.joined}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.75 text-xs font-bold uppercase tracking-widest ${statusColors[t.status as keyof typeof statusColors]?.bg || "bg-gray-100"} ${statusColors[t.status as keyof typeof statusColors]?.text || "text-gray-700"}`}>
                      {t.statusLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1.5">
                      <button className="rounded px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors">View</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors">Edit</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold text-orange-600 hover:bg-orange-50 transition-colors">Suspend</button>
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

