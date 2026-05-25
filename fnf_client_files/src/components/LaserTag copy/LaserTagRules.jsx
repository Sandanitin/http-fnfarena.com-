"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Target, Users, Zap, Shield, Trophy, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

export default function LaserTagRules() {
  const [activeGameMode, setActiveGameMode] = useState('solo');

  const gameModes = {
    solo: {
      icon: <Target className="w-6 h-6" />,
      title: "Solo Deathmatch",
      subtitle: "Everyone vs Everyone",
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/40",
      description: "Free-for-all combat where every player fights for themselves. Last player standing wins!",
      rules: [
        "Every player fights independently",
        "Eliminate all other players to win",
        "No teams or alliances allowed",
        "Individual scoring and ranking"
      ]
    },
    team: {
      icon: <Users className="w-6 h-6" />,
      title: "Team Deathmatch",
      subtitle: "Two Teams",
      color: "from-red-600/20 to-red-700/20",
      borderColor: "border-red-600/40",
      description: "Strategic team-based combat with coordinated attacks and defensive strategies.",
      rules: [
        "Players divided into two teams",
        "Coordinate with teammates",
        "Team with most eliminations wins",
        "Communication and strategy key"
      ]
    }
  };

  const generalRules = [
    {
      icon: <Shield className="w-5 h-5 text-red-400" />,
      title: "Gun Handling",
      text: "Hold the gun with both hands; one hand must stay on the front sensor for the gun to work.",
      type: "required"
    },
    {
      icon: <Zap className="w-5 h-5 text-red-400" />,
      title: "Hit Detection",
      text: "When hit, your vest vibrates and lights blink on your vest.",
      type: "info"
    },
    {
      icon: <Trophy className="w-5 h-5 text-green-400" />,
      title: "Scoring System",
      text: "You gain +50 points for every hit and receive -20 damage when you get shot.",
      type: "scoring"
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      title: "Elimination",
      text: "When your health reaches zero, you're eliminated for 5 seconds; your vest will blink white, then you will be revived.",
      type: "elimination"
    },
    {
      icon: <Zap className="w-5 h-5 text-green-400" />,
      title: "Unlimited Ammo",
      text: "Unlimited ammo – the gun reloads automatically.",
      type: "advantage"
    },
    {
      icon: <Trophy className="w-5 h-5 text-red-400" />,
      title: "Gun Upgrades",
      text: "Gun upgrades automatically at score milestones.",
      type: "upgrade"
    },
    {
      icon: <Target className="w-5 h-5 text-red-500" />,
      title: "Machine Gun Upgrade",
      text: "At 300 points, gun upgrades to a machine gun, and damage increases.",
      type: "upgrade"
    }
  ];

  const safetyRules = [
    "No running in the arena - walk only",
    "Keep your laser tag vest on at all times",
    "Do not climb on obstacles or barriers",
    "Follow staff instructions immediately",
    "No physical contact with other players",
    "Report any equipment malfunctions to staff"
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] text-white py-20 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Laser Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-500/20">
            <defs>
              <pattern id="laserPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1"/>
                <line x1="0" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1"/>
                <line x1="30" y1="0" x2="30" y2="60" stroke="currentColor" strokeWidth="1"/>
                <circle cx="30" cy="30" r="3" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#laserPattern)"/>
          </svg>
        </div>

        {/* Floating Combat Elements */}
        <motion.div
          className="absolute top-32 right-32 opacity-10"
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Target className="w-32 h-32 text-red-500/50" />
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-20 opacity-8"
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-24 h-24 text-red-400/50" />
        </motion.div>
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
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-full px-8 py-4 mb-8">
            <Target className="w-6 h-6 text-red-400" />
            <span className="text-red-400 text-lg font-bold uppercase tracking-wider">
              Combat Rules
            </span>
            <Shield className="w-6 h-6 text-red-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
            Laser Tag Rules
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-red-400 to-red-500 bg-clip-text font-sansitaOne mb-8">
            & Game Modes
          </h3>
          <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
            Master the rules of engagement and choose your combat style. Follow these guidelines for the ultimate laser tag experience.
          </p>
        </motion.div>

        {/* Game Mode Selection */}
        <motion.div
          className="flex justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {Object.entries(gameModes).map(([key, mode]) => (
            <button
              key={key}
              onClick={() => setActiveGameMode(key)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeGameMode === key
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-xl scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {mode.icon}
              <div className="text-left">
                <div className="font-bold">{mode.title}</div>
                <div className="text-xs opacity-80">{mode.subtitle}</div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Active Game Mode Details */}
        <motion.div
          key={activeGameMode}
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`bg-gradient-to-br ${gameModes[activeGameMode].color} backdrop-blur-sm rounded-3xl p-8 border ${gameModes[activeGameMode].borderColor} shadow-2xl`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                {gameModes[activeGameMode].icon}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white font-sansitaOne">
                  {gameModes[activeGameMode].title}
                </h3>
                <p className="text-red-400 font-semibold">{gameModes[activeGameMode].subtitle}</p>
              </div>
            </div>

            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              {gameModes[activeGameMode].description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameModes[activeGameMode].rules.map((rule, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-black/20 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* General Rules */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white font-sansitaOne text-center mb-8">
            General Combat Rules
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {generalRules.map((rule, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  rule.type === 'required' ? 'bg-red-500/10 border-red-500/30' :
                  rule.type === 'scoring' ? 'bg-green-500/10 border-green-500/30' :
                  rule.type === 'elimination' ? 'bg-red-600/10 border-red-600/30' :
                  rule.type === 'advantage' ? 'bg-green-600/10 border-green-600/30' :
                  rule.type === 'upgrade' ? 'bg-red-700/10 border-red-700/30' :
                  'bg-red-500/10 border-red-500/30'
                } hover:scale-105`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {rule.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">{rule.title}</h4>
                    <p className="text-gray-200 leading-relaxed">{rule.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Safety Rules */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-red-500/40 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-red-400 text-2xl font-bold font-sansitaOne">
                  ⚠️ Safety Rules
                </h3>
                <p className="text-gray-300">Essential safety guidelines for all players</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safetyRules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-black/20 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200 text-sm leading-relaxed">{rule}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-red-500/20 rounded-2xl border border-red-500/30">
              <p className="text-red-400 font-bold text-center">
                Staff decisions are final. Unsafe behavior may result in immediate removal from the arena.
              </p>
            </div>
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
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30">
            <h3 className="text-3xl font-bold mb-4 font-sansitaOne text-white">Ready for Combat?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-lg">
              Now that you know the rules, gear up and enter the arena for the ultimate laser tag experience!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl transform hover:scale-105">
                Book Combat Session
              </button>
              <button className="border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm">
                View Pricing
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
