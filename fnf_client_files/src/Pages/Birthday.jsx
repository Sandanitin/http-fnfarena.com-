import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import BirthdayHero from "../components/Birthday/BirthdayHero";
import BirthdayActivities from "../components/Birthday/BirthdayActivities";
import BirthdayBooking from "../components/Birthday/BirthdayBooking";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect,useRef } from "react";
export default function Birthday() {
    const bookingRef = useRef(null);
   useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-screen bg-black ">
      <First />
      <Header />
      <BirthdayHero bookingRef={bookingRef}/>
      <BirthdayActivities bookingRef={bookingRef} />
      
     <div ref={bookingRef}>
        <BirthdayBooking />
      </div>
      <Last />
      <Footer />
    </div>
  );
}
