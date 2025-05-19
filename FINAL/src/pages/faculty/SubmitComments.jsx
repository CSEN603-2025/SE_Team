import React, { useState, useEffect } from 'react';
import { FaComment, FaEye, FaDownload, FaPaperPlane } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const SubmitComments = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [comment, setComment] = useState('');
  const [commentType, setCommentType] = useState('feedback');

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
        comments: []
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
        comments: []
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
        comments: []
      }
    ];
    setReports(mockReports);
    setLoading(false);
  }, []);

  const handleSubmitComment = (reportId) => {
    if (!comment.trim()) {
      alert('Please enter a comment before submitting');
      return;
    }

    const newComment = {
      id: Date.now(),
      type: commentType,
      content: comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, comments: [...report.comments, newComment] }
        : report
    ));
    setSelectedReport(null);
    setComment('');
    setCommentType('feedback');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'status-badge pending';
      case 'commented': return 'status-badge info';
      default: return 'status-badge';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'commented': return 'Commented';
      default: return status;
    }
  };

  const getCommentTypeClass = (type) => {
    switch (type) {
      case 'feedback': return 'comment-type-feedback';
      case 'suggestion': return 'comment-type-suggestion';
      case 'question': return 'comment-type-question';
      default: return '';
    }
  };

  return (
    <DashboardLayout title="Submit Comments">
      <div className="submit-comments-container">
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
                    <th>Comments</th>
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
                      <td>{report.comments.length}</td>
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

                  <div className="comments-section">
                    <h4>Existing Comments</h4>
                    {selectedReport.comments.length > 0 ? (
                      <div className="comments-list">
                        {selectedReport.comments.map(comment => (
                          <div key={comment.id} className={`comment-item ${getCommentTypeClass(comment.type)}`}>
                            <div className="comment-header">
                              <span className="comment-type">{comment.type}</span>
                              <span className="comment-date">{comment.date}</span>
                            </div>
                            <p className="comment-content">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No comments have been submitted for this report.</p>
                    )}
                  </div>

                  <div className="comment-form">
                    <h4>Submit New Comment</h4>
                    <div className="form-group">
                      <label>Comment Type:</label>
                      <select
                        value={commentType}
                        onChange={(e) => setCommentType(e.target.value)}
                      >
                        <option value="feedback">Feedback</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="question">Question</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Comment:</label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter your comment here..."
                        rows="4"
                      />
                    </div>
                    <button 
                      className="action-btn submit"
                      onClick={() => handleSubmitComment(selectedReport.id)}
                    >
                      <FaPaperPlane /> Submit Comment
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

export default SubmitComments; 