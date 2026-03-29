import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import '../../styles/admin.css';

const AuthForm = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const url = isLogin ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users';
      const { data } = await axios.post(url, { name, email, password });

      localStorage.setItem('studentInfo', JSON.stringify(data));
      onSuccess(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
      setLoading(false);
    }
  };

  let buttonText = 'Register & Continue';
  if (loading) {
    buttonText = 'Processing...';
  } else if (isLogin) {
    buttonText = 'Login to Enroll';
  }

  return (
    <div className="auth-form-container" style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <div className="admin-card">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          {isLogin ? 'Student Login' : 'Create Student Account'}
        </h2>

        {error && (
          <div
            className="error-message"
            style={{
              background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">
                <FaUser style={{ marginRight: '0.5rem' }} />
                {' '}
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope style={{ marginRight: '0.5rem' }} />
              {' '}
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock style={{ marginRight: '0.5rem' }} />
              {' '}
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <FaLock style={{ marginRight: '0.5rem' }} />
                {' '}
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {buttonText}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '0.9rem',
            }}
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default AuthForm;
