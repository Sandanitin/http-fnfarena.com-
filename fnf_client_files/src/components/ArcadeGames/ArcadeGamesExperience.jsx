"use client";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Pause, Star, Quote, ArrowRight, Gamepad2, Trophy, Clock, Volume2, VolumeX, ExternalLink } from "lucide-react";
import {IMGUrl } from '../../config/apiconfig';
export default function ArcadeGamesExperience({
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
    showPoster: false,
    hasStarted: false
  });
  const [counters, setCounters] = useState({
    games: 0,
    players: 0,
    tournaments: 0
  });

  // Debug log to see what videos we're getting
  useEffect(() => {
    // console.log('ArcadeGamesExperience received videos:', videos);
  }, [videos]);

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
        name: "Rahul Sharma",
        role: "Gaming Enthusiast",
        image: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
        text: "The arcade at FNF is incredible! They have all the latest games and the classic ones too. The racing simulators are so realistic, I felt like I was actually driving!",
        rating: 5
      },
      {
        name: "Priya Patel",
        role: "Tournament Winner",
        image: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
        text: "I won the monthly fighting game tournament here! The competition is fierce but fair. The staff maintains all machines perfectly and the atmosphere is amazing.",
        rating: 5
      },
      {
        name: "Arjun Kumar",
        role: "Regular Player",
        image: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
        text: "Been coming here for months now. The variety of games is unmatched and they keep adding new ones. Perfect place to hang out with friends and compete!",
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
          label: selectedVideo.label || ["Arcade Gaming Experience"],
          type: selectedVideo.type || 'direct',
          videoId: selectedVideo.videoId,
          poster: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg"
        };
      }
    }

    // console.log('No valid videos found, using fallback');
    // Fallback to image if no valid videos
    return {
      url: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg",
      label: ["Arcade Gaming Experience"],
      type: 'image',
      poster: "https://cdn.acsdev.in/FNF/699b44e528a60.jpg"
    };
  }, [videos]);

  // Get metrics for counters
  const countersData = React.useMemo(() => {
    const fallbackCounters = {
      games: 50,
      players: 5000,
      tournaments: 120
    };

    if (metrics) {
      return {
        games: parseInt(metrics.total_games) || parseInt(metrics.repeat_customers) || fallbackCounters.games,
        players: parseInt(metrics.total_customers) || parseInt(metrics.revenue_growth) || fallbackCounters.players,
        tournaments: parseInt(metrics.total_tournaments) || parseInt(metrics.satisfaction_rate) || fallbackCounters.tournaments
      };
    }

    return fallbackCounters;
  }, [metrics]);

  // Get metrics for display
  const metricsData = React.useMemo(() => {
    const fallbackMetrics = [
      { value: "50", label: "Game Machines", color: "red" },
      { value: "5000", label: "Happy Gamers", color: "amber" },
      { value: "120", label: "Tournaments", color: "orange" },
      { value: "100%", label: "Fun Guaranteed", color: "red" }
    ];

    if (!metrics) {
      return fallbackMetrics;
    }

    // Extract metrics from the API data
    const dynamicMetrics = [];

    // Map available metrics fields to display values
    const metricsMapping = [
      {
        field: 'participation_rate',
        suffix: 'participation_rate_suffix',
        label: 'Participation Rate',
        color: 'red'
      },
      {
        field: 'average_score',
        suffix: 'average_score_suffix',
        label: 'Average Score',
        color: 'amber'
      },
      {
        field: 'completion_time',
        suffix: 'completion_time_suffix',
        label: 'Completion Time',
        color: 'orange'
      },
      {
        field: 'satisfaction_rate',
        suffix: 'satisfaction_rate_suffix',
        label: 'Satisfaction Rate',
        color: 'red'
      },
      {
        field: 'repeat_customers',
        suffix: 'repeat_customers_suffix',
        label: 'Repeat Customers',
        color: 'amber'
      },
      {
        field: 'revenue_growth',
        suffix: 'revenue_growth_suffix',
        label: 'Revenue Growth',
        color: 'orange'
      },
      {
        field: 'safety_score',
        suffix: 'safety_score_suffix',
        label: 'Safety Score',
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

    return dynamicMetrics;
  }, [metrics]);

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

  // Animated counters
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      const targets = countersData;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setCounters({
          games: Math.floor(targets.games * progress),
          players: Math.floor(targets.players * progress),
          tournaments: Math.floor(targets.tournaments * progress)
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

    const element = document.getElementById('arcade-experience');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [countersData]);

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
      id="arcade-experience"
      className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <img
            src="https://cdn.acsdev.in/FNF/699b44e528a60.jpg"
            alt="Arcade gaming experience background"
            loading="lazy"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1a1d21]/50 to-[#1a1d21]" />
        </div>

        {/* Laser Beam Effects */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/20">
            <defs>
              <pattern id="arcadeLaserPattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                <line x1="0" y1="10" x2="100" y2="10" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#arcadeLaserPattern)"/>
            {/* Laser beam lines */}
            <line x1="0" y1="200" x2="1200" y2="300" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            <line x1="0" y1="600" x2="1200" y2="500" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
          </svg>
        </div>

        {/* Target Crosshair Pattern */}
        <div className="absolute top-1/4 left-1/4 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-red-500/30">
            <g transform="translate(100,100)">
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="0" y1="0"
                  x2={Math.cos(i * 45 * Math.PI / 180) * 80}
                  y2={Math.sin(i * 45 * Math.PI / 180) * 80}
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.6"
                />
              ))}
              <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="0" cy="0" r="5" fill="currentColor"/>
            </g>
          </svg>
        </div>

        {/* Laser Trail Effect */}
        <div className="absolute bottom-1/3 left-0 right-0 opacity-8">
          <svg width="100%" height="60" viewBox="0 0 1200 60" className="text-red-500/20">
            <path d="M0 30 Q300 10 600 30 T1200 30" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="20,10"/>
            <circle cx="50" cy="30" r="6" fill="currentColor"/>
            <circle cx="150" cy="25" r="4" fill="currentColor" opacity="0.7"/>
            <circle cx="250" cy="35" r="3" fill="currentColor" opacity="0.5"/>
          </svg>
        </div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-2 border-red-500/20 rounded-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 right-40 w-16 h-16 bg-red-500/10 transform rotate-45"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-8 h-8 bg-red-500/20 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20">

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Trophy className="w-4 h-4 text-red-500" />
                <span className="text-red-500 text-sm font-semibold">Ultimate Gaming</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-sansitaOne leading-tight">
                Where Every
                <span className="block text-red-500">Game Counts</span>
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                Step into our high-tech arcade where classic meets modern gaming.
                Experience the thrill of competition with cutting-edge machines and timeless favorites.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => {
                  if (experienceVideo.type === 'youtube') {
                    handleYouTubePlay();
                  } else {
                    scrollToSection('ArcadeGamesGallery');
                  }
                }}
                className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105"
              >
                <Play className="w-5 h-5" />
                {experienceVideo.type === 'youtube' ? 'Watch YouTube Video' : 'Watch Gameplay'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Video and Testimonials */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Video Preview */}
            <div className="relative mb-8">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
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
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleYouTubePlay}
                      >
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg relative">
                          <Play className="w-8 h-8 ml-1" />
                          {/* YouTube Logo Indicator */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <ExternalLink className="w-3 h-3 text-red-600" />
                          </div>
                        </div>
                      </motion.button>

                      {/* YouTube Label */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-red-600/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
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
                          alt="Arcade gaming video preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://cdn.acsdev.in/FNF/699b44e528a60.jpg";
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
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={videoState.isPlaying ? handleVideoPause : handleVideoPlay}
                      >
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
                          {videoState.isPlaying ? (
                            <Pause className="w-8 h-8" />
                          ) : (
                            <Play className="w-8 h-8 ml-1" />
                          )}
                        </div>
                      </motion.button>

                      {/* Mute/Unmute Button */}
                      {videoState.hasStarted && (
                        <motion.button
                          className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-black/70 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleMute}
                        >
                          {videoState.isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </motion.button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={experienceVideo.url}
                      alt="Arcade gaming video preview"
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // console.log('Image fallback used for:', experienceVideo.url);
                        e.target.src = "https://cdn.acsdev.in/FNF/699b44e528a60.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <motion.button
                        onClick={() => setShowVideo(true)}
                        className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative bg-[#606265]/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/20">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Quote className="w-8 h-8 text-red-500 mx-auto mb-4" />

                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  "{currentTestimonial?.text}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <img
                    src={currentTestimonial?.image}
                    alt={currentTestimonial?.name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(currentTestimonial?.name || "User") +
                        "&background=ef4444&color=fff";
                    }}
                  />
                  <div className="text-left">
                    <div className="text-white font-semibold">
                      {currentTestimonial?.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {currentTestimonial?.role}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(currentTestimonial?.rating || 0)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </motion.div>

              {/* Testimonial Indicators */}
              {testimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === activeTestimonial ? 'bg-red-500 w-6' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
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
    </section>
  );
}
