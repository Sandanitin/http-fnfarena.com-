"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function EventsFAQ() {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "What is the capacity of your banquet hall?",
      answer: "Our premium banquet hall can accommodate up to 500+ guests comfortably. The space is 8,000 sq ft and features flexible seating arrangements that can be customized based on your event requirements."
    },
    {
      question: "Do you provide catering services for events?",
      answer: "Yes, we offer comprehensive catering services with a variety of menu options including Indian, Continental, and Chinese cuisines. Our experienced chefs can customize menus based on your preferences and dietary requirements."
    },
    {
      question: "Can we use the lawn space for outdoor events?",
      answer: "Absolutely! Our beautiful lawn space spans 12,000 sq ft and is perfect for outdoor ceremonies, garden parties, and open-air celebrations. We provide weather protection options and can accommodate up to 300+ guests."
    },
    {
      question: "What audio-visual equipment do you provide?",
      answer: "We provide professional sound systems, microphones, projectors, LED screens, and lighting equipment. Our technical team ensures all equipment is properly set up and tested before your event."
    },
    {
      question: "Is parking available for guests?",
      answer: "Yes, we have ample parking space that can accommodate cars and buses. Our parking area is well-lit and secure, ensuring the safety of your guests' vehicles throughout the event."
    },
    {
      question: "Can we decorate the venue according to our theme?",
      answer: "Certainly! We welcome custom decorations and can work with your preferred decorators. Our event planning team can also provide decoration services or recommend trusted vendors based on your theme and budget."
    },
    {
      question: "What are your booking and payment terms?",
      answer: "We require a 30% advance payment to confirm your booking, with the balance due 7 days before the event. We accept various payment methods including cash, card, and bank transfers. Cancellation policies apply based on the notice period."
    },
    {
      question: "Do you offer event planning services?",
      answer: "Yes, we have a dedicated event planning team that can assist with complete event management including vendor coordination, timeline planning, setup supervision, and day-of coordination to ensure your event runs smoothly."
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a1d21] via-[#2a2d31] to-[#1a1d21] py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white/10">
          <defs>
            <pattern id="faqPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="currentColor"/>
              <path d="M25,25 Q50,10 75,25 Q60,50 75,75 Q50,60 25,75 Q40,50 25,25" fill="currentColor" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faqPattern)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
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
            <HelpCircle className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">Event Planning Help</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sansitaOne">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get answers to common questions about our event spaces and services
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-600/20 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Question */}
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors duration-300"
              >
                <h3 className="text-white font-semibold text-lg pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-red-500" />
                </motion.div>
              </button>

              {/* Answer */}
              <motion.div
                initial={false}
                animate={{
                  height: openFAQ === index ? "auto" : 0,
                  opacity: openFAQ === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="w-full h-px bg-gradient-to-r from-red-500/20 to-transparent mb-4" />
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our event planning team is here to help you plan the perfect celebration. Contact us for personalized assistance and detailed information about our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                Contact Event Planner
              </button>
              <button className="border-2 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                Schedule Site Visit
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
