// src/components/ReportDetails.jsx
import React from 'react';
//import './ReportDetails.css';

export default function ReportDetails({ report, onBack }) {
  return (
    <div className="report-details">
      <button onClick={onBack}>← Back to Reports</button>
      <h2>{report.title}</h2>
      <p><strong>Student:</strong> {report.studentName}</p>
      <p><strong>Company:</strong> {report.company}</p>
      <p><strong>Supervisor:</strong> {report.supervisor}</p>
      <p><strong>Start Date:</strong> {report.startDate}</p>
      <p><strong>End Date:</strong> {report.endDate}</p>
      <p><strong>Status:</strong> {report.status}</p>
      {/* etc... */}
      {['Flagged','Rejected'].includes(report.status) && (
        <>
          <h3>Clarification Provided:</h3>
          <p>{report.clarification || '— none yet —'}</p>
        </>
      )}
    </div>
  );
}
