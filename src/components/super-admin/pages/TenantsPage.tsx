"use client";

import { BadgeCheck, Building2, CircleAlert, Search, TimerReset } from "lucide-react";

interface Props {
  openAddTenant: () => void;
}

const tenants = [
  { init: "AL", name: "Acme LMS",    domain: "acme.noblemanlearning.com",    plan: "Enterprise", admins: 4, students: 820, courses: 18, revenue: "₹14.2L", status: "tg", statusLabel: "Active",  joined: "Jan 2024" },
  { init: "EL", name: "EdgeLearn",   domain: "edge.noblemanlearning.com",    plan: "Growth",     admins: 2, students: 540, courses: 12, revenue: "₹8.6L",  status: "tg", statusLabel: "Active",  joined: "Mar 2024" },
  { init: "BP", name: "BrightPath",  domain: "bright.noblemanlearning.com",  plan: "Growth",     admins: 3, students: 390, courses: 9,  revenue: "₹6.1L",  status: "tg", statusLabel: "Active",  joined: "Apr 2024" },
  { init: "SH", name: "SkillHub",    domain: "skillhub.noblemanlearning.com",plan: "Enterprise", admins: 5, students: 1200,courses: 24, revenue: "₹22.4L", status: "tg", statusLabel: "Active",  joined: "Nov 2023" },
  { init: "LP", name: "LearnPro",    domain: "learnpro.noblemanlearning.com",plan: "Starter",    admins: 1, students: 120, courses: 4,  revenue: "₹1.8L",  status: "ty", statusLabel: "Trial",   joined: "Apr 2025" },
  { init: "EN", name: "EduNext",     domain: "edunext.noblemanlearning.com", plan: "Starter",    admins: 1, students: 80,  courses: 3,  revenue: "₹0.9L",  status: "tr", statusLabel: "Suspended",joined: "Feb 2024" },
];

const planColors: Record<string, string> = { Enterprise: "tp", Growth: "tb", Starter: "tg" };

export default function TenantsPage({ openAddTenant }: Props) {
  return (
    <div>
      <div className="sa-stats sa-stats-4">
        {[
          { icon: <Building2 size={18} />, label: "Total Tenants",  val: "12", sub: "All organisations",  cls: "si-purple" },
          { icon: <BadgeCheck size={18} />, label: "Active",          val: "10", sub: "Running smoothly",   cls: "si-green"  },
          { icon: <TimerReset size={18} />, label: "Trial",           val: "2",  sub: "Expiring soon",      cls: "si-yellow" },
          { icon: <CircleAlert size={18} />, label: "Suspended",       val: "1",  sub: "Needs resolution",   cls: "si-red"    },
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
          <input className="sa-search" placeholder="Search tenant, domain…" />
          <select className="sa-sel">
            <option>All Plans</option>
            <option>Enterprise</option>
            <option>Growth</option>
            <option>Starter</option>
          </select>
          <select className="sa-sel">
            <option>All Status</option>
            <option>Active</option>
            <option>Trial</option>
            <option>Suspended</option>
          </select>
          <button
            className="sa-btn sa-btn-primary sa-btn-sm"
            style={{ marginLeft: "auto" }}
            onClick={openAddTenant}
          >
            + Add Tenant
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Domain</th>
              <th>Plan</th>
              <th>Admins</th>
              <th>Students</th>
              <th>Courses</th>
              <th>Revenue</th>
              <th>Joined</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.domain}>
                <td>
                  <div className="sa-cu">
                    <div className="sa-ca" style={{ background: "linear-gradient(135deg,var(--brand-green),var(--brand-yellow))", color: "#06110c" }}>{t.init}</div>
                    <div className="sa-cn">{t.name}</div>
                  </div>
                </td>
                <td style={{ fontSize: 11, color: "var(--sa-muted)" }}>{t.domain}</td>
                <td><span className={`sa-tag ${planColors[t.plan] ?? "tb"}`}>{t.plan}</span></td>
                <td>{t.admins}</td>
                <td>{t.students.toLocaleString()}</td>
                <td>{t.courses}</td>
                <td style={{ fontWeight: 700, color: "var(--sa-a3)" }}>{t.revenue}</td>
                <td style={{ fontSize: 11, color: "var(--sa-muted2)" }}>{t.joined}</td>
                <td><span className={`sa-tag ${t.status}`}>{t.statusLabel}</span></td>
                <td>
                  <div className="sa-acts">
                    <button className="sa-ab">View</button>
                    <button className="sa-ab">Edit</button>
                    <button className="sa-ab danger">Suspend</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
