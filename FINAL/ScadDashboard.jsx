import React, { useState } from 'react';
import CompanyManagement from './components/scad/CompanyManagement';
import InternshipManagement from './components/scad/InternshipManagement';
import ReportManagement from './components/scad/ReportManagement';
import WorkshopManagement from './components/scad/WorkshopManagement';
import Statistics from './pages/Statistics';
import './ScadDashboard.css';

const ScadDashboard = () => {
  const [activeTab, setActiveTab] = useState('statistics');

  const renderContent = () => {
    switch (activeTab) {
      case 'statistics':
        return <Statistics />;
      case 'companies':
        return <CompanyManagement />;
      case 'internships':
        return <InternshipManagement />;
      case 'reports':
        return <ReportManagement />;
      case 'workshops':
        return <WorkshopManagement userRole="scad" />;
      default:
        return <Statistics />;
    }
  };

  return (
    <div className="scad-dashboard">
      <nav className="dashboard-nav">
        <button
          className={`nav-item ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          Statistics
        </button>
        <button
          className={`nav-item ${activeTab === 'companies' ? 'active' : ''}`}
          onClick={() => setActiveTab('companies')}
        >
          Companies
        </button>
        <button
          className={`nav-item ${activeTab === 'internships' ? 'active' : ''}`}
          onClick={() => setActiveTab('internships')}
        >
          Internships
        </button>
        <button
          className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
        <button
          className={`nav-item ${activeTab === 'workshops' ? 'active' : ''}`}
          onClick={() => setActiveTab('workshops')}
        >
          Workshops
        </button>
      </nav>

      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default ScadDashboard;
