import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="section about" id="about">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <div className="about-content">
                    <div className="about-text card">
                        <p>
                            I am a multi-talented creative professional with a strong background in frontend development and digital media.
                            With over 4 years of experience, I blend technical skills with artistic vision to create compelling digital narratives.
                        </p>
                        <p>
                            Currently working as a Creative Designer at Penciledge LLC, I specialize in crafting high-quality graphics and engaging video content.
                            I also have a passion for sharing knowledge, as demonstrated by my time as an Assistant Lecturer.
                        </p>
                        <div className="interests">
                            <h3>My Interests</h3>
                            <div className="interest-icons">
                                <div className="interest-item">
                                    <span>🎮</span>
                                    <p>Gaming</p>
                                </div>
                                <div className="interest-item">
                                    <span>✈️</span>
                                    <p>Travelling</p>
                                </div>
                                <div className="interest-item">
                                    <span>🎬</span>
                                    <p>Movies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
