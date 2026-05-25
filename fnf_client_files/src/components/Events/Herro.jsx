"use client";
import React from "react";
import heroImg from "../../assets/rightbord.png";
import heroBg from "../../assets/He.jpg";
import Header from "../Play/Header";

export default function Herro() {
  return (
    <section className="relative w-full h-[50vh] overflow-hidden">

      {/* RIGHT SIDE ANGLED IMAGE ABOVE BG AND VISIBLE BEHIND HEADER */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-10">
        <img
          src={__CDN_BASE__+"rightboard.png"}
          alt="Hero Side"  loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* FLOATING SMALL IMAGES (now popup style) */}
       <div className="absolute inset-0 pointer-events-none">

  {/* Image 1 */}
  <div
    className="absolute top-[55%] right-[43%] p-2 bg-[#eaeaea] rounded-xl shadow-md 
               rotate-[12deg] animate-popup1"
    style={{ animationDelay: "0.08s" }}
  >
    <img
      src={__CDN_BASE__+"visit.png"}  loading="lazy"
      className="w-32 h-24 object-cover rounded-lg"
      alt="floating-1"
    />
  </div>

  {/* Image 2 */}
  <div
    className="absolute bottom-[52%] right-[55%] p-3 bg-[#eaeaea] rounded-xl shadow-md 
               rotate-[12deg] animate-popup2"
    style={{ animationDelay: "0.36s" }}
  >
    <img
      src={__CDN_BASE__+"sec332.jpg"}  loading="lazy"
      className="w-40 h-32 object-cover rounded-lg"
      alt="floating-2"
    />
  </div>

  {/* Image 3 */}
  <div
    className="absolute bottom-[45%] right-[22%] p-3 bg-[#eaeaea] rounded-xl shadow-md 
               rotate-[12deg] animate-popup3"
    style={{ animationDelay: "0.62s" }}
  >
    <img
      src={__CDN_BASE__+"bungyjump.jpg"}  loading="lazy"
      className="w-40 h-32 object-cover rounded-lg"
      alt="floating-3"
    />
  </div>

</div>

      </div>

      {/* BACKGROUND + OVERLAY */}
      <div className="absolute inset-0">
        <img src={__CDN_BASE__+"He.jpg"}alt="Hero Background" loading="lazy"  className="w-full h-full object-cover blur-sm" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* HERO TEXT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center">
        <div className="w-full lg:w-1/2">
          <h1 className="text-[60px] font-bold drop-shadow-lg font-josefin leading-tight font-sansitaOne">
            <span className="text-red-500 block">Explore our</span>
            <span className="text-white block">Events</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
