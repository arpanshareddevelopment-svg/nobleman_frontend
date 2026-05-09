"use client";

import { BadgeCheck, Building2, CircleAlert, Search, Users } from "lucide-react";

interface Props {
  openAddAdmin: () => void;
}

const admins = [
  { init: "RK", name: "Rahul Kumar",   email: "rahul@acme.com",       tenant: "Acme LMS",    role: "Admin",       status: "tg", statusLabel: "Active",   lastLogin: "2 min ago",  perms: ["Courses","Students","Revenue"] },
  { init: "PS", name: "Priya Singh",   email: "priya@edgelearn.com",  tenant: "EdgeLearn",   role: "Admin",       status: "tg", statusLabel: "Active",   lastLogin: "18 min ago", perms: ["Courses","Students"] },
  { init: "AM", name: "Arjun Mehta",   email: "arjun@brightpath.com", tenant: "BrightPath",  role: "Admin",       status: "tr", statusLabel: "Inactive", lastLogin: "3 days ago", perms: ["Courses"] },
  { init: "NK", name: "Neha Kapoor",   email: "neha@skillhub.com",    tenant: "SkillHub",    role: "Super Admin", status: "tp", statusLabel: "Active",   lastLogin: "1 hr ago",   perms: ["All Access"] },
  { init: "VR", name: "Vikram Rao",    email: "vikram@learnpro.com",  tenant: "LearnPro",    role: "Admin",       status: "tg", statusLabel: "Active",   lastLogin: "5 hr ago",   perms: ["Courses","Exams"] },
  { init: "SD", name: "Sneha Das",     email: "sneha@edunext.com",    tenant: "EduNext",     role: "Admin",       status: "ty", statusLabel: "Suspended",lastLogin: "2 days ago", perms: ["Courses"] },
];

const tagColors: Record<string, string> = { Admin: "tb", "Super Admin": "tp" };

export default function AdminsPage({ openAddAdmin }: Props) {
  return (
    <div>
      <div className="sa-stats sa-stats-4">
        {[
          { icon: <Users size={18} />, label: "Total Admins",    val: "28", sub: "Across all tenants", cls: "si-blue"   },
          { icon: <BadgeCheck size={18} />, label: "Active",           val: "24", sub: "Currently active",  cls: "si-green"  },
          { icon: <CircleAlert size={18} />, label: "Inactive/Suspended", val: "4", sub: "Need attention",  cls: "si-red"    },
          { icon: <Building2 size={18} />, label: "Tenants Covered",  val: "12", sub: "All tenants",       cls: "si-purple" },
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
          <input className="sa-search" placeholder="Search name, email…" />
          <select className="sa-sel">
            <option>All Tenants</option>
            <option>Acme LMS</option>
            <option>EdgeLearn</option>
            <option>BrightPath</option>
          </select>
          <select className="sa-sel">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </select>
          <select className="sa-sel">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Super Admin</option>
          </select>
          <button
            className="sa-btn sa-btn-primary sa-btn-sm"
            style={{ marginLeft: "auto" }}
            onClick={openAddAdmin}
          >
            + Add Admin
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Admin</th>
              <th>Tenant</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Last Login</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.email}>
                <td>
                  <div className="sa-cu">
                    <div className="sa-ca" style={{ background: "linear-gradient(135deg,var(--brand-green),var(--brand-yellow))", color: "#06110c" }}>{a.init}</div>
                    <div>
                      <div className="sa-cn">{a.name}</div>
                      <div className="sa-cs">{a.email}</div>
                    </div>
                  </div>
                </td>
                <td>{a.tenant}</td>
                <td><span className={`sa-tag ${tagColors[a.role] ?? "tb"}`}>{a.role}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {a.perms.map((p) => (
                      <span key={p} className="sa-tag tgr" style={{ fontSize: 9 }}>{p}</span>
                    ))}
                  </div>
                </td>
                <td style={{ color: "var(--sa-muted2)", fontSize: 11 }}>{a.lastLogin}</td>
                <td><span className={`sa-tag ${a.status}`}>{a.statusLabel}</span></td>
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
