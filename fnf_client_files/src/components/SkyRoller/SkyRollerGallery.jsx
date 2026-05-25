"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Heart, Share2, Download, Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";

export default function SkyRollerGallery({ galleryImages, videos, metrics }) {
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoStates, setVideoStates] = useState({});
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);
  const [selectedYouTubeVideo, setSelectedYouTubeVideo] = useState(null);

  // Use passed metrics
  const skyRollerMetrics = metrics;

  // Fallback images when API data is not available
  const fallbackImages = [
    {
      src: "https://cdn.acsdev.in/FNF/69d3782f0a5a9.jpg",
      alt: "Sky roller adventure through cloud formations",
      title: "Cloud Nine Experience",
      type: "image"
    },
    {
      src: "https://cdn.acsdev.in/FNF/69d3782e3d2fa.jpg",
      alt: "High-altitude sky roller action shot",
      title: "Sky-High Thrills",
      type: "image"
    },
    {
      src: "https://cdn.acsdev.in/FNF/69d3782f0a5a9.jpg",
      alt: "Panoramic aerial views from sky roller",
      title: "Breathtaking Panoramas",
      type: "image"
    },
    {
      src: "https://cdn.acsdev.in/FNF/69d3782e3d2fa.jpg",
      alt: "Group sky roller adventure",
      title: "Team Sky Adventures",
      type: "image"
    },
    {
      src: "https://cdn.acsdev.in/FNF/69d3782f0a5a9.jpg",
      alt: "Sunset sky roller experience",
      title: "Golden Sky Flight",
      type: "image"
    }
  ];

  // Categories for API images
  const categories = ["Sky Adventure", "High Altitude", "Aerial Views", "Group Experience", "Safety First", "Sky Track", "Launch Platform", "Photography", "Sky Moments"];
  const titles = [
    "Cloud Nine Experience",
    "Sky-High Thrills",
    "Breathtaking Panoramas",
    "Team Sky Adventures",
    "Golden Sky Flight",
    "Elevated Sky Track",
    "Sky Safety First",
    "Sky Launch Platform",
    "Capture Sky Moments"
  ];

  // Transform API gallery images
  const processedImages = React.useMemo(() => {
    if (galleryImages && galleryImages.length > 0) {
      return galleryImages.map((imageUrl, index) => ({
        src: imageUrl,
        alt: `Sky roller experience image ${index + 1}`,
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
    // console.log('Processing videos in SkyRollerGallery:', videos);

    if (videos && videos.length > 0) {
      return videos.map((video, index) => {
        const baseVideo = {
          alt: `Sky roller video ${index + 1}`,
          title: video.label && video.label[0] ? video.label[0] : `Sky Roller Video ${index + 1}`,
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
      { value: "15", label: "Sky Tracks", color: "red" },
      { value: "3", label: "Altitude Levels", color: "amber" },
      { value: "12", label: "Hours Daily", color: "orange" },
      { value: "100%", label: "Safe Flights", color: "red" }
    ];

    if (!skyRollerMetrics) {
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
      const value = skyRollerMetrics[mapping.field];
      const suffix = skyRollerMetrics[mapping.suffix] || '';

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
  }, [skyRollerMetrics]);

  // Check if media item is a video
  const isVideo = (media) => {
    return media.type === 'video' || media.type === 'youtube';
  };

  // Helper function to get video element by media index
  const getVideoElement = (mediaIndex) => {
    const media = filteredMedia[mediaIndex];
    if (!isVideo(media) || media.type === 'youtube') return null;
    return document.querySelector(`#modal-video-${mediaIndex}`);
  };

  // Video control functions
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

  // Handle YouTube video click
  const handleYouTubeClick = (video) => {
    setSelectedYouTubeVideo(video);
    setShowYouTubeModal(true);
  };

  const openModal = (media, index) => {
    if (media.type === 'youtube') {
      handleYouTubeClick(media);
    } else {
      setSelectedMedia(media);
      setCurrentIndex(index);
    }
  };

  const closeModal = () => {
    // Stop any playing videos when closing modal
    if (selectedMedia && isVideo(selectedMedia)) {
      const videoElement = getVideoElement(currentIndex);
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }
    setSelectedMedia(null);
  };

  const nextMedia = () => {
    const nextIndex = (currentIndex + 1) % filteredMedia.length;
    // Stop current video if playing
    if (selectedMedia && isVideo(selectedMedia)) {
      const videoElement = getVideoElement(currentIndex);
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }
    setCurrentIndex(nextIndex);
    setSelectedMedia(filteredMedia[nextIndex]);
  };

  const prevMedia = () => {
    const prevIndex = (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
    // Stop current video if playing
    if (selectedMedia && isVideo(selectedMedia)) {
      const videoElement = getVideoElement(currentIndex);
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }
    setCurrentIndex(prevIndex);
    setSelectedMedia(filteredMedia[prevIndex]);
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
    <section id="sky-gallery" className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Simple Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 300"
            className="text-red-300/20"
            preserveAspectRatio="none"
          >
            <path
              d="M0,300 L0,200 L200,100 L400,150 L600,80 L800,120 L1000,90 L1200,140 L1200,300 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-6 py-3 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Camera className="w-5 h-5 text-red-500" />
            <span className="text-red-500 font-bold">Sky Roller Gallery</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sansitaOne mb-6">
            Capture Your
            <span className="block text-red-600">
              Sky Adventure
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Relive the breathtaking moments and stunning aerial views from our sky roller experience.
            Every flight through the clouds is a photo opportunity waiting to happen.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {filteredMedia.map((media, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-red-500/10 border border-red-400/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openModal(media, index)}
            >
              <div className="aspect-[4/3] overflow-hidden">
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
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-xl">
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
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-100"
                    onError={(e) => {
                      // Fallback to default image if API image fails to load
                      const fallbackIndex = index % fallbackImages.length;
                      e.target.src = fallbackImages[fallbackIndex].src;
                    }}
                  />
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-lg font-sansitaOne mb-1">
                        {media.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-red-500/10 backdrop-blur-sm rounded-3xl p-8 border border-red-400/20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-sansitaOne">
              Ready to Create Your Own Sky Story?
            </h3>
            <p className="text-gray-300 mb-2 max-w-2xl mx-auto">
              Book your sky roller experience today and capture memories that will soar above the clouds.
              Professional aerial photography packages available.
            </p>
            <div className="text-center mt-4">
              <span className="text-red-400 font-semibold">
                {processedImages.length} Photos • {processedVideos.length} Videos
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modal with Video Support */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] bg-red-900/50 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Media Content */}
              <div className="aspect-video">
                {isVideo(selectedMedia) && selectedMedia.type !== 'youtube' ? (
                  <>
                    <video
                      key={`modal-video-${currentIndex}-${selectedMedia?.src}`}
                      id={`modal-video-${currentIndex}`}
                      className="w-full h-full object-cover"
                      preload="metadata"
                      controls
                      onPlay={() => setVideoStates(prev => ({
                        ...prev,
                        [currentIndex]: { ...prev[currentIndex], isPlaying: true }
                      }))}
                      onPause={() => setVideoStates(prev => ({
                        ...prev,
                        [currentIndex]: { ...prev[currentIndex], isPlaying: false }
                      }))}
                      onError={(e) => {
                        // console.error('Video failed to load:', selectedMedia?.src);
                      }}
                    >
                      <source src={selectedMedia?.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Video Controls Overlay */}
                    <div className="absolute top-6 right-16 flex gap-2">
                      <button
                        onClick={() => toggleMute(currentIndex)}
                        className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-black/70 transition-all duration-300"
                      >
                        {videoStates[currentIndex]?.isMuted ? (
                          <VolumeX className="w-6 h-6" />
                        ) : (
                          <Volume2 className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Media Info */}
              <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    {isVideo(selectedMedia) && selectedMedia.type !== 'youtube' && (
                      <div className="bg-red-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold inline-block">
                        VIDEO
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </section>
  );
}
