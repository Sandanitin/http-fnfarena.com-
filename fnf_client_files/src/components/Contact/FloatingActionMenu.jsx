"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingActionMenu({ className = "" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handleDoc(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleDoc);
    document.addEventListener("touchstart", handleDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handleDoc);
      document.removeEventListener("touchstart", handleDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const actions = [
    {
      key: "users",
      label: "Group",
      onClick: () => // console.log("Group clicked"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M17 21v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v2" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 7a4 4 0 100-8 4 4 0 000 8zM20 8a3 3 0 11-6 0 3 3 0 016 0z" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      key: "user",
      label: "Profile",
      onClick: () => // console.log("Profile clicked"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 21v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      key: "megaphone",
      label: "Promote",
      onClick: () => // console.log("Promote clicked"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 11v3a1 1 0 001 1h2l6 3V6L6 9H4a1 1 0 00-1 1z" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 8a7 7 0 011 4 7 7 0 01-1 4" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  // positions button
  const positions = [
    { x: -96, y: -18 }, 
    { x: -56, y: -84 }, 
    { x: -56, y: 48 },  
  ];

  return (
    <div
      ref={rootRef}
      className={`asolute bottom-[322px] right-[382px] z-[9999] ${className}`}
      style={{ pointerEvents: "auto" }}
      aria-live="polite"
    >
    <div className="relative overflow-hidden">
  <AnimatePresence>
    {open &&
      actions.map((a, i) => {
        const pos = positions[i] || { x: -80, y: -(80 + i * 40) };
        return (
          <motion.button
            key={a.key}
            initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
            exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            onClick={() => {
              a.onClick();
              setOpen(false);
            }}
            aria-label={a.label}
            title={a.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg focus:outline-none"
            style={{ left: 0, top: 0, zIndex: 10000 }}
          >
            {a.icon}
          </motion.button>
        );
      })}
  </AnimatePresence>

  {/* main red circular button */}
  <button
    onClick={() => setOpen((s) => !s)}
    aria-expanded={open}
    aria-label={open ? "Close actions" : "Open actions"}
    className="absolute flex items-center justify-center focus:outline-none"
    style={{
      width: 76,
      height: 76,
      background: "#d8272b",
      borderRadius: 9999,
      border: "6px solid rgba(255,255,255,0.06)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      zIndex: 10001,
      position: "relative",
      pointerEvents: "auto",
      overflow: "visible", 
    }}
  >
    <AnimatePresence initial={false}>
      {!open ? (
        <motion.div
          key="dots"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.14 }}
          className="flex flex-col items-center justify-center space-y-1 z-50"
          style={{ zIndex: 10002 }} 
        >
          {/*  dots */}
          <span className="block w-3.5 h-3.5 rounded-full bg-white" />
          <span className="block w-3.5 h-3.5 rounded-full bg-white" />
          <span className="block w-3.5 h-3.5 rounded-full bg-white" />
        </motion.div>
      ) : (
        <motion.div
          key="close"
          initial={{ rotate: -20, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 20, scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.14 }}
          className="text-white text-2xl font-bold leading-none"
        >
          ✕
        </motion.div>
      )}
    </AnimatePresence>
  </button>
</div>

    </div>
  );
}
