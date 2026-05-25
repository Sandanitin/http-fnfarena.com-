"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Star, ArrowRight, Phone } from "lucide-react";

export default function EventSpaceHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleContactUs = () => {
    window.location.href = 'tel:+919876543210';
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <img
            src="https://cdn.acsdev.in/FNF/MLK3753.jpg"
            alt="Event space background"
            loading="lazy"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1a1d21]/50 to-[#1a1d21]" />
        </div>

        {/* Event Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/20">
            <defs>
              <pattern id="eventPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="2" fill="currentColor"/>
                <circle cx="20" cy="20" r="1" fill="currentColor"/>
                <circle cx="60" cy="60" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#eventPattern)"/>
          </svg>
        </div>

        {/* Floating Event Icons */}
        <div className="absolute top-1/4 left-1/4 opacity-10">
          <svg width="150" height="150" viewBox="0 0 150 150" className="text-red-500/30">
            <g transform="translate(75,75)">
              <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
              <rect x="-20" y="-20" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="0" cy="0" r="8" fill="currentColor"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-2 border-red-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 left-40 w-16 h-16 bg-red-500/10 transform rotate-45"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-10 w-8 h-8 bg-red-500/20 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Calendar className="w-4 h-4 text-red-500" />
                <span className="text-red-500 text-sm font-semibold">Premium Event Venues</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-sansitaOne leading-tight">
                Perfect Event
                <span className="block text-red-500">Spaces</span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                Host unforgettable events in our premium venues. From intimate gatherings to grand celebrations, we have the perfect space for every occasion.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Users className="w-6 h-6 text-red-500" />
                <div>
                  <h4 className="text-white font-semibold text-sm">500+ Capacity</h4>
                  <p className="text-gray-400 text-xs">Banquet Hall</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <MapPin className="w-6 h-6 text-red-500" />
                <div>
                  <h4 className="text-white font-semibold text-sm">Outdoor Lawn</h4>
                  <p className="text-gray-400 text-xs">Open Space</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Calendar className="w-6 h-6 text-red-500" />
                <div>
                  <h4 className="text-white font-semibold text-sm">Full Service</h4>
                  <p className="text-gray-400 text-xs">Event Planning</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Star className="w-6 h-6 text-red-500" />
                <div>
                  <h4 className="text-white font-semibold text-sm">Premium Setup</h4>
                  <p className="text-gray-400 text-xs">Luxury Amenities</p>
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button
                onClick={handleContactUs}
                className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Book Your Event
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="border-2 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                View Venues
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Event Space Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.acsdev.in/FNF/MLK3753.jpg"
                  alt="Event space venue"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating Info Cards */}
              <motion.div
                className="absolute -top-4 -right-4 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-white font-semibold text-sm">Banquet Hall</div>
                <div className="text-red-500 font-bold">500+ Guests</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <div className="text-white font-semibold text-sm">Lawn Space</div>
                <div className="text-red-500 font-bold">Open Air</div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-6 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="text-white font-semibold text-sm">Full Service</div>
                <div className="text-red-500 text-xs">Event Planning</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
