"use client";

import { BadgeDollarSign, CalendarDays, Download, Percent, TrendingDown } from "lucide-react";

export default function PlatformRevenuePage() {
  return (
    <div>
      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-4 gap-3.5">
        {[
          { icon: <BadgeDollarSign size={18} />, label: "All-Time Revenue",  val: "₹84L",  sub: "↑ 31% YoY",    color: "from-purple-50 to-purple-100/50", dotColor: "bg-purple-400" },
          { icon: <CalendarDays size={18} />, label: "This Month",         val: "₹8.4L", sub: "↑ 22%",         color: "from-green-50 to-green-100/50", dotColor: "bg-green-400" },
          { icon: <Percent size={18} />, label: "Discounts Given",    val: "₹3.2L", sub: "Across tenants", color: "from-yellow-50 to-yellow-100/50", dotColor: "bg-yellow-400" },
          { icon: <TrendingDown size={18} />, label: "Pending Dues",       val: "₹1.8L", sub: "From 3 tenants", color: "from-red-50 to-red-100/50", dotColor: "bg-red-400" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl bg-gradient-to-br ${s.color} border border-[var(--border)] p-4 shadow-sm`}>
            <div className="mb-3 flex items-start justify-between">
              <div className={`rounded-full p-2 ${s.dotColor}`}>{s.icon}</div>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)]">{s.label}</div>
            <div className="mt-1 text-2xl font-bold text-[var(--fg-primary)]">{s.val}</div>
            <div className="mt-2 text-xs text-[var(--fg-secondary)]">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tenant-wise Revenue Table */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-white/70 shadow-sm">
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-white/50 px-6 py-4">
          <h3 className="text-sm font-bold text-[var(--fg-primary)]">Tenant-wise Revenue Breakdown</h3>
          <button className="rounded-lg border border-[rgba(15,23,42,0.14)] bg-transparent px-3 py-2 text-xs font-bold text-[var(--fg-secondary)] transition-all hover:text-[var(--fg-primary)] hover:border-opacity-50 flex items-center gap-1.5">
            <Download size={14} /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-white/50">
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Tenant</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Plan</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Students</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Gross Revenue</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Platform Fee (15%)</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Discounts</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Net to Tenant</th>
                <th className="px-4 py-3 text-left font-bold text-[var(--fg-primary)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "SkillHub",   plan: "Enterprise", students: 1200, gross: "₹22.4L", fee: "₹3.36L", disc: "₹1.2L",  net: "₹17.8L", status: "tg", sl: "Paid"    },
                { name: "Acme LMS",  plan: "Enterprise", students: 820,  gross: "₹14.2L", fee: "₹2.13L", disc: "₹0.8L",  net: "₹11.3L", status: "tg", sl: "Paid"    },
                { name: "EdgeLearn", plan: "Growth",     students: 540,  gross: "₹8.6L",  fee: "₹1.29L", disc: "₹0.4L",  net: "₹6.9L",  status: "tg", sl: "Paid"    },
                { name: "BrightPath",plan: "Growth",     students: 390,  gross: "₹6.1L",  fee: "₹0.92L", disc: "₹0.3L",  net: "₹4.9L",  status: "ty", sl: "Partial" },
                { name: "LearnPro",  plan: "Starter",    students: 120,  gross: "₹1.8L",  fee: "₹0.27L", disc: "₹0.1L",  net: "₹1.4L",  status: "tr", sl: "Pending" },
                { name: "EduNext",   plan: "Starter",    students: 80,   gross: "₹0.9L",  fee: "₹0.14L", disc: "₹0.05L", net: "₹0.7L",  status: "tr", sl: "Pending" },
              ].map((r) => (
                <tr key={r.name} className="border-b border-[var(--border)] hover:bg-white/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-[var(--fg-primary)]">{r.name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.75 text-xs font-bold uppercase tracking-widest ${r.plan === "Enterprise" ? "bg-purple-100 text-purple-700" : r.plan === "Growth" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                      {r.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{r.students.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{r.gross}</td>
                  <td className="px-4 py-3 font-bold text-orange-600">{r.fee}</td>
                  <td className="px-4 py-3 text-[var(--fg-primary)]">{r.disc}</td>
                  <td className="px-4 py-3 font-bold text-green-600">{r.net}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.75 text-xs font-bold uppercase tracking-widest ${r.status === "tg" ? "bg-green-100 text-green-700" : r.status === "ty" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-700"}`}>
                      {r.sl}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Monthly Platform Fee */}
        <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <CalendarDays size={18} className="text-gray-900" />
            <h3 className="text-sm font-bold text-[var(--fg-primary)]">Monthly Platform Fee Collected</h3>
          </div>
          <div className="space-y-4">
            {[
              { month: "Jan", val: 41, max: 84 },
              { month: "Feb", val: 55, max: 84 },
              { month: "Mar", val: 63, max: 84 },
              { month: "Apr", val: 84, max: 84 },
            ].map((r) => (
              <div key={r.month}>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-semibold text-[var(--fg-secondary)]">{r.month} 2025</span>
                  <span className="font-bold text-[var(--fg-primary)]">₹{r.val}L</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[rgba(15,23,42,0.08)]">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-yellow)]"
                    style={{ width: `${(r.val / r.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Plan */}
        <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <BadgeDollarSign size={18} className="text-gray-900" />
            <h3 className="text-sm font-bold text-[var(--fg-primary)]">Revenue by Plan Tier</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Enterprise", val: "₹36.6L", pct: 87, color: "from-[var(--brand-green)] to-[var(--brand-yellow)]" },
              { label: "Growth",     val: "₹14.7L", pct: 58, color: "bg-[var(--brand-blue)]" },
              { label: "Starter",    val: "₹2.7L",  pct: 22, color: "bg-[var(--brand-yellow)]" },
            ].map((r) => (
              <div key={r.label}>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-semibold text-[var(--fg-secondary)]">{r.label}</span>
                  <span style={{ fontWeight: 700, color: r.label === "Enterprise" ? "var(--brand-green)" : r.label === "Growth" ? "var(--brand-blue)" : "var(--brand-yellow)" }}>
                    {r.val}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[rgba(15,23,42,0.08)]">
                  <div
                    className={`h-full ${r.label === "Enterprise" ? "bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-yellow)]" : r.color}`}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
