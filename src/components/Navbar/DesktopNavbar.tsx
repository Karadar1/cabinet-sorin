"use client";

import React, { useState } from "react";
import Image from "next/image";
import logoImg from "../../../public/LOGO CLINICA VETERINARA (1).png";
import { motion } from "framer-motion";

const navLinks = ["Home", "Pricing", "Team", "Contact", "Gallery"];

const DesktopNavbar: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with medical cross animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <Image
            src={logoImg}
            alt="Medical Logo"
            width={100}
            height={80}
            className="object-contain"
          />
        </motion.div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li
              key={link}
              onMouseEnter={() => setHoveredItem(link)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavClick(link)}
              className="relative px-2 py-1 cursor-pointer text-gray-700 hover:text-blue-800 transition-colors"
            >
              {link}

              {/* Animated underline - medical syringe style */}
              {hoveredItem === link && (
                <motion.div
                  layoutId="navUnderline"
                  initial={false}
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}

              {/* Pulse animation for important items */}
              {(link === "Doctors" || link === "Services") && (
                <motion.span
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-1 -right-2 w-2 h-2 bg-blue-400 rounded-full"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
