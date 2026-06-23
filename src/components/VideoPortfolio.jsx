import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes, FaInstagram, FaTiktok, FaYoutube, FaFilm, FaExternalLinkAlt } from 'react-icons/fa';
import './VideoPortfolio.css';

const VideoPortfolio = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  const videoData = [
    {
      id: 1,
      title: "Design Showcase – Work Preview 1",
      category: "Creative Design",
      type: "Design Portfolio",
      icon: <FaFilm />,
      previewImage: "https://lh3.googleusercontent.com/sitesv/AA5AbUDEWpStnM3jCPBv7tYVAFB6-BTcj-iKg7xIjcs4u9q51ebrUvZD11-I7iSsyWOOl2X9L5kT4vBWKb9nBcHmQgAO3dOexDFp_R9D4nS6F1LYA9L2dxwglM0jGMbU1vdZW_2sqvnm2thTt1Q20R0OCyDsZmwrhJ1PM1dRTfxjnKrfFe8xCmVkXnbNF1IpY88=w1280",
      link: "https://sites.google.com/view/laoluthecreator/",
      description: "A visual preview of creative design work — branding assets, social media graphics, and marketing visuals crafted for campaigns."
    },
    {
      id: 2,
      title: "Design Showcase – Work Preview 2",
      category: "Graphic Design",
      type: "Design Portfolio",
      icon: <FaFilm />,
      previewImage: "https://lh3.googleusercontent.com/sitesv/AA5AbUAAcxf2tt_KPDvmgHpz6Tx-lyFKfDYBXimSBVSDMO7Uz0bXTO65Iv0ODJnOIP_Aymk5-VCkSnWH_bVb9CgADiBoUPuQ7IIZ9jMGENING4egljeEyNLFWEp4FSgLdGpW6NTy8OVzRRrAqBzjqc-CBcmAlsWFiD6QXAVBd8zZBOoGNP0s3x3zQ0wZxSgIm8M08FAZ7EM3SaQ3XvZvQloitiORFSND9vX9PXhVdWfdT0Q=w1280",
      link: "https://sites.google.com/view/laoluthecreator/",
      description: "High-impact social media creatives and brand design assets that strengthen brand identity and engage target audiences."
    },
    {
      id: 3,
      title: "Design Showcase – Work Preview 3",
      category: "Brand Design",
      type: "Design Portfolio",
      icon: <FaFilm />,
      previewImage: "https://lh3.googleusercontent.com/sitesv/AA5AbUBMuFpcwqFu_pLpO0yhTO2RMoJmU3JEIYpGefo53QXXwy7hkYZj54F15Hm91urrTDGmCq_L4Fzfmjz48FnrvoW_RUxoazBsxVes2salBNxUDMgwuenfoHlnJFMQvC49B0ql2ahHsnvrWK4HbM7EAFqrni_6viIuJJfb7Z5Nm-6eMSHUQnwc3yclHCE1HRb6_Xz1OHzBSLJS_2kv7-WpOgE6JflRtEQJSFj7PNbJ=w1280",
      link: "https://sites.google.com/view/laoluthecreator/",
      description: "Visual identity work showcasing logo design, colour palette development, and full brand communication materials."
    },
    {
      id: 4,
      title: "TikTok – Motion & Storytelling Reel",
      category: "Creative Content",
      type: "TikTok Video",
      icon: <FaTiktok />,
      previewImage: null,
      link: "https://www.tiktok.com/@olayinkahopewell/video/7576214239384227092?is_from_webapp=1&sender_device=pc&web_id=7548529523752207889",
      description: "Dynamic short-form storytelling reel optimised for audience growth, combining motion graphics, sound design, and brand messaging."
    },
    {
      id: 5,
      title: "TikTok – Brand Content Video",
      category: "Social Growth",
      type: "TikTok Video",
      icon: <FaTiktok />,
      previewImage: null,
      link: "https://www.tiktok.com/@olayinkahopewell/video/7574706583028894997?is_from_webapp=1&sender_device=pc&web_id=7548529523752207889",
      description: "Brand-focused short video content crafted to hook viewers in the first 3 seconds, drive shares, and convert casual scrollers into followers."
    },
    {
      id: 6,
      title: "TikTok – Educational / Tech Reel",
      category: "Educational",
      type: "TikTok Video",
      icon: <FaTiktok />,
      previewImage: null,
      link: "https://www.tiktok.com/@olayinkahopewell/video/7550348276235537671?is_from_webapp=1&sender_device=pc&web_id=7548529523752207889",
      description: "Educational tech content breaking down complex engineering or digital concepts into engaging, digestible 60-second TikTok clips."
    }
  ];

  return (
    <section className="section video-portfolio" id="video-portfolio">
      <div className="container">
        <h2 className="section-title">Preview My Work</h2>
        <p className="video-intro">
          A selection of real creative work — design portfolios, TikTok reels, and branded video content. Click any card to view.
        </p>

        <div className="video-grid">
          {videoData.map((video) => (
            <motion.a
              key={video.id}
              className="video-card card"
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="video-thumbnail-wrapper">
                {video.previewImage && !imgErrors[video.id] ? (
                  <img
                    src={video.previewImage}
                    alt={video.title}
                    className="video-preview-img"
                    onError={() => handleImgError(video.id)}
                  />
                ) : (
                  <div className="video-thumbnail-placeholder">
                    <div className="play-button-overlay">
                      <FaPlay className="play-icon" />
                    </div>
                  </div>
                )}
                <div className="thumbnail-overlay">
                  <FaExternalLinkAlt className="overlay-icon" />
                  <span>{video.previewImage && !imgErrors[video.id] ? 'View Full Work' : 'Watch on TikTok'}</span>
                </div>
              </div>
              <div className="video-info">
                <span className="video-type-badge">
                  {video.icon} {video.type}
                </span>
                <h3>{video.title}</h3>
                <p className="video-short-desc">{video.description}</p>
                <div className="video-card-link">
                  <FaExternalLinkAlt size={11} /> {video.link.includes('tiktok') ? 'Watch on TikTok' : 'View Portfolio'}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoPortfolio;
