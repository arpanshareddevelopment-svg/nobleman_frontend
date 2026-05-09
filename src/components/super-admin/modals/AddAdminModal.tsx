"use client";

import { useState } from "react";
import { BadgeCheck, Building2, FileText, KeyRound, Plus, Sparkles, UserCircle2, Users, ShieldCheck } from "lucide-react";

interface Props {
  onClose: () => void;
}

function genPass() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
  let p = "";
  for (let i = 0; i < 10; i++) p += chars[Math.floor(Math.random() * chars.length)];
  return p;
}

const perms = [
  { icon: <Sparkles size={16} />, label: "Manage Courses",    sub: "Create, edit, publish courses"    },
  { icon: <Users size={16} />, label: "Manage Students",   sub: "Add, edit, revoke student access" },
  { icon: <UserCircle2 size={16} />, label: "Manage Instructors",sub: "Add and configure instructors"   },
  { icon: <BadgeCheck size={16} />, label: "View Revenue",      sub: "Access financial reports"         },
  { icon: <FileText size={16} />, label: "Manage Exams",      sub: "Create and evaluate assessments"  },
  { icon: <Plus size={16} />, label: "Support Tickets",   sub: "Reply and resolve tickets"        },
  { icon: <Sparkles size={16} />, label: "Announcements",     sub: "Send messages to students"        },
  { icon: <FileText size={16} />, label: "Download Reports",  sub: "Export data as PDF/CSV"           },
  { icon: <Building2 size={16} />, label: "Tenant Settings",   sub: "Edit platform configuration"      },
  { icon: <KeyRound size={16} />, label: "Access Control",    sub: "Lock/unlock student access"       },
];

export default function AddAdminModal({ onClose }: Props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [checkedPerms, setCheckedPerms] = useState<Set<number>>(new Set([0, 1, 2, 4]));

  const togglePerm = (i: number) =>
    setCheckedPerms((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div className="sa-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sa-modal sa-modal-lg">
        <div className="sa-mh">
          <div className="sa-mh-left">
            <div className="sa-mh-icon" style={{ background: "rgba(0,196,255,.12)" }}><Users size={18} /></div>
            <div>
              <div className="sa-mt">Add New Admin</div>
              <div className="sa-ms">Create admin account & assign to a tenant</div>
            </div>
          </div>
          <button className="sa-mc" onClick={onClose}>×</button>
        </div>

        <div className="sa-mb" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {/* Personal */}
          <div className="sa-sec-lbl"><UserCircle2 size={16} /> Personal Details</div>
          <div className="sa-fg-row c2">
            <div className="sa-fg"><label>Full Name <span className="req">*</span></label><input type="text" placeholder="e.g. Rahul Kumar" /></div>
            <div className="sa-fg"><label>Phone Number</label><input type="tel" placeholder="+91 XXXXX XXXXX" /></div>
          </div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Email Address <span className="req">*</span></label>
              <input type="email" placeholder="admin@tenant.com" id="admin-email"
                onChange={(e) => setUsername(e.target.value.split("@")[0])} />
            </div>
            <div className="sa-fg"><label>Designation</label><input type="text" placeholder="e.g. LMS Administrator" /></div>
          </div>

          {/* Tenant */}
          <div className="sa-sec-lbl"><Building2 size={16} /> Tenant Assignment</div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Assign to Tenant <span className="req">*</span></label>
              <select>
                <option>Acme LMS</option>
                <option>EdgeLearn</option>
                <option>BrightPath</option>
                <option>SkillHub</option>
                <option>LearnPro</option>
              </select>
            </div>
            <div className="sa-fg">
              <label>Admin Role</label>
              <select>
                <option>Admin</option>
                <option>Super Admin (Tenant-level)</option>
              </select>
            </div>
          </div>

          {/* Credentials */}
          <div className="sa-sec-lbl"><KeyRound size={16} /> Login Credentials</div>
          <div className="sa-info-banner sa-info-yellow" style={{ marginBottom: 10 }}>
            Admin can login via <strong>Email ID</strong>. Credentials will be sent via email.
          </div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Username</label>
              <input type="text" value={username} readOnly style={{ background: "#f1f5f9", color: "var(--sa-muted)" }} placeholder="Auto from email" />
              <div className="sa-hint">Derived from email address</div>
            </div>
            <div className="sa-fg">
              <label>Password <span className="req">*</span></label>
              <div className="sa-pw-row">
                <input type="text" value={password} readOnly placeholder="Click Generate →"
                  style={{ fontFamily: "monospace", letterSpacing: 1 }} />
                <button className="sa-gen-btn" onClick={() => setPassword(genPass())}>Generate</button>
              </div>
            </div>
          </div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Send Credentials Via</label>
              <select><option>Email</option><option>WhatsApp</option><option>Both</option></select>
            </div>
            <div className="sa-fg">
              <label>Force Password Change on First Login</label>
              <select><option>Yes (recommended)</option><option>No</option></select>
            </div>
          </div>

          {/* Permissions */}
          <div className="sa-sec-lbl"><ShieldCheck size={16} /> Platform Permissions</div>
          <div className="sa-info-banner sa-info-blue" style={{ marginBottom: 10 }}>
            Select what this admin can do within their tenant. You can change these anytime.
          </div>
          <div className="sa-perms">
            {perms.map((p, i) => (
              <div
                key={p.label}
                className={`sa-perm${checkedPerms.has(i) ? " checked" : ""}`}
                onClick={() => togglePerm(i)}
              >
                  <div className="pi">{p.icon}</div>
                <div>
                  <div className="sa-perm-lbl">{p.label}</div>
                  <div className="sa-perm-sub">{p.sub}</div>
                </div>
                <input
                  type="checkbox"
                  className="sa-perm-cb"
                  checked={checkedPerms.has(i)}
                  onChange={() => togglePerm(i)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="sa-fg">
            <label>Internal Notes</label>
            <textarea placeholder="Any notes about this admin account…" />
          </div>
        </div>

        <div className="sa-mf">
          <button className="sa-btn sa-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="sa-btn sa-btn-primary" onClick={onClose}>Create Admin Account</button>
        </div>
      </div>
    </div>
  );
}
