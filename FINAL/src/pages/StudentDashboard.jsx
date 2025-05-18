import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaUpload, FaGlobe, FaBook, FaBuilding, FaGraduationCap, FaClipboardCheck, FaFileContract, FaComments, FaSearch } from 'react-icons/fa';
import { applications, reports } from '../data/dummyData';
import '../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [stats, setStats] = useState({
    totalApplications: 0,
    activeInternships: 0,
    completedInternships: 0,
    reportsSubmitted: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Calculate stats from dummy data
    const userApplications = applications.filter(app => app.studentId === user.id);
    const userReports = reports.filter(report => report.studentId === user.id);
    const activeApps = userApplications.filter(app => app.status === 'Accepted');
    const completedApps = userApplications.filter(app => app.status === 'Completed');

    setStats({
      totalApplications: userApplications.length,
      activeInternships: activeApps.length,
      completedInternships: completedApps.length,
      reportsSubmitted: userReports.length
    });
  }, [user, navigate]);

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

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {user.name}!</h1>
      
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