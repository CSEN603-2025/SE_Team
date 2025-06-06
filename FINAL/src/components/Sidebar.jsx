import React from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaBriefcase, FaGraduationCap, FaFileAlt, 
         FaChartBar, FaCog, FaUsers, FaClipboardCheck, FaSearch, FaFilter, FaCheck, FaTimes, FaComments } from 'react-icons/fa';
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
          { path: '/filter-reports', icon: <FaFilter />, label: 'Filter Reports' },
          { path: '/accept-reports', icon: <FaCheck />, label: 'Accept Reports' },
          { path: '/flag-reports', icon: <FaTimes />, label: 'Flag Reports' },
          { path: '/submit-comments', icon: <FaComments />, label: 'Submit Comments' },
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
          { path: '/partner-companies', icon: <FaBriefcase />, label: 'Partner Companies' },
          { path: '/internship-programs', icon: <FaClipboardCheck />, label: 'Internship Programs' },
          { path: '/faculty-management', icon: <FaGraduationCap />, label: 'Faculty Management' },
          { path: '/analytics', icon: <FaChartBar />, label: 'Analytics & Reports' },
          { path: '/templates', icon: <FaFileAlt />, label: 'Document Templates' },
          { path: '/settings', icon: <FaCog />, label: 'System Settings' },
          { path: '/advanced-search', icon: <FaSearch />, label: 'Advanced Search' }
        ];

      default:
        return [];
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {getNavItems().map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 