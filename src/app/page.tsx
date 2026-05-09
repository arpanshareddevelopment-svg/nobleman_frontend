"use client";
import Navbar from "../components/Navbar";
import Hero from "../components/client/Hero";
import MissionStatement from "../components/client/MissionStatement";
import InstructorCarousel from "../components/client/InstructorCarousel";
import ProgramsShowcase from "../components/client/ProgramsShowcase";
import CertificationsShowcase from "../components/client/CertificationsShowcase";
import PlacementStats from "../components/client/PlacementStats";
import WhyNobleMaLearning from "../components/client/WhyNobleManLearning";
import Testimonials from "../components/client/Testimonials";
import ValuesSection from "../components/client/ValuesSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div id="home" className="page-bg min-h-screen">
      <Navbar />

      <main>
        <Hero />
        <MissionStatement />
        <ValuesSection />
        <InstructorCarousel />

        <ProgramsShowcase />
        <CertificationsShowcase />

        <PlacementStats />
        <WhyNobleMaLearning />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
