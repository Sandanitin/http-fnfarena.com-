"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Calendar, Star, Wifi, Car, Utensils, Music } from "lucide-react";

export default function EventSpaceVenues() {
  const venues = [
    {
      id: 1,
      name: "Grand Banquet Hall",
      description: "Elegant indoor venue perfect for weddings, corporate events, and celebrations",
      image: "https://cdn.acsdev.in/FNF/MLK3753.jpg",
      capacity: "500+ Guests",
      size: "5,000 sq ft",
      features: ["Air Conditioning", "Stage Setup", "Audio/Visual", "Catering Kitchen"],
      color: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-500/30"
    },
    {
      id: 2,
      name: "Outdoor Lawn Space",
      description: "Beautiful open-air venue ideal for garden parties and outdoor celebrations",
      image: "https://cdn.acsdev.in/FNF/MLK3661.jpg",
      capacity: "300+ Guests",
      size: "8,000 sq ft",
      features: ["Garden Setting", "Natural Lighting", "Flexible Layout", "Weather Backup"],
      color: "from-green-500/20 to-blue-500/20",
      borderColor: "border-green-500/30"
    },
    {
      id: 3,
      name: "Premium Inside Space",
      description: "Intimate indoor space perfect for private gatherings and corporate meetings",
      image: "https://cdn.acsdev.in/FNF/MLK4008.jpg",
      capacity: "150+ Guests",
      size: "2,500 sq ft",
      features: ["Modern Design", "Private Entrance", "Dedicated Bar", "Lounge Area"],
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    }
  ];

  const amenities = [
    { icon: Wifi, name: "Free WiFi" },
    { icon: Car, name: "Parking" },
    { icon: Utensils, name: "Catering" },
    { icon: Music, name: "Sound System" }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/10">
          <defs>
            <pattern id="venuePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="50" cy="50" r="3" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#venuePattern)"/>
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
            Our <span className="text-red-500">Venues</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose from our diverse range of event spaces, each designed to create memorable experiences
          </p>
        </motion.div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              className={`relative group bg-gradient-to-br ${venue.color} backdrop-blur-sm rounded-2xl overflow-hidden border ${venue.borderColor} hover:border-red-500/50 transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  loading="lazy"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Capacity Badge */}
                <div className="absolute top-4 right-4 bg-red-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {venue.capacity}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6">
                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-red-500 transition-colors">
                  {venue.name}
                </h3>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {venue.description}
                </p>

                {/* Size Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-500" />
                    <span className="text-gray-300 text-sm">{venue.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-gray-300 text-sm">{venue.size}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-white font-semibold text-sm mb-2">Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {venue.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-500 rounded-full" />
                        <span className="text-gray-400 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-1 bg-gradient-to-r from-red-500 to-transparent rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Amenities Section */}
        <motion.div
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Included Amenities</h3>
            <p className="text-gray-300">All our venues come with these premium amenities</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => {
              const IconComponent = amenity.icon;
              return (
                <motion.div
                  key={amenity.name}
                  className="text-center p-4 bg-gradient-to-br from-red-500/10 to-transparent rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-red-500" />
                  </div>
                  <h4 className="text-white font-semibold text-sm">{amenity.name}</h4>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
