import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, getImgUrl } from '../../apiConfig';
import AboutNav from './AboutNav';
import '../styles/ourTeam.css';

const OurTeam = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showCeoModal, setShowCeoModal] = useState(false);

  const links = [
    { to: '#Meet Our Ceo', label: 'Meet Our Ceo', id: 'Meet Our Ceo' },
    { to: '#Our Staff', label: 'Our Staff', id: 'Our Staff' },
    { to: '#Our Mentors', label: 'Our Mentors', id: 'Our Mentors' },
    { to: '#Our Instructors', label: 'Our Instructors', id: 'Our Instructors' },
  ];

  const [ceo, setCeo] = useState(null);
  const [staff, setStaff] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/content/our-team`);
        const allMembers = data.sections.map((s) => ({
          id: s.key,
          image: s.image,
          ...JSON.parse(s.content),
        }));

        setCeo(allMembers.find((m) => m.id === 'ceo'));
        setStaff(allMembers.filter((m) => m.id.startsWith('staff')));
        setMentors(allMembers.filter((m) => m.id.startsWith('mentor')));
        setInstructors(allMembers.filter((m) => m.id.startsWith('instructor')));
        setLoading(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const handleViewBio = (person) => {
    setSelectedPerson(person);
  };

  const handleCloseBio = () => {
    setSelectedPerson(null);
  };

  if (loading || !ceo) return null;

  return (
    <div className="our-team-page">
      <AboutNav
        links={links}
      />
      <section id="Meet Our Ceo" className="ceo-section">
        <div className="container">
          <div className="ceo-content">
            <div className="ceo-image">
              <img src={getImgUrl(ceo.image)} alt={ceo.name} />
            </div>
            <div className="ceo-info">
              <div className="ceo-biography">
                <p>{ceo.bio}</p>
                <button
                  type="button"
                  className="read-more-btn"
                  onClick={() => setShowCeoModal(true)}
                  aria-label="Read full CEO biography"
                >
                  Read More
                </button>
                <h2 className="ceo-h2">{ceo.name}</h2>
                <p className="ceo-position">{ceo.position}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section id="Our Staff" className="staff-section">
        <div className="container">
          <h2 className="section-title">Our Qualified Staff</h2>
          <div className="staff-grid">
            {staff.map((member) => (
              <div key={member.id} className="staff-card">
                <div className="staff-image">
                  <img src={getImgUrl(member.image)} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="staff-position">{member.position}</p>
                <button
                  type="button"
                  className="view-bio-btn"
                  onClick={() => handleViewBio(member)}
                >
                  View Bio
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section id="Our Mentors" className="mentors-section">
        <div className="container">
          <h2 className="section-title">Our Expert Mentors</h2>
          <div className="mentors-grid">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="mentor-card">
                <div className="mentor-image">
                  <img src={getImgUrl(mentor.image)} alt={mentor.name} />
                </div>
                <h3>{mentor.name}</h3>
                <p className="mentor-position">{mentor.position}</p>
                <button
                  type="button"
                  className="view-bio-btn"
                  onClick={() => handleViewBio(mentor)}
                >
                  View Bio
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section id="Our Instructors" className="instructors-section">
        <div className="container">
          <h2 className="section-title">Our Professional Instructors</h2>
          <div className="instructors-grid">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="instructor-card">
                <div className="instructor-image">
                  <img src={getImgUrl(instructor.image)} alt={instructor.name} />
                </div>
                <h3>{instructor.name}</h3>
                <p className="instructor-position">{instructor.position}</p>
                <button
                  type="button"
                  className="view-bio-btn"
                  onClick={() => handleViewBio(instructor)}
                >
                  View Bio
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Modal */}
      {selectedPerson && (
        <div className="bio-modal">
          <div
            className="modal-overlay"
            onClick={handleCloseBio}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCloseBio();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Close biography modal"
          />
          <div className="modal-content">
            <button
              type="button"
              className="close-btn"
              onClick={handleCloseBio}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="bio-content">
              <div className="bio-image">
                <img src={getImgUrl(selectedPerson.image)} alt={selectedPerson.name} />
              </div>
              <div className="bio-info">
                <h2>{selectedPerson.name}</h2>
                <p className="bio-position">{selectedPerson.position}</p>
                <div className="bio-biography">
                  <p>{selectedPerson.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CEO Bio Modal */}
      {showCeoModal && (
        <div className="bio-modal">
          <div
            className="modal-overlay"
            onClick={() => setShowCeoModal(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setShowCeoModal(false);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Close CEO biography modal"
          />
          <div className="modal-content ceo-modal-content">
            <button
              type="button"
              className="close-btn"
              onClick={() => setShowCeoModal(false)}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="ceo-modal-header">
              <div className="ceo-modal-image">
                <img src={getImgUrl(ceo.image)} alt={ceo.name} />
              </div>
              <div className="ceo-modal-title">
                <h1>{ceo.name}</h1>
                <h2>{ceo.position}</h2>
              </div>
            </div>
            <div className="ceo-modal-biography">
              <div className="ceo-full-bio">
                <p>
                  Dr. Junisar Bangali Esq. is a visionary leader with over 20 years of experience in
                  education and business management. He founded our institution with a mission to
                  transform professional education through innovative teaching methods and
                  industry-relevant curriculum.
                </p>

                <p>
                  Under his leadership, the organization has grown from a small training center to a
                  globally recognized educational institution serving thousands of students across
                </p>

                <p>
                  He regularly speaks at international conferences on topics of educational innovation,
                  leadership development, corporate training strategies, and the future of professional
                  education.
                </p>

                <p>
                  His educational philosophy centers on the belief that true learning occurs when
                  theory meets practice, and that every student deserves personalized guidance to
                  achieve their full potential. Dr. Bangali pioneered several innovative teaching
                  methodologies that have been adopted by educational institutions worldwide,
                  including blended learning approaches, experiential learning programs, and
                  industry-academia partnerships.
                </p>

                <p>
                  Beyond his work in education, Dr. Bangali is actively involved in various
                  philanthropic initiatives, particularly those focused on improving access to quality
                  education in underserved communities. He serves on the boards of several
                  international educational foundations and has contributed to educational policy
                  development at both national and international levels.
                </p>

                <p>
                  Dr. Bangali&#39;s vision for the future includes expanding our global reach,
                  developing cutting-edge digital learning platforms, and creating lifelong learning
                  opportunities for professionals worldwide. Under his continued leadership, our
                  institution remains committed to excellence, innovation, and the transformative
                  power of education to change lives and shape futures.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurTeam;
