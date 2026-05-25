import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import First from "./First";
import Last from "./Last";
import car from "../assets/kart.png";

export default function LoadingScreen() {
  const [stage, setStage] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize and play audio with better error handling
    const initializeAudio = async () => {
      try {
        if (audioRef.current) {
          // Set audio properties
          audioRef.current.volume = 0.3; // Set volume to 30%
          audioRef.current.loop = true; // Ensure infinite loop

          // Add event listeners for better audio management
          audioRef.current.addEventListener('loadeddata', () => {
            setAudioLoaded(true);
          });

          audioRef.current.addEventListener('ended', () => {
            // Fallback: restart audio if loop fails
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(console.error);
          });

          audioRef.current.addEventListener('error', (e) => {
            console.error('Audio error:', e);
          });

          // Attempt to play audio
          await audioRef.current.play();
        }
      } catch (error) {
        // Handle autoplay policy restrictions
        console.log("Audio autoplay prevented:", error);

        // Add click listener to start audio on user interaction
        const startAudioOnInteraction = () => {
          if (audioRef.current) {
            audioRef.current.play().catch(console.error);
            document.removeEventListener('click', startAudioOnInteraction);
            document.removeEventListener('touchstart', startAudioOnInteraction);
          }
        };

        document.addEventListener('click', startAudioOnInteraction);
        document.addEventListener('touchstart', startAudioOnInteraction);
      }
    };

    initializeAudio();

    // Stages:
    // 0 = initial (strips off-screen)
    // 1 = rotated (parallel -> X)
    // 2 = straight (final)
    const t1 = setTimeout(() => setStage(1), 1500);
    const t2 = setTimeout(() => setStage(2), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      // Only cleanup audio when component unmounts (loading ends)
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        // Remove event listeners
        audioRef.current.removeEventListener('loadeddata', () => {});
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current.removeEventListener('error', () => {});
      }
    };
  }, []);

  // Ensure audio continues playing during stage transitions
  useEffect(() => {
    if (audioRef.current && audioLoaded) {
      // Check if audio is playing, if not, restart it
      if (audioRef.current.paused) {
        audioRef.current.play().catch(error => {
          console.log("Audio play failed during stage transition:", error);
        });
      }
    }
  }, [stage, audioLoaded]);

  const topClasses = [
    "absolute left-0 w-full transition-all duration-700 ease-in-out -translate-y-32",
    "absolute left-0 w-full transition-all duration-700 ease-in-out top-1/2 -translate-y-1/2 -rotate-6",
    "absolute left-0 w-full transition-all duration-700 ease-in-out top-[5%] -translate-y-1/2 rotate-0"
  ][stage];

  const bottomClasses = [
    "absolute left-0 w-full transition-all duration-700 ease-in-out translate-y-32",
    "absolute left-0 w-full transition-all duration-700 ease-in-out top-1/2 -translate-y-1/2 rotate-6",
    "absolute left-0 w-full transition-all duration-700 ease-in-out top-[95%] -translate-y-1/2 rotate-0"
  ][stage];

  return (
    <div className="w-full h-screen bg-[#161a1d] flex items-center justify-center relative overflow-hidden">
      {/* Audio element for background sound with infinite loop */}
      <audio
        ref={audioRef}
        src="https://cdn.acsdev.in/FNF/RevSound.mp3.mpeg"
        loop
        preload="auto"
        style={{ display: 'none' }}
        aria-label="Loading background audio"
      />

      {/* TOP STRIP*/}
      <div className={topClasses} style={{ zIndex: 50, pointerEvents: "none" }}>
        <div className="w-full">
          <First />
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className={bottomClasses} style={{ zIndex: 50, pointerEvents: "none" }}>
        <div className="w-full">
          <Last />
        </div>
      </div>

      {/* LOADING + CAR */}
      <div className="absolute top-3/2 left-0 w-full flex justify-start z-30 pointer-events-none">
        <img
          src={`${__CDN_BASE__}kart.png`}
          loading="lazy"
          className="w-28 car-move animate-bounce"
          style={{ animationDuration: "4s" }}
          alt="Loading car animation"
        />
      </div>

      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 z-30">
        <h1 className="text-white text-3xl font-semibold tracking-wider">
          Loading……
        </h1>
      </div>
    </div>
  );
}
