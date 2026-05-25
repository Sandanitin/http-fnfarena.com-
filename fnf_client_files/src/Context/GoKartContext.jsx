"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, IMGUrl } from "../config/apiConfig"

const GoKartContext = createContext();

export const GoKartProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoKartReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/activity-reviews`);

        if (!response.ok) {
          throw new Error("Failed to fetch Go Kart reviews");
        }

        const result = await response.json();

        const gokartReviews =
          result?.data
            ?.filter(
              (item) =>
                item.activity_id === "1" &&
                item.status === "Active"
            )
            .map((item) => ({
  id: item.id,
 activityname: item.activity_id,
  name: item.reviewer_name,
  text: item.review_description,
  rating: Number(item.rating), 
 image: item.reviewer_image
  ? `https://acsqat.in/fnf_backend/uploads/${item.reviewer_image}`
  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
      item.reviewer_name
    )}`,

}))


        setReviews(gokartReviews);
      } catch (err) {
        // console.error("GoKartContext error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchGoKartReviews();
  }, []);

  return (
    <GoKartContext.Provider value={{ reviews, loading, error }}>
      {children}
    </GoKartContext.Provider>
  );
};

export const useGoKart = () => useContext(GoKartContext);
