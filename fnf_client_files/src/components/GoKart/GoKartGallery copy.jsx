"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Heart, Share2, Download, Camera, Trophy, Zap, Target } from "lucide-react";

export default function GoKartGallery({ galleryImages, videos, metrics }) {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  // Use passed metrics
  const goKartMetrics = metrics;

  // Fallback images when API data is not available
  const fallbackImages = [
    {
      src: "https://cdn.acsdev.in/FNF/69e9ee576a97b.jpg",
      alt: "High-speed single kart racing on outdoor track",
      title: "Single Kart Racing",
      category: "Single Kart",
      likes: 285
    },
    {
      src: "https://cdn.acsdev.in/FNF/69e9ee5815536.jpg",
      alt: "Twin kart racing experience for couples",
      title: "Twin Kart Adventure",
      category: "Twin Kart",
      likes: 234
    },
    {
      src: "https://cdn.acsdev.in/FNF/69e9ee59a10de.jpg",
      alt: "Kids enjoying safe go-kart racing",
      title: "Kids Kart Zone",
      category: "Kids Kart",
      likes: 198
    },
    {
      src: "https://cdn.acsdev.in/FNF/69e9ee5815536.jpg",
      alt: "Professional outdoor go-kart racing track",
      title: "Professional Track",
      category: "Facility",
      likes: 267
    },
    {
      src: "https://cdn.acsdev.in/FNF/69e9ee576a97b.jpg",
      alt: "Family enjoying go-kart racing together",
      title: "Family Racing",
      category: "Family",
      likes: 312
    },
    {
      src: "https://cdn.acsdev.in/FNF/69e9ee576a97b.jpg",
      alt: "Go-kart racing competition with timing system",
      title: "Racing Competition",
      category: "Competition",
      likes: 189
    }
  ];

  // Categories for API images
  const categories = ["Single Kart", "Twin Kart", "Kids Kart", "Facility", "Family", "Competition"];
  const titles = [
    "Single Kart Racing",
    "Twin Kart Adventure",
    "Kids Kart Zone",
    "Professional Track",
    "Family Racing",
    "Racing Competition"
  ];

  // Transform API gallery images or use fallback
  const processedImages = React.useMemo(() => {
    if (galleryImages && galleryImages.length > 0) {
      return galleryImages.map((imageUrl, index) => ({
        src: imageUrl,
        alt: `Go-kart racing image ${index + 1}`,
        title: titles[index % titles.length],
        category: categories[index % categories.length],
        likes: Math.floor(Math.random() * 200) + 150 // Random likes between 150-350
      }));
    }
    return fallbackImages;
  }, [galleryImages]);

  const filteredImages = processedImages;

  // Helper function to format metric labels
  const formatLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Dynamic metrics data with fallbacks - using first 4 metrics from API
  const metricsData = React.useMemo(() => {
    const fallbackMetrics = [
      { value: "15", label: "Racing Karts", color: "red" },
      { value: "3", label: "Kart Types", color: "amber" },
      { value: "12", label: "Hours Daily", color: "orange" },
      { value: "100%", label: "Safe Racing", color: "red" }
    ];

    if (!goKartMetrics) {
      return fallbackMetrics;
    }

    // Extract first 4 metrics from the API data
    const dynamicMetrics = [];

    // Map available metrics fields to display values - first 4 metrics
    const metricsMapping = [
      {
        field: 'participation_rate',
        suffix: 'participation_rate_suffix',
        label: formatLabel('participation_rate'),
        color: 'red'
      },
      {
        field: 'average_score',
        suffix: 'average_score_suffix',
        label: formatLabel('average_score'),
        color: 'amber'
      },
      {
        field: 'completion_time',
        suffix: 'completion_time_suffix',
        label: formatLabel('completion_time'),
        color: 'orange'
      },
      {
        field: 'satisfaction_rate',
        suffix: 'satisfaction_rate_suffix',
        label: formatLabel('satisfaction_rate'),
        color: 'red'
      }
    ];

    metricsMapping.forEach((mapping, index) => {
      const value = goKartMetrics[mapping.field];
      const suffix = goKartMetrics[mapping.suffix] || '';

      if (value) {
        dynamicMetrics.push({
          value: `${value}${suffix}`,
          label: mapping.label,
          color: mapping.color
        });
      } else {
        // Use fallback if metric is not available
        if (index < fallbackMetrics.length) {
          dynamicMetrics.push(fallbackMetrics[index]);
        }
      }
    });

    // If we don't have enough metrics, fill with fallbacks
    while (dynamicMetrics.length < 4) {
      const fallbackIndex = dynamicMetrics.length;
      if (fallbackIndex < fallbackMetrics.length) {
        dynamicMetrics.push(fallbackMetrics[fallbackIndex]);
      }
    }

    return dynamicMetrics.slice(0, 4);
  }, [goKartMetrics]);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const getGradientClasses = (color) => {
    switch (color) {
      case 'red':
        return 'from-red-500/20 to-amber-500/20 border-red-500/30 text-red-600';
      case 'amber':
        return 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-500';
      case 'orange':
        return 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-600';
      default:
        return 'from-red-500/20 to-amber-500/20 border-red-500/30 text-red-600';
    }
  };

  return (
    <section id="GoKartGallery" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* Enhanced Go Kart Gallery Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Racing Track Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-400/20">
            <defs>
              <pattern id="raceGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="40" cy="40" r="3" fill="currentColor"/>
                <path d="M20,40 Q40,20 60,40 Q40,60 20,40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#raceGrid)"/>
          </svg>
        </div>

        {/* Floating Racing Elements */}
        <motion.div
          className="absolute top-20 right-20 opacity-12"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-32 h-32 border-4 border-red-400/30 rounded-full flex items-center justify-center">
            <Camera className="w-16 h-16 text-red-400/50" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-16 opacity-10"
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center">
            <Trophy className="w-12 h-12 text-amber-500/50" />
          </div>
        </motion.div>

        {/* Go Kart Racing Icons */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-1/3 left-1/4 text-red-400 text-4xl">🏎️</div>
          <div className="absolute bottom-1/3 right-1/3 text-amber-500 text-3xl">🏁</div>
          <div className="absolute top-2/3 left-1/6 text-orange-400 text-2xl">📸</div>
          <div className="absolute top-1/4 right-1/4 text-red-500 text-3xl">🏆</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-red-500/30 rounded-full px-8 py-4 mb-8">
            <Eye className="w-6 h-6 text-red-400" />
            <span className="text-red-400 text-lg font-bold uppercase tracking-wider">
              Go Kart Gallery
            </span>
            <Camera className="w-6 h-6 text-amber-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
            Racing Gallery
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-red-400 via-amber-400 to-orange-500 bg-clip-text font-sansitaOne mb-8">
            Captured Victories
          </h3>
          <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
            Explore our collection of thrilling go-kart racing moments, from single kart speed runs to family fun,
            captured at FNF Arena's premier outdoor go-kart racing facility.
          </p>
        </motion.div>

        {/* Carousel Layout */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Main Image */}
          <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-2 border-red-500/30">
            <img
              src={filteredImages[activeImage]?.src}
              alt={filteredImages[activeImage]?.alt}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to default image if API image fails to load
                const fallbackIndex = activeImage % fallbackImages.length;
                e.target.src = fallbackImages[fallbackIndex].src;
              }}
            />

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-red-500/80 to-amber-500/80 backdrop-blur-sm hover:from-red-600/90 hover:to-amber-600/90 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-red-500/80 to-amber-500/80 backdrop-blur-sm hover:from-red-600/90 hover:to-amber-600/90 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Enhanced Image Info */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white text-2xl font-bold font-sansitaOne">
                    {filteredImages[activeImage]?.title}
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="w-5 h-5 text-red-400" />
                      <span className="text-white">{filteredImages[activeImage]?.likes}</span>
                    </div>
                    <button className="w-10 h-10 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 rounded-full flex items-center justify-center text-white transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <span className="text-red-400 font-semibold bg-red-500/20 px-3 py-1 rounded-full">
                  {filteredImages[activeImage]?.category}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Thumbnail Strip */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {filteredImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`flex-shrink-0 w-24 h-18 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                  index === activeImage
                    ? 'border-red-400 shadow-lg scale-100'
                    : 'border-gray-600 opacity-70 hover:opacity-100 hover:border-amber-400'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to default image if API image fails to load
                    const fallbackIndex = index % fallbackImages.length;
                    e.target.src = fallbackImages[fallbackIndex].src;
                  }}
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Stats and CTA with Dynamic Metrics */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {metricsData.map((metric, index) => (
            <motion.div
              key={index}
              className={`text-center bg-gradient-to-br ${getGradientClasses(metric.color)} backdrop-blur-sm rounded-2xl p-6 border`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`text-3xl md:text-4xl font-bold ${metric.color === 'red' ? 'text-red-600' : metric.color === 'amber' ? 'text-amber-500' : 'text-orange-600'} font-sansitaOne`}>
                {metric.value}
              </div>
              <p className="text-gray-400 text-sm mt-1">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-red-500/20 via-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-red-500/30">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-amber-400" />
              <h3 className="text-4xl font-bold font-sansitaOne text-white">Experience Go Kart Racing Live!</h3>
              <Zap className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto text-lg">
              Ready to create your own go-kart racing memories? Book your session today and become part of our racing gallery.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
