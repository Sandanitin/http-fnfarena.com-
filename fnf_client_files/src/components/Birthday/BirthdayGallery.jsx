"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Play, Heart, Star, Gift, Users } from "lucide-react";

export default function BirthdayGallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const galleryItems = [
    {
      id: 1,
      type: "image",
      category: "parties",
      title: "Superhero Birthday Bash",
      description: "Amazing superhero themed party with 15 kids",
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1530103862676-de8c9debad1d?w=500&h=300&fit=crop",
      likes: 124,
      age: "8 years old",
    },
    {
      id: 2,
      type: "video",
      category: "activities",
      title: "Go-Kart Birthday Race",
      description: "Epic birthday racing competition",
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
      likes: 89,
      age: "12 years old",
    },
    {
      id: 3,
      type: "image",
      category: "decorations",
      title: "Princess Castle Setup",
      description: "Magical princess themed decorations",
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1464207687429-7505649dae38?w=500&h=300&fit=crop",
      likes: 156,
      age: "6 years old",
    },
    {
      id: 4,
      type: "image",
      category: "parties",
      title: "Gaming Tournament Party",
      description: "Ultimate gaming birthday celebration",
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop",
      likes: 203,
      age: "14 years old",
    },
    {
      id: 5,
      type: "video",
      category: "activities",
      title: "Laser Tag Birthday Battle",
      description: "Intense laser tag birthday showdown",
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
      likes: 167,
      age: "10 years old",
    },
    {
      id: 6,
      type: "image",
      category: "decorations",
      title: "Space Explorer Theme",
      description: "Out-of-this-world space decorations",
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1446776653964-20c1d3a81b06?w=500&h=300&fit=crop",
      likes: 134,
      age: "9 years old",
    },
    {
      id: 7,
      type: "image",
      category: "parties",
      title: "Trampoline Birthday Fun",
      description: "High-energy trampoline party",
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
      likes: 98,
      age: "7 years old",
    },
    {
      id: 8,
      type: "video",
      category: "activities",
      title: "Bowling Birthday Strike",
      description: "Perfect strikes at birthday bowling",
      image:
        "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
      likes: 112,
      age: "11 years old",
    },
  ];

  const categories = [
    { id: "all", label: "All Celebrations", icon: Gift },
    { id: "parties", label: "Party Highlights", icon: Users },
    { id: "activities", label: "Activities", icon: Star },
    { id: "decorations", label: "Decorations", icon: Heart },
  ];

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

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
              id="galleryPattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="50"
                cy="50"
                r="1.5"
                fill="currentColor"
                className="text-red-500"
              />
              <rect
                x="25"
                y="25"
                width="50"
                height="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-white/10"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-red-500/20"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#galleryPattern)" />
        </svg>
      </div>

      {/* Floating Camera Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-24 right-24 text-red-500/10"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Camera className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-32 text-purple-500/10"
          animate={{ rotate: -360, y: [-15, 15, -15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Play className="w-12 h-12" />
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
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Camera className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">
              Birthday Gallery
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Memories That <span className="text-red-500">Last Forever</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our gallery of amazing birthday celebrations. Get inspired
            by the joy, excitement, and unforgettable moments we've helped
            create for families just like yours.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-500/25"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-5 h-5" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
          layout
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-600/20 hover:border-red-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              layout
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-100"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Button for Videos */}
                {item.type === "video" && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </motion.div>
                )}

                {/* Age Badge */}
                <div className="absolute top-3 right-3 bg-red-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {item.age}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{item.likes}</span>
                  </div>
                  <motion.button
                    className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Gallery Stats */}
        <motion.div
          className="bg-gradient-to-r from-red-500/10 via-purple-500/5 to-blue-500/10 rounded-3xl p-8 border border-red-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-500 mb-2">500+</div>
              <div className="text-gray-300">Birthday Parties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500 mb-2">
                10K+
              </div>
              <div className="text-gray-300">Happy Memories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">50+</div>
              <div className="text-gray-300">Unique Themes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">100%</div>
              <div className="text-gray-300">Smiling Faces</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
