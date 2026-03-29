import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaCreditCard, FaUserLock, FaBookOpen,
} from 'react-icons/fa';
import Intro from './Intro';
import AuthForm from './AuthForm';
import '../styles/about.css';

const Admission = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course || null;
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('studentInfo')));
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!course) {
      // If someone lands here directly, redirect to courses
      navigate('/all-courses');
    }
  }, [course, navigate]);

  useEffect(() => {
    if (student) {
      setStep(2); // Jump to review if already logged in
    }
  }, [student]);

  const handleAuthSuccess = (userData) => {
    setStudent(userData);
    setStep(2);
  };

  const proceedToApplication = () => {
    navigate('/application', { state: { course, student } });
  };

  if (!course) return null;

  return (
    <div className="admission-page" style={{ paddingBottom: '5rem' }}>
      <Intro
        heading="Professional Enrollment"
        paragraph={`Complete your registration for "${course?.title || 'Course'}" to start your professional journey.`}
      />

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '3rem' }}>
        {/* Progress Tracker */}
        <div
          className="progress-tracker"
          style={{
            display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', top: '24px', left: '10%', right: '10%', height: '2px', background: '#e2e8f0', zIndex: 0,
          }}
          />
          <div className="step" style={{ zIndex: 1, textAlign: 'center' }}>
            <div style={{
              width: '50px', height: '50px', borderRadius: '50%', background: step >= 1 ? '#3b82f6' : '#fff', color: step >= 1 ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem', border: '2px solid #3b82f6',
            }}
            >
              <FaUserLock />
            </div>
            <span style={{ fontWeight: '600', color: step >= 1 ? '#0f172a' : '#64748b' }}>Account</span>
          </div>
          <div className="step" style={{ zIndex: 1, textAlign: 'center' }}>
            <div style={{
              width: '50px', height: '50px', borderRadius: '50%', background: step >= 2 ? '#3b82f6' : '#fff', color: step >= 2 ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem', border: '2px solid #e2e8f0',
            }}
            >
              <FaBookOpen />
            </div>
            <span style={{ fontWeight: '600', color: step >= 2 ? '#0f172a' : '#64748b' }}>Review</span>
          </div>
          <div className="step" style={{ zIndex: 1, textAlign: 'center' }}>
            <div style={{
              width: '50px', height: '50px', borderRadius: '50%', background: step >= 3 ? '#3b82f6' : '#fff', color: step >= 3 ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem', border: '2px solid #e2e8f0',
            }}
            >
              <FaCreditCard />
            </div>
            <span style={{ fontWeight: '600', color: step >= 3 ? '#0f172a' : '#64748b' }}>Payment</span>
          </div>
        </div>

        {/* Step 1: Authentication */}
        {step === 1 && (
          <div className="step-content">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3>Please Identify Yourself</h3>
              <p style={{ color: '#64748b' }}>You need an account to track your progress and receive your certificate.</p>
            </div>
            <AuthForm onSuccess={handleAuthSuccess} />
          </div>
        )}

        {/* Step 2: Course Review */}
        {step === 2 && (
          <div className="step-content">
            <div className="admin-card" style={{ padding: '2.5rem', borderLeft: '8px solid #3b82f6' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem',
              }}
              >
                <div>
                  <span style={{
                    background: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700',
                  }}
                  >
                    ENROLLMENT SUMMARY
                  </span>
                  <h2 style={{ marginTop: '0.5rem', fontSize: '1.8rem' }}>{course.title}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#3b82f6' }}>{course.price}</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Professional Access</div>
                </div>
              </div>

              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem',
              }}
              >
                <div>
                  <h4 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Instructor</h4>
                  <p style={{ fontWeight: '600' }}>{course.instructor}</p>
                </div>
                <div>
                  <h4 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Duration</h4>
                  <p style={{ fontWeight: '600' }}>{course.duration}</p>
                </div>
                <div>
                  <h4 style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Student</h4>
                  <p style={{ fontWeight: '600' }}>
                    {student.name}
                    {' '}
                    (
                    {student.email}
                    )
                  </p>
                </div>
              </div>

              <div style={{
                borderTop: '1px solid #e2e8f0', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between',
              }}
              >
                <button
                  type="button"
                  onClick={() => { localStorage.removeItem('studentInfo'); setStudent(null); setStep(1); }}
                  style={{
                    background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer',
                  }}
                >
                  Not you? Change Account
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={proceedToApplication}
                  style={{
                    width: 'auto', padding: '1rem 3rem', background: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.75rem',
                  }}
                >
                  Fill Application Form
                  {' '}
                  <FaBookOpen />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admission;
