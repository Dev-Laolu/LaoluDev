import React from 'react';
import { 
  FaChartLine, 
  FaShareAlt, 
  FaPalette, 
  FaVideo, 
  FaFilm, 
  FaFingerprint, 
  FaNetworkWired,
  FaCode
} from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const servicesData = [
    {
      title: "Web Development",
      description: "Building modern, responsive, and performant websites using HTML, CSS, JavaScript, React.js, and Next.js — from landing pages to full-featured web applications.",
      icon: <FaCode />,
      tags: ["HTML", "CSS", "JavaScript", "React.js", "Next.js"]
    },
    {
      title: "Content Strategy",
      description: "Creating comprehensive content plans and campaign strategies that align with your business goals and speak directly to your target audience.",
      icon: <FaChartLine />
    },
    {
      title: "Social Media Management",
      description: "Managing brand presence, handling content calendars, engaging with the community, and tracking growth/analytics across digital platforms.",
      icon: <FaShareAlt />
    },
    {
      title: "Graphic Design",
      description: "Designing visually compelling creative assets, marketing materials, social media graphics, and digital/print visuals that stand out.",
      icon: <FaPalette />
    },
    {
      title: "Video Editing",
      description: "Producing engaging short-form videos, reels, commercials, and promotional video content that grabs attention in the first 3 seconds.",
      icon: <FaVideo />
    },
    {
      title: "Motion Graphics",
      description: "Creating modern animated titles, explainers, dynamic transitions, and vector animations to tell complex brand stories visually.",
      icon: <FaFilm />
    },
    {
      title: "Brand Design",
      description: "Developing cohesive visual identities, brand style guides, logo packages, and visual consistency schemas across all channels.",
      icon: <FaFingerprint />
    },
    {
      title: "IT Support & Networking",
      description: "Configuring hardware systems, optimizing network connections, offering technical support, and maintaining secure digital infrastructure.",
      icon: <FaNetworkWired />
    }
  ];

  return (
    <section className="section services" id="services">
      <div className="container">
        <h2 className="section-title">My Services</h2>
        <p className="services-intro">
          Leveraging a unique blend of engineering precision and creative insight to deliver high-impact digital solutions.
        </p>
        
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className={`service-card card${service.tags ? ' service-card--featured' : ''}`}>
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-title-text">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              {service.tags && (
                <div className="service-tech-tags">
                  {service.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="service-tech-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
