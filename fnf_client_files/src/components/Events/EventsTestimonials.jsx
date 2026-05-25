"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useEventData } from "../../Context/EventDataContext";

export default function EventsTestimonials() {
  const {
    getEventByType,
    getEventReviews,
    IMGUrl,
    loading,
    error
  } = useEventData();

  const { allReviews, featuredReview, otherReviews } = useMemo(() => {
    // Only get Event Space data
    const eventSpaceData = getEventByType('Event Space');

    const reviews = getEventReviews('Event Space');

    // Debug logging
    // console.log('Event Space Data:', eventSpaceData);

    // Sort reviews by rating (highest first)
    const sortedReviews = reviews.sort((a, b) => parseInt(b.rating) - parseInt(a.rating));

    return {
      allReviews: reviews,
      featuredReview: sortedReviews[0] || null,
      otherReviews: sortedReviews.slice(1, 5), // Show up to 4 other reviews
    };
  }, [getEventByType, getEventReviews]);

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading testimonials...</p>
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
            <p className="text-red-400 text-lg">Error loading testimonials</p>
            <p className="text-gray-400 text-sm mt-2">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredReview && !otherReviews.length) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-white text-lg">No testimonials available for Event Space</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop"
          alt="Event testimonials background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2d31]/80 via-[#1a1d21]/90 to-[#2a2d31]/80" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/20">
          <defs>
            <pattern id="testimonialsPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="2" fill="currentColor" />
              <path
                d="M30,30 Q60,10 90,30 Q70,60 90,90 Q60,70 30,90 Q50,60 30,30"
                fill="currentColor"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonialsPattern)" />
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
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
            <Quote className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">
              Client Stories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            What Our <span className="text-red-500">Clients Say</span>
          </h2>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Hear from our satisfied clients about their memorable events at FNF Arena
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        {featuredReview && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-red-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-red-500/20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Client Info */}
                <div className="text-center lg:text-left">
                  <div className="w-24 h-24 mx-auto lg:mx-0 mb-4 rounded-full overflow-hidden border-4 border-red-500/30">
                    <img
                      src={featuredReview.reviewer_image ? `${IMGUrl}/reviews/${featuredReview.reviewer_image}` : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                      alt={featuredReview.reviewer_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
                      }}
                    />
                  </div>

                  <h3 className="text-white font-bold text-xl mb-2">
                    {featuredReview.reviewer_name}
                  </h3>

                  <p className="text-red-400 font-medium mb-1">
                    {featuredReview.event_type_name || featuredReview.occasion}
                  </p>

                  <p className="text-gray-400 text-sm mb-4">
                    {featuredReview.place}
                  </p>

                  <div className="flex justify-center lg:justify-start gap-1">
                    {[...Array(Number(featuredReview.rating))].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="lg:col-span-2">
                  <Quote className="w-12 h-12 text-red-500/30 mb-4" />
                  <blockquote className="text-white text-xl md:text-2xl leading-relaxed font-medium">
                    "{featuredReview.review_description}"
                  </blockquote>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Testimonials */}
        {otherReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
            {otherReviews.map((item, index) => (
              <motion.div
                key={`${item.reviewer_name}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/20 hover:border-red-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-500/30">
                    <img
                      src={item.reviewer_image ? `${IMGUrl}/reviews/${item.reviewer_image}` : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                      alt={item.reviewer_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
                      }}
                    />
                  </div>

                  <div>
                    <h4 className="text-white font-bold">
                      {item.reviewer_name}
                    </h4>
                    <p className="text-red-400 text-sm">
                      {item.event_type_name || item.occasion}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {item.place}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(Number(item.rating))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-300 leading-relaxed">
                  "{item.review_description}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
