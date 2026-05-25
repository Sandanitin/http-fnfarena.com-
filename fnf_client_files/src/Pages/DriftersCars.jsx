import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import DriftersHero from "../components/DriftersCars/DriftersHero";
import DriftersFeatures from "../components/DriftersCars/DriftersFeatures";
import DriftersExperience from "../components/DriftersCars/DriftersExperience";
import DriftersGallery from "../components/DriftersCars/DriftersGallery";
import DriftersPricing from "../components/DriftersCars/DriftersPricing";
import DriftersRules from "../components/DriftersCars/DriftersRules";
import ContactUs from "../components/ContactUs";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDriftersAndBumpingCars } from "../hooks/useActivityData.js";

export default function DriftersCars() {
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
  } = useDriftersAndBumpingCars();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      <First/>
      <Header />
      <DriftersHero
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <DriftersFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <DriftersExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      <DriftersGallery
        galleryImages={galleryImages}
        videos={videos}
        metrics={metrics}
      />
      {/* <DriftersPricing /> */}
      <DriftersRules
        protocols={protocols}
      />
      <ContactUs />
      <Last/>
      <Footer />
    </div>
  );
}
