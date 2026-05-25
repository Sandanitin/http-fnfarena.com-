"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Play } from "lucide-react";
import { useEventData } from "../../Context/EventDataContext";

export default function EventsGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    getEventByType,
    getGalleryImages,
    getEventVideos,
    getMainImage,
    getLandingImage,
    loading,
    error
  } = useEventData();

  const galleryItems = useMemo(() => {
    // Only get Event Space data
    const eventSpaceData = getEventByType('Event Space');
    if (!eventSpaceData) return [];

    const items = [];

    // Add main image
    const mainImage = getMainImage('Event Space');
    if (mainImage) {
      items.push({
        src: mainImage,
        alt: "Event Space Main Image",
        title: "Event Space",
        category: "Event Space",
        type: 'image'
      });
    }

    // Add landing image
    const landingImage = getLandingImage('Event Space');
    if (landingImage && landingImage !== mainImage) {
      items.push({
        src: landingImage,
        alt: "Event Space Landing Image",
        title: "Event Space Landing",
        category: "Event Space",
        type: 'image'
      });
    }

    // Add gallery images
    const galleryImages = getGalleryImages('Event Space');
    galleryImages.forEach((image, index) => {
      items.push({
        src: image,
        alt: `Event Space Gallery Image ${index + 1}`,
        title: `Event Space Gallery ${index + 1}`,
        category: "Event Space",
        type: 'image'
      });
    });

    // Add videos
    const videos = getEventVideos('Event Space');
    videos.forEach((video, index) => {
      items.push({
        src: video.url,
        alt: `Event Space Video ${index + 1}`,
        title: video.label && video.label.length > 0 ? video.label[0] : `Event Space Video ${index + 1}`,
        category: "Event Space",
        type: 'video',
        thumbnail: video.thumbnail || mainImage // Use main image as fallback thumbnail
      });
    });

    // Remove duplicates based on src
    const uniqueItems = items.filter((item, index, self) =>
      index === self.findIndex(t => t.src === item.src)
    );

    return uniqueItems;
  }, [getEventByType, getGalleryImages, getEventVideos, getMainImage, getLandingImage]);

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
      <section className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-400 text-lg">Error loading gallery</p>
            <p className="text-gray-400 text-sm mt-2">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!galleryItems.length) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-white text-lg">No gallery items available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='event-memories' className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] py-20">
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
            <span className="text-red-500 text-sm font-semibold">Event Gallery</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Event <span className="text-red-500">Memories</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our stunning event spaces and see how we bring celebrations to life
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={`${item.src}-${index}`}
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-600/20 hover:border-red-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-square overflow-hidden">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={item.thumbnail || item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://cdn.acsdev.in/FNF/MLK3753.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://cdn.acsdev.in/FNF/MLK3753.jpg";
                    }}
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {item.category}
                </div>

                {/* Type Badge */}
                {item.type === 'video' && (
                  <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Video
                  </div>
                )}

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Media Content */}
              {selectedImage.type === 'video' ? (
                <video
                  src={selectedImage.src}
                  controls
                  autoPlay
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <motion.img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  onError={(e) => {
                    e.target.src = "https://cdn.acsdev.in/FNF/MLK3753.jpg";
                  }}
                />
              )}

              {/* Title */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h3 className="text-white font-bold text-xl bg-black/50 rounded-lg px-4 py-2 inline-block">
                  {selectedImage.title}
                </h3>
              </div>

              {/* Counter */}
              <div className="absolute top-4 left-4 text-white bg-black/50 rounded-lg px-3 py-1 text-sm">
                {currentIndex + 1} / {galleryItems.length}
              </div>

              {/* Type indicator */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 rounded-lg px-3 py-1 text-sm">
                {selectedImage.type === 'video' ? 'Video' : 'Image'}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
