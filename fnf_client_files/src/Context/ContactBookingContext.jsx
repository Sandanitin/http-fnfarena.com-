"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

const ContactBookingContext = createContext(null);

export const ContactBookingProvider = ({ children }) => {
  const [eventTypes, setEventTypes] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  // Create combined options from eventTypes and activityTypes
  const combinedOptions = useMemo(() => {
    const events = (eventTypes || []).map(event => ({
      ...event,
      type: 'event'
    }));

    const activities = (activityTypes || []).map(activity => ({
      ...activity,
      type: 'activity'
    }));

    return [...events, ...activities];
  }, [eventTypes, activityTypes]);

  // Fetch event types from API
  const fetchEventTypes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://acsqat.in/fnf_backend/api/client/event-types");
      const result = await response.json();

      if (response.ok && result.status === 200) {
        setEventTypes(result.data || []);
      } else {
        setError(result.message || "Failed to fetch event types");
      }
    } catch (err) {
      // console.error("Event Types Error:", err);
      setError("Something went wrong while fetching event types");
    } finally {
      setLoading(false);
    }
  };

  // Fetch activity types from API
  const fetchActivityTypes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://acsqat.in/fnf_backend/api/client/activity-types");
      const result = await response.json();

      if (response.ok && result.status === 200) {
        // Filter only active activities
        const activeActivities = result.data.filter(activity => activity.status === "Active");
        setActivityTypes(activeActivities || []);
      } else {
        setError(result.message || "Failed to fetch activity types");
      }
    } catch (err) {
      // console.error("Activity Types Error:", err);
      setError("Something went wrong while fetching activity types");
    } finally {
      setLoading(false);
    }
  };

  // Create booking via API
  const createBooking = async (bookingData) => {
    try {
      setBookingLoading(true);
      setBookingError(null);

      // Convert date from YYYY-MM-DD to DD-MM-YYYY format
      const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
      };

      // Transform the booking data to match API format
      const apiPayload = {
        user_name: bookingData.userName,
        activity_id: bookingData.activityId, // This contains the activity/event name
        email: bookingData.email,
        phone: bookingData.phone,
        group_size: bookingData.groupSize,
        message: bookingData.message,
        event_date: formatDate(bookingData.eventDate),
        event_time: bookingData.eventTime,
        duration_hours: `${bookingData.durationHours} hrs`
      };

      // console.log("Sending booking request:", apiPayload);

      const response = await fetch("https://acsqat.in/fnf_backend/api/client/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      const result = await response.json();

      if (response.ok && result.status === 201) {
        // console.log("Booking created successfully:", result);
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

  // Clear general error
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    fetchEventTypes();
    fetchActivityTypes();
  }, []);

  return (
    <ContactBookingContext.Provider
      value={{
        eventTypes,
        activityTypes,
        combinedOptions,
        loading,
        error,
        createBooking,
        bookingLoading,
        bookingError,
        clearBookingError,
        clearError,
        refetchEventTypes: fetchEventTypes,
        refetchActivityTypes: fetchActivityTypes,
      }}
    >
      {children}
    </ContactBookingContext.Provider>
  );
};

export const useContactBooking = () => {
  const context = useContext(ContactBookingContext);
  if (!context) {
    throw new Error("useContactBooking must be used within a ContactBookingProvider");
  }
  return context;
};
