"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Users, Clock, Baby, Zap, CheckCircle, XCircle } from "lucide-react";

export default function SoftplayTrampolineBullrideRules({ protocols }) {
  const [activeTab, setActiveTab] = useState("requirements");

  // Get Softplay protocols data
  const softplayProtocols = protocols && protocols.length > 0 ? protocols[0] : null;

  // Map API data to rule categories
  const ruleCategories = React.useMemo(() => {
    if (!softplayProtocols) {
      // Fallback data if no API data available
      return {
        requirements: {
          icon: <Shield className="w-6 h-6" />,
          title: "Entry Requirements",
          items: [
            "Entry allowed only with a valid game token",
            "Only players are allowed in the activity zone",
            "Spectators must stay outside designated areas",
            "Kids under 12 must have adult supervision"
          ]
        },
        equipment: {
          icon: <Users className="w-6 h-6" />,
          title: "Equipment & Safety",
          items: [
            "Appropriate footwear is mandatory",
            "No loose clothing or jewelry allowed",
            "Safety equipment must be worn at all times",
            "Follow staff instructions for equipment use"
          ]
        },
        etiquette: {
          icon: <Clock className="w-6 h-6" />,
          title: "Activity Etiquette",
          items: [
            "Wait for your turn; let others finish",
            "Respect other players and staff",
            "Stay in designated activity areas",
            "Follow time limits for each activity"
          ]
        },
        rules: {
          icon: <Baby className="w-6 h-6" />,
          title: "General Rules",
          items: [
            "No food or drinks in activity zones",
            "Smoking and vaping are prohibited",
            "Return equipment to designated areas",
            "Follow all posted safety guidelines"
          ]
        }
      };
    }

    // Map API data to categories
    return {
      requirements: {
        icon: <Shield className="w-6 h-6" />,
        title: "Entry Requirements",
        items: softplayProtocols.requirements ? softplayProtocols.requirements.map(req => req) : [
          "Entry allowed only with a valid game token",
          "Only players are allowed in the activity zone",
          "Spectators must stay outside designated areas",
          "Kids under 12 must have adult supervision"
        ]
      },
      equipment: {
        icon: <Users className="w-6 h-6" />,
        title: "Equipment & Safety",
        items: softplayProtocols.equipment ? softplayProtocols.equipment.map(eq => eq) : [
          "Appropriate footwear is mandatory",
          "No loose clothing or jewelry allowed",
          "Safety equipment must be worn at all times",
          "Follow staff instructions for equipment use"
        ]
      },
      etiquette: {
        icon: <Clock className="w-6 h-6" />,
        title: "Activity Etiquette",
        items: softplayProtocols.etiquette ? softplayProtocols.etiquette.map(et => et) : [
          "Wait for your turn; let others finish",
          "Respect other players and staff",
          "Stay in designated activity areas",
          "Follow time limits for each activity"
        ]
      },
      rules: {
        icon: <Baby className="w-6 h-6" />,
        title: "General Rules",
        items: softplayProtocols.rules ? softplayProtocols.rules.map(rule => rule) : [
          "No food or drinks in activity zones",
          "Smoking and vaping are prohibited",
          "Return equipment to designated areas",
          "Follow all posted safety guidelines"
        ]
      }
    };
  }, [softplayProtocols]);

  const tabCategories = [
    { id: "requirements", name: "Requirements", icon: Shield },
    { id: "equipment", name: "Equipment", icon: Users },
    { id: "etiquette", name: "Etiquette", icon: Clock },
    { id: "rules", name: "Rules", icon: Baby }
  ];

  const currentRules = ruleCategories[activeTab];

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#1a1d21] to-[#2a2d31] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white">
          <defs>
            <pattern id="safetyPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="3" fill="currentColor"/>
              <circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
              <path d="M30 30 L50 50 M50 30 L30 50" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#safetyPattern)"/>
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
            <Shield className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">Safety Guidelines</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            SAFETY
            <span className="text-red-500"> FIRST</span>
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Your safety and enjoyment are our top priorities. Please review these important
            guidelines before participating in any activities.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {tabCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <category.icon className="w-5 h-5" />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Rules Content */}
        <motion.div
          key={activeTab}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Rules List */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  {currentRules.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-sansitaOne">
                    {currentRules.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Important guidelines for safe participation
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {currentRules.items.map((rule, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-gray-800/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {rule}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Safety Features */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
              <h4 className="text-white font-bold text-lg mb-4 font-sansitaOne">
                Quick Info
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-red-400" />
                  <span className="text-gray-200 text-sm">All ages welcome</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-red-400" />
                  <span className="text-gray-200 text-sm">Supervised activities</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-red-400" />
                  <span className="text-gray-200 text-sm">Safety certified</span>
                </div>
              </div>
            </div>

            {/* Safety Features */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h4 className="text-white font-bold text-lg mb-4 font-sansitaOne">
                Safety Features
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">Certified safety equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">Trained staff supervision</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">Regular equipment maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">Emergency response protocols</span>
                </li>
              </ul>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
              <h4 className="text-white font-bold text-lg mb-4 font-sansitaOne">
                Emergency Contact
              </h4>
              <p className="text-gray-200 text-sm mb-3">
                In case of any emergency or if you need immediate assistance:
              </p>
              <p className="text-gray-300 text-xs mt-2">
                Our trained staff are always available to help
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Notice */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-red-500/10 via-red-500/20 to-red-500/10 rounded-2xl p-8 border border-red-500/20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-sansitaOne">
              Important Notice
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
              By participating in any of our activities, you acknowledge that you have read,
              understood, and agree to follow all safety guidelines. Management reserves the
              right to refuse service or remove participants who do not comply with safety rules.
              All activities are undertaken at your own risk.
            </p>
          </div>
        </motion.div>
      </div>
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
