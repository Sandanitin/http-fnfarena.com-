"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, IMGUrl } from "../config/apiConfig";

const EventPackagesContext = createContext(null);

export const EventPackagesProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  // Fetch packages from API
  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/packages`);
      const result = await response.json();

      if (response.ok && result.status === 200) {
        setPackages(result.data || []);
      } else {
        setError(result.message || "Failed to fetch packages");
      }
    } catch (err) {
      // console.error("Packages Error:", err);
      setError("Something went wrong while fetching packages");
    } finally {
      setLoading(false);
    }
  };

  // Create booking via API
  const createBooking = async (bookingData) => {
    try {
      setBookingLoading(true);
      setBookingError(null);

      // Transform the booking data to match API format
      const apiPayload = {
        package_id: bookingData.packageId,
        full_name: bookingData.fullName,
        email: bookingData.email,
        phone: bookingData.phone,
        event_date: bookingData.eventDate,
        event_time: bookingData.eventTime,
        participants: parseInt(bookingData.numberOfParticipants),
        status: "Pending",
        special_requests: bookingData.specialRequests || "",
        terms_accepted: bookingData.agreeToTerms,
        create_audit_id: 1
      };

      // console.log("Sending booking request:", apiPayload);

      const response = await fetch("https://acsqat.in/fnf_backend/api/client/plan-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      const result = await response.json();

      if (response.ok && result.status === 201) {
        console.log("Booking created successfully:", result);
        return {
          success: true,
          data: result.data,
          message: result.message || "Booking created successfully"
        };
      } else {
        const errorMessage = result.message || "Failed to create booking";
        setBookingError(errorMessage);
        return {
          success: false,
          error: errorMessage
        };
      }
    } catch (err) {
      // console.error("Booking Error:", err);
      const errorMessage = "Something went wrong while creating the booking. Please try again.";
      setBookingError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setBookingLoading(false);
    }
  };

  // Clear booking error
  const clearBookingError = () => {
    setBookingError(null);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <EventPackagesContext.Provider
      value={{
        packages,
        loading,
        error,
        IMGUrl,
        refetchPackages: fetchPackages,
        createBooking,
        bookingLoading,
        bookingError,
        clearBookingError,
      }}
    >
      {children}
    </EventPackagesContext.Provider>
  );
};

export const useEventPackages = () => {
  const context = useContext(EventPackagesContext);
  if (!context) {
    throw new Error("useEventPackages must be used within an EventPackagesProvider");
  }
  return context;
};
