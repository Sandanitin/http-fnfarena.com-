"use client";
import { createContext, useContext, useState } from "react";
import { BASE_URL } from "../config/apiConfig";

const EventMediaContext = createContext();

export const EventMediaProvider = ({ children }) => {
  const [eventMedia, setEventMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEventMedia = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${BASE_URL}/events-media`
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch events media");
      }

      // 🔥 Normalize API response
      const formattedData = result.data.map((item) => ({
        ...item,
        gallery_images: item.gallery_images
          ? JSON.parse(item.gallery_images)
          : [],
        videos: item.videos
          ? JSON.parse(item.videos)
          : [],
        video_label: item.video_label
          ? JSON.parse(item.video_label)
          : []
      }));

      setEventMedia(formattedData);
      return formattedData;
    } catch (err) {
      // console.error("Event media error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventMediaContext.Provider
      value={{
        eventMedia,
        loading,
        error,
        fetchEventMedia
      }}
    >
      {children}
    </EventMediaContext.Provider>
  );
};

export const useEventMedia = () => useContext(EventMediaContext);
