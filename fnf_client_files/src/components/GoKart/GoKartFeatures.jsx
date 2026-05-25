"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Users, Trophy, Clock, Shield, Star, ArrowRight, CheckCircle } from "lucide-react";
import {
  GiSpeedometer,
  GiSteeringWheel,
  GiTrophyCup,
  GiPartyPopper,
  GiShield,
  GiStarShuriken
} from "react-icons/gi";
import {
  MdAccessTime,
  MdGroups,
  MdSecurity,
  MdWbSunny,
  MdFamilyRestroom
} from "react-icons/md";
import {
  FaCar,
  FaUsers,
  FaClock,
  FaShieldAlt,
  FaChild
} from "react-icons/fa";

// Default fallback images for go-kart features
const defaultGoKartImages = {
  features: {
    singleKart: "https://cdn.acsdev.in/FNF/699b355b63ae8.jpg",
    twinKart: "https://cdn.acsdev.in/FNF/699b36d2a8d31.png",
    kidsKart: "https://cdn.acsdev.in/FNF/699b355b63ae8.jpg",
    outdoor: "https://cdn.acsdev.in/FNF/699b36d2a8d31.png",
    safety: "https://cdn.acsdev.in/FNF/699b355b63ae8.jpg",
    premium: "https://cdn.acsdev.in/FNF/699b355b63ae8.jpg"
  }
};

