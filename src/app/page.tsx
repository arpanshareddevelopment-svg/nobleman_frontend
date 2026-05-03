"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Avatar from "../components/Avatar";
import Hero from "../components/Hero";
import MissionStatement from "../components/MissionStatement";
import InstructorCarousel from "../components/InstructorCarousel";
import ProgramsShowcase from "../components/ProgramsShowcase";
import CertificationsShowcase from "../components/CertificationsShowcase";
import PlacementStats from "../components/PlacementStats";
import WhySkillsXindia from "../components/WhySkillsXindia";
import Testimonials from "../components/Testimonials";
import ValuesSection from "../components/ValuesSection";
import Footer from "../components/Footer";

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        const delta = y - lastY.current;
        if (y > 10) {
          setHasScrolled(true);
        }
        if (delta > 8 && y > 80) {
          setCollapsed(true);
        } else if (delta < -8 || y < 60) {
          setCollapsed(false);
        }
        lastY.current = y;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll as EventListener);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="page-bg min-h-screen">
      <Navbar />
      <Avatar hidden={false} />

      <main>
        <Hero />
        <MissionStatement />
        <ValuesSection />
        <InstructorCarousel />

        <ProgramsShowcase />
        <CertificationsShowcase />

        <PlacementStats />
        <WhySkillsXindia />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
