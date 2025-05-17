// src/components/StudentProfile.jsx
import React from 'react';
import { initialReports } from '../data';
import './StudentProfile.css';

export default function StudentProfile({ student, onClose }) {
  // Find all reports by this student
  const reports = initialReports.filter(r => r.student === student.name);

  return (
    <div className="student-profile">
      <h3>{student.name}</h3>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Major:</strong> {student.major}</p>
      <p><strong>Status:</strong> {student.internshipStatus}</p>

      <h4>Submitted Reports</h4>
      {reports.length > 0 ? (
        <ul>
          {reports.map(r => (
            <li key={r.id}>
              <div className="report-info">
                <strong>{r.title}</strong>
                <span className={`status ${r.status.toLowerCase()}`}>
                  {r.status}
                </span>
              </div>
              <div className="report-details">
                <p>Company: {r.company}</p>
                <p>Duration: {r.details.start} to {r.details.end}</p>
                <p>Supervisor: {r.details.supervisor}</p>
              </div>
              <a href={r.fileUrl} download className="download-link">
                Download Report
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports submitted.</p>
      )}

      <button onClick={onClose} className="close-button">Close Profile</button>
    </div>
  );
}
