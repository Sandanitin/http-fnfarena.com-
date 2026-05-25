"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Heart,
  Scale,
  Wind,
  Mountain,
  Camera,
  Zap,
  Rocket,
  ArrowUp,
  Timer,
  Activity
} from "lucide-react";

export default function RocketEjectionRules({ protocols }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requirements");

  // Get Rocker Ejection protocols data
  const rockerEjectionProtocols = protocols && protocols.length > 0 ? protocols[0] : null;

  // Map API data to rule categories
  const ruleCategories = React.useMemo(() => {
    if (!rockerEjectionProtocols) {
      // Fallback data if no API data available
      return {
        requirements: {
          icon: <Users className="w-6 h-6" />,
          title: "Age & Physical Requirements",
          color: "from-red-500/20 to-red-400/20",
          borderColor: "border-red-500/40",
          items: [
            { text: "MINIMUM AGE: 16 YEARS - Must have parental consent if under 18" },
            { text: "WEIGHT LIMITS: 50kg - 100kg (110-220 lbs) for proper ejection seat fit" },
            { text: "HEIGHT REQUIREMENTS: 1.5m - 1.95m for safety harness compatibility" },
            { text: "PHYSICAL FITNESS: Good health condition required for G-force tolerance" }
          ]
        },
        equipment: {
          icon: <Shield className="w-6 h-6" />,
          title: "Safety Protocols & Equipment",
          color: "from-red-600/20 to-red-400/20",
          borderColor: "border-red-600/40",
          items: [
            { text: "MANDATORY SAFETY BRIEFING: 25-minute comprehensive training required" },
            { text: "MILITARY-GRADE EQUIPMENT: Professional ejection seats and safety systems" },
            { text: "EMERGENCY PROTOCOLS: Immediate abort systems and trained safety personnel" },
            { text: "HEALTH DECLARATION: Medical clearance required for certain conditions" }
          ]
        },
        etiquette: {
          icon: <Activity className="w-6 h-6" />,
          title: "Preparation & Conduct",
          color: "from-red-700/20 to-red-600/20",
          borderColor: "border-red-700/40",
          items: [
            { text: "ARRIVE EARLY: 60 minutes before scheduled time for preparation" },
            { text: "PROPER ATTIRE: Fitted clothing, closed shoes, no loose items" },
            { text: "FOLLOW INSTRUCTIONS: Immediate compliance with operator commands" },
            { text: "STAY CALM: Maintain composure during high-stress ejection sequence" }
          ]
        },
        rules: {
          icon: <Rocket className="w-6 h-6" />,
          title: "Ejection Rules & Restrictions",
          color: "from-red-500/20 to-red-400/20",
          borderColor: "border-red-500/40",
          items: [
            { text: "NO MEDICAL CONDITIONS: Heart problems, pregnancy, recent surgeries prohibited" },
            { text: "WEATHER DEPENDENT: Operations suspended in adverse conditions" },
            { text: "REACTION TIME TEST: Must pass assessment before ejection" },
            { text: "ZERO TOLERANCE: No alcohol, drugs, or disruptive behavior" }
          ]
        }
      };
    }

    // Map API data to categories
    return {
      requirements: {
        icon: <Users className="w-6 h-6" />,
        title: "Age & Physical Requirements",
        color: "from-red-500/20 to-red-400/20",
        borderColor: "border-red-500/40",
        items: rockerEjectionProtocols.requirements ? rockerEjectionProtocols.requirements.map(req => ({ text: req })) : []
      },
      equipment: {
        icon: <Shield className="w-6 h-6" />,
        title: "Safety Protocols & Equipment",
        color: "from-red-600/20 to-red-400/20",
        borderColor: "border-red-600/40",
        items: rockerEjectionProtocols.equipment ? rockerEjectionProtocols.equipment.map(eq => ({ text: eq })) : []
      },
      etiquette: {
        icon: <Activity className="w-6 h-6" />,
        title: "Preparation & Conduct",
        color: "from-red-700/20 to-red-600/20",
        borderColor: "border-red-700/40",
        items: rockerEjectionProtocols.etiquette ? rockerEjectionProtocols.etiquette.map(et => ({ text: et })) : []
      },
      rules: {
        icon: <Rocket className="w-6 h-6" />,
        title: "Ejection Rules & Restrictions",
        color: "from-red-500/20 to-red-400/20",
        borderColor: "border-red-500/40",
        items: rockerEjectionProtocols.rules ? rockerEjectionProtocols.rules.map(rule => ({ text: rule })) : []
      }
    };
  }, [rockerEjectionProtocols]);

  const tabs = [
    { id: "requirements", label: "Requirements", icon: Users },
    { id: "equipment", label: "Safety", icon: Shield },
    { id: "etiquette", label: "Preparation", icon: Activity },
    { id: "rules", label: "Rules", icon: Rocket }
  ];

  const renderTabContent = () => {
    const currentCategory = ruleCategories[activeTab];
    if (!currentCategory || !currentCategory.items || currentCategory.items.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No rules available for this category.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {currentCategory.items.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-4 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <p className="text-gray-300 leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Safety Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-300/20">
            <defs>
              <pattern id="safetyGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="25" cy="25" r="3" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#safetyGrid)"/>
          </svg>
        </div>

        {/* Warning Symbols */}
        <motion.div
          className="absolute top-20 right-20 opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Rocket className="w-32 h-32 text-yellow-400" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-full px-6 py-3 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-5 h-5 text-red-400" />
            <span className="text-red-300 font-bold">Rocket Ejection Safety</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sansitaOne mb-6">
            Rocket Ejection Rules &
            <span className="block text-transparent bg-gradient-to-r from-red-500 to-red-700 bg-clip-text">
              Safety Guidelines
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the ultimate ejection thrill safely. Please read and understand all rules and guidelines
            before participating in the Rocket Ejection experience.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          className="min-h-auto"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderTabContent()}
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl p-8 border border-red-400/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <span className="text-red-400 font-bold text-lg">Emergency Information</span>
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-sansitaOne">
              Safety is Our Priority
            </h3>

            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our certified safety team monitors every Rocket Ejection experience. In case of any emergency or concern,
              immediately signal our safety personnel or use the emergency abort system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-white font-bold text-lg">Safety Team</div>
                <div className="text-orange-400 font-bold text-xl">Available 24/7</div>
              </div>
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