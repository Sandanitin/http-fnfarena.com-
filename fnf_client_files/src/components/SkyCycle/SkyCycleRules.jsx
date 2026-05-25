"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Users, Clock, Heart, CheckCircle, XCircle, Info } from "lucide-react";

export default function SkyCycleRules({ protocols }) {
  const [activeTab, setActiveTab] = useState('safety');

  // Get Sky Cycle protocols data
  const skyCycleProtocols = protocols && protocols.length > 0 ? protocols[0] : null;

  const tabs = [
    { id: 'safety', label: 'Safety Rules', icon: Shield },
    { id: 'requirements', label: 'Requirements', icon: CheckCircle },
    { id: 'restrictions', label: 'Restrictions', icon: XCircle },
    { id: 'guidelines', label: 'Guidelines', icon: Info }
  ];

  // Map API data to rule categories
  const rulesContent = React.useMemo(() => {
    if (!skyCycleProtocols) {
      // Fallback data if no API data available
      return {
        safety: {
          title: "Safety First - Sky Cycle Rules",
          subtitle: "Your safety is our top priority",
          rules: [
            "All riders must wear provided safety harnesses and helmets at all times",
            "Follow instructor guidance throughout the entire sky cycle experience",
            "Maintain proper seating position and keep hands on handlebars",
            "Do not attempt to stand or make sudden movements while cycling",
            "Report any equipment issues or discomfort immediately to staff",
            "Emergency stop procedures will be explained before the ride",
            "Weather conditions are monitored - rides may be suspended for safety",
            "Professional safety staff monitor all sky cycle activities"
          ]
        },
        requirements: {
          title: "Rider Requirements",
          subtitle: "Please ensure you meet these criteria",
          rules: [
            "Minimum age: 12 years (children 12-16 must be accompanied by adults)",
            "Maximum weight limit: 120 kg per rider",
            "Minimum height: 4.5 feet (137 cm)",
            "Must be in good physical health with no heart conditions",
            "No recent surgeries or injuries that may affect balance",
            "Comfortable with heights and cycling activities",
            "Must sign waiver form (parent/guardian signature for minors)",
            "Valid ID required for age verification"
          ]
        },
        restrictions: {
          title: "Activity Restrictions",
          subtitle: "For everyone's safety and enjoyment",
          rules: [
            "Pregnant women are not permitted on sky cycle rides",
            "No loose clothing, jewelry, or accessories that may get caught",
            "Closed-toe shoes required - no sandals or flip-flops",
            "No personal cameras or phones during the ride (professional photos available)",
            "No food or drinks allowed on the sky cycle platform",
            "Riders under the influence of alcohol or drugs will be denied access",
            "No smoking anywhere on the sky cycle facility",
            "Service animals only - no pets allowed on the ride"
          ]
        },
        guidelines: {
          title: "General Guidelines",
          subtitle: "Make the most of your sky cycle experience",
          rules: [
      
            "Wear comfortable, weather-appropriate clothing",
            "Listen carefully to the safety briefing - ask questions if unclear",
            "Follow the designated paths and stay with your group",
            "Respect other riders and maintain appropriate spacing",
            "Photography is available through our professional service",
            "Lockers are provided for personal belongings",
            "Enjoy the experience and take in the amazing views!"
          ]
        }
      };
    }

    // Map API data to categories
    return {
      safety: {
        title: "Safety First - Sky Cycle Rules",
        subtitle: "Your safety is our top priority",
        rules: skyCycleProtocols.requirements ? skyCycleProtocols.requirements.map(req => req) : []
      },
      requirements: {
        title: "Rider Requirements",
        subtitle: "Please ensure you meet these criteria",
        rules: skyCycleProtocols.equipment ? skyCycleProtocols.equipment.map(eq => eq) : []
      },
      restrictions: {
        title: "Activity Restrictions",
        subtitle: "For everyone's safety and enjoyment",
        rules: skyCycleProtocols.etiquette ? skyCycleProtocols.etiquette.map(et => et) : []
      },
      guidelines: {
        title: "General Guidelines",
        subtitle: "Make the most of your sky cycle experience",
        rules: skyCycleProtocols.rules ? skyCycleProtocols.rules.map(rule => rule) : []
      }
    };
  }, [skyCycleProtocols]);

  const currentContent = rulesContent[activeTab];

  return (
    <section id="skycycle-rules" className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>

        {/* Safety Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-red-400">
            <defs>
              <pattern id="safetyPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#safetyPattern)"/>
          </svg>
        </div>
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
            className="inline-flex items-center gap-3 bg-red-600/20 border border-red-600/30 rounded-full px-8 py-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AlertTriangle className="w-6 h-6 text-red-600" aria-hidden="true" />
            <span className="text-red-300 font-bold text-lg">Important Information</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sansitaOne leading-tight mb-6">
            Sky Cycle
            <span className="block text-red-600">Safety & Rules</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Please read and understand all safety rules and guidelines before your sky cycle adventure.
            Your safety and enjoyment are our top priorities.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
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
                  ? 'bg-red-600 text-white shadow-lg scale-105'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Rules Content */}
        <motion.div
          key={activeTab}
          className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm rounded-3xl p-8 border-2 border-red-600/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white font-sansitaOne mb-2">
              {currentContent.title}
            </h3>
            <p className="text-red-400 text-lg font-medium">
              {currentContent.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentContent.rules.map((rule, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-900/30 rounded-xl border border-gray-700/50 hover:border-red-600/30 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {rule}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact Info */}
        <motion.div
          className="mt-12 bg-red-600/10 backdrop-blur-sm rounded-3xl p-8 border border-red-400/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-red-500 font-bold text-lg">Emergency & Support</span>
              <Heart className="w-6 h-6 text-red-500" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 font-sansitaOne">
              Need Help or Have Questions?
            </h3>

            <div className=" gap-6 text-center">
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our certified safety team monitors every Sky Roller experience. In case of any emergency or concern,
              immediately signal our safety personnel or use the emergency communication system.
            </p>
            </div>

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
