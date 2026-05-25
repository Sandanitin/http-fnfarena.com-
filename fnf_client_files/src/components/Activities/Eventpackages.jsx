"use client";
import React, { useState } from "react";
import { Gamepad2, Target, Zap, Rocket, Crown, Gift, Star, Trophy } from "lucide-react";

const EventPackages = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const packages = [
    {
      id: 1,
      name: "FRESHER PACK",
      subtitle: "Perfect Start!",
      icon: <Star className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600",
      cardBg: "bg-gradient-to-br from-cyan-50 to-blue-100",
      accentColor: "text-cyan-600",
      buttonColor: "from-cyan-500 to-blue-600",
      originalPrice: 1647,
      offerPrice: 1399,
      features: [
        { text: "GOKARTING", detail: "5 LAPS", icon: "🏎️" },
        { text: "BOWLING", detail: "Strike Time!", icon: "🎳" },
        { text: "FOOD", detail: "Delicious Treats", icon: "🍕" }
      ],
      popular: false,
      emoji: "🌟"
    },
    {
      id: 2,
      name: "RAISING STAR PACK",
      subtitle: "Level Up!",
      icon: <Zap className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600",
      cardBg: "bg-gradient-to-br from-green-50 to-emerald-100",
      accentColor: "text-green-600",
      buttonColor: "from-green-500 to-emerald-600",
      originalPrice: 1646,
      offerPrice: 1599,
      features: [
        { text: "GOKARTING", detail: "5 LAPS", icon: "🏎️" },
        { text: "SHOOTING ZONE", detail: "Archery OR Rifle OR Paintball", icon: "🎯" },
        { text: "SKY ADVENTURE", detail: "Zipline OR Sky Roller OR Sky Cycle", icon: "🎢" },
        { text: "FOOD", detail: "Energy Boost", icon: "🍔" }
      ],
      popular: false,
      emoji: "⚡"
    },
    {
      id: 3,
      name: "THE INNOVATORS PACK",
      subtitle: "Game Changer!",
      icon: <Trophy className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-purple-400 via-pink-500 to-red-500",
      cardBg: "bg-gradient-to-br from-purple-50 to-pink-100",
      accentColor: "text-purple-600",
      buttonColor: "from-purple-500 to-pink-600",
      originalPrice: 2195,
      offerPrice: 1799,
      features: [
        { text: "GOKARTING", detail: "5 LAPS", icon: "🏎️" },
        { text: "SHOOTING ZONE", detail: "Archery OR Rifle OR Paintball", icon: "🎯" },
        { text: "ROCKET EJECTION", detail: "Blast Off!", icon: "🚀" },
        { text: "SKY ADVENTURE", detail: "Zipline OR Sky Roller OR Sky Cycle", icon: "🎢" },
        { text: "FOOD", detail: "Power Meal", icon: "🍟" }
      ],
      popular: true,
      emoji: "🏆"
    },
    {
      id: 4,
      name: "GAME CHANGER PACK",
      subtitle: "Ultimate Fun!",
      icon: <Gamepad2 className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-red-400 via-orange-500 to-yellow-500",
      cardBg: "bg-gradient-to-br from-red-50 to-orange-100",
      accentColor: "text-red-600",
      buttonColor: "from-red-500 to-orange-600",
      originalPrice: 2694,
      offerPrice: 2099,
      features: [
        { text: "GOKARTING", detail: "5 LAPS", icon: "🏎️" },
        { text: "BOWLING", detail: "Strike Master", icon: "🎳" },
        { text: "SKY ADVENTURE", detail: "Zipline OR Sky Roller OR Sky Cycle", icon: "🎢" },
        { text: "TRAMPOLINE", detail: "30 MINS Bounce", icon: "🤸" },
        { text: "SHOOTING ZONE", detail: "Archery OR Rifle OR Paintball", icon: "🎯" },
        { text: "FOOD", detail: "Champion Feast", icon: "🍖" }
      ],
      popular: false,
      emoji: "🎮"
    },
    {
      id: 5,
      name: "PEAK PERFORMER PACK",
      subtitle: "Pro Level!",
      icon: <Crown className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600",
      cardBg: "bg-gradient-to-br from-yellow-50 to-orange-100",
      accentColor: "text-orange-600",
      buttonColor: "from-yellow-500 to-orange-600",
      originalPrice: 2993,
      offerPrice: 2399,
      features: [
        { text: "GOKARTING", detail: "5 LAPS", icon: "🏎️" },
        { text: "BOWLING", detail: "Pro Strikes", icon: "🎳" },
        { text: "SKY ADVENTURE", detail: "Zipline OR Sky Roller OR Sky Cycle", icon: "🎢" },
        { text: "TRAMPOLINE", detail: "30 MINS Jump", icon: "🤸" },
        { text: "SHOOTING ZONE", detail: "Archery OR Rifle OR Paintball", icon: "🎯" },
        { text: "ROCKET EJECTION", detail: "Sky High!", icon: "🚀" },
        { text: "FOOD", detail: "Victory Meal", icon: "🥇" }
      ],
      popular: false,
      emoji: "👑"
    },
    {
      id: 6,
      name: "BONUS PACK",
      subtitle: "Epic Adventure!",
      icon: <Gift className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600",
      cardBg: "bg-gradient-to-br from-pink-50 to-purple-100",
      accentColor: "text-pink-600",
      buttonColor: "from-pink-500 to-purple-600",
      originalPrice: 3493,
      offerPrice: 2699,
      features: [
        { text: "GOKARTING", detail: "12 LAPS - Extended!", icon: "🏎️" },
        { text: "BOWLING", detail: "Master Level", icon: "🎳" },
        { text: "SKY ADVENTURE", detail: "Zipline OR Sky Roller OR Sky Cycle", icon: "🎢" },
        { text: "TRAMPOLINE", detail: "30 MINS Extreme", icon: "🤸" },
        { text: "SHOOTING ZONE", detail: "Archery OR Rifle OR Paintball", icon: "🎯" },
        { text: "ROCKET EJECTION", detail: "Maximum Thrill!", icon: "🚀" },
        { text: "FOOD", detail: "Epic Feast", icon: "🎉" }
      ],
      popular: false,
      emoji: "🎁"
    }
  ];

  const calculateDiscount = (original, offer) => {
    return Math.round(((original - offer) / original) * 100);
  };

  return (
    <section className="relative bg-[#0e1116] text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen overflow-hidden">

      {/* Funky Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Gaming Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">🎮</div>
        <div className="absolute top-40 right-20 text-5xl opacity-15 animate-pulse">🏎️</div>
        <div className="absolute bottom-40 left-20 text-7xl opacity-10 animate-spin-slow">🎯</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-bounce delay-1000">🚀</div>
        <div className="absolute top-60 left-1/2 text-5xl opacity-15 animate-pulse delay-500">🎳</div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rotate-45 opacity-10 animate-float-reverse"></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-15 animate-pulse"></div>
      </div>

      {/* Checker Pattern Border */}
      <div
        className="absolute left-0 right-0 top-0 h-8 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg,
              rgba(255,255,255,0.9) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255,255,255,0.9) 75%,
              rgba(255,255,255,0.9) 100%
            ),
            linear-gradient(45deg,
              rgba(255,255,255,0.9) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255,255,255,0.9) 75%,
              rgba(255,255,255,0.9) 100%
            ),
            linear-gradient(180deg,#ff6b6b,#ff8e8e)
          `,
          backgroundSize: "32px 32px, 32px 32px, auto",
          backgroundPosition: "0 0, 16px 16px, 0 0",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wider bg-red-500/10 px-4 py-2 rounded-full border border-red-500/30">
              🎉 Corporate Events 🎉
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight font-sansitaOne mb-6">
            <span className="text-white">Epic</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 block animate-pulse">
              Adventure Packages
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            🚀 Ready to level up your corporate event? Choose your adventure and let the games begin!
            From racing to shooting, we've got all the thrills your team needs! 🎯
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative ${pkg.cardBg} rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-3xl ${
                pkg.popular ? 'ring-4 ring-yellow-400 ring-opacity-60 scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                boxShadow: hoveredCard === pkg.id ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : ''
              }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-xs font-bold uppercase transform rotate-12 shadow-lg animate-bounce">
                    🔥 HOT PICK! 🔥
                  </div>
                </div>
              )}

              {/* Floating Emoji */}
              <div className="absolute top-4 left-4 text-3xl animate-bounce z-10">
                {pkg.emoji}
              </div>

              {/* Header with Gradient */}
              <div className={`${pkg.bgColor} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full transform -translate-x-16 translate-y-16"></div>

                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {pkg.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{pkg.subtitle}</p>

                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-4xl font-extrabold">₹{pkg.offerPrice}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg line-through opacity-75">₹{pkg.originalPrice}</span>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-bold">
                      SAVE {calculateDiscount(pkg.originalPrice, pkg.offerPrice)}%! 💰
                    </span>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="p-6 text-gray-800">
                <ul className="space-y-4">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 text-2xl">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-sm block">{feature.text}</span>
                        <span className="text-xs text-gray-600">{feature.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Book Now Button */}
                <div className="mt-6">
                  <button
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r ${pkg.buttonColor} hover:shadow-xl transform transition-all duration-300 text-lg ${
                      hoveredCard === pkg.id ? 'scale-105 animate-pulse' : ''
                    }`}
                  >
                    🎮 BOOK THIS ADVENTURE! 🎮
                  </button>
                </div>

                {/* Fun Footer */}
                <div className="mt-4 pt-4 border-t border-gray-300 text-center">
                  <p className="text-xs text-gray-600">
                    🍕 Food included • 👥 Perfect for teams • 🎉 Unlimited fun!
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-4 left-4 text-3xl animate-spin-slow">🎯</div>
              <div className="absolute top-4 right-4 text-3xl animate-bounce">🚀</div>
              <div className="absolute bottom-4 left-4 text-3xl animate-pulse">🏎️</div>
              <div className="absolute bottom-4 right-4 text-3xl animate-bounce delay-500">🎮</div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">🎨 Want Something Custom? 🎨</h3>
              <p className="text-pink-100 mb-6 max-w-2xl mx-auto text-lg">
                Our event wizards can create the perfect adventure mix for your team!
                More karting? Extra shooting? Sky-high thrills? We've got you covered! 🌟
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors text-lg shadow-lg">
                  🧙‍♂️ Talk to Event Wizard
                </button>
                <button className="border-3 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-purple-600 transition-colors text-lg">
                  📋 Download Fun Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(20px) rotate(50deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 8s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default EventPackages;
