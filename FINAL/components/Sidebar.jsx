// FINAL/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const [isProUser, setIsProUser] = useState(localStorage.getItem('isProUser') === 'true');
  const [isMinimized, setIsMinimized] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem('userType') || 'student');

  useEffect(() => {
    // Update userType when it changes in localStorage
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const toggleProUser = () => {
    const newValue = !isProUser;
    setIsProUser(newValue);
    localStorage.setItem('isProUser', newValue);
  };

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  // Get base path according to user type
  const getBasePath = () => {
    return `/${userType}`;
  };

  return (
    <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <h2>{isMinimized ? 'IP' : 'Internship Portal'}</h2>
        </div>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isMinimized ? '→' : '←'}
        </button>
      </div>

      {userType === 'student' && (
        <div className="pro-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={isProUser}
              onChange={toggleProUser}
            />
            <span className="slider round"></span>
          </label>
          {!isMinimized && <span className="pro-label">PRO Features</span>}
        </div>
      )}

      <nav>
        <h3>{isMinimized ? 'Menu' : 'Basic Features'}</h3>
        <Link 
          to={getBasePath()} 
          className={location.pathname === getBasePath() ? 'active' : ''} 
          title="Dashboard"
        >
          <i className="fas fa-home"></i>
          {!isMinimized && <span>Dashboard</span>}
        </Link>
        <Link 
          to={`${getBasePath()}/profile`} 
          className={location.pathname.includes('/profile') ? 'active' : ''} 
          title="Profile"
        >
          <i className="fas fa-user"></i>
          {!isMinimized && <span>Profile</span>}
        </Link>
        <Link 
          to={`${getBasePath()}/internships`} 
          className={location.pathname.includes('/internships') ? 'active' : ''} 
          title="Internships"
        >
          <i className="fas fa-briefcase"></i>
          {!isMinimized && <span>Internships</span>}
        </Link>

        {userType === 'student' && isProUser && (
          <>
            <h3>{isMinimized ? 'PRO' : 'PRO Features'}</h3>
            <Link 
              to={`${getBasePath()}/workshops`} 
              className={location.pathname.includes('/workshops') ? 'active' : ''} 
              title="Workshops"
            >
              <i className="fas fa-chalkboard-teacher"></i>
              {!isMinimized && <span>Workshops</span>}
            </Link>
            <Link 
              to={`${getBasePath()}/evaluations`} 
              className={location.pathname.includes('/evaluations') ? 'active' : ''} 
              title="Evaluations"
            >
              <i className="fas fa-clipboard-check"></i>
              {!isMinimized && <span>Evaluations</span>}
            </Link>
            <Link 
              to={`${getBasePath()}/assessment`} 
              className={location.pathname.includes('/assessment') ? 'active' : ''} 
              title="Assessment"
            >
              <i className="fas fa-tasks"></i>
              {!isMinimized && <span>Assessment</span>}
            </Link>
            <Link 
              to={`${getBasePath()}/appointments`} 
              className={location.pathname.includes('/appointments') ? 'active' : ''} 
              title="Appointments"
            >
              <i className="fas fa-calendar"></i>
              {!isMinimized && <span>Appointments</span>}
            </Link>
            <Link 
              to={`${getBasePath()}/profile-views`} 
              className={location.pathname.includes('/profile-views') ? 'active' : ''} 
              title="Profile Views"
            >
              <i className="fas fa-eye"></i>
              {!isMinimized && <span>Profile Views</span>}
            </Link>
            <Link 
              to={`${getBasePath()}/video-call`} 
              className={location.pathname.includes('/video-call') ? 'active' : ''} 
              title="Video Call"
            >
              <i className="fas fa-video"></i>
              {!isMinimized && <span>Video Call</span>}
            </Link>
          </>
        )}

        {/* SCAD-specific menu items */}
        {userType === 'scad' && (
          <>
            <Link 
              to={`${getBasePath()}/companies`} 
              className={location.pathname.includes('/companies') ? 'active' : ''} 
              title="Companies"
            >
              <i className="fas fa-building"></i>
              {!isMinimized && <span>Companies</span>}
            </Link>
            <Link 
              to={`${getBasePath()}/reports`} 
              className={location.pathname.includes('/reports') ? 'active' : ''} 
              title="Reports"
            >
              <i className="fas fa-file-alt"></i>
              {!isMinimized && <span>Reports</span>}
            </Link>
            <Link 
              to={`${getBasePath()}/statistics`} 
              className={location.pathname.includes('/statistics') ? 'active' : ''} 
              title="Statistics"
            >
              <i className="fas fa-chart-bar"></i>
              {!isMinimized && <span>Statistics</span>}
            </Link>
          </>
        )}

        {/* Faculty-specific menu items */}
        {userType === 'faculty' && (
          <>
            <Link 
              to={`${getBasePath()}/reports`} 
              className={location.pathname.includes('/reports') ? 'active' : ''} 
              title="Reports"
            >
              <i className="fas fa-file-alt"></i>
              {!isMinimized && <span>Reports</span>}
            </Link>
            <Link 
              to={`${getBasePath()}/students`} 
              className={location.pathname.includes('/students') ? 'active' : ''} 
              title="Students"
            >
              <i className="fas fa-users"></i>
              {!isMinimized && <span>Students</span>}
            </Link>
          </>
        )}

        {/* Company-specific menu items */}
        {userType === 'company' && (
          <>
            <Link 
              to={`${getBasePath()}/posts`} 
              className={location.pathname.includes('/posts') ? 'active' : ''} 
              title="Internship Posts"
            >
              <i className="fas fa-plus-circle"></i>
              {!isMinimized && <span>Post Internship</span>}
            </Link>
            <Link 
              to={`${getBasePath()}/applicants`} 
              className={location.pathname.includes('/applicants') ? 'active' : ''} 
              title="Applicants"
            >
              <i className="fas fa-users"></i>
              {!isMinimized && <span>Applicants</span>}
            </Link>
            <Link 
              to={`${getBasePath()}/evaluations`} 
              className={location.pathname.includes('/evaluations') ? 'active' : ''} 
              title="Evaluations"
            >
              <i className="fas fa-star"></i>
              {!isMinimized && <span>Evaluations</span>}
            </Link>
          </>
        )}
      </nav>

      <div className="user-info">
        <div className="avatar">
          <img src="/avatar-placeholder.png" alt="User avatar" />
        </div>
        {!isMinimized && (
          <div className="user-details">
            <p className="user-name">{localStorage.getItem('userEmail') || 'User'}</p>
            <p className="user-role">{userType.charAt(0).toUpperCase() + userType.slice(1)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
