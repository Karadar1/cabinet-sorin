"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimalCard from "@/components/AnimalCards/AnimalCards";
import dogImage from "../../public/dog.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const animalData = {
  Dogs: {
    name: "Dogs",
    services: [
      { name: "Basic Checkup", price: "$49" },
      { name: "Vaccination", price: "$89" },
      { name: "Full Wellness", price: "$149" },
      { name: "Basic Checkup", price: "$49" },
      { name: "Vaccination", price: "$89" },
      { name: "Full Wellness", price: "$149" },
      { name: "Basic Checkup", price: "$49" },
      { name: "Vaccination", price: "$89" },
      { name: "Full Wellness", price: "$149" },
      { name: "Basic Checkup", price: "$49" },
      { name: "Vaccination", price: "$89" },
      { name: "Full Wellness", price: "$149" },
      { name: "Basic Checkup", price: "$49" },
      { name: "Vaccination", price: "$89" },
      { name: "Full Wellness", price: "$149" },
      { name: "Basic Checkup", price: "$49" },
      { name: "Vaccination", price: "$89" },
      { name: "Full Wellness", price: "$149" },
      { name: "Basic Checkup", price: "$49" },
      { name: "Vaccination", price: "$89" },
      { name: "Full Wellness", price: "$149" },
      { name: "Basic Checkup", price: "$49" },
      { name: "Vaccination", price: "$89" },
      { name: "Full Wellness", price: "$149" },
      { name: "Basic Checkup", price: "$49" },
      { name: "Vaccination", price: "$89" },
      { name: "Full Wellness", price: "$149" },
      { name: "Basic Checkup", price: "$49" },
      { name: "Vaccination", price: "$89" },
      { name: "Full Wellness", price: "$149" },
    ],
  },
  Cats: {
    name: "Cats",
    services: [
      { name: "Health Check", price: "$45" },
      { name: "Vaccination", price: "$80" },
      { name: "Senior Care", price: "$120" },
    ],
  },
  Bunnies: {
    name: "Bunnies",
    services: [
      { name: "Routine Exam", price: "$39" },
      { name: "Nail Trim", price: "$25" },
      { name: "Full Care", price: "$99" },
    ],
  },
};

const PricingPage = () => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<
    null | keyof typeof animalData
  >(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".animal-card");

      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardContainerRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: cardContainerRef }
  );

  const activeData = selectedAnimal ? animalData[selectedAnimal] : null;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen  px-6 py-12 overflow-hidden">
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Pricing Plans
      </motion.h1>
      <p className="text-gray-600 mb-10 text-center max-w-lg">
        Choose the best plan for your furry friend’s health. No hidden fees,
        just care.
      </p>

      {/* Animal Cards */}
      <div
        ref={cardContainerRef}
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-12 w-fit mx-auto"
      >
        {Object.keys(animalData).map((animal) => (
          <AnimalCard
            key={animal}
            title={animal}
            image={dogImage}
            onClick={() => setSelectedAnimal(animal as keyof typeof animalData)}
          />
        ))}
      </div>

      {/* Sliding Panel */}
      {activeData && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 80 }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-6 border-t rounded-t-xl z-50 max-h-[70vh] flex flex-col"
        >
          <div className="flex justify-between items-center mb-4 shrink-0">
            <h2 className="text-xl font-semibold">
              {activeData.name} Services
            </h2>
            <button
              onClick={() => setSelectedAnimal(null)}
              className="text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
          </div>

          <div
            className="overflow-y-auto pr-1 flex justify-center "
            style={{ maxHeight: "100%" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-20">
              {activeData.services.map((service, index) => (
                <div key={index} className="flex text-gray-700">
                  <span>{service.name}</span>
                  <span className="pl-5 font-bold">{service.price}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PricingPage;
