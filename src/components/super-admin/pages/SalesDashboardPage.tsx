"use client";

import { BadgeDollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const revenueData = [38, 52, 71, 65, 88, 112, 142];

const topTenants = [
  { init: "SH", name: "SkillHub", plan: "Enterprise", revenue: "₹22.4L", growth: "+18%", positive: true },
  { init: "AL", name: "Acme LMS", plan: "Enterprise", revenue: "₹14.2L", growth: "+12%", positive: true },
  { init: "EL", name: "EdgeLearn", plan: "Growth", revenue: "₹8.6L", growth: "+9%", positive: true },
  { init: "BP", name: "BrightPath", plan: "Growth", revenue: "₹6.1L", growth: "-3%", positive: false },
  { init: "LP", name: "LearnPro", plan: "Starter", revenue: "₹1.8L", growth: "+41%", positive: true },
];

const stats = [
  { icon: <BadgeDollarSign size={18} />, label: "Total Revenue", val: "₹84L", sub: "↑ 31% YoY", bg: "from-purple-50 to-purple-100/50", dot: "bg-purple-400" },
  { icon: <ShoppingCart size={18} />, label: "New Enrollments", val: "1,240", sub: "This month", bg: "from-green-50 to-green-100/50", dot: "bg-green-400" },
  { icon: <TrendingUp size={18} />, label: "MoM Growth", val: "+26%", sub: "vs last month", bg: "from-blue-50 to-blue-100/50", dot: "bg-blue-400" },
  { icon: <Users size={18} />, label: "Active Tenants", val: "10", sub: "Paying customers", bg: "from-amber-50 to-amber-100/50", dot: "bg-amber-400" },
];

const maxVal = Math.max(...revenueData);

export default function SalesDashboardPage() {
  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-2xl bg-gradient-to-br ${s.bg} border border-[var(--border)] p-4 shadow-sm`}>
            <div className="mb-3 flex items-start justify-between">
              <div className={`rounded-full p-2 ${s.dot} text-white`}>{s.icon}</div>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[var(--fg-secondary)]">{s.label}</div>
            <div className="mt-1 text-2xl font-bold text-[var(--fg-primary)]">{s.val}</div>
            <div className="mt-2 text-xs text-[var(--fg-secondary)]">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        {/* Revenue Bar Chart */}
        <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-extrabold text-[var(--fg-primary)]">
                <BadgeDollarSign size={16} /> Monthly Revenue
              </div>
              <p className="mt-0.5 text-xs text-[var(--fg-secondary)]">
                ₹8.4L this month
                <span className="ml-2 font-bold text-emerald-600">+22%</span>
              </p>
            </div>
            <select className="rounded-lg border border-[var(--border)] bg-white/70 px-2 py-1 text-xs text-[var(--fg-secondary)] cursor-pointer">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="flex items-end gap-2" style={{ height: 120 }}>
            {months.map((m, i) => {
              const h = Math.round((revenueData[i] / maxVal) * 100);
              const isLast = i === months.length - 1;
              return (
                <div key={m} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-lg transition-opacity hover:opacity-75 cursor-pointer"
                      style={{
                        height: h,
                        background: isLast
                          ? "linear-gradient(180deg,#00c4ff,#c8ff00)"
                          : "linear-gradient(180deg,rgba(37,99,235,.9),rgba(16,185,129,.45))",
                        minWidth: 20,
                      }}
                    />
                  </div>
                  <span className="text-[9px] text-[var(--fg-muted)]">{m}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Tenants */}
        <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-5 shadow-sm">
          <div className="mb-4 text-sm font-extrabold text-[var(--fg-primary)]">Top Tenants by Revenue</div>
          <div className="space-y-2.5">
            {topTenants.map((t) => (
              <div key={t.name} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] text-[10px] font-bold text-[#06110c]">
                  {t.init}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[var(--fg-primary)] truncate">{t.name}</div>
                  <div className="text-[10px] text-[var(--fg-muted)]">{t.plan}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-[var(--fg-primary)]">{t.revenue}</div>
                  <div className={`text-[10px] font-semibold ${t.positive ? "text-emerald-600" : "text-red-500"}`}>{t.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Distribution */}
      <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-5 shadow-sm">
        <div className="mb-4 text-sm font-extrabold text-[var(--fg-primary)]">Revenue by Plan Tier</div>
        <div className="space-y-3">
          {[
            { label: "Enterprise", val: "₹36.6L", pct: 87, color: "from-[var(--brand-green)] to-[var(--brand-yellow)]" },
            { label: "Growth", val: "₹14.7L", pct: 58, color: "from-blue-400 to-blue-500" },
            { label: "Starter", val: "₹2.7L", pct: 22, color: "from-amber-400 to-amber-500" },
          ].map((r) => (
            <div key={r.label}>
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="font-semibold text-[var(--fg-secondary)]">{r.label}</span>
                <span className="font-bold text-[var(--fg-primary)]">{r.val}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-black/6 dark:bg-white/8">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${r.color} transition-all duration-500`}
                  style={{ width: `${r.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
