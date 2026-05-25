"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Coffee, Utensils, Cookie } from "lucide-react";
import { IMGUrl } from "../../config/apiConfig";
import { useFood } from "../../Context/FoodContext";

export default function FoodMenu() {
  const { foods, categories, loading, error } = useFood();
  const [activeCategory, setActiveCategory] = useState(null);

  // Auto-select first category
  useEffect(() => {
    if (categories.length && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  const filteredFoods = foods.filter(
    (item) => item.category_id === activeCategory
  );

  const getCategoryIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("power")) return Utensils;
  if (n.includes("quick")) return Cookie;
  if (n.includes("energy")) return Coffee;
  if (n.includes("gamer")) return Zap;
  return Utensils;
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading menu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
            <Utensils className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">
              Gaming Arena Menu
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fuel Your <span className="text-red-500">Victory</span>
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our specially crafted menu designed to keep you energized
            and focused during your gaming sessions
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.name);
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeCategory === category.id
                    ? "bg-red-600 text-white scale-105"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </button>
            );
          })}
        </motion.div>

        {/* Food Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border border-gray-600/20"
            >
             <img
  src={`${IMGUrl}/${item.image}`}
  alt={item.name}
  onError={(e) => (e.currentTarget.src = "/no-food.png")}
  className="w-full h-48 object-cover"
/>

              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {item.description}
                </p>

                <div className="text-center">
                  <span className="text-red-500 font-bold text-xl">
                    ₹{item.offer_price || item.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredFoods.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No items available in this category
          </p>
        )}
      </div>
    </section>
  );
}
