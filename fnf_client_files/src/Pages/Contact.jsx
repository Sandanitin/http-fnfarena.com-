import React from "react";
import First from "../components/First";
import HeroSection from "../components/Contact/HeroSection";
import Second from "../components/Contact/Second";
import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer";
import Last from "../components/Last";
import Header from "../components/Header";
import Values from "../components/About/Values";
import FnfArenaSection from "../components/About/FnfArenaSection";
import FNFJourney from "../components/About/FNFJourney";
import { useEffect } from "react";
import FoodShowcase from "../components/FoodShowcase";




export default function Contact() {
   useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-screen bg-black ">
      <First/>
      <Header/>
  <HeroSection/>
  <FnfArenaSection/>
       {/* <Values/> */}
  {/* <FoodShowcase/> */}
  <Second/>
  <FNFJourney/>
  
  <ContactUs/>
    <Last/>
    <Footer/>
    </div>
  );
}
