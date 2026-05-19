"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  BadgeCheck,
  Building2,
  FileText,
  KeyRound,
  Plus,
  Sparkles,
  UserCircle2,
  Users,
  ShieldCheck,
} from "lucide-react";

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
  { icon: <Sparkles size={15} />, label: "Manage Courses", sub: "Create, edit, publish courses" },
  { icon: <Users size={15} />, label: "Manage Students", sub: "Add, edit, revoke student access" },
  { icon: <UserCircle2 size={15} />, label: "Manage Instructors", sub: "Add and configure instructors" },
  { icon: <BadgeCheck size={15} />, label: "View Revenue", sub: "Access financial reports" },
  { icon: <FileText size={15} />, label: "Manage Exams", sub: "Create and evaluate assessments" },
  { icon: <Plus size={15} />, label: "Support Tickets", sub: "Reply and resolve tickets" },
  { icon: <Sparkles size={15} />, label: "Announcements", sub: "Send messages to students" },
  { icon: <FileText size={15} />, label: "Download Reports", sub: "Export data as PDF/CSV" },
  { icon: <Building2 size={15} />, label: "Student Settings", sub: "Edit platform configuration" },
  { icon: <KeyRound size={15} />, label: "Access Control", sub: "Lock/unlock student access" },
];

const inputCls =
  "w-full rounded-lg px-3 py-2 text-sm placeholder-[var(--fg-muted)] outline-none transition-all focus:ring-4 focus:ring-[rgba(200,255,0,0.12)]";

const inputStyle: React.CSSProperties = {
  background: "var(--bg-page)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "var(--fg-primary)",
};

const selectStyle: React.CSSProperties = {
  background: "var(--bg-page)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "var(--fg-secondary)",
};

const labelCls = "block text-[10px] font-bold uppercase tracking-widest text-[var(--fg-secondary)] mb-1";

const sectionLabelCls =
  "flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)] mt-5 mb-3 pb-2";

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
    /* Overlay */
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal */}
      <div
        className="relative w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.1)" }}
      >

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(0,196,255,0.12)] text-[var(--brand-blue)]">
            <Users size={18} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-[var(--fg-primary)] font-[Manrope]">Add New Admin</div>
            <div className="text-xs text-[var(--fg-muted)]">Create admin account & assign to a student</div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-all text-lg font-light cursor-pointer"
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* Personal Details */}
          <div className={sectionLabelCls} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <UserCircle2 size={14} /> Personal Details
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g. Rahul Kumar" className={inputCls} style={inputStyle} />
            </div>
            <div>
              <label className={labelCls}>Phone Number</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" className={inputCls} style={inputStyle} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="admin@student.com"
                className={inputCls}
                style={inputStyle}
                onChange={(e) => setUsername(e.target.value.split("@")[0])}
              />
            </div>
            <div>
              <label className={labelCls}>Designation</label>
              <input type="text" placeholder="e.g. LMS Administrator" className={inputCls} style={inputStyle} />
            </div>
          </div>

          {/* Student Assignment */}
          <div className={sectionLabelCls} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <Building2 size={14} /> Student Assignment
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Assign to Student <span className="text-red-500">*</span></label>
              <select className={clsx(inputCls, "cursor-pointer")} style={selectStyle}>
                <option>Acme LMS</option>
                <option>EdgeLearn</option>
                <option>BrightPath</option>
                <option>SkillHub</option>
                <option>LearnPro</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Admin Role</label>
              <select className={clsx(inputCls, "cursor-pointer")} style={selectStyle}>
                <option>Admin</option>
                <option>Super Admin (Student-level)</option>
              </select>
            </div>
          </div>

          {/* Login Credentials */}
          <div className={sectionLabelCls} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <KeyRound size={14} /> Login Credentials
          </div>
          <div
            className="mb-3 rounded-lg px-3 py-2 text-xs"
            style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)", color: "#fb923c" }}
          >
            Admin can login via <strong>Email ID</strong>. Credentials will be sent via email.
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className={labelCls}>Username</label>
              <input
                type="text"
                value={username}
                readOnly
                placeholder="Auto from email"
                className={inputCls}
                style={{ ...inputStyle, background: "rgba(255,255,255,0.03)", color: "var(--fg-muted)", cursor: "default" }}
              />
              <p className="mt-1 text-[10px] text-[var(--fg-muted)]">Derived from email address</p>
            </div>
            <div>
              <label className={labelCls}>Password <span className="text-red-500">*</span></label>
              <div className="flex gap-0">
                <input
                  type="text"
                  value={password}
                  readOnly
                  placeholder="Click Generate →"
                  className={clsx(inputCls, "rounded-r-none font-mono tracking-wider")}
                  style={inputStyle}
                />
                <button
                  onClick={() => setPassword(genPass())}
                  className="shrink-0 rounded-r-lg px-3 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ background: "var(--brand-green)", color: "var(--fg-primary)", border: "1px solid rgba(255,255,255,0.12)", borderLeft: "none" }}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Send Credentials Via</label>
              <select className={clsx(inputCls, "cursor-pointer")} style={selectStyle}>
                <option>Email</option>
                <option>WhatsApp</option>
                <option>Both</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Force Password Change on First Login</label>
              <select className={clsx(inputCls, "cursor-pointer")} style={selectStyle}>
                <option>Yes (recommended)</option>
                <option>No</option>
              </select>
            </div>
          </div>

          {/* Permissions */}
          <div className={sectionLabelCls} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <ShieldCheck size={14} /> Platform Permissions
          </div>
          <div
            className="mb-3 rounded-lg px-3 py-2 text-xs"
            style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#60a5fa" }}
          >
            Select what this admin can do within their student. You can change these anytime.
          </div>
          <div className="grid grid-cols-2 gap-2">
            {perms.map((p, i) => (
              <div
                key={p.label}
                onClick={() => togglePerm(i)}
                className="flex items-start gap-2.5 rounded-xl border p-3 cursor-pointer transition-all select-none"
                style={checkedPerms.has(i)
                  ? { borderColor: "rgba(52,211,153,0.5)", background: "rgba(52,211,153,0.1)" }
                  : { borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }
                }
                onMouseEnter={(e) => {
                  if (!checkedPerms.has(i)) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  if (!checkedPerms.has(i)) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors"
                  style={checkedPerms.has(i)
                    ? { background: "#10b981", color: "#fff" }
                    : { background: "rgba(255,255,255,0.08)", color: "var(--fg-secondary)" }
                  }
                >
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-semibold truncate"
                    style={{ color: checkedPerms.has(i) ? "#34d399" : "var(--fg-primary)" }}
                  >
                    {p.label}
                  </div>
                  <div className="text-[10px] text-[var(--fg-muted)] truncate">{p.sub}</div>
                </div>
                <input
                  type="checkbox"
                  checked={checkedPerms.has(i)}
                  onChange={() => togglePerm(i)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-emerald-500 cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="mt-4">
            <label className={labelCls}>Internal Notes</label>
            <textarea
              placeholder="Any notes about this admin account…"
              rows={3}
              className={clsx(inputCls, "resize-none")}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-5 py-4 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={onClose}
            className="rounded-lg bg-transparent px-4 py-2 text-xs font-bold transition-all cursor-pointer hover:text-[var(--fg-primary)]"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--fg-secondary)" }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-5 py-2 text-xs font-bold text-[#06110c] shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Create Admin Account
          </button>
        </div>
      </div>
    </div>
  );
}
