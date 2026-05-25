"use client";
import React from "react";

export default function FNFJourney() {
  const timeline = [
    {
  title: "The Beginning",
  text: (
    <>
      A bold idea emerges — to bring a world-class racing and adventure arena to <br />
      Hyderabad.
    </>
  ),
},
    {
      title: "The Kart Track Comes to Life",
      text: (
    <>
      Precision-designed, pro-level karts, digital timing systems, and race-ready <br/>
      lanes.
      </>
      ),
    },
    {
      title: "Events Arena Launched",
      text:(
        <>
      Birthdays, corporate events, team outings, school trips — FNF Arena <br/>
       becomes a celebration hub.</> 
      ),
    },
    {
      title: "Hyderabad’s Most Loved Fun Destination",
      text: "More rides, more joy, more memories. And this is only the beginning.",
    },
  ];

  return (
    <section className="w-full  bg-[#1e2125] text-white py-12 pb-12 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6">

        {/* LEFT IMAGE */}
        <div className="w-full">
          <img
            src={__CDN_BASE__ + "fourth.jpg"} 
            alt="FNF Arena Journey"  loading="lazy"
            className="w-[450px] h-[450px] object-cover rounded-lg mt-14"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-red-500 font-sansitaOne">
            The FNF Arena Journey
          </h2>
          <p className="text-gray-300">
            Make this a horizontal strip with year badges.
          </p>

         <div className="relative ml-4 pl-6">
  {/* DOTTED VERTICAL LINE */}
  <div className="absolute left-0 top-1 bottom-[1.8rem] w-px border-l-2 border-dotted border-gray-600"></div>

  <div className="space-y-8">
    {timeline.map((item, index) => (
      <div key={index} className="relative">
        {/* DOT */}
        <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-400"></span>

        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
      </div>
    ))}
  </div>
</div>

        </div>
      </div>
      
    </section>
  );
}
