import React, { useState } from 'react';
import StudentManagement from '../components/faculty/StudentManagement';
import ReportManagement from '../components/faculty/ReportManagement';
import EvaluationManagement from '../components/faculty/EvaluationManagement';
import CycleManagement from '../components/faculty/CycleManagement';
import Statistics from '../components/faculty/Statistics';
import NotificationCenter from '../components/faculty/NotificationCenter';
import './FacultyDashboard.css';

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState('students');

  return (
    <div className="faculty-dashboard">
      <header className="dashboard-header">
        <h1>Faculty Dashboard</h1>
        <NotificationCenter />
      </header>

      <nav className="dashboard-tabs">
        <button 
          className={activeTab === 'students' ? 'active' : ''} 
          onClick={() => setActiveTab('students')}
        >
          Student Management
        </button>
        <button 
          className={activeTab === 'reports' ? 'active' : ''} 
          onClick={() => setActiveTab('reports')}
        >
          Report Management
        </button>
        <button 
          className={activeTab === 'evaluations' ? 'active' : ''} 
          onClick={() => setActiveTab('evaluations')}
        >
          Evaluation Management
        </button>
        <button 
          className={activeTab === 'cycles' ? 'active' : ''} 
          onClick={() => setActiveTab('cycles')}
        >
          Cycle Management
        </button>
        <button 
          className={activeTab === 'statistics' ? 'active' : ''} 
          onClick={() => setActiveTab('statistics')}
        >
          Statistics
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'students' && <StudentManagement />}
        {activeTab === 'reports' && <ReportManagement />}
        {activeTab === 'evaluations' && <EvaluationManagement />}
        {activeTab === 'cycles' && <CycleManagement />}
        {activeTab === 'statistics' && <Statistics />}
      </main>
    </div>
  );
} 