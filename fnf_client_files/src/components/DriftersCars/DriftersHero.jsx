"use client";
import React from "react";
import heroBg from "../../assets/He.jpg";

// Image object for drifters and cars
const driftersHeroImages = {
  main: {
    heroBackground: heroBg,
    driftersHero: "https://cdn.acsdev.in/FNF/698d71d0d00d9.jpg",
    bumpingCars: "https://cdn.acsdev.in/FNF/698d71d0d00d9.jpg"
  },
  floating: {
    car1: "https://cdn.acsdev.in/FNF/698d71d0d00d9.jpg",
    car2: "https://cdn.acsdev.in/FNF/69e9cb37e4b3a.jpg",
    car3: "https://cdn.acsdev.in/FNF/69e9cb37e4b3a.jpg",
    car4: "https://cdn.acsdev.in/FNF/69e9cb39a4683.jpg"
  }
};

export default function DriftersHero({
  activity,
  media,
  mainImage,
  landingImage,
  galleryImages
}) {
  const delays = ["0s", "0.9s", "1.8s", "2.7s", "3.6s", "4.5s", "5.4s"];

  // Use API data or fallback to default images
  const heroBackground = landingImage || driftersHeroImages.main.heroBackground;
  const floatingImages = galleryImages && galleryImages.length > 0
    ? galleryImages.slice(0, 4)
    : [
        driftersHeroImages.floating.car1,
        driftersHeroImages.floating.car2,
        driftersHeroImages.floating.car3,
        driftersHeroImages.floating.car4
      ];

  // Ensure we have at least 4 images for the floating effect
  const paddedImages = [...floatingImages];
  while (paddedImages.length < 4) {
    paddedImages.push(paddedImages[0] || mainImage || driftersHeroImages.floating.car1);
  }

  return (
    <section className="relative w-full h-[50vh] overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Drifters and racing cars hero background"
          loading="lazy"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-red-800/80" />

        {/* Racing Track Lines Background */}
        <div className="absolute inset-0 opacity-15">
          <div className="h-full w-full" style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 48px,
                rgba(255,255,255,0.4) 48px,
                rgba(255,255,255,0.4) 52px,
                transparent 52px,
                transparent 96px
              )
            `
          }} />
        </div>

        {/* Car Silhouettes */}
        <div className="absolute inset-0 pointer-events-none opacity-8 hidden sm:block">
          <div className="absolute top-10 left-10 text-white text-6xl transform rotate-12">🏎️</div>
          <div className="absolute top-32 left-32 text-red-300 text-4xl transform -rotate-6">🚗</div>
          <div className="absolute bottom-20 left-20 text-red-400 text-5xl transform rotate-45">🏁</div>
          <div className="absolute top-20 right-96 text-white text-3xl transform -rotate-12">⚡</div>
          <div className="absolute bottom-32 right-80 text-red-300 text-4xl transform rotate-30">🎯</div>
        </div>

        {/* Speed Lines Pattern */}
        <div className="absolute top-1/4 left-1/4 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-red-400/30">
            <defs>
              <pattern id="speedLines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#speedLines)"/>
          </svg>
        </div>
      </div>

      {/* FLOATING IMAGES - Multiple depth stages with enhanced layers */}
      <div className="absolute inset-0 pointer-events-none z-[18] hidden sm:block">

        {/* DEEP BACKGROUND LAYER - Heavily blurred, smallest */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute top-[5%] right-[3%] w-12 h-9 rounded-lg popup-seq float-loop bg-white/20 backdrop-blur-sm p-1 rotate-[-25deg] blur-xl shadow-lg"
            style={{ animationDelay: "0.1s" }}
          >
            <img
              src={paddedImages[0]}
              alt="Deep background car image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
            />
          </div>

          <div
            className="absolute top-[30%] right-[45%] w-14 h-10 rounded-lg popup-seq float-loop bg-white/20 backdrop-blur-sm p-1 rotate-[30deg] blur-xl shadow-lg"
            style={{ animationDelay: "1.2s" }}
          >
            <img
              src={paddedImages[1]}
              alt="Deep background car image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
            />
          </div>

          <div
            className="absolute top-[75%] right-[6%] w-13 h-10 rounded-lg popup-seq float-loop bg-white/20 backdrop-blur-sm p-1 rotate-[-15deg] blur-xl shadow-lg"
            style={{ animationDelay: "2.5s" }}
          >
            <img
              src={paddedImages[2]}
              alt="Deep background car image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
            />
          </div>

          <div
            className="absolute top-[60%] right-[42%] w-16 h-12 rounded-lg popup-seq float-loop bg-white/20 backdrop-blur-sm p-1 rotate-[20deg] blur-xl shadow-lg"
            style={{ animationDelay: "3.8s" }}
          >
            <img
              src={paddedImages[3]}
              alt="Deep background car image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
            />
          </div>
        </div>

        {/* BACKGROUND LAYER - Heavy blur, small */}
        <div className="absolute inset-0 opacity-25">
          <div
            className="absolute top-[12%] right-[8%] w-18 h-14 rounded-lg popup-seq float-loop bg-white/30 backdrop-blur-sm p-1 rotate-[-20deg] blur-lg shadow-lg"
            style={{ animationDelay: "0.3s" }}
          >
            <img
              src={paddedImages[0]}
              alt="Background depth car image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
            />
          </div>

          <div
            className="absolute top-[40%] right-[38%] w-22 h-16 rounded-lg popup-seq float-loop bg-white/30 backdrop-blur-sm p-1 rotate-[25deg] blur-lg shadow-lg"
            style={{ animationDelay: "1.6s" }}
          >
            <img
              src={paddedImages[1]}
              alt="Background depth car image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
            />
          </div>

          <div
            className="absolute top-[68%] right-[10%] w-20 h-15 rounded-lg popup-seq float-loop bg-white/30 backdrop-blur-sm p-1 rotate-[-12deg] blur-lg shadow-lg"
            style={{ animationDelay: "2.9s" }}
          >
            <img
              src={paddedImages[2]}
              alt="Background depth car image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
            />
          </div>
        </div>

        {/* MID-BACKGROUND LAYER - Medium blur, small-medium size */}
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute top-[20%] right-[30%] w-22 h-16 rounded-lg popup-seq float-loop bg-white/40 backdrop-blur-sm p-2 rotate-[15deg] blur-md shadow-lg"
            style={{ animationDelay: "0.7s" }}
          >
            <img
              src={paddedImages[1]}
              alt="Mid-depth floating car image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
            />
          </div>

          <div
            className="absolute top-[52%] right-[33%] w-24 h-18 rounded-lg popup-seq float-loop bg-white/40 backdrop-blur-sm p-2 rotate-[-18deg] blur-md shadow-lg"
            style={{ animationDelay: "2.4s" }}
          >
            <img
              src={paddedImages[3]}
              alt="Mid-depth floating car image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
            />
          </div>
        </div>

        {/* MID-FOREGROUND LAYER - Light blur, medium size */}
        <div className="absolute inset-0 opacity-65">
          <div
            className="absolute top-[28%] right-[17%] w-26 h-20 rounded-xl popup-seq float-loop bg-white/50 backdrop-blur-sm p-2 rotate-[-10deg] blur-sm shadow-xl"
            style={{ animationDelay: delays[1] }}
          >
            <img
              src={paddedImages[0]}
              alt="Mid-foreground floating car image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          <div
            className="absolute top-[45%] right-[24%] w-28 h-22 rounded-xl popup-seq float-loop bg-white/50 backdrop-blur-sm p-2 rotate-[6deg] blur-sm shadow-xl"
            style={{ animationDelay: delays[3] }}
          >
            <img
              src={paddedImages[2]}
              alt="Mid-foreground floating car image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        </div>

        {/* FOREGROUND LAYER - No blur, normal size - 4+ images in aesthetic arrangement */}
        <div className="absolute inset-0">
          {/* Top arc arrangement */}
          <div
            className="absolute top-[5%] right-[10%] w-32 h-24 rounded-xl popup-seq float-loop bg-white/70 backdrop-blur-sm p-3 rotate-[-22deg] shadow-2xl border border-white/30"
            style={{ animationDelay: delays[0] }}
          >
            <img
              src={paddedImages[0]}
              alt="Foreground floating car image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          <div
            className="absolute top-[8%] right-[26%] w-28 h-20 rounded-xl popup-seq float-loop bg-white/70 backdrop-blur-sm p-3 rotate-[18deg] shadow-2xl border border-white/30"
            style={{ animationDelay: delays[1] }}
          >
            <img
              src={paddedImages[1]}
              alt="Foreground floating car image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          {/* Middle section */}
          <div
            className="absolute top-[35%] right-[14%] w-32 h-24 rounded-xl popup-seq float-loop bg-white/70 backdrop-blur-sm p-3 rotate-[-8deg] shadow-2xl border border-white/30"
            style={{ animationDelay: delays[2] }}
          >
            <img
              src={paddedImages[2]}
              alt="Foreground floating car image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          <div
            className="absolute top-[38%] right-[32%] w-28 h-20 rounded-xl popup-seq float-loop bg-white/70 backdrop-blur-sm p-2 rotate-[12deg] shadow-2xl border border-white/30"
            style={{ animationDelay: delays[3] }}
          >
            <img
              src={paddedImages[3]}
              alt="Foreground floating car image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          {/* Bottom section */}
          <div
            className="absolute top-[65%] right-[12%] w-32 h-24 rounded-xl popup-seq float-loop bg-white/70 backdrop-blur-sm p-3 rotate-[-15deg] shadow-2xl border border-white/30"
            style={{ animationDelay: delays[4] }}
          >
            <img
              src={paddedImages[0]}
              alt="Foreground floating car image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          <div
            className="absolute top-[68%] right-[28%] w-28 h-20 rounded-xl popup-seq float-loop bg-white/70 backdrop-blur-sm p-3 rotate-[8deg] shadow-2xl border border-white/30"
            style={{ animationDelay: delays[5] }}
          >
            <img
              src={paddedImages[1]}
              alt="Foreground floating car image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        </div>

      </div>

      {/* ROTATED TEXT */}
      <div
        className="hidden lg:block absolute right-[-160px] top-[180px] pointer-events-none z-[15]"
        style={{
          transform: "rotate(90deg)",
          fontSize: "7rem",
          opacity: 0.28,
          WebkitTextStroke: "2px rgba(255, 255, 255, 0.9)",
          color: "transparent",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-1px",
        }}
        aria-hidden="true"
      >
        DRIFT !!!
      </div>

      {/* HERO TEXT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center">
        <div className="w-full lg:w-1/2">
          <h1 className="text-[60px] text-white font-bold drop-shadow-lg font-josefin leading-tight font-sansitaOne">
            <span className="text-red-500 block">
              {'Drifters:'}
            </span>
            {'Speed and thrills'}
            {/* <span className="text-white block">Outdoor Racing</span> */}
          </h1>
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-6" aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%),
            linear-gradient(45deg,rgba(255,255,255) 25%,transparent 25%,transparent 75%,rgba(255,255,255) 75%),
            linear-gradient(180deg,#b92a2a,#d94b4b)
          `,
          backgroundSize: "28px 28px,28px 28px,auto",
          backgroundPosition: "0 0,14px 14px,0 0",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(0,0,0,.6)"
        }}
      />
    </section>
  );
}
