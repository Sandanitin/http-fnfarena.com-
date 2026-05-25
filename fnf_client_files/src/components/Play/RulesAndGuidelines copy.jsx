import React, { useState, useEffect } from "react";

export default function RulesAndGuidelines() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(1);

  // Smooth continuous animation
  useEffect(() => {
    const duration = 10500; // Total cycle duration (3.5s per section)
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed % duration) / duration;
      setProgress(newProgress);

      // Update active section based on progress
      if (newProgress < 0.33) {
        setActive(1);
      } else if (newProgress < 0.66) {
        setActive(2);
      } else {
        setActive(3);
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Define curve path points for smooth interpolation
  const getCurvePoints = () => {
    if (typeof window === "undefined") {
      return [
        { x: 65, y: 12, rotation: 15, scale: 1 },
        { x: 30, y: 35, rotation: -25, scale: 1.1 },
        { x: -10, y: 60, rotation: -45, scale: 0.9 },
      ];
    }

    const width = window.innerWidth;

    if (width >= 1024) {
      return [
        { x: 320, y: 90, rotation: 25, scale: 1.2 },
        { x: 150, y: 262, rotation: -15, scale: 1.3 },
        { x: -120, y: 310, rotation: -55, scale: 1.1 },
      ];
    } else if (width >= 768) {
      return [
        { x: 200, y: 80, rotation: 20, scale: 1.1 },
        { x: 100, y: 220, rotation: -20, scale: 1.2 },
        { x: -60, y: 270, rotation: -50, scale: 1.0 },
      ];
    }

    return [
      { x: 65, y: 12, rotation: 15, scale: 1 },
      { x: 30, y: 35, rotation: -25, scale: 1.1 },
      { x: -10, y: 60, rotation: -45, scale: 0.9 },
    ];
  };

  // Smooth interpolation function
  const interpolate = (start, end, factor) => {
    return start + (end - start) * factor;
  };

  // Easing function for smooth movement
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const getCarPosition = () => {
    const points = getCurvePoints();
    const totalSegments = points.length;
    const segmentProgress = (progress * totalSegments) % totalSegments;
    const currentSegment = Math.floor(segmentProgress);
    const segmentFactor = segmentProgress - currentSegment;

    // Apply easing to segment factor for smoother movement
    const easedFactor = easeInOutCubic(segmentFactor);

    const startPoint = points[currentSegment];
    const endPoint = points[(currentSegment + 1) % points.length];

    const isPixelBased = typeof window !== "undefined" && window.innerWidth >= 768;

    return {
      [isPixelBased ? 'left' : 'left']: isPixelBased
        ? `${interpolate(startPoint.x, endPoint.x, easedFactor)}px`
        : `${interpolate(startPoint.x, endPoint.x, easedFactor)}%`,
      [isPixelBased ? 'top' : 'top']: isPixelBased
        ? `${interpolate(startPoint.y, endPoint.y, easedFactor)}px`
        : `${interpolate(startPoint.y, endPoint.y, easedFactor)}%`,
      rotation: `${interpolate(startPoint.rotation, endPoint.rotation, easedFactor)}deg`,
      scale: interpolate(startPoint.scale, endPoint.scale, easedFactor),
    };
  };

  // Go-kart SVG Component
  const GoKartCar = ({ className, style }) => (
    <div className={className} style={style}>
      <svg
        width="80"
        height="60"
        viewBox="0 0 80 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Car Body */}
        <ellipse cx="40" cy="35" rx="35" ry="18" fill="#FF4444" stroke="#CC0000" strokeWidth="2"/>

        {/* Car Top */}
        <ellipse cx="40" cy="30" rx="25" ry="12" fill="#FF6666"/>

        {/* Windshield */}
        <ellipse cx="40" cy="28" rx="18" ry="8" fill="#87CEEB" opacity="0.8"/>

        {/* Driver Helmet */}
        <circle cx="40" cy="25" r="6" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>

        {/* Front Wheel */}
        <circle cx="60" cy="45" r="8" fill="#333" stroke="#000" strokeWidth="2"/>
        <circle cx="60" cy="45" r="5" fill="#666"/>
        <circle cx="60" cy="45" r="2" fill="#999"/>

        {/* Rear Wheel */}
        <circle cx="20" cy="45" r="8" fill="#333" stroke="#000" strokeWidth="2"/>
        <circle cx="20" cy="45" r="5" fill="#666"/>
        <circle cx="20" cy="45" r="2" fill="#999"/>

        {/* Front Bumper */}
        <rect x="68" y="32" width="8" height="6" rx="3" fill="#FF4444" stroke="#CC0000" strokeWidth="1"/>

        {/* Exhaust Smoke */}
        <circle cx="12" cy="35" r="3" fill="#DDD" opacity="0.6"/>
        <circle cx="8" cy="32" r="2" fill="#EEE" opacity="0.4"/>
        <circle cx="5" cy="30" r="1.5" fill="#F5F5F5" opacity="0.3"/>

        {/* Racing Number */}
        <text x="40" y="35" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">1</text>

        {/* Speed Lines */}
        <line x1="75" y1="25" x2="85" y2="23" stroke="#FF4444" strokeWidth="2" opacity="0.7"/>
        <line x1="75" y1="30" x2="88" y2="28" stroke="#FF4444" strokeWidth="2" opacity="0.5"/>
        <line x1="75" y1="35" x2="90" y2="33" stroke="#FF4444" strokeWidth="2" opacity="0.3"/>
      </svg>

      {/* Additional motion blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/20 to-transparent blur-sm opacity-60 animate-pulse"></div>
    </div>
  );

  const currentPosition = getCarPosition(active);

  return (
    <section className="relative bg-[#f7f7f7] overflow-hidden py-12 md:py-20">

      {/* TOP CHECK PATTERN */}
      <div className="absolute left-0 right-0 top-2 h-6"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.95) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.95) 75%, rgba(255,255,255,0.95)),
            linear-gradient(45deg, rgba(255,255,255,0.95) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.95) 75%, rgba(255,255,255,0.95)),
            linear-gradient(180deg,#b92a2a,#d94b4b)
          `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          transform: "translateY(-8px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT TEXT */}
          <div className="lg:col-span-5">
            <h2 className="font-sansita text-7xl md:text-9xl lg:text-8xl font-extrabold leading-none text-black">
              Rules & <br /> Guidelines
            </h2>
            <p className="mt-6 text-gray-500 max-w-xl">
              To ensure everyone enjoys a smooth, safe, and unforgettable visit, please follow these guidelines.
            </p>
          </div>

          {/* RIGHT — CURVE + ITEMS */}
          <div className="relative lg:col-span-7 h-[650px]">
            <div className="flex justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[8000px] h-[320px] ml-[-700px] translate-y-32"
                viewBox="0 0 1072 423"
              >
                <g>
                  <path d="M 0.00 0.00 L 1059.59 0.00 C1047.93,0.00 1047.22,0.11 1047.68,1.89 C1047.95,2.93 1047.70,4.07 1047.13,4.42 C1046.55,4.78 1038.53,5.96 1029.29,7.05 C985.75,12.19 971.84,16.78 958.50,30.41 C951.54,37.52 949.21,40.93 927.59,75.65 C900.71,118.82 872.60,155.40 846.88,180.68 C797.43,229.26 740.69,255.69 668.00,263.98 C642.19,266.93 597.54,266.26 563.00,262.41 C547.16,260.65 526.18,260.46 516.41,261.99 C505.70,263.68 487.85,268.57 477.70,272.61 C447.78,284.52 423.93,298.16 364.00,337.63 C320.72,366.13 310.23,371.47 292.66,373.91 C251.54,379.63 173.66,362.81 95.00,331.22 C58.09,316.40 22.04,296.97 24.39,293.18 C25.67,291.11 28.33,291.93 35.50,296.62 C46.15,303.59 80.17,319.94 102.00,328.58 C138.67,343.08 182.43,356.40 215.00,362.96 C241.06,368.21 251.93,369.40 273.50,369.39 C305.02,369.38 308.62,367.92 359.00,334.84 C387.05,316.42 395.98,310.63 404.77,305.13 C449.11,277.41 483.04,262.44 512.50,257.60 C528.94,254.90 538.26,254.76 559.00,256.91 C595.51,260.69 631.42,261.89 651.00,259.98 C656.78,259.42 666.34,258.53 672.25,258.02 C720.60,253.79 772.90,233.58 812.12,203.96 C831.57,189.27 851.74,170.01 867.59,151.00 C884.55,130.64 908.61,96.95 924.01,72.00 C943.75,40.00 946.87,35.38 953.64,28.14 C967.85,12.94 981.38,8.01 1024.00,2.48 L 1041.50 0.22 L 0.00 0.00 Z" fill="rgb(184,37,46)"/>
                </g>
              </svg>
            </div>

            {/* MOVING GO-KART CAR */}
            <GoKartCar
              className="absolute z-50"
              style={{
                top: currentPosition.top,
                left: currentPosition.left,
                transform: `rotate(${currentPosition.rotation}) scale(${currentPosition.scale})`,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                transition: 'none' // Remove CSS transitions for smooth JS animation
              }}
            />

            {/* RULE 1 */}
            <div
              className={`absolute top-[22%] right-[-10%] flex flex-col md:flex-row gap-4 w-[80%] md:w-[60%] transition-all duration-500
                ${active === 1 ? "scale-105 text-red-600" : "opacity-60"}`}
            >
              <div>
                <h4 className="font-semibold text-xl md:text-2xl">REGISTRATION FOR INDEMNITY</h4>
                <p className="mt-1 text-gray-500 text-sm md:text-lg">
                  Complete your registration process and sign the indemnity form at the 
                  designated counter near Box Cricket.
                </p>
              </div>
              <span
                className={`text-6xl md:text-9xl font-bold text-gray-200 transition-all duration-500
                  ${active === 1 ? "scale-105 text-red-600" : ""}`}
              >
                1
              </span>
            </div>


            {/* RULE 2 */}
            <div
              className={`absolute top-[50%] md:top-[55%] right-5 md:right-20 flex flex-col md:flex-row gap-4 w-[80%] md:w-[60%] transition-all duration-500
                ${active === 2 ? "scale-105 text-red-600" : "opacity-50"}`}
            >
              <div>
                <h4 className="font-semibold text-xl md:text-2xl">PAYMENT PROCESS</h4>
                <p className="mt-1 text-gray-500 text-sm md:text-lg">
                  All payments must be made at the central counters before you begin your activity. Please ensure you have the correct 
                  payment method ready for a smooth experience.
                </p>
              </div>
              <span className={`text-6xl md:text-9xl font-bold text-gray-200 transition-all duration-500
              ${active === 2 ? "scale-105 text-red-600" : ""}`}>2</span>
            </div>

            {/* RULE 3 */}
            <div
              className={`absolute bottom-0 left-[-5%] md:left-[-270px] flex flex-col md:flex-row gap-4 w-[90%] md:w-[60%] transition-all duration-500
                ${active === 3 ? "scale-105 text-red-600" : "opacity-50"}`}
            >
              <div>
                <h4 className="font-semibold text-xl md:text-2xl">SAFETY BRIEFING & GEAR</h4>
                <p className="mt-1 text-gray-500 text-sm md:text-lg">
                  Attend the mandatory safety briefing and gear up with all required protective equipment.
                   Your safety is our priority, so make sure you’re fully prepared before you begin.
                </p>
              </div>
              <h1 className={`text-6xl md:text-9xl font-bold text-gray-200 -mt-16 md:-mt-32 -ml-8 md:-ml-12 transition-all duration-500
      ${active === 3 ? "scale-105 text-red-600" : ""}`}>3</h1>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM RIGHT CURVE */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] translate-x-1/2 translate-y-1/2 overflow-hidden pointer-events-none">
        <div className="w-full h-full rounded-full bg-[#eaeaea]"></div>
      </div>

      {/* BOTTOM CHECK STYLE */}
      <div className="absolute left-0 right-0 bottom-0 h-6"
        style={{
          backgroundImage: `
            linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%),
            linear-gradient(45deg,rgba(255,255,255) 25%,transparent 25%,transparent 75%,rgba(255,255,255) 75%),
            linear-gradient(180deg,#b92a2a,#d94b4b)
          `,
          backgroundSize: "28px 28px,28px 28px,auto",
          backgroundPosition: "0 0,14px 14px,0 0",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(0,0,0,.6)"
        }}
      />
    </section>
  );
}
