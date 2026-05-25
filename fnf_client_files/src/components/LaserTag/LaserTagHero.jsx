"use client";
import React from "react";
import heroBg from "../../assets/He.jpg";

// Image object for laser tag themed images
const laserTagHeroImages = {
  main: {
    heroBackground: heroBg,
    laserTagHero: "https://cdn.acsdev.in/FNF/69cfccec43789.jpg",
    laserTagAction: "https://cdn.acsdev.in/FNF/6995f8bdb6611.png"
  },
  floating: {
    laserTag1: "https://cdn.acsdev.in/FNF/69cfccead4bc6.jpg",
    laserTag2: "https://cdn.acsdev.in/FNF/69cfccec43789.jpg",
    laserTag3: "https://cdn.acsdev.in/FNF/6995f8bdb6611.png",
    laserTag4: "https://cdn.acsdev.in/FNF/69cfccead4bc6.jpg"
  }
};

export default function LaserTagHero({
  loading,
  activity,
  media,
  mainImage,
  landingImage,
  galleryImages
}) {
  const delays = ["0s", "0.9s", "1.8s", "2.7s", "3.6s", "4.5s", "5.4s"];

  // Use API data or fallback to default images
  const heroBackground = landingImage || laserTagHeroImages.main.heroBackground;

  const heroTitle = activity?.name || "Laser Tag";
  const heroDescription = activity?.description || "Aim & Fire";

  // Use API gallery images or fallback to default images
  const floatingImages = galleryImages && galleryImages.length > 0
    ? galleryImages.slice(0, 4)
    : Object.values(laserTagHeroImages.floating);

  // Ensure we have at least 4 images for the floating effect
  const paddedImages = [...floatingImages];
  while (paddedImages.length < 4) {
    paddedImages.push(paddedImages[0] || mainImage || Object.values(laserTagHeroImages.floating)[0]);
  }

  return (
    <section className="relative w-full h-[50vh] overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt={heroTitle}
          loading="lazy"
          className="w-full h-full object-cover blur-sm"
          onError={(e) => {
            e.target.src = laserTagHeroImages.main.heroBackground;
          }}
        />
        <div className="absolute inset-0 bg-black/80" />

        {/* Laser Grid Lines Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 48px,
                rgba(255,0,0,0.3) 48px,
                rgba(255,0,0,0.3) 50px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 48px,
                rgba(0,100,255,0.3) 48px,
                rgba(0,100,255,0.3) 50px
              )
            `
          }} />
        </div>

        {/* Laser Tag Elements Silhouettes */}
        <div className="absolute inset-0 pointer-events-none opacity-5 hidden sm:block">
          <div className="absolute top-10 left-10 text-red-500 text-6xl transform rotate-12">🎯</div>
          <div className="absolute top-32 left-32 text-blue-500 text-4xl transform -rotate-6">⚡</div>
          <div className="absolute bottom-20 left-20 text-red-500 text-5xl transform rotate-45">🎯</div>
          <div className="absolute top-20 right-96 text-blue-500 text-3xl transform -rotate-12">⚡</div>
          <div className="absolute bottom-32 right-80 text-red-500 text-4xl transform rotate-30">🎯</div>
        </div>

        {/* Target Crosshair Pattern */}
        <div className="absolute top-1/4 left-1/4 opacity-8">
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-red-500/20">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10,5"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
            <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="1"/>
            <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="1"/>
            <text x="100" y="110" textAnchor="middle" className="text-2xl font-bold fill-current">TARGET</text>
          </svg>
        </div>
      </div>

      {/* FLOATING IMAGES - Multiple depth stages with enhanced layers */}
      <div className="absolute inset-0 pointer-events-none z-[18] scale-[0.85] origin-right hidden sm:block">

        {/* DEEP BACKGROUND LAYER - Heavily blurred, smallest */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute top-[5%] right-[3%] w-12 h-9 rounded-lg popup-seq float-loop bg-white/20 backdrop-blur-sm p-1 rotate-[-25deg] blur-xl shadow-lg"
            style={{ animationDelay: "0.1s" }}
          >
            <img
              src={paddedImages[0]}
              alt="Deep background laser tag image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag1;
              }}
            />
          </div>

          <div
            className="absolute top-[30%] right-[45%] w-14 h-10 rounded-lg popup-seq float-loop bg-white/20 backdrop-blur-sm p-1 rotate-[30deg] blur-xl shadow-lg"
            style={{ animationDelay: "1.2s" }}
          >
            <img
              src={paddedImages[1]}
              alt="Deep background laser tag image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag2;
              }}
            />
          </div>

          <div
            className="absolute top-[75%] right-[6%] w-13 h-10 rounded-lg popup-seq float-loop bg-white/20 backdrop-blur-sm p-1 rotate-[-15deg] blur-xl shadow-lg"
            style={{ animationDelay: "2.5s" }}
          >
            <img
              src={paddedImages[2]}
              alt="Deep background laser tag image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag3;
              }}
            />
          </div>

          <div
            className="absolute top-[60%] right-[42%] w-16 h-12 rounded-lg popup-seq float-loop bg-white/20 backdrop-blur-sm p-1 rotate-[20deg] blur-xl shadow-lg"
            style={{ animationDelay: "3.8s" }}
          >
            <img
              src={paddedImages[3]}
              alt="Deep background laser tag image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag4;
              }}
            />
          </div>
        </div>

        {/* BACKGROUND LAYER - Heavy blur, small */}
        <div className="absolute inset-0 opacity-25 scale-[0.85] origin-right">
          <div
            className="absolute top-[12%] right-[8%] w-18 h-14 rounded-lg popup-seq float-loop bg-white/30 backdrop-blur-sm p-1 rotate-[-20deg] blur-lg shadow-lg"
            style={{ animationDelay: "0.3s" }}
          >
            <img
              src={paddedImages[0]}
              alt="Background depth laser tag image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag1;
              }}
            />
          </div>

          <div
            className="absolute top-[40%] right-[38%] w-22 h-16 rounded-lg popup-seq float-loop bg-white/30 backdrop-blur-sm p-1 rotate-[25deg] blur-lg shadow-lg"
            style={{ animationDelay: "1.6s" }}
          >
            <img
              src={paddedImages[1]}
              alt="Background depth laser tag image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag2;
              }}
            />
          </div>

          <div
            className="absolute top-[68%] right-[10%] w-20 h-15 rounded-lg popup-seq float-loop bg-white/30 backdrop-blur-sm p-1 rotate-[-12deg] blur-lg shadow-lg"
            style={{ animationDelay: "2.9s" }}
          >
            <img
              src={paddedImages[2]}
              alt="Background depth laser tag image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag3;
              }}
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
              alt="Mid-depth floating laser tag image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag2;
              }}
            />
          </div>

          <div
            className="absolute top-[52%] right-[33%] w-24 h-18 rounded-lg popup-seq float-loop bg-white/40 backdrop-blur-sm p-2 rotate-[-18deg] blur-md shadow-lg"
            style={{ animationDelay: "2.4s" }}
          >
            <img
              src={paddedImages[3]}
              alt="Mid-depth floating laser tag image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag4;
              }}
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
              alt="Mid-foreground floating laser tag image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag1;
              }}
            />
          </div>

          <div
            className="absolute top-[45%] right-[24%] w-28 h-22 rounded-xl popup-seq float-loop bg-white/50 backdrop-blur-sm p-2 rotate-[6deg] blur-sm shadow-xl"
            style={{ animationDelay: delays[3] }}
          >
            <img
              src={paddedImages[2]}
              alt="Mid-foreground floating laser tag image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag3;
              }}
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
              alt="Foreground floating laser tag image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag1;
              }}
            />
          </div>

          <div
            className="absolute top-[8%] right-[26%] w-28 h-20 rounded-xl popup-seq float-loop bg-white/70 backdrop-blur-sm p-3 rotate-[18deg] shadow-2xl border border-white/30"
            style={{ animationDelay: delays[1] }}
          >
            <img
              src={paddedImages[1]}
              alt="Foreground floating laser tag image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag2;
              }}
            />
          </div>

          {/* Middle section */}
          <div
            className="absolute top-[35%] right-[14%] w-32 h-24 rounded-xl popup-seq float-loop bg-white/70 backdrop-blur-sm p-3 rotate-[-8deg] shadow-2xl border border-white/30"
            style={{ animationDelay: delays[2] }}
          >
            <img
              src={paddedImages[2]}
              alt="Foreground floating laser tag image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag3;
              }}
            />
          </div>

          <div
            className="absolute top-[38%] right-[32%] w-28 h-20 rounded-xl popup-seq float-loop bg-white/70 backdrop-blur-sm p-2 rotate-[12deg] shadow-2xl border border-white/30"
            style={{ animationDelay: delays[3] }}
          >
            <img
              src={paddedImages[3]}
              alt="Foreground floating laser tag image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag4;
              }}
            />
          </div>

          {/* Bottom section */}
          <div
            className="absolute top-[65%] right-[12%] w-32 h-24 rounded-xl popup-seq float-loop bg-white/70 backdrop-blur-sm p-3 rotate-[-15deg] shadow-2xl border border-white/30"
            style={{ animationDelay: delays[4] }}
          >
            <img
              src={paddedImages[0]}
              alt="Foreground floating laser tag image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag1;
              }}
            />
          </div>

          <div
            className="absolute top-[68%] right-[28%] w-28 h-20 rounded-xl popup-seq float-loop bg-white/70 backdrop-blur-sm p-3 rotate-[8deg] shadow-2xl border border-white/30"
            style={{ animationDelay: delays[5] }}
          >
            <img
              src={paddedImages[1]}
              alt="Foreground floating laser tag image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = laserTagHeroImages.floating.laserTag2;
              }}
            />
          </div>
        </div>

      </div>

      {/* ROTATED TEXT */}
      <div
        className="hidden lg:block absolute right-[-180px] top-[180px] pointer-events-none z-[15]"
        style={{
          transform: "rotate(90deg)",
          fontSize: "6rem",
          opacity: 0.28,
          WebkitTextStroke: "1px rgba(255, 255, 255, 0.9)",
          color: "transparent",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-6px",
        }}
        aria-hidden="true"
      >
        TARGET !!!
      </div>

      {/* HERO TEXT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center">
        <div className="w-full lg:w-1/2">
          <h1 className="text-[60px] font-bold drop-shadow-lg font-josefin leading-tight font-sansitaOne">
           <span className="text-red-500 block">{heroTitle}</span>
           <span className="text-white block">{heroDescription}</span>
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
