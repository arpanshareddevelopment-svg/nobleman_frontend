"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  Check,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  Gift,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReferralPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const referralLink = "https://theproductspace.in/ref/RD3KQMQM";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hey! Check out the live cohort programs at NobleMan Learning. Use my referral link to get ₹2,000 off upon enrollment, and I'll get ₹2,000 reward too! ${referralLink}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const stats = [
    {
      value: "₹2,000",
      label: "You earn per referral",
      color: "#00c4ff",
      glow: "rgba(0, 196, 255, 0.15)",
    },
    {
      value: "₹2,000",
      label: "They save on enrollment",
      color: "#c8ff00",
      glow: "rgba(200, 255, 0, 0.15)",
    },
    {
      value: "∞",
      label: "No limit on referrals",
      color: "#ffe600",
      glow: "rgba(255, 230, 0, 0.15)",
    },
  ];

  return (
    <div className="relative min-h-[70vh]">
      {/* Toast popup */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-xl border border-[#c8ff00] bg-black text-[#c8ff00]"
          >
            <Check size={16} />
            <span>Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
        <h1 className="text-3xl font-black tracking-tight text-white">
          Referrals
        </h1>

        {/* Navigation Dropdown Options */}
        <div className="relative">
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
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0d0d14] p-1.5 shadow-2xl z-50"
                >
                  <button
                    onClick={() => {
                      router.push("/profile/dashboard");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-white/70 hover:bg-white/[0.06] hover:text-white"
                  >
                    <LayoutDashboard size={14} />
                    <span>User Dashboard</span>
                  </button>
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
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Referral Info Area */}
      <div className="mx-auto max-w-3xl text-center py-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00c4ff]">
            <span className="h-[1.5px] w-5 bg-[#00c4ff]" />
            Sharing is Caring
            <span className="h-[1.5px] w-5 bg-[#00c4ff]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black leading-tight text-white">
            Refer Friends & Earn
            <span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00c4ff] via-[#c8ff00] to-[#ffe600] mt-2 pb-1"
            >
              ₹2,000 On Each Referral
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-white/60 leading-relaxed pt-2">
            Invite your friends to join our programs. They get ₹2,000 off upon
            enrollment while you earn a ₹2,000 cash reward on each referral.
          </p>
        </motion.div>

        {/* Link Box & Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 rounded-2xl border border-white/10 bg-[#0c0d14] p-6 sm:p-8"
        >
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3.5 text-left sm:text-center">
            Your Referral Link
          </h3>

          <div className="flex flex-col gap-4">
            {/* Input field */}
            <div className="relative flex items-center">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-4 pr-12 text-sm text-white/90 outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="absolute right-3 p-2 text-white/40 hover:text-white transition-colors"
                title="Copy Link"
              >
                {copied ? <Check size={16} className="text-[#c8ff00]" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-3.5 text-sm font-bold text-white transition-all hover:bg-white/[0.07]"
              >
                <Copy size={16} />
                <span>Copy Link</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25d366] py-3.5 text-sm font-black text-black transition-all hover:bg-[#20ba5a]"
              >
                <Share2 size={16} />
                <span>Share on WhatsApp</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Stat Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="rounded-2xl border border-white/5 bg-[#090a0f] p-6 text-center"
            >
              <span
                className="block text-3xl font-black mb-2"
                style={{ color: stat.color, textShadow: `0 0 15px ${stat.glow}` }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-bold text-white/50">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
