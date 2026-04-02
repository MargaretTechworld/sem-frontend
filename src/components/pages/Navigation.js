import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoTwo from '../../images/logo1.png';
import LoginModal from './LoginModal';
import '../styles/Navigation.css';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));

  React.useEffect(() => {
    const handleAuthChange = () => {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    setMenuOpen(false);
    window.location.href = '/';
  };

  const openLoginModal = () => setIsModalOpen(true);
  const closeLoginModal = () => setIsModalOpen(false);

  return (
    <div>
      <LoginModal isOpen={isModalOpen} onClose={closeLoginModal} />

      <nav className="menu-section">

        <div className="mobile-menu">
          <div className="logo-name">
            <img src={logoTwo} alt="logo-sec" className="logo-sec" />
            <div className="destined-name">
              {/* <p>
                Destined for Greatness
                <br />
                {' '}
                School
              </p> */}
            </div>
          </div>
          <div
            className={`menu ${menuOpen ? 'open-menu' : ''}`}
            role="button"
            tabIndex={0}
            onClick={toggleMenu}
            onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
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
              onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
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
              <NavLink className="list" to="/" aria-label="Home" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="list" to="/about" aria-label="About Us" onClick={() => setMenuOpen(false)}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink className="list" to="/our-team" aria-label="Our Team" onClick={() => setMenuOpen(false)}>
                Our Team
              </NavLink>
            </li>
            <li>
              <NavLink className="list" to="/all-courses" aria-label="All Courses" onClick={() => setMenuOpen(false)}>
                All Courses
              </NavLink>
            </li>
            <li>
              <NavLink className="list" to="/admission" aria-label="Admission" onClick={() => setMenuOpen(false)}>
                Admission
              </NavLink>
            </li>
            <li>
              <NavLink className="list" to="/news-events" aria-label="News & Events" onClick={() => setMenuOpen(false)}>
                News &amp; Events
              </NavLink>
            </li>
            {userInfo && (
              <li>
                <NavLink 
                  className="list" 
                  to="/portal" 
                  aria-label="My Portal" 
                  onClick={() => setMenuOpen(false)}
                  style={{ color: '#3b82f6', fontWeight: '800' }}
                >
                  My Portal
                </NavLink>
              </li>
            )}
            <li>
              <NavLink className="list" to="/contact-us" aria-label="Contact Us" onClick={() => setMenuOpen(false)}>
                Contact Us
              </NavLink>
            </li>
            <li>
              {userInfo ? (
                <button
                  type="button"
                  className="login"
                  onClick={logoutHandler}
                  style={{
                    background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '700',
                  }}
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  className="login"
                  onClick={() => { setMenuOpen(false); openLoginModal(); }}
                  style={{
                    background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '700',
                  }}
                >
                  Login
                </button>
              )}
            </li>
          </ul>

        </div>
      </nav>
    </div>
  );
};

export default Navigation;
