import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaCheck, FaTimes, FaComment, FaFileAlt } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const ReviewReports = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reviewComment, setReviewComment] = useState('');

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
        attachments: ['progress_report.pdf', 'screenshots.zip']
      },
      {
        id: 2,
        studentName: 'Michael Chen',
        reportType: 'Monthly Evaluation',
        submissionDate: '2024-03-14',
        status: 'reviewed',
        company: 'Digital Innovations',
        supervisor: 'Emily Brown',
        content: 'During this month, I completed the following tasks...',
        attachments: ['monthly_report.pdf']
      },
      {
        id: 3,
        studentName: 'Emma Davis',
        reportType: 'Final Report',
        submissionDate: '2024-03-13',
        status: 'in_progress',
        company: 'Global Systems',
        supervisor: 'David Wilson',
        content: 'The final project implementation included...',
        attachments: ['final_report.pdf', 'presentation.pptx']
      }
    ];
    setReports(mockReports);
    setLoading(false);
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'status-badge pending';
      case 'reviewed': return 'status-badge success';
      case 'in_progress': return 'status-badge active';
      default: return 'status-badge';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'reviewed': return 'Reviewed';
      case 'in_progress': return 'In Progress';
      default: return status;
    }
  };

  const handleReview = (reportId, action) => {
    // Mock API call - replace with actual API call
    setReports(reports.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          status: action === 'approve' ? 'reviewed' : 'in_progress',
          reviewComment: reviewComment
        };
      }
      return report;
    }));
    setSelectedReport(null);
    setReviewComment('');
  };

  return (
    <DashboardLayout title="Review Reports">
      <div className="review-reports-container">
        <div className="reports-header">
          <div className="search-filter-container">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-box">
              <FaFilter className="filter-icon" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading reports...</div>
        ) : (
          <div className="reports-grid">
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
                  {filteredReports.map(report => (
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
                        <button 
                          className="action-btn view"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReport(report);
                          }}
                        >
                          <FaFileAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedReport && (
              <div className="report-details">
                <h3>Report Details</h3>
                <div className="report-info">
                  <p><strong>Student:</strong> {selectedReport.studentName}</p>
                  <p><strong>Report Type:</strong> {selectedReport.reportType}</p>
                  <p><strong>Company:</strong> {selectedReport.company}</p>
                  <p><strong>Supervisor:</strong> {selectedReport.supervisor}</p>
                  <p><strong>Submission Date:</strong> {selectedReport.submissionDate}</p>
                </div>

                <div className="report-content">
                  <h4>Content</h4>
                  <p>{selectedReport.content}</p>
                </div>

                <div className="report-attachments">
                  <h4>Attachments</h4>
                  <ul>
                    {selectedReport.attachments.map((attachment, index) => (
                      <li key={index}>
                        <FaFileAlt /> {attachment}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedReport.status === 'pending' && (
                  <div className="review-actions">
                    <textarea
                      placeholder="Enter your review comments..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    />
                    <div className="action-buttons">
                      <button
                        className="action-btn approve"
                        onClick={() => handleReview(selectedReport.id, 'approve')}
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        className="action-btn reject"
                        onClick={() => handleReview(selectedReport.id, 'reject')}
                      >
                        <FaTimes /> Request Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ReviewReports; 