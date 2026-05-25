"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Users, Shield, Clock, Ban, Eye, Zap, CheckCircle, XCircle, Info, UserCheck, Target, Flag, AlertCircle } from "lucide-react";

export default function PaintballRules({ protocols }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requirements');

  // Get Paintball protocols data
  const paintballProtocols = protocols && protocols.length > 0 ? protocols[0] : null;

  // Map API data to rule categories
  const ruleCategories = React.useMemo(() => {
    if (!paintballProtocols) {
      // Fallback data if no API data available
      return {
        requirements: {
          icon: <UserCheck className="w-6 h-6" />,
          title: "Age Restrictions",
          color: "from-red-500/20 to-red-600/20",
          borderColor: "border-red-500/40",
          items: [
            { text: "AGE RESTRICTION: AGE 12+ ONLY - Minimum age requirement strictly enforced for safety" },
            { text: "Under 16 must be supervised by adults at all times during combat sessions" },
            { text: "Valid ID may be required for age verification before battlefield entry" },
            { text: "Height and physical fitness requirements apply for certain combat zones" }
          ]
        },
        equipment: {
          icon: <Shield className="w-6 h-6" />,
          title: "Safety Equipment",
          color: "from-red-600/20 to-red-700/20",
          borderColor: "border-red-600/40",
          items: [
            { text: "MANDATORY SAFETY GEAR: MASK, PROTECTIVE CLOTHING & EQUIPMENT MUST BE WORN" },
            { text: "No removal of safety masks during active gameplay - immediate disqualification" },
            { text: "Report any damaged equipment immediately to staff for replacement" },
            { text: "No modifications or tampering with paintball markers allowed" }
          ]
        },
        etiquette: {
          icon: <Users className="w-6 h-6" />,
          title: "Combat Etiquette & Sportsmanship",
          color: "from-red-700/20 to-red-800/20",
          borderColor: "border-red-700/40",
          items: [
            { text: "COMBAT ETIQUETTE: NO PHYSICAL CONTACT, OVERSHOOTING, OR BLIND FIRING" },
            { text: "SPORTSMANSHIP: RESPECT EVERYONE; NO ABUSIVE BEHAVIOR OR CHEATING" },
            { text: "NO WIPING PAINT, ARGUING WITH REFEREES, OR UNSPORTSMANLIKE CONDUCT" },
            { text: "Call yourself out when hit and exit battlefield immediately" }
          ]
        },
        rules: {
          icon: <Target className="w-6 h-6" />,
          title: "Battlefield Safety & Staff Authority",
          color: "from-red-800/20 to-red-900/20",
          borderColor: "border-red-800/40",
          items: [
            { text: "NO ENTRY TO BATTLEFIELD WITHOUT REFEREE PERMISSION AND SAFETY BRIEFING" },
            { text: "FOLLOW ALL BATTLEFIELD RULES AND REFEREE INSTRUCTIONS" },
            { text: "REFEREE DECISIONS ARE FINAL; UNSAFE BEHAVIOR MAY LEAD TO REMOVAL" },
            { text: "Stay in designated safe zones when not in active combat" }
          ]
        }
      };
    }

    // Map API data to categories
    return {
      requirements: {
        icon: <UserCheck className="w-6 h-6" />,
        title: "Age Restrictions",
        color: "from-red-500/20 to-red-600/20",
        borderColor: "border-red-500/40",
        items: paintballProtocols.requirements ? paintballProtocols.requirements.map(req => ({ text: req })) : []
      },
      equipment: {
        icon: <Shield className="w-6 h-6" />,
        title: "Safety Equipment",
        color: "from-red-600/20 to-red-700/20",
        borderColor: "border-red-600/40",
        items: paintballProtocols.equipment ? paintballProtocols.equipment.map(eq => ({ text: eq })) : []
      },
      etiquette: {
        icon: <Users className="w-6 h-6" />,
        title: "Combat Etiquette & Sportsmanship",
        color: "from-red-700/20 to-red-800/20",
        borderColor: "border-red-700/40",
        items: paintballProtocols.etiquette ? paintballProtocols.etiquette.map(et => ({ text: et })) : []
      },
      rules: {
        icon: <Target className="w-6 h-6" />,
        title: "Battlefield Safety & Staff Authority",
        color: "from-red-800/20 to-red-900/20",
        borderColor: "border-red-800/40",
        items: paintballProtocols.rules ? paintballProtocols.rules.map(rule => ({ text: rule })) : []
      }
    };
  }, [paintballProtocols]);

  const quickTips = [
    { icon: "🎯", title: "Age ", desc: "Minimum age required", color: "from-red-500/20 to-red-600/20" },
    { icon: "🛡️", title: "Safety First", desc: "Wear all protective gear", color: "from-red-600/20 to-red-700/20" },
    { icon: "⚠️", title: "No Contact", desc: "Keep physical distance", color: "from-red-700/20 to-red-800/20" },
    { icon: "👨‍💼", title: "Follow Refs", desc: "Obey all instructions", color: "from-red-800/20 to-red-900/20" }
  ];

  return (
    <section className="relative bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white py-20 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* Paintball Themed Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Paintball Splatter Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-400/20">
            <defs>
              <pattern id="splatterPattern" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="20" r="8" fill="currentColor" opacity="0.6"/>
                <circle cx="80" cy="40" r="6" fill="currentColor" opacity="0.4"/>
                <circle cx="50" cy="60" r="10" fill="currentColor" opacity="0.5"/>
                <circle cx="100" cy="15" r="4" fill="currentColor" opacity="0.7"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#splatterPattern)"/>
          </svg>
        </div>

        {/* Floating Paintball Elements */}
        <motion.div
          className="absolute top-32 right-32 opacity-10"
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-32 h-32 border-4 border-red-400/30 rounded-2xl flex items-center justify-center">
            <Target className="w-16 h-16 text-red-400/50" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-20 opacity-8"
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center">
            <Flag className="w-12 h-12 text-red-500/50" />
          </div>
        </motion.div>

        {/* Paintball Icons */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-20 left-20 text-red-300 text-4xl">🎯</div>
          <div className="absolute top-40 right-40 text-red-400 text-3xl">🏹</div>
          <div className="absolute bottom-32 left-32 text-red-300 text-3xl">🛡️</div>
          <div className="absolute bottom-20 right-20 text-red-400 text-4xl">🏆</div>
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
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-full px-8 py-4 mb-8">
            <Target className="w-6 h-6 text-red-400" />
            <span className="text-red-400 text-lg font-bold uppercase tracking-wider">
              Paintball Safety
            </span>
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
            Paintball Rules &
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-red-400 to-red-500 bg-clip-text font-sansitaOne mb-8">
            Safety Guidelines
          </h3>
          <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
            Follow these essential paintball rules to ensure a safe and enjoyable combat experience for all warriors.
            Your cooperation helps maintain a secure battlefield environment for everyone at FNF Arena.
          </p>
        </motion.div>

        {/* Quick Tips Icons */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {quickTips.map((tip, index) => (
            <motion.div
              key={index}
              className={`text-center bg-gradient-to-br ${tip.color} backdrop-blur-sm rounded-2xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{tip.icon}</div>
              <h4 className="text-white font-bold text-lg mb-2 font-sansitaOne">{tip.title}</h4>
              <p className="text-gray-400 text-sm">{tip.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {Object.entries(ruleCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === key
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-xl scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category.icon}
              <span className="hidden sm:inline">{category.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Tab Content */}
        <motion.div
          key={activeTab}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`bg-gradient-to-br ${ruleCategories[activeTab].color} backdrop-blur-sm rounded-3xl p-8 border ${ruleCategories[activeTab].borderColor} shadow-2xl`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                {ruleCategories[activeTab].icon}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white font-sansitaOne">
                  {ruleCategories[activeTab].title}
                </h3>
                <p className="text-gray-300">Essential guidelines for paintball combat</p>
              </div>
            </div>

            <div className="grid gap-4">
              {ruleCategories[activeTab].items.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 bg-green-500/10 border border-green-500/30 hover:bg-green-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-200 leading-relaxed font-medium">
                      {item.text}
                    </p>
                    <span className="text-xs font-semibold uppercase tracking-wider mt-2 inline-block text-green-400">
                      REQUIRED
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Emergency Procedures */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-700/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-red-500/40 shadow-2xl">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="text-red-400 text-2xl font-bold mb-4 font-sansitaOne flex items-center gap-2">
                  🚨 EMERGENCY PROCEDURES
                  <Target className="w-6 h-6 text-red-400" />
                </h4>
                <div className="space-y-3 text-gray-200">
                  <p className="text-lg leading-relaxed">
                    <strong className="text-red-400">IMMEDIATE STOP:</strong> Raise your hand and call "MEDIC" if injured or equipment malfunction occurs.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-red-400">BATTLEFIELD MARSHALS:</strong> Trained safety personnel monitor all combat activity.
                    Follow their instructions immediately for your safety and others.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-red-400">VIOLATION CONSEQUENCES:</strong> Unsafe behavior results in immediate removal
                    from battlefield without refund. Repeat offenders may be banned from facility.
                  </p>
                </div>

                {/* Emergency Contact */}
                <div className="mt-6 p-4 bg-black/30 rounded-2xl border border-red-500/30">
                  <h5 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                    Emergency & Safety Contact
                    <Shield className="w-5 h-5" />
                  </h5>
                  <p className="text-gray-300">Battlefield Marshal: <span className="text-white font-semibold">On-site at all times</span></p>
                  <p className="text-gray-300">First Aid: <span className="text-white font-semibold">Available immediately</span></p>
                  <p className="text-gray-300">Emergency Services: <span className="text-white font-semibold">Direct line available</span></p>
                </div>
              </div>
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
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="w-8 h-8 text-red-400" />
              <h3 className="text-3xl font-bold mb-4 font-sansitaOne text-white">Ready for Combat?</h3>
              <Flag className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-lg">
              Now that you understand the rules, book your paintball battle session and experience the ultimate combat warfare!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/plan')} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl transform hover:scale-105">
                View Combat Packages
              </button>
            </div>
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
