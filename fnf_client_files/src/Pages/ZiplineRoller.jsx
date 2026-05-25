import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import ZiplineHero from "../components/ZiplineRoller/ZiplineHero";
import ZiplineFeatures from "../components/ZiplineRoller/ZiplineFeatures";
import ZiplineExperience from "../components/ZiplineRoller/ZiplineExperience";
import ZiplineGallery from "../components/ZiplineRoller/ZiplineGallery";
import ZiplinePricing from "../components/ZiplineRoller/ZiplinePricing";
import ZiplineRules from "../components/ZiplineRoller/ZiplineRules";
import ContactUs from "../components/ContactUs";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useZiplineRoller } from "../hooks/useActivityData.js";

export default function ZiplineRoller() {
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
  } = useZiplineRoller();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black ">
      <First />
      <Header />
      <ZiplineHero
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <ZiplineFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <ZiplineExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      <ZiplineGallery
        galleryImages={galleryImages}
        videos={videos}
        metrics={metrics}
      />
      {/* <ZiplinePricing /> */}
      <ZiplineRules
        protocols={protocols}
      />
      <ContactUs />
      <Last />
      <Footer />
    </div>
  );
}
