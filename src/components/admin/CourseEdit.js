/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL, getImgUrl } from '../../apiConfig';
import '../../styles/admin.css';

const CourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [duration, setDuration] = useState('');
  const [mode, setMode] = useState('Online');
  const [zoomLink, setZoomLink] = useState('');
  const [location, setLocation] = useState('');
  const [uploading, setUploading] = useState(false);
  // const [videoUrl, setVideoUrl] = useState(''); // Removed in favor of images

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

  useEffect(() => {
    if (!adminInfo || !adminInfo.isAdmin) {
      navigate('/admin/login');
      return;
    }

    const fetchCourse = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/courses/${id}`);
        if (data) {
          setTitle(data.title);
          setPrice(data.price);
          setImage(data.image);
          setDescription(data.description);
          setInstructor(data.instructor);
          setDuration(data.duration);
          setMode(data.mode);
          setZoomLink(data.zoomLink || '');
          setLocation(data.location || '');
          // setVideoUrl(data.videoUrl || '');
        }
        setLoading(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Fetch error:', err);
        setError('Failed to load course details. Please verify your connection or refresh.');
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, navigate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Maximum size is 5MB.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.post(`${API_URL}/upload`, formData, config);
      setImage(data);
      setUploading(false);
      setError('');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      const msg = err.response?.data?.message || err.message || 'File upload failed.';
      setError(`Upload failed: ${msg}`);
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      await axios.put(
        `${API_URL}/courses/${id}`,
        {
          title,
          price,
          image,
          description,
          instructor,
          duration,
          mode,
          zoomLink,
          location,
          // videoUrl,
        },
        config,
      );

      navigate('/admin/courses', { state: { message: 'Course Updated Successfully' } });
    } catch (err) {
      setError('Error updating course');
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading course data...</div>;

  return (
    <div className="admin-edit-page">
      <div style={{
        marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem',
      }}
      >
        <button type="button" onClick={() => navigate('/admin/courses')} className="btn-secondary btn-sm">
          ← Back
        </button>
        <h1>Edit Course</h1>
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
      <form onSubmit={submitHandler} className="admin-card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="form-section">
            <h3>Basic Information</h3>
            <hr style={{ margin: '1rem 0', opacity: 0.1 }} />

            <div className="form-group">
              <label htmlFor="title">Course Title</label>
              <input id="title" type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (USD)</label>
              <input id="price" type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="instructor">Instructor Name</label>
              <input id="instructor" type="text" className="form-control" value={instructor} onChange={(e) => setInstructor(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Course Duration (e.g., 4 Weeks)</label>
              <input id="duration" type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} required />
            </div>
          </div>

          <div className="form-section">
            <h3>Media & Logistics</h3>
            <hr style={{ margin: '1rem 0', opacity: 0.1 }} />

            <div className="form-group">
              <label>Course Preview Image</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input type="file" id="image-file" style={{ display: 'none' }} onChange={uploadFileHandler} accept="image/*" />
                <button type="button" className="btn-secondary btn-sm" onClick={() => document.getElementById('image-file').click()}>
                  {uploading ? 'Uploading...' : 'Change Image'}
                </button>
                {image && <span style={{ color: '#10b981', fontSize: '0.8rem' }}>✓ Image Ready</span>}
              </div>
              {image && (
                <div style={{ marginTop: '1rem' }}>
                  <img
                    src={getImgUrl(image)}
                    alt="Preview"
                    style={{
                      width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px',
                    }}
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mode">Delivery Mode</label>
              <select id="mode" className="form-control" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="Online">Online (Zoom)</option>
                <option value="In-person">In-person (Location)</option>
              </select>
            </div>

            {mode === 'Online' ? (
              <div className="form-group">
                <label htmlFor="zoomLink">Zoom Meeting Link</label>
                <input id="zoomLink" type="text" className="form-control" value={zoomLink} onChange={(e) => setZoomLink(e.target.value)} placeholder="Zoom URL" />
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>This link is sent to students after payment.</p>
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="location">Physical Location</label>
                <input id="location" type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Address" />
              </div>
            )}
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '1.5rem' }}>
          <label htmlFor="description">Full Course Description</label>
          <textarea id="description" className="form-control" rows="8" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div style={{
          display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '2rem',
        }}
        >
          <button type="button" className="btn-secondary" onClick={() => navigate('/admin/courses')}>Cancel</button>
          <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Update Course Details</button>
        </div>
      </form>
    </div>
  );
};

export default CourseEdit;
