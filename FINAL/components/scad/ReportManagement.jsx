import React, { useState, useEffect } from 'react';
import './ReportManagement.css';

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    major: 'all',
    status: 'all',
    internshipStatus: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [cycleDate, setCycleDate] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      try {
        const storedReports = JSON.parse(localStorage.getItem('reports')) || [];
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const storedCycleDates = JSON.parse(localStorage.getItem('cycleDates')) || {
          startDate: '',
          endDate: ''
        };
        
        setReports(storedReports);
        setStudents(storedStudents);
        setCycleDate(storedCycleDates);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCycleDateChange = (name, value) => {
    const newDates = {
      ...cycleDate,
      [name]: value
    };
    setCycleDate(newDates);
    localStorage.setItem('cycleDates', JSON.stringify(newDates));
  };

  const handleStatusChange = (reportId, newStatus, clarification = '') => {
    const updatedReports = reports.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          status: newStatus,
          clarification: clarification || report.clarification
        };
      }
      return report;
    });
    
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  const exportToPDF = (report) => {
    // Create a formatted string for the PDF content
    const content = `
      Internship Report
      Generated: ${new Date().toLocaleString()}

      Student Information:
      Name: ${report.studentName}
      Major: ${report.major}
      ID: ${report.studentId}

      Company Information:
      Company: ${report.company}
      Supervisor: ${report.supervisor}
      Duration: ${report.startDate} to ${report.endDate}

      Report Details:
      Status: ${report.status}
      ${report.clarification ? `Clarification: ${report.clarification}` : ''}

      Evaluation:
      ${Object.entries(report.evaluation || {})
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')}
    `;

    // Create a Blob and download
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `internship-report-${report.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const filteredReports = reports.filter(report => {
    const matchesMajor = filters.major === 'all' || report.major === filters.major;
    const matchesStatus = filters.status === 'all' || report.status === filters.status;
    return matchesMajor && matchesStatus;
  });

  const filteredStudents = students.filter(student => {
    const matchesStatus = filters.internshipStatus === 'all' || 
      student.internshipStatus === filters.internshipStatus;
    return matchesStatus;
  });

  const majors = [...new Set(reports.map(report => report.major))];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="report-management">
      <div className="cycle-dates">
        <h3>Internship Cycle Dates</h3>
        <div className="date-inputs">
          <div className="date-field">
            <label>Start Date:</label>
            <input
              type="date"
              value={cycleDate.startDate}
              onChange={(e) => handleCycleDateChange('startDate', e.target.value)}
            />
          </div>
          <div className="date-field">
            <label>End Date:</label>
            <input
              type="date"
              value={cycleDate.endDate}
              onChange={(e) => handleCycleDateChange('endDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Students</h3>
        <select
          value={filters.internshipStatus}
          onChange={(e) => handleFilterChange('internshipStatus', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <div className="students-grid">
          {filteredStudents.map(student => (
            <div key={student.id} className="student-card">
              <h4>{student.name}</h4>
              <p className="student-id">ID: {student.id}</p>
              <p className="major">{student.major}</p>
              <span className={`status ${student.internshipStatus}`}>
                {student.internshipStatus}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Internship Reports</h3>
        <div className="filters">
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

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="flagged">Flagged</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="reports-grid">
          {filteredReports.map(report => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <h4>{report.studentName}</h4>
                <span className={`status ${report.status}`}>
                  {report.status}
                </span>
              </div>

              <p className="company">{report.company}</p>
              <p className="dates">
                {report.startDate} - {report.endDate}
              </p>

              <div className="report-actions">
                <button
                  className="view-btn"
                  onClick={() => setSelectedReport(report)}
                >
                  View Details
                </button>
                <button
                  className="export-btn"
                  onClick={() => exportToPDF(report)}
                >
                  Export PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedReport && (
        <div className="report-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedReport(null)}>×</button>
            
            <h2>Report Details</h2>
            <div className="report-details">
              <div className="detail-section">
                <h3>Student Information</h3>
                <p><strong>Name:</strong> {selectedReport.studentName}</p>
                <p><strong>ID:</strong> {selectedReport.studentId}</p>
                <p><strong>Major:</strong> {selectedReport.major}</p>
              </div>

              <div className="detail-section">
                <h3>Company Information</h3>
                <p><strong>Company:</strong> {selectedReport.company}</p>
                <p><strong>Supervisor:</strong> {selectedReport.supervisor}</p>
                <p><strong>Duration:</strong> {selectedReport.startDate} to {selectedReport.endDate}</p>
              </div>

              <div className="detail-section">
                <h3>Report Status</h3>
                <div className="status-controls">
                  <select
                    value={selectedReport.status}
                    onChange={(e) => handleStatusChange(selectedReport.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="flagged">Flagged</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  {(selectedReport.status === 'flagged' || selectedReport.status === 'rejected') && (
                    <textarea
                      placeholder="Add clarification..."
                      value={selectedReport.clarification || ''}
                      onChange={(e) => handleStatusChange(selectedReport.id, selectedReport.status, e.target.value)}
                      className="clarification-input"
                    />
                  )}
                </div>
              </div>

              <div className="detail-section">
                <h3>Evaluation</h3>
                {selectedReport.evaluation ? (
                  <div className="evaluation-details">
                    {Object.entries(selectedReport.evaluation).map(([key, value]) => (
                      <div key={key} className="evaluation-item">
                        <span className="label">{key}:</span>
                        <span className="value">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No evaluation data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportManagement; 