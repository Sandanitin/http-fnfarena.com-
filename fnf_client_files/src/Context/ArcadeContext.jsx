"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, IMGUrl } from "../config/apiConfig";

const ArcadeContext = createContext(null);

export const ArcadeProvider = ({ children }) => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArcadeBanner = async () => {
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
      // console.error("Error fetching Arcade banner:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArcadeBanner();
  }, []);

  return (
    <ArcadeContext.Provider value={{ banner, loading, error }}>
      {children}
    </ArcadeContext.Provider>
  );
};

export const useArcade = () => {
  const context = useContext(ArcadeContext);
  if (!context) {
    throw new Error("useArcade must be used inside ArcadeProvider");
  }
  return context;
};
