"use client";

import { useEffect, useRef } from "react";
import { BadgeDollarSign, BarChart3, Building2, CalendarDays, GraduationCap, LucideIcon, Megaphone, ShieldCheck, Sparkles, Users } from "lucide-react";
import type { PageId } from "../SuperAdminShell";

interface Props {
  setPage: (p: PageId) => void;
  openAddAdmin: () => void;
  openAddTenant: () => void;
}

const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const vals   = [180, 240, 310, 275, 360, 420, 510];

export default function DashboardPage({ setPage, openAddAdmin, openAddTenant }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el || el.childElementCount > 0) return;
    const max = Math.max(...vals);
    months.forEach((m, i) => {
      const h = Math.round((vals[i] / max) * 100);
      const col = document.createElement("div");
      col.className = "sa-bc-col";
      col.innerHTML = `
        <div style="flex:1;display:flex;align-items:flex-end">
          <div class="sa-bc-bar" style="height:${h}px;background:${
            i === 6
              ? "linear-gradient(180deg,var(--brand-green),var(--brand-yellow))"
              : "linear-gradient(180deg,rgba(200,255,0,.32),rgba(0,196,255,.22))"
          };${i === 6 ? "box-shadow:0 0 12px rgba(200,255,0,.26)" : ""}"></div>
        </div>
        <div class="sa-bc-lbl">${m}</div>`;
      el.appendChild(col);
    });
  }, []);

  return (
    <div>
      {/* Stats */}
      <div className="sa-stats sa-stats-5">
        {[
          { icon: <Building2 size={18} />, label: "Tenants",      val: "12",    sub: "Active: 10 · Trial: 2",   cls: "si-purple" },
          { icon: <Users size={18} />, label: "Admins",        val: "28",    sub: "Active: 24 · Inactive: 4", cls: "si-blue"   },
          { icon: <GraduationCap size={18} />, label: "Total Students", val: "4,820", sub: "↑ 18% this month",         cls: "si-green"  },
          { icon: <Sparkles size={18} />, label: "Total Courses",  val: "96",    sub: "Published: 82",            cls: "si-yellow" },
          { icon: <BadgeDollarSign size={18} />, label: "Platform Rev.",  val: "₹84L",  sub: "↑ 31% YoY",               cls: "si-indigo" },
        ].map((s) => (
          <div className="sa-stat" key={s.label}>
            <div className={`sa-si ${s.cls}`}>{s.icon}</div>
            <div>
              <div className="sa-sl">{s.label}</div>
              <div className="sa-sv">{s.val}</div>
              <div className="sa-ss"><span className="up">{s.sub}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="sa-charts">
        <div className="sa-card">
          <div className="sa-card-hd">
            <div>
              <div className="sa-card-title"><BadgeDollarSign size={16} /> Platform Revenue</div>
              <div className="sa-card-sub">
                ₹84,00,000&nbsp;
                <span style={{ color: "var(--sa-a3)", fontWeight: 700 }}>+31% YoY</span>
              </div>
            </div>
            <select className="sa-mini-sel">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="sa-bar-chart" ref={chartRef} />
        </div>

        <div className="sa-card">
          <div className="sa-card-hd">
            <div className="sa-card-title"><Building2 size={16} /> Tenant Distribution</div>
          </div>
          <div className="sa-donut-row">
            <svg width="100" height="100" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(148,163,184,.25)" strokeWidth="4" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="var(--brand-green)" strokeWidth="4"
                strokeDasharray="50 100" strokeDashoffset="25" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="var(--brand-blue)" strokeWidth="4"
                strokeDasharray="28 100" strokeDashoffset="-25" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="var(--brand-yellow)" strokeWidth="4"
                strokeDasharray="22 100" strokeDashoffset="-53" strokeLinecap="round" />
              <text x="18" y="20" textAnchor="middle" fill="var(--sa-text)"
                fontSize="5.5" fontFamily="Manrope" fontWeight="800">12</text>
            </svg>
            <div className="sa-leg">
              {[
                { color: "var(--brand-green)", label: "Enterprise", val: "6" },
                { color: "var(--brand-blue)", label: "Growth",     val: "4" },
                { color: "var(--brand-yellow)", label: "Starter",    val: "2" },
              ].map((l) => (
                <div className="sa-leg-item" key={l.label}>
                  <div className="sa-leg-dot" style={{ background: l.color }} />
                  {l.label}
                  <span className="sa-leg-val" style={{ color: l.color }}>{l.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div style={{ fontFamily: '"Manrope",sans-serif', fontSize: 14, fontWeight: 800, color: "var(--sa-text)" }}>
          Quick Actions
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { icon: <Users size={18} />, label: "Add Admin",   color: "rgba(0,196,255,.08)", border: "rgba(0,196,255,.18)", fn: openAddAdmin  },
          { icon: <Building2 size={18} />, label: "Add Tenant",  color: "rgba(200,255,0,.08)", border: "rgba(200,255,0,.18)", fn: openAddTenant },
          { icon: <Sparkles size={18} />, label: "Manage Plans",color: "rgba(255,230,0,.08)", border: "rgba(255,230,0,.18)", fn: () => setPage("plans") },
          { icon: <Megaphone size={18} />, label: "Announce",    color: "rgba(0,196,255,.06)", border: "rgba(0,196,255,.16)", fn: () => setPage("announcements") },
        ].map((q) => (
          <div
            key={q.label}
            onClick={q.fn}
            style={{
              background: q.color, border: `1.5px solid ${q.border}`,
              borderRadius: 10, padding: "16px 14px",
              display: "flex", alignItems: "center", gap: 10,
              cursor: "pointer", transition: "all .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            <span style={{ fontSize: 22, color: "var(--sa-text)" }}>{q.icon}</span>
            <span style={{ fontWeight: 700, fontSize: 12, color: "var(--sa-text)" }}>{q.label}</span>
          </div>
        ))}
      </div>

      {/* Recent admins */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontFamily: '"Manrope",sans-serif', fontSize: 14, fontWeight: 800, color: "var(--sa-text)" }}>
          Recent Admin Activity
        </div>
        <button className="sa-btn sa-btn-ghost sa-btn-sm" onClick={() => setPage("audit")}>
          View Audit Log →
        </button>
      </div>
      <div className="sa-table-card">
        <table>
          <thead>
            <tr>
              <th>Admin</th>
              <th>Tenant</th>
              <th>Action</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { init: "RK", name: "Rahul Kumar",  email: "rahul@acme.com",   tenant: "Acme LMS",    action: "Added 3 students",    time: "2 min ago",  status: "tg", statusLabel: "Success" },
              { init: "PS", name: "Priya Singh",  email: "priya@edgelearn.com", tenant: "EdgeLearn", action: "Published new course", time: "18 min ago", status: "tb", statusLabel: "Success" },
              { init: "AM", name: "Arjun Mehta",  email: "arjun@brightpath.com", tenant: "BrightPath", action: "Login attempt failed", time: "1 hr ago",  status: "tr", statusLabel: "Failed"  },
              { init: "NK", name: "Neha Kapoor",  email: "neha@skillhub.com", tenant: "SkillHub",   action: "Exported student data", time: "3 hr ago",  status: "ty", statusLabel: "Warning" },
            ].map((r) => (
              <tr key={r.email}>
                <td>
                  <div className="sa-cu">
                    <div className="sa-ca" style={{ background: "linear-gradient(135deg,var(--brand-green),var(--brand-yellow))", color: "#06110c" }}>{r.init}</div>
                    <div>
                      <div className="sa-cn">{r.name}</div>
                      <div className="sa-cs">{r.email}</div>
                    </div>
                  </div>
                </td>
                <td>{r.tenant}</td>
                <td>{r.action}</td>
                <td style={{ color: "var(--sa-muted2)", fontSize: 11 }}>{r.time}</td>
                <td><span className={`sa-tag ${r.status}`}>{r.statusLabel}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
