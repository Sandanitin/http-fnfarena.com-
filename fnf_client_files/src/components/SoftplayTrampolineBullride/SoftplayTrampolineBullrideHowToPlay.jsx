"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Baby, Zap, Shield, Play, ArrowRight, Clock, Users, CheckCircle } from "lucide-react";

export default function SoftplayTrampolineBullrideHowToPlay() {
  const [activeStep, setActiveStep] = useState(0);

  const activities = [
    {
      id: "softplay",
      name: "Softplay Area",
      icon: Baby,
      color: "blue",
      steps: [
        {
          icon: CheckCircle,
          title: "Check In & Safety Brief",
          description: "Register at reception and receive safety guidelines",
          details: [
            "Complete registration form for children",
            "Receive safety wristbands",
            "Get briefed on age-appropriate zones",
            "Understand emergency procedures"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c7ffb576b.jpg"
        },
        {
          icon: Baby,
          title: "Enter Play Zone",
          description: "Remove shoes and enter the designated softplay area",
          details: [
            "Store shoes in provided lockers",
            "Ensure children wear socks",
            "Choose age-appropriate play area",
            "Follow capacity guidelines"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c6a6d6d8f.jpg"
        },
        {
          icon: Play,
          title: "Supervised Play",
          description: "Enjoy safe play with adult supervision",
          details: [
            "Adults supervise children under 6",
            "Use climbing structures safely",
            "Participate in sensory activities",
            "Follow staff instructions"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c6a569365.jpg"
        },
        {
          icon: Clock,
          title: "Session Complete",
          description: "Clean up and exit when session ends",
          details: [
            "Help children gather belongings",
            "Use sanitizing stations",
            "Exit through designated area",
            "Collect shoes from lockers"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c7ffb576b.jpg"
        }
      ]
    },
    {
      id: "trampoline",
      name: "Trampoline Zone",
      icon: Zap,
      color: "green",
      steps: [
        {
          icon: CheckCircle,
          title: "Safety Check & Equipment",
          description: "Get trampoline socks and safety briefing",
          details: [
            "Purchase or bring grip socks",
            "Remove all jewelry and loose items",
            "Listen to safety demonstration",
            "Understand trampoline rules"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c6a6d6d8f.jpg"
        },
        {
          icon: Users,
          title: "Warm-Up Session",
          description: "Start with basic bouncing and warm-up exercises",
          details: [
            "Begin with gentle bouncing",
            "Practice landing techniques",
            "Learn proper jumping form",
            "Follow instructor guidance"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c6a569365.jpg"
        },
        {
          icon: Zap,
          title: "Active Jumping",
          description: "Enjoy various trampoline activities and games",
          details: [
            "One person per trampoline",
            "Try basketball shooting",
            "Participate in dodgeball",
            "Use foam pit safely"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c7ffb576b.jpg"
        },
        {
          icon: Clock,
          title: "Cool Down & Exit",
          description: "End session with cool-down and safe exit",
          details: [
            "Gradual reduction in activity",
            "Stretch and cool down",
            "Return any borrowed equipment",
            "Exit through designated area"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c6a569365.jpg"
        }
      ]
    },
    {
      id: "bullride",
      name: "Bull Ride Arena",
      icon: Shield,
      color: "red",
      steps: [
        {
          icon: CheckCircle,
          title: "Registration & Waiver",
          description: "Complete waiver and safety assessment",
          details: [
            "Sign liability waiver",
            "Confirm age and weight requirements",
            "Remove all loose items",
            "Listen to safety instructions"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c7ffb576b.jpg"
        },
        {
          icon: Shield,
          title: "Safety Preparation",
          description: "Get positioned and receive final instructions",
          details: [
            "Mount the mechanical bull carefully",
            "Adjust to comfortable position",
            "Understand hand placement",
            "Learn dismounting technique"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c6a6d6d8f.jpg"
        },
        {
          icon: Play,
          title: "The Ride Experience",
          description: "Enjoy the thrilling bull ride challenge",
          details: [
            "Start with slow speed setting",
            "Hold on with one hand only",
            "Maintain balance and posture",
            "Signal operator if needed"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c6a569365.jpg"
        },
        {
          icon: ArrowRight,
          title: "Safe Dismount",
          description: "Complete the ride and dismount safely",
          details: [
            "Wait for complete stop",
            "Dismount with staff assistance",
            "Collect personal belongings",
            "Optional photo opportunity"
          ],
          image: "https://cdn.acsdev.in/FNF/69e9c7ffb576b.jpg"
        }
      ]
    }
  ];

  const currentActivity = activities.find(activity => activity.id === (activeStep < 4 ? "softplay" : activeStep < 8 ? "trampoline" : "bullride"));
  const currentStepIndex = activeStep % 4;
  const currentStep = currentActivity.steps[currentStepIndex];

  return (
   <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#1a1d21] to-[#2a2d31] overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="text-white">
          <defs>
            <pattern id="instructionPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="3" fill="currentColor"/>
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <rect x="40" y="40" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#instructionPattern)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        {/* Section Header */}
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
            <Play className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm font-semibold">Activity Guide</span>
          </motion.div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-sansitaOne">

            HOW TO
            <span className="text-red-500"> ENJOY</span>
          </h2>

         <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">

            Follow these simple steps to make the most of your experience in each activity zone.
            Safety and fun go hand in hand!
          </p>
        </motion.div>

        {/* Activity Selector */}                       
       <motion.div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12"

          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {activities.map((activity, index) => (
            <button
              key={activity.id}
              onClick={() => setActiveStep(index * 4)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                Math.floor(activeStep / 4) === index
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <activity.icon className="w-5 h-5" />
              {activity.name}
            </button>
          ))}
        </motion.div>

        {/* Steps Section */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 lg:mb-20">

          {/* Steps Navigation */}
          <motion.div
          className="space-y-4 max-h-[70vh] lg:max-h-none overflow-y-auto pr-1"

            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {currentActivity.steps.map((step, index) => (
              <motion.div
                key={index}
                className={`p-4 sm:p-6 rounded-xl border cursor-pointer"
 transition-all duration-300 ${
                  currentStepIndex === index
                    ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/50'
                    : 'bg-gray-800/30 border-gray-600/30 hover:border-gray-500/50'
                }`}
                onClick={() => setActiveStep(Math.floor(activeStep / 4) * 4 + index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    currentStepIndex === index ? 'bg-red-500/20' : 'bg-gray-700/50'
                  }`}>
                    <step.icon className={`w-6 h-6 ${
                      currentStepIndex === index ? 'text-red-400' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg font-sansitaOne">
                      Step {index + 1}: {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {step.description}
                    </p>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform ${
                    currentStepIndex === index ? 'text-red-400 translate-x-1' : 'text-gray-500'
                  }`} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Step Details */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
            >
              {/* <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div> */}

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <currentActivity.icon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-sansitaOne">
                    {currentStep.title}
                  </h3>
                  <p className="text-gray-300">
                    {currentStep.description}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {currentStep.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Tips Section */}
        <motion.div
          className="bg-gradient-to-r from-red-500/10 via-red-500/20 to-red-500/10 rounded-2xl p-8 border border-red-500/20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-sansitaOne">
              Quick Tips for Maximum Fun
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Follow these tips to ensure the best experience for you and your family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Arrive Early</h4>
              <p className="text-gray-400 text-sm">Get the full experience</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-red-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Stay Together</h4>
              <p className="text-gray-400 text-sm">Family supervision</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-red-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Follow Rules</h4>
              <p className="text-gray-400 text-sm">Safety first always</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
