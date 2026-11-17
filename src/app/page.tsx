"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Section imports
import HeroSection from "@/components/sections/HeroSection";
import WhoWeAre from "@/components/sections/WhoWeAre";
import OurExpertise from "@/components/sections/OurExpertise";
import OurProcess from "@/components/sections/OurProcess";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import BeforeAfter from "@/components/sections/BeforeAfter";
import InteriorsGallery from "@/components/sections/InteriorsGallery";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamSection from "@/components/sections/TeamSection";
import VideoShowcase from "@/components/sections/VideoShowcase";
import AwardsClients from "@/components/sections/AwardsClients";
import Statistics from "@/components/sections/Statistics";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="relative bg-background text-text overflow-hidden">
        <HeroSection />
        <WhoWeAre />
        <OurExpertise />
        <OurProcess />
        <FeaturedProjects />
        <BeforeAfter />
        <InteriorsGallery />
        <ServicesSection />
        <TeamSection />
        <VideoShowcase />
        <AwardsClients />
        <Statistics />
        <FAQ />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
