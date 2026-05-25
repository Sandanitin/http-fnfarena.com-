import React from "react";
import mainImage from "../assets/sec332.jpg"; 
import { useNavigate } from "react-router-dom";
import short from "../assets/sect33.jpg";
import { Cctv, Cross, HardHat, ShieldUser, Wrench } from "lucide-react";
export default function HeroSafety() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden py-40 px-6 md:py-32 md:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 20% 40%, rgba(128,128,128,0.45) 0%, rgba(128,128,128,0.30) 25%, rgba(0,0,0,0.0) 70%)',
          mixBlendMode: 'normal',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left column: images */}
          <div className="flex items-center justify-center md:justify-start">
            <div className="relative w-full max-w-md md:max-w-lg">
             <img
  src={`${__CDN_BASE__}69e9ee5815536.jpg`}
  alt="FNF Arena bumper cars and building"  loading="lazy"
  className="block rounded-sm shadow-lg object-cover"
  style={{ width: "452px", height: "524px" }}
/>

              <div className="absolute -bottom-6 left-96 md:left-26 w-36 md:w-44 lg:w-52 border-4 border-red-600 shadow-2xl bg-white">

             <img
  src={`${__CDN_BASE__}69cfccec43789.jpg`}
  alt="inset bumper cars"  loading="lazy"
  className="w-[322px] h-[167px] object-cover scale-125 border-2  border-red-600 "
/>

              </div>
            </div>
          </div>

           {/* Right column */}
          <div className="text-white/95 px-2 md:px-6 lg:px-12">
            <h3 className="text-white font-extrabold text-[32px] mt-1 font-sansitaOne">FNF Arena Safety Standards</h3>
             <h2 className="text-red-500 font-extrabold text-[42px] mt-1 font-sansitaOne">
              Fun with Confidence
            </h2>

            <p className="mt-4 text-sm md:text-base text-gray-200 max-w-xl">
              Fun should never compromise safety. We maintain international standards across all
              attractions.
            </p>

            <h4 className="mt-6 font-semibold text-gray-100/95">Your Thrill, Our Guarantee</h4>

            {/* Two-column safety points */}
<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-200 text-sm md:text-base">

  {/* Left column */}
  <div className="space-y-4">
    <div className="flex items-start gap-3">
     <ShieldUser className="w-12 h-12" />
      <p>Certified instructors & safety marshals on duty</p>
    </div>

    <div className="flex items-start gap-3">
      <HardHat className="w-12 h-12" />
      <p>Helmets, harnesses and protective gear mandatory</p>
    </div>

    <div className="flex items-start gap-3">
        <Cctv className="w-12 h-12" />
      <p>CCTV & real-time supervision in all zones</p>
    </div>
  </div>

  {/* Right column */}
  <div className="space-y-4">
    <div className="flex items-start gap-3">
       <Wrench className="w-12 h-12" />
      <p>Routine maintenance & daily inspection reports</p>
    </div>

    <div className="flex items-start gap-3">
       <Cross className="w-12 h-12" />
      <p>Age, height & health-based restrictions</p>
    </div>
  </div>

</div>


            <div className="mt-8">
              <button onClick={() => navigate('/all-activities')} className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-12 rounded shadow">
                EXPLORE  <br/>
                 ACTIVITIES
              </button>
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
}
