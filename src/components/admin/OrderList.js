/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaHistory } from 'react-icons/fa';
import { API_URL, getImgUrl } from '../../apiConfig';
import '../../styles/admin.css';

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
      if (!adminInfo || !adminInfo.isAdmin) {
        navigate('/admin/login');
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`,
          },
        };
        const { data } = await axios.get(`${API_URL}/orders`, config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch enrollment history.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Synchronizing enrollment records...</div>;

  return (
    <div className="order-list-page">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FaHistory />
          {' '}
          Enrollment History
        </h1>
        <p style={{ color: '#64748b' }}>Track student payments and manage course access.</p>
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

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                  No enrollments found yet. Once students pay via Stripe, they will appear here.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <div style={{ fontWeight: '700', color: '#1e293b' }}>{order.user?.name || 'Guest'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{order.user?.email || order.paymentResult?.email_address}</div>
                  </td>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img 
                      src={getImgUrl(order.orderItems[0]?.image)} 
                      alt="Course" 
                      style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover', background: '#f8fafc' }} 
                      onError={(e) => e.target.src = '/images/default-course.jpg'}
                    />
                    <div>
                      <div style={{ fontWeight: '600' }}>{order.orderItems[0]?.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        ID:
                        {order.orderItems[0]?.course}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${order.isPaid ? 'badge-success' : 'badge-danger'}`} style={{ padding: '0.4rem 0.8rem', borderRadius: '99px' }}>
                      {order.isPaid ? 'PAID' : 'PENDING'}
                    </span>
                  </td>
                  <td style={{ fontWeight: '700', color: '#3b82f6' }}>
                    $
                    {order.totalPrice.toFixed(2)}
                  </td>
                  <td style={{ fontSize: '0.9rem' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        type="button"
                        className="btn-secondary btn-sm"
                        onClick={() => navigate(`/admin/orders/${order._id}/contact`)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.75rem',
                        }}
                        title="Send Materials / Email"
                      >
                        <FaEnvelope />
                        {' '}
                        Contact
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
