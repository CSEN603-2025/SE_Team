import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaUser, FaStar, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <DashboardLayout title="Student Profile">
      <div className="profile-main-container">
        <div className="profile-header-row">
          <FaUser size={56} style={{ marginRight: 24, color: '#4F8A8B' }} />
          <div>
            <h2 style={{ margin: 0 }}>{user.name}</h2>
            <p style={{ margin: 0, color: '#888' }}>{user.email}</p>
          </div>
        </div>
        <div className="profile-grid-row">
          <div className="profile-section profile-info">
            <h3>Personal Information</h3>
            <p><strong>Major:</strong> {user.major}</p>
            <p><strong>Semester:</strong> {user.semester}</p>
          </div>
          <div className="profile-section profile-skills">
            <h3><FaStar style={{ color: '#F9B208', marginRight: 6 }} /> Skills</h3>
            <ul>
              {user.skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="profile-section profile-interests">
            <h3><FaHeart style={{ color: '#F76E11', marginRight: 6 }} /> Interests</h3>
            <ul>
              {user.interests?.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile; 