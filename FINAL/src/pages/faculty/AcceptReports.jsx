import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaEye, FaDownload } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const AcceptReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [comment, setComment] = useState('');

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
        attachments: ['weekly_report.pdf', 'screenshots.zip']
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
        attachments: ['monthly_evaluation.pdf']
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
        attachments: ['final_report.pdf', 'project_documentation.pdf']
      }
    ];
    setReports(mockReports);
    setLoading(false);
  }, []);

  const handleAccept = (reportId) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, status: 'accepted', comment: comment }
        : report
    ));
    setSelectedReport(null);
    setComment('');
  };

  const handleReject = (reportId) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, status: 'rejected', comment: comment }
        : report
    ));
    setSelectedReport(null);
    setComment('');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'status-badge pending';
      case 'accepted': return 'status-badge success';
      case 'rejected': return 'status-badge error';
      default: return 'status-badge';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  return (
    <DashboardLayout title="Accept Reports">
      <div className="accept-reports-container">
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
                  <div className="detail-item">
                    <label>Comments:</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Enter your comments here..."
                      rows="4"
                    />
                  </div>
                  <div className="action-buttons">
                    <button 
                      className="action-btn accept"
                      onClick={() => handleAccept(selectedReport.id)}
                    >
                      <FaCheck /> Accept Report
                    </button>
                    <button 
                      className="action-btn reject"
                      onClick={() => handleReject(selectedReport.id)}
                    >
                      <FaTimes /> Reject Report
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

export default AcceptReports; 