import React from "react";
import Header from "../components/Header";
import SoftplayTrampolineBullrideHero from "../components/SoftplayTrampolineBullride/SoftplayTrampolineBullrideHero";
import SoftplayTrampolineBullrideFeatures from "../components/SoftplayTrampolineBullride/SoftplayTrampolineBullrideFeatures";
import SoftplayTrampolineBullrideRules from "../components/SoftplayTrampolineBullride/SoftplayTrampolineBullrideRules";
import SoftplayTrampolineBullrideExperience from "../components/SoftplayTrampolineBullride/SoftplayTrampolineBullrideExperience";
import SoftplayTrampolineBullrideHowToPlay from "../components/SoftplayTrampolineBullride/SoftplayTrampolineBullrideHowToPlay";
import SoftplayTrampolineBullridePricing from "../components/SoftplayTrampolineBullride/SoftplayTrampolineBullridePricing";
import SoftplayTrampolineBullrideGallery from "../components/SoftplayTrampolineBullride/SoftplayTrampolineBullrideGallery";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import First from "../components/First";
import Last from "../components/Last";
import { useEffect } from "react";
import { useSoftplayTrampolineBullRide } from "../hooks/useActivityData.js";

export default function SoftplayTrampolineBullride() {
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
  } = useSoftplayTrampolineBullRide();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black ">
      <First />
      <Header />
      <SoftplayTrampolineBullrideHero
        banner={banner}
        loading={loading}
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <SoftplayTrampolineBullrideFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <SoftplayTrampolineBullrideRules
        protocols={protocols}
      />
      <SoftplayTrampolineBullrideExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      <SoftplayTrampolineBullrideHowToPlay />
      {/* <SoftplayTrampolineBullridePricing /> */}
      <SoftplayTrampolineBullrideGallery
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
