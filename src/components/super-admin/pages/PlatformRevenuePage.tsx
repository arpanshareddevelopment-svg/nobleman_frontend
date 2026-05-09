"use client";

import { BadgeDollarSign, CalendarDays, Download, Percent, TrendingDown } from "lucide-react";

export default function PlatformRevenueePage() {
  return (
    <div>
      <div className="sa-stats sa-stats-4">
        {[
          { icon: <BadgeDollarSign size={18} />, label: "All-Time Revenue",  val: "₹84L",  sub: "↑ 31% YoY",    cls: "si-purple" },
          { icon: <CalendarDays size={18} />, label: "This Month",         val: "₹8.4L", sub: "↑ 22%",         cls: "si-green"  },
          { icon: <Percent size={18} />, label: "Discounts Given",    val: "₹3.2L", sub: "Across tenants", cls: "si-yellow" },
          { icon: <TrendingDown size={18} />, label: "Pending Dues",       val: "₹1.8L", sub: "From 3 tenants", cls: "si-red"    },
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

      {/* Tenant-wise revenue */}
      <div className="sa-table-card" style={{ marginBottom: 16 }}>
        <div className="sa-table-hd" style={{ padding: "14px 18px" }}>
          <div style={{ fontFamily: '"Manrope",sans-serif', fontSize: 13, fontWeight: 800, color: "var(--sa-text)" }}>
            Tenant-wise Revenue Breakdown
          </div>
          <button className="sa-btn sa-btn-ghost sa-btn-sm" style={{ marginLeft: "auto" }}>
            <Download size={14} /> Export CSV
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Plan</th>
              <th>Students</th>
              <th>Gross Revenue</th>
              <th>Platform Fee (15%)</th>
              <th>Discounts</th>
              <th>Net to Tenant</th>
              <th>Status</th>
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
              <tr key={r.name}>
                <td><strong>{r.name}</strong></td>
                <td><span className={`sa-tag ${r.plan === "Enterprise" ? "tp" : r.plan === "Growth" ? "tb" : "tg"}`}>{r.plan}</span></td>
                <td>{r.students.toLocaleString()}</td>
                <td>{r.gross}</td>
                <td style={{ color: "var(--sa-a5)", fontWeight: 700 }}>{r.fee}</td>
                <td>{r.disc}</td>
                <td style={{ color: "var(--sa-a3)", fontWeight: 700 }}>{r.net}</td>
                <td><span className={`sa-tag ${r.status}`}>{r.sl}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Monthly trend */}
      <div className="sa-grid-2">
        <div className="sa-card">
          <div className="sa-card-hd">
            <div className="sa-card-title"><CalendarDays size={16} /> Monthly Platform Fee Collected</div>
          </div>
          {[
            { month: "Jan", val: 41, max: 84 },
            { month: "Feb", val: 55, max: 84 },
            { month: "Mar", val: 63, max: 84 },
            { month: "Apr", val: 84, max: 84 },
          ].map((r) => (
            <div key={r.month} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: "var(--sa-muted)", fontWeight: 600 }}>{r.month} 2025</span>
                <span style={{ fontWeight: 700, color: "var(--sa-text)" }}>₹{r.val}L</span>
              </div>
              <div className="sa-prog">
                <div className="sa-prog-fill" style={{ width: `${(r.val / r.max) * 100}%`, background: "linear-gradient(90deg,var(--brand-green),var(--brand-yellow))" }} />
              </div>
            </div>
          ))}
        </div>

        <div className="sa-card">
          <div className="sa-card-hd">
            <div className="sa-card-title"><BadgeDollarSign size={16} /> Revenue by Plan Tier</div>
          </div>
          {[
            { label: "Enterprise", val: "₹36.6L", pct: 87, color: "var(--brand-green)" },
            { label: "Growth",     val: "₹14.7L", pct: 58, color: "var(--brand-blue)" },
            { label: "Starter",    val: "₹2.7L",  pct: 22, color: "var(--brand-yellow)" },
          ].map((r) => (
            <div key={r.label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: "var(--sa-muted)", fontWeight: 600 }}>{r.label}</span>
                <span style={{ fontWeight: 700, color: r.color }}>{r.val}</span>
              </div>
              <div className="sa-prog">
                <div className="sa-prog-fill" style={{ width: `${r.pct}%`, background: r.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
