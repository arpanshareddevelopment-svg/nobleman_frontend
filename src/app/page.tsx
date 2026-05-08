"use client";
import Navbar from "../components/Navbar";
import Avatar from "../components/Avatar";
import Hero from "../components/Hero";
import MissionStatement from "../components/MissionStatement";
import InstructorCarousel from "../components/InstructorCarousel";
import ProgramsShowcase from "../components/ProgramsShowcase";
import CertificationsShowcase from "../components/CertificationsShowcase";
import PlacementStats from "../components/PlacementStats";
import WhyNobleMaLearning from "../components/WhyNobleManLearning";
import Testimonials from "../components/Testimonials";
import ValuesSection from "../components/ValuesSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div id="home" className="page-bg min-h-screen">
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
        <WhyNobleMaLearning />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
