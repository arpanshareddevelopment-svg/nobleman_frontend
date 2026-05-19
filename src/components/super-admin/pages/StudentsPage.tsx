"use client";

import { BadgeCheck, Building2, CircleAlert, TimerReset } from "lucide-react";

interface Props {
  openAddStudent: () => void;
}

const Students = [
  { init: "AL", name: "Acme LMS", domain: "acme.noblemanlearning.com", plan: "Enterprise", admins: 4, students: 820, courses: 18, revenue: "₹14.2L", status: "tg", statusLabel: "Active", joined: "Jan 2024" },
  { init: "EL", name: "EdgeLearn", domain: "edge.noblemanlearning.com", plan: "Growth", admins: 2, students: 540, courses: 12, revenue: "₹8.6L", status: "tg", statusLabel: "Active", joined: "Mar 2024" },
  { init: "BP", name: "BrightPath", domain: "bright.noblemanlearning.com", plan: "Growth", admins: 3, students: 390, courses: 9, revenue: "₹6.1L", status: "tg", statusLabel: "Active", joined: "Apr 2024" },
  { init: "SH", name: "SkillHub", domain: "skillhub.noblemanlearning.com", plan: "Enterprise", admins: 5, students: 1200, courses: 24, revenue: "₹22.4L", status: "tg", statusLabel: "Active", joined: "Nov 2023" },
  { init: "LP", name: "LearnPro", domain: "learnpro.noblemanlearning.com", plan: "Starter", admins: 1, students: 120, courses: 4, revenue: "₹1.8L", status: "ty", statusLabel: "Trial", joined: "Apr 2025" },
  { init: "EN", name: "EduNext", domain: "edunext.noblemanlearning.com", plan: "Starter", admins: 1, students: 80, courses: 3, revenue: "₹0.9L", status: "tr", statusLabel: "Suspended", joined: "Feb 2024" },
];

const planStyle: Record<string, { bg: string; color: string }> = {
  Enterprise: { bg: "rgba(167,139,250,0.15)", color: "#a78bfa" },
  Growth: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  Starter: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
};

const statusStyle: Record<string, { bg: string; color: string }> = {
  tg: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
  ty: { bg: "rgba(255,207,51,0.15)", color: "#ffcf33" },
  tr: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
};

const statCards = [
  { icon: <Building2 size={18} />, label: "Total Students", val: "12", sub: "All organisations", iconBg: "rgba(167,139,250,0.15)", iconColor: "#a78bfa" },
  { icon: <BadgeCheck size={18} />, label: "Active", val: "10", sub: "Running smoothly", iconBg: "rgba(52,211,153,0.15)", iconColor: "#34d399" },
  { icon: <TimerReset size={18} />, label: "Trial", val: "2", sub: "Expiring soon", iconBg: "rgba(255,207,51,0.15)", iconColor: "#ffcf33" },
  { icon: <CircleAlert size={18} />, label: "Suspended", val: "1", sub: "Needs resolution", iconBg: "rgba(239,68,68,0.15)", iconColor: "#f87171" },
];

export default function StudentsPage({ openAddStudent }: Props) {
  return (
    <div>
      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-3.5">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="mb-3">
              <div className="rounded-full p-2 inline-flex" style={{ background: s.iconBg, color: s.iconColor }}>{s.icon}</div>
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
          <input type="text" placeholder="Search student, domain…" className="flex-1 rounded-lg px-3 py-2 text-sm outline-none" style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-primary)" }} />
          <select className="rounded-lg px-3 py-2 text-sm cursor-pointer outline-none" style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}>
            <option>All Plans</option><option>Enterprise</option><option>Growth</option><option>Starter</option>
          </select>
          <select className="rounded-lg px-3 py-2 text-sm cursor-pointer outline-none" style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}>
            <option>All Status</option><option>Active</option><option>Trial</option><option>Suspended</option>
          </select>
          <button className="ml-auto rounded-lg px-4 py-2 text-xs font-bold text-[#06110c] shadow-lg hover:shadow-xl transition-all" style={{ background: "linear-gradient(135deg, var(--brand-green), var(--brand-yellow))" }} onClick={openAddStudent}>
            + Add Student
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.03)" }}>
                {["Student", "Domain", "Plan", "Admins", "Students", "Courses", "Revenue", "Joined", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left font-bold ${h === "Actions" ? "text-center" : ""}`} style={{ color: "var(--fg-primary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Students.map((t) => (
                <tr key={t.domain} style={{ borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold text-[#06110c]" style={{ background: "linear-gradient(135deg, var(--brand-green), var(--brand-yellow))" }}>{t.init}</div>
                      <span className="font-semibold" style={{ color: "var(--fg-primary)" }}>{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--fg-muted)" }}>{t.domain}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest" style={{ background: planStyle[t.plan]?.bg, color: planStyle[t.plan]?.color }}>{t.plan}</span>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{t.admins}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{t.students.toLocaleString()}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{t.courses}</td>
                  <td className="px-4 py-3 font-bold" style={{ color: "#34d399" }}>{t.revenue}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--fg-muted)" }}>{t.joined}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest" style={{ background: statusStyle[t.status]?.bg, color: statusStyle[t.status]?.color }}>{t.statusLabel}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1.5">
                      <button className="rounded px-2 py-1 text-xs font-semibold" style={{ color: "#60a5fa" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>View</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold" style={{ color: "#60a5fa" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>Edit</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold" style={{ color: "#fb923c" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(251,146,60,0.1)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>Suspend</button>
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
