"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Users, Trophy, Clock, Shield, Star } from "lucide-react";
import {
  GiLaserSparks,
  GiCrosshair,
  GiTrophyCup,
  GiPartyPopper,
  GiShield,
  GiStarShuriken
} from "react-icons/gi";
import {
  MdAccessTime,
  MdGroups,
  MdSecurity,
  MdSportsEsports,
  MdCelebration
} from "react-icons/md";
import {
  FaCrosshairs,
  FaUsers,
  FaClock,
  FaShieldAlt,
  FaGamepad,
  FaGift
} from "react-icons/fa";

// Image object for arena themed images
const arenaImages = {
  features: {
    arena: "https://cdn.acsdev.in/FNF/69cfccec43789.jpg",
    groups: "https://cdn.acsdev.in/FNF/6995f8bdb6611.png",
    tournaments: "https://cdn.acsdev.in/FNF/69cfccead4bc6.jpg",
    timing: "https://cdn.acsdev.in/FNF/69cfccec43789.jpg",
    safety: "https://cdn.acsdev.in/FNF/6995f8bdb6611.png",
    premium: "https://cdn.acsdev.in/FNF/69cfccead4bc6.jpg"
  },
  backgrounds: {
    game1: "https://cdn.acsdev.in/FNF/69cfccec43789.jpg",
    game2: "https://cdn.acsdev.in/FNF/6995f8bdb6611.png",
    arena: "https://cdn.acsdev.in/FNF/69cfccead4bc6.jpg"
  }
};

export default function LaserTagFeatures({ features, details, galleryImages }) {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Default features when no API data is available
  const defaultFeatures = [
    {
      title: "Team Battles",
      description: "Perfect for birthday parties, corporate events, and group activities with team deathmatch modes.",
      image: arenaImages.features.groups
    },
    {
      title: "Safety First",
      description: "Sanitized equipment, safe laser technology, and comprehensive safety protocols.",
      image: arenaImages.features.safety
    },
    {
      title: "Fun Experience",
      description: "Enjoyable activities and entertainment options for a great time with friends and family.",
      image: arenaImages.features.premium
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
      icon: <Users className="w-8 h-8" />,
      reactIcon: <GiPartyPopper className="w-12 h-12" />,
      secondaryIcon: <MdGroups className="w-6 h-6" />,
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      reactIcon: <GiShield className="w-12 h-12" />,
      secondaryIcon: <MdSecurity className="w-6 h-6" />,
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/30"
    },
    {
      icon: <Star className="w-8 h-8" />,
      reactIcon: <GiStarShuriken className="w-12 h-12" />,
      secondaryIcon: <FaShieldAlt className="w-6 h-6" />,
      color: "from-pink-500/20 to-pink-600/20",
      borderColor: "border-pink-500/30"
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

      {/* Enhanced Arena Background Illustrations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Game Icons */}
        <motion.div
          className="absolute top-20 right-10 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center relative">
            <img
              src={arenaImages.backgrounds.game1}
              alt="Game activity"
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
              src={arenaImages.backgrounds.game2}
              alt="Game activity"
              className="w-full h-full rounded-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <FaGamepad className="w-12 h-12 text-red-500/40" />
            </div>
          </div>
        </motion.div>

        {/* Animated Target Formation */}
        <motion.div
          className="absolute top-1/2 right-1 opacity-8 transform -translate-y-1/2"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="grid grid-cols-4 gap-2">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                <MdSportsEsports className="w-6 h-6 text-white/15" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Game Spark Effect */}
        <motion.div
          className="absolute top-1/3 left-1/4 opacity-15"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <GiLaserSparks className="w-24 h-24 text-red-500/30" />
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          className="absolute top-1/4 right-1/3 opacity-10"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <GiTrophyCup className="w-16 h-16 text-yellow-500/20" />
        </motion.div>

        {/* Abstract Arena with Image */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5">
          <img
            src={arenaImages.backgrounds.arena}
            alt="Arena"
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
              Laser Tag Experience
            </span>
          </div>
          <h2 className="text-white text-[28px] md:text-[32px] font-sansitaOne mb-2">
            World-Class Combat Arena
          </h2>
          <h3 className="text-red-500 font-extrabold text-[36px] md:text-[42px] mt-1 font-sansitaOne mb-6">
            Tactical Excellence
          </h3>
          <p className="text-white mt-4 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Experience laser tag like never before with our high-tech arena, professional equipment,
            and immersive gameplay that makes every battle memorable.
          </p>
        </motion.div>

        {/* Enhanced Features Grid with Dynamic Layout */}
        <div className={getGridClasses()}>
          {processedFeatures.map((feature, index) => {
            const iconSet = featureIcons[index];
            return (
              <motion.div
                key={index}
                className={`bg-[#606265] rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 group relative ${iconSet.borderColor} ${
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
                <div className={`absolute inset-0 bg-gradient-to-br ${iconSet.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Feature Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-100"
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
              <MdSportsEsports className="w-32 h-32 text-red-500" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaGamepad className="w-8 h-8 text-red-500" />
                <h3 className="text-3xl font-bold font-sansitaOne text-white">Ready for Combat?</h3>
                <FaGamepad className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-lg">
                Book your session now and experience the thrill of tactical combat at FNF Arena's premium laser tag facility.
              </p>
               <p className="text-white text-lg font-medium max-w-2xl mx-auto">
                Walk-in players are welcome—gear up and jump straight into the action!
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
