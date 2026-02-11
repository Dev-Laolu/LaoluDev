import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiCss3, SiJavascript, SiHtml5, SiFigma, 
  SiAdobephotoshop, SiAdobeillustrator, SiAdobepremierepro, SiAdobeaftereffects 
} from 'react-icons/si';
import { FaExternalLinkAlt, FaCut } from 'react-icons/fa'; // FaCut for CapCut approximation
import './Skills.css';

const Skills = () => {
  const [showAdobe, setShowAdobe] = useState(false);

  const customSkills = [
    { name: "Frontend Development", link: null },
    { name: "Graphic Design", link: "https://sites.google.com/view/laoluthecreator/portifilio" },
    { name: "Video Editing", link: null },
    { name: "Social Media Management", link: "https://sites.google.com/view/laoluthecreator/portifilio" }
  ];

  const tools = [
    { name: "React.js", icon: <SiReact /> },
    { name: "CSS3", icon: <SiCss3 /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "HTML5", icon: <SiHtml5 /> },
    { name: "CapCut", icon: <FaCut /> }, // Using generic cut icon for CapCut
    { name: "Figma", icon: <SiFigma /> },
    { name: "Adobe Suite", icon: <SiAdobephotoshop />, isSpecial: true }
  ];

  const adobeTools = [
    { name: "Photoshop", icon: <SiAdobephotoshop color="#31A8FF" /> },
    { name: "Illustrator", icon: <SiAdobeillustrator color="#FF9A00" /> },
    { name: "Premiere Pro", icon: <SiAdobepremierepro color="#9999FF" /> },
    { name: "After Effects", icon: <SiAdobeaftereffects color="#D291FF" /> }
  ];

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <h2 className="section-title">Skills & Tools</h2>
        
        <div className="skills-wrapper">
          {/* Expertise Column */}
          <div className="skill-category">
             <h3>Expertise</h3>
             <div className="tags">
               {customSkills.map((skill, index) => (
                 skill.link ? (
                   <a 
                     key={index} 
                     href={skill.link} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="tag primary linkable"
                   >
                     {skill.name} <FaExternalLinkAlt className="link-icon" />
                   </a>
                 ) : (
                   <span key={index} className="tag primary">{skill.name}</span>
                 )
               ))}
             </div>
          </div>

          {/* Tools Column */}
          <div className="skill-category">
             <h3>Tools</h3>
             <div className="tags">
               {tools.map((tool, index) => (
                 <div key={index} style={{ position: 'relative' }}>
                   <motion.div 
                     className={`tag secondary ${tool.isSpecial ? 'special-tag' : ''}`}
                     onClick={() => tool.isSpecial && setShowAdobe(!showAdobe)}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     <span className="skill-icon">{tool.icon}</span>
                     {tool.name}
                   </motion.div>

                   {/* Adobe Popup */}
                   <AnimatePresence>
                     {tool.isSpecial && showAdobe && (
                       <motion.div 
                         className="adobe-popup"
                         initial={{ opacity: 0, y: 10, scale: 0.8 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: 10, scale: 0.8 }}
                       >
                         {adobeTools.map((adobe, i) => (
                           <div key={i} className="adobe-item">
                             {adobe.icon}
                             <span>{adobe.name}</span>
                           </div>
                         ))}
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
