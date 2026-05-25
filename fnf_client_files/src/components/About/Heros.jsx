"use client";
import React from "react";
import heroImg from "../../assets/Ride.png";      // right image
import heroBg from "../../assets/He.jpg";             // bg image
import Header from "../Play/Header";

export default function Heros() {
  return (
    <section className="relative w-full h-[50vh] overflow-hidden">

      {/* RIGHT SIDE ANGLED IMAGE ABOVE BG AND VISIBLE BEHIND HEADER */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-10">
        <img
          src={__CDN_BASE__ + "Ride.png"}
          alt="Hero Side"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* FULL BACKGROUND IMAGE (NO BLUR) */}
      <div className="absolute inset-0">
        <img
          src={__CDN_BASE__ + "He.jpg"}
          alt="Hero Background"
          loading="lazy"
          className="w-full h-full object-cover blur-sm"
        />

        {/* BLACK OVERLAY */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* HEADER NOW ABOVE EVERYTHING & TRANSPARENT */}
      {/* <div className="relative z-20">
        <Header />
      </div> */}

      {/* HERO TEXT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center">
        <div className="w-full lg:w-1/2">
          <h1 className="text-[60px] font-bold drop-shadow-lg font-josefin leading-tight font-sansitaOne">
            <span className="text-red-500 block">The Story </span>
            <span className="text-white block">Behind the Thrill</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
