"use client";

import React from "react";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h1>
      <p className="text-gray-600 mb-10 text-center max-w-lg">
        Have questions? Reach out to us, and we’ll be happy to assist you.
      </p>

      {/* Contact Form & Details Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Contact Form */}
        <motion.form
          className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Send a Message
          </h2>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Message</label>
            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-5 rounded-full font-medium transition hover:bg-blue-700"
          >
            Send Message
          </button>
        </motion.form>

        {/* Clinic Information */}
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Clinic Details
          </h2>
          <p className="text-gray-600 mb-2">
            📍 <strong>Location:</strong> 123 Pet Street, Vet City, VC 56789
          </p>
          <p className="text-gray-600 mb-2">
            📞 <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className="text-gray-600 mb-4">
            📧 <strong>Email:</strong> contact@bioveti.com
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Opening Hours
          </h3>
          <p className="text-gray-600">🕒 Mon - Fri: 8:00 AM - 6:00 PM</p>
          <p className="text-gray-600">🕒 Sat - Sun: 9:00 AM - 4:00 PM</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
