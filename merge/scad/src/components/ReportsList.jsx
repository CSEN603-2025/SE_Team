// src/components/ReportsList.jsx
import React, { useState } from 'react';
import ReportDetails from './ReportDetails';
import './ReportsList.css';

export default function ReportsList({ reports, onClarify, currentRole }) {
  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Show the details view
  if (selectedId !== null) {
    const rpt = reports.find(r => r.id === selectedId);
    return (
      <ReportDetails
        report={rpt}
        onBack={() => setSelectedId(null)}
        onClarify={onClarify}
        currentRole={currentRole}
      />
    );
  }

  // List view
  return (
    <div className="reports-list">
      <h2>Internship Reports</h2>
      {feedback && <div className="feedback" role="status">{feedback}</div>}
      <div className="reports-table-container">
        <table className="reports-table" aria-label="Internship reports">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Student</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map(r => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td><span className={`status-badge status-${r.status.toLowerCase()}`}>{r.status}</span></td>
                  <td>{r.studentName || r.student}</td>
                  <td>{r.company}</td>
                  <td>
                    <div className="actions-group">
                      <button
                        className="view-btn"
                        aria-label={`View details for ${r.title}`}
                        onClick={() => setSelectedId(r.id)}
                      >
                        View Details
                      </button>
                      <a
                        href={r.fileUrl}
                        download
                        className="download-btn"
                        aria-label={`Download PDF for ${r.title}`}
                        onClick={() => {
                          setFeedback('Download started.');
                          setTimeout(() => setFeedback(null), 1500);
                        }}
                      >
                        Download PDF
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
                  <div className="empty-icon" aria-hidden="true">📄</div>
                  <div>No internship reports available.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
