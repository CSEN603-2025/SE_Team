// src/App.jsx
import React, { useState } from 'react';
import Sidebar                  from './components/Sidebar';
import CompanyList              from './components/CompanyList';
import AvailableInternshipsList from './components/AvailableInternshipsList';
import StudentList              from './components/StudentList';
import ReportsList              from './components/ReportsList';
import ReportDetails            from './components/ReportDetails';
import DocumentList             from './components/DocumentList';
import CycleSettings            from './components/CycleSettings';
import Statistics               from './components/Statistics';
import Login                    from './components/Login';
import AppointmentSystem         from './components/AppointmentSystem';
import VideoCallRoom            from './components/VideoCallRoom';
import PresenceIndicator        from './components/PresenceIndicator';
import WorkshopManager          from './components/WorkshopManager';
import ScadDashboard            from './components/ScadDashboard';
import { initialCompanies, initialReports, USERS } from './data';
import './App.css';



export default function App() {
  // Core data
  const [companies,     setCompanies]     = useState(initialCompanies);
  const [reports,       setReports]       = useState(initialReports);
  const [currentUser,   setCurrentUser]   = useState(null);
  const [activeTab,     setActiveTab]     = useState('Dashboard');
  const [selectedReport, setSelectedReport] = useState(null);

  // Fake login
  const handleLogin = (email, password) => {
    const u = USERS.find(u => u.email === email && u.password === password);
    if (!u) return false;
    setCurrentUser(u);
    setActiveTab('Dashboard'); // Always open Dashboard after login
    return true;
  };

  // Accept / Reject companies
  const handleAcceptCompany = id =>
    setCompanies(cs => cs.map(c => c.id === id ? { ...c, status: 'Accepted' } : c));
  const handleRejectCompany = id =>
    setCompanies(cs => cs.map(c => c.id === id ? { ...c, status: 'Rejected' } : c));

  // Clarification on flagged/rejected report
  const handleClarify = (reportId, text) => {
    setReports(rs =>
      rs.map(r => r.id === reportId ? { ...r, clarification: text } : r)
    );
  };

  // If not logged in yet...
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Show SCAD dashboard for SCAD Office users when on Dashboard
  if (currentUser.role === 'SCAD Office' && activeTab === 'Dashboard') {
    return <ScadDashboard onNavigate={setActiveTab} user={currentUser} />;
  }

  const tabs = [
    'Dashboard',
    'Companies Applying',
    'Available Internships',
    'Internship Reports',
    'Documents',
    ...(currentUser.role === 'SCAD Office' ? ['Students', 'Cycle Settings', 'Statistics'] : []),
    'Appointments',
    'Workshops',
  ];

  return (
    <div className="app-container">
      <Sidebar
        active     ={activeTab}
        onTabChange={tab => {
          setActiveTab(tab);
          setSelectedReport(null);      // clear any open detail when switching tabs
        }}
        role={currentUser.role}
      />

      <main className="main-content">
        <h1>Welcome, {currentUser.role}</h1>

        {/* 1) Companies Applying */}
        {activeTab === 'Companies Applying' && !selectedReport && (
          <CompanyList
            companies={companies}
            onAccept={handleAcceptCompany}
            onReject={handleRejectCompany}
          />
        )}

        {/* 2) Available Internships */}
        {activeTab === 'Available Internships' && (
          <AvailableInternshipsList />
        )}

        {/* 3) Students (SCAD Office only) */}
        {activeTab === 'Students' && currentUser.role === 'SCAD Office' && (
          <StudentList />
        )}

        {/* 4) Internship Reports */}
        {activeTab === 'Internship Reports' && !selectedReport && (
          <ReportsList
            reports     ={reports}
            onClarify   ={handleClarify}
            onSelect    ={setSelectedReport}      // when "View Details" is clicked
            currentRole ={currentUser.role}
          />
        )}

        {/* 5) Selected Report Details */}
        {activeTab === 'Internship Reports' && selectedReport && (
          <ReportDetails
            report={selectedReport}
            onBack={() => setSelectedReport(null)}
          />
        )}

        {/* 6) Documents */}
        {activeTab === 'Documents' && <DocumentList />}

        {/* 7) Cycle Settings (SCAD Office only) */}
        {activeTab === 'Cycle Settings' &&
          currentUser.role === 'SCAD Office' && <CycleSettings />}

        {/* 8) Statistics (SCAD Office only) */}
        {activeTab === 'Statistics' &&
          currentUser.role === 'SCAD Office' && <Statistics />}

        {/* 9) Appointments */}
        {activeTab === 'Appointments' && (
          <AppointmentSystem currentUser={currentUser} />
        )}

        {/* 10) Video Call Room */}
        {activeTab === 'Video Call Room' && (
          <VideoCallRoom remoteUser="SCAD Officer" />
        )}

        {/* 11) Workshops */}
        {activeTab === 'Workshops' && (
          <WorkshopManager />
        )}

        <PresenceIndicator online={true} />
      </main>
    </div>
  );
}
