import React, { useState } from 'react';
// import Intro from './Intro';
import AboutNav from './AboutNav';
import Ceo from '../../images/ceo.jpg';
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

  // CEO Data
  const ceo = {
    id: 'ceo',
    name: 'Junisar Bangali Esq.',
    position: 'Chief Executive Officer',
    image: Ceo,
    biography: `Dr. Junisar Bangali Esq. is a visionary leader with over 20 years of experience in education and business management. 
    He founded our institution with a mission to transform professional education through innovative teaching methods and 
    industry-relevant curriculum. Under his leadership, the organization has grown from a small training center to a 
    globally recognized educational institution serving thousands of students across multiple continents. Dr. Bangali holds 
    numerous academic qualifications and has been recognized with several awards for excellence in educational leadership. 
    He regularly speaks at international conferences on topics of educational innovation, leadership development, and 
    corporate training strategies.`,
  };

  // Staff Data
  const staff = [
    {
      id: 'staff-1',
      name: 'Sarah Johnson',
      position: 'Academic Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Sarah Johnson brings 15 years of academic administration experience to our team. She oversees curriculum development and ensures educational excellence across all programs.',
    },
    {
      id: 'staff-2',
      name: 'Michael Chen',
      position: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Michael Chen manages our daily operations with precision and efficiency. With a background in business management, he ensures smooth delivery of all educational services.',
    },
    {
      id: 'staff-3',
      name: 'Emily Rodriguez',
      position: 'Student Services Coordinator',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Emily Rodriguez is dedicated to providing exceptional support to our students. She handles admissions, student records, and provides guidance throughout the learning journey.',
    },
    {
      id: 'staff-4',
      name: 'David Kim',
      position: 'IT Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'David Kim leads our technology infrastructure and online learning platforms. With expertise in educational technology, he ensures seamless digital learning experiences.',
    },
  ];

  // Mentors Data
  const mentors = [
    {
      id: 'mentor-1',
      name: 'Robert Williams',
      position: 'Leadership Mentor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Robert Williams is a seasoned executive coach with 25+ years of corporate leadership experience. He mentors students in leadership development and strategic management.',
    },
    {
      id: 'mentor-2',
      name: 'Jennifer Martinez',
      position: 'Career Development Mentor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Jennifer Martinez specializes in career coaching and professional development. She helps students navigate their career paths and achieve their professional goals.',
    },
    {
      id: 'mentor-3',
      name: 'Thomas Brown',
      position: 'Business Strategy Mentor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Thomas Brown brings extensive consulting experience to mentor students in business strategy and organizational development. He has worked with Fortune 500 companies globally.',
    },
    {
      id: 'mentor-4',
      name: 'Amanda Foster',
      position: 'Communication Mentor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Amanda Foster is an expert in corporate communication and public speaking. She helps students develop essential communication skills for professional success.',
    },
    {
      id: 'mentor-5',
      name: 'Christopher Lee',
      position: 'Project Management Mentor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Christopher Lee is a certified PMP with 20 years of project management experience. He mentors students in project planning, execution, and team leadership.',
    },
    {
      id: 'mentor-6',
      name: 'Michelle Davis',
      position: 'Marketing Mentor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Michelle Davis is a digital marketing expert who has led successful campaigns for global brands. She mentors students in marketing strategy and digital transformation.',
    },
    {
      id: 'mentor-7',
      name: 'Daniel Wilson',
      position: 'Finance Mentor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Daniel Wilson is a financial analyst and investment advisor with expertise in corporate finance and financial planning. He guides students in financial management.',
    },
    {
      id: 'mentor-8',
      name: 'Sophia Taylor',
      position: 'HR Mentor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Sophia Taylor specializes in human resources and organizational development. She mentors students in talent management and workplace culture.',
    },
  ];

  // Instructors Data
  const instructors = [
    {
      id: 'instructor-1',
      name: 'Dr. Patricia Chen',
      position: 'Leadership Instructor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Dr. Patricia Chen holds a PhD in Organizational Psychology and has been teaching leadership courses for over 15 years. She brings real-world corporate experience to the classroom.',
    },
    {
      id: 'instructor-2',
      name: 'Prof. Michael Roberts',
      position: 'Communication Instructor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Prof. Michael Roberts is an expert in business communication with extensive experience in corporate training. He specializes in presentation skills and interpersonal communication.',
    },
    {
      id: 'instructor-3',
      name: 'Dr. Sarah Thompson',
      position: 'Project Management Instructor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Dr. Sarah Thompson is a certified PMP with a background in engineering and project management. She has managed multi-million dollar projects across various industries.',
    },
    {
      id: 'instructor-4',
      name: 'Prof. David Kim',
      position: 'Marketing Instructor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
      biography: 'Prof. David Kim is a marketing professional with experience in digital marketing and brand management. He has worked with leading global brands on successful campaigns.',
    },
  ];

  const handleViewBio = (person) => {
    setSelectedPerson(person);
  };

  const handleCloseBio = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="our-team-page">
      {/* CEO Section */}
      {/* <Intro
        heading="Our Team"
      /> */}
      <AboutNav
        links={links}
      />
      <section id="Meet Our Ceo" className="ceo-section">
        <div className="container">
          <div className="ceo-content">
            <div className="ceo-image">
              <img src={ceo.image} alt={ceo.name} />
            </div>
            <div className="ceo-info">
              <div className="ceo-biography">
                <p>{ceo.biography}</p>
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
                  <img src={member.image} alt={member.name} />
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
                  <img src={mentor.image} alt={mentor.name} />
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
                  <img src={instructor.image} alt={instructor.name} />
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
                <img src={selectedPerson.image} alt={selectedPerson.name} />
              </div>
              <div className="bio-info">
                <h2>{selectedPerson.name}</h2>
                <p className="bio-position">{selectedPerson.position}</p>
                <div className="bio-biography">
                  <p>{selectedPerson.biography}</p>
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
                <img src={ceo.image} alt={ceo.name} />
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
