
"use client";

import { useEffect, useRef } from "react";
import {
  BadgeDollarSign,
  BookOpen,
  GraduationCap,
  Megaphone,
  Users,
  UserCheck,
  FileText,
  TrendingUp,
} from "lucide-react";
import type { PageId } from "../SuperAdminShell";

interface Props {
  setPage: (p: PageId) => void;
  openAddAdmin: () => void;
  openAddTenant: () => void;
}

const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const vals = [120, 180, 260, 240, 320, 410, 520];

export default function DashboardPage({ setPage }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el || el.childElementCount > 0) return;

    const max = Math.max(...vals);

    months.forEach((m, i) => {
      const h = Math.round((vals[i] / max) * 100);

      const col = document.createElement("div");
      col.className = "sa-bc-col";

      col.innerHTML = `
        <div style="flex:1;display:flex;align-items:flex-end;width:100%">
          <div
            class="sa-bc-bar"
            style="
              height:${h}px;
              width:100%;
              border-radius:10px 10px 0 0;
              background:${
                i === 6
                  ? "linear-gradient(180deg,var(--brand-blue),var(--brand-green))"
                  : "linear-gradient(180deg,rgba(37,99,235,.9),rgba(16,185,129,.45))"
              };
            "
          ></div>
        </div>
        <div class="sa-bc-lbl">${m}</div>
      `;

      el.appendChild(col);
    });
  }, []);

  return (
    <div>
      {/* Stats */}
      <div className="sa-stats sa-stats-4">
        {[
          {
            icon: <BookOpen size={18} />,
            label: "Courses",
            val: "24",
            sub: "Active: 20 · Upcoming: 4",
            cls: "si-blue",
          },
          {
            icon: <GraduationCap size={18} />,
            label: "Lessons",
            val: "220",
            sub: "Published: 180 · Drafts: 40",
            cls: "si-green",
          },
          {
            icon: <Users size={18} />,
            label: "Enrollments",
            val: "348",
            sub: "Paid: 301 · Free: 47",
            cls: "si-yellow",
          },
          {
            icon: <UserCheck size={18} />,
            label: "Students",
            val: "17",
            sub: "12 Active · 5 Inactive",
            cls: "si-purple",
          },
        ].map((s) => (
          <div className="sa-stat" key={s.label}>
            <div className={`sa-si ${s.cls}`}>{s.icon}</div>

            <div>
              <div className="sa-sl">{s.label}</div>
              <div className="sa-sv">{s.val}</div>
              <div className="sa-ss">
                <span className="up">{s.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="sa-charts">
        <div className="sa-card">
          <div className="sa-card-hd">
            <div>
              <div className="sa-card-title">
                <BadgeDollarSign size={16} /> Admin Revenue
              </div>

              <div className="sa-card-sub">
                ₹2,40,000
                <span
                  style={{
                    color: "var(--brand-green)",
                    fontWeight: 700,
                    marginLeft: 8,
                  }}
                >
                  +36% from last year
                </span>
              </div>
            </div>

            <select className="sa-mini-sel">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>

          <div className="sa-bar-chart" ref={chartRef} />
        </div>

        <div className="sa-card">
          <div className="sa-card-hd">
            <div className="sa-card-title">
              <TrendingUp size={16} /> Lead Sources
            </div>
          </div>

          <div className="sa-donut-row">
            <svg width="100" height="100" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="rgba(148,163,184,.25)"
                strokeWidth="4"
              />

              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="var(--brand-blue)"
                strokeWidth="4"
                strokeDasharray="52 100"
                strokeDashoffset="25"
                strokeLinecap="round"
              />

              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="var(--brand-green)"
                strokeWidth="4"
                strokeDasharray="30 100"
                strokeDashoffset="-27"
                strokeLinecap="round"
              />

              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="var(--brand-yellow)"
                strokeWidth="4"
                strokeDasharray="18 100"
                strokeDashoffset="-57"
                strokeLinecap="round"
              />

              <text
                x="18"
                y="20"
                textAnchor="middle"
                fill="var(--sa-text)"
                fontSize="5.5"
                fontFamily="Manrope"
                fontWeight="800"
              >
                348
              </text>
            </svg>

            <div className="sa-leg">
              {[
                {
                  color: "var(--brand-blue)",
                  label: "WhatsApp",
                  val: "181",
                },
                {
                  color: "var(--brand-green)",
                  label: "Meta Ads",
                  val: "104",
                },
                {
                  color: "var(--brand-yellow)",
                  label: "Organic",
                  val: "63",
                },
              ].map((l) => (
                <div className="sa-leg-item" key={l.label}>
                  <div
                    className="sa-leg-dot"
                    style={{ background: l.color }}
                  />

                  {l.label}

                  <span
                    className="sa-leg-val"
                    style={{ color: l.color }}
                  >
                    {l.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            fontFamily: '"Manrope",sans-serif',
            fontSize: 14,
            fontWeight: 800,
            color: "var(--sa-text)",
          }}
        >
          Quick Actions
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          {
            icon: <BookOpen size={18} />,
            label: "Add Course",
            color: "rgba(37,99,235,.08)",
            border: "rgba(37,99,235,.18)",
            fn: () => setPage("courses" as PageId),
          },
          {
            icon: <Users size={18} />,
            label: "Add Student",
            color: "rgba(16,185,129,.08)",
            border: "rgba(16,185,129,.18)",
            fn: () => setPage("students" as PageId),
          },
          {
            icon: <Megaphone size={18} />,
            label: "Marketing",
            color: "rgba(245,158,11,.08)",
            border: "rgba(245,158,11,.18)",
            fn: () => setPage("revenue" as PageId),
          },
          {
            icon: <FileText size={18} />,
            label: "Create Exam",
            color: "rgba(139,92,246,.08)",
            border: "rgba(139,92,246,.18)",
            fn: () => setPage("exams" as PageId),
          },
        ].map((q) => (
          <div
            key={q.label}
            onClick={q.fn}
            style={{
              background: q.color,
              border: `1.5px solid ${q.border}`,
              borderRadius: 12,
              padding: "16px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              transition: "all .2s",
            }}
          >
            <span style={{ color: "var(--sa-text)" }}>{q.icon}</span>
            <span
              style={{
                fontWeight: 700,
                fontSize: 12,
                color: "var(--sa-text)",
              }}
            >
              {q.label}
            </span>
          </div>
        ))}
      </div>

      {/* Recent Enrollments */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            fontFamily: '"Manrope",sans-serif',
            fontSize: 14,
            fontWeight: 800,
            color: "var(--sa-text)",
          }}
        >
          Recent Enrollments
        </div>

        <button
          className="sa-btn sa-btn-ghost sa-btn-sm"
          onClick={() => setPage("students" as PageId)}
        >
          View All →
        </button>
      </div>

      <div className="sa-table-card">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Source</th>
              <th>Payment</th>
              <th>Expires</th>
              <th>Access</th>
            </tr>
          </thead>

          <tbody>
            {[
              {
                init: "RK",
                name: "Rohit Kumar",
                course: "Full Stack Dev",
                source: "WhatsApp",
                payment: "Paid ₹12,999",
                expires: "May 22, 2025",
                access: "Active",
                color:
                  "linear-gradient(135deg,#2563eb,#60a5fa)",
              },
              {
                init: "PS",
                name: "Priya Sharma",
                course: "Digital Marketing",
                source: "Meta Ads",
                payment: "Partial ₹5,000",
                expires: "Jun 10, 2025",
                access: "Active",
                color:
                  "linear-gradient(135deg,#10b981,#34d399)",
              },
              {
                init: "AM",
                name: "Arjun Mehta",
                course: "Data Analytics",
                source: "Organic",
                payment: "Pending",
                expires: "Apr 30, 2025",
                access: "Expired",
                color:
                  "linear-gradient(135deg,#f59e0b,#fbbf24)",
              },
            ].map((r) => (
              <tr key={r.name}>
                <td>
                  <div className="sa-cu">
                    <div
                      className="sa-ca"
                      style={{
                        background: r.color,
                        color: "white",
                      }}
                    >
                      {r.init}
                    </div>

                    <div>
                      <div className="sa-cn">{r.name}</div>
                    </div>
                  </div>
                </td>

                <td>{r.course}</td>
                <td>
                  <span className="sa-tag tb">{r.source}</span>
                </td>
                <td>{r.payment}</td>
                <td>{r.expires}</td>
                <td>
                  <span
                    className={`sa-tag ${
                      r.access === "Active" ? "tg" : "tr"
                    }`}
                  >
                    {r.access}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

