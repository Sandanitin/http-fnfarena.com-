"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Eye, Heart, Share2, Download } from "lucide-react";

export default function LaserTagGallery() {
  const [activeImage, setActiveImage] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      alt: "Laser tag arena with players in combat",
      title: "Arena Combat",
      category: "Action",
      likes: 342
    },
    {
      src: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop",
      alt: "Team strategy session in laser tag",
      title: "Team Strategy",
      category: "Teamwork",
      likes: 289
    },
    {
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      alt: "Multi-level laser tag arena",
      title: "Arena Design",
      category: "Facility",
      likes: 156
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      alt: "Players with laser tag equipment",
      title: "Combat Gear",
      category: "Equipment",
      likes: 203
    },
    {
      src: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=600&fit=crop",
      alt: "Victory celebration after laser tag",
      title: "Victory Moment",
      category: "Celebration",
      likes: 378
    },
    {
      src: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop&hue=60",
      alt: "Group photo after laser tag session",
      title: "Team Photo",
      category: "Group",
      likes: 245
    }
  ];

  const filteredImages = galleryImages;

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section className="relative bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white py-20 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 opacity-5">
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-red-400/30">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="3"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>

        <div className="absolute bottom-20 left-20 opacity-8">
          <svg width="150" height="120" viewBox="0 0 150 120" className="text-red-400/20">
            <rect x="10" y="10" width="130" height="100" rx="8" fill="none" stroke="currentColor" strokeWidth="3"/>
            <rect x="20" y="20" width="110" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="75" cy="60" r="15" fill="currentColor" opacity="0.5"/>
          </svg>
        </div>

        <div className="absolute top-1/3 left-1/4 opacity-5 text-red-400 text-4xl">📸</div>
        <div className="absolute bottom-1/3 right-1/3 opacity-5 text-red-500 text-3xl">🎬</div>
        <div className="absolute top-2/3 right-1/6 opacity-5 text-red-400 text-2xl">🖼️</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-full px-8 py-4 mb-8">
            <Eye className="w-6 h-6 text-red-400" />
            <span className="text-red-400 text-lg font-bold uppercase tracking-wider">
              Combat Gallery
            </span>
            <Play className="w-6 h-6 text-red-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
            Laser Tag Gallery
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-red-400 to-red-500 bg-clip-text font-sansitaOne mb-8">
            Combat Moments
          </h3>
          <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
            Explore our collection of intense laser tag battles, strategic team moments, and victory celebrations
            captured at FNF Arena's premier combat facility.
          </p>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          className="flex justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-red-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                viewMode === 'carousel'
                  ? 'bg-red-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Carousel
            </button>
          </div>
        </motion.div>

        {/* Gallery Content */}
        {viewMode === 'grid' ? (
          <motion.div
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                className="break-inside-avoid mb-6 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => {
                  setActiveImage(index);
                  setViewMode('carousel');
                }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-100"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white text-lg font-bold font-sansitaOne mb-2">
                        {image.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-red-400 text-sm font-semibold">
                          {image.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-red-400" />
                          <span className="text-white text-sm">{image.likes}</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={filteredImages[activeImage]?.src}
                alt={filteredImages[activeImage]?.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />

              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white text-2xl font-bold font-sansitaOne">
                      {filteredImages[activeImage]?.title}
                    </h4>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5 text-red-400" />
                        <span className="text-white">{filteredImages[activeImage]?.likes}</span>
                      </div>
                      <button className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <span className="text-red-400 font-semibold">
                    {filteredImages[activeImage]?.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {filteredImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-24 h-18 rounded-xl overflow-hidden transition-all duration-300 ${
                    index === activeImage
                      ? 'ring-3 ring-red-400 shadow-lg scale-110'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center bg-gradient-to-br from-red-500/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <div className="text-3xl md:text-4xl font-bold text-red-400 font-sansitaOne">16</div>
            <p className="text-gray-400 text-sm mt-1">Max Players</p>
          </div>
          <div className="text-center bg-gradient-to-br from-red-600/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-red-600/30">
            <div className="text-3xl md:text-4xl font-bold text-red-500 font-sansitaOne">2</div>
            <p className="text-gray-400 text-sm mt-1">Game Modes</p>
          </div>
          <div className="text-center bg-gradient-to-br from-red-700/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-red-700/30">
            <div className="text-3xl md:text-4xl font-bold text-red-600 font-sansitaOne">45</div>
            <p className="text-gray-400 text-sm mt-1">Max Duration</p>
          </div>
          <div className="text-center bg-gradient-to-br from-red-500/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <div className="text-3xl md:text-4xl font-bold text-red-400 font-sansitaOne">100%</div>
            <p className="text-gray-400 text-sm mt-1">Combat Fun</p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-red-500/30">
            <h3 className="text-4xl font-bold mb-6 font-sansitaOne text-white">Experience the Combat Live!</h3>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto text-lg">
              Ready to create your own combat memories? Book your laser tag session today and become part of our gallery.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl transform hover:scale-105">
                Book Combat Session
              </button>
              <button className="border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm">
                View All Photos
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
