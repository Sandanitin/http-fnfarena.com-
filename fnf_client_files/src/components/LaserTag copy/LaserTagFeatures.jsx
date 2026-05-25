"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Zap, Shield, Trophy, Clock, ArrowRight, CheckCircle } from "lucide-react";

export default function LaserTagFeatures() {
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Advanced Laser Technology",
      description: "State-of-the-art laser tag equipment with precision targeting and instant hit detection for the ultimate gaming experience.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop&auto=format",
      color: "from-red-500/30 to-red-400/10",
      borderColor: "border-red-500/40",
      benefits: ["Precision Targeting", "Instant Hit Detection", "Professional Equipment"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Combat Modes",
      description: "Experience intense team-based combat scenarios with strategic gameplay and coordinated attacks in our immersive arena.",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop&auto=format",
      color: "from-red-600/30 to-red-400/10",
      borderColor: "border-red-600/40",
      benefits: ["Team Strategy", "Coordinated Attacks", "Group Challenges"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Dynamic Arena",
      description: "Multi-level arena with obstacles, cover points, and strategic positions designed for intense laser tag battles.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format",
      color: "from-red-700/30 to-red-600/10",
      borderColor: "border-red-700/40",
      benefits: ["Multi-Level Design", "Strategic Cover", "Obstacle Course"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety First",
      description: "Comprehensive safety protocols with trained staff supervision and safe laser technology for worry-free gaming.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format",
      color: "from-red-600/30 to-red-700/10",
      borderColor: "border-red-600/40",
      benefits: ["Safe Technology", "Staff Supervision", "Safety Protocols"]
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Scoring System",
      description: "Advanced scoring system with real-time leaderboards, achievements, and performance tracking for competitive play.",
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&auto=format",
      color: "from-red-800/30 to-red-700/10",
      borderColor: "border-red-800/40",
      benefits: ["Real-time Scoring", "Leaderboards", "Achievement System"]
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Sessions",
      description: "Multiple session lengths and game formats to accommodate different group sizes and time preferences.",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop&auto=format",
      color: "from-red-500/30 to-red-600/10",
      borderColor: "border-red-500/40",
      benefits: ["Flexible Timing", "Multiple Formats", "Group Sizes"]
    }
  ];

  return (
    <section className="relative bg-gradient-to-bl from-gray-900 via-gray-800 to-black text-white py-20 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-400/20">
            <defs>
              <pattern id="targetPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="40" cy="40" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="40" cy="40" r="3" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#targetPattern)"/>
          </svg>
        </div>

        <motion.div
          className="absolute top-32 right-32 opacity-10"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-40 h-40 border-4 border-red-400/30 rounded-full flex items-center justify-center">
            <Target className="w-20 h-20 text-red-400/50" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-full px-8 py-4 mb-8">
            <Target className="w-6 h-6 text-red-400" />
            <span className="text-red-400 text-lg font-bold uppercase tracking-wider">
              Combat Features
            </span>
            <Zap className="w-6 h-6 text-red-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
            Ultimate Laser Tag
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-red-400 to-red-500 bg-clip-text font-sansitaOne mb-8">
            Combat Experience
          </h3>
          <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
            Discover our cutting-edge laser tag arena featuring advanced technology, strategic gameplay,
            and immersive combat scenarios designed for the ultimate tactical experience.
          </p>
        </motion.div>

        {/* Features in Alternating Layout */}
        <div className="space-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image Section */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Floating Icon */}
                  <div className="absolute top-6 right-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-white text-2xl font-bold font-sansitaOne">
                      {feature.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-red-400">
                      {feature.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white font-sansitaOne">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-gray-200 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 transform hover:scale-105 shadow-lg">
                  Learn More
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-red-500/30 relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Target className="w-12 h-12 text-red-400" />
                <h3 className="text-4xl font-bold font-sansitaOne text-white">Ready for Combat?</h3>
                <Zap className="w-12 h-12 text-red-400" />
              </div>

              <p className="text-gray-200 text-xl max-w-3xl mx-auto leading-relaxed">
                Experience the ultimate laser tag adventure with cutting-edge technology, strategic gameplay,
                and intense combat scenarios. Book your session today!
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl transform hover:scale-105">
                  <Target className="w-6 h-6" />
                  Book Combat Session
                </button>
                <button className="border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm">
                  View All Features
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
