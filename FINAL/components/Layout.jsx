import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getNavItems = () => {
    const commonItems = [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/internships', label: 'My Internships' },
    ];

    switch (userType) {
      case 'student':
      case 'pro-student':
        return [
          ...commonItems,
          { path: '/courses', label: 'Course Selection' },
          { path: '/company-evaluation', label: 'Company Evaluation' },
        ];
      case 'company':
        return [
          ...commonItems,
          { path: '/post-internship', label: 'Post Internship' },
          { path: '/applications', label: 'Applications' },
        ];
      case 'faculty':
        return [
          ...commonItems,
          { path: '/approve-internships', label: 'Approve Internships' },
          { path: '/reports', label: 'Reports' },
        ];
      case 'scad':
        return [
          ...commonItems,
          { path: '/manage-users', label: 'Manage Users' },
          { path: '/system-settings', label: 'System Settings' },
        ];
      default:
        return commonItems;
    }
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
            SCAD Internship System
          </Link>
        </div>
        <div className="navbar-user">
          <span>{user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>
      
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="user-info">
            <h3>{user.name}</h3>
            {user.major && <p>Major: {user.major}</p>}
            {user.semester && <p>Semester: {user.semester}</p>}
          </div>
          <nav>
            <ul>
              {getNavItems().map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        
        <main className="main-content">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout; 