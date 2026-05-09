"use client";

import { useState } from "react";
import { BarChart3, Building2, ChevronRight, HandCoins, LayoutDashboard, Shield, Sparkles, Users, Megaphone, Search, Settings, BadgeDollarSign, ShieldCheck } from "lucide-react";
import type { PageId } from "./SuperAdminShell";

interface Props {
  activePage: PageId;
  setPage: (p: PageId) => void;
  openAddAdmin: () => void;
  openAddTenant: () => void;
}

export default function Sidebar({ activePage, setPage, openAddAdmin, openAddTenant }: Props) {
  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({
    "sub-admins": true,
    "sub-tenants": false,
  });

  const toggleSub = (id: string) =>
    setOpenSubs((prev) => ({ ...prev, [id]: !prev[id] }));

  const navItem = (
    id: PageId,
    icon: React.ReactNode,
    label: string,
    badge?: number
  ) => (
    <div
      className={`sa-nav-item${activePage === id ? " active" : ""}`}
      onClick={() => setPage(id)}
    >
      <span className="ni">{icon}</span>
      {label}
      {badge ? <span className="sa-nav-badge">{badge}</span> : null}
    </div>
  );

  return (
    <>
      <style>{sidebarStyles}</style>
      <aside className="sa-sidebar">
        {/* Logo */}
        <div className="sa-logo-wrap">
          <div className="sa-logo-box">
            <div className="sa-logo-icon">
              <img src="/branding/logo_light.png" alt="Nobleman Learning" className="sa-logo-img sa-logo-light" />
              <img src="/branding/logo_dark.png" alt="Nobleman Learning" className="sa-logo-img sa-logo-dark" />
            </div>
            <div className="sa-logo-text">
              Nobleman Learning
              <small>Super Admin</small>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="sa-nav-group">
          <div className="sa-nav-label">Overview</div>
          {navItem("dashboard", <LayoutDashboard size={16} />, "Dashboard")}
        </div>

        {/* Platform */}
        <div className="sa-nav-group">
          <div className="sa-nav-label">Platform</div>

          {/* Admins */}
          <div
            className={`sa-nav-item${openSubs["sub-admins"] ? " open" : ""}`}
            onClick={() => toggleSub("sub-admins")}
          >
            <span className="ni"><Users size={16} /></span>Admin Accounts
            <span className="arr">›</span>
          </div>
          <div className={`sa-sub-nav${openSubs["sub-admins"] ? " open" : ""}`}>
            <div
              className={`sa-sub-item${activePage === "admins" ? " active" : ""}`}
              onClick={() => setPage("admins")}
            >
              • All Admins
            </div>
            <div className="sa-sub-item" onClick={openAddAdmin}>
              • Add Admin
            </div>
          </div>

          {/* Tenants */}
          <div
            className={`sa-nav-item${openSubs["sub-tenants"] ? " open" : ""}`}
            onClick={() => toggleSub("sub-tenants")}
          >
            <span className="ni"><Building2 size={16} /></span>Tenants / Branches
            <span className="arr">›</span>
          </div>
          <div className={`sa-sub-nav${openSubs["sub-tenants"] ? " open" : ""}`}>
            <div
              className={`sa-sub-item${activePage === "tenants" ? " active" : ""}`}
              onClick={() => setPage("tenants")}
            >
              • All Tenants
            </div>
            <div className="sa-sub-item" onClick={openAddTenant}>
              • Add Tenant
            </div>
          </div>

          {navItem("plans", <Sparkles size={16} />, "Plans & Pricing")}
        </div>

        {/* Business */}
        <div className="sa-nav-group">
          <div className="sa-nav-label">Business</div>
          {navItem("revenue", <BadgeDollarSign size={16} />, "Platform Revenue")}
          {navItem("announcements", <Megaphone size={16} />, "Announcements")}
        </div>

        {/* System */}
        <div className="sa-nav-group">
          <div className="sa-nav-label">System</div>
          {navItem("audit", <ShieldCheck size={16} />, "Audit Logs")}
          {navItem("settings", <Settings size={16} />, "System Settings")}
        </div>

        {/* Footer */}
        <div className="sa-sidebar-footer">
          <div className="sa-admin-row">
            <div className="sa-av">SA</div>
            <div className="sa-av-info">
              Super Admin
              <small>superadmin@noblemanlearning.com</small>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

const sidebarStyles = `
  .sa-sidebar {
    width:230px; min-width:230px;
    background:linear-gradient(180deg, rgba(6,4,15,.97) 0%, rgba(10,14,26,.97) 100%);
    display:flex; flex-direction:column;
    height:100vh; position:sticky; top:0; overflow-y:auto;
    border-right:1px solid rgba(255,255,255,.08);
    box-shadow:8px 0 30px rgba(6,4,15,.18);
  }
  .sa-logo-wrap { padding:20px 18px 16px; border-bottom:1px solid rgba(255,255,255,.08); }
  .sa-logo-box { display:flex; align-items:center; gap:10px; }
  .sa-logo-icon {
    width:38px; height:38px;
    background:linear-gradient(135deg, rgba(200,255,0,.18), rgba(255,230,0,.18));
    border-radius:12px; display:flex; align-items:center;
    justify-content:center; overflow:hidden; border:1px solid rgba(200,255,0,.22);
  }
  .sa-logo-img { width:100%; height:100%; object-fit:contain; padding:4px; }
  .sa-logo-light { display:none; }
  .dark .sa-logo-dark { display:none; }
  .dark .sa-logo-light { display:block; }
  .sa-logo-text { font-family:"Manrope",sans-serif; font-size:16px; font-weight:800; color:#fff; line-height:1.1; }
  .sa-logo-text small {
    display:block; font-size:9px; font-weight:400;
    color:rgba(255,255,255,.45); letter-spacing:1.5px;
    text-transform:uppercase; font-family:"Space Grotesk",sans-serif;
  }
  .sa-nav-group { padding:10px 0; }
  .sa-nav-label { padding:8px 18px 4px; font-size:9px; letter-spacing:1.5px; text-transform:uppercase; color:rgba(255,255,255,.3); font-weight:700; }
  .sa-nav-item {
    display:flex; align-items:center; gap:9px;
    padding:9px 18px; cursor:pointer;
    color:rgba(255,255,255,.55); font-size:12.5px; font-weight:600;
    transition:all .15s; border-left:3px solid transparent; position:relative;
  }
  .sa-nav-item:hover { color:#fff; background:rgba(255,255,255,.06); }
  .sa-nav-item.active { color:#06110c; background:linear-gradient(135deg, rgba(200,255,0,.95), rgba(255,230,0,.88)); border-left-color:#c8ff00; }
  .sa-nav-item .ni { font-size:15px; width:20px; text-align:center; flex-shrink:0; }
  .sa-nav-item .arr { margin-left:auto; font-size:10px; transition:transform .2s; }
  .sa-nav-item.open .arr { transform:rotate(90deg); }
  .sa-nav-badge { margin-left:auto; background:var(--brand-green); color:#06110c; font-size:9px; padding:1px 6px; border-radius:10px; font-weight:700; }
  .sa-sub-nav { overflow:hidden; max-height:0; transition:max-height .25s ease; }
  .sa-sub-nav.open { max-height:200px; }
  .sa-sub-item {
    display:flex; align-items:center; gap:8px;
    padding:7px 18px 7px 44px; cursor:pointer;
    color:rgba(255,255,255,.4); font-size:12px; font-weight:500;
    transition:all .15s;
  }
  .sa-sub-item:hover { color:#fff; background:rgba(255,255,255,.04); }
  .sa-sub-item.active { color:var(--brand-green); }
  .sa-sidebar-footer { padding:14px 18px; border-top:1px solid rgba(255,255,255,.08); margin-top:auto; }
  .sa-admin-row { display:flex; align-items:center; gap:10px; }
  .sa-av {
    width:34px; height:34px; border-radius:50%;
    background:linear-gradient(135deg, var(--brand-green) 0%, var(--brand-yellow) 100%);
    display:flex; align-items:center; justify-content:center;
    font-size:12px; font-weight:800; color:#06110c; flex-shrink:0;
  }
  .sa-av-info { color:#fff; font-size:12px; font-weight:600; }
  .sa-av-info small { display:block; font-size:10px; color:rgba(255,255,255,.4); font-weight:400; }
`;
