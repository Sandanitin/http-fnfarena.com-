import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import CorporateHero from "../components/Corporate/CorporateHero";
import CorporateActivities from "../components/Corporate/CorporateActivities";
import CorporateBooking from "../components/Corporate/CorporateBooking";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect,useRef } from "react";
export default function Corporate() {
    const bookingRef = useRef(null);
      const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
   useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-screen bg-black ">
      <First />
      <Header />
      <CorporateHero onPlanClick={scrollToBooking} />
      <CorporateActivities onPlanClick={scrollToBooking} />
     <div ref={bookingRef}>
        <CorporateBooking />
      </div>
      <Last />
      <Footer />
    </div>
  );
}
