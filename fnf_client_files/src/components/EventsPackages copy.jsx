"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap, Trophy, Gamepad2, Crown, Gift, ArrowRight, Check, Phone, Download, X, CheckCircle, AlertCircle } from "lucide-react";
import BookingModal from "./BookingModal";
import { useEventPackages } from "../Context/EventPackagesContext";
import { useContact } from "../Context/ContactContext";
import { useMenuDocuments } from "../context/MenuDocumentsContext";

// Alert Component
const Alert = ({ type, message, onClose }) => {
  React.useEffect(() => {
    // For success alerts, keep them visible much longer
    const autoCloseTime = type === 'success' ? 12000 : 5000; // 12 seconds for success

    const timer = setTimeout(() => {
      onClose();
    }, autoCloseTime);

    return () => clearTimeout(timer);
  }, [onClose, type]);

  return (
    <motion.div
      className="fixed top-4 right-4 z-[90] max-w-md"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-4 rounded-lg shadow-lg border-l-4 ${
        type === 'success'
          ? 'bg-green-50 border-green-500 text-green-800'
          : 'bg-red-50 border-red-500 text-red-800'
      }`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const EventPackages = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [alert, setAlert] = useState(null);

  // Use the context to get packages data
  const { packages: apiPackages, loading, error } = useEventPackages();

  // Use the contact context to get contact data
  const { contactData, loading: contactLoading, error: contactError } = useContact();

  // Use menu documents context to get overall menu
  const { menuDocuments, loading: menuLoading } = useMenuDocuments();

  // Default icons for packages
  const defaultIcons = [
    <Star className="w-6 h-6" />,
    <Zap className="w-6 h-6" />,
    <Trophy className="w-6 h-6" />,
    <Gamepad2 className="w-6 h-6" />,
    <Crown className="w-6 h-6" />,
    <Gift className="w-6 h-6" />
  ];

  // Transform API data to component format
  const packages = React.useMemo(() => {
    if (!apiPackages || apiPackages.length === 0) {
      // Fallback packages if API fails
      return [
        {
          id: 1,
          name: "FRESHER PACK",
          subtitle: "Perfect Start!",
          icon: <Star className="w-6 h-6" />,
          originalPrice: 1647,
          offerPrice: 1399,
          features: [
            "GOKARTING (5 LAPS)",
            "BOWLING",
            "FOOD"
          ],
          popular: false,
          tier: "starter"
        },
        {
          id: 2,
          name: "RAISING STAR PACK",
          subtitle: "Level Up!",
          icon: <Zap className="w-6 h-6" />,
          originalPrice: 1646,
          offerPrice: 1599,
          features: [
            "GOKARTING (5 LAPS)",
            "ARCHERY OR RIFLE SHOOTING OR PAINT BALL SHOOTING",
            "ZIPLINE ROLLERCOASTER OR SKY ROLLER OR SKY CYCLE",
            "FOOD"
          ],
          popular: false,
          tier: "intermediate"
        }
      ];
    }

    return apiPackages.map((pkg, index) => {
      // Parse features JSON string
      let features = [];
      try {
        features = JSON.parse(pkg.features || '[]');
      } catch (e) {
        // console.warn('Error parsing features for package:', pkg.name);
        features = [];
      }

      // Parse guidelines if needed
      let guidelines = [];
      try {
        guidelines = JSON.parse(pkg.guidelines || '[]');
      } catch (e) {
        // console.warn('Error parsing guidelines for package:', pkg.name);
        guidelines = [];
      }

      return {
        id: parseInt(pkg.id),
        name: pkg.name,
        subtitle: pkg.description,
        icon: defaultIcons[index % defaultIcons.length],
        originalPrice: parseInt(pkg.price),
        offerPrice: parseInt(pkg.discounted_price),
        features: features,
        guidelines: guidelines,
        // Note: Deliberately not setting popular to true even if is_most_popular is "1"
        popular: false,
        tier: index === 0 ? "starter" :
              index === 1 ? "intermediate" :
              index === 2 ? "advanced" :
              index === 3 ? "premium" :
              index === 4 ? "elite" : "ultimate"
      };
    }).sort((a, b) => a.offerPrice - b.offerPrice);
  }, [apiPackages]);

  const calculateDiscount = (original, offer) => {
    if (original <= offer) return 0;
    return Math.round(((original - offer) / original) * 100);
  };

  const handleBookPackage = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const showAlert = (type, message) => {
    console.log('Parent showAlert called:', { type, message });
    setAlert({ type, message });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const closeModal = (bookingResult = null) => {
    console.log('Closing modal with result:', bookingResult);
    setIsModalOpen(false);
    setSelectedPackage(null);

    // Show alert after modal closes if there's a booking result
    if (bookingResult) {
      if (bookingResult.success) {
        const successMessage = `🎉 Booking successful! Booking ID: #${bookingResult.data?.id || 'PENDING'}. We will contact you within 24 hours to confirm your event details.`;
        showAlert('success', successMessage);
      } else {
        const errorMessage = bookingResult.error || 'Failed to create booking. Please try again or contact our support team.';
        showAlert('error', errorMessage);
      }
    }
  };

  // Handle contact event specialist - make phone call
  const handleContactSpecialist = () => {
    if (contactData && contactData.phone) {
      // Use tel: protocol to initiate phone call
      window.location.href = `tel:${contactData.phone}`;
    } else {
      // Fallback if no phone number available
      alert("Contact information is not available at the moment. Please try again later.");
    }
  };

  // Handle download brochure - open PDF in new tab
  const handleDownloadBrochure = () => {
    if (!menuLoading && menuDocuments.overall_menu) {
      window.open(menuDocuments.overall_menu, '_blank');
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="relative bg-[#1e2125] text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-white text-[28px] md:text-[32px] font-sansitaOne mb-2">
              Loading Packages...
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-[#606265] rounded-2xl p-6 animate-pulse">
                <div className="h-32 bg-gray-400 rounded mb-4"></div>
                <div className="h-4 bg-gray-400 rounded mb-2"></div>
                <div className="h-4 bg-gray-400 rounded mb-2"></div>
                <div className="h-4 bg-gray-400 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative bg-[#1e2125] text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-white text-[28px] md:text-[32px] font-sansitaOne mb-2">
              Error Loading Packages
            </h2>
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Alert Component - Positioned at top level for persistence */}
      <AnimatePresence>
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={hideAlert}
          />
        )}
      </AnimatePresence>

      <section className="relative bg-[#1e2125] text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen overflow-hidden">

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Corporate Event Icons */}
          <div className="absolute top-20 right-20 opacity-5">
            <svg width="100" height="100" viewBox="0 0 100 100" className="text-white/20">
              <rect x="20" y="30" width="60" height="40" rx="5" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="50" cy="50" r="8" fill="currentColor"/>
              <path d="M30 20 L70 20 M35 25 L65 25" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>

          {/* Package Icons */}
          <div className="absolute bottom-32 left-16 opacity-8">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-red-500/15">
              <rect x="15" y="25" width="50" height="30" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="40" cy="40" r="6" fill="currentColor"/>
              <path d="M25 15 L55 15 M30 20 L50 20" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>

          {/* Decorative Patterns */}
          <div className="absolute top-1/3 left-10 opacity-6">
            <svg width="60" height="60" viewBox="0 0 60 60" className="text-yellow-500/20">
              <polygon points="30,5 35,20 50,20 38,30 42,45 30,37 18,45 22,30 10,20 25,20" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* Checker Pattern Border Top */}
        <div
          className="absolute left-0 right-0 top-2 h-6 pointer-events-none z-10"
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
              linear-gradient(180deg,#C7161E,#d94b4b)
            `,
            backgroundSize: "28px 28px, 28px 28px, auto",
            backgroundPosition: "0 0, 14px 14px, 0 0",
            backgroundRepeat: "repeat",
            transform: "translateY(-8px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-6">
              <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
                Corporate Events
              </span>
            </div>
            <h2 className="text-[36px] md:text-[42px] font-sansitaOne mb-2">
              <span className="text-white">Corporate/ Group Booking</span><span className="text-red-600"> Packages</span>
            </h2>
            <p className="text-white mt-4 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              Choose the perfect package for your corporate/group event. From team building activities
              to thrilling adventures.
              <span className="text-red-600"> Corporate and group bookings are available for minimum 20+
                participants, ensuring efficient scheduling, food arrangements, and a hassle-free experience.<br/></span><span className="text-white">Bookings should be prior 3 days with 50% advance payment.</span>
            </p>
          </motion.div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                className={`relative bg-[#606265] rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl border-2 flex flex-col ${
                  hoveredCard === pkg.id ? 'border-red-500' : 'border-gray-200'
                }`}
                onMouseEnter={() => setHoveredCard(pkg.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ height: '650px' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  background: "linear-gradient(135deg, #606265 0%, #888a8c 100%)",
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Note: Popular badge is completely removed - no conditional rendering */}

                {/* Header */}
                <div className="p-6 text-white">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {pkg.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold">{pkg.name}</h3>
                    </div>
                    <p className="text-sm opacity-90 mb-4">{pkg.subtitle}</p>

                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-3xl font-extrabold">₹{pkg.offerPrice}</span>
                      {pkg.originalPrice > pkg.offerPrice && (
                        <div className="text-center">
                          <span className="text-sm line-through opacity-75 block">₹{pkg.originalPrice}</span>
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {calculateDiscount(pkg.originalPrice, pkg.offerPrice)}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs opacity-75">Per Person</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="px-6 text-white flex-grow flex flex-col">
                  <div style={{ height: '320px' }} className="overflow-hidden">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-start gap-3"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm leading-relaxed font-medium">
                            {feature.includes('OR') ? (
                              <>
                                {feature.split('OR').map((part, i) => (
                                  <span key={i}>
                                    {part.trim()}
                                    {i < feature.split('OR').length - 1 && (
                                      <span className="text-red-500 font-bold mx-1">OR</span>
                                    )}
                                  </span>
                                ))}
                              </>
                            ) : (
                              feature
                            )}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Book Now Button - Always at bottom */}
                  <div className="pt-6 pb-6">
                    <motion.button
                      onClick={() => handleBookPackage(pkg)}
                      className={`w-full py-3 px-6 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 hover:shadow-lg transform transition-all duration-200 flex items-center justify-center gap-2`}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#dc2626",
                        boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book This Package
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    {/* Additional Info */}
                    <div className="mt-4 pt-4 border-t border-gray-400">
                      <p className="text-xs text-gray-300 text-center">
                        * All packages include food and are per person
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-[#606265] rounded-2xl p-8 shadow-md border border-gray-200 relative overflow-hidden"
              whileHover={{
                background: "linear-gradient(135deg, #606265 0%, #888a8c 100%)",
                borderColor: "#ef4444",
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 font-sansitaOne text-white">Need a Custom Package?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-lg">
                  Contact our event specialists to create a personalized package that perfectly fits your corporate event requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    onClick={handleContactSpecialist}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#dc2626",
                      boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    disabled={contactLoading}
                  >
                    <Phone className="w-4 h-4" />
                    {contactLoading ? "Loading..." : "Contact Event Specialist"}
                  </motion.button>
                  <motion.button
                    onClick={handleDownloadBrochure}
                    className="border-2 border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#9ca3af",
                      color: "#ffffff",
                      borderColor: "#9ca3af",
                    }}
                    whileTap={{ scale: 0.95 }}
                    disabled={menuLoading}
                  >
                    <Download className="w-4 h-4" />
                    {menuLoading ? "Loading..." : "Download Brochure"}
                  </motion.button>
                </div>
                {contactError && (
                  <p className="text-red-400 text-sm mt-2">
                    Contact information temporarily unavailable
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Checker Pattern Border Bottom */}
        <div
          className="absolute left-0 right-0 bottom-2 h-6 pointer-events-none z-10"
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
              linear-gradient(180deg,#C7161E,#d94b4b)
            `,
            backgroundSize: "28px 28px, 28px 28px, auto",
            backgroundPosition: "0 0, 14px 14px, 0 0",
            backgroundRepeat: "repeat",
            transform: "translateY(8px)",
            boxShadow: "0 -6px 20px rgba(0,0,0,0.6)",
          }}
        />
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedPackage={selectedPackage}
        showAlert={showAlert}
      />
    </>
  );
};

export default EventPackages;
