// Utility functions for working with activity data

/**
 * Format activity name for URL-safe routing
 */
export const formatActivityNameForUrl = (activityName) => {
  return activityName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Parse activity name from URL format
 */
export const parseActivityNameFromUrl = (urlName) => {
  // Map of URL formats to actual activity names
  const urlToNameMap = {
    'go-karting': 'Go Karting',
    'rocket-ejection': 'Rocket Ejection',
    'sky-roller': 'Sky Roller',
    'sky-cycle': 'Sky Cycle',
    'zipline-roller': 'Zipline Roller Coaster',
    'target-zone': 'Target Zone',
    'drifters-bumping-cars': 'Drifters & Bumping Cars',
    'paintball-arena': 'Paintball Arena',
    'arcade-games': 'Arcade Games',
    'softplay-trampoline-bull-ride': 'Softplay & Trampoline & Bull Ride',
    'laser-tag': 'Laser tag',
    'bowling': 'Bowling'
  };

  return urlToNameMap[urlName] || null;
};

/**
 * Get activity route path
 */
export const getActivityRoute = (activityName) => {
  const urlName = formatActivityNameForUrl(activityName);
  return `/activities/${urlName}`;
};

/**
 * Calculate rating distribution
 */
export const calculateRatingDistribution = (reviews) => {
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
 * Get rating percentage for each star
 */
export const getRatingPercentages = (reviews) => {
  const distribution = calculateRatingDistribution(reviews);
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
 * Format metrics value with suffix
 */
export const formatMetricValue = (value, suffix) => {
  if (!value) return '0';
  return `${value}${suffix || ''}`;
};

/**
 * Get activity status badge color
 */
export const getStatusBadgeColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-500 text-white';
    case 'inactive':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
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
 * Get random activities for recommendations
 */
export const getRandomActivities = (activities, count = 3, excludeId = null) => {
  const filtered = activities.filter(activity =>
    activity.id !== excludeId && activity.media
  );

  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Check if activity has minimum required data
 */
export const hasMinimumData = (activity) => {
  return !!(
    activity &&
    activity.name &&
    activity.description &&
    activity.media &&
    activity.media.main_image
  );
};

/**
 * Get activity completion score (0-100)
 */
export const getActivityCompletionScore = (activity) => {
  if (!activity) return 0;

  let score = 0;
  const maxScore = 100;

  // Basic info (20 points)
  if (activity.name) score += 5;
  if (activity.description) score += 5;
  if (activity.category_name) score += 5;
  if (activity.status === 'Active') score += 5;

  // Media (25 points)
  if (activity.media) {
    if (activity.media.main_image) score += 8;
    if (activity.media.landing_image) score += 7;
    if (activity.media.gallery_images) score += 5;
    if (activity.media.videos) score += 5;
  }

  // Details (15 points)
  if (activity.details && activity.details.length > 0) {
    score += 15;
  }

  // Protocols (15 points)
  if (activity.protocols && activity.protocols.length > 0) {
    score += 15;
  }

  // Reviews (15 points)
  if (activity.reviews && activity.reviews.length > 0) {
    score += 15;
  }

  // Metrics (10 points)
  if (activity.metrics) {
    score += 10;
  }

  return Math.min(score, maxScore);
};

/**
 * Sort activities by completion score
 */
export const sortActivitiesByCompleteness = (activities) => {
  return [...activities].sort((a, b) =>
    getActivityCompletionScore(b) - getActivityCompletionScore(a)
  );
};

export default {
  formatActivityNameForUrl,
  parseActivityNameFromUrl,
  getActivityRoute,
  calculateRatingDistribution,
  getRatingPercentages,
  formatMetricValue,
  getStatusBadgeColor,
  truncateText,
  formatDate,
  getRandomActivities,
  hasMinimumData,
  getActivityCompletionScore,
  sortActivitiesByCompleteness
};
