// FINAL/pages/student/Reports.jsx
import React, { useState, useEffect } from 'react';
import './Reports.css';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'weekly', // weekly, monthly, final
    content: '',
    attachments: [],
    weekNumber: '',
    monthNumber: '',
    learnings: '',
    challenges: '',
    nextSteps: ''
  });

  useEffect(() => {
    // Load reports from localStorage (in real app, this would be an API call)
    const savedReports = JSON.parse(localStorage.getItem('studentReports') || '[]');
    setReports(savedReports);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      ...formData,
      id: Date.now(),
      submittedDate: new Date().toISOString(),
      status: 'pending', // pending, approved, rejected
      feedback: null
    };

    setReports(prev => [...prev, newReport]);
    localStorage.setItem('studentReports', JSON.stringify([...reports, newReport]));
    
    // Reset form
    setFormData({
      title: '',
      type: 'weekly',
      content: '',
      attachments: [],
      weekNumber: '',
      monthNumber: '',
      learnings: '',
      challenges: '',
      nextSteps: ''
    });
    setIsSubmitting(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h2>Internship Reports</h2>
        <button 
          onClick={() => setIsSubmitting(!isSubmitting)}
          className={`submit-button ${isSubmitting ? 'cancel' : ''}`}
        >
          {isSubmitting ? 'Cancel' : 'Submit New Report'}
        </button>
      </div>

      {isSubmitting && (
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-section">
            <h3>New Report</h3>
            
            <div className="form-group">
              <label>Report Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Report Type:</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="weekly">Weekly Report</option>
                <option value="monthly">Monthly Report</option>
                <option value="final">Final Report</option>
              </select>
            </div>

            {formData.type === 'weekly' && (
              <div className="form-group">
                <label>Week Number:</label>
                <input
                  type="number"
                  name="weekNumber"
                  value={formData.weekNumber}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
            )}

            {formData.type === 'monthly' && (
              <div className="form-group">
                <label>Month Number:</label>
                <input
                  type="number"
                  name="monthNumber"
                  value={formData.monthNumber}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Key Learnings:</label>
              <textarea
                name="learnings"
                value={formData.learnings}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Challenges Faced:</label>
              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Next Steps:</label>
              <textarea
                name="nextSteps"
                value={formData.nextSteps}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Detailed Report:</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="10"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                Submit Report
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="reports-list">
        {reports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <div>
                <h3>{report.title}</h3>
                <p className="report-meta">
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report
                  {report.type === 'weekly' && ` - Week ${report.weekNumber}`}
                  {report.type === 'monthly' && ` - Month ${report.monthNumber}`}
                </p>
              </div>
              <span className={`status ${getStatusClass(report.status)}`}>
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </span>
            </div>

            <div className="report-content">
              <div className="content-section">
                <h4>Key Learnings</h4>
                <p>{report.learnings}</p>
              </div>
              <div className="content-section">
                <h4>Challenges</h4>
                <p>{report.challenges}</p>
              </div>
              <div className="content-section">
                <h4>Next Steps</h4>
                <p>{report.nextSteps}</p>
              </div>
            </div>

            {report.feedback && (
              <div className="feedback-section">
                <h4>Supervisor Feedback</h4>
                <p>{report.feedback}</p>
              </div>
            )}

            <div className="report-footer">
              <p className="submission-date">
                Submitted on: {new Date(report.submittedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}

        {reports.length === 0 && !isSubmitting && (
          <div className="no-reports">
            <p>No reports submitted yet. Click "Submit New Report" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
