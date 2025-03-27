"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Team members data
const teamMembers = [
  {
    name: "Dr. Emily Carter",
    role: "Veterinary Surgeon",
    image: "/team/emily-carter.jpg",
  },
  {
    name: "Dr. James Reynolds",
    role: "Animal Nutritionist",
    image: "/team/james-reynolds.jpg",
  },
  {
    name: "Dr. Sarah Mitchell",
    role: "Veterinary Dermatologist",
    image: "/team/sarah-mitchell.jpg",
  },
  {
    name: "Dr. Robert Hayes",
    role: "Emergency Veterinarian",
    image: "/team/robert-hayes.jpg",
  },
  {
    name: "Dr. Olivia Bennett",
    role: "Exotic Animal Specialist",
    image: "/team/olivia-bennett.jpg",
  },
  {
    name: "Dr. William Scott",
    role: "Surgical Specialist",
    image: "/team/william-scott.jpg",
  },
];

const TeamPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-6 py-12">
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Meet Our Team
      </motion.h1>
      <p className="text-gray-600 mb-10 text-center max-w-lg">
        A passionate team dedicated to providing the best care for your pets.
      </p>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {member.name}
            </h2>
            <p className="text-blue-600 text-sm font-medium">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
