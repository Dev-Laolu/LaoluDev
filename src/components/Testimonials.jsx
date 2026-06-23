import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const testimonialsData = [
    {
      quote: "Hopewell's content strategy and high-performing video edits completely transformed our online presence. His founder-first storytelling approach led to a massive increase in organic reach and user engagement.",
      name: "Founder",
      company: "BuildwithMMO",
      stars: 5
    },
    {
      quote: "A rare mix of engineering mindset and marketing brilliance. Hopewell built consistent visual standards, managed our content timeline flawlessly, and designed animations that significantly enhanced our posts.",
      name: "Managing Director",
      company: "Attrotech Developer",
      stars: 5
    },
    {
      quote: "Exceptional speed, quality, and creative direction. Hopewell designs graphic banners and edits promotional reels that perfectly match our campaign scopes. Highly recommended for brand visuals.",
      name: "Operations Lead",
      company: "Penciledge LLC",
      stars: 5
    },
    {
      quote: "Hopewell brings structured communication, analytical insights, and top-tier visuals to the table. His work on our digital media calendars made platform tracking simple and successful.",
      name: "Marketing Manager",
      company: "Orchid Hospitality Consulting",
      stars: 5
    }
  ];

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">Client Feedback</h2>
        <p className="testimonials-intro">
          Hear from the founders, businesses, and agency partners I've collaborated with to build digital experiences.
        </p>

        <div className="testimonials-grid">
          {testimonialsData.map((t, idx) => (
            <div key={idx} className="testimonial-card card">
              <div className="quote-icon-wrapper">
                <FaQuoteLeft className="quote-icon" />
              </div>
              <p className="testimonial-text">"{t.quote}"</p>
              
              <div className="testimonial-footer">
                <div className="stars-list">
                  {[...Array(t.stars)].map((_, sIdx) => (
                    <FaStar key={sIdx} className="star-icon" />
                  ))}
                </div>
                <h4 className="client-name">{t.name}</h4>
                <span className="client-company">{t.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
