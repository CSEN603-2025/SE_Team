import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaUpload, FaGlobe, FaBook, FaBuilding, FaGraduationCap, FaClipboardCheck, FaFileContract, FaComments, FaSearch, FaEdit } from 'react-icons/fa';
import '../../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [stats, setStats] = useState({
    applications: 5,
    activeInternships: 1,
    completed: 0,
    reports: 2
  });

  useEffect(() => {
    if (!user || !['student', 'pro-student'].includes(user.type)) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Student Dashboard - {user.name}</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="stats-container">
        <div className="stat-box">
          <h3>Applications</h3>
          <p>{stats.applications}</p>
        </div>
        <div className="stat-box">
          <h3>Active Internships</h3>
          <p>{stats.activeInternships}</p>
        </div>
        <div className="stat-box">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
        <div className="stat-box">
          <h3>Reports</h3>
          <p>{stats.reports}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Top Row */}
        <button className="dashboard-button" onClick={() => navigate('/profile')}>
          <FaUser className="button-icon" />
          View/Edit Profile
        </button>
        
        <button className="dashboard-button" onClick={() => navigate('/applications')}>
          <FaFileAlt className="button-icon" />
          My Applications
        </button>
        
        <button className="dashboard-button" onClick={() => navigate('/submit-report')}>
          <FaUpload className="button-icon" />
          Submit Report
        </button>
        
        <button className="dashboard-button" onClick={() => navigate('/internships')}>
          <FaGlobe className="button-icon" />
          My Internships
        </button>

        {/* Middle Row */}
        <button className="dashboard-button" onClick={() => navigate('/courses')}>
          <FaBook className="button-icon" />
          Major Courses
        </button>
        
        <button className="dashboard-button" onClick={() => navigate('/companies')}>
          <FaBuilding className="button-icon" />
          Suggested Companies
        </button>
        
        <button className="dashboard-button" onClick={() => navigate('/academic-info')}>
          <FaGraduationCap className="button-icon" />
          Select Major & Semester
        </button>
        
        <button className="dashboard-button" onClick={() => navigate('/evaluation')}>
          <FaClipboardCheck className="button-icon" />
          Company Evaluation
        </button>

        {/* Bottom Row */}
        <button className="dashboard-button" onClick={() => navigate('/report')}>
          <FaFileAlt className="button-icon" />
          Internship Report
        </button>
        
        <button className="dashboard-button" onClick={() => navigate('/feedback')}>
          <FaEdit className="button-icon" />
          Course Feedback
        </button>
        
        <button className="dashboard-button" onClick={() => navigate('/explore')}>
          <FaSearch className="button-icon" />
          Explore Internships
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
