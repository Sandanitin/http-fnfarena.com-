"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  Gift,
  Star,
  Check,
  ChevronDown,
  User,
  CreditCard,
  Shield,
  Heart,
  Sparkles,
  PartyPopper
} from "lucide-react";

export default function BirthdayBooking() {
  const [formData, setFormData] = useState({
    childName: "",
    childAge: "",
    parentName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const timeSlots = [
    "10:00 AM - 12:00 PM",
    "12:30 PM - 2:30 PM",
    "3:00 PM - 5:00 PM",
    "5:30 PM - 7:30 PM",
    "8:00 PM - 10:00 PM"
  ];

  const guestOptions = [
    "5-10 guests",
    "11-15 guests",
    "16-20 guests",
    "21-25 guests",
    "25+ guests"
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // console.log("Booking submitted:", formData);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#2a2d31] via-[#1a1d21] to-[#2a2d31] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 800">
          <defs>
            <pattern id="bookingPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-green-500"/>
              <path d="M25,50 L75,50 M50,25 L50,75" stroke="currentColor" strokeWidth="0.5" className="text-white/10"/>
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-500/20"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bookingPattern)"/>
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 text-green-500/10"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Calendar className="w-18 h-18" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-32 text-blue-500/10"
          animate={{ rotate: -360, y: [-20, 20, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <PartyPopper className="w-16 h-16" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Calendar className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">Book Your Celebration</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Reserve Your <span className="text-red-500">Perfect Day</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to create magical memories? Book your birthday celebration in just a few simple steps.
            Our team will handle everything to make your special day extraordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <motion.div
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold">Step {currentStep} of {totalSteps}</span>
                <span className="text-gray-400 text-sm">
                  {currentStep === 1 && "Party Details"}
                  {currentStep === 2 && "Contact Information"}
                  {currentStep === 3 && "Confirmation"}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Party Details */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Gift className="w-6 h-6 text-green-500" />
                    Party Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">Child's Name</label>
                      <input
                        type="text"
                        name="childName"
                        value={formData.childName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
                        placeholder="Birthday star's name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Age Turning</label>
                      <input
                        type="number"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
                        placeholder="Age"
                        min="1"
                        max="18"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Time Slot</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                      required
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot} className="bg-gray-800">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Number of Guests</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors duration-300"
                      required
                    >
                      <option value="">Select guest count</option>
                      {guestOptions.map((option, index) => (
                        <option key={index} value={option} className="bg-gray-800">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-green-500" />
                    Contact Information
                  </h3>

                  <div>
                    <label className="block text-white font-semibold mb-2">Parent/Guardian Name</label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors duration-300"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors duration-300"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors duration-300 resize-none"
                      placeholder="Any special requests, dietary restrictions, or additional information..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Check className="w-6 h-6 text-green-500" />
                    Confirm Your Booking
                  </h3>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-4">Booking Summary</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Child's Name:</span>
                        <span className="text-white">{formData.childName || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Age:</span>
                        <span className="text-white">{formData.childAge || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white">{formData.date || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span className="text-white">{formData.time || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Guests:</span>
                        <span className="text-white">{formData.guests || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Contact:</span>
                        <span className="text-white">{formData.parentName || "Not provided"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-green-500" />
                      <h4 className="text-lg font-bold text-white">Secure Booking</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Your information is secure and protected. We'll contact you within 24 hours to confirm
                      your booking and discuss any additional details.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Previous
                  </motion.button>
                )}

                {currentStep < totalSteps ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 ml-auto"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next Step
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 ml-auto flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calendar className="w-5 h-5" />
                    Confirm Booking
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Booking Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-blue-500" />
                Why Choose Us?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold">Professional Staff</div>
                    <div className="text-gray-300 text-sm">Trained party hosts to ensure everything runs smoothly</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold">All-Inclusive Packages</div>
                    <div className="text-gray-300 text-sm">Everything you need for the perfect celebration</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold">Safety First</div>
                    <div className="text-gray-300 text-sm">Fully insured with safety protocols in place</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold">Memorable Experience</div>
                    <div className="text-gray-300 text-sm">Creating magical memories that last forever</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Phone className="w-6 h-6 text-purple-500" />
                Need Help?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-white font-semibold">Call Us</div>
                    <div className="text-gray-300 text-sm">(555) 123-PARTY</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-white font-semibold">Email Us</div>
                    <div className="text-gray-300 text-sm">birthdays@funzone.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-white font-semibold">Visit Us</div>
                    <div className="text-gray-300 text-sm">123 Fun Street, Party City</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-3xl p-8 border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-yellow-500" />
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-white italic mb-4">
                "The best birthday party ever! The staff was amazing, the activities were perfect,
                and my daughter is still talking about it weeks later. Highly recommend!"
              </blockquote>
              <div className="text-gray-300 text-sm">
                - Sarah M., Happy Parent
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
