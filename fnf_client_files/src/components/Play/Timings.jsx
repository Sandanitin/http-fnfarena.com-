import { History } from "lucide-react";
import React from "react";

export default function Timings() {
  return (
    <section className="bg-[#292d30] text-white py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Header: icon + title */}
        <div className="flex items-center justify-center gap-4 mb-6">

<History className="w-12 h-12 text-red-600" />


          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold italic tracking-tight font-sansitaOne">
            Timings
          </h2>
        </div>

        {/* Content*/}
        <div className="mx-auto max-w-7xl">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 opacity-95 font-lato">
            Get ready for a full day of speed, excitement, and unforgettable family fun! <br/>
             Our
            Go-Karting Track, Adventure Park, and Family Fun Zone are open all week, so you can
            drop in anytime for a dose of adrenaline or a relaxed day out with loved ones.
          </p>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 opacity-95 font-lato">
            Holiday seasons and special events bring extra buzz — which sometimes means updated
            timings. To make the most of your visit, we recommend checking for real-time schedule
            updates during festive periods or major events.
          </p>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-95 font-lato">
            Whether you're planning a quick visit or a full-day adventure, our team makes sure you
            always have clear, up-to-date information so your experience is smooth, fun, and
            hassle-free.
          </p>
        </div>
      </div>
      <div className="mt-8"></div>
    </section>
  );
}


