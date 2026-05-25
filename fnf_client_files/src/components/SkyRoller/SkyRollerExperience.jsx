"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Star, Quote, ArrowRight, Users, Trophy, Clock, Wind, Zap, Target, Camera, Heart, Volume2, VolumeX, ExternalLink } from "lucide-react";
import {IMGUrl } from '../../config/apiconfig';
export default function SkyRollerExperience({
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

  // Debug log to see what videos we're getting
  useEffect(() => {
    // console.log('SkyRollerExperience received videos:', videos);
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
        name: "Rajesh Kumar",
        role: "Adventure Photographer",
        image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=dc2626&color=fff",
        text: "The sky roller experience is absolutely breathtaking! Soaring through the clouds with panoramic views is an unforgettable adventure. The safety and thrill combination is perfect!",
        rating: 5
      },
      {
        name: "Meera Joshi",
        role: "Travel Blogger",
        image: "https://ui-avatars.com/api/?name=Meera+Joshi&background=f59e0b&color=fff",
        text: "Amazing sky-high adventure! The views from up there are spectacular and the ride is smooth yet thrilling. Perfect for our family adventure day!",
        rating: 5
      },
      {
        name: "Amit Verma",
        role: "Corporate Executive",
        image: "https://ui-avatars.com/api/?name=Amit+Verma&background=ea580c&color=fff",
        text: "Best team building activity ever! The sky roller gave our team a shared experience of conquering heights together. The professional staff made it seamless!",
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
          label: selectedVideo.label || ["Sky Roller Experience"],
          type: selectedVideo.type || 'direct',
          videoId: selectedVideo.videoId,
          poster: "https://cdn.acsdev.in/FNF/69d3782e3d2fa.jpg"
        };
      }
    }

    // console.log('No valid videos found, using fallback');
    // Fallback to image if no valid videos
    return {
      url: "https://cdn.acsdev.in/FNF/69d3782e3d2fa.jpg",
      label: ["Sky Roller Experience"],
      type: 'image',
      poster: "https://cdn.acsdev.in/FNF/69d3782e3d2fa.jpg"
    };
  }, [videos]);

  // Helper function to format metric labels
  const formatLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get formatted metrics with suffixes - using same logic as other components
  const formattedMetrics = React.useMemo(() => {
    if (metrics) {
      return [
        {
          value: `${metrics.repeat_customers}${metrics.repeat_customers_suffix || ''}`,
          label: formatLabel('repeat_customers'),
          color: 'red',
          icon: Zap
        },
        {
          value: `${metrics.revenue_growth}${metrics.revenue_growth_suffix || ''}`,
          label: formatLabel('revenue_growth'),
          color: 'amber',
          icon: Heart
        },
        {
          value: `${metrics.safety_score}${metrics.safety_score_suffix || ''}`,
          label: formatLabel('safety_score'),
          color: 'orange',
          icon: Trophy
        }
      ];
    }

    // Fallback metrics
    return [
      {
        value: '12,000+',
        label: 'Sky Flights',
        color: 'red',
        icon: Zap
      },
      {
        value: '9,800+',
        label: 'Sky Riders',
        color: 'amber',
        icon: Heart
      },
      {
        value: '650+',
        label: 'Aerial Events',
        color: 'orange',
        icon: Trophy
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

  // Debug log for experienceVideo
  useEffect(() => {
    // console.log('experienceVideo object:', experienceVideo);
    // console.log('experienceVideo.url:', experienceVideo.url);
    // console.log('experienceVideo.type:', experienceVideo.type);
  }, [experienceVideo]);

  return (
    <section
      id="sky-roller-experience"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
      role="main"
      aria-labelledby="sky-roller-experience-title"
    >
      <div className="absolute left-0 right-0 top-2 h-6" aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.95) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.95) 75%, rgba(255,255,255,0.95)),
            linear-gradient(45deg, rgba(255,255,255,0.95) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.95) 75%, rgba(255,255,255,0.95)),
            linear-gradient(180deg,#000,#d94b4b)
          `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          transform: "translateY(-8px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
        }}
      />
      {/* Simple Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-600/20">
            <defs>
              <pattern id="skyPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="20" cy="20" r="3" fill="currentColor"/>
                <circle cx="80" cy="80" r="3" fill="currentColor"/>
                <line x1="20" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1"/>
                <line x1="80" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#skyPattern)"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20">

        <div className="space-y-24">

          {/* Header with Sky Stats */}
          <header className="text-center relative">
            <motion.div
              className="inline-flex items-center gap-3 bg-red-600/20 border border-red-600/30 rounded-full px-8 py-4 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Wind className="w-6 h-6 text-red-600" aria-hidden="true" />
              <span className="text-red-300 font-bold text-lg">Ultimate Sky Roller Experience</span>
              <Target className="w-6 h-6 text-red-600" aria-hidden="true" />
            </motion.div>

            <motion.h1
              id="sky-roller-experience-title"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-sansitaOne leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Soar Through The
              <span className="block text-red-600">
                Sky-High Adventure
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Experience breathtaking heights and panoramic views with our revolutionary sky roller system combined with
              aerial adventures. Where every ride touches the clouds and creates unforgettable memories!
            </motion.p>
          </header>

          {/* Video and Testimonials Layout */}
          <section className="relative" aria-labelledby="video-testimonials-title">
            <h2 id="video-testimonials-title" className="sr-only">Sky Roller Experience Video and Customer Testimonials</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

              {/* Video Section */}
              <motion.div
                className="lg:col-span-3 relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
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
                          aria-label="Play YouTube video"
                        >
                          <div className="w-28 h-28 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg relative">
                            <Play className="w-12 h-12 ml-2" />
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
                            alt="Sky roller adventure video preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://cdn.acsdev.in/FNF/69d3782e3d2fa.jpg";
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
                          aria-label={videoState.isPlaying ? "Pause video" : "Play video"}
                        >
                          <div className="w-28 h-28 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-2xl border-2 border-white/30">
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
                            className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-black/70 transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleMute}
                            aria-label={videoState.isMuted ? "Unmute video" : "Mute video"}
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
                        alt="Sky roller experience showing riders soaring through clouds with panoramic views"
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://cdn.acsdev.in/FNF/69d3782e3d2fa.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <motion.button
                          onClick={() => {
                            if (experienceVideo.type === 'youtube') {
                              handleYouTubePlay();
                            } else {
                              scrollToSection('sky-gallery');
                            }
                          }}
                          className="w-28 h-28 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={experienceVideo.type === 'youtube' ? 'Watch YouTube Video' : 'Watch sky roller action video - opens gallery section'}
                        >
                          <Play className="w-12 h-12 ml-2" />
                        </motion.button>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-red-900/30" aria-hidden="true" />

                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-white text-3xl font-bold font-sansitaOne mb-3">
                      Touch The Sky!
                    </h3>
                    <p className="text-gray-200 text-lg">
                      {experienceVideo.label && experienceVideo.label[0] ? experienceVideo.label[0] : 'Watch riders soar through the clouds'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonials Section */}
              <motion.div
                className="lg:col-span-2 space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm rounded-3xl p-8 border border-red-600/20 shadow-xl" role="region" aria-label="Customer testimonials">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Quote className="w-12 h-12 text-red-600 mb-6" aria-hidden="true" />

                    <blockquote className="text-gray-200 text-lg leading-relaxed mb-8 italic">
                      "{currentTestimonial?.text}"
                    </blockquote>

                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={currentTestimonial?.image}
                        alt={`${currentTestimonial?.name}, ${currentTestimonial?.role}`}
                        loading="lazy"
                        className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://ui-avatars.com/api/?name=" +
                            encodeURIComponent(currentTestimonial?.name || "User") +
                            "&background=dc2626&color=fff";
                        }}
                      />
                      <div>
                        <div className="text-white font-bold text-lg">
                          {currentTestimonial?.name}
                        </div>
                        <div className="text-red-600 text-sm">
                          {currentTestimonial?.role}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-6" role="img" aria-label={`${currentTestimonial?.rating} out of 5 stars`}>
                      {[...Array(currentTestimonial?.rating || 0)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-red-600 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                  </motion.div>

                  {/* Testimonial Navigation */}
                  {testimonials.length > 1 && (
                    <div className="flex justify-center gap-3" role="tablist" aria-label="Testimonial navigation">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === activeTestimonial
                              ? 'bg-red-600 w-8'
                              : 'bg-gray-500 hover:bg-gray-400'
                          }`}
                          role="tab"
                          aria-selected={index === activeTestimonial}
                          aria-label={`View testimonial ${index + 1} from ${testimonials[index].name}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            role="region"
            aria-label="Call to action buttons"
          >
            <button
              onClick={() => {
                if (experienceVideo.type === 'youtube') {
                  handleYouTubePlay();
                } else {
                  scrollToSection('sky-gallery');
                }
              }}
              className="group bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-4 transform hover:scale-105 shadow-xl focus:outline-none focus:ring-4 focus:ring-red-600/50"
              aria-label={experienceVideo.type === 'youtube' ? 'Watch YouTube Video' : 'Watch sky action - scroll to gallery section'}
            >
              <Play className="w-7 h-7" aria-hidden="true" />
              {experienceVideo.type === 'youtube' ? 'Watch YouTube Video' : 'Watch Sky Action'}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>

          </motion.div>

          {/* Bottom Sky Features */}
          <motion.section
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            aria-labelledby="sky-features-title"
          >
            <h2 id="sky-features-title" className="sr-only">Sky Roller Features and Benefits</h2>
          </motion.section>
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
            linear-gradient(180deg,#b92a2a,#000)
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
