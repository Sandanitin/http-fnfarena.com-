import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL, IMGUrl } from '../config/apiconfig';

const ArenaActivitiesContext = createContext();

export const useArenaActivities = () => {
  const context = useContext(ArenaActivitiesContext);
  if (!context) {
    throw new Error('useArenaActivities must be used within an ArenaActivitiesProvider');
  }
  return context;
};

export const ArenaActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
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
      // console.error('Error fetching arena activities data:', err);
      setError(err.message);
      // Set fallback data in case of error
      setActivities([]);
      setActivityTypes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  // Helper function to get activity type by ID
  const getActivityTypeById = (id) => {
    return activityTypes.find(type => type.id === id);
  };

  const value = {
    activities,
    activityTypes,
    loading,
    error,
    getSlidesData,
    getActivityById,
    getActivitiesByType,
    getActivityTypeById,
    refetch: fetchData
  };

  return (
    <ArenaActivitiesContext.Provider value={value}>
      {children}
    </ArenaActivitiesContext.Provider>
  );
};

export default ArenaActivitiesContext;
