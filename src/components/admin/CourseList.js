/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../styles/admin.css';

const CourseList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(location.state?.message || '');

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [successMsg]);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/courses');
      setCourses(data);
      setLoading(false);
    } catch (err) {
      setError(`Error fetching courses. ${err.response?.data?.message || err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user || !user.isAdmin) {
      navigate('/admin/login');
    } else {
      fetchCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const deleteHandler = async (id) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`http://localhost:5000/api/courses/${id}`, config);
        setCourses((prevCourses) => prevCourses.filter((c) => c._id !== id));
        setSuccessMsg('Course deleted successfully');
      } catch (err) {
        setError('Error deleting course');
      }
    }
  };

  const createCourseHandler = () => {
    navigate('/admin/course/create');
  };

  return (
    <div className="course-list-page">
      <div
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem',
        }}
      >
        <div>
          <h1>Manage Courses</h1>
          <p style={{ color: '#64748b' }}>Add, edit, or remove courses from your directory.</p>
        </div>
        <button type="button" className="btn-primary" onClick={createCourseHandler}>
          + Create New Course
        </button>
      </div>

      {error && (
        <div
          className="error-message"
          style={{
            background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem',
          }}
        >
          <strong>Error:</strong>
          {' '}
          {error}
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            Hint: Ensure your IP is whitelisted in MongoDB Atlas and the backend is running.
          </div>
        </div>
      )}

      {successMsg && (
        <div
          className="success-message"
          style={{
            background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem',
          }}
        >
          {successMsg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading courses...</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Course Info</th>
                <th>Pricing</th>
                <th>Mode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    No courses found. Click &quot;Create New Course&quot; to get started.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>{course.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        ID:
                        {course._id}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: '600' }}>
                        $
                        {course.price}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${course.mode === 'Online' ? 'badge-info' : 'badge-success'}`}>
                        {course.mode}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn-secondary btn-sm"
                          onClick={() => navigate(`/admin/course/${course._id}/edit`)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-danger btn-sm"
                          onClick={() => deleteHandler(course._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseList;
