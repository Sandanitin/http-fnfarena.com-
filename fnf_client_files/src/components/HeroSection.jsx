import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PartyPopper } from "lucide-react";
import Header from "./Header";
import { useGallery } from "../Context/GalleryContext";

export default function HeroSection({ homeStats, homeLoading, homeError, IMGUrl }) {
  // Router
  const navigate = useNavigate();
  const { getHeroImages, loading: galleryLoading } = useGallery();

  // Get images from activity data
  const images = getHeroImages();
  const [index, setIndex] = useState(0);
  const len = images.length;

  const next = (i) => (i + 1) % len;
  const nextNext = (i) => (i + 2) % len;

  useEffect(() => {
    if (len > 0) {
      const timer = setInterval(() => setIndex((i) => (i + 1) % len), 3000);
      return () => clearInterval(timer);
    }
  }, [len]);

  // Counter component (unchanged behaviour)
  function Counter({ to = 0, duration = 1500, suffix = "", start = true }) {
    const [value, setValue] = useState(0);
    const rafRef = useRef(null);

    useEffect(() => {
      if (!start) {
        setValue(0);
        return;
      }

      let startTime = null;
      const from = 0;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(progress * (to - from) + from);
        setValue(current);
        if (progress < 1) rafRef.current = requestAnimationFrame(animate);
        else setValue(to);
      };

      rafRef.current = requestAnimationFrame(animate);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [to, duration, start]);

    return (
      <span>
        {value}
        {suffix}
      </span>
    );
  }

  // IntersectionObserver to trigger when stats come into view
  const statsRef = useRef(null);
  const [countersStart, setCountersStart] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const el = statsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCountersStart(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Navigation helpers
  const go = (path) => {
    navigate(path);
  };

  return (
    <div className="relative bg-gray-900 text-white font-sans h-[80vh] overflow-visible">
      {/* Single background layer */}
      {homeLoading || !homeStats ? null : (
        <>
      <div
        className="absolute inset-0 z-0"
        style={{
        backgroundImage: `url(${IMGUrl}/${homeStats.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
          backgroundRepeat: "no-repeat",
        }}
      />

      <img
        src={`${__CDN_BASE__}heroo.png`}
        alt="hero"
        loading="lazy"
        className="absolute left-34 top-0 h-full z-10 object-cover"
      />

      <main className="relative z-10 py-5">
        <div className="max-w-7xl mx-auto px-0 py-12 lg:py-10 flex flex-col lg:flex-row items-center gap-8">
          {/* LEFT TEXT */}
          <div className="w-full lg:w-7/12 p-1">
            <h1 className="font-bold !leading-tight tracking-tight font-josefin text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-[65px]">
               {/* {homeStats.title} */}
               <span className="">Hyderabad’s <br/>Go-Karting, Gaming </span><br/> <span className="text-red-500">& Adventure Arena</span>
            </h1>

            <p className="mt-6 text-gray-300 max-w-xl text-center">
              Buckle in. Leap high. Strike sharp. At FNF Arena, every visit is a journey — from
              karting heat to <br />
              sky-high thrills, from laser battles to quiet laughs in the arcade. We are
              where memories are made and limits are challenged.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => go('/all-activities')} className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-md py-2 px-12 rounded shadow">  EXPLORE  <br/> ACTIVITIES</button>
              <button onClick={() => go('/plan')} className="border border-white text-gray-200 py-3 px-5 text-xs md:text-md rounded-full hover:bg-gray-800 flex items-center gap-2 cursor-pointer underline">
                <PartyPopper className="w-5 h-5" />
                Plan An Event
              </button>
            </div>
          </div>

          {/* RIGHT: Slanted Image Cards - Now showing 3 images */}
          <div className="w-full lg:w-5/12 relative flex justify-end">
            <div className="hidden lg:block absolute right-[-380px] top-[150px] select-none pointer-events-none" style={{ transform: "rotate(90deg)", fontSize: "8rem", opacity: 0.22, WebkitTextStroke: "1px rgba(255, 255, 255, 1)", color: "transparent", fontWeight: 800 }}>
              KARTING
            </div>

            <div className="hidden lg:block relative w-[600px] h-[450px]">
              {/* First image (left) */}
              <div
                className="absolute opacity-100 animate-fade"
                style={{
                  right: 420,
                  top: 70,
                  width: 200,
                  height: 350,
                  transform: "rotate(-4deg)",
                  backgroundImage: `url('${images[index] || "https://cdn.acsdev.in/FNF/hero1.png"}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 30
                }}
              />

              {/* Second image (middle) */}
              <div
                className="absolute opacity-100 animate-fade"
                style={{
                  right: 210,
                  top: 40,
                  width: 200,
                  height: 350,
                  transform: "rotate(2deg)",
                  backgroundImage: `url('${images[next(index)] || "https://cdn.acsdev.in/FNF/hero1-2.png"}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 20
                }}
              />

              {/* Third image (right) */}
              <div
                className="absolute opacity-100 animate-fade"
                style={{
                  right: 0,
                  top: 10,
                  width: 200,
                  height: 350,
                  transform: "rotate(6deg)",
                  backgroundImage: `url('${images[nextNext(index)] || "https://cdn.acsdev.in/FNF/hero2-1.png"}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 10
                }}
              />
            </div>

            <div className="lg:hidden flex gap-2 justify-center">
              <div className="w-24 h-16 bg-cover bg-center rounded shadow" style={{ backgroundImage: `url('${images[index] || "https://cdn.acsdev.in/FNF/hero1.png"}')` }} />
              <div className="w-24 h-16 bg-cover bg-center rounded shadow" style={{ backgroundImage: `url('${images[next(index)] || "https://cdn.acsdev.in/FNF/hero1-2.png"}')` }} />
              <div className="w-24 h-16 bg-cover bg-center rounded shadow" style={{ backgroundImage: `url('${images[nextNext(index)] || "https://cdn.acsdev.in/FNF/hero2-1.png"}')` }} />
            </div>
          </div>
        </div>

        {/* Stats */}
        {/* <section className="max-w-5xl pb-3 mx-auto px-4 sm:px-6 relative z-[60]">
          <div className="relative bg-[#9c9d9f] backdrop-blur-sm px-4 sm:px-8 md:px-12 py-3 rounded-xl shadow-2xl">
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 sm:-top-4 z-[70]">
              <div className="bg-red-600 text-white px-4 sm:px-6 py-1 rounded-full text-xs sm:text-sm shadow-lg text-center">
                Weekly spotlight on a top game or ride
              </div>
            </div>

            <div ref={statsRef} className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl py-2 px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 mt-4">
              <div className="flex-1 text-center md:text-left">
                <div className="font-semibold text-gray-800 leading-none" style={{ fontFamily: "Oxanium, sans-serif" }}>
                  <span className="text-4xl sm:text-5xl lg:text-[42px]">
                    <Counter
  to={Number(homeStats.metrics1)}
  suffix={homeStats.metrics1_suffix}
  duration={1200}
  start={countersStart}
/>
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">attractions</div>
              </div>

              <div className="border-l border-gray-200 h-10 hidden md:block" />

              <div className="flex-1 text-center">
                <div className="font-semibold text-gray-800 leading-none" style={{ fontFamily: "Oxanium, sans-serif" }}>
                  <span className="text-4xl sm:text-5xl lg:text-[42px]">
                   <Counter
  to={Number(homeStats.metrics2)}
  suffix={homeStats.metrics2_suffix}
  duration={1200}
  start={countersStart}
/>
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">event zones</div>
              </div>

              <div className="border-l border-gray-200 h-10 hidden md:block" />

              <div className="flex-1 text-center md:text-right">
                <div className="font-semibold text-gray-800 leading-none" style={{ fontFamily: "Oxanium, sans-serif" }}>
                  <span className="text-4xl sm:text-5xl lg:text-[42px]">
                   <Counter
  to={Number(homeStats.metrics3)}
  suffix={homeStats.metrics3_suffix}
  duration={1400}
  start={countersStart}
/>
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">safety monitored</div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      </>
    )}
    </div>
  );
}
