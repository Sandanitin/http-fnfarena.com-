"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/apiConfig";

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const res = await fetch(`${BASE_URL}/activities`);
      const json = await res.json();
      setActivities(json.data || []);
    };

    fetchActivities();
  }, []);

  const getActivityNameById = (id) =>
    activities.find((a) => a.id === id)?.activity_name || "";

  return (
    <ActivityContext.Provider value={{ activities, getActivityNameById }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);
