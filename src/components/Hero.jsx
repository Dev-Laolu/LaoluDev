import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';
import profilePng from '../assets/Laolu.png';
import profileJpg from '../assets/Laolu.jpg';

const Hero = () => {
  const images = [profilePng, profileJpg];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="hero" id="home">
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">Hopewell Olayinka Olaoluwa</h1>
          <h2 className="hero-title">
            <span className="highlight">Frontend Developer</span> & <span className="highlight">Creative Designer</span>
          </h2>
          <p className="hero-description">
            I'm a Video Editor and Social Media Manager with 4+ years of experience.
            Passionate about gaming, travelling, and movies.
            Creating high-quality graphics and engaging digital experiences.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn">Get in Touch</a>
            <a href="#experience" className="btn btn-outline">View Work</a>
          </div>
        </div>
        
        <div className="hero-image-wrapper animate-fade-in">
          <div className="image-container">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt="Hopewell Olayinka Olaoluwa"
                className="hero-img"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1.0 }}
                exit={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.9 }}
              />
            </AnimatePresence>
          </div>
          <div className="hero-shape"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
