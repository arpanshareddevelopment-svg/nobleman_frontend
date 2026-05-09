"use client";

import { useState } from "react";
import { Badge, Braces, Building2, CreditCard, Database, FileCog, Globe2, KeyRound, Mail, ShieldCheck, Smartphone, Users } from "lucide-react";

export default function SystemSettingsPage() {
  const [tab, setTab] = useState<"general" | "security" | "email" | "integrations">("general");

  return (
    <div>
      <div className="sa-tabs">
        {(["general", "security", "email", "integrations"] as const).map((t) => (
          <div key={t} className={`sa-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
            {t === "general" ? "General" : t === "security" ? "Security" : t === "email" ? "Email" : "Integrations"}
          </div>
        ))}
      </div>

      {tab === "general" && (
        <div className="sa-grid-2">
          <div className="sa-card">
            <div className="sa-sec-lbl"><Building2 size={16} /> Platform Details</div>
            <div className="sa-fg"><label>Platform Name</label><input type="text" defaultValue="Nobleman Learning" /></div>
            <div className="sa-fg"><label>Super Admin Email</label><input type="email" defaultValue="superadmin@noblemanlearning.com" /></div>
            <div className="sa-fg"><label>Support Phone</label><input type="tel" defaultValue="+91 98765 00000" /></div>
            <div className="sa-fg"><label>Default Timezone</label>
              <select defaultValue="IST">
                <option>IST (UTC+5:30)</option>
                <option>UTC</option>
                <option>EST (UTC-5)</option>
              </select>
            </div>
            <button className="sa-btn sa-btn-primary" style={{ width: "100%", marginTop: 8 }}>Save Changes</button>
          </div>

          <div className="sa-card">
            <div className="sa-sec-lbl"><Globe2 size={16} /> Domain & Branding</div>
            <div className="sa-fg"><label>Root Domain</label><input type="text" defaultValue="noblemanlearning.com" /></div>
            <div className="sa-fg"><label>Tenant Subdomain Pattern</label><input type="text" defaultValue="{tenant}.noblemanlearning.com" /></div>
            <div className="sa-fg"><label>Default Language</label>
              <select><option>English</option><option>Hindi</option></select>
            </div>
            <div className="sa-fg"><label>Maintenance Mode</label>
              <select><option>Off</option><option>On — show maintenance page</option></select>
            </div>
            <button className="sa-btn sa-btn-primary" style={{ width: "100%", marginTop: 8 }}>Save Changes</button>
          </div>

          <div className="sa-card">
            <div className="sa-sec-lbl"><FileCog size={16} /> Platform Defaults</div>
            <div className="sa-fg"><label>Default Access Duration</label>
              <select defaultValue="90">
                <option value="30">30 Days</option>
                <option value="60">60 Days</option>
                <option value="90">90 Days</option>
              </select>
            </div>
            <div className="sa-fg"><label>Auto-lock on Expiry</label>
              <select><option>Yes — immediate</option><option>3 day grace period</option></select>
            </div>
            <div className="sa-fg"><label>Certificate Auto-generation</label>
              <select><option>Enabled</option><option>Disabled</option></select>
            </div>
            <button className="sa-btn sa-btn-primary" style={{ width: "100%", marginTop: 8 }}>Save Defaults</button>
          </div>

          <div className="sa-card">
            <div className="sa-sec-lbl"><CreditCard size={16} /> Billing Defaults</div>
            <div className="sa-fg"><label>Platform Fee (%)</label><input type="number" defaultValue={15} /></div>
            <div className="sa-fg"><label>Payment Gateway</label>
              <select><option>Razorpay</option><option>Stripe</option><option>PayU</option></select>
            </div>
            <div className="sa-fg"><label>Invoice Currency</label>
              <select><option>INR (₹)</option><option>USD ($)</option></select>
            </div>
            <button className="sa-btn sa-btn-primary" style={{ width: "100%", marginTop: 8 }}>Save Billing</button>
          </div>
        </div>
      )}

      {tab === "security" && (
        <div className="sa-grid-2">
          <div className="sa-card">
            <div className="sa-sec-lbl"><KeyRound size={16} /> Authentication</div>
            <div className="sa-fg"><label>2FA for Admins</label>
              <select><option>Mandatory</option><option>Optional</option><option>Disabled</option></select>
            </div>
            <div className="sa-fg"><label>Session Timeout (minutes)</label><input type="number" defaultValue={60} /></div>
            <div className="sa-fg"><label>Max Login Attempts</label><input type="number" defaultValue={5} /></div>
            <div className="sa-fg"><label>Password Min Length</label><input type="number" defaultValue={8} /></div>
            <button className="sa-btn sa-btn-primary" style={{ width: "100%", marginTop: 8 }}>Save Security</button>
          </div>

          <div className="sa-card">
            <div className="sa-sec-lbl"><ShieldCheck size={16} /> Access Policies</div>
            <div className="sa-fg"><label>IP Whitelist (Super Admin)</label>
              <textarea placeholder="Enter IPs, one per line…" style={{ minHeight: 80 }} />
            </div>
            <div className="sa-fg"><label>Audit Log Retention</label>
              <select><option>90 days</option><option>180 days</option><option>1 year</option><option>Forever</option></select>
            </div>
            <div className="sa-fg"><label>Data Export Permission</label>
              <select><option>Super Admin only</option><option>All Admins</option></select>
            </div>
            <button className="sa-btn sa-btn-primary" style={{ width: "100%", marginTop: 8 }}>Save Policies</button>
          </div>
        </div>
      )}

      {tab === "email" && (
        <div className="sa-grid-2">
          <div className="sa-card">
            <div className="sa-sec-lbl"><Mail size={16} /> SMTP Configuration</div>
            <div className="sa-fg"><label>SMTP Host</label><input type="text" placeholder="smtp.gmail.com" /></div>
            <div className="sa-fg"><label>SMTP Port</label><input type="number" placeholder="587" /></div>
            <div className="sa-fg"><label>Username</label><input type="email" placeholder="noreply@noblemanlearning.com" /></div>
            <div className="sa-fg"><label>Password</label><input type="password" placeholder="••••••••" /></div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="sa-btn sa-btn-ghost" style={{ flex: 1 }}>Test Connection</button>
              <button className="sa-btn sa-btn-primary" style={{ flex: 1 }}>Save SMTP</button>
            </div>
          </div>

          <div className="sa-card">
            <div className="sa-sec-lbl"><Mail size={16} /> Email Templates</div>
            {["Welcome Email", "Password Reset", "Course Access", "Certificate Ready", "Payment Receipt"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--sa-bdr)" }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{t}</span>
                <div className="sa-acts">
                  <button className="sa-ab">Preview</button>
                  <button className="sa-ab">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "integrations" && (
        <div className="sa-grid-2">
          {[
            { icon: <CreditCard size={28} />, name: "Razorpay",   desc: "Payment gateway for course purchases",  status: "tg", sl: "Connected" },
            { icon: <Smartphone size={28} />, name: "WhatsApp API",desc: "Send credentials & notifications",       status: "tg", sl: "Connected" },
            { icon: <Badge size={28} />, name: "Google Analytics", desc: "Track platform usage & funnels",   status: "ty", sl: "Pending"   },
            { icon: <Mail size={28} />, name: "SendGrid",    desc: "Transactional email delivery",           status: "tgr",sl: "Not Set"   },
            { icon: <Database size={28} />, name: "Vimeo",       desc: "Video hosting for course content",       status: "tg", sl: "Connected" },
            { icon: <Braces size={28} />, name: "Zapier",      desc: "Workflow automation & webhooks",         status: "tgr",sl: "Not Set"   },
          ].map((int) => (
            <div key={int.name} className="sa-card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 28, flexShrink: 0, color: "var(--sa-text)" }}>{int.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "var(--sa-text)", marginBottom: 3 }}>{int.name}</div>
                <div style={{ fontSize: 11, color: "var(--sa-muted)" }}>{int.desc}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <span className={`sa-tag ${int.status}`}>{int.sl}</span>
                <button className="sa-ab">{int.sl === "Connected" ? "Configure" : "Connect"}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
