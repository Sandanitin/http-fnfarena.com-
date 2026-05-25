"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, Users, Gift, Shield, Truck, Headphones } from "lucide-react";

export default function FoodExperience({foodHeroRef}) {
  const scrollToFoodHero = () => {
    foodHeroRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  const features = [
    {
      icon: Clock,
      title: "Quick Service",
      description: "Fast delivery to your gaming station"
    },
    {
      icon: Users,
      title: "Group Orders",
      description: "Perfect for team gaming sessions"
    },
    {
      icon: Gift,
      title: "Loyalty Rewards",
      description: "Earn points with every order"
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Fresh ingredients, premium quality"
    },
    {
      icon: Truck,
      title: "Station Delivery",
      description: "Direct to your gaming setup"
    },
    {
      icon: Headphones,
      title: "Gaming Focused",
      description: "Designed for uninterrupted play"
    }
  ];

  return (
    
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-full">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop"
            alt="Gaming arena dining experience"
            loading="lazy"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a1d21]/50 to-[#1a1d21]" />
        </div>

        {/* Gaming Food Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/20">
            <defs>
              <pattern id="experiencePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="currentColor"/>
                <circle cx="25" cy="25" r="1" fill="currentColor"/>
                <circle cx="75" cy="75" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#experiencePattern)"/>
          </svg>
        </div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border-2 border-red-500/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 right-40 w-16 h-16 bg-red-500/10 transform rotate-45"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Shield className="w-4 h-4 text-red-500" />
                <span className="text-red-500 text-sm font-semibold">Premium Experience</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-sansitaOne leading-tight">
                Gaming Arena
                <span className="block text-red-500">Food Experience</span>
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                Experience seamless dining designed specifically for gamers. Our service ensures you never have to pause your game for great food.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              
              <button  onClick={scrollToFoodHero}
              className="border-2 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                View Menu
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=600&fit=crop"
                  alt="Gaming arena food experience"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating Stats */}
              <motion.div
                className="absolute -top-4 -right-4 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-white font-semibold text-sm">5000+</div>
                <div className="text-red-500 text-xs">Happy Gamers</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <div className="text-white font-semibold text-sm">4.9★</div>
                <div className="text-red-500 text-xs">Rating</div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-6 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="text-white font-semibold text-sm">24/7</div>
                <div className="text-red-500 text-xs">Service</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
