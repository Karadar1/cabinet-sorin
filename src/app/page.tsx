"use client";

import Image from "next/image";
import HomePage from "../pages/HomePage";
import { useRef } from "react";
import PricingPage from "@/pages/Pricing";
import TeamPage from "@/pages/TeamPage";
import ContactPage from "@/pages/Contact";
import MobileNavbar from "@/components/Navbar/MobileNavbar";
import Gallery from "@/pages/ImageGallery";

export default function Home() {
  const triggerRef = useRef<HTMLDivElement>(null!);

  return (
    <>
      <MobileNavbar />
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
        id="features"
        className="min-h-screen bg-green-200 flex items-center justify-center"
      >
        <TeamPage />
      </div>
      <div
        id="docs"
        className="min-h-screen bg-yellow-200 flex items-center justify-center"
      >
        <ContactPage />
      </div>
      <div
        id="blog"
        className="min-h-screen bg-purple-200 flex items-center justify-center"
      >
        <Gallery />
      </div>
    </>
  );
}
