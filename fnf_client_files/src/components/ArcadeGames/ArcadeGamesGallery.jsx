"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Eye, Heart, Share2, Download, Camera, Trophy, Zap, Target, Volume2, VolumeX, ExternalLink } from "lucide-react";

export default function ArcadeGamesGallery({ galleryImages, videos, metrics }) {
  const navigate = useNavigate();
  const [activeMedia, setActiveMedia] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [videoStates, setVideoStates] = useState({});
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);
  const [selectedYouTubeVideo, setSelectedYouTubeVideo] = useState(null);

  // Use passed metrics
  const arcadeMetrics = metrics;

  // Fallback images when API data is not available
  const fallbackImages = [
    {
      src: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
      alt: "High-speed racing simulators with realistic controls",
      title: "Racing Simulators",
      category: "Racing",
      likes: 285,
      type: "image"
    },
    {
      src: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
      alt: "Group of friends enjoying fighting games",
      title: "Fighting Arena",
      category: "Fighting",
      likes: 234,
      type: "image"
    },
    {
      src: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
      alt: "Modern shooting games and target practice",
      title: "Shooting Games",
      category: "Shooting",
      likes: 198,
      type: "image"
    },
    {
      src: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
      alt: "Classic arcade machines and retro games",
      title: "Classic Arcade",
      category: "Classic",
      likes: 267,
      type: "image"
    },
    {
      src: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
      alt: "Tournament gaming setup with multiple players",
      title: "Tournaments",
      category: "Events",
      likes: 312,
      type: "image"
    },
    {
      src: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
      alt: "Prize redemption counter with tickets",
      title: "Prize Counter",
      category: "Prizes",
      likes: 189,
      type: "image"
    }
  ];

  // Categories for API images
  const categories = ["Racing", "Fighting", "Shooting", "Classic", "Events", "Prizes"];
  const titles = [
    "Racing Simulators",
    "Fighting Arena",
    "Shooting Games",
    "Classic Arcade",
    "Tournaments",
    "Prize Counter"
  ];

  // Transform API gallery images
  const processedImages = React.useMemo(() => {
    if (galleryImages && galleryImages.length > 0) {
      return galleryImages.map((imageUrl, index) => ({
        src: imageUrl,
        alt: `Arcade gaming image ${index + 1}`,
        title: titles[index % titles.length],
        category: categories[index % categories.length],
        likes: Math.floor(Math.random() * 200) + 150,
        type: "image"
      }));
    }
    return fallbackImages;
  }, [galleryImages]);

  // Process API videos - UPDATED VERSION with YouTube support
  const processedVideos = React.useMemo(() => {
    if (videos && videos.length > 0) {
      return videos.map((video, index) => {
        const baseVideo = {
          alt: `Arcade gaming video ${index + 1}`,
          title: video.label && video.label[0] ? video.label[0] : `Gaming Video ${index + 1}`,
          category: categories[index % categories.length],
          likes: Math.floor(Math.random() * 200) + 150,
          type: video.type || "video"
        };

        if (video.type === 'youtube') {
          return {
            ...baseVideo,
            src: video.url,
            embedUrl: video.embedUrl,
            videoId: video.videoId,
            thumbnail: `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
            type: "youtube"
          };
        } else {
          return {
            ...baseVideo,
            src: video.url,
            type: "video"
          };
        }
      });
    }
    return [];
  }, [videos]);

  // Combine images and videos into a single media array
  const allMedia = React.useMemo(() => {
    return [...processedImages, ...processedVideos];
  }, [processedImages, processedVideos]);

  const filteredMedia = allMedia;

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
      { value: "50+", label: "Game Machines", color: "red" },
      { value: "100+", label: "Daily Gamers", color: "amber" },
      { value: "24", label: "Hours Open", color: "orange" },
      { value: "∞", label: "Fun Guaranteed", color: "red" }
    ];

    if (!arcadeMetrics) {
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
      const value = arcadeMetrics[mapping.field];
      const suffix = arcadeMetrics[mapping.suffix] || '';

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
  }, [arcadeMetrics]);

  // Helper function to stop all videos except the target one
  const stopAllVideosExcept = (exceptIndex = null) => {
    // Stop all video elements except the one we're switching to
    const allVideoElements = document.querySelectorAll('video');
    allVideoElements.forEach((video, index) => {
      // Only stop videos that are not the target video
      if (exceptIndex === null || index !== exceptIndex) {
        if (!video.paused) {
          video.pause();
          video.currentTime = 0;
        }
      }
    });

    // Reset video states for stopped videos
    setVideoStates(prev => {
      const newStates = { ...prev };
      Object.keys(newStates).forEach(key => {
        if (exceptIndex === null || parseInt(key) !== exceptIndex) {
          delete newStates[key];
        }
      });
      return newStates;
    });
  };

  // Helper function to change active media with video handling
  const changeActiveMedia = (newIndex) => {
    // Don't do anything if it's the same media
    if (newIndex === activeMedia) {
      return;
    }

    // Stop all videos except the target one (if it's a video)
    const targetMedia = filteredMedia[newIndex];
    if (isVideo(targetMedia)) {
      stopAllVideosExcept(newIndex);
    } else {
      stopAllVideosExcept();
    }

    // Change active media
    setActiveMedia(newIndex);
  };

  const nextMedia = () => {
    const newIndex = (activeMedia + 1) % filteredMedia.length;
    changeActiveMedia(newIndex);
  };

  const prevMedia = () => {
    const newIndex = (activeMedia - 1 + filteredMedia.length) % filteredMedia.length;
    changeActiveMedia(newIndex);
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

  // Helper function to get video element by media index
  const getVideoElement = (mediaIndex) => {
    // Find the actual video element for this media index
    const media = filteredMedia[mediaIndex];
    if (!isVideo(media) || media.type === 'youtube') return null;

    // Use a more specific selector that targets the active video
    return document.querySelector(`#carousel-video-${mediaIndex}`);
  };

  // Video control functions for direct videos
  const handleVideoPlay = (mediaIndex) => {
    const videoElement = getVideoElement(mediaIndex);
    if (videoElement) {
      videoElement.play();
      setVideoStates(prev => ({
        ...prev,
        [mediaIndex]: { ...prev[mediaIndex], isPlaying: true }
      }));
    }
  };

  const handleVideoPause = (mediaIndex) => {
    const videoElement = getVideoElement(mediaIndex);
    if (videoElement) {
      videoElement.pause();
      setVideoStates(prev => ({
        ...prev,
        [mediaIndex]: { ...prev[mediaIndex], isPlaying: false }
      }));
    }
  };

  const toggleMute = (mediaIndex) => {
    const videoElement = getVideoElement(mediaIndex);
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      setVideoStates(prev => ({
        ...prev,
        [mediaIndex]: { ...prev[mediaIndex], isMuted: videoElement.muted }
      }));
    }
  };

  // Check if media item is a video
  const isVideo = (media) => {
    return media.type === 'video' || media.type === 'youtube';
  };

  // Handle YouTube video click
  const handleYouTubeClick = (video) => {
    setSelectedYouTubeVideo(video);
    setShowYouTubeModal(true);
  };

  return (
    <section id="ArcadeGamesGallery" className="relative bg-[#1e2125] text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* Enhanced Arcade Gallery Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gaming Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-400/20">
            <defs>
              <pattern id="arcadeGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="40" cy="40" r="3" fill="currentColor"/>
                <path d="M20,40 Q40,20 60,40 Q40,60 20,40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#arcadeGrid)"/>
          </svg>
        </div>

        {/* Floating Gaming Elements */}
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

        {/* Gaming Icons */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-1/3 left-1/4 text-red-400 text-4xl">🎮</div>
          <div className="absolute bottom-1/3 right-1/3 text-amber-500 text-3xl">🏆</div>
          <div className="absolute top-2/3 left-1/6 text-orange-400 text-2xl">📸</div>
          <div className="absolute top-1/4 right-1/4 text-red-500 text-3xl">🎯</div>
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
              Gaming Gallery
            </span>
            <Camera className="w-6 h-6 text-amber-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
            Arcade Gallery
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-red-400 via-amber-400 to-orange-500 bg-clip-text font-sansitaOne mb-8">
            Gaming Moments
          </h3>
          <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
            Explore our collection of thrilling arcade gaming moments, from high scores and tournaments to family fun,
            captured at FNF Arena's premier gaming facility.
          </p>
        </motion.div>

        {/* Enhanced View Toggle */}
        <motion.div
          className="flex justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-3 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-red-500/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
                viewMode === 'carousel'
                  ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Carousel
            </button>
          </div>
        </motion.div>

        {/* Gallery Content */}
        {viewMode === 'grid' ? (
          /* Fixed Grid Layout with Consistent Heights for Images and Videos */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {filteredMedia.map((media, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => {
                  if (media.type === 'youtube') {
                    handleYouTubeClick(media);
                  } else {
                    changeActiveMedia(index);
                    setViewMode('carousel');
                  }
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-red-500/20 hover:border-red-500/50 transition-all duration-300 h-80">
                  {media.type === 'youtube' ? (
                    <>
                      <img
                        src={media.thumbnail}
                        alt={media.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback to medium quality thumbnail
                          e.target.src = `https://img.youtube.com/vi/${media.videoId}/mqdefault.jpg`;
                        }}
                      />

                      {/* YouTube Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-amber-500 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 relative">
                          <Play className="w-8 h-8 ml-1" />
                          {/* YouTube Logo Indicator */}
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <ExternalLink className="w-2 h-2 text-red-600" />
                          </div>
                        </div>
                      </div>

                      {/* YouTube Type Indicator */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-red-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          YOUTUBE
                        </div>
                      </div>
                    </>
                  ) : media.type === 'video' ? (
                    <>
                      <video
                        className="w-full h-full object-cover"
                        preload="metadata"
                        muted
                        onError={(e) => {
                          // console.error('Video failed to load:', media.src);
                        }}
                      >
                        <source src={media.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Video Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-amber-500 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 ml-1" />
                        </div>
                      </div>

                      {/* Video Type Indicator */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-red-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold">
                          VIDEO
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={media.src}
                      alt={media.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to default image if API image fails to load
                        const fallbackIndex = index % fallbackImages.length;
                        e.target.src = fallbackImages[fallbackIndex].src;
                      }}
                    />
                  )}

                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Enhanced Carousel Layout for Images and Videos - FIXED VERSION */
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Media Display */}
            <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-2 border-red-500/30">
              {filteredMedia[activeMedia]?.type === 'youtube' ? (
                <>
                  {/* YouTube Embed in Carousel */}
                  <iframe
                    src={`${filteredMedia[activeMedia]?.embedUrl}?rel=0&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full bg-black"
                  />

                  {/* YouTube Label */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="bg-red-600/90 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-semibold flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      YOUTUBE VIDEO
                    </div>
                  </div>
                </>
              ) : filteredMedia[activeMedia]?.type === 'video' ? (
                <>
                  <video
                    key={`carousel-video-${activeMedia}-${filteredMedia[activeMedia]?.src}`}
                    id={`carousel-video-${activeMedia}`}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    controls
                    onPlay={() => setVideoStates(prev => ({
                      ...prev,
                      [activeMedia]: { ...prev[activeMedia], isPlaying: true }
                    }))}
                    onPause={() => setVideoStates(prev => ({
                      ...prev,
                      [activeMedia]: { ...prev[activeMedia], isPlaying: false }
                    }))}
                    onError={(e) => {
                      // console.error('Video failed to load:', filteredMedia[activeMedia]?.src);
                    }}
                  >
                    <source src={filteredMedia[activeMedia]?.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls Overlay */}
                  <div className="absolute top-6 right-6 flex gap-2">
                    <button
                      onClick={() => toggleMute(activeMedia)}
                      className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-black/70 transition-all duration-300"
                    >
                      {videoStates[activeMedia]?.isMuted ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <img
                  src={filteredMedia[activeMedia]?.src}
                  alt={filteredMedia[activeMedia]?.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to default image if API image fails to load
                    const fallbackIndex = activeMedia % fallbackImages.length;
                    e.target.src = fallbackImages[fallbackIndex].src;
                  }}
                />
              )}

              {/* Navigation - Only show if not YouTube video in carousel */}
              {filteredMedia[activeMedia]?.type !== 'youtube' && (
                <>
                  <button
                    onClick={prevMedia}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-red-500/80 to-amber-500/80 backdrop-blur-sm hover:from-red-600/90 hover:to-amber-600/90 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
                    aria-label="Previous media"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextMedia}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-red-500/80 to-amber-500/80 backdrop-blur-sm hover:from-red-600/90 hover:to-amber-600/90 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
                    aria-label="Next media"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Navigation for YouTube videos - positioned differently */}
              {filteredMedia[activeMedia]?.type === 'youtube' && (
                <>
                  <button
                    onClick={prevMedia}
                    className="absolute left-6 bottom-6 w-12 h-12 bg-gradient-to-r from-red-500/80 to-amber-500/80 backdrop-blur-sm hover:from-red-600/90 hover:to-amber-600/90 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
                    aria-label="Previous media"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextMedia}
                    className="absolute right-6 bottom-6 w-12 h-12 bg-gradient-to-r from-red-500/80 to-amber-500/80 backdrop-blur-sm hover:from-red-600/90 hover:to-amber-600/90 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
                    aria-label="Next media"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Enhanced Thumbnail Strip */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {filteredMedia.map((media, index) => (
                <button
                  key={`thumbnail-${index}-${media.src}`}
                  onClick={() => changeActiveMedia(index)}
                  className={`relative flex-shrink-0 w-24 h-18 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                    index === activeMedia
                      ? 'border-red-400 shadow-lg scale-100'
                      : 'border-gray-600 opacity-70 hover:opacity-100 hover:border-amber-400'
                  }`}
                >
                  {media.type === 'youtube' ? (
                    <>
                      <img
                        src={media.thumbnail}
                        alt={media.alt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${media.videoId}/mqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <ExternalLink className="w-2 h-2 text-red-600" />
                        </div>
                      </div>
                    </>
                  ) : media.type === 'video' ? (
                    <>
                      <video
                        key={`thumb-video-${index}-${media.src}`}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        muted
                      >
                        <source src={media.src} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    </>
                  ) : (
                    <img
                      src={media.src}
                      alt={media.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to default image if API image fails to load
                        const fallbackIndex = index % fallbackImages.length;
                        e.target.src = fallbackImages[fallbackIndex].src;
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Enhanced CTA Section */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-red-500/20 via-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-red-500/30">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-amber-400" />
              <h3 className="text-4xl font-bold font-sansitaOne text-white">Experience Gaming Live!</h3>
              <Zap className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto text-lg">
              Ready to create your own gaming memories? Book your session today and become part of our arcade gallery.
            </p>
            <div className="text-center">
              <span className="text-amber-400 font-semibold">
                {processedImages.length} Photos • {processedVideos.length} Videos
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* YouTube Video Modal - For grid view clicks */}
      {showYouTubeModal && selectedYouTubeVideo && (
        <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-[90%] max-w-5xl aspect-video"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowYouTubeModal(false);
                setSelectedYouTubeVideo(null);
              }}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-red-400 transition-colors"
            >
              ✕
            </button>

            {/* YouTube Embed */}
            <iframe
              src={`${selectedYouTubeVideo.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-2xl bg-black"
            />
          </motion.div>
        </div>
      )}

      <div className="absolute left-0 right-0 bottom-0 h-6" aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%),
            linear-gradient(45deg,rgba(255,255,255) 25%,transparent 25%,transparent 75%,rgba(255,255,255) 75%),
            linear-gradient(180deg,#b92a2a,#d94b4b)
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
