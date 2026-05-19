"use client";

import { useEffect, useRef } from "react";
import {
  BadgeDollarSign,
  BookOpen,
  GraduationCap,
  Megaphone,
  Users,
  UserCheck,
  FileText,
  TrendingUp,
} from "lucide-react";
import type { PageId } from "../SuperAdminShell";

interface Props {
  setPage: (p: PageId) => void;
  openAddAdmin: () => void;
  openAddStudent: () => void;
}

const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const vals = [120, 180, 260, 240, 320, 410, 520];

const stats = [
  { icon: <BookOpen size={18} />, label: "Courses", val: "24", sub: "Active: 20 · Upcoming: 4", iconBg: "rgba(59,130,246,0.15)", iconColor: "#60a5fa" },
  { icon: <GraduationCap size={18} />, label: "Lessons", val: "220", sub: "Published: 180 · Drafts: 40", iconBg: "rgba(132,255,61,0.15)", iconColor: "#84ff3d" },
  { icon: <Users size={18} />, label: "Enrollments", val: "348", sub: "Paid: 301 · Free: 47", iconBg: "rgba(255,207,51,0.15)", iconColor: "#ffcf33" },
  { icon: <UserCheck size={18} />, label: "Students", val: "17", sub: "12 Active · 5 Inactive", iconBg: "rgba(0,196,255,0.15)", iconColor: "#00c4ff" },
];

const quickActions = [
  { icon: <BookOpen size={18} />, label: "Add Course", page: "courses" as PageId },
  { icon: <Users size={18} />, label: "Add Student", page: "students" as PageId },
  { icon: <Megaphone size={18} />, label: "Marketing", page: "revenue" as PageId },
  { icon: <FileText size={18} />, label: "Create Exam", page: "exams" as PageId },
];

const leadSources = [
  { color: "#00c4ff", label: "WhatsApp", val: "181" },
  { color: "#c8ff00", label: "Meta Ads", val: "104" },
  { color: "#ffe600", label: "Organic", val: "63" },
];

const enrollments = [
  { init: "RK", name: "Rohit Kumar", course: "Full Stack Dev", source: "WhatsApp", payment: "Paid ₹12,999", expires: "May 22, 2025", access: "Active", gradient: "from-blue-500 to-blue-400" },
  { init: "PS", name: "Priya Sharma", course: "Digital Marketing", source: "Meta Ads", payment: "Partial ₹5,000", expires: "Jun 10, 2025", access: "Active", gradient: "from-emerald-500 to-emerald-400" },
  { init: "AM", name: "Arjun Mehta", course: "Data Analytics", source: "Organic", payment: "Pending", expires: "Apr 30, 2025", access: "Expired", gradient: "from-amber-500 to-amber-400" },
];

export default function DashboardPage({ setPage }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el || el.childElementCount > 0) return;
    const max = Math.max(...vals);
    months.forEach((m, i) => {
      const h = Math.round((vals[i] / max) * 100);
      const isLast = i === months.length - 1;
      const col = document.createElement("div");
      col.className = "flex-1 flex flex-col items-center gap-1";
      col.innerHTML = `
        <div class="flex-1 flex items-end w-full">
          <div style="height:${h}px;width:100%;border-radius:8px 8px 0 0;background:${
            isLast
              ? "linear-gradient(180deg,#00c4ff,#c8ff00)"
              : "linear-gradient(180deg,rgba(37,99,235,.9),rgba(16,185,129,.45))"
          };cursor:pointer;transition:opacity .2s;min-width:20px;"
          onmouseenter="this.style.opacity='.75'" onmouseleave="this.style.opacity='1'"></div>
        </div>
        <span style="font-size:9px;color:rgba(255,255,255,0.4);">${m}</span>
      `;
      el.appendChild(col);
    });
  }, []);

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3.5 rounded-2xl px-4 py-4 transition-all"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: s.iconBg, color: s.iconColor }}
            >
              {s.icon}
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--fg-muted)" }}>{s.label}</p>
              <p className="font-extrabold text-2xl" style={{ color: "var(--fg-primary)" }}>{s.val}</p>
              <p className="text-xs mt-0.5 font-semibold" style={{ color: "var(--fg-muted)" }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-3.5" style={{ gridTemplateColumns: "1.7fr 1fr" }}>
        {/* Bar Chart */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 font-extrabold text-sm" style={{ color: "var(--fg-primary)" }}>
                <BadgeDollarSign size={16} /> Admin Revenue
              </div>
              <p className="text-xs mt-1" style={{ color: "var(--fg-muted)" }}>
                ₹2,40,000
                <span className="font-bold ml-2" style={{ color: "var(--brand-green-dark)" }}>+36% from last year</span>
              </p>
            </div>
            <select
              className="rounded-lg px-2 py-1 text-xs cursor-pointer"
              style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--fg-secondary)" }}
            >
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div ref={chartRef} className="flex items-end gap-1.5" style={{ height: 110 }} />
        </div>

        {/* Donut Chart */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2 font-extrabold text-sm mb-4" style={{ color: "var(--fg-primary)" }}>
            <TrendingUp size={16} /> Lead Sources
          </div>
          <div className="flex items-center justify-center gap-5">
            <svg width="100" height="100" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#00c4ff" strokeWidth="4" strokeDasharray="52 100" strokeDashoffset="25" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#c8ff00" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-27" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#ffe600" strokeWidth="4" strokeDasharray="18 100" strokeDashoffset="-57" strokeLinecap="round" />
              <text x="18" y="20" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="5.5" fontWeight="800">348</text>
            </svg>
            <div className="flex flex-col gap-2">
              {leadSources.map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--fg-secondary)" }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
                  {l.label}
                  <span className="font-bold ml-auto text-sm" style={{ color: l.color }}>{l.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <p className="font-extrabold text-sm mb-3" style={{ color: "var(--fg-primary)" }}>Quick Actions</p>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((q) => (
            <div
              key={q.label}
              onClick={() => setPage(q.page)}
              className="rounded-xl px-3.5 py-4 flex items-center gap-2.5 cursor-pointer transition-all hover:scale-105"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,255,0,0.35)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              <span style={{ color: "var(--fg-muted)" }} className="flex-shrink-0">{q.icon}</span>
              <span className="font-bold text-xs" style={{ color: "var(--fg-primary)" }}>{q.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Enrollments */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="font-extrabold text-sm" style={{ color: "var(--fg-primary)" }}>Recent Enrollments</p>
          <button
            onClick={() => setPage("Students" as PageId)}
            className="px-3 py-1 text-xs font-semibold rounded-lg transition-colors"
            style={{ color: "var(--fg-muted)", border: "1px solid var(--border)", background: "transparent" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-primary)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
          >
            View All →
          </button>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.03)" }}>
                {["Student", "Course", "Source", "Payment", "Expires", "Access"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide" style={{ color: "var(--fg-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enrollments.map((r) => (
                <tr
                  key={r.name}
                  style={{ borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${r.gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                        {r.init}
                      </div>
                      <p className="text-sm font-semibold" style={{ color: "var(--fg-primary)" }}>{r.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--fg-secondary)" }}>{r.course}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: "rgba(0,196,255,0.15)", color: "#00c4ff" }}>
                      {r.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--fg-secondary)" }}>{r.payment}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--fg-secondary)" }}>{r.expires}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={r.access === "Active"
                        ? { background: "rgba(52,211,153,0.15)", color: "#34d399" }
                        : { background: "rgba(239,68,68,0.15)", color: "#f87171" }}
                    >
                      {r.access}
                    </span>
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
