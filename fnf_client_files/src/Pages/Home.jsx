import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import First from "../components/First";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import ArenaActivities from "../components/ArenaActivities";
import HeroSafety from "../components/HeroSafety";
import EventsPackages from "../components/EventsPackages";
import VisitSection from "../components/VisitSection";
import ContactUs from "../components/ContactUs";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useHome } from "../Context/HomeContext";

export default function Home() {
  const [loading, setLoading] = useState(false);

  // Get home context data
  const { homeStats, loading: homeLoading, error: homeError, IMGUrl } = useHome();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Check if user has navigated internally in this session
    const hasNavigatedInternally = sessionStorage.getItem('hasNavigatedInternally');

    if (!hasNavigatedInternally) {
      // First visit to the site in this session - show loading screen
      setLoading(true);

      const totalLoadTime = 4500; // Finish after full animation
      const timer = setTimeout(() => {
        setLoading(false);
        // Mark that user has now seen the loading screen
        sessionStorage.setItem('hasNavigatedInternally', 'true');
      }, totalLoadTime);

      return () => clearTimeout(timer);
    } else {
      // User has already navigated internally - skip loading screen
      setLoading(false);
    }
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="w-full min-h-screen bg-black ">
      <First />
      <Header />
      <HeroSection
        homeStats={homeStats}
        homeLoading={homeLoading}
        homeError={homeError}
        IMGUrl={IMGUrl}
      />
      <About
        homeStats={homeStats}
        homeLoading={homeLoading}
        homeError={homeError}
        IMGUrl={IMGUrl}
      />
      <ArenaActivities />
      <HeroSafety />
      {/* <EventsPackages /> */}
      <VisitSection />
      <ContactUs />
      <Last />
      <Footer />
    </div>
  );
}
