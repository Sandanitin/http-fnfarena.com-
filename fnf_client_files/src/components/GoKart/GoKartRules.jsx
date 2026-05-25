"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Users, Shield, Clock, Ban, Eye, Zap, CheckCircle, XCircle, Info, UserCheck, Car, Flag, AlertCircle, Shirt, HardHat, Gauge, Trophy } from "lucide-react";

export default function GoKartRules({ protocols }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requirements');

  // Get Go Karting protocols data
  const goKartProtocols = protocols && protocols.length > 0 ? protocols[0] : null;

  // Map API data to rule categories
  const ruleCategories = React.useMemo(() => {
    if (!goKartProtocols) {
      // Fallback data if no API data available
      return {
        requirements: {
          icon: <UserCheck className="w-6 h-6" />,
          title: "Age & Physical Requirements",
          color: "from-red-500/20 to-amber-500/20",
          borderColor: "border-red-500/40",
          items: [
            { text: "SINGLE KART: AGE 12+ ONLY - Must be able to reach pedals safely" },
            { text: "TWIN KART: AGE 8+ - Adult supervision required for children under 12" },
            { text: "KIDS KART: AGE 5-12 YEARS - Dedicated safe zone with speed limiters" },
            { text: "Height requirement: Minimum 4 feet for single karts, 3.5 feet for twin/kids karts" }
          ]
        },
        equipment: {
          icon: <Shield className="w-6 h-6" />,
          title: "Safety Protocols & Equipment",
          color: "from-amber-500/20 to-orange-500/20",
          borderColor: "border-amber-500/40",
          items: [
            { text: "MANDATORY HELMET: Must be worn at all times on track - provided by facility" },
            { text: "SAFETY BRIEFING: Attend mandatory 5-minute safety instruction before racing" },
            { text: "SEAT BELTS: Must be fastened securely before kart operation begins" },
            { text: "Emergency stop buttons available on all karts and track marshal stations" }
          ]
        },
        etiquette: {
          icon: <Shirt className="w-6 h-6" />,
          title: "Dress Code & Attire",
          color: "from-orange-500/20 to-red-500/20",
          borderColor: "border-orange-500/40",
          items: [
            { text: "CLOSED-TOE SHOES: Mandatory - No sandals, flip-flops, or open-toe footwear" },
            { text: "LONG PANTS: Full-length pants required - No shorts, skirts, or dresses" },
            { text: "FITTED CLOTHING: Avoid loose, baggy clothes that can get caught in kart" },
            { text: "Hair longer than shoulder length must be tied back securely" }
          ]
        },
        rules: {
          icon: <Car className="w-6 h-6" />,
          title: "Track Rules & Racing Etiquette",
          color: "from-red-500/20 to-amber-500/20",
          borderColor: "border-red-500/40",
          items: [
            { text: "NO AGGRESSIVE DRIVING: Bumping, ramming, or intentional contact prohibited" },
            { text: "FOLLOW FLAG SIGNALS: Yellow (caution), Red (stop), Green (go), Checkered (finish)" },
            { text: "STAY IN KART: Never exit kart on track - Wait for marshal assistance" },
            { text: "MAINTAIN SAFE DISTANCE: Keep 2-kart lengths between vehicles" }
          ]
        }
      };
    }

    // Map API data to categories
    return {
      requirements: {
        icon: <UserCheck className="w-6 h-6" />,
        title: "Age & Physical Requirements",
        color: "from-red-500/20 to-amber-500/20",
        borderColor: "border-red-500/40",
        items: goKartProtocols.requirements ? goKartProtocols.requirements.map(req => ({ text: req })) : []
      },
      equipment: {
        icon: <Shield className="w-6 h-6" />,
        title: "Safety Protocols & Equipment",
        color: "from-amber-500/20 to-orange-500/20",
        borderColor: "border-amber-500/40",
        items: goKartProtocols.equipment ? goKartProtocols.equipment.map(eq => ({ text: eq })) : []
      },
      etiquette: {
        icon: <Shirt className="w-6 h-6" />,
        title: "Dress Code & Attire",
        color: "from-orange-500/20 to-red-500/20",
        borderColor: "border-orange-500/40",
        items: goKartProtocols.etiquette ? goKartProtocols.etiquette.map(et => ({ text: et })) : []
      },
      rules: {
        icon: <Car className="w-6 h-6" />,
        title: "Track Rules & Racing Etiquette",
        color: "from-red-500/20 to-amber-500/20",
        borderColor: "border-red-500/40",
        items: goKartProtocols.rules ? goKartProtocols.rules.map(rule => ({ text: rule })) : []
      }
    };
  }, [goKartProtocols]);

  const quickTips = [
    { icon: "👕", title: "Proper Attire", desc: "Closed shoes & long pants", color: "from-red-500/20 to-amber-500/20" },
    { icon: "🪖", title: "Safety First", desc: "Helmet always required", color: "from-amber-500/20 to-orange-500/20" },
    { icon: "🏁", title: "Follow Flags", desc: "Obey marshal signals", color: "from-orange-500/20 to-red-500/20" },
    { icon: "🚫", title: "No Contact", desc: "Safe racing only", color: "from-red-500/20 to-amber-500/20" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">

      {/* Enhanced Go Kart Racing Background with Realistic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Go-Kart Track Pattern Background */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-gray-300/10">
            <defs>
              <pattern id="goKartTrackPattern" x="0" y="0" width="250" height="180" patternUnits="userSpaceOnUse">
                {/* Go-kart track layout - tighter curves, smaller scale */}
                <path d="M30,90 Q80,40 130,90 Q180,140 230,90 Q180,40 130,90 Q80,140 30,90"
                      fill="none" stroke="rgba(156,163,175,0.08)" strokeWidth="2" strokeDasharray="6,3"/>
                <path d="M35,90 Q80,45 125,90 Q175,135 225,90 Q175,45 125,90 Q80,135 35,90"
                      fill="none" stroke="rgba(203,213,225,0.06)" strokeWidth="1" strokeDasharray="3,2"/>

                {/* Go-kart track barriers - lower profile */}
                <rect x="25" y="65" width="200" height="2" rx="1" fill="rgba(148,163,184,0.08)"/>
                <rect x="25" y="113" width="200" height="2" rx="1" fill="rgba(148,163,184,0.08)"/>

                {/* Go-kart specific elements */}
                {/* Small go-kart silhouette */}
                <g transform="translate(60,85)" fill="rgba(156,163,175,0.06)">
                  <rect x="0" y="0" width="12" height="6" rx="3"/>
                  <circle cx="2" cy="8" r="2"/>
                  <circle cx="10" cy="8" r="2"/>
                  <rect x="3" y="-2" width="4" height="3" rx="1"/>
                </g>

                {/* Safety cones */}
                <g fill="rgba(251,146,60,0.05)">
                  <polygon points="50,70 52,75 48,75"/>
                  <polygon points="180,105 182,110 178,110"/>
                  <polygon points="120,65 122,70 118,70"/>
                </g>

                {/* Go-kart helmets */}
                <g fill="rgba(239,68,68,0.05)">
                  <ellipse cx="90" cy="50" rx="3" ry="4"/>
                  <ellipse cx="160" cy="130" rx="3" ry="4"/>
                </g>

                {/* Checkered flag pattern - small scale */}
                <g transform="translate(200,45)" fill="rgba(255,255,255,0.04)">
                  <rect x="0" y="0" width="2" height="2"/>
                  <rect x="4" y="0" width="2" height="2"/>
                  <rect x="2" y="2" width="2" height="2"/>
                  <rect x="6" y="2" width="2" height="2"/>
                  <rect x="0" y="4" width="2" height="2"/>
                  <rect x="4" y="4" width="2" height="2"/>
                </g>

                {/* Go-kart tire marks */}
                <g stroke="rgba(100,116,139,0.04)" strokeWidth="1" fill="none">
                  <path d="M40,88 Q60,85 80,88"/>
                  <path d="M140,92 Q160,89 180,92"/>
                  <path d="M90,70 Q110,67 130,70"/>
                </g>
              </pattern>

              {/* Subtle Go-Kart Tire Pattern */}
              <pattern id="subtleGoKartTire" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                {/* Outer tire - very subtle */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(148,163,184,0.04)" strokeWidth="3"/>
                <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(148,163,184,0.03)" strokeWidth="2"/>

                {/* Simple tread pattern */}
                <g stroke="rgba(156,163,175,0.03)" strokeWidth="1" fill="none">
                  <path d="M25,40 L35,50 L25,60"/>
                  <path d="M75,40 L65,50 L75,60"/>
                  <path d="M40,25 L50,35 L60,25"/>
                  <path d="M40,75 L50,65 L60,75"/>
                </g>

                {/* Center rim - minimal */}
                <circle cx="50" cy="50" r="18" fill="rgba(203,213,225,0.02)" stroke="rgba(226,232,240,0.03)" strokeWidth="1"/>
                <g stroke="rgba(241,245,249,0.03)" strokeWidth="1">
                  <line x1="50" y1="32" x2="50" y2="68"/>
                  <line x1="32" y1="50" x2="68" y2="50"/>
                </g>

                {/* Center hub */}
                <circle cx="50" cy="50" r="8" fill="rgba(226,232,240,0.02)"/>
              </pattern>

              {/* Go-Kart Vehicle Pattern */}
              <pattern id="goKartVehiclePattern" x="0" y="0" width="150" height="100" patternUnits="userSpaceOnUse">
                {/* Simple go-kart outline */}
                <g transform="translate(75,50)" fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth="1">
                  {/* Chassis */}
                  <rect x="-25" y="-8" width="50" height="12" rx="6"/>
                  {/* Wheels */}
                  <circle cx="-18" cy="12" r="6"/>
                  <circle cx="18" cy="12" r="6"/>
                  {/* Seat */}
                  <rect x="-8" y="-15" width="12" height="8" rx="2"/>
                  {/* Steering wheel */}
                  <circle cx="-3" cy="-18" r="3"/>
                  {/* Engine */}
                  <rect x="8" y="-12" width="8" height="6" rx="1"/>
                </g>

                {/* Safety elements */}
                <g fill="rgba(251,146,60,0.03)">
                  <rect x="20" y="20" width="2" height="8" rx="1"/>
                  <rect x="130" y="70" width="2" height="8" rx="1"/>
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#goKartTrackPattern)"/>
            <rect width="100%" height="100%" fill="url(#subtleGoKartTire)" opacity="0.3"/>
            <rect width="100%" height="100%" fill="url(#goKartVehiclePattern)" opacity="0.2"/>
          </svg>
        </div>

        {/* Large Realistic Floating Tire */}
        <motion.div
          className="absolute top-20 right-20 opacity-15"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            y: [-10, 10, -10]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg width="180" height="180" viewBox="0 0 180 180" className="text-gray-400/60">
            {/* Outer tire with realistic proportions */}
            <circle cx="90" cy="90" r="75" fill="rgba(31,41,55,0.8)" stroke="rgba(75,85,99,0.6)" strokeWidth="6"/>
            <circle cx="90" cy="90" r="68" fill="rgba(17,24,39,0.9)" stroke="rgba(55,65,81,0.4)" strokeWidth="2"/>

            {/* Tire sidewall with brand details */}
            <circle cx="90" cy="90" r="72" fill="none" stroke="rgba(107,114,128,0.3)" strokeWidth="1"/>
            <circle cx="90" cy="90" r="64" fill="none" stroke="rgba(107,114,128,0.3)" strokeWidth="1"/>

            {/* Advanced tread pattern */}
            <g stroke="rgba(156,163,175,0.7)" strokeWidth="3" fill="none">
              {/* Directional tread blocks */}
              <path d="M40,65 L55,90 L40,115"/>
              <path d="M140,65 L125,90 L140,115"/>
              <path d="M65,40 L90,55 L115,40"/>
              <path d="M65,140 L90,125 L115,140"/>

              {/* Secondary tread pattern */}
              <path d="M50,50 L70,70 L50,90 L70,110 L50,130"/>
              <path d="M130,50 L110,70 L130,90 L110,110 L130,130"/>
              <path d="M50,50 L70,30 L90,50 L110,30 L130,50"/>
              <path d="M50,130 L70,150 L90,130 L110,150 L130,130"/>

              {/* Cross-hatching for grip */}
              <g strokeWidth="1" opacity="0.5">
                <path d="M45,75 L75,45 M105,45 L135,75 M135,105 L105,135 M75,135 L45,105"/>
                <path d="M55,85 L85,55 M95,55 L125,85 M125,95 L95,125 M85,125 L55,95"/>
              </g>
            </g>

            {/* Realistic rim design */}
            <circle cx="90" cy="90" r="40" fill="rgba(107,114,128,0.4)" stroke="rgba(156,163,175,0.6)" strokeWidth="3"/>

            {/* Spoke design */}
            <g stroke="rgba(209,213,219,0.7)" strokeWidth="3">
              <line x1="90" y1="50" x2="90" y2="130"/>
              <line x1="50" y1="90" x2="130" y2="90"/>
              <line x1="62" y1="62" x2="118" y2="118"/>
              <line x1="118" y1="62" x2="62" y2="118"/>
            </g>

            {/* Hub cap with details */}
            <circle cx="90" cy="90" r="20" fill="rgba(156,163,175,0.5)" stroke="rgba(209,213,219,0.8)" strokeWidth="2"/>
            <circle cx="90" cy="90" r="15" fill="rgba(229,231,235,0.3)" stroke="rgba(243,244,246,0.6)" strokeWidth="1"/>
            <circle cx="90" cy="90" r="8" fill="rgba(243,244,246,0.6)"/>

            {/* Lug nuts */}
            <g fill="rgba(107,114,128,0.8)">
              <circle cx="90" cy="70" r="3"/>
              <circle cx="110" cy="90" r="3"/>
              <circle cx="90" cy="110" r="3"/>
              <circle cx="70" cy="90" r="3"/>
            </g>

            {/* Tire branding */}
            <text x="90" y="35" textAnchor="middle" className="text-sm fill-gray-400 opacity-40 font-bold">KARTING</text>
            <text x="90" y="155" textAnchor="middle" className="text-xs fill-gray-500 opacity-30">RACING TIRE</text>
          </svg>
        </motion.div>

        {/* Professional Go-Kart Illustration */}
        <motion.div
          className="absolute bottom-32 left-16 opacity-12"
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            rotate: [-2, 2, -2]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="200" height="120" viewBox="0 0 200 120" className="text-amber-500/50">
            {/* Go-kart chassis */}
            <rect x="30" y="50" width="140" height="25" rx="12" fill="none" stroke="currentColor" strokeWidth="3"/>
            <rect x="35" y="55" width="130" height="15" rx="7" fill="rgba(245,158,11,0.1)" stroke="currentColor" strokeWidth="1"/>

            {/* Front and rear wheels with realistic design */}
            <g>
              {/* Rear wheel */}
              <circle cx="50" cy="85" r="18" fill="rgba(31,41,55,0.8)" stroke="currentColor" strokeWidth="3"/>
              <circle cx="50" cy="85" r="14" fill="rgba(17,24,39,0.9)" stroke="rgba(156,163,175,0.4)" strokeWidth="2"/>
              <g stroke="rgba(209,213,219,0.6)" strokeWidth="1">
                <line x1="50" y1="67" x2="50" y2="103"/>
                <line x1="32" y1="85" x2="68" y2="85"/>
                <line x1="37" y1="72" x2="63" y2="98"/>
                <line x1="63" y1="72" x2="37" y2="98"/>
              </g>
              <circle cx="50" cy="85" r="6" fill="rgba(156,163,175,0.6)"/>

              {/* Front wheel */}
              <circle cx="150" cy="85" r="18" fill="rgba(31,41,55,0.8)" stroke="currentColor" strokeWidth="3"/>
              <circle cx="150" cy="85" r="14" fill="rgba(17,24,39,0.9)" stroke="rgba(156,163,175,0.4)" strokeWidth="2"/>
              <g stroke="rgba(209,213,219,0.6)" strokeWidth="1">
                <line x1="150" y1="67" x2="150" y2="103"/>
                <line x1="132" y1="85" x2="168" y2="85"/>
                <line x1="137" y1="72" x2="163" y2="98"/>
                <line x1="163" y1="72" x2="137" y2="98"/>
              </g>
              <circle cx="150" cy="85" r="6" fill="rgba(156,163,175,0.6)"/>
            </g>

            {/* Driver seat */}
            <rect x="70" y="35" width="35" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="75" y="40" width="25" height="10" rx="3" fill="rgba(245,158,11,0.2)"/>

            {/* Steering wheel */}
            <circle cx="85" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="85" y1="22" x2="85" y2="38" stroke="currentColor" strokeWidth="2"/>
            <line x1="77" y1="30" x2="93" y2="30" stroke="currentColor" strokeWidth="2"/>

            {/* Engine compartment */}
            <rect x="120" y="40" width="25" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="125" y="45" width="15" height="5" rx="1" fill="rgba(245,158,11,0.3)"/>

            {/* Exhaust pipe */}
            <rect x="145" y="52" width="20" height="4" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>

            {/* Roll bar */}
            <path d="M65,35 Q85,20 105,35" fill="none" stroke="currentColor" strokeWidth="3"/>

            {/* Racing number */}
            <text x="87" y="67" textAnchor="middle" className="text-lg font-bold fill-current">7</text>

            {/* Sponsor decals simulation */}
            <rect x="110" y="58" width="15" height="4" rx="1" fill="rgba(220,38,38,0.4)"/>
            <rect x="130" y="58" width="12" height="4" rx="1" fill="rgba(59,130,246,0.4)"/>
          </svg>
        </motion.div>

        {/* Racing Track Section with Barriers */}
        <motion.div
          className="absolute top-1/3 left-1/4 opacity-8"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="300" height="100" viewBox="0 0 300 100" className="text-red-400/40">
            {/* Track surface */}
            <rect x="0" y="30" width="300" height="40" fill="rgba(75,85,99,0.2)" stroke="rgba(156,163,175,0.3)" strokeWidth="1"/>

            {/* Track center line */}
            <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="10,5"/>

            {/* Safety barriers */}
            <rect x="0" y="20" width="300" height="8" fill="rgba(220,38,38,0.3)" stroke="rgba(239,68,68,0.5)" strokeWidth="1"/>
            <rect x="0" y="72" width="300" height="8" fill="rgba(220,38,38,0.3)" stroke="rgba(239,68,68,0.5)" strokeWidth="1"/>

            {/* Tire barriers */}
            <g fill="rgba(31,41,55,0.6)" stroke="rgba(75,85,99,0.4)" strokeWidth="1">
              <circle cx="50" cy="15" r="8"/>
              <circle cx="70" cy="15" r="8"/>
              <circle cx="90" cy="15" r="8"/>
              <circle cx="50" cy="85" r="8"/>
              <circle cx="70" cy="85" r="8"/>
              <circle cx="90" cy="85" r="8"/>
              <circle cx="200" cy="15" r="8"/>
              <circle cx="220" cy="15" r="8"/>
              <circle cx="240" cy="15" r="8"/>
              <circle cx="200" cy="85" r="8"/>
              <circle cx="220" cy="85" r="8"/>
              <circle cx="240" cy="85" r="8"/>
            </g>

            {/* Start/finish line */}
            <g stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <line x1="150" y1="20" x2="150" y2="80"/>
              <line x1="160" y1="20" x2="160" y2="80"/>
            </g>
          </svg>
        </motion.div>

        {/* Professional Racing Helmet */}
        <motion.div
          className="absolute top-16 left-32 opacity-10"
          animate={{
            rotate: [-5, 5, -5],
            y: [-5, 5, -5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-red-300/60">
            {/* Helmet shell */}
            <ellipse cx="40" cy="45" rx="30" ry="25" fill="rgba(220,38,38,0.3)" stroke="currentColor" strokeWidth="3"/>
            <ellipse cx="40" cy="45" rx="25" ry="20" fill="rgba(239,68,68,0.2)" stroke="currentColor" strokeWidth="1"/>

            {/* Visor */}
            <rect x="15" y="35" width="50" height="12" rx="6" fill="rgba(17,24,39,0.8)" stroke="rgba(75,85,99,0.6)" strokeWidth="2"/>
            <rect x="18" y="37" width="44" height="8" rx="4" fill="rgba(31,41,55,0.9)" stroke="rgba(107,114,128,0.4)" strokeWidth="1"/>

            {/* Helmet vents */}
            <g stroke="currentColor" strokeWidth="1" opacity="0.6">
              <line x1="25" y1="25" x2="30" y2="25"/>
              <line x1="35" y1="25" x2="40" y2="25"/>
              <line x1="45" y1="25" x2="50" y2="25"/>
              <line x1="50" y1="25" x2="55" y2="25"/>
            </g>

            {/* Racing stripes */}
            <path d="M20,35 Q40,30 60,35" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
            <path d="M22,55 Q40,50 58,55" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>

            {/* Chin guard */}
            <rect x="30" y="60" width="20" height="8" rx="4" fill="rgba(220,38,38,0.3)" stroke="currentColor" strokeWidth="2"/>

            {/* Racing number */}
            <text x="40" y="52" textAnchor="middle" className="text-sm font-bold fill-white opacity-60">1</text>
          </svg>
        </motion.div>

        {/* Racing Trophy with Details */}
        <motion.div
          className="absolute bottom-20 right-32 opacity-10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [-3, 3, -3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="70" height="90" viewBox="0 0 70 90" className="text-amber-400/60">
            {/* Trophy base */}
            <rect x="15" y="75" width="40" height="12" rx="2" fill="currentColor" stroke="rgba(245,158,11,0.8)" strokeWidth="2"/>
            <rect x="20" y="70" width="30" height="8" rx="1" fill="rgba(245,158,11,0.4)" stroke="currentColor" strokeWidth="1"/>

            {/* Trophy stem */}
            <rect x="28" y="55" width="14" height="20" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="30" y="57" width="10" height="16" fill="rgba(245,158,11,0.2)"/>

            {/* Trophy cup */}
            <ellipse cx="35" cy="35" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="3"/>
            <ellipse cx="35" cy="35" rx="14" ry="18" fill="rgba(245,158,11,0.1)" stroke="currentColor" strokeWidth="1"/>

            {/* Trophy handles */}
            <path d="M17,25 Q10,20 10,15 Q10,10 17,15" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M53,25 Q60,20 60,15 Q60,10 53,15" fill="none" stroke="currentColor" strokeWidth="2"/>

            {/* Trophy details */}
            <ellipse cx="35" cy="20" rx="12" ry="8" fill="none" stroke="currentColor" strokeWidth="1"/>
            <text x="35" y="38" textAnchor="middle" className="text-sm font-bold fill-current">1st</text>
            <text x="35" y="50" textAnchor="middle" className="text-xs fill-current">PLACE</text>

            {/* Decorative elements */}
            <g stroke="currentColor" strokeWidth="1" opacity="0.6">
              <path d="M25,30 Q35,25 45,30"/>
              <path d="M25,40 Q35,35 45,40"/>
            </g>
          </svg>
        </motion.div>

        {/* Advanced Speedometer */}
        <motion.div
          className="absolute top-1/2 right-16 opacity-8"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="90" height="90" viewBox="0 0 90 90" className="text-orange-400/60">
            {/* Speedometer face */}
            <circle cx="45" cy="45" r="35" fill="rgba(17,24,39,0.8)" stroke="currentColor" strokeWidth="4"/>
            <circle cx="45" cy="45" r="30" fill="rgba(31,41,55,0.6)" stroke="rgba(156,163,175,0.4)" strokeWidth="2"/>

            {/* Speed markings */}
            <g stroke="currentColor" strokeWidth="2">
              <line x1="45" y1="15" x2="45" y2="25"/>
              <line x1="70" y1="45" x2="60" y2="45"/>
              <line x1="45" y1="75" x2="45" y2="65"/>
              <line x1="20" y1="45" x2="30" y2="45"/>
              <line x1="63" y1="27" x2="57" y2="33"/>
              <line x1="63" y1="63" x2="57" y2="57"/>
              <line x1="27" y1="63" x2="33" y2="57"/>
              <line x1="27" y1="27" x2="33" y2="33"/>
            </g>

            {/* Speed numbers */}
            <text x="45" y="22" textAnchor="middle" className="text-xs fill-current font-bold">60</text>
            <text x="65" y="50" textAnchor="middle" className="text-xs fill-current font-bold">45</text>
            <text x="45" y="72" textAnchor="middle" className="text-xs fill-current font-bold">0</text>
            <text x="28" y="50" textAnchor="middle" className="text-xs fill-current font-bold">30</text>

            {/* Speedometer needle */}
            <line x1="45" y1="45" x2="58" y2="32" stroke="rgba(239,68,68,0.8)" strokeWidth="3"/>
            <circle cx="45" cy="45" r="4" fill="rgba(239,68,68,0.6)" stroke="rgba(220,38,38,0.8)" strokeWidth="2"/>

            {/* Speed indicator */}
            <text x="45" y="58" textAnchor="middle" className="text-xs fill-current">KM/H</text>
          </svg>
        </motion.div>

        {/* Checkered Racing Flag */}
        <motion.div
          className="absolute bottom-1/3 left-1/2 opacity-8"
          animate={{
            rotate: [0, 5, -5, 0],
            x: [-10, 10, -10]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="100" height="80" viewBox="0 0 100 80" className="text-white/60">
            {/* Flag pole */}
            <line x1="15" y1="10" x2="15" y2="75" stroke="currentColor" strokeWidth="4"/>
            <circle cx="15" cy="75" r="6" fill="currentColor"/>

            {/* Checkered flag */}
            <rect x="15" y="10" width="70" height="45" fill="rgba(255,255,255,0.1)" stroke="currentColor" strokeWidth="2"/>

            {/* Checkered pattern */}
            <g fill="currentColor" opacity="0.6">
              <rect x="15" y="10" width="14" height="9"/>
              <rect x="43" y="10" width="14" height="9"/>
              <rect x="71" y="10" width="14" height="9"/>
              <rect x="29" y="19" width="14" height="9"/>
              <rect x="57" y="19" width="14" height="9"/>
              <rect x="15" y="28" width="14" height="9"/>
              <rect x="43" y="28" width="14" height="9"/>
              <rect x="71" y="28" width="14" height="9"/>
              <rect x="29" y="37" width="14" height="9"/>
              <rect x="57" y="37" width="14" height="9"/>
              <rect x="15" y="46" width="14" height="9"/>
              <rect x="43" y="46" width="14" height="9"/>
              <rect x="71" y="46" width="14" height="9"/>
            </g>

            {/* Flag wave effect */}
            <path d="M85,10 Q90,15 85,20 Q90,25 85,30 Q90,35 85,40 Q90,45 85,50 Q90,55 85,55"
                  fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          </svg>
        </motion.div>

      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Enhanced Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-red-500/30 rounded-full px-8 py-4 mb-8">
            <Car className="w-6 h-6 text-red-400" />
            <span className="text-red-400 text-lg font-bold uppercase tracking-wider">
              Go Kart Safety
            </span>
            <AlertTriangle className="w-6 h-6 text-amber-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white font-sansitaOne mb-4">
            Go Kart Rules &
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-red-400 via-amber-400 to-orange-500 bg-clip-text font-sansitaOne mb-8">
            Safety Protocols
          </h3>
          <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
            Follow these comprehensive go-kart safety rules and protocols to ensure a safe and enjoyable racing experience.
            Your safety is our top priority at FNF Arena's professional go-kart facility.
          </p>
        </motion.div>

        {/* Enhanced Quick Tips Icons */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {quickTips.map((tip, index) => (
            <motion.div
              key={index}
              className={`text-center bg-gradient-to-br ${tip.color} backdrop-blur-sm rounded-2xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{tip.icon}</div>
              <h4 className="text-white font-bold text-lg mb-2 font-sansitaOne">{tip.title}</h4>
              <p className="text-gray-400 text-sm">{tip.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {Object.entries(ruleCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === key
                  ? 'bg-gradient-to-r from-red-500 via-amber-500 to-orange-500 text-white shadow-xl scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category.icon}
              <span className="hidden sm:inline">{category.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Enhanced Active Tab Content */}
        <motion.div
          key={activeTab}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`bg-gradient-to-br ${ruleCategories[activeTab].color} backdrop-blur-sm rounded-3xl p-8 border ${ruleCategories[activeTab].borderColor} shadow-2xl`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                {ruleCategories[activeTab].icon}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white font-sansitaOne">
                  {ruleCategories[activeTab].title}
                </h3>
                <p className="text-gray-300">Essential guidelines for safe go-kart racing</p>
              </div>
            </div>

            <div className="grid gap-4">
              {ruleCategories[activeTab].items.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 bg-green-500/10 border border-green-500/30 hover:bg-green-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-200 leading-relaxed font-medium">
                      {item.text}
                    </p>
                    <span className="text-xs font-semibold uppercase tracking-wider mt-2 inline-block text-green-400">
                      REQUIRED
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Emergency Procedures */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-500/20 via-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-red-500/40 shadow-2xl">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="text-red-400 text-2xl font-bold mb-4 font-sansitaOne flex items-center gap-2">
                  🚨 EMERGENCY PROCEDURES
                  <Trophy className="w-6 h-6 text-amber-400" />
                </h4>
                <div className="space-y-3 text-gray-200">
                  <p className="text-lg leading-relaxed">
                    <strong className="text-red-400">IMMEDIATE STOP:</strong> Raise your hand and press emergency stop button if needed.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-amber-400">TRACK MARSHALS:</strong> Trained safety personnel monitor all racing activity.
                    Follow their instructions immediately for your safety and others.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-orange-400">VIOLATION CONSEQUENCES:</strong> Unsafe behavior results in immediate removal
                    from track without refund. Repeat offenders may be banned from facility.
                  </p>
                </div>

                {/* Emergency Contact */}
                <div className="mt-6 p-4 bg-black/30 rounded-2xl border border-red-500/30">
                  <h5 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                    Emergency & Safety Contact
                    <Shield className="w-5 h-5" />
                  </h5>
                  <p className="text-gray-300">Track Safety Marshal: <span className="text-white font-semibold">On-site at all times</span></p>
                  <p className="text-gray-300">First Aid: <span className="text-white font-semibold">Available immediately</span></p>
                  <p className="text-gray-300">Emergency Services: <span className="text-white font-semibold">Direct line available</span></p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
      <div className="absolute left-0 right-0 bottom-0 h-6" aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%),
            linear-gradient(45deg,rgba(255,255,255) 25%,transparent 25%,transparent 75%,rgba(255,255,255) 75%),
            linear-gradient(180deg,#b92a2a,#d94b4b)
          `,
          backgroundSize: "28px 28px,28px 28px,auto",
          backgroundPosition: "0 0,14px 14px,0 0",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(0,0,0,.6)"
        }}
      />
    </section>
  );
}
