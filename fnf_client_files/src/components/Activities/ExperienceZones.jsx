import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; 
import jump from "../../assets/jump.jpg";
import Frame6 from "../../assets/frnds.jpg";
import img1 from "../../assets/chair.png";
import bagroundpattern from "../../assets/backgroud-pattern.png";
const ExperienceZones = () => {

  const sliderRef = useRef(null);

  const scrollNext = () => sliderRef.current?.scrollBy({ left: 460, behavior: "smooth" });
  const scrollPrev = () => sliderRef.current?.scrollBy({ left: -460, behavior: "smooth" });

  return (
    <div className="bg-[#0e1116] text-white w-full overflow-hidden">

      <section
  className="relative w-full overflow-hidden py-16 px-6 lg:px-20 bg-cover bg-top bg-no-repeat"
style={{ backgroundImage: `url(${__CDN_BASE__ + "backgroud-pattern.png"})` }}


>

         <div
            className="absolute left-0 right-0 top-2 h-6 pointer-events-none"
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
              backgroundSize: "28px 28px, 28px 28px, auto",
              backgroundPosition: "0 0, 14px 14px, 0 0",
              backgroundRepeat: "repeat",
              transform: "translateY(-8px)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
            }}
          />
        <div className="mt-10 mb-10 font-sansita">
          <h2 className="text-7xl sm:text-5xl font-extrabold leading-tight">
            Experience the
            <span className="text-red-500 block">Thrill of Every Zone</span>
          </h2>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 w-full">

          {/* Slider */}
        {/* Slider Block */}
<div className="w-full lg:w-[68%] relative">

  <div ref={sliderRef} className="flex gap-4 overflow-x-hidden snap-x scroll-smooth">

    {/* 1 */}
    <div className="min-w-[400px] max-w-[400px] rounded-xl overflow-hidden snap-center">
      <img src=  {__CDN_BASE__+"girlshoot.jpg"}  loading="lazy"
       className="w-full h-64 object-cover" alt="Zone 1" />
    </div>

    {/* 2 */}
    <div className="min-w-[400px] max-w-[400px] rounded-xl overflow-hidden snap-center">
      <img src={__CDN_BASE__+"jump.jpg"}  loading="lazy" className="w-full h-64 object-cover" alt="Zone 2" />
    </div>

    {/* 3 - Slider Peek */}
    <div className="min-w-[330px] max-w-[330px] rounded-xl overflow-hidden snap-center">
      <img src={__CDN_BASE__+"frnds.jpg"}  loading="lazy" className="w-full h-64 object-cover" alt="Zone 3" />
    </div>
  </div>


  {/* FINAL ROW - Both on same line */}
  <div className="flex justify-between items-center mt-6 w-full">

    {/* LEFT: Explore Button */}
    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition">
      EXPLORE ACTIVITIES
    </button>

    {/* RIGHT: Chevron Arrows Lucide */}
    <div className="flex gap-4">
      <button
        onClick={scrollPrev}
        className="p-3 rounded-full border hover:bg-white hover:text-black flex items-center justify-center"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={scrollNext}
        className="p-3 rounded-full border hover:bg-white hover:text-black flex items-center justify-center"
      >
        <ChevronRight size={22} />
      </button>
    </div>

  </div>
</div>

          {/* Right Image */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <img src={__CDN_BASE__+"chair.png"}  loading="lazy" className="w-80 sm:w-96 drop-shadow-[0_0_80px_rgba(255,0,255,0.5)]" alt="Arcade Machine" />
          </div>

        </div>
      </section>
    </div>
  );
};

export default ExperienceZones;
