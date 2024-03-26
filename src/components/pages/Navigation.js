import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoTwo from '../../images/logo1.png';
import '../styles/Navigation.css';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      toggleMenu();
    }
  };

  return (
    <nav className="menu-section">
      <div className="mobile-menu">
        <div className="logo-name">
          <img src={logoTwo} alt="logo-sec" className="logo-sec" />
          <div className="destined-name">
            <p>
              Destined for Greatness
              <br />
              {' '}
              School
            </p>
          </div>
        </div>
        <div
          className={`menu ${menuOpen ? 'open-menu' : ''}`}
          role="button"
          tabIndex={0}
          onClick={toggleMenu}
          onKeyDown={handleKeyDown}
          aria-label="Toggle Menu"
        >
          <span />
          <span />
          <span />
        </div>
        {menuOpen && (
        <div
          className="close"
          onClick={toggleMenu}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          X
        </div>
        )}
      </div>
      <div className={`middle-div ${menuOpen ? 'open' : ''}`}>
        <ul className="middle-list">
          <li>
            <NavLink className="list" to="/" aria-label="Home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="list" to="/about" aria-label="About Us">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink className="list" to="/admission" aria-label="Admission">
              Admission
            </NavLink>
          </li>
          <li>
            <NavLink className="list" to="/news-events" aria-label="News & Events">
              News &amp; Events
            </NavLink>
          </li>
          <li>
            <NavLink className="list" to="/contact-us" aria-label="Contact Us">
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
