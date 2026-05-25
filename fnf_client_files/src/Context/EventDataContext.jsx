import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL, UPLOAD_URL, IMGUrl } from '../config/apiconfig';

const EventDataContext = createContext();

export const useEventData = () => {
  const context = useContext(EventDataContext);
  if (!context) {
    throw new Error('useEventData must be used within an EventDataProvider');
  }
  return context;
};

export const EventDataProvider = ({ children }) => {
  const [eventReviews, setEventReviews] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [eventMetrics, setEventMetrics] = useState([]);
  const [eventMedia, setEventMedia] = useState([]);
  const [normalizedEventData, setNormalizedEventData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  // Target event types that we want to track
  const targetEventTypes = [
    'Birthday',
    'Corporate', // Note: API uses "Corporate" spelling
    'Event Space'
  ];

  const fetchAllEventData = async () => {
    if (dataFetched) return; // Prevent re-fetching if data already exists

    try {
      setLoading(true);
      setError(null);

      // Fetch all APIs simultaneously
      const [
        reviewsResponse,
        detailsResponse,
        metricsResponse,
        mediaResponse
      ] = await Promise.all([
        fetch(`${BASE_URL}/events-reviews`),
        fetch(`${BASE_URL}/events-details`),
        fetch(`${BASE_URL}/events-metrics`),
        fetch(`${BASE_URL}/events-media`)
      ]);

      // Parse all responses
      const [
        reviewsResult,
        detailsResult,
        metricsResult,
        mediaResult
      ] = await Promise.all([
        reviewsResponse.json(),
        detailsResponse.json(),
        metricsResponse.json(),
        mediaResponse.json()
      ]);

      // Set individual data arrays
      const reviews = reviewsResult.status === 200 ? reviewsResult.data : [];
      const details = detailsResult.status === 200 ? detailsResult.data : [];
      const metrics = metricsResult.status === 200 ? metricsResult.data : [];
      const media = mediaResult.status === 200 ? mediaResult.data : [];

      setEventReviews(reviews);
      setEventDetails(details);
      setEventMetrics(metrics);
      setEventMedia(media);

      // Create normalized data structure by event type
      const normalized = {};

      // Initialize with target event types
      targetEventTypes.forEach(eventType => {
        normalized[eventType] = {
          eventType: eventType,
          reviews: [],
          details: null,
          metrics: null,
          media: null
        };
      });

      // Map reviews by event type (using occasion or event_type_name)
      reviews.forEach(review => {
        if (review.status === 'Active') {
          // Try to match by event_type_name first, then by occasion
          let eventType = review.event_type_name;
          if (!eventType && review.occasion) {
            // Map occasion to event type
            if (review.occasion.toLowerCase().includes('birthday')) {
              eventType = 'Birthday';
            } else if (review.occasion.toLowerCase().includes('corporate')) {
              eventType = 'Corporate';
            } else if (review.occasion.toLowerCase().includes('event')) {
              eventType = 'Event Space';
            }
          }

          if (eventType && normalized[eventType]) {
            normalized[eventType].reviews.push(review);
          }
        }
      });

      // Map details by event type
      details.forEach(detail => {
        if (detail.status === 'Active' && detail.event_name) {
          // Map event_name to our target event types
          let eventType = detail.event_name;
          if (eventType === 'Corporate') eventType = 'Corporate'; // Keep API spelling

          if (normalized[eventType]) {
            normalized[eventType].details = detail;
          }
        }
      });

      // Map metrics by event type
      metrics.forEach(metric => {
        if (metric.status === 'active' && metric.event_type_name) {
          const eventType = metric.event_type_name;
          if (normalized[eventType]) {
            normalized[eventType].metrics = metric;
          }
        }
      });

      // Map media by event type
      media.forEach(mediaItem => {
        if (mediaItem.status === 'Active' && mediaItem.event_type_name) {
          const eventType = mediaItem.event_type_name;
          if (normalized[eventType]) {
            normalized[eventType].media = mediaItem;
          }
        }
      });

      setNormalizedEventData(normalized);
      setDataFetched(true);

    } catch (err) {
      // console.error('Error fetching event data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEventData();
  }, []);

  // Helper function to get event data by type
  const getEventByType = (eventType) => {
    return normalizedEventData[eventType] || null;
  };

  // Helper function to get all event types
  const getAllEventTypes = () => {
    return Object.values(normalizedEventData);
  };

  // Helper function to get event reviews
  const getEventReviews = (eventType) => {
    const event = getEventByType(eventType);
    return event ? event.reviews : [];
  };

  // Helper function to get event details
  const getEventDetails = (eventType) => {
    const event = getEventByType(eventType);
    return event ? event.details : null;
  };

  // Helper function to get event metrics
  const getEventMetrics = (eventType) => {
    const event = getEventByType(eventType);
    return event ? event.metrics : null;
  };

  // Helper function to get event media
  const getEventMedia = (eventType) => {
    const event = getEventByType(eventType);
    return event ? event.media : null;
  };

  // Helper function to get main image
  const getMainImage = (eventType) => {
    const media = getEventMedia(eventType);
    if (!media || !media.main_image) return null;
    return `${IMGUrl}/${media.main_image}`;
  };

  // Helper function to get landing image
  const getLandingImage = (eventType) => {
    const media = getEventMedia(eventType);
    if (!media || !media.landing_image) return null;
    return `${IMGUrl}/${media.landing_image}`;
  };

  // Helper function to get gallery images
  const getGalleryImages = (eventType) => {
    const media = getEventMedia(eventType);
    if (!media || !media.gallery_images) return [];

    try {
      const galleryImages = JSON.parse(media.gallery_images);
      return galleryImages.map(image => `${IMGUrl}/${image}`);
    } catch (e) {
      // console.warn('Error parsing gallery images for event:', eventType);
      return [];
    }
  };

  // Helper function to get event videos
  const getEventVideos = (eventType) => {
    const media = getEventMedia(eventType);
    if (!media || !media.videos) return [];

    try {
      const videos = JSON.parse(media.videos);
      return videos.map(video => ({
        ...video,
        url: `${IMGUrl}/${video.video}`,
        label: Array.isArray(video.label) ? video.label :
               typeof video.label === 'string' ? JSON.parse(video.label) : [video.label]
      }));
    } catch (e) {
      // console.warn('Error parsing videos for event:', eventType);
      return [];
    }
  };

  // Helper function to get average rating for an event
  const getAverageRating = (eventType) => {
    const reviews = getEventReviews(eventType);
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  // Helper function to get review count
  const getReviewCount = (eventType) => {
    const reviews = getEventReviews(eventType);
    return reviews.length;
  };

  // Helper function to check if event has complete data
  const hasCompleteData = (eventType) => {
    const event = getEventByType(eventType);
    if (!event) return false;

    return {
      hasMedia: !!event.media,
      hasDetails: !!event.details,
      hasReviews: event.reviews.length > 0,
      hasMetrics: !!event.metrics
    };
  };

  // Helper function to get event packages (from details)
  const getEventPackages = (eventType) => {
    const details = getEventDetails(eventType);
    if (!details) return [];

    const packages = [];

    // Extract up to 3 packages from the details
    for (let i = 1; i <= 3; i++) {
      const title = details[`title${i}`];
      const description = details[`description${i}`];
      const image = details[`image${i}`];

      if (title && description) {
        packages.push({
          id: i,
          title,
          description,
          image: image ? `${IMGUrl}/${image}` : null,
          features: [
            details[`feature${i}_1`],
            details[`feature${i}_2`],
            details[`feature${i}_3`],
            details[`feature${i}_4`]
          ].filter(feature => feature && feature.trim() !== ''),
          size: details[`size${i}`],
          guestsCount: details[`guests_count${i}`],
          ageGroup: details[`age_group${i}`],
          duration: details[`duration${i}`]
        });
      }
    }

    return packages;
  };

  // Helper function to format event type for URL
  const formatEventTypeForUrl = (eventType) => {
    return eventType.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  // Helper function to parse event type from URL
  const parseEventTypeFromUrl = (urlName) => {
    const urlToTypeMap = {
      'birthday': 'Birthday',
      'corporate': 'Corporate',
      'Corporate': 'Corporate',
      'event-space': 'Event Space'
    };
    return urlToTypeMap[urlName] || null;
  };

  const value = {
    // Raw data arrays
    eventReviews,
    eventDetails,
    eventMetrics,
    eventMedia,

    // Normalized data
    normalizedEventData,

    // State
    loading,
    error,
    dataFetched,

    // Configuration
    IMGUrl,
    targetEventTypes,

    // Core helper functions
    getEventByType,
    getAllEventTypes,

    // Data-specific helpers
    getEventReviews,
    getEventDetails,
    getEventMetrics,
    getEventMedia,

    // Media helpers
    getMainImage,
    getLandingImage,
    getGalleryImages,
    getEventVideos,

    // Utility helpers
    getAverageRating,
    getReviewCount,
    hasCompleteData,
    getEventPackages,
    formatEventTypeForUrl,
    parseEventTypeFromUrl,

    // Refresh function
    refetch: fetchAllEventData
  };

  return (
    <EventDataContext.Provider value={value}>
      {children}
    </EventDataContext.Provider>
  );
};

export default EventDataContext;
