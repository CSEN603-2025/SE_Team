import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { FaFileAlt } from 'react-icons/fa';
import '../../styles/Internships.css';

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
    <DashboardLayout title="Submit Internship Report">
      <div className="report-section">
        <div className="report-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FaFileAlt size={28} style={{ color: '#4F8A8B' }} />
            <h2 style={{ margin: 0 }}>Submit Internship Report</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label htmlFor="title">Report Title</label>
            <input
              type="text"
              id="title"
              value={report.title}
              onChange={(e) => setReport(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter report title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Report Content</label>
            <textarea
              id="content"
              value={report.content}
              onChange={(e) => setReport(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write your report here..."
              rows={8}
            />
          </div>
          <button type="submit" className="submit-btn">Submit Report</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default SubmitReport; 