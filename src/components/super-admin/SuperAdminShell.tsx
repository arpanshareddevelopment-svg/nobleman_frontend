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
import AddAdminModal from "./modals/AddAdminModal";
import AddTenantModal from "./modals/AddTenantModal";
const globalStyles = `
  :root {
    --sa-bg: var(--bg-page);
    --sa-surf: var(--bg-card);
    --sa-bdr: var(--border);
    --sa-bdr2: rgba(15, 23, 42, 0.14);
    --sa-text: var(--fg-primary);
    --sa-muted: var(--fg-secondary);
    --sa-muted2: var(--fg-muted);
    --sa-accent: var(--brand-green);
    --sa-a2: var(--brand-yellow);
    --sa-a3: var(--brand-green-dark);
    --sa-a4: #ef4444;
    --sa-a5: var(--brand-blue);
    --sa-radius: 18px;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  .sa-root {
    font-family: "Space Grotesk", sans-serif;
    background:
      radial-gradient(circle at top left, rgba(200, 255, 0, 0.14), transparent 28%),
      radial-gradient(circle at top right, rgba(0, 196, 255, 0.12), transparent 24%),
      var(--sa-bg);
    color: var(--sa-text);
    display: flex;
    min-height: 100vh;
    font-size: 13px;
  }
  .sa-main { flex:1; display:flex; flex-direction:column; overflow:hidden; min-width:0; }
  .sa-content { padding:24px; flex:1; overflow-y:auto; }

  .sa-stats { display:grid; gap:14px; margin-bottom:20px; }
  .sa-stats-4 { grid-template-columns: repeat(4,1fr); }
  .sa-stats-3 { grid-template-columns: repeat(3,1fr); }
  .sa-stats-5 { grid-template-columns: repeat(5,1fr); }
  .sa-stat {
    background:rgba(255,255,255,0.72); border:1px solid var(--sa-bdr);
    border-radius:var(--sa-radius); padding:16px 18px;
    display:flex; align-items:center; gap:14px;
    box-shadow:0 18px 40px rgba(15,23,42,.06);
    transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  }
  .sa-stat:hover { box-shadow:0 22px 48px rgba(15,23,42,.1); transform:translateY(-2px); border-color:rgba(200,255,0,.35); }
  .sa-si { width:46px; height:46px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; color:var(--sa-text); }
  .si-blue   { background:rgba(0,196,255,.14); color:var(--brand-blue-dark); }
  .si-green  { background:rgba(200,255,0,.16); color:var(--brand-green-dark); }
  .si-yellow { background:rgba(255,230,0,.16); color:#b45309; }
  .si-red    { background:rgba(239,68,68,.12); color:#dc2626; }
  .si-purple { background:rgba(0,196,255,.1); color:var(--brand-blue); }
  .si-indigo { background:rgba(255,230,0,.12); color:#ca8a04; }
  .sa-sv { font-family:"Manrope",sans-serif; font-size:26px; font-weight:800; line-height:1; color:var(--sa-text); }
  .sa-sl { font-size:11px; color:var(--sa-muted); font-weight:600; margin-bottom:3px; }
  .sa-ss { font-size:10px; color:var(--sa-muted2); }
  .sa-ss .up { color:var(--sa-a3); font-weight:700; }
  .sa-ss .dn { color:var(--sa-a4); font-weight:700; }

  .sa-card {
    background:rgba(255,255,255,0.72); border:1px solid var(--sa-bdr);
    border-radius:var(--sa-radius); padding:18px;
    box-shadow:0 18px 40px rgba(15,23,42,.06);
  }
  .sa-card-hd { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
  .sa-card-title { font-family:"Manrope",sans-serif; font-size:13px; font-weight:800; color:var(--sa-text); }
  .sa-card-sub { font-size:11px; color:var(--sa-muted); }

  .sa-charts { display:grid; grid-template-columns:1.7fr 1fr; gap:14px; margin-bottom:20px; }
  .sa-bar-chart { display:flex; align-items:flex-end; gap:5px; height:110px; }
  .sa-bc-col { flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; }
  .sa-bc-bar { width:100%; border-radius:8px 8px 0 0; transition:all .3s; min-width:20px; cursor:pointer; }
  .sa-bc-bar:hover { opacity:.86; }
  .sa-bc-lbl { font-size:9px; color:var(--sa-muted2); }

  .sa-donut-row { display:flex; align-items:center; justify-content:center; gap:20px; }
  .sa-leg { display:flex; flex-direction:column; gap:8px; }
  .sa-leg-item { display:flex; align-items:center; gap:7px; font-size:11px; color:var(--sa-text); }
  .sa-leg-dot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
  .sa-leg-val { font-weight:700; margin-left:auto; font-family:"Manrope",sans-serif; font-size:13px; }

  .sa-table-card {
    background:rgba(255,255,255,0.72); border:1px solid var(--sa-bdr);
    border-radius:var(--sa-radius); overflow:hidden;
    box-shadow:0 18px 40px rgba(15,23,42,.06); margin-bottom:16px;
  }
  .sa-table-hd {
    padding:14px 18px; border-bottom:1px solid var(--sa-bdr);
    display:flex; align-items:center; gap:10px; flex-wrap:wrap;
  }
  table { width:100%; border-collapse:collapse; }
  th {
    padding:10px 16px; text-align:left; font-size:10px;
    text-transform:uppercase; letter-spacing:.7px;
    color:var(--sa-muted); font-weight:700;
    background:rgba(248,250,252,.8); border-bottom:1px solid var(--sa-bdr);
  }
  td { padding:11px 16px; font-size:12px; border-bottom:1px solid var(--sa-bdr); vertical-align:middle; }
  tr:last-child td { border-bottom:none; }
  tr:hover td { background:rgba(248,250,255,.85); }

  .sa-tag {
    display:inline-flex; align-items:center;
    padding:3px 9px; border-radius:20px;
    font-size:10px; font-weight:700;
    text-transform:uppercase; letter-spacing:.3px;
  }
  .tg  { background:rgba(200,255,0,.14); color:#15803d; }
  .ty  { background:rgba(255,230,0,.16); color:#b45309; }
  .tr  { background:rgba(239,68,68,.12); color:#dc2626; }
  .tb  { background:rgba(0,196,255,.12); color:#1d4ed8; }
  .tp  { background:rgba(0,196,255,.08); color:#0369a1; }
  .tgr { background:rgba(148,163,184,.12); color:var(--sa-muted); }
  .ti  { background:rgba(255,230,0,.1); color:#7c3aed; }

  .sa-cu { display:flex; align-items:center; gap:9px; }
  .sa-ca {
    width:30px; height:30px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    font-size:11px; font-weight:800; flex-shrink:0; color:#fff;
  }
  .sa-cn { font-size:12.5px; font-weight:700; color:var(--sa-text); }
  .sa-cs { font-size:11px; color:var(--sa-muted); }

  .sa-acts { display:flex; gap:5px; }
  .sa-ab {
    background:rgba(255,255,255,0.72); border:1px solid var(--sa-bdr2);
    padding:4px 10px; border-radius:8px; font-size:11px;
    cursor:pointer; color:var(--sa-muted);
    font-family:"Space Grotesk",sans-serif; font-weight:600;
    transition:all .15s;
  }
  .sa-ab:hover { color:var(--sa-text); border-color:rgba(200,255,0,.4); }
  .sa-ab.danger:hover { color:var(--sa-a4); border-color:#fca5a5; }
  .sa-ab.success:hover { color:var(--sa-a3); border-color:#86efac; }

  .sa-btn {
    padding:8px 16px; border-radius:10px; font-size:12px;
    font-weight:700; cursor:pointer; border:none;
    font-family:"Space Grotesk",sans-serif; transition:all .15s;
    display:inline-flex; align-items:center; gap:6px;
  }
  .sa-btn-primary { background:linear-gradient(135deg,var(--brand-green) 0%, var(--brand-yellow) 100%); color:#06110c; box-shadow:0 10px 24px rgba(200,255,0,.2); }
  .sa-btn-primary:hover { transform:translateY(-1px); }
  .sa-btn-green { background:var(--sa-a3); color:#fff; }
  .sa-btn-green:hover { background:#059669; }
  .sa-btn-ghost { background:transparent; color:var(--sa-muted); border:1px solid var(--sa-bdr2); }
  .sa-btn-ghost:hover { color:var(--sa-text); border-color:rgba(200,255,0,.35); }
  .sa-btn-danger { background:#fef2f2; color:var(--sa-a4); border:1px solid #fecaca; }
  .sa-btn-danger:hover { background:#fee2e2; }
  .sa-btn-sm { padding:5px 12px; font-size:11px; }
  .sa-btn-purple { background:var(--sa-a5); color:#fff; }
  .sa-btn-purple:hover { background:#0284c7; }

  .sa-search {
    background:rgba(255,255,255,0.72); border:1px solid var(--sa-bdr2);
    border-radius:10px; padding:7px 10px; font-size:12px;
    color:var(--sa-text); font-family:"Space Grotesk",sans-serif; width:200px;
  }
  .sa-search:focus { outline:none; border-color:rgba(200,255,0,.5); box-shadow:0 0 0 3px rgba(200,255,0,.12); }
  .sa-sel {
    background:rgba(255,255,255,0.72); border:1px solid var(--sa-bdr2);
    border-radius:10px; padding:7px 10px; font-size:12px;
    color:var(--sa-muted); font-family:"Space Grotesk",sans-serif; cursor:pointer;
  }
  .sa-mini-sel {
    background:rgba(255,255,255,0.72); border:1px solid var(--sa-bdr2);
    border-radius:8px; padding:4px 8px; font-size:11px;
    font-family:"Space Grotesk",sans-serif; color:var(--sa-muted); cursor:pointer;
  }

  .sa-sec-lbl {
    font-family:"Manrope",sans-serif; font-size:12px; font-weight:800;
    color:var(--sa-text); margin-bottom:12px;
    display:flex; align-items:center; gap:7px;
  }
  .sa-sec-lbl::after { content:""; flex:1; height:1px; background:var(--sa-bdr); }

  .sa-fg { display:flex; flex-direction:column; gap:5px; margin-bottom:14px; }
  .sa-fg-row { display:grid; gap:12px; }
  .sa-fg-row.c2 { grid-template-columns:1fr 1fr; }
  .sa-fg-row.c3 { grid-template-columns:1fr 1fr 1fr; }
  .sa-fg label { font-size:10.5px; font-weight:700; color:var(--sa-muted); text-transform:uppercase; letter-spacing:.5px; }
  .sa-fg label .req { color:var(--sa-a4); }
  .sa-fg input, .sa-fg select, .sa-fg textarea {
    background:rgba(255,255,255,.88); border:1.5px solid var(--sa-bdr2);
    border-radius:10px; padding:9px 12px; font-size:13px;
    color:var(--sa-text); font-family:"Space Grotesk",sans-serif;
    width:100%; transition:all .15s;
  }
  .sa-fg input:focus, .sa-fg select:focus, .sa-fg textarea:focus {
    outline:none; border-color:rgba(200,255,0,.5);
    background:#fff; box-shadow:0 0 0 3px rgba(200,255,0,.12);
  }
  .sa-fg textarea { resize:vertical; min-height:75px; }
  .sa-hint { font-size:10px; color:var(--sa-muted2); margin-top:2px; }

  .sa-perms { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; margin-bottom:14px; }
  .sa-perm {
    background:rgba(255,255,255,.82); border:1.5px solid var(--sa-bdr2);
    border-radius:10px; padding:10px 12px;
    display:flex; align-items:center; gap:10px;
    cursor:pointer; transition:all .15s;
  }
  .sa-perm:hover { border-color:rgba(200,255,0,.45); background:rgba(200,255,0,.08); }
  .sa-perm.checked { border-color:rgba(200,255,0,.55); background:rgba(200,255,0,.1); }
  .sa-perm .pi { font-size:16px; width:24px; text-align:center; flex-shrink:0; }
  .sa-perm-lbl { font-size:12px; font-weight:600; color:var(--sa-text); }
  .sa-perm-sub { font-size:10px; color:var(--sa-muted); }
  .sa-perm-cb { margin-left:auto; width:16px; height:16px; accent-color:var(--sa-accent); cursor:pointer; }

  .sa-overlay {
    position:fixed; inset:0; background:rgba(6,4,15,.64);
    z-index:100; display:flex; align-items:flex-start;
    justify-content:center; padding:24px; overflow-y:auto;
    backdrop-filter:blur(8px);
  }
  .sa-modal {
    background:rgba(255,255,255,.92); border:1px solid var(--sa-bdr);
    border-radius:22px; width:640px; max-width:100%;
    animation:saIn .2s ease; box-shadow:0 20px 60px rgba(0,0,0,.18);
    margin:auto;
  }
  .sa-modal-lg { width:780px; }
  @keyframes saIn {
    from { opacity:0; transform:translateY(16px) scale(.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  .sa-mh {
    padding:18px 22px 16px; border-bottom:1px solid var(--sa-bdr);
    display:flex; align-items:center; justify-content:space-between;
  }
  .sa-mh-left { display:flex; align-items:center; gap:10px; }
  .sa-mh-icon { width:40px; height:40px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:17px; color:#06110c; }
  .sa-mt { font-family:"Manrope",sans-serif; font-size:16px; font-weight:800; color:var(--sa-text); }
  .sa-ms { font-size:11px; color:var(--sa-muted); }
  .sa-mc { background:none; border:none; font-size:22px; cursor:pointer; color:var(--sa-muted2); line-height:1; padding:2px; }
  .sa-mc:hover { color:var(--sa-text); }
  .sa-mb { padding:20px 22px; }
  .sa-mf {
    padding:14px 22px; border-top:1px solid var(--sa-bdr);
    display:flex; justify-content:flex-end; gap:10px;
    background:rgba(248,250,252,.8); border-radius:0 0 22px 22px;
  }

  .sa-tabs { display:flex; gap:2px; background:rgba(255,255,255,.7); border:1px solid var(--sa-bdr); border-radius:14px; padding:4px; margin-bottom:18px; }
  .sa-tab { flex:1; padding:7px 12px; text-align:center; cursor:pointer; border-radius:10px; font-size:12px; font-weight:700; color:var(--sa-muted); transition:all .15s; }
  .sa-tab.active { background:linear-gradient(135deg,rgba(200,255,0,.2),rgba(255,230,0,.18)); color:var(--sa-text); box-shadow:0 8px 20px rgba(15,23,42,.08); }

  .sa-plan-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:20px; }
  .sa-plan-card {
    background:rgba(255,255,255,.82); border:1px solid var(--sa-bdr);
    border-radius:20px; padding:20px; transition:all .2s;
  }
  .sa-plan-card:hover { border-color:rgba(200,255,0,.45); box-shadow:0 16px 36px rgba(15,23,42,.08); }
  .sa-plan-card.featured { border-color:rgba(200,255,0,.58); background:linear-gradient(135deg, rgba(200,255,0,.12), rgba(255,230,0,.12)); }
  .sa-plan-name { font-family:"Manrope",sans-serif; font-size:16px; font-weight:800; color:var(--sa-text); margin-bottom:4px; }
  .sa-plan-price { font-family:"Manrope",sans-serif; font-size:28px; font-weight:800; color:var(--sa-accent); margin-bottom:12px; }
  .sa-plan-price small { font-size:13px; color:var(--sa-muted); font-family:"Space Grotesk",sans-serif; font-weight:400; }
  .sa-plan-feat { list-style:none; display:flex; flex-direction:column; gap:7px; margin-bottom:16px; }
  .sa-plan-feat li { font-size:12px; color:var(--sa-text); display:flex; align-items:center; gap:7px; }
  .sa-plan-feat li::before { content:"✓"; color:var(--sa-a3); font-weight:800; }

  .sa-ann-item {
    background:rgba(255,255,255,.82); border:1px solid var(--sa-bdr);
    border-radius:var(--sa-radius); padding:14px 16px;
    display:flex; align-items:flex-start; gap:12px;
    margin-bottom:8px; transition:all .15s;
  }
  .sa-ann-item:hover { border-color:rgba(200,255,0,.45); box-shadow:0 2px 12px rgba(15,23,42,.08); }

  .sa-audit-row { display:flex; align-items:center; gap:12px; padding:10px 16px; border-bottom:1px solid var(--sa-bdr); }
  .sa-audit-row:last-child { border-bottom:none; }
  .sa-audit-row:hover { background:rgba(248,250,255,.85); }
  .sa-audit-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }

  .sa-prog { height:4px; background:rgba(148,163,184,.18); border-radius:999px; overflow:hidden; margin-top:6px; }
  .sa-prog-fill { height:100%; border-radius:999px; }

  ::-webkit-scrollbar { width:5px; height:5px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:3px; }

  .sa-pw-row { position:relative; }
  .sa-pw-row input { padding-right:100px; }
  .sa-gen-btn {
    position:absolute; right:6px; top:50%; transform:translateY(-50%);
    background:linear-gradient(135deg,var(--brand-green) 0%, var(--brand-yellow) 100%); color:#06110c; border:none;
    padding:5px 10px; border-radius:8px; font-size:10px;
    font-weight:700; cursor:pointer; font-family:"Space Grotesk",sans-serif;
  }
  .sa-gen-btn:hover { transform:translateY(-50%) translateY(-1px); }

  .sa-info-banner {
    font-size:11px; border-radius:10px; padding:8px 12px;
    margin-bottom:10px;
  }
  .sa-info-yellow { background:rgba(255,230,0,.12); border:1px solid rgba(255,230,0,.28); color:#92400e; }
  .sa-info-blue   { background:rgba(0,196,255,.08); border:1px solid rgba(0,196,255,.2); color:#0369a1; }
  .sa-info-green  { background:rgba(200,255,0,.1); border:1px solid rgba(200,255,0,.24); color:#166534; }
  .sa-info-red    { background:rgba(239,68,68,.08); border:1px solid rgba(239,68,68,.18); color:#991b1b; }

  .sa-divider { height:1px; background:var(--sa-bdr); margin:16px 0; }

  .sa-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .sa-grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
`;

