import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import GoKartHero from "../components/GoKart/GoKartHero.jsx";
import GoKartFeatures from "../components/GoKart/GoKartFeatures.jsx";
import GoKartExperience from "../components/GoKart/GoKartExperience.jsx";
import GoKartGallery from "../components/GoKart/GoKartGallery.jsx";
import GoKartRules from "../components/GoKart/GoKartRules.jsx";
import ContactUs from "../components/ContactUs";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useGoKarting } from "../hooks/useActivityData.js";

export default function GoKart() {
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
  } = useGoKarting();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <First/>
      <Header />
      <GoKartHero
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <GoKartFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <GoKartExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      <GoKartGallery
        galleryImages={galleryImages}
        videos={videos}
        metrics={metrics}
      />
      <GoKartRules
        protocols={protocols}
      />
      <ContactUs />
      <Last/>
      <Footer />
    </div>
  );
}
