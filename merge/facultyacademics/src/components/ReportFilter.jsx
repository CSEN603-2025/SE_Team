// ReportsFilter.jsx
import React, { useState } from 'react';
import './ReportFilter.css';

const ReportsFilter = ({ onFilterChange }) => {
  const [major, setMajor] = useState('');
  const [status, setStatus] = useState('');

  const handleFilter = () => {
    onFilterChange({ major, status });
  };

  return (
    <div className="reports-filter">
      <h3>Filter Reports</h3>
      <div className="filter-controls">
        <div className="filter-group">
          <label>Major:</label>
          <select value={major} onChange={(e) => setMajor(e.target.value)}>
            <option value="">All Majors</option>
            <option value="CS">Computer Science</option>
            <option value="MET">Media Engineering</option>
            <option value="BA">Business Administration</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
            <option value="rejected">Rejected</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>
        <button onClick={handleFilter}>Apply Filters</button>
      </div>
    </div>
  );
};

export default ReportsFilter;