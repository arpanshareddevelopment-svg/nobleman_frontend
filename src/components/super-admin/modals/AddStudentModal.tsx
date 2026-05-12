"use client";

import { useState } from "react";
import clsx from "clsx";
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

const inputCls =
  "w-full rounded-lg border border-black/12 dark:border-white/12 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-muted)] outline-none transition-all focus:border-[rgba(200,255,0,0.5)] focus:ring-4 focus:ring-[rgba(200,255,0,0.12)]";

const selectCls =
  "w-full rounded-lg border border-black/12 dark:border-white/12 bg-white/90 dark:bg-white/5 px-3 py-2 text-sm text-[var(--fg-secondary)] outline-none transition-all focus:border-[rgba(200,255,0,0.5)] focus:ring-4 focus:ring-[rgba(200,255,0,0.12)] cursor-pointer";

const labelCls = "block text-[10px] font-bold uppercase tracking-widest text-[var(--fg-secondary)] mb-1";

const sectionLabelCls =
  "flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)] mt-5 mb-3 pb-2 border-b border-black/8 dark:border-white/8";

export default function AddStudentModal({ onClose }: Props) {
  const [password, setPassword] = useState("");
  const [subdomain, setSubdomain] = useState("");

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
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(200,255,0,0.12)] text-[var(--brand-green)]">
            <Building2 size={18} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-[var(--fg-primary)] font-[Manrope]">Add New Student</div>
            <div className="text-xs text-[var(--fg-muted)]">Onboard a new organisation onto the platform</div>
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

          {/* Organisation Details */}
          <div className={sectionLabelCls}>
            <Building2 size={14} /> Organisation Details
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className={labelCls}>Organisation Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="e.g. Acme Learning Solutions"
                className={inputCls}
                onChange={(e) =>
                  setSubdomain(e.target.value.toLowerCase().replace(/\s+/g, "").slice(0, 20))
                }
              />
            </div>
            <div>
              <label className={labelCls}>Industry / Sector</label>
              <select className={selectCls}>
                <option>EdTech</option>
                <option>Corporate Training</option>
                <option>K-12 Education</option>
                <option>Higher Education</option>
                <option>Coaching Institute</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className={labelCls}>Contact Email <span className="text-red-500">*</span></label>
              <input type="email" placeholder="contact@organisation.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Contact Phone</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Address / Location</label>
            <input type="text" placeholder="e.g. Mumbai, Maharashtra" className={inputCls} />
          </div>

          {/* Domain & Branding */}
          <div className={sectionLabelCls}>
            <Globe2 size={14} /> Domain & Branding
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className={labelCls}>Subdomain <span className="text-red-500">*</span></label>
              <div className="flex">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  placeholder="acme"
                  className={clsx(inputCls, "rounded-r-none border-r-0")}
                />
                <div className="flex items-center shrink-0 rounded-r-lg border border-black/12 dark:border-white/12 bg-gray-50 dark:bg-white/5 px-3 text-xs text-[var(--fg-muted)] whitespace-nowrap">
                  .noblemanlearning.com
                </div>
              </div>
              <p className="mt-1 text-[10px] text-[var(--fg-muted)]">
                Preview: {subdomain || "acme"}.noblemanlearning.com
              </p>
            </div>
            <div>
              <label className={labelCls}>Custom Domain (optional)</label>
              <input type="text" placeholder="lms.acme.com" className={inputCls} />
              <p className="mt-1 text-[10px] text-[var(--fg-muted)]">
                Point your CNAME to platform.noblemanlearning.com
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Brand Colour (Hex)</label>
              <input type="text" placeholder="#2563eb" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Logo Upload</label>
              <input
                type="file"
                accept="image/*"
                className={clsx(inputCls, "py-1.5 file:mr-3 file:rounded file:border-0 file:bg-[var(--brand-green)] file:px-2 file:py-1 file:text-xs file:font-bold file:text-gray-900 file:cursor-pointer")}
              />
            </div>
          </div>

          {/* Subscription Plan */}
          <div className={sectionLabelCls}>
            <Sparkles size={14} /> Subscription Plan
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className={labelCls}>Plan <span className="text-red-500">*</span></label>
              <select className={selectCls}>
                <option>Starter — ₹4,999/mo</option>
                <option>Growth — ₹12,999/mo</option>
                <option>Enterprise — Custom</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Billing Cycle</label>
              <select className={selectCls}>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Annual</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Trial Period (days)</label>
              <input type="number" placeholder="0" defaultValue={14} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Start Date</label>
              <input type="date" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Platform Fee Override (%)</label>
              <input type="number" placeholder="15" defaultValue={15} className={inputCls} />
              <p className="mt-1 text-[10px] text-[var(--fg-muted)]">Default is 15%. Override for special deals.</p>
            </div>
          </div>

          {/* Primary Admin Account */}
          <div className={sectionLabelCls}>
            <UserCircle2 size={14} /> Primary Admin Account
          </div>
          <div className="mb-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
            This will be the first admin for this student. They can add more admins later.
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className={labelCls}>Admin Full Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g. Rahul Kumar" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Admin Email <span className="text-red-500">*</span></label>
              <input type="email" placeholder="admin@acme.com" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Admin Password <span className="text-red-500">*</span></label>
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
            <div>
              <label className={labelCls}>Send Credentials Via</label>
              <select className={selectCls}>
                <option>Email</option>
                <option>WhatsApp</option>
                <option>Both</option>
              </select>
            </div>
          </div>

          {/* Onboarding Notes */}
          <div className="mt-4">
            <label className={labelCls}>Onboarding Notes</label>
            <textarea
              placeholder="Any special requirements, deal notes, or onboarding instructions…"
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
            className="rounded-lg border border-[rgba(0,196,255,0.25)] bg-transparent px-4 py-2 text-xs font-bold text-[var(--brand-blue)] hover:bg-[rgba(0,196,255,0.08)] transition-all cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-5 py-2 text-xs font-bold text-[#06110c] shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Create Student
          </button>
        </div>
      </div>
    </div>
  );
}

