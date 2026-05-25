import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL } from '../config/apiconfig';

const GoKartGridContext = createContext();

export const useGoKartGrid = () => {
  const context = useContext(GoKartGridContext);
  if (!context) {
    throw new Error('useGoKartGrid must be used within a GoKartGridProvider');
  }
  return context;
};

export const GoKartGridProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both categories and activity types
      const [categoriesResponse, activityTypesResponse] = await Promise.all([
        fetch(`${BASE_URL}/categories`),
        fetch(`${BASE_URL}/activity-types`)
      ]);

      if (!categoriesResponse.ok) {
        throw new Error(`Categories API error! status: ${categoriesResponse.status}`);
      }

      if (!activityTypesResponse.ok) {
        throw new Error(`Activity Types API error! status: ${activityTypesResponse.status}`);
      }

      const categoriesResult = await categoriesResponse.json();
      const activityTypesResult = await activityTypesResponse.json();

      if (categoriesResult.status === 200 && categoriesResult.data) {
        // Filter only active categories
        const activeCategories = categoriesResult.data.filter(category => category.status === 'Active');
        setCategories(activeCategories);
      } else {
        throw new Error(categoriesResult.message || 'Failed to fetch categories');
      }

      if (activityTypesResult.status === 200 && activityTypesResult.data) {
        // Filter only active activity types
        const activeActivityTypes = activityTypesResult.data.filter(type => type.status === 'Active');
        setActivityTypes(activeActivityTypes);
      } else {
        throw new Error(activityTypesResult.message || 'Failed to fetch activity types');
      }
    } catch (err) {
      // console.error('Error fetching GoKartGrid data:', err);
      setError(err.message);
      // Set fallback data in case of error
      setCategories([]);
      setActivityTypes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper function to get activity types by category
  const getActivityTypesByCategory = (categoryId) => {
    if (!categoryId) return activityTypes;
    return activityTypes.filter(type => type.category_id === categoryId);
  };

  // Helper function to get category by ID
  const getCategoryById = (id) => {
    return categories.find(category => category.id === id);
  };

  // Helper function to get activity type by ID
  const getActivityTypeById = (id) => {
    return activityTypes.find(type => type.id === id);
  };

  // Helper function to search activity types
  const searchActivityTypes = (searchTerm, categoryId = null) => {
    let filteredTypes = categoryId
      ? getActivityTypesByCategory(categoryId)
      : activityTypes;

    if (searchTerm) {
      filteredTypes = filteredTypes.filter(type =>
        type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (type.description && type.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filteredTypes;
  };

  const value = {
    categories,
    activityTypes,
    loading,
    error,
    getActivityTypesByCategory,
    getCategoryById,
    getActivityTypeById,
    searchActivityTypes,
    refetch: fetchData
  };

  return (
    <GoKartGridContext.Provider value={value}>
      {children}
    </GoKartGridContext.Provider>
  );
};

export default GoKartGridContext;
