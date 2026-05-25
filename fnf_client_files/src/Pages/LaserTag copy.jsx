import React from "react";
import Header from "../components/Header";
import LaserTagHero from "../components/LaserTag/LaserTagHero";
import LaserTagFeatures from "../components/LaserTag/LaserTagFeatures";
import LaserTagRules from "../components/LaserTag/LaserTagRules";
import LaserTagExperience from "../components/LaserTag/LaserTagExperience";
import LaserTagHowToPlay from "../components/LaserTag/LaserTagHowToPlay";
import LaserTagPricing from "../components/LaserTag/LaserTagPricing";
import LaserTagGallery from "../components/LaserTag/LaserTagGallery";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import First from "../components/First";
import Last from "../components/Last";

export default function LaserTag() {
  return (
    <div className="w-full min-h-screen bg-black ">
      <First />
      <Header />
      <LaserTagHero />
      <LaserTagFeatures />
      <LaserTagRules />
      <LaserTagExperience />
      <LaserTagHowToPlay />
      <LaserTagPricing />
      <LaserTagGallery />
      <ContactUs />
      <Last />
      <Footer />
    </div>
  );
}
