"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Lock,
  Upload,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Gift,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TabId = "personal" | "work" | "education" | "portfolio" | "security";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("personal");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Arpan Bose",
    email: "arpanbose199520@gmail.com",
    phone: "",
    company: "",
    linkedin: "",
    gender: "",
    userDescription: "",
    roleDescription: "",
    resume: null as File | null,
  });

  const [resumeName, setResumeName] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPersonalInfo((prev) => ({ ...prev, resume: file }));
      setResumeName(file.name);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Changes saved successfully!");
  };

  const handleCancel = () => {
    setPersonalInfo({
      fullName: "Arpan Bose",
      email: "arpanbose199520@gmail.com",
      phone: "",
      company: "",
      linkedin: "",
      gender: "",
      userDescription: "",
      roleDescription: "",
      resume: null,
    });
    setResumeName(null);
    showToast("Changes discarded.");
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "work", label: "Work Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "portfolio", label: "Portfolio", icon: FolderGit2 },
    { id: "security", label: "Security", icon: Lock },
  ];

  return (
    <div className="relative min-h-[70vh]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-xl border border-[#c8ff00] bg-black text-[#c8ff00]"
          >
            <Check size={16} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
        <h1 className="text-3xl font-black tracking-tight text-white">
          User Profile
        </h1>

        {/* Dropdown Menu for Dashboard/Referral */}
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
                {/* Backdrop closer */}
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
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Left Sidebar Menu */}
        <div className="md:col-span-3">
          <div className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-[#090a0f] p-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-white/[0.07] text-[#c8ff00] border border-[#c8ff00]/20"
                      : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Form Area */}
        <div className="md:col-span-9">
          <div className="rounded-2xl border border-white/8 bg-[#0b0c11] p-6 md:p-8">
            {activeTab === "personal" && (
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Personal Information</h2>
                  <p className="text-sm text-white/50 mt-1">
                    Basic details to help us get to know you better
                  </p>
                </div>

                {/* Profile Pic placeholder */}
                <div className="flex items-center gap-4 py-2">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.04] text-2xl font-bold text-white/80 border border-white/10">
                    {personalInfo.fullName.charAt(0) || "A"}
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-[#c8ff00] border-2 border-black" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Avatar</h3>
                    <p className="text-xs text-white/40 mt-0.5">Click to update image</p>
                  </div>
                </div>

                {/* Fields Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={personalInfo.fullName}
                      onChange={handleInputChange}
                      required
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#c8ff00]/40 focus:bg-white/[0.04]"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={personalInfo.email}
                      onChange={handleInputChange}
                      required
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#c8ff00]/40 focus:bg-white/[0.04]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={personalInfo.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#c8ff00]/40 focus:bg-white/[0.04]"
                    />
                  </div>

                  {/* Company */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wide">
                      Company/Institute
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={personalInfo.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company or institute"
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#c8ff00]/40 focus:bg-white/[0.04]"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wide">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={personalInfo.linkedin}
                      onChange={handleInputChange}
                      placeholder="Enter your LinkedIn profile URL"
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#c8ff00]/40 focus:bg-white/[0.04]"
                    />
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wide">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={personalInfo.gender}
                      onChange={handleInputChange}
                      className="rounded-xl border border-white/10 bg-[#090a0f] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#c8ff00]/40"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* User Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wide">
                      What best describes you?
                    </label>
                    <select
                      name="userDescription"
                      value={personalInfo.userDescription}
                      onChange={handleInputChange}
                      className="rounded-xl border border-white/10 bg-[#090a0f] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#c8ff00]/40"
                    >
                      <option value="">Select what best describes you</option>
                      <option value="student">Student</option>
                      <option value="professional">Working Professional</option>
                      <option value="founder">Founder / Builder</option>
                    </select>
                  </div>

                  {/* Role Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wide">
                      What best describes your role?
                    </label>
                    <select
                      name="roleDescription"
                      value={personalInfo.roleDescription}
                      onChange={handleInputChange}
                      className="rounded-xl border border-white/10 bg-[#090a0f] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#c8ff00]/40"
                    >
                      <option value="">Please select what describes you first</option>
                      <option value="engineering">Software Engineer</option>
                      <option value="product">Product Manager</option>
                      <option value="data">Data Analyst / Scientist</option>
                      <option value="design">UI/UX Designer</option>
                    </select>
                  </div>
                </div>

                {/* Resume Upload Dropzone */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wide">
                    Upload Resume (PDF, max 10MB)
                  </label>
                  <label className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/[0.01] py-8 px-4 text-center cursor-pointer transition-all hover:bg-white/[0.03] hover:border-[#c8ff00]/30">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="text-white/40 mb-3" size={28} />
                    <span className="text-sm font-semibold text-white/80">
                      {resumeName ? resumeName : "Click to upload resume"}
                    </span>
                    <span className="text-xs text-white/40 mt-1">
                      or drag & drop file here
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-xl border border-white/10 bg-transparent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/[0.05]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-white px-6 py-3 text-sm font-black text-black transition-all hover:bg-white/90"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}

            {/* Other tabs content stub */}
            {activeTab !== "personal" && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-bold text-white capitalize">
                  {activeTab.replace("-", " ")} Settings
                </h3>
                <p className="text-sm text-white/50 mt-2 max-w-sm">
                  This section is currently in draft mode. Adjust your profile and resume details in the Personal Info tab.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
