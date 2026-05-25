"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Star, Baby, Zap, Shield, ArrowRight, Users, Clock } from "lucide-react";

export default function SoftplayTrampolineBullridePricing() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const pricingPlans = [
    {
      id: "family",
      name: "FAMILY FUN PACK",
      subtitle: "Perfect for Families!",
      icon: <Baby className="w-6 h-6" />,
      price: 899,
      originalPrice: 1199,
      duration: "Per Family (4 People)",
      features: [
        "SOFTPLAY ACCESS (2 Hours)",
        "TRAMPOLINE SESSION (30 Minutes)",
        "FAMILY SUPERVISION AREA",
        "SAFETY EQUIPMENT INCLUDED",
        "REFRESHMENTS FOR KIDS"
      ],
      popular: false,
      tier: "basic"
    },
    {
      id: "adventure",
      name: "ADVENTURE PACK",
      subtitle: "Most Popular Choice!",
      icon: <Zap className="w-6 h-6" />,
      price: 1299,
      originalPrice: 1699,
      duration: "Per Family (4 People)",
      features: [
        "SOFTPLAY ACCESS (3 Hours)",
        "TRAMPOLINE SESSION (45 Minutes)",
        "BULL RIDE EXPERIENCE (2 Attempts)",
        "BIRTHDAY PARTY SETUP OPTION",
        "FOOD & BEVERAGES INCLUDED",
        "PHOTO OPPORTUNITIES"
      ],
      popular: true,
      tier: "group"
    },
    {
      id: "ultimate",
      name: "ULTIMATE PLAY PACK",
      subtitle: "All-Day Entertainment!",
      icon: <Shield className="w-6 h-6" />,
      price: 1799,
      originalPrice: 2399,
      duration: "Per Family (6 People)",
      features: [
        "ALL-DAY SOFTPLAY ACCESS",
        "UNLIMITED TRAMPOLINE TIME",
        "BULL RIDE EXPERIENCE (5 Attempts)",
        "PRIVATE PARTY AREA",
        "FULL MEAL & SNACKS INCLUDED",
        "DEDICATED HOST ASSISTANCE",
        "PROFESSIONAL PHOTOS INCLUDED"
      ],
      popular: false,
      tier: "premium"
    }
  ];

  return (
    <section id='SoftplayTrampolineBullridePricing' className="relative bg-[#1e2125] text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* Pricing Background Illustrations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Playground Elements */}
        <div className="absolute top-16 right-16 opacity-5">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-red-500/20">
            <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="3"/>
            <circle cx="40" cy="40" r="8" fill="currentColor"/>
            <circle cx="30" cy="30" r="3" fill="currentColor"/>
            <circle cx="50" cy="30" r="3" fill="currentColor"/>
            <circle cx="30" cy="50" r="3" fill="currentColor"/>
            <circle cx="50" cy="50" r="3" fill="currentColor"/>
          </svg>
        </div>

        {/* Trampoline Springs */}
        <div className="absolute bottom-20 left-20 opacity-8">
          <svg width="100" height="60" viewBox="0 0 100 60" className="text-white/10">
            <path d="M10 30 Q30 10 50 30 T90 30" stroke="currentColor" strokeWidth="3" fill="none"/>
            <circle cx="20" cy="30" r="3" fill="currentColor"/>
            <circle cx="40" cy="30" r="3" fill="currentColor"/>
            <circle cx="60" cy="30" r="3" fill="currentColor"/>
            <circle cx="80" cy="30" r="3" fill="currentColor"/>
          </svg>
        </div>

        {/* Star Rating Pattern */}
        <div className="absolute top-1/3 left-10 opacity-6">
          <svg width="120" height="30" viewBox="0 0 120 30" className="text-yellow-500/20">
            {[...Array(5)].map((_, i) => (
              <polygon
                key={i}
                points={`${12 + i*24},5 ${14 + i*24},11 ${20 + i*24},11 ${16 + i*24},15 ${18 + i*24},21 ${12 + i*24},17 ${6 + i*24},21 ${8 + i*24},15 ${4 + i*24},11 ${10 + i*24},11`}
                fill="currentColor"
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

        {/* Family Fun Elements */}
        <div className="absolute bottom-1/3 right-1/3 opacity-8">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-red-500/15">
            <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="30" cy="35" r="5" fill="currentColor"/>
            <circle cx="50" cy="35" r="5" fill="currentColor"/>
            <path d="M25 50 Q40 60 55 50" stroke="currentColor" strokeWidth="3" fill="none"/>
          </svg>
        </div>

        {/* Decorative Play Lines */}
        <div className="absolute top-0 left-0 right-0 h-full opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/10">
            <defs>
              <pattern id="playPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="2" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#playPattern)"/>
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
              Family Packages
            </span>
          </div>
          <h2 className="text-white text-[28px] md:text-[32px] font-sansitaOne mb-2">
            Choose Your Family Adventure
          </h2>
          <h3 className="text-red-500 font-extrabold text-[36px] md:text-[42px] mt-1 font-sansitaOne mb-6">
            PLAY PRICING
          </h3>
          <p className="text-white mt-4 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            From softplay fun to trampoline excitement and bull ride thrills.
            Choose the perfect package for your family's ultimate entertainment experience.
          </p>
        </motion.div>

        {/* Individual Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-[#606265] rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl border-2 flex flex-col ${
                hoveredCard === plan.id ? 'border-red-500' : 'border-gray-200'
              } ${plan.popular ? 'ring-2 ring-red-500/50' : ''}`}
              onMouseEnter={() => setHoveredCard(plan.id)}
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
                    {plan.icon}
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-4">{plan.subtitle}</p>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-extrabold">₹{plan.price}</span>
                      <span className="text-lg text-gray-300 line-through">₹{plan.originalPrice}</span>
                    </div>
                    <p className="text-xs opacity-75 mb-2">{plan.duration}</p>
                    <div className="inline-block bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                      SAVE ₹{plan.originalPrice - plan.price}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="px-6 text-white flex-grow flex flex-col">
                <div style={{ height: '280px' }} className="overflow-y-auto">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
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
                    onClick={() => navigate('/Contact')}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 hover:shadow-lg transform transition-all duration-200 flex items-center justify-center gap-2 ${
                      hoveredCard === plan.id ? 'scale-105' : ''
                    }`}
                  >
                    Book This Package
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Additional Info */}
                  <div className="mt-4 pt-4 border-t border-gray-400">
                    <p className="text-xs text-gray-300 text-center">
                      * Family packages - Age restrictions apply
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Notes Section */}
        <motion.div
          className="bg-gradient-to-r from-red-500/10 via-red-500/20 to-red-500/10 rounded-2xl p-8 border border-red-500/20 mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-sansitaOne">
              Important Information
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Please read these important notes before booking your family package
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span>Softplay area: Ages 2-12 years with adult supervision</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span>Trampoline zone: Ages 6+ (Under 12 with adult supervision)</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span>Bull ride: Ages 12+ (Weight: 40-120kg)</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span>All safety equipment provided</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span>Trained staff supervision included</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span>Advance booking recommended for weekends</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's Included Section */}
        <motion.div
          className="bg-gradient-to-r from-yellow-500/10 via-yellow-500/20 to-yellow-500/10 rounded-2xl p-8 border border-yellow-500/20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-sansitaOne">
              What's Included
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Every package includes access to our premium family entertainment facilities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Baby className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Softplay</h4>
              <p className="text-gray-400 text-sm">Safe play areas</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Trampolines</h4>
              <p className="text-gray-400 text-sm">Bouncing fun</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Bull Ride</h4>
              <p className="text-gray-400 text-sm">Thrilling experience</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Family Areas</h4>
              <p className="text-gray-400 text-sm">Relaxation zones</p>
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
