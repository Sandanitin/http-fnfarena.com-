"use client";
import React from "react";
import { motion } from "framer-motion";
import { Gift, Users, Clock, Star, Check, Crown, Zap, Heart } from "lucide-react";

export default function BirthdayPackages() {
  const packages = [
    {
      name: "Essential Fun",
      price: "₹2,999",
      duration: "3 Hours",
      guests: "Up to 10",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      icon: Gift,
      features: [
        "3 Activity Choices",
        "Birthday Cake",
        "Soft Drinks",
        "Party Decorations",
        "Dedicated Host",
        "Photo Session"
      ],
      popular: false
    },
    {
      name: "Premium Celebration",
      price: "₹4,999",
      duration: "4 Hours",
      guests: "Up to 15",
      color: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      icon: Crown,
      features: [
        "5 Activity Choices",
        "Custom Birthday Cake",
        "Gourmet Food Menu",
        "Premium Decorations",
        "Personal Party Coordinator",
        "Professional Photography",
        "Party Favors",
        "Special Birthday Surprise"
      ],
      popular: true
    },
    {
      name: "Ultimate Experience",
      price: "₹7,999",
      duration: "6 Hours",
      guests: "Up to 25",
      color: "from-purple-500/20 to-indigo-500/20",
      borderColor: "border-purple-500/30",
      icon: Zap,
      features: [
        "All Activities Access",
        "Multi-tier Custom Cake",
        "Premium Buffet",
        "Luxury Decorations",
        "Event Manager",
        "Videography Package",
        "Exclusive Party Area",
        "Live Entertainment",
        "Personalized Gifts"
      ],
      popular: false
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 800">
          <defs>
            <pattern id="packagePattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.5" fill="currentColor" className="text-red-500"/>
              <rect x="20" y="20" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/10"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#packagePattern)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        {/* Header */}
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
            <Gift className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">Birthday Packages</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Choose Your <span className="text-red-500">Adventure</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we have the perfect package to make your birthday unforgettable.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => {
            const IconComponent = pkg.icon;
            return (
              <motion.div
                key={pkg.name}
                className={`relative p-8 bg-gradient-to-br ${pkg.color} backdrop-blur-sm rounded-3xl border ${pkg.borderColor} hover:scale-105 transition-all duration-300 group overflow-hidden`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <motion.div
                    className="absolute -top-3 -right-3 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
                      "linear-gradient(225deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
                      "linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 100%)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10">
                  {/* Package Icon */}
                  <motion.div
                    className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Package Details */}
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-white mb-4">{pkg.price}</div>

                  {/* Package Info */}
                  <div className="flex items-center gap-4 mb-6 text-gray-300">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{pkg.guests}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {/* <motion.button
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Choose Package
                  </motion.button> */}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-500/10 via-purple-500/5 to-blue-500/10 rounded-2xl p-8 border border-red-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need a <span className="text-red-500">Custom Package?</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Let us create a personalized birthday experience tailored to your specific needs and preferences.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
              Contact Our Event Specialists
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
