import React, { useEffect, useState } from 'react';
import {
  useNavigate, NavLink, Outlet, useLocation,
} from 'react-router-dom';
import '../../styles/admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user || !user.isAdmin) {
      navigate('/admin/login');
    } else {
      setUserInfo(user);
    }
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/admin/login');
  };

  if (!userInfo) {
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
              <strong>{userInfo.name}</strong>
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
                  <span className="value">12</span>
                </div>
                <div className="stat-card">
                  <span className="label">Total Sales</span>
                  <span className="value">$4,250</span>
                </div>
                <div className="stat-card">
                  <span className="label">Pending Orders</span>
                  <span className="value">5</span>
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
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
