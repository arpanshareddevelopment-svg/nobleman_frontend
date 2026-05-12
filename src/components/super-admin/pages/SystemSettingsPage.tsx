"use client";

import { useState } from "react";
import { Badge, Braces, Building2, CreditCard, Database, FileCog, Globe2, KeyRound, Mail, ShieldCheck, Smartphone, Users } from "lucide-react";

const tagColors = {
  tg: "bg-green-100 text-green-700",
  ty: "bg-yellow-100 text-yellow-800",
  tgr: "bg-gray-100 text-gray-700",
};

export default function SystemSettingsPage() {
  const [tab, setTab] = useState<"general" | "security" | "email" | "integrations">("general");

  const FormField = ({ label, required, children }: any) => (
    <div className="mb-3.5 flex flex-col gap-1">
      <label className="text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );

  const Card = ({ icon, title, children }: any) => (
    <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-4.5 shadow-sm">
      <div className="mb-4 flex items-center gap-2" style={{ fontFamily: '"Manrope", sans-serif' }}>
        {icon}
        <div className="text-sm font-bold" style={{ color: "var(--fg-primary)" }}>
          {title}
        </div>
        <div className="flex-1 border-b border-[var(--border)]" />
      </div>
      {children}
    </div>
  );

  const InputField = (props: any) => (
    <input
      {...props}
      className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)]"
    />
  );

  const SelectField = (props: any) => (
    <select
      {...props}
      className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] cursor-pointer"
    />
  );

  const PrimaryButton = ({ children, ...props }: any) => (
    <button {...props} className="w-full rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-4 py-2 text-xs font-bold text-[#06110c] shadow-lg hover:shadow-xl transition-all">
      {children}
    </button>
  );

  const SecondaryButton = ({ children, ...props }: any) => (
    <button {...props} className="rounded-lg border border-[rgba(15,23,42,0.14)] bg-transparent px-3 py-2 text-xs font-bold text-[var(--fg-secondary)] transition-all hover:text-[var(--fg-primary)] hover:border-opacity-50">
      {children}
    </button>
  );

  return (
    <div>
      {/* Tabs */}
      <div className="mb-5 flex gap-0.5 rounded-xl border border-[var(--border)] bg-white/70 p-1">
        {(["general", "security", "email", "integrations"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-lg px-3 py-1.75 text-center text-xs font-bold transition-all ${ tab === t ? "bg-gradient-to-br from-[rgba(200,255,0,.2)] to-[rgba(255,230,0,.18)] text-[var(--fg-primary)] shadow-md" : "text-[var(--fg-secondary)]" }`}
          >
            {t === "general" ? "General" : t === "security" ? "Security" : t === "email" ? "Email" : "Integrations"}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {tab === "general" && (
        <div className="grid grid-cols-2 gap-4">
          <Card icon={<Building2 size={16} className="text-gray-900" />} title="Platform Details">
            <FormField label="Platform Name" required>
              <InputField type="text" defaultValue="Nobleman Learning" />
            </FormField>
            <FormField label="Super Admin Email" required>
              <InputField type="email" defaultValue="superadmin@noblemanlearning.com" />
            </FormField>
            <FormField label="Support Phone" required>
              <InputField type="tel" defaultValue="+91 98765 00000" />
            </FormField>
            <FormField label="Default Timezone">
              <SelectField defaultValue="IST">
                <option>IST (UTC+5:30)</option>
                <option>UTC</option>
                <option>EST (UTC-5)</option>
              </SelectField>
            </FormField>
            <PrimaryButton>Save Changes</PrimaryButton>
          </Card>

          <Card icon={<Globe2 size={16} className="text-gray-900" />} title="Domain & Branding">
            <FormField label="Root Domain" required>
              <InputField type="text" defaultValue="noblemanlearning.com" />
            </FormField>
            <FormField label="Tenant Subdomain Pattern" required>
              <InputField type="text" defaultValue="{tenant}.noblemanlearning.com" />
            </FormField>
            <FormField label="Default Language">
              <SelectField>
                <option>English</option>
                <option>Hindi</option>
              </SelectField>
            </FormField>
            <FormField label="Maintenance Mode">
              <SelectField>
                <option>Off</option>
                <option>On — show maintenance page</option>
              </SelectField>
            </FormField>
            <PrimaryButton>Save Changes</PrimaryButton>
          </Card>

          <Card icon={<FileCog size={16} className="text-gray-900" />} title="Platform Defaults">
            <FormField label="Default Access Duration">
              <SelectField defaultValue="90">
                <option value="30">30 Days</option>
                <option value="60">60 Days</option>
                <option value="90">90 Days</option>
              </SelectField>
            </FormField>
            <FormField label="Auto-lock on Expiry">
              <SelectField>
                <option>Yes — immediate</option>
                <option>3 day grace period</option>
              </SelectField>
            </FormField>
            <FormField label="Certificate Auto-generation">
              <SelectField>
                <option>Enabled</option>
                <option>Disabled</option>
              </SelectField>
            </FormField>
            <PrimaryButton>Save Defaults</PrimaryButton>
          </Card>

          <Card icon={<CreditCard size={16} className="text-gray-900" />} title="Billing Defaults">
            <FormField label="Platform Fee (%)" required>
              <InputField type="number" defaultValue={15} />
            </FormField>
            <FormField label="Payment Gateway">
              <SelectField>
                <option>Razorpay</option>
                <option>Stripe</option>
                <option>PayU</option>
              </SelectField>
            </FormField>
            <FormField label="Invoice Currency">
              <SelectField>
                <option>INR (₹)</option>
                <option>USD ($)</option>
              </SelectField>
            </FormField>
            <PrimaryButton>Save Billing</PrimaryButton>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {tab === "security" && (
        <div className="grid grid-cols-2 gap-4">
          <Card icon={<KeyRound size={16} className="text-gray-900" />} title="Authentication">
            <FormField label="2FA for Admins">
              <SelectField>
                <option>Mandatory</option>
                <option>Optional</option>
                <option>Disabled</option>
              </SelectField>
            </FormField>
            <FormField label="Session Timeout (minutes)" required>
              <InputField type="number" defaultValue={60} />
            </FormField>
            <FormField label="Max Login Attempts" required>
              <InputField type="number" defaultValue={5} />
            </FormField>
            <FormField label="Password Min Length" required>
              <InputField type="number" defaultValue={8} />
            </FormField>
            <PrimaryButton>Save Security</PrimaryButton>
          </Card>

          <Card icon={<ShieldCheck size={16} className="text-gray-900" />} title="Access Policies">
            <FormField label="IP Whitelist (Super Admin)">
              <textarea
                placeholder="Enter IPs, one per line…"
                className="rounded-lg border-1.5 border-[rgba(15,23,42,0.14)] bg-white/90 px-3 py-2 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-secondary)] transition-all focus:border-[rgba(200,255,0,.5)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(200,255,0,.12)] resize-none"
                style={{ minHeight: 80 }}
              />
            </FormField>
            <FormField label="Audit Log Retention">
              <SelectField>
                <option>90 days</option>
                <option>180 days</option>
                <option>1 year</option>
                <option>Forever</option>
              </SelectField>
            </FormField>
            <FormField label="Data Export Permission">
              <SelectField>
                <option>Super Admin only</option>
                <option>All Admins</option>
              </SelectField>
            </FormField>
            <PrimaryButton>Save Policies</PrimaryButton>
          </Card>
        </div>
      )}

      {/* Email Tab */}
      {tab === "email" && (
        <div className="grid grid-cols-2 gap-4">
          <Card icon={<Mail size={16} className="text-gray-900" />} title="SMTP Configuration">
            <FormField label="SMTP Host" required>
              <InputField type="text" placeholder="smtp.gmail.com" />
            </FormField>
            <FormField label="SMTP Port" required>
              <InputField type="number" placeholder="587" />
            </FormField>
            <FormField label="Username" required>
              <InputField type="email" placeholder="noreply@noblemanlearning.com" />
            </FormField>
            <FormField label="Password" required>
              <InputField type="password" placeholder="••••••••" />
            </FormField>
            <div className="flex gap-2.5">
              <SecondaryButton style={{ flex: 1 }}>Test Connection</SecondaryButton>
              <PrimaryButton style={{ flex: 1 }}>Save SMTP</PrimaryButton>
            </div>
          </Card>

          <Card icon={<Mail size={16} className="text-gray-900" />} title="Email Templates">
            {["Welcome Email", "Password Reset", "Course Access", "Certificate Ready", "Payment Receipt"].map((t) => (
              <div
                key={t}
                className="flex items-center justify-between border-b border-[var(--border)] py-2.5 last:border-b-0"
              >
                <span className="text-xs font-semibold" style={{ color: "var(--fg-primary)" }}>
                  {t}
                </span>
                <div className="flex gap-1.5">
                  <SecondaryButton>Preview</SecondaryButton>
                  <SecondaryButton>Edit</SecondaryButton>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Integrations Tab */}
      {tab === "integrations" && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <CreditCard size={28} />, name: "Razorpay", desc: "Payment gateway for course purchases", status: "tg", sl: "Connected" },
            { icon: <Smartphone size={28} />, name: "WhatsApp API", desc: "Send credentials & notifications", status: "tg", sl: "Connected" },
            { icon: <Badge size={28} />, name: "Google Analytics", desc: "Track platform usage & funnels", status: "ty", sl: "Pending" },
            { icon: <Mail size={28} />, name: "SendGrid", desc: "Transactional email delivery", status: "tgr", sl: "Not Set" },
            { icon: <Database size={28} />, name: "Vimeo", desc: "Video hosting for course content", status: "tg", sl: "Connected" },
            { icon: <Braces size={28} />, name: "Zapier", desc: "Workflow automation & webhooks", status: "tgr", sl: "Not Set" },
          ].map((int) => (
            <div
              key={int.name}
              className="flex items-center gap-3.5 rounded-2xl border border-[var(--border)] bg-white/80 p-4 shadow-sm"
            >
              <div className="flex-shrink-0 text-gray-900">{int.icon}</div>
              <div className="flex-1">
                <div className="mb-0.5 text-sm font-bold" style={{ fontFamily: '"Manrope", sans-serif', color: "var(--fg-primary)" }}>
                  {int.name}
                </div>
                <div className="text-xs" style={{ color: "var(--fg-secondary)" }}>
                  {int.desc}
                </div>
              </div>
              <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-widest ${tagColors[int.status as keyof typeof tagColors]}`}>
                  {int.sl}
                </span>
                <SecondaryButton>{int.sl === "Connected" ? "Configure" : "Connect"}</SecondaryButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
