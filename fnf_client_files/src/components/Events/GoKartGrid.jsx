import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGallery } from "../../Context/GalleryContext";
import { useGoKartGrid } from "../../Context/GoKartGridContext";

export default function GoKartGrid() {
  const navigate = useNavigate();
  const { getMainImage, activities, IMGUrl } = useGallery();
  const {
    categories,
    activityTypes,
    loading: gridLoading,
    getActivityTypesByCategory,
    searchActivityTypes
  } = useGoKartGrid();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredCards, setFilteredCards] = useState([]);

  // Activity name to route mapping
  const activityRoutes = {
    "Go Karting": "/go-kart",
    "Bowling": "/bowling",
    "Laser tag": "/lasertag",
    "Softplay & Trampoline & Bull Ride": "/softplay-trampoline-bullride",
    "Arcade Games": "/arcade-games",
    "Paintball Arena": "/paintball-arena",
    "Drifters & Bumping Cars": "/drifters",
    "Target Zone": "/target-zone",
    "Zipline Roller Coaster": "/zipline-roller",
    "Sky Cycle": "/sky-cycle",
    "Sky Roller": "/sky-roller",
    "Rocket Ejection": "/rocket-ejection"
  };

  // Function to handle navigation
  const handleActivityNavigation = (activityName) => {
    const route = activityRoutes[activityName];
    if (route) {
      navigate(route);
    } else {
      // console.warn(`No route found for activity: ${activityName}`);
      // Fallback to activities page or show a message
      navigate("/all-activities");
    }
  };

  // Generate cards from activity types and activities
  useEffect(() => {
    if (!gridLoading && activityTypes.length > 0) {
      // Search and filter activity types
      const searchResults = searchActivityTypes(searchTerm, selectedCategory?.id);

      // Map activity types to cards with images from activities
      const cards = searchResults.map(activityType => {
        // Find corresponding activity media for this activity type
        const activityMedia = activities.find(activity =>
          activity.activity_type_id === activityType.id &&
          activity.status === 'Active' &&
          activity.main_image
        );

        return {
          id: activityType.id,
          title: activityType.name,
          badge: "Explore More",
          description: activityType.description || `Experience the thrill of ${activityType.name}`,
          price: "₹40", // You can make this dynamic if you have pricing data
          image: activityMedia
            ? `${IMGUrl}/${activityMedia.main_image}`
            : `${__CDN_BASE__}track.jpg`, // Fallback image
          categoryId: activityType.category_id,
          categoryName: activityType.category_name,
          route: activityRoutes[activityType.name] || "/all-activities"
        };
      });

      setFilteredCards(cards);
    }
  }, [activityTypes, activities, selectedCategory, searchTerm, gridLoading, searchActivityTypes, IMGUrl]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle card click (for entire card navigation)
  const handleCardClick = (activityName) => {
    handleActivityNavigation(activityName);
  };

  // Handle arrow button click
  const handleArrowClick = (e, activityName) => {
    e.stopPropagation(); // Prevent card click event
    handleActivityNavigation(activityName);
  };

  // Show loading state
  if (gridLoading) {
    return (
      <section className="p-6 md:p-10 lg:p-14 bg-[#161d26] min-h-screen text-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-white text-xl">Loading activities...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 md:p-10 lg:p-14 bg-[#161d26] min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ---- DROPDOWN + SEARCH ---- */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Dropdown */}
          <div className="relative w-full md:w-auto">
            <button
              className="w-full md:w-auto bg-[#1f2732] text-gray-300 px-5 py-3 rounded-xl border border-gray-700 flex items-center justify-between gap-3 min-w-[200px] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#161d26]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Select category filter"
            >
              <span>{selectedCategory ? selectedCategory.name : "All Categories"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1f2732] border border-gray-700 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                <button
                  className="w-full text-left px-5 py-3 text-gray-300 hover:bg-[#2a3441] transition-colors"
                  onClick={() => handleCategorySelect(null)}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    className="w-full text-left px-5 py-3 text-gray-300 hover:bg-[#2a3441] transition-colors"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 lg:w-80">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-[#1f2732] border border-gray-700 rounded-xl px-5 py-3 text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#161d26] focus:border-blue-500"
              aria-label="Search activities"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M16 16l4 4" />
            </svg>
          </div>
        </div>

        {/* ---- RESULTS INFO ---- */}
        <div className="text-gray-400 text-sm">
          {selectedCategory && (
            <p>Showing activities in: <span className="text-white font-medium">{selectedCategory.name}</span></p>
          )}
          {searchTerm && (
            <p>Search results for: <span className="text-white font-medium">"{searchTerm}"</span></p>
          )}
          <p className="mt-1">{filteredCards.length} activities found</p>
        </div>

        {/* ---- CARD GRID ---- */}
        {filteredCards.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No activities found</div>
            <p className="text-gray-500 mt-2">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCards.map((card) => (
              <article
                key={card.id}
                className="relative bg-[#1b232d] text-white rounded-2xl overflow-hidden border border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-[#161d26] cursor-pointer"
                tabIndex="0"
                role="button"
                aria-label={`${card.title} - ${card.description}`}
                onClick={() => handleCardClick(card.title)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(card.title);
                  }
                }}
              >
                {/* image */}
                <div className="h-44 md:h-48 lg:h-52 w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={`${card.title} activity showcase`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* content */}
                <div className="p-6 space-y-4">
                  <span className="inline-block bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {card.badge}
                  </span>

                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm line-clamp-3">
                    {card.description}
                  </p>


                  <div className="flex items-center justify-between">
                      <div>
                         {card.categoryName && (
                    <div className="text-xs text-gray-400">
                      Category: <span className="text-gray-300">{card.categoryName}</span>
                    </div>
                  )}
                      </div>

                      <button
                        className="w-10 h-10 rounded-full border border-white flex items-center justify-center bg-red-900 hover:bg-red-500/20 transition-colors focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1b232d]"
                        aria-label={`View details for ${card.title}`}
                        onClick={(e) => handleArrowClick(e, card.title)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            handleActivityNavigation(card.title);
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 15.293a1 1 0 010-1.414L13.586 10 10.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0zM4 10a1 1 0 011-1h8a1 1 0 110 2H5a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                  <div className="pt-4 border-t border-gray-700">

                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
