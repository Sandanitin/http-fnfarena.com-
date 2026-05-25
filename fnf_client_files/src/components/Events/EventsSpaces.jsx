"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Wifi, Car, Utensils, Music, Camera, Shield, Clock, UserCheck } from "lucide-react";
import { useEventData } from "../../Context/EventDataContext";

export default function EventsSpaces() {
  const {
    getEventByType,
    getEventPackages,
    getMainImage,
    loading,
    error
  } = useEventData();

  const spaces = useMemo(() => {
    // Only get Event Space data
    const eventSpaceData = getEventByType('Event Space');
    if (!eventSpaceData) return [];

    const packages = getEventPackages('Event Space');
    const allSpaces = [];

    packages.forEach((pkg, index) => {
      if (pkg.title && pkg.description) {
        // Icon mapping for features
        const iconMap = {
          0: [Users, Wifi, Music, Utensils],
          1: [MapPin, Car, Camera, Shield],
          2: [Users, Wifi, Music, Utensils]
        };

        const colorMap = {
          0: { color: "from-red-500/20 to-orange-500/20", borderColor: "border-red-500/30" },
          1: { color: "from-green-500/20 to-blue-500/20", borderColor: "border-green-500/30" },
          2: { color: "from-purple-500/20 to-pink-500/20", borderColor: "border-purple-500/30" }
        };

        const space = {
          title: pkg.title,
          capacity: pkg.guestsCount ? `${pkg.guestsCount} Guests` : "Contact for capacity",
          size: pkg.size ? `${pkg.size} sq ft` : "Contact for size",
          ageGroup: pkg.ageGroup || "",
          duration: pkg.duration || "",
          description: pkg.description,
          image: pkg.image || getMainImage('Event Space') || "https://cdn.acsdev.in/FNF/MLK3753.jpg",
          features: pkg.features.map((feature, featureIndex) => ({
            icon: iconMap[index % 3][featureIndex % 4],
            text: feature
          })).filter(f => f.text),
          ...colorMap[index % 3],
          eventType: 'Event Space'
        };

        allSpaces.push(space);
      }
    });

    return allSpaces;
  }, [getEventByType, getEventPackages, getMainImage]);

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading event spaces...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-400 text-lg">Error loading event spaces</p>
            <p className="text-gray-400 text-sm mt-2">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!spaces.length) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-white text-lg">No event spaces available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/10">
          <defs>
            <pattern id="spacesPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="50" cy="50" r="3" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#spacesPattern)"/>
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
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">Event Venues</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Our <span className="text-red-500">Event Spaces</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose from our premium venues designed to make your special occasions unforgettable
          </p>
        </motion.div>

        {/* Spaces Grid */}
        <div className="space-y-16">
          {spaces.map((space, index) => (
            <motion.div
              key={`${space.eventType}-${space.title}-${index}`}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <motion.div
                className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={space.image}
                    alt={space.title}
                    loading="lazy"
                    className="w-full h-[400px] object-cover"
                    onError={(e) => {
                      e.target.src = "https://cdn.acsdev.in/FNF/MLK3753.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Capacity Badge */}
                  <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {space.capacity}
                    </div>
                  </div>

                  {/* Size Badge */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {space.size}
                    </div>
                  </div>

                  {/* Additional Info Badges */}
                  {space.ageGroup && (
                    <div className="absolute bottom-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                      <div className="flex items-center gap-1">
                        <UserCheck className="w-3 h-3" />
                        Age: {space.ageGroup}
                      </div>
                    </div>
                  )}

                  {space.duration && (
                    <div className="absolute bottom-4 right-4 bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {space.duration} hrs
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400 text-sm font-medium bg-red-500/10 px-2 py-1 rounded">
                      {space.eventType}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sansitaOne">
                    {space.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {space.description}
                  </p>
                </div>

                {/* Features Grid */}
                {space.features.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {space.features.map((feature, featureIndex) => {
                      const IconComponent = feature.icon;
                      return (
                        <motion.div
                          key={`${feature.text}-${featureIndex}`}
                          className={`flex items-center gap-3 p-4 bg-gradient-to-r ${space.color} backdrop-blur-sm rounded-xl border ${space.borderColor}`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-medium">{feature.text}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
