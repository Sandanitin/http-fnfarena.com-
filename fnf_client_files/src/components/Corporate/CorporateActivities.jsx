"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Camera,
  Users,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Trophy,
  Target,
  Star,
  Gamepad2,
  Award,
  Zap,
  Shield,
  Crosshair,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEventData } from "../../Context/EventDataContext";

export default function CorporateActivities({ bookingRef, onBookNow }) {
  const navigate = useNavigate();

  // Use EventDataContext for Corporate data
  const {
    getEventByType,
    getEventPackages,
    getGalleryImages,
    getEventVideos,
    getMainImage,
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
      packages: getEventPackages('Corporate'),
      galleryImages: getGalleryImages('Corporate'),
      videos: getEventVideos('Corporate'),
      mainImage: getMainImage('Corporate'),
      metrics: metrics
    };
  }, [getEventByType, getEventPackages, getGalleryImages, getEventVideos, getMainImage, getEventMetrics, eventMetrics]);

  // Transform packages for display
  const activities = useMemo(() => {
    if (!corporateData.packages || corporateData.packages.length === 0) {
      // Fallback data
      return [
        {
          icon: Users,
          name: "Team Building Package",
          description: "Complete corporate team-building experience with bowling, laser tag, and strategic activities designed to strengthen bonds and boost morale",
          groupSize: "15-40 people",
          duration: "4 hours",
          color: "from-blue-500/20 to-cyan-500/20",
          borderColor: "border-blue-500/30",
          image: "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg",
          benefits: ["Professional Event Coordinator", "Multiple Gaming Zones", "Team Competition Scoring", "Networking Opportunities"]
        },
        {
          icon: Trophy,
          name: "Corporate Championship",
          description: "Premium corporate gaming tournament with professional scoring, awards ceremony, and VIP treatment for executive team building events",
          groupSize: "20-80 people",
          duration: "6 hours",
          color: "from-purple-500/20 to-blue-500/20",
          borderColor: "border-purple-500/30",
          image: "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg",
          benefits: ["Professional Photography", "Awards Ceremony", "Executive Lounge Access", "Custom Tournament Brackets"]
        }
      ];
    }

    return corporateData.packages.map((pkg, index) => {
      const iconMap = [Users, Trophy, Building2];
      const colorMap = [
        { color: "from-blue-500/20 to-cyan-500/20", borderColor: "border-blue-500/30" },
        { color: "from-purple-500/20 to-blue-500/20", borderColor: "border-purple-500/30" },
        { color: "from-cyan-500/20 to-purple-500/20", borderColor: "border-cyan-500/30" }
      ];

      return {
        icon: iconMap[index % 3],
        name: pkg.title,
        description: pkg.description,
        groupSize: pkg.groupSize || "15-40 people",
        duration: pkg.duration ? `${pkg.duration} hours` : "4 hours",
        image: pkg.image || corporateData.mainImage || "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg",
        benefits: pkg.features.filter(Boolean),
        ...colorMap[index % 3]
      };
    });
  }, [corporateData.packages, corporateData.mainImage]);

  // Transform gallery images for display
  const galleryImages = useMemo(() => {
    if (!corporateData.galleryImages || corporateData.galleryImages.length === 0) {
      // Fallback gallery
      return [
        {
          id: 1,
          src: "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg",
          alt: "Corporate team bowling tournament",
          title: "Bowling Leagues",
          description: "Strike up team spirit"
        },
        {
          id: 2,
          src: "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg",
          alt: "Corporate laser tag battle",
          title: "Laser Tag Wars",
          description: "Strategic team battles"
        },
        {
          id: 3,
          src: "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg",
          alt: "Corporate arcade gaming",
          title: "Arcade Challenges",
          description: "Competitive gaming fun"
        },
        {
          id: 4,
          src: "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg",
          alt: "Corporate paintball team",
          title: "Paintball Strategy",
          description: "Tactical team building"
        },
        {
          id: 5,
          src: "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg",
          alt: "Corporate awards ceremony",
          title: "Victory Celebration",
          description: "Recognizing team achievements"
        },
        {
          id: 6,
          src: "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg",
          alt: "Corporate team networking",
          title: "Team Networking",
          description: "Building lasting connections"
        }
      ];
    }

    // Combine gallery images and videos
    const allMedia = [];

    // Add gallery images
    corporateData.galleryImages.forEach((image, index) => {
      allMedia.push({
        id: `img-${index}`,
        src: image,
        alt: `Corporate team building ${index + 1}`,
        title: `Team Building ${index + 1}`,
        description: "Corporate gaming excellence"
      });
    });

    // Add videos as images (thumbnails)
    corporateData.videos.forEach((video, index) => {
      allMedia.push({
        id: `vid-${index}`,
        src: video.thumbnail || corporateData.mainImage || video.url,
        alt: `Corporate video ${index + 1}`,
        title: video.label && video.label.length > 0 ? video.label[0] : `Corporate Video ${index + 1}`,
        description: "Team building highlights"
      });
    });

    // If we have main image, add it as first item
    if (corporateData.mainImage && allMedia.length > 0) {
      allMedia.unshift({
        id: 'main',
        src: corporateData.mainImage,
        alt: "Corporate team building main",
        title: "Team Excellence",
        description: "Building stronger teams through gaming"
      });
    }

    return allMedia.slice(0, 6); // Limit to 6 images
  }, [corporateData.galleryImages, corporateData.videos, corporateData.mainImage]);

  // Helper function to format metric names
  const formatMetricName = (name) => {
    if (!name) return "Metric";
    return name
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Create metrics stats
  const metricsStats = useMemo(() => {
    if (!corporateData.metrics) {
      // Fallback stats
      return [
        {
          icon: Users,
          number: "300+",
          label: "Corporate Events",
          description: "Gaming tournaments hosted"
        },
        {
          icon: Star,
          number: "8K+",
          label: "Team Players",
          description: "Across all gaming zones"
        },
        {
          icon: TrendingUp,
          number: "95%",
          label: "Team Satisfaction",
          description: "Return for more events"
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
        label: formatMetricName('attendance_rate'),
        description: "Average turnout"
      });
    }

    if (metrics.satisfaction_score) {
      stats.push({
        icon: Star,
        number: `${metrics.satisfaction_score}${metrics.satisfaction_score_suffix || ''}`,
        label: formatMetricName('satisfaction_score'),
        description: "Client happiness"
      });
    }

    if (metrics.repeat_bookings) {
      stats.push({
        icon: TrendingUp,
        number: `${metrics.repeat_bookings}${metrics.repeat_bookings_suffix || ''}`,
        label: formatMetricName('repeat_bookings'),
        description: "Returning clients"
      });
    }

    // If we don't have 3 stats, add occasions if available
    if (stats.length < 3 && metrics.occasions) {
      stats.push({
        icon: Building2,
        number: `${metrics.occasions}${metrics.occasions_suffix || ''}`,
        label: formatMetricName('occasions'),
        description: "Total corporate events"
      });
    }

    return stats.slice(0, 3);
  }, [corporateData.metrics]);

  // Handle booking button click
  const handleBookNow = () => {
    try {
      if (onBookNow && typeof onBookNow === 'function') {
        onBookNow();
      } else if (bookingRef?.current) {
        // Add a small delay to ensure the element is rendered
        setTimeout(() => {
          bookingRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        }, 100);
      } else {
        // Fallback: try to find the booking section by ID or class
        const bookingSection = document.querySelector('[data-section="corporate-booking"]') ||
                              document.querySelector('#corporate-booking') ||
                              document.querySelector('.corporate-booking');

        if (bookingSection) {
          bookingSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        } else {
          // console.warn('Booking section not found for scrolling');
        }
      }
    } catch (error) {
      // console.error('Error scrolling to booking section:', error);
    }
  };

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] overflow-hidden">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading corporate packages...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 800">
          <defs>
            <pattern id="corporateGamingPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-blue-500"/>
              <path d="M25,50 L75,50 M50,25 L50,75" stroke="currentColor" strokeWidth="0.5" className="text-white/10"/>
              <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/20"/>
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-blue-500/10"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#corporateGamingPattern)"/>
        </svg>
      </div>

      {/* Floating Gaming Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 text-blue-500/10"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Gamepad2 className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-40 text-purple-500/10"
          animate={{ rotate: -360, y: [-20, 20, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <Crosshair className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500/5"
          animate={{ rotate: 180, scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-20 h-20" />
        </motion.div>
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
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Gamepad2 className="w-4 h-4 text-blue-500" />
            <span className="text-blue-500 text-sm font-semibold">Gaming Packages</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Epic <span className="text-blue-500">Corporate Gaming</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Transform your corporate events with our action-packed gaming experiences. From bowling tournaments
            to laser tag battles, create unforgettable team-building adventures at FNF Arena.
          </p>
        </motion.div>

        {/* Gaming Packages in Zig-Zag Layout */}
        <div className="space-y-20 mb-32">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={`${activity.name}-${index}`}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  !isEven ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Image Section */}
                <div className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <motion.div
                    className="relative h-80 rounded-3xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Floating Icon */}
                    <div className="absolute top-6 right-6">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Bottom Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white text-2xl font-bold font-sansitaOne mb-1">
                            {activity.name}
                          </h4>
                          {/* <div className="flex items-center gap-4 text-sm text-gray-300">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {activity.groupSize}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {activity.duration}
                            </span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className={`space-y-6 ${!isEven ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-400">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="text-3xl font-bold text-white font-sansitaOne">
                        {activity.name}
                      </h3>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed">
                      {activity.description}
                    </p>
                  </div>

                  {/* Benefits List */}
                  {activity.benefits.length > 0 && (
                    <div className="space-y-3">
                      {activity.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <span className="text-gray-200 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Package Info Cards */}
                  {/* <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-400 text-sm">Group Size</span>
                      </div>
                      <span className="text-white font-semibold">{activity.groupSize}</span>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-400 text-sm">Duration</span>
                      </div>
                      <span className="text-white font-semibold">{activity.duration}</span>
                    </div>
                  </div> */}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gaming Arena Gallery Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Gallery Header */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Camera className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500 text-sm font-semibold">Gaming Arena</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
              Where Teams <span className="text-blue-500">Level Up</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience the thrill of competitive gaming across multiple zones. From precision bowling
              to strategic laser tag, every activity is designed to challenge and unite your team.
            </p>
          </div>

          {/* Improved Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {/* Large featured image - spans 2x2 */}
            {galleryImages.length > 0 && (
              <motion.div
                className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <img
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-2">{galleryImages[0].title}</h3>
                  <p className="text-gray-300">{galleryImages[0].description}</p>
                </div>
              </motion.div>
            )}

            {/* Regular images */}
            {galleryImages.slice(1).map((image, index) => (
              <motion.div
                key={image.id}
                className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 aspect-square"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-1">{image.title}</h3>
                  <p className="text-gray-300 text-sm">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          
        </motion.div>

        {/* Book Your Gaming Event CTA */}
        <motion.div
          className="relative bg-gradient-to-r from-blue-500/20 via-blue-600/10 to-blue-500/20 rounded-3xl p-12 border border-blue-500/30 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Animation */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-600/5 to-blue-500/5"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(59,130,246,0.05) 0%, rgba(37,99,235,0.05) 50%, rgba(59,130,246,0.05) 100%)",
                  "linear-gradient(225deg, rgba(59,130,246,0.05) 0%, rgba(37,99,235,0.05) 50%, rgba(59,130,246,0.05) 100%)",
                  "linear-gradient(45deg, rgba(59,130,246,0.05) 0%, rgba(37,99,235,0.05) 50%, rgba(59,130,246,0.05) 100%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          <div className="relative z-10 text-center">
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500 text-sm font-semibold">Ready to Game?</span>
            </motion.div>

            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Power Up Your <span className="text-blue-500">Team Spirit</span>
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Book your corporate gaming event at FNF Arena. From bowling strikes to laser tag victories,
              create epic team-building experiences that your employees will never forget.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button
                onClick={handleBookNow}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/25"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59,130,246,0.4)" }}
                whileTap={{ scale: 0.95 }}
                aria-label="Book corporate gaming event now"
              >
                <Calendar className="w-5 h-5" />
                Book Gaming Event
              </motion.button>

              <motion.button
                onClick={() => navigate("/all-activities")}
                className="px-8 py-4 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-bold rounded-xl border border-blue-500/20 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View gaming packages"
              >
                <Gamepad2 className="w-5 h-5" />
                View Gaming Zones
              </motion.button>
            </div>

            {/* Quick Info */}
            {/* <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>2-8 Hour Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>20-150+ Participants</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Multiple Gaming Zones</span>
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
