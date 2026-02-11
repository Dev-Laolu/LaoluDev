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
                        <h2>Laolu.dev</h2>
                        <p>Creating digital experiences that matter.</p>
                    </div>
                    <div className="footer-socials">
                        <h3>Connect</h3>
                        <div className="social-links">
                             <a href="https://sites.google.com/view/laoluthecreator/" target="_blank" rel="noopener noreferrer" className="social-link">Google Site</a>
                             <a href="https://www.linkedin.com/in/hopewellolayinka" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin /> LinkedIn</a>
                             <a href="https://github.com/Dev-Laolu" target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub /> GitHub</a>
                             <a href="https://www.instagram.com/laoluthedesigner/" target="_blank" rel="noopener noreferrer" className="social-link"><FaInstagram /> Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Hopewell Olayinka Olaoluwa. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
