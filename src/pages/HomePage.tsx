"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import backgroundImage from "../../public/pexels-lum3n-44775-406014.png";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import MedicalButton from "@/components/BorderButton/BorderButton";
import AboutUsButton from "@/components/AboutButton/AboutButton";

// Register GSAP TextPlugin
gsap.registerPlugin(TextPlugin);

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const HomePage = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!imageRef.current || !textRef.current || !buttonRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      imageRef.current,
      {
        scale: 1.1,
        opacity: 0.8,
      },
      {
        scale: 1,
        opacity: 0.5,
        duration: 2,
        y: 75,
        ease: "power2.out",
      }
    )
      .to(
        textRef.current,
        {
          duration: 2,
          text: "Revolutionizing pet care with cutting-edge technology and innovation.",
          ease: "power2.out",
        },
        "<"
      )
      .from(buttonRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col w-screen h-screen items-center justify-start py-20 px-10 text-center overflow-hidden ${poppins.className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image
          ref={imageRef}
          src={backgroundImage}
          alt="Background"
          fill
          sizes="100vw"
          priority
          className="object-cover brightness-75"
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* Hero Section */}
      <div className="max-w-2xl z-10">
        <AnimatedText text="Bioveti" />
        <p
          ref={textRef}
          className="mt-6 text-lg md:text-xl leading-relaxed opacity-80 w-[480px]"
        ></p>
      </div>

      {/* Buttons */}
      <div ref={buttonRef} className="flex flex-row gap-4 justify-between">
        <AboutUsButton />
        <MedicalButton text="Contact" />
      </div>
    </div>
  );
};

export default HomePage;
