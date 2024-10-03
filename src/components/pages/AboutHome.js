import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/abouthome.css';
import mission1 from '../../images/mission1.jpeg';
import vision from '../../images/vision.jpeg';
import whyus from '../../images/whyus.jpeg';

const AboutHome = () => (
  <div className="side-menu-content">
    <div className="about-us-third">
      <img className="mission-img" src={mission1} alt="Mission" />
      <div>
        <h2 id="Mission Statement">Mission Statement</h2>
        <p className="mission-paragraph">
          To rank amongst the top privately owned Pre-primary,
          Primary and Post-primary schools in Rivers state,
          in particular, and in our country, Nigeria, at large.
        </p>
      </div>
    </div>
    <div className="about-us-fourth">
      <div id="Vision Statement">
        <h2>Vision Statement</h2>
        <p className="mission-paragraph">
          To contribute to society educationally, socially,
          morally, psychologically, and spiritually through
          qualitative formal education; and economically;
          through the employment of labour.
        </p>
      </div>
      <img className="mission-img" src={vision} alt="Why Us" />
    </div>
    <div className="about-us-third">
      <img className="mission-img" src={whyus} alt="Our Goals" />
      <div id="WhyUs">
        <h2>Why Us</h2>
        <div className="checklist">
          <div className="check-item">
            <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
            <span>Qualified Teachers</span>
          </div>
          <div className="check-item">
            <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
            <span>Technical Studies</span>
          </div>
          <div className="check-item">
            <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
            <span>Effective Discipline</span>
          </div>
          <div className="check-item">
            <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
            <span>Character Development</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutHome;
