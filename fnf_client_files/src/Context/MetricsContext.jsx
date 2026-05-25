"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/apiConfig";

const MetricsContext = createContext(null);

export const MetricsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${BASE_URL}/events-metrics`);
      const json = await res.json();

      if (json?.status === 200) {
        setMetrics(Array.isArray(json.data) ? json.data : []);
      } else {
        setError("Failed to load event metrics");
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <MetricsContext.Provider
      value={{
        metrics,
        loading,
        error,
        refetchMetrics: fetchMetrics,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (!context) {
    throw new Error("useMetrics must be used inside MetricsProvider");
  }
  return context;
};
