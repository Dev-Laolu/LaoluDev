import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaExternalLinkAlt, 
  FaArrowRight, 
  FaFilm, 
  FaCode, 
  FaChartBar, 
  FaGraduationCap, 
  FaPalette,
  FaGithub,
  FaGlobe
} from 'react-icons/fa';
import { getPortfolioItems, normalizeCategory } from '../backend/portfolioService';
import './WorkPreview.css';

const WorkPreview = ({ onOpenFullWorkPage }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreviewItems = async () => {
      try {
        const data = await getPortfolioItems();
        setItems(data);
      } catch (err) {
        console.error("Error fetching preview items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPreviewItems();
  }, []);

  const getCategoryIcon = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('graphic') || cat.includes('brand') || cat.includes('logo')) return <FaPalette />;
    if (cat.includes('video') || cat.includes('motion')) return <FaFilm />;
    if (cat.includes('code')) return <FaCode />;
    if (cat.includes('data')) return <FaChartBar />;
    if (cat.includes('research')) return <FaGraduationCap />;
    return <FaPalette />;
  };

  // Select 4 highlights across categories or featured items
  const previewList = items.filter(i => i.featured).length >= 4 
    ? items.filter(i => i.featured).slice(0, 4)
    : items.slice(0, 4);

  return (
    <section className="section work-preview-section" id="work-preview">
      <div className="container">
        <div className="work-preview-header">
          <div>
            <span className="section-subtitle">Portfolio Highlights</span>
            <h2 className="section-title left-align">Preview My Work</h2>
          </div>
          <button 
            className="btn btn-primary view-all-btn"
            onClick={onOpenFullWorkPage}
          >
            <span>View All Work & Categories</span>
            <FaArrowRight />
          </button>
        </div>

        <p className="work-preview-intro">
          Here is a quick snapshot of my work across graphic design, video content, coding projects, data analysis, and research. 
          Visit the dedicated work page to filter by categories and sort by year.
        </p>

        {loading ? (
          <div className="work-preview-grid">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="preview-card card skeleton-card">
                <div style={{ height: '120px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="work-preview-grid">
            {previewList.map((item) => {
              const normalizedCat = normalizeCategory(item.category);

              // GRAPHIC ITEM: IMAGE ONLY WITH HOVER DESCRIPTION & CONDITIONAL LINK BUTTON
              if (normalizedCat === 'Graphic') {
                const imgSrc = item.thumbnail || item.previewImage;
                const projectLink = item.liveUrl || item.link || null;
                const shortDesc = item.summary || item.description || item.title || '';

                return (
                  <motion.div
                    key={item.id}
                    className="graphic-work-card card"
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="graphic-img-container">
                      {imgSrc ? (
                        <img src={imgSrc} alt={item.title || 'Graphic Work'} className="graphic-native-img" />
                      ) : (
                        <div className="graphic-placeholder">
                          <FaPalette size={36} />
                        </div>
                      )}

                      <div className="graphic-hover-overlay">
                        {shortDesc && <p className="graphic-hover-desc">{shortDesc}</p>}
                        {projectLink && (
                          <a
                            href={projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary graphic-download-btn"
                          >
                            <span>View / Download Project</span>
                            <FaExternalLinkAlt size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // NON-GRAPHIC ITEMS
              const hasLiveUrl = Boolean(item.liveUrl);
              const hasGithubUrl = Boolean(item.githubUrl);

              return (
                <motion.div
                  key={item.id}
                  className="preview-card card"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="preview-card-top">
                    <span className="category-tag tag-graphic">
                      {getCategoryIcon(item.category)} {item.category}
                    </span>
                    <span className="year-tag">{item.year}</span>
                  </div>

                  {item.thumbnail ? (
                    <div className="preview-card-img-wrapper">
                      <img src={item.thumbnail} alt={item.title} className="preview-card-img" />
                    </div>
                  ) : (
                    <div className="preview-card-icon-wrapper">
                      <div className="preview-icon-bubble">
                        {getCategoryIcon(item.category)}
                      </div>
                    </div>
                  )}

                  <div className="preview-card-body">
                    <h3 className="preview-item-title">{item.title}</h3>
                    <p className="preview-item-desc">{item.description}</p>
                  </div>

                  <div className="preview-card-footer">
                    {hasLiveUrl && (
                      <a 
                        href={item.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="card-link live-link"
                      >
                        <FaGlobe size={12} /> View Live Project <FaExternalLinkAlt size={11} />
                      </a>
                    )}
                    
                    {hasGithubUrl && (
                      <a 
                        href={item.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="card-link github-link"
                      >
                        <FaGithub size={13} /> Check Codebase
                      </a>
                    )}

                    {!hasLiveUrl && !hasGithubUrl && (
                      <a 
                        href={item.videoUrl || item.researchLink || item.reportUrl || item.figmaLink || item.link || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="card-link"
                      >
                        View Details <FaExternalLinkAlt size={12} />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="work-preview-banner card">
          <div className="banner-text">
            <h3>Looking for specific project categories?</h3>
            <p>Explore all Graphic, Video, Code, Data Analysis, and Research projects sorted by year.</p>
          </div>
          <button className="btn btn-primary" onClick={onOpenFullWorkPage}>
            Open Dedicated "My Work" Page <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkPreview;
