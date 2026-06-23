import React, { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaBuilding, FaUser, FaBriefcase, FaCheckCircle } from 'react-icons/fa';
import './ContactForm.css';

/**
 * Contact form using Formspree for real email delivery — no PHP / server needed.
 *
 * SETUP STEPS (one-time, takes 2 minutes):
 *  1. Go to https://formspree.io  →  Sign up for free  →  Create a new form
 *  2. Set the recipient email to: olayinkahopewell@gmail.com
 *  3. Copy your form endpoint ID (looks like: https://formspree.io/f/xyzabcde)
 *  4. Replace the FORMSPREE_ENDPOINT constant below with your actual URL.
 *
 * Until the endpoint is configured, messages fall back to a formatted mailto link.
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // ← replace this

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    projectType: 'Content Strategy',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If Formspree ID hasn't been configured yet, fall back to mailto
    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} – ${formData.companyName || 'Personal'}`);
      const body = encodeURIComponent(
        `Hello Hopewell,\n\n` +
        `New inquiry from your portfolio site:\n\n` +
        `Name: ${formData.fullName}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.companyName || 'N/A'}\n` +
        `Project Type: ${formData.projectType}\n\n` +
        `Message:\n${formData.message}`
      );
      window.open(`mailto:olayinkahopewell@gmail.com?subject=${subject}&body=${body}`);
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ fullName: '', email: '', companyName: '', projectType: 'Content Strategy', message: '' });
      }, 4000);
      return;
    }

    // Real Formspree submission
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          company: formData.companyName,
          project_type: formData.projectType,
          message: formData.message
        })
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ fullName: '', email: '', companyName: '', projectType: 'Content Strategy', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <h2 className="section-title">Let's Build Something Amazing</h2>
        <p className="contact-intro">
          Ready to grow your brand, scale your visual assets, or collaborate on tech initiatives? Send a message and let's work together.
        </p>

        <div className="contact-container card">

          {/* Success banner */}
          {status === 'success' && (
            <div className="form-success-banner">
              <FaCheckCircle className="success-icon" />
              <div>
                <strong>Message sent!</strong>
                <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            </div>
          )}

          {/* Error banner */}
          {status === 'error' && (
            <div className="form-error-banner">
              <strong>Something went wrong.</strong> Please try emailing directly at&nbsp;
              <a href="mailto:olayinkahopewell@gmail.com">olayinkahopewell@gmail.com</a>
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">
                  <FaUser className="form-label-icon" /> Full Name
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name" 
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope className="form-label-icon" /> Email Address
                </label>
                <input 
                  type="email" 
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com" 
                  required
                />
              </div>

              {/* Company */}
              <div className="form-group">
                <label htmlFor="companyName">
                  <FaBuilding className="form-label-icon" /> Company Name (Optional)
                </label>
                <input 
                  type="text" 
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your Company LLC" 
                />
              </div>

              {/* Project Type */}
              <div className="form-group">
                <label htmlFor="projectType">
                  <FaBriefcase className="form-label-icon" /> Project Type
                </label>
                <select 
                  name="projectType" 
                  id="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Content Strategy">Content Strategy</option>
                  <option value="Social Media Management">Social Media Management</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Motion Graphics">Motion Graphics</option>
                  <option value="Brand Design">Brand Design</option>
                  <option value="IT Support / Hardware">IT Support &amp; Hardware</option>
                  <option value="Other / Collaboration">Other &amp; Collaboration</option>
                </select>
              </div>

            </div>

            {/* Message */}
            <div className="form-group message-group">
              <label htmlFor="message">Message</label>
              <textarea 
                name="message" 
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, timelines, or anything you'd like to discuss..." 
                rows="6"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <div className="submit-group">
              <button 
                type="submit" 
                className={`btn btn-fancy submit-btn ${status === 'success' ? 'success' : ''}`}
                disabled={status === 'sending' || status === 'success'}
              >
                {status === 'sending' ? (
                  <span className="sending-dots">Sending<span className="dot-anim">...</span></span>
                ) : status === 'success' ? (
                  <><FaCheckCircle /> Message Sent!</>
                ) : (
                  <>Send Message <FaPaperPlane className="btn-send-icon" /></>
                )}
              </button>
            </div>

          </form>

          {/* Formspree setup note — visible only in dev until configured */}
          {FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID') && (
            <p className="formspree-note">
              💡 <strong>Activate real email delivery:</strong> Create a free form at{' '}
              <a href="https://formspree.io" target="_blank" rel="noopener noreferrer">formspree.io</a>{' '}
              and paste your endpoint into <code>FORMSPREE_ENDPOINT</code> in ContactForm.jsx.
            </p>
          )}

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
