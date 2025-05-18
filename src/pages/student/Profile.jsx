import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaUser, FaGraduationCap, FaCode, FaHeart } from 'react-icons/fa';
import '../../styles/Profile.css';

const Profile = () => {
  const studentData = {
    personal: {
      name: 'John Student',
      email: 'student@guc.edu.eg',
      major: 'Computer Science',
      semester: 6
    },
    skills: [
      'JavaScript',
      'React',
      'Node.js',
      'Python'
    ],
    interests: [
      'Web Development',
      'Mobile Apps',
      'Machine Learning'
    ]
  };

  return (
    <DashboardLayout>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser size={40} />
          </div>
          <h1>{studentData.personal.name}</h1>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <div className="card-header">
              <FaGraduationCap className="card-icon" />
              <h2>Personal Information</h2>
            </div>
            <div className="card-content">
              <div className="info-item">
                <label>Email</label>
                <span>{studentData.personal.email}</span>
              </div>
              <div className="info-item">
                <label>Major</label>
                <span>{studentData.personal.major}</span>
              </div>
              <div className="info-item">
                <label>Semester</label>
                <span>{studentData.personal.semester}</span>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <div className="card-header">
              <FaCode className="card-icon" />
              <h2>Skills</h2>
            </div>
            <div className="card-content">
              <div className="tags-container">
                {studentData.skills.map((skill, index) => (
                  <span key={index} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="profile-card">
            <div className="card-header">
              <FaHeart className="card-icon" />
              <h2>Interests</h2>
            </div>
            <div className="card-content">
              <div className="tags-container">
                {studentData.interests.map((interest, index) => (
                  <span key={index} className="tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-primary">Edit Profile</button>
          <button className="btn btn-secondary">Change Password</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile; 