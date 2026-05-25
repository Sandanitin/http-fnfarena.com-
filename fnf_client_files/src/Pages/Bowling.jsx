import React from "react";
import Header from "../components/Header";
import BowlingHero from "../components/Bowling/BowlingHero";
import BowlingFeatures from "../components/Bowling/BowlingFeatures";
import BowlingRules from "../components/Bowling/BowlingRules";
import BowlingExperience from "../components/Bowling/BowlingExperience";
import BowlingHowToPlay from "../components/Bowling/BowlingHowToPlay";
import BowlingPricing from "../components/Bowling/BowlingPricing";
import BowlingGallery from "../components/Bowling/BowlingGallery";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import First from "../components/First";
import Last from "../components/Last";
import { useEffect } from "react";
import { useBowling } from "../hooks/useActivityData.js";

export default function Bowling() {
  const {
    reviews,
    isLoading: loading,
    error,
    activity,
    protocols,
    details,
    metrics,
    media,
    mainImage,
    landingImage,
    galleryImages,
    videos,
    averageRating,
    reviewCount,
    features,
    banner
  } = useBowling();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black ">
      <First />
      <Header />
      <BowlingHero
        banner={banner}
        loading={loading}
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <BowlingFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <BowlingRules
        protocols={protocols}
      />
      <BowlingExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      <BowlingHowToPlay />
      {/* <BowlingPricing /> */}
      <BowlingGallery
        galleryImages={galleryImages}
        videos={videos}
        metrics={metrics}
      />
      <ContactUs />
      <Last />
      <Footer />
    </div>
  );
}
