import React from "react";
import First from "../components/First";
import Herro from "../components/Activities/Herros";


import Footer from "../components/Footer";
import Last from "../components/Last";
import ExperienceZones from "../components/Activities/ExperienceZones";
import QuickRide from "../components/Activities/QuickRide";
import Unleash from "../components/Activities/Unleash";
import ActivitiesSection from "../components/Activities/ActivitiesSection";
import GoKartGrid from "../components/Events/GoKartGrid";
import Header from "../components/Header";
import { useEffect } from "react";


export default function Activities() {
   useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-screen bg-black ">
      <First/>
      <Header/>
  
   <Herro/>
   {/* <ExperienceZones/> */}
   <QuickRide/>
   <Unleash/>
   <ActivitiesSection/>
    <GoKartGrid/>
    <Last/>
    <Footer/>
    </div>
  );
}
