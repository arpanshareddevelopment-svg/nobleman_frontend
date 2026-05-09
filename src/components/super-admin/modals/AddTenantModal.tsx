"use client";

import { useState } from "react";
import { Building2, Globe2, KeyRound, Sparkles, UserCircle2 } from "lucide-react";

interface Props {
  onClose: () => void;
}

function genPass() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
  let p = "";
  for (let i = 0; i < 10; i++) p += chars[Math.floor(Math.random() * chars.length)];
  return p;
}

export default function AddTenantModal({ onClose }: Props) {
  const [password, setPassword] = useState("");
  const [subdomain, setSubdomain] = useState("");

  return (
    <div className="sa-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sa-modal sa-modal-lg">
        <div className="sa-mh">
          <div className="sa-mh-left">
            <div className="sa-mh-icon" style={{ background: "rgba(200,255,0,.12)" }}><Building2 size={18} /></div>
            <div>
              <div className="sa-mt">Add New Tenant</div>
              <div className="sa-ms">Onboard a new organisation onto the platform</div>
            </div>
          </div>
          <button className="sa-mc" onClick={onClose}>×</button>
        </div>

        <div className="sa-mb" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {/* Organisation */}
          <div className="sa-sec-lbl"><Building2 size={16} /> Organisation Details</div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Organisation Name <span className="req">*</span></label>
              <input type="text" placeholder="e.g. Acme Learning Solutions"
                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/\s+/g, "").slice(0, 20))} />
            </div>
            <div className="sa-fg">
              <label>Industry / Sector</label>
              <select>
                <option>EdTech</option>
                <option>Corporate Training</option>
                <option>K-12 Education</option>
                <option>Higher Education</option>
                <option>Coaching Institute</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Contact Email <span className="req">*</span></label>
              <input type="email" placeholder="contact@organisation.com" />
            </div>
            <div className="sa-fg">
              <label>Contact Phone</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
          <div className="sa-fg">
            <label>Address / Location</label>
            <input type="text" placeholder="e.g. Mumbai, Maharashtra" />
          </div>

          {/* Domain */}
          <div className="sa-sec-lbl"><Globe2 size={16} /> Domain & Branding</div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Subdomain <span className="req">*</span></label>
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <input type="text" value={subdomain} onChange={(e) => setSubdomain(e.target.value)}
                  placeholder="acme" style={{ borderRadius: "8px 0 0 8px", borderRight: "none" }} />
                <div style={{ background: "#f1f5f9", border: "1.5px solid var(--sa-bdr2)", borderLeft: "none", padding: "9px 12px", fontSize: 12, color: "var(--sa-muted)", borderRadius: "0 8px 8px 0", whiteSpace: "nowrap" }}>
                  .noblemanlearning.com
                </div>
              </div>
              <div className="sa-hint">Preview: {subdomain || "acme"}.noblemanlearning.com</div>
            </div>
            <div className="sa-fg">
              <label>Custom Domain (optional)</label>
              <input type="text" placeholder="lms.acme.com" />
              <div className="sa-hint">Point your CNAME to platform.noblemanlearning.com</div>
            </div>
          </div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Brand Colour (Hex)</label>
              <input type="text" placeholder="#2563eb" />
            </div>
            <div className="sa-fg">
              <label>Logo Upload</label>
              <input type="file" accept="image/*" style={{ padding: "6px 12px" }} />
            </div>
          </div>

          {/* Plan */}
          <div className="sa-sec-lbl"><Sparkles size={16} /> Subscription Plan</div>
          <div className="sa-fg-row c3">
            <div className="sa-fg">
              <label>Plan <span className="req">*</span></label>
              <select>
                <option>Starter — ₹4,999/mo</option>
                <option>Growth — ₹12,999/mo</option>
                <option>Enterprise — Custom</option>
              </select>
            </div>
            <div className="sa-fg">
              <label>Billing Cycle</label>
              <select>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Annual</option>
              </select>
            </div>
            <div className="sa-fg">
              <label>Trial Period (days)</label>
              <input type="number" placeholder="0" defaultValue={14} />
            </div>
          </div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Start Date</label>
              <input type="date" />
            </div>
            <div className="sa-fg">
              <label>Platform Fee Override (%)</label>
              <input type="number" placeholder="15" defaultValue={15} />
              <div className="sa-hint">Default is 15%. Override for special deals.</div>
            </div>
          </div>

          {/* First Admin */}
          <div className="sa-sec-lbl"><UserCircle2 size={16} /> Primary Admin Account</div>
          <div className="sa-info-banner sa-info-yellow" style={{ marginBottom: 10 }}>
            This will be the first admin for this tenant. They can add more admins later.
          </div>
          <div className="sa-fg-row c2">
            <div className="sa-fg"><label>Admin Full Name <span className="req">*</span></label><input type="text" placeholder="e.g. Rahul Kumar" /></div>
            <div className="sa-fg"><label>Admin Email <span className="req">*</span></label><input type="email" placeholder="admin@acme.com" /></div>
          </div>
          <div className="sa-fg-row c2">
            <div className="sa-fg">
              <label>Admin Password <span className="req">*</span></label>
              <div className="sa-pw-row">
                <input type="text" value={password} readOnly placeholder="Click Generate →"
                  style={{ fontFamily: "monospace", letterSpacing: 1 }} />
                <button className="sa-gen-btn" onClick={() => setPassword(genPass())}>Generate</button>
              </div>
            </div>
            <div className="sa-fg">
              <label>Send Credentials Via</label>
              <select><option>Email</option><option>WhatsApp</option><option>Both</option></select>
            </div>
          </div>

          {/* Notes */}
          <div className="sa-fg">
            <label>Onboarding Notes</label>
            <textarea placeholder="Any special requirements, deal notes, or onboarding instructions…" />
          </div>
        </div>

        <div className="sa-mf">
          <button className="sa-btn sa-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="sa-btn sa-btn-ghost" style={{ color: "var(--sa-a5)", borderColor: "rgba(0,196,255,.2)" }}>
            Save as Draft
          </button>
          <button className="sa-btn sa-btn-purple" onClick={onClose}>Create Tenant</button>
        </div>
      </div>
    </div>
  );
}
