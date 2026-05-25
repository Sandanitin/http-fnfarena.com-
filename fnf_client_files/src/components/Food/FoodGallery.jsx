"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { IMGUrl } from "../../config/apiConfig";
import { useFood } from "../../Context/FoodContext";

export default function FoodGallery() {
  const navigate = useNavigate();
  const { foods, loading, error } = useFood();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Transform food items into gallery format - show all items
  const galleryItems = React.useMemo(() => {
    return foods
      .filter(item => item.image) // Only include items with images
      .map(item => ({
        type: "image",
        src: `${IMGUrl}/${item.image}`,
        alt: item.name,
        title: item.name,
        description: item.description,
        price: item.offer_price || item.price
      }));
  }, [foods]);

  const openLightbox = (index) => {
    setSelectedImage(galleryItems[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(galleryItems[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(galleryItems[prevIndex]);
  };

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-white text-xl">Loading gallery...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500 text-xl">Error loading gallery: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/10">
          <defs>
            <pattern id="galleryPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="10" y="10" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="40" cy="40" r="2" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#galleryPattern)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Camera className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">Visual Experience</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Food <span className="text-red-500">Gallery</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Take a visual journey through our delicious gaming arena cuisine
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {galleryItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-600/20 hover:border-red-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/no-food.png";
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Title and Price */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    {item.price && (
                      <p className="text-red-400 font-bold">₹{item.price}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No food images available</p>
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              {galleryItems.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image */}
              <motion.img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  e.currentTarget.src = "/no-food.png";
                }}
              />

              {/* Title and Details */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="bg-black/50 rounded-lg px-4 py-2 inline-block">
                  <h3 className="text-white font-bold text-xl mb-1">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-gray-300 text-sm mb-2">
                      {selectedImage.description}
                    </p>
                  )}
                  {selectedImage.price && (
                    <p className="text-red-400 font-bold">₹{selectedImage.price}</p>
                  )}
                </div>
              </div>

              {/* Counter */}
              {galleryItems.length > 1 && (
                <div className="absolute top-4 left-4 text-white bg-black/50 rounded-lg px-3 py-1 text-sm">
                  {currentIndex + 1} / {galleryItems.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
