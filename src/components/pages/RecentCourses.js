import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import coursesData from '../data/coursesData';
import '../styles/recentCourses.css';

// ResizeObserver error handling utility
const handleResizeObserverError = () => {
  const resizeObserverErrHandler = (error) => {
    if (error.message && error.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      // Ignore this specific error - it's harmless

    }
    // Removed console.error for ESLint compliance
  };

  window.addEventListener('error', resizeObserverErrHandler);
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && event.reason.message.includes('ResizeObserver loop')) {
      event.preventDefault();
    }
  });
};

const RecentCourses = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    handleResizeObserverError();
  }, []);

  // Get first 6 courses for recent courses display
  const courses = coursesData.slice(0, 6);

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
    <section className="recent-courses">
      <div className="courses-container">
        <h1 className="courses-heading">Highlighted Courses to Discover</h1>
        <div className="course-view">
          <p className="courses-subtitle">Explore our latest professional development programs</p>
          <button type="button" onClick={() => navigate('/all-courses')}>See All Courses</button>
        </div>
        <div className="courses-slider-container">
          <div className="grid-card">
            {courses.map((course) => (
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
                  <span className="course-duration">
                    ⏱
                    {course.duration}
                  </span>
                  <button
                    type="button"
                    className="view-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedCourse && (
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
            <button type="button" className="close-btn" onClick={handleCloseDetails}>×</button>

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
      )}
    </section>
  );
};

export default RecentCourses;
