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

// Shared input/select styles
const inputCls =
  "w-full rounded-lg border border-black/12 dark:border-white/12 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-muted)] outline-none transition-all focus:border-[rgba(200,255,0,0.5)] focus:ring-4 focus:ring-[rgba(200,255,0,0.12)]";

const selectCls =
  "w-full rounded-lg border border-black/12 dark:border-white/12 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-[var(--fg-secondary)] outline-none transition-all focus:border-[rgba(200,255,0,0.5)] focus:ring-4 focus:ring-[rgba(200,255,0,0.12)] cursor-pointer";

const labelCls = "block text-[10px] font-bold uppercase tracking-widest text-[var(--fg-secondary)] mb-1";

const sectionLabelCls =
  "flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)] mt-5 mb-3 pb-2 border-b border-black/8 dark:border-white/8";

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
      <div className="relative w-full max-w-2xl rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-black/8 dark:border-white/8 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(0,196,255,0.12)] text-[var(--brand-blue)]">
            <Users size={18} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-[var(--fg-primary)] font-[Manrope]">Add New Admin</div>
            <div className="text-xs text-[var(--fg-muted)]">Create admin account & assign to a student</div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--fg-muted)] hover:bg-black/5 dark:hover:bg-white/8 hover:text-[var(--fg-primary)] transition-all text-lg font-light cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* Personal Details */}
          <div className={sectionLabelCls}>
            <UserCircle2 size={14} /> Personal Details
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g. Rahul Kumar" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Phone Number</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="admin@student.com"
                className={inputCls}
                onChange={(e) => setUsername(e.target.value.split("@")[0])}
              />
            </div>
            <div>
              <label className={labelCls}>Designation</label>
              <input type="text" placeholder="e.g. LMS Administrator" className={inputCls} />
            </div>
          </div>

          {/* Student Assignment */}
          <div className={sectionLabelCls}>
            <Building2 size={14} /> Student Assignment
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Assign to Student <span className="text-red-500">*</span></label>
              <select className={selectCls}>
                <option>Acme LMS</option>
                <option>EdgeLearn</option>
                <option>BrightPath</option>
                <option>SkillHub</option>
                <option>LearnPro</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Admin Role</label>
              <select className={selectCls}>
                <option>Admin</option>
                <option>Super Admin (Student-level)</option>
              </select>
            </div>
          </div>

          {/* Login Credentials */}
          <div className={sectionLabelCls}>
            <KeyRound size={14} /> Login Credentials
          </div>
          <div className="mb-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
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
                className={clsx(inputCls, "bg-gray-50 dark:bg-white/3 text-[var(--fg-muted)] cursor-default")}
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
                />
                <button
                  onClick={() => setPassword(genPass())}
                  className="shrink-0 rounded-r-lg border border-l-0 border-black/12 dark:border-white/12 bg-[var(--brand-green)] px-3 text-xs font-bold text-gray-900 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Send Credentials Via</label>
              <select className={selectCls}>
                <option>Email</option>
                <option>WhatsApp</option>
                <option>Both</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Force Password Change on First Login</label>
              <select className={selectCls}>
                <option>Yes (recommended)</option>
                <option>No</option>
              </select>
            </div>
          </div>

          {/* Permissions */}
          <div className={sectionLabelCls}>
            <ShieldCheck size={14} /> Platform Permissions
          </div>
          <div className="mb-3 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-3 py-2 text-xs text-blue-800 dark:text-blue-300">
            Select what this admin can do within their student. You can change these anytime.
          </div>
          <div className="grid grid-cols-2 gap-2">
            {perms.map((p, i) => (
              <div
                key={p.label}
                onClick={() => togglePerm(i)}
                className={clsx(
                  "flex items-start gap-2.5 rounded-xl border p-3 cursor-pointer transition-all select-none",
                  checkedPerms.has(i)
                    ? "border-emerald-400/50 bg-emerald-50 dark:bg-emerald-500/10"
                    : "border-black/8 dark:border-white/8 bg-white/50 dark:bg-white/3 hover:border-black/15 dark:hover:border-white/15",
                )}
              >
                <div className={clsx(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                  checkedPerms.has(i)
                    ? "bg-emerald-500 text-white"
                    : "bg-black/5 dark:bg-white/8 text-[var(--fg-secondary)]",
                )}>
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={clsx(
                    "text-xs font-semibold truncate",
                    checkedPerms.has(i) ? "text-emerald-700 dark:text-emerald-400" : "text-[var(--fg-primary)]",
                  )}>
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
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-5 py-4 border-t border-black/8 dark:border-white/8 shrink-0">
          <button
            onClick={onClose}
            className="rounded-lg border border-black/12 dark:border-white/12 bg-transparent px-4 py-2 text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-all cursor-pointer"
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

