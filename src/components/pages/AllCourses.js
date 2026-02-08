import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import coursesData from '../data/coursesData';
import '../styles/allCourses.css';
import Intro from './Intro';

const AllCourses = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const courses = coursesData;

  const categories = [
    { value: 'all', label: 'All Courses' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'communication', label: 'Communication' },
    { value: 'management', label: 'Management' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'data', label: 'Data Analysis' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesFilter = filter === 'all' || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
                         || course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseDetails = () => {
    setSelectedCourse(null);
  };

  const handleEnroll = (course) => {
    navigate('/admission', { state: { course } });
  };

  return (
    <div className="all-courses-page">
      <Intro
        heading="All Professional Courses"
      />

      <div className="courses-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-dropdown">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="courses-stats">
        <span className="results-count">
          {filteredCourses.length}
          {' '}
          courses found
        </span>
      </div>

      {selectedCourse ? (
        <div className="course-details-modal">
          <div
            className="modal-overlay"
            onClick={handleCloseDetails}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCloseDetails();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Close modal"
          />
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close-btn"
                onClick={handleCloseDetails}
                aria-label="Close course details"
              >
                ✕
              </button>
            </div>

            <div className="course-details">
              <div className="course-header">
                <div className="course-video">
                  <iframe
                    src={selectedCourse.videoUrl}
                    title={selectedCourse.title}
                    allowFullScreen
                    className="video-iframe"
                  />
                </div>
                <div className="course-info">
                  <h2>{selectedCourse.title}</h2>
                  <div className="course-meta">
                    <span className="level-badge">{selectedCourse.level}</span>
                    <span className="duration">
                      ⏱
                      {selectedCourse.duration}
                    </span>
                    <span className="price">{selectedCourse.price}</span>
                  </div>
                  <p className="instructor">
                    Instructor:&nbsp;
                    {selectedCourse.instructor}
                  </p>
                </div>
              </div>

              <div className="course-content-details">
                <div className="section">
                  <h3>About This Course</h3>
                  <p>{selectedCourse.description}</p>
                </div>

                <div className="section">
                  <h3>What You&apos;ll Learn</h3>
                  <ul className="outcomes-list">
                    {selectedCourse.outcomes.map((outcome) => (
                      <li key={`outcome-${selectedCourse.id}-${outcome.replace(/\s+/g, '-').toLowerCase()}`}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                <div className="section">
                  <h3>Course Modules</h3>
                  <ul className="modules-list">
                    {selectedCourse.modules.map((module, index) => (
                      <li key={`module-${selectedCourse.id}-${module.replace(/\s+/g, '-').toLowerCase()}`}>
                        <span className="module-number">{index + 1}</span>
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="section">
                  <h3>Requirements</h3>
                  <ul className="requirements-list">
                    {selectedCourse.requirements.map((req) => (
                      <li key={`requirement-${selectedCourse.id}-${req.replace(/\s+/g, '-').toLowerCase()}`}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="course-actions">
                  <button type="button" className="enroll-btn" onClick={() => handleEnroll(selectedCourse)}>
                    Enroll Now
                  </button>
                  <button type="button" className="back-btn" onClick={handleCloseDetails}>
                    Back to Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => handleCourseClick(course)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCourseClick(course);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="course-video-container">
                <div className="video-wrapper">
                  <iframe
                    src={course.videoUrl}
                    title={course.title}
                    allowFullScreen
                    className="video-iframe"
                  />
                </div>
                <div className="course-level">{course.level}</div>
              </div>

              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>

                <div className="course-meta-info">
                  <div className="meta-item">
                    <span className="meta-label">Duration:</span>
                    <span className="meta-value">{course.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Price:</span>
                    <span className="meta-value">{course.price}</span>
                  </div>
                </div>

                <div className="course-instructor">
                  <span className="instructor-label">Instructor:</span>
                  <span className="instructor-name">{course.instructor}</span>
                </div>

                <button type="button" className="view-details-btn">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
