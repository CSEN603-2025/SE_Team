import React from 'react';
import { reports } from '../../data/dummyData';

const Report = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userReports = reports.filter(report => report.studentId === user.id);

  return (
    <div className="win98-container">
      <div className="title-bar">
        <div className="title-bar-text">My Reports</div>
      </div>
      
      <div className="window-body">
        <div className="reports-list">
          {userReports.length > 0 ? (
            userReports.map(report => (
              <div key={report.id} className="report-card">
                <h3>{report.title}</h3>
                <p><strong>Submission Date:</strong> {report.submissionDate}</p>
                <div className="report-content">
                  <p>{report.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No reports submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report; 