import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentManagement from './components/faculty/StudentManagement';
import ReportManagement from './components/faculty/ReportManagement';
import EvaluationManagement from './components/faculty/EvaluationManagement';
import Statistics from './components/faculty/Statistics';
import CycleManagement from './components/faculty/CycleManagement';
import NotificationCenter from './components/faculty/NotificationCenter';
import './FacultyDashboard.css';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentManagement />;
      case 'reports':
        return <ReportManagement />;
      case 'evaluations':
        return <EvaluationManagement />;
      case 'statistics':
        return <Statistics />;
      case 'cycles':
        return <CycleManagement />;
      default:
        return <StudentManagement />;
    }
  };

  return (
    <div className="faculty-dashboard">
      <header className="dashboard-header">
        <h1>Faculty Dashboard</h1>
        <div className="header-actions">
          <NotificationCenter />
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button
          className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button
          className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
        <button
          className={`nav-item ${activeTab === 'evaluations' ? 'active' : ''}`}
          onClick={() => setActiveTab('evaluations')}
        >
          Evaluations
        </button>
        <button
          className={`nav-item ${activeTab === 'cycles' ? 'active' : ''}`}
          onClick={() => setActiveTab('cycles')}
        >
          Cycles
        </button>
        <button
          className={`nav-item ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          Statistics
        </button>
      </nav>

      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default FacultyDashboard;
