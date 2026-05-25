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
  Zap
} from "lucide-react";

export default function ZiplineRules({ protocols }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("safety");

  // Get Zipline Roller protocols data
  const ziplineProtocols = protocols && protocols.length > 0 ? protocols[0] : null;

  const tabs = [
    { id: "safety", label: "Safety Rules", icon: Shield },
    { id: "requirements", label: "Requirements", icon: Users },
    { id: "guidelines", label: "Guidelines", icon: CheckCircle },
    { id: "restrictions", label: "Restrictions", icon: AlertTriangle }
  ];

  // Map API data to rule categories
  const ruleCategories = React.useMemo(() => {
    if (!ziplineProtocols) {
      // Fallback data if no API data available
      return {
        safety: {
          icon: Shield,
          title: "Safety Protocols",
          color: "from-red-500/20 to-amber-500/20",
          borderColor: "border-red-500/40",
          items: [
            { text: "MANDATORY SAFETY BRIEFING: All participants must attend safety briefing before the experience." },
            { text: "HEALTH DECLARATION: Complete health declaration form required. Participants with heart conditions must provide medical clearance." },
            { text: "WEIGHT RESTRICTIONS: Minimum weight: 55kg , Maximum weight: 90kg for safety equipment compatibility." },
            { text: "WEATHER CONDITIONS: Operations suspended during high winds (>25mph), thunderstorms, or heavy rain for participant safety." }
          ]
        },
        requirements: {
          icon: Users,
          title: "Age & Physical Requirements",
          color: "from-amber-500/20 to-orange-500/20",
          borderColor: "border-amber-500/40",
          items: [
            { text: "AGE REQUIREMENTS: Minimum age: 12 years. Participants under 18 must have parental consent and supervision." },
            { text: "PHYSICAL FITNESS: Moderate physical fitness required. Ability to climb stairs and follow safety instructions." },
            { text: "PERSONAL ITEMS: Secure all loose items. Provided storage lockers available for personal belongings." },
            { text: "MENTAL PREPAREDNESS: Participants must be mentally prepared for high-altitude adventure and speed." }
          ]
        },
        guidelines: {
          icon: CheckCircle,
          title: "Safety Guidelines",
          color: "from-orange-500/20 to-red-500/20",
          borderColor: "border-orange-500/40",
          items: [
            { text: "Wear comfortable, closed-toe shoes (no sandals or flip-flops)" },
            { text: "Dress appropriately for weather conditions - avoid loose clothing" },
            { text: "Remove all jewelry, watches, and loose accessories before the experience" },
            { text: "Follow all instructions from certified safety instructors at all times" },
            { text: "Do not attempt to take photos or videos during the ride " },
            { text: "Inform staff immediately of any medical conditions or concerns" },
            { text: "Respect other participants and maintain appropriate behavior throughout the experience" }
          ]
        },
        restrictions: {
          icon: AlertTriangle,
          title: "Medical & Behavioral Restrictions",
          color: "from-red-500/20 to-amber-500/20",
          borderColor: "border-red-500/40",
          items: [
            { text: "PREGNANCY: Not permitted at any stage" },
            { text: "RECENT SURGERIES: No participation with recent surgeries or injuries" },
            { text: "HEART CONDITIONS: Medical clearance required for any heart conditions" },
            { text: "FEAR OF HEIGHTS: Not recommended for those with severe fear of heights or claustrophobia" },
            { text: "BACK/NECK PROBLEMS: Not permitted with back or neck problems" },
            { text: "SUBSTANCE USE: No participation after alcohol or substance consumption" }
          ]
        }
      };
    }

    // Map API data to categories
    return {
      safety: {
        icon: Shield,
        title: "Safety Protocols",
        color: "from-red-500/20 to-amber-500/20",
        borderColor: "border-red-500/40",
        items: ziplineProtocols.requirements ? ziplineProtocols.requirements.map(req => ({ text: req })) : []
      },
      requirements: {
        icon: Users,
        title: "Age & Physical Requirements",
        color: "from-amber-500/20 to-orange-500/20",
        borderColor: "border-amber-500/40",
        items: ziplineProtocols.equipment ? ziplineProtocols.equipment.map(eq => ({ text: eq })) : []
      },
      guidelines: {
        icon: CheckCircle,
        title: "Safety Guidelines",
        color: "from-orange-500/20 to-red-500/20",
        borderColor: "border-orange-500/40",
        items: ziplineProtocols.etiquette ? ziplineProtocols.etiquette.map(et => ({ text: et })) : []
      },
      restrictions: {
        icon: AlertTriangle,
        title: "Medical & Behavioral Restrictions",
        color: "from-red-500/20 to-amber-500/20",
        borderColor: "border-red-500/40",
        items: ziplineProtocols.rules ? ziplineProtocols.rules.map(rule => ({ text: rule })) : []
      }
    };
  }, [ziplineProtocols]);

  const safetyRules = [
    {
      icon: Shield,
      title: "Mandatory Safety Briefing",
      description: "All participants must attend safety briefing before the experience.",
      color: "text-white"
    },
    {
      icon: Heart,
      title: "Health Declaration",
      description: "Complete health declaration form required. Participants with heart conditions must provide medical clearance.",
      color: "text-white"
    },
    {
      icon: Scale,
      title: "Weight Restrictions",
      description: "Minimum weight: 55kg, Maximum weight: 90kg for safety equipment compatibility.",
      color: "text-white"
    },
    {
      icon: Wind,
      title: "Weather Conditions",
      description: "Operations suspended during high winds (>25mph), thunderstorms, or heavy rain for participant safety.",
      color: "text-white"
    }
  ];

  const requirements = [
    {
      icon: Users,
      title: "Age Requirements",
      description: "Minimum age: 12 years. Participants under 18 must have parental consent and supervision.",
      allowed: true
    },
    {
      icon: Mountain,
      title: "Physical Fitness",
      description: "Moderate physical fitness required. Ability to climb stairs and follow safety instructions.",
      allowed: true
    },
    {
      icon: Camera,
      title: "Personal Items",
      description: "Secure all loose items. Provided storage lockers available for personal belongings.",
      allowed: true
    },
    {
      icon: Zap,
      title: "Mental Preparedness",
      description: "Participants must be mentally prepared for high-altitude adventure and speed.",
      allowed: true
    }
  ];

  const guidelines = [
    
    "Wear comfortable, closed-toe shoes (no sandals or flip-flops)",
    "Dress appropriately for weather conditions - avoid loose clothing",
    "Remove all jewelry, watches, and loose accessories before the experience",
    "Follow all instructions from certified safety instructors at all times",
    "Do not attempt to take photos or videos during the ride",
    "Inform staff immediately of any medical conditions or concerns",
    "Respect other participants and maintain appropriate behavior throughout the experience"
  ];

  const restrictions = [
    {
      icon: XCircle,
      title: "Medical Restrictions",
      items: [
        "Pregnancy (any stage)",
        "Recent surgeries or injuries",
        "Heart conditions without medical clearance",
        "Severe fear of heights or claustrophobia",
        "Back or neck problems",
        "Recent alcohol or substance consumption"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Behavioral Restrictions",
      items: [
        "Disruptive or inappropriate behavior",
        "Failure to follow safety instructions",
        "Attempting to bring prohibited items",
        "Exceeding weight or age limits",
        "Arriving under the influence of alcohol/drugs"
      ]
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "safety":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyRules.map((rule, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <rule.icon className={`w-6 h-6 ${rule.color}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2 font-sansitaOne">
                      {rule.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {rule.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "requirements":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${req.allowed ? 'from-red-400 to-red-500' : 'from-red-600 to-red-700'} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <req.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2 font-sansitaOne">
                      {req.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {req.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "guidelines":
        return (
          <div className="space-y-4">
            {guidelines.map((guideline, index) => (
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
                  {guideline}
                </p>
              </motion.div>
            ))}
          </div>
        );

      case "restrictions":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {restrictions.map((restriction, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                    <restriction.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl font-sansitaOne">
                    {restriction.title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {restriction.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
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
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <AlertTriangle className="w-32 h-32 text-yellow-400" />
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
            <Shield className="w-5 h-5 text-red-400" />
            <span className="text-red-300 font-bold">Safety First</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sansitaOne mb-6">
            Safety Rules &
            <span className="block text-transparent bg-gradient-to-r from-red-500 to-red-700 bg-clip-text">
              Guidelines
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your safety is our top priority. Please read and understand all rules and guidelines
            before participating in the zipline roller experience.
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
              Our certified safety team is always on standby. In case of any emergency or concern,
              immediately contact our safety personnel or call our emergency hotline.
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
