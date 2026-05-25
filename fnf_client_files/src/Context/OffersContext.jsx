import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL, IMGUrl } from '../config/apiconfig';

const OffersContext = createContext();

export const useOffers = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error('useOffers must be used within an OffersProvider');
  }
  return context;
};

export const OffersProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fixed API endpoint to use /client/offers
      const response = await fetch(`${BASE_URL}/offers`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('OffersContext - getOffers response:', result);

      if (result.status === 200 && result.data) {
        setOffers(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch offers');
      }
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError(err.message);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Helper function to get active offers
  const getActiveOffers = () => {
    return offers.filter(offer => offer.status === 'Active');
  };

  // Helper function to get active offer images
  const getActiveOfferImages = () => {
    const activeOffers = getActiveOffers();
    return activeOffers
      .filter(offer => offer.image)
      .map(offer => ({
        id: offer.id,
        name: offer.name,
        image: `${IMGUrl}/${offer.image}`,
        discount: offer.discount,
        type: offer.type,
        startDate: offer.start_date,
        endDate: offer.end_date
      }));
  };

  // Helper function to get the current active offer (first one or based on date)
  const getCurrentActiveOffer = () => {
    const activeOffers = getActiveOffers();
    if (activeOffers.length === 0) return null;

    // You can add logic here to select based on current date, priority, etc.
    // For now, return the first active offer
    const offer = activeOffers[0];
    return offer.image ? {
      id: offer.id,
      name: offer.name,
      image: `${IMGUrl}/${offer.image}`,
      discount: offer.discount,
      type: offer.type,
      startDate: offer.start_date,
      endDate: offer.end_date
    } : null;
  };

  // Helper function to check if there are any active offers
  const hasActiveOffers = () => {
    return getActiveOffers().length > 0;
  };

  // Helper function to get offer by ID
  const getOfferById = (id) => {
    const offer = offers.find(offer => offer.id === id);
    if (!offer) return null;

    return {
      ...offer,
      image: offer.image ? `${IMGUrl}/${offer.image}` : null
    };
  };

  // Fixed helper function to check if an offer is currently valid (within date range)
  const isOfferValid = (offer) => {
    if (!offer.start_date || !offer.end_date) return true;

    const now = new Date();

    // Parse DD-MM-YYYY format correctly
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split('-');
      return new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    };

    try {
      const startDate = parseDate(offer.start_date);
      const endDate = parseDate(offer.end_date);

      // Set time to end of day for end date comparison
      endDate.setHours(23, 59, 59, 999);

      return now >= startDate && now <= endDate;
    } catch (error) {
      console.error('Error parsing dates for offer:', offer.id, error);
      return true; // Default to valid if parsing fails
    }
  };

  // Helper function to get valid active offers (active status + within date range)
  const getValidActiveOffers = () => {
    const activeOffers = getActiveOffers();
    const validOffers = activeOffers.filter(offer => isOfferValid(offer));

    // Return offers with properly constructed image URLs
    return validOffers.map(offer => ({
      ...offer,
      image: offer.image ? `${IMGUrl}/${offer.image}` : null
    }));
  };

  // Helper function to get the best current offer
  const getBestCurrentOffer = () => {
    const validOffers = getValidActiveOffers();
    if (validOffers.length === 0) return null;

    // Sort by discount percentage (highest first) or by end date (closest first)
    const sortedOffers = validOffers.sort((a, b) => {
      // Extract numeric value from discount string (e.g., "50%" -> 50)
      const getDiscountValue = (discount) => {
        const numericValue = parseInt(discount.replace(/[^\d]/g, '')) || 0;
        return numericValue;
      };

      const discountA = getDiscountValue(a.discount);
      const discountB = getDiscountValue(b.discount);
      return discountB - discountA;
    });

    const offer = sortedOffers[0];
    return {
      id: offer.id,
      name: offer.name,
      image: offer.image, // Already constructed in getValidActiveOffers
      discount: offer.discount,
      type: offer.type,
      startDate: offer.start_date,
      endDate: offer.end_date
    };
  };

  const value = {
    offers,
    loading,
    error,
    IMGUrl,
    getActiveOffers,
    getActiveOfferImages,
    getCurrentActiveOffer,
    getBestCurrentOffer,
    hasActiveOffers,
    getOfferById,
    isOfferValid,
    getValidActiveOffers,
    refetch: fetchOffers
  };

  return (
    <OffersContext.Provider value={value}>
      {children}
    </OffersContext.Provider>
  );
};

export default OffersContext;
