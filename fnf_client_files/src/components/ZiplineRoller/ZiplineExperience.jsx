"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Star, Quote, ArrowRight, Users, Trophy, Clock, Gamepad2, Zap, Target, Camera, Heart, Volume2, VolumeX } from "lucide-react";
import {IMGUrl } from '../../config/apiconfig';
export default function ZiplineExperience({
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [videoState, setVideoState] = useState({
    isPlaying: false,
    isMuted: true,
    showPoster: true,
    hasStarted: false
  });

  // Debug log to see what videos we're getting
  useEffect(() => {
    // console.log('ZiplineExperience received videos:', videos);
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
        name: "Arjun Mehta",
        role: "Adventure Enthusiast",
        image: "https://ui-avatars.com/api/?name=Arjun+Mehta&background=ef4444&color=fff",
        text: "The zipline rollercoaster at FNF Arena is insane! Combined with go-karting and other games, it's the ultimate gaming experience in the city.",
        rating: 5
      },
      {
        name: "Priya Singh",
        role: "Corporate Team Leader",
        image: "https://ui-avatars.com/api/?name=Priya+Singh&background=f59e0b&color=fff",
        text: "Perfect venue for our team outing! The gaming packages with zipline included gave everyone an adrenaline rush. Highly recommended!",
        rating: 5
      },
      {
        name: "Rohit Kumar",
        role: "Birthday Celebrant",
        image: "https://ui-avatars.com/api/?name=Rohit+Kumar&background=ea580c&color=fff",
        text: "Best birthday celebration ever! The gaming arena has everything - zipline, go-karts, bowling. The staff made it absolutely memorable!",
        rating: 5
      }
    ];
  }, [reviews]);

  const currentTestimonial = testimonials[activeTestimonial];

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
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0`;
    }

    // For direct video URLs, return as-is
    return url;
  };

  // Get video for the experience section - ENHANCED VERSION
  const experienceVideo = React.useMemo(() => {
    // console.log('Processing videos in experienceVideo memo:', videos);

    if (videos && videos.length > 0) {
      // Find the first valid video
      const validVideo = videos.find(video => {
        const isValid = isVideoUrl(video.url);
        // console.log('Checking video:', video.url, 'Valid:', isValid);
        return isValid;
      });

      if (validVideo) {
        // console.log('Using valid video:', validVideo);
        const embeddableUrl = getEmbeddableVideoUrl(validVideo.url);
        const isYouTube = validVideo.url.includes('youtube.com') || validVideo.url.includes('youtu.be');

        return {
          url: embeddableUrl || validVideo.url,
          originalUrl: validVideo.url,
          isYouTube,
          label: validVideo.label || ["Zipline Adventure Experience"],
          poster: "https://cdn.acsdev.in/FNF/699b3f2230e9c.jpg"
        };
      }
    }

    // console.log('No valid videos found, using fallback');
    // Fallback to image if no valid videos
    return {
      url: "https://cdn.acsdev.in/FNF/699b3f2230e9c.jpg",
      originalUrl: null,
      isYouTube: false,
      label: ["Zipline Adventure Experience"],
      poster: "https://cdn.acsdev.in/FNF/699b3f2230e9c.jpg"
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

  // Get formatted metrics with suffixes - using same logic as SkyCycleExperience
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
        value: '15,000+',
        label: 'Happy Adventurers',
        color: 'red',
        icon: Zap
      },
      {
        value: '12,000+',
        label: 'Adventures Completed',
        color: 'amber',
        icon: Heart
      },
      {
        value: '800+',
        label: 'Adventure Events',
        color: 'orange',
        icon: Trophy
      }
    ];
  }, [metrics]);

  // Video control handlers - Enhanced for YouTube support
  const handleVideoPlay = async () => {
    if (experienceVideo.isYouTube) {
      // For YouTube videos, we'll handle this differently
      setVideoState(prev => ({
        ...prev,
        showPoster: false,
        hasStarted: true,
        isPlaying: true
      }));
      return;
    }

    if (videoRef.current) {
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
    if (videoRef.current) {
      videoRef.current.pause();
      setVideoState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setVideoState(prev => ({ ...prev, isMuted: videoRef.current.muted }));
    }
  };

  // Auto-play video when component mounts (muted) - Enhanced for YouTube
  useEffect(() => {
    if (experienceVideo.isYouTube) {
      // For YouTube videos, we'll show the poster initially
      setVideoState(prev => ({
        ...prev,
        showPoster: true,
        isPlaying: false
      }));
      return;
    }

    if (videoRef.current && isVideoUrl(experienceVideo.url)) {
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
  }, [experienceVideo.url, experienceVideo.isYouTube]);

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
    // console.log('isVideoUrl result:', isVideoUrl(experienceVideo.url));
  }, [experienceVideo]);

  return (
    <section
      id="zipline-experience"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
      role="main"
      aria-labelledby="zipline-experience-title"
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
      {/* Simple Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-red-600/20">
            <defs>
              <pattern id="circuitPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="20" cy="20" r="3" fill="currentColor"/>
                <circle cx="80" cy="80" r="3" fill="currentColor"/>
                <line x1="20" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1"/>
                <line x1="80" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuitPattern)"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20">

        <div className="space-y-24">

          {/* Header with Gaming Stats */}
          <header className="text-center relative">
            <motion.div
              className="inline-flex items-center gap-3 bg-red-600/20 border border-red-600/30 rounded-full px-8 py-4 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Gamepad2 className="w-6 h-6 text-red-600" aria-hidden="true" />
              <span className="text-red-300 font-bold text-lg">Ultimate Adventure Experience</span>
              <Target className="w-6 h-6 text-red-600" aria-hidden="true" />
            </motion.div>

            <motion.h1
              id="zipline-experience-title"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-sansitaOne leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="block ">
                <span className="text-white">Adventure</span> <span className="text-red-600">Experience</span>
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Experience the ultimate adventure arena with our zipline rollercoaster combined with go-karting,
              bowling, archery, and more. Where every adventure is an unforgettable journey!
            </motion.p>
          </header>

          {/* Video and Testimonials Layout */}
          <section className="relative" aria-labelledby="video-testimonials-title">
            <h2 id="video-testimonials-title" className="sr-only">Adventure Experience Video and Customer Testimonials</h2>
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
                  {experienceVideo.isYouTube ? (
                    <>
                      {/* YouTube Embed */}
                      {!videoState.showPoster ? (
                        <iframe
                          src={experienceVideo.url}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="Zipline Adventure Experience"
                        />
                      ) : (
                        <>
                          <img
                            src={experienceVideo.poster}
                            alt="Zipline adventure video preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://cdn.acsdev.in/FNF/699b3f2230e9c.jpg";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40" />
                          <motion.button
                            className="absolute inset-0 flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleVideoPlay}
                            aria-label="Play video"
                          >
                            <div className="w-28 h-28 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-2xl border-2 border-white/30">
                              <Play className="w-12 h-12 ml-2" />
                            </div>
                          </motion.button>
                        </>
                      )}
                    </>
                  ) : isVideoUrl(experienceVideo.url) ? (
                    <>
                      {/* Poster Image Overlay */}
                      {videoState.showPoster && (
                        <div className="absolute inset-0 z-20">
                          <img
                            src={experienceVideo.poster}
                            alt="Zipline adventure video preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://cdn.acsdev.in/FNF/699b3f2230e9c.jpg";
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
                        alt="Adventure arena zipline experience showing players enjoying various activities"
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://cdn.acsdev.in/FNF/699b3f2230e9c.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <motion.button
                          onClick={() => scrollToSection('zipline-gallery')}
                          className="w-28 h-28 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Watch adventure action video - opens gallery section"
                        >
                          <Play className="w-12 h-12 ml-2" />
                        </motion.button>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-red-900/30" aria-hidden="true" />

                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-white text-3xl font-bold font-sansitaOne mb-3">
                      Adventure On!
                    </h3>
                    <p className="text-gray-200 text-lg">
                      {experienceVideo.label && experienceVideo.label[0] ? experienceVideo.label[0] : 'Watch adventurers conquer our arena'}
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
                            "&background=ef4444&color=fff";
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

                    <div className="flex gap-1 mb-6" role="img" aria-label={`${currentTestimonial?.rating || 0} out of 5 stars`}>
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
              onClick={() => scrollToSection('zipline-gallery')}
              className="group bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-4 transform hover:scale-105 shadow-xl focus:outline-none focus:ring-4 focus:ring-red-600/50"
              aria-label="Watch adventure action - scroll to gallery section"
            >
              <Play className="w-7 h-7" aria-hidden="true" />
              Watch Adventure Action
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </motion.div>

          {/* Bottom Adventure Features */}
          <motion.section
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            aria-labelledby="adventure-features-title"
          >
            <h2 id="adventure-features-title" className="sr-only">Adventure Features and Benefits</h2>
          </motion.section>
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
    </section>
  );
}
