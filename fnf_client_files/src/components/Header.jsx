import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import PDFModal from "./PDFModal";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const dropdownRefs = useRef({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown) {
        const currentRef = dropdownRefs.current[activeDropdown];
        if (currentRef && !currentRef.contains(event.target)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  const go = (path) => {
    setIsOpen(false);
    setActiveDropdown(null);
    sessionStorage.setItem('hasNavigatedInternally', 'true');
    navigate(path);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMouseLeave = (dropdown) => {
    // Small delay to allow moving to dropdown menu
    setTimeout(() => {
      const currentRef = dropdownRefs.current[dropdown];
      if (currentRef && !currentRef.matches(':hover')) {
        setActiveDropdown(null);
      }
    }, 100);
  };

  const handleGamingMenuClick = () => {
    setActiveDropdown(null);
    setIsOpen(false);
    setIsPDFModalOpen(true);
  };

  const handleClosePDFModal = () => {
    setIsPDFModalOpen(false);
  };

  // Reusable dropdown wrapper component
  const DropdownWrapper = ({ id, label, children }) => (
    <div
      className="relative"
      ref={(el) => (dropdownRefs.current[id] = el)}
      onMouseLeave={() => handleMouseLeave(id)}
    >
      <button
        onClick={() => toggleDropdown(id)}
        onMouseEnter={() => setActiveDropdown(id)}
        className="py-2 px-3 hover:text-white cursor-pointer inline-flex items-center gap-1"
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform ${activeDropdown === id ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {activeDropdown === id && (
        <div className="absolute top-full mt-1 left-0 bg-white text-gray-800 rounded shadow-lg ring-1 ring-black/5 z-40 w-48">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className="w-full sticky top-0 border-b border-white/10 bg-[#2f3132] z-50">
        <div className="max-w-7xl mx-auto px-4 py-0 flex items-center justify-between">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-gray-100 text-sm">
            <button
              onClick={() => go('/')}
              className="py-2 px-3 hover:text-white cursor-pointer"
            >
              Home
            </button>

            {/* Activities Dropdown */}
            <DropdownWrapper id="activities" label="Activities at FNF Arena">
              <button onClick={() => go('/all-activities')} className="w-full text-left px-4 py-2 hover:bg-gray-100">All Activities</button>
              <button onClick={() => go('/plan')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Plan a visit</button>
              <button
                onClick={handleGamingMenuClick}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Gaming Menu
              </button>
            </DropdownWrapper>

            <button
              onClick={() => go('/go-kart')}
              className="py-2 px-3 hover:text-white cursor-pointer"
            >
              Racing Arena
            </button>

            {/* Indoor Dropdown */}
            <DropdownWrapper id="indoor" label="Indoor">
              <button onClick={() => go('/bowling')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Bowling</button>
              <button onClick={() => go('/lasertag')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Laser Tag</button>
              <button onClick={() => go('/softplay-trampoline-bullride')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Softplay & Trampoline & Bull Ride</button>
              <button onClick={() => go('/arcade-games')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Arcade Games</button>
            </DropdownWrapper>
          </nav>

          {/* LOGO */}
          <div className="flex items-center justify-center flex-1 lg:flex-initial">
            <Link
              to="/"
              onClick={() => sessionStorage.setItem('hasNavigatedInternally', 'true')}
            >
              <img src={`${__CDN_BASE__}Link.png`} alt="FNF Logo" loading="lazy" className="h-16 w-auto object-contain" />
            </Link>
          </div>

          {/* Right Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-gray-100 text-sm">
            {/* Outdoor Dropdown */}
            <DropdownWrapper id="outdoor" label="Outdoor">
              <button onClick={() => go('/paintball-arena')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Paintball Arena</button>
              <button onClick={() => go('/drifters')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Drifters </button>
              <button onClick={() => go('/target-zone')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Target Zone</button>
            </DropdownWrapper>

            {/* Adventure Dropdown */}
            <DropdownWrapper id="adventure" label="Adventure">
              <button onClick={() => go('/zipline-roller')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Zipline Roller Coaster</button>
              <button onClick={() => go('/sky-cycle')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Sky Cycle</button>
              <button onClick={() => go('/sky-roller')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Sky Roller</button>
              <button onClick={() => go('/rocket-ejection')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Rocket Ejection</button>
            </DropdownWrapper>

            {/* Food & Events Dropdown */}
            <DropdownWrapper id="food-events" label="Food & Events">
              <button onClick={() => go('/Event')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Event Space</button>
              <button onClick={() => go('/food')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Cafe Saisho</button>
              <button onClick={() => go('/birthday')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Birthday</button>
              <button onClick={() => go('/corporate')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Corporate</button>
            </DropdownWrapper>

            <button
              onClick={() => go('/Contact')}
              className="py-2 px-3 hover:text-white cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* MOBILE MENU ICON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 bg-gray-800 text-white rounded-md text-xl"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isOpen && (
          <div className="lg:hidden bg-[#5f6366] text-white px-4 py-3 space-y-2">
            <button onClick={() => go('/')} className="block py-2 border-b border-white/20 text-left w-full">Home</button>

            <div>
              <button
                onClick={() => toggleDropdown('mobile-activities')}
                className="flex items-center justify-between w-full py-2"
              >
                <span>Activities at FNF Arena</span>
                <ChevronDown size={16} className={`${activeDropdown === 'mobile-activities' ? 'rotate-180' : 'rotate-0'} transition-transform`} />
              </button>
              {activeDropdown === 'mobile-activities' && (
                <div className="pl-4">
                  <button onClick={() => go('/all-activities')} className="block py-2 border-b border-white/20 w-full text-left">All Activities</button>
                  <button onClick={() => go('/plan')} className="block py-2 border-b border-white/20 w-full text-left">Plan a Visit</button>
                  <button
                    onClick={handleGamingMenuClick}
                    className="block py-2 border-b border-white/20 w-full text-left"
                  >
                    Gaming Menu
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => go('/go-kart')} className="block py-2 border-b border-white/20 text-left w-full">Racing Arena</button>

            <div>
              <button
                onClick={() => toggleDropdown('mobile-indoor')}
                className="flex items-center justify-between w-full py-2"
              >
                <span>Indoor</span>
                <ChevronDown size={16} className={`${activeDropdown === 'mobile-indoor' ? 'rotate-180' : 'rotate-0'} transition-transform`} />
              </button>
              {activeDropdown === 'mobile-indoor' && (
                <div className="pl-4">
                  <button onClick={() => go('/bowling')} className="block py-2 border-b border-white/20 w-full text-left">Bowling</button>
                  <button onClick={() => go('/lasertag')} className="block py-2 border-b border-white/20 w-full text-left">Laser Tag</button>
                  <button onClick={() => go('/softplay-trampoline-bullride')} className="block py-2 border-b border-white/20 w-full text-left">Softplay & Trampoline & Bull Ride</button>
                  <button onClick={() => go('/arcade-games')} className="block py-2 w-full text-left">Arcade Games</button>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleDropdown('mobile-outdoor')}
                className="flex items-center justify-between w-full py-2"
              >
                <span>Outdoor</span>
                <ChevronDown size={16} className={`${activeDropdown === 'mobile-outdoor' ? 'rotate-180' : 'rotate-0'} transition-transform`} />
              </button>
              {activeDropdown === 'mobile-outdoor' && (
                <div className="pl-4">
                  <button onClick={() => go('/paintball-arena')} className="block py-2 border-b border-white/20 w-full text-left">Paintball Arena</button>
                  <button onClick={() => go('/drifters')} className="block py-2 border-b border-white/20 w-full text-left">Drifters </button>
                  <button onClick={() => go('/target-zone')} className="block py-2 w-full text-left">Target Zone</button>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleDropdown('mobile-adventure')}
                className="flex items-center justify-between w-full py-2"
              >
                <span>Adventure</span>
                <ChevronDown size={16} className={`${activeDropdown === 'mobile-adventure' ? 'rotate-180' : 'rotate-0'} transition-transform`} />
              </button>
              {activeDropdown === 'mobile-adventure' && (
                <div className="pl-4">
                  <button onClick={() => go('/zipline-roller')} className="block py-2 border-b border-white/20 w-full text-left">Zipline Roller Coaster</button>
                  <button onClick={() => go('/sky-cycle')} className="block py-2 border-b border-white/20 w-full text-left">Sky Cycle</button>
                  <button onClick={() => go('/sky-roller')} className="block py-2 border-b border-white/20 w-full text-left">Sky Roller</button>
                  <button onClick={() => go('/rocket-ejection')} className="block py-2 w-full text-left">Rocket Ejection</button>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleDropdown('mobile-food-events')}
                className="flex items-center justify-between w-full py-2"
              >
                <span>Food & Events</span>
                <ChevronDown size={16} className={`${activeDropdown === 'mobile-food-events' ? 'rotate-180' : 'rotate-0'} transition-transform`} />
              </button>
              {activeDropdown === 'mobile-food-events' && (
                <div className="pl-4">
                  <button onClick={() => go('/Event')} className="block py-2 border-b border-white/20 w-full text-left">Events Space</button>
                  <button onClick={() => go('/food')} className="block py-2 border-b border-white/20 w-full text-left">Cafe Saisho</button>
                  <button onClick={() => go('/birthday')} className="block py-2 border-b border-white/20 w-full text-left">Birthday</button>
                  <button onClick={() => go('/corporate')} className="block py-2 w-full text-left">Corporate</button>
                </div>
              )}
            </div>

            <button onClick={() => go('/Contact')} className="block py-2 border-b border-white/20 text-left w-full">Contact</button>
          </div>
        )}
      </header>

      {/* PDF Modal */}
      <PDFModal
        isOpen={isPDFModalOpen}
        onClose={handleClosePDFModal}
        pdfUrl="https://cdn.acsdev.in/FNF/gaming_menu.pdf"
        title="Gaming Menu"
      />
    </>
  );
}
