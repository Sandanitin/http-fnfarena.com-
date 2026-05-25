"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Utensils, Coffee, Download, ArrowRight, Star, Zap, X, ZoomIn, ZoomOut, TrendingUp, RotateCw, View, Play } from "lucide-react";
import PDFModal from "../PDFModal";

export default function FoodHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle escape key to close modals
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isVideoModalOpen) {
          setIsVideoModalOpen(false);
        }
        if (isPDFModalOpen) {
          setIsPDFModalOpen(false);
        }
      }
    };

    if (isVideoModalOpen || isPDFModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen, isPDFModalOpen]);

  const handleViewMenu = () => {
    setIsPDFModalOpen(true);
  };

  const closePDFModal = () => {
    setIsPDFModalOpen(false);
  };

  const videoUrl = "https://cdn.acsdev.in/FNF/cafe_intro.mp4";

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full">
            <img
              src="https://cdn.acsdev.in/FNF/photo-food.jpg"
              alt="Gaming arena food background"
              loading="lazy"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1a1d21]/50 to-[#1a1d21]" />
          </div>

          {/* Gaming Food Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/20">
              <defs>
                <pattern id="foodPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="2" fill="currentColor"/>
                  <circle cx="20" cy="20" r="1" fill="currentColor"/>
                  <circle cx="60" cy="60" r="1" fill="currentColor"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#foodPattern)"/>
            </svg>
          </div>

          {/* Floating Food Icons */}
          <div className="absolute top-1/4 left-1/4 opacity-10">
            <svg width="150" height="150" viewBox="0 0 150 150" className="text-red-500/30">
              <g transform="translate(75,75)">
                <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M-20,-10 L20,-10 L15,10 L-15,10 Z" fill="currentColor"/>
                <circle cx="0" cy="-20" r="8" fill="currentColor"/>
              </g>
            </svg>
          </div>

          {/* Gaming Controller Food Fusion */}
          <div className="absolute bottom-1/3 right-1/4 opacity-8">
            <svg width="120" height="80" viewBox="0 0 120 80" className="text-red-500/20">
              <rect x="20" y="20" width="80" height="40" rx="20" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="35" cy="35" r="3" fill="currentColor"/>
              <circle cx="85" cy="35" r="3" fill="currentColor"/>
              <rect x="45" y="30" width="30" height="10" rx="5" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 border-2 border-red-500/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-32 left-40 w-16 h-16 bg-red-500/10 transform rotate-45"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-10 w-8 h-8 bg-red-500/20 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Header */}
              <div>
                <motion.div
                  className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <ChefHat className="w-4 h-4 text-red-500" />
                  <span className="text-red-500 text-sm font-semibold">Gaming Arena Cuisine</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-sansitaOne leading-tight">
                  Fuel Your
                  <span className="block text-red-500">Gaming Session</span>
                </h1>

                <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                  Experience the ultimate gaming arena dining with our specially crafted menu designed to keep you energized and focused during your epic gaming adventures.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Utensils className="w-6 h-6 text-red-500" />
                  <div>
                    <h4 className="text-white font-semibold text-sm">Gamer Meals</h4>
                    <p className="text-gray-400 text-xs">Quick & Tasty</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Coffee className="w-6 h-6 text-red-500" />
                  <div>
                    <h4 className="text-white font-semibold text-sm">Energy Drinks</h4>
                    <p className="text-gray-400 text-xs">Stay Focused</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <TrendingUp className="w-6 h-6 text-red-500" />
                  <div>
                    <h4 className="text-white font-semibold text-sm">Best Sellers</h4>
                    <p className="text-gray-400 text-xs">Customer Favorites</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Star className="w-6 h-6 text-red-500" />
                  <div>
                    <h4 className="text-white font-semibold text-sm">Premium Quality</h4>
                    <p className="text-gray-400 text-xs">Fresh & Hot</p>
                  </div>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <button
                  onClick={handleViewMenu}
                  className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  View Full Menu
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content - Food Video */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <div
                  className="aspect-[4/3] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                  onClick={() => setIsVideoModalOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsVideoModalOpen(true);
                    }
                  }}
                  aria-label="Play cafe introduction video"
                >
                  <video
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    aria-label="Cafe Saisho at FNF Arena promotional video"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6">
                      <Play className="w-12 h-12 text-white fill-white" />
                    </div>
                  </div>

                  {/* Accessibility text for screen readers */}
                  <span className="sr-only">
                    Click to play video about Cafe Saisho at FNF Arena
                  </span>
                </div>

                {/* Floating Food Cards */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-red-500 font-semibold text-sm">Saisho</div>
                  <div className="text-white font-bold">Cafe</div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-[#606265]/90 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20"
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="text-white font-semibold text-sm">Operating hours</div>
                  <div className="text-red-500 font-bold">11 am to 12 am</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsVideoModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-black rounded-2xl overflow-hidden shadow-2xl max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-label="Close video modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Hidden title for accessibility */}
              <h2 id="video-modal-title" className="sr-only">
                Cafe Saisho Introduction Video
              </h2>

              {/* Video */}
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-auto max-h-[80vh] object-contain"
                onLoadedData={() => {
                  // Optional: Add any video loaded logic here
                }}
                aria-describedby="video-description"
              >
                <track kind="captions" src="" label="English captions" />
              </video>

              {/* Hidden description for accessibility */}
              <p id="video-description" className="sr-only">
                Introduction video showcasing Cafe Saisho at FNF Arena Hyderabad's food offerings and atmosphere
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Modal */}
      <PDFModal
        isOpen={isPDFModalOpen}
        onClose={closePDFModal}
        pdfUrl="https://cdn.acsdev.in/FNF/cafe_menu.pdf"
        title="Cafe Saisho Menu"
      />
    </>
  );
}
