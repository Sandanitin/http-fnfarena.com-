"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Target, Users, CheckCircle, ArrowRight, Zap } from "lucide-react";

export default function BowlingHowToPlay() {
  const navigate = useNavigate();
  const steps = [
    {
      number: "01",
      icon: <Users className="w-6 h-6" />,
      title: "Get Started",
      description: "Get your lane and rental shoes from the front desk. Give your names at the desk; the screen shows whose turn it is.",
      tips: ["Always wear bowling shoes on the lane", "Check your lane number"]
    },
    {
      number: "02",
      icon: <Target className="w-6 h-6" />,
      title: "Choose Your Ball",
      description: "Choose a ball with the right grip and weight. Lift the ball using both hands for safety.",
      tips: ["Test different weights", "Ensure comfortable grip"]
    },
    {
      number: "03",
      icon: <Play className="w-6 h-6" />,
      title: "Take Your Turn",
      description: "Only the active bowler should be on the approach. Aim at the arrows, not the pins.",
      tips: ["Wait for pins to stop moving", "One player bowls at a time"]
    },
    {
      number: "04",
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Finish & Return",
      description: "Check your final scores after the 10th frame. Return rental shoes and house balls to the racks.",
      tips: ["Clean up your area", "Follow staff guidelines"]
    }
  ];

  const bowlingTips = [
    {
      icon: <Target className="w-5 h-5" />,
      tip: "Aim for the arrows on the lane, not the pins directly"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      tip: "Keep your arm straight and follow through"
    },
    {
      icon: <Users className="w-5 h-5" />,
      tip: "Stay in your lane and respect other players"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      tip: "Practice your approach for consistency"
    }
  ];

  return (
    <section className="relative bg-[#1e2125] text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* Instructional Background Graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Step Numbers Background */}
        <div className="absolute top-20 right-20 opacity-5">
          <svg width="150" height="150" viewBox="0 0 150 150" className="text-white/20">
            <circle cx="75" cy="75" r="60" fill="none" stroke="currentColor" strokeWidth="4"/>
            <text x="75" y="85" textAnchor="middle" className="text-4xl font-bold fill-current">1</text>
          </svg>
        </div>

        <div className="absolute top-1/3 left-10 opacity-5">
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-red-500/20">
            <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="4"/>
            <text x="60" y="70" textAnchor="middle" className="text-3xl font-bold fill-current">2</text>
          </svg>
        </div>

        {/* Bowling Form Illustration */}
        <div className="absolute bottom-32 right-32 opacity-8">
          <svg width="100" height="120" viewBox="0 0 100 120" className="text-white/15">
            <circle cx="50" cy="20" r="8" fill="currentColor"/>
            <line x1="50" y1="28" x2="50" y2="80" stroke="currentColor" strokeWidth="4"/>
            <line x1="50" y1="40" x2="30" y2="60" stroke="currentColor" strokeWidth="3"/>
            <line x1="50" y1="40" x2="70" y2="70" stroke="currentColor" strokeWidth="3"/>
            <line x1="50" y1="80" x2="40" y2="110" stroke="currentColor" strokeWidth="3"/>
            <line x1="50" y1="80" x2="60" y2="110" stroke="currentColor" strokeWidth="3"/>
            <circle cx="75" cy="75" r="5" fill="currentColor"/>
          </svg>
        </div>

        {/* Arrow Patterns */}
        <div className="absolute top-1/2 left-1/3 opacity-10">
          <svg width="80" height="20" viewBox="0 0 80 20" className="text-red-500/30">
            <path d="M5 10 L70 10 M65 5 L70 10 L65 15" stroke="currentColor" strokeWidth="3" fill="none"/>
          </svg>
        </div>

        {/* Target/Pins Pattern */}
        <div className="absolute bottom-20 left-1/4 opacity-8">
          <svg width="60" height="80" viewBox="0 0 60 80" className="text-white/10">
            <rect x="28" y="10" width="4" height="15" rx="2" fill="currentColor"/>
            <rect x="20" y="30" width="4" height="15" rx="2" fill="currentColor"/>
            <rect x="36" y="30" width="4" height="15" rx="2" fill="currentColor"/>
            <rect x="12" y="50" width="4" height="15" rx="2" fill="currentColor"/>
            <rect x="28" y="50" width="4" height="15" rx="2" fill="currentColor"/>
            <rect x="44" y="50" width="4" height="15" rx="2" fill="currentColor"/>
          </svg>
        </div>

        {/* Dotted Path */}
        <div className="absolute top-2/3 left-0 right-0 opacity-5">
          <svg width="100%" height="40" viewBox="0 0 1200 40" className="text-red-500/20">
            <path d="M0 20 Q300 10 600 20 T1200 20" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,10"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-6">
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
              Learn to Play
            </span>
          </div>
          <h2 className="text-white text-[28px] md:text-[32px] font-sansitaOne mb-2">
            How to Play Bowling
          </h2>
          <h3 className="text-red-500 font-extrabold text-[36px] md:text-[42px] mt-1 font-sansitaOne mb-6">
            Master the Game
          </h3>
          <p className="text-white mt-4 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            New to bowling? Follow these simple steps to get started and enjoy a fantastic
            game at FNF Arena. Our guidelines will help you play safely and have fun!
          </p>
        </motion.div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent z-0" />
              )}

              <motion.div
                className="bg-[#606265] rounded-2xl p-6 shadow-md border border-gray-200 relative z-10 h-full cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  // background: "linear-gradient(135deg, #606265 0%, #888a8c 50%)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  borderColor: "#ef4444",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Step Number */}
                <motion.div
                  className="absolute -top-4 -left-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg font-sansitaOne"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#dc2626",
                    boxShadow: "0 8px 20px rgba(239, 68, 68, 0.4)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {step.number}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="text-red-500 mb-4 mt-4"
                  whileHover={{
                    scale: 1.2,
                    color: "#dc2626",
                    transition: { duration: 0.2 }
                  }}
                >
                  {step.icon}
                </motion.div>

                {/* Content */}
                <h4 className="text-white text-lg font-bold mb-3 font-sansitaOne">
                  {step.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Tips */}
                <div className="space-y-2">
                  {step.tips.map((tip, tipIndex) => (
                    <motion.div
                      key={tipIndex}
                      className="flex items-center gap-2"
                      whileHover={{
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"
                        whileHover={{
                          scale: 1.5,
                          backgroundColor: "#dc2626",
                          transition: { duration: 0.2 }
                        }}
                      ></motion.div>
                      <span className="text-gray-400 text-xs">{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Pro Tips Section */}
        <motion.div
          className="bg-[#606265] rounded-2xl p-8 shadow-md border border-gray-200 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{
            background: "linear-gradient(135deg, #606265 0%, #888a8c 100%)",
            borderColor: "#ef4444",
            transition: { duration: 0.3 }
          }}
        >
          <div className="text-center mb-8">
            <h3 className="text-white text-2xl font-bold mb-2 font-sansitaOne">Pro Tips for Better Bowling</h3>
            <p className="text-gray-300 text-sm">Master these techniques to improve your game</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bowlingTips.map((tip, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 bg-[#1e2125] rounded-xl cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#2a2d31",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                  borderColor: "#ef4444",
                  x: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="text-red-500 flex-shrink-0"
                  whileHover={{
                    scale: 1.2,
                    color: "#dc2626",
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {tip.icon}
                </motion.div>
                <span className="text-gray-300 text-sm">{tip.tip}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Notice */}
        <motion.div
          className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(16, 185, 129, 0.25) 100%)",
            borderColor: "#10b981",
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            >
              <CheckCircle className="w-6 h-6 text-green-500" />
            </motion.div>
            <h4 className="text-green-500 text-lg font-bold font-sansitaOne">
              Ready to Play!
            </h4>
          </div>
          <p className="text-white text-sm leading-relaxed max-w-2xl mx-auto">
            <strong>Kindly follow the guidelines and have a safe, fun game.</strong>
            Our friendly staff is always available to help you get started and answer any questions.
          </p>
          
        </motion.div>
      </div>
    </section>
  );
}
