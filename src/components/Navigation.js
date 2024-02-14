import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav-div">
      <div className="nav-container">
        <div className="logo-menu">
          <h1 className="logo">
            <Link to="/">Logo</Link>
          </h1>
          <div
            className="menu"
            role="button"
            tabIndex={0}
            onClick={toggleMenu}
            onKeyDown={toggleMenu}
          >
            {menuOpen ? (
              <p className="close">X</p>
            ) : (
              <>
                <span />
                <span />
                <span />
              </>
            )}
          </div>
        </div>
        <div className={`search-links ${menuOpen ? 'open' : ''}`}>
          <div className="search-container">
            <span className="search-icon">
              <FaSearch size={18} color="#4B0082" className="search-hover" />
            </span>
            <input type="text" placeholder="Search" className="search-input-in" />
          </div>
          <ul className="nav-list">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/admission">Admission</NavLink></li>
            <li><NavLink to="/news-events">News &amp; Events</NavLink></li>
            <li><NavLink to="/support-us">Support Us</NavLink></li>
            <li><NavLink to="/contact-us">Contact Us</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
