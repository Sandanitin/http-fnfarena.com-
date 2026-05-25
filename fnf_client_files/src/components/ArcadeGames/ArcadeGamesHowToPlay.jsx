"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Gamepad2,
  CreditCard,
  Trophy,
  Users,
  Play,
  ArrowRight,
  Coins,
  Clock,
} from "lucide-react";

export default function ArcadeGamesHowToPlay() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: CreditCard,
      title: "Purchase Tokens",
      description: "Buy game tokens at the counter or use our token machines",
      details: [
        "Visit the front desk or use self-service token machines",
        "Choose from various token packages",
        "Get bonus tokens with larger purchases",
        "Tokens work on all arcade machines",
      ],
      image:
        "https://https://cdn.acsdev.in/FNF/699b44e528a60.jpgh.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    },
    {
      icon: Gamepad2,
      title: "Choose Your Game",
      description: "Select from 50+ arcade games across multiple genres",
      details: [
        "Racing simulators with realistic controls",
        "Fighting games with tournament setups",
        "Classic arcade games like Pac-Man",
        "Modern shooting and adventure games",
      ],
      image:
        "https://https://cdn.acsdev.in/FNF/699b44e528a60.jpgh.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    },
    {
      icon: Play,
      title: "Start Playing",
      description: "Insert tokens and begin your gaming adventure",
      details: [
        "Insert required tokens into the machine",
        "Follow on-screen instructions",
        "Use controls to play the game",
        "Enjoy unlimited continues with tokens",
      ],
      image:
        "https://https://cdn.acsdev.in/FNF/699b44e528a60.jpgh.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    },
    {
      icon: Trophy,
      title: "Win Prizes",
      description: "Earn tickets and redeem them for amazing prizes",
      details: [
        "Collect tickets from winning games",
        "Check your ticket balance anytime",
        "Visit the prize counter to redeem",
        "Choose from hundreds of prizes",
      ],
      image:
        "https://https://cdn.acsdev.in/FNF/699b44e528a60.jpgh.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
    },
  ];

  const gameTypes = [
    {
      name: "Racing Games",
      icon: "🏎️",
      description: "High-speed racing with realistic controls",
      tokens: "2-4 tokens",
    },
    {
      name: "Fighting Games",
      icon: "🥊",
      description: "Epic battles with your favorite characters",
      tokens: "1-2 tokens",
    },
    {
      name: "Shooting Games",
      icon: "🎯",
      description: "Test your aim and reflexes",
      tokens: "2-3 tokens",
    },
    {
      name: "Classic Arcade",
      icon: "👾",
      description: "Retro games like Pac-Man and Galaga",
      tokens: "1 token",
    },
    {
      name: "Ticket Games",
      icon: "🎫",
      description: "Win tickets to redeem for prizes",
      tokens: "1-3 tokens",
    },
    {
      name: "Multiplayer",
      icon: "👥",
      description: "Team up or compete with friends",
      tokens: "2-5 tokens",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#1a1d21] to-[#2a2d31] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          className="text-white"
        >
          <defs>
            <pattern
              id="gameControlPattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="50" cy="50" r="3" fill="currentColor" />
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <rect
                x="40"
                y="40"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gameControlPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Play className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">
              Gaming Guide
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            HOW TO
            <span className="text-red-500"> PLAY</span>
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Get started with our arcade games in just a few simple steps. From
            purchasing tokens to winning prizes, we'll guide you through the
            entire process.
          </p>
        </motion.div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-2">
          {/* Steps Navigation */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? "bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/50"
                    : "bg-gray-800/30 border-gray-600/30 hover:border-gray-500/50"
                }`}
                onClick={() => setActiveStep(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      activeStep === index ? "bg-red-500/20" : "bg-gray-700/50"
                    }`}
                  >
                    <step.icon
                      className={`w-6 h-6 ${
                        activeStep === index ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg font-sansitaOne">
                      Step {index + 1}: {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {step.description}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform ${
                      activeStep === index
                        ? "text-red-400 translate-x-1"
                        : "text-gray-500"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Step Details */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 font-sansitaOne">
                {steps[activeStep].title}
              </h3>

              <p className="text-gray-300 mb-6">
                {steps[activeStep].description}
              </p>

              <ul className="space-y-3">
                {steps[activeStep].details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Game Types Grid */}

        {/* Token Packages */}
      </div>
    </section>
  );
}
