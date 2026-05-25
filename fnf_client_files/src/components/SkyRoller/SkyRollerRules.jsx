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
  Rotate3D,
  Gauge,
  Eye
} from "lucide-react";

export default function SkyRollerRules({ protocols }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("safety");

  // Get Sky Roller protocols data
  const skyRollerProtocols = protocols && protocols.length > 0 ? protocols[0] : null;

  // Map API data to rule categories
  const ruleCategories = React.useMemo(() => {
    if (!skyRollerProtocols) {
      // Fallback data if no API data available
      return {
        safety: {
          icon: Shield,
          title: "Safety Rules",
          color: "from-red-500/20 to-amber-500/20",
          borderColor: "border-red-500/40",
          items: [
            { text: "MANDATORY SAFETY BRIEFING: All participants must attend a comprehensive 20-minute safety briefing covering rotation dynamics and G-force effects." },
            { text: "HEALTH DECLARATION: Complete health declaration required. Participants with motion sickness, vertigo, or heart conditions must provide medical clearance." },
            { text: "WEIGHT & HEIGHT RESTRICTIONS: Minimum weight: 45kg (99lbs), Maximum weight: 110kg (242lbs). Height restrictions: 1.4m - 2.0m for proper harness fit." },
            { text: "WEATHER CONDITIONS: Operations suspended during high winds (>20mph), thunderstorms, or visibility below 500m for safety." }
          ]
        },
        requirements: {
          icon: Users,
          title: "Requirements",
          color: "from-amber-500/20 to-orange-500/20",
          borderColor: "border-amber-500/40",
          items: [
            { text: "AGE REQUIREMENTS: Minimum age: 14 years. Participants under 18 must have parental consent and adult supervision during the experience." },
            { text: "MOTION TOLERANCE: Must be comfortable with spinning motions and G-forces. No history of severe motion sickness or vertigo." },
            { text: "VISION REQUIREMENTS: Adequate vision required (corrective lenses allowed). Must be able to see safety signals and follow visual instructions." },
            { text: "G-FORCE PREPAREDNESS: Participants must understand and be prepared for G-forces up to 3G during the spinning experience." }
          ]
        },
        guidelines: {
          icon: CheckCircle,
          title: "Guidelines",
          color: "from-orange-500/20 to-red-500/20",
          borderColor: "border-orange-500/40",
          items: [
            { text: "Arrive 45 minutes before your scheduled time for extended safety briefing and preparation" },
            { text: "Wear comfortable, fitted clothing that won't become loose during spinning motions" },
            { text: "Secure all loose items including jewelry, glasses, and accessories in provided lockers" },
            { text: "Eat a light meal 2-3 hours before the experience - avoid heavy meals or empty stomach" },
            { text: "Follow breathing techniques demonstrated during safety briefing to manage G-forces" },
            { text: "Keep your head back against the headrest throughout the entire experience" },
            { text: "Signal immediately if you feel unwell using the provided emergency communication system" },
            { text: "Remain calm and follow all instructions from certified operators via radio communication" }
          ]
        },
        restrictions: {
          icon: AlertTriangle,
          title: "Restrictions",
          color: "from-red-500/20 to-amber-500/20",
          borderColor: "border-red-500/40",
          items: [
            { text: "MEDICAL RESTRICTIONS: Pregnancy (any stage), Recent surgeries or injuries (within 6 months), Heart conditions, high blood pressure without clearance" },
            { text: "MOTION RESTRICTIONS: Severe motion sickness or vertigo, Back, neck, or spinal problems, Inner ear disorders or balance issues" },
            { text: "BEHAVIORAL RESTRICTIONS: Recent alcohol consumption (within 12 hours), Claustrophobia or fear of enclosed spaces, Inability to follow safety instructions" },
            { text: "PHYSICAL RESTRICTIONS: Exceeding weight, height, or age limits, Wearing loose clothing or unsecured items, Under the influence of any substances" }
          ]
        }
      };
    }

    // Map API data to categories
    return {
      safety: {
        icon: Shield,
        title: "Safety Rules",
        color: "from-red-500/20 to-amber-500/20",
        borderColor: "border-red-500/40",
        items: skyRollerProtocols.requirements ? skyRollerProtocols.requirements.map(req => ({ text: req })) : []
      },
      requirements: {
        icon: Users,
        title: "Requirements",
        color: "from-amber-500/20 to-orange-500/20",
        borderColor: "border-amber-500/40",
        items: skyRollerProtocols.equipment ? skyRollerProtocols.equipment.map(eq => ({ text: eq })) : []
      },
      guidelines: {
        icon: CheckCircle,
        title: "Guidelines",
        color: "from-orange-500/20 to-red-500/20",
        borderColor: "border-orange-500/40",
        items: skyRollerProtocols.etiquette ? skyRollerProtocols.etiquette.map(et => ({ text: et })) : []
      },
      restrictions: {
        icon: AlertTriangle,
        title: "Restrictions",
        color: "from-red-500/20 to-amber-500/20",
        borderColor: "border-red-500/40",
        items: skyRollerProtocols.rules ? skyRollerProtocols.rules.map(rule => ({ text: rule })) : []
      }
    };
  }, [skyRollerProtocols]);

  const tabs = [
    { id: "safety", label: "Safety Rules", icon: Shield },
    { id: "requirements", label: "Requirements", icon: Users },
    { id: "guidelines", label: "Guidelines", icon: CheckCircle },
    { id: "restrictions", label: "Restrictions", icon: AlertTriangle }
  ];

  const renderTabContent = () => {
    const currentCategory = ruleCategories[activeTab];
    if (!currentCategory) return null;

    return (
      <div className="space-y-4">
        {currentCategory.items.map((item, index) => (
          <motion.div
            key={index}
            className={`flex items-start gap-4 bg-gradient-to-br ${currentCategory.color} backdrop-blur-sm rounded-xl p-4 border ${currentCategory.borderColor}`}
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
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Rotate3D className="w-32 h-32 text-yellow-400" />
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
            <Rotate3D className="w-5 h-5 text-red-400" />
            <span className="text-red-300 font-bold">Sky Roller Safety</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sansitaOne mb-6">
            Sky Roller Rules &
            <span className="block text-transparent bg-gradient-to-r from-red-500 to-red-700 bg-clip-text">
              Safety Guidelines
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the ultimate spinning adventure safely. Please read and understand all rules and guidelines
            before participating in the Sky Roller experience.
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
              Our certified safety team monitors every Sky Roller experience. In case of any emergency or concern,
              immediately signal our safety personnel or use the emergency communication system.
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
