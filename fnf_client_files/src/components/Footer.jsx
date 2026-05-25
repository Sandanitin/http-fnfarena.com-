import React from "react";
import { Link } from "react-router-dom";
import fnfLogo from "../assets/Footer.png"; // Adjust path if needed
import { Phone, Mail, MapPin, Loader2, ExternalLink } from "lucide-react";
import { useContact } from "../context/ContactContext";

export default function Footer() {
  const { contactData, loading, error } = useContact();

  // Fallback data if API fails
  const fallbackData = {
    phone: "7719333444",
    phone2: "9090945459",
    email: "contact@fnfarena.com",
    email2: "groupbooking@fnfarena.com",
    address: "FNF ARENA Janwada, Hyderabad, Telangana 500075"
  };

  // Use API data if available, otherwise use fallback
  const contact = contactData || fallbackData;

  // Extract Google Maps URL from iframe if available
  const getMapUrl = () => {
    if (contact.map) {
      try {
        // Extract src URL from iframe
        const srcMatch = contact.map.match(/src="([^"]+)"/);
        if (srcMatch && srcMatch[1]) {
          // Convert embed URL to regular Google Maps URL
          const embedUrl = srcMatch[1];
          if (embedUrl.includes('maps.google.com')) {
            // Extract location from embed URL and create a proper Google Maps link
            const locationMatch = embedUrl.match(/q=([^&]+)/);
            if (locationMatch && locationMatch[1]) {
              const location = decodeURIComponent(locationMatch[1]);
              return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
            }
          }
          return embedUrl;
        }
      } catch (error) {
        // console.error('Error parsing map URL:', error);
      }
    }

    // Fallback to search for the address
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;
  };

  const handleGetDirections = () => {
    const mapUrl = getMapUrl();
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#BA1C1C] text-white py-6 px-6 md:px-16 lg:px-24 font-[Rajdhani]">
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* LOGO & DESCRIPTION SECTION */}
        <div className="flex flex-col items-start md:col-span-3 lg:col-span-2 ">
          <div className="">
            <img
              src="https://cdn.acsdev.in/FNF/Link.png"
              alt="FNF Arena Logo"
              loading="lazy"
              className="w-32 h-32 md:w-80 md:h-auto object-contain"
            />
          </div>
          <p className="mt-5 text-[#1a1f22] font-black">FNF ARENA - Enter for Fun. Leave Furious</p>
          <p className=" leading-relaxed text-[15px] max-w-sm">
          Ultimate hub For Go karting , Bowling , Laser Tag , Paintball Arena ,
          Soft Play & Trampoline , Zipline Roller coaster , Sky cycle , Sky roller
           & Endless Fun Activities

          </p>
        </div>

        {/* CONTACT INFO */}
        <div className="md:col-start-2 lg:col-start-3">
          <h2 className="text-xl font-semibold mb-5">Contact Info</h2>

          {loading ? (
            <div className="flex items-center gap-3 text-gray-200">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading contact info...</span>
            </div>
          ) : (
            <div className="space-y-4 text-[16px] text-gray-200">
              {/* Phone Numbers - Stacked Vertically */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:+91${contact.phone}`}
                    className="hover:text-white transition-colors whitespace-nowrap"
                  >
                    +91 {contact.phone}
                  </a>
                  <a
                    href={`tel:+91${contact.phone2 || contact.phone}`}
                    className="hover:text-white transition-colors whitespace-nowrap"
                  >
                    +91 {contact.phone2 || contact.phone}
                  </a>
                </div>
              </div>

              {/* Email Addresses - Stacked Vertically */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                  <a
                    href={`mailto:${contact.email2 || contact.email}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {contact.email2 || contact.email}
                  </a>
                </div>
              </div>

              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{contact.address}</span>
              </p>

              {/* Show indicator if using fallback data */}
              {error && !contactData && (
                <p className="text-xs text-gray-300 italic">
                  * Using default contact information
                </p>
              )}
            </div>
          )}
        </div>

        {/* VISIT US */}
        <div className="md:col-start-3 lg:col-start-4">
          <h2 className="text-xl font-semibold mb-5">Visit Us</h2>
          <div className="space-y-3 text-[16px]">
            <p className="text-gray-200 leading-relaxed">
              Operating hours : 11 am to 1 am ( All Days )
            </p>
            <button
              onClick={handleGetDirections}
              className="inline-flex items-center gap-2 bg-white text-[#BA1C1C] px-4 py-2 rounded hover:bg-gray-100 transition-colors font-semibold text-sm sm:text-base"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm">
        <p className="text-gray-200 leading-relaxed">
          © 2026 - FNF Arena — Speed. Play. Together. {contact.address}'s Arena Of Adrenaline & Joy.
        </p>
      </div>
    </footer>
  );
}
