import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaBriefcase, FaGraduationCap, FaFileAlt, 
         FaChartBar, FaCog, FaUsers, FaClipboardCheck, FaSearch } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const getNavItems = () => {
    switch (user?.type) {
      case 'student':
        return [
          { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
          { path: '/profile', icon: <FaUser />, label: 'Profile' },
          { path: '/applications', icon: <FaBriefcase />, label: 'Applications' },
          { path: '/internships', icon: <FaGraduationCap />, label: 'Internships' },
          { path: '/submit-report', icon: <FaFileAlt />, label: 'Submit Report' },
          { path: '/courses', icon: <FaGraduationCap />, label: 'Courses' }
        ];

      case 'pro-student':
        return [
          { path: '/pro-student-dashboard', icon: <FaHome />, label: 'Dashboard' },
          { path: '/profile', icon: <FaUser />, label: 'Profile' },
          { path: '/projects', icon: <FaBriefcase />, label: 'Projects' },
          { path: '/portfolio', icon: <FaFileAlt />, label: 'Portfolio' },
          { path: '/skills', icon: <FaChartBar />, label: 'Skills' },
          { path: '/certifications', icon: <FaGraduationCap />, label: 'Certifications' }
        ];

      case 'faculty':
        return [
          { path: '/faculty-dashboard', icon: <FaHome />, label: 'Dashboard' },
          { path: '/view-reports', icon: <FaFileAlt />, label: 'View Reports' },
          { path: '/student-list', icon: <FaUsers />, label: 'Student List' },
          { path: '/review-reports', icon: <FaClipboardCheck />, label: 'Review Reports' },
          { path: '/search-reports', icon: <FaSearch />, label: 'Search Reports' }
        ];

      case 'company':
        return [
          { path: '/company-dashboard', icon: <FaHome />, label: 'Dashboard' },
          { path: '/post-internship', icon: <FaBriefcase />, label: 'Post Internship' },
          { path: '/manage-applications', icon: <FaUsers />, label: 'Applications' },
          { path: '/current-interns', icon: <FaGraduationCap />, label: 'Current Interns' },
          { path: '/company-profile', icon: <FaUser />, label: 'Company Profile' }
        ];

      case 'scad':
        return [
          { path: '/scad-dashboard', icon: <FaHome />, label: 'Dashboard' },
          { path: '/manage-students', icon: <FaUsers />, label: 'Manage Students' },
          { path: '/partner-companies', icon: <FaBriefcase />, label: 'Companies' },
          { path: '/faculty-management', icon: <FaGraduationCap />, label: 'Faculty' },
          { path: '/analytics', icon: <FaChartBar />, label: 'Analytics' },
          { path: '/settings', icon: <FaCog />, label: 'Settings' }
        ];

      default:
        return [];
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {getNavItems().map((item, index) => (
          <button
            key={index}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 