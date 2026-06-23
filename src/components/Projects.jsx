import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaBriefcase, FaListUl } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [expandedCaseStudy, setExpandedCaseStudy] = useState(null);

  const projectsData = [
    {
      id: "buildwithmmo",
      title: "BuildwithMMO",
      role: "Content & Social Media Manager",
      responsibilities: [
        "Content strategy planning",
        "High-performance video production",
        "Advanced motion graphics creation",
        "Social media channel management",
        "Data-driven performance analysis"
      ],
      hasCaseStudy: true,
      caseStudy: {
        challenge: "Build a strong, unified digital presence and cultivate organic community growth through engaging content platforms.",
        solution: "Developed a founder-first storytelling strategy, publishing educational content, and optimizing high-retention short-form videos (reels and clips).",
        results: "Substantially increased audience engagement, improved viewer retention rates, and significantly strengthened overall brand visibility."
      }
    },
    {
      id: "attrotech",
      title: "Attrotech",
      role: "Social Media Manager",
      responsibilities: [
        "Social media content creation & curation",
        "Visual design & brand consistency",
        "Engaging reels & animated motion graphics",
        "Analytics monitoring & regular performance reporting"
      ],
      hasCaseStudy: true,
      caseStudy: {
        challenge: "Establish and scale a consistent online brand identity across scattered social platforms.",
        solution: "Designed a clean, cohesive visual asset framework, standardizing social templates, and launching motion-graphic-led video campaigns.",
        results: "Vastly improved cross-channel engagement, solid brand consistency, and an increase in overall content performance metrics."
      }
    },
    {
      id: "penciledge",
      title: "Penciledge",
      role: "Creative Designer",
      responsibilities: [
        "Custom graphic design for marketing campaigns",
        "High-quality video editing & reels optimization",
        "Dynamic campaign visual assets",
        "Cohesive brand communications & asset design"
      ],
      hasCaseStudy: false,
      caseStudy: null
    }
  ];

  const toggleCaseStudy = (id) => {
    if (expandedCaseStudy === id) {
      setExpandedCaseStudy(null);
    } else {
      setExpandedCaseStudy(id);
    }
  };

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="projects-intro">
          A collection of creative solutions, digital strategies, and client campaigns driving measurable business results.
        </p>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <div key={project.id} className="project-card card">
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className="project-role-badge">
                  <FaBriefcase className="badge-icon" /> {project.role}
                </span>
              </div>

              <div className="project-body">
                <h4 className="body-heading">
                  <FaListUl className="heading-icon" /> Key Responsibilities
                </h4>
                <ul className="project-responsibilities">
                  {project.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>

              {project.hasCaseStudy && (
                <div className="project-footer">
                  <button 
                    onClick={() => toggleCaseStudy(project.id)} 
                    className="case-study-toggle-btn"
                  >
                    {expandedCaseStudy === project.id ? (
                      <>Hide Case Study <FaChevronUp className="arrow-icon" /></>
                    ) : (
                      <>Read Case Study <FaChevronDown className="arrow-icon" /></>
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedCaseStudy === project.id && (
                      <motion.div 
                        className="case-study-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="case-study-inner">
                          <div className="case-step">
                            <h5>Challenge</h5>
                            <p>{project.caseStudy.challenge}</p>
                          </div>
                          <div className="case-step">
                            <h5>Solution</h5>
                            <p>{project.caseStudy.solution}</p>
                          </div>
                          <div className="case-step">
                            <h5>Results</h5>
                            <p>{project.caseStudy.results}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
