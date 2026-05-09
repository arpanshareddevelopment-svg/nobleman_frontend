"use client";

import { BadgePlus, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹4,999",
    period: "/month",
    featured: false,
    color: "#10b981",
    features: [
      "Up to 200 students",
      "Up to 5 courses",
      "1 Admin account",
      "Basic analytics",
      "Email support",
      "Custom subdomain",
    ],
    tenants: 2,
  },
  {
    name: "Growth",
    price: "₹12,999",
    period: "/month",
    featured: true,
    color: "#2563eb",
    features: [
      "Up to 1,000 students",
      "Up to 20 courses",
      "3 Admin accounts",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "Exam & quiz builder",
      "Certificate generation",
    ],
    tenants: 4,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    featured: false,
    color: "#00c4ff",
    features: [
      "Unlimited students",
      "Unlimited courses",
      "Unlimited admins",
      "Full analytics suite",
      "Dedicated support",
      "White-label branding",
      "API access",
      "SLA guarantee",
      "Custom integrations",
    ],
    tenants: 6,
  },
];

export default function PlansPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: '"Manrope",sans-serif', fontSize: 14, fontWeight: 800, color: "var(--sa-text)" }}>
          Subscription Plans
        </div>
        <button className="sa-btn sa-btn-primary sa-btn-sm"><BadgePlus size={14} /> Create Plan</button>
      </div>

      <div className="sa-plan-grid">
        {plans.map((p) => (
          <div key={p.name} className={`sa-plan-card${p.featured ? " featured" : ""}`}>
            {p.featured && (
              <div style={{ background: "linear-gradient(135deg,var(--brand-green),var(--brand-yellow))", color: "#06110c", fontSize: 9, fontWeight: 800, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>
                Most Popular
              </div>
            )}
            <div className="sa-plan-name">{p.name}</div>
            <div className="sa-plan-price" style={{ color: p.color }}>
              {p.price}<small>{p.period}</small>
            </div>
            <ul className="sa-plan-feat">
              {p.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button className="sa-btn sa-btn-ghost sa-btn-sm" style={{ flex: 1 }}>Edit</button>
              <button className="sa-btn sa-btn-primary sa-btn-sm" style={{ flex: 1 }}>Assign</button>
            </div>
            <div style={{ fontSize: 11, color: "var(--sa-muted)", textAlign: "center" }}>
              <span style={{ fontWeight: 700, color: p.color }}>{p.tenants}</span> tenants on this plan
            </div>
          </div>
        ))}
      </div>

      {/* Feature matrix */}
      <div className="sa-table-card">
        <div className="sa-table-hd" style={{ padding: "14px 18px" }}>
          <div style={{ fontFamily: '"Manrope",sans-serif', fontSize: 13, fontWeight: 800, color: "var(--sa-text)" }}>
            Feature Gate Matrix
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Starter</th>
              <th>Growth</th>
              <th>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Student limit",         "200",    "1,000",   "Unlimited"],
              ["Course limit",          "5",      "20",      "Unlimited"],
              ["Admin accounts",        "1",      "3",       "Unlimited"],
              ["Exam builder",          "❌",     "✅",      "✅"],
              ["Certificate gen.",      "❌",     "✅",      "✅"],
              ["Custom domain",         "❌",     "✅",      "✅"],
              ["White-label branding",  "❌",     "❌",      "✅"],
              ["API access",            "❌",     "❌",      "✅"],
              ["Priority support",      "❌",     "✅",      "✅ Dedicated"],
              ["Analytics",             "Basic",  "Advanced","Full Suite"],
            ].map(([feat, s, g, e]) => (
              <tr key={feat}>
                <td style={{ fontWeight: 600 }}>{feat}</td>
                <td style={{ color: s === "❌" ? "var(--sa-a4)" : "var(--sa-a3)", fontWeight: 600 }}>{s}</td>
                <td style={{ color: g === "❌" ? "var(--sa-a4)" : "var(--sa-a3)", fontWeight: 600 }}>{g}</td>
                <td style={{ color: e.startsWith("❌") ? "var(--sa-a4)" : "var(--sa-a5)", fontWeight: 600 }}>{e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
