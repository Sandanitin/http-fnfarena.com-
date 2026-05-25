import React from "react";
import { Phone, Mail, Instagram, Facebook, Youtube, Linkedin, Loader2, AlertCircle, RefreshCw, MapPin } from "lucide-react";
import bgImage from "../assets/Contact.png";
import { useNavigate } from "react-router-dom";
import { useContact } from "../Context/ContactContext.jsx";

export default function ContactUs() {
  const navigate = useNavigate();
  const { contactData, loading, error, refetchContactData } = useContact();

  // Loading state
  if (loading) {
    return (
      <div
        className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-16"
        style={{ backgroundImage: `url(${__CDN_BASE__}Contact.png)` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="text-lg">Loading contact information...</p>
        </div>
      </div>
    );
  }

  // Updated fallback data with new contact information including LinkedIn
  const fallbackData = {
    phone: "7719333444",
    phone2: "9090945459",
    email: "contact@fnfarena.com",
    email2: "groupbooking@fnfarena.com",
    instagram: "https://www.instagram.com/fnfarena?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    facebook: "https://www.facebook.com/fnfkarting/",
    youtube: "https://www.youtube.com/",
    linkedin: "",
    address: "FNF ARENA Janwada, Hyderabad, Telangana 500075"
  };

  // Use API data if available, otherwise use fallback
  const contact = contactData || fallbackData;
  const isUsingFallback = !contactData;

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundImage: `url(${__CDN_BASE__}Contact.png)` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 w-full max-w-7xl text-white">
        {/* Error notification (if using fallback data) */}
        {error && isUsingFallback && (
          <div className="mb-6 bg-yellow-500/20 backdrop-blur-md p-4 rounded-xl border border-yellow-400/40 flex items-center justify-center gap-3">
            <AlertCircle className="text-yellow-400" size={20} />
            <span className="text-sm">Using default contact information</span>
            <button
              onClick={refetchContactData}
              className="ml-2 p-1 hover:bg-yellow-400/20 rounded transition-colors"
              title="Retry loading contact data"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            We're here to help you plan your next adventure at Hyderabad's<br />
            <span className="font-semibold">Arena of Adrenaline & Joy.</span>
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left Column - Contact Information */}
          <div className="space-y-8">

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Phone Numbers - Two Cards Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Primary Phone Box */}
                <div className="bg-gray-500/20 backdrop-blur-md p-6 rounded-xl text-center border border-gray-300/40 cursor-pointer hover:bg-gray-500/30 transition-all duration-300">
                  <a href={`tel:+91${contact.phone}`} className="block">
                    <Phone className="text-red-500 mx-auto mb-3" size={30} />
                    <p className="text-sm opacity-80">Primary Contact</p>
                    <p className="text-lg font-semibold">+91 {contact.phone}</p>
                  </a>
                </div>

                {/* Secondary Phone Box */}
                <div className="bg-gray-500/20 backdrop-blur-md p-6 rounded-xl text-center border border-gray-300/40 cursor-pointer hover:bg-gray-500/30 transition-all duration-300">
                  <a href={`tel:+91${contact.phone2 || contact.phone}`} className="block">
                    <Phone className="text-red-500 mx-auto mb-3" size={30} />
                    <p className="text-sm opacity-80">Group Bookings</p>
                    <p className="text-lg font-semibold">+91 {contact.phone2 || contact.phone}</p>
                  </a>
                </div>
              </div>

              {/* Email Boxes - Two Cards Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Primary Email Box */}
                <div className="bg-gray-500/20 backdrop-blur-md p-6 rounded-xl text-center border border-gray-300/40 cursor-pointer hover:bg-gray-500/30 transition-all duration-300">
                  <a href={`mailto:${contact.email}`} className="block">
                    <Mail className="text-red-500 mx-auto mb-3" size={30} />
                    <p className="text-sm opacity-80">General Inquiries</p>
                    <p className="text-lg font-semibold">{contact.email}</p>
                  </a>
                </div>

                {/* Group Booking Email Box */}
                <div className="bg-gray-500/20 backdrop-blur-md p-6 rounded-xl text-center border border-gray-300/40 cursor-pointer hover:bg-gray-500/30 transition-all duration-300">
                  <a href={`mailto:${contact.email2 || contact.email}`} className="block">
                    <Mail className="text-red-500 mx-auto mb-3" size={30} />
                    <p className="text-sm opacity-80">Group Bookings</p>
                    <p className="text-lg font-semibold">{contact.email2 || contact.email}</p>
                  </a>
                </div>
              </div>

              {/* Address Box */}
              {contact.address && (
                <div className="bg-gray-500/20 backdrop-blur-md p-6 rounded-xl text-center border border-gray-300/40">
                  <MapPin className="text-red-500 mx-auto mb-3" size={30} />
                  <p className="text-sm opacity-80">Visit Us</p>
                  <p className="text-lg font-semibold">{contact.address}</p>
                </div>
              )}
            </div>

            {/* Social Section */}
            <div className="text-center">
              <p className="tracking-wider text-sm md:text-base mb-6">FIND US ON SOCIAL</p>

              <div className="flex items-center justify-center gap-8 mb-8">
                {/* Instagram */}
                {contact.instagram && (
                  <div className="flex flex-col items-center gap-2">
                    <a
                      href={contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                    >
                      <Instagram size={30} />
                    </a>
                    <p className="text-sm">Instagram</p>
                  </div>
                )}

                {/* Facebook */}
                {contact.facebook && (
                  <div className="flex flex-col items-center gap-2">
                    <a
                      href={contact.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                    >
                      <Facebook size={30} />
                    </a>
                    <p className="text-sm">Facebook</p>
                  </div>
                )}

                {/* YouTube */}
                {contact.youtube && (
                  <div className="flex flex-col items-center gap-2">
                    <a
                      href={contact.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                    >
                      <Youtube size={30} />
                    </a>
                    <p className="text-sm">YouTube</p>
                  </div>
                )}

                {/* LinkedIn */}
                {contact.linkedin && (
                  <div className="flex flex-col items-center gap-2">
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                    >
                      <Linkedin size={30} />
                    </a>
                    <p className="text-sm">LinkedIn</p>
                  </div>
                )}
              </div>


            </div>
          </div>

          {/* Right Column - Map Section */}
          {contact.map && !isUsingFallback && (
            <div className="lg:sticky lg:top-8">
              <div className="bg-gray-500/20 backdrop-blur-md p-4 rounded-xl border border-gray-300/40 h-full min-h-[500px]">
                <div
                  className="rounded-lg overflow-hidden h-full"
                  dangerouslySetInnerHTML={{ __html: contact.map }}
                />
              </div>
            </div>
          )}

          {/* Placeholder for map when not available */}
          {(!contact.map || isUsingFallback) && (
            <div className="lg:sticky lg:top-8">
              <div className="bg-gray-500/20 backdrop-blur-md p-8 rounded-xl border border-gray-300/40 h-full min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-gray-400 mx-auto mb-4" size={48} />
                  <p className="text-gray-400 text-lg">Map will be displayed here</p>
                  <p className="text-gray-500 text-sm mt-2">Loading map data...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Line */}
        <div className="text-center mt-12">
          {/* Action Buttons */}
              <div className="space-y-4 max-w-4xl mb-8 mx-auto">
                {contact.instagram && (
                  <button
                    onClick={() => window.open(contact.instagram, "_blank")}
                    className="w-full py-4 bg-red-500/20 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 rounded-xl text-lg"
                  >
                    Follow Us for Offers
                  </button>
                )}

                <button
                  onClick={() => navigate('/plan')}
                  className="w-full py-4 bg-gray-500/20 hover:bg-gray-800 transition-all duration-300 text-white rounded-xl text-lg"
                >
                  Plan an Event
                </button>
              </div>
          <p className="text-sm opacity-80">
            FNF Arena — Speed. Play. Together. Hyderabad's Arena of Adrenaline & Joy.
          </p>
        </div>
      </div>
    </div>
  );
}