export default function GoKartFeatures({ features, details, galleryImages }) {
  const navigate = useNavigate();

  // Default icons to cycle through for features
  const defaultIcons = [
    {
      icon: <Zap className="w-8 h-8" />,
      reactIcon: <GiSpeedometer className="w-12 h-12" />,
      secondaryIcon: <FaCar className="w-6 h-6" />,
      color: "from-red-500/30 to-red-400/10",
      borderColor: "border-red-500/40"
    },
    {
      icon: <Users className="w-8 h-8" />,
      reactIcon: <GiPartyPopper className="w-12 h-12" />,
      secondaryIcon: <MdGroups className="w-6 h-6" />,
      color: "from-red-600/30 to-red-400/10",
      borderColor: "border-red-600/40"
    },
    {
      icon: <FaChild className="w-8 h-8" />,
      reactIcon: <MdFamilyRestroom className="w-12 h-12" />,
      secondaryIcon: <FaChild className="w-6 h-6" />,
      color: "from-red-700/30 to-red-600/10",
      borderColor: "border-red-700/40"
    },
    {
      icon: <MdWbSunny className="w-8 h-8" />,
      reactIcon: <MdAccessTime className="w-12 h-12" />,
      secondaryIcon: <FaClock className="w-6 h-6" />,
      color: "from-red-500/30 to-red-600/10",
      borderColor: "border-red-500/40"
    }
  ];

  // Default features when no API data is available
  const defaultFeatures = [
    {
      title: "Single Kart Racing",
      description: "Experience the ultimate thrill of solo go-kart racing with our high-performance single-seater karts designed for speed and precision.",
      feature_1: "High-Speed Performance",
      feature_2: "Professional Racing",
      feature_3: "Individual Control",
      feature_4: "Safety Equipment"
    },
    {
      title: "Twin Kart Adventure",
      description: "Share the excitement with our twin-seater go-karts, perfect for couples, friends, or parent-child racing experiences.",
      feature_1: "Shared Experience",
      feature_2: "Perfect for Couples",
      feature_3: "Team Racing",
      feature_4: "Double Fun"
    },
    {
      title: "Kids Kart Zone",
      description: "Safe and fun go-karting experience designed specifically for children with age-appropriate karts and dedicated track areas.",
      feature_1: "Child-Safe Design",
      feature_2: "Dedicated Track",
      feature_3: "Supervised Racing",
      feature_4: "Age Appropriate"
    },
    {
      title: "Outdoor Racing Track",
      description: "Race on our professionally designed outdoor track with natural lighting, fresh air, and challenging turns for all skill levels.",
      feature_1: "Professional Track",
      feature_2: "Natural Environment",
      feature_3: "All Weather Racing",
      feature_4: "Challenging Turns"
    }
  ];

  // Get fallback images array
  const fallbackImages = Object.values(defaultGoKartImages.features);

  // Create features array from API data or use defaults
  const apiFeatures = details && details.length > 0 ? details.map((detail, index) => {
    const iconSet = defaultIcons[index % defaultIcons.length];
    const featuresList = [
      detail.feature_1,
      detail.feature_2,
      detail.feature_3,
      detail.feature_4
    ].filter(feature => feature && feature.trim() !== '');

    // Get image from galleryImages or fallback
    let featureImage = null;
    if (galleryImages && galleryImages.length > 0) {
      featureImage = galleryImages[index % galleryImages.length];
    } else {
      featureImage = fallbackImages[index % fallbackImages.length];
    }

    return {
      ...iconSet,
      title: detail.title,
      description: detail.description,
      image: featureImage,
      benefits: featuresList
    };
  }) : defaultFeatures.map((feature, index) => {
    const iconSet = defaultIcons[index % defaultIcons.length];
    const featuresList = [
      feature.feature_1,
      feature.feature_2,
      feature.feature_3,
      feature.feature_4
    ].filter(f => f && f.trim() !== '');

    // Use fallback images when no API data
    const featureImage = fallbackImages[index % fallbackImages.length];

    return {
      ...iconSet,
      title: feature.title,
      description: feature.description,
      image: featureImage,
      benefits: featuresList
    };
  });

  return (
    <section className="relative bg-gradient-to-bl from-gray-900 via-gray-800 to-black text-white py-20 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* New Geometric Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Triangle Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-400/20">
            <defs>
              <pattern id="trianglePattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <polygon points="40,10 70,60 10,60" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#trianglePattern)"/>
          </svg>
        </div>

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-32 right-32 opacity-10"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-40 h-40 border-4 border-red-400/30 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-red-400/20 rounded-full"></div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-20 opacity-8"
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/20 transform rotate-45"></div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section with New Layout */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-full px-8 py-4 mb-8">
            <GiSpeedometer className="w-6 h-6 text-red-400" />
            <span className="text-red-400 text-lg font-bold uppercase tracking-wider">
              Go Kart Features
            </span>
            <FaCar className="w-6 h-6 text-red-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
            Premium Go Kart
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-red-400 to-red-500 bg-clip-text font-sansitaOne mb-8">
            Racing Experience
          </h3>
          <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
            Discover our comprehensive go-kart racing facilities featuring professional tracks designed for maximum safety and excitement.
          </p>
        </motion.div>

        {/* Features in Alternating Layout */}
        <div className="space-y-16">
          {apiFeatures.map((feature, index) => (
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
              {/* Image Section - Always render */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to default image if API image fails to load
                      e.target.src = fallbackImages[index % fallbackImages.length];
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Floating Icon */}
                  {/* <div className="absolute top-6 right-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div> */}

                  {/* Bottom Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3">
                      {/* <div className="text-red-400">
                        {feature.reactIcon}
                      </div> */}
                      <h4 className="text-white text-2xl font-bold font-sansitaOne">
                        {feature.title}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {/* <div className="text-red-400">
                      {feature.icon}
                    </div> */}
                    <h3 className="text-3xl font-bold text-white font-sansitaOne">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Benefits List */}
                {feature.benefits && feature.benefits.length > 0 && (
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <span className="text-gray-200 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section with New Design */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-red-500/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 400 200" className="text-red-400/30">
                <defs>
                  <pattern id="ctaPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="currentColor"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ctaPattern)"/>
              </svg>
            </div>

            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <GiSpeedometer className="w-12 h-12 text-red-400" />
                <h3 className="text-4xl font-bold font-sansitaOne text-white">
                  Ready for Go Kart Racing?
                </h3>
                <FaCar className="w-12 h-12 text-red-400" />
              </div>

              <p className="text-gray-200 text-xl max-w-3xl mx-auto leading-relaxed">
                Experience our professional go-kart racing facilities with safety equipment 
                and expert instruction included.
              </p>

              <p className="text-red-400 text-lg font-medium max-w-2xl mx-auto">
                Walk-in registrations are welcome—just drop by and hit the track!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
