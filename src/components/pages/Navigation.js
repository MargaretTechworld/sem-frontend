import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logobg.png';
import '../styles/Navigation.css';
// import { RiH1 } from 'react-icons/ri';

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
    <div>

      <nav className="menu-section">

        <div className="mobile-menu">
          <div className="logo-name">
            <img src={logo} alt="logo-sec" className="logo-sec" />
            <div className="virgitab-name">
              <h1>
                Virgitab International School
              </h1>
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
            <li>
              <NavLink className="login" to="/resources" aria-label="Contact Us">
                Login
              </NavLink>
            </li>
          </ul>

        </div>
      </nav>
    </div>
  );
};

export default Navigation;
