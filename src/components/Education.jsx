import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaAward, FaBook, FaExternalLinkAlt } from 'react-icons/fa';
import './Education.css';

const Education = () => {
  const [activeTab, setActiveTab] = useState('education');

  const educationData = [
    {
      degree: "Higher National Diploma (HND) — Computer Engineering",
      school: "The Federal Polytechnic, Ilaro",
      year: "2022",
      grade: "Second Class Upper"
    },
    {
      degree: "National Diploma (ND) — Computer Engineering",
      school: "The Federal Polytechnic, Ilaro",
      year: "2019",
      grade: "Second Class Upper"
    },
    {
      degree: "SSCE",
      school: "St. Joseph Secondary School, Ikeja",
      year: "2017",
      grade: "WAEC"
    }
  ];

  const certifications = [
    { name: "ALX Professional Foundation", year: "2025" },
    { name: "Professional Brand Designer — Domestika", year: "2025" },
    { name: "Digital Graphic Designer — Kingmoflix Art", year: "2019" },
    { name: "Computer Repair & Networking — Federal Polytechnic Ilaro", year: "2022" },
    { name: "Embedded Systems & Robotics — Federal Polytechnic Ilaro", year: "2022" },
    { name: "Computer Technician — ATIBEX Technologies", year: "2018" },
    { name: "82 Hours Marathon Messiah's Praise Volunteer Certificate", year: "2024" }
  ];

  const awards = [
    {
      title: "Best HND Male Student in Innovation",
      issuer: "Innovation Centre, Federal Polytechnic Ilaro",
      year: "2021/2022 Academic Session"
    }
  ];

  const publications = [
    {
      title: "Enhancing Food Security in Nigeria Through STEM-Based Training Using Embedded Systems and Robotics Knowledge",
      venue: "Atupa International Conference",
      year: "2023",
      link: "https://atupa-sec.org/accra-paper-presentations"
    },
    {
      title: "Politics of Climate Change: Economic Importance to ECOWAS Nations",
      venue: "Published on Academia",
      year: "2023",
      link: "https://www.academia.edu/102596087/POLITICS_OF_CLIMATE_CHANGE_THE_ECONOMIC_IMPORTANCE_TO_ECOWAS_NATIONS"
    },
    {
      title: "Smart Bin Waste Management System",
      venue: "Undergraduate Research Project using Embedded Systems and Android Development",
      year: "2022",
      link: null
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="section education" id="education">
      <div className="container">
        <h2 className="section-title">Academic & Achievements</h2>
        
        {/* Tab Buttons */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <FaGraduationCap className="tab-icon" /> Education
          </button>
          <button 
            className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('certifications')}
          >
            <FaCertificate className="tab-icon" /> Certifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'publications' ? 'active' : ''}`}
            onClick={() => setActiveTab('publications')}
          >
            <FaAward className="tab-icon" /> Awards & Research
          </button>
        </div>

        {/* Tab Panels */}
        <div className="tab-panel-wrapper">
          <AnimatePresence mode="wait">
            {activeTab === 'education' && (
              <motion.div 
                key="education-tab"
                className="tab-panel"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="education-grid">
                  {educationData.map((edu, idx) => (
                    <div key={idx} className="education-card card">
                      <div className="edu-icon"><FaGraduationCap /></div>
                      <div className="edu-details">
                        <h3>{edu.degree}</h3>
                        <p className="school">{edu.school}</p>
                        <p className="year">{edu.year}</p>
                        {edu.grade && <span className="grade">{edu.grade}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'certifications' && (
              <motion.div 
                key="certs-tab"
                className="tab-panel"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="cert-list">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="cert-card card">
                      <div className="cert-icon"><FaCertificate /></div>
                      <div className="cert-details">
                        <h4>{cert.name}</h4>
                        <span className="cert-year">{cert.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'publications' && (
              <motion.div 
                key="pubs-tab"
                className="tab-panel"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="awards-publications-grid">
                  {/* Awards Sub-Section */}
                  <div className="awards-section">
                    <h3>Awards</h3>
                    {awards.map((award, idx) => (
                      <div key={idx} className="award-card card">
                        <div className="award-icon"><FaAward /></div>
                        <div className="award-details">
                          <h4>{award.title}</h4>
                          <p className="award-issuer">{award.issuer}</p>
                          <span className="award-year">{award.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Publications Sub-Section */}
                  <div className="pubs-section">
                    <h3>Research & Publications</h3>
                    <div className="pubs-list">
                      {publications.map((pub, idx) => (
                        <div key={idx} className="pub-card card">
                          <div className="pub-icon"><FaBook /></div>
                          <div className="pub-details">
                            <h4>{pub.title}</h4>
                            <p className="pub-venue">{pub.venue}</p>
                            <div className="pub-footer">
                              <span className="pub-year">{pub.year}</span>
                              {pub.link && (
                                <a 
                                  href={pub.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="pub-link"
                                >
                                  Read publication <FaExternalLinkAlt className="pub-link-icon" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Education;
