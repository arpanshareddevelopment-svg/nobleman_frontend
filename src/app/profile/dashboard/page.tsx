"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Sparkles,
  ExternalLink,
  ChevronDown,
  LogOut,
  User,
  Gift,
} from "lucide-react";
import { motion as m, AnimatePresence } from "framer-motion";

type TabId = "overview" | "events" | "courses" | "certificates";

export default function UserDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "events", label: "My Events" },
    { id: "courses", label: "My Free Courses" },
    { id: "certificates", label: "Certificates" },
  ];

  const recommendedPrograms = [
    {
      badge: "Cohort",
      title: "Generative AI Program",
      description: "Learn to Build AI Products in 10 Weeks, and Lead the Next Wave of Change.",
      color: "#00c4ff",
    },
    {
      badge: "Cohort",
      title: "Product Management Fellowship",
      description: "Learn to build 0 to 1 products using AI and excel in your product career.",
      color: "#c8ff00",
    },
    {
      badge: "Free",
      title: "AI Builders 101",
      description: "Learn Agentic AI and build real AI projects.",
      color: "#ffe600",
    },
  ];

  return (
    <div className="relative min-h-[70vh]">
      {/* Top Banner Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
            Hi Arpan Bose <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Welcome back to Product Space
          </p>
        </div>

        {/* Navigation Dropdown Options */}
        <div className="relative align-self-start sm:align-self-auto">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
          >
            <span>Options</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-250 ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <m.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0d0d14] p-1.5 shadow-2xl z-50"
                >
                  <button
                    onClick={() => {
                      router.push("/profile");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-white/70 hover:bg-white/[0.06] hover:text-white"
                  >
                    <User size={14} />
                    <span>User Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      router.push("/profile/referral");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-white/70 hover:bg-white/[0.06] hover:text-white"
                  >
                    <Gift size={14} />
                    <span>Referral</span>
                  </button>
                  <div className="my-1 border-t border-white/5" />
                  <button
                    onClick={() => {
                      router.push("/");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </m.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="mb-8 flex items-center gap-6 border-b border-white/5 pb-px overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`relative pb-4 text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                isActive ? "text-[#c8ff00]" : "text-white/45 hover:text-white"
              }`}
            >
              {tab.label}
              {isActive && (
                <m.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c8ff00]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left main area */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === "overview" && (
            <>
              {/* Next Upcoming Event */}
              <m.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-2xl border border-white/8 bg-[#0b0c11] p-6 md:p-8 relative"
              >
                {/* Event header info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <span className="inline-flex max-w-max items-center rounded-full bg-[#00c4ff]/10 border border-[#00c4ff]/25 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00c4ff]">
                      Workshop
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white leading-snug">
                      Claude for Product Managers: Live Masterclass
                    </h3>
                    <p className="text-sm text-white/60">
                      Learn How Product Managers Can Leverage Claude Effectively.
                    </p>
                  </div>
                </div>

                {/* Event meta details */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-white/5 pt-5 text-sm text-white/70">
                  <div className="flex items-center gap-2.5">
                    <Calendar size={16} className="text-[#c8ff00]" />
                    <span>7th Jun, 2026 · 02:00 PM IST</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={16} className="text-[#00c4ff]" />
                    <span>Online</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users size={16} className="text-[#ffe600]" />
                    <span>1,500 attendees</span>
                  </div>
                </div>

                {/* Speaker profile */}
                <div className="mt-6 flex flex-col justify-between gap-4 border-t border-white/5 pt-5 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                      AT
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white/40 uppercase tracking-wide">
                        Speaker
                      </span>
                      <span className="text-sm font-bold text-white">
                        Akhil Yash Tiwari · Founder at Product Space
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex max-w-max items-center rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-white/70">
                    Claude for PMs
                  </span>
                </div>

                <div className="mt-6 border-t border-white/5 pt-5 flex justify-end">
                  <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-black transition-all hover:bg-white/90">
                    <span>View Event Details</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </m.div>

              {/* Recently Earned Certificate */}
              <m.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-white/5 bg-[#090a0f] p-6"
              >
                <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
                  Recently Earned Certificate
                </h4>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.02] border border-white/5 text-white/40">
                    <Award size={22} />
                  </div>
                  <p className="text-sm text-white/40">
                    You haven&apos;t earned any certificates yet.
                  </p>
                </div>
              </m.div>
            </>
          )}

          {activeTab === "events" && (
            <div className="rounded-2xl border border-white/5 bg-[#090a0f] py-16 text-center">
              <BookOpen className="mx-auto text-white/30 mb-3" size={32} />
              <h3 className="text-lg font-bold text-white">Registered Events</h3>
              <p className="text-sm text-white/40 mt-1">
                You are registered for 1 upcoming event. Check Overview tab.
              </p>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="rounded-2xl border border-white/5 bg-[#090a0f] py-16 text-center">
              <BookOpen className="mx-auto text-white/30 mb-3" size={32} />
              <h3 className="text-lg font-bold text-white">My Free Resources</h3>
              <p className="text-sm text-white/40 mt-1">
                No active free resource tracks found on your profile yet.
              </p>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="rounded-2xl border border-white/5 bg-[#090a0f] py-16 text-center">
              <Award className="mx-auto text-white/30 mb-3" size={32} />
              <h3 className="text-lg font-bold text-white">My Certificates</h3>
              <p className="text-sm text-white/40 mt-1">
                Your certificates will appear here once program capstones are approved.
              </p>
            </div>
          )}
        </div>

        {/* Right Recommended Programs area */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-white/5 bg-[#090a0f] p-6 space-y-6">
            <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={14} className="text-[#ffe600]" />
              <span>Recommended for You</span>
            </h4>

            <div className="space-y-4">
              {recommendedPrograms.map((program) => (
                <div
                  key={program.title}
                  className="group rounded-xl border border-white/5 bg-[#0d0d14] p-5 transition-all hover:bg-white/[0.02]"
                >
                  <span
                    className="inline-flex rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider mb-3"
                    style={{
                      background: `${program.color}10`,
                      border: `1px solid ${program.color}25`,
                      color: program.color,
                    }}
                  >
                    {program.badge}
                  </span>
                  <h5 className="text-sm font-bold text-white leading-snug group-hover:text-[#c8ff00] transition-colors">
                    {program.title}
                  </h5>
                  <p className="text-xs text-white/50 mt-1.5 leading-relaxed">
                    {program.description}
                  </p>
                  <a
                    href="#programs"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00c4ff] mt-4"
                  >
                    <span>Learn more</span>
                    <ArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
