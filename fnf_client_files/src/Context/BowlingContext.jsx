"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, IMGUrl } from "../config/apiConfig";

const BowlingContext = createContext(null);

export const BowlingProvider = ({ children }) => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchBowlingBanner = async () => {
  try {
    setLoading(true);

    const response = await fetch(`${BASE_URL}/activities-banner`);
    const result = await response.json();

    // // console.log("Banner API result:", result.data);

    if (result?.status === 200 && Array.isArray(result.data)) {
      const bowlingBanner = result.data.find((item) => {
        const desc = item.description?.toLowerCase();
        return desc?.includes("bowling");
      });

      if (bowlingBanner) {
        const imageUrl = bowlingBanner.image?.startsWith("http")
          ? bowlingBanner.image
          : `${IMGUrl}/${bowlingBanner.image}`;

        setBanner({
          ...bowlingBanner,
          imageUrl,
        });
      } else {
        // console.warn("No Bowling banner found in description");
      }
    }
  } catch (err) {
    // console.error("Error fetching bowling banner:", err);
    setError(err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchBowlingBanner();
  }, []);

  return (
    <BowlingContext.Provider value={{ banner, loading, error }}>
      {children}
    </BowlingContext.Provider>
  );
};

export const useBowling = () => {
  const context = useContext(BowlingContext);
  if (!context) {
    throw new Error("useBowling must be used inside BowlingProvider");
  }
  return context;
};
