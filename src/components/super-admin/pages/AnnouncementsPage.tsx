"use client";

import { useState } from "react";
import { CalendarDays, Eye, Megaphone, PencilLine, Save, ShieldAlert, ShieldCheck, Sparkles, Wrench } from "lucide-react";

const announcements = [
  { id: "ANN-012", title: "Platform maintenance on May 15, 2025", body: "Scheduled downtime from 2:00 AM – 4:00 AM IST. All services will be unavailable during this window.", target: "All Tenants", type: "tp", typeLabel: "Maintenance", time: "2 hours ago", sent: true },
  { id: "ANN-011", title: "New feature: Certificate auto-generation is live", body: "Certificates are now auto-generated upon course completion. Admins can customise templates from Settings.", target: "All Admins", type: "tg", typeLabel: "Feature", time: "1 day ago", sent: true },
  { id: "ANN-010", title: "Billing reminder — Growth plan renewal due", body: "Your Growth plan subscription renews on May 20. Please ensure payment details are up to date.", target: "EdgeLearn, BrightPath", type: "ty", typeLabel: "Billing", time: "3 days ago", sent: true },
  { id: "ANN-009", title: "Security update: 2FA now mandatory for admins", body: "Two-factor authentication is now required for all admin logins. Please set up your authenticator app.", target: "All Admins", type: "tr", typeLabel: "Security", time: "5 days ago", sent: true },
];

export default function AnnouncementsPage() {
  const [tab, setTab] = useState<"sent" | "compose">("sent");

  return (
    <div>
      <div className="sa-stats sa-stats-3">
        {[
          { icon: <Megaphone size={18} />, label: "Total Sent",    val: "42", sub: "All time",       cls: "si-purple" },
          { icon: <Eye size={18} />, label: "Avg Open Rate", val: "78%",sub: "Last 30 days",  cls: "si-green"  },
          { icon: <CalendarDays size={18} />, label: "Scheduled",     val: "3",  sub: "Upcoming",       cls: "si-yellow" },
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

      <div className="sa-tabs">
        <div className={`sa-tab${tab === "sent" ? " active" : ""}`} onClick={() => setTab("sent")}>Sent Announcements</div>
        <div className={`sa-tab${tab === "compose" ? " active" : ""}`} onClick={() => setTab("compose")}>Compose New</div>
      </div>

      {tab === "sent" && (
        <div>
          {announcements.map((a) => (
            <div key={a.id} className="sa-ann-item">
              <div style={{ fontSize: 22, flexShrink: 0 }}>
                {a.typeLabel === "Maintenance" ? <Wrench size={22} /> : a.typeLabel === "Feature" ? <Sparkles size={22} /> : a.typeLabel === "Billing" ? <ShieldCheck size={22} /> : <ShieldAlert size={22} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: "var(--sa-muted)", fontWeight: 700 }}>{a.id}</span>
                  <span className={`sa-tag ${a.type}`}>{a.typeLabel}</span>
                  <span style={{ fontSize: 10, color: "var(--sa-muted2)" }}>→ {a.target}</span>
                </div>
                <div style={{ fontFamily: '"Manrope",sans-serif', fontSize: 13, fontWeight: 700, color: "var(--sa-text)", marginBottom: 4 }}>{a.title}</div>
                <div style={{ fontSize: 11, color: "var(--sa-muted)" }}>{a.body}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: "var(--sa-muted2)", marginBottom: 6 }}>{a.time}</div>
                <span className="sa-tag tg">Sent</span>
              </div>
              <div className="sa-acts" style={{ marginLeft: 8 }}>
                <button className="sa-ab">View</button>
                <button className="sa-ab">Resend</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "compose" && (
        <div className="sa-card">
          <div className="sa-sec-lbl"><PencilLine size={16} /> New Announcement</div>
          <div className="sa-fg">
            <label>Title <span className="req">*</span></label>
            <input type="text" placeholder="e.g. Platform maintenance scheduled" />
          </div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Target Audience <span className="req">*</span></label>
              <select>
                <option>All Tenants</option>
                <option>All Admins</option>
                <option>All Students</option>
                <option>Specific Tenant</option>
              </select>
            </div>
            <div className="sa-fg">
              <label>Type</label>
              <select>
                <option>General</option>
                <option>Maintenance</option>
                <option>Feature Update</option>
                <option>Billing</option>
                <option>Security</option>
              </select>
            </div>
          </div>
          <div className="sa-fg">
            <label>Message <span className="req">*</span></label>
            <textarea placeholder="Write your announcement message here…" style={{ minHeight: 120 }} />
          </div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Delivery Channel</label>
              <select>
                <option>In-App Notification</option>
                <option>Email</option>
                <option>Both</option>
              </select>
            </div>
            <div className="sa-fg">
              <label>Schedule (optional)</label>
              <input type="date" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button className="sa-btn sa-btn-ghost"><Save size={14} /> Save Draft</button>
            <button className="sa-btn sa-btn-primary"><Megaphone size={14} /> Send Now</button>
          </div>
        </div>
      )}
    </div>
  );
}
