import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import EventsHero from "../components/Events/EventsHero";
import EventsSpaces from "../components/Events/EventsSpaces";
import EventsGallery from "../components/Events/EventsGallery";
import EventsTestimonials from "../components/Events/EventsTestimonials";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect } from "react";

export default function Events() {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black ">
      <First />
      <Header />
      <EventsHero />
      <EventsSpaces />
      <EventsGallery />
      {/* <EventsTestimonials /> */}

      <Last />
      <Footer />
    </div>
  );
}






















// import React from "react";
// import First from "../components/First";
// import Herro from "../components/Events/Herro";
// import GoKartGrid from "../components/Events/GoKartGrid";

// import Footer from "../components/Footer";
// import Last from "../components/Last";
// import Header from "../components/Header";
// import EventPackages from "../components/Events/EventsPackages";
// import { useEffect } from "react";


// export default function Events() {
//    useEffect(() => {
//     // Scroll to top when the component mounts
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <div className="w-full min-h-screen bg-black overflow-x-hidden">
//       <First/>
//       <Header/>

//     <Herro/>
//     <GoKartGrid/>
//     <Last/>
//     <Footer/>
//     </div>
//   );
// }
