import React from 'react';
import { 
  SiReact, SiCss3, SiJavascript, SiHtml5, SiFigma, 
  SiAdobephotoshop, SiAdobeillustrator, SiAdobepremierepro, SiAdobeaftereffects, SiGithub, SiCanva 
} from 'react-icons/si';
import { FaPalette, FaVideo, FaBullhorn, FaTools, FaNetworkWired, FaTools as FaWrench, FaFileWord, FaCut } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const skillsData = [
    {
      title: "Design",
      icon: <FaPalette />,
      skills: [
        { name: "Adobe Photoshop", icon: <SiAdobephotoshop color="#31A8FF" /> },
        { name: "Adobe Illustrator", icon: <SiAdobeillustrator color="#FF9A00" /> },
        { name: "Figma", icon: <SiFigma color="#F24E1E" /> },
        { name: "Canva", icon: <SiCanva color="#00C4CC" /> }
      ]
    },
    {
      title: "Video & Motion",
      icon: <FaVideo />,
      skills: [
        { name: "Adobe Premiere Pro", icon: <SiAdobepremierepro color="#9999FF" /> },
        { name: "After Effects", icon: <SiAdobeaftereffects color="#D291FF" /> },
        { name: "CapCut", icon: <FaCut color="#000000" /> }
      ]
    },
    {
      title: "Marketing & Strategy",
      icon: <FaBullhorn />,
      skills: [
        { name: "Content Strategy", icon: null },
        { name: "Social Media Management", icon: null },
        { name: "Analytics", icon: null },
        { name: "Community Management", icon: null }
      ]
    },
    {
      title: "Technical & IT",
      icon: <FaTools />,
      skills: [
        { name: "React / JS / HTML / CSS", icon: <SiReact color="#61DAFB" /> },
        { name: "IT Support", icon: null },
        { name: "Networking", icon: <FaNetworkWired /> },
        { name: "Computer Repair", icon: <FaWrench /> },
        { name: "GitHub", icon: <SiGithub /> },
        { name: "Microsoft Office Suite", icon: <FaFileWord /> }
      ]
    }
  ];

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <h2 className="section-title">Skills & Tools</h2>
        <p className="skills-intro">
          A comprehensive suite of creative design capabilities, video production methods, marketing strategies, and engineering tools.
        </p>

        <div className="skills-grid">
          {skillsData.map((category, idx) => (
            <div key={idx} className="skills-category-card card">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              
              <div className="category-skills-list">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-tag">
                    {skill.icon && <span className="skill-tag-icon">{skill.icon}</span>}
                    <span className="skill-tag-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
