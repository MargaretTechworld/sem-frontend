import React from 'react';
import {
  FaMapMarkerAlt, FaCity, FaEnvelope, FaPhone,
} from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => (
  <footer className="home-contact-section">
    <div className="home-contact-container">
      <div className="home-contact-info">
        <h2 className="home-contact-heading">QUICK LINKS</h2>
        <div className="dash" />
        <div className="footer-links">
          <p>About Us</p>
          <p>News & Events</p>
          <p>Admission</p>
          <p>Contact</p>
        </div>
      </div>
      <div className="contact-map">
        <h2 className="home-contact-heading">LOCATION MAP</h2>
        <div className="dash" />
        <iframe width="120" height="100" title="map" src="https://maps.google.com/maps?width=720&amp;height=600&amp;hl=en&amp;q=18%20dougan%20Street+(Destined%20for%20grateness)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps devices</a></iframe>
      </div>
      <div className="home-contact-info">
        <h2 className="home-contact-heading">CONTACT US</h2>
        <div className="dash" />
        <div className="footer-links">
          <p>
            <FaMapMarkerAlt />
            {' '}
            54/56 School Rd. Azuabie Town, Trans Amadi.
          </p>
          <p>
            <FaCity />
            {' '}
            Port Harcourt, Rivers State, ZIP
          </p>
          <p>
            <FaEnvelope />
            {' '}
            virgitabinternationalschool@gmail.com
          </p>
          <p>
            <span className="flip-icon"><FaPhone /></span>
            (+234) 816 735 0455 & (+234) 702 610 3326
          </p>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>
        &copy;
        {new Date().getFullYear()}
        {' '}
        Virgitab International School. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
