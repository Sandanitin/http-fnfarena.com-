"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Zap, Users, Trophy } from "lucide-react";

export default function LaserTagHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop"
            alt="Laser tag arena background"
            loading="lazy"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d21]/80 via-red-900/40 to-[#1a1d21]/90" />
        </div>

        {/* Laser Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-500/30">
            <defs>
              <pattern id="laserGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="25" cy="25" r="2" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#laserGrid)"/>
          </svg>
        </div>

        {/* Floating Target Elements */}
        <motion.div
          className="absolute top-20 right-20 opacity-20"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Target className="w-32 h-32 text-red-500" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-20 opacity-15"
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-24 h-24 text-red-400" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Target className="w-4 h-4 text-red-500" />
              <span className="text-red-500 text-sm font-semibold">Ultimate Combat Experience</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-sansitaOne leading-tight">
              Laser Tag
              <span className="block text-red-500">Arena</span>
            </h1>

            <p className="text-gray-300 text-xl leading-relaxed max-w-lg">
              Step into the ultimate laser tag battlefield where strategy meets action.
              Experience intense combat scenarios with cutting-edge laser technology in our immersive arena.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105">
                <Target className="w-5 h-5" />
                Enter the Arena
                <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="border-2 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                View Game Modes
              </button>
            </div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-red-500/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
              <Users className="w-12 h-12 text-red-500 mb-4" />
              <div className="text-3xl font-bold text-white font-sansitaOne">16</div>
              <p className="text-gray-400 text-sm">Max Players</p>
            </div>

            <div className="bg-gradient-to-br from-red-600/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-red-600/30">
              <Target className="w-12 h-12 text-red-600 mb-4" />
              <div className="text-3xl font-bold text-white font-sansitaOne">2</div>
              <p className="text-gray-400 text-sm">Game Modes</p>
            </div>

            <div className="bg-gradient-to-br from-red-700/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-red-700/30">
              <Trophy className="w-12 h-12 text-red-700 mb-4" />
              <div className="text-3xl font-bold text-white font-sansitaOne">15</div>
              <p className="text-gray-400 text-sm">Min Duration</p>
            </div>

            <div className="bg-gradient-to-br from-red-500/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
              <Zap className="w-12 h-12 text-red-500 mb-4" />
              <div className="text-3xl font-bold text-white font-sansitaOne">∞</div>
              <p className="text-gray-400 text-sm">Unlimited Ammo</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
