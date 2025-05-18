import React, { useState, useEffect } from 'react';
import { FaUser, FaFileAlt, FaUpload, FaGlobe, FaBook, FaBuilding, FaGraduationCap, FaClipboardCheck, FaFileContract, FaComments, FaSearch } from 'react-icons/fa';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      name: '',
      major: '',
      semester: '',
      isProStudent: false,
      completedInternshipMonths: 0
    };
  });

  const [stats, setStats] = useState({
    totalApplications: 0,
    activeInternships: 0,
    completedInternships: 0,
    reportsSubmitted: 0
  });

  useEffect(() => {
    // In a real app, this would fetch from an API
    // Mock data for demonstration
    setStats({
      totalApplications: 5,
      activeInternships: 1,
      completedInternships: 2,
      reportsSubmitted: 2
    });
  }, []);

  const navigationItems = [
    { icon: <FaUser />, text: 'View/Edit Profile', link: '/profile' },
    { icon: <FaFileAlt />, text: 'My Applications', link: '/applications' },
    { icon: <FaUpload />, text: 'Submit Report', link: '/submit-report' },
    { icon: <FaGlobe />, text: 'My Internships', link: '/internships' },
    { icon: <FaBook />, text: 'Major Courses', link: '/courses' },
    { icon: <FaBuilding />, text: 'Suggested Companies', link: '/companies' },
    { icon: <FaGraduationCap />, text: 'Select Major & Semester', link: '/academic-info' },
    { icon: <FaClipboardCheck />, text: 'Company Evaluation', link: '/evaluation' },
    { icon: <FaFileContract />, text: 'Internship Report', link: '/report' },
    { icon: <FaComments />, text: 'Course Feedback', link: '/feedback' },
    { icon: <FaSearch />, text: 'Explore Internships', link: '/explore' }
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to your Student Dashboard</h1>
      
      {user.isProStudent && (
        <div className="pro-status-banner">
          <span className="pro-badge">PRO</span>
          <p>You have completed {user.completedInternshipMonths} months of internships</p>
        </div>
      )}

      <div className="stats-container">
        <div className="stat-card">
          <h3>Applications</h3>
          <p>{stats.totalApplications}</p>
        </div>
        <div className="stat-card">
          <h3>Active Internships</h3>
          <p>{stats.activeInternships}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{stats.completedInternships}</p>
        </div>
        <div className="stat-card">
          <h3>Reports Submitted</h3>
          <p>{stats.reportsSubmitted}</p>
        </div>
      </div>

      <div className="navigation-grid">
        {navigationItems.map((item, index) => (
          <a key={index} href={item.link} className="nav-item">
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
