import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/loginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? value : value.trim(),
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Removed console.log for ESLint compliance
    onClose();
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    isOpen && (
      <div
        className="login-modal-overlay"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
        role="button"
        tabIndex="0"
        aria-label="Close login modal"
      >
        <div
          className="login-modal-container"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="presentation"
        >
          <div className="login-modal-header">
            <button
              type="button"
              className="close-btn"
              onClick={onClose}
              aria-label="Close login modal"
            >
              ×
            </button>
          </div>

          <div className="login-modal-content">
            <div className="login-form">
              <h2 id="login-title" className="login-title">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="login-subtitle">
                {isLogin
                  ? 'Sign in to access your professional courses'
                  : 'Join our community of learners and professionals'}
              </p>

              {/* eslint-disable jsx-a11y/label-has-associated-control */}
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="login-email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.select()}
                    onBlur={(e) => e.target.blur()}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="login-password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.select()}
                    onBlur={(e) => e.target.blur()}
                    className="form-input"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {isLogin && (
                  <div className="form-group checkbox-group">
                    <label htmlFor="login-rememberMe" className="checkbox-label">
                      <input
                        type="checkbox"
                        id="login-rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="checkbox-input"
                      />
                      <span className="checkbox-text">Remember me</span>
                    </label>
                  </div>
                )}

                <button type="submit" className="login-btn">
                  {isLogin ? 'Sign In' : 'Register'}
                </button>
              </form>

              <div className="switch-mode">
                <span className="switch-text">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </span>
                <button
                  type="button"
                  className="switch-btn"
                  onClick={switchMode}
                >
                  {isLogin ? 'Register' : 'Login'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
