"use client";
import React from "react";
import heroImg from "../../assets/hero-right.png";
import heroBg from "../../assets/He.jpg";
import Header from "./Header";

export default function Hero() {
  return (
    <section className="relative w-full h-[50vh] overflow-hidden">
     {/* RIGHT SIDE  */}
<div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-10">

  {/* Main hero */}
  <img
    src={__CDN_BASE__+"hero-right.png"}
    alt="Hero Side"  loading="lazy"
    className="w-full h-full object-cover"
  />
</div>

      {/* FULL BACKGROUND IMAGE */}
     <div className="absolute inset-0">
  <img
    src={__CDN_BASE__+"He.jpg"}
    alt="Hero Background"  loading="lazy"
    className="w-full h-full object-cover blur-sm"
  />

  {/* BLACK OVERLAY */}
  <div className="absolute inset-0 bg-black/75" />
</div>

      {/* HERO TEXT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center">
        <div className="w-full lg:w-1/2 ">
        <h1 className="text-[90px] font-bold not-italic drop-shadow-lg font-sansita leading-tight">
  <span className="text-white">Planing a</span><span className="text-red-500"> visit</span>
</h1>


        </div>
      </div>
    </section>
  );
}