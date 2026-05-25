"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Building2,
  Star,
  Target,
  Trophy,
  Users,
  Gamepad2,
  Award,
  Briefcase,
  Handshake,
  Zap,
  Clock,
  Heart,
  MapPin,
  Phone,
  TrendingUp,
  Shield,
  Lightbulb,
  Rocket,
  Globe,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  DollarSign,
  CheckCircle,
  Layers,
  Network,
  Cpu,
  Database,
  Cloud
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEventData } from "../../Context/EventDataContext";

export default function CorporateHero({onPlanClick}) {
  const navigate = useNavigate();

  // Use EventDataContext for Corporate data
  const {
    getEventByType,
    getLandingImage,
    getEventMetrics,
    eventMetrics,
    loading,
    error
  } = useEventData();

  // Get Corporate-specific data
  const corporateData = useMemo(() => {
    const eventData = getEventByType('Corporate');
    let metrics = getEventMetrics('Corporate');

    // If normalized metrics is null, try to find it in raw data
    if (!metrics && eventMetrics && eventMetrics.length > 0) {
      metrics = eventMetrics.find(metric =>
        metric.event_type_name === 'Corporate' && metric.status === 'active'
      );
    }

    return {
      landingImage: getLandingImage('Corporate'),
      metrics: metrics
    };
  }, [getEventByType, getLandingImage, getEventMetrics, eventMetrics]);

  // Helper function to format metric names
  const formatMetricName = (name) => {
    if (!name) return "Metric";
    return name
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Create stats array from metrics data
  const statsData = useMemo(() => {
    if (!corporateData.metrics) {
      // Fallback data
      return [
        {
          icon: Building2,
          number: "300+",
          label: "Corporate Events"
        },
        {
          icon: Star,
          number: "4.8",
          label: "Client Rating"
        },
        {
          icon: Users,
          number: "8K+",
          label: "Team Players"
        },
        {
          icon: Trophy,
          number: "95%",
          label: "Success Rate"
        }
      ];
    }

    const stats = [];
    const metrics = corporateData.metrics;

    // Extract metrics from the actual API structure
    if (metrics.attendance_rate) {
      stats.push({
        icon: Users,
        number: `${metrics.attendance_rate}${metrics.attendance_rate_suffix || ''}`,
        label: formatMetricName('attendance_rate')
      });
    }

    if (metrics.satisfaction_score) {
      stats.push({
        icon: Star,
        number: `${metrics.satisfaction_score}${metrics.satisfaction_score_suffix || ''}`,
        label: formatMetricName('satisfaction_score')
      });
    }

    if (metrics.occasions) {
      stats.push({
        icon: Building2,
        number: `${metrics.occasions}${metrics.occasions_suffix || ''}`,
        label: formatMetricName('occasions')
      });
    }

    if (metrics.repeat_bookings) {
      stats.push({
        icon: TrendingUp,
        number: `${metrics.repeat_bookings}${metrics.repeat_bookings_suffix || ''}`,
        label: formatMetricName('repeat_bookings')
      });
    }

    // If we don't have 4 stats, fill with fallback data
    while (stats.length < 4) {
      const fallbackStats = [
        {
          icon: Clock,
          number: "2-8",
          label: "Hour Events"
        },
        {
          icon: Trophy,
          number: "95%",
          label: "Success Rate"
        }
      ];

      const fallbackIndex = stats.length - (metrics ? Object.keys(metrics).filter(key =>
        ['attendance_rate', 'satisfaction_score', 'occasions', 'repeat_bookings'].includes(key) && metrics[key]
      ).length : 0);

      if (fallbackStats[fallbackIndex]) {
        stats.push(fallbackStats[fallbackIndex]);
      } else {
        break;
      }
    }

    return stats.slice(0, 4);
  }, [corporateData.metrics]);

  // Background image with fallback
  const backgroundImage = corporateData.landingImage || "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31]">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Corporate team building background"
          className="w-full h-full object-cover opacity-30"
          onError={(e) => {
            e.target.src = "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Animated Background Grid Pattern */}
      <div className="absolute inset-0 z-10">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <defs>
            <pattern id="corporateGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-blue-500"/>
              <path d="M25,50 L75,50 M50,25 L50,75" stroke="currentColor" strokeWidth="0.5" className="text-white/15"/>
              <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/20"/>
            </pattern>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.1)" />
              <stop offset="50%" stopColor="rgba(147,51,234,0.1)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0.1)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#corporateGrid)"/>
          <rect width="100%" height="100%" fill="url(#gridGradient)"/>
        </svg>
      </div>

      {/* Corporate Floating Elements Animation */}
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        {/* Business Icons Floating Animation */}
        {[
          { icon: Building2, color: "text-blue-500/40", size: "w-6 h-6" },
          { icon: TrendingUp, color: "text-green-500/40", size: "w-5 h-5" },
          { icon: Target, color: "text-purple-500/40", size: "w-4 h-4" },
          { icon: Trophy, color: "text-yellow-500/40", size: "w-5 h-5" },
          { icon: Award, color: "text-orange-500/40", size: "w-4 h-4" },
          { icon: Briefcase, color: "text-cyan-500/40", size: "w-5 h-5" },
          { icon: Handshake, color: "text-pink-500/40", size: "w-6 h-6" },
          { icon: Shield, color: "text-indigo-500/40", size: "w-4 h-4" },
          { icon: Lightbulb, color: "text-yellow-400/40", size: "w-5 h-5" },
          { icon: Rocket, color: "text-red-500/40", size: "w-4 h-4" },
          { icon: Globe, color: "text-blue-400/40", size: "w-5 h-5" },
          { icon: BarChart3, color: "text-green-400/40", size: "w-4 h-4" },
          { icon: PieChart, color: "text-purple-400/40", size: "w-5 h-5" },
          { icon: LineChart, color: "text-cyan-400/40", size: "w-4 h-4" },
          { icon: DollarSign, color: "text-emerald-500/40", size: "w-5 h-5" },
          { icon: CheckCircle, color: "text-green-500/40", size: "w-4 h-4" },
          { icon: Layers, color: "text-slate-500/40", size: "w-5 h-5" },
          { icon: Network, color: "text-blue-300/40", size: "w-4 h-4" },
          { icon: Cpu, color: "text-orange-400/40", size: "w-5 h-5" },
          { icon: Database, color: "text-gray-500/40", size: "w-4 h-4" },
          { icon: Cloud, color: "text-sky-500/40", size: "w-5 h-5" },
          { icon: Settings, color: "text-gray-400/40", size: "w-4 h-4" }
        ].map((item, i) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={i}
              className={`absolute ${item.color}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, Math.random() * 360, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            >
              <IconComponent className={item.size} />
            </motion.div>
          );
        })}
      </div>

      {/* Corporate Data Particles */}
      <div className="absolute inset-0 z-16 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 6 + 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          >
            <div className={`w-2 h-2 rounded-full ${
              i % 4 === 0 ? 'bg-blue-500/50' :
              i % 4 === 1 ? 'bg-purple-500/50' :
              i % 4 === 2 ? 'bg-cyan-500/50' : 'bg-green-500/50'
            }`} />
          </motion.div>
        ))}
      </div>

      {/* Large Floating Corporate Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 text-blue-500/15"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            y: [-10, 10, -10]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Building2 className="w-24 h-24" />
        </motion.div>

        <motion.div
          className="absolute top-40 right-32 text-purple-500/15"
          animate={{
            rotate: [0, -180, 0],
            x: [-20, 20, -20],
            scale: [0.8, 1.4, 0.8]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <TrendingUp className="w-20 h-20" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-40 text-yellow-500/15"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.5, 1],
            x: [0, 30, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        >
          <Trophy className="w-22 h-22" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-20 text-cyan-500/12"
          animate={{
            rotate: [0, 360],
            y: [-30, 30, -30],
            scale: [0.9, 1.4, 0.9]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <Rocket className="w-28 h-28" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-1/4 text-green-500/15"
          animate={{
            rotate: [0, -180, 0],
            x: [-15, 15, -15],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-18 h-18" />
        </motion.div>

        <motion.div
          className="absolute top-1/3 left-1/4 text-orange-500/12"
          animate={{
            rotate: [0, 90, 180],
            y: [-20, 20, -20],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        >
          <Lightbulb className="w-20 h-20" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/3 text-pink-500/12"
          animate={{
            rotate: [0, -90, -180],
            x: [-25, 25, -25],
            scale: [0.8, 1.4, 0.8]
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        >
          <Globe className="w-16 h-16" />
        </motion.div>

        <motion.div
          className="absolute top-1/4 right-1/3 text-indigo-500/12"
          animate={{
            rotate: [0, 270, 360],
            y: [-15, 15, -15],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        >
          <BarChart3 className="w-18 h-18" />
        </motion.div>
      </div>

      {/* Corporate Success Metrics Floating */}
      <div className="absolute inset-0 z-18 pointer-events-none">
        {[
          { text: "ROI+", x: "15%", y: "25%", color: "text-green-400/60" },
          { text: "KPI↗", x: "85%", y: "30%", color: "text-blue-400/60" },
          { text: "Q4", x: "20%", y: "70%", color: "text-purple-400/60" },
          { text: "B2B", x: "80%", y: "75%", color: "text-cyan-400/60" },
          { text: "API", x: "10%", y: "50%", color: "text-orange-400/60" },
          { text: "SLA", x: "90%", y: "45%", color: "text-pink-400/60" }
        ].map((item, i) => (
          <motion.div
            key={`metric-${i}`}
            className={`absolute ${item.color} font-bold text-lg`}
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 4 + 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          >
            {item.text}
          </motion.div>
        ))}
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
            className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Zap className="w-5 h-5 text-blue-500" />
            <span className="text-blue-400 font-semibold">Ultimate Corporate Gaming Experience</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 font-sansitaOne leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Level Up Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">
              Team Spirit
            </span>
            <br />
            Through Gaming
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Transform your corporate events into epic gaming adventures. From bowling tournaments to laser tag battles,
            create team-building experiences that strengthen bonds and boost morale at FNF Arena.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
             <motion.button
              onClick={onPlanClick}
              className="px-10 py-5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-blue-500/30"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(59,130,246,0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Plan your corporate gaming event"
            >
              <Calendar className="w-6 h-6" />
              Plan Corporate Event
            </motion.button>

            <motion.button
              onClick={() => navigate("/all-activities")}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Explore gaming zones"
            >
              <Gamepad2 className="w-6 h-6" />
              Explore Gaming Zones
            </motion.button>
          </motion.div>
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
      <div className="absolute left-0 right-0 bottom-0 h-6" aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%),
            linear-gradient(45deg,rgba(255,255,255) 25%,transparent 25%,transparent 75%,rgba(255,255,255) 75%),
            linear-gradient(180deg,#3984f5,#a358f6)
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
