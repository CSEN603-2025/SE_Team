// ReportDetails.jsx
import React from 'react';
import './ReportDetails.css';

const ReportDetails = ({ report }) => {
  const safeReport = report || {
    title: 'Untitled Report',
    studentName: 'Unknown Student',
    major: 'N/A',
    status: 'pending',
    introduction: 'No introduction provided.',
    body: 'No body content provided.',
    conclusion: 'No conclusion provided.'
  };

  return (
    <div className="report-details">
      <h2>{safeReport.title}</h2>
      <div className="report-meta">
        <span>Student: {safeReport.studentName}</span>
        <span>Major: {safeReport.major}</span>
        <span>Status: <span className={`status-${safeReport.status}`}>{safeReport.status}</span></span>
      </div>
      <div className="report-content">
        <h3>Introduction</h3>
        <p>{safeReport.introduction}</p>
        <h3>Body</h3>
        <p>{safeReport.body}</p>
        <h3>Conclusion</h3>
        <p>{safeReport.conclusion}</p>
      </div>
      <div className="report-actions">
        <button>Download as PDF</button>
      </div>
    </div>
  );
};

export default ReportDetails;
