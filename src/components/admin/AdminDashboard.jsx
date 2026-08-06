import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartPie, 
  FaPlusCircle, 
  FaFolder, 
  FaSignOutAlt, 
  FaGlobe, 
  FaStar, 
  FaEdit, 
  FaTrash, 
  FaUpload, 
  FaImage, 
  FaVideo, 
  FaCode, 
  FaFileAlt, 
  FaCheckCircle, 
  FaSearch, 
  FaTimes,
  FaSyncAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { 
  getPortfolioItems, 
  addPortfolioItem, 
  updatePortfolioItem, 
  deletePortfolioItem, 
  toggleFeaturedItem 
} from '../../backend/portfolioService';
import { uploadToCloudinary, uploadMultipleToCloudinary } from '../../backend/cloudinaryService';
import './AdminDashboard.css';

const CATEGORY_OPTIONS = [
  "Graphic Design",
  "Video Editing",
  "UI/UX Design",
  "Branding",
  "Logo Design",
  "Motion Graphics",
  "Code Project",
  "Data Analysis",
  "Research Work"
];

const AdminDashboard = ({ onNavigate }) => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'items' | 'upload'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Form State
  const [selectedCategory, setSelectedCategory] = useState("Graphic Design");
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    featured: false,
    tagsStr: '',
    videoUrl: '',
    githubUrl: '',
    liveUrl: '',
    figmaLink: '',
    reportUrl: '',
    researchLink: '',
    summary: '',
    techStackStr: '',
    toolsStr: '',
    authorsStr: '',
  });

  // Media File States
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  // Status & Edit State
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  // Auto-dismiss success alert after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Auto-dismiss error alert after 3 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const loadPortfolioData = async () => {
    setLoading(true);
    try {
      const data = await getPortfolioItems();
      setItems(data);
    } catch (err) {
      console.error("Failed to load portfolio items:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate Overview Stats
  const stats = useMemo(() => {
    return {
      total: items.length,
      graphic: items.filter(i => (i.category || '').toLowerCase().includes('graphic') || (i.category || '').toLowerCase().includes('brand') || (i.category || '').toLowerCase().includes('logo')).length,
      video: items.filter(i => (i.category || '').toLowerCase().includes('video') || (i.category || '').toLowerCase().includes('motion')).length,
      code: items.filter(i => (i.category || '').toLowerCase().includes('code')).length,
      data: items.filter(i => (i.category || '').toLowerCase().includes('data')).length,
      research: items.filter(i => (i.category || '').toLowerCase().includes('research')).length,
      featured: items.filter(i => i.featured).length,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = filterCategory === 'All' || item.category === filterCategory;
      return matchSearch && matchCat;
    });
  }, [items, searchTerm, filterCategory]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      year: new Date().getFullYear(),
      featured: false,
      tagsStr: '',
      videoUrl: '',
      githubUrl: '',
      liveUrl: '',
      figmaLink: '',
      reportUrl: '',
      researchLink: '',
      summary: '',
      techStackStr: '',
      toolsStr: '',
      authorsStr: '',
    });
    setThumbnailFile(null);
    setGalleryFiles([]);
    setVideoFile(null);
    setEditingItem(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      let thumbnailUrl = editingItem?.thumbnail || '';
      let imageUrls = editingItem?.images || [];
      let finalVideoUrl = formData.videoUrl || editingItem?.videoUrl || '';

      const catSlug = selectedCategory.toLowerCase().replace(/\s+/g, '-');

      // 1. Upload Thumbnail to Cloudinary
      if (thumbnailFile) {
        thumbnailUrl = await uploadToCloudinary(thumbnailFile, 'thumbnails');
      }

      // 2. Upload Gallery Images to Cloudinary
      if (galleryFiles.length > 0) {
        const uploadedGallery = await uploadMultipleToCloudinary(galleryFiles, catSlug);
        imageUrls = [...imageUrls, ...uploadedGallery];
      }

      // 3. Upload Video File to Cloudinary if provided
      if (videoFile) {
        finalVideoUrl = await uploadToCloudinary(videoFile, 'videos');
      }

      const isGraphic = selectedCategory.includes("Graphic") || selectedCategory.includes("Branding") || selectedCategory.includes("Logo");

      // Build Document Data
      const itemPayload = {
        title: isGraphic ? (formData.title || selectedCategory) : formData.title,
        category: selectedCategory,
        description: formData.description,
        year: Number(formData.year) || new Date().getFullYear(),
        featured: Boolean(formData.featured),
        tags: formData.tagsStr ? formData.tagsStr.split(',').map(s => s.trim()).filter(Boolean) : [],
        thumbnail: thumbnailUrl,
        images: imageUrls,
        videoUrl: finalVideoUrl,
        githubUrl: formData.githubUrl,
        liveUrl: formData.liveUrl,
        figmaLink: formData.figmaLink,
        reportUrl: formData.reportUrl,
        researchLink: formData.researchLink,
        summary: formData.summary,
        techStack: formData.techStackStr ? formData.techStackStr.split(',').map(s => s.trim()).filter(Boolean) : [],
        tools: formData.toolsStr ? formData.toolsStr.split(',').map(s => s.trim()).filter(Boolean) : [],
        authors: formData.authorsStr ? formData.authorsStr.split(',').map(s => s.trim()).filter(Boolean) : [],
      };

      if (editingItem) {
        await updatePortfolioItem(editingItem.id, itemPayload);
        setSuccessMessage("Portfolio item updated successfully!");
      } else {
        await addPortfolioItem(itemPayload);
        setSuccessMessage("New portfolio item published successfully!");
      }

      await loadPortfolioData();
      resetForm();
      setActiveTab('items');
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMessage(err.message || "Failed to save portfolio item. Please check fields and try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setSelectedCategory(item.category || "Graphic Design");
    setFormData({
      title: item.title || '',
      description: item.description || '',
      year: item.year || new Date().getFullYear(),
      featured: Boolean(item.featured),
      tagsStr: (item.tags || []).join(', '),
      videoUrl: item.videoUrl || '',
      githubUrl: item.githubUrl || '',
      liveUrl: item.liveUrl || '',
      figmaLink: item.figmaLink || '',
      reportUrl: item.reportUrl || '',
      researchLink: item.researchLink || '',
      summary: item.summary || '',
      techStackStr: (item.techStack || []).join(', '),
      toolsStr: (item.tools || []).join(', '),
      authorsStr: (item.authors || []).join(', '),
    });
    setActiveTab('upload');
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      await deletePortfolioItem(deletingId);
      setDeletingId(null);
      await loadPortfolioData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleToggleFeatured = async (item) => {
    try {
      await toggleFeaturedItem(item.id, item.featured);
      await loadPortfolioData();
    } catch (err) {
      console.error("Toggle featured error:", err);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <h2>Laolu CMS</h2>
          <span className="badge-admin">Admin Dashboard</span>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaChartPie /> <span>Overview</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'items' ? 'active' : ''}`}
            onClick={() => setActiveTab('items')}
          >
            <FaFolder /> <span>Portfolio Items ({items.length})</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => { resetForm(); setActiveTab('upload'); }}
          >
            <FaPlusCircle /> <span>{editingItem ? 'Edit Item' : 'Upload New'}</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="sidebar-action-btn view-site"
            onClick={() => onNavigate && onNavigate('home')}
          >
            <FaGlobe /> <span>View Live Site</span>
          </button>
          <button 
            className="sidebar-action-btn logout-btn"
            onClick={() => { logout(); onNavigate && onNavigate('login'); }}
          >
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* TOP BAR */}
        <header className="admin-topbar">
          <h1 className="topbar-title">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'items' && 'Portfolio Items Manager'}
            {activeTab === 'upload' && (editingItem ? 'Edit Portfolio Item' : 'Upload New Portfolio Item')}
          </h1>
          <button className="btn btn-outline refresh-btn" onClick={loadPortfolioData}>
            <FaSyncAlt className={loading ? 'spin' : ''} /> Refresh Data
          </button>
        </header>

        {successMessage && (
          <div className="alert alert-success">
            <FaCheckCircle /> {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-error">
            <FaTimes /> {errorMessage}
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="stats-cards-grid">
              <div className="stat-card card">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total Portfolio Items</span>
              </div>
              <div className="stat-card card">
                <span className="stat-value">{stats.graphic}</span>
                <span className="stat-label">Graphic Design</span>
              </div>
              <div className="stat-card card">
                <span className="stat-value">{stats.video}</span>
                <span className="stat-label">Video Editing</span>
              </div>
              <div className="stat-card card">
                <span className="stat-value">{stats.code}</span>
                <span className="stat-label">Code Projects</span>
              </div>
              <div className="stat-card card">
                <span className="stat-value">{stats.data}</span>
                <span className="stat-label">Data Analysis</span>
              </div>
              <div className="stat-card card">
                <span className="stat-value">{stats.research}</span>
                <span className="stat-label">Research Work</span>
              </div>
            </div>

            <div className="recent-uploads-section card">
              <div className="card-header-flex">
                <h3>Recent Portfolio Additions</h3>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('upload')}>
                  <FaPlusCircle /> Add New Item
                </button>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Year</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.slice(0, 5).map((item) => (
                      <tr key={item.id}>
                        <td><strong>{item.title}</strong></td>
                        <td><span className="table-cat-badge">{item.category}</span></td>
                        <td>{item.year}</td>
                        <td>
                          <button 
                            className={`star-toggle ${item.featured ? 'active' : ''}`}
                            onClick={() => handleToggleFeatured(item)}
                          >
                            <FaStar />
                          </button>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button className="icon-btn edit" onClick={() => handleEditClick(item)} title="Edit">
                              <FaEdit />
                            </button>
                            <button className="icon-btn delete" onClick={() => setDeletingId(item.id)} title="Delete">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PORTFOLIO ITEMS MANAGER */}
        {activeTab === 'items' && (
          <div className="items-manager-content">
            <div className="filter-bar card">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search portfolio items by title or keyword..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select 
                className="category-select-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {CATEGORY_OPTIONS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="items-table-card card">
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Thumbnail</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Year</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.title} className="table-thumb" />
                          ) : (
                            <div className="table-thumb-placeholder">
                              <FaImage />
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="item-title-cell">
                            <strong>{item.title}</strong>
                            <span className="item-subdesc">{item.company || (item.tags || []).join(', ')}</span>
                          </div>
                        </td>
                        <td><span className="table-cat-badge">{item.category}</span></td>
                        <td>{item.year}</td>
                        <td>
                          <button 
                            className={`star-toggle ${item.featured ? 'active' : ''}`}
                            onClick={() => handleToggleFeatured(item)}
                          >
                            <FaStar />
                          </button>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button className="icon-btn edit" onClick={() => handleEditClick(item)} title="Edit Item">
                              <FaEdit />
                            </button>
                            <button className="icon-btn delete" onClick={() => setDeletingId(item.id)} title="Delete Item">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredItems.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center empty-cell">
                          No portfolio items match your filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DYNAMIC UPLOAD / EDIT FORM */}
        {activeTab === 'upload' && (
          <div className="upload-form-content card">
            <form onSubmit={handleFormSubmit} className="category-dynamic-form">
              {/* Category Selector */}
              <div className="form-group highlight-group">
                <label>Select Portfolio Category *</label>
                <select 
                  className="form-control"
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {CATEGORY_OPTIONS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <small className="field-hint">Selecting a category updates the required upload and metadata fields below.</small>
              </div>

              <div className="form-row-2">
                {!(selectedCategory.includes("Graphic") || selectedCategory.includes("Branding") || selectedCategory.includes("Logo")) && (
                  <div className="form-group">
                    <label>Title *</label>
                    <input 
                      type="text" 
                      name="title" 
                      required 
                      placeholder="e.g. Smart Bin IoT Management System" 
                      value={formData.title} 
                      onChange={handleFormChange} 
                      className="form-control"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Year *</label>
                  <input 
                    type="number" 
                    name="year" 
                    required 
                    placeholder="2026" 
                    value={formData.year} 
                    onChange={handleFormChange} 
                    className="form-control"
                  />
                </div>
              </div>

              {/* DYNAMIC FIELD RENDERING BY CATEGORY */}
              
              {/* 1. GRAPHIC / UI/UX / BRANDING / LOGO */}
              {(selectedCategory.includes("Graphic") || selectedCategory.includes("UI") || selectedCategory.includes("Branding") || selectedCategory.includes("Logo")) && (
                <div className="category-fields-block">
                  <h4><FaImage /> Graphic & Visual Design Options</h4>
                  
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Upload Single Graphic Picture *</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setThumbnailFile(e.target.files[0])} 
                        className="form-control"
                      />
                      <small className="field-hint">Displays on user page according to uploaded picture's original file dimensions.</small>
                    </div>

                    <div className="form-group">
                      <label>Project / Zip Download Link (Optional)</label>
                      <input 
                        type="url" 
                        name="liveUrl" 
                        placeholder="https://... (Optional project or zip download link)" 
                        value={formData.liveUrl} 
                        onChange={handleFormChange} 
                        className="form-control"
                      />
                      <small className="field-hint">If left blank, no project/download button will be displayed.</small>
                    </div>
                  </div>

                  {selectedCategory.includes("UI") && (
                    <div className="form-group">
                      <label>Figma Prototype Link</label>
                      <input 
                        type="url" 
                        name="figmaLink" 
                        placeholder="https://www.figma.com/file/..." 
                        value={formData.figmaLink} 
                        onChange={handleFormChange} 
                        className="form-control"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 2. VIDEO EDITING / MOTION GRAPHICS */}
              {(selectedCategory.includes("Video") || selectedCategory.includes("Motion")) && (
                <div className="category-fields-block">
                  <h4><FaVideo /> Video Upload & Media Options</h4>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Upload Video File to Cloudinary</label>
                      <input 
                        type="file" 
                        accept="video/*" 
                        onChange={(e) => setVideoFile(e.target.files[0])} 
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label>OR Paste TikTok / YouTube / Vimeo Link</label>
                      <input 
                        type="url" 
                        name="videoUrl" 
                        placeholder="https://www.tiktok.com/@... or https://youtube.com/watch?v=..." 
                        value={formData.videoUrl} 
                        onChange={handleFormChange} 
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Video Cover / Thumbnail</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setThumbnailFile(e.target.files[0])} 
                      className="form-control"
                    />
                  </div>
                </div>
              )}

              {/* 3. CODE PROJECT */}
              {selectedCategory.includes("Code") && (
                <div className="category-fields-block">
                  <h4><FaCode /> Code & Repository Details</h4>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>GitHub Repository URL</label>
                      <input 
                        type="url" 
                        name="githubUrl" 
                        placeholder="https://github.com/Dev-Laolu/..." 
                        value={formData.githubUrl} 
                        onChange={handleFormChange} 
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label>Live Site / Demo URL</label>
                      <input 
                        type="url" 
                        name="liveUrl" 
                        placeholder="https://my-app.vercel.app" 
                        value={formData.liveUrl} 
                        onChange={handleFormChange} 
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Technologies Used (Comma Separated)</label>
                    <input 
                      type="text" 
                      name="techStackStr" 
                      placeholder="React, C++, Node.js, Firebase, Tailwind" 
                      value={formData.techStackStr} 
                      onChange={handleFormChange} 
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label>Project Screenshot / Thumbnail</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setThumbnailFile(e.target.files[0])} 
                      className="form-control"
                    />
                  </div>
                </div>
              )}

              {/* 4. DATA ANALYSIS */}
              {selectedCategory.includes("Data") && (
                <div className="category-fields-block">
                  <h4><FaChartPie /> Data Analytics & Report Options</h4>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Analytics Report / Case Study Link</label>
                      <input 
                        type="url" 
                        name="reportUrl" 
                        placeholder="https://sites.google.com/..." 
                        value={formData.reportUrl} 
                        onChange={handleFormChange} 
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label>Tools Used (Comma Separated)</label>
                      <input 
                        type="text" 
                        name="toolsStr" 
                        placeholder="Power BI, Excel, Python, SQL, Tableau" 
                        value={formData.toolsStr} 
                        onChange={handleFormChange} 
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Dashboard Screenshots (Multiple)</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={(e) => setGalleryFiles(e.target.files)} 
                      className="form-control"
                    />
                  </div>
                </div>
              )}

              {/* 5. RESEARCH WORK */}
              {selectedCategory.includes("Research") && (
                <div className="category-fields-block">
                  <h4><FaFileAlt /> Academic & Research Publication Options</h4>

                  <div className="form-group">
                    <label>Short Executive Summary *</label>
                    <textarea 
                      name="summary" 
                      rows="3" 
                      placeholder="Executive summary of the published research..." 
                      value={formData.summary} 
                      onChange={handleFormChange} 
                      className="form-control"
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Publication / Academia Link</label>
                      <input 
                        type="url" 
                        name="researchLink" 
                        placeholder="https://atupa-sec.org/..." 
                        value={formData.researchLink} 
                        onChange={handleFormChange} 
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label>Authors (Comma Separated)</label>
                      <input 
                        type="text" 
                        name="authorsStr" 
                        placeholder="Olayinkahopewell Olaoluwa, Dr. Smith" 
                        value={formData.authorsStr} 
                        onChange={handleFormChange} 
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* COMMON FIELDS */}
              <div className="form-group">
                <label>
                  {(selectedCategory.includes("Graphic") || selectedCategory.includes("Branding") || selectedCategory.includes("Logo"))
                    ? "Flyer Info / Short Description (Displays on hover, max 2 lines)"
                    : "Description *"}
                </label>
                <textarea 
                  name="description" 
                  rows="3" 
                  required={!(selectedCategory.includes("Graphic") || selectedCategory.includes("Branding") || selectedCategory.includes("Logo"))}
                  placeholder={(selectedCategory.includes("Graphic") || selectedCategory.includes("Branding") || selectedCategory.includes("Logo"))
                    ? "Brief information about the flyer/design (max 2 lines on hover)..."
                    : "Detailed description of the project, impact, and deliverables..."} 
                  value={formData.description} 
                  onChange={handleFormChange} 
                  className="form-control"
                />
              </div>

              {!(selectedCategory.includes("Graphic") || selectedCategory.includes("Branding") || selectedCategory.includes("Logo")) && (
                <div className="form-group">
                  <label>Tags (Comma Separated)</label>
                  <input 
                    type="text" 
                    name="tagsStr" 
                    placeholder="Branding, Motion, React, Analytics" 
                    value={formData.tagsStr} 
                    onChange={handleFormChange} 
                    className="form-control"
                  />
                </div>
              )}

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="featured" 
                    checked={formData.featured} 
                    onChange={handleFormChange} 
                  />
                  <span>Mark as Featured Work on Portfolio Home Page</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary submit-btn" disabled={uploading}>
                  <FaUpload /> {uploading ? 'Uploading to Cloudinary & Firestore...' : (editingItem ? 'Update Portfolio Item' : 'Publish Portfolio Item')}
                </button>

                {editingItem && (
                  <button type="button" className="btn btn-outline" onClick={resetForm}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="modal-backdrop">
          <div className="modal-card card">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this portfolio item? This operation cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-primary btn-danger" onClick={handleDeleteConfirm}>
                Yes, Delete Item
              </button>
              <button className="btn btn-outline" onClick={() => setDeletingId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
