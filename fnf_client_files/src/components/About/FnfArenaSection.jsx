import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function FnfArenaSection() {
  const navigate = useNavigate();
  return (
    <section className="w-full  bg-[#1e2125] py-16 px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 px-6 lg:px-0 items-center">
     
     

      {/* Right Images */}
      <div className="flex-1 flex justify-center relative">
        {/* Large Circle Image */}
        <div className="w-80 h-80 md:w-[420px] md:h-[420px] rounded-full overflow-hidden shadow-lg">
          <img
            src="https://cdn.acsdev.in/FNF/sec332.jpg"
            alt="Arena Main"  loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Small Circular Image */}
        <div className="absolute bottom-[-24px] left-[300px] w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden bg-[#1a1f23] border-4 border-red-600 shadow-xl translate-x-6 translate-y-6">
          <img
            src="https://cdn.acsdev.in/FNF/Link.png"
            alt="Arena Small"  loading="lazy"
            className="w-full h-full scale-150 object-contain"
          />
        </div>
      </div>

       {/* Left Content */}
       <div className="flex-1 text-left mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight font-sansitaOne">
          Where Speed Meets Spirit,
          <span className="text-red-600"> and Fun</span>
          
          <span className="text-red-600">{' '}Finds a Home</span>
        </h2>

        <p className="mt-6 text-white text-base md:text-lg leading-relaxed max-w-xl">
          FNF Arena Hyderabad isn’t just an adventure park — it’s a movement. A place
          built for people who love to race, play, explore, celebrate, and live in
          the moment. Every corner of our arena carries the pulse of Hyderabad,
          fuelled by community, passion, and innovation.
        </p>

        {/* <button onClick={()=>{navigate("/go-kart")}}
         className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold">
          MEET THE TEAM
        </button> */}
      </div>
      </div>
    </section>
  );
}
