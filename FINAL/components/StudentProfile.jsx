import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MAJORS, SEMESTERS } from '../data/constants';
import './StudentProfile.css';

function StudentProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    major: '',
    semester: '',
    interests: [],
    skills: [],
    internships: [],
    partTimeJobs: [],
    collegeActivities: [],
    documents: []
  });

  const [errors, setErrors] = useState({});

  // Load profile from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      setProfile(prev => ({
        ...prev,
        ...user
      }));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!profile.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!profile.major) {
      newErrors.major = 'Major is required';
    }
    
    if (!profile.semester) {
      newErrors.semester = 'Semester is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleArrayInputChange = (e, index, field) => {
    const { value } = e.target;
    setProfile(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field) => {
    setProfile(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      // In a real app, we would upload to server and store URL
      // For now, we'll just store the file name
      url: URL.createObjectURL(file)
    }));

    setProfile(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocuments]
    }));
  };

  const removeDocument = (index) => {
    setProfile(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Save to localStorage (in a real app, this would be an API call)
      localStorage.setItem('user', JSON.stringify(profile));
      setIsEditing(false);
    }
  };

  return (
    <div className="student-profile">
      <div className="profile-header">
        <h2>Student Profile</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`edit-button ${isEditing ? 'cancel' : ''}`}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className={isEditing ? 'editing' : ''}>
        <div className="form-group">
          <label>Name:</label>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </>
          ) : (
            <p>{profile.name}</p>
          )}
        </div>

        <div className="form-group">
          <label>Email:</label>
          {isEditing ? (
            <>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </>
          ) : (
            <p>{profile.email}</p>
          )}
        </div>

        <div className="form-group">
          <label>Major:</label>
          {isEditing ? (
            <>
              <select
                name="major"
                value={profile.major}
                onChange={handleInputChange}
                className={errors.major ? 'error' : ''}
              >
                <option value="">Select Major</option>
                {MAJORS.map(major => (
                  <option key={major.id} value={major.code}>
                    {major.name}
                  </option>
                ))}
              </select>
              {errors.major && <span className="error-message">{errors.major}</span>}
            </>
          ) : (
            <p>{MAJORS.find(m => m.code === profile.major)?.name || profile.major}</p>
          )}
        </div>

        <div className="form-group">
          <label>Semester:</label>
          {isEditing ? (
            <>
              <select
                name="semester"
                value={profile.semester}
                onChange={handleInputChange}
                className={errors.semester ? 'error' : ''}
              >
                <option value="">Select Semester</option>
                {SEMESTERS.map(semester => (
                  <option key={semester.id} value={semester.id}>
                    {semester.name}
                  </option>
                ))}
              </select>
              {errors.semester && <span className="error-message">{errors.semester}</span>}
            </>
          ) : (
            <p>Semester {profile.semester}</p>
          )}
        </div>

        <div className="form-section">
          <h3>Skills & Interests</h3>
          {isEditing ? (
            <>
              <div className="tags-input">
                <input
                  type="text"
                  placeholder="Type and press Enter to add skills"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = e.target.value.trim();
                      if (value && !profile.skills.includes(value)) {
                        setProfile(prev => ({
                          ...prev,
                          skills: [...prev.skills, value]
                        }));
                        e.target.value = '';
                      }
                    }
                  }}
                />
                <div className="tags-container">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="tag">
                      {skill}
                      <button
                        type="button"
                        onClick={() => {
                          setProfile(prev => ({
                            ...prev,
                            skills: prev.skills.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <textarea
                name="interests"
                value={profile.interests.join(', ')}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  interests: e.target.value.split(',').map(i => i.trim()).filter(Boolean)
                }))}
                placeholder="Enter your interests, separated by commas"
              />
            </>
          ) : (
            <>
              <div className="skills-display">
                <h4>Skills:</h4>
                <div className="tags-container">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="interests-display">
                <h4>Interests:</h4>
                <p>{profile.interests.join(', ') || 'No interests added'}</p>
              </div>
            </>
          )}
        </div>

        <div className="form-section">
          <h3>Previous Internships</h3>
          {isEditing ? (
            <>
              {profile.internships.map((internship, index) => (
                <div key={index} className="array-input">
                  <input
                    type="text"
                    value={internship}
                    onChange={(e) => handleArrayInputChange(e, index, 'internships')}
                    placeholder="Company name, duration, responsibilities"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeArrayItem(index, 'internships')}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => addArrayItem('internships')}
                className="add-button"
              >
                Add Internship
              </button>
            </>
          ) : (
            <ul>
              {profile.internships.map((internship, index) => (
                <li key={index}>{internship}</li>
              ))}
              {profile.internships.length === 0 && <li>No previous internships</li>}
            </ul>
          )}
        </div>

        <div className="form-section">
          <h3>Part-Time Jobs</h3>
          {isEditing ? (
            <>
              {profile.partTimeJobs.map((job, index) => (
                <div key={index} className="array-input">
                  <input
                    type="text"
                    value={job}
                    onChange={(e) => handleArrayInputChange(e, index, 'partTimeJobs')}
                    placeholder="Company name, position, duration"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeArrayItem(index, 'partTimeJobs')}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => addArrayItem('partTimeJobs')}
                className="add-button"
              >
                Add Part-Time Job
              </button>
            </>
          ) : (
            <ul>
              {profile.partTimeJobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
              {profile.partTimeJobs.length === 0 && <li>No part-time jobs</li>}
            </ul>
          )}
        </div>

        <div className="form-section">
          <h3>College Activities</h3>
          {isEditing ? (
            <>
              {profile.collegeActivities.map((activity, index) => (
                <div key={index} className="array-input">
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => handleArrayInputChange(e, index, 'collegeActivities')}
                    placeholder="Activity name, role, duration"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeArrayItem(index, 'collegeActivities')}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => addArrayItem('collegeActivities')}
                className="add-button"
              >
                Add Activity
              </button>
            </>
          ) : (
            <ul>
              {profile.collegeActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
              {profile.collegeActivities.length === 0 && <li>No college activities</li>}
            </ul>
          )}
        </div>

        <div className="form-section">
          <h3>Documents</h3>
          {isEditing ? (
            <>
              <div className="documents-upload">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                />
                <p className="upload-hint">
                  Upload your CV, certificates, or any other relevant documents
                </p>
              </div>
              <div className="documents-list">
                {profile.documents.map((doc, index) => (
                  <div key={index} className="document-item">
                    <span>{doc.name}</span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="documents-list">
              {profile.documents.map((doc, index) => (
                <div key={index} className="document-item">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.name}
                  </a>
                </div>
              ))}
              {profile.documents.length === 0 && <p>No documents uploaded</p>}
            </div>
          )}
        </div>

        {isEditing && (
          <div className="form-actions">
            <button type="submit" className="save-button">Save Changes</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default StudentProfile;
