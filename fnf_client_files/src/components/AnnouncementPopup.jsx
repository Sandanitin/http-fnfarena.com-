"use client";
import { motion, AnimatePresence } from "framer-motion";
import fnfnewyear from "../assets/fnfnewyear.png";

export default function AnnouncementPopup({ open, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.85, y: 50 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-[92%] max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-[#111]"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 text-white/70 hover:text-white"
          >
            ✕
          </button>

          {/* HERO IMAGE */}
       <div className="relative h-[420px]">

            <img
              src={fnfnewyear}
              
              alt="FNF Event"
              className="w-full h-full object-cover"
            />
// console.log(fnfnewyear);

            {/* Overlay title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
              <h2 className="text-white text-2xl font-extrabold tracking-wide">
                Come Play at FNF
              </h2>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-5 text-white">
            {/* Badge */}
            <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-400 text-black">
              OFFICIAL ANNOUNCEMENT
            </span>

            <h3 className="text-lg font-bold mb-2">
              🎳 Arena Racing • 🏎️ Go-Karting • ⚽ Softball
            </h3>

            <p className="text-sm text-white/80 leading-relaxed">
              Join us for thrilling activities including Arena Racing,
              Bowling, Softball, Go-Karting and many more exciting experiences.
              <br /><br />
              Holiday schedules and special event updates will be announced here.
            </p>

            {/* DATE STRIP */}
            <div className="mt-4 flex items-center justify-between bg-[#1f1f1f] border border-yellow-400/40 rounded-xl px-4 py-3">
              <div>
                <p className="text-xs text-yellow-400">EVENT DATE</p>
                <p className="font-bold">JAN 05, 2024</p>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-red-600 text-white">
                Live Event
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={onClose}
              className="mt-5 w-full rounded-xl bg-red-600 hover:bg-red-700 text-white py-3 font-semibold tracking-wide transition"
            >
              LET’S GO 🚀
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
