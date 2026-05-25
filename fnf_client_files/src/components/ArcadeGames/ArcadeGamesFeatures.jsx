"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Trophy, Users, Zap, Star, Clock } from "lucide-react";
import {
  GiGamepad,
  GiTrophyCup,
  GiPartyPopper,
  GiShield,
  GiStarShuriken
} from "react-icons/gi";
import {
  MdAccessTime,
  MdGroups,
  MdSecurity
} from "react-icons/md";
import {
  FaGamepad,
  FaUsers,
  FaClock,
  FaShieldAlt
} from "react-icons/fa";

// Image object at the beginning
const arcadeImages = {
  features: {
    games: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
    multiplayer: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
    highscore: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg"
  },
  backgrounds: {
    arcade1: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
    arcade2: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
    games: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg"
  }
};

export default function ArcadeGamesFeatures({ features, details, galleryImages }) {
  const navigate = useNavigate();

  // Default features when no API data is available
  const defaultFeatures = [
    {
      title: "50+ Game Machines",
      description: "From classic arcade games to modern simulators, experience the best gaming collection in the city.",
      image: arcadeImages.features.games
    },
    {
      title: "Multiplayer Fun",
      description: "Challenge friends and family in exciting multiplayer games and cooperative adventures.",
      image: arcadeImages.features.multiplayer
    },
    {
      title: "High Score System",
      description: "Track your progress, beat personal records, and see your name on the hall of fame.",
      image: arcadeImages.features.highscore
    }
  ];

  // Process features from API data or use defaults
  const processedFeatures = React.useMemo(() => {
    if (details && details.length > 0) {
      // Take first 3 details and map them to features
      return details.slice(0, 3).map((detail, index) => {
        let featureImage = defaultFeatures[index].image; // Use default as fallback

        // Try to get image from galleryImages if available
        if (galleryImages && galleryImages.length > index) {
          featureImage = galleryImages[index];
        }

        return {
          title: detail.title || defaultFeatures[index].title,
          description: detail.description || defaultFeatures[index].description,
          image: featureImage
        };
      });
    }
    return defaultFeatures;
  }, [details, galleryImages]);

  const featureIcons = [
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      reactIcon: <GiGamepad className="w-12 h-12" />,
      secondaryIcon: <FaGamepad className="w-6 h-6" />
    },
    {
      icon: <Users className="w-8 h-8" />,
      reactIcon: <GiPartyPopper className="w-12 h-12" />,
      secondaryIcon: <MdGroups className="w-6 h-6" />
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      reactIcon: <GiTrophyCup className="w-12 h-12" />,
      secondaryIcon: <Star className="w-6 h-6" />
    }
  ];

  // Dynamic grid classes based on number of features
  const getGridClasses = () => {
    const count = processedFeatures.length;
    if (count === 1) {
      return "flex justify-center";
    } else if (count === 2) {
      return "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto";
    } else {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
    }
  };

  return (
    <section className="relative bg-[#1e2125] text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* Enhanced Arcade Background Illustrations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gaming Controllers */}
        <motion.div
          className="absolute top-20 right-10 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center relative">
            <img
              src={arcadeImages.backgrounds.arcade1}
              alt="Gaming controller"
              className="w-full h-full rounded-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <FaGamepad className="w-16 h-16 text-white/40" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-10 opacity-10"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-24 h-24 rounded-full border-4 border-red-500/20 flex items-center justify-center relative">
            <img
              src={arcadeImages.backgrounds.arcade2}
              alt="Gaming machine"
              className="w-full h-full rounded-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Gamepad2 className="w-12 h-12 text-red-500/40" />
            </div>
          </div>
        </motion.div>

        {/* Animated High Score Formation */}
        <motion.div
          className="absolute top-1/2 right-1 opacity-8 transform -translate-y-1/2"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                <Star className="w-6 h-6 text-white/15" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Game Over Effect */}
        <motion.div
          className="absolute top-1/3 left-1/4 opacity-15"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <GiGamepad className="w-24 h-24 text-red-500/30" />
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          className="absolute top-1/4 right-1/3 opacity-10"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <GiTrophyCup className="w-16 h-16 text-yellow-500/20" />
        </motion.div>

        {/* Abstract Gaming Background with Image */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5">
          <img
            src={arcadeImages.backgrounds.games}
            alt="Gaming background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e2125] to-transparent" />
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
              Gaming Experience
            </span>
          </div>
          <h2 className="text-white text-[28px] md:text-[32px] font-sansitaOne mb-2">
            Ultimate Gaming Facilities
          </h2>
          <h3 className="text-red-500 font-extrabold text-[36px] md:text-[42px] mt-1 font-sansitaOne mb-6">
            Arcade Excellence
          </h3>
          <p className="text-white mt-4 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Experience gaming like never before with our premium arcade machines, diverse game selection,
            and competitive gaming environment that makes every session memorable.
          </p>
        </motion.div>

        {/* Enhanced Features Grid with Dynamic Layout */}
        <div className={getGridClasses()}>
          {processedFeatures.map((feature, index) => {
            const iconSet = featureIcons[index];
            return (
              <motion.div
                key={index}
                className={`bg-[#606265] rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 group relative border-red-500/30 ${
                  processedFeatures.length === 1 ? 'w-full max-w-md' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  background: "linear-gradient(135deg, #606265 0%, #888a8c 100%)",
                  transition: { duration: 0.3 },
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Feature Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback to default image if API image fails to load
                      e.target.src = defaultFeatures[index % defaultFeatures.length].image;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Large React Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <div className="text-white">
                      {iconSet.reactIcon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-red-500">
                      {iconSet.icon}
                    </div>
                    <h4 className="text-white text-xl font-bold font-sansitaOne">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-4 flex justify-end opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                    {iconSet.secondaryIcon}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Bottom CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-[#606265] rounded-2xl p-8 shadow-md border border-gray-200 relative overflow-hidden">
            {/* Background Icons */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <GiGamepad className="w-32 h-32 text-red-500" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Gamepad2 className="w-8 h-8 text-red-500" />
                <h3 className="text-3xl font-bold font-sansitaOne text-white">Ready to Game?</h3>
                <Trophy className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-lg">
                Experience the ultimate arcade gaming adventure at FNF Arena's premium gaming facility.
              </p>
              <p className="text-white text-lg font-medium max-w-2xl mx-auto">
               Walk in anytime and dive into a world of exciting arcade games!
              </p>
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
