"use client";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Pause, Star, Quote, ArrowRight, Users, Trophy, Clock, Zap, Target, Award, CheckCircle, Heart, Camera, Gauge, Volume2, VolumeX, ExternalLink } from "lucide-react";
import {IMGUrl } from '../../config/apiconfig';
export default function GoKartExperience({
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
    repeatCustomers: 0,
    revenueGrowth: 0,
    safetyScore: 0
  });

  // Debug log to see what videos we're getting
  useEffect(() => {
    // console.log('GoKartExperience received videos:', videos);
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
        name: "Alex Johnson",
        role: "Racing Enthusiast",
        text: "The single kart racing experience was absolutely incredible! The speed and precision of these karts is unmatched.",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=Alex+Johnson&background=ef4444&color=fff"
      },
      {
        name: "Sarah Chen",
        role: "Family Racer",
        text: "Perfect for family fun! The twin karts allowed me and my daughter to race together safely.",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=f59e0b&color=fff"
      },
      {
        name: "Mike Rodriguez",
        role: "Professional Driver",
        text: "Outstanding track design and well-maintained karts. This is real racing at its finest!",
        rating: 5,
        image: "https://ui-avatars.com/api/?name=Mike+Rodriguez&background=ea580c&color=fff"
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
          label: selectedVideo.label || ["Go Kart Racing Experience"],
          type: selectedVideo.type || 'direct',
          videoId: selectedVideo.videoId,
          poster: "https://cdn.acsdev.in/FNF/699b355b63ae8.jpg"
        };
      }
    }

    // console.log('No valid videos found, using fallback');
    // Fallback to image if no valid videos
    return {
      url: "https://cdn.acsdev.in/FNF/699b355b63ae8.jpg",
      label: ["Go Kart Racing Experience"],
      type: 'image',
      poster: "https://cdn.acsdev.in/FNF/699b355b63ae8.jpg"
    };
  }, [videos]);

  // Get metrics for counters - using last 3 metrics from API
  const metricsData = React.useMemo(() => {
    const fallbackMetrics = {
      repeatCustomers: 99,
      revenueGrowth: 99,
      safetyScore: 99
    };

    if (metrics) {
      return {
        repeatCustomers: parseInt(metrics.repeat_customers) || fallbackMetrics.repeatCustomers,
        revenueGrowth: parseInt(metrics.revenue_growth) || fallbackMetrics.revenueGrowth,
        safetyScore: parseInt(metrics.safety_score) || fallbackMetrics.safetyScore
      };
    }

    return fallbackMetrics;
  }, [metrics]);

  // Helper function to format metric labels
  const formatLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get formatted metrics with suffixes
  const formattedMetrics = React.useMemo(() => {
    if (metrics) {
      return [
        {
          value: `${metrics.repeat_customers}${metrics.repeat_customers_suffix || ''}`,
          label: formatLabel('repeat_customers'),
          color: 'red',
          icon: Trophy
        },
        {
          value: `${metrics.revenue_growth}${metrics.revenue_growth_suffix || ''}`,
          label: formatLabel('revenue_growth'),
          color: 'amber',
          icon: Users
        },
        {
          value: `${metrics.safety_score}${metrics.safety_score_suffix || ''}`,
          label: formatLabel('safety_score'),
          color: 'orange',
          icon: Award
        }
      ];
    }

    // Fallback metrics
    return [
      {
        value: '99%',
        label: 'Repeat Customers',
        color: 'red',
        icon: Trophy
      },
      {
        value: '99%',
        label: 'Revenue Growth',
        color: 'amber',
        icon: Users
      },
      {
        value: '99+',
        label: 'Safety Score',
        color: 'orange',
        icon: Award
      }
    ];
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

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
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
          repeatCustomers: Math.floor(targets.repeatCustomers * progress),
          revenueGrowth: Math.floor(targets.revenueGrowth * progress),
          safetyScore: Math.floor(targets.safetyScore * progress)
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

    const element = document.getElementById('gokart-experience');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [metricsData]);

  // Debug log for experienceVideo
  useEffect(() => {
    // console.log('experienceVideo object:', experienceVideo);
    // console.log('experienceVideo.url:', experienceVideo.url);
    // console.log('experienceVideo.type:', experienceVideo.type);
  }, [experienceVideo]);

  return (
    <section
      id="gokart-experience"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-800 overflow-hidden"
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

      {/* Enhanced Go Kart Background Elements */}
      <div className="absolute inset-0">
        {/* Go Kart Tire Pattern */}
        <div className="absolute inset-0 opacity-8">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-400/20">
            <defs>
              <pattern id="tirePattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                {/* Tire outline */}
                <circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" strokeWidth="3"/>
                <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="1"/>
                {/* Tire treads */}
                <path d="M25,60 L35,60 M85,60 L95,60 M60,25 L60,35 M60,85 L60,95" stroke="currentColor" strokeWidth="2"/>
                <path d="M35,35 L42,42 M78,78 L85,85 M35,85 L42,78 M78,42 L85,35" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tirePattern)"/>
          </svg>
        </div>

        {/* Floating Go Kart Tire */}
        <motion.div
          className="absolute top-20 right-20 opacity-15"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg width="160" height="160" viewBox="0 0 160 160" className="text-red-400/50">
            {/* Tire */}
            <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="6"/>
            <circle cx="80" cy="80" r="55" fill="none" stroke="currentColor" strokeWidth="4"/>
            <circle cx="80" cy="80" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
            {/* Rim spokes */}
            <g stroke="currentColor" strokeWidth="3">
              <line x1="80" y1="20" x2="80" y2="140"/>
              <line x1="20" y1="80" x2="140" y2="80"/>
              <line x1="35" y1="35" x2="125" y2="125"/>
              <line x1="125" y1="35" x2="35" y2="125"/>
            </g>
            {/* Center hub */}
            <circle cx="80" cy="80" r="15" fill="currentColor"/>
          </svg>
        </motion.div>

        {/* Floating Go Kart Engine */}
        <motion.div
          className="absolute bottom-40 left-20 opacity-12"
          animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="128" height="128" viewBox="0 0 128 128" className="text-amber-500/50">
            {/* Engine block */}
            <rect x="30" y="40" width="68" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="3"/>
            <rect x="35" y="45" width="58" height="38" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
            {/* Cylinders */}
            <rect x="40" y="25" width="12" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="58" y="25" width="12" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="76" y="25" width="12" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            {/* Exhaust */}
            <rect x="100" y="55" width="20" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
            {/* Air filter */}
            <circle cx="64" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </motion.div>

        {/* Go Kart Racing Flag Elements */}
        <div className="absolute inset-0 opacity-10">
          {/* Checkered flag */}
          <div className="absolute top-10 left-10 transform rotate-12">
            <svg width="80" height="60" viewBox="0 0 80 60" className="text-white/60">
              <rect x="0" y="0" width="80" height="60" fill="none" stroke="currentColor" strokeWidth="2"/>
              {/* Checkered pattern */}
              <rect x="0" y="0" width="20" height="15" fill="currentColor"/>
              <rect x="40" y="0" width="20" height="15" fill="currentColor"/>
              <rect x="20" y="15" width="20" height="15" fill="currentColor"/>
              <rect x="60" y="15" width="20" height="15" fill="currentColor"/>
              <rect x="0" y="30" width="20" height="15" fill="currentColor"/>
              <rect x="40" y="30" width="20" height="15" fill="currentColor"/>
              <rect x="20" y="45" width="20" height="15" fill="currentColor"/>
              <rect x="60" y="45" width="20" height="15" fill="currentColor"/>
            </svg>
          </div>

          {/* Racing helmet */}
          <div className="absolute top-32 right-32 text-amber-400 transform -rotate-6">
            <svg width="60" height="60" viewBox="0 0 60 60" className="text-amber-400/60">
              <ellipse cx="30" cy="35" rx="25" ry="20" fill="none" stroke="currentColor" strokeWidth="3"/>
              <rect x="10" y="25" width="40" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="30" cy="20" r="3" fill="currentColor"/>
            </svg>
          </div>

          {/* Trophy */}
          <div className="absolute bottom-20 left-20 text-red-400 transform rotate-45">
            <svg width="60" height="80" viewBox="0 0 60 80" className="text-red-400/60">
              <rect x="20" y="50" width="20" height="25" fill="none" stroke="currentColor" strokeWidth="2"/>
              <ellipse cx="30" cy="35" rx="15" ry="20" fill="none" stroke="currentColor" strokeWidth="3"/>
              <path d="M15,25 Q10,15 15,10 Q20,15 15,25" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M45,25 Q50,15 45,10 Q40,15 45,25" fill="none" stroke="currentColor" strokeWidth="2"/>
              <rect x="15" y="75" width="30" height="5" fill="currentColor"/>
            </svg>
          </div>

          {/* Speedometer */}
          <div className="absolute top-20 right-96 text-orange-400 transform -rotate-12">
            <svg width="50" height="50" viewBox="0 0 50 50" className="text-orange-400/60">
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
              <line x1="25" y1="25" x2="35" y2="15" stroke="currentColor" strokeWidth="2"/>
              <circle cx="25" cy="25" r="3" fill="currentColor"/>
            </svg>
          </div>

          {/* Steering wheel */}
          <div className="absolute bottom-32 right-80 text-amber-300 transform rotate-30">
            <svg width="50" height="50" viewBox="0 0 50 50" className="text-amber-300/60">
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="25" cy="25" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
              <line x1="25" y1="5" x2="25" y2="17" stroke="currentColor" strokeWidth="3"/>
              <line x1="25" y1="33" x2="25" y2="45" stroke="currentColor" strokeWidth="3"/>
              <line x1="5" y1="25" x2="17" y2="25" stroke="currentColor" strokeWidth="3"/>
              <line x1="33" y1="25" x2="45" y2="25" stroke="currentColor" strokeWidth="3"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20">

        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-4 bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-red-500/30 rounded-full px-8 py-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Target className="w-6 h-6 text-red-400" />
            <span className="text-red-400 text-lg font-bold uppercase tracking-wider">Ultimate Go Kart Experience</span>
            <Zap className="w-6 h-6 text-amber-500" />
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-sansitaOne leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Racing Excellence
            <span className="block text-transparent bg-gradient-to-r from-red-400 via-amber-400 to-orange-500 bg-clip-text">
              Meets Precision
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Experience the ultimate thrill of go-kart racing with our professional single karts, fun twin karts,
            and safe kids karts on our premium outdoor track designed for champions.
          </motion.p>
        </div>

        {/* Enhanced Video and Testimonials Layout with Fixed Heights */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start mb-20">

          {/* Enhanced Video Section */}
          <motion.div
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-red-500/30">
              {experienceVideo.type === 'youtube' ? (
                <>
                  {/* YouTube Video Thumbnail */}
                  <div className="relative w-full h-full">
                    <img
                      src={`https://cdn.acsdev.in/FNF/699b355b63ae8.jpg`}
                      alt="YouTube video thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to medium quality thumbnail
                        e.target.src = `https://cdn.acsdev.in/FNF/699b355b63ae8.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-red-900/30" />

                    {/* YouTube Play Button */}
                    <motion.button
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleYouTubePlay}
                    >
                      <div className="w-28 h-28 bg-gradient-to-r from-red-500 via-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white/30 relative">
                        <Play className="w-12 h-12 ml-2" />
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
                        alt="Go kart racing experience preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://cdn.acsdev.in/FNF/699b355b63ae8.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-red-900/30" />
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
                      <div className="w-28 h-28 bg-gradient-to-r from-red-500 via-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white/30">
                        {videoState.isPlaying ? (
                          <Pause className="w-12 h-12" />
                        ) : (
                          <Play className="w-12 h-12 ml-2" />
                        )}
                      </div>
                    </motion.button>

                    {/* Mute/Unmute Button */}
                    {videoState.hasStarted && (
                      <motion.button
                        className="absolute top-6 left-6 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-black/70 transition-all duration-300"
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
                    alt="Go kart racing experience preview"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // console.log('Image fallback used for:', experienceVideo.url);
                      e.target.src = "https://cdn.acsdev.in/FNF/699b355b63ae8.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-red-900/30" />

                  {/* Play button for images (fallback) */}
                  <motion.button
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (experienceVideo.type === 'youtube') {
                        handleYouTubePlay();
                      } else {
                        scrollToSection('GoKartGallery');
                      }
                    }}
                  >
                    <div className="w-28 h-28 bg-gradient-to-r from-red-500 via-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white/30">
                      <Play className="w-12 h-12 ml-2" />
                    </div>
                  </motion.button>
                </>
              )}

              {/* <div className="absolute bottom-8 left-8 right-8 z-10">
                <h4 className="text-white text-3xl font-bold font-sansitaOne mb-3">
                  Racing Mastery
                </h4>
                <p className="text-gray-200 text-lg">
                  {experienceVideo.label && experienceVideo.label[0] ? experienceVideo.label[0] : 'Watch champions in action on our track'}
                </p>
              </div> */}

              {/* Racing Speed Indicator */}
              {/* <div className="absolute top-6 right-6 z-10">
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 border border-red-500/30">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-6 h-6 text-red-400" />
                    <span className="text-white font-bold">MAX SPEED</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-400 font-sansitaOne">45 KM/H</div>
                </div>
              </div> */}
            </div>
          </motion.div>

          {/* Enhanced Testimonials Section with Fixed Height */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-gray-800/60 to-black/60 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30 shadow-xl h-[500px] flex flex-col">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col"
              >
                <Quote className="w-12 h-12 text-red-400 mb-6 flex-shrink-0" />

                {/* Fixed height container for testimonial text */}
                <div className="flex-1 mb-8 overflow-hidden">
                  <p className="text-gray-200 text-lg leading-relaxed italic line-clamp-6 h-full overflow-y-auto">
                    "{currentTestimonial?.text}"
                  </p>
                </div>

                <div className="flex-shrink-0">
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
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-400 flex-shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="text-white font-bold text-lg truncate">
                        {currentTestimonial?.name}
                      </div>
                      <div className="text-red-400 text-sm truncate">
                        {currentTestimonial?.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(currentTestimonial?.rating || 0)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-amber-500 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Testimonial Navigation */}
              {testimonials.length > 1 && (
                <div className="flex justify-center gap-3 mt-6 flex-shrink-0">
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

        {/* Enhanced Action Buttons */}
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
                scrollToSection('GoKartGallery');
              }
            }}
            className="group bg-gradient-to-r from-red-500 via-amber-500 to-orange-500 hover:from-red-600 hover:via-amber-600 hover:to-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-4 transform hover:scale-105 shadow-xl"
          >
            <Play className="w-7 h-7" />
            {experienceVideo.type === 'youtube' ? 'Watch YouTube Video' : 'Watch Racing Action'}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

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

      <style jsx>{`
        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
