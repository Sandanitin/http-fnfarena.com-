"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Gift,
  Star,
  Sparkles,
  Heart,
  PartyPopper,
  Cake,
  Circle,
  Users,
  Clock,
  MapPin,
  Phone,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEventData } from "../../Context/EventDataContext";

export default function BirthdayHero({ bookingRef }) {
  const navigate = useNavigate();

  // Use EventDataContext for Birthday data
  const {
    getEventByType,
    getLandingImage,
    getEventMetrics,
    eventMetrics,
    loading,
    error,
  } = useEventData();

  // Get Birthday-specific data
  const birthdayData = useMemo(() => {
    const eventData = getEventByType("Birthday");
    let metrics = getEventMetrics("Birthday");

    // If normalized metrics is null, try to find it in raw data
    if (!metrics && eventMetrics && eventMetrics.length > 0) {
      metrics = eventMetrics.find(
        (metric) =>
          metric.event_type_name === "Birthday" && metric.status === "active",
      );
    }

    return {
      landingImage: getLandingImage("Birthday"),
      metrics: metrics,
    };
  }, [getEventByType, getLandingImage, getEventMetrics, eventMetrics]);

  // Helper function to format metric names
  const formatMetricName = (name) => {
    if (!name) return "Metric";
    return name
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Create stats array from metrics data
  const statsData = useMemo(() => {
    if (!birthdayData.metrics) {
      // Fallback data
      return [
        {
          icon: Users,
          number: "500+",
          label: "Happy Birthdays",
        },
        {
          icon: Star,
          number: "4.9",
          label: "Star Rating",
        },
        {
          icon: Clock,
          number: "2-4",
          label: "Hour Parties",
        },
        {
          icon: Heart,
          number: "100%",
          label: "Satisfaction",
        },
      ];
    }

    const stats = [];
    const metrics = birthdayData.metrics;

    // Extract metrics from the actual API structure
    if (metrics.attendance_rate) {
      stats.push({
        icon: Users,
        number: `${metrics.attendance_rate}${metrics.attendance_rate_suffix || ""}`,
        label: formatMetricName("attendance_rate"),
      });
    }

    if (metrics.satisfaction_score) {
      stats.push({
        icon: Star,
        number: `${metrics.satisfaction_score}${metrics.satisfaction_score_suffix || ""}`,
        label: formatMetricName("satisfaction_score"),
      });
    }

    if (metrics.occasions) {
      stats.push({
        icon: Calendar,
        number: `${metrics.occasions}${metrics.occasions_suffix || ""}`,
        label: formatMetricName("occasions"),
      });
    }

    if (metrics.repeat_bookings) {
      stats.push({
        icon: TrendingUp,
        number: `${metrics.repeat_bookings}${metrics.repeat_bookings_suffix || ""}`,
        label: formatMetricName("repeat_bookings"),
      });
    }

    // If we don't have 4 stats, fill with fallback data
    while (stats.length < 4) {
      const fallbackStats = [
        {
          icon: Clock,
          number: "2-4",
          label: "Hour Parties",
        },
        {
          icon: Heart,
          number: "100%",
          label: "Satisfaction",
        },
      ];

      const fallbackIndex =
        stats.length -
        (metrics
          ? Object.keys(metrics).filter(
              (key) =>
                [
                  "attendance_rate",
                  "satisfaction_score",
                  "occasions",
                  "repeat_bookings",
                ].includes(key) && metrics[key],
            ).length
          : 0);

      if (fallbackStats[fallbackIndex]) {
        stats.push(fallbackStats[fallbackIndex]);
      } else {
        break;
      }
    }

    return stats.slice(0, 4);
  }, [birthdayData.metrics]);

  // Background image with fallback
  const backgroundImage =
    birthdayData.landingImage ||
    "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1464207687429-7505649dae38?w=1920&h=1080&fit=crop&crop=center";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31]">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Birthday celebration background"
          className="w-full h-full object-cover opacity-40"
          onError={(e) => {
            e.target.src =
              "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1464207687429-7505649dae38?w=1920&h=1080&fit=crop&crop=center";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 1200 800"
        >
          <defs>
            <pattern
              id="birthdayPattern"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="60"
                cy="60"
                r="3"
                fill="currentColor"
                className="text-red-500"
              />
              <path
                d="M30,60 L90,60 M60,30 L60,90"
                stroke="currentColor"
                strokeWidth="1"
                className="text-white/20"
              />
              <circle
                cx="60"
                cy="60"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-red-500/30"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#birthdayPattern)" />
        </svg>
      </div>

      {/* Snowfall Animation */}
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
            animate={{
              y: ["-10vh", "110vh"],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Floating Birthday Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 text-red-500/20"
          animate={{
            rotate: 360,
            scale: [1, 1.3, 1],
            y: [-10, 10, -10],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Cake className="w-20 h-20" />
        </motion.div>

        <motion.div
          className="absolute top-40 right-32 text-purple-500/20"
          animate={{
            rotate: -360,
            x: [-20, 20, -20],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <Circle className="w-16 h-16" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-40 text-yellow-500/20"
          animate={{
            rotate: 180,
            scale: [1, 1.4, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <PartyPopper className="w-18 h-18" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-20 text-pink-500/15"
          animate={{
            rotate: 360,
            y: [-30, 30, -30],
            scale: [0.9, 1.3, 0.9],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <Gift className="w-24 h-24" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-1/4 text-blue-500/20"
          animate={{
            rotate: -180,
            x: [-15, 15, -15],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="w-14 h-14" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Sparkles className="w-5 h-5 text-red-500" />
            <span className="text-red-400 font-semibold">
              Ultimate Birthday Experience
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 font-sansitaOne leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Make Every
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">
              Birthday
            </span>
            <br />
            Legendary
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Transform your special day into an unforgettable adventure with our
            premium birthday packages. From thrilling activities to magical
            moments, we create celebrations that last a lifetime.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              onClick={() => {
                bookingRef?.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="px-10 py-5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-red-500/30"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(239,68,68,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Plan your birthday celebration"
            >
              <Calendar className="w-6 h-6" />
              Plan My Birthday
            </motion.button>

            <motion.button
              onClick={() => navigate("/all-activities")}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Explore birthday activities"
            >
              <Gift className="w-6 h-6" />
              Explore Activities
            </motion.button>
          </motion.div>

          {/* Quick Stats - Dynamic from API */}
          {/* <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {statsData.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={`stat-${index}`} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-center mb-3">
                    <IconComponent className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </motion.div> */}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
      <div
        className="absolute left-0 right-0 bottom-0 h-6"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%),
            linear-gradient(45deg,rgba(255,255,255) 25%,transparent 25%,transparent 75%,rgba(255,255,255) 75%),
            linear-gradient(180deg,#b92a2a,#f97316)
          `,
          backgroundSize: "28px 28px,28px 28px,auto",
          backgroundPosition: "0 0,14px 14px,0 0",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(0,0,0,.6)",
        }}
      />
    </section>
  );
}
