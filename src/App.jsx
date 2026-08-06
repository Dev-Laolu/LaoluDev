import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Brands from './components/Brands';
import About from './components/About';
import Experience from './components/Experience';
import Services from './components/Services';
import WorkPreview from './components/WorkPreview';
import MyWorkPage from './components/MyWorkPage';
import Education from './components/Education';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import StickyContact from './components/StickyContact';
import Login from './components/admin/Login';
import AdminDashboard from './components/admin/AdminDashboard';

function AppContent() {
  const { isAuthenticated } = useAuth();

  // Helper to determine active page from URL pathname or hash
  const getPageFromUrl = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (path.includes('/admin') || hash === '#admin') return 'admin';
    if (path.includes('/login') || hash === '#login') return 'login';
    if (path.includes('/work') || hash === '#work') return 'work';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromUrl);

  // Sync state when URL changes (browser back/forward or direct address bar entry)
  useEffect(() => {
    const handleUrlChange = () => {
      const page = getPageFromUrl();
      if (page === 'admin' && !isAuthenticated) {
        setCurrentPage('login');
      } else {
        setCurrentPage(page);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [isAuthenticated]);

  const handleNavigate = (page, sectionId) => {
    let targetPath = '/';
    let targetPage = page;

    if (page === 'admin') {
      if (!isAuthenticated) {
        targetPage = 'login';
        targetPath = '/login';
      } else {
        targetPath = '/admin';
      }
    } else if (page === 'login') {
      targetPath = '/login';
    } else if (page === 'work') {
      targetPath = '/work';
    } else {
      targetPath = '/';
    }

    try {
      window.history.pushState({}, '', targetPath);
    } catch (e) {
      window.location.hash = targetPage;
    }

    setCurrentPage(targetPage);
    
    if (targetPage === 'home') {
      if (sectionId && sectionId !== 'top') {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
      {/* Hide standard header on Admin & Login views */}
      {currentPage !== 'admin' && currentPage !== 'login' && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      {currentPage === 'home' && (
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
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants('right')}
          >
            <Experience />
          </motion.div>

          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants('left')}
          >
            <Services />
          </motion.div>

          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants('right')}
          >
            <WorkPreview onOpenFullWorkPage={() => handleNavigate('work')} />
          </motion.div>

          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants('left')}
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
      )}

      {currentPage === 'work' && (
        <MyWorkPage onBackToHome={() => handleNavigate('home', 'top')} />
      )}

      {currentPage === 'login' && (
        <Login onNavigate={handleNavigate} />
      )}

      {currentPage === 'admin' && (
        isAuthenticated ? (
          <AdminDashboard onNavigate={handleNavigate} />
        ) : (
          <Login onNavigate={handleNavigate} />
        )
      )}

      {currentPage !== 'admin' && currentPage !== 'login' && (
        <>
          <Footer onNavigate={handleNavigate} />
          <StickyContact />
        </>
      )}
    </motion.div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
