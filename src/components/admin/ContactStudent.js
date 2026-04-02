/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPaperPlane, FaPaperclip, FaUserGraduate } from 'react-icons/fa';
import { API_URL } from '../../apiConfig';
import '../../styles/admin.css';

const ContactStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
      if (!adminInfo) {
        navigate('/admin/login');
        return;
      }
      try {
        const config = {
          headers: { Authorization: `Bearer ${adminInfo.token}` },
        };
        const { data } = await axios.get(`${API_URL}/orders/${id}`, config);
        setOrder(data);
        setSubject(`Materials for ${data.orderItems[0].title}`);
        setMessage(`Hello ${data.user.name},\n\nThank you for enrolling in ${data.orderItems[0].title}. Please find the attached course materials below.\n\nBest regards,\nTovaah Consulting Team`);
      } catch (err) {
        setError('Failed to load student details.');
      }
    };
    fetchOrder();
  }, [id]);

  const sendHandler = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      await axios.post(`${API_URL}/orders/contact`, {
        email: order.user.email,
        subject,
        message: message.replace(/\n/g, '<br>'),
        attachments: [], // Future: Add logic for file uploads
      }, config);

      setSending(false);
      navigate('/admin/orders', { state: { message: 'Email sent successfully!' } });
    } catch (err) {
      setError('Failed to send email. Check backend connection.');
      setSending(false);
    }
  };

  if (!order && !error) return null;

  return (
    <div className="contact-student-page">
      <div style={{
        marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem',
      }}
      >
        <button type="button" onClick={() => navigate('/admin/orders')} className="btn-secondary btn-sm">← Back to History</button>
        <h1>
          <FaUserGraduate />
          {' '}
          Contact Student
        </h1>
      </div>

      {error && (
        <div
          className="error-message"
          style={{
            background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '12px', marginBottom: '2rem',
          }}
        >
          {error}
        </div>
      )}
      <div className="admin-card" style={{ maxWidth: '800px' }}>
        <div style={{
          marginBottom: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px',
        }}
        >
          <div style={{ fontWeight: '700' }}>
            To:
            {order?.user?.name}
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{order?.user?.email}</div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            Course:
            <strong>{order?.orderItems[0]?.title}</strong>
          </div>
        </div>

        <form onSubmit={sendHandler}>
          <div className="form-group">
            <label htmlFor="subject">
              Subject
              <input
                id="subject"
                type="text"
                className="form-control"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Message Body (Email Content)
              <textarea
                id="message"
                className="form-control"
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-group">
            <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
              <FaPaperclip />
              {' '}
              Attachments (Coming Soon)
            </span>
            <div
              style={{
                padding: '2rem', border: '2px dashed #e2e8f0', borderRadius: '12px', textAlign: 'center', color: '#94a3b8',
              }}
            >
              File upload will be available here to send PDFs, Notes, etc.
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={sending}
            style={{
              width: 'auto', padding: '1rem 3rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '2rem',
            }}
          >
            {sending ? 'Sending...' : 'Send Email Now'}
            {' '}
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactStudent;
