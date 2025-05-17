import React from 'react';
import './NavigationView.css';

const NavigationView = () => {
  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="logo">GUC Internship</div>
        <ul className="nav-links">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/applications">My Applications</a></li>
          <li><a href="/submit-report">Submit Report</a></li>
        </ul>
      </nav>

      <main className="main-content">
        <h1>Welcome to Your Dashboard</h1>
        <p>Select a section from the navigation bar to manage your internship progress.</p>
      </main>
    </div>
  );
};

export default NavigationView;
