/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, getImgUrl } from '../../apiConfig';
import '../styles/allCourses.css';
// import Intro from './Intro';

const AllCourses = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [userInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));

  useEffect(() => {
    const handleAuthChange = () => {
      const stored = localStorage.getItem('userInfo');
      if (stored) {
        fetchUserHistory(JSON.parse(stored));
      }
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/courses`);
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchCourses();
    const currentInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (currentInfo) {
      fetchUserHistory(currentInfo);
    }

    // Deep linking logic
    const queryParams = new URLSearchParams(window.location.search);
    const courseId = queryParams.get('id');
    if (courseId && courses.length > 0) {
      const course = courses.find(c => c._id === courseId);
      if (course) setSelectedCourse(course);
    }
  }, [courses.length]); // Re-run when courses are loaded

  const fetchUserHistory = async (info) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${info.token}` },
      };
      const [apps, orders] = await Promise.all([
        axios.get(`${API_URL}/applications/mine`, config),
        axios.get(`${API_URL}/orders/mine`, config),
      ]);
      setUserApplications(apps.data);
      setUserOrders(orders.data);
    } catch (err) {
      console.error('History fetch error:', err);
    }
  };

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

  const getCourseStatus = (courseId) => {
    const order = userOrders.find((o) => o.orderItems.some((item) => item.course === courseId));
    if (order) return { label: 'Enrolled', action: 'portal', color: '#10b981' };

    const app = userApplications.find((a) => a.course?._id === courseId || a.course === courseId);
    if (app) {
      if (app.status === 'Approved') return { label: 'Pay to Enroll', action: 'checkout', color: '#3b82f6', app };
      if (app.status === 'Pending') return { label: 'Review Pending', action: 'portal', color: '#f59e0b' };
    }
    return { label: 'Enroll Now', action: 'enroll', color: '#0f172a' };
  };

  const handleEnroll = (course) => {
    const status = getCourseStatus(course._id);
    if (status.action === 'portal') {
      navigate('/portal');
    } else if (status.action === 'checkout') {
      localStorage.setItem('lastViewedCourse', JSON.stringify(course));
      navigate('/checkout', { state: { course, student: userInfo, applicationId: status.app?._id } });
    } else {
      localStorage.setItem('lastViewedCourse', JSON.stringify(course));
      navigate('/admission', { state: { course } });
    }
  };

  return (
    <div className="all-courses-page">
      {/* <Intro
        heading="All Professional Courses"
      /> */}

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
                  <img
                    src={getImgUrl(selectedCourse.image)}
                    alt={selectedCourse.title}
                    style={{
                      width: `${100}%`, height: `${100}%`, objectFit: 'cover',
                    }}
                    onError={(e) => { e.target.src = '/images/sample.jpg'; }}
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
                    {selectedCourse.outcomes && selectedCourse.outcomes.map((outcome) => (
                      <li key={`outcome-${selectedCourse._id}-${outcome.replace(/\s+/g, '-').toLowerCase()}`}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                <div className="section">
                  <h3>Course Modules</h3>
                  <ul className="modules-list">
                    {selectedCourse.modules && selectedCourse.modules.map((module, index) => (
                      <li key={`module-${selectedCourse._id}-${module.replace(/\s+/g, '-').toLowerCase()}`}>
                        <span className="module-number">{index + 1}</span>
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="section">
                  <h3>Requirements</h3>
                  <ul className="requirements-list">
                    {selectedCourse.requirements && selectedCourse.requirements.map((req) => (
                      <li key={`requirement-${selectedCourse._id}-${req.replace(/\s+/g, '-').toLowerCase()}`}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="course-actions">
                  <button
                    type="button"
                    className="enroll-btn"
                    onClick={() => handleEnroll(selectedCourse)}
                    style={{ background: getCourseStatus(selectedCourse._id).color }}
                  >
                    {getCourseStatus(selectedCourse._id).label}
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
              key={course._id}
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
                  <img
                    src={getImgUrl(course.image)}
                    alt={course.title}
                    style={{
                      position: 'absolute', top: 0, left: 0, width: `${100}%`, height: `${100}%`, objectFit: 'cover',
                    }}
                    onError={(e) => { e.target.src = '/images/sample.jpg'; }}
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

                <button
                  type="button"
                  className="view-details-btn"
                  onClick={(e) => { e.stopPropagation(); handleEnroll(course); }}
                  style={{ 
                    background: getCourseStatus(course._id).action === 'enroll' ? '#3b82f6' : getCourseStatus(course._id).color,
                    color: 'white'
                  }}
                >
                  {getCourseStatus(course._id).label}
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
