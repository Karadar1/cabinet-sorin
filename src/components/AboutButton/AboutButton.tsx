"use client";

import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import gsap from "gsap";

export default function AboutUsButton() {
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Set initial state - icon hidden and positioned below
    gsap.set(iconRef.current, {
      opacity: 0,
      y: 15,
      display: "none",
    });
  }, []);

  useEffect(() => {
    if (isHovered) {
      // Create a timeline for coordinated animations
      const tl = gsap.timeline();

      // Expand the button first
      tl.to(buttonRef.current, {
        width: "+=20",
        duration: 0.35,
        ease: "power2.out",
      });

      // Then show and animate icon from bottom
      tl.to(
        iconRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
          display: "block",
        },
        "-=0.2"
      ); // Start slightly before the button expansion finishes

      // Subtle pulse animation on text
      tl.to(
        textRef.current,
        {
          scale: 1.03,
          duration: 0.2,
          ease: "power1.out",
        },
        "-=0.3"
      );

      tl.to(textRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power1.in",
      });
    } else {
      // Create a timeline for coordinated exit animations
      const tl = gsap.timeline();

      // Hide icon when not hovered - fade down
      tl.to(iconRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(iconRef.current, { display: "none" });
        },
      });

      // Contract the button back
      tl.to(
        buttonRef.current,
        {
          width: "-=20",
          duration: 0.35,
          ease: "power2.inOut",
        },
        "-=0.15"
      ); // Start slightly before icon animation finishes
    }
  }, [isHovered]);

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <button
        ref={buttonRef}
        className="relative px-6 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium shadow-sm transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 min-w-[120px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-center w-full gap-2 overflow-hidden">
          <span ref={iconRef} className="inline-flex flex-shrink-0">
            <Info className="w-4 h-4" />
          </span>
          <span ref={textRef} className="whitespace-nowrap">
            About
          </span>
        </div>
      </button>
    </div>
  );
}
