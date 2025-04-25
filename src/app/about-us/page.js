// apps/empress-app/src/app/about-us/page.js
import React from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/layout/footer";
import {
  AboutHero,
  OurPhilosophy,
  OurStory,
  OurArtisans,
  OurValues,
  CtaSection,
} from "./index";

export const metadata = {
  title: "About Empress | Luxury Handcrafted Bracelets",
  description:
    "Discover the story, philosophy, and artisans behind Empress's elegant handcrafted jewelry collections.",
};

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <OurPhilosophy />
      <OurStory />
      <OurArtisans />
      <OurValues />
      <CtaSection />
      <Footer />
    </main>
  );
}
