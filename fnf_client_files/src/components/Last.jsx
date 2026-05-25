import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMenuDocuments } from '../context/MenuDocumentsContext';

const Last = () => {
  const navigate = useNavigate();
  const { menuDocuments, loading: menuLoading } = useMenuDocuments();

  const industries = [
    'Karting Track',
    'Bowling',
    'Laser Tag',
    'Arcade Games',
    'Softplay & Trampoline',
    'Paintball Arena',
    'Target Zone',
    'Drifters',
    'Zipline Roller Coaster',
    'Sky Cycle',
    'Sky Roller',
    'Rocket Ejection',
    'Food & Cafe',
    'Birthday Parties',
    'Corporate Events',
    'FNF Brochure'
  ];

  // Mapping industry names to routes
  const industryRoutes = {
    'Karting Track': '/go-kart',
    'Bowling': '/bowling',
    'Laser Tag': '/lasertag',
    'Arcade Games': '/arcade-games',
    'Softplay & Trampoline': '/softplay-trampoline-bullride',
    'Paintball Arena': '/paintball-arena',
    'Target Zone': '/target-zone',
    'Drifters ': '/drifters',
    'Zipline Roller Coaster': '/zipline-roller',
    'Sky Cycle': '/sky-cycle',
    'Sky Roller': '/sky-roller',
    'Rocket Ejection': '/rocket-ejection',
    'Food & Cafe': '/food',
    'Birthday Parties': '/birthday',
    'Corporate Events': '/corporate'
  };

  const extendedIndustries = [...industries, ...industries, ...industries, ...industries, ...industries];

  const [isTopHovered, setIsTopHovered] = useState(false);

  const handleIndustryClick = (industry) => {
    if (industry === 'FNF Brochure') {
      if (!menuLoading && menuDocuments.gaming_menu) {
        try {
          // Force PDF to open in new tab with specific parameters
          const newWindow = window.open(menuDocuments.gaming_menu, '_blank', 'noopener,noreferrer');

          // Check if popup was blocked
          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            // Fallback: try direct navigation
            window.location.href = menuDocuments.gaming_menu;
          }
        } catch (error) {
          console.error('Error opening PDF:', error);
          // Fallback: try direct navigation
          window.location.href = menuDocuments.gaming_menu;
        }
      }
    } else {
      const route = industryRoutes[industry];
      if (route) {
        navigate(route);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slidingVariants = {
    animate: {
      x: [0, -4000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear"
        }
      }
    }
  };

  return (
    <>
      <motion.section
        className="mt-px"
        aria-labelledby="industries-heading"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* FLEX WRAPPER - STACK ON MOBILE */}
        <motion.div
          className="flex flex-col md:flex-row z-10 gap-4 items-center w-full text-red-500"
          variants={itemVariants}
        >
          {/* LEFT STRAP  */}
          <motion.div
            className="flex items-center w-full md:flex-1 whitespace-nowrap overflow-hidden order-2 md:order-1"
            variants={slideInLeft}
            onHoverStart={() => setIsTopHovered(true)}
            onHoverEnd={() => setIsTopHovered(false)}
          >
            <div className="flex items-center py-1 bg-white px-3 md:px-6 w-full overflow-hidden">
              <motion.div
                className="flex items-center"
                variants={slidingVariants}
                animate={isTopHovered ? {} : "animate"}
              >
                {extendedIndustries.map((industry, index) => (
                  <React.Fragment key={`top-${index}`}>

                    <span
                      className="text-base md:text-sm mr-3 md:mr-4 whitespace-nowrap leading-none text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200"
                      onClick={() => handleIndustryClick(industry)}
                    >
                      {industry}
                    </span>

                    {/* Thinner, shorter divider */}
                    {index !== extendedIndustries.length - 1 && (
                      <div className="w-px h-2 bg-black mx-2 md:mx-3" />
                    )}
                  </React.Fragment>
                ))}

              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Last;
