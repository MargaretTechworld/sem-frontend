import React, { useEffect, useState } from 'react';
import {
  useNavigate, NavLink, Outlet, useLocation,
} from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../apiConfig';
import '../../styles/admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminInfo, setAdminInfo] = useState(null);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalSales: 0,
    pendingApplications: 0,
    totalStudents: 0,
    recentApplications: [],
    recentOrders: [],
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchStats = async (token) => {
    try {
      setStatsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${API_URL}/orders/stats`, config);
      setStats(data);
      setStatsLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('adminInfo'));
    if (!user || !user.isAdmin) {
      navigate('/admin/login');
    } else {
      setAdminInfo(user);
      fetchStats(user.token);
    }
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  if (!adminInfo) {
    return null;
  }

  // Helper to determine active link
  const getActiveClass = (path) => (location.pathname === path ? 'active' : '');

  return (
    <div className="admin-container">
      {/* Sidebar Overlay for Mobile could go here */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          TOVAAH ADMIN
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className={getActiveClass('/admin/dashboard')}>
            <span>📊</span>
            {' '}
            Dashboard
          </NavLink>
          <NavLink to="/admin/courses" className={getActiveClass('/admin/courses')}>
            <span>📚</span>
            {' '}
            Manage Courses
          </NavLink>
          <NavLink to="/admin/content" className={getActiveClass('/admin/content')}>
            <span>✏️</span>
            {' '}
            Web Content
          </NavLink>
          <NavLink to="/admin/applications" className={getActiveClass('/admin/applications')}>
            <span>📄</span>
            {' '}
            Applications
          </NavLink>
          <NavLink to="/admin/orders" className={getActiveClass('/admin/orders')}>
            <span>💰</span>
            {' '}
            Order History
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button
            type="button"
            onClick={logoutHandler}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <span>🚪</span>
            {' '}
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h2>{location.pathname.split('/').pop().toUpperCase()}</h2>
          </div>
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Logged in as:
              {' '}
              <strong>{adminInfo.name}</strong>
            </span>
          </div>
        </header>

        <section className="admin-content">
          <Outlet />
          {location.pathname === '/admin/dashboard' && (
            <div>
              <div className="dashboard-grid">
                <div className="stat-card">
                  <span className="label">Total Courses</span>
                  <span className="value">{statsLoading ? '...' : stats.totalCourses}</span>
                </div>
                <div className="stat-card">
                  <span className="label">Total Students</span>
                  <span className="value">{statsLoading ? '...' : stats.totalStudents}</span>
                </div>
                <div className="stat-card">
                  <span className="label">Total Sales</span>
                  <span className="value">
                    {statsLoading ? '...' : `$${stats.totalSales.toLocaleString()}`}
                  </span>
                </div>
                <div className="stat-card">
                  <span className="label">Pending Applications</span>
                  <span className="value">{statsLoading ? '...' : stats.pendingApplications}</span>
                </div>
              </div>
              <div className="admin-card">
                <h3>Admin Quick Actions</h3>
                <p style={{ margin: '1rem 0', color: '#64748b' }}>
                  Manage your platform&apos;s courses, dynamic website content, and track customer orders from the sidebar menu.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" className="btn-primary" onClick={() => navigate('/admin/course/create')}>+ New Course</button>
                  <button type="button" className="btn-secondary" onClick={() => navigate('/admin/applications')}>Review Applications</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                {/* Recent Applications */}
                <div className="admin-card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Recent Applications
                    <button className="btn-secondary btn-sm" onClick={() => navigate('/admin/applications')}>View All</button>
                  </h3>
                  <div className="admin-table-container shadow-sm" style={{ boxShadow: 'none', border: '1px solid #f1f5f9' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Course</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentApplications?.map(app => (
                          <tr key={app._id}>
                            <td style={{ fontSize: '0.85rem' }}>{app.user?.name}</td>
                            <td style={{ fontSize: '0.85rem' }}>{app.course?.title}</td>
                            <td>
                              <span className={`badge badge-sm ${app.status === 'Approved' ? 'badge-success' : app.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {stats.recentApplications?.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', padding: '1rem' }}>No recent apps</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="admin-card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Recent Orders
                    <button className="btn-secondary btn-sm" onClick={() => navigate('/admin/orders')}>View All</button>
                  </h3>
                  <div className="admin-table-container shadow-sm" style={{ boxShadow: 'none', border: '1px solid #f1f5f9' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Amount</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentOrders?.map(order => (
                          <tr key={order._id}>
                            <td style={{ fontSize: '0.85rem' }}>{order.user?.name}</td>
                            <td style={{ fontSize: '0.85rem' }}>${order.totalPrice.toLocaleString()}</td>
                            <td style={{ fontSize: '0.85rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                        {stats.recentOrders?.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', padding: '1rem' }}>No recent orders</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
