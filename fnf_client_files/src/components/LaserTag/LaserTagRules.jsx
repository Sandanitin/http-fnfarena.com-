"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Users, Shield, Clock, Ban, Eye } from "lucide-react";

export default function LaserTagRules({ protocols }) {
  const [activeTab, setActiveTab] = useState("solo");

  // Get Laser Tag protocols data
  const laserTagProtocols = protocols && protocols.length > 0 ? protocols[0] : null;

  const gameModes = [
    {
      id: "solo",
      title: "Solo Deathmatch",
      subtitle: "Everyone vs Everyone",
      icon: Users,
      description: "Free-for-all combat where every player fights for themselves"
    },
    {
      id: "team",
      title: "Team Deathmatch",
      subtitle: "Two Teams",
      icon: Users,
      description: "Strategic team-based combat with coordinated attacks"
    }
  ];

  // Map API data to rule categories
  const ruleCategories = React.useMemo(() => {
    if (!laserTagProtocols) {
      // Fallback data if no API data available
      return {
        entry: {
          icon: <Shield className="w-6 h-6" />,
          title: "Entry Requirements",
          items: [
            "Entry allowed only with a valid game token",
            "Only players are allowed in the combat zone",
            "Spectators must stay outside",
            "Kids under 12 must have adult supervision"
          ]
        },
        equipment: {
          icon: <Users className="w-6 h-6" />,
          title: "Equipment & Safety",
          items: [
            "Hold the gun with both hands; one hand must stay on the front sensor",
            "When hit, your vest vibrates and lights blink to indicate damage",
            "No running or physical contact in the arena",
            "Follow all equipment handling instructions"
          ]
        },
        gameplay: {
          icon: <Clock className="w-6 h-6" />,
          title: "Game Rules",
          items: [
            "You gain +50 points for every hit and receive -20 damage when shot",
            "Gun upgrades available at 300 points",
            "Eliminated players respawn after 5 seconds",
            "Respect staff, players, and equipment"
          ]
        },
        prohibited: {
          icon: <Ban className="w-6 h-6" />,
          title: "Prohibited Actions",
          items: [
            "No food or drinks in the combat zone",
            "Smoking and vaping are prohibited",
            "No physical contact or aggressive behavior",
            "Follow staff instructions at all times"
          ]
        }
      };
    }

    // Map API data to categories
    return {
      entry: {
        icon: <Shield className="w-6 h-6" />,
        title: "Entry Requirements",
        items: laserTagProtocols.requirements ? laserTagProtocols.requirements.map(req => req) : [
          "Entry allowed only with a valid game token",
          "Only players are allowed in the combat zone",
          "Spectators must stay outside",
          "Kids under 12 must have adult supervision"
        ]
      },
      equipment: {
        icon: <Users className="w-6 h-6" />,
        title: "Equipment & Safety",
        items: laserTagProtocols.equipment ? laserTagProtocols.equipment.map(eq => eq) : [
          "Hold the gun with both hands; one hand must stay on the front sensor",
          "When hit, your vest vibrates and lights blink to indicate damage",
          "No running or physical contact in the arena",
          "Follow all equipment handling instructions"
        ]
      },
      gameplay: {
        icon: <Clock className="w-6 h-6" />,
        title: "Game Rules",
        items: laserTagProtocols.etiquette ? laserTagProtocols.etiquette.map(et => et) : [
          "You gain +50 points for every hit and receive -20 damage when shot",
          "Gun upgrades available at 300 points",
          "Eliminated players respawn after 5 seconds",
          "Respect staff, players, and equipment"
        ]
      },
      prohibited: {
        icon: <Ban className="w-6 h-6" />,
        title: "Prohibited Actions",
        items: laserTagProtocols.rules ? laserTagProtocols.rules.map(rule => rule) : [
          "No food or drinks in the combat zone",
          "Smoking and vaping are prohibited",
          "No physical contact or aggressive behavior",
          "Follow staff instructions at all times"
        ]
      }
    };
  }, [laserTagProtocols]);

  const rules = Object.values(ruleCategories);

  return (
    <section className="relative bg-[#1e2125] text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* Safety & Rules Background Illustrations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warning Signs Pattern */}
        <div className="absolute top-16 right-16 opacity-5">
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-red-500/20">
            <polygon points="50,10 90,80 10,80" fill="none" stroke="currentColor" strokeWidth="3"/>
            <text x="50" y="55" textAnchor="middle" className="text-lg font-bold fill-current">!</text>
          </svg>
        </div>

        {/* Combat Equipment Pattern */}
        <div className="absolute bottom-20 right-20 opacity-8">
          <svg width="80" height="40" viewBox="0 0 80 40" className="text-white/10">
            <rect x="10" y="15" width="60" height="10" rx="5" fill="currentColor"/>
            <circle cx="15" cy="20" r="3" fill="currentColor"/>
            <circle cx="75" cy="20" r="3" fill="currentColor"/>
          </svg>
        </div>

        {/* Safety Shield Pattern */}
        <div className="absolute top-1/3 left-10 opacity-6">
          <svg width="60" height="70" viewBox="0 0 60 70" className="text-red-500/15">
            <path d="M30 5 L50 15 L50 45 Q50 60 30 65 Q10 60 10 45 L10 15 Z" fill="currentColor"/>
            <text x="30" y="40" textAnchor="middle" className="text-xs font-bold fill-white">✓</text>
          </svg>
        </div>

        {/* Target Line Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-2 opacity-20">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>

        {/* Scattered Safety Icons */}
        <div className="absolute top-1/4 right-1/3 opacity-5 text-white text-2xl">🎯</div>
        <div className="absolute bottom-1/3 left-1/4 opacity-5 text-red-500 text-xl">⚠️</div>
        <div className="absolute top-2/3 right-1/4 opacity-5 text-white text-xl">🛡️</div>
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
              Combat Safety
            </span>
          </div>
          <h2 className="text-white text-[28px] md:text-[32px] font-sansitaOne mb-2">
            Laser Tag Rules & Guidelines
          </h2>
          <h3 className="text-red-500 font-extrabold text-[36px] md:text-[42px] mt-1 font-sansitaOne mb-6">
            Fight Safe, Fight Fair
          </h3>
          <p className="text-white mt-4 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Please follow these important rules and guidelines to ensure a safe and enjoyable
            laser tag experience for everyone at FNF Arena.
          </p>
        </motion.div>

        <div className="mt-12 mb-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-300 text-sm font-semibold">Safety First</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-300 text-sm font-semibold">Respect Others</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-300 text-sm font-semibold">Follow Rules</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-300 text-sm font-semibold">Stay Alert</p>
          </motion.div>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {rules.map((category, index) => (
            <motion.div
              key={index}
              className="bg-[#606265] rounded-2xl p-6 shadow-md border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                background: "linear-gradient(135deg, #606265 0%, #888a8c 100%)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-red-500">
                  {category.icon}
                </div>
                <h4 className="text-white text-xl font-bold font-sansitaOne">
                  {category.title}
                </h4>
              </div>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Warning Notice */}
        <motion.div
          className="bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h4 className="text-red-500 text-lg font-bold mb-2 font-sansitaOne">
                Important Notice
              </h4>
              <p className="text-white text-sm leading-relaxed">
                <strong>Breaking rules may lead to game termination and removal without refund.</strong>
                Our staff reserves the right to enforce these rules to maintain a safe and enjoyable
                combat environment for all players. Thank you for your cooperation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Checker Pattern Border Bottom */}
      <div className="absolute left-0 right-0 bottom-0 h-6" aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%),
            linear-gradient(45deg,rgba(255,255,255) 25%,transparent 25%,transparent 75%,rgba(255,255,255) 75%),
            linear-gradient(180deg,#b92a2a,#d94b4b)
          `,
          backgroundSize: "28px 28px,28px 28px,auto",
          backgroundPosition: "0 0,14px 14px,0 0",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(0,0,0,.6)"
        }}
      />
    </section>
  );
}
