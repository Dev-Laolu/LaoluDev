import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import './StickyContact.css';

const StickyContact = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector('footer');
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If footer is intersecting (visible), hide the sticky button
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1, // Trigger when 10% of footer is visible
      }
    );

    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="https://wa.me/2349069343361"
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-contact-btn"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0, transition: { duration: 0.5 } }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaWhatsapp className="sticky-icon" />
          <span className="sticky-text">Chat on WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default StickyContact;
