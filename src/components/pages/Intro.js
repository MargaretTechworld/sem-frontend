import React from 'react';
import PropTypes from 'prop-types';
import '../styles/intro.css';

const Intro = ({ heading }) => (
  <div className="about-us">
    <div className="about-us-div">
      {/* Animated Background */}
      <div className="intro-animated-background">
        {/* Animated Bubbles */}
        <div className="intro-bubble intro-bubble-1" />
        <div className="intro-bubble intro-bubble-2" />
        <div className="intro-bubble intro-bubble-3" />
        <div className="intro-bubble intro-bubble-4" />
        <div className="intro-bubble intro-bubble-5" />
        <div className="intro-bubble intro-bubble-6" />

        {/* Animated Binoculars */}
        <div className="intro-binoculars-container">
          <div className="intro-binoculars">
            <div className="intro-binocular-left">
              <div className="intro-lens">
                <div className="intro-lens-reflection" />
                <div className="intro-lens-light" />
              </div>
              <div className="intro-eyepiece" />
            </div>
            <div className="intro-binocular-bridge">
              <div className="intro-bridge-center" />
            </div>
            <div className="intro-binocular-right">
              <div className="intro-lens">
                <div className="intro-lens-reflection" />
                <div className="intro-lens-light" />
              </div>
              <div className="intro-eyepiece" />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="intro-floating-element intro-element-1">📊</div>
        <div className="intro-floating-element intro-element-2">🎯</div>
        <div className="intro-floating-element intro-element-3">💡</div>
        <div className="intro-floating-element intro-element-4">🔍</div>
        <div className="intro-floating-element intro-element-5">📈</div>
        <div className="intro-floating-element intro-element-6">⭐</div>
      </div>

      {/* Original Content */}
      <h2 className="about-us-heading">{heading}</h2>
    </div>
  </div>
);

Intro.propTypes = {
  heading: PropTypes.string,
};

Intro.defaultProps = {
  heading: 'Default Heading',
};

export default Intro;
