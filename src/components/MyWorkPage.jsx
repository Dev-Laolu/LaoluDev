import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaExternalLinkAlt, 
  FaSortAmountDown, 
  FaSortAmountUp,
  FaPalette,
  FaFilm,
  FaCode,
  FaChartBar,
  FaGraduationCap,
  FaTag,
  FaGithub,
  FaGlobe
} from 'react-icons/fa';
import { categories as defaultCategories } from '../data/workData';
import { getPortfolioItems, normalizeCategory } from '../backend/portfolioService';
import './MyWorkPage.css';

const MyWorkPage = ({ onBackToHome }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "oldest"

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await getPortfolioItems();
        setItems(data);
      } catch (err) {
        console.error("Error loading portfolio items:", err);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let list = [...items];

    // Filter by normalized category
    if (selectedCategory !== "All") {
      list = list.filter(item => {
        const cat = normalizeCategory(item.category);
        return cat === selectedCategory;
      });
    }

    // Sort by Year
    list.sort((a, b) => {
      const yearA = Number(a.year) || 2026;
      const yearB = Number(b.year) || 2026;
      return sortOrder === "newest" ? yearB - yearA : yearA - yearB;
    });

    return list;
  }, [items, selectedCategory, sortOrder]);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Graphic': return <FaPalette />;
      case 'Video': return <FaFilm />;
      case 'Code Project': return <FaCode />;
      case 'Data Analysis': return <FaChartBar />;
      case 'Research Work': return <FaGraduationCap />;
      default: return null;
    }
  };

  return (
    <div className="my-work-page">
      <div className="work-page-hero">
        <div className="container">
          <button className="back-home-btn" onClick={onBackToHome}>
            <FaArrowLeft /> <span>Back to Main Page</span>
          </button>
          
          <h1 className="work-page-title">My Work & Showcase</h1>
          <p className="work-page-subtitle">
            Explore my full collection of graphic design assets, video reels, coding projects, data analytics, and academic research work.
          </p>

          {/* Controls Bar: Category Filters & Sort */}
          <div className="work-controls-container card">
            <div className="category-tabs">
              {defaultCategories.map((cat) => {
                const count = cat === 'All'
                  ? items.length
                  : items.filter(i => normalizeCategory(i.category) === cat).length;
                return (
                  <button
                    key={cat}
                    className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {getCategoryIcon(cat)}
                    <span>{cat}</span>
                    <span className="count-badge">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="sort-wrapper">
              <label htmlFor="sort-order" className="sort-label">Sort by Year:</label>
              <button
                className="sort-toggle-btn"
                onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
              >
                {sortOrder === 'newest' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container work-grid-container">
        <div className="results-count">
          Showing <strong>{filteredAndSortedItems.length}</strong> {selectedCategory !== 'All' ? selectedCategory : 'total'} work item(s)
        </div>

        {loading ? (
          <div className="work-items-grid">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="work-item-card card" style={{ height: '300px', opacity: 0.5 }}></div>
            ))}
          </div>
        ) : (
          <motion.div className="work-items-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredAndSortedItems.map((item) => {
                const normalizedCat = normalizeCategory(item.category);
                const hasLiveUrl = Boolean(item.liveUrl);
                const hasGithubUrl = Boolean(item.githubUrl);

                // CUSTOM IMAGE-ONLY GRAPHIC CARD WITH 2-LINE HOVER DESCRIPTION & CONDITIONAL DOWNLOAD BUTTON
                if (normalizedCat === 'Graphic') {
                  const imgSrc = item.thumbnail || item.previewImage;
                  const projectLink = item.liveUrl || item.link || null;
                  const shortDesc = item.summary || item.description || item.title || '';

                  return (
                    <motion.div
                      key={item.id || item.title}
                      className="graphic-work-card card"
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="graphic-img-container">
                        {imgSrc ? (
                          <img src={imgSrc} alt={item.title || 'Graphic Work'} className="graphic-native-img" />
                        ) : (
                          <div className="graphic-placeholder">
                            <FaPalette size={36} />
                            <span>{item.title}</span>
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

                // STANDARD CARD FOR NON-GRAPHIC CATEGORIES (VIDEO, CODE, DATA, RESEARCH)
                return (
                  <motion.div
                    key={item.id || item.title}
                    className="work-item-card card"
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="work-card-header">
                      <span className={`category-tag tag-${normalizedCat.toLowerCase().replace(/\s+/g, '-')}`}>
                        {getCategoryIcon(normalizedCat)} {item.category || normalizedCat}
                      </span>
                      <span className="work-year-pill">{item.year}</span>
                    </div>

                    {(item.thumbnail || item.previewImage) && (
                      <div className="work-card-media">
                        <img src={item.thumbnail || item.previewImage} alt={item.title} className="work-media-img" />
                      </div>
                    )}

                    <div className="work-card-content">
                      <h3 className="work-item-title">{item.title}</h3>
                      {item.company && <p className="work-item-company">{item.company}</p>}
                      <p className="work-item-description">{item.summary || item.description}</p>

                      {((item.tags && item.tags.length > 0) || (item.techStack && item.techStack.length > 0) || (item.tools && item.tools.length > 0)) && (
                        <div className="work-tags-list">
                          {[...(item.tags || []), ...(item.techStack || []), ...(item.tools || [])].map((tag, i) => (
                            <span key={i} className="work-tag">
                              <FaTag size={10} /> {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="work-card-action">
                      {hasLiveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary action-btn"
                        >
                          <FaGlobe size={13} />
                          <span>View Live Project</span>
                          <FaExternalLinkAlt size={11} />
                        </a>
                      )}

                      {hasGithubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline action-btn github-action-btn"
                        >
                          <FaGithub size={15} />
                          <span>Check Codebase</span>
                        </a>
                      )}

                      {!hasLiveUrl && !hasGithubUrl && (
                        <a
                          href={item.videoUrl || item.researchLink || item.reportUrl || item.figmaLink || item.link || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline action-btn"
                        >
                          <span>{item.linkText || 'View Project / Asset'}</span>
                          <FaExternalLinkAlt size={12} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="bottom-navigation-banner card">
          <p>Finished reviewing work showcase?</p>
          <button className="btn btn-primary" onClick={onBackToHome}>
            <FaArrowLeft /> Return to Main Portfolio Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyWorkPage;
