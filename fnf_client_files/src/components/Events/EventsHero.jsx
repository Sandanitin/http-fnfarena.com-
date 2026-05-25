"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Star, Sparkles, ArrowRight, TrendingUp, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEventData } from "../../Context/EventDataContext";

export default function EventsHero() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Use the new EventDataContext
  const {
    getAllEventTypes,
    getMainImage,
    getLandingImage,
    getEventMetrics,
    eventMetrics,
    loading,
    error
  } = useEventData();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('event-memories');
    if (gallerySection) {
      gallerySection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Get metrics data for Event Space
  const metricsData = useMemo(() => {
    let metrics = getEventMetrics('Event Space');

    // If normalized metrics is null, try to find it in raw data
    if (!metrics && eventMetrics && eventMetrics.length > 0) {
      metrics = eventMetrics.find(metric =>
        metric.event_type_name === 'Event Space' && metric.status === 'active'
      );
    }

    return metrics;
  }, [getEventMetrics, eventMetrics]);

  // Helper function to format metric names
  const formatMetricName = (name) => {
    if (!name) return "Metric";
    return name
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Helper function to get appropriate icon based on metric name
  const getMetricIcon = (metricName) => {
    const name = metricName.toLowerCase();
    if (name.includes('attendance')) return Users;
    if (name.includes('satisfaction')) return Star;
    if (name.includes('occasions')) return Calendar;
    if (name.includes('repeat')) return TrendingUp;
    return BarChart3; // default icon
  };

  // Create features array from metrics data
  const featuresData = useMemo(() => {
    if (!metricsData) {
      // Fallback data
      return [
        {
          icon: Users,
          title: "500+ Capacity",
          subtitle: "Banquet Hall"
        },
        {
          icon: MapPin,
          title: "Lawn Space",
          subtitle: "Outdoor Events"
        },
        {
          icon: Sparkles,
          title: "Full Service",
          subtitle: "Event Planning"
        },
        {
          icon: Star,
          title: "Premium Setup",
          subtitle: "Luxury Amenities"
        }
      ];
    }

    const features = [];

    // Extract metrics from the actual API structure
    if (metricsData.attendance_rate) {
      features.push({
        icon: getMetricIcon('attendance_rate'),
        title: `${metricsData.attendance_rate}${metricsData.attendance_rate_suffix || ''}`,
        subtitle: formatMetricName('attendance_rate')
      });
    }

    if (metricsData.satisfaction_score) {
      features.push({
        icon: getMetricIcon('satisfaction_score'),
        title: `${metricsData.satisfaction_score}${metricsData.satisfaction_score_suffix || ''}`,
        subtitle: formatMetricName('satisfaction_score')
      });
    }

    if (metricsData.occasions) {
      features.push({
        icon: getMetricIcon('occasions'),
        title: `${metricsData.occasions}${metricsData.occasions_suffix || ''}`,
        subtitle: formatMetricName('occasions')
      });
    }

    if (metricsData.repeat_bookings) {
      features.push({
        icon: getMetricIcon('repeat_bookings'),
        title: `${metricsData.repeat_bookings}${metricsData.repeat_bookings_suffix || ''}`,
        subtitle: formatMetricName('repeat_bookings')
      });
    }

    // If we don't have 4 features, fill with fallback data
    while (features.length < 4) {
      const fallbackFeatures = [
        {
          icon: Sparkles,
          title: "Full Service",
          subtitle: "Event Planning"
        },
        {
          icon: MapPin,
          title: "Premium Location",
          subtitle: "Prime Venue"
        }
      ];

      const fallbackIndex = features.length - (metricsData ? Object.keys(metricsData).filter(key =>
        ['attendance_rate', 'satisfaction_score', 'occasions', 'repeat_bookings'].includes(key) && metricsData[key]
      ).length : 0);

      if (fallbackFeatures[fallbackIndex]) {
        features.push(fallbackFeatures[fallbackIndex]);
      } else {
        break;
      }
    }

    return features.slice(0, 4);
  }, [metricsData]);

  // Get the first available event type's images as fallback
  const allEvents = getAllEventTypes();
  const firstEvent = allEvents.find(event => event.media) || allEvents[0];

  // Get images from Event Space first, then fallback to others
  const mainImage = getMainImage('Event Space') || getMainImage('Birthday') || getMainImage('Corporate');
  const landingImage = getLandingImage('Event Space') || getLandingImage('Birthday') || getLandingImage('Corporate');

  // Fallback images if no API data
  const fallbackMainImage = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=600&fit=crop";
  const fallbackLandingImage = "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop";

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <img
            src={landingImage || fallbackLandingImage}
            alt="Event space background"
            loading="lazy"
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.target.src = fallbackLandingImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1a1d21]/50 to-[#1a1d21]" />
        </div>

        {/* Event Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/20">
            <defs>
              <pattern id="eventPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="2" fill="currentColor"/>
                <circle cx="20" cy="20" r="1" fill="currentColor"/>
                <circle cx="60" cy="60" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#eventPattern)"/>
          </svg>
        </div>

        {/* Floating Event Icons */}
        <div className="absolute top-1/4 left-1/4 opacity-10">
          <svg width="150" height="150" viewBox="0 0 150 150" className="text-red-500/30">
            <g transform="translate(75,75)">
              <rect x="-30" y="-20" width="60" height="40" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="0" cy="0" r="15" fill="currentColor" opacity="0.3"/>
              <path d="M-10,-30 L10,-30 M-10,-25 L10,-25" stroke="currentColor" strokeWidth="2"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-2 border-red-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 left-40 w-16 h-16 bg-red-500/10 transform rotate-45"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-10 w-8 h-8 bg-red-500/20 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Calendar className="w-4 h-4 text-red-500" />
                <span className="text-red-500 text-sm font-semibold">Premium Event Spaces</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-sansitaOne leading-tight">
                Celebrate Your
                <span className="block text-red-500">Special Moments</span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                Host unforgettable events at FNF Arena with our premium banquet hall and beautiful lawn spaces designed for celebrations of all sizes.
              </p>
            </div>

            {/* Features Grid - Dynamic Metrics */}
            {/* <div className="grid grid-cols-2 gap-4">
              {featuresData.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={`feature-${index}`}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <IconComponent className="w-6 h-6 text-red-500" />
                    <div>
                      <h4 className="text-white font-semibold text-sm">{feature.title}</h4>
                      <p className="text-gray-400 text-xs">{feature.subtitle}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div> */}

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button
                onClick={() => navigate('/Contact')}
                className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                Book Event Space
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToGallery}
                className="border-2 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                View Gallery
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Event Space Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={mainImage || fallbackMainImage}
                  alt="Event space at FNF Arena"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = fallbackMainImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating Event Info Cards - Dynamic based on metrics */}
              {metricsData && (
                <>
                  <motion.div
                    className="absolute -top-4 -right-4 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-white font-semibold text-sm">Attendance</div>
                    <div className="text-red-500 font-bold">{metricsData.attendance_rate}{metricsData.attendance_rate_suffix}</div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  >
                    <div className="text-white font-semibold text-sm">Occasions</div>
                    <div className="text-red-500 font-bold">{metricsData.occasions}{metricsData.occasions_suffix}</div>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 -left-6 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <div className="text-white font-semibold text-sm">Satisfaction</div>
                    <div className="text-red-500 text-xs">{metricsData.satisfaction_score}{metricsData.satisfaction_score_suffix}</div>
                  </motion.div>
                </>
              )}

              {/* Fallback floating cards if no metrics */}
              {!metricsData && (
                <>
                  <motion.div
                    className="absolute -top-4 -right-4 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-white font-semibold text-sm">Banquet Hall</div>
                    <div className="text-red-500 font-bold">500+ Guests</div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  >
                    <div className="text-white font-semibold text-sm">Lawn Space</div>
                    <div className="text-red-500 font-bold">Outdoor Events</div>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 -left-6 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <div className="text-white font-semibold text-sm">Full Service</div>
                    <div className="text-red-500 text-xs">Event Planning</div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
