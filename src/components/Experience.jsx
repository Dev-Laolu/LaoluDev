import React from 'react';
import './Experience.css';

const Experience = () => {
    // Data from user request
    const experiences = [
        {
            id: 1,
            role: "Creative Designer",
            company: "Penciledge LLC",
            location: "Ikeja, Lagos (Remote)",
            period: "March 2025 – Present",
            achievements: [
                "Designed high-quality graphics for social media campaigns and brand promotion.",
                "Managed social media visuals and ensured brand consistency across all platforms.",
                "Produced engaging short-form videos, motion graphics, and reels that boosted audience interaction and retention.",
                "Conducted trend research to create fresh and contemporary designs.",
                "Developed visually compelling graphics for brand campaigns, social media content, and digital marketing assets.",
                "Refined and optimized designs and video edits based on feedback, campaign goals, and performance insights."
            ]
        },
        {
            id: 2,
            role: "Assistant Lecturer (Computer Science)",
            company: "OAK Business School of Management & Technology",
            location: "Lagos",
            period: "Feb 2025 – Aug 2025",
            achievements: [
                "Taught undergraduate computer science courses and supervised practical sessions.",
                "Developed course materials, lab manuals, and coding assignments.",
                "Supported curriculum improvement and departmental activities.",
                "Assisted with research, emerging technology exploration, and lab setup.",
                "Supervised student projects in Java and C/C++ programming.",
                "IT Support officer at School CBT centre."
            ]
        }
    ];

    return (
        <section className="section experience" id="experience">
            <div className="container">
                <h2 className="section-title">Work Experience</h2>
                <div className="timeline">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="timeline-item">
                            <div className="timeline-content card">
                                <span className="date">{exp.period}</span>
                                <h3 className="role">{exp.role}</h3>
                                <p className="company">{exp.company}</p>
                                <p className="location">{exp.location}</p>
                                <ul className="achievements">
                                    {exp.achievements.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
