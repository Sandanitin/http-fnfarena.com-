"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/apiConfig";

const EventsDetailsContext = createContext(null);

export const EventsDetailsProvider = ({ children }) => {
  const [eventsDetails, setEventsDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/events-details`);
        const json = await res.json();
        if (json?.status === 200) {
          setEventsDetails(json.data || []);
        }
      } catch (err) {
        // console.error("Events details fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, []);

  return (
    <EventsDetailsContext.Provider value={{ eventsDetails, loading }}>
      {children}
    </EventsDetailsContext.Provider>
  );
};

export const useEventsDetails = () => {
  const ctx = useContext(EventsDetailsContext);
  if (!ctx) {
    throw new Error("useEventsDetails must be used within EventsDetailsProvider");
  }
  return ctx;
};
