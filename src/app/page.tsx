"use client";

import HomePage from "../pages/HomePage";
import { useRef } from "react";
import PricingPage from "@/pages/Pricing";
import TeamPage from "@/pages/TeamPage";
import ContactPage from "@/pages/Contact";
import MobileNavbar from "@/components/Navbar/MobileNavbar";
import Gallery from "@/pages/ImageGallery";
import DesktopNavbar from "@/components/Navbar/DesktopNavbar";

export default function Home() {
  const triggerRef = useRef<HTMLDivElement>(null!);

  return (
    <>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>
      <div
        id="home"
        ref={triggerRef}
        className="min-h-screen flex items-center pt-16 justify-center"
      >
        <HomePage />
      </div>
      <div id="pricing" className="min-h-screen pt-16 ">
        <PricingPage />
      </div>
      <div
        id="team"
        className="min-h-screen pt-16 flex items-center justify-center"
      >
        <TeamPage />
      </div>
      <div
        id="contact"
        className="min-h-screen pt-16 flex items-center justify-center"
      >
        <ContactPage />
      </div>
      <div
        id="gallery"
        className="min-h-screen pt-16  flex items-center justify-center"
      >
        <Gallery />
      </div>
    </>
  );
}
