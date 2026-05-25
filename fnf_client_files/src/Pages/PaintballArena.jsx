import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import PaintballHero from "../components/PaintballArena/PaintballHero";
import PaintballFeatures from "../components/PaintballArena/PaintballFeatures";
import PaintballExperience from "../components/PaintballArena/PaintballExperience";
import PaintballGallery from "../components/PaintballArena/PaintballGallery";
import PaintballPricing from "../components/PaintballArena/PaintballPricing";
import PaintballRules from "../components/PaintballArena/PaintballRules";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect } from "react";
import ContactUs from "../components/ContactUs";
import { usePaintballArena } from "../hooks/useActivityData.js";

export default function PaintballArena() {
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
  } = usePaintballArena();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      <First/>
      <Header />
      <PaintballHero
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <PaintballFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <PaintballExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      <PaintballGallery
        galleryImages={galleryImages}
        videos={videos}
        metrics={metrics}
      />
      {/* <PaintballPricing /> */}
      <PaintballRules
        protocols={protocols}
      />
      <ContactUs />
      <Last/>
      <Footer />
    </div>
  );
}
