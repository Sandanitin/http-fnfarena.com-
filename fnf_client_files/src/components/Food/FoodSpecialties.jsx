"use client";
import React from "react";
import { motion } from "framer-motion";
import { Flame, Zap, Trophy, Target, Gamepad2, Crown, Coffee, Clock, Heart, Utensils, Star, Gift } from "lucide-react";

export default function FoodSpecialties() {
  const specialties = [
    {
      icon: Utensils,
      title: "Fresh Kitchen",
      description: "Our chefs prepare delicious meals using fresh ingredients and authentic recipes",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30"
    },
    // {
    //   icon: Clock,
    //   title: "Quick Service",
    //   description: "Fast and efficient food service to minimize your waiting time",
    //   image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    //   color: "from-yellow-500/20 to-orange-500/20",
    //   borderColor: "border-yellow-500/30"
    // },
    {
      icon: Star,
      title: "Special Menu",
      description: "Exclusive dishes and seasonal specialties that make every visit memorable",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    // {
    //   icon: Heart,
    //   title: "Healthy Options",
    //   description: "Nutritious and balanced meal choices for health-conscious diners",
    //   image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    //   color: "from-green-500/20 to-blue-500/20",
    //   borderColor: "border-green-500/30"
    // },
    {
      icon: Coffee,
      title: "Snacks & Beverages",
      description: "Wide variety of snacks, drinks, and refreshments for all tastes",
      image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30"
    }
    // ,{
    //   icon: Gift,
    //   title: "Party Packages",
    //   description: "Special food arrangements for celebrations and group events",
    //   image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    //   color: "from-red-500/20 to-purple-500/20",
    //   borderColor: "border-red-500/30"
    // }
  ];

  return (
    <section className="relative min-h-auto bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/10">
          <defs>
            <pattern id="specialtyPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="2" fill="currentColor"/>
              <circle cx="30" cy="30" r="1" fill="currentColor"/>
              <circle cx="90" cy="90" r="1" fill="currentColor"/>
              <path d="M60,20 L70,40 L90,40 L76,52 L82,72 L60,60 L38,72 L44,52 L30,40 L50,40 Z" fill="currentColor" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#specialtyPattern)"/>
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
            <Utensils className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">Food & Dining</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Delicious <span className="text-red-500">Food</span> Experience
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Enjoy our variety of tasty meals, snacks, and beverages designed to satisfy your appetite
          </p>
        </motion.div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((specialty, index) => {
            const IconComponent = specialty.icon;
            return (
              <motion.div
                key={specialty.title}
                className={`relative group bg-gradient-to-br ${specialty.color} backdrop-blur-sm rounded-2xl overflow-hidden border ${specialty.borderColor} hover:border-red-500/50 transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20">
                  <img
                    src={specialty.image}
                    alt={specialty.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/30 transition-colors">
                    <IconComponent className="w-8 h-8 text-red-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-4 group-hover:text-red-500 transition-colors">
                    {specialty.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed flex-grow">
                    {specialty.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-1 bg-gradient-to-r from-red-500 to-transparent rounded-full" />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
