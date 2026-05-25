"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, Mic, Megaphone } from "lucide-react";
import { useOffers } from "../Context/OffersContext";
import fnfnewyear from "../assets/fnfnewyear.png"; // Fallback image

export default function FloatingActionMenu({ className = "" }) {
  const [open, setOpen] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const rootRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Get offers from context
  const { getBestCurrentOffer, hasActiveOffers, loading } = useOffers();

  /* -------------------- Announcement Helper -------------------- */
  const openAnnouncement = () => {
    setShowAnnouncements(true);

    // clear any previous auto-close
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setShowAnnouncements(false);
    }, 3000); // ⏱️ auto close after 3s
  };

  /* -------------------- WhatsApp Helper Functions -------------------- */
  const openWhatsAppChat = () => {
    const phoneNumber = "9090945459"; // Group bookings number
    const message = "Hi, I would like to inquire about group bookings.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const openWhatsAppChannel = () => {
    const channelUrl = "https://whatsapp.com/channel/0029VauR6krBA1f06u73iv3p";
    window.open(channelUrl, '_blank');
  };

  /* -------------------- Auto Popup After 30s -------------------- */
  useEffect(() => {
    // Only show auto popup if there are active offers and not loading
    if (!loading && hasActiveOffers()) {
      const timer = setTimeout(() => {
        openAnnouncement();
      }, 30000); // ⏱️ show after 30s

      return () => clearTimeout(timer);
    }
  }, [loading, hasActiveOffers]);

  /* -------------------- Cleanup -------------------- */
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  /* -------------------- Outside Click & ESC -------------------- */
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

  /* -------------------- Get Current Offer Image -------------------- */
  const getCurrentOfferImage = () => {
    if (loading) return fnfnewyear; // Show fallback while loading

    const currentOffer = getBestCurrentOffer();
    return currentOffer ? currentOffer.image : fnfnewyear; // Fallback to static image if no active offers
  };

  const getCurrentOfferData = () => {
    if (loading) return null;
    return getBestCurrentOffer();
  };

  /* -------------------- Action Buttons -------------------- */
  const actions = [
    {
      key: "profile",
      label: "Profile",
      onClick: openWhatsAppChannel, // 📱 Open WhatsApp channel
      icon: <User size={18} stroke="#111" strokeWidth={1.5} />,
    },
    {
      key: "group",
      label: "Group",
      onClick: openWhatsAppChat, // 📱 Open WhatsApp chat for group bookings
      icon: <Users size={18} stroke="#111" strokeWidth={1.5} />,
    },
    {
      key: "promote",
      label: "Promote",
      onClick: openAnnouncement, // 📢 manual trigger
      icon: <Megaphone size={18} stroke="#111" strokeWidth={1.5} />,
    },
  ];

  const positions = [
    { x: -126, y: -48 },
    { x: -76, y: -104 },
    { x: -76, y: 12 },
  ];

  return (
    <div ref={rootRef} className={`fixed bottom-6 right-6 z-[99999] ${className}`}>
      {/* Action Buttons */}
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.button
              key={action.key}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1, x: positions[i].x, y: positions[i].y }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              onClick={() => {
                action.onClick();
                setOpen(false);
              }}
              className="absolute w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label={action.label}
            >
              {action.icon}
            </motion.button>
          ))}
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
                  alt={getCurrentOfferData()?.name || "FNF Offer"}
                  className="w-full object-cover cursor-pointer"
                  onClick={() => setShowAnnouncements(false)}
                  onError={(e) => {
                    // Fallback to static image if dynamic image fails to load
                    e.target.src = fnfnewyear;
                  }}
                />
                {/* Show offer details if available */}
                {getCurrentOfferData() && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{getCurrentOfferData().name}</h3>
                    <p className="text-white/90 text-sm">
                      {getCurrentOfferData().discount} {getCurrentOfferData().type} Off
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
