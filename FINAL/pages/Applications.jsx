// FINAL/pages/student/Applications.jsx
import React, { useState } from 'react';
import './Applications.css';

// Dummy data - in a real app, this would come from an API
const initialApplications = [
  {
    id: 1,
    company: "Orange Digital Center",
    position: "Mobile App Developer",
    status: "Pending",
    appliedDate: "2024-03-15",
    interview: null
  },
  {
    id: 2,
    company: "Dell Technologies",
    position: "IT Support Intern",
    status: "Accepted",
    appliedDate: "2024-03-10",
    interview: {
      date: "2024-03-20",
      time: "14:00",
      type: "Online"
    }
  },
  {
    id: 3,
    company: "EG Bank",
    position: "Financial Analyst Intern",
    status: "Rejected",
    appliedDate: "2024-03-05",
    interview: null
  }
];

export default function Applications() {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status.toLowerCase() === filter.toLowerCase();
  });

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  const handleWithdraw = (id) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      setApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  return (
    <div className="applications-page">
      <div className="applications-header">
        <h2>My Applications</h2>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''} 
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'accepted' ? 'active' : ''} 
            onClick={() => setFilter('accepted')}
          >
            Accepted
          </button>
          <button 
            className={filter === 'rejected' ? 'active' : ''} 
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="applications-list">
        {filteredApplications.map(application => (
          <div key={application.id} className="application-card">
            <div className="application-header">
              <h3>{application.position}</h3>
              <span className={`status-badge ${getStatusClass(application.status)}`}>
                {application.status}
              </span>
            </div>
            
            <div className="application-details">
              <p><strong>Company:</strong> {application.company}</p>
              <p><strong>Applied:</strong> {application.appliedDate}</p>
              
              {application.interview && (
                <div className="interview-details">
                  <h4>Interview Scheduled</h4>
                  <p>Date: {application.interview.date}</p>
                  <p>Time: {application.interview.time}</p>
                  <p>Type: {application.interview.type}</p>
                </div>
              )}
            </div>

            <div className="application-actions">
              <button 
                className="view-button"
                onClick={() => setSelectedApplication(application)}
              >
                View Details
              </button>
              {application.status === 'Pending' && (
                <button 
                  className="withdraw-button"
                  onClick={() => handleWithdraw(application.id)}
                >
                  Withdraw
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredApplications.length === 0 && (
          <div className="no-applications">
            <p>No applications found for the selected filter.</p>
          </div>
        )}
      </div>

      {selectedApplication && (
        <div className="application-modal">
          <div className="modal-content">
            <button 
              className="close-button"
              onClick={() => setSelectedApplication(null)}
            >
              ×
            </button>
            
            <h2>{selectedApplication.position}</h2>
            <h3>{selectedApplication.company}</h3>
            
            <div className="modal-details">
              <div className="detail-group">
                <label>Status</label>
                <span className={`status-badge ${getStatusClass(selectedApplication.status)}`}>
                  {selectedApplication.status}
                </span>
              </div>
              
              <div className="detail-group">
                <label>Applied Date</label>
                <span>{selectedApplication.appliedDate}</span>
              </div>

              {selectedApplication.interview && (
                <div className="interview-section">
                  <h4>Interview Details</h4>
                  <div className="detail-group">
                    <label>Date</label>
                    <span>{selectedApplication.interview.date}</span>
                  </div>
                  <div className="detail-group">
                    <label>Time</label>
                    <span>{selectedApplication.interview.time}</span>
                  </div>
                  <div className="detail-group">
                    <label>Type</label>
                    <span>{selectedApplication.interview.type}</span>
                  </div>
                </div>
              )}
            </div>

            {selectedApplication.status === 'Pending' && (
              <div className="modal-actions">
                <button 
                  className="withdraw-button"
                  onClick={() => {
                    handleWithdraw(selectedApplication.id);
                    setSelectedApplication(null);
                  }}
                >
                  Withdraw Application
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
