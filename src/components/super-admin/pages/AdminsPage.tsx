"use client";

import { BookOpen, Users, FileText, Tag } from "lucide-react";

interface Props {
  openAddAdmin: () => void;
}

const courses = [
  { code: "NBL-101", title: "Principles of Leadership", instructor: "Rahul Kumar", students: 420, tenant: "Acme LMS", status: "Published" },
  { code: "NBL-202", title: "Advanced Communication", instructor: "Priya Singh", students: 220, tenant: "EdgeLearn", status: "Published" },
  { code: "NBL-303", title: "Team Management", instructor: "Arjun Mehta", students: 120, tenant: "BrightPath", status: "Draft" },
  { code: "NBL-404", title: "Sales Strategies", instructor: "Neha Kapoor", students: 86, tenant: "SkillHub", status: "Published" },
];

export default function AdminsPage({ openAddAdmin }: Props) {
  return (
    <div>
      <div className="sa-stats sa-stats-4">
        {[
          { icon: <BookOpen size={18} />, label: "Total Courses", val: "96", sub: "Published: 82", cls: "si-yellow" },
          { icon: <Users size={18} />, label: "Instructors", val: "42", sub: "Active: 38", cls: "si-blue" },
          { icon: <FileText size={18} />, label: "Active Enrollments", val: "4,820", sub: "+18% this month", cls: "si-green" },
          { icon: <Tag size={18} />, label: "Drafts", val: "14", sub: "Needs review", cls: "si-red" },
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

      <div className="sa-table-card">
        <div className="sa-table-hd">
          <input className="sa-search" placeholder="Search courses, instructors…" />
          <select className="sa-sel">
            <option>All Tenants</option>
            <option>Acme LMS</option>
            <option>EdgeLearn</option>
          </select>
          <select className="sa-sel">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
          <button
            className="sa-btn sa-btn-primary sa-btn-sm"
            style={{ marginLeft: "auto" }}
            onClick={openAddAdmin}
          >
            + Add Course
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Instructor</th>
              <th>Students</th>
              <th>Tenant</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.code}>
                <td>
                  <div className="sa-cu">
                    <div className="sa-ca" style={{ background: "linear-gradient(135deg,var(--brand-green),var(--brand-yellow))", color: "#06110c" }}>{c.code}</div>
                    <div>
                      <div className="sa-cn">{c.title}</div>
                      <div className="sa-cs">{c.code}</div>
                    </div>
                  </div>
                </td>
                <td>{c.instructor}</td>
                <td>{c.students}</td>
                <td>{c.tenant}</td>
                <td><span className={`sa-tag ${c.status === "Published" ? "tg" : "tr"}`}>{c.status}</span></td>
                <td>
                  <div className="sa-acts">
                    <button className="sa-ab">View</button>
                    <button className="sa-ab">Edit</button>
                    <button className="sa-ab danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
