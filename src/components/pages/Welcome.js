import React, { useEffect, useState } from 'react';
import '../styles/welcome.css';

import { motion, AnimatePresence } from 'framer-motion';

const Welcome = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const texts = [
    'WELCOME TO TOVANAH CONSULTING LTD.',
    'ENROLL FOR OUR NEW COURSE ON LEADERSHIP',
    'ENROLL FOR MENTORSHIP',
  ];

  const images = [
    require('../../images/pic 1.jpeg'),
    require('../../images/pic 2.jpg'),
    require('../../images/pic 3.jpg'),
    require('../../images/pic 4.jpg'),
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 8000); // Increased to 8 seconds for slower changes

    const imageInterval = setInterval(() => {
      setIsTransitioning(true);

      // After transition completes, update indices
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setNextImageIndex((prevIndex) => (prevIndex + 2) % images.length);
        setIsTransitioning(false);
      }, 2500); // Increased to 2.5 seconds for slower transition
    }, 8000); // Increased to 8 seconds for slower changes

    return () => {
      clearInterval(textInterval);
      clearInterval(imageInterval);
    };
  }, [texts.length, images.length]);

  return (
    <div className="welcome-container">
      {/* Current image - always visible */}
      <img
        src={images[currentImageIndex]}
        alt="Welcome background current"
        className="welcome-background-image current"
      />

      {/* Next image - fades in during transition */}
      <img
        src={images[nextImageIndex]}
        alt="Welcome background next"
        className={`welcome-background-image next ${isTransitioning ? 'visible' : ''}`}
      />

      <div className="welcome-overlay" />
      <div className="welcome-text">
        <AnimatePresence mode="wait">
          <motion.h2
            key={textIndex}
            className="welcome-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {texts[textIndex]}
          </motion.h2>
        </AnimatePresence>
        <motion.button
          type="button"
          className="welcome-btn"
          onClick={() => { }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Apply Now
        </motion.button>
      </div>
    </div>
  );
};

export default Welcome;
