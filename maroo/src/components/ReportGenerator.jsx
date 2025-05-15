// ReportGenerator.jsx
import React, { useState } from 'react';
import './ReportGenerator.css';

const ReportGenerator = ({ onGenerate }) => {
  const [reportType, setReportType] = useState('summary');
  const [timeRange, setTimeRange] = useState('current');

  const handleGenerate = () => {
    onGenerate(reportType, timeRange);
  };

  return (
    <div className="report-generator">
      <h3>Generate Statistical Report</h3>
      <div className="generator-controls">
        <div className="control-group">
          <label>Report Type:</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="summary">Summary Report</option>
            <option value="detailed">Detailed Report</option>
            <option value="companies">Company Performance</option>
            <option value="courses">Course Relevance</option>
          </select>
        </div>
        <div className="control-group">
          <label>Time Range:</label>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="current">Current Cycle</option>
            <option value="last">Last Cycle</option>
            <option value="year">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <button onClick={handleGenerate}>Generate PDF Report</button>
      </div>
    </div>
  );
};

export default ReportGenerator;