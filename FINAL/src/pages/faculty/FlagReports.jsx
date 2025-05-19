import React, { useState, useEffect } from 'react';
import { FaFlag, FaEye, FaDownload, FaExclamationTriangle } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const FlagReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [flagReason, setFlagReason] = useState('');
  const [flagSeverity, setFlagSeverity] = useState('medium');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockReports = [
      {
        id: 1,
        studentName: 'Sarah Johnson',
        reportType: 'Weekly Progress Report',
        submissionDate: '2024-03-15',
        status: 'pending',
        company: 'Tech Solutions Inc.',
        supervisor: 'John Smith',
        content: 'This week, I focused on implementing the new feature...',
        attachments: ['weekly_report.pdf', 'screenshots.zip'],
        flags: []
      },
      {
        id: 2,
        studentName: 'Michael Chen',
        reportType: 'Monthly Evaluation',
        submissionDate: '2024-03-14',
        status: 'pending',
        company: 'Digital Innovations',
        supervisor: 'Emily Brown',
        content: 'During this month, I completed the following tasks...',
        attachments: ['monthly_evaluation.pdf'],
        flags: []
      },
      {
        id: 3,
        studentName: 'Emma Davis',
        reportType: 'Final Report',
        submissionDate: '2024-03-13',
        status: 'pending',
        company: 'Global Systems',
        supervisor: 'David Wilson',
        content: 'The internship project has been successfully completed...',
        attachments: ['final_report.pdf', 'project_documentation.pdf'],
        flags: []
      }
    ];
    setReports(mockReports);
    setLoading(false);
  }, []);

  const handleFlag = (reportId) => {
    if (!flagReason.trim()) {
      alert('Please provide a reason for flagging the report');
      return;
    }

    const newFlag = {
      id: Date.now(),
      reason: flagReason,
      severity: flagSeverity,
      date: new Date().toISOString().split('T')[0]
    };

    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, flags: [...report.flags, newFlag] }
        : report
    ));
    setSelectedReport(null);
    setFlagReason('');
    setFlagSeverity('medium');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'status-badge pending';
      case 'flagged': return 'status-badge warning';
      default: return 'status-badge';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'flagged': return 'Flagged';
      default: return status;
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      default: return '';
    }
  };

  return (
    <DashboardLayout title="Flag Reports">
      <div className="flag-reports-container">
        {loading ? (
          <div className="loading">Loading reports...</div>
        ) : (
          <>
            <div className="reports-list">
              <table>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Report Type</th>
                    <th>Submission Date</th>
                    <th>Status</th>
                    <th>Flags</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr 
                      key={report.id}
                      className={selectedReport?.id === report.id ? 'selected' : ''}
                      onClick={() => setSelectedReport(report)}
                    >
                      <td>{report.studentName}</td>
                      <td>{report.reportType}</td>
                      <td>{report.submissionDate}</td>
                      <td>
                        <span className={getStatusBadgeClass(report.status)}>
                          {getStatusText(report.status)}
                        </span>
                      </td>
                      <td>{report.flags.length}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view" title="View Report">
                            <FaEye />
                          </button>
                          <button className="action-btn download" title="Download Report">
                            <FaDownload />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedReport && (
              <div className="report-details">
                <h3>Report Details</h3>
                <div className="details-content">
                  <div className="detail-item">
                    <label>Student:</label>
                    <span>{selectedReport.studentName}</span>
                  </div>
                  <div className="detail-item">
                    <label>Report Type:</label>
                    <span>{selectedReport.reportType}</span>
                  </div>
                  <div className="detail-item">
                    <label>Company:</label>
                    <span>{selectedReport.company}</span>
                  </div>
                  <div className="detail-item">
                    <label>Supervisor:</label>
                    <span>{selectedReport.supervisor}</span>
                  </div>
                  <div className="detail-item">
                    <label>Content:</label>
                    <p>{selectedReport.content}</p>
                  </div>
                  <div className="detail-item">
                    <label>Attachments:</label>
                    <ul>
                      {selectedReport.attachments.map((file, index) => (
                        <li key={index}>{file}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flags-section">
                    <h4>Existing Flags</h4>
                    {selectedReport.flags.length > 0 ? (
                      <div className="flags-list">
                        {selectedReport.flags.map(flag => (
                          <div key={flag.id} className={`flag-item ${getSeverityClass(flag.severity)}`}>
                            <div className="flag-header">
                              <span className="flag-severity">{flag.severity}</span>
                              <span className="flag-date">{flag.date}</span>
                            </div>
                            <p className="flag-reason">{flag.reason}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No flags have been raised for this report.</p>
                    )}
                  </div>

                  <div className="flag-form">
                    <h4>Raise New Flag</h4>
                    <div className="form-group">
                      <label>Severity:</label>
                      <select
                        value={flagSeverity}
                        onChange={(e) => setFlagSeverity(e.target.value)}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Reason:</label>
                      <textarea
                        value={flagReason}
                        onChange={(e) => setFlagReason(e.target.value)}
                        placeholder="Enter the reason for flagging this report..."
                        rows="4"
                      />
                    </div>
                    <button 
                      className="action-btn flag"
                      onClick={() => handleFlag(selectedReport.id)}
                    >
                      <FaFlag /> Raise Flag
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FlagReports; 