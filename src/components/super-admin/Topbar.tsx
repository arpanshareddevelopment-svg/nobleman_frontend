"use client";

import { Bell, HelpCircle, Search, UserCircle2, Sun, Moon } from "lucide-react";
import { useTheme } from "../../lib/useTheme";

interface Props {
  meta: { title: string; sub: string };
}

export default function Topbar({ meta }: Props) {
  const { isDark, toggle } = useTheme();
  return (
    <>
      <style>{topbarStyles}</style>
      <div className="sa-topbar">
        <div className="sa-topbar-left">
          <div>
            <div className="sa-page-title">{meta.title}</div>
            <div className="sa-page-sub">{meta.sub}</div>
          </div>
        </div>
        <div className="sa-topbar-right">
          <div className="sa-search-wrap">
            <input className="sa-topbar-search" placeholder="Search admins, tenants…" />
          </div>
          <div className="sa-tb-icon"><HelpCircle size={16} /></div>
          <div className="sa-tb-icon" title={isDark ? "Switch to light" : "Switch to dark"} onClick={toggle} style={{ cursor: "pointer" }}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </div>
          <div className="sa-tb-icon" style={{ position: "relative" }}>
            <Bell size={16} />
            <div className="sa-notif-dot" />
          </div>
          <div
            className="sa-av"
            style={{ width: 36, height: 36, cursor: "pointer", fontSize: 12 }}
          >
            SA
          </div>
        </div>
      </div>
    </>
  );
}

const topbarStyles = `
  .sa-topbar {
    background:rgba(255,255,255,.78); border-bottom:1px solid var(--sa-bdr);
    padding:0 24px; height:64px;
    display:flex; align-items:center; justify-content:space-between;
    position:sticky; top:0; z-index:20;
    box-shadow:0 10px 30px rgba(15,23,42,.06);
    backdrop-filter: blur(14px);
  }
  .sa-topbar-left { display:flex; align-items:center; gap:14px; }
  .sa-page-title { font-family:"Manrope",sans-serif; font-size:17px; font-weight:800; color:var(--sa-text); }
  .sa-page-sub { font-size:11px; color:var(--sa-muted); }
  .sa-topbar-right { display:flex; align-items:center; gap:10px; }
  .sa-search-wrap { position:relative; }
  .sa-topbar-search {
    background:rgba(255,255,255,.82); border:1px solid var(--sa-bdr2);
    border-radius:8px; padding:7px 12px 7px 32px;
    font-size:12px; color:var(--sa-text);
    font-family:"Space Grotesk",sans-serif; width:220px;
  }
  .sa-topbar-search:focus { outline:none; border-color:rgba(200,255,0,.45); box-shadow:0 0 0 3px rgba(200,255,0,.12); }
  .sa-tb-icon {
    width:36px; height:36px; background:rgba(255,255,255,.82);
    border:1px solid var(--sa-bdr2); border-radius:10px;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; font-size:15px; transition:all .15s; color:var(--sa-text);
  }
  .sa-tb-icon:hover { border-color:rgba(200,255,0,.45); background:rgba(200,255,0,.08); }
  .sa-notif-dot {
    width:7px; height:7px; background:var(--sa-a4);
    border-radius:50%; position:absolute; top:6px; right:6px;
    border:1.5px solid #fff;
  }
`;
