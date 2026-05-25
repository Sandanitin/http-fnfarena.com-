import { useActivityData } from '../Context/ActivityDataContext';

// Custom hook for easy access to specific activity data
export const useSpecificActivity = (activityName) => {
  const {
    getActivityByName,
    getActivityProtocols,
    getActivityReviews,
    getActivityDetails,
    getActivityMetrics,
    getActivityMedia,
    getMainImage,
    getLandingImage,
    getGalleryImages,
    getActivityVideos,
    getAverageRating,
    getReviewCount,
    hasCompleteData,
    getActivityFeatures,
    loading,
    error
  } = useActivityData();

  const activity = getActivityByName(activityName);

  return {
    // Basic activity info
    activity,
    isLoading: loading,
    error,
    exists: !!activity,

    // Activity data
    protocols: getActivityProtocols(activityName),
    reviews: getActivityReviews(activityName),
    details: getActivityDetails(activityName),
    metrics: getActivityMetrics(activityName),
    media: getActivityMedia(activityName),

    // Media URLs
    mainImage: getMainImage(activityName),
    landingImage: getLandingImage(activityName),
    galleryImages: getGalleryImages(activityName),
    videos: getActivityVideos(activityName),

    // Computed values
    averageRating: getAverageRating(activityName),
    reviewCount: getReviewCount(activityName),
    features: getActivityFeatures(activityName),
    dataCompleteness: hasCompleteData(activityName)
  };
};

// Hook for Go Karting specifically
export const useGoKarting = () => useSpecificActivity('Go Karting');

// Hook for Bowling specifically
export const useBowling = () => useSpecificActivity('Bowling');

// Hook for Laser Tag specifically
export const useLaserTag = () => useSpecificActivity('Laser tag');

// Hook for Paintball Arena specifically
export const usePaintballArena = () => useSpecificActivity('Paintball Arena');

// Hook for Arcade Games specifically
export const useArcadeGames = () => useSpecificActivity('Arcade Games');

// Hook for Sky Roller specifically
export const useSkyRoller = () => useSpecificActivity('Sky Roller');

// Hook for Sky Cycle specifically
export const useSkyCycle = () => useSpecificActivity('Sky Cycle');

// Hook for Zipline Roller specifically
export const useZiplineRoller = () => useSpecificActivity('Zipline Roller Coaster');

// Hook for Target Zone specifically
export const useTargetZone = () => useSpecificActivity('Target Zone');

// Hook for Drifters & Bumping Cars specifically
export const useDriftersAndBumpingCars = () => useSpecificActivity('Drifters & Bumping Cars');

// Hook for Softplay & Trampoline & Bull Ride specifically
export const useSoftplayTrampolineBullRide = () => useSpecificActivity('Softplay & Trampoline & Bull Ride');

// Hook for Rocker Ejection specifically
export const useRockerEjection = () => useSpecificActivity('Rocket Ejection');

export default useSpecificActivity;
