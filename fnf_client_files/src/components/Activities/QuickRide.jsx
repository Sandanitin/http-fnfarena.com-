"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGallery } from "../../Context/GalleryContext";
import { useArenaActivities } from "../../Context/ArenaActivitiesContext";

export default function QuickRide() {
  const { getMainImage, loading: galleryLoading } = useGallery();
  const { getSlidesData, loading: activitiesLoading } = useArenaActivities();

  const [allActivities, setAllActivities] = useState([]);
  const [cards, setCards] = useState([]);
  const [order, setOrder] = useState([0, 1, 2]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const cycleInterval = 3000;
  const cardCycleInterval = 4000; // Separate interval for card data cycling

  // Get ALL activities data from API
  useEffect(() => {
    if (!galleryLoading && !activitiesLoading) {
      const slidesData = getSlidesData();

      // Get ALL active activities
      const dynamicCards = slidesData.map((slide, index) => ({
        img: slide.image || `${__CDN_BASE__}rider2.png`,
        title: slide.title || "Activity",
        sub: "Fun Arena",
        desc: slide.text || "Experience the ultimate thrill and excitement!",
        activityTypeId: slide.activityTypeId,
        activityId: slide.activityId,
        id: slide.activityId || index
      }));

      // If no activities from API, use fallback data
      if (dynamicCards.length === 0) {
        const fallbackCards = [
          {
            img: `${__CDN_BASE__}rider2.png`,
            title: "Go Karting",
            sub: "Driving & Karting",
            desc: "Feel the roar, seize the curves, and fight for the podium.",
            id: 'fallback-1'
          },
          {
            img: `${__CDN_BASE__}sec332.jpg`,
            title: "Bumping Cars",
            sub: "Fun Arena",
            desc: "Crash, bump, spin, and enjoy pure madness!",
            id: 'fallback-2'
          },
          {
            img: `${__CDN_BASE__}frnds.jpg`,
            title: "Drifters",
            sub: "Speed Zone",
            desc: "Glide sideways and drift like a pro.",
            id: 'fallback-3'
          },
        ];
        setAllActivities(fallbackCards);
      } else {
        setAllActivities(dynamicCards);
      }
    }
  }, [galleryLoading, activitiesLoading, getSlidesData]);

  // Update displayed cards based on current start index
  useEffect(() => {
    if (allActivities.length > 0) {
      const newCards = [];
      for (let i = 0; i < 3; i++) {
        const activityIndex = (currentStartIndex + i) % allActivities.length;
        newCards.push({
          ...allActivities[activityIndex],
          position: i // Add position to help with animations
        });
      }
      setCards(newCards);
    }
  }, [allActivities, currentStartIndex]);

  // Cycle through activities data for cards
  useEffect(() => {
    if (allActivities.length > 0) {
      const id = setInterval(() => {
        setCurrentStartIndex((prev) => (prev + 1) % allActivities.length);
      }, cardCycleInterval);
      return () => clearInterval(id);
    }
  }, [allActivities.length]);

  // Decorative elements animation (original)
  useEffect(() => {
    if (allActivities.length > 0) {
      const id = setInterval(() => {
        setOrder((prev) => {
          const newOrder = [...prev];
          const first = newOrder.shift();
          newOrder.push(first);
          return newOrder;
        });
      }, cycleInterval);
      return () => clearInterval(id);
    }
  }, [allActivities.length]);

  const slotVariants = {
    top: {
      right: -64,
      top: 20,
      scale: 0.9,
      z: 10,
      opacity: 1,
      rotate: -4,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
    middle: {
      right: 128,
      top: 290,
      scale: 1.15,
      z: 30,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
    bottom: {
      right: -144,
      top: 720,
      scale: 0.85,
      z: 5,
      opacity: 0.95,
      rotate: 6,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  const decorative = [
    `${__CDN_BASE__}Circle2.png`,
    `${__CDN_BASE__}Circle.png`,
    `${__CDN_BASE__}Circle3.png`,
  ];

  // Show loading state
  if (galleryLoading || activitiesLoading) {
    return (
      <section className="relative w-full bg-[#C7161E] py-16 md:py-24 overflow-hidden">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-white text-xl">Loading activities...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-[#C7161E] py-16 md:py-24 overflow-hidden">
      {/* Top Checker */}
      <div
        className="absolute left-0 right-0 top-2 h-6 pointer-events-none"
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
          linear-gradient(180deg,#b92a2a,#d94b4b)
        `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          backgroundRepeat: "repeat",
          transform: "translateY(-8px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
        }}
        aria-hidden="true"
      />

      {/* Right Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-6 h-[260px] w-[52%] hidden md:block"
          style={{
            backgroundImage: `url(${__CDN_BASE__}Gradient%20(5).png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: 0.9,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Header */}
      <header className="w-full relative px-6 md:px-12">
        <div className="">
          {/* LEFT CONTENT */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 w-full">
            <div className="w-full lg:w-1/2">
              <div className="border-t-[6px] border-l-[6px] border-white rounded-xl inline-block mb-6 font-sansita">
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight">
                  Quick Ride <br />
                  <span className="text-black block">Highlights</span>
                </h1>
              </div>
            </div>

            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <p className="text-white leading-relaxed text-sm sm:text-base md:text-lg">
                Slide through dynamic snapshots from every <br/>
                division — Karting,
                Games, Kids Zone, and more.
                <br />
                <br />
                Each card gives you a fast glance at the action, excitement,<br/>
                and vibe of the ride. Find exactly what matches your mood and <br/>
                jump straight into the fun.
              </p>
            </div>
          </div>

          {/* RIGHT DECORATIVE SECTION */}
          <div className="relative hidden lg:flex justify-start items-start ">
            {/* Background ellipse */}
            <img
              src={__CDN_BASE__ + "Ellipse%201909.png"}
              alt="decorative ellipse background"
              loading="lazy"
              className="absolute right-[-120px] xl:right-[-180px] top-6 w-[280px] xl:w-[420px] opacity-95 pointer-events-none select-none"
            />

            {/* Top small image */}
            <motion.img
              key={decorative[order[0]]}
              src={decorative[order[0]]}
              alt="decorative element top"
              loading="lazy"
              className="absolute w-10 h-10 xl:w-14 xl:h-14 object-contain rounded-full shadow-lg"
              initial={false}
              animate={slotVariants.top}
            />

            {/* Middle large image */}
            <motion.img
              key={decorative[order[1]]}
              src={decorative[order[1]]}
              alt="decorative element middle"
              loading="lazy"
              className="absolute w-28 h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 object-contain rounded-full shadow-2xl"
              initial={false}
              animate={slotVariants.middle}
            />

            {/* Bottom small image */}
            <motion.img
              key={decorative[order[2]]}
              src={decorative[order[2]]}
              alt="decorative element bottom"
              loading="lazy"
              className="absolute w-10 h-10 xl:w-14 xl:h-14 object-contain rounded-full shadow-lg"
              initial={false}
              animate={slotVariants.bottom}
            />
          </div>
        </div>

        {/* Cards - Original Layout with Data Cycling */}
        <main className="mt-12 flex flex-col md:flex-row flex-wrap items-start justify-center md:justify-start gap-6 md:gap-8">
          {cards.map((card, idx) => (
            <motion.article
              key={`card-${idx}`}
              className="relative w-full max-w-[280px] h-[346px] rounded-xl overflow-hidden shadow-lg transform transition-all hover:-translate-y-2 focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-[#C7161E]"
              tabIndex="0"
              role="button"
              aria-label={`${card.title} - ${card.desc}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <motion.img
                key={`img-${card.id}-${currentStartIndex}`}
                src={card.img}
                alt={`${card.title} activity showcase`}
                loading="lazy"
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8b0f14]/70 via-[#c7161e]/40 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.04)_0%,transparent_30%)] rounded-xl" />

              <motion.div
                key={`content-${card.id}-${currentStartIndex}`}
                className="absolute bottom-4 left-4 text-white z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-semibold text-lg md:text-xl">{card.title}</h3>
                <p className="text-sm opacity-80">{card.sub}</p>
                <p className="text-[12px] md:text-[13px] mt-1 opacity-90 max-w-[200px]">
                  {card.desc}
                </p>
              </motion.div>
            </motion.article>
          ))}
        </main>
      </header>

      {/* Bottom Checker */}
      <div
        className="absolute left-0 right-0 bottom-[-100px] h-6 pointer-events-none"
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
          linear-gradient(180deg,#b92a2a,#d94b4b)
        `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          backgroundRepeat: "repeat",
          transform: "translateY(-8px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
