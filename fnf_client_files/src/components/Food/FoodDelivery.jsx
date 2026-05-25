"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Smartphone,
  Headphones,
  Wifi,
  Shield,
  Car,
  Target,
  Gamepad2,
  Zap,
  Trophy,
  Users,
  Crosshair,
  Bike,
  Plane,
  Rocket,
  Camera,
  Swords,
  ChefHat,
  Utensils,
  Coffee,
  Pizza,
  IceCream,
  Sparkles
} from "lucide-react";

export default function FoodDelivery() {
  const [activeStation, setActiveStation] = useState(4); // Center station initially

  const deliveryFeatures = [
    {
      icon: MapPin,
      title: "Station-to-Station Delivery",
      description: "Precise delivery to your exact gaming station number",
      stat: "99.9%",
      statLabel: "Accuracy"
    },
    {
      icon: Clock,
      title: "Lightning Speed",
      description: "Average delivery time under 8 minutes",
      stat: "< 8min",
      statLabel: "Delivery Time"
    },
    {
      icon: Smartphone,
      title: "Smart Ordering",
      description: "Order through our gaming-integrated app",
      stat: "24/7",
      statLabel: "Available"
    }
  ];

  const gameIntegrations = [
    {
      icon: Headphones,
      title: "Voice Ordering",
      description: "Order without taking your hands off the controller"
    },
    {
      icon: Wifi,
      title: "In-Game Integration",
      description: "Order directly from supported games"
    },
    {
      icon: Shield,
      title: "Silent Delivery",
      description: "Quiet service that won't disturb your gameplay"
    }
  ];

  // Real gaming activities from the arena
  const gamingActivities = [
    { icon: Car, type: "Karting", active: false },
    { icon: Target, type: "Bowling", active: false },
    { icon: Users, type: "Softplay", active: false },
    { icon: Zap, type: "Trampoline", active: false },
    { icon: Trophy, type: "Your Station", active: true }, // Center station
    { icon: Plane, type: "Zipline", active: false },
    { icon: Bike, type: "Sky Cycle", active: false },
    { icon: Crosshair, type: "Archery", active: false },
    { icon: Swords, type: "Laser Tag", active: false }
  ];

  // Random highlight movement
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStation(Math.floor(Math.random() * 9));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Creative dining features
  const diningFeatures = [
    {
      icon: ChefHat,
      title: "Gamer's Menu",
      description: "Specially crafted meals for extended gaming sessions",
      color: "from-orange-500/20 to-yellow-500/20",
      borderColor: "border-orange-500/30"
    },
    {
      icon: Utensils,
      title: "One-Hand Friendly",
      description: "Foods designed to eat while gaming",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      icon: Coffee,
      title: "Energy Boosters",
      description: "Drinks and snacks to keep you energized",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      icon: Pizza,
      title: "Quick Bites",
      description: "Fast food that doesn't slow you down",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Delivery Path */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 800">
          <defs>
            <pattern id="deliveryGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="currentColor" className="text-red-500"/>
              <path d="M0,50 L100,50 M50,0 L50,100" stroke="currentColor" strokeWidth="0.5" className="text-white/20"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#deliveryGrid)"/>

          {/* Animated delivery route */}
          <motion.path
            d="M100,400 Q300,200 500,400 T900,400"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-red-500/30"
            strokeDasharray="20,10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Floating Gaming Elements */}
        <div className="absolute top-1/4 right-1/4 opacity-10">
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-red-500/30">
            <rect x="20" y="40" width="80" height="40" rx="20" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="35" cy="55" r="4" fill="currentColor"/>
            <circle cx="85" cy="55" r="4" fill="currentColor"/>
            <rect x="50" y="50" width="20" height="10" rx="5" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-24 h-24 border-2 border-red-500/20 rounded-lg"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 right-40 w-16 h-16 bg-red-500/10 rounded-full"
          animate={{ y: [-15, 15, -15], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
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
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">Smart Delivery System</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Never Leave Your <span className="text-red-500">Game</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Revolutionary food delivery system designed specifically for gamers. Order, eat, and continue playing without missing a beat.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Left - Delivery Features */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Precision Delivery Features</h3>

            {deliveryFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="flex items-center gap-6 p-6 bg-gradient-to-r from-red-500/10 to-transparent rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-red-500" />
                  </div>

                  <div className="flex-grow">
                    <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-500">{feature.stat}</div>
                    <div className="text-gray-400 text-sm">{feature.statLabel}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right - Gaming Activities Layout */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/20">
              {/* Gaming Activities Layout */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {gamingActivities.map((activity, i) => {
                  const IconComponent = activity.icon;
                  const isActive = i === activeStation;
                  return (
                    <motion.div
                      key={i}
                      className={`aspect-square rounded-lg border-2 ${
                        isActive
                          ? 'border-red-500 bg-red-500/20'
                          : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                      } flex flex-col items-center justify-center p-2 transition-all duration-300 group`}
                      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Gaming Activity Icon */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                        isActive
                          ? 'bg-red-500/30'
                          : 'bg-gray-600/30 group-hover:bg-gray-500/30'
                      } transition-colors duration-300`}>
                        <IconComponent className={`w-5 h-5 ${
                          isActive ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-300'
                        } transition-colors duration-300`} />
                      </div>

                      {/* Activity Label */}
                      <div className={`text-xs font-medium text-center leading-tight ${
                        isActive ? 'text-red-400' : 'text-gray-500 group-hover:text-gray-400'
                      } transition-colors duration-300`}>
                        {activity.type}
                      </div>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          className="w-2 h-2 bg-red-500 rounded-full mt-1"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center">
                <h4 className="text-white font-bold mb-2">Gaming Arena Layout</h4>
                <p className="text-gray-400 text-sm">Live Activity Tracking</p>
                <p className="text-red-400 text-xs mt-1">● Real-time Station Updates</p>
              </div>

              {/* Delivery Animation */}
              <motion.div
                className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-4 h-4 bg-white rounded-full" />
              </motion.div>

              {/* Delivery Path Indicator */}
              <motion.div
                className="absolute top-full left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Game Integration Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">Gaming Integration</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gameIntegrations.map((integration, index) => {
              const IconComponent = integration.icon;
              return (
                <motion.div
                  key={integration.title}
                  className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-600/20 hover:border-red-500/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-red-500" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">{integration.title}</h4>
                  <p className="text-gray-400">{integration.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Enhanced Creative Dining Experience Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gradient-to-br from-red-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl p-12 border border-red-500/20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <pattern id="diningPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="currentColor" className="text-red-500"/>
                    <path d="M10,20 L30,20 M20,10 L20,30" stroke="currentColor" strokeWidth="0.5" className="text-white/20"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diningPattern)"/>
              </svg>
            </div>

            {/* Floating Food Icons */}
            <motion.div
              className="absolute top-8 right-8 text-orange-500/20"
              animate={{ rotate: 360, y: [-10, 10, -10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Pizza className="w-12 h-12" />
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-8 text-purple-500/20"
              animate={{ rotate: -360, y: [10, -10, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <IceCream className="w-10 h-10" />
            </motion.div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <motion.div
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-purple-500/20 border border-red-500/30 rounded-full px-6 py-3 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Sparkles className="w-5 h-5 text-red-500" />
                  <span className="text-red-400 font-semibold">Ultimate Gaming Dining</span>
                  <Sparkles className="w-5 h-5 text-purple-500" />
                </motion.div>

                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Level Up Your <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">Dining Experience</span>
                </h3>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-12">
                  Immerse yourself in a revolutionary dining experience where every meal is crafted for the ultimate gamer.
                  From energy-boosting snacks to one-handed delicacies, we've redefined food for the digital age.
                </p>
              </div>

              {/* Creative Dining Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {diningFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      className={`relative p-6 bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-2xl border ${feature.borderColor} hover:scale-105 transition-all duration-300 group overflow-hidden`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {/* Animated Background */}
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

                      <div className="relative z-10 text-center">
                        <motion.div
                          className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Interactive CTA Buttons */}
              <div className="text-center">
              

                <motion.p
                  className="text-gray-400 text-sm mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Join over <span className="text-red-400 font-bold">10,000+ gamers</span> who never pause for food
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
