"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/apiConfig";

const VisionContext = createContext();

export const VisionProvider = ({ children }) => {
  const [visions, setVisions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVisions = async () => {
    try {
      const res = await fetch(`${BASE_URL}/vision-values`);
      const json = await res.json();

      if (json?.status === 200 && Array.isArray(json.data)) {
        // Keep UI order: id 1 → 5
        setVisions(json.data.slice().reverse());
      }
    } catch (error) {
      // console.error("Vision Values API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisions();
  }, []);

  return (
    <VisionContext.Provider value={{ visions, loading }}>
      {children}
    </VisionContext.Provider>
  );
};

export const useVision = () => useContext(VisionContext);
