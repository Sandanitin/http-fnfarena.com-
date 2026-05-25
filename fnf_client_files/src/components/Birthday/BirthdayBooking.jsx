"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  PartyPopper,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useBirthdayBooking } from "../../Context/BirthdayBookingContext";
import { useContact } from "../../Context/ContactContext";

// Custom Alert Component
const CustomAlert = ({ isVisible, type, title, message, onClose }) => {
  if (!isVisible) return null;

  const alertStyles = {
    success: {
      bg: "bg-green-500/20",
      border: "border-green-500/30",
      icon: CheckCircle,
      iconColor: "text-green-500",
      titleColor: "text-green-400",
      messageColor: "text-green-300"
    },
    error: {
      bg: "bg-red-500/20",
      border: "border-red-500/30",
      icon: AlertCircle,
      iconColor: "text-red-500",
      titleColor: "text-red-400",
      messageColor: "text-red-300"
    }
  };

  const style = alertStyles[type] || alertStyles.error;
  const IconComponent = style.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        className="fixed top-4 right-4 z-50 max-w-md"
      >
        <div className={`${style.bg} ${style.border} border rounded-2xl p-6 backdrop-blur-sm shadow-2xl`}>
          <div className="flex items-start gap-3">
            <IconComponent className={`w-6 h-6 ${style.iconColor} flex-shrink-0 mt-0.5`} />
            <div className="flex-1">
              <h4 className={`font-bold text-lg ${style.titleColor} mb-2`}>{title}</h4>
              <p className={`${style.messageColor} text-sm leading-relaxed`}>{message}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
              aria-label="Close alert"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function BirthdayBooking() {
  const { createBooking, timeSlots, timeSlotsLoading, timeSlotsError } = useBirthdayBooking();
  const { contactData, loading: contactLoading } = useContact();

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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  // Alert state
  const [alert, setAlert] = useState({
    isVisible: false,
    type: 'success',
    title: '',
    message: ''
  });

  const totalSteps = 3;

  // Validation patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit mobile numbers
  const alphabetRegex = /^[a-zA-Z\s]+$/; // Only alphabets and spaces

  // Get tomorrow's date in YYYY-MM-DD format
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Show alert function
  const showAlert = (type, title, message) => {
    setAlert({
      isVisible: true,
      type,
      title,
      message
    });
  };

  // Close alert function
  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isVisible: false }));
  };

  // Validation functions
  const validateChildName = (name) => {
    if (!name.trim()) {
      return "Child's name is required";
    }
    if (name.trim().length < 2) {
      return "Child's name must be at least 2 characters long";
    }
    if (!alphabetRegex.test(name.trim())) {
      return "Child's name should only contain letters and spaces";
    }
    return "";
  };

  const validateChildAge = (age) => {
    if (!age) {
      return "Child's age is required";
    }
    const numAge = parseInt(age);
    if (isNaN(numAge) || numAge < 0) {
      return "Please enter a valid age (0 or above)";
    }
    return "";
  };

  const validateParentName = (name) => {
    if (!name.trim()) {
      return "Parent/Guardian name is required";
    }
    if (name.trim().length < 2) {
      return "Parent/Guardian name must be at least 2 characters long";
    }
    if (!alphabetRegex.test(name.trim())) {
      return "Parent/Guardian name should only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email address is required";
    }
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return "Phone number is required";
    }
    if (!phoneRegex.test(phone.trim())) {
      return "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9";
    }
    return "";
  };

  const validateDate = (date) => {
    if (!date) {
      return "Please select a date";
    }
    const selectedDate = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (selectedDate < tomorrow) {
      return "Please select a date from tomorrow onwards";
    }
    return "";
  };

  const validateTime = (time) => {
    if (!time) {
      return "Please select a time slot";
    }
    return "";
  };

  const validateGuests = (guests) => {
    if (!guests) {
      return "Please enter number of guests";
    }
    const numGuests = parseInt(guests);
    if (isNaN(numGuests) || numGuests < 20) {
      return "Minimum 20 guests required for birthday bookings";
    }
    return "";
  };

  const validateStep1 = () => {
    const newErrors = {};

    const childNameError = validateChildName(formData.childName);
    if (childNameError) newErrors.childName = childNameError;

    const childAgeError = validateChildAge(formData.childAge);
    if (childAgeError) newErrors.childAge = childAgeError;

    const dateError = validateDate(formData.date);
    if (dateError) newErrors.date = dateError;

    const timeError = validateTime(formData.time);
    if (timeError) newErrors.time = timeError;

    const guestsError = validateGuests(formData.guests);
    if (guestsError) newErrors.guests = guestsError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    const parentNameError = validateParentName(formData.parentName);
    if (parentNameError) newErrors.parentName = parentNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input change handlers with validation
  const handleNameChange = (e, fieldName) => {
    const { value } = e.target;

    // Allow only alphabets and spaces
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');

    setFormData({
      ...formData,
      [fieldName]: filteredValue
    });

    // Real-time validation
    if (errors[fieldName]) {
      const validationError = fieldName === 'childName'
        ? validateChildName(filteredValue)
        : validateParentName(filteredValue);

      if (!validationError) {
        setErrors({
          ...errors,
          [fieldName]: ""
        });
      }
    }
  };

  const handleNumericChange = (e, fieldName) => {
    const { value } = e.target;

    // Allow only digits
    const filteredValue = value.replace(/\D/g, '');

    setFormData({
      ...formData,
      [fieldName]: filteredValue
    });

    // Real-time validation
    if (errors[fieldName]) {
      let validationError = "";
      if (fieldName === 'childAge') {
        validationError = validateChildAge(filteredValue);
      } else if (fieldName === 'guests') {
        validationError = validateGuests(filteredValue);
      } else if (fieldName === 'phone') {
        validationError = validatePhone(filteredValue);
      }

      if (!validationError) {
        setErrors({
          ...errors,
          [fieldName]: ""
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle different input types
    if (name === "childName" || name === "parentName") {
      handleNameChange(e, name);
      return;
    }

    if (name === "childAge" || name === "guests" || name === "phone") {
      handleNumericChange(e, name);
      return;
    }

    // Handle other inputs normally
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation for other fields
    if (errors[name]) {
      let validationError = "";
      if (name === 'email') {
        validationError = validateEmail(value);
      } else if (name === 'date') {
        validationError = validateDate(value);
      } else if (name === 'time') {
        validationError = validateTime(value);
      }

      if (!validationError) {
        setErrors({
          ...errors,
          [name]: ""
        });
      }
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    let isValid = false;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    }

    if (!isValid) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setFormData({
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
    setCurrentStep(1);
    setErrors({});
    setIsBookingComplete(false);
    closeAlert();
  };

  const handleConfirmBooking = async () => {
    // Prevent multiple submissions
    if (isSubmitting || isBookingComplete) {
      return;
    }

    // Final validation for minimum guests
    if (parseInt(formData.guests) < 20) {
      showAlert(
        'error',
        '❌ Invalid Guest Count',
        'Minimum 20 guests required for birthday bookings. Please update the guest count and try again.'
      );
      return;
    }

    setIsSubmitting(true);

    const payload = {
      customer_name: formData.parentName,
      child: formData.childName,
      age: Number(formData.childAge),
      email: formData.email,
      phone: formData.phone,
      theme: "Birthday Party",
      date: formData.date,
      time: formData.time,
      guests: parseInt(formData.guests) || 0,
      booking_type: "Pre-Booked",
      total: 0,
      advance: 0,
      payment_status: "Partial",
      status: "Pending",
      message: formData.specialRequests,
      create_audit_id: 1
    };

    try {
      const res = await createBooking(payload);

      // Show success alert
      showAlert(
        'success',
        '🎉 Booking Confirmed!',
        "Your birthday party has been successfully booked! We'll contact you within 24 hours to finalize all the details and make your celebration perfect."
      );

      // Mark booking as complete
      setIsBookingComplete(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        resetForm();
      }, 5000);

    } catch (err) {
      // Show error alert
      showAlert(
        'error',
        '❌ Booking Failed',
        err.message || "Something went wrong while processing your booking. Please check your information and try again."
      );

    } finally {
      setIsSubmitting(false);
    }
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

      {/* Custom Alert */}
      <CustomAlert
        isVisible={alert.isVisible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={closeAlert}
      />

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
                    {currentStep === 3 && "Review & Confirm"}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Step 1: Party Details */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Gift className="w-6 h-6 text-orange-700" />
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
                        className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                          errors.childName ? "border-red-500" : "border-white/20 focus:border-red-500"
                        }`}
                        placeholder="Birthday star's name"
                        required
                        aria-describedby={errors.childName ? "childName-error" : undefined}
                      />
                      {errors.childName && (
                        <p id="childName-error" className="text-red-400 text-sm mt-1" role="alert">
                          {errors.childName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Age Turning</label>
                      <input
                        type="text"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        className={`no-spinner w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                          errors.childAge ? "border-red-500" : "border-white/20 focus:border-red-500"
                        }`}
                        placeholder="Age"
                        required
                        aria-describedby={errors.childAge ? "childAge-error" : undefined}
                      />
                      {errors.childAge && (
                        <p id="childAge-error" className="text-red-400 text-sm mt-1" role="alert">
                          {errors.childAge}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={getTomorrowDate()}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none transition-colors duration-300 ${
                        errors.date ? "border-red-500" : "border-white/20 focus:border-red-500"
                      }`}
                      required
                      aria-describedby={errors.date ? "date-error" : undefined}
                    />
                    {errors.date && (
                      <p id="date-error" className="text-red-400 text-sm mt-1" role="alert">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Time Slot</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none transition-colors duration-300 ${
                        errors.time ? "border-red-500" : "border-white/20 focus:border-red-500"
                      }`}
                      required
                      disabled={timeSlotsLoading}
                      aria-describedby={errors.time ? "time-error" : undefined}
                    >
                      <option value="">
                        {timeSlotsLoading ? "Loading time slots..." : "Select time slot"}
                      </option>
                      {!timeSlotsLoading && !timeSlotsError && timeSlots.map((slot) => (
                        <option key={slot.id} value={slot.value} className="bg-gray-800">
                          {slot.label}
                        </option>
                      ))}
                      {timeSlotsError && (
                        <option value="" disabled className="bg-gray-800 text-red-400">
                          Error loading time slots
                        </option>
                      )}
                    </select>
                    {errors.time && (
                      <p id="time-error" className="text-red-400 text-sm mt-1" role="alert">
                        {errors.time}
                      </p>
                    )}
                    {timeSlotsError && (
                      <p className="text-red-400 text-sm mt-1" role="alert">
                        Failed to load time slots. Please refresh the page.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Number of Guests</label>
                    <input
                      type="text"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className={`no-spinner w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                        errors.guests ? "border-red-500" : "border-white/20 focus:border-green-500"
                      }`}
                      placeholder="Enter number of guests"
                      required
                      aria-describedby={errors.guests ? "guests-error" : undefined}
                    />
                    {formData.guests && parseInt(formData.guests) < 20 && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1" role="alert">
                        <span>⚠️</span>
                        Minimum 20 guests required for birthday bookings
                      </p>
                    )}
                    {errors.guests && (
                      <p id="guests-error" className="text-red-400 text-sm mt-1" role="alert">
                        {errors.guests}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                        errors.parentName ? "border-red-500" : "border-white/20 focus:border-green-500"
                      }`}
                      placeholder="Your full name"
                      required
                      aria-describedby={errors.parentName ? "parentName-error" : undefined}
                    />
                    {errors.parentName && (
                      <p id="parentName-error" className="text-red-400 text-sm mt-1" role="alert">
                        {errors.parentName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-300
                        ${errors.email ? "border-red-500" : "border-white/20 focus:border-green-500"}`}
                      placeholder="your.email@example.com"
                      required
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      maxLength={10}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-300
                        ${errors.phone ? "border-red-500" : "border-white/20 focus:border-green-500"}`}
                      placeholder="10-digit mobile number"
                      required
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-400 text-sm mt-1" role="alert">
                        {errors.phone}
                      </p>
                    )}
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
                      aria-label="Special requests or additional information"
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
                    Review & Confirm Your Booking
                  </h3>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-4">Booking Summary</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Child's Name:</span>
                        <span className="text-white font-medium">{formData.childName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Age:</span>
                        <span className="text-white font-medium">{formData.childAge} years old</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white font-medium">{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span className="text-white font-medium">{formData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Guests:</span>
                        <span className="text-white font-medium">{formData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Contact:</span>
                        <span className="text-white font-medium">{formData.parentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email:</span>
                        <span className="text-white font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Phone:</span>
                        <span className="text-white font-medium">{formData.phone}</span>
                      </div>
                      {formData.specialRequests && (
                        <div className="pt-2 border-t border-white/10">
                          <span className="text-gray-400 block mb-1">Special Requests:</span>
                          <span className="text-white text-sm">{formData.specialRequests}</span>
                        </div>
                      )}
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

                  {/* Success State */}
                  {isBookingComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 text-center"
                    >
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Check className="w-8 h-8 text-green-500" />
                        <h4 className="text-xl font-bold text-white">Booking Confirmed!</h4>
                      </div>
                      <p className="text-green-300">
                        Your birthday party has been successfully booked. We'll be in touch soon!
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && !isBookingComplete && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    aria-label="Go to previous step"
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
                    aria-label="Go to next step"
                  >
                    Next Step
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleConfirmBooking}
                    disabled={isSubmitting || isBookingComplete}
                    className={`px-8 py-3 font-bold rounded-xl transition-all duration-300 ml-auto flex items-center gap-2 ${
                      isBookingComplete
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : isSubmitting
                        ? "bg-gray-500/50 text-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
                    }`}
                    whileHover={{ scale: (isSubmitting || isBookingComplete) ? 1 : 1.02 }}
                    whileTap={{ scale: (isSubmitting || isBookingComplete) ? 1 : 0.98 }}
                    aria-label={isSubmitting ? "Processing booking" : isBookingComplete ? "Booking confirmed" : "Confirm booking"}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : isBookingComplete ? (
                      <>
                        <Check className="w-5 h-5" />
                        Booking Confirmed
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Confirm Booking
                      </>
                    )}
                  </motion.button>
                )}
              </div>
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
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-3xl p-8 border border-red-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-red-500" />
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
                      <div className="text-gray-300 text-sm">
                        {contactLoading ? "Loading..." : (contactData?.phone2 || "(555) 123-PARTY")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="text-white font-semibold">Email Us</div>
                      <div className="text-gray-300 text-sm">
                        {contactLoading ? "Loading..." : (contactData?.email2 || "birthdays@funzone.com")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="text-white font-semibold">Visit Us</div>
                      <div className="text-gray-300 text-sm">
                        {contactLoading ? "Loading..." : (contactData?.address || "123 Fun Street, Party City")}
                      </div>
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
    </>
  );
}
