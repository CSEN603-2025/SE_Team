import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaClipboard, FaGlobe, FaBook, FaChartBar, FaBuilding, FaGraduationCap, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = ({ userRole = 'student' }) => {
  const location = useLocation();

  const navigationItems = {
    student: [
      { path: '/student/profile', icon: <FaUser />, label: 'Profile' },
      { path: '/student/applications', icon: <FaClipboard />, label: 'Applications' },
      { path: '/student/internships', icon: <FaGlobe />, label: 'Internships' },
      { path: '/student/courses', icon: <FaBook />, label: 'Courses' },
    ],
    faculty: [
      { path: '/faculty/dashboard', icon: <FaChartBar />, label: 'Dashboard' },
      { path: '/faculty/students', icon: <FaGraduationCap />, label: 'Students' },
      { path: '/faculty/companies', icon: <FaBuilding />, label: 'Companies' },
      { path: '/faculty/reports', icon: <FaClipboard />, label: 'Reports' },
    ],
    company: [
      { path: '/company/dashboard', icon: <FaChartBar />, label: 'Dashboard' },
      { path: '/company/postings', icon: <FaClipboard />, label: 'Postings' },
      { path: '/company/applications', icon: <FaGraduationCap />, label: 'Applications' },
      { path: '/company/reports', icon: <FaBook />, label: 'Reports' },
    ],
    scad: [
      { path: '/scad/dashboard', icon: <FaChartBar />, label: 'Dashboard' },
      { path: '/scad/students', icon: <FaGraduationCap />, label: 'Students' },
      { path: '/scad/companies', icon: <FaBuilding />, label: 'Companies' },
      { path: '/scad/reports', icon: <FaClipboard />, label: 'Reports' },
    ],
  };

  const items = navigationItems[userRole] || [];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        <h2>SCAD System</h2>
      </div>
      
      <nav className="sidebar-nav">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/logout" className="nav-item">
          <span className="nav-icon"><FaSignOutAlt /></span>
          <span className="nav-label">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar; 