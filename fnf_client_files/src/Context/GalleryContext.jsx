import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL,  IMGUrl } from '../config/apiconfig';

const GalleryContext = createContext();

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};

export const GalleryProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivityTypes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activity-types`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.status === 200 && result.data) {
        setActivityTypes(result.data);
      }
    } catch (err) {
      // console.error('Error fetching activity types:', err);
      setActivityTypes([]);
    }
  };

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both activities and activity types
      const [activitiesResponse, typesResponse] = await Promise.all([
        fetch(`${BASE_URL}/activity-media`),
        fetch(`${BASE_URL}/activity-types`)
      ]);

      if (!activitiesResponse.ok) {
        throw new Error(`HTTP error! status: ${activitiesResponse.status}`);
      }

      const activitiesResult = await activitiesResponse.json();

      if (activitiesResult.status === 200 && activitiesResult.data) {
        setActivities(activitiesResult.data);
      } else {
        throw new Error(activitiesResult.message || 'Failed to fetch activities');
      }

      if (typesResponse.ok) {
        const typesResult = await typesResponse.json();
        if (typesResult.status === 200 && typesResult.data) {
          setActivityTypes(typesResult.data);
        }
      }
    } catch (err) {
      // console.error('Error fetching activities:', err);
      setError(err.message);
      // Set fallback data in case of error
      setActivities([]);
      setActivityTypes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Helper function to get main images for hero carousel
  const getHeroImages = () => {
    if (!activities || activities.length === 0) {
      // Fallback images if API fails
      return [
        "https://cdn.acsdev.in/FNF/hero1.png",
        "https://cdn.acsdev.in/FNF/hero1-2.png",
        "https://cdn.acsdev.in/FNF/hero2-1.png",
        "https://cdn.acsdev.in/FNF/hero2-2.png",
      ];
    }

    return activities
      .filter(activity => activity.main_image && activity.status === 'Active')
      .map(activity => `${IMGUrl}/${activity.main_image}`)
      .slice(0, 4); // Limit to 4 images for hero carousel
  };

  // Helper function to get activity by ID
  const getActivityById = (id) => {
    return activities.find(activity => activity.id === id);
  };

  // Helper function to get activities by type
  const getActivitiesByType = (activityTypeName) => {
    return activities.filter(activity =>
      activity.activity_type_name.toLowerCase() === activityTypeName.toLowerCase() &&
      activity.status === 'Active'
    );
  };

  // Helper function to get all gallery images
  const getAllGalleryImages = () => {
    const allImages = [];
    activities.forEach(activity => {
      if (activity.gallery_images && activity.status === 'Active') {
        try {
          const galleryImages = JSON.parse(activity.gallery_images);
          galleryImages.forEach(image => {
            allImages.push(`${IMGUrl}/${image}`);
          });
        } catch (e) {
          // console.warn('Error parsing gallery images for activity:', activity.id);
        }
      }
    });
    return allImages;
  };

  // Helper function to get videos
  const getActivityVideos = (activityId) => {
    const activity = getActivityById(activityId);
    if (!activity || !activity.videos || activity.status !== 'Active') return [];

    try {
      return JSON.parse(activity.videos).map(video => ({
        ...video,
        url: `${IMGUrl}/${video.video}`
      }));
    } catch (e) {
      // console.warn('Error parsing videos for activity:', activityId);
      return [];
    }
  };

  // Helper function to get landing image
  const getLandingImage = (activityId) => {
    const activity = getActivityById(activityId);
    if (!activity || !activity.landing_image || activity.status !== 'Active') return null;
    return `${IMGUrl}/${activity.landing_image}`;
  };

  // Helper function to get main image
  const getMainImage = (activityId) => {
    const activity = getActivityById(activityId);
    if (!activity || !activity.main_image || activity.status !== 'Active') return null;
    return `${IMGUrl}/${activity.main_image}`;
  };

  // Helper function to get gallery images for specific activity
  const getActivityGalleryImages = (activityId) => {
    const activity = getActivityById(activityId);
    if (!activity || !activity.gallery_images || activity.status !== 'Active') return [];

    try {
      const galleryImages = JSON.parse(activity.gallery_images);
      return galleryImages.map(image => `${IMGUrl}/${image}`);
    } catch (e) {
      // console.warn('Error parsing gallery images for activity:', activityId);
      return [];
    }
  };

  // Helper function to get slides data for ArenaActivities
  const getSlidesData = () => {
    if (!activities || !activityTypes || activities.length === 0) {
      return [];
    }

    // Group activities by activity_type_id and get one representative from each type
    const activityTypeMap = new Map();

    activities
      .filter(activity => activity.status === 'Active' && activity.main_image)
      .forEach(activity => {
        const typeId = activity.activity_type_id;
        if (!activityTypeMap.has(typeId)) {
          activityTypeMap.set(typeId, activity);
        }
      });

    // Map to slides format
    const slides = Array.from(activityTypeMap.values()).map(activity => {
      const activityType = activityTypes.find(type =>
        type.id === activity.activity_type_id && type.status === 'Active'
      );

      return {
        image: `${IMGUrl}/${activity.main_image}`,
        title: activityType ? activityType.name : activity.activity_type_name,
        text: activityType && activityType.description
          ? activityType.description
          : `Experience the thrill of ${activityType ? activityType.name : activity.activity_type_name}`,
        activityTypeId: activity.activity_type_id,
        activityId: activity.id
      };
    });

    return slides;
  };

  const value = {
    activities,
    activityTypes,
    loading,
    error,
    IMGUrl: IMGUrl,
    getHeroImages,
    getActivityById,
    getActivitiesByType,
    getAllGalleryImages,
    getActivityVideos,
    getLandingImage,
    getMainImage,
    getActivityGalleryImages,
    getSlidesData,
    refetch: fetchActivities
  };

  return (
    <GalleryContext.Provider value={value}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContext;
