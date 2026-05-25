"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, IMGUrl } from "../config/apiConfig";

const SoftPlayContext = createContext(null);

export const SoftPlayProvider = ({ children }) => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSoftPlayBanner = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/activities-banner`);
      const result = await response.json();

      if (result?.status === 200 && Array.isArray(result.data)) {
        const bannerItem = result.data[0];

        const imageUrl = bannerItem.image?.startsWith("http")
          ? bannerItem.image
          : `${IMGUrl}/${bannerItem.image}`;

        setBanner({
          ...bannerItem,
          imageUrl,
        });
      }
    } catch (err) {
      // console.error("Error fetching Soft Play banner:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoftPlayBanner();
  }, []);

  return (
    <SoftPlayContext.Provider value={{ banner, loading, error }}>
      {children}
    </SoftPlayContext.Provider>
  );
};

export const useSoftPlay = () => {
  const context = useContext(SoftPlayContext);
  if (!context) {
    throw new Error("useSoftPlay must be used inside SoftPlayProvider");
  }
  return context;
};
