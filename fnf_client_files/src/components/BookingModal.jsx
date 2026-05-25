"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Calendar, Users, Mail, Phone, User, Clock, AlertCircle, CheckCircle, Loader2, PartyPopper } from "lucide-react";
import { useEventPackages } from "../Context/EventPackagesContext";

const BookingModal = ({ isOpen, onClose, selectedPackage, showAlert }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",

    // Event Details
    eventDate: "",
    eventTime: "",
    numberOfParticipants: "",

    // Additional Information
    specialRequests: "",

    // Agreement
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get booking functions from context
  const { createBooking, bookingLoading, bookingError, clearBookingError } = useEventPackages();

  // Get guidelines from selected package or use fallback
  const getPackageGuidelines = () => {
    if (!selectedPackage?.guidelines || selectedPackage.guidelines.length === 0) {
      // Fallback guidelines if none provided
      return [
        {
          icon: <Users className="w-5 h-5" />,
          title: "Minimum Participants",
          description: "Minimum 20 participants required for group bookings"
        },
        {
          icon: <Clock className="w-5 h-5" />,
          title: "Advance Booking",
          description: "Book at least 48 hours in advance for guaranteed availability"
        },
        {
          icon: <Calendar className="w-5 h-5" />,
          title: "Cancellation Policy",
          description: "Free cancellation up to 24 hours before the event"
        }
      ];
    }

    // Map API guidelines to component format with appropriate icons
    const iconMap = {
      "Usage Guideline": <Users className="w-5 h-5" />,
      "Safety Guideline": <AlertCircle className="w-5 h-5" />,
      "Booking Guideline": <Calendar className="w-5 h-5" />,
      "Cancellation Guideline": <Clock className="w-5 h-5" />,
      "Payment Guideline": <CheckCircle className="w-5 h-5" />,
      "Minimum Participants": <Users className="w-5 h-5" />,
      "Advance Booking": <Clock className="w-5 h-5" />,
      "Cancellation Policy": <Calendar className="w-5 h-5" />
    };

    return selectedPackage.guidelines.map((guideline, index) => ({
      icon: iconMap[guideline.title] || <AlertCircle className="w-5 h-5" />,
      title: guideline.title,
      description: guideline.description
    }));
  };

  const packageRules = getPackageGuidelines();

  // Clear booking error when modal opens
  useEffect(() => {
    if (isOpen) {
      clearBookingError();
      setIsSubmitting(false);
    }
  }, [isOpen, clearBookingError]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Full name can only contain letters and spaces";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      // Enhanced email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      // Enhanced phone validation
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      } else if (!/^[6-9]/.test(cleanPhone)) {
        newErrors.phone = "Phone number must start with 6, 7, 8, or 9";
      }
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required";
    } else {
      // Enhanced date validation
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

    if (!formData.eventTime) {
      newErrors.eventTime = "Event time is required";
    } else {
      // Validate business hours (11 AM to 1 AM)
      const [hours, minutes] = formData.eventTime.split(':').map(Number);
      const timeInMinutes = hours * 60 + minutes;
      const elevenAM = 11 * 60; // 11:00 AM
      const oneAM = 1 * 60; // 1:00 AM (next day)

      if (timeInMinutes < elevenAM && timeInMinutes > oneAM) {
        newErrors.eventTime = "Event time must be between 11:00 AM and 1:00 AM";
      }
    }

    if (!formData.numberOfParticipants) {
      newErrors.numberOfParticipants = "Number of participants is required";
    } else {
      const participants = parseInt(formData.numberOfParticipants);
      if (isNaN(participants) || participants < 20) {
        newErrors.numberOfParticipants = "At least 20 participants are required";
      } else if (participants > 500) {
        newErrors.numberOfParticipants = "Maximum 500 participants allowed";
      } else if (participants < 10) {
        newErrors.numberOfParticipants = "Minimum 10 participants required for corporate bookings";
      }
    }

    // Special requests validation (optional but with limits)
    if (formData.specialRequests && formData.specialRequests.length > 500) {
      newErrors.specialRequests = "Special requests cannot exceed 500 characters";
    }

    // Agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to terms and conditions to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting || bookingLoading) {
      console.log('Submission blocked:', { isSubmitting, bookingLoading });
      return;
    }

    // Validate form
    if (!validateForm()) {
      if (showAlert) {
        showAlert('error', 'Please fix the errors in the form before submitting.');
      }
      return;
    }

    console.log('Starting form submission...');

    // IMMEDIATELY disable the submit button
    setIsSubmitting(true);

    try {
      // Prepare booking data
      const bookingData = {
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.replace(/\D/g, ''), // Remove non-digits
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        numberOfParticipants: parseInt(formData.numberOfParticipants),
        specialRequests: formData.specialRequests.trim(),
        agreeToTerms: formData.agreeToTerms,
        totalAmount: selectedPackage.offerPrice * parseInt(formData.numberOfParticipants),
        submittedAt: new Date().toISOString()
      };

      console.log('Submitting booking data:', bookingData);

      // Call the API
      const result = await createBooking(bookingData);

      console.log('Booking result:', result);

      // Close modal immediately and pass result to parent
      console.log('Closing modal after submission...');
      handleClose(result);

    } catch (error) {
      console.error('Booking submission error:', error);
      const errorResult = {
        success: false,
        error: 'An unexpected error occurred. Please try again or contact our support team.'
      };

      // Close modal and pass error result to parent
      handleClose(errorResult);
    }
  };

  const nextStep = () => {
    // Validate step 1 before proceeding
    const step1Errors = {};

    // Only validate that user has read the package details
    // No form validation needed for step 1

    if (Object.keys(step1Errors).length === 0) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const handleClose = (bookingResult = null) => {
    console.log('Modal handleClose called with result:', bookingResult);

    // Reset all states when closing
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      eventDate: "",
      eventTime: "",
      numberOfParticipants: "",
      specialRequests: "",
      agreeToTerms: false
    });
    setCurrentStep(1);
    setErrors({});
    setIsSubmitting(false);
    clearBookingError();

    // Call parent's onClose with booking result
    onClose(bookingResult);
  };

  // Get minimum date (48 hours from now)
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toISOString().split('T')[0];
  };

  // Get maximum date (1 year from now)
  const getMaxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split('T')[0];
  };

  if (!selectedPackage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => handleClose()}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col"
            style={{
              height: 'calc(100vh - 2rem)',
              maxHeight: '900px',
              minHeight: '600px'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 relative rounded-t-2xl flex-shrink-0">
              <button
                onClick={() => handleClose()}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                disabled={isSubmitting || bookingLoading}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  {selectedPackage.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedPackage.name}</h2>
                  <p className="text-red-100">{selectedPackage.subtitle}</p>
                  <p className="text-xl font-semibold mt-1">₹{selectedPackage.offerPrice} per person</p>
                </div>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center gap-4 mt-6">
                <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-white' : 'text-red-200'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= 1 ? 'bg-white text-red-600' : 'bg-red-500/50'
                  }`}>
                    1
                  </div>
                  <span className="text-sm font-medium">Package Details</span>
                </div>
                <div className="w-8 h-px bg-red-300"></div>
                <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-white' : 'text-red-200'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= 2 ? 'bg-white text-red-600' : 'bg-red-500/50'
                  }`}>
                    2
                  </div>
                  <span className="text-sm font-medium">Booking Details</span>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Error Message */}
              {bookingError && (
                <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800 text-sm">Booking Error</h4>
                      <p className="text-red-700 text-sm mt-1">{bookingError}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Content */}
              {currentStep === 1 ? (
                // Step 1: Package Details and Rules
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Package Features */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Package Includes</h3>
                      <div className="space-y-3">
                        {selectedPackage.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700 text-sm leading-relaxed">
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
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rules and Guidelines */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Important Guidelines</h3>
                      <div className="space-y-4">
                        {packageRules.map((rule, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="text-red-600 mt-0.5">
                              {rule.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 text-sm">{rule.title}</h4>
                              <p className="text-gray-600 text-xs mt-1">{rule.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Important Notes */}
                      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-800 text-sm">Important Notes</h4>
                            <ul className="text-yellow-700 text-xs mt-2 space-y-1">
                              <li>• Safety briefing is mandatory before activities</li>
                              <li>• All activities are subject to weather conditions</li>
                              <li>• 50% advance payment required to confirm booking</li>
                              <li>• Operating hours: 11:00 AM to 1:00 AM</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Step 2: Booking Form
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Your Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            disabled={isSubmitting || bookingLoading}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                              errors.fullName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your full name"
                            maxLength="50"
                          />
                          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isSubmitting || bookingLoading}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your email address"
                            maxLength="100"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={isSubmitting || bookingLoading}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter 10-digit phone number"
                            maxLength="10"
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Event Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Event Date *
                          </label>
                          <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleInputChange}
                            disabled={isSubmitting || bookingLoading}
                            min={getMinDate()}
                            max={getMaxDate()}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                              errors.eventDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Event Time *
                          </label>
                          <input
                            type="time"
                            name="eventTime"
                            value={formData.eventTime}
                            onChange={handleInputChange}
                            disabled={isSubmitting || bookingLoading}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                              errors.eventTime ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.eventTime && <p className="text-red-500 text-xs mt-1">{errors.eventTime}</p>}
                          <p className="text-xs text-gray-500 mt-1">Operating hours: 11:00 AM - 1:00 AM</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Participants *
                          </label>
                          <input
                            type="number"
                            name="numberOfParticipants"
                            value={formData.numberOfParticipants}
                            onChange={handleInputChange}
                            disabled={isSubmitting || bookingLoading}
                            min="10"
                            max="500"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                              errors.numberOfParticipants ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Min 20 people"
                          />
                          {errors.numberOfParticipants && <p className="text-red-500 text-xs mt-1">{errors.numberOfParticipants}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          disabled={isSubmitting || bookingLoading}
                          rows="3"
                          maxLength="500"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                            errors.specialRequests ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Any special requests, dietary restrictions, or additional requirements..."
                        />
                        {errors.specialRequests && <p className="text-red-500 text-xs mt-1">{errors.specialRequests}</p>}
                        <p className="text-xs text-gray-500 mt-1">{formData.specialRequests.length}/500 characters</p>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Terms & Conditions</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            disabled={isSubmitting || bookingLoading}
                            className="mt-1 disabled:cursor-not-allowed"
                          />
                          <label className="text-sm text-gray-700">
                            I agree to the terms and conditions, cancellation policy, and understand that a 50% advance payment is required to confirm the booking. I also acknowledge that all participants will follow safety guidelines and operating hours (11:00 AM - 1:00 AM). *
                          </label>
                        </div>
                        {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}
                      </div>
                    </div>

                    {/* Total Amount Display */}
                    {/* {formData.numberOfParticipants && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                          <span className="text-2xl font-bold text-red-600">
                            ₹{(selectedPackage.offerPrice * parseInt(formData.numberOfParticipants || 0)).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {formData.numberOfParticipants} participants × ₹{selectedPackage.offerPrice} per person
                        </p>
                      </div>
                    )} */}
                  </form>
                </div>
              )}
            </div>

            {/* Fixed Footer */}
            <div className="border-t bg-gray-50 p-6 flex justify-between items-center rounded-b-2xl flex-shrink-0">
              {currentStep === 1 ? (
                <div className="flex justify-end w-full">
                  <motion.button
                    onClick={nextStep}
                    disabled={isSubmitting || bookingLoading}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    whileHover={{ scale: (isSubmitting || bookingLoading) ? 1 : 1.02 }}
                    whileTap={{ scale: (isSubmitting || bookingLoading) ? 1 : 0.98 }}
                  >
                    Proceed to Booking
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              ) : (
                <div className="flex justify-between w-full">
                  <motion.button
                    onClick={prevStep}
                    disabled={isSubmitting || bookingLoading}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    whileHover={{ scale: (isSubmitting || bookingLoading) ? 1 : 1.02 }}
                    whileTap={{ scale: (isSubmitting || bookingLoading) ? 1 : 0.98 }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Details
                  </motion.button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting || bookingLoading}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:cursor-not-allowed ${
                      (isSubmitting || bookingLoading)
                        ? 'bg-gray-400 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                    whileHover={{ scale: (isSubmitting || bookingLoading) ? 1 : 1.02 }}
                    whileTap={{ scale: (isSubmitting || bookingLoading) ? 1 : 0.98 }}
                  >
                    {(isSubmitting || bookingLoading) ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Booking Request"
                    )}
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
