"use client";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Target, Users, CheckCircle, ArrowRight, Zap } from "lucide-react";

export default function LaserTagHowToPlay() {
    const navigate = useNavigate();
  const steps = [
    {
      number: "01",
      icon: <Users className="w-6 h-6" />,
      title: "Gear Up",
      description: "Put on your laser tag vest and grab your high-tech laser gun. Our staff will help you with the equipment setup.",
      tips: ["Keep both hands on the gun", "One hand must stay on front sensor"]
    },
    {
      number: "02",
      icon: <Target className="w-6 h-6" />,
      title: "Choose Mode",
      description: "Select Solo Deathmatch (everyone vs everyone) or Team Deathmatch (two teams) for your battle experience.",
      tips: ["Solo mode: free-for-all", "Team mode: strategic coordination"]
    },
    {
      number: "03",
      icon: <Zap className="w-6 h-6" />,
      title: "Enter Arena",
      description: "Step into our multi-level arena with obstacles and cover points. Use the environment to your tactical advantage.",
      tips: ["Use cover wisely", "Stay mobile to avoid hits"]
    },
    {
      number: "04",
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Battle & Win",
      description: "Aim, shoot, and dominate! Earn +50 points per hit, take -20 damage when shot. Gun upgrades at 300 points.",
      tips: ["Aim for accuracy", "Quick 5-second respawn"]
    }
  ];

  const laserTagTips = [
    {
      icon: <Target className="w-5 h-5" />,
      tip: "Aim for the vest sensors, not the gun for maximum points"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      tip: "Use cover and move strategically around the arena"
    },
    {
      icon: <Users className="w-5 h-5" />,
      tip: "Communicate with teammates in team deathmatch mode"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      tip: "Stay alert - eliminated players respawn after 5 seconds"
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

        {/* Combat Stance Illustration */}
        <div className="absolute bottom-32 right-32 opacity-8">
          <svg width="100" height="120" viewBox="0 0 100 120" className="text-white/15">
            <circle cx="50" cy="20" r="8" fill="currentColor"/>
            <line x1="50" y1="28" x2="50" y2="80" stroke="currentColor" strokeWidth="4"/>
            <line x1="50" y1="40" x2="30" y2="50" stroke="currentColor" strokeWidth="3"/>
            <line x1="50" y1="40" x2="70" y2="50" stroke="currentColor" strokeWidth="3"/>
            <line x1="50" y1="80" x2="40" y2="110" stroke="currentColor" strokeWidth="3"/>
            <line x1="50" y1="80" x2="60" y2="110" stroke="currentColor" strokeWidth="3"/>
            <rect x="25" y="45" width="15" height="8" rx="2" fill="currentColor"/>
          </svg>
        </div>

        {/* Target Patterns */}
        <div className="absolute top-1/2 left-1/3 opacity-10">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-red-500/30">
            <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="40" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="40" cy="40" r="5" fill="currentColor"/>
            <line x1="5" y1="40" x2="75" y2="40" stroke="currentColor" strokeWidth="1"/>
            <line x1="40" y1="5" x2="40" y2="75" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        {/* Laser Beam Pattern */}
        <div className="absolute bottom-20 left-1/4 opacity-8">
          <svg width="60" height="80" viewBox="0 0 60 80" className="text-white/10">
            <rect x="28" y="10" width="4" height="60" rx="2" fill="currentColor"/>
            <circle cx="30" cy="5" r="3" fill="currentColor"/>
            <circle cx="30" cy="75" r="5" fill="currentColor"/>
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
              Combat Guide
            </span>
          </div>
          <h2 className="text-white text-[28px] md:text-[32px] font-sansitaOne mb-2">
            How to Play Laser Tag
          </h2>
          <h3 className="text-red-500 font-extrabold text-[36px] md:text-[42px] mt-1 font-sansitaOne mb-6">
            Master the Arena
          </h3>
          <p className="text-white mt-4 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            New to laser tag? Follow these simple steps to get started and dominate the battlefield
            at FNF Arena. Our guidelines will help you play safely and tactically!
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
                  background: "linear-gradient(135deg, #606265 0%, #888a8c 50%, #a0a2a4 100%)",
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
            <h3 className="text-white text-2xl font-bold mb-2 font-sansitaOne">Pro Tips for Better Combat</h3>
            <p className="text-gray-300 text-sm">Master these techniques to dominate the arena</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {laserTagTips.map((tip, index) => (
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
              Ready for Combat!
            </h4>
          </div>
          <p className="text-white text-sm leading-relaxed max-w-2xl mx-auto">
            <strong>Follow the combat guidelines and have a safe, thrilling battle.</strong>
            Our trained staff is always available to help you gear up and answer any tactical questions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
