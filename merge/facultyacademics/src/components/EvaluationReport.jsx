// EvaluationReport.jsx
import React from 'react';
import './EvaluationReport.css';

const EvaluationReport = ({ evaluation }) => {
  // Fallback empty object if evaluation is not provided
  const safeEval = evaluation || {
    studentName: 'N/A',
    studentMajor: 'N/A',
    companyName: 'N/A',
    supervisorName: 'N/A',
    startDate: 'N/A',
    endDate: 'N/A',
    performance: 'N/A',
    skillsDeveloped: 'N/A',
    recommendations: 'N/A'
  };

  return (
    <div className="evaluation-report">
      <h2>Internship Evaluation Report</h2>

      <div className="evaluation-header">
        <div>
          <h3>Student Information</h3>
          <p>Name: {safeEval.studentName}</p>
          <p>Major: {safeEval.studentMajor}</p>
        </div>
        <div>
          <h3>Company Information</h3>
          <p>Name: {safeEval.companyName}</p>
          <p>Supervisor: {safeEval.supervisorName}</p>
        </div>
        <div>
          <h3>Internship Period</h3>
          <p>Start: {safeEval.startDate}</p>
          <p>End: {safeEval.endDate}</p>
        </div>
      </div>

      <div className="evaluation-content">
        <h3>Evaluation Details</h3>

        <div className="evaluation-section">
          <h4>Performance</h4>
          <p>{safeEval.performance}</p>
        </div>
        <div className="evaluation-section">
          <h4>Skills Developed</h4>
          <p>{safeEval.skillsDeveloped}</p>
        </div>
        <div className="evaluation-section">
          <h4>Recommendations</h4>
          <p>{safeEval.recommendations}</p>
        </div>
      </div>

      <div className="evaluation-actions">
        <button>Download as PDF</button>
      </div>
    </div>
  );
};

export default EvaluationReport;
