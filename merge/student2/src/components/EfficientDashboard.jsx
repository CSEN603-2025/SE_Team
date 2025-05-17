import React from 'react';
import './EfficientDashboard.css';

const EfficientDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>

      <div className="quick-actions">
        <button onClick={() => alert('Redirect to Submit Report')} className="action-button">
          📄 Submit Report
        </button>
        <button onClick={() => alert('Redirect to My Applications')} className="action-button">
          📁 My Applications
        </button>
        <button onClick={() => alert('Redirect to Contact Supervisor')} className="action-button">
          📬 Contact Supervisor
        </button>
      </div>

      <div className="summary-box">
        <h2>My Progress</h2>
        <ul>
          <li>Reports Submitted: <strong>3</strong></li>
          <li>Applications Sent: <strong>2</strong></li>
          <li>Internship Status: <strong>Approved</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default EfficientDashboard;
