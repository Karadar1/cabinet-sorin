"use client";

import { useState } from "react";

export default function MedicalButton({ text }: { text: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[200px] ">
      <button
        className="relative px-6 py-3 bg-teal-50 text-teal-700 hover:cursor-pointer rounded-lg font-medium shadow-sm transition-all hover:shadow-md hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
        {/* Pulsating circle - absolute positioned in top right */}
        <span
          className={`absolute -top-1 -right-1 flex h-3 w-3 ${
            isHovered ? "opacity-100" : "opacity-75"
          }`}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
        </span>
      </button>
    </div>
  );
}
