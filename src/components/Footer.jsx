import React from 'react';
import { FaWhatsapp, FaPhone, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="container footer-content">
                <div className="footer-cta">
                    <h3>Let's Work Together</h3>
                    <div className="cta-buttons">
                        <a href="https://wa.me/2349069343361" target="_blank" rel="noopener noreferrer" className="btn footer-btn whatsapp">
                            <FaWhatsapp /> Chat on WhatsApp
                        </a>
                        <a href="tel:09069343361" className="btn footer-btn phone">
                            <FaPhone /> Call Me
                        </a>
                    </div>
                </div>

                <div className="footer-top">
                    <div className="footer-brand">
                        <h2>Olayinka Hopewell Olaoluwa</h2>
                        <p className="footer-creds">Computer Engineer • Digital Content Strategist • Creative Designer</p>
                        <p className="footer-location">📍 Lagos, Nigeria</p>
                    </div>
                    <div className="footer-socials">
                        <h3>Connect & Info</h3>
                        <div className="social-links">
                             <a href="mailto:olayinkahopewell@gmail.com" className="social-link">📧 Email</a>
                             <a href="https://github.com/Dev-Laolu" target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub /> GitHub</a>
                             <a href="https://www.linkedin.com/in/hopewell-olayinka-olaoluwa/" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin /> LinkedIn</a>
                             <a href="/Resume.pdf" download="Hopewell_Olayinka_Resume.pdf" className="social-link">📄 Download Resume</a>
                             <a href="https://sites.google.com/view/laoluthecreator/" target="_blank" rel="noopener noreferrer" className="social-link">🌐 Laoluthecreator</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Olayinka Hopewell Olaoluwa. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
