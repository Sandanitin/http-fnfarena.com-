"use client";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Pause, Star, Quote, ArrowRight, Users, Trophy, Clock, Zap, Target, Award, Shield, Car, Volume2, VolumeX, ExternalLink } from "lucide-react";
import {IMGUrl } from '../../config/apiconfig';
export default function DriftersExperience({
  reviews = [],
  loading,
  error,
  averageRating,
  reviewCount,
  metrics,
  videos
}) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [videoState, setVideoState] = useState({
    isPlaying: false,
    isMuted: true,
    showPoster: true,
    hasStarted: false
  });
  const [counters, setCounters] = useState({
    races: 0,
    drivers: 0,
    events: 0
  });

  // Debug log to see what videos we're getting
  useEffect(() => {
    // console.log('DriftersExperience received videos:', videos);
  }, [videos]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Transform API reviews into testimonials format
  const testimonials = React.useMemo(() => {
    if (reviews && reviews.length > 0) {
      return reviews.map(review => ({
        name: review.reviewer_name || 'Anonymous',
        role: review.activity_name,
        text: review.review_description || review.comment || 'Great experience!',
        rating: parseInt(review.rating) || 5,
        image: `${IMGUrl}/${review.reviewer_image}`  
      }));
    }

    // Fallback testimonials
    return [
      {
        name: "Arjun Singh",
        role: "Racing Enthusiast",
        image: "https://ui-avatars.com/api/?name=Arjun+Singh&background=ef4444&color=fff",
        text: "The drift cars at FNF Arena are incredible! The outdoor track gives you that authentic racing feel with amazing speed and control.",
        rating: 5
      },
      {
        name: "Sneha Reddy",
        role: "Birthday Party Host",
        image: "https://ui-avatars.com/api/?name=Sneha+Reddy&background=f59e0b&color=fff",
        text: "Perfect venue for my son's birthday! The Drifters were a hit with all the kids, and the outdoor setting was refreshing.",
        rating: 5
      },
      {
        name: "Vikram Patel",
        role: "Corporate Event Organizer",
        image: "https://ui-avatars.com/api/?name=Vikram+Patel&background=ea580c&color=fff",
        text: "Our team building event was fantastic! The racing competition brought everyone together and the facilities are top-notch.",
        rating: 5
      }
    ];
  }, [reviews]);

  const currentTestimonial = testimonials[activeTestimonial];

  // Get video for the experience section - UPDATED VERSION with YouTube support
  const experienceVideo = React.useMemo(() => {
    // console.log('Processing videos in experienceVideo memo:', videos);

    if (videos && videos.length > 0) {
      // Prioritize YouTube videos first, then direct videos
      const youtubeVideo = videos.find(video => video.type === 'youtube');
      const directVideo = videos.find(video => video.type === 'direct');

      const selectedVideo = youtubeVideo || directVideo;

      if (selectedVideo) {
        // console.log('Using selected video:', selectedVideo);
        return {
          url: selectedVideo.url,
          embedUrl: selectedVideo.embedUrl || selectedVideo.url,
          label: selectedVideo.label || ["Racing Experience"],
          type: selectedVideo.type || 'direct',
          videoId: selectedVideo.videoId,
          poster: "https://cdn.acsdev.in/FNF/698d71d0d00d9.jpg"
        };
      }
    }

    // console.log('No valid videos found, using fallback');
    // Fallback to image if no valid videos
    return {
      url: "https://cdn.acsdev.in/FNF/698d71d0d00d9.jpg",
      label: ["Racing Experience"],
      type: 'image',
      poster: "https://cdn.acsdev.in/FNF/698d71d0d00d9.jpg"
    };
  }, [videos]);

  // Get metrics for counters
  const metricsData = React.useMemo(() => {
    const fallbackMetrics = {
      races: 8000,
      drivers: 3500,
      events: 300
    };

    if (metrics) {
      return {
        races: parseInt(metrics.repeat_customers) || fallbackMetrics.races,
        drivers: parseInt(metrics.revenue_growth) || fallbackMetrics.drivers,
        events: parseInt(metrics.safety_score) || fallbackMetrics.events
      };
    }

    return fallbackMetrics;
  }, [metrics]);

  // Check if we have a valid video URL (for direct videos)
  const isDirectVideoUrl = (url) => {
    const isValid = url && (
      url.includes('.mp4') ||
      url.includes('.webm') ||
      url.includes('.mov') ||
      url.includes('.m4v')
    );
    // console.log('isDirectVideoUrl check:', url, 'Result:', isValid);
    return isValid;
  };

  // Check if it's a YouTube video
  const isYouTubeVideo = (video) => {
    return video.type === 'youtube' && video.embedUrl;
  };

  // Video control handlers for direct videos
  const handleVideoPlay = async () => {
    if (videoRef.current && experienceVideo.type === 'direct') {
      try {
        setVideoState(prev => ({
          ...prev,
          showPoster: false,
          hasStarted: true,
          isPlaying: true
        }));

        // Start with muted autoplay, then unmute
        videoRef.current.muted = false;
        await videoRef.current.play();

        setVideoState(prev => ({
          ...prev,
          isMuted: false
        }));
      } catch (error) {
        // console.error('Error playing video:', error);
        // Fallback to muted autoplay if unmuted fails
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
          setVideoState(prev => ({
            ...prev,
            isMuted: true,
            isPlaying: true
          }));
        } catch (mutedError) {
          // console.error('Error playing muted video:', mutedError);
        }
      }
    }
  };

  const handleVideoPause = () => {
    if (videoRef.current && experienceVideo.type === 'direct') {
      videoRef.current.pause();
      setVideoState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const toggleMute = () => {
    if (videoRef.current && experienceVideo.type === 'direct') {
      videoRef.current.muted = !videoRef.current.muted;
      setVideoState(prev => ({ ...prev, isMuted: videoRef.current.muted }));
    }
  };

  // Handle YouTube video play
  const handleYouTubePlay = () => {
    setShowVideo(true);
  };

  // Auto-play video when component mounts (muted) - only for direct videos
  useEffect(() => {
    if (videoRef.current && experienceVideo.type === 'direct' && isDirectVideoUrl(experienceVideo.url)) {
      const video = videoRef.current;

      const handleCanPlay = async () => {
        try {
          // Try to autoplay muted
          video.muted = true;
          await video.play();
          setVideoState(prev => ({
            ...prev,
            isPlaying: true,
            isMuted: true,
            showPoster: false
          }));
        } catch (error) {
          // console.log('Autoplay failed, showing poster:', error);
          setVideoState(prev => ({
            ...prev,
            showPoster: true,
            isPlaying: false
          }));
        }
      };

      const handlePlay = () => {
        setVideoState(prev => ({ ...prev, isPlaying: true }));
      };

      const handlePause = () => {
        setVideoState(prev => ({ ...prev, isPlaying: false }));
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [experienceVideo.url, experienceVideo.type]);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) =>
        (prev + 1) % testimonials.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Animated counters
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      const targets = metricsData;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setCounters({
          races: Math.floor(targets.races * progress),
          drivers: Math.floor(targets.drivers * progress),
          events: Math.floor(targets.events * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('drifters-experience');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [metricsData]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Debug log for experienceVideo
  useEffect(() => {
    // console.log('experienceVideo object:', experienceVideo);
    // console.log('experienceVideo.url:', experienceVideo.url);
    // console.log('experienceVideo.type:', experienceVideo.type);
  }, [experienceVideo]);

  return (
    <section
      id="drifters-experience"
      className="relative min-h-screen bg-gradient-to-tr from-gray-900 via-red-900 to-gray-800 overflow-hidden"
    >
      <div className="absolute left-0 right-0 top-2 h-6" aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.95) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.95) 75%, rgba(255,255,255,0.95)),
            linear-gradient(45deg, rgba(255,255,255,0.95) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.95) 75%, rgba(255,255,255,0.95)),
            linear-gradient(180deg,#b92a2a,#000)
          `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          transform: "translateY(-8px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
        }}
      />
      {/* New Hexagonal Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-400/20">
            <defs>
              <pattern id="hexPattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon points="30,2 50,15 50,37 30,50 10,37 10,15" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPattern)"/>
          </svg>
        </div>

        {/* Diagonal Racing Stripes */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 20px,
                rgba(220, 38, 38, 0.3) 20px,
                rgba(220, 38, 38, 0.3) 40px
              )
            `
          }} />
        </div>

        {/* Circular Racing Elements */}
        <div className="absolute top-20 right-20 opacity-15">
          <svg width="300" height="300" viewBox="0 0 300 300" className="text-red-400/30">
            <circle cx="150" cy="150" r="120" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="10,5"/>
            <circle cx="150" cy="150" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,3"/>
            <circle cx="150" cy="150" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
            <text x="150" y="155" textAnchor="middle" className="text-2xl font-bold fill-current">🏁</text>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20">

        {/* New Vertical Layout Structure */}
        <div className="space-y-20">

          {/* Header Section with Side-by-Side Layout */}
          <div className=" grid grid-cols-1 lg:grid-cols-2 w-full">

            {/* Badge - Full Width */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-red-400/20 border border-red-500/30 rounded-full px-6 py-3">
                <Car className="w-5 h-5 text-red-400" />
                <span className="text-red-400 text-base font-bold">Ultimate Racing Experience</span>
                <Zap className="w-5 h-5 text-red-500" />
              </div>
            </motion.div>

            {/* Title and Description Side by Side */}
            <motion.div
              className="lg:col-span-2 space-y-6 lg:space-y-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Title */}
                <div>
                  <h2 className="text-5xl md:text-6xl mt-2 lg:text-7xl font-bold text-white font-sansitaOne leading-tight">
                    Racing
                    <span className="block text-transparent bg-gradient-to-r from-red-400 to-red-500 bg-clip-text">
                      Excellence
                    </span>
                  </h2>
                </div>

                {/* Description */}
                <div className="lg:pt-4">
                  <p className="text-gray-300 text-xl leading-relaxed">
                    Discover the ultimate thrill of high-speed racing with our state-of-the-art drift cars and premium outdoor facilities designed for maximum excitement.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Video and Testimonials in Horizontal Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Enhanced Video Section */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                {experienceVideo.type === 'youtube' ? (
                  <>
                    {/* YouTube Video Thumbnail */}
                    <div className="relative w-full h-full">
                      <img
                        src={`https://img.youtube.com/vi/${experienceVideo.videoId}/maxresdefault.jpg`}
                        alt="YouTube video thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to medium quality thumbnail
                          e.target.src = `https://img.youtube.com/vi/${experienceVideo.videoId}/mqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40" />

                      {/* YouTube Play Button */}
                      <motion.button
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleYouTubePlay}
                      >
                        <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-2xl relative">
                          <Play className="w-10 h-10 ml-2" />
                          {/* YouTube Logo Indicator */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <ExternalLink className="w-3 h-3 text-red-600" />
                          </div>
                        </div>
                      </motion.button>

                      {/* YouTube Label */}
                      <div className="absolute top-6 left-6">
                        <div className="bg-red-600/90 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-semibold flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          YOUTUBE
                        </div>
                      </div>
                    </div>
                  </>
                ) : experienceVideo.type === 'direct' && isDirectVideoUrl(experienceVideo.url) ? (
                  <>
                    {/* Poster Image Overlay */}
                    {videoState.showPoster && (
                      <div className="absolute inset-0 z-20">
                        <img
                          src={experienceVideo.poster}
                          alt="Racing experience video preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://cdn.acsdev.in/FNF/698d71d0d00d9.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                      </div>
                    )}

                    {/* Video Element */}
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster={experienceVideo.poster}
                      preload="metadata"
                      loop
                      playsInline
                      onError={(e) => {
                        // console.error('Video failed to load:', experienceVideo.url);
                        setVideoState(prev => ({ ...prev, showPoster: true }));
                      }}
                      onLoadedData={() => {
                        // console.log('Video loaded successfully:', experienceVideo.url);
                      }}
                    >
                      <source
                        src={experienceVideo.url}
                        type={experienceVideo.url.includes('.mov') ? "video/quicktime" : "video/mp4"}
                      />
                      Your browser does not support the video tag.
                    </video>

                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 z-30">
                      {/* Main Play/Pause Button */}
                      <motion.button
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                          videoState.showPoster || !videoState.isPlaying ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={videoState.isPlaying ? handleVideoPause : handleVideoPlay}
                      >
                        <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-2xl">
                          {videoState.isPlaying ? (
                            <Pause className="w-10 h-10" />
                          ) : (
                            <Play className="w-10 h-10 ml-2" />
                          )}
                        </div>
                      </motion.button>

                      {/* Mute/Unmute Button */}
                      {videoState.hasStarted && (
                        <motion.button
                          className="absolute top-6 right-6 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-black/70 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleMute}
                        >
                          {videoState.isMuted ? (
                            <VolumeX className="w-6 h-6" />
                          ) : (
                            <Volume2 className="w-6 h-6" />
                          )}
                        </motion.button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={experienceVideo.url}
                      alt="Racing experience video preview"
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://cdn.acsdev.in/FNF/698d71d0d00d9.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <motion.button
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (experienceVideo.type === 'youtube') {
                          handleYouTubePlay();
                        } else {
                          scrollToSection('DriftersGallery');
                        }
                      }}
                    >
                      <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-2xl">
                        <Play className="w-10 h-10 ml-2" />
                      </div>
                    </motion.button>
                  </>
                )}

                <div className="absolute bottom-6 left-6 right-6 z-40">
                  <h4 className="text-white text-2xl font-bold font-sansitaOne mb-2">
                    Experience the Thrill
                  </h4>
                  <p className="text-gray-200 text-sm">
                    {experienceVideo.label && experienceVideo.label[0] ? experienceVideo.label[0] : 'Watch our racers in action'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Testimonials Carousel */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Quote className="w-10 h-10 text-red-400 mb-6" />

                  <p className="text-gray-200 text-lg leading-relaxed mb-8 italic">
                    "{currentTestimonial?.text}"
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={currentTestimonial?.image}
                      alt={currentTestimonial?.name}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(currentTestimonial?.name || "User") +
                          "&background=ef4444&color=fff";
                      }}
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-400"
                    />
                    <div>
                      <div className="text-white font-bold text-lg">
                        {currentTestimonial?.name}
                      </div>
                      <div className="text-red-400 text-sm">
                        {currentTestimonial?.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(currentTestimonial?.rating || 0)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-red-500 fill-current"
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Testimonial Navigation */}
                {testimonials.length > 1 && (
                  <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeTestimonial
                            ? 'bg-red-400 w-8'
                            : 'bg-gray-500 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => {
                if (experienceVideo.type === 'youtube') {
                  handleYouTubePlay();
                } else {
                  scrollToSection('DriftersGallery');
                }
              }}
              className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-4 transform hover:scale-105 shadow-xl"
            >
              <Play className="w-6 h-6" />
              {experienceVideo.type === 'youtube' ? 'Watch YouTube Video' : 'Watch Racing Video'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* YouTube Video Modal */}
      {showVideo && experienceVideo.type === 'youtube' && (
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
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-red-400 transition-colors"
            >
              ✕
            </button>

            {/* YouTube Embed */}
            <iframe
              src={`${experienceVideo.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-2xl bg-black"
            />
          </motion.div>
        </div>
      )}

      {/* Direct Video Modal (fallback) */}
      {showVideo && experienceVideo.type === 'direct' && (
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
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-red-400 transition-colors"
            >
              ✕
            </button>

            {/* Self Hosted Video */}
            <video
              src={experienceVideo.url}
              controls
              autoPlay
              playsInline
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
            linear-gradient(180deg,#000,#d94b4b)
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
