"use client";

import { Download, FileText, Shield, ShieldAlert, Users } from "lucide-react";

const logs = [
  { dot: "#10b981", admin: "Rahul Kumar",   tenant: "Acme LMS",    action: "Added student",          detail: "Rohit Sharma enrolled in Full Stack Dev",    time: "2 min ago",   type: "tg", typeLabel: "Create" },
  { dot: "#2563eb", admin: "Priya Singh",   tenant: "EdgeLearn",   action: "Published course",       detail: "Digital Marketing Pro — set to Published",   time: "18 min ago",  type: "tb", typeLabel: "Update" },
  { dot: "#ef4444", admin: "Arjun Mehta",   tenant: "BrightPath",  action: "Login failed",           detail: "3 consecutive failed login attempts",         time: "1 hr ago",    type: "tr", typeLabel: "Security"},
  { dot: "#f59e0b", admin: "Neha Kapoor",   tenant: "SkillHub",    action: "Exported student data",  detail: "Downloaded 1,200 student records as CSV",    time: "3 hr ago",    type: "ty", typeLabel: "Export" },
  { dot: "#8b5cf6", admin: "Super Admin",   tenant: "Platform",    action: "Created tenant",         detail: "New tenant LearnPro onboarded on Starter plan", time: "5 hr ago",  type: "tp", typeLabel: "Create" },
  { dot: "#10b981", admin: "Vikram Rao",    tenant: "LearnPro",    action: "Reset student password", detail: "Password reset for student ID #STU-0421",    time: "8 hr ago",    type: "tg", typeLabel: "Update" },
  { dot: "#ef4444", admin: "Super Admin",   tenant: "Platform",    action: "Suspended tenant",       detail: "EduNext suspended — payment overdue 30 days","time": "1 day ago", type: "tr", typeLabel: "Admin"  },
  { dot: "#2563eb", admin: "Sneha Das",     tenant: "EduNext",     action: "Created exam",           detail: "Data Analytics — Final Assessment (50 MCQs)", time: "2 days ago",  type: "tb", typeLabel: "Create" },
];

export default function AuditLogsPage() {
  return (
    <div>
      <div className="sa-stats sa-stats-4">
        {[
          { icon: <FileText size={18} />, label: "Total Events",   val: "2,840", sub: "All time",       cls: "si-purple" },
          { icon: <Shield size={18} />, label: "Security Events", val: "14",   sub: "Last 7 days",    cls: "si-red"    },
          { icon: <Download size={18} />, label: "Data Exports",    val: "38",   sub: "Last 30 days",   cls: "si-yellow" },
          { icon: <Users size={18} />, label: "Admin Actions",   val: "420",  sub: "Last 30 days",   cls: "si-blue"   },
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

      <div className="sa-table-card">
        <div className="sa-table-hd">
          <input className="sa-search" placeholder="Search admin, action…" />
          <select className="sa-sel">
            <option>All Tenants</option>
            <option>Acme LMS</option>
            <option>EdgeLearn</option>
            <option>Platform</option>
          </select>
          <select className="sa-sel">
            <option>All Types</option>
            <option>Create</option>
            <option>Update</option>
            <option>Delete</option>
            <option>Security</option>
            <option>Export</option>
          </select>
          <select className="sa-sel">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <button className="sa-btn sa-btn-ghost sa-btn-sm" style={{ marginLeft: "auto" }}>
            <Download size={14} /> Export Logs
          </button>
        </div>

        <div>
          {logs.map((l, i) => (
            <div key={i} className="sa-audit-row">
              <div className="sa-audit-dot" style={{ background: l.dot }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: "var(--sa-navy)" }}>{l.admin}</span>
                  <span style={{ fontSize: 10, color: "var(--sa-muted)" }}>·</span>
                  <span style={{ fontSize: 11, color: "var(--sa-muted)" }}>{l.tenant}</span>
                  <span className={`sa-tag ${l.type}`} style={{ marginLeft: 4 }}>{l.typeLabel}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sa-text)", marginBottom: 2 }}>{l.action}</div>
                <div style={{ fontSize: 11, color: "var(--sa-muted)" }}>{l.detail}</div>
              </div>
              <div style={{ fontSize: 10, color: "var(--sa-muted2)", flexShrink: 0 }}>{l.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
