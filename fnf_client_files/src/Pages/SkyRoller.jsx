import React from "react";
import Header from "../components/Header";
import First from "../components/First";
import SkyRollerHero from "../components/SkyRoller/SkyRollerHero";
import SkyRollerFeatures from "../components/SkyRoller/SkyRollerFeatures";
import SkyRollerExperience from "../components/SkyRoller/SkyRollerExperience";
import SkyRollerGallery from "../components/SkyRoller/SkyRollerGallery";
import SkyRollerRules from "../components/SkyRoller/SkyRollerRules";
import ContactUs from "../components/ContactUs";
import Last from "../components/Last";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useSkyRoller } from "../hooks/useActivityData.js";

export default function SkyRoller() {
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
  } = useSkyRoller();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black ">
      <First />
      <Header />
      <SkyRollerHero
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <SkyRollerFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <SkyRollerExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      <SkyRollerGallery
        galleryImages={galleryImages}
        videos={videos}
        metrics={metrics}
      />
      <SkyRollerRules
        protocols={protocols}
      />
      <ContactUs />
      <Last />
      <Footer />
    </div>
  );
}
