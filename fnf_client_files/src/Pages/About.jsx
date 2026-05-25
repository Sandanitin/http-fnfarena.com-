import React from "react";
import First from "../components/First";
import Header from "../components/Header";
import Heros from "../components/About/Heros";
import FnfArenaSection from "../components/About/FnfArenaSection";
import Values from "../components/About/Values";
import FNFJourney from "../components/About/FNFJourney";
import Footer from "../components/Footer";
import Last from "../components/Last";
import { useEffect } from "react";

export default function About() {
   useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-screen bg-black">
      <First/>
      <Header/>
      <Heros/>
     <FnfArenaSection/>
     <Values/>
     <FNFJourney/>
       <Last/>
    <Footer/>
    </div>
  );
}
