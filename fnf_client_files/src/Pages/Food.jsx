import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import FoodHero from "../components/Food/FoodHero";
import FoodMenu from "../components/Food/FoodMenu";
import FoodSpecialties from "../components/Food/FoodSpecialties";
import FoodDelivery from "../components/Food/FoodDelivery";
import FoodExperience from "../components/Food/FoodExperience";
import FoodGallery from "../components/Food/FoodGallery";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect,useRef } from "react";``
export default function Food() {
  
  const foodHeroRef = useRef(null);
   useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-screen bg-black ">
      
      <First />
      <Header />
      <div ref={foodHeroRef}>
        <FoodHero />
      </div>
      <FoodMenu />
      <FoodSpecialties />
      {/* <FoodDelivery /> */}
      {/* <FoodExperience foodHeroRef={foodHeroRef} /> */}
      <FoodGallery />
      <Last />
      <Footer />
    </div>
  );
}
