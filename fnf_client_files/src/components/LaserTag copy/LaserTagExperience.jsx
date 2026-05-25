"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Star, Quote, ArrowRight, Users, Trophy, Clock } from "lucide-react";

export default function LaserTagExperience() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [counters, setCounters] = useState({
    battles: 0,
    players: 0,
    events: 0
  });

  const testimonials = [
    {
      name: "Arjun Sharma",
      role: "Gaming Enthusiast",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "The laser tag arena at FNF is absolutely incredible! The equipment is top-notch and the arena design makes every battle intense and strategic.",
      rating: 5
    },
    {
      name: "Priya Mehta",
      role: "Corporate Team Leader",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      text: "Perfect for our team building event! The laser tag sessions brought our team together and everyone had an amazing time. Highly recommended!",
      rating: 5
    },
    {
      name: "Rohit Kumar",
      role: "Birthday Party Host",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "My son's birthday party was a huge success! The kids loved the laser tag battles and the staff made sure everyone had a safe and fun experience.",
      rating: 5
    }
  ];

  // Animated counters
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      const targets = { battles: 15000, players: 8000, events: 600 };

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setCounters({
          battles: Math.floor(targets.battles * progress),
          players: Math.floor(targets.players * progress),
          events: Math.floor(targets.events * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('lasertag-experience');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="lasertag-experience"
      className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop"
            alt="Laser tag experience background"
            loading="lazy"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1a1d21]/50 to-[#1a1d21]" />
        </div>

        {/* Laser Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/20">
            <defs>
              <pattern id="combatPattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                <line x1="0" y1="10" x2="100" y2="10" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#combatPattern)"/>
            {/* Crosshair lines */}
            <line x1="0" y1="200" x2="1200" y2="300" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            <line x1="0" y1="600" x2="1200" y2="500" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
          </svg>
        </div>

        {/* Target Explosion Pattern */}
        <div className="absolute top-1/4 left-1/4 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-red-500/30">
            <g transform="translate(100,100)">
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="0" y1="0"
                  x2={Math.cos(i * 30 * Math.PI / 180) * 80}
                  y2={Math.sin(i * 30 * Math.PI / 180) * 80}
                  stroke="currentColor"
                  strokeWidth="3"
                  opacity="0.6"
                />
              ))}
              <circle cx="0" cy="0" r="15" fill="currentColor"/>
              <text x="0" y="5" textAnchor="middle" className="text-xs font-bold fill-white">⚡</text>
            </g>
          </svg>
        </div>

        {/* Laser Beam Trail */}
        <div className="absolute bottom-1/3 left-0 right-0 opacity-8">
          <svg width="100%" height="60" viewBox="0 0 1200 60" className="text-red-500/20">
            <path d="M0 30 Q300 10 600 30 T1200 30" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="20,10"/>
            <circle cx="50" cy="30" r="8" fill="currentColor"/>
            <circle cx="150" cy="25" r="6" fill="currentColor" opacity="0.7"/>
            <circle cx="250" cy="35" r="4" fill="currentColor" opacity="0.5"/>
          </svg>
        </div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-2 border-red-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 right-40 w-16 h-16 bg-red-500/10 transform rotate-45"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-8 h-8 bg-red-500/20 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20">

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Trophy className="w-4 h-4 text-red-500" />
                <span className="text-red-500 text-sm font-semibold">Ultimate Combat Experience</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-sansitaOne leading-tight">
                Where Every
                <span className="block text-red-500">Shot Counts</span>
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                Immerse yourself in the ultimate laser tag experience with cutting-edge technology,
                strategic gameplay, and an atmosphere that transforms every battle into an unforgettable moment.
              </p>
            </div>

            {/* Animated Statistics */}
            <div className="grid grid-cols-3 gap-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-red-500 font-sansitaOne">
                  {counters.battles.toLocaleString()}+
                </div>
                <p className="text-gray-400 text-sm mt-1">Battles Fought</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-red-500 font-sansitaOne">
                  {counters.players.toLocaleString()}+
                </div>
                <p className="text-gray-400 text-sm mt-1">Combat Veterans</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-red-500 font-sansitaOne">
                  {counters.events}+
                </div>
                <p className="text-gray-400 text-sm mt-1">Combat Events</p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <button className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105">
                <Play className="w-5 h-5" />
                Watch Combat Video
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="border-2 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                Book Your Battle
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Testimonials */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Video Preview */}
            <div className="relative mb-8">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop"
                  alt="Laser tag experience video preview"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.button
                    className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative bg-[#606265]/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/20">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Quote className="w-8 h-8 text-red-500 mx-auto mb-4" />

                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  "{testimonials[activeTestimonial].text}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="text-white font-semibold">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {testimonials[activeTestimonial].role}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </motion.div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === activeTestimonial ? 'bg-red-500 w-6' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Features Strip */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Team Battles</h4>
              <p className="text-gray-400 text-sm">Strategic combat</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Tournaments</h4>
              <p className="text-gray-400 text-sm">Competitive leagues</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Extended Sessions</h4>
              <p className="text-gray-400 text-sm">Longer battle time</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
