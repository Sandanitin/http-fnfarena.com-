import { useEventData } from '../Context/EventDataContext';

// Custom hook for easy access to specific event data
export const useSpecificEvent = (eventType) => {
  const {
    getEventByType,
    getEventReviews,
    getEventDetails,
    getEventMetrics,
    getEventMedia,
    getMainImage,
    getLandingImage,
    getGalleryImages,
    getEventVideos,
    getAverageRating,
    getReviewCount,
    hasCompleteData,
    getEventPackages,
    loading,
    error
  } = useEventData();

  const event = getEventByType(eventType);

  return {
    // Basic event info
    event,
    isLoading: loading,
    error,
    exists: !!event,

    // Event data
    reviews: getEventReviews(eventType),
    details: getEventDetails(eventType),
    metrics: getEventMetrics(eventType),
    media: getEventMedia(eventType),

    // Media URLs
    mainImage: getMainImage(eventType),
    landingImage: getLandingImage(eventType),
    galleryImages: getGalleryImages(eventType),
    videos: getEventVideos(eventType),

    // Computed values
    averageRating: getAverageRating(eventType),
    reviewCount: getReviewCount(eventType),
    packages: getEventPackages(eventType),
    dataCompleteness: hasCompleteData(eventType)
  };
};

// Hook for Birthday events specifically
export const useBirthday = () => useSpecificEvent('Birthday');

// Hook for Corporate events specifically
export const useCorporate = () => useSpecificEvent('Corporate');

// Hook for Event Space specifically
export const useEventSpace = () => useSpecificEvent('Event Space');

// Utility functions for working with event data

/**
 * Format event type name for URL-safe routing
 */
export const formatEventTypeForUrl = (eventType) => {
  return eventType
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Parse event type from URL format
 */
export const parseEventTypeFromUrl = (urlName) => {
  // Map of URL formats to actual event type names
  const urlToTypeMap = {
    'birthday': 'Birthday',
    'corporate': 'Corporate',
    'Corporate': 'Corporate',
    'event-space': 'Event Space'
  };

  return urlToTypeMap[urlName] || null;
};

/**
 * Get event route path
 */
export const getEventRoute = (eventType) => {
  const urlName = formatEventTypeForUrl(eventType);
  return `/events/${urlName}`;
};

/**
 * Calculate rating distribution for events
 */
export const calculateEventRatingDistribution = (reviews) => {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  reviews.forEach(review => {
    const rating = parseInt(review.rating);
    if (rating >= 1 && rating <= 5) {
      distribution[rating]++;
    }
  });

  return distribution;
};

/**
 * Get rating percentage for each star for events
 */
export const getEventRatingPercentages = (reviews) => {
  const distribution = calculateEventRatingDistribution(reviews);
  const total = reviews.length;

  if (total === 0) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  return {
    1: Math.round((distribution[1] / total) * 100),
    2: Math.round((distribution[2] / total) * 100),
    3: Math.round((distribution[3] / total) * 100),
    4: Math.round((distribution[4] / total) * 100),
    5: Math.round((distribution[5] / total) * 100)
  };
};

/**
 * Format event metrics value with suffix
 */
export const formatEventMetricValue = (value, suffix) => {
  if (!value) return '0';
  return `${value}${suffix || ''}`;
};

/**
 * Get event package by index
 */
export const getEventPackageByIndex = (eventType, packageIndex, eventData) => {
  const packages = eventData?.getEventPackages(eventType) || [];
  return packages[packageIndex] || null;
};

/**
 * Check if event has minimum required data
 */
export const hasMinimumEventData = (event) => {
  return !!(
    event &&
    event.eventType &&
    event.media &&
    event.media.main_image
  );
};

/**
 * Get event completion score (0-100)
 */
export const getEventCompletionScore = (event) => {
  if (!event) return 0;

  let score = 0;
  const maxScore = 100;

  // Basic info (20 points)
  if (event.eventType) score += 20;

  // Media (30 points)
  if (event.media) {
    if (event.media.main_image) score += 10;
    if (event.media.landing_image) score += 8;
    if (event.media.gallery_images) score += 7;
    if (event.media.videos) score += 5;
  }

  // Details (25 points)
  if (event.details) {
    score += 25;
  }

  // Reviews (15 points)
  if (event.reviews && event.reviews.length > 0) {
    score += 15;
  }

  // Metrics (10 points)
  if (event.metrics) {
    score += 10;
  }

  return Math.min(score, maxScore);
};

/**
 * Sort events by completion score
 */
export const sortEventsByCompleteness = (events) => {
  return [...events].sort((a, b) =>
    getEventCompletionScore(b) - getEventCompletionScore(a)
  );
};

/**
 * Get random events for recommendations
 */
export const getRandomEvents = (events, count = 2, excludeType = null) => {
  const filtered = events.filter(event =>
    event.eventType !== excludeType && event.media
  );

  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Format date for display
 */
export const formatEventDate = (dateString) => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncateEventText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export default useSpecificEvent;
