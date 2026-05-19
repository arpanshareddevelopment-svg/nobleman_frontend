"use client";

import { Bell, HelpCircle } from "lucide-react";

interface Props {
  meta: {
    title: string;
    sub: string;
  };
}

export default function Topbar({ meta = { title: "", sub: "" } }: Partial<Props>) {
  return (
    <div
      className="sticky top-0 z-20 flex h-16 items-center justify-between px-6 backdrop-blur-xl"
      style={{
        borderBottom: "1px solid var(--topbar-border)",
        background: "var(--topbar-bg)",
        boxShadow: "var(--topbar-shadow)",
      }}
    >
      {/* Left — page title */}
      <div>
        <h1 className="font-[Manrope] text-[17px] font-extrabold text-[var(--fg-primary)]">
          {meta.title}
        </h1>
        <p className="text-[11px] text-[var(--fg-muted)]">{meta.sub}</p>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search courses, students…"
            className="w-[220px] rounded-lg border py-[7px] pl-4 pr-3 text-xs font-['Space_Grotesk'] text-[var(--fg-primary)] outline-none transition-all placeholder:text-[var(--fg-muted)] focus:border-[rgba(200,255,0,0.45)] focus:ring-4 focus:ring-[rgba(200,255,0,0.12)]"
            style={{
              borderColor: "var(--topbar-control-border)",
              background: "var(--topbar-control-bg)",
            }}
          />
        </div>

        {/* Help */}
        <button
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border text-[var(--fg-primary)] transition-all hover:border-[rgba(200,255,0,0.45)] hover:bg-[rgba(200,255,0,0.08)]"
          style={{
            borderColor: "var(--topbar-control-border)",
            background: "var(--topbar-control-bg)",
          }}
        >
          <HelpCircle size={16} />
        </button>

        {/* Notifications */}
        <button
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border text-[var(--fg-primary)] transition-all hover:border-[rgba(200,255,0,0.45)] hover:bg-[rgba(200,255,0,0.08)]"
          style={{
            borderColor: "var(--topbar-control-border)",
            background: "var(--topbar-control-bg)",
          }}
        >
          <Bell size={16} />
          <span
            className="absolute right-[6px] top-[6px] h-[7px] w-[7px] rounded-full border-[1.5px] bg-red-500"
            style={{ borderColor: "var(--topbar-badge-ring)" }}
          />
        </button>

        {/* Avatar */}
        <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-yellow)] text-[12px] font-extrabold text-[#06110c] shadow-sm">
          SA
        </button>
      </div>
    </div>
  );
}
