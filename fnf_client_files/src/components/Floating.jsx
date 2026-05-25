"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, Megaphone, ArrowUp } from "lucide-react";
import { useOffers } from "../Context/OffersContext";
import { useContact } from "../Context/ContactContext";

export default function FloatingActionMenu({ className = "" }) {
  const [open, setOpen] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const rootRef = useRef(null);
  const closeTimerRef = useRef(null);

  const { getBestCurrentOffer, hasActiveOffers, loading, getValidActiveOffers } = useOffers();
  const { contactData, loading: contactLoading, error: contactError } = useContact();

  /* -------------------- Scroll to Top Logic -------------------- */
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down more than 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  /* -------------------- Announcement Helper -------------------- */
  const openAnnouncement = () => {
    const validOffers = getValidActiveOffers();
    if (validOffers.length > 1) {
      setCurrentOfferIndex(prev => (prev + 1) % validOffers.length);
    }

    setShowAnnouncements(true);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setShowAnnouncements(false);
    }, 10000);
  };

  /* -------------------- WhatsApp Helpers -------------------- */
  const openWhatsAppChannel = () => {
    if (contactData?.phone) {
      const phoneNumber = contactData.phone;
      const message = "Hi, I would like to get more information about FNF Arena.";
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    } else {
      window.open("https://whatsapp.com/channel/0029VauR6krBA1f06u73iv3p", "_blank");
    }
  };

  const openWhatsAppChat = () => {
    const phoneNumber = contactData?.phone2 || "9090945459";
    const message = "Hi, I would like to inquire about group bookings.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  /* -------------------- Auto Popup -------------------- */
  useEffect(() => {
    if (!loading && hasActiveOffers()) {
      const timer = setTimeout(() => {
        openAnnouncement();
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [loading, hasActiveOffers]);

  /* -------------------- Cleanup -------------------- */
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  /* -------------------- Outside Click -------------------- */
  useEffect(() => {
    const handleOutside = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };

    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  /* -------------------- Offer Helpers -------------------- */
  const getCurrentOfferImage = () => {
    const fallbackImage = "https://cdn.acsdev.in/FNF/FNF%20Page.jpg";

    if (loading) {
      return fallbackImage;
    }

    const validOffers = getValidActiveOffers();

    if (!validOffers || validOffers.length === 0) {
      return fallbackImage;
    }

    const currentOffer = validOffers[currentOfferIndex] || validOffers[0];

    if (currentOffer && currentOffer.image) {
      return currentOffer.image;
    }

    return fallbackImage;
  };

  const getCurrentOfferData = () => {
    if (loading) {
      return null;
    }

    const validOffers = getValidActiveOffers();
    if (!validOffers || validOffers.length === 0) {
      return null;
    }

    const currentOffer = validOffers[currentOfferIndex] || validOffers[0];

    if (currentOffer) {
      return {
        id: currentOffer.id,
        name: currentOffer.name,
        discount: currentOffer.discount,
        type: currentOffer.type,
        startDate: currentOffer.start_date,
        endDate: currentOffer.end_date,
        image: currentOffer.image
      };
    }

    return null;
  };

  /* -------------------- Random Offer Selection on Mount -------------------- */
  useEffect(() => {
    if (!loading && hasActiveOffers()) {
      const validOffers = getValidActiveOffers();
      if (validOffers.length > 1) {
        const randomIndex = Math.floor(Math.random() * validOffers.length);
        setCurrentOfferIndex(randomIndex);
      }
    }
  }, [loading, hasActiveOffers]);

  /* -------------------- Actions -------------------- */
  const actions = [
    {
      key: "profile",
      label: "Contact Us",
      onClick: openWhatsAppChannel,
      icon: <User size={18} stroke="#111" strokeWidth={1.5} />,
      disabled: contactLoading,
    },
    {
      key: "group",
      label: "Group Booking",
      onClick: openWhatsAppChat,
      icon: <Users size={18} stroke="#111" strokeWidth={1.5} />,
      disabled: contactLoading,
    },
    {
      key: "promote",
      label: "Announcements",
      onClick: openAnnouncement,
      icon: <Megaphone size={18} stroke="#111" strokeWidth={1.5} />,
      disabled: false,
    },
  ];

  const positions = [
    { x: -76, y: -104 },
    { x: -160, y: -64 },
    { x: -196, y: 10 },
  ];

  return (
    <div
      ref={rootRef}
      className={`fixed right-6 z-[99999] transition-all duration-300 ${
        showScrollTop ? 'bottom-16' : 'bottom-6'
      } ${className}`}
    >

      {/* Action Buttons */}
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.div
              key={action.key}
              className="group absolute flex items-center"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: positions[i].x,
                y: positions[i].y,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <span
                className="
                  mr-2 px-2 py-1 text-xs bg-black text-white rounded
                  opacity-0 translate-x-2
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition-all duration-200 whitespace-nowrap
                "
              >
                {action.label}
                {action.disabled && " (Loading...)"}
              </span>

              <button
                onClick={() => {
                  if (!action.disabled) {
                    action.onClick();
                    setOpen(false);
                  }
                }}
                disabled={action.disabled}
                className={`w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center transition-colors ${
                  action.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-50'
                }`}
                aria-label={action.label}
              >
                {action.icon}
              </button>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Scroll to Top Button - Positioned just below main FAB */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={scrollToTop}
            className="absolute top-[54px] left-[3px] w-[40px] h-[40px] rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} stroke="#d8272b" strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-[46px] h-[46px] rounded-full bg-[#d8272b] border-[6px] border-white/10 shadow-xl flex items-center justify-center hover:bg-[#b91c1c] transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <span className="text-white text-xl">✕</span>
        ) : (
          <span className="text-white text-4xl leading-none">⋮</span>
        )}
      </button>

      {/* Announcement Modal */}
      <AnimatePresence>
        {showAnnouncements && (
          <motion.div
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAnnouncements(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="w-[90%] max-w-sm rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={getCurrentOfferImage()}
                  alt={getCurrentOfferData()?.name || "Special Offer"}
                  className="w-full h-full md:h-full object-cover cursor-pointer"
                  onClick={() => setShowAnnouncements(false)}
                  onError={(e) => {
                    e.target.src = "https://cdn.acsdev.in/FNF/FNF%20Page.jpg";
                  }}
                />

                {getCurrentOfferData() && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">
                      {getCurrentOfferData().name}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {getCurrentOfferData().discount}{" "}
                      {getCurrentOfferData().type} Off
                    </p>
                    <p className="text-white/70 text-xs">
                      Valid till: {getCurrentOfferData().endDate}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
