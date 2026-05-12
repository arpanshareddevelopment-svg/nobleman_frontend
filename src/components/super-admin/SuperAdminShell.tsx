"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DashboardPage from "./pages/DashboardPage";
import AdminsPage from "./pages/AdminsPage";
import TenantsPage from "./pages/TenantsPage";
import PlatformRevenueePage from "./pages/PlatformRevenuePage";
import SystemSettingsPage from "./pages/SystemSettingsPage";
import AuditLogsPage from "./pages/AuditLogsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import PlansPage from "./pages/PlansPage";
import InstructorsPage from "./pages/InstructorsPage";
import ExamsPage from "./pages/ExamsPage";
import SalesDashboardPage from "./pages/SalesDashboardPage";
import SupportTicketsPage from "./pages/SupportTicketsPage";
import AccessControlPage from "./pages/AccessControlPage";
import ReportsPage from "./pages/ReportsPage";
import AddAdminModal from "./modals/AddAdminModal";
import AddTenantModal from "./modals/AddTenantModal";

export type PageId =
  | "dashboard"
  | "admins"
  | "tenants"
  | "revenue"
  | "plans"
  | "announcements"
  | "audit"
  | "settings"
  | "instructors"
  | "exams"
  | "sales"
  | "tickets"
  | "access"
  | "reports";

export const pageMeta: Record<PageId, { title: string; sub: string }> = {
  dashboard: { title: "Super Admin Dashboard", sub: "Platform-wide overview" },
  admins: { title: "Admin Accounts", sub: "Manage all admin users" },
  tenants: {
    title: "Tenants / Branches",
    sub: "Manage all tenant organisations",
  },
  revenue: {
    title: "Platform Revenue",
    sub: "Financial overview across all tenants",
  },
  plans: {
    title: "Plans & Pricing",
    sub: "Subscription tiers and feature gates",
  },
  announcements: {
    title: "Announcements",
    sub: "Broadcast messages to admins & students",
  },
  instructors: { title: "Instructors", sub: "Manage instructors and profiles" },
  exams: { title: "Exams & Quizzes", sub: "Create and review assessments" },
  sales: { title: "Sales Dashboard", sub: "Revenue and sales metrics" },
  tickets: { title: "Support Tickets", sub: "Customer support queue" },
  access: { title: "Access Control", sub: "Roles and permissions" },
  reports: { title: "Reports", sub: "Platform reports and exports" },
  audit: {
    title: "Audit Logs",
    sub: "Full activity trail across the platform",
  },
  settings: { title: "System Settings", sub: "Global platform configuration" },
};

export default function SuperAdminShell() {
  const [activePage, setActivePage] = useState<PageId>("dashboard");
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const [addTenantOpen, setAddTenantOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      addAdminOpen || addTenantOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [addAdminOpen, addTenantOpen]);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <DashboardPage
            setPage={setActivePage}
            openAddAdmin={() => setAddAdminOpen(true)}
            openAddTenant={() => setAddTenantOpen(true)}
          />
        );
      case "admins":
        return <AdminsPage openAddAdmin={() => setAddAdminOpen(true)} />;
      case "tenants":
        return <TenantsPage openAddTenant={() => setAddTenantOpen(true)} />;
      case "revenue":
        return <PlatformRevenueePage />;
      case "instructors":
        return <InstructorsPage />;
      case "exams":
        return <ExamsPage />;
      case "sales":
        return <SalesDashboardPage />;
      case "tickets":
        return <SupportTicketsPage />;
      case "access":
        return <AccessControlPage />;
      case "reports":
        return <ReportsPage />;
      case "plans":
        return <PlansPage />;
      case "announcements":
        return <AnnouncementsPage />;
      case "audit":
        return <AuditLogsPage />;
      case "settings":
        return <SystemSettingsPage />;
      default:
        return (
          <DashboardPage
            setPage={setActivePage}
            openAddAdmin={() => setAddAdminOpen(true)}
            openAddTenant={() => setAddTenantOpen(true)}
          />
        );
    }
  };

  return (
    <>
      <div
        className="flex min-h-screen text-sm"
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          background: `
            radial-gradient(circle at top left, rgba(200, 255, 0, 0.14), transparent 28%),
            radial-gradient(circle at top right, rgba(0, 196, 255, 0.12), transparent 24%),
            var(--bg-page)
          `,
          color: "var(--fg-primary)",
        }}
      >
        <Sidebar
          activePage={activePage}
          setPage={setActivePage}
          openAddAdmin={() => setAddAdminOpen(true)}
          openAddTenant={() => setAddTenantOpen(true)}
        />
        <main className="flex flex-1 flex-col overflow-hidden">
          <Topbar meta={pageMeta[activePage]} />
          <div className="flex-1 overflow-y-auto px-6 py-6">{renderPage()}</div>
        </main>
      </div>

      {addAdminOpen && <AddAdminModal onClose={() => setAddAdminOpen(false)} />}
      {addTenantOpen && (
        <AddTenantModal onClose={() => setAddTenantOpen(false)} />
      )}
    </>
  );
}
