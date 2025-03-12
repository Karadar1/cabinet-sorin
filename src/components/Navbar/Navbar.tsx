"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import logoImg from "../../../public/icons/417569897_903363158461019_3369518622687413448_n.png";
import { log } from "console";
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const SlideTabsExample: React.FC = () => {
  return <SlideTabs />;
};

type PositionState = {
  left: number;
  width: number;
  opacity: number;
};

const SlideTabs: React.FC = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const navRef = useRef<HTMLUListElement>(null);
  const menuIconRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLLIElement>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);

  const [position, setPosition] = useState<PositionState>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Create the timeline outside of useGSAP to ensure it persists
  const navTimeline = useRef<gsap.core.Timeline | null>(null);
  const sidebarTimeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Initialize the navbar timeline
    navTimeline.current = gsap
      .timeline({
        paused: true,
        onStart: () => {
          setCursorVisible(false);
        },
        onReverseComplete: () => {
          setCursorVisible(true);
        },
      })
      .to(".tabRef", { y: 50, opacity: 0, duration: 0.5 })
      .to(navRef.current, { width: 60, height: 60, duration: 0.3 })
      .to(".tabRef", { visibility: "hidden", duration: 0 })
      .to(
        menuIconRef.current,
        { opacity: 1, scale: 1, z: 100, duration: 0.3 },
        "-=0.2"
      )
      .to(navRef.current, {
        x: 700,
        rotate: 360,
        duration: 0.5,
      });

    // Initialize the sidebar timeline
    sidebarTimeline.current = gsap
      .timeline({ paused: true })
      .fromTo(
        sidebarRef.current,
        { x: "-100%" },
        { x: 0, duration: 0.5, ease: "power2.out" }
      )
      .from(".SideLink", { xPercent: -100, opacity: 0, stagger: 0.1 });

    // Set up ScrollTrigger for the navbar
    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top bottom",
      onEnter: () => {
        setIsShrunk(true);
      },
      onLeaveBack: () => {
        setIsShrunk(false);
        setIsSidebarOpen(false);
      },
    });
  }, []);

  useGSAP(() => {
    if (isShrunk) {
      navTimeline.current?.play();
    } else {
      navTimeline.current?.reverse();
    }
  }, [isShrunk]);

  useGSAP(() => {
    if (isSidebarOpen) {
      sidebarTimeline.current?.play();
    } else {
      sidebarTimeline.current?.reverse();
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isShrunk) {
      setCursorVisible(false);
    }
  }, [isShrunk]);

  useGSAP(() => {
    gsap.set(linksRef.current, { scale: 1, opacity: 1 });

    linksRef.current.forEach((link) => {
      if (link) {
        gsap.to(link, {
          scale: 1.1,
          opacity: 0.8,
          duration: 0.2,
          ease: "power2.out",
          paused: true,
        });

        link.addEventListener("mouseenter", () =>
          gsap.to(link, { scale: 1.1, opacity: 1, duration: 0.2 })
        );
        link.addEventListener("mouseleave", () =>
          gsap.to(link, { scale: 1, opacity: 0.8, duration: 0.2 })
        );
      }
    });

    return () => {
      linksRef.current.forEach((link) => {
        if (link) {
          link.removeEventListener("mouseenter", () => {});
          link.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  return (
    <>
      {/* Sticky Wrapper with top margin - added pt-8 class */}
      <div className="sticky top-0 z-50 pt-8 bg-transparent">
        <ul
          ref={navRef}
          onMouseLeave={() => {
            setPosition((prev) => ({
              ...prev,
              opacity: 0,
            }));
          }}
          className="mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
        >
          <Tab
            setPosition={setPosition}
            targetId="home"
            isShrunk={isShrunk}
            cursorVisible={cursorVisible}
          >
            Home
          </Tab>
          <Tab
            setPosition={setPosition}
            targetId="pricing"
            isShrunk={isShrunk}
            cursorVisible={cursorVisible}
          >
            Pricing
          </Tab>
          <Tab
            setPosition={setPosition}
            targetId="features"
            isShrunk={isShrunk}
            cursorVisible={cursorVisible}
          >
            Features
          </Tab>
          <Tab
            setPosition={setPosition}
            targetId="docs"
            isShrunk={isShrunk}
            cursorVisible={cursorVisible}
          >
            Docs
          </Tab>
          <Tab
            setPosition={setPosition}
            targetId="blog"
            isShrunk={isShrunk}
            cursorVisible={cursorVisible}
          >
            Blog
          </Tab>

          {/* Cursor Component */}
          {cursorVisible && <Cursor position={position} ref={cursorRef} />}

          {/* Hamburger Menu Icon */}
          <div
            ref={menuIconRef}
            className="absolute inset-0 flex items-center justify-center opacity-0 cursor-pointer"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <span className="text-2xl text-black">☰</span>
          </div>
        </ul>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform -translate-x-full"
      >
        <div className="p-4 flex flex-col items-center justify-top h-full">
          <Image src={logoImg} width={180} height={180} alt="Logo" />
          <ul className="w-full mt-4 self-start">
            {["Home", "Pricing", "Features", "Docs", "Blog"].map(
              (text, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    linksRef.current[index] = el; // Assign but don't return anything
                  }}
                  className="SideLink mb-2 text-left text-2xl uppercase px-4 opacity-80 cursor-pointer"
                >
                  {text}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Trigger div */}
      <div ref={triggerRef} className=" bg-blue-100"></div>
    </>
  );
};

type TabProps = {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<PositionState>>;
  targetId: string;
  isShrunk: boolean;
  cursorVisible: boolean;
};

const Tab: React.FC<TabProps> = ({
  children,
  setPosition,
  targetId,
  isShrunk,
  cursorVisible,
}) => {
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
        if (!tabRef.current || isShrunk || !cursorVisible) return;

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
  ref: React.Ref<HTMLLIElement>;
};

const Cursor: React.FC<CursorProps> = React.forwardRef<
  HTMLLIElement,
  Omit<CursorProps, "ref">
>((props, ref) => {
  return (
    <motion.li
      ref={ref}
      animate={{
        ...props.position,
      }}
      className="CursorRef absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
});

Cursor.displayName = "Cursor";
