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
import { useEffect } from "react";
import { useLaserTag } from "../hooks/useActivityData.js";

export default function LaserTag() {
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
  } = useLaserTag();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black ">
      <First />
      <Header />
      <LaserTagHero
        banner={banner}
        loading={loading}
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <LaserTagFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <LaserTagRules
        protocols={protocols}
      />
      <LaserTagExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      <LaserTagHowToPlay />
      {/* <LaserTagPricing /> */}
      <LaserTagGallery
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
