/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaPlus, FaTrash, FaUserTie, FaUserGraduate, FaChalkboardTeacher,
} from 'react-icons/fa';
import '../../styles/admin.css';

const ContentManager = () => {
  const navigate = useNavigate();
  // Filtered dropdown to only include manageable dynamic pages
  const [pages] = useState(['news', 'our-team', 'testimonies', 'faq']);
  const [selectedPage, setSelectedPage] = useState('news');
  const [sections, setSections] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Tab management for Team page
  const [activeTeamTab, setActiveTeamTab] = useState('staff');

  const fetchContent = async (page) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:5000/api/content/${page}`);
      setSections(data.sections || []);
      setLoading(false);
    } catch (err) {
      setSections([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user || !user.isAdmin) {
      navigate('/admin/login');
    } else {
      fetchContent(selectedPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPage, navigate]);

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleStructuredChange = (index, key, value) => {
    const newSections = [...sections];
    const currentData = JSON.parse(newSections[index].content || '{}');
    currentData[key] = value;
    newSections[index].content = JSON.stringify(currentData);
    setSections(newSections);
  };

  const addItem = (type = '') => {
    const timestamp = Date.now();
    const newSection = {
      key: `${selectedPage}_${timestamp}`,
      content: '',
      image: '',
    };

    if (selectedPage === 'news') {
      newSection.content = JSON.stringify({ title: 'New Event', date: 'Date', info: 'Details' });
      newSection.image = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb';
    } else if (selectedPage === 'faq') {
      newSection.content = JSON.stringify({ question: 'New Question', answer: 'New Answer' });
    } else if (selectedPage === 'testimonies') {
      newSection.content = JSON.stringify({ name: 'Student Name', rating: 5, description: 'Success story' });
      newSection.image = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2';
    } else if (selectedPage === 'our-team') {
      const teamType = type || activeTeamTab;
      newSection.key = `${teamType}_${timestamp}`;
      newSection.content = JSON.stringify({ name: 'Member Name', position: 'Title', bio: 'Biography details' });
      newSection.image = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2';
    }

    // ADD TO TOP (unshift)
    setSections([newSection, ...sections]);
  };

  const removeItem = (index) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Delete this item permanently?')) {
      const newSections = sections.filter((_, i) => i !== index);
      setSections(newSections);
    }
  };

  const uploadFileHandler = async (e, index) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
      handleSectionChange(index, 'image', `http://localhost:5000${data}`);
      setUploading(false);
    } catch (err) {
      setError('File upload failed. Please try again.');
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        'http://localhost:5000/api/content',
        { page: selectedPage, sections },
        config,
      );
      setMessage('Updates published successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Connection error. Could not save changes.');
    }
  };

  const filteredSections = selectedPage === 'our-team'
    ? sections.filter((s) => s.key.startsWith(activeTeamTab) || (activeTeamTab === 'ceo' && s.key === 'ceo'))
    : sections;

  const renderSectionFields = (section, originalIndex) => {
    let data = {};
    try {
      data = JSON.parse(section.content || '{}');
    } catch (e) {
      return (
        <div className="form-group">
          <label>Raw Data (Fix JSON)</label>
          <textarea className="form-control" value={section.content} onChange={(e) => handleSectionChange(originalIndex, 'content', e.target.value)} />
        </div>
      );
    }

    return (
      <div className="structured-fields">
        {selectedPage === 'news' && (
          <>
            <div className="form-group">
              <label>Headline</label>
              <input type="text" className="form-control" value={data.title || ''} onChange={(e) => handleStructuredChange(originalIndex, 'title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input type="text" className="form-control" value={data.date || ''} onChange={(e) => handleStructuredChange(originalIndex, 'date', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" rows="3" value={data.info || ''} onChange={(e) => handleStructuredChange(originalIndex, 'info', e.target.value)} />
            </div>
          </>
        )}

        {selectedPage === 'faq' && (
          <>
            <div className="form-group">
              <label>Question</label>
              <input type="text" className="form-control" value={data.question || ''} onChange={(e) => handleStructuredChange(originalIndex, 'question', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Answer</label>
              <textarea className="form-control" rows="3" value={data.answer || ''} onChange={(e) => handleStructuredChange(originalIndex, 'answer', e.target.value)} />
            </div>
          </>
        )}

        {selectedPage === 'testimonies' && (
          <>
            <div className="form-group">
              <label>Student Name</label>
              <input type="text" className="form-control" value={data.name || ''} onChange={(e) => handleStructuredChange(originalIndex, 'name', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <select className="form-control" value={data.rating || 5} onChange={(e) => handleStructuredChange(originalIndex, 'rating', parseInt(e.target.value, 10))}>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n}
                    {' '}
                    Stars
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Testimony</label>
              <textarea className="form-control" rows="3" value={data.description || ''} onChange={(e) => handleStructuredChange(originalIndex, 'description', e.target.value)} />
            </div>
          </>
        )}

        {selectedPage === 'our-team' && (
          <>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" value={data.name || ''} onChange={(e) => handleStructuredChange(originalIndex, 'name', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input type="text" className="form-control" value={data.position || ''} onChange={(e) => handleStructuredChange(originalIndex, 'position', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Full Bio</label>
              <textarea className="form-control" rows="5" value={data.bio || ''} onChange={(e) => handleStructuredChange(originalIndex, 'bio', e.target.value)} />
            </div>
          </>
        )}

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Photo</label>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="text"
              className="form-control"
              value={section.image || ''}
              onChange={(e) => handleSectionChange(originalIndex, 'image', e.target.value)}
              placeholder="https://..."
              style={{ flex: 1 }}
            />
            <input
              type="file"
              id={`file-upload-${originalIndex}`}
              style={{ display: 'none' }}
              onChange={(e) => uploadFileHandler(e, originalIndex)}
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={() => document.getElementById(`file-upload-${originalIndex}`).click()}
              style={{
                width: 'auto', padding: '0.6rem 1.2rem', whiteSpace: 'nowrap', fontSize: '0.85rem',
              }}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="content-manager-page">
      <div className="cms-header" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a' }}>Professional CMS</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Enterprise-grade control over your website assets.</p>
      </div>

      <div className="cms-controls" style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
        <div className="admin-card" style={{ flex: '1', margin: 0 }}>
          <label style={{
            display: 'block', marginBottom: '0.75rem', fontWeight: '700', color: '#1e293b',
          }}
          >
            Module Selector
          </label>
          <select
            className="form-control"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            style={{
              padding: '0.75rem', borderRadius: '12px', border: '2px solid #e2e8f0', cursor: 'pointer',
            }}
          >
            {pages.map((page) => (
              <option key={page} value={page}>
                {page.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <div
          className="admin-card"
          style={{
            flex: '1', margin: 0, display: 'flex', alignItems: 'flex-end',
          }}
        >
          <button
            type="button"
            className="btn-primary"
            onClick={() => addItem()}
            style={{
              width: '100%', padding: '1rem', background: '#0f172a', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem',
            }}
          >
            <FaPlus />
            {' '}
            Add New
            {selectedPage === 'our-team' ? activeTeamTab.toUpperCase() : 'ENTRY'}
          </button>
        </div>
      </div>

      {selectedPage === 'our-team' && (
        <div
          className="team-tabs"
          style={{
            display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: '#f1f5f9', padding: '0.5rem', borderRadius: '12px',
          }}
        >
          {[
            { id: 'ceo', label: 'CEO', icon: <FaUserTie /> },
            { id: 'staff', label: 'Staff', icon: <FaUserGraduate /> },
            { id: 'mentor', label: 'Mentors', icon: <FaChalkboardTeacher /> },
            { id: 'instructor', label: 'Instructors', icon: <FaChalkboardTeacher /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTeamTab(tab.id)}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                borderRadius: '8px',
                background: activeTeamTab === tab.id ? '#fff' : 'transparent',
                color: activeTeamTab === tab.id ? '#3b82f6' : '#64748b',
                boxShadow: activeTeamTab === tab.id ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
              }}
            >
              {tab.icon}
              {' '}
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {message && (
        <div
          className="success-message"
          style={{
            background: '#dcfce7', color: '#166534', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem', fontWeight: '600',
          }}
        >
          {message}
        </div>
      )}
      {error && (
        <div
          className="error-message"
          style={{
            background: '#fee2e2', color: '#991b1b', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem', fontWeight: '600',
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Initializing secure connection...</div>
      ) : (
        <form onSubmit={submitHandler}>
          <div className="sections-list" style={{ display: 'grid', gap: '1.5rem' }}>
            {filteredSections.map((section) => {
              const originalIndex = sections.findIndex((s) => s.key === section.key);
              return (
                <div
                  key={section.key}
                  className="admin-card"
                  style={{
                    margin: 0,
                    position: 'relative',
                    borderTop: '5px solid #3b82f6',
                    animation: 'slideIn 0.3s ease-out',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => removeItem(originalIndex)}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FaTrash />
                  </button>
                  {renderSectionFields(section, originalIndex)}
                </div>
              );
            })}
          </div>

          <div style={{
            position: 'sticky', bottom: '2rem', marginTop: '4rem', zIndex: 100, display: 'flex', justifyContent: 'flex-end',
          }}
          >
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: 'auto',
                minWidth: '250px',
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                background: '#0f172a', // Darker, more professional color
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.3)',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#334155'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = '#0f172a'; e.currentTarget.style.transform = 'translateY(0)'; }}
              onFocus={(e) => { e.currentTarget.style.background = '#334155'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onBlur={(e) => { e.currentTarget.style.background = '#0f172a'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Publish All Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContentManager;
