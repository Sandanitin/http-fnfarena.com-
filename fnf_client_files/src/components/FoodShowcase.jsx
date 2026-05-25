"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  UtensilsCrossed,
  ChefHat,
  Star,
  Clock,
  Leaf,
  Flame,
  Wine,
  Pizza,
  Soup,
  ArrowRight,
  Heart,
  Award,
  Users,
  Camera,
  Play
} from "lucide-react";

export default function FoodShowcase() {
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuCategories = {
    breakfast: {
      title: "Day Starter",
      subtitle: "All Day Breakfast",
      icon: <Coffee className="w-6 h-6" />,
      color: "from-orange-500/20 to-yellow-500/20",
      borderColor: "border-orange-500/40",
      items: [
        { name: "Fresh Fruit Platter", price: 179, description: "Seasonal fresh fruits beautifully arranged", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop" },
        { name: "Cinnamon French Toast", price: 179, description: "Golden toast with cinnamon and maple syrup", image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=300&h=200&fit=crop" },
        { name: "Classic Waffle", price: 179, description: "Crispy waffle with butter and honey", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300&h=200&fit=crop" },
        { name: "Nutella Waffle", price: 199, description: "Waffle topped with Nutella and fresh berries", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300&h=200&fit=crop&sat=50" },
        { name: "Classic Pancake", price: 179, description: "Fluffy pancakes with maple syrup", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop" },
        { name: "Banoffee Pancake", price: 199, description: "Pancakes with banana and toffee sauce", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop&hue=30" }
      ]
    },
    appetizers: {
      title: "Appetizers",
      subtitle: "Start Your Journey",
      icon: <UtensilsCrossed className="w-6 h-6" />,
      color: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-500/40",
      items: [
        { name: "Honey Chilly Potato", price: 279, description: "Crispy potato with honey chili glaze", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop" },
        { name: "Crispy Corn Kernel", price: 319, description: "Golden corn kernels with spices", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=200&fit=crop" },
        { name: "Chilly Paneer", price: 359, description: "Indo-Chinese paneer with bell peppers", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop" },
        { name: "Pepper Chicken", price: 419, description: "Spicy chicken with black pepper", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop" },
        { name: "Chicken 65", price: 419, description: "South Indian spicy chicken starter", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop" },
        { name: "Prawn Tempura", price: 469, description: "Light and crispy battered prawns", image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=300&h=200&fit=crop" }
      ]
    },
    mains: {
      title: "Main Mission",
      subtitle: "Indian Mains",
      icon: <ChefHat className="w-6 h-6" />,
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/40",
      items: [
        { name: "Paneer Butter Masala", price: 349, description: "Rich and creamy paneer curry", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop&hue=60" },
        { name: "Butter Chicken", price: 399, description: "Tender chicken in tomato cream sauce", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop&hue=15" },
        { name: "Chicken Tikka Masala", price: 399, description: "Grilled chicken in spiced curry", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop&hue=30" },
        { name: "Dal Tadka", price: 299, description: "Yellow lentils with aromatic tempering", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop" },
        { name: "Prawn Masala", price: 449, description: "Coastal style prawn curry", image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=300&h=200&fit=crop&hue=15" },
        { name: "Lamb Masala", price: 549, description: "Tender lamb in rich spiced gravy", image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop" }
      ]
    },
    beverages: {
      title: "Potion Station",
      subtitle: "Refreshing Drinks",
      icon: <Wine className="w-6 h-6" />,
      color: "from-blue-500/20 to-purple-500/20",
      borderColor: "border-blue-500/40",
      items: [
        { name: "Virgin Mojito", price: 179, description: "Fresh mint and lime refresher", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=200&fit=crop" },
        { name: "Berry Blast", price: 199, description: "Mixed berry signature mocktail", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop" },
        { name: "Oreo Thickshake", price: 229, description: "Creamy shake with Oreo cookies", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop" },
        { name: "Cappuccino", price: 189, description: "Perfect espresso with steamed milk", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop" },
        { name: "Cold Pressed Orange", price: 229, description: "Fresh orange juice", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop" },
        { name: "Classic Hot Chocolate", price: 229, description: "Rich and creamy hot chocolate", image: "https://images.unsplash.com/photo-1542990253-0b8cddba9caa?w=300&h=200&fit=crop" }
      ]
    }
  };

  const featuredDishes = [
    {
      name: "Special English Breakfast",
      price: 349,
      description: "Complete meal with 2 eggs, chicken sausage, salami, potato wedges, baked beans, sautéed veggies, and toast",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
      badge: "Chef's Special"
    },
    {
      name: "Chicken Dum Biryani",
      price: 399,
      description: "Aromatic basmati rice with tender chicken, cooked in traditional dum style",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=300&fit=crop",
      badge: "Popular"
    },
    {
      name: "Grilled Lamb Rack",
      price: 599,
      description: "Premium lamb rack grilled to perfection with herbs and spices",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      badge: "Premium"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">

      {/* Food-themed Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Food Icons */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 text-6xl">🍕</div>
          <div className="absolute top-40 right-32 text-4xl">🍔</div>
          <div className="absolute bottom-32 left-32 text-5xl">🍝</div>
          <div className="absolute bottom-20 right-20 text-3xl">🥗</div>
          <div className="absolute top-1/2 left-1/4 text-4xl">☕</div>
          <div className="absolute top-1/3 right-1/4 text-5xl">🍰</div>
        </div>

        {/* Kitchen Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-orange-400/20">
            <defs>
              <pattern id="kitchenPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="3" fill="currentColor"/>
                <circle cx="25" cy="25" r="2" fill="currentColor"/>
                <circle cx="75" cy="75" r="2" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#kitchenPattern)"/>
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-8 py-4">
                <ChefHat className="w-6 h-6 text-orange-400" />
                <span className="text-orange-400 text-lg font-bold uppercase tracking-wider">
                  Culinary Excellence
                </span>
                <UtensilsCrossed className="w-6 h-6 text-red-400" />
              </div>

              <h1 className="text-6xl md:text-7xl font-bold font-sansitaOne leading-tight">
                Taste the
                <span className="block text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text">
                  Adventure
                </span>
              </h1>

              <p className="text-gray-300 text-xl leading-relaxed max-w-2xl">
                From hearty breakfasts to gourmet dinners, experience a culinary journey that perfectly complements
                your thrilling adventures at FNF Arena. Every dish crafted with passion and precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-4 transform hover:scale-105 shadow-xl">
                  <UtensilsCrossed className="w-6 h-6" />
                  Explore Menu
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm">
                  View Gallery
                </button>
              </div>
            </motion.div>

            {/* Right Content - Food Showcase */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-6">
                {featuredDishes.slice(0, 3).map((dish, index) => (
                  <motion.div
                    key={index}
                    className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                      index === 0 ? 'col-span-2' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      loading="lazy"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {dish.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-lg font-bold font-sansitaOne mb-2">
                        {dish.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-400 text-xl font-bold">₹{dish.price}</span>
                        <Heart className="w-5 h-5 text-red-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Categories Navigation */}
      <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
              Our Menu
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text font-sansitaOne mb-8">
              Culinary Delights
            </h3>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(menuCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-xl scale-105'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category.icon}
                <span>{category.title}</span>
              </button>
            ))}
          </div>

          {/* Active Category Content */}
          <motion.div
            key={activeCategory}
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white font-sansitaOne mb-2">
                {menuCategories[activeCategory].title}
              </h3>
              <p className="text-orange-400 text-lg">
                {menuCategories[activeCategory].subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuCategories[activeCategory].items.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/20 hover:border-orange-400/50 transition-all duration-300"
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-white text-xl font-bold font-sansitaOne mb-2">
                      {item.name}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-400 text-2xl font-bold">₹{item.price}</span>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors">
                        Order Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chef's Specials */}
      <section className="py-20 px-4 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-8 py-4 mb-8">
              <Award className="w-6 h-6 text-orange-400" />
              <span className="text-orange-400 text-lg font-bold uppercase tracking-wider">
                Chef's Recommendations
              </span>
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
              Signature Dishes
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {dish.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-2xl font-bold font-sansitaOne mb-2">
                      {dish.name}
                    </h3>
                    <span className="text-orange-400 text-3xl font-bold">₹{dish.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {dish.description}
                  </p>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105">
                    Order Special
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Gallery */}
      <section className="py-20 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-8 py-4 mb-8">
              <Camera className="w-6 h-6 text-purple-400" />
              <span className="text-purple-400 text-lg font-bold uppercase tracking-wider">
                Food Gallery
              </span>
              <Play className="w-6 h-6 text-pink-400" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
              Visual Feast
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=300&fit=crop"
            ].map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image}
                  alt={`Food gallery ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-br from-orange-500/20 to-red-500/10 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-orange-500/30"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold mb-6 font-sansitaOne text-white">Ready to Dine?</h3>
            <p className="text-gray-200 mb-8 text-xl leading-relaxed">
              Experience exceptional dining that perfectly complements your adventure at FNF Arena.
              Book your table now and taste the difference!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl transform hover:scale-105">
                Reserve Table
              </button>
              <button className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm">
                Order Online
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
