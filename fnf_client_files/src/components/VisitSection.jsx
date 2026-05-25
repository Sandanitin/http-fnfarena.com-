import React from "react";
import { motion } from "framer-motion";
import sectionImage from "../assets/visit.png";
import { Check } from "lucide-react";

export default function VisitSection() {
  return (
    <div className="w-full bg-[#1e2125] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 gap-10 relative overflow-hidden">

      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, x: -80 }}
        animate={{ opacity: 0.3, scale: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute left-[-120px] top-10 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px]
                  rounded-full bg-gradient-to-br from-gray-100/40 via-gray-300/30 to-gray-500/20
                  blur-2xl"
      />

      {/* LEFT SIDE TEXT */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl z-10"
      >
        <h2 className="text-white text-[26px] sm:text-[32px] font-sansitaOne">
          Plan Your Visit to FNF Arena Hyderabad
        </h2>

        <h3 className="text-red-500 font-extrabold text-[32px] sm:text-[42px] mt-1 font-sansitaOne">
          Timings, Location & Rules
        </h3>

        {/* Timings */}
        <div className="mt-6">
          <p className="text-gray-200 text-[20px] sm:text-[24px] font-sansitaOne">Timings</p>
          <p className="text-gray-400 font-lato font-medium text-[16px] sm:text-[18px] mt-1">
            Open all week | Check updates during holidays <br />
            and special events.
          </p>
        </div>

        {/* How to Reach */}
        <div className="mt-6">
          <p className="text-gray-200 text-[20px] sm:text-[24px] font-sansitaOne">How to Reach</p>
          <p className="text-gray-400 font-lato font-medium text-[16px] sm:text-[18px] mt-1">
            Located conveniently in Hyderabad with ample parking <br />
            and easy access by road.
          </p>
        </div>

        {/* What to Bring */}
        <div className="mt-6">
          <p className="text-gray-200 text-[20px] sm:text-[24px] font-sansitaOne">What to Bring</p>
          <p className="text-gray-400 font-lato font-medium text-[16px] sm:text-[18px] mt-1">
            Comfortable clothes, closed shoes, socks, and valid ID.
          </p>
        </div>
      </motion.div>

      {/* RIGHT SIDE IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        className="relative w-full lg:w-1/2 flex justify-center"
      >
        <img
          src={`${__CDN_BASE__}visit.png`}  loading="lazy"
          alt="Bowling Area"
          className="w-full max-w-[600px] rounded-xl object-cover shadow-xl"
        />

        {/* RULES CARD */}
    <div
  className="
    absolute
    bottom-[-60px] sm:bottom-[-70px]
    left-1/2 -translate-x-1/2
    lg:left-[30%] lg:-translate-x-1/2
    bg-gray-700/50 backdrop-blur-md text-white
    p-4 sm:p-6
    mb-8
    rounded-xl
    w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%]
    shadow-xl
  "
>        <ul className="space-y-3 text-[13px] sm:text-[15px] md:text-[16px] font-lato font-medium leading-[20px]">
            <li className="flex items-center gap-3">
              <Check size={20} className="text-white" /> Follow staff instructions at all times
            </li>
            <li className="flex items-center gap-3">
              <Check size={20} className="text-white" /> Pregnant or medically unfit guests should avoid certain rides
            </li>
            <li className="flex items-center gap-3">
              <Check size={20} className="text-white" /> Entry for minors only under supervision
            </li>
            <li className="flex items-center gap-3">
              <Check size={20} className="text-white" /> Safety gear is mandatory where applicable
            </li>
          </ul>
        </div>
      </motion.div>
      <div
        className="absolute left-0 right-0 bottom-2 h-6 pointer-events-none z-10"
        style={{
          backgroundImage: `
            linear-gradient(45deg,
              rgba(255,255,255,0.95) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255,255,255,0.95) 75%,
              rgba(255,255,255,0.95) 100%
            ),
            linear-gradient(45deg,
              rgba(255,255,255,0.95) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255,255,255,0.95) 75%,
              rgba(255,255,255,0.95) 100%
            ),
            linear-gradient(180deg,#C7161E,#d94b4b)
          `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          backgroundRepeat: "repeat",
          transform: "translateY(8px)",
          boxShadow: "0 -6px 20px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
}
