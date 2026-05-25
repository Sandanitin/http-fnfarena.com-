"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, Users, Clock, Star, Heart, Trophy, Target, CheckCircle } from "lucide-react";

// Default fallback images for sky cycle features
const defaultSkyCycleImages = {
  features: {
    safety: "https://cdn.acsdev.in/FNF/699b3fa7db259.jpg",
    thrills: "https://cdn.acsdev.in/FNF/69d3763709bc8.jpg",
    group: "https://cdn.acsdev.in/FNF/69d3763841f0b.jpg",
    views: "https://cdn.acsdev.in/FNF/699b3fa7db259.jpg"
  }
};

export default function SkyCycleFeatures({ features, details, galleryImages }) {
  const navigate = useNavigate();

  // Default features when no API data is available
  const defaultFeatures = [
    {
      title: "100% Safety Guaranteed",
      description: "State-of-the-art safety equipment and certified instructors ensure your complete protection throughout the adventure.",
      image: defaultSkyCycleImages.features.safety,
      color: "red"
    },
    {
      title: "Sky High Thrills",
      description: "Experience the ultimate rush as you pedal through the sky on our premium elevated cycling track with breathtaking views.",
      image: defaultSkyCycleImages.features.thrills,
      color: "red"
    },
    {
      title: "Group Sky Adventures",
      description: "Perfect for team building, birthday parties, and group events. Create unforgettable memories cycling in the sky together.",
      image: defaultSkyCycleImages.features.group,
      color: "red"
    },
    {
      title: "Scenic Sky Views",
      description: "Enjoy panoramic mountain views and stunning landscapes while cycling through the clouds on our elevated track system.",
      image: defaultSkyCycleImages.features.views,
      color: "red"
    }
  ];

  // Get fallback images array
  const fallbackImages = Object.values(defaultSkyCycleImages.features);

  // Create features array from API data or use defaults
  const apiFeatures = details && details.length > 0 ? details.map((detail, index) => {
    // Get image from galleryImages or fallback
    let featureImage = null;
    if (galleryImages && galleryImages.length > 0) {
      featureImage = galleryImages[index % galleryImages.length];
    } else {
      featureImage = fallbackImages[index % fallbackImages.length];
    }

    return {
      title: detail.title,
      description: detail.description,
      image: featureImage,
      color: "red"
    };
  }) : defaultFeatures.map((feature, index) => {
    // Use fallback images when no API data
    const featureImage = galleryImages && galleryImages.length > index
      ? galleryImages[index]
      : fallbackImages[index % fallbackImages.length];

    return {
      ...feature,
      image: featureImage
    };
  });

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-red-500/20 border border-red-500/30 rounded-full px-8 py-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Target className="w-6 h-6 text-red-500" aria-hidden="true" />
            <span className="text-red-300 font-bold text-lg">Why Choose Our Sky Cycle</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sansitaOne leading-tight mb-6">
            Premium Sky Cycle
            <span className="block text-red-400">Features</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect combination of safety, excitement, and unforgettable memories
            with our world-class sky cycle facility.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div
          className={
            apiFeatures.length === 1
              ? "flex justify-center"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          }
        >
          {apiFeatures.map((feature, index) => (
            <motion.article
              key={index}
              className="w-full max-w-md bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm rounded-3xl p-8 border-2 border-red-600/20 hover:border-red-600/40 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Feature Image instead of icon */}
                <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to default image if API image fails to load
                      const fallbackIndex = index % fallbackImages.length;
                      e.target.src = fallbackImages[fallbackIndex];
                    }}
                  />
                </div>

                <h3 className="text-white font-bold text-xl mb-4 font-sansitaOne">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA Section */}
        {/* <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-500/10 to-red-500/10 backdrop-blur-sm rounded-3xl p-8 border border-red-400/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-bold">Award Winning Sky Experience</span>
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-sansitaOne">
              Ready for the Sky Cycle Adventure of a Lifetime?
            </h3>

            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of thrill-seekers who have experienced the ultimate sky cycle adventure.
              Book your sky ride today and create memories that will last forever.
            </p>

            <motion.button
              onClick={() => navigate('/plan')}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Pricings
            </motion.button>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
