"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedText = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLSpanElement[]>([]); // Remove 'null' from the type

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: 50 },
      {
        y: 0,
        stagger: 0.02, // Delay between each letter
        ease: "back.out",
        duration: 1,
      }
    );
  }, []);

  return (
    <h1 className="text-2xl uppercase overflow-hidden">
      {text.split("").map((letter, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) textRef.current[index] = el; // ✅ Assign only if el exists
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedText;
