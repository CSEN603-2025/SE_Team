import React from 'react';
import './ScadDashboard.css';

const actions = [
  { label: 'Companies Applying',      icon: '🏢', tab: 'Companies Applying' },
  { label: 'Students',                icon: '👩‍🎓', tab: 'Students' },
  { label: 'Available Internships',   icon: '💼', tab: 'Available Internships' },
  { label: 'Internship Reports',      icon: '📄', tab: 'Internship Reports' },
  { label: 'Documents',               icon: '📁', tab: 'Documents' },
  { label: 'Cycle Settings',          icon: '🗓️', tab: 'Cycle Settings' },
  { label: 'Statistics',              icon: '📊', tab: 'Statistics' },
  { label: 'Appointments',            icon: '📅', tab: 'Appointments' },
  { label: 'Workshops',               icon: '🎤', tab: 'Workshops' },
];

export default function ScadDashboard({ onNavigate, user }) {
  return (
    <div className="scad-dashboard-container">
      <h1>Welcome to your SCAD Dashboard</h1>
      <div className="scad-dashboard-grid">
        {actions.map(action => (
          <button
            key={action.tab}
            className="scad-dashboard-btn"
            onClick={() => onNavigate(action.tab)}
            aria-label={action.label}
          >
            <span className="scad-dashboard-icon">{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
} 