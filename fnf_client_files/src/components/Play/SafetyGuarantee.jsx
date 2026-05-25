import React, { useState } from "react";

const SafetyGuarantee = () => {
  const items = [
    <>Fun should never come at the cost of safety — and with us, it never will. <br/>
    Every feature, every activity, and every moment is designed to give you maximum excitement with complete peace of mind.</>,
    <>We maintain international safety standards across all attractions — from equipment quality to operational procedures — ensuring <br/>every ride and experience meets globally recognized benchmarks.</>,
    <>Certified instructors and safety marshals are always on duty, ready to guide, supervise, and assist you with professional expertise<br/> and quick-response readiness.</>,
    <>Helmets, harnesses, and protective gear are mandatory, and our team makes sure everything fits perfectly so you can move, play, <br/>
    and explore with total confidence.</>,
    <>Age-, height-, and health-based restrictions are strictly enforced, ensuring guests participate only in activities that match their<br/> physical readiness and safety requirements.</>,
    <>CCTV and real-time supervision across all zones mean our team always has eyes on the action — offering immediate support,<br/> quick intervention, and uninterrupted safety oversight.</>,
    <>Routine maintenance and daily inspection reports keep our tracks, equipment, and spaces in peak condition. Nothing goes live <br/>without a thorough safety check.</>
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="w-full bg-[#191e22] text-white py-32 px-6 flex justify-center">
      <div className="max-w-7xl">
        {/* Heading */}
      <div className="text-center mb-12 px-4">
  <p className="
    text-red-500 
    text-sm md:text-base 
    font-lato 
    text-center md:text-left
    md:ml-20 lg:ml-40
  ">
    We ensure your focus stays on the fun.
  </p>

  <h2 className="
    text-3xl sm:text-4xl md:text-5xl 
    font-bold italic 
    mt-4 
    font-sansitaOne 
    pb-8 md:pb-12
  ">
    Your Thrill, Our Guarantee
  </h2>
</div>


        {/* Timeline */}
        <div className="relative pl-14">
          {/* line */}
          <div className="absolute left-6 top-0 bottom-[2.2rem] border-l-2 border-gray-600 border-dotted"></div>

          <div className="space-y-12">
            {items.map((text, index) => (
              <div key={index} className="relative">
                {/*  Circle */}
                <button
                  onClick={() => setActiveIndex(index)}
                  className={`
                    absolute left-[-42px] -top-1 w-6 h-6 rounded-full border-2 transition 
                    ${activeIndex === index ? "bg-gray-300 border-gray-300" : "border-gray-400 bg-black"}
                  `}
                ></button>

                {/* Text */}
                <p className="text-gray-300 leading-relaxed text-xl md:text-xl pl-4">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SafetyGuarantee;
