import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useArenaActivities } from "../Context/ArenaActivitiesContext";

export default function ArenaActivities() {
  const { getSlidesData, loading } = useArenaActivities();
  const SLIDES = getSlidesData();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showText, setShowText] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef(null);
  const isHoverRef = useRef(false);
  const slideCount = SLIDES.length;

  // sizes - reduced height
  const BASE_WIDTH = 360;
  const CENTER_WIDTH = 560;
  const BAND_HEIGHT = 380;
  const PANEL_INNER_HEIGHT = BAND_HEIGHT;
  const PANEL_CLIP = "polygon(30% 0, 100% 0, 70% 100%, 0 100%)";

  // Create circular slides array with duplicates for seamless infinite scroll
  const getCircularSlides = () => {
    if (slideCount === 0) return [];
    if (slideCount === 1) return SLIDES;

    // Add slides before and after for smooth infinite scrolling
    const slidesToAdd = Math.min(3, slideCount); // Add 3 slides on each side or all slides if less than 3
    const beforeSlides = SLIDES.slice(-slidesToAdd);
    const afterSlides = SLIDES.slice(0, slidesToAdd);

    return [...beforeSlides, ...SLIDES, ...afterSlides];
  };

  const circularSlides = getCircularSlides();
  const totalSlides = circularSlides.length;
  const slidesToAdd = Math.min(3, slideCount);

  // autoplay
  useEffect(() => {
    if (slideCount > 1) {
      startAutoplay();
    }
    return stopAutoplay;
  }, [slideCount]);

  function startAutoplay() {
    stopAutoplay();
    if (slideCount > 1) {
      autoplayRef.current = setInterval(() => {
        if (isHoverRef.current || isTransitioning) return;
        next();
      }, 3000);
    }
  }

  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  useEffect(() => {
    setShowText(false);
    const t = setTimeout(() => setShowText(true), 70);
    return () => clearTimeout(t);
  }, [currentIndex]);

  // Calculate transform offset for circular carousel
  const getTransformOffset = () => {
    if (slideCount === 0) return 0;
    if (slideCount === 1) return 0;

    const slideWidth = BASE_WIDTH - 80; // Account for overlap
    const centerSlideExtraWidth = CENTER_WIDTH - BASE_WIDTH;

    // Calculate the actual slide index in the circular array
    const actualIndex = currentIndex + slidesToAdd;

    // Calculate offset to center the current slide
    let offset = 0;

    // Calculate cumulative width up to current slide
    for (let i = 0; i < actualIndex; i++) {
      if (i === actualIndex - 1) {
        // Current slide (center) - account for extra width
        offset += slideWidth + centerSlideExtraWidth / 2;
      } else {
        offset += slideWidth;
      }
    }

    // Center the carousel in the viewport
    const containerCenter = (totalSlides * slideWidth) / 2;

    return containerCenter - offset;
  };

  const next = () => {
    if (slideCount <= 1 || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % slideCount;
      return nextIndex;
    });

    // Reset transition flag after animation
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prev = () => {
    if (slideCount <= 1 || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const prevIndex = (prev - 1 + slideCount) % slideCount;
      return prevIndex;
    });

    // Reset transition flag after animation
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setCurrentIndex(index);

    // Reset transition flag after animation
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Show loading state
  if (loading) {
    return (
      <section className="relative w-full overflow-hidden bg-black text-white min-h-[720px] flex items-center justify-center">
        <div className="text-white text-xl">Loading activities...</div>
      </section>
    );
  }

  // Show message if no slides available
  if (slideCount === 0) {
    return (
      <section className="relative w-full overflow-hidden bg-black text-white min-h-[720px] flex items-center justify-center">
        <div className="text-white text-xl">No activities available</div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-black text-white min-h-[720px]">
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-cover bg-center split-top"
        style={{ backgroundImage: `url(${__CDN_BASE__}aa.jpg)` }}
      />

      {/* Black glassy overlay for top section */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-black/40"
        style={{
          backdropFilter: "blur(2px)",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4))"
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-cover bg-center split-bottom"
        style={{ backgroundImage: `url(${__CDN_BASE__}aa.jpg)` }}
      />

      {/* Black glassy overlay for bottom section */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-black/40"
        style={{
          backdropFilter: "blur(2px)",
          background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.4))"
        }}
      />

      <div className="absolute left-0 right-0 top-1/2 h-[6px] bg-red-600 z-10 shadow-lg" />

      <div
        className="h-6 w-full relative z-10"
        style={{
          backgroundImage: `
            linear-gradient(45deg,
              rgba(255, 255, 255, 0.74) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255,255,255,0.95) 75%,
              rgba(255,255,255,0.95) 100%
            ),
            linear-gradient(45deg,
              rgba(255,255,255,0.95) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255,255,255,0.95) 75%,
              rgba(255,255,255,0.95) 100%
            ),
            linear-gradient(180deg, #000000, #000000)
          `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-20 text-center pt-8 md:pt-14 px-6">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight font-sansitaOne">Activities at FNF Arena</h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-red-500 mt-2 font-sansitaOne">
          Karting, Sky Rides, Games &amp; More <br /> in Hyderabad
        </p>
      </div>

      {/* Carousel Container with proper height and overflow management */}
      <div
        className="relative z-20 mt-8 md:mt-14 mb-16"
        style={{
          height: `${BAND_HEIGHT + 60}px`,
          overflow: 'visible'
        }}
      >
        <div className="flex justify-center w-full h-full">
          <div
            className="relative w-full h-full"
            style={{
              position: 'relative',
              overflow: 'visible',
              background: 'transparent',
            }}
          >
            <div
              className="absolute w-full h-full"
              style={{
                width: '200%',
                transform: 'rotate(-6deg)',
                left: '-50%',
                top: '50%',
                transformOrigin: 'center center',
                marginLeft: '0vw',
                marginTop: `-${(BAND_HEIGHT + 20) / 2}px`,
                background: '#fff',
                borderRadius: 8,
                zIndex: 30,
              }}
            >
               <div
        className="absolute left-0 right-0 top-[-2] h-6 pointer-events-none z-10"
        style={{
          backgroundImage: `
            linear-gradient(45deg,
              rgba(255,255,255,0.95) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255,255,255,0.95) 75%,
              rgba(255,255,255,0.95) 100%
            ),
            linear-gradient(45deg,
              rgba(255,255,255,0.95) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255,255,255,0.95) 75%,
              rgba(255,255,255,0.95) 100%
            ),
            linear-gradient(180deg,#C7161E,#d94b4b)
          `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          backgroundRepeat: "repeat",
          transform: "translateY(-8px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
        }}
      />

              {/* Content Section */}
              <div
                className="relative rounded-md w-full flex mt-6 justify-center overflow-hidden"
                style={{
                  height: `${BAND_HEIGHT}px`,
                  background: '#fff',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.55)',
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                }}
              >
                <div
                  onMouseEnter={() => (isHoverRef.current = true)}
                  onMouseLeave={() => (isHoverRef.current = false)}
                  className="relative flex items-center justify-center mt-5 h-full w-full overflow-hidden"
                  style={{
                    padding: '0 36px',
                  }}
                >
                 {slideCount > 1 && (
                   <button
                     onClick={prev}
                     disabled={isTransitioning}
                     className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-black/40 hover:bg-black/60 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                     style={{ backdropFilter: "blur(4px)" }}
                     aria-label="Previous"
                   >
                     <ChevronLeft />
                   </button>
                 )}

                  {/* SLIDES CONTAINER - Circular infinite scroll */}
                  <div
                    className="flex items-center"
                    style={{
                      gap: 0,
                      height: '100%',
                      transition: isTransitioning ? 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
                      transform: `translateX(${getTransformOffset()}px)`,
                      alignItems: 'center',
                      flexWrap: 'nowrap',
                      display: 'flex',
                      willChange: 'transform',
                    }}
                  >
                    {circularSlides.map((s, i) => {
                      // Determine if this slide should be highlighted (center)
                      const actualIndex = currentIndex + slidesToAdd;
                      const isCenter = i === actualIndex;

                      // Get the original slide index for click handling
                      let originalIndex;
                      if (i < slidesToAdd) {
                        // Before slides
                        originalIndex = slideCount - slidesToAdd + i;
                      } else if (i >= slidesToAdd + slideCount) {
                        // After slides
                        originalIndex = i - slidesToAdd - slideCount;
                      } else {
                        // Original slides
                        originalIndex = i - slidesToAdd;
                      }

                      const cardWidth = isCenter ? CENTER_WIDTH : BASE_WIDTH;
                      const verticalPull = isCenter ? 18 : 0;

                      const highlightStyles = isCenter
                        ? {
                            boxShadow: '0 30px 60px rgba(217,75,75,0.22), 0 8px 24px rgba(0,0,0,0.45)',
                            border: '3px solid rgba(217,75,75,0.95)',
                            filter: 'brightness(1.05) saturate(1.03)',
                            transform: `translateY(-${verticalPull}px) scale(1.06)`,
                            zIndex: 80,
                          }
                        : {
                            boxShadow: 'none',
                            border: '2px solid rgba(0,0,0,0.06)',
                            filter: 'grayscale(10%) blur(1px)',
                            transform: `translateY(0) scale(1)`,
                            zIndex: 20,
                          };

                      return (
                        <div
                          key={`${s.title}-${i}`}
                          onClick={() => goToSlide(originalIndex)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToSlide(originalIndex); }}
                          className="relative flex-none transition-transform duration-500 ease-out cursor-pointer"
                          style={{
                            width: `${cardWidth}px`,
                            height: `${PANEL_INNER_HEIGHT}px`,
                            clipPath: PANEL_CLIP,
                            WebkitClipPath: PANEL_CLIP,
                            overflow: 'hidden',
                            position: 'relative',
                            borderRadius: 6,
                            transition: 'transform 520ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms ease, filter 420ms ease, border 320ms ease',
                            marginLeft: i === 0 ? 0 : -80,
                            ...highlightStyles,
                          }}
                        >
                          <img
                            src={s.image}
                            alt={s.title}
                            key={`slide-img-${i}-${isCenter ? 'active' : 'idle'}`}
                            style={{
                              position: 'absolute',
                              top: '0%',
                              left: '0%',
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              transition: 'transform 420ms cubic-bezier(.2,.9,.2,1), filter 420ms ease',
                              transform: isCenter ? 'scale(1.04)' : 'scale(1)',
                              filter: isCenter ? 'blur(0px) brightness(1.06)' : 'blur(3px) brightness(0.9)',
                              willChange: 'transform, filter',
                            }}
                            aria-hidden
                            onError={(e) => {
                              e.target.src = `${__CDN_BASE__}placeholder.jpg`;
                            }}
                          />

                          {isCenter && (
                            <div
                              aria-hidden
                              style={{
                                position: 'absolute',
                                inset: 0,
                                pointerEvents: 'none',
                                borderRadius: 6,
                                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.14), 0 0 40px rgba(217,75,75,0.12)',
                              }}
                            />
                          )}

                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0.18))',
                              pointerEvents: 'none',
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                {slideCount > 1 && (
                  <button
                    onClick={next}
                    disabled={isTransitioning}
                    className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-40 bg-black/40 hover:bg-black/60 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backdropFilter: "blur(4px)" }}
                    aria-label="Next"
                  >
                    <ChevronRight />
                  </button>
                )}

                </div>
              </div>

              <div
                className="absolute left-0 right-0 bottom-0 h-6 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg,
                      rgba(255,255,255,0.95) 25%,
                      transparent 25%,
                      transparent 75%,
                      rgba(255,255,255,0.95) 75%,
                      rgba(255,255,255,0.95) 100%
                    ),
                    linear-gradient(45deg,
                      rgba(255,255,255,0.95) 25%,
                      transparent 25%,
                      transparent 75%,
                      rgba(255,255,255,0.95) 75%,
                      rgba(255,255,255,0.95) 100%
                    ),
                    linear-gradient(180deg,#b92a2a,#d94b4b)
                  `,
                  backgroundSize: '28px 28px, 28px 28px, auto',
                  backgroundPosition: '0 0, 14px 14px, 0 0',
                  backgroundRepeat: 'repeat',
                  transform: 'translateY(8px)',
                  boxShadow: '0 -6px 20px rgba(0,0,0,0.6)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Caption with proper spacing */}
      <div className="relative z-40 mt-8 px-4">
        <div className="max-w-7xl mx-auto md:flex md:items-start md:justify-end">
          <div className="w-full md:w-auto overflow-hidden">
            <div
              key={currentIndex}
              style={{
                transition: "transform 420ms cubic-bezier(.2,.9,.2,1), opacity 320ms ease",
                transform: showText ? "translateX(0) translateY(0)" : "translateX(40px) translateY(-6px)",
                opacity: showText ? 1 : 0,
              }}
              className="md:max-w-lg text-left md:text-right"
              aria-live="polite"
            >
              <h2 className="text-xl md:text-3xl font-bold text-white">{SLIDES[currentIndex]?.title}</h2>
              <p className="text-sm md:text-lg max-w-3xl mt-2 text-gray-100">{SLIDES[currentIndex]?.text}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-40 mt-6 flex justify-center gap-2 mb-8">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            disabled={isTransitioning}
            className={`w-2 h-2 rounded-full transition-colors duration-300 disabled:cursor-not-allowed ${
              i === currentIndex ? "bg-red-500" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div
        className="h-6 w-full relative z-10"
        style={{
          backgroundImage: `
            linear-gradient(45deg,
              rgba(255, 255, 255, 0.74) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255,255,255,0.95) 75%,
              rgba(255,255,255,0.95) 100%
            ),
            linear-gradient(45deg,
              rgba(255,255,255,0.95) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255,255,255,0.95) 75%,
              rgba(255,255,255,0.95) 100%
            ),
            linear-gradient(180deg, #000000, #000000)
          `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          backgroundRepeat: "repeat",
        }}
      />
    </section>
  );
}
