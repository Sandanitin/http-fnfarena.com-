"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Heart, Share2, Download, Eye, Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function SkyCycleGallery({ galleryImages, videos, metrics }) {
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoStates, setVideoStates] = useState({});

  // Fallback images when API data is not available
  const fallbackImages = [
    {
      id: 1,
      src: "https://cdn.acsdev.in/FNF/69d3763841f0b.jpg",
      alt: "Sky cycle adventure through mountain landscape",
      title: "Mountain Peak Sky Ride",
      type: "image"
    },
    {
      id: 2,
      src: "https://cdn.acsdev.in/FNF/69d3763709bc8.jpg",
      alt: "High-altitude sky cycle experience",
      title: "High-Altitude Thrills",
      type: "image"
    },
    {
      id: 3,
      src: "https://cdn.acsdev.in/FNF/699b3fa7db259.jpg",
      alt: "Scenic mountain views from sky cycle",
      title: "Breathtaking Sky Views",
      type: "image"
    }
  ];

  // Categories for API images
  const categories = ["Mountain Views", "High Altitude", "Scenic Views", "Team Adventure", "Golden Hour", "Forest Canopy", "Safety Equipment", "Launch Platform", "Photography"];
  const titles = [
    "Mountain Peak Sky Ride",
    "High-Altitude Thrills",
    "Breathtaking Sky Views",
    "Team Sky Adventures",
    "Golden Hour Sky Ride",
    "Forest Canopy Sky Tour",
    "Safety First",
    "Launch Platform",
    "Capture the Moment"
  ];

  // Enhanced video URL validation - supports YouTube, direct video files, and other platforms
  const isVideoUrl = (url) => {
    if (!url) return false;

    // Check for YouTube URLs
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    if (youtubeRegex.test(url)) return true;

    // Check for direct video file URLs
    const videoExtensions = ['.mp4', '.webm', '.mov', '.m4v', '.avi', '.mkv', '.ogg'];
    const hasVideoExtension = videoExtensions.some(ext => url.toLowerCase().includes(ext));
    if (hasVideoExtension) return true;

    // Check for other video platforms
    const videoPlatforms = ['vimeo.com', 'dailymotion.com', 'twitch.tv', 'facebook.com/watch'];
    const isVideoPlatform = videoPlatforms.some(platform => url.includes(platform));

    return isVideoPlatform;
  };

  // Convert YouTube URL to embeddable format
  const getEmbeddableVideoUrl = (url) => {
    if (!url) return null;

    // YouTube URL conversion
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);

    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0`;
    }

    // For direct video URLs, return as-is
    return url;
  };

  // Transform API gallery images
  const processedImages = React.useMemo(() => {
    if (galleryImages && galleryImages.length > 0) {
      return galleryImages.map((imageUrl, index) => ({
        id: index + 1,
        src: imageUrl,
        alt: `Sky cycle experience image ${index + 1}`,
        title: titles[index % titles.length],
        category: categories[index % categories.length],
        likes: Math.floor(Math.random() * 200) + 150,
        type: "image"
      }));
    }
    return fallbackImages;
  }, [galleryImages]);

  // Process API videos - ENHANCED VERSION
  const processedVideos = React.useMemo(() => {
    // console.log('Processing videos in SkyCycleGallery:', videos);

    if (videos && videos.length > 0) {
      return videos.map((video, index) => {
        const isYouTube = video.url && (video.url.includes('youtube.com') || video.url.includes('youtu.be'));
        const embeddableUrl = getEmbeddableVideoUrl(video.url);

        return {
          id: index + 1 + processedImages.length,
          src: embeddableUrl || video.url,
          originalUrl: video.url,
          isYouTube,
          alt: `Sky cycle video ${index + 1}`,
          title: video.label && video.label[0] ? video.label[0] : `Sky Cycle Video ${index + 1}`,
          category: categories[index % categories.length],
          likes: Math.floor(Math.random() * 200) + 150,
          type: "video"
        };
      });
    }
    return [];
  }, [videos, processedImages]);

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
      { value: "8,500", label: "Sky Rides", color: "red" },
      { value: "6,200", label: "Happy Cyclists", color: "amber" },
      { value: "450", label: "Events Hosted", color: "orange" },
      { value: "100%", label: "Safety Record", color: "red" }
    ];

    if (!metrics) {
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
      const value = metrics[mapping.field];
      const suffix = metrics[mapping.suffix] || '';

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
  }, [metrics]);

  // Check if media item is a video
  const isVideo = (media) => {
    return media.type === 'video';
  };

  // Helper function to get video element by media index
  const getVideoElement = (mediaIndex) => {
    const media = filteredMedia[mediaIndex];
    if (!isVideo(media)) return null;
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

  const openModal = (media, index) => {
    setSelectedMedia(media);
    setCurrentIndex(index);
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
    <section id="skycycle-gallery" className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
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
            <span className="text-red-500 font-bold">Sky Cycle Gallery</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sansitaOne mb-6">
            Capture Your
            <span className="block text-red-400">
              Sky Cycle Adventure
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Relive the breathtaking moments and stunning views from our sky cycle experience.
            Every ride is a photo opportunity waiting to happen.
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
              key={media.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-red-500/10 border border-red-400/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openModal(media, index)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                {isVideo(media) ? (
                  <>
                    {media.isYouTube ? (
                      <div className="relative w-full h-full">
                        <img
                          src={`https://img.youtube.com/vi/${media.originalUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]}/maxresdefault.jpg`}
                          alt={media.alt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://cdn.acsdev.in/FNF/699b3fa7db259.jpg";
                          }}
                        />
                      </div>
                    ) : (
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
                    )}

                    {/* Video Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-xl">
                        <Play className="w-8 h-8 ml-1" />
                      </div>
                    </div>

                    {/* Video Type Indicator */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-red-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold">
                        {media.isYouTube ? 'YOUTUBE' : 'VIDEO'}
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
              Ready to Create Your Own Sky Cycle Story?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Book your sky cycle experience today and capture memories that will last a lifetime.
              Professional photography packages available.
            </p>
            <div className="text-center">
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
                {isVideo(selectedMedia) ? (
                  <>
                    {selectedMedia.isYouTube ? (
                      <iframe
                        key={`modal-youtube-${currentIndex}-${selectedMedia?.src}`}
                        src={selectedMedia?.src}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={selectedMedia?.title || "Sky Cycle Video"}
                      />
                    ) : (
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
                    )}

                    {/* Video Controls Overlay - Only for non-YouTube videos */}
                    {!selectedMedia.isYouTube && (
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
                    )}
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
                    {isVideo(selectedMedia) && (
                      <div className="bg-red-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold inline-block">
                        {selectedMedia.isYouTube ? 'YOUTUBE' : 'VIDEO'}
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
    </section>
  );
}
