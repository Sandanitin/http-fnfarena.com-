"use client";
import React from "react";
import heroBg from "../../assets/He.jpg";
import Header from "../Play/Header";
import Rider from "../../assets/ridder.png";
import { useGallery } from "../../Context/GalleryContext";

export default function Herro() {
  const { getAllGalleryImages, loading } = useGallery();
  const galleryImages = getAllGalleryImages();

  const delays = ["0s", "0.9s", "1.8s", "2.7s", "3.6s", "4.5s", "5.4s"];

  // Fallback images in case gallery is empty or loading
  const fallbackImages = [
    "https://cdn.acsdev.in/FNF/visit.png",
    `${__CDN_BASE__}sec332.jpg`,
    `${__CDN_BASE__}ridder.png`,
    `${__CDN_BASE__}about2.png`,
    "https://cdn.acsdev.in/FNF/visit.png",
    "https://cdn.acsdev.in/FNF/sec332.jpg"
  ];

  // Use gallery images if available, otherwise use fallback
  const imagesToUse = galleryImages.length > 0 ? galleryImages : fallbackImages;

  // Function to get image by index with cycling
  const getImage = (index) => {
    if (imagesToUse.length === 0) return fallbackImages[0];
    return imagesToUse[index % imagesToUse.length];
  };

  return (
    <section className="relative w-full h-[50vh] overflow-hidden">

      {/* RIGHT SIDE IMAGE */}
      <div className="absolute top-0 left-32 h-full w-full z-10 pointer-events-none">
        <img
          src="https://cdn.acsdev.in/FNF/heroo.png"
          alt="Hero character illustration"
          loading="lazy"
          className="absolute top-0 left-[-40px] w-[40%] h-full object-cover z-10"
        />
      </div>

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Hero background"
          loading="lazy"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* FLOATING IMAGES - Multiple depth stages with enhanced layers */}
      <div className="absolute inset-0 pointer-events-none z-[18]">

        {/* DEEP BACKGROUND LAYER - Heavily blurred, smallest */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute top-[5%] right-[3%] w-12 h-9 rounded-lg popup-seq float-loop bg-gray-300 p-1 rotate-[-25deg] blur-xl"
            style={{ animationDelay: "0.1s" }}
          >
            <img
              src={getImage(0)}
              alt="Deep background image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[0];
              }}
            />
          </div>

          <div
            className="absolute top-[30%] right-[45%] w-14 h-10 rounded-lg popup-seq float-loop bg-gray-300 p-1 rotate-[30deg] blur-xl"
            style={{ animationDelay: "1.2s" }}
          >
            <img
              src={getImage(1)}
              alt="Deep background image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[1];
              }}
            />
          </div>

          <div
            className="absolute top-[75%] right-[6%] w-13 h-10 rounded-lg popup-seq float-loop bg-gray-300 p-1 rotate-[-15deg] blur-xl"
            style={{ animationDelay: "2.5s" }}
          >
            <img
              src={getImage(2)}
              alt="Deep background image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[2];
              }}
            />
          </div>

          <div
            className="absolute top-[60%] right-[42%] w-16 h-12 rounded-lg popup-seq float-loop bg-gray-300 p-1 rotate-[20deg] blur-xl"
            style={{ animationDelay: "3.8s" }}
          >
            <img
              src={getImage(3)}
              alt="Deep background image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[3];
              }}
            />
          </div>
        </div>

        {/* BACKGROUND LAYER - Heavy blur, small */}
        <div className="absolute inset-0 opacity-25">
          <div
            className="absolute top-[12%] right-[8%] w-18 h-14 rounded-lg popup-seq float-loop bg-gray-300 p-1 rotate-[-20deg] blur-lg"
            style={{ animationDelay: "0.3s" }}
          >
            <img
              src={getImage(4)}
              alt="Background depth image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[0];
              }}
            />
          </div>

          <div
            className="absolute top-[40%] right-[38%] w-22 h-16 rounded-lg popup-seq float-loop bg-gray-300 p-1 rotate-[25deg] blur-lg"
            style={{ animationDelay: "1.6s" }}
          >
            <img
              src={getImage(5)}
              alt="Background depth image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[1];
              }}
            />
          </div>

          <div
            className="absolute top-[68%] right-[10%] w-20 h-15 rounded-lg popup-seq float-loop bg-gray-300 p-1 rotate-[-12deg] blur-lg"
            style={{ animationDelay: "2.9s" }}
          >
            <img
              src={getImage(6)}
              alt="Background depth image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[2];
              }}
            />
          </div>
        </div>

        {/* MID-BACKGROUND LAYER - Medium blur, small-medium size */}
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute top-[20%] right-[30%] w-22 h-16 rounded-lg popup-seq float-loop bg-gray-300 p-2 rotate-[15deg] blur-md"
            style={{ animationDelay: "0.7s" }}
          >
            <img
              src={getImage(7)}
              alt="Mid-depth floating image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[1];
              }}
            />
          </div>

          <div
            className="absolute top-[52%] right-[33%] w-24 h-18 rounded-lg popup-seq float-loop bg-gray-300 p-2 rotate-[-18deg] blur-md"
            style={{ animationDelay: "2.4s" }}
          >
            <img
              src={getImage(8)}
              alt="Mid-depth floating image"
              loading="lazy"
              className="w-full h-full rounded object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[3];
              }}
            />
          </div>
        </div>

        {/* MID-FOREGROUND LAYER - Light blur, medium size */}
        <div className="absolute inset-0 opacity-65">
          <div
            className="absolute top-[28%] right-[17%] w-26 h-20 rounded-xl popup-seq float-loop bg-gray-300 p-2 rotate-[-10deg] blur-sm shadow-md"
            style={{ animationDelay: delays[1] }}
          >
            <img
              src={getImage(9)}
              alt="Mid-foreground floating image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[0];
              }}
            />
          </div>

          <div
            className="absolute top-[45%] right-[24%] w-28 h-22 rounded-xl popup-seq float-loop bg-gray-300 p-2 rotate-[6deg] blur-sm shadow-md"
            style={{ animationDelay: delays[3] }}
          >
            <img
              src={getImage(10)}
              alt="Mid-foreground floating image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[1];
              }}
            />
          </div>
        </div>

        {/* FOREGROUND LAYER - No blur, normal size - 4+ images in aesthetic arrangement */}
        <div className="absolute inset-0">
          {/* Top arc arrangement */}
          <div
            className="absolute top-[5%] right-[12%] w-32 h-24 rounded-xl popup-seq float-loop bg-gray-300 p-3 rotate-[-22deg] shadow-lg"
            style={{ animationDelay: delays[0] }}
          >
            <img
              src={getImage(11)}
              alt="Foreground floating image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[0];
              }}
            />
          </div>

          <div
            className="absolute top-[8%] right-[26%] w-28 h-20 rounded-xl popup-seq float-loop bg-gray-300 p-3 rotate-[18deg] shadow-lg"
            style={{ animationDelay: delays[1] }}
          >
            <img
              src={getImage(12)}
              alt="Foreground floating image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[1];
              }}
            />
          </div>

          {/* Middle section */}
          <div
            className="absolute top-[35%] right-[14%] w-32 h-24 rounded-xl popup-seq float-loop bg-gray-300 p-3 rotate-[-8deg] shadow-lg"
            style={{ animationDelay: delays[2] }}
          >
            <img
              src={getImage(13)}
              alt="Foreground floating image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[3];
              }}
            />
          </div>

          <div
            className="absolute top-[38%] right-[32%] w-28 h-20 rounded-xl popup-seq float-loop bg-gray-300 p-2 rotate-[12deg] shadow-lg"
            style={{ animationDelay: delays[3] }}
          >
            <img
              src={getImage(14)}
              alt="Foreground floating image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[0];
              }}
            />
          </div>

          {/* Bottom section */}
          <div
            className="absolute top-[62%] right-[16%] w-32 h-24 rounded-xl popup-seq float-loop bg-gray-300 p-3 rotate-[-15deg] shadow-lg"
            style={{ animationDelay: delays[4] }}
          >
            <img
              src={getImage(15)}
              alt="Foreground floating image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[2];
              }}
            />
          </div>

          <div
            className="absolute top-[68%] right-[28%] w-28 h-20 rounded-xl popup-seq float-loop bg-gray-300 p-3 rotate-[8deg] shadow-lg"
            style={{ animationDelay: delays[5] }}
          >
            <img
              src={getImage(16)}
              alt="Foreground floating image"
              loading="lazy"
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => {
                e.target.src = fallbackImages[1];
              }}
            />
          </div>
        </div>

      </div>

      {/* HEADER */}
      {/* <div className="relative z-20">
        <Header />
      </div> */}

      {/* ROTATED TEXT */}
      <div
        className="hidden lg:block absolute right-[-120px] top-[120px] pointer-events-none z-[15]"
        style={{
          transform: "rotate(90deg)",
          fontSize: "5rem",
          opacity: 0.28,
          WebkitTextStroke: "1px rgba(255, 255, 255, 0.9)",
          color: "transparent",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-6px",
        }}
        aria-hidden="true"
      >
        ENJOY !!!
      </div>

      {/* HERO TEXT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center">
        <div className="w-full lg:w-1/2">
          <h1 className="text-[60px] font-bold drop-shadow-lg font-josefin leading-tight font-sansitaOne">
            <span className="text-red-500 block">Discover the Thrill</span>
            <span className="text-white block">Across Every Zone</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
