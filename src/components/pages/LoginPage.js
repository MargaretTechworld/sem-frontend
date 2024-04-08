import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import '../styles/loginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input className="email-input" type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Email" required />
        </div>
        <div className="form-group">
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Password"
            />
            <button type="button" onClick={handleTogglePasswordVisibility}>
              {showPassword ? <IoMdEyeOff size={24} /> : <IoMdEye size={24} />}
            </button>
          </div>
        </div>
        <button className="submit-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
