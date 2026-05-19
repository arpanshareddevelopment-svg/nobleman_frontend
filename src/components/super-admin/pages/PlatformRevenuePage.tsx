"use client";

import { BadgeDollarSign, CalendarDays, Download, Percent, TrendingDown } from "lucide-react";

const statCards = [
  { icon: <BadgeDollarSign size={18} />, label: "All-Time Revenue", val: "₹84L", sub: "↑ 31% YoY", iconBg: "rgba(167,139,250,0.15)", iconColor: "#a78bfa" },
  { icon: <CalendarDays size={18} />, label: "This Month", val: "₹8.4L", sub: "↑ 22%", iconBg: "rgba(52,211,153,0.15)", iconColor: "#34d399" },
  { icon: <Percent size={18} />, label: "Discounts Given", val: "₹3.2L", sub: "Across students", iconBg: "rgba(255,207,51,0.15)", iconColor: "#ffcf33" },
  { icon: <TrendingDown size={18} />, label: "Pending Dues", val: "₹1.8L", sub: "From 3 students", iconBg: "rgba(239,68,68,0.15)", iconColor: "#f87171" },
];

const rows = [
  { name: "SkillHub", plan: "Enterprise", students: 1200, gross: "₹22.4L", fee: "₹3.36L", disc: "₹1.2L", net: "₹17.8L", status: "tg", sl: "Paid" },
  { name: "Acme LMS", plan: "Enterprise", students: 820, gross: "₹14.2L", fee: "₹2.13L", disc: "₹0.8L", net: "₹11.3L", status: "tg", sl: "Paid" },
  { name: "EdgeLearn", plan: "Growth", students: 540, gross: "₹8.6L", fee: "₹1.29L", disc: "₹0.4L", net: "₹6.9L", status: "tg", sl: "Paid" },
  { name: "BrightPath", plan: "Growth", students: 390, gross: "₹6.1L", fee: "₹0.92L", disc: "₹0.3L", net: "₹4.9L", status: "ty", sl: "Partial" },
  { name: "LearnPro", plan: "Starter", students: 120, gross: "₹1.8L", fee: "₹0.27L", disc: "₹0.1L", net: "₹1.4L", status: "tr", sl: "Pending" },
  { name: "EduNext", plan: "Starter", students: 80, gross: "₹0.9L", fee: "₹0.14L", disc: "₹0.05L", net: "₹0.7L", status: "tr", sl: "Pending" },
];

const planStyle: Record<string, { bg: string; color: string }> = {
  Enterprise: { bg: "rgba(167,139,250,0.15)", color: "#a78bfa" },
  Growth: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  Starter: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
};
const statusStyle: Record<string, { bg: string; color: string }> = {
  tg: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
  ty: { bg: "rgba(255,207,51,0.15)", color: "#ffcf33" },
  tr: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
};

const card = { background: "var(--bg-card)", border: "1px solid var(--border)" };

export default function PlatformRevenuePage() {
  return (
    <div>
      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-3.5">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl p-4" style={card}>
            <div className="mb-3"><div className="rounded-full p-2 inline-flex" style={{ background: s.iconBg, color: s.iconColor }}>{s.icon}</div></div>
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>{s.label}</div>
            <div className="mt-1 text-2xl font-bold" style={{ color: "var(--fg-primary)" }}>{s.val}</div>
            <div className="mt-2 text-xs" style={{ color: "var(--fg-secondary)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue Table */}
      <div className="mb-6 overflow-hidden rounded-2xl" style={card}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 className="text-sm font-bold" style={{ color: "var(--fg-primary)" }}>Student-wise Revenue Breakdown</h3>
          <button className="rounded-lg px-3 py-2 text-xs font-bold flex items-center gap-1.5 transition-all" style={{ border: "1px solid var(--border)", background: "transparent", color: "var(--fg-secondary)" }}>
            <Download size={14} /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.03)" }}>
                {["Student", "Plan", "Students", "Gross Revenue", "Platform Fee (15%)", "Discounts", "Net to Student", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-bold" style={{ color: "var(--fg-primary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} style={{ borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <td className="px-4 py-3 font-semibold" style={{ color: "var(--fg-primary)" }}>{r.name}</td>
                  <td className="px-4 py-3"><span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest" style={{ background: planStyle[r.plan]?.bg, color: planStyle[r.plan]?.color }}>{r.plan}</span></td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{r.students.toLocaleString()}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{r.gross}</td>
                  <td className="px-4 py-3 font-bold" style={{ color: "#fb923c" }}>{r.fee}</td>
                  <td className="px-4 py-3" style={{ color: "var(--fg-primary)" }}>{r.disc}</td>
                  <td className="px-4 py-3 font-bold" style={{ color: "#34d399" }}>{r.net}</td>
                  <td className="px-4 py-3"><span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest" style={{ background: statusStyle[r.status]?.bg, color: statusStyle[r.status]?.color }}>{r.sl}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-6" style={card}>
          <div className="mb-6 flex items-center gap-2">
            <CalendarDays size={18} style={{ color: "var(--fg-primary)" }} />
            <h3 className="text-sm font-bold" style={{ color: "var(--fg-primary)" }}>Monthly Platform Fee Collected</h3>
          </div>
          <div className="space-y-4">
            {[{ month: "Jan", val: 41, max: 84 }, { month: "Feb", val: 55, max: 84 }, { month: "Mar", val: 63, max: 84 }, { month: "Apr", val: 84, max: 84 }].map((r) => (
              <div key={r.month}>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-semibold" style={{ color: "var(--fg-secondary)" }}>{r.month} 2025</span>
                  <span className="font-bold" style={{ color: "var(--fg-primary)" }}>₹{r.val}L</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
                  <div className="h-full" style={{ width: `${(r.val / r.max) * 100}%`, background: "linear-gradient(90deg, var(--brand-green), var(--brand-yellow))" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6" style={card}>
          <div className="mb-6 flex items-center gap-2">
            <BadgeDollarSign size={18} style={{ color: "var(--fg-primary)" }} />
            <h3 className="text-sm font-bold" style={{ color: "var(--fg-primary)" }}>Revenue by Plan Tier</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Enterprise", val: "₹36.6L", pct: 87, color: "#84ff3d" },
              { label: "Growth", val: "₹14.7L", pct: 58, color: "var(--brand-blue)" },
              { label: "Starter", val: "₹2.7L", pct: 22, color: "var(--brand-yellow)" },
            ].map((r) => (
              <div key={r.label}>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-semibold" style={{ color: "var(--fg-secondary)" }}>{r.label}</span>
                  <span className="font-bold" style={{ color: r.color }}>{r.val}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
                  <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
