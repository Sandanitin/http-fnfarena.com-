"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Zap, Trophy, Gamepad2, Crown, Gift, ArrowRight, Check } from "lucide-react";
import { useContact } from "../Context/ContactContext";
import PDFModal from "./PDFModal";

const EventPackages = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showBrochurePDF, setShowBrochurePDF] = useState(false);
  const { contactData, loading: contactLoading } = useContact();

  const packages = [
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
        "ARCHERY (OR) RIFLE SHOOTING (OR) PAINT BALL SHOOTING",
        "ZIPLINE ROLLERCOASTER (OR) SKY ROLLER (OR) SKY CYCLE",
        "FOOD"
      ],
      popular: false,
      tier: "intermediate"
    },
    {
      id: 3,
      name: "THE INNOVATORS PACK",
      subtitle: "Game Changer!",
      icon: <Trophy className="w-6 h-6" />,
      originalPrice: 2195,
      offerPrice: 1799,
      features: [
        "GOKARTING (5 LAPS)",
        "ARCHERY (OR) RIFLE SHOOTING (OR) PAINT BALL SHOOTING",
        "ROCKET EJECTION",
        "ZIPLINE ROLLERCOASTER (OR) SKY ROLLER (OR) SKY CYCLE",
        "FOOD"
      ],
      popular: true,
      tier: "advanced"
    },
    {
      id: 4,
      name: "GAME CHANGER PACK",
      subtitle: "Ultimate Fun!",
      icon: <Gamepad2 className="w-6 h-6" />,
      originalPrice: 2694,
      offerPrice: 2099,
      features: [
        "GOKARTING (5 LAPS)",
        "BOWLING",
        "ZIPLINE ROLLERCOASTER (OR) SKY ROLLER (OR) SKY CYCLE",
        "TRAMPOLINE (30 MINS)",
        "ARCHERY (OR) RIFLE SHOOTING (OR) PAINT BALL SHOOTING",
        "FOOD"
      ],
      popular: false,
      tier: "premium"
    },
    {
      id: 5,
      name: "PEAK PERFORMER PACK",
      subtitle: "Pro Level!",
      icon: <Crown className="w-6 h-6" />,
      originalPrice: 2993,
      offerPrice: 2399,
      features: [
        "GOKARTING (5 LAPS)",
        "BOWLING",
        "ZIPLINE ROLLERCOASTER (OR) SKY ROLLER (OR) SKY CYCLE",
        "TRAMPOLINE (30 MINS)",
        "ARCHERY (OR) RIFLE SHOOTING (OR) PAINT BALL SHOOTING",
        "ROCKET EJECTION",
        "FOOD"
      ],
      popular: false,
      tier: "elite"
    },
    {
      id: 6,
      name: "BONUS PACK",
      subtitle: "Epic Adventure!",
      icon: <Gift className="w-6 h-6" />,
      originalPrice: 3493,
      offerPrice: 2699,
      features: [
        "GOKARTING (12 LAPS)",
        "BOWLING",
        "ZIPLINE ROLLERCOASTER (OR) SKY ROLLER (OR) SKY CYCLE",
        "TRAMPOLINE (30 MINS)",
        "ARCHERY (OR) RIFLE SHOOTING (OR) PAINT BALL SHOOTING",
        "ROCKET EJECTION",
        "FOOD"
      ],
      popular: false,
      tier: "ultimate"
    }
  ];

  const calculateDiscount = (original, offer) => {
    return Math.round(((original - offer) / original) * 100);
  };

  const handleContactSpecialist = () => {
    const phoneNumber = contactData?.phone2 || "9090945459";
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <section className="relative w-full overflow-visible bg-[#1e2125] text-white min-h-screen">
      {/* Background Pattern */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${__CDN_BASE__}aa.jpg)`,
          filter: "brightness(0.3)"
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${__CDN_BASE__}aa.jpg)`,
          filter: "brightness(0.3)"
        }}
      />
      <div className="absolute left-0 right-0 top-1/2 h-[6px] bg-red-600 z-10 shadow-lg" />

      {/* Top Checker Pattern */}
      <div
        className="h-6 w-full"
        style={{
          backgroundImage: `
            linear-gradient(45deg,
              rgba(255, 255, 255, 0.74) 25%,
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
            linear-gradient(180deg, #1e2125, #1e2125)
          `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Header Section */}
      <div className="relative z-20 text-center pt-8 md:pt-14 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
            Corporate Events
          </span>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight font-sansitaOne mt-2">
            Corporate Booking Packages
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-red-500 mt-2 font-sansitaOne">
            Adventure Packages for Teams <br /> & Corporate Events
          </p>
        </motion.div>
      </div>

      {/* Main Content Band */}
      <div className="relative z-20 mt-8 md:mt-14 flex justify-center px-4">
        <div
          className="relative w-full"
          style={{
            width: "160vw",
            transform: "rotate(-3deg)",
            background: "#fff",
            borderRadius: 8,
          }}
        >
          {/* Top Border */}
          <div
            className="absolute left-0 right-0 top-0 h-6 pointer-events-none"
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

          {/* Content Area */}
          <div
            className="relative rounded-md w-full overflow-hidden"
            style={{
              minHeight: "600px",
              background: "#fff",
              boxShadow: "0 30px 60px rgba(0,0,0,0.55)",
            }}
          >
            <div className="p-8 md:p-12" style={{ transform: "rotate(3deg)" }}>

              {/* Packages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    className={`relative bg-[#606265] rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ${
                      pkg.popular ? 'ring-2 ring-red-500' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard(pkg.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {/* Popular Badge */}
                    {pkg.popular && (
                      <div className="absolute -top-2 -right-2 z-20">
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                          POPULAR
                        </div>
                      </div>
                    )}

                    {/* Card Header */}
                    <div className="p-6 text-white text-center border-b border-gray-400">
                      <div className="flex items-center justify-center gap-2 mb-2 text-red-500">
                        {pkg.icon}
                        <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                      </div>
                      <p className="text-sm opacity-80 mb-4">{pkg.subtitle}</p>

                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl font-extrabold">₹{pkg.offerPrice}</span>
                        <div className="text-center">
                          <span className="text-xs line-through opacity-60 block">₹{pkg.originalPrice}</span>
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            {calculateDiscount(pkg.originalPrice, pkg.offerPrice)}% OFF
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="p-6 text-white">
                      <ul className="space-y-2 mb-6">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center mt-0.5">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                            <span className="text-xs leading-relaxed">
                              {feature.includes('(OR)') ? (
                                <>
                                  {feature.split('(OR)').map((part, i) => (
                                    <span key={i}>
                                      {part.trim()}
                                      {i < feature.split('(OR)').length - 1 && (
                                        <span className="text-red-500 font-bold mx-1">OR</span>
                                      )}
                                    </span>
                                  ))}
                                </>
                              ) : (
                                feature
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Book Button */}
                      <button
                        className={`w-full py-2 px-4 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
                          hoveredCard === pkg.id ? 'scale-105' : ''
                        }`}
                      >
                        Book Package
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <p className="text-xs text-gray-300 text-center mt-3">
                        * Includes food & per person pricing
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#606265] rounded-xl p-6 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold mb-3 font-sansitaOne text-white">
                    Need a Custom Package?
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Contact our event specialists for personalized corporate packages.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleContactSpecialist}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
                    >
                      Contact Specialist
                    </button>
                    <button
                      onClick={() => setShowBrochurePDF(true)}
                      className="border border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
                    >
                      Download Brochure
                    </button>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Bottom Border */}
          <div
            className="absolute left-0 right-0 bottom-0 h-6 pointer-events-none"
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
              transform: "translateY(8px)",
              boxShadow: "0 -6px 20px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      </div>

      {/* Bottom Checker Pattern */}
      <div
        className="h-6 w-full mt-8"
        style={{
          backgroundImage: `
            linear-gradient(45deg,
              rgba(255, 255, 255, 0.74) 25%,
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
            linear-gradient(180deg, #1e2125, #1e2125)
          `,
          backgroundSize: "28px 28px, 28px 28px, auto",
          backgroundPosition: "0 0, 14px 14px, 0 0",
          backgroundRepeat: "repeat",
        }}
      />

      {/* PDF Modal for Brochure */}
      <PDFModal
        isOpen={showBrochurePDF}
        onClose={() => setShowBrochurePDF(false)}
        pdfUrl="https://cdn.acsdev.in/FNF/corporate-brochure.pdf"
      />
    </section>
  );
};

export default EventPackages;
