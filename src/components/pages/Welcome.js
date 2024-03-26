import React from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/welcome.css';

const Welcome = () => (
  <div className="welcome-container">
    <div className="welcome-video">
      <iframe
        className="video-frame"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/BEwtu7vKPJk?si=61rlN1fQ7jfSXV_W"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
    </div>
    <div className="welcome-text">
      <h2 className="welcome-heading">
        WELCOME
        <br />
        TO DESTINED FOR GRATENESS DAYCARE AND PRIMARY SCHOOL
      </h2>
      <div className="stars-container">
        <FaStar className="star-icon" />
        <FaStar className="star-icon" />
        <FaStar className="star-icon" />
      </div>
      <p className="moto">We are a choosen generation</p>
      <p className="scripture-verse">1 Peter 2:9</p>
      <p className="learn-more-link">Learn More</p>
    </div>
  </div>
);

export default Welcome;
