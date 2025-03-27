"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logoImg from "../../../public/icons/417569897_903363158461019_3369518622687413448_n.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Home", "Pricing", "Features", "Docs", "Blog"];

const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between min-h-16">
        <Image src={logoImg} alt="Logo" width={36} height={36} />
        <button
          onClick={toggleMenu}
          className="relative w-8 h-8 flex items-center justify-center focus:outline-none"
        >
          <motion.span
            initial={false}
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 0 : -6,
            }}
            className="absolute w-6 h-0.5 bg-black"
          />
          <motion.span
            initial={false}
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="absolute w-6 h-0.5 bg-black"
          />
          <motion.span
            initial={false}
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? 0 : 6,
            }}
            className="absolute w-6 h-0.5 bg-black"
          />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-white p-6 flex flex-col"
          >
            <ul className="mt-16 space-y-6 text-lg uppercase font-medium text-black">
              {navLinks.map((link, i) => (
                <li
                  key={i}
                  onClick={() => handleNavClick(link)}
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                >
                  {link}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
