"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Star, ArrowRight, Check } from "lucide-react";

export default function LaserTagPricing() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const packages = [
    {
      id: 1,
      name: "COMBAT STARTER",
      subtitle: "Perfect for Beginners!",
      icon: <Clock className="w-6 h-6" />,
      price: 899,
      originalPrice: 1199,
      duration: "Per Person",
      features: [
        "LASER TAG (15 MINS)",
        "BASIC EQUIPMENT",
        "SOLO DEATHMATCH MODE",
        "SAFETY BRIEFING",
        "BASIC SCORING SYSTEM"
      ],
      popular: false,
      tier: "basic"
    },
    {
      id: 2,
      name: "TACTICAL WARRIOR",
      subtitle: "Most Comprehensive!",
      icon: <Users className="w-6 h-6" />,
      price: 1499,
      originalPrice: 1999,
      duration: "Per Person",
      features: [
        "LASER TAG (30 MINS)",
        "PREMIUM EQUIPMENT",
        "TEAM DEATHMATCH MODE",
        "ADVANCED SCORING & STATS",
        "STRATEGY BRIEFING",
        "PHOTO SESSION",
        "REFRESHMENTS INCLUDED"
      ],
      popular: true,
      tier: "group"
    },
    {
      id: 3,
      name: "ELITE COMMANDO",
      subtitle: "Ultimate Combat Experience!",
      icon: <Star className="w-6 h-6" />,
      price: 2199,
      originalPrice: 2899,
      duration: "Per Person",
      features: [
        "LASER TAG (45 MINS)",
        "ELITE EQUIPMENT PACKAGE",
        "ALL GAME MODES",
        "PERSONAL PERFORMANCE ANALYTICS",
        "PROFESSIONAL COACHING",
        "VICTORY CELEBRATION",
        "PREMIUM REFRESHMENTS",
        "EXCLUSIVE ARENA ACCESS"
      ],
      popular: false,
      tier: "premium"
    }
  ];

  return (
    <section id="LaserTagPricing" className="relative bg-[#1e2125] text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* Pricing Background Illustrations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Money/Value Symbols */}
        <div className="absolute top-16 right-16 opacity-5">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-green-500/20">
            <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="3"/>
            <text x="40" y="50" textAnchor="middle" className="text-2xl font-bold fill-current">₹</text>
          </svg>
        </div>

        {/* Combat Package Icons */}
        <div className="absolute bottom-20 left-20 opacity-8">
          <svg width="100" height="60" viewBox="0 0 100 60" className="text-white/10">
            <rect x="10" y="20" width="80" height="30" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="20" y="10" width="60" height="40" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="50" cy="30" r="8" fill="currentColor"/>
          </svg>
        </div>

        {/* Target Rating Pattern */}
        <div className="absolute top-1/3 left-10 opacity-6">
          <svg width="120" height="30" viewBox="0 0 120 30" className="text-red-500/20">
            {[...Array(5)].map((_, i) => (
              <circle
                key={i}
                cx={12 + i*24}
                cy={15}
                r={8}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        {/* Clock/Time Pattern */}
        <div className="absolute top-2/3 right-1/4 opacity-5">
          <svg width="60" height="60" viewBox="0 0 60 60" className="text-blue-500/20">
            <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="3"/>
            <line x1="30" y1="30" x2="30" y2="15" stroke="currentColor" strokeWidth="2"/>
            <line x1="30" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>

        {/* Laser Tag Package Elements */}
        <div className="absolute bottom-1/3 right-1/3 opacity-8">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-red-500/15">
            <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="40" cy="40" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
            <line x1="10" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="1"/>
            <line x1="40" y1="10" x2="40" y2="70" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        {/* Decorative Pricing Lines */}
        <div className="absolute top-0 left-0 right-0 h-full opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/10">
            <defs>
              <pattern id="pricePattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="2" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pricePattern)"/>
          </svg>
        </div>
      </div>

      {/* Checker Pattern Border Top */}
      <div className="absolute left-0 right-0 top-2 h-6" aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.95) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.95) 75%, rgba(255,255,255,0.95)),
            linear-gradient(45deg, rgba(255,255,255,0.95) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.95) 75%, rgba(255,255,255,0.95)),
            linear-gradient(180deg,#b92a2a,#d94b4b)
          `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          transform: "translateY(-8px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
        }}
      />

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
              Laser Tag Packages
            </span>
          </div>
          <h2 className="text-white text-[28px] md:text-[32px] font-sansitaOne mb-2">
            Choose Your Combat Experience
          </h2>
          <h3 className="text-red-500 font-extrabold text-[36px] md:text-[42px] mt-1 font-sansitaOne mb-6">
            Target the Best Deal
          </h3>
          <p className="text-white mt-4 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            From casual battles to elite combat experiences, find the perfect laser tag package
            that includes premium equipment, strategic gameplay, and unforgettable action.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className={`relative bg-[#606265] rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl border-2 flex flex-col ${
                hoveredCard === pkg.id ? 'border-red-500' : 'border-gray-200'
              }`}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ height: '640px' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                background: "linear-gradient(135deg, #606265 0%, #888a8c 100%)",
                transition: { duration: 0.3 },
              }}
            >

              {/* Header */}
              <div className="p-6 text-white relative">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    {pkg.icon}
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-4">{pkg.subtitle}</p>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-extrabold">₹{pkg.price}</span>
                      <span className="text-lg text-gray-300 line-through">₹{pkg.originalPrice}</span>
                    </div>
                    <p className="text-xs opacity-75 mb-2">{pkg.duration}</p>
                    <div className="inline-block bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                      SAVE ₹{pkg.originalPrice - pkg.price}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="px-6 text-white flex-grow flex flex-col">
                <div style={{ height: '280px' }} className="overflow-y-auto">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm leading-relaxed font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book Now Button - Always at bottom */}
                <div className="pt-6 pb-6">
                  <button
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 hover:shadow-lg transform transition-all duration-200 flex items-center justify-center gap-2 ${
                      hoveredCard === pkg.id ? 'scale-105' : ''
                    }`}
                  >
                    Book This Package
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Additional Info */}
                  <div className="mt-4 pt-4 border-t border-gray-400">
                    <p className="text-xs text-gray-300 text-center">
                      * Group bookings available - Age restrictions apply
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
