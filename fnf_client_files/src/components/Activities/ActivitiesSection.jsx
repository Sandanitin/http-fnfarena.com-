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
      img: `${__CDN_BASE__}MLK_3739.jpg.jpeg`,
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
          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Explore every zone, pick your thrill, and make your day unforgettable.
            From speed duels to sky rides and battle zones — each activity is built
            to ignite excitement.
            <br />
            <br />
            Whether you're here to race, compete, or just have fun — there's
            always something waiting for your next move at FNF Arena.
          </p>
        </div>

        {/* Zigzag Cards Layout */}
        <div className="space-y-12">

          {zones.map((zone, index) => (
            <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className="relative max-w-4xl w-full">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 cursor-pointer group">
                  <div className={`flex flex-col lg:flex-row items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Hexagonal Image */}
                    <div className="lg:w-1/2 p-8 flex justify-center">
                      <div className="relative">
                        <div className="w-52 h-52 transform  overflow-hidden shadow-2xl group-hover:rotate-45 transition-transform duration-1000">
                          <img
                            src={zone.img}
                            loading="lazy"
                            alt={zone.title}
                            className="w-full h-full object-cover transform -rotate-45 scale-150"
                          />
                        </div>
                        <div className="absolute inset-0 border-4 border-red-500/20 transform rotate-45 rounded-lg"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-1/2 p-8">
                      <div className="relative">
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-red-500"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-red-500"></div>

                        <button
                          onClick={() => handleZoneClick(zone.path)}
                          className="bg-red-500 text-white text-sm px-6 py-2 rounded-full w-fit mb-6 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          Explore More
                        </button>
                        <h2 className="text-2xl font-bold mb-4 font-poppins text-gray-800">{zone.title}</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                          {zone.desc}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-red-300 rounded-full"></div>
                            <div className="w-3 h-3 bg-red-200 rounded-full"></div>
                          </div>
                          <button
                            onClick={() => handleZoneClick(zone.path)}
                            className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center text-xl hover:bg-red-600 transition-colors transform hover:scale-110 duration-300"
                          >
                            →
                          </button>
                        </div>
                      </div>
                    </div>
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
