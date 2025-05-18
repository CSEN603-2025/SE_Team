import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitReport = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    title: '',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle report submission
    console.log('Report submitted:', report);
    navigate('/dashboard');
  };

  return (
    <div>
      <h1>Submit Internship Report</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Report Title</label>
          <input
            type="text"
            id="title"
            value={report.title}
            onChange={(e) => setReport(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="content">Report Content</label>
          <textarea
            id="content"
            value={report.content}
            onChange={(e) => setReport(prev => ({ ...prev, content: e.target.value }))}
          />
        </div>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default SubmitReport; 