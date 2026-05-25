import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

export default function About({ homeStats, homeLoading, homeError, IMGUrl }) {
  // Modal state for video popup
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsVideoModalOpen(false);
      }
    };

    if (isVideoModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);

  // Loading and error states
  if (homeLoading) {
    return (
      <div className="w-full py-40 text-center text-white">
        Loading about section...
      </div>
    );
  }

  if (homeError) {
    return (
      <div className="w-full py-40 text-center text-white">
        Error loading data: {homeError}
      </div>
    );
  }

  const videoUrl = "https://cdn.acsdev.in/FNF/intro_video.mp4";

  return (
    <div className="w-full bg-[#1e2125] relative overflow-visible py-40 px-6 md:py-32 md:px-12">
      <div className="w-full px-4 md:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-white text-[32px] md:text-[40px] lg:text-[48px] font-sansitaOne leading-tight">
              The Ultimate
            </h2>

            <h3 className="text-red-500 font-extrabold text-[40px] md:text-[48px] lg:text-[56px] mt-1 font-sansitaOne leading-tight">
              Adrenaline Hub
            </h3>

            <p className="text-white mt-6 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl">
              FNF Arena is Hyderabad's heartbeat for fun and adrenaline — a space
              built to let you race, compete, and bond. Born from passion and
              engineered for thrill, it blends motorsport energy, immersive
              entertainment & family joy into one unforgettable destination.
            </p>
          </motion.div>

          {/* RIGHT VIDEO - MUCH LARGER */}
          <motion.div
            className="flex justify-center md:justify-end w-full"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div
              className="relative group cursor-pointer w-full max-w-[600px] lg:max-w-[700px]"
              onClick={() => setIsVideoModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsVideoModalOpen(true);
                }
              }}
              aria-label="Play video about FNF Arena"
            >
              <video
                src={videoUrl}
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] object-cover rounded-3xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6">
                  <Play className="w-12 h-12 text-white fill-white" />
                </div>
              </div>
              {/* Accessibility text for screen readers */}
              <span className="sr-only">
                Click to play video about FNF Arena Hyderabad
              </span>
            </div>
          </motion.div>
        </div>
      </div>

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
                FNF Arena Introduction Video
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
                Introduction video showcasing FNF Arena Hyderabad's facilities and attractions
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
