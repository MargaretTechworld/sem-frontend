import React from 'react';
import { useNavigate } from 'react-router-dom';
import Intro from './Intro';
import Ceo from '../../images/ceo.jpg';
import '../styles/ceoBio.css';

const CeoBio = () => {
  const navigate = useNavigate();

  const ceo = {
    id: 'ceo',
    name: 'Junisar Bangali Esq.',
    position: 'Chief Executive Officer',
    image: Ceo,
    biography: `Dr. Junisar Bangali Esq. is a visionary leader with over 20 years of experience in education and business management. He founded our institution with a mission to transform professional education through innovative teaching methods and industry-relevant curriculum.

Under his leadership, the organization has grown from a small training center to a globally recognized educational institution serving thousands of students across multiple continents. Dr. Bangali holds numerous academic qualifications including a Doctorate in Educational Leadership, Master's degrees in Business Administration and Educational Psychology, and several professional certifications in corporate training and organizational development.

Dr. Bangali has been recognized with several prestigious awards for excellence in educational leadership, including the International Education Excellence Award, the Corporate Training Innovator Award, and the Business Education Leadership Medal. He regularly speaks at international conferences on topics of educational innovation, leadership development, corporate training strategies, and the future of professional education.

His educational philosophy centers on the belief that true learning occurs when theory meets practice, and that every student deserves personalized guidance to achieve their full potential. Dr. Bangali pioneered several innovative teaching methodologies that have been adopted by educational institutions worldwide, including blended learning approaches, experiential learning programs, and industry-academia partnerships.

Beyond his work in education, Dr. Bangali is actively involved in various philanthropic initiatives, particularly those focused on improving access to quality education in underserved communities. He serves on the boards of several international educational foundations and has contributed to educational policy development at both national and international levels.

Dr. Bangali's vision for the future includes expanding our global reach, developing cutting-edge digital learning platforms, and creating lifelong learning opportunities for professionals worldwide. Under his continued leadership, our institution remains committed to excellence, innovation, and the transformative power of education to change lives and shape futures.`,
  };

  return (
    <div className="ceo-bio-page">
      <Intro heading="CEO Biography" />

      <div className="ceo-bio-container">
        <div className="ceo-bio-header">
          <div className="ceo-bio-image">
            <img src={ceo.image} alt={ceo.name} />
          </div>
          <div className="ceo-bio-title">
            <h1>{ceo.name}</h1>
            <h2>{ceo.position}</h2>
          </div>
        </div>

        <div className="ceo-bio-content">
          <div className="ceo-bio-text">
            {ceo.biography.split('\n\n').map((paragraph) => (
              <p key={`ceo-bio-paragraph-${paragraph.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`} className="bio-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="ceo-bio-actions">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate('/our-team')}
            aria-label="Back to Our Team page"
          >
            Back to Our Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default CeoBio;
