"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Music,
  Camera,
  Utensils,
  Gift,
  Sparkles,
  Heart,
  Star,
  Crown,
  Cake,
  PartyPopper,
  Balloon,
  Check,
  Plus,
} from "lucide-react";

export default function BirthdayCustomization() {
  const [selectedTheme, setSelectedTheme] = useState("superhero");
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const themes = [
    {
      id: "superhero",
      name: "Superhero Adventure",
      description: "Save the day with epic superhero decorations",
      color: "from-red-500/20 to-blue-500/20",
      borderColor: "border-red-500/30",
      icon: Crown,
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: "princess",
      name: "Princess Palace",
      description: "Royal treatment with magical princess themes",
      color: "from-pink-500/20 to-purple-500/20",
      borderColor: "border-pink-500/30",
      icon: Crown,
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    },
    {
      id: "space",
      name: "Space Explorer",
      description: "Blast off to an intergalactic celebration",
      color: "from-blue-500/20 to-purple-500/20",
      borderColor: "border-blue-500/30",
      icon: Star,
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
    },
    {
      id: "jungle",
      name: "Jungle Safari",
      description: "Wild adventures in the birthday jungle",
      color: "from-green-500/20 to-yellow-500/20",
      borderColor: "border-green-500/30",
      icon: Heart,
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    },
    {
      id: "pirate",
      name: "Pirate Treasure",
      description: "Ahoy! Hunt for birthday treasure",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      icon: Gift,
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    },
    {
      id: "unicorn",
      name: "Unicorn Magic",
      description: "Magical unicorn wonderland celebration",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      icon: Sparkles,
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
    },
  ];

  const addOns = [
    {
      id: "photographer",
      name: "Professional Photography",
      description: "Capture every magical moment",
      price: "$150",
      icon: Camera,
      color: "text-blue-500",
    },
    {
      id: "dj",
      name: "DJ & Music",
      description: "Custom playlist and sound system",
      price: "$200",
      icon: Music,
      color: "text-purple-500",
    },
    {
      id: "catering",
      name: "Premium Catering",
      description: "Delicious birthday feast",
      price: "$300",
      icon: Utensils,
      color: "text-green-500",
    },
    {
      id: "decorations",
      name: "Premium Decorations",
      description: "Custom themed decorations",
      price: "$250",
      icon: Balloon,
      color: "text-pink-500",
    },
    {
      id: "cake",
      name: "Custom Birthday Cake",
      description: "Personalized themed cake",
      price: "$100",
      icon: Cake,
      color: "text-orange-500",
    },
    {
      id: "party-favors",
      name: "Party Favor Bags",
      description: "Take-home goodies for guests",
      price: "$75",
      icon: Gift,
      color: "text-red-500",
    },
  ];

  const toggleAddOn = (addOnId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId],
    );
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 1200 800"
        >
          <defs>
            <pattern
              id="customPattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="40"
                cy="40"
                r="2"
                fill="currentColor"
                className="text-purple-500"
              />
              <path
                d="M20,40 L60,40 M40,20 L40,60"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-white/10"
              />
              <circle
                cx="40"
                cy="40"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-purple-500/20"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#customPattern)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-32 right-20 text-purple-500/10"
          animate={{ rotate: 360, scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Palette className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-32 text-pink-500/10"
          animate={{ rotate: -360, y: [-20, 20, -20] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <PartyPopper className="w-16 h-16" />
        </motion.div>
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
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Palette className="w-4 h-4 text-purple-500" />
            <span className="text-purple-500 text-sm font-semibold">
              Customization
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Make It <span className="text-purple-500">Uniquely Yours</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Personalize every detail of your birthday celebration. Choose
            themes, add special services, and create a party that perfectly
            matches your vision.
          </p>
        </motion.div>

        {/* Theme Selection */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Choose Your <span className="text-purple-500">Theme</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme, index) => {
              const IconComponent = theme.icon;
              const isSelected = selectedTheme === theme.id;

              return (
                <motion.div
                  key={theme.id}
                  className={`relative cursor-pointer group ${isSelected ? "ring-2 ring-purple-500" : ""}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedTheme(theme.id)}
                >
                  <div
                    className={`relative p-6 bg-gradient-to-br ${theme.color} backdrop-blur-sm rounded-2xl border ${theme.borderColor} transition-all duration-300 overflow-hidden`}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-20">
                      <img
                        src={theme.image}
                        alt={theme.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        className="absolute top-4 right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}

                    <div className="relative z-10">
                      {/* Theme Icon */}
                      <motion.div
                        className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Theme Details */}
                      <h4 className="text-xl font-bold text-white mb-2">
                        {theme.name}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {theme.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Add-Ons Selection */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Enhance Your <span className="text-purple-500">Experience</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addOn, index) => {
              const IconComponent = addOn.icon;
              const isSelected = selectedAddOns.includes(addOn.id);

              return (
                <motion.div
                  key={addOn.id}
                  className={`relative cursor-pointer group ${isSelected ? "ring-2 ring-purple-500" : ""}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  onClick={() => toggleAddOn(addOn.id)}
                >
                  <div className="relative p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                    {/* Selection Indicator */}
                    <div className="absolute top-4 right-4">
                      {isSelected ? (
                        <motion.div
                          className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      ) : (
                        <div className="w-8 h-8 border-2 border-white/30 rounded-full flex items-center justify-center group-hover:border-purple-500/50 transition-colors duration-300">
                          <Plus className="w-4 h-4 text-white/60" />
                        </div>
                      )}
                    </div>

                    {/* Add-On Icon */}
                    <motion.div
                      className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className={`w-8 h-8 ${addOn.color}`} />
                    </motion.div>

                    {/* Add-On Details */}
                    <h4 className="text-xl font-bold text-white mb-2">
                      {addOn.name}
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {addOn.description}
                    </p>
                    <div className="text-2xl font-bold text-purple-400">
                      {addOn.price}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Customization Summary */}
        <motion.div
          className="bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10 rounded-3xl p-8 border border-purple-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Your <span className="text-purple-500">Custom Package</span>
            </h3>
            <p className="text-gray-300">
              Review your selections and get ready for an amazing celebration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Selected Theme */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-500" />
                Selected Theme
              </h4>
              {selectedTheme && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Crown className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {themes.find((t) => t.id === selectedTheme)?.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {themes.find((t) => t.id === selectedTheme)?.description}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Add-Ons */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-500" />
                Add-Ons ({selectedAddOns.length})
              </h4>
              {selectedAddOns.length > 0 ? (
                <div className="space-y-3">
                  {selectedAddOns.map((addOnId) => {
                    const addOn = addOns.find((a) => a.id === addOnId);
                    const IconComponent = addOn.icon;
                    return (
                      <div
                        key={addOnId}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className={`w-5 h-5 ${addOn.color}`} />
                          <span className="text-white text-sm">
                            {addOn.name}
                          </span>
                        </div>
                        <span className="text-purple-400 font-semibold text-sm">
                          {addOn.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No add-ons selected</p>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center mt-8">
            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 flex items-center gap-3 mx-auto shadow-2xl shadow-purple-500/30"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(147,51,234,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Continue with customized birthday package"
            >
              <Gift className="w-6 h-6" />
              Continue with Custom Package
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
