"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, IMGUrl } from "../config/apiConfig";

const PaintballContext = createContext(null);

export const PaintballProvider = ({ children }) => {
  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);

  // Banner state
  const [banner, setBanner] = useState(null);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [bannerError, setBannerError] = useState(null);

  /* ------------------ Reviews API ------------------ */
  const fetchPaintballReviews = async () => {
    try {
      setReviewsLoading(true);
      setReviewsError(null);

      const response = await fetch(`${BASE_URL}/activity-reviews`);
      if (!response.ok) {
        throw new Error("Failed to fetch paintball reviews");
      }

      const result = await response.json();

      if (result?.status === 200 && Array.isArray(result.data)) {
        const paintballReviews = result.data
          .filter(
            (item) =>
              item.activity_id === "1" &&
              item.status === "Active"
          )
          .map((item) => ({
            id: item.id,
            text: item.review_description,
            name: item.reviewer_name,
            rating: Number(item.reviewer_rating),
            image: item.reviewer_image
              ? `https://acsqat.in/fnf_backend/uploads/${item.reviewer_image}`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  item.reviewer_name
                )}`,
          }));

        setReviews(paintballReviews);
      }
    } catch (err) {
      // console.error("Paintball Review API error:", err);
      setReviewsError("Unable to load paintball reviews");
    } finally {
      setReviewsLoading(false);
    }
  };

  /* ------------------ Banner API ------------------ */
  const fetchPaintballBanner = async () => {
    try {
      setBannerLoading(true);
      setBannerError(null);

      const response = await fetch(`${BASE_URL}/activities-banner`);
      if (!response.ok) {
        throw new Error("Failed to fetch paintball banner");
      }

      const result = await response.json();

      if (result?.status === 200 && Array.isArray(result.data)) {
        // 👉 adjust activity_id if needed
        const bannerItem = result.data.find(
          (item) =>
            item.activity_id === "1" &&
            item.status === "Active"
        );

        if (bannerItem) {
          const imageUrl = bannerItem.image?.startsWith("http")
            ? bannerItem.image
            : `${IMGUrl}/${bannerItem.image}`;

          setBanner({
            ...bannerItem,
            imageUrl,
          });
        }
      }
    } catch (err) {
      // console.error("Paintball Banner API error:", err);
      setBannerError("Unable to load paintball banner");
    } finally {
      setBannerLoading(false);
    }
  };

  useEffect(() => {
    fetchPaintballReviews();
    fetchPaintballBanner();
  }, []);

  return (
    <PaintballContext.Provider
      value={{
        // reviews
        reviews,
        reviewsLoading,
        reviewsError,
        fetchPaintballReviews,

        // banner
        banner,
        bannerLoading,
        bannerError,
        fetchPaintballBanner,
      }}
    >
      {children}
    </PaintballContext.Provider>
  );
};

export const usePaintball = () => {
  const context = useContext(PaintballContext);
  if (!context) {
    throw new Error("usePaintball must be used inside PaintballProvider");
  }
  return context;
};
