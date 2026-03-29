/* eslint-disable jsx-a11y/label-has-associated-control, no-alert, no-nested-ternary, no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaEye, FaCheck, FaTimes, FaFileDownload,
} from 'react-icons/fa';
import '../../styles/admin.css';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchApplications = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/applications', config);
      setApplications(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching applications');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (status) => {
    setUpdateLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`http://localhost:5000/api/applications/${selectedApp._id}`, { status, remarks }, config);
      setSelectedApp(null);
      setRemarks('');
      fetchApplications();
    } catch (err) {
      alert('Error updating status');
    }
    setUpdateLoading(false);
  };

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading applications...</div>;

  return (
    <div className="admin-applications-page">
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem',
      }}
      >
        <div>
          <h1>Review Applications</h1>
          <p style={{ color: '#64748b' }}>Approve or reject student applications for courses.</p>
        </div>
      </div>

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

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Course</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>
                  <div style={{ fontWeight: '600' }}>{app.personalInfo?.fullName || 'N/A'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{app.personalInfo?.email}</div>
                </td>
                <td>{app.course?.title}</td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${app.status === 'Approved' ? 'badge-success' : app.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <button type="button" className="btn-secondary btn-sm" onClick={() => setSelectedApp(app)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaEye />
                    {' '}
                    Review
                  </button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No applications found.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <div
            className="admin-card"
            style={{
              width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedApp(null)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer',
              }}
            >
              &times;
            </button>
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Application Review</h2>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem',
            }}
            >
              <div>
                <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>Personal Info</h4>
                <p>
                  <strong>Name:</strong>
                  {' '}
                  {selectedApp.personalInfo?.fullName}
                </p>
                <p>
                  <strong>Email:</strong>
                  {' '}
                  {selectedApp.personalInfo?.email}
                </p>
                <p>
                  <strong>Phone:</strong>
                  {' '}
                  {selectedApp.personalInfo?.phoneNumber}
                </p>
                <p>
                  <strong>Location:</strong>
                  {' '}
                  {selectedApp.personalInfo?.city}
                  ,
                  {' '}
                  {selectedApp.personalInfo?.country}
                </p>
              </div>
              <div>
                <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>Educational Background</h4>
                <p>
                  <strong>Level:</strong>
                  {' '}
                  {selectedApp.educationalBackground?.highestLevel}
                </p>
                <p>
                  <strong>Field:</strong>
                  {' '}
                  {selectedApp.educationalBackground?.fieldOfStudy}
                </p>
                <p>
                  <strong>Institution:</strong>
                  {' '}
                  {selectedApp.educationalBackground?.institution}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>Motivation & Goals</h4>
              <p>
                <strong>Why interested:</strong>
                {' '}
                {selectedApp.motivation?.interestReason}
              </p>
              <p>
                <strong>Goals:</strong>
                {' '}
                {selectedApp.motivation?.goals}
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>Uploaded Documents</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {selectedApp.documents?.idCard && (
                <a href={selectedApp.documents.idCard} target="_blank" rel="noreferrer" className="btn-secondary btn-sm">
                  <FaFileDownload />
                  {' '}
                  ID Card
                </a>
                )}
                {selectedApp.documents?.academicCertificates && (
                <a href={selectedApp.documents.academicCertificates} target="_blank" rel="noreferrer" className="btn-secondary btn-sm">
                  <FaFileDownload />
                  {' '}
                  Certificates
                </a>
                )}
                {selectedApp.documents?.resume && (
                <a href={selectedApp.documents.resume} target="_blank" rel="noreferrer" className="btn-secondary btn-sm">
                  <FaFileDownload />
                  {' '}
                  Resume
                </a>
                )}
              </div>
            </div>

            <div style={{
              background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem',
            }}
            >
              <h4 style={{ marginBottom: '1rem' }}>Admin Decision</h4>
              <div className="form-group">
                <label>Remarks / Notes to Student (Optional)</label>
                <textarea className="form-control" rows="3" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Provide feedback..." />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    background: '#10b981', display: 'flex', alignItems: 'center', gap: '5px',
                  }}
                  onClick={() => handleUpdateStatus('Approved')}
                  disabled={updateLoading}
                >
                  <FaCheck />
                  {' '}
                  Approve Application
                </button>
                <button type="button" className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => handleUpdateStatus('Rejected')} disabled={updateLoading}>
                  <FaTimes />
                  {' '}
                  Reject Application
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
