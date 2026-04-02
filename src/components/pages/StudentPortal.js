import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaUser, FaFileAlt, FaGraduationCap, FaCheckCircle, FaHourglassHalf, 
  FaTimesCircle, FaCreditCard, FaChalkboardTeacher, FaThLarge, FaSignOutAlt, FaSearch,
  FaChevronRight, FaTimes, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaBriefcase, FaUserGraduate
} from 'react-icons/fa';
import { API_URL, getImgUrl } from '../../apiConfig';
import '../../styles/portal.css';

const StudentPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [portalData, setPortalData] = useState({ applications: [], orders: [] });
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchInProgress = React.useRef(false);
  const [userInfo, setUserInfo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('userInfo'));
    } catch (e) {
      return null;
    }
  });
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // If no user info on mount, redirect to home
    if (!localStorage.getItem('userInfo')) {
      navigate('/');
      return;
    }

    const handleAuthChange = () => {
      const stored = localStorage.getItem('userInfo');
      if (!stored) {
        navigate('/');
        return;
      }
      
      const updatedInfo = JSON.parse(stored);
      setUserInfo(prev => {
        // Only update if critical info changed to prevent re-fetch loops
        if (prev?.token === updatedInfo?.token && prev?._id === updatedInfo?._id) return prev;
        return updatedInfo;
      });
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, [navigate]);

  useEffect(() => {
    if (!userInfo?.token) return;

    let isMounted = true;
    
    // Safety timer started immediately on every identity change
    const safetyTimer = setTimeout(() => {
      if (isMounted) {
        setDataLoading(false);
        setError('Connection slow. The backend might be waking up. Please wait or refresh.');
      }
    }, 15000);

    const fetchData = async () => {
      setDataLoading(true);
      setError('');
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
          timeout: 12000, 
        };
        
        const [appsRes, ordersRes] = await Promise.all([
          axios.get(`${API_URL}/applications/mine`, config),
          axios.get(`${API_URL}/orders/mine`, config)
        ]);

        if (isMounted) {
          setPortalData({
            applications: appsRes.data,
            orders: ordersRes.data
          });
        }
      } catch (err) {
        if (isMounted) {
          console.error('Portal data error:', err);
          setError(err.code === 'ECONNABORTED' ? 'Backend response took too long.' : 'Data fetch failed.');
        }
      } finally {
        if (isMounted) {
          clearTimeout(safetyTimer);
          setDataLoading(false);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; clearTimeout(safetyTimer); };
  }, [userInfo?.token, userInfo?._id]); 

  const { applications, orders } = portalData;

  const handlePay = (app) => {
    localStorage.setItem('lastViewedCourse', JSON.stringify(app.course));
    navigate('/checkout', { state: { course: app.course, student: userInfo, applicationId: app._id } });
  };

  const handleDeleteApp = async (appId) => {
    if (!window.confirm('Are you sure you want to cancel this application? This action cannot be undone.')) return;
    
    try {
      setDataLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      };
      await axios.delete(`${API_URL}/applications/${appId}`, config);
      
      // Refresh the application list
      setPortalData(prev => ({
        ...prev,
        applications: prev.applications.filter(a => a._id !== appId)
      }));
    } catch (err) {
      setError('Could not delete application. Please try again later.');
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  return (
    <div className="portal-container">
      
      {/* Sidebar Navigation */}
      <aside className="portal-sidebar">
        <div className="sidebar-brand">
          <h2>Student Portal</h2>
          <p>Tovanah Learning System</p>
        </div>

        <nav className="portal-nav">
          <SidebarLink icon={<FaThLarge />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarLink icon={<FaFileAlt />} label="My Applications" active={activeTab === 'applications'} onClick={() => setActiveTab('applications')} />
          <SidebarLink icon={<FaGraduationCap />} label="Enrolled Courses" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} />
          <SidebarLink icon={<FaUser />} label="My Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          <div style={{ margin: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
            <SidebarLink icon={<FaSearch />} label="Browse All Courses" onClick={() => navigate('/all-courses')} />
          </div>
        </nav>

        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> <span className="nav-label">Sign Out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="portal-main">
        <header className="portal-top-header">
          <div className="header-left">
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', margin: 0, textTransform: 'capitalize' }}>
              {activeTab}
            </h2>
          </div>
          <div className="header-identity">
            <span>Logged in as: <strong>{userInfo.name}</strong></span>
          </div>
        </header>

        <section className="portal-content">
          {/* Dynamic Section Rendering */}
          {error && (
            <div style={{ 
              background: '#fee2e2', color: '#b91c1c', padding: '1.5rem', borderRadius: '12px', 
              marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #fecaca' 
            }}>
            <FaTimesCircle fontSize="1.5rem" />
            <div>
              <p style={{ margin: 0, fontWeight: '700' }}>Connection Error</p>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              style={{ marginLeft: 'auto', background: '#b91c1c', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}
            >
              Retry
            </button>
          </div>
        )}

          {dataLoading && applications.length === 0 && orders.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', padding: '4rem 0' }}>
              <div className="mini-loader"></div>
              <p>Syncing your student profile...</p>
            </div>
          ) : activeTab === 'overview' && userInfo && (
          <div className="portal-header">
            <h1>Welcome back, {userInfo.name}! 🎓</h1>
            <p>Here's what's happening with your professional development.</p>
            
            <div className="stats-grid">
              <StatsCard icon={<FaFileAlt color="#3b82f6" />} label="Submitted Applications" value={applications.length} />
              <StatsCard icon={<FaCheckCircle color="#10b981" />} label="Active Enrollments" value={orders.length} />
              <StatsCard icon={<FaHourglassHalf color="#f59e0b" />} label="Pending Reviews" value={applications.filter(a => a.status === 'Pending').length} />
            </div>

            <div className="portal-card">
              <h3 style={{ marginBottom: '1.5rem' }}>Next Steps</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {applications.some(a => a.status === 'Approved') ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f0fdf4', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
                    <FaCheckCircle color="#10b981" fontSize="1.5rem" />
                    <div>
                      <p style={{ margin: 0, fontWeight: '700' }}>Payment Required</p>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#166534' }}>An application has been approved! Complete payment to access your course.</p>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: '#64748b' }}>No urgent actions. Why not browse our new leadership courses?</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            <h1 style={{ marginBottom: '2rem' }}>Application Management</h1>
            {applications.length === 0 ? (
              <EmptyState icon={<FaFileAlt />} text="No applications found." btnText="Explore Courses" onBtnClick={() => navigate('/all-courses')} />
            ) : (
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app._id} className="application-card portal-card">
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <img 
                        src={getImgUrl(app.course?.image) || '/images/default-course.jpg'} 
                        alt={app.course?.title} 
                        onError={(e) => e.target.src = '/images/default-course.jpg'}
                        style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #f1f5f9' }} 
                      />
                      <div>
                        <h3>{app.course?.title || app.courseDetails?.courseApplyingFor || 'Unknown Course'}</h3>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0.5rem' }}>Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <StatusBadge status={app.status} />
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              e.preventDefault(); 
                              setSelectedApp(app); 
                            }}
                            style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                          >
                            View Details <FaChevronRight fontSize="0.7rem" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <h3 style={{ margin: '0 0 1rem', color: '#0f172a' }}>{app.course?.price || 'N/A'}</h3>
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                        {app.status === 'Approved' && (
                          <button onClick={() => handlePay(app)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', width: 'auto', padding: '0.6rem 1.2rem' }}>
                            <FaCreditCard /> Pay Now
                          </button>
                        )}
                        <button className="btn-secondary" style={{ width: 'auto', padding: '0.6rem 1.2rem' }} onClick={() => navigate(`/all-courses?id=${app.course?._id || app.course}`)}>
                          Course Details
                        </button>
                        {app.status !== 'Approved' && (
                          <button 
                            className="btn-secondary" 
                            style={{ width: 'auto', padding: '0.6rem 1.2rem', borderColor: '#fee2e2', color: '#ef4444' }} 
                            onClick={() => handleDeleteApp(app._id)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <h1 style={{ marginBottom: '2rem' }}>My Enrolled Courses</h1>
            {orders.length === 0 ? (
              <EmptyState icon={<FaGraduationCap />} text="You haven't enrolled in any courses yet." btnText="Start Learning" onBtnClick={() => navigate('/all-courses')} />
            ) : (
              <div className="course-grid">
                {orders.map(order => (
                  <div key={order._id} className="course-card-premium portal-card">
                    <img 
                      src={getImgUrl(order.orderItems[0]?.image) || '/images/default-course.jpg'} 
                      alt="course" 
                      className="course-card-image"
                      onError={(e) => e.target.src = '/images/default-course.jpg'}
                    />
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ margin: '0 0 0.5rem' }}>{order.orderItems[0]?.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1.5rem' }}>
                        <FaCheckCircle /> Lifetime Access
                      </p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn-primary" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <FaChalkboardTeacher /> Resume Learning
                        </button>
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="btn-secondary" 
                          style={{ padding: '0.5rem', width: 'auto' }} 
                          title="View Receipt"
                        >
                          <FaFileAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h1 style={{ marginBottom: '2rem' }}>My Professional Profile</h1>
            <div className="profile-section portal-card">
              <div className="profile-avatar-container">
                <div className="avatar-circle">
                  <FaUser />
                </div>
                <h3>{userInfo?.name}</h3>
                <p style={{ color: '#64748b' }}>Student since {new Date().getFullYear()}</p>
              </div>

              <div>
                <div className="profile-info">
                   <ProfileField icon={<FaUser color="#3b82f6" />} label="Full Name" value={userInfo?.name} />
                   <ProfileField icon={<FaEnvelope color="#10b981" />} label="Email Address" value={userInfo?.email} />
                   <ProfileField icon={<FaFileAlt color="#f59e0b" />} label="User ID" value={userInfo?._id?.substring(0, 10).toUpperCase()} />
                   <ProfileField icon={<FaCheckCircle color="#8b5cf6" />} label="Account Status" value="Active" />
                </div>
                
                <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                   <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <FaHourglassHalf color="#64748b" /> Security Note
                   </h4>
                   <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>To update your name or email, please contact the Tovanah Administration for identity verification purposes.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        </section>
      </main>

      {/* Application Review Modal - Rendered via Portal for absolute priority */}
      <AppModal 
        key={selectedApp?._id || 'none'}
        app={selectedApp} 
        onClose={() => setSelectedApp(null)} 
        onPay={handlePay} 
      />
      <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} userInfo={userInfo} />

      <style>{`
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .mini-loader {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const SidebarLink = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`nav-item ${active ? 'active' : ''}`}
  >
    {icon}
    <span className="nav-label">{label}</span>
  </div>
);

const StatsCard = ({ icon, label, value }) => (
  <div className="stat-card portal-card">
    <div className="stat-icon">{icon}</div>
    <div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  </div>
);

const SectionTitle = ({ icon, title }) => (
  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', marginBottom: '1.5rem', borderLeft: '4px solid #3b82f6', paddingLeft: '10px' }}>
    {icon} {title}
  </h4>
);

const Detail = ({ label, value, icon }) => (
  <div style={{ marginBottom: '1.2rem' }}>
    <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: '#334155', marginTop: '4px' }}>
      {icon && <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{icon}</span>}
      {value || 'N/A'}
    </div>
  </div>
);

const ProfileField = ({ icon, label, value }) => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
    <div>
      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>{label}</p>
      <p style={{ margin: 0, fontWeight: '700', color: '#0f172a' }}>{value}</p>
    </div>
  </div>
);

const EmptyState = ({ icon, text, btnText, onBtnClick }) => (
  <div style={{ textAlign: 'center', padding: '6rem 2rem', background: 'white', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
    <div style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>{icon}</div>
    <h3 style={{ color: '#64748b', marginBottom: '1.5rem' }}>{text}</h3>
    <button onClick={onBtnClick} className="btn-primary" style={{ width: 'auto' }}>{btnText}</button>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: { color: '#f59e0b', bg: '#fef3c7', icon: <FaHourglassHalf /> },
    Approved: { color: '#10b981', bg: '#d1fae5', icon: <FaCheckCircle /> },
    Rejected: { color: '#ef4444', bg: '#fee2e2', icon: <FaTimesCircle /> },
  };
  const config = styles[status] || styles.Pending;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px', 
      color: config.color, background: config.bg, 
      padding: '4px 10px', borderRadius: '6px', 
      fontSize: '0.8rem', fontWeight: '700'
    }}>
      {config.icon} {status}
    </span>
  );
};

const AppModal = ({ app, onClose, onPay }) => {
  if (!app) return null;

  return createPortal(
    <div 
      className="modal-overlay" 
      onClick={(e) => {
        // Only close if the ACTUAL overlay was clicked, NOT its children
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ zIndex: 9999 }}
    >
      <div className="portal-card fade-in" style={{ 
        width: '100%', maxWidth: '800px', maxHeight: '90vh', 
        overflowY: 'auto', position: 'relative', padding: 0,
        zIndex: 10000
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#f1f5f9', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}
        >
          <FaTimes />
        </button>

        <div style={{ padding: '3rem' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #f1f5f9' }}>
            <img 
              src={getImgUrl(app.course?.image) || '/images/default-course.jpg'} 
              style={{ width: '120px', height: '120px', borderRadius: '16px', objectFit: 'cover', border: '1px solid #f1f5f9' }} 
              alt="course"
              onError={(e) => e.target.src = '/images/default-course.jpg'}
            />
            <div>
              <h2 style={{ margin: 0 }}>{app.course?.title || app.courseDetails?.courseApplyingFor || 'Selected Course'}</h2>
              <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Full Application Review</p>
              <StatusBadge status={app.status} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <section>
              <SectionTitle icon={<FaUser />} title="Personal Information" />
              <Detail label="Full Name" value={app.personalInfo?.fullName || 'N/A'} />
              <Detail label="Location" icon={<FaMapMarkerAlt />} value={`${app.personalInfo?.city || 'N/A'}, ${app.personalInfo?.country || 'N/A'}`} />
              <Detail label="Phone" icon={<FaPhoneAlt />} value={app.personalInfo?.phoneNumber || 'N/A'} />
              <Detail label="Email" icon={<FaEnvelope />} value={app.personalInfo?.email || 'N/A'} />
            </section>

            <section>
              <SectionTitle icon={<FaUserGraduate />} title="Education & Experience" />
              <Detail label="Highest Degree" value={app.educationalBackground?.highestLevel || 'N/A'} />
              <Detail label="Field of Study" value={app.educationalBackground?.fieldOfStudy || 'N/A'} />
              <Detail label="Current Job" icon={<FaBriefcase />} value={app.professionalInfo?.jobTitle || 'Not Provided'} />
              <Detail label="Industry" value={app.professionalInfo?.industry || 'Not Provided'} />
            </section>
          </div>

          <div style={{ marginTop: '3rem', padding: '2rem', background: '#f8fafc', borderRadius: '16px' }}>
            <h4 style={{ marginBottom: '1rem' }}>Motivation for the course</h4>
            <p style={{ color: '#475569', fontStyle: 'italic', lineHeight: '1.6' }}>"{app.motivation?.interestReason || 'No technical motivation provided.'}"</p>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h4 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Uploaded Documents</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {app.documents && Object.entries(app.documents).map(([key, value]) => {
                if (!value) return null;
                const isPdf = value.toLowerCase().endsWith('.pdf');
                return (
                  <div key={key} className="portal-card" style={{ padding: '1rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                    {isPdf ? (
                      <div style={{ padding: '0.5rem', background: '#f1f5f9', borderRadius: '8px', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '2rem' }}>📄</span>
                        <div style={{ fontSize: '0.8rem', color: '#334155' }}>PDF Document</div>
                      </div>
                    ) : (
                      <img 
                        src={getImgUrl(value)} 
                        alt={key} 
                        style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }} 
                        onError={(e) => e.target.src = '/images/default-doc.jpg'}
                      />
                    )}
                    <a 
                      href={getImgUrl(value)} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{ fontSize: '0.85rem', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}
                    >
                      {isPdf ? 'View PDF' : 'Enlarge Image'}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn-secondary" style={{ width: 'auto', padding: '0.8rem 2rem' }} onClick={onClose}>Close Review</button>
            {app.status === 'Approved' && (
              <button className="btn-primary" style={{ width: 'auto', padding: '0.8rem 2rem' }} onClick={() => onPay(app)}>Pay Now</button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const OrderModal = ({ order, onClose, userInfo }) => {
  if (!order) return null;

  return createPortal(
    <div 
      className="modal-overlay" 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ zIndex: 9999 }}
    >
      <div className="portal-card fade-in" style={{ 
        width: '100%', maxWidth: '600px', maxHeight: '90vh', 
        overflowY: 'auto', position: 'relative', padding: 0,
        zIndex: 10000
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#f1f5f9', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}
        >
          <FaTimes />
        </button>

        <div style={{ padding: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '2rem' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>PAYMENT RECEIPT</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Tovanah Consulting Limited</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <h4 style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', margin: 0 }}>Billed To</h4>
              <p style={{ fontWeight: '700', margin: '4px 0 0' }}>{userInfo.name}</p>
              <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>{userInfo.email}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h4 style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', margin: 0 }}>Transaction Details</h4>
              <p style={{ fontSize: '0.85rem', margin: '4px 0 0' }}><strong>Date:</strong> {new Date(order.paidAt).toLocaleDateString()}</p>
              <p style={{ fontSize: '0.85rem', margin: 0 }}><strong>ID:</strong> {order.paymentResult?.id?.substring(0, 15)}...</p>
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '0 0 1rem', fontSize: '0.85rem', color: '#64748b' }}>Course</th>
                  <th style={{ padding: '0 0 1rem', textAlign: 'right', fontSize: '0.85rem', color: '#64748b' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1.5rem 0 0', fontWeight: '600' }}>{order.orderItems[0].title}</td>
                  <td style={{ padding: '1.5rem 0 0', textAlign: 'right', fontWeight: '700' }}>
                    ${order.totalPrice.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '2px solid #0f172a' }}>
             <p style={{ fontWeight: '800', fontSize: '1.1rem', margin: 0 }}>Total Paid</p>
             <p style={{ fontWeight: '800', fontSize: '1.5rem', color: '#3b82f6', margin: 0 }}>
               ${order.totalPrice.toLocaleString()}
             </p>
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <button 
              className="btn-primary" 
              style={{ width: 'auto', padding: '0.8rem 2.5rem', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }} 
              onClick={() => window.print()}
            >
              <FaFileAlt /> Print / Save Receipt
            </button>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '1.5rem', marginBottom: 0 }}>
              This is a secure, digital receipt for your professional records.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StudentPortal;
