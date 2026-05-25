import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 border-b border-white/10 bg-gradient-to-r from-[#6b6e71] via-[#696d6f] via-10% to-transparent backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-start gap-6 text-gray-100 text-sm">
          <Link to="/" className="py-2 px-3 hover:text-white cursor-pointer">Home</Link>
          <Link to="/activities" className="py-2 px-3 hover:text-white cursor-pointer">Activities</Link>
          <Link to="/event" className="py-2 px-3 hover:text-white cursor-pointer">Events</Link>
          <Link to="/contact" className="py-2 px-3 hover:text-white cursor-pointer">Contact</Link>
        </nav>

        <div className="w-60 h-10 rounded flex items-center justify-center ml-[-320px]">
  <Link to="/">
    <img
      src={__CDN_BASE__ + "Link.png"}
      alt="FNF Logo"  loading="lazy"
      className="w-72 object-contain cursor-pointer"
    />
  </Link>
</div>

        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="hidden md:block relative">
            <input
              className="w-56 bg-transparent placeholder-white rounded-full py-2 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-red-500 border border-white"
              placeholder="Search"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white">
              <Search size={18} />
            </button>
          </div>

          {/* MOBILE MENU ICON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 bg-gray-800 text-white rounded-md text-xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-[#5f6366] text-white px-4 py-3 space-y-2 animate-fadeIn">
          <Link to="/" className="block py-2 border-b border-white/20 cursor-pointer">Home</Link>
          <Link to="/activities" className="block py-2 border-b border-white/20 cursor-pointer">Activities</Link>
          <Link to="/event" className="block py-2 border-b border-white/20 cursor-pointer">Events</Link>
          <Link to="/contact" className="block py-2 border-b border-white/20 cursor-pointer">Contact</Link>
        </div>
      )}
    </header>
  );
}
