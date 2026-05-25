"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

const ActivitiesSection = () => {
  const navigate = useNavigate();

  const zones = [
    {
      title: "Indoor Zone",
      img: `${__CDN_BASE__}bowling.jpg`,
      desc: "Experience thrilling indoor activities including Bowling, Laser Tag, Arcade Games, Softplay & Trampoline, and Bull Ride. Perfect for all-weather fun and competitive gaming.",
      path: "/bowling",
    },
    {
      title: "Outdoor Zone",
      img: `${__CDN_BASE__}girlshoot.jpg`,
      desc: "Unleash your adventurous spirit with Paintball Arena, Drifters & Bumping Cars, and Target Zone activities. Tactical fun and competitive energy in the great outdoors.",
      path: "/paintball-arena",
    },
    {
      title: "Adventure Zone",
      img: `${__CDN_BASE__}bungyjump.jpg`,
      desc: "Take your thrills to new heights with Zipline Roller, Sky Cycle, Sky Roller, and Rocket Ejection. Adrenaline-pumping adventures that will test your limits.",
      path: "/zipline-roller",
    },
    {
      title: "Events Zone",
      img: `${__CDN_BASE__}chir2.jpg`,
      desc: "Make your special occasions unforgettable with our Birthday parties, Corporate events, and custom celebrations. Professional event planning and memorable experiences.",
      path: "/Event",
    },
  ];

  const handleZoneClick = (path) => {
    navigate(path);
  };

  return (
    <section className="bg-[#191e22] text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 max-w-full mx-auto">
      <div className="max-w-7xl mx-auto">

        {/* Centered Header Section */}
        <div className="text-center mb-16">
          <p className="text-red-500 text-sm font-semibold">Ready For More?</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mt-3 font-sansitaOne">
            Your Adventure <br /> Starts Here
          </h1>
          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed max-w-7xl mx-auto">
            Explore every zone, pick your thrill, and make your day unforgettable.
            From speed duels to sky rides and battle zones — each activity is built
            to ignite excitement.
            <br />
            <br />
            Whether you're here to race, compete, or just have fun — there's
            always something waiting for your next move at FNF Arena.
          </p>
        </div>

        {/* Top Row Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {zones.slice(0, 2).map((zone, index) => (
            <div
              key={index}
              className="flex justify-center"
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-md md:max-w-lg lg:max-w-[466px] cursor-pointer transition-transform hover:scale-105">
                <img
                  src={zone.img}
                  loading="lazy"
                  alt={zone.title}
                  className="w-full h-64 sm:h-72 md:h-80 object-cover"
                />
                <div className="p-6 text-black flex flex-col justify-between">
                  <button
                    onClick={() => handleZoneClick(zone.path)}
                    className="bg-red-500 text-white text-sm px-4 py-2 rounded-full w-fit mb-4 hover:bg-red-600 transition-colors"
                  >
                    Explore More
                  </button>
                  <h2 className="text-xl font-semibold mb-2 font-poppins">{zone.title}</h2>
                  <div className="flex items-start gap-3">
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-4 flex-1">
                      {zone.desc}
                    </p>
                    <button
                      onClick={() => handleZoneClick(zone.path)}
                      className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center text-xl hover:bg-red-600 transition-colors flex-shrink-0 mt-1"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {zones.slice(2).map((zone, index) => (
            <div
              key={index}
              className="flex justify-center"
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-md md:max-w-lg lg:max-w-[466px] cursor-pointer transition-transform hover:scale-105">
                <img
                  src={zone.img}
                  loading="lazy"
                  alt={zone.title}
                  className="w-full h-64 sm:h-72 md:h-80 object-cover"
                />
                <div className="p-6 text-black flex flex-col justify-between">
                  <button
                    onClick={() => handleZoneClick(zone.path)}
                    className="bg-red-500 text-white text-sm px-4 py-2 rounded-full w-fit mb-4 hover:bg-red-600 transition-colors"
                  >
                    Explore More
                  </button>
                  <h2 className="text-xl font-semibold mb-2 font-poppins">{zone.title}</h2>
                  <div className="flex items-start gap-3">
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-4 flex-1">
                      {zone.desc}
                    </p>
                    <button
                      onClick={() => handleZoneClick(zone.path)}
                      className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center text-xl hover:bg-red-600 transition-colors flex-shrink-0 mt-1"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
