
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, IMGUrl } from "../config/apiConfig";

const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contact data
  const fetchContactData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/contact`);
      const result = await response.json();
      console.log("Contact API response:", result);
      if (response.ok && result.status === 200) {
        setContactData(result.data || null);
      } else {
        setError(result.message || "Failed to fetch contact information");
      }
    } catch (err) {
      // console.error("Contact Data Error:", err);
      setError("Something went wrong while fetching contact information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contactData,
        loading,
        error,
        IMGUrl,
        refetchContactData: fetchContactData,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
};