export type PageId =
  | "dashboard"
  | "admins"
  | "tenants"
  | "revenue"
  | "plans"
  | "announcements"
  | "audit"
  | "settings";

export const pageMeta: Record<PageId, { title: string; sub: string }> = {
  dashboard: { title: "Super Admin Dashboard", sub: "Platform-wide overview" },
  admins: { title: "Admin Accounts", sub: "Manage all admin users" },
  tenants: { title: "Tenants / Branches", sub: "Manage all tenant organisations" },
  revenue: { title: "Platform Revenue", sub: "Financial overview across all tenants" },
  plans: { title: "Plans & Pricing", sub: "Subscription tiers and feature gates" },
  announcements: { title: "Announcements", sub: "Broadcast messages to admins & students" },
  audit: { title: "Audit Logs", sub: "Full activity trail across the platform" },
  settings: { title: "System Settings", sub: "Global platform configuration" },
};

export default function SuperAdminShell() {
  const [activePage, setActivePage] = useState<PageId>("dashboard");
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const [addTenantOpen, setAddTenantOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = addAdminOpen || addTenantOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [addAdminOpen, addTenantOpen]);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage setPage={setActivePage} openAddAdmin={() => setAddAdminOpen(true)} openAddTenant={() => setAddTenantOpen(true)} />;
      case "admins":
        return <AdminsPage openAddAdmin={() => setAddAdminOpen(true)} />;
      case "tenants":
        return <TenantsPage openAddTenant={() => setAddTenantOpen(true)} />;
      case "revenue":
        return <PlatformRevenueePage />;
      case "plans":
        return <PlansPage />;
      case "announcements":
        return <AnnouncementsPage />;
      case "audit":
        return <AuditLogsPage />;
      case "settings":
        return <SystemSettingsPage />;
      default:
        return <DashboardPage setPage={setActivePage} openAddAdmin={() => setAddAdminOpen(true)} openAddTenant={() => setAddTenantOpen(true)} />;
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="sa-root">
        <Sidebar activePage={activePage} setPage={setActivePage} openAddAdmin={() => setAddAdminOpen(true)} openAddTenant={() => setAddTenantOpen(true)} />
        <main className="sa-main">
          <Topbar meta={pageMeta[activePage]} />
          <div className="sa-content">{renderPage()}</div>
        </main>
      </div>

      {addAdminOpen && <AddAdminModal onClose={() => setAddAdminOpen(false)} />}
      {addTenantOpen && <AddTenantModal onClose={() => setAddTenantOpen(false)} />}
    </>
  );
}
