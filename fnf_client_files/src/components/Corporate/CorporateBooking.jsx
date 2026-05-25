"use client";
import React, { useState, useRef, forwardRef } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  Building2,
  CheckCircle,
  ArrowRight,
  Star,
  Gamepad2,
  Trophy,
  Target,
  Zap
} from "lucide-react";
import { useBooking } from "../../Context/BookingContext";
import { useContact } from "../../Context/ContactContext";

const CorporateBooking = forwardRef((props, ref) => {
  const {
    timeSlots,
    createCorporateBooking,
    loading
  } = useBooking();

  const { contactData, loading: contactLoading } = useContact();

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    eventType: '',
    participants: '',
    preferredDate: '',
    preferredTime: '',
    gamingZones: [],
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Validation functions
  const validateCompanyName = (name) => {
    if (!name.trim()) {
      return "Company name is required";
    }
    if (name.trim().length < 2) {
      return "Company name must be at least 2 characters long";
    }
    if (!alphabetRegex.test(name.trim())) {
      return "Company name should only contain letters and spaces";
    }
    return "";
  };

  const validateContactPerson = (name) => {
    if (!name.trim()) {
      return "Contact person name is required";
    }
    if (name.trim().length < 2) {
      return "Contact person name must be at least 2 characters long";
    }
    if (!alphabetRegex.test(name.trim())) {
      return "Contact person name should only contain letters and spaces";
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

  const validateEventType = (eventType) => {
    if (!eventType.trim()) {
      return "Event type is required";
    }
    if (eventType.trim().length < 3) {
      return "Event type must be at least 3 characters long";
    }
    return "";
  };

  const validateParticipants = (participants) => {
    if (!participants) {
      return "Number of participants is required";
    }
    const numParticipants = parseInt(participants);
    if (isNaN(numParticipants) || numParticipants < 20) {
      return "Minimum 20 participants required for corporate bookings";
    }
    return "";
  };

  const validateDate = (date) => {
    if (!date) {
      return "Please select a preferred date";
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
      return "Please select a preferred time slot";
    }
    return "";
  };

  // Input change handlers with validation
  const handleNameChange = (e, fieldName) => {
    const { value } = e.target;

    // Allow only alphabets and spaces
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');

    setFormData(prev => ({
      ...prev,
      [fieldName]: filteredValue
    }));

    // Real-time validation
    if (errors[fieldName]) {
      const validationError = fieldName === 'companyName'
        ? validateCompanyName(filteredValue)
        : validateContactPerson(filteredValue);

      if (!validationError) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: ""
        }));
      }
    }
  };

  const handleNumericChange = (e, fieldName) => {
    const { value } = e.target;

    // Allow only digits
    const filteredValue = value.replace(/\D/g, '');

    // Apply length limits
    let finalValue = filteredValue;
    if (fieldName === 'phone' && filteredValue.length > 10) {
      finalValue = filteredValue.slice(0, 10);
    }

    setFormData(prev => ({
      ...prev,
      [fieldName]: finalValue
    }));

    // Real-time validation
    if (errors[fieldName]) {
      let validationError = "";
      if (fieldName === 'phone') {
        validationError = validatePhone(finalValue);
      } else if (fieldName === 'participants') {
        validationError = validateParticipants(finalValue);
      }

      if (!validationError) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: ""
        }));
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle different input types
    if (name === "companyName" || name === "contactPerson") {
      handleNameChange(e, name);
      return;
    }

    if (name === "phone" || name === "participants") {
      handleNumericChange(e, name);
      return;
    }

    // Handle other inputs normally
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation for other fields
    if (errors[name]) {
      let validationError = "";
      if (name === 'email') {
        validationError = validateEmail(value);
      } else if (name === 'eventType') {
        validationError = validateEventType(value);
      } else if (name === 'preferredDate') {
        validationError = validateDate(value);
      } else if (name === 'preferredTime') {
        validationError = validateTime(value);
      }

      if (!validationError) {
        setErrors(prev => ({
          ...prev,
          [name]: ""
        }));
      }
    }
  };

  const handleGamingZoneChange = (zone) => {
    setFormData(prev => ({
      ...prev,
      gamingZones: prev.gamingZones.includes(zone)
        ? prev.gamingZones.filter(z => z !== zone)
        : [...prev.gamingZones, zone]
    }));
  };

  // Helper function to get participant ID from numeric input
  const getParticipantId = (participantCount) => {
    const count = parseInt(participantCount);
    if (count >= 5 && count <= 10) return 1;
    if (count >= 11 && count <= 15) return 2;
    if (count >= 16 && count <= 20) return 3;
    if (count >= 21 && count <= 25) return 4;
    if (count >= 25) return 5;
    return 1; // Default
  };

  // Comprehensive form validation
  const validateForm = () => {
    const newErrors = {};

    const companyNameError = validateCompanyName(formData.companyName);
    if (companyNameError) newErrors.companyName = companyNameError;

    const contactPersonError = validateContactPerson(formData.contactPerson);
    if (contactPersonError) newErrors.contactPerson = contactPersonError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const eventTypeError = validateEventType(formData.eventType);
    if (eventTypeError) newErrors.eventType = eventTypeError;

    const participantsError = validateParticipants(formData.participants);
    if (participantsError) newErrors.participants = participantsError;

    const dateError = validateDate(formData.preferredDate);
    if (dateError) newErrors.preferredDate = dateError;

    const timeError = validateTime(formData.preferredTime);
    if (timeError) newErrors.preferredTime = timeError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        company_name: formData.companyName,
        contact_person: formData.contactPerson,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ""),
        event_type_id: formData.eventType, // Send user input as string
        participants_id: getParticipantId(formData.participants), // Send numeric ID
        participants: parseInt(formData.participants) || 0, // Send actual participant count
        preferred_date: formData.preferredDate,
        time_slot_id: Number(formData.preferredTime),
        time: Number(formData.preferredTime), // Send both field names for compatibility
        requirements: formData.specialRequests,
        booking_date: new Date().toISOString().split("T")[0],
        total_amount: 0, // Default values
        total: 0,
        advance_paid: 0,
        advance: 0,
        status: "Pending",
        create_audit_id: "1"
      };

      await createCorporateBooking(payload);

      alert("✅ Corporate booking submitted successfully");

      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        eventType: "",
        participants: "",
        preferredDate: "",
        preferredTime: "",
        gamingZones: [],
        specialRequests: ""
      });

      setErrors({});

    } catch (err) {
      alert(err.message || "Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const gamingZones = [
    { id: 'bowling', name: 'Bowling Lanes', icon: Target },
    { id: 'laser-tag', name: 'Laser Tag Arena', icon: Zap },
    { id: 'arcade', name: 'Arcade Games', icon: Gamepad2 },
    { id: 'paintball', name: 'Paintball Arena', icon: Target },
    { id: 'adventure', name: 'Adventure Zone', icon: Trophy },
    { id: 'vr', name: 'VR Gaming', icon: Gamepad2 }
  ];

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

      <section
        ref={ref}
        data-section="corporate-booking"
        id="corporate-booking"
        className="corporate-booking relative py-20 bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 800">
            <defs>
              <pattern id="gamingBookingPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1" fill="currentColor" className="text-blue-500"/>
                <rect x="20" y="20" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/10"/>
                <circle cx="40" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-blue-500/20"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gamingBookingPattern)"/>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 text-blue-500/10"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <Gamepad2 className="w-12 h-12" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-40 text-blue-500/10"
            animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <Trophy className="w-10 h-10" />
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
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500 text-sm font-semibold">Book Gaming Event</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
              Plan Your <span className="text-blue-500">Gaming Tournament</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Ready to create an epic corporate gaming experience? Fill out the form below and our
              gaming event specialists will help you design the perfect tournament for your team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Booking Form */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-500" />
                      Company Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="companyName" className="block text-gray-300 text-sm font-medium mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.companyName ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-blue-500"
                          }`}
                          placeholder="Your company name"
                          aria-describedby={errors.companyName ? "companyName-error" : undefined}
                        />
                        {errors.companyName && (
                          <p id="companyName-error" className="text-red-400 text-sm mt-1" role="alert">
                            {errors.companyName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contactPerson" className="block text-gray-300 text-sm font-medium mb-2">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          id="contactPerson"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.contactPerson ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-blue-500"
                          }`}
                          placeholder="Your full name"
                          aria-describedby={errors.contactPerson ? "contactPerson-error" : undefined}
                        />
                        {errors.contactPerson && (
                          <p id="contactPerson-error" className="text-red-400 text-sm mt-1" role="alert">
                            {errors.contactPerson}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.email ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-blue-500"
                          }`}
                          placeholder="company@email.com"
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          inputMode="numeric"
                          maxLength={10}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.phone ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-blue-500"
                          }`}
                          placeholder="Enter 10-digit mobile number"
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="text-red-400 text-sm mt-1" role="alert">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="eventType" className="block text-gray-300 text-sm font-medium mb-2">
                          Event Type *
                        </label>
                        <input
                          type="text"
                          id="eventType"
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.eventType ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-blue-500"
                          }`}
                          placeholder="e.g., Team Building, Corporate Tournament, etc."
                          aria-describedby={errors.eventType ? "eventType-error" : undefined}
                        />
                        {errors.eventType && (
                          <p id="eventType-error" className="text-red-400 text-sm mt-1" role="alert">
                            {errors.eventType}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="participants" className="block text-gray-300 text-sm font-medium mb-2">
                          Number of Participants *
                        </label>
                        <input
                          type="text"
                          id="participants"
                          name="participants"
                          value={formData.participants}
                          onChange={handleInputChange}
                          required
                          className={`no-spinner w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.participants ? "border-red-500 focus:ring-red-500" :
                            formData.participants && parseInt(formData.participants) < 20
                              ? 'border-red-500/50 focus:ring-red-500'
                              : 'border-white/20 focus:ring-blue-500'
                          }`}
                          placeholder="Enter number of participants"
                          aria-describedby={errors.participants ? "participants-error" : undefined}
                        />
                        {formData.participants && parseInt(formData.participants) < 20 && !errors.participants && (
                          <p className="text-red-400 text-sm mt-1 flex items-center gap-1" role="alert">
                            <span>⚠️</span>
                            Minimum 20 participants required
                          </p>
                        )}
                        {errors.participants && (
                          <p id="participants-error" className="text-red-400 text-sm mt-1" role="alert">
                            {errors.participants}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="preferredDate" className="block text-gray-300 text-sm font-medium mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          required
                          min={getTomorrowDate()}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.preferredDate ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-blue-500"
                          }`}
                          aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
                        />
                        {errors.preferredDate && (
                          <p id="preferredDate-error" className="text-red-400 text-sm mt-1" role="alert">
                            {errors.preferredDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="preferredTime" className="block text-gray-300 text-sm font-medium mb-2">
                          Preferred Time *
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.preferredTime ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-blue-500"
                          }`}
                          disabled={loading}
                          aria-describedby={errors.preferredTime ? "preferredTime-error" : undefined}
                        >
                          <option value="" className="bg-gray-800">
                            {loading ? "Loading time slots..." : "Select time slot"}
                          </option>
                          {!loading && timeSlots.map(slot => (
                            <option key={slot.id} value={slot.id} className="bg-gray-800">
                              {slot.label}
                            </option>
                          ))}
                          {timeSlots.length === 0 && !loading && (
                            <option value="" disabled className="bg-gray-800 text-red-400">
                              No time slots available
                            </option>
                          )}
                        </select>
                        {errors.preferredTime && (
                          <p id="preferredTime-error" className="text-red-400 text-sm mt-1" role="alert">
                            {errors.preferredTime}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label htmlFor="specialRequests" className="block text-gray-300 text-sm font-medium mb-2">
                      Special Requests or Requirements
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about catering preferences, team sizes for activities, tournament format, awards ceremony requirements, or any other special arrangements..."
                      aria-label="Special requests or requirements"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    aria-label={isSubmitting ? "Processing booking" : "Book gaming event"}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Book Gaming Event
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Event Information & Benefits */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* What's Included */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                  Gaming Event Includes
                </h3>

                <div className="space-y-4">
                  {[
                    "Dedicated gaming event coordinator",
                    "Professional tournament setup",
                    "All gaming equipment and safety gear",
                    "Live scoring and leaderboards",
                    "Team formation and rotation management",
                    "Awards ceremony with trophies",
                    "Event photography and highlights",
                    "Catering and refreshment options"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Need Help?</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Call Us</p>
                      <p className="text-gray-400">
                        {contactLoading ? "Loading..." : (contactData?.phone2 || "9090945459")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Email Us</p>
                      <p className="text-gray-400">
                        {contactLoading ? "Loading..." : (contactData?.email || "contact@gmail.com")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Visit Us</p>
                      <p className="text-gray-400">
                        {contactLoading ? "Loading..." : (contactData?.address || "Telangana")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-br from-blue-500/10 to-white/5 rounded-2xl p-6 border border-blue-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-300 italic mb-4">
                  "Our corporate team-building event at FNF Arena was incredible! The bowling tournament
                  and laser tag battles brought our team closer together. The staff organized everything
                  perfectly, and the awards ceremony was the perfect ending to an amazing day."
                </blockquote>

                <div className="flex items-center gap-3">
                  <img
                    src="https://cdn.acsdev.in/FNF/699b263b8f25e.jpeg"
                    alt="Client testimonial"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold">Rajesh Kumar</p>
                    <p className="text-gray-400 text-sm">HR Director, TechCorp Solutions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
});

CorporateBooking.displayName = 'CorporateBooking';

export default CorporateBooking;
