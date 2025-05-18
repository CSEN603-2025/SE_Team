// FINAL/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const [isProUser, setIsProUser] = useState(localStorage.getItem('isProUser') === 'true');

  const toggleProUser = () => {
    const newValue = !isProUser;
    setIsProUser(newValue);
    localStorage.setItem('isProUser', newValue);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Internship Portal</h2>
      </div>

      <div className="pro-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={isProUser}
            onChange={toggleProUser}
          />
          <span className="slider round"></span>
        </label>
        <span className="pro-label">PRO Features</span>
      </div>

      <nav>
        <h3>Basic Features</h3>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Dashboard
        </Link>
        <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
          Profile
        </Link>
        <Link to="/internships" className={location.pathname === '/internships' ? 'active' : ''}>
          Internships
        </Link>

        {isProUser && (
          <>
            <h3>PRO Features</h3>
            <Link to="/pro" className={location.pathname === '/pro' ? 'active' : ''}>
              PRO Dashboard
            </Link>
            <Link to="/pro/workshops" className={location.pathname === '/pro/workshops' ? 'active' : ''}>
              Workshops
            </Link>
            <Link to="/pro/evaluations" className={location.pathname === '/pro/evaluations' ? 'active' : ''}>
              Evaluations
            </Link>
            <Link to="/pro/assessment" className={location.pathname === '/pro/assessment' ? 'active' : ''}>
              Assessment
            </Link>
            <Link to="/pro/appointments" className={location.pathname === '/pro/appointments' ? 'active' : ''}>
              Appointments
            </Link>
            <Link to="/pro/profile-views" className={location.pathname === '/pro/profile-views' ? 'active' : ''}>
              Profile Views
            </Link>
            <Link to="/pro/video-call" className={location.pathname === '/pro/video-call' ? 'active' : ''}>
              Video Call
            </Link>
          </>
        )}
      </nav>

      <div className="user-info">
        <div className="avatar">
          <img src="/avatar-placeholder.png" alt="User avatar" />
        </div>
        <div className="user-details">
          <p className="user-name">John Doe</p>
          <p className="user-role">{isProUser ? 'PRO Student' : 'Student'}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
