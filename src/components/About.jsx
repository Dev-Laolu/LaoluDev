import React from 'react';
import './About.css';

const About = () => {
  const stats = [
    { number: "10+", label: "Brands Worked With" },
    { number: "100+", label: "Designs Created" },
    { number: "50+", label: "Videos Produced" },
    { number: "3+", label: "Years Experience" }
  ];

  const currentFocus = [
    "Content strategy for BuildwithMMO",
    "Social media campaigns for Attrotech",
    "Creative projects for Penciledge",
    "STEM and technology initiatives",
    "Personal brand growth"
  ];

  const interests = [
    { icon: "🎮", name: "Gaming" },
    { icon: "✈️", name: "Travelling" },
    { icon: "🎬", name: "Movies" }
  ];

  return (
    <section className="section about" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-grid">
          {/* Main Biography Card */}
          <div className="about-main card">
            <h3>Who I Am</h3>
            <p>
              I'm a Computer Engineer and Creative Professional passionate about combining technology, design, and digital storytelling to help brands grow and connect with their audiences.
            </p>
            <p>
              With experience spanning social media management, content strategy, graphic design, video editing, and IT support, I bring both technical expertise and creative thinking to every project. I enjoy transforming ideas into engaging digital experiences that drive visibility, engagement, and business growth.
            </p>
            <p>
              My background in computer engineering gives me a unique advantage in understanding both the technical and creative sides of modern digital solutions.
            </p>
            
            <div className="interests-wrapper">
              <h4>Interests</h4>
              <div className="interest-icons">
                {interests.map((interest, i) => (
                  <div key={i} className="interest-item">
                    <span className="interest-emoji">{interest.icon}</span>
                    <p className="interest-name">{interest.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Stats & Current Focus Side Column */}
          <div className="about-sidebar">
            {/* Quick Stats Block */}
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card card">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Current Focus Block */}
            <div className="focus-card card">
              <h3>What I'm Working On</h3>
              <ul className="focus-list">
                {currentFocus.map((focus, i) => (
                  <li key={i} className="focus-item">
                    <span className="focus-dot"></span>
                    <p>{focus}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
