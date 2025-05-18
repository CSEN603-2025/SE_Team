import React, { useState, useEffect } from 'react';
import './ReportManagement.css';

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    major: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    // Load reports from localStorage
    const loadReports = () => {
      try {
        const storedReports = JSON.parse(localStorage.getItem('reports')) || [];
        setReports(storedReports);
      } catch (error) {
        console.error('Error loading reports:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (reportId, newStatus, feedback = '') => {
    const updatedReports = reports.map(report => {
      if (report.id === reportId) {
        const updatedReport = {
          ...report,
          status: newStatus,
          feedback: feedback || report.feedback,
          reviewedAt: new Date().toISOString()
        };

        // Create notification for status change
        const notification = {
          id: Date.now().toString(),
          type: 'report_status',
          title: 'Report Status Updated',
          message: `Your report has been marked as ${newStatus}${feedback ? '. Feedback provided.' : ''}`,
          createdAt: new Date().toISOString(),
          read: false,
          studentId: report.studentId
        };

        const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
        localStorage.setItem('notifications', JSON.stringify([...storedNotifications, notification]));

        return updatedReport;
      }
      return report;
    });
    
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  const handleAppealResponse = (reportId, response) => {
    const updatedReports = reports.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          appealResponse: response,
          appealRespondedAt: new Date().toISOString()
        };
      }
      return report;
    });

    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));

    // Create notification for appeal response
    const report = reports.find(r => r.id === reportId);
    const notification = {
      id: Date.now().toString(),
      type: 'appeal_response',
      title: 'Appeal Response',
      message: 'Your report appeal has received a response',
      createdAt: new Date().toISOString(),
      read: false,
      studentId: report.studentId
    };

    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    localStorage.setItem('notifications', JSON.stringify([...storedNotifications, notification]));
  };

  const downloadReport = (report) => {
    // Create report content
    const content = `
Report Details
-------------
Student Name: ${report.studentName}
Student ID: ${report.studentId}
Major: ${report.major}
Company: ${report.company}
Supervisor: ${report.supervisor}
Duration: ${report.startDate} to ${report.endDate}

Report Content
-------------
${report.content}

Evaluation
----------
${Object.entries(report.evaluation || {}).map(([key, value]) => `${key}: ${value}`).join('\n')}

Status: ${report.status}
${report.feedback ? `\nFeedback: ${report.feedback}` : ''}
${report.appealResponse ? `\nAppeal Response: ${report.appealResponse}` : ''}
    `.trim();

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${report.studentId}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
      report.studentId.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || report.status === filters.status;
    const matchesMajor = filters.major === 'all' || report.major === filters.major;
    
    return matchesSearch && matchesStatus && matchesMajor;
  });

  const majors = [...new Set(reports.map(report => report.major))];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="report-management">
      <h2>Report Management</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by student name or ID..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="search-input"
        />

        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="needs_revision">Needs Revision</option>
          <option value="appealed">Appealed</option>
        </select>

        <select
          value={filters.major}
          onChange={(e) => handleFilterChange('major', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Majors</option>
          {majors.map(major => (
            <option key={major} value={major}>{major}</option>
          ))}
        </select>
      </div>

      <div className="reports-grid">
        {filteredReports.map(report => (
          <div 
            key={report.id} 
            className="report-card"
            onClick={() => setSelectedReport(report)}
          >
            <div className="report-header">
              <h3>{report.studentName}</h3>
              <span className={`status ${report.status}`}>
                {report.status}
              </span>
            </div>

            <div className="report-details">
              <p><strong>Student ID:</strong> {report.studentId}</p>
              <p><strong>Major:</strong> {report.major}</p>
              <p><strong>Company:</strong> {report.company}</p>
              <p><strong>Submission Date:</strong> {new Date(report.submittedAt).toLocaleDateString()}</p>
            </div>

            <div className="report-actions">
              <button 
                className="download-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadReport(report);
                }}
              >
                Download Report
              </button>
              <button 
                className="view-details"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedReport(report);
                }}
              >
                Review Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedReport && (
        <div className="report-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedReport(null)}>×</button>
            
            <h2>Report Review</h2>
            <div className="report-info">
              <div className="info-section">
                <h3>Student Information</h3>
                <p><strong>Name:</strong> {selectedReport.studentName}</p>
                <p><strong>ID:</strong> {selectedReport.studentId}</p>
                <p><strong>Major:</strong> {selectedReport.major}</p>
              </div>

              <div className="info-section">
                <h3>Internship Details</h3>
                <p><strong>Company:</strong> {selectedReport.company}</p>
                <p><strong>Supervisor:</strong> {selectedReport.supervisor}</p>
                <p><strong>Duration:</strong> {selectedReport.duration}</p>
                <p><strong>Period:</strong> {selectedReport.startDate} to {selectedReport.endDate}</p>
              </div>

              <div className="info-section">
                <h3>Report Content</h3>
                <div className="report-content">
                  {selectedReport.content}
                </div>
              </div>

              {selectedReport.appeal && (
                <div className="info-section appeal-section">
                  <h3>Student Appeal</h3>
                  <div className="appeal-content">
                    <p>{selectedReport.appeal}</p>
                    <p className="appeal-date">
                      Submitted on: {new Date(selectedReport.appealedAt).toLocaleString()}
                    </p>
                  </div>
                  <textarea
                    value={selectedReport.appealResponse || ''}
                    onChange={(e) => handleAppealResponse(selectedReport.id, e.target.value)}
                    placeholder="Enter your response to the appeal..."
                    className="appeal-response-input"
                  />
                </div>
              )}

              <div className="info-section">
                <h3>Review</h3>
                <div className="review-controls">
                  <select
                    value={selectedReport.status}
                    onChange={(e) => handleStatusChange(selectedReport.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="needs_revision">Needs Revision</option>
                  </select>

                  <textarea
                    value={selectedReport.feedback || ''}
                    onChange={(e) => handleStatusChange(selectedReport.id, selectedReport.status, e.target.value)}
                    placeholder="Add feedback for the student..."
                    className="feedback-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportManagement; 