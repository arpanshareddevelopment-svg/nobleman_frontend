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
  {
    icon: <BookOpen size={18} />,
    label: "Courses",
    val: "24",
    sub: "Active: 20 · Upcoming: 4",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: <GraduationCap size={18} />,
    label: "Lessons",
    val: "220",
    sub: "Published: 180 · Drafts: 40",
    iconBg: "bg-lime-100",
    iconColor: "text-lime-600",
  },
  {
    icon: <Users size={18} />,
    label: "Enrollments",
    val: "348",
    sub: "Paid: 301 · Free: 47",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: <UserCheck size={18} />,
    label: "Students",
    val: "17",
    sub: "12 Active · 5 Inactive",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
];

const quickActions = [
  {
    icon: <BookOpen size={18} />,
    label: "Add Course",
    bg: "bg-blue-50 border-blue-200",
    page: "courses" as PageId,
  },
  {
    icon: <Users size={18} />,
    label: "Add Student",
    bg: "bg-emerald-50 border-emerald-200",
    page: "students" as PageId,
  },
  {
    icon: <Megaphone size={18} />,
    label: "Marketing",
    bg: "bg-amber-50 border-amber-200",
    page: "revenue" as PageId,
  },
  {
    icon: <FileText size={18} />,
    label: "Create Exam",
    bg: "bg-violet-50 border-violet-200",
    page: "exams" as PageId,
  },
];

const leadSources = [
  { color: "#00c4ff", label: "WhatsApp", val: "181" },
  { color: "#c8ff00", label: "Meta Ads", val: "104" },
  { color: "#ffe600", label: "Organic", val: "63" },
];

const enrollments = [
  {
    init: "RK",
    name: "Rohit Kumar",
    course: "Full Stack Dev",
    source: "WhatsApp",
    payment: "Paid ₹12,999",
    expires: "May 22, 2025",
    access: "Active",
    gradient: "from-blue-500 to-blue-400",
    sourceColor: "bg-cyan-100 text-cyan-700",
  },
  {
    init: "PS",
    name: "Priya Sharma",
    course: "Digital Marketing",
    source: "Meta Ads",
    payment: "Partial ₹5,000",
    expires: "Jun 10, 2025",
    access: "Active",
    gradient: "from-emerald-500 to-emerald-400",
    sourceColor: "bg-cyan-100 text-cyan-700",
  },
  {
    init: "AM",
    name: "Arjun Mehta",
    course: "Data Analytics",
    source: "Organic",
    payment: "Pending",
    expires: "Apr 30, 2025",
    access: "Expired",
    gradient: "from-amber-500 to-amber-400",
    sourceColor: "bg-cyan-100 text-cyan-700",
  },
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
          <div
            style="
              height:${h}px;
              width:100%;
              border-radius:8px 8px 0 0;
              background:${
                isLast
                  ? "linear-gradient(180deg,#00c4ff,#c8ff00)"
                  : "linear-gradient(180deg,rgba(37,99,235,.9),rgba(16,185,129,.45))"
              };
              cursor:pointer;
              transition:opacity .2s;
              min-width:20px;
            "
            onmouseenter="this.style.opacity='.75'"
            onmouseleave="this.style.opacity='1'"
          ></div>
        </div>
        <span style="font-size:9px;color:#94a3b8;">${m}</span>
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
            className="flex items-center gap-3.5 bg-white/70 border border-gray-200 rounded-2xl px-4 py-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 hover:border-lime-300/60"
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${s.iconBg} ${s.iconColor}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                {s.label}
              </p>
              <p className="font-extrabold text-2xl text-gray-900 font-sans">
                {s.val}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 font-semibold">
                {s.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-3.5" style={{ gridTemplateColumns: "1.7fr 1fr" }}>
        {/* Bar Chart */}
        <div className="bg-white/70 border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 font-extrabold text-sm text-gray-900">
                <BadgeDollarSign size={16} /> Admin Revenue
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ₹2,40,000
                <span className="text-lime-600 font-bold ml-2">+36% from last year</span>
              </p>
            </div>
            <select className="bg-white/70 border border-gray-300 rounded-lg px-2 py-1 text-xs text-gray-700 cursor-pointer hover:border-lime-300/60">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div ref={chartRef} className="flex items-end gap-1.5" style={{ height: 110 }} />
        </div>

        {/* Donut Chart */}
        <div className="bg-white/70 border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 font-extrabold text-sm text-gray-900 mb-4">
            <TrendingUp size={16} /> Lead Sources
          </div>
          <div className="flex items-center justify-center gap-5">
            <svg width="100" height="100" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(148,163,184,.25)" strokeWidth="4" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#00c4ff" strokeWidth="4" strokeDasharray="52 100" strokeDashoffset="25" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#c8ff00" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-27" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#ffe600" strokeWidth="4" strokeDasharray="18 100" strokeDashoffset="-57" strokeLinecap="round" />
              <text x="18" y="20" textAnchor="middle" fill="#1e293b" fontSize="5.5" fontWeight="800">
                348
              </text>
            </svg>
            <div className="flex flex-col gap-2">
              {leadSources.map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-700">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
                  {l.label}
                  <span className="font-bold ml-auto text-sm" style={{ color: l.color }}>
                    {l.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <p className="font-extrabold text-sm text-gray-900 mb-3">Quick Actions</p>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((q) => (
            <div
              key={q.label}
              onClick={() => setPage(q.page)}
              className={`${q.bg} border-[1.5px] rounded-xl px-3.5 py-4 flex items-center gap-2.5 cursor-pointer transition-all hover:shadow-md hover:scale-105`}
            >
              <span className="text-gray-700 flex-shrink-0">{q.icon}</span>
              <span className="font-bold text-xs text-gray-800">{q.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Enrollments */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="font-extrabold text-sm text-gray-900">Recent Enrollments</p>
          <button
            onClick={() => setPage("students" as PageId)}
            className="px-3 py-1 text-xs font-semibold text-gray-600 bg-transparent border border-gray-300 rounded-lg hover:text-gray-900 hover:border-lime-300/60 transition-colors"
          >
            View All →
          </button>
        </div>

        <div className="bg-white/70 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Student</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Course</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Source</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Payment</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Expires</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Access</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((r) => (
                <tr key={r.name} className="border-b border-gray-200 hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${r.gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                        {r.init}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{r.course}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-cyan-700 bg-cyan-100 uppercase tracking-wider`}>
                      {r.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{r.payment}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{r.expires}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${r.access === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
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

