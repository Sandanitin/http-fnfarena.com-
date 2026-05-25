import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import RockerEjectionHero from "../components/RockerEjection/RockerEjectionHero";
import RockerEjectionFeatures from "../components/RockerEjection/RockerEjectionFeatures";
import RockerEjectionExperience from "../components/RockerEjection/RockerEjectionExperience";
import RockerEjectionGallery from "../components/RockerEjection/RockerEjectionGallery";
import RockerEjectionRules from "../components/RockerEjection/RockerEjectionRules";
import ContactUs from "../components/ContactUs";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useRockerEjection } from "../hooks/useActivityData.js";

export default function RocketEjection() {
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
  } = useRockerEjection();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black ">
      <First />
      <Header />
      <RockerEjectionHero
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <RockerEjectionFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <RockerEjectionExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      <RockerEjectionGallery
        galleryImages={galleryImages}
        videos={videos}
        metrics={metrics}
      />
      <RockerEjectionRules
        protocols={protocols}
      />
      <ContactUs />
      <Last />
      <Footer />
    </div>
  );
}
