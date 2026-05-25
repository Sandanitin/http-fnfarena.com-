"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/apiConfig";

const BirthdayBookingContext = createContext();

export const BirthdayBookingProvider = ({ children }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [timeSlotsLoading, setTimeSlotsLoading] = useState(true);
  const [timeSlotsError, setTimeSlotsError] = useState(null);

  // Fetch time slots from API
  const fetchTimeSlots = async () => {
    try {
      setTimeSlotsLoading(true);
      setTimeSlotsError(null);

      const response = await fetch("https://acsqat.in/fnf_backend/api/client/event-time-slots");
      const result = await response.json();

      if (response.ok && result.status === 200) {
        // Filter time slots for Birthday events that are Active
        const birthdayTimeSlots = result.data.filter(slot =>
          slot.event_type_id === "1" &&
          slot.event_type_name === "Birthday" &&
          slot.status === "Active"
        );

        // Format time slots for display
        const formattedTimeSlots = birthdayTimeSlots.map(slot => {
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
            id: slot.id,
            value: `${startTime} - ${endTime}`,
            label: `${startTime} - ${endTime}`,
            startTime: slot.start_time,
            endTime: slot.end_time
          };
        });

        setTimeSlots(formattedTimeSlots);
      } else {
        setTimeSlotsError("Failed to fetch time slots");
      }
    } catch (error) {
      // console.error("Time slots fetch error:", error);
      setTimeSlotsError("Something went wrong while fetching time slots");
    } finally {
      setTimeSlotsLoading(false);
    }
  };

  // Fetch time slots on component mount
  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const createBooking = async (payload) => {
    const res = await fetch(`${BASE_URL}/birthday-bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Booking failed");
    }

    return data;
  };

  return (
    <BirthdayBookingContext.Provider
      value={{
        createBooking,
        timeSlots,
        timeSlotsLoading,
        timeSlotsError,
        refetchTimeSlots: fetchTimeSlots
      }}
    >
      {children}
    </BirthdayBookingContext.Provider>
  );
};

export const useBirthdayBooking = () => useContext(BirthdayBookingContext);
