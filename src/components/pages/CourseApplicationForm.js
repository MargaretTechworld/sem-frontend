/* eslint-disable jsx-a11y/label-has-associated-control, no-underscore-dangle, no-console, react/button-has-type */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaFileAlt, FaUpload, FaSpinner } from 'react-icons/fa';
import { API_URL, getImgUrl } from '../../apiConfig';
import '../../styles/admin.css'; // Using admin styles for standard form layout

const CourseApplicationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state || {};
  const [course] = useState(stateData.course || JSON.parse(localStorage.getItem('lastViewedCourse')));
  const [student] = useState(stateData.student || JSON.parse(localStorage.getItem('userInfo')));

  const [formData, setFormData] = useState({
    // Section 1
    fullName: student?.name || '',
    gender: '',
    dob: '',
    nationality: '',
    phoneNumber: '',
    email: student?.email || '',
    address: '',
    city: '',
    country: '',
    // Section 2
    highestLevel: '',
    fieldOfStudy: '',
    institution: '',
    graduationYear: '',
    certifications: '',
    // Section 3
    employmentStatus: '',
    jobTitle: '',
    organization: '',
    yearsOfExperience: '',
    industry: '',
    // Section 4
    courseApplyingFor: course?.title || '',
    courseCategory: '',
    preferredMode: 'Online Live',
    preferredStartDate: '',
    hearAboutUs: '',
    // Section 5
    hasComputer: false,
    hasInternet: false,
    deviceType: 'Laptop',
    digitalSkillLevel: 'Beginner',
    // Section 6
    interestReason: '',
    goals: '',
    priorKnowledge: '',
    // Section 7
    idCard: '',
    academicCertificates: '',
    resume: '',
    passportPhoto: '',
    // Section 9
    confirmed: false,
    signature: '',
  });

  const [uploading, setUploading] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    const fetchLatestApp = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${student.token}`,
          },
        };
        const { data } = await axios.get(`${API_URL}/applications/mine/latest`, config);
        
        if (data && data.personalInfo) {
          setFormData(prev => ({
            ...prev,
            // Section 1
            fullName: data.personalInfo.fullName || prev.fullName,
            gender: data.personalInfo.gender || '',
            dob: data.personalInfo.dob ? data.personalInfo.dob.split('T')[0] : '',
            nationality: data.personalInfo.nationality || '',
            phoneNumber: data.personalInfo.phoneNumber || '',
            email: data.personalInfo.email || prev.email,
            address: data.personalInfo.address || '',
            city: data.personalInfo.city || '',
            country: data.personalInfo.country || '',
            // Section 2
            highestLevel: data.educationalBackground?.highestLevel || '',
            fieldOfStudy: data.educationalBackground?.fieldOfStudy || '',
            institution: data.educationalBackground?.institution || '',
            graduationYear: data.educationalBackground?.graduationYear || '',
            certifications: data.educationalBackground?.certifications || '',
            // Section 3
            employmentStatus: data.professionalInfo?.employmentStatus || '',
            jobTitle: data.professionalInfo?.jobTitle || '',
            organization: data.professionalInfo?.organization || '',
            yearsOfExperience: data.professionalInfo?.yearsOfExperience || '',
            industry: data.professionalInfo?.industry || '',
            // Section 5
            hasComputer: data.technicalInfo?.hasComputer || false,
            hasInternet: data.technicalInfo?.hasInternet || false,
            deviceType: data.technicalInfo?.deviceType || 'Laptop',
            digitalSkillLevel: data.technicalInfo?.digitalSkillLevel || 'Beginner',
            // Section 7 (Documents)
            idCard: data.documents?.idCard || '',
            academicCertificates: data.documents?.academicCertificates || '',
            resume: data.documents?.resume || '',
            passportPhoto: data.documents?.passportPhoto || '',
          }));
        }
      } catch (err) {
        console.error('Error pre-filling form:', err);
      }
    };

    if (student?.token) {
      fetchLatestApp();
    }
  }, [student?.token]);

  if (!course || !student) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center' }}>
        <h2>Session Expired</h2>
        <button className="btn-primary" onClick={() => navigate('/all-courses')}>Back to Courses</button>
      </div>
    );
  }

  const handleChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const uploadFileHandler = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Maximum size is 5MB.');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('image', file); // API expects 'image' field for multer
    setUploading(fieldName);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${student.token}`,
        },
      };

      const { data } = await axios.post(`${API_URL}/upload`, uploadData, config);
      setFormData((prev) => ({ ...prev, [fieldName]: data }));
      setUploading('');
      setError('');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.message || 'File upload failed.';
      setError(`Upload failed: ${msg}`);
      setUploading('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.confirmed) {
      setError('You must confirm the declaration.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${student.token}`,
        },
      };

      const applicationPayload = {
        course: course._id,
        personalInfo: {
          fullName: formData.fullName, gender: formData.gender, dob: formData.dob, nationality: formData.nationality, phoneNumber: formData.phoneNumber, email: formData.email, address: formData.address, city: formData.city, country: formData.country,
        },
        educationalBackground: {
          highestLevel: formData.highestLevel, fieldOfStudy: formData.fieldOfStudy, institution: formData.institution, graduationYear: formData.graduationYear, certifications: formData.certifications,
        },
        professionalInfo: {
          employmentStatus: formData.employmentStatus, jobTitle: formData.jobTitle, organization: formData.organization, yearsOfExperience: formData.yearsOfExperience, industry: formData.industry,
        },
        courseDetails: {
          courseApplyingFor: formData.courseApplyingFor, courseCategory: formData.courseCategory, preferredMode: formData.preferredMode, preferredStartDate: formData.preferredStartDate, hearAboutUs: formData.hearAboutUs,
        },
        technicalInfo: {
          hasComputer: formData.hasComputer, hasInternet: formData.hasInternet, deviceType: formData.deviceType, digitalSkillLevel: formData.digitalSkillLevel,
        },
        motivation: {
          interestReason: formData.interestReason, goals: formData.goals, priorKnowledge: formData.priorKnowledge,
        },
        documents: {
          idCard: formData.idCard, academicCertificates: formData.academicCertificates, resume: formData.resume, passportPhoto: formData.passportPhoto,
        },
        declaration: {
          confirmed: formData.confirmed, signature: formData.signature,
        },
      };

      await axios.post(`${API_URL}/applications`, applicationPayload, config);
      setSubmitting(false);
      navigate('/my-applications', { state: { message: 'Application submitted successfully! Awaiting Admin Approval.' } });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Error submitting application';
      setError(msg);
      console.error('Submission error:', err.response?.data || err);
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '100px', maxWidth: '800px', paddingBottom: '5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
        }}
        >
          <FaFileAlt color="#3b82f6" />
          {' '}
          Online Course Application Form
        </h1>
        <p style={{ color: '#64748b' }}>
          Please fill in all requested details to apply for
          <strong>{course.title}</strong>
        </p>
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

      <form onSubmit={handleSubmit} className="admin-card" style={{ padding: '2rem' }}>

        {/* Section 1 */}
        <h3>🧍♂️ 1. Personal Information</h3>
        <hr style={{ opacity: 0.1, margin: '1rem 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>
              Full Name
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>
              Gender
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <select className="form-control" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              Date of Birth
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>
              Nationality
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="text" className="form-control" name="nationality" value={formData.nationality} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>
              Phone Number
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="e.g. +232 00 000000" required />
          </div>
          <div className="form-group">
            <label>
              Email Address
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>
              Residential Address
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="House Number, Street Name" required />
          </div>
          <div className="form-group">
            <label>
              City
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>
              Country
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
          </div>
        </div>

        {/* Section 2 */}
        <h3 style={{ marginTop: '2rem' }}>🎓 2. Educational Background</h3>
        <hr style={{ opacity: 0.1, margin: '1rem 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>
              Highest Level of Education
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="text" className="form-control" name="highestLevel" value={formData.highestLevel} onChange={handleChange} placeholder="e.g. High School, Diploma, Bachelor’s" required />
          </div>
          <div className="form-group">
            <label>
              Field of Study
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="text" className="form-control" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} placeholder="e.g. Computer Science" required />
          </div>
          <div className="form-group">
            <label>
              Institution Name
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="text" className="form-control" name="institution" value={formData.institution} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>
              Year of Graduation
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="text" className="form-control" name="graduationYear" value={formData.graduationYear} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Relevant Certifications (Optional)</label>
            <input type="text" className="form-control" name="certifications" value={formData.certifications} onChange={handleChange} placeholder="List any relevant certificates" />
          </div>
        </div>

        {/* Section 3 */}
        <h3 style={{ marginTop: '2rem' }}>💼 3. Professional Information (Optional)</h3>
        <hr style={{ opacity: 0.1, margin: '1rem 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Employment Status</label>
            <select className="form-control" name="employmentStatus" value={formData.employmentStatus} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Employed">Employed</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="form-group">
            <label>Current Job Title</label>
            <input type="text" className="form-control" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Organization / Company Name</label>
            <input type="text" className="form-control" name="organization" value={formData.organization} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Years of Experience</label>
            <input type="number" className="form-control" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Industry</label>
            <input type="text" className="form-control" name="industry" value={formData.industry} onChange={handleChange} />
          </div>
        </div>

        {/* Section 4 */}
        <h3 style={{ marginTop: '2rem' }}>📚 4. Course Details</h3>
        <hr style={{ opacity: 0.1, margin: '1rem 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Course Applying For</label>
            <input type="text" className="form-control" value={formData.courseApplyingFor} readOnly style={{ background: '#f1f5f9' }} />
          </div>
          <div className="form-group">
            <label>
              Course Category
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input type="text" className="form-control" name="courseCategory" value={formData.courseCategory} onChange={handleChange} placeholder="e.g. ICT, Business, Health" required />
          </div>
          <div className="form-group">
            <label>
              Preferred Learning Mode
              <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <select className="form-control" name="preferredMode" value={formData.preferredMode} onChange={handleChange} required>
              <option value="Online Live">Online Live</option>
              <option value="Self-paced">Self-paced</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="form-group">
            <label>Preferred Start Date</label>
            <input type="date" className="form-control" name="preferredStartDate" value={formData.preferredStartDate} onChange={handleChange} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>How did you hear about us?</label>
            <input type="text" className="form-control" name="hearAboutUs" value={formData.hearAboutUs} onChange={handleChange} placeholder="Social Media, Friend, etc." />
          </div>
        </div>

        {/* Section 5 */}
        <h3 style={{ marginTop: '2rem' }}>💻 5. Technical Information</h3>
        <hr style={{ opacity: 0.1, margin: '1rem 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Do you have access to a computer?</label>
            <select className="form-control" name="hasComputer" value={formData.hasComputer} onChange={(e) => setFormData({ ...formData, hasComputer: e.target.value === 'true' })}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Do you have internet access?</label>
            <select className="form-control" name="hasInternet" value={formData.hasInternet} onChange={(e) => setFormData({ ...formData, hasInternet: e.target.value === 'true' })}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Device Type</label>
            <select className="form-control" name="deviceType" value={formData.deviceType} onChange={handleChange} required>
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
              <option value="Tablet">Tablet</option>
              <option value="Smartphone">Smartphone</option>
            </select>
          </div>
          <div className="form-group">
            <label>Digital Skill Level</label>
            <select className="form-control" name="digitalSkillLevel" value={formData.digitalSkillLevel} onChange={handleChange} required>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Section 6 */}
        <h3 style={{ marginTop: '2rem' }}>📝 6. Motivation & Expectations</h3>
        <hr style={{ opacity: 0.1, margin: '1rem 0' }} />
        <div className="form-group">
          <label>Why are you interested in this course?</label>
          <textarea className="form-control" rows="3" name="interestReason" value={formData.interestReason} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>What do you hope to achieve after completion?</label>
          <textarea className="form-control" rows="3" name="goals" value={formData.goals} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Any prior knowledge of the subject?</label>
          <textarea className="form-control" rows="2" name="priorKnowledge" value={formData.priorKnowledge} onChange={handleChange} />
        </div>

        {/* Section 7 */}
        <h3 style={{ marginTop: '2rem' }}>📎 7. Document Upload (Optional)</h3>
        <hr style={{ opacity: 0.1, margin: '1rem 0' }} />
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '8px',
        }}
        >
          {['idCard', 'academicCertificates', 'resume', 'passportPhoto'].map((doc) => (
            <div key={doc} className="form-group">
              <label style={{ textTransform: 'capitalize' }}>
                {doc.replace(/([A-Z])/g, ' $1')}
                <span style={{
                  display: 'block', fontSize: '0.7rem', color: '#64748b', textTransform: 'none', marginTop: '2px',
                }}
                >
                  Max 5MB (PDF or Image)
                </span>
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '5px', alignItems: 'center' }}>
                <input type="file" id={`upload-${doc}`} style={{ display: 'none' }} accept=".pdf,.doc,.docx,image/*" onChange={(e) => uploadFileHandler(e, doc)} />
                <button type="button" className="btn-secondary btn-sm" onClick={() => document.getElementById(`upload-${doc}`).click()}>
                  {uploading === doc ? <FaSpinner className="fa-spin" /> : (
                    <>
                      <FaUpload />
                      {' '}
                      Select File
                    </>
                  )}
                </button>
                {formData[doc] && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
                    <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>✓ Uploaded</span>
                    <a
                      href={getImgUrl(formData[doc])}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.75rem', color: '#3b82f6', textDecoration: 'none' }}
                    >
                      View
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Section 9 */}
        <h3 style={{ marginTop: '2rem' }}>📢 9. Declaration</h3>
        <hr style={{ opacity: 0.1, margin: '1rem 0' }} />
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="checkbox" name="confirmed" checked={formData.confirmed} onChange={handleChange} style={{ width: '20px', height: '20px' }} />
          <label style={{ margin: 0 }}>I confirm that the information provided is accurate and true to the best of my knowledge.</label>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem',
        }}
        >
          <div className="form-group">
            <label>Digital Signature (Typed Name)</label>
            <input type="text" className="form-control" name="signature" value={formData.signature} onChange={handleChange} required />
          </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <button type="submit" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }} disabled={submitting}>
            {submitting ? 'Submitting Application...' : 'Submit Course Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseApplicationForm;
