"use client";
import React, { useState, useEffect, useRef  } from "react";
import { useGallery } from "../../Context/GalleryContext";
import { useArenaActivities } from "../../Context/ArenaActivitiesContext";

const Unleash = () => {
  const { getMainImage, loading: galleryLoading } = useGallery();
  const { getSlidesData, loading: activitiesLoading } = useArenaActivities();

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
   const videoRef = useRef(null);

  // Get dynamic cards data from API
  useEffect(() => {
    if (!galleryLoading && !activitiesLoading) {
      const slidesData = getSlidesData();

      // Filter only active activities and limit to 3 for the cards
      const activeSlides = slidesData;

      const dynamicCards = activeSlides.map((slide, index) => ({
        img: slide.image || `${__CDN_BASE__}sec332.jpg`, // Fallback to default image
        title: slide.title || "Activity",
        desc: slide.text || "Experience the ultimate thrill and excitement with our amazing activities!",
        activityTypeId: slide.activityTypeId,
        activityId: slide.activityId
      }));

      // If we have less than 3 activities, fill with fallback data
      const fallbackCards = [
        {
          img: `${__CDN_BASE__}sec332.jpg`,
          title: "Bumping Cars",
          desc: "RC Car Racing, Drift & Bumper Cars, Bowling Alley, Arcade Games—high laughter and casual thrills for everyone."
        },
        {
          img: `${__CDN_BASE__}rider2.png`,
          title: "Go-Karting Track",
          desc: "Feel the roar, seize the curves, fight for the podium. Digital timing, leaderboards & pro karts make every lap count."
        },
        {
          img: `${__CDN_BASE__}bungyjump.jpg`,
          title: "Sky Roller",
          desc: "Zipline Coaster, Sky Cycle, Rocket Ejector, Bull Ride — a mix of flight, spin & pure adrenaline."
        }
      ];

      while (dynamicCards.length < 3) {
        const fallbackIndex = dynamicCards.length;
        if (fallbackIndex < fallbackCards.length) {
          dynamicCards.push(fallbackCards[fallbackIndex]);
        } else {
          break;
        }
      }

      setCards(dynamicCards);
    }
  }, [galleryLoading, activitiesLoading, getSlidesData]);
  // Set video start time to 3 seconds
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      const handleLoadedData = () => {
        video.currentTime = 3;
      };
      video.addEventListener('loadeddata', handleLoadedData);

      // If video is already loaded
      if (video.readyState >= 2) {
        video.currentTime = 3;
      }
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  // Carousel effect for small screens
  useEffect(() => {
  if (cards.length > 3) {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Move in steps of 3
        const nextIndex = prevIndex + 3;
        return nextIndex >= cards.length ? 0 : nextIndex;
      });
    }, 3000); // change every 3 sec

    return () => clearInterval(interval);
  }
}, [cards.length]);

  // Show loading state
  if (galleryLoading || activitiesLoading) {
    return (
      <div className="relative w-full min-h-[60vh] overflow-hidden">
        {/* Background Video for Loading */}
        <video
         ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="https://cdn.acsdev.in/FNF/intro_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-xl">Loading activities...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[60vh] overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="https://cdn.acsdev.in/FNF/intro_video.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${__CDN_BASE__}unleash.jpg)` }}
        ></div>
      </video>

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">

        {/* Headline */}
        <header className="flex flex-col items-center justify-center text-center px-4 py-8 md:py-12 mb-6 sm:mb-8">
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-snug uppercase tracking-wide font-sansitaOne drop-shadow-lg">
            Unleash The Thrill. <br /> Own The Moment.
          </h1>
        </header>

        {/* Cards Section */}
        <main className="relative z-10 w-full px-4 mt-8 md:mt-12 pb-8">

          {/* Large screens: grid */}
          <div className="hidden sm:grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards
              .slice(currentIndex, currentIndex + 3)
              .map((card, index) => (
              <article
                key={`${card.activityId || index}-${card.title}`}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row gap-4 transition-transform hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                tabIndex="0"
                role="button"
                aria-label={`${card.title} - ${card.desc}`}
              >
                <img
                  src={card.img.startsWith('http') ? card.img : __CDN_BASE__ + card.img}
                  alt={`${card.title} activity showcase`}
                  loading="lazy"
                  className="w-full sm:w-28 md:w-32 lg:w-24 h-40 sm:h-20 md:h-24 lg:h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-gray-800 text-lg sm:text-base md:text-lg lg:text-base">{card.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-xs md:text-sm mt-1">{card.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Small screens: carousel */}
          <div className="sm:hidden max-w-md mx-auto">
            {cards.length > 0 && (
              <>
                <article
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg flex flex-col gap-4 transition-transform"
                  aria-label={`${cards[currentIndex].title} - ${cards[currentIndex].desc}`}
                >
                  <img
                    src={cards[currentIndex].img.startsWith('http') ? cards[currentIndex].img : __CDN_BASE__ + cards[currentIndex].img}
                    alt={`${cards[currentIndex].title} activity showcase`}
                    loading="lazy"
                    className="w-full h-60 rounded-xl object-cover"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold text-gray-800 text-lg">{cards[currentIndex].title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{cards[currentIndex].desc}</p>
                  </div>
                </article>

                {/* Carousel indicators */}
                <nav className="flex justify-center mt-4 gap-2" aria-label="Activity carousel navigation">
                  {cards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? "bg-white" : "bg-white/40"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={index === currentIndex ? "true" : "false"}
                    />
                  ))}
                </nav>
              </>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Unleash;
