"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Camera,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  PartyPopper,
  Cake,
  Trophy,
  Star,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEventData } from "../../Context/EventDataContext";

export default function BirthdayActivities({ bookingRef }) {
  const navigate = useNavigate();

  // Use EventDataContext for Birthday data
  const {
    getEventByType,
    getEventPackages,
    getGalleryImages,
    getEventVideos,
    getMainImage,
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
      packages: getEventPackages("Birthday"),
      galleryImages: getGalleryImages("Birthday"),
      videos: getEventVideos("Birthday"),
      mainImage: getMainImage("Birthday"),
      metrics: metrics,
    };
  }, [
    getEventByType,
    getEventPackages,
    getGalleryImages,
    getEventVideos,
    getMainImage,
    getEventMetrics,
    eventMetrics,
  ]);

  // Transform packages for display
  const activities = useMemo(() => {
    if (!birthdayData.packages || birthdayData.packages.length === 0) {
      // Fallback data
      return [
        {
          icon: PartyPopper,
          name: "Ultimate Birthday Package",
          description:
            "Complete birthday celebration with activities, decorations, cake, and dedicated party host to make your special day unforgettable",
          ageGroup: "All ages",
          duration: "3 hours",
          color: "from-orange-500/20 to-yellow-500/20",
          borderColor: "border-orange-500/30",
          image:
            "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
          benefits: [
            "Dedicated Party Host",
            "Custom Decorations",
            "Birthday Cake Included",
            "Activity Selection",
          ],
        },
        {
          icon: Cake,
          name: "Premium Birthday Experience",
          description:
            "Luxury birthday celebration with premium activities, professional photography, custom cake, and VIP treatment for the birthday star",
          ageGroup: "All ages",
          duration: "4 hours",
          color: "from-red-500/20 to-orange-500/20",
          borderColor: "border-red-500/30",
          image:
            "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop",
          benefits: [
            "Professional Photography",
            "VIP Treatment",
            "Custom Themed Cake",
            "Premium Activities",
          ],
        },
      ];
    }

    return birthdayData.packages.map((pkg, index) => {
      const iconMap = [PartyPopper, Cake, Gift];
      const colorMap = [
        {
          color: "from-orange-500/20 to-yellow-500/20",
          borderColor: "border-orange-500/30",
        },
        {
          color: "from-red-500/20 to-orange-500/20",
          borderColor: "border-red-500/30",
        },
        {
          color: "from-purple-500/20 to-pink-500/20",
          borderColor: "border-purple-500/30",
        },
      ];

      return {
        icon: iconMap[index % 3],
        name: pkg.title,
        description: pkg.description,
        ageGroup: pkg.ageGroup || "All ages",
        duration: pkg.duration ? `${pkg.duration} hours` : "3 hours",
        image:
          pkg.image ||
          birthdayData.mainImage ||
          "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
        benefits: pkg.features.filter(Boolean),
        ...colorMap[index % 3],
      };
    });
  }, [birthdayData.packages, birthdayData.mainImage]);

  // Transform gallery images for display
  const galleryImages = useMemo(() => {
    if (
      !birthdayData.galleryImages ||
      birthdayData.galleryImages.length === 0
    ) {
      // Fallback gallery
      return [
        {
          id: 1,
          src: "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
          alt: "Kids celebrating birthday party",
          title: "Birthday Joy",
          description: "Pure happiness and celebration",
        },
        {
          id: 2,
          src: "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop",
          alt: "Birthday cake celebration",
          title: "Sweet Moments",
          description: "Making wishes come true",
        },
        {
          id: 3,
          src: "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1511593358241-7eea1f3c84e5?w=600&h=400&fit=crop",
          alt: "Birthday party games",
          title: "Fun & Games",
          description: "Laughter and excitement",
        },
        {
          id: 4,
          src: "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
          alt: "Birthday celebration",
          title: "Party Time",
          description: "Unforgettable celebrations",
        },
        {
          id: 5,
          src: "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1513475382585-d06e58bcb0e0?w=800&h=500&fit=crop",
          alt: "Birthday memories",
          title: "Magical Memories",
          description: "Moments to treasure forever",
        },
        {
          id: 6,
          src: "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop",
          alt: "Birthday archery fun",
          title: "Adventure Time",
          description: "Exciting birthday adventures",
        },
      ];
    }

    // Combine gallery images and videos
    const allMedia = [];

    // Add gallery images
    birthdayData.galleryImages.forEach((image, index) => {
      allMedia.push({
        id: `img-${index}`,
        src: image,
        alt: `Birthday celebration ${index + 1}`,
        title: `Birthday Memory ${index + 1}`,
        description: "Unforgettable birthday moments",
      });
    });

    // Add videos as images (thumbnails)
    birthdayData.videos.forEach((video, index) => {
      allMedia.push({
        id: `vid-${index}`,
        src: video.thumbnail || birthdayData.mainImage || video.url,
        alt: `Birthday video ${index + 1}`,
        title:
          video.label && video.label.length > 0
            ? video.label[0]
            : `Birthday Video ${index + 1}`,
        description: "Birthday celebration highlights",
      });
    });

    // If we have main image, add it as first item
    if (birthdayData.mainImage && allMedia.length > 0) {
      allMedia.unshift({
        id: "main",
        src: birthdayData.mainImage,
        alt: "Birthday celebration main",
        title: "Birthday Joy",
        description: "Pure happiness and celebration",
      });
    }

    return allMedia.slice(0, 6); // Limit to 6 images
  }, [birthdayData.galleryImages, birthdayData.videos, birthdayData.mainImage]);

  // Helper function to format metric names
  const formatMetricName = (name) => {
    if (!name) return "Metric";
    return name
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Create metrics stats
  const metricsStats = useMemo(() => {
    if (!birthdayData.metrics) {
      // Fallback stats
      return [
        {
          icon: Users,
          number: "85%",
          label: "Attendance Rate",
          description: "Average turnout",
        },
        {
          icon: Star,
          number: "95+",
          label: "Satisfaction Score",
          description: "Customer happiness",
        },
        {
          icon: TrendingUp,
          number: "40%",
          label: "Repeat Bookings",
          description: "Returning customers",
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
        description: "Average turnout",
      });
    }

    if (metrics.satisfaction_score) {
      stats.push({
        icon: Star,
        number: `${metrics.satisfaction_score}${metrics.satisfaction_score_suffix || ""}`,
        label: formatMetricName("satisfaction_score"),
        description: "Customer happiness",
      });
    }

    if (metrics.repeat_bookings) {
      stats.push({
        icon: TrendingUp,
        number: `${metrics.repeat_bookings}${metrics.repeat_bookings_suffix || ""}`,
        label: formatMetricName("repeat_bookings"),
        description: "Returning customers",
      });
    }

    // If we don't have 3 stats, add occasions if available
    if (stats.length < 3 && metrics.occasions) {
      stats.push({
        icon: Calendar,
        number: `${metrics.occasions}${metrics.occasions_suffix || ""}`,
        label: formatMetricName("occasions"),
        description: "Total celebrations",
      });
    }

    return stats.slice(0, 3);
  }, [birthdayData.metrics]);

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] overflow-hidden">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading birthday packages...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 1200 800"
        >
          <defs>
            <pattern
              id="activityPattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="50"
                cy="50"
                r="2"
                fill="currentColor"
                className="text-orange-500"
              />
              <path
                d="M25,50 L75,50 M50,25 L50,75"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-white/10"
              />
              <circle
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-orange-500/20"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#activityPattern)" />
        </svg>
      </div>

      {/* Floating Activity Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 text-orange-500/10"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Trophy className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-40 text-yellow-500/10"
          animate={{ rotate: -360, y: [-20, 20, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-500/5"
          animate={{ rotate: 180, scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-20 h-20" />
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
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Gift className="w-4 h-4 text-orange-500" />
            <span className="text-orange-500 text-sm font-semibold">
              Birthday Packages
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Endless <span className="text-orange-500">Birthday Fun</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Choose from our specially designed birthday packages that include
            everything you need for the perfect celebration. Each package is
            tailored to create magical memories.
            <br />
            <span className="text-red-600">
              Bookings should be prior 3 days with 50% advance payment.
            </span>
          </p>
        </motion.div>

        {/* Birthday Packages in Zig-Zag Layout */}
        <div className="space-y-20 mb-32">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={`${activity.name}-${index}`}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  !isEven ? "lg:grid-flow-col-dense" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Image Section */}
                <div className={`relative ${!isEven ? "lg:col-start-2" : ""}`}>
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
                        e.target.src =
                          "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Floating Icon */}
                    <div className="absolute top-6 right-6">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl"
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
                              {activity.ageGroup}
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
                <div className={`space-y-6 ${!isEven ? "lg:col-start-1" : ""}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-orange-400">
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
                        <div
                          key={benefitIndex}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                          <span className="text-gray-200 font-medium">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Package Info Cards */}
                  {/* <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-orange-400" />
                        <span className="text-gray-400 text-sm">Age Group</span>
                      </div>
                      <span className="text-white font-semibold">{activity.ageGroup}</span>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-orange-400" />
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

        {/* Memories Gallery Section */}
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
              className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Camera className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500 text-sm font-semibold">
                Birthday Gallery
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
              Memories That{" "}
              <span className="text-orange-500">Last Forever</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Capture every magical moment of your birthday celebration. From
              joyful smiles to special surprises, we help create memories that
              will be treasured for years to come.
            </p>
          </div>

          {/* Improved Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {/* Large featured image - spans 2x2 */}
            {galleryImages.length > 0 && (
              <motion.div
                className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20"
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
                    e.target.src =
                      "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-6 right-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {galleryImages[0].title}
                  </h3>
                  <p className="text-gray-300">
                    {galleryImages[0].description}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Regular images */}
            {galleryImages.slice(1).map((image, index) => (
              <motion.div
                key={image.id}
                className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 aspect-square"
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
                    e.target.src =
                      "https://https://cdn.acsdev.in/FNF/699b2a2a165ff.jpegh.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {image.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Book Your Celebration CTA */}
        <motion.div
          className="relative bg-gradient-to-r from-red-500/20 via-red-600/10 to-red-500/20 rounded-3xl p-12 border border-red-500/30 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Animation */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-red-600/5 to-red-500/5"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(239,68,68,0.05) 0%, rgba(220,38,38,0.05) 50%, rgba(239,68,68,0.05) 100%)",
                  "linear-gradient(225deg, rgba(239,68,68,0.05) 0%, rgba(220,38,38,0.05) 50%, rgba(239,68,68,0.05) 100%)",
                  "linear-gradient(45deg, rgba(239,68,68,0.05) 0%, rgba(220,38,38,0.05) 50%, rgba(239,68,68,0.05) 100%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          <div className="relative z-10 text-center">
            <motion.div
              className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Calendar className="w-4 h-4 text-red-500" />
              <span className="text-red-500 text-sm font-semibold">
                Ready to Celebrate?
              </span>
            </motion.div>

            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Book Your <span className="text-red-500">Dream Birthday</span>
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Create unforgettable memories with our premium birthday packages.
              From magical moments to joyful celebrations, we make every
              birthday extraordinary.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button
                onClick={() => {
                  bookingRef?.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-500/25"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(239,68,68,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Book birthday celebration now"
              >
                <Calendar className="w-5 h-5" />
                Book Now
              </motion.button>

              <motion.button
                onClick={() => navigate("/plan")}
                className="px-8 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl border border-red-500/20 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View birthday packages"
              >
                <Gift className="w-5 h-5" />
                View Packages
              </motion.button>
            </div>

            {/* Quick Info */}
            {/* <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span>2-4 Hour Celebrations</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-red-400" />
                <span>Up to 20 Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Multiple Party Zones</span>
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
