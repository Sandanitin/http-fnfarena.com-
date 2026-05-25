"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Target, Users, Zap, Shield, Trophy, ArrowRight, CheckCircle } from "lucide-react";

export default function LaserTagHowToPlay() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Gear Up",
      description: "Put on your laser tag vest and grab your laser gun. Our staff will help you adjust the equipment for the perfect fit.",
      details: [
        "Secure your laser tag vest properly",
        "Hold the gun with both hands",
        "Keep one hand on the front sensor",
        "Listen to safety briefing"
      ],
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Enter the Arena",
      description: "Step into our multi-level arena with strategic cover points and obstacles designed for intense combat scenarios.",
      details: [
        "Explore the arena layout",
        "Find strategic positions",
        "Use cover effectively",
        "Plan your approach"
      ],
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Start Combat",
      description: "Begin the battle! Aim at opponents' vests to score hits. Your vest will vibrate and flash when you're hit.",
      details: [
        "Aim at opponent vests",
        "Score +50 points per hit",
        "Take -20 damage when hit",
        "Unlimited ammo available"
      ],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Achieve Victory",
      description: "Eliminate opponents and upgrade your weapon at 300 points. The player or team with the highest score wins!",
      details: [
        "Eliminate all opponents",
        "Upgrade to machine gun at 300 points",
        "Increased damage after upgrade",
        "Highest score wins"
      ],
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&h=400&fit=crop"
    }
  ];

  const tips = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      title: "Aim for the Vest",
      description: "Target the sensors on opponents' vests for successful hits"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      title: "Use Cover",
      description: "Take advantage of obstacles and barriers for protection"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      title: "Team Strategy",
      description: "Coordinate with teammates for tactical advantages"
    },
    {
      icon: <Zap className="w-6 h-6 text-red-500" />,
      title: "Stay Mobile",
      description: "Keep moving to avoid becoming an easy target"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-500/20">
            <defs>
              <pattern id="playPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="50" cy="50" r="3" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#playPattern)"/>
          </svg>
        </div>

        <motion.div
          className="absolute top-20 right-20 opacity-10"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Target className="w-32 h-32 text-red-500/30" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-full px-8 py-4 mb-8">
            <Target className="w-6 h-6 text-red-400" />
            <span className="text-red-400 text-lg font-bold uppercase tracking-wider">
              Combat Guide
            </span>
            <Zap className="w-6 h-6 text-red-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
            How to Play
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-red-400 to-red-500 bg-clip-text font-sansitaOne mb-8">
            Laser Tag
          </h3>
          <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
            Master the art of laser tag combat with our step-by-step guide. From gearing up to achieving victory,
            learn everything you need to dominate the arena.
          </p>
        </motion.div>

        {/* Step Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeStep === index
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-xl scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {step.icon}
              </div>
              <div className="text-left">
                <div className="font-bold">Step {index + 1}</div>
                <div className="text-xs opacity-80">{step.title}</div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Active Step Content */}
        <motion.div
          key={activeStep}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Step Image */}
          <div className="relative">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Step Number */}
              <div className="absolute top-6 left-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <span className="text-2xl font-bold">{activeStep + 1}</span>
                </div>
              </div>

              {/* Step Icon */}
              <div className="absolute bottom-6 right-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                  {steps[activeStep].icon}
                </div>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-4xl font-bold text-white font-sansitaOne mb-4">
                {steps[activeStep].title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {steps[activeStep].description}
              </p>
            </div>

            {/* Step Details */}
            <div className="space-y-3">
              {steps[activeStep].details.map((detail, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-gray-200">{detail}</span>
                </motion.div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              {activeStep > 0 && (
                <button
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300"
                >
                  Previous Step
                </button>
              )}
              {activeStep < steps.length - 1 && (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Pro Tips */}
        <motion.div
          className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white font-sansitaOne text-center mb-8">
            Pro Combat Tips
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-black/20 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-4">
                  {tip.icon}
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{tip.title}</h4>
                <p className="text-gray-300 text-sm">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-6 font-sansitaOne text-white">Ready to Enter the Arena?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Now that you know how to play, gear up and experience the ultimate laser tag combat!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl transform hover:scale-105">
              Book Combat Session
            </button>
            <button className="border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm">
              View Pricing
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
