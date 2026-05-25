"use client";
import React from "react";
import { motion } from "framer-motion";
import { Baby, Zap, Shield, Users, Heart, Star, Clock, Award, CheckCircle, Smile } from "lucide-react";

export default function SoftplayTrampolineBullrideFeatures({ features, details, galleryImages }) {
  // Default features when no API data is available
  const defaultFeatures = [
    {
      title: "Softplay Paradise",
      description: "Colorful, safe play structures designed for toddlers and young children",
      highlights: ["Foam padding", "Age-appropriate zones", "Sensory play areas", "Climbing structures"],
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      image: "https://cdn.acsdev.in/FNF/69e9c7ffb576b.jpg"
    },
    {
      title: "Trampoline Zone",
      description: "High-energy bouncing area with safety nets and professional supervision",
      highlights: ["Safety nets", "Foam pits", "Basketball hoops", "Dodgeball courts"],
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/30",
      image: "https://cdn.acsdev.in/FNF/69e9c6a6d6d8f.jpg"
    },
    {
      title: "Bull Ride Arena",
      description: "Mechanical bull experience with adjustable difficulty and safety mats",
      highlights: ["Adjustable speed", "Safety mats", "Professional operator", "Photo opportunities"],
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/30",
      image: "https://cdn.acsdev.in/FNF/69e9c6a569365.jpg"
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
          highlights: [
            detail.feature_1,
            detail.feature_2,
            detail.feature_3,
            detail.feature_4
          ].filter(feature => feature && feature.trim() !== '') || defaultFeatures[index].highlights,
          color: defaultFeatures[index].color,
          borderColor: defaultFeatures[index].borderColor,
          image: featureImage
        };
      });
    }
    return defaultFeatures;
  }, [details, galleryImages]);

  const featureIcons = [Baby, Zap, Shield];

  const additionalFeatures = [
    {
      icon: Users,
      title: "Family Zones",
      description: "Dedicated areas for families to relax and supervise children",
      image: "https://cdn.acsdev.in/FNF/69e9c7ffb576b.jpg"
    },
    {
      icon: Heart,
      title: "Health & Safety",
      description: "Regular sanitization and safety checks on all equipment",
      image: "https://cdn.acsdev.in/FNF/69e9c6a6d6d8f.jpg"
    },
    {
      icon: Smile,
      title: "Age-Appropriate",
      description: "Different zones designed for various age groups and abilities",
      image: "https://cdn.acsdev.in/FNF/69e9c6a569365.jpg"
    }
  ];

  // Use gallery images for additional features if available
  const processedAdditionalFeatures = React.useMemo(() => {
    return additionalFeatures.map((feature, index) => {
      let featureImage = feature.image;

      // Try to get image from galleryImages if available (starting from index 3)
      if (galleryImages && galleryImages.length > (index + 3)) {
        featureImage = galleryImages[index + 3];
      }

      return {
        ...feature,
        image: featureImage
      };
    });
  }, [galleryImages]);

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#2a2d31] to-[#1a1d21] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white">
          <defs>
            <pattern id="playgroundPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
              <rect x="40" y="40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="60" cy="60" r="5" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#playgroundPattern)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        {/* Section Header */}
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
            <Star className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">Premium Features</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            THREE ZONES OF
            <span className="text-red-500"> PURE FUN</span>
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Experience the ultimate family entertainment with our three distinct activity zones,
            each designed with safety, fun, and memorable experiences in mind.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {processedFeatures.map((feature, index) => {
            const IconComponent = featureIcons[index];
            return (
              <motion.div
                key={index}
                className={`relative bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-2xl overflow-hidden border ${feature.borderColor} hover:scale-105 transition-all duration-300`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
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

                  {/* Icon Overlay */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3 font-sansitaOne">
                      {feature.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {feature.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-200 text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative Element */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white/60" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Features Grid */}
        {/* <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sansitaOne">
              Why Choose Our Facility
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We go above and beyond to ensure every family has an amazing experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedAdditionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-red-500/30 hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.target.src = additionalFeatures[index].image;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute top-3 left-3 w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <feature.icon className="w-5 h-5 text-red-400" />
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-white font-bold text-lg mb-2 font-sansitaOne">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Safety Highlight Section */}
        <motion.div
          className="bg-gradient-to-r from-red-500/10 via-red-500/20 to-red-500/10 rounded-2xl p-8 border border-red-500/20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-sansitaOne">
              Safety is Our Priority
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              All our equipment meets international safety standards. Our trained staff continuously
              monitor all activities to ensure a safe and enjoyable experience for everyone.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-500 font-sansitaOne mb-2">
                  100%
                </div>
                <p className="text-gray-300 text-sm">Safety Certified</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-500 font-sansitaOne mb-2">
                  24/7
                </div>
                <p className="text-gray-300 text-sm">Supervision</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-500 font-sansitaOne mb-2">
                  Daily
                </div>
                <p className="text-gray-300 text-sm">Equipment Checks</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-500 font-sansitaOne mb-2">
                  Trained
                </div>
                <p className="text-gray-300 text-sm">Staff Members</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
