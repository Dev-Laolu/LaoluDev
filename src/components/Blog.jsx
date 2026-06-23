import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen, FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
  const [activeArticle, setActiveArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "How I Built My Career in Tech and Content Creation",
      category: "Career & Tech",
      date: "June 12, 2026",
      readTime: "5 min read",
      summary: "Balancing computer engineering with creative visual storytelling isn't easy, but they feed into each other. This article details my journey bridging the gap between code, graphic design, and video production.",
      content: "For years, the industry forced developers to pick a side: technical coding or creative design. But my HND in Computer Engineering taught me systems logic, while my freelance graphic and video projects taught me layout dynamics. By merging these skills, I learned how to build functional interfaces that also look premium. In this guide, I share my advice on upskilling, organizing a portfolio, and finding cross-discipline clients who value both engineering precision and artistic visuals."
    },
    {
      id: 2,
      title: "Building in Public: My Founder Journey",
      category: "Entrepreneurship",
      date: "May 28, 2026",
      readTime: "4 min read",
      summary: "My experiences building brands in public, developing the Laolu Collective portfolio, and sharing insights directly with the creative developer community.",
      content: "Building in public means sharing your draft assets, code syntax errors, client rejections, and wins transparently. It creates immediate trust and community feedback. In this post, I detail how my platform (Laolu Collective) was conceptualized, the tools I used to design its templates, and how showing my work process on LinkedIn and GitHub unlocked partnerships that direct cold emailing never could."
    },
    {
      id: 3,
      title: "Lessons from Managing Multiple Brands",
      category: "Brand Management",
      date: "April 15, 2026",
      readTime: "6 min read",
      summary: "How I coordinate content strategies, visual consistency, and data reports for BuildwithMMO, Attrotech, and Penciledge simultaneously.",
      content: "Coordinating multi-brand calendars requires strong organizational systems. When managing three different brand identities simultaneously, you need modular templates, dedicated research blocks, and automated scheduling rules. This post lays out my step-by-step framework for setting up assets, matching brand guidelines, and analyzing metrics to scale outreach without burning out."
    },
    {
      id: 4,
      title: "Social Media Mistakes Small Businesses Make",
      category: "Marketing Strategy",
      date: "March 03, 2026",
      readTime: "5 min read",
      summary: "A breakdown of the common visual and analytical pitfalls brands face online, and simple steps to fix them to boost retention.",
      content: "Many small businesses believe posting daily is enough. However, without custom hook strategies, professional graphic grids, and a solid focus on retention analytics, posts easily get lost. In this breakdown, I highlight five common errors—including generic styling templates, poor video hooks, and ignoring analytics dashboards—and show practical ways to fix them today."
    }
  ];

  return (
    <section className="section blog" id="blog">
      <div className="container">
        <h2 className="section-title">Featured Articles</h2>
        <p className="blog-intro">
          Insights, frameworks, and stories at the intersection of technology, creative design, and social media.
        </p>

        <div className="blog-grid">
          {articles.map((article) => (
            <motion.div 
              key={article.id} 
              className="blog-card card"
              whileHover={{ y: -5 }}
              onClick={() => setActiveArticle(article)}
            >
              <div className="blog-header-meta">
                <span className="blog-category-tag">{article.category}</span>
                <span className="blog-read-time"><FaClock /> {article.readTime}</span>
              </div>
              <h3 className="blog-card-title">{article.title}</h3>
              <p className="blog-card-summary">{article.summary}</p>
              
              <div className="blog-card-footer">
                <span className="blog-date"><FaCalendarAlt /> {article.date}</span>
                <span className="read-more-link">
                  Read Article <FaBookOpen className="read-icon" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Article Reader Modal */}
        <AnimatePresence>
          {activeArticle && (
            <div className="modal-backdrop" onClick={() => setActiveArticle(null)}>
              <motion.div 
                className="blog-modal-content card"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close-btn" onClick={() => setActiveArticle(null)}>
                  <FaTimes />
                </button>
                
                <div className="blog-modal-inner">
                  <div className="blog-meta-row">
                    <span className="blog-category-tag">{activeArticle.category}</span>
                    <span className="blog-meta-item"><FaCalendarAlt /> {activeArticle.date}</span>
                    <span className="blog-meta-item"><FaClock /> {activeArticle.readTime}</span>
                  </div>
                  
                  <h2>{activeArticle.title}</h2>
                  <div className="blog-full-body">
                    <p className="blog-lead">{activeArticle.summary}</p>
                    <div className="blog-divider"></div>
                    <p className="blog-text">{activeArticle.content}</p>
                  </div>
                  
                  <div className="blog-modal-footer">
                    <button className="btn btn-outline" onClick={() => setActiveArticle(null)}>
                      Close Reader
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Blog;
