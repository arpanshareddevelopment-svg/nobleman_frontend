"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-bg min-h-screen flex flex-col">
      {/* Navbar with customized name to match user's profile info */}
      <Navbar userName="Arpan Bose" />

      {/* Main content wrapper */}
      <main className="flex-1 pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
