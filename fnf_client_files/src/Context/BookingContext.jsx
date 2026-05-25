"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/apiConfig";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [eventTypes, setEventTypes] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [participantRanges, setParticipantRanges] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------- Fetch Event Types ---------- */
  const fetchEventTypes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/corporate-event-types`);
      const json = await res.json();

      if (json?.status === 200 && Array.isArray(json?.data)) {
        setEventTypes(
          json.data
            .filter(item => item.status === "Active")
            .map(item => ({
              id: item.id,
              name: item.name
            }))
        );
      }
    } catch (err) {
      // console.error("Failed to fetch corporate event types", err);
      setError("Unable to load event types");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Fetch Time Slots from Client API ---------- */
  const fetchTimeSlots = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://acsqat.in/fnf_backend/api/client/event-time-slots");
      const result = await response.json();

      if (response.ok && result.status === 200) {
        // Filter time slots for Corporate events that are Active
        const corporateTimeSlots = result.data.filter(slot =>
          slot.event_type_id === "2" &&
          slot.event_type_name === "Corporate" &&
          slot.status === "Active"
        );

        // console.log("Filtered Corporate Time Slots:", corporateTimeSlots);

        // Format time slots for display
        const formattedTimeSlots = corporateTimeSlots.map(slot => {
          // Convert 24-hour format to 12-hour format with AM/PM
          const formatTime = (time) => {
            const [hours, minutes] = time.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            return `${displayHour}:${minutes} ${ampm}`;
          };

          const startTime = formatTime(slot.start_time);
          const endTime = formatTime(slot.end_time);

          return {
            id: parseInt(slot.id),
            value: `${startTime} - ${endTime}`,
            label: `${startTime} - ${endTime}`,
            startTime: slot.start_time,
            endTime: slot.end_time,
            eventTypeId: slot.event_type_id,
            eventTypeName: slot.event_type_name
          };
        });

        setTimeSlots(formattedTimeSlots);
        // console.log("Formatted Time Slots:", formattedTimeSlots);
      } else {
        setError("Failed to fetch time slots");
      }
    } catch (err) {
      // console.error("Failed to fetch corporate time slots", err);
      setError("Unable to load time slots");
    } finally {
      setLoading(false);
    }
  };

  //   ParticipationRange
  const fetchParticipantRanges = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/corporate-participant-ranges`
      );
      const json = await res.json();

      if (json?.status === 200 && Array.isArray(json?.data)) {
        setParticipantRanges(
          json.data
            .filter(item => item.status === "Active")
            .map(item => ({
              id: item.id,
              label: `${item.min_participants} - ${item.max_participants} people`,
              min: item.min_participants,
              max: item.max_participants
            }))
        );
      }
    } catch (err) {
      // console.error("Failed to fetch participant ranges", err);
      setError("Unable to load participant ranges");
    } finally {
      setLoading(false);
    }
  };

  // Corporate Booking
  const createCorporateBooking = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      // console.log("📦 Sending corporate booking payload:", payload);

      const res = await fetch(
        `${BASE_URL}/corporate-bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      // console.log("📨 Backend response:", data);

      if (!res.ok) {
        throw new Error(data?.message || `HTTP ${res.status}: ${JSON.stringify(data)}`);
      }

      if (data.status !== 200 && data.status !== 201) {
        throw new Error(data?.message || "Booking creation failed");
      }

      return data;
    } catch (err) {
      // console.error("Corporate booking error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventTypes();
    fetchTimeSlots();
    fetchParticipantRanges();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        eventTypes,
        timeSlots,
        participantRanges,
        createCorporateBooking,
        loading,
        error,
        refetchEventTypes: fetchEventTypes,
        refetchTimeSlots: fetchTimeSlots
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }
  return context;
};
