import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import SkyCycleHero from "../components/SkyCycle/SkyCycleHero";
import SkyCycleFeatures from "../components/SkyCycle/SkyCycleFeatures";
import SkyCycleExperience from "../components/SkyCycle/SkyCycleExperience";
import SkyCycleGallery from "../components/SkyCycle/SkyCycleGallery";
import SkyCyclePricing from "../components/SkyCycle/SkyCyclePricing";
import SkyCycleRules from "../components/SkyCycle/SkyCycleRules";
import ContactUs from "../components/ContactUs";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useSkyCycle } from "../hooks/useActivityData.js";

export default function SkyCycle() {
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
    features
  } = useSkyCycle();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black ">
      <First />
      <Header />
      <SkyCycleHero
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <SkyCycleFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <SkyCycleExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      <SkyCycleGallery
        galleryImages={galleryImages}
        videos={videos}
        metrics={metrics}
      />
      {/* <SkyCyclePricing /> */}
      <SkyCycleRules
        protocols={protocols}
      />
      <ContactUs />
      <Last />
      <Footer />
    </div>
  );
}
