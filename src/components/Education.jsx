import React from 'react';
import { motion } from 'framer-motion';
import './Education.css';

const Education = () => {
  const educationData = [
    {
       id: 1,
       degree: "Higher National Diploma (HND) — Computer Engineering",
       school: "The Federal Polytechnic, Ilaro",
       year: "2022",
       grade: "Second Class Upper"
    },
    {
       id: 2,
       degree: "SSCE",
       school: "St. Joseph Secondary School, Ikeja",
       year: "2017",
       grade: "WAEC"
    }
  ];

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <section className="section education" id="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-grid">
          {educationData.map((edu, index) => (
             <motion.div 
               className="education-card card" 
               key={edu.id}
               initial="offscreen"
               whileInView="onscreen"
               viewport={{ once: true, amount: 0.5 }}
               variants={cardVariants}
               custom={index}
             >
                <div className="edu-icon">🎓</div>
                <div className="edu-details">
                  <h3>{edu.degree}</h3>
                  <p className="school">{edu.school}</p>
                  <p className="year">{edu.year}</p>
                  {edu.grade && <span className="grade">{edu.grade}</span>}
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
