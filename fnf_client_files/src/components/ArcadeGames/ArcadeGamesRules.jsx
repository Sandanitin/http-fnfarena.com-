"use client";
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Users, Shield, Clock, Ban, Eye } from "lucide-react";

export default function ArcadeGamesRules({ protocols }) {
  // Get Arcade Games protocols data
  const arcadeProtocols = protocols && protocols.length > 0 ? protocols[0] : null;

  // Map API data to rule categories
  const ruleCategories = React.useMemo(() => {
    if (!arcadeProtocols) {
      // Fallback data if no API data available
      return {
        entry: {
          icon: <Shield className="w-6 h-6" />,
          title: "Entry Requirements",
          items: [
            "Entry allowed only with a valid game token",
            "Only players are allowed in the gaming zone",
            "Spectators must stay in designated areas",
            "Kids under 12 must have adult supervision"
          ]
        },
        gameplay: {
          icon: <Users className="w-6 h-6" />,
          title: "Gameplay & Safety",
          items: [
            "Follow game-specific instructions on each machine",
            "No rough handling of gaming equipment",
            "Wait for your turn in multiplayer games",
            "Report any machine malfunctions to staff"
          ]
        },
        etiquette: {
          icon: <Clock className="w-6 h-6" />,
          title: "Gaming Etiquette",
          items: [
            "Respect other players and wait your turn",
            "Keep noise levels reasonable",
            "No hogging machines during peak hours",
            "Clean up after yourself"
          ]
        },
        prohibited: {
          icon: <Ban className="w-6 h-6" />,
          title: "Prohibited Items",
          items: [
            "No food or drinks near gaming machines",
            "Smoking and vaping are prohibited",
            "No outside gaming devices",
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
        items: arcadeProtocols.requirements ? arcadeProtocols.requirements.map(req => req) : [
          "Entry allowed only with a valid game token",
          "Only players are allowed in the gaming zone",
          "Spectators must stay in designated areas",
          "Kids under 12 must have adult supervision"
        ]
      },
      gameplay: {
        icon: <Users className="w-6 h-6" />,
        title: "Gameplay & Safety",
        items: arcadeProtocols.equipment ? arcadeProtocols.equipment.map(eq => eq) : [
          "Follow game-specific instructions on each machine",
          "No rough handling of gaming equipment",
          "Wait for your turn in multiplayer games",
          "Report any machine malfunctions to staff"
        ]
      },
      etiquette: {
        icon: <Clock className="w-6 h-6" />,
        title: "Gaming Etiquette",
        items: arcadeProtocols.etiquette ? arcadeProtocols.etiquette.map(et => et) : [
          "Respect other players and wait your turn",
          "Keep noise levels reasonable",
          "No hogging machines during peak hours",
          "Clean up after yourself"
        ]
      },
      prohibited: {
        icon: <Ban className="w-6 h-6" />,
        title: "Prohibited Items",
        items: arcadeProtocols.rules ? arcadeProtocols.rules.map(rule => rule) : [
          "No food or drinks near gaming machines",
          "Smoking and vaping are prohibited",
          "No outside gaming devices",
          "Follow staff instructions at all times"
        ]
      }
    };
  }, [arcadeProtocols]);

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

        {/* Gaming Controller Pattern */}
        <div className="absolute bottom-20 right-20 opacity-8">
          <svg width="80" height="40" viewBox="0 0 80 40" className="text-white/10">
            <rect x="20" y="15" width="40" height="20" rx="10" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="30" cy="25" r="3" fill="currentColor"/>
            <circle cx="50" cy="25" r="3" fill="currentColor"/>
            <rect x="35" y="20" width="10" height="3" fill="currentColor"/>
            <rect x="38" y="17" width="4" height="9" fill="currentColor"/>
          </svg>
        </div>

        {/* Safety Shield Pattern */}
        <div className="absolute top-1/3 left-10 opacity-6">
          <svg width="60" height="70" viewBox="0 0 60 70" className="text-red-500/15">
            <path d="M30 5 L50 15 L50 45 Q50 60 30 65 Q10 60 10 45 L10 15 Z" fill="currentColor"/>
            <text x="30" y="40" textAnchor="middle" className="text-xs font-bold fill-white">✓</text>
          </svg>
        </div>

        {/* Game Over Line Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-2 opacity-20">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>

        {/* Scattered Gaming Icons */}
        <div className="absolute top-1/4 right-1/3 opacity-5 text-white text-2xl">🎮</div>
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
              Gaming Guidelines
            </span>
          </div>
          <h2 className="text-white text-[28px] md:text-[32px] font-sansitaOne mb-2">
            Arcade Gaming Rules & Guidelines
          </h2>
          <h3 className="text-red-500 font-extrabold text-[36px] md:text-[42px] mt-1 font-sansitaOne mb-6">
            Game Safe, Game Fair
          </h3>
          <p className="text-white mt-4 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Please follow these important rules and guidelines to ensure a safe and enjoyable
            arcade gaming experience for everyone at FNF Arena.
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
            <p className="text-gray-300 text-sm font-semibold">Follow Timing</p>
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
                gaming environment for all players. Thank you for your cooperation.
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
