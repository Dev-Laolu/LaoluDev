import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ currentPage = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, page, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else {
      if (page === 'home' && sectionId) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <a href="#" onClick={(e) => handleNavClick(e, 'home', 'top')}>Laoluthecreator</a>
        </div>
        
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Navigation">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li><a href="#about" onClick={(e) => handleNavClick(e, 'home', 'about')}>About</a></li>
            <li><a href="#experience" onClick={(e) => handleNavClick(e, 'home', 'experience')}>Experience</a></li>
            <li>
              <a 
                href="#work" 
                className={`nav-work-badge ${currentPage === 'work' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'work')}
              >
                Preview My Work 
              </a>
            </li>
            <li><a href="#services" onClick={(e) => handleNavClick(e, 'home', 'services')}>Services</a></li>
            <li><a href="#education" onClick={(e) => handleNavClick(e, 'home', 'education')}>Education</a></li>
            <li><a href="#skills" onClick={(e) => handleNavClick(e, 'home', 'skills')}>Skills</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, 'home', 'contact')}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
