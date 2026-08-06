import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      setIsSubmitting(false);
      if (onNavigate) {
        onNavigate('admin');
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Invalid administrator credentials.');
    }
  };

  return (
    <div className="login-page">
      <div className="container login-container">
        <button 
          className="back-btn" 
          onClick={() => onNavigate && onNavigate('home')}
        >
          <FaArrowLeft /> Back to Public Portfolio
        </button>

        <motion.div 
          className="login-card card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="login-header">
            <div className="shield-icon-wrapper">
              <FaShieldAlt />
            </div>
            <h2>CMS Administrator Login</h2>
            <p>Access the portfolio dashboard to manage & publish work assets.</p>
          </div>

          {error && (
            <div className="login-error-alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Admin Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary login-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
