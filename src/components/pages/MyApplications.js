/* eslint-disable no-underscore-dangle, no-nested-ternary, react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaCreditCard,
} from 'react-icons/fa';
import '../../styles/admin.css';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState(location.state?.message || '');

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [successMsg]);

  useEffect(() => {
    const fetchMyApplications = async () => {
      const userInfo = JSON.parse(localStorage.getItem('studentInfo') || localStorage.getItem('userInfo'));
      if (!userInfo) {
        navigate('/admission');
        return;
      }
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get('http://localhost:5000/api/applications/mine', config);
        setApplications(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch applications');
        setLoading(false);
      }
    };
    fetchMyApplications();
  }, [navigate]);

  const handlePay = (app) => {
    const student = JSON.parse(localStorage.getItem('studentInfo') || localStorage.getItem('userInfo'));
    navigate('/checkout', { state: { course: app.course, student, applicationId: app._id } });
  };

  return (
    <div className="container" style={{ paddingTop: '100px', maxWidth: '1000px', minHeight: '80vh' }}>
      <h1 style={{
        display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem',
      }}
      >
        <FaFileAlt color="#3b82f6" />
        {' '}
        My Applications
      </h1>

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

      {error && (
      <div
        className="error-message"
        style={{
          background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem',
        }}
      >
        {error}
      </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading applications...</div>
      ) : applications.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '4rem', background: '#f8fafc', borderRadius: '12px',
        }}
        >
          <h3 style={{ color: '#64748b' }}>No applications found.</h3>
          <button type="button" className="btn-primary" style={{ marginTop: '1rem', width: 'auto' }} onClick={() => navigate('/all-courses')}>Browse Courses</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {applications.map((app) => (
            <div
              key={app._id}
              className="admin-card"
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0,
              }}
            >
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <img
                  src={app.course?.image || '/images/default-course.jpg'}
                  alt={app.course?.title}
                  style={{
                    width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px',
                  }}
                />
                <div>
                  <h3>{app.course?.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    Applied on:
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>

                  {app.status === 'Pending' && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#f59e0b', background: '#fef3c7', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold',
                  }}
                  >
                    <FaHourglassHalf />
                    {' '}
                    Pending Review
                  </span>
                  )}
                  {app.status === 'Approved' && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#10b981', background: '#d1fae5', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold',
                  }}
                  >
                    <FaCheckCircle />
                    {' '}
                    Approved
                  </span>
                  )}
                  {app.status === 'Rejected' && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#ef4444', background: '#fee2e2', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold',
                  }}
                  >
                    <FaTimesCircle />
                    {' '}
                    Rejected
                  </span>
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>{app.course?.price}</h3>
                {app.status === 'Approved' && (
                  <button
                    type="button"
                    className="btn-primary"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', width: 'auto',
                    }}
                    onClick={() => handlePay(app)}
                  >
                    <FaCreditCard />
                    {' '}
                    Pay Now
                  </button>
                )}
                {app.status === 'Pending' && (
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{
                      padding: '0.5rem 1rem', width: 'auto', opacity: 0.6, cursor: 'not-allowed',
                    }}
                    disabled
                  >
                    Awaiting Approval
                  </button>
                )}
                {app.status === 'Rejected' && (
                  <button
                    type="button"
                    className="btn-danger"
                    style={{
                      padding: '0.5rem 1rem', width: 'auto', opacity: 0.6, cursor: 'not-allowed',
                    }}
                    disabled
                  >
                    Not Approved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;

