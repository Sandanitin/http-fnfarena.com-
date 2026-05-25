"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Heart, Share2, Download, Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";

export default function RockerEjectionGallery({ galleryImages, videos, metrics }) {
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoStates, setVideoStates] = useState({});
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);
  const [selectedYouTubeVideo, setSelectedYouTubeVideo] = useState(null);

  // Fallback images when API data is not available
  const fallbackImages = [
    {
      id: 1,
      src: "https://cdn.acsdev.in/FNF/69ce51797fe39.jpg",
      alt: "Rocket ejection launch sequence",
      title: "Rocket Launch Sequence",
      type: "image"
    },
    {
      id: 2,
      src: "https://cdn.acsdev.in/FNF/69ce50d13fcb2.jpg",
      alt: "High-speed rocket ejection action shot",
      title: "Rocket-Powered Thrills",
      type: "image"
    },
    {
      id: 3,
      src: "https://cdn.acsdev.in/FNF/69ce517ac4f77.jpg",
      alt: "Extreme G-force rocket ejection experience",
      title: "Extreme G-Force",
      type: "image"
    }
  ];

  // Categories for API images
  const categories = ["Launch", "Thrills", "G-Force", "Adventure", "Precision", "Safety", "Equipment", "Platform", "Photography"];
  const titles = [
    "Rocket Launch Sequence",
    "Rocket-Powered Thrills",
    "Extreme G-Force",
    "Team Rocket Adventures",
    "Precision Launch",
    "Advanced Safety Systems",
    "Military-Grade Equipment",
    "Launch Platform",
    "Capture Rocket Moments"
  ];

  // Transform API gallery images
  const processedImages = React.useMemo(() => {
    if (galleryImages && galleryImages.length > 0) {
      return galleryImages.map((imageUrl, index) => ({
        id: index + 1,
        src: imageUrl,
        alt: `Rocket ejection image ${index + 1}`,
        title: titles[index % titles.length],
        category: categories[index % categories.length],
        type: "image"
      }));
    }
    return fallbackImages;
  }, [galleryImages]);

  // Process API videos - UPDATED VERSION with YouTube support
  const processedVideos = React.useMemo(() => {
    // console.log('Processing videos in RockerEjectionGallery:', videos);

    if (videos && videos.length > 0) {
      return videos.map((video, index) => {
        const baseVideo = {
          id: index + 1 + processedImages.length,
          alt: `Rocket ejection video ${index + 1}`,
          title: video.label && video.label[0] ? video.label[0] : `Rocket Video ${index + 1}`,
          category: categories[index % categories.length],
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
  }, [videos, processedImages]);

  // Combine images and videos into a single media array
  const allMedia = React.useMemo(() => {
    return [...processedImages, ...processedVideos];
  }, [processedImages, processedVideos]);

  const filteredMedia = allMedia;

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

  return (
    <section id="rocket-gallery" className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
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
            <span className="text-red-500 font-bold">Rocket Ejection Gallery</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sansitaOne mb-6">
            Capture Your
            <span className="block text-red-600">
              Rocket Adventure
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Relive the explosive moments and incredible G-force from our rocket ejection experience.
            Every launch is a high-speed photo opportunity waiting to happen.
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
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
              Ready to Create Your Own Rocket Story?
            </h3>
            <p className="text-gray-300 mb-2 max-w-2xl mx-auto">
              Book your rocket ejection experience today and capture memories that will blast off into legend.
              Professional high-speed photography packages available.
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
