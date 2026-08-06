import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaBriefcase, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const experiences = [
    {
      id: 1,
      role: "Content & Social Media Manager",
      company: "BuildwithMMO (Remote)",
      period: "June 2026 – Present",
      achievements: [
        "Execute content strategies across multiple social media platforms to increase community size.",
        "Produce engaging short-form videos, reels, motion graphics, and visual content targeting key metrics.",
        "Conduct detailed audience and trend research to improve click-through and interaction rates.",
        "Design multimedia creative assets for digital marketing and launch campaigns.",
        "Monitor engagement metrics and optimize content delivery performance based on reports.",
        "Collaborate with key stakeholders to align brand visibility with community growth targets."
      ]
    },
    {
      id: 2,
      role: "Social Media Manager",
      company: "Attrotech Developer (Remote)",
      period: "February 2026 – Present",
      achievements: [
        "Manage social media content layout calendars and cohesive visual branding rules.",
        "Create engaging reels, motion graphics, and tech-focused promotional videos.",
        "Research technical trends and developer audience interests.",
        "Design graphics for digital marketing campaigns and online coding initiatives.",
        "Analyze daily performance metrics to improve organic campaign outcomes."
      ]
    },
    {
      id: 3,
      role: "Creative Designer",
      company: "Penciledge LLC (Remote)",
      period: "March 2025 – Present",
      achievements: [
        "Design high-quality creative graphics for brand promotions and social media campaigns.",
        "Produce outstanding video edits and promotional reels that boost brand retention.",
        "Maintain absolute visual consistency across distinct digital client channels.",
        "Research contemporary trends and emerging design practices to stay ahead.",
        "Optimize creative assets iteratively based on campaign goals and user feedback."
      ]
    },
    {
      id: 4,
      role: "Assistant Lecturer (Computer Science)",
      company: "OAK Business School of Management & Technology",
      period: "February 2025 – August 2025",
      achievements: [
        "Facilitated undergraduate computer science courses and led programming labs.",
        "Supervised practical student coding assignments and year-end projects.",
        "Developed structured teaching materials, notes, and lab manuals.",
        "Assisted school research initiatives and supported CBT exam technical operations."
      ]
    },
    {
      id: 5,
      role: "Social Media Manager & Graphic Design Intern",
      company: "Penciledge LLC",
      period: "September 2024 – February 2025",
      achievements: [
        "Designed promotional graphics and draft copy for social media grids.",
        "Managed daily publishing pipelines and checked user engagement comments.",
        "Created advertising creative sets for marketing campaigns.",
        "Analyzed campaign performance to submit weekly report insights."
      ]
    },
    {
      id: 6,
      role: "Social Media Manager",
      company: "Orchid Hospitality Consulting Limited",
      period: "February 2024 – May 2024",
      achievements: [
        "Managed hotel/hospitality social platforms and customer inquiries.",
        "Created eye-catching food, travel, and lifestyle marketing visuals.",
        "Supported event planning and local advertising performance evaluations."
      ]
    },
    {
      id: 7,
      role: "IT Support Officer (NYSC)",
      company: "Ministry of Education (PESP), Lagos",
      period: "June 2023 – June 2024",
      achievements: [
        "Maintained office hardware systems, system diagnostics, and printers.",
        "Managed database integrity and organized internal education records.",
        "Provided technical support to administrative staff and troubleshot local networks."
      ]
    },
    {
      id: 8,
      role: "IT Support Officer (Intern)",
      company: "ATIBEX Technologies Ltd",
      period: "September 2019 – September 2020",
      achievements: [
        "Installed and configured workstation computers, OS software, and routers.",
        "Diagnosed software crashes and resolved device hardware issues.",
        "Prepared technical instruction manuals and support tickets."
      ]
    }
  ];

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <p className="experience-intro">
          A compact summary of my professional journey. Tap any role to reveal details.
        </p>

        <div className="compact-experience-list">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <motion.div
                key={exp.id}
                className={`compact-exp-card card ${isExpanded ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                onClick={() => toggleExpand(exp.id)}
              >
                <div className="compact-exp-header">
                  <div className="compact-exp-main-info">
                    <div className="compact-exp-role-row">
                      <FaBriefcase className="exp-icon" />
                      <h3 className="compact-role">{exp.role}</h3>
                    </div>
                    <div className="compact-meta-row">
                      <span className="compact-company"><FaBuilding className="meta-icon" /> {exp.company}</span>
                      <span className="compact-date"><FaCalendarAlt className="meta-icon" /> {exp.period}</span>
                    </div>
                  </div>

                  <button 
                    className="compact-toggle-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(exp.id);
                    }}
                    aria-expanded={isExpanded}
                    aria-label="Toggle details"
                  >
                    <span className="toggle-label">{isExpanded ? 'Hide' : 'Details'}</span>
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="compact-exp-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="compact-achievements">
                        {exp.achievements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
