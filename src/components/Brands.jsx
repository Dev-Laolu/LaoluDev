import React from 'react';
import './Brands.css';

const Brands = () => {
  const brandData = [
    {
      name: "Penciledge",
      logo: "/brands/penciledge.png",
      url: "https://penciledge.net/"
    },
    {
      name: "Attrotech",
      logo: "/brands/attrotech.png",
      url: "https://attrotech.com.ng/"
    },
    {
      name: "Revived Life Tech",
      logo: "/brands/revivedlifetech.png",
      url: "https://revivedlifetech.com.ng/"
    },
    {
      name: "Strike Climate",
      logo: "/brands/strikeclimate.png",
      url: "https://strikeclimate.com/"
    },
    {
      name: "Orchid Hospitality Consulting",
      logo: "/brands/orchid consulting limited.png",
      url: "https://orchidconsultinglimited.com/"
    }
  ];

  return (
    <section className="brands-section">
      <div className="container">
        <div className="brands-header">
          <h2 className="brands-title">Trusted by Brands & Organizations</h2>
          <p className="brands-subtitle">
            Helping businesses, startups, ministries, and organizations grow through content, design, and digital marketing.
          </p>
        </div>
        
        <div className="marquee-container">
          <div className="marquee">
            <div className="marquee-group">
              {brandData.map((brand, index) => (
                <a 
                  key={index} 
                  href={brand.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="brand-logo-link"
                >
                  <img src={brand.logo} alt={brand.name} className="brand-logo-img" />
                </a>
              ))}
            </div>
            {/* Duplicate for infinite loop */}
            <div className="marquee-group" aria-hidden="true">
              {brandData.map((brand, index) => (
                <a 
                  key={`dup-${index}`} 
                  href={brand.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="brand-logo-link"
                >
                  <img src={brand.logo} alt={brand.name} className="brand-logo-img" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
