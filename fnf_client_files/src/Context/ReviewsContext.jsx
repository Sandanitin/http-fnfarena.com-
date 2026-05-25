"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/apiConfig";

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/events-reviews`);
      const json = await res.json();
// // console.log(res);
      if (json?.status === 200) {
        setReviews(json.data || []);
      } else {
        setReviews([]);
      }
    } catch (err) {
      // console.error(err);
      setError("Unable to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <ReviewsContext.Provider value={{ reviews, loading, error }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewsContext);
