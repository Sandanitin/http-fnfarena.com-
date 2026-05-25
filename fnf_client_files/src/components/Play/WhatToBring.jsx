import { Footprints, IdCard, Shirt } from "lucide-react";
import React from "react";
import Id from "../../assets/Vector.png"
export default function WhatToBring() {
  return (
  <section className="bg-[#292d30] text-white py-16 relative overflow-hidden what-bring-section">
      <div className="relative max-w-7xl mx-auto px-6">
        <header className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-red-600 italic">What to</span>{' '}
            <span className="text-white italic">Bring</span>
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Pack light, stay comfy, and get ready for a great time! To make sure you enjoy every moment,
            here are a few essentials you'll want to bring along.
          </p>
        </header>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
         {/* Card 1 */}
<article className=" 
rounded-2xl p-8 shadow-lg transform hover:-translate-y-1 transition 
text-center flex flex-col items-center 
max-w-[210px] min-h-[270px] w-full mx-auto  border border-white">

  <div className="w-full flex justify-center mb-6">
    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
     <Shirt className="w-12 h-12 text-indigo-500 fill-indigo-500" />

    </div>
  </div>

  <h3 className="text-xl font-semibold mb-2">Comfortable Clothes</h3>
  <p className="text-gray-300 text-sm text-center">Move freely, play easily, and stay relaxed throughout your visit.</p>
</article>

{/* Card 2 */}
<article
  className="
    rounded-2xl p-8 shadow-lg transform hover:-translate-y-1 transition 
    text-center flex flex-col items-center 
    max-w-[210px] min-h-[270px] w-full mx-auto
    border border-white
  "
>


  <div className="w-full flex justify-center mb-6">
    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
      <Footprints className="text-black w-12 h-12 fill-indigo-500" />
    </div>
  </div>

  <h3 className="text-xl font-semibold mb-2">Closed Shoes</h3>
  <p className="text-gray-300 text-sm text-center">Safety first! Closed shoes help you enjoy every activity without worry.</p>
</article>

{/* Card 3 */}
<article className="
rounded-2xl p-8 shadow-lg transform hover:-translate-y-1 transition 
text-center flex flex-col items-center 
max-w-[210px] min-h-[270px] w-full mx-auto  border border-white">

  <div className="w-full flex justify-center mb-6">
    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="430" height="430" fill="#66339e" viewBox="0 0 430 430">
        <g stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="12">
          <path stroke="#83140f" d="m203.9 84.3-22.7-30.6c-6.2-8.4-2.9-20.5 6.7-24.5 2.1-.8 4.2-1.2 6.2-1.2 7.7 0 14.7 5.5 15.9 13.7l5.9 39.6m-58.4 261.8c.1-.1.1-.2.2-.3 21.1-36.6 8.6-83.5-28-104.6-.1-.1-.2-.1-.3-.2"/>
          <path fill="#66339e" stroke="#66339e" d="m282.1 178.6-35.7 61.9c-8.5 14.7-3.4 33.4 11.2 41.9l40 23.1c24.5 14.2 32.9 45.5 18.8 70-14.2 24.5-45.5 32.9-70 18.8L129 326.6c-21-12.1-28.2-39-16.1-60l80.4-139.2"/>
          <path stroke="white" d="m282.1 178.6-88.8-51.3c-6.1-3.5-8.2-11.4-4.7-17.5l13-22.5c3.5-6.1 11.4-8.2 17.5-4.7l88.8 51.3c6.1 3.5 8.2 11.4 4.7 17.5l-13 22.5c-3.5 6.1-11.4 8.2-17.5 4.7"/>
        </g>
      </svg>
    </div>
  </div>

  <h3 className="text-xl font-semibold mb-2">Socks</h3>
  <p className="text-gray-300 text-sm text-center">A must-have for certain zones and activities that require extra comfort and hygiene.</p>
</article>

{/* Card 4 */}
<article className="rounded-2xl p-8 shadow-lg transform hover:-translate-y-1 transition 
text-center flex flex-col items-center 
max-w-[210px] min-h-[270px] w-full mx-auto  border border-white">

  <div className="w-full flex justify-center mb-6">
    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
   
<img src={__CDN_BASE__+"Vector.png"} alt=""  loading="lazy" className=" w-12 h-12" />
    </div>
  </div>

  <h3 className="text-xl font-semibold mb-2">Valid ID</h3>
  <p className="text-gray-300 text-sm text-center">Needed for entry, registrations, and age verification where required.</p>
</article>

        </div>

        <p className="mt-12 text-center text-2xl text-gray-200">Bring these basics, and you’re all set for a smooth, fun-filled experience from start to finish!</p>
      </div>
    </section>
  );
}
