import React, { useState } from 'react';
import './MySubmissions.css';

const initialData = [
  { id: 1, title: "Internship at Vodafone", status: "Submitted" },
  { id: 2, title: "Internship at Microsoft", status: "In Review" },
  { id: 3, title: "Internship at IBM", status: "Approved" }
];

const MySubmissions = () => {
  const [applications, setApplications] = useState(initialData);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleCancel = (id) => {
    const updated = applications.filter(app => app.id !== id);
    setApplications(updated);
    setFeedbackMsg("Application cancelled successfully.");
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  return (
    <div className="submissions-container">
      <h1>My Internship Applications</h1>
      {feedbackMsg && <div className="feedback">{feedbackMsg}</div>}
      {applications.length === 0 ? (
        <p className="empty-message">You have no submitted applications.</p>
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <div key={app.id} className="app-card">
              <div className="app-details">
                <h2>{app.title}</h2>
                <span className={`status status-${app.status.replace(/\s/g, '').toLowerCase()}`}>
                  {app.status}
                </span>
              </div>
              <button onClick={() => handleCancel(app.id)} className="cancel-btn">
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
