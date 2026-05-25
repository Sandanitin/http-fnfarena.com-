import React from "react";
import Header from "../components/Header";
import ArcadeGamesHero from "../components/ArcadeGames/ArcadeGamesHero";
import ArcadeGamesFeatures from "../components/ArcadeGames/ArcadeGamesFeatures";
import ArcadeGamesRules from "../components/ArcadeGames/ArcadeGamesRules";
import ArcadeGamesExperience from "../components/ArcadeGames/ArcadeGamesExperience";
import ArcadeGamesHowToPlay from "../components/ArcadeGames/ArcadeGamesHowToPlay";
import ArcadeGamesPricing from "../components/ArcadeGames/ArcadeGamesPricing";
import ArcadeGamesGallery from "../components/ArcadeGames/ArcadeGamesGallery";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import First from "../components/First";
import Last from "../components/Last";
import { useEffect } from "react";
import { useArcadeGames } from "../hooks/useActivityData.js";

export default function ArcadeGames() {
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
  } = useArcadeGames();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black ">
      <First />
      <Header />
      <ArcadeGamesHero
        banner={banner}
        loading={loading}
        activity={activity}
        media={media}
        mainImage={mainImage}
        landingImage={landingImage}
        galleryImages={galleryImages}
      />
      <ArcadeGamesFeatures
        features={features}
        details={details}
        galleryImages={galleryImages}
      />
      <ArcadeGamesRules
        protocols={protocols}
      />
      <ArcadeGamesExperience
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={averageRating}
        reviewCount={reviewCount}
        metrics={metrics}
        videos={videos}
      />
      {/* <ArcadeGamesHowToPlay /> */}
      {/* <ArcadeGamesPricing /> */}
      <ArcadeGamesGallery
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
