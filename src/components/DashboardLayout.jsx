import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/DashboardLayout.css';

const DashboardLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'student';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <Sidebar userRole={userRole} />
      
      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>{title}</h1>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 