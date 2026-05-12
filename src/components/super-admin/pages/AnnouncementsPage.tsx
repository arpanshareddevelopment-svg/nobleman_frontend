"use client";

import { useState } from "react";
import { CalendarDays, Eye, Megaphone, PencilLine, Save, ShieldAlert, ShieldCheck, Sparkles, Wrench } from "lucide-react";

const announcements = [
  { id: "ANN-012", title: "Platform maintenance on May 15, 2025", body: "Scheduled downtime from 2:00 AM – 4:00 AM IST. All services will be unavailable during this window.", target: "All Tenants", type: "tp", typeLabel: "Maintenance", time: "2 hours ago", sent: true },
  { id: "ANN-011", title: "New feature: Certificate auto-generation is live", body: "Certificates are now auto-generated upon course completion. Admins can customise templates from Settings.", target: "All Admins", type: "tg", typeLabel: "Feature", time: "1 day ago", sent: true },
  { id: "ANN-010", title: "Billing reminder — Growth plan renewal due", body: "Your Growth plan subscription renews on May 20. Please ensure payment details are up to date.", target: "EdgeLearn, BrightPath", type: "ty", typeLabel: "Billing", time: "3 days ago", sent: true },
  { id: "ANN-009", title: "Security update: 2FA now mandatory for admins", body: "Two-factor authentication is now required for all admin logins. Please set up your authenticator app.", target: "All Admins", type: "tr", typeLabel: "Security", time: "5 days ago", sent: true },
];

const stats = [
  { icon: <Megaphone size={18} />, label: "Total Sent", val: "42", sub: "All time", bgColor: "bg-blue-100" },
  { icon: <Eye size={18} />, label: "Avg Open Rate", val: "78%", sub: "Last 30 days", bgColor: "bg-green-100" },
  { icon: <CalendarDays size={18} />, label: "Scheduled", val: "3", sub: "Upcoming", bgColor: "bg-yellow-100" },
];

const typeIcons = {
  Maintenance: <Wrench size={22} />,
  Feature: <Sparkles size={22} />,
  Billing: <ShieldCheck size={22} />,
  Security: <ShieldAlert size={22} />,
};

const tagColors = {
  tp: "bg-blue-100 text-blue-700",
  tg: "bg-green-100 text-green-700",
  ty: "bg-yellow-100 text-yellow-800",
  tr: "bg-red-100 text-red-700",
};

export default function AnnouncementsPage() {
  const [tab, setTab] = useState<"sent" | "compose">("sent");

  return (
    <div>
      {/* Stats */}
      <div className="mb-5 grid grid-cols-3 gap-3.5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[var(--border)] bg-white/70 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center flex-shrink-0 rounded-lg text-gray-900 ${s.bgColor}`}>
                {s.icon}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500">{s.label}</div>
                <div className="text-2xl font-extrabold text-gray-900">{s.val}</div>
                <div className="text-xs text-gray-500">{s.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-0.5 rounded-xl border border-[var(--border)] bg-white/70 p-1">
        <button
          onClick={() => setTab("sent")}
          className={`flex-1 rounded-lg px-3 py-1.75 text-center text-xs font-bold transition-all ${
            tab === "sent"
              ? "bg-gradient-to-br from-[rgba(200,255,0,.2)] to-[rgba(255,230,0,.18)] text-[var(--fg-primary)] shadow-md"
              : "text-[var(--fg-secondary)]"
          }`}
        >
          Sent Announcements
        </button>
        <button
          onClick={() => setTab("compose")}
          className={`flex-1 rounded-lg px-3 py-1.75 text-center text-xs font-bold transition-all ${
            tab === "compose"
              ? "bg-gradient-to-br from-[rgba(200,255,0,.2)] to-[rgba(255,230,0,.18)] text-[var(--fg-primary)] shadow-md"
              : "text-[var(--fg-secondary)]"
          }`}
        >
          Compose New
        </button>
      </div>

      {/* Sent tab */}
      {tab === "sent" && (
        <div>
          {announcements.map((a) => (
            <div key={a.id} className="mb-2 flex gap-3 rounded-2xl border border-[var(--border)] bg-white/80 p-3.5 transition-all hover:border-opacity-50 hover:shadow-md">
              <div className="flex-shrink-0 pt-1 text-gray-700">
                {typeIcons[a.typeLabel as keyof typeof typeIcons]}
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--fg-secondary)]">{a.id}</span>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest ${tagColors[a.type as keyof typeof tagColors]}`}>
                    {a.typeLabel}
                  </span>
                  <span className="text-xs text-[var(--fg-muted)]">→ {a.target}</span>
                </div>
                <div className="mb-1 text-sm font-bold" style={{ fontFamily: '"Manrope", sans-serif', color: "var(--fg-primary)" }}>
                  {a.title}
                </div>
                <div className="text-xs" style={{ color: "var(--fg-secondary)" }}>
                  {a.body}
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="mb-1.5 text-xs text-[var(--fg-muted)]">{a.time}</div>
                <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700 uppercase tracking-widest">
                  Sent
                </span>
              </div>
              <div className="flex-shrink-0 flex gap-1 ml-2">
                <button className="rounded-lg border border-[var(--border)] bg-white/70 px-2.5 py-1 text-xs font-semibold text-[var(--fg-secondary)] transition-all hover:text-[var(--fg-primary)] hover:border-opacity-50">
                  View
                </button>
                <button className="rounded-lg border border-[var(--border)] bg-white/70 px-2.5 py-1 text-xs font-semibold text-[var(--fg-secondary)] transition-all hover:text-[var(--fg-primary)] hover:border-opacity-50">
                  Resend
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compose tab */}
      {tab === "compose" && (
        <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-4.5 shadow-sm">
          <div className="mb-4 flex items-center gap-2" style={{ fontFamily: '"Manrope", sans-serif' }}>
            <PencilLine size={16} />
            <div className="text-sm font-bold" style={{ color: "var(--fg-primary)" }}>
              New Announcement
            </div>
            <div className="flex-1 border-b border-[var(--border)]" />
          </div>

          <div className="mb-3.5 flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)]">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Platform maintenance scheduled"
              className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)]"
            />
          </div>

          <div className="mb-3.5 grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)]">
                Target Audience <span className="text-red-500">*</span>
              </label>
              <select className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)]">
                <option>All Tenants</option>
                <option>All Admins</option>
                <option>All Students</option>
                <option>Specific Tenant</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)]">Type</label>
              <select className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)]">
                <option>General</option>
                <option>Maintenance</option>
                <option>Feature Update</option>
                <option>Billing</option>
                <option>Security</option>
              </select>
            </div>
          </div>

          <div className="mb-3.5 flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)]">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Write your announcement message here…"
              className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] resize-none"
              style={{ minHeight: 120 }}
            />
          </div>

          <div className="mb-3.5 grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)]">Delivery Channel</label>
              <select className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)]">
                <option>In-App Notification</option>
                <option>Email</option>
                <option>Both</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)]">Schedule (optional)</label>
              <input
                type="date"
                className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)]"
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-2.5">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(15,23,42,0.14)] bg-transparent px-4 py-2 text-xs font-bold text-[var(--fg-secondary)] transition-all hover:text-[var(--fg-primary)] hover:border-opacity-50">
              <Save size={14} /> Save Draft
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-4 py-2 text-xs font-bold text-[#06110c] shadow-lg hover:shadow-xl transition-all">
              <Megaphone size={14} /> Send Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
