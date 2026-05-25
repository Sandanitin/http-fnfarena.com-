import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL, UPLOAD_URL, IMGUrl } from '../config/apiconfig';

const ActivityDataContext = createContext();

export const useActivityData = () => {
  const context = useContext(ActivityDataContext);
  if (!context) {
    throw new Error('useActivityData must be used within an ActivityDataProvider');
  }
  return context;
};

// Legacy hook for backward compatibility
export const useGallery = () => {
  return useActivityData();
};

export const ActivityDataProvider = ({ children }) => {
  const [activityTypes, setActivityTypes] = useState([]);
  const [activityProtocols, setActivityProtocols] = useState([]);
  const [activityReviews, setActivityReviews] = useState([]);
  const [activityDetails, setActivityDetails] = useState([]);
  const [activityMetrics, setActivityMetrics] = useState([]);
  const [activityMedia, setActivityMedia] = useState([]);
  const [normalizedData, setNormalizedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  // Target activity names that we want to track
  const targetActivities = [
    'Go Karting',
    'Rocket Ejection',
    'Sky Roller',
    'Sky Cycle',
    'Zipline Roller Coaster',
    'Target Zone',
    'Drifters & Bumping Cars',
    'Paintball Arena',
    'Arcade Games',
    'Softplay & Trampoline & Bull Ride',
    'Laser tag',
    'Bowling'
  ];

  const fetchAllActivityData = async () => {
    if (dataFetched) return; // Prevent re-fetching if data already exists

    try {
      setLoading(true);
      setError(null);

      // Fetch all APIs simultaneously
      const [
        typesResponse,
        protocolsResponse,
        reviewsResponse,
        detailsResponse,
        metricsResponse,
        mediaResponse
      ] = await Promise.all([
        fetch(`${BASE_URL}/activity-types`),
        fetch(`${BASE_URL}/activity-protocols`),
        fetch(`${BASE_URL}/activity-reviews`),
        fetch(`${BASE_URL}/activity-details`),
        fetch(`${BASE_URL}/activity-metrics`),
        fetch(`${BASE_URL}/activity-media`)
      ]);

      // Parse all responses
      const [
        typesResult,
        protocolsResult,
        reviewsResult,
        detailsResult,
        metricsResult,
        mediaResult
      ] = await Promise.all([
        typesResponse.json(),
        protocolsResponse.json(),
        reviewsResponse.json(),
        detailsResponse.json(),
        metricsResponse.json(),
        mediaResponse.json()
      ]);

      // Set individual data arrays
      const types = typesResult.status === 200 ? typesResult.data : [];
      const protocols = protocolsResult.status === 200 ? protocolsResult.data : [];
      const reviews = reviewsResult.status === 200 ? reviewsResult.data : [];
      const details = detailsResult.status === 200 ? detailsResult.data : [];
      const metrics = metricsResult.status === 200 ? metricsResult.data : [];
      const media = mediaResult.status === 200 ? mediaResult.data : [];

      setActivityTypes(types);
      setActivityProtocols(protocols);
      setActivityReviews(reviews);
      setActivityDetails(details);
      setActivityMetrics(metrics);
      setActivityMedia(media);

      // Create normalized data structure
      const normalized = {};

      // Start with activity types as the base
      types.forEach(type => {
        if (type.status === 'Active' && targetActivities.includes(type.name)) {
          normalized[type.id] = {
            id: type.id,
            name: type.name,
            description: type.description,
            category_id: type.category_id,
            category_name: type.category_name,
            status: type.status,
            protocols: [],
            reviews: [],
            details: [],
            metrics: null,
            media: null
          };
        }
      });

      // Map protocols by activity_id
      protocols.forEach(protocol => {
        if (protocol.status === 'Active' && normalized[protocol.activity_id]) {
          normalized[protocol.activity_id].protocols.push(protocol);
        }
      });

      // Map reviews by activity_id
      reviews.forEach(review => {
        if (review.status === 'Active' && normalized[review.activity_id]) {
          normalized[review.activity_id].reviews.push(review);
        }
      });

      // Map details by activity_id
      details.forEach(detail => {
        if (detail.status === 'Active' && normalized[detail.activity_id]) {
          normalized[detail.activity_id].details.push(detail);
        }
      });

      // Map metrics by activity_id
      metrics.forEach(metric => {
        if (metric.status === 'Active' && normalized[metric.activity_id]) {
          normalized[metric.activity_id].metrics = metric;
        }
      });

      // Map media by activity_type_id
      media.forEach(mediaItem => {
        if (mediaItem.status === 'Active' && normalized[mediaItem.activity_type_id]) {
          normalized[mediaItem.activity_type_id].media = mediaItem;
        }
      });

      setNormalizedData(normalized);
      setDataFetched(true);

    } catch (err) {
      // console.error('Error fetching activity data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllActivityData();
  }, []);

  // Helper function to get activity data by name
  const getActivityByName = (activityName) => {
    const activityId = Object.keys(normalizedData).find(id =>
      normalizedData[id].name.toLowerCase() === activityName.toLowerCase()
    );
    return activityId ? normalizedData[activityId] : null;
  };

  // Helper function to get activity data by ID
  const getActivityById = (activityId) => {
    return normalizedData[activityId] || null;
  };

  // Helper function to get all target activities
  const getAllTargetActivities = () => {
    return Object.values(normalizedData);
  };

  // Helper function to get activities by category
  const getActivitiesByCategory = (categoryName) => {
    return Object.values(normalizedData).filter(activity =>
      activity.category_name && activity.category_name.toLowerCase() === categoryName.toLowerCase()
    );
  };

  // Helper function to get activity protocols
  const getActivityProtocols = (activityName) => {
    const activity = getActivityByName(activityName);
    return activity ? activity.protocols : [];
  };

  // Helper function to get activity reviews
  const getActivityReviews = (activityName) => {
    const activity = getActivityByName(activityName);
    return activity ? activity.reviews : [];
  };

  // Helper function to get activity details
  const getActivityDetails = (activityName) => {
    const activity = getActivityByName(activityName);
    return activity ? activity.details : [];
  };

  // Helper function to get activity metrics
  const getActivityMetrics = (activityName) => {
    const activity = getActivityByName(activityName);
    return activity ? activity.metrics : null;
  };

  // Helper function to get activity media
  const getActivityMedia = (activityName) => {
    const activity = getActivityByName(activityName);
    return activity ? activity.media : null;
  };

  // Helper function to get main image
  const getMainImage = (activityName) => {
    const media = getActivityMedia(activityName);
    if (!media || !media.main_image) return null;
    return `${IMGUrl}/${media.main_image}`;
  };

  // Helper function to get landing image
  const getLandingImage = (activityName) => {
    const media = getActivityMedia(activityName);
    if (!media || !media.landing_image) return null;
    return `${IMGUrl}/${media.landing_image}`;
  };

  // Helper function to get gallery images
  const getGalleryImages = (activityName) => {
    const media = getActivityMedia(activityName);
    if (!media || !media.gallery_images) return [];

    try {
      const galleryImages = JSON.parse(media.gallery_images);
      return galleryImages.map(image => `${IMGUrl}/${image}`);
    } catch (e) {
      // console.warn('Error parsing gallery images for activity:', activityName);
      return [];
    }
  };

  // Helper function to get activity videos - UPDATED VERSION with YouTube support
  const getActivityVideos = (activityName) => {
    const media = getActivityMedia(activityName);
    if (!media) return [];

    const allVideos = [];

    // Process direct video files
    if (media.videos) {
      try {
        const videos = JSON.parse(media.videos);

        // Filter only actual video files (not images) and format them
        const validVideos = videos.filter(video => {
          if (!video.video) return false;

          // Check if it's actually a video file by extension
          const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.m4v'];
          const hasVideoExtension = videoExtensions.some(ext =>
            video.video.toLowerCase().includes(ext)
          );

          return hasVideoExtension;
        }).map(video => {
          // Handle label parsing - it might be a string or array
          let label = video.label;
          if (typeof label === 'string') {
            try {
              // Try to parse if it's a JSON string
              if (label.startsWith('[') && label.endsWith(']')) {
                label = JSON.parse(label);
              } else {
                label = [label];
              }
            } catch (e) {
              label = [label];
            }
          }

          if (!Array.isArray(label)) {
            label = [label];
          }

          return {
            ...video,
            url: `${IMGUrl}/${video.video}`,
            label: label,
            type: 'direct'
          };
        });

        allVideos.push(...validVideos);
      } catch (e) {
        // console.warn('Error parsing videos for activity:', activityName, e);
      }
    }

    // Process YouTube links
    if (media.links) {
      try {
        const links = JSON.parse(media.links);

        const youtubeVideos = links.map((link, index) => {
          // Extract YouTube video ID from various YouTube URL formats
          const getYouTubeVideoId = (url) => {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : null;
          };

          const videoId = getYouTubeVideoId(link);
          if (!videoId) return null;

          // Use video_label if available, otherwise generate default label
          let label = ['YouTube Video'];
          if (media.video_label) {
            try {
              const parsedLabels = JSON.parse(media.video_label);
              if (Array.isArray(parsedLabels) && parsedLabels[index]) {
                label = [parsedLabels[index]];
              } else if (typeof parsedLabels === 'string') {
                label = [parsedLabels];
              }
            } catch (e) {
              // If parsing fails, try to split by comma
              const labels = media.video_label.split(',').map(l => l.trim());
              if (labels[index]) {
                label = [labels[index]];
              }
            }
          }

          return {
            url: link,
            embedUrl: `https://www.youtube.com/embed/${videoId}`,
            videoId: videoId,
            label: label,
            type: 'youtube'
          };
        }).filter(video => video !== null);

        allVideos.push(...youtubeVideos);
      } catch (e) {
        // console.warn('Error parsing links for activity:', activityName, e);
      }
    }

    // console.log(`Found ${allVideos.length} total videos for ${activityName}:`, allVideos);
    return allVideos;
  };

  // Legacy compatibility functions
  const getHeroImages = () => {
    const heroImages = [];
    Object.values(normalizedData).forEach(activity => {
      if (activity.media && activity.media.main_image) {
        heroImages.push(`${IMGUrl}/${activity.media.main_image}`);
      }
    });

    if (heroImages.length === 0) {
      // Fallback images if no data
      return [
        "https://cdn.acsdev.in/FNF/hero1.png",
        "https://cdn.acsdev.in/FNF/hero1-2.png",
        "https://cdn.acsdev.in/FNF/hero2-1.png",
        "https://cdn.acsdev.in/FNF/hero2-2.png",
      ];
    }

    return heroImages.slice(0, 4);
  };

  const getAllGalleryImages = () => {
    const allImages = [];
    Object.values(normalizedData).forEach(activity => {
      const images = getGalleryImages(activity.name);
      allImages.push(...images);
    });
    return allImages;
  };

  const getSlidesData = () => {
    return Object.values(normalizedData).map(activity => ({
      image: activity.media ? `${IMGUrl}/${activity.media.main_image}` : null,
      title: activity.name,
      text: activity.description || `Experience the thrill of ${activity.name}`,
      activityTypeId: activity.id,
      activityId: activity.id
    })).filter(slide => slide.image);
  };

  // Legacy compatibility - map old function names
  const getActivitiesByType = (activityTypeName) => {
    const activity = getActivityByName(activityTypeName);
    return activity ? [activity] : [];
  };

  // Helper function to get average rating for an activity
  const getAverageRating = (activityName) => {
    const reviews = getActivityReviews(activityName);
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  // Helper function to get review count
  const getReviewCount = (activityName) => {
    const reviews = getActivityReviews(activityName);
    return reviews.length;
  };

  // Helper function to check if activity has complete data
  const hasCompleteData = (activityName) => {
    const activity = getActivityByName(activityName);
    if (!activity) return false;

    return {
      hasMedia: !!activity.media,
      hasDetails: activity.details.length > 0,
      hasProtocols: activity.protocols.length > 0,
      hasReviews: activity.reviews.length > 0,
      hasMetrics: !!activity.metrics
    };
  };

  // Helper function to get activity features
  const getActivityFeatures = (activityName) => {
    const details = getActivityDetails(activityName);
    if (details.length === 0) return [];

    const latestDetail = details[0]; // Get the most recent detail
    return [
      latestDetail.feature_1,
      latestDetail.feature_2,
      latestDetail.feature_3,
      latestDetail.feature_4
    ].filter(feature => feature && feature.trim() !== '');
  };

  const value = {
    // Raw data arrays
    activityTypes,
    activityProtocols,
    activityReviews,
    activityDetails,
    activityMetrics,
    activityMedia,

    // Normalized data
    normalizedData,

    // State
    loading,
    error,
    dataFetched,

    // Configuration
    IMGUrl,
    targetActivities,

    // Core helper functions
    getActivityByName,
    getActivityById,
    getAllTargetActivities,
    getActivitiesByCategory,

    // Data-specific helpers
    getActivityProtocols,
    getActivityReviews,
    getActivityDetails,
    getActivityMetrics,
    getActivityMedia,

    // Media helpers
    getMainImage,
    getLandingImage,
    getGalleryImages,
    getActivityVideos,

    // Utility helpers
    getAverageRating,
    getReviewCount,
    hasCompleteData,
    getActivityFeatures,

    // Legacy compatibility functions
    activities: activityMedia, // For backward compatibility
    getHeroImages,
    getAllGalleryImages,
    getSlidesData,
    getActivitiesByType,

    // Refresh function
    refetch: fetchAllActivityData
  };

  return (
    <ActivityDataContext.Provider value={value}>
      {children}
    </ActivityDataContext.Provider>
  );
};

// Export both new and legacy context
export const GalleryProvider = ActivityDataProvider;
export default ActivityDataContext;
