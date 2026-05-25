"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, Star, ArrowRight, Check, Zap, Crown, Gift, Target, Shield } from "lucide-react";

export default function PaintballPricing() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const packages = [
    {
      id: 1,
      name: "ROOKIE PACK",
      subtitle: "Perfect for Beginners!",
      icon: <Clock className="w-6 h-6" />,
      decorIcon: "🎯",
      price: 299,
      originalPrice: 399,
      duration: "Per Person",
      features: [
        "1 HOUR BATTLE SESSION",
        "100 PAINTBALLS INCLUDED",
        "BASIC SAFETY GEAR",
        "MARKER & MASK RENTAL",
        "BASIC BATTLEFIELD ACCESS",
        "SAFETY BRIEFING"
      ],
      popular: false,
      tier: "basic",
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/40"
    },
    {
      id: 2,
      name: "WARRIOR PACK",
      subtitle: "Most Comprehensive!",
      icon: <Users className="w-6 h-6" />,
      decorIcon: "🏹",
      price: 499,
      originalPrice: 649,
      duration: "Per Person",
      features: [
        "2 HOUR BATTLE SESSION",
        "200 PAINTBALLS INCLUDED",
        "PREMIUM SAFETY GEAR",
        "ADVANCED MARKER RENTAL",
        "ALL BATTLEFIELD ACCESS",
        "TACTICAL BRIEFING",
        "TEAM STRATEGY SESSION",
        "ACTION PHOTOS INCLUDED"
      ],
      popular: true,
      tier: "group",
      color: "from-red-600/20 to-red-700/20",
      borderColor: "border-red-600/40"
    },
    {
      id: 3,
      name: "CHAMPION PACK",
      subtitle: "Ultimate Combat!",
      icon: <Crown className="w-6 h-6" />,
      decorIcon: "🏆",
      price: 799,
      originalPrice: 999,
      duration: "Per Person",
      features: [
        "3 HOUR BATTLE SESSION",
        "UNLIMITED PAINTBALLS",
        "ELITE SAFETY EQUIPMENT",
        "PROFESSIONAL MARKER",
        "VIP BATTLEFIELD ACCESS",
        "PERSONAL COMBAT COACH",
        "VIDEO RECORDING",
        "VICTORY CERTIFICATE",
        "REFRESHMENTS INCLUDED"
      ],
      popular: false,
      tier: "premium",
      color: "from-red-700/20 to-red-800/20",
      borderColor: "border-red-700/40"
    }
  ];

  return (
    <section className="relative bg-gradient-to-bl from-gray-900 via-gray-800 to-black text-white py-20 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* New Pricing Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Currency Symbols Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-400/20">
            <defs>
              <pattern id="currencyPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <text x="50" y="50" textAnchor="middle" className="text-2xl font-bold fill-current">₹</text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#currencyPattern)"/>
          </svg>
        </div>

        {/* Floating Price Tags */}
        <motion.div
          className="absolute top-20 right-20 opacity-10"
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-32 h-20 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded-2xl border-2 border-red-400/30 flex items-center justify-center">
            <span className="text-red-400 text-lg font-bold">BEST DEAL</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-16 opacity-8"
          animate={{ x: [-15, 15, -15], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-full border-2 border-red-500/30 flex items-center justify-center">
            <Gift className="w-8 h-8 text-red-500" />
          </div>
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
              Combat Packages
            </span>
            <Zap className="w-6 h-6 text-red-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
            Choose Your
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-red-400 to-red-500 bg-clip-text font-sansitaOne mb-8">
            Battle Package
          </h3>
          <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
            Select the perfect combat package for your skill level. From rookie battles to champion warfare,
            we have options for every warrior and tactical team formation.
          </p>
        </motion.div>

        {/* Packages Grid - Updated Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className={`relative bg-gradient-to-br ${pkg.color} backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 border ${pkg.borderColor} hover:shadow-3xl ${
                pkg.popular ? 'ring-2 ring-red-400 ring-opacity-50 scale-105' : 'hover:scale-105'
              }`}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Popular Badge - Fixed positioning */}
              {pkg.popular && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase shadow-xl border-2 border-white/30">
                    🔥 MOST POPULAR
                  </div>
                </div>
              )}

              {/* Decorative Icon */}
              <div className="absolute top-6 right-6 text-4xl opacity-20">
                {pkg.decorIcon}
              </div>

              {/* Card Content */}
              <div className={`p-8 flex flex-col h-full ${pkg.popular ? 'pt-12' : ''}`}>
                {/* Header */}
                <div className="text-center space-y-4 mb-6">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      {pkg.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                      <p className="text-sm text-gray-300">{pkg.subtitle}</p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-extrabold text-red-400">
                        ₹{pkg.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ₹{pkg.originalPrice}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{pkg.duration}</p>
                    <div className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                      SAVE ₹{pkg.originalPrice - pkg.price}
                    </div>
                  </div>
                </div>

                {/* Features - Flexible grow */}
                <div className="space-y-3 flex-grow mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-200 leading-relaxed font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Section - Always at bottom */}
                <div className="mt-auto space-y-4">
                  {/* Book Button */}
                  <button
                      onClick={() => navigate('/plan')}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
                    } ${hoveredCard === pkg.id ? 'scale-105 shadow-2xl' : ''}`}
                  >
                    <Zap className="w-5 h-5" />
                    Book This Package
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {/* Additional Info */}
                  <div className="pt-4 border-t border-white/20 text-center">
                    <p className="text-xs text-gray-400">
                      * Group bookings available - Safety gear included for all participants
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Notes */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4 className="text-red-400 text-2xl font-bold mb-6 font-sansitaOne text-center">
            ⚠️ Important Combat Rules
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200">
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">
                <strong className="text-red-400">Age Limits:</strong> Minimum age 12 years. Under 16 requires adult supervision
              </p>
              <p className="text-sm leading-relaxed">
                <strong className="text-red-400">Safety Gear:</strong> Mandatory protective equipment provided and must be worn
              </p>
              <p className="text-sm leading-relaxed">
                <strong className="text-red-400">Battlefield Rules:</strong> No physical contact, follow referee instructions
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">
                <strong className="text-red-400">No Alcohol:</strong> No alcohol consumption before or during battles
              </p>
              <p className="text-sm leading-relaxed">
                <strong className="text-red-400">Group Discounts:</strong> Special rates for teams of 10+ warriors
              </p>
              <p className="text-sm leading-relaxed">
                <strong className="text-red-400">Weather Policy:</strong> Indoor backup arena available during rain
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Features */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center bg-gradient-to-br from-red-500/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">Safety Guaranteed</h4>
            <p className="text-gray-400 text-sm">Professional safety equipment and trained marshals</p>
          </div>

          <div className="text-center bg-gradient-to-br from-red-600/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-red-600/30">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">Extended Combat</h4>
            <p className="text-gray-400 text-sm">Multiple battle scenarios and tactical challenges</p>
          </div>

          <div className="text-center bg-gradient-to-br from-red-700/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-red-700/30">
            <div className="w-16 h-16 bg-gradient-to-br from-red-700 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">Premium Experience</h4>
            <p className="text-gray-400 text-sm">Professional markers, tactical gear, and battlefield access</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
