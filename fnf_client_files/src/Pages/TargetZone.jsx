import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import TargetZoneHero from "../components/TargetZone/TargetZoneHero";
import TargetZoneFeatures from "../components/TargetZone/TargetZoneFeatures";
import TargetZoneExperience from "../components/TargetZone/TargetZoneExperience";
import TargetZoneGallery from "../components/TargetZone/TargetZoneGallery";
import TargetZonePricing from "../components/TargetZone/TargetZonePricing";
import TargetZoneRules from "../components/TargetZone/TargetZoneRules";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect } from "react";
import ContactUs from "../components/ContactUs";
import { useTargetZone } from "../hooks/useActivityData.js";

export default function TargetZone() {
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
  } = useTargetZone();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      <First/>
      <Header />
      <TargetZoneHero
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <TargetZoneFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <TargetZoneExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      <TargetZoneGallery
        galleryImages={galleryImages}
        videos={videos}
        metrics={metrics}
      />
      {/* <TargetZonePricing /> */}
      <TargetZoneRules
        protocols={protocols}
      />
      <ContactUs />
      <Last/>
      <Footer />
    </div>
  );
}
