"use client";
import React, { useState } from "react";
import { Trophy, Heart, Shield, Lightbulb, Smile } from "lucide-react";
import { motion } from "framer-motion";
import { useHome } from "../../Context/HomeContext";

export default function Values() {
  const { homeStats, loading } = useHome();

if (loading || !homeStats) return null;

  const items = [
    {
      id: 0,
      icon: <Trophy size={48} strokeWidth={1.5} />,
      title: homeStats.feature_title1,
      subtitle: "Global Standards",
      description: homeStats.feature_description1
    },
    {
      id: 1,
      icon: <Heart size={48} strokeWidth={1.5} />,
      title:  homeStats.feature_title2,
      subtitle: "Moments to Cherish",
      description:homeStats.feature_description2
    },
    {
      id: 2,
      icon: <Shield size={48} strokeWidth={1.5} />,
      title:  homeStats.feature_title3,
      subtitle: "Stay Protected",
      description: homeStats.feature_description3
    },
    {
      id: 3,
      icon: <Lightbulb size={48} strokeWidth={1.5} />,
      title: homeStats.feature_title4,
      subtitle: "Always Improving",
      description: homeStats.feature_description4
    },
    {
      id: 4,
      icon: <Smile size={48} strokeWidth={1.5} />,
      title: homeStats.feature_title5,
      subtitle: "Everyone Welcome",
      description: homeStats.feature_description5
    },
  ];

  const [hoverId, setHoverId] = useState(null);

  const hoveredItem = items.find((i) => i.id === hoverId);

  return (
    <section className="w-full py-16 bg-[#1e2125] text-white relative overflow-hidden">
      
      <div className="mb-10 text-start ml-[122px] lg:ml-[250px]">
        <h2 className="text-5xl font-bold font-sansita">Our Values</h2>
        <p className="mt-2 text-lg">What Drives the Arena That Drives You</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="relative w-full max-w-[600px] aspect-square mx-auto flex items-center justify-center">

          {/* STATIC CIRCLE BORDER */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20
              sm:inset-1 sm:w-[90%] sm:h-[90%] sm:mx-auto sm:my-auto"></div>

            {/* CENTER CONTENT */}
            <motion.div
              key={hoveredItem?.id || "empty"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: hoveredItem ? 1 : 0, scale: hoveredItem ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute z-10 flex flex-col items-center justify-center text-center w-[clamp(200px,20%,256px)] h-[clamp(150px,20%,200px)] 
                        bg-[#2a2a2a]/90 rounded-2xl border border-white/20 backdrop-blur-sm p-4 sm:p-6"
            >
              {hoveredItem ? (
                <>
                  <p className="text-lg font-semibold">{hoveredItem.title}</p>
                  <p className="text-sm text-white/70">{hoveredItem.description}</p>
                </>
              ) : (
                <p className="text-white/40 text-sm">Hover over a value</p>
              )}
            </motion.div>

            {/* Hover Cards */}
            <HoverCard pos="absolute top-[-6%] left-1/2 -translate-x-1/2 sm:top-[-24px]" item={items[0]} onHover={setHoverId} />
            <HoverCard pos="absolute top-[20%] left-[-13%] sm:top-[120px] sm:left-[-80px]" item={items[1]} onHover={setHoverId} />
            <HoverCard pos="absolute bottom-[-5%] left-[-10%] sm:bottom-[-20px] sm:left-[-60px]" item={items[3]} onHover={setHoverId} />
            <HoverCard pos="absolute bottom-[-5%] right-[-5%] sm:bottom-[-20px] sm:right-[-30px]" item={items[4]} onHover={setHoverId} />
            <HoverCard pos="absolute top-[20%] right-[-20%] sm:top-[120px] sm:right-[-120px]" item={items[2]} onHover={setHoverId} />
          </div>

      </div>

      {/* Decorative Background Circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, x: -80 }}
        animate={{ opacity: 0.3, scale: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute right-[-120px] bottom-10 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-gradient-to-br from-gray-100/40 via-gray-300/30 to-gray-500/20 blur-2xl"
      />
    </section>
  );
}

const HoverCard = ({ pos, item, onHover }) => (
  <div
    className={`${pos}`}
    onMouseEnter={() => onHover(item.id)}
    onMouseLeave={() => onHover(null)}
  >
    <div className="
      w-28 h-28 sm:w-36 sm:h-36 md:w-56 md:h-56 
      rounded-full bg-[#1f1f1f]/80 shadow-xl 
      flex flex-col items-center justify-center text-center 
      border border-white/10 backdrop-blur-sm 
      transition-all duration-200 
      hover:scale-105 hover:border-white/40 hover:ring-2 hover:ring-white/10
      p-2 sm:p-12 md:p-4
    ">
      <div className="mb-1 sm:mb-2 md:mb-3 text-xl sm:text-2xl md:text-4xl">
        {item.icon}
      </div>
      <p className="text-[10px] sm:text-sm md:text-sm leading-tight">{item.title}</p>
      <p className="text-[10px] sm:text-sm md:text-sm">{item.subtitle}</p>
    </div>
  </div>
);
