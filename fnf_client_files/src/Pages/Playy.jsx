import React from "react";
import First from "../components/First";
import Header from "../components/Header";
import Hero from "../components/Play/Hero";
import Timings from "../components/Play/Timings";
import WhatToBring from "../components/Play/WhatToBring";
import RulesAndGuidelines from "../components/Play/RulesAndGuidelines";
import SafetyGuarantee from "../components/Play/SafetyGuarantee";
import Footer from "../components/Footer";
import Last from "../components/Last";
import EventsPackages from "../components/EventsPackages";
import { useEffect } from "react";
export default function Playy() {
   useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-screen bg-black ">
      <First/>
      <Header/>
      {/* <EventPackages/> */}
      <Hero/>
       <EventsPackages />
      <Timings/>
      <WhatToBring/>
      <RulesAndGuidelines/>
      <SafetyGuarantee/>
      <Last/>
      <Footer/>
    </div>
  );
}
