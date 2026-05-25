"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import Header from "../Play/Header";
import { useContactBooking } from "../../Context/ContactBookingContext";

// Alert Component
const Alert = ({ type, message, onClose }) => {
  useEffect(() => {
    // For success alerts, keep them visible longer
    const autoCloseTime = type === 'success' ? 8000 : 5000; // 8 seconds for success, 5 for error

    const timer = setTimeout(() => {
      onClose();
    }, autoCloseTime);

    return () => clearTimeout(timer);
  }, [onClose, type]);

  return (
    <motion.div
      className="fixed top-4 right-4 z-[60] max-w-md"
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
            aria-label="Close alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const [formData, setFormData] = useState({
    userName: "",
    activityId: "",
    email: "",
    phone: "",
    groupSize: "",
    eventDate: "",
    eventTime: "",
    durationHours: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  // Get booking functions from context
  const {
    eventTypes,
    combinedOptions,
    loading,
    error,
    createBooking,
    bookingLoading,
    bookingError,
    clearBookingError
  } = useContactBooking();

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    // Clear booking error when user makes changes
    if (bookingError) {
      clearBookingError();
    }

    // Clear alert when user makes changes
    if (alert) {
      setAlert(null);
    }
  };

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.userName.trim()) {
      newErrors.userName = "Name is required";
    } else if (formData.userName.trim().length < 2) {
      newErrors.userName = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.userName.trim())) {
      newErrors.userName = "Name can only contain letters and spaces";
    }

    // Activity/Event type validation
    if (!formData.activityId) {
      newErrors.activityId = "Event type is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      } else if (!/^[6-9]/.test(cleanPhone)) {
        newErrors.phone = "Phone number must start with 6, 7, 8, or 9";
      }
    }

    // Group size validation - minimum 20 people
    if (!formData.groupSize.trim()) {
      newErrors.groupSize = "Group size is required";
    } else {
      const groupSize = parseInt(formData.groupSize);
      if (isNaN(groupSize) || groupSize < 20) {
        newErrors.groupSize = "Minimum 20 people required for group bookings";
      } else if (groupSize > 1000) {
        newErrors.groupSize = "Maximum 1000 people allowed";
      }
    }

    // Event date validation - 48 hours advance booking
    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required";
    } else {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      const twoDaysFromNow = new Date(today.getTime() + (48 * 60 * 60 * 1000));

      // Set time to start of day for accurate comparison
      selectedDate.setHours(0, 0, 0, 0);
      twoDaysFromNow.setHours(0, 0, 0, 0);

      if (selectedDate < twoDaysFromNow) {
        newErrors.eventDate = "Event date must be at least 48 hours from now";
      }

      // Check if date is too far in the future (1 year)
      const oneYearFromNow = new Date(today.getTime() + (365 * 24 * 60 * 60 * 1000));
      if (selectedDate > oneYearFromNow) {
        newErrors.eventDate = "Event date cannot be more than 1 year in advance";
      }
    }

    // Event time validation - business hours (11 AM to 1 AM)
    if (!formData.eventTime) {
      newErrors.eventTime = "Event time is required";
    } else {
      const [hours, minutes] = formData.eventTime.split(':').map(Number);
      const timeInMinutes = hours * 60 + minutes;
      const elevenAM = 11 * 60; // 11:00 AM
      const oneAM = 1 * 60; // 1:00 AM (next day)

      if (timeInMinutes < elevenAM && timeInMinutes > oneAM) {
        newErrors.eventTime = "Event time must be between 11:00 AM and 1:00 AM";
      }
    }

    // Duration validation
    if (!formData.durationHours.trim()) {
      newErrors.durationHours = "Duration is required";
    } else {
      const duration = parseInt(formData.durationHours);
      if (isNaN(duration) || duration < 1) {
        newErrors.durationHours = "Duration must be at least 1 hour";
      } else if (duration > 24) {
        newErrors.durationHours = "Duration cannot exceed 24 hours";
      }
    }

    // Message validation (optional but with limits)
    if (formData.message && formData.message.length > 1000) {
      newErrors.message = "Message cannot exceed 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      // Prepare booking data
      const bookingData = {
        userName: formData.userName.trim(),
        activityId: formData.activityId, // This contains the name, not ID
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.replace(/\D/g, ''), // Remove non-digits
        groupSize: formData.groupSize.trim(),
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        durationHours: formData.durationHours.trim(),
        message: formData.message.trim()
      };

      // Call the API
      const result = await createBooking(bookingData);

      if (result.success) {
        // Show enhanced success alert
        const successMessage = `🎉 Booking enquiry submitted successfully! Booking ID: #${result.data.id}. Our event specialists will contact you within 24 hours to confirm your party details and discuss arrangements.`;
        showAlert('success', successMessage);

        // Reset form
        setFormData({
          userName: "",
          activityId: "",
          email: "",
          phone: "",
          groupSize: "",
          eventDate: "",
          eventTime: "",
          durationHours: "",
          message: ""
        });
        setErrors({});
      } else {
        // Show error alert
        const errorMessage = result.error || 'Failed to submit booking enquiry. Please try again or contact our support team.';
        showAlert('error', errorMessage);
      }
    } else {
      // Show validation error alert
      showAlert('error', 'Please fix the errors in the form before submitting.');
    }
  };

  // Get minimum date (tomorrow - allows selection from tomorrow onwards)
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1); // Changed from +2 to +1 to allow tomorrow
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <style jsx global>{`
        .no-spinner::-webkit-outer-spin-button,
        .no-spinner::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinner {
          -moz-appearance: textfield !important;
          appearance: textfield !important;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* Alert Component */}
      <AnimatePresence>
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={hideAlert}
          />
        )}
      </AnimatePresence>

      <div
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${__CDN_BASE__}He.jpg)` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Rotated Text */}
        <div
          className="hidden lg:block absolute right-[-80px] top-[370px] pointer-events-none z-[15]"
          style={{
            transform: "rotate(90deg)",
            fontSize: "8rem",
            opacity: 0.28,
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.9)",
            color: "transparent",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-6px",
          }}
          aria-hidden="true"
        >
          PARTY
        </div>

        {/* Content */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="bg-[#47494c]/85 backdrop-blur-md p-8 lg:p-12 border border-white/20 shadow-xl slant-bottom-right">
              {/* Heading */}
              <p className="text-gray-300 text-sm mb-2">
                Get Started your party
              </p>

              <div className="flex justify-between items-start flex-wrap gap-4">
                <h1 className="text-white text-3xl md:text-4xl font-bold leading-snug">
                  Plan For The Most Entertaining Party In The City!
                </h1>

                <div className="text-right">
                  <p className="text-yellow-400 text-lg" aria-label="5 star rating">⭐⭐⭐⭐⭐</p>
                  <p className="text-gray-300 text-sm">
                    4.7 out of 5 rating
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {(bookingError || error) && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-red-800 text-sm">Error</h4>
                      <p className="text-red-700 text-sm mt-1">{bookingError || error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} role="form" aria-label="Party booking form">
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="userName" className="text-gray-300 text-sm mb-1 block">
                      Name *
                    </label>
                    <input
                      id="userName"
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      disabled={bookingLoading}
                      placeholder="Enter Your Name"
                      maxLength="50"
                      required
                      aria-describedby={errors.userName ? "userName-error" : undefined}
                      aria-invalid={errors.userName ? "true" : "false"}
                      className={`w-full bg-[#5d6165] border ${
                        errors.userName ? "border-red-500" : "border-white/20"
                      } text-gray-200 rounded-lg px-4 py-3 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    />
                    {errors.userName && (
                      <p id="userName-error" className="text-red-400 text-xs mt-1" role="alert">{errors.userName}</p>
                    )}
                  </div>

                  {/* Activity/Event Type Combined */}
                  <div>
                    <label htmlFor="activityId" className="text-gray-300 text-sm mb-1 block">
                      Event Type *
                    </label>
                    <select
                      id="activityId"
                      name="activityId"
                      value={formData.activityId}
                      onChange={handleInputChange}
                      disabled={bookingLoading || loading}
                      required
                      aria-describedby={errors.activityId ? "activityId-error" : undefined}
                      aria-invalid={errors.activityId ? "true" : "false"}
                      className={`w-full bg-[#5d6165] border ${
                        errors.activityId ? "border-red-500" : "border-white/20"
                      } text-gray-200 rounded-lg px-4 py-3 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    >
                      <option value="">Select Event Type</option>
                      {eventTypes.map((event) => (
                        <option key={event.id} value={event.name}>
                          {event.name}
                        </option>
                      ))}
                    </select>
                    {errors.activityId && (
                      <p id="activityId-error" className="text-red-400 text-xs mt-1" role="alert">{errors.activityId}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="text-gray-300 text-sm mb-1 block">
                      Email address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={bookingLoading}
                      maxLength="100"
                      required
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={errors.email ? "true" : "false"}
                      className={`w-full bg-[#5d6165] border ${
                        errors.email ? "border-red-500" : "border-white/20"
                      } text-gray-200 rounded-lg px-4 py-3 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      placeholder="Enter your Email-Id"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="text-gray-300 text-sm mb-1 block">
                      Phone No *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setFormData(prev => ({ ...prev, phone: value }));
                        if (errors.phone) {
                          setErrors(prev => ({ ...prev, phone: "" }));
                        }
                        // Clear booking error and alert when user makes changes
                        if (bookingError) {
                          clearBookingError();
                        }
                        if (alert) {
                          setAlert(null);
                        }
                      }}
                      disabled={bookingLoading}
                      required
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      aria-invalid={errors.phone ? "true" : "false"}
                      className={`w-full bg-[#5d6165] border ${
                        errors.phone ? "border-red-500" : "border-white/20"
                      } text-gray-200 rounded-lg px-4 py-3 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      placeholder="+91 Mobile Number"
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-400 text-xs mt-1" role="alert">{errors.phone}</p>
                    )}
                  </div>

                  {/* Group Size */}
                  <div>
                    <label htmlFor="groupSize" className="text-gray-300 text-sm mb-1 block">
                      Group Size *
                    </label>
                    <input
                      id="groupSize"
                      type="number"
                      name="groupSize"
                      value={formData.groupSize}
                      onChange={handleInputChange}
                      disabled={bookingLoading}
                      min="20"
                      max="1000"
                      placeholder="Min 20 people"
                      required
                      aria-describedby={errors.groupSize ? "groupSize-error" : "groupSize-help"}
                      aria-invalid={errors.groupSize ? "true" : "false"}
                      className={`no-spinner w-full bg-[#5d6165] border ${
                        errors.groupSize ? "border-red-500" : "border-white/20"
                      } text-gray-200 rounded-lg px-4 py-3 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    />
                    {errors.groupSize && (
                      <p id="groupSize-error" className="text-red-400 text-xs mt-1" role="alert">{errors.groupSize}</p>
                    )}
                    <p id="groupSize-help" className="text-gray-400 text-xs mt-1">Minimum 20 people required</p>
                  </div>

                  {/* Event Date */}
                  <div>
                    <label htmlFor="eventDate" className="text-gray-300 text-sm mb-1 block">
                      Event Date *
                    </label>
                    <input
                      id="eventDate"
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      disabled={bookingLoading}
                      min={getMinDate()}
                      required
                      aria-describedby={errors.eventDate ? "eventDate-error" : "eventDate-help"}
                      aria-invalid={errors.eventDate ? "true" : "false"}
                      className={`w-full bg-[#5d6165] border ${
                        errors.eventDate ? "border-red-500" : "border-white/20"
                      } text-gray-200 rounded-lg px-4 py-3 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    />
                    {errors.eventDate && (
                      <p id="eventDate-error" className="text-red-400 text-xs mt-1" role="alert">{errors.eventDate}</p>
                    )}
                    <p id="eventDate-help" className="text-gray-400 text-xs mt-1">Book at least 48 hours in advance</p>
                  </div>

                  {/* Event Time */}
                  <div>
                    <label htmlFor="eventTime" className="text-gray-300 text-sm mb-1 block">
                      Event Time *
                    </label>
                    <input
                      id="eventTime"
                      type="time"
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleInputChange}
                      disabled={bookingLoading}
                      required
                      aria-describedby={errors.eventTime ? "eventTime-error" : "eventTime-help"}
                      aria-invalid={errors.eventTime ? "true" : "false"}
                      className={`w-full bg-[#5d6165] border ${
                        errors.eventTime ? "border-red-500" : "border-white/20"
                      } text-gray-200 rounded-lg px-4 py-3 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    />
                    {errors.eventTime && (
                      <p id="eventTime-error" className="text-red-400 text-xs mt-1" role="alert">{errors.eventTime}</p>
                    )}
                    <p id="eventTime-help" className="text-gray-400 text-xs mt-1">Operating hours: 11:00 AM - 1:00 AM</p>
                  </div>

                  {/* Duration Hours */}
                  <div>
                    <label htmlFor="durationHours" className="text-gray-300 text-sm mb-1 block">
                      Duration (Hours) *
                    </label>
                    <input
                      id="durationHours"
                      type="number"
                      name="durationHours"
                      value={formData.durationHours}
                      onChange={handleInputChange}
                      disabled={bookingLoading}
                      min="1"
                      max="24"
                      placeholder="Enter duration in hours"
                      required
                      aria-describedby={errors.durationHours ? "durationHours-error" : undefined}
                      aria-invalid={errors.durationHours ? "true" : "false"}
                      className={`no-spinner w-full bg-[#5d6165] border ${
                        errors.durationHours ? "border-red-500" : "border-white/20"
                      } text-gray-200 rounded-lg px-4 py-3 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    />
                    {errors.durationHours && (
                      <p id="durationHours-error" className="text-red-400 text-xs mt-1" role="alert">{errors.durationHours}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <label htmlFor="message" className="text-gray-300 text-sm mb-1 block">
                    Tell me about your party!
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={bookingLoading}
                    rows="4"
                    maxLength="1000"
                    placeholder="Tell me your idea of the party."
                    aria-describedby={errors.message ? "message-error" : "message-help"}
                    aria-invalid={errors.message ? "true" : "false"}
                    className={`w-full bg-[#5d6165] border ${
                      errors.message ? "border-red-500" : "border-white/20"
                    } text-gray-200 rounded-lg px-4 py-3 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">{errors.message}</p>
                  )}
                  <p id="message-help" className="text-gray-400 text-xs mt-1">{formData.message.length}/1000 characters</p>
                </div>

                {/* Submit */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    aria-describedby="submit-help"
                  >
                    {bookingLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                        Submitting...
                      </>
                    ) : (
                      "Enquire Now"
                    )}
                  </button>
                  <p id="submit-help" className="sr-only">Submit your party booking enquiry</p>
                </div>
              </form>

              {/* Important Notes */}
              {/* <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-300 text-sm">Important Notes</h4>
                    <ul className="text-yellow-200 text-xs mt-2 space-y-1">
                      <li>• Minimum 20 people required for group bookings</li>
                      <li>• Book at least 48 hours in advance for guaranteed availability</li>
                      <li>• Operating hours: 11:00 AM to 1:00 AM</li>
                      <li>• Our event specialists will contact you within 24 hours</li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
