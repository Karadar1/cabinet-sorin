"use client"

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const SlideTabsExample: React.FC = () => {
  return (
    <div className="bg-neutral-100 py-20">
      <SlideTabs />
    </div>
  );
};

type PositionState = {
  left: number;
  width: number;
  opacity: number;
};

const SlideTabs: React.FC = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const navRef = useRef<HTMLUListElement>(null); // Specify the type for navRef
  const menuIconRef = useRef<HTMLDivElement>(null); // Specify the type for menuIconRef

  const [position, setPosition] = useState<PositionState>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Create the timeline outside of useGSAP to ensure it persists
  const navTimeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Initialize the timeline
    navTimeline.current = gsap.timeline({ paused: true })
      .to(".tabRef", { y: 50, opacity: 0 })
      .to(navRef.current, { width: 60, height: 60, duration: 0.3 })
      .to(".tabRef", { visibility: "hidden", duration: 0 })
      .to(menuIconRef.current, { opacity: 1, scale: 1, z: 100, duration: 0.3 }, "-=0.2")
      .to(navRef.current, {
        x:700, // Calculate 80% of navRef's width
        rotate: 360,
        duration: 0.5,
      });
  }, []); // Empty dependency array to ensure the timeline is created only once

  useGSAP(() => {
    // Control the timeline based on the `isShrunk` state
    if (isShrunk) {
      navTimeline.current?.play(); // Play the timeline forward
    } else {
      navTimeline.current?.reverse(); // Reverse the timeline
    }
  }, [isShrunk]); // Re-run the animation when `isShrunk` changes

  return (
    <>
      <ul
        ref={navRef}
        onMouseLeave={() => {
          setPosition((prev) => ({
            ...prev,
            opacity: 0,
          }));
        }}
        className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
      >
        <Tab setPosition={setPosition} targetId="home">Home</Tab>
        <Tab setPosition={setPosition} targetId="pricing">Pricing</Tab>
        <Tab setPosition={setPosition} targetId="features">Features</Tab>
        <Tab setPosition={setPosition} targetId="docs">Docs</Tab>
        <Tab setPosition={setPosition} targetId="blog">Blog</Tab>

        <Cursor position={position} />

        {/* Menu Icon */}
        <div
          ref={menuIconRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <span className="text-2xl text-black">☰</span>
        </div>
      </ul>
      <button
        onClick={() => {
          setIsShrunk((prev) => !prev); // Toggle the `isShrunk` state
        }}
        className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:cursor-auto"
      >
        Toggle Shrink
      </button>
    </>
  );
};

type TabProps = {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<PositionState>>;
  targetId: string;
};

const Tab: React.FC<TabProps> = ({ children, setPosition, targetId }) => {
  const tabRef = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <li
      ref={tabRef}
      onMouseEnter={() => {
        if (!tabRef.current) return;

        const { width } = tabRef.current.getBoundingClientRect();

        setPosition({
          left: tabRef.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={handleClick}
      className="tabRef relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

type CursorProps = {
  position: PositionState;
};

const Cursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};