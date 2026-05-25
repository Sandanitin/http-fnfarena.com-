"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, IMGUrl } from "../config/apiConfig";


const HomeContext = createContext(null);


export const HomeProvider = ({ children }) => {
  const [homeStats, setHomeStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch 
  const fetchHomeStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/home-status`);
      const result = await response.json();

      if (response.ok && result.status === 200) {
        setHomeStats(result.data?.[0] || null);
      } else {
        setError(result.message || "Failed to fetch home stats");
      }
    } catch (err) {
      // console.error("Home Stats Error:", err);
      setError("Something went wrong while fetching home stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeStats();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        homeStats,
        loading,
        error,
        IMGUrl,
        refetchHomeStats: fetchHomeStats,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};


export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHome must be used within a HomeProvider");
  }
  return context;
};
