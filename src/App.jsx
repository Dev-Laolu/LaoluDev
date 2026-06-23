import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Brands from './components/Brands';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Experience from './components/Experience';
import VideoPortfolio from './components/VideoPortfolio';
import Education from './components/Education';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';

import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import StickyContact from './components/StickyContact';

function App() {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } }
  };

  const sectionVariants = (direction) => ({
    offscreen: {
      opacity: 0,
      x: direction === 'left' ? -80 : direction === 'right' ? 80 : 0,
      y: direction === 'up' ? 80 : 0
    },
    onscreen: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8
      }
    }
  });

  return (
    <motion.div 
      className="App"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <Header />
      
      <main>
        <Hero />
        
        <Brands />
        
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants('left')}
        >
          <About />
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants('right')}
        >
          <Services />
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants('left')}
        >
          <Projects />
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants('right')}
        >
          <Experience />
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants('left')}
        >
          <VideoPortfolio />
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants('right')}
        >
          <Education />
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants('up')}
        >
          <Skills />
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants('left')}
        >
          <Testimonials />
        </motion.div>


        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants('up')}
        >
          <ContactForm />
        </motion.div>
      </main>

      <Footer />
      <StickyContact />
    </motion.div>
  );
}

export default App;
