"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Second = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-[#191e22] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 px-6 lg:px-0 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="text-[10px] sm:text-[12px] uppercase tracking-wide text-white">
            Where fun, speed, and adventure come together — closer than you think.
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-3 text-white font-sansitaOne">
            At the Heart of Hyderabad
            <span className="text-red-600 font-extrabold">’s</span>
          </h1>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-1 text-red-600 italic">
            Thrill Zone
          </h1>

          <p className="text-gray-400 mt-6 leading-relaxed max-w-full sm:max-w-lg md:max-w-xl">
            Located in the vibrant outskirts of Hyderabad, FNF Arena is designed
            to be your go-to escape for adrenaline and family fun.
          </p>

          <p className="text-gray-400 mt-3 leading-relaxed max-w-full sm:max-w-lg md:max-w-xl">
            Easy to reach, spacious, and built for all-day excitement — our arena
            brings world-class activities right to your neighborhood.
          </p>

          <p className="text-gray-400 mt-3 leading-relaxed max-w-full sm:max-w-lg md:max-w-xl">
            Whether you're planning a quick race, a group outing, or a full adventure
            day, getting here is simple… leaving the fun behind is harder.
          </p>

          {/* BUTTON */}
          <button onClick={() => navigate('/plan')} className="mt-8 bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-semibold hover:bg-red-700 transition-all text-sm sm:text-base">
            PLAN YOUR VISIT
          </button>
        </div>

        {/* RIGHT SIDE GOOGLE MAP WITH GRADIENT */}
        <div className="flex justify-center lg:justify-end relative mt-10 lg:mt-0">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-xl border-[3px] sm:border-4 border-gray-200">
            
            {/* Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.901345635493!2d78.24742187516563!3d17.416521483475528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbed2623555c25%3A0x85696ef641030d4!2sFNF%20ARENA!5e0!3m2!1sen!2sin!4v1764177591872!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative z-10"
            ></iframe>

            {/* Gradient Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, x: -80 }}
              animate={{ opacity: 0.3, scale: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute right-[-100px] sm:right-[-120px] bottom-10 w-72 sm:w-[450px] md:w-[550px] h-72 sm:h-[450px] md:h-[550px] rounded-full bg-gradient-to-br from-gray-100/40 via-gray-300/30 to-gray-500/20 blur-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Second;
