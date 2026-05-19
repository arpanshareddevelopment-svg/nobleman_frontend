"use client";

import { BadgePlus } from "lucide-react";

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
    students: 2,
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
    students: 4,
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
    students: 6,
  },
];

export default function PlansPage() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div
          className="text-sm font-bold"
          style={{ fontFamily: '"Manrope", sans-serif', color: "var(--fg-primary)" }}
        >
          Subscription Plans
        </div>
        <button
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-4 py-2 text-xs font-bold text-[#06110c] shadow-lg hover:shadow-xl"
          style={{ transition: "all 0.15s" }}
        >
          <BadgePlus size={14} /> Create Plan
        </button>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl border border-[var(--border)] p-5 transition-all duration-200 hover:shadow-lg"
            style={{
              borderColor: p.featured ? "rgba(200, 255, 0, 0.58)" : "var(--border)",
              background: p.featured
                ? "linear-gradient(135deg, rgba(200,255,0,.12), rgba(255,230,0,.12))"
                : "var(--bg-card)",
            }}
          >
            {p.featured && (
              <div className="mb-2 inline-block rounded-full bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-2.5 py-0.5 text-xs font-bold text-[#06110c]" style={{ letterSpacing: "0.05em" }}>
                Most Popular
              </div>
            )}
            <div
              className="mb-1 text-lg font-bold"
              style={{ fontFamily: '"Manrope", sans-serif', color: "var(--fg-primary)" }}
            >
              {p.name}
            </div>
            <div className="mb-3 text-3xl font-bold" style={{ color: p.color }}>
              {p.price}
              <span className="text-xs font-normal" style={{ color: "var(--fg-secondary)" }}>
                {p.period}
              </span>
            </div>
            <ul className="mb-4 flex flex-col gap-1.5">
              {p.features.map((f) => (
                <li key={f} className="text-xs" style={{ color: "var(--fg-primary)" }}>
                  <span style={{ color: "var(--brand-green-dark)", fontWeight: 800 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="mb-3 flex gap-2">
              <button
                className="flex-1 rounded-lg border border-[var(--border)] bg-transparent px-3 py-1.5 text-xs font-bold transition-all"
                style={{ color: "var(--fg-secondary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                Edit
              </button>
              <button className="flex-1 rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] px-3 py-1.5 text-xs font-bold text-[#06110c] shadow-md hover:shadow-lg" style={{ transition: "all 0.15s" }}>
                Assign
              </button>
            </div>
            <div className="text-center text-xs" style={{ color: "var(--fg-secondary)" }}>
              <span style={{ fontWeight: 700, color: p.color }}>{p.students}</span> students on this plan
            </div>
          </div>
        ))}
      </div>

      {/* Feature matrix */}
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm" style={{ background: "var(--bg-card)" }}>
        <div className="border-b border-[var(--border)] px-4.5 py-3.5 flex items-center gap-2.5">
          <div
            className="text-sm font-bold"
            style={{ fontFamily: '"Manrope", sans-serif', color: "var(--fg-primary)" }}
          >
            Feature Gate Matrix
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)" }}>
              <th className="border-b border-[var(--border)] px-4 py-2.5 text-left font-bold uppercase tracking-widest" style={{ color: "var(--fg-secondary)", fontSize: "10px" }}>
                Feature
              </th>
              <th className="border-b border-[var(--border)] px-4 py-2.5 text-left font-bold uppercase tracking-widest" style={{ color: "var(--fg-secondary)", fontSize: "10px" }}>
                Starter
              </th>
              <th className="border-b border-[var(--border)] px-4 py-2.5 text-left font-bold uppercase tracking-widest" style={{ color: "var(--fg-secondary)", fontSize: "10px" }}>
                Growth
              </th>
              <th className="border-b border-[var(--border)] px-4 py-2.5 text-left font-bold uppercase tracking-widest" style={{ color: "var(--fg-secondary)", fontSize: "10px" }}>
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Student limit", "200", "1,000", "Unlimited"],
              ["Course limit", "5", "20", "Unlimited"],
              ["Admin accounts", "1", "3", "Unlimited"],
              ["Exam builder", "❌", "✅", "✅"],
              ["Certificate gen.", "❌", "✅", "✅"],
              ["Custom domain", "❌", "✅", "✅"],
              ["White-label branding", "❌", "❌", "✅"],
              ["API access", "❌", "❌", "✅"],
              ["Priority support", "❌", "✅", "✅ Dedicated"],
              ["Analytics", "Basic", "Advanced", "Full Suite"],
            ].map(([feat, s, g, e]) => (
              <tr
                key={feat}
                onMouseEnter={(ev) => (ev.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
              >
                <td className="border-b border-[var(--border)] px-4 py-2.75 text-xs font-semibold" style={{ color: "var(--fg-primary)" }}>
                  {feat}
                </td>
                <td className="border-b border-[var(--border)] px-4 py-2.75 text-xs font-semibold" style={{ color: s === "❌" ? "#ef4444" : "var(--brand-green-dark)" }}>
                  {s}
                </td>
                <td className="border-b border-[var(--border)] px-4 py-2.75 text-xs font-semibold" style={{ color: g === "❌" ? "#ef4444" : "var(--brand-green-dark)" }}>
                  {g}
                </td>
                <td className="border-b border-[var(--border)] px-4 py-2.75 text-xs font-semibold" style={{ color: e.startsWith("❌") ? "#ef4444" : "var(--brand-blue)" }}>
                  {e}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
