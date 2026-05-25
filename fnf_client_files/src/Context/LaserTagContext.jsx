"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, IMGUrl } from "../config/apiConfig";

const LaserTagContext = createContext(null);

export const LaserTagProvider = ({ children }) => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLaserTagBanner = async () => {
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
      // console.error("Error fetching Laser Tag banner:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaserTagBanner();
  }, []);

  return (
    <LaserTagContext.Provider value={{ banner, loading, error }}>
      {children}
    </LaserTagContext.Provider>
  );
};

export const useLaserTag = () => {
  const context = useContext(LaserTagContext);
  if (!context) {
    throw new Error("useLaserTag must be used inside LaserTagProvider");
  }
  return context;
};
