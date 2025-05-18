import React, { useState, useEffect } from 'react';
import './ReportManagement.css';

export default function ReportManagement() {
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('facultyReports');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedReport, setSelectedReport] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [appealResponse, setAppealResponse] = useState('');

  useEffect(() => {
    localStorage.setItem('facultyReports', JSON.stringify(reports));
  }, [reports]);

  const handleStatusChange = (reportId, newStatus) => {
    setReports(prev => prev.map(report => {
      if (report.id === reportId) {
        // Add notification for status change
        if ('Notification' in window) {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('Report Status Updated', {
                body: `Report #${reportId} status changed to ${newStatus}`
              });
            }
          });
        }
        return { ...report, status: newStatus };
      }
      return report;
    }));
  };

  const handleFeedbackSubmit = (reportId) => {
    if (!feedback.trim()) {
      alert('Please enter feedback before submitting');
      return;
    }

    setReports(prev => prev.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          feedback: [...(report.feedback || []), {
            id: Date.now(),
            text: feedback,
            timestamp: new Date().toISOString()
          }]
        };
      }
      return report;
    }));

    setFeedback('');
  };

  const handleAppealResponse = (reportId) => {
    if (!appealResponse.trim()) {
      alert('Please enter a response to the appeal');
      return;
    }

    setReports(prev => prev.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          appealResponse: {
            text: appealResponse,
            timestamp: new Date().toISOString()
          },
          appealStatus: 'responded'
        };
      }
      return report;
    }));

    // Send notification for appeal response
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Appeal Response Sent', {
            body: `Response sent for Report #${reportId}`
          });
        }
      });
    }

    setAppealResponse('');
  };

  const downloadReport = (report) => {
    // Create formatted text content
    const content = `
Report #${report.id}
Student: ${report.studentName}
Submission Date: ${new Date(report.submissionDate).toLocaleDateString()}
Status: ${report.status}

Content:
${report.content}

Feedback:
${report.feedback?.map(f => `- ${new Date(f.timestamp).toLocaleDateString()}: ${f.text}`).join('\n') || 'No feedback yet'}

${report.appealResponse ? `
Appeal Response:
${new Date(report.appealResponse.timestamp).toLocaleDateString()}: ${report.appealResponse.text}
` : ''}
    `.trim();

    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${report.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="report-management">
      <section className="reports-list">
        <h2>Student Reports</h2>
        <div className="reports-grid">
          {reports.map(report => (
            <div 
              key={report.id}
              className={`report-card ${report.status.toLowerCase()}`}
              onClick={() => setSelectedReport(report)}
            >
              <h3>Report #{report.id}</h3>
              <p><strong>Student:</strong> {report.studentName}</p>
              <p><strong>Status:</strong> {report.status}</p>
              <p><strong>Submitted:</strong> {new Date(report.submissionDate).toLocaleDateString()}</p>
              
              <div className="card-actions">
                <select
                  value={report.status}
                  onChange={(e) => handleStatusChange(report.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Needs Revision">Needs Revision</option>
                </select>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadReport(report);
                  }}
                  className="btn-download"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedReport && (
        <section className="report-details">
          <h2>Report Details</h2>
          <div className="report-content">
            <h3>Report #{selectedReport.id}</h3>
            <p><strong>Student:</strong> {selectedReport.studentName}</p>
            <p><strong>Status:</strong> {selectedReport.status}</p>
            <p><strong>Content:</strong></p>
            <div className="content-box">
              {selectedReport.content}
            </div>

            {/* Feedback Section */}
            <div className="feedback-section">
              <h4>Feedback History</h4>
              {selectedReport.feedback?.map(f => (
                <div key={f.id} className="feedback-item">
                  <p>{f.text}</p>
                  <small>{new Date(f.timestamp).toLocaleString()}</small>
                </div>
              ))}
              <div className="feedback-form">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter feedback..."
                  rows={3}
                />
                <button 
                  onClick={() => handleFeedbackSubmit(selectedReport.id)}
                  className="btn-primary"
                >
                  Submit Feedback
                </button>
              </div>
            </div>

            {/* Appeal Section */}
            {selectedReport.hasAppeal && !selectedReport.appealResponse && (
              <div className="appeal-section">
                <h4>Appeal Response</h4>
                <textarea
                  value={appealResponse}
                  onChange={(e) => setAppealResponse(e.target.value)}
                  placeholder="Enter response to student's appeal..."
                  rows={3}
                />
                <button 
                  onClick={() => handleAppealResponse(selectedReport.id)}
                  className="btn-primary"
                >
                  Send Response
                </button>
              </div>
            )}

            {selectedReport.appealResponse && (
              <div className="appeal-response">
                <h4>Appeal Response</h4>
                <p>{selectedReport.appealResponse.text}</p>
                <small>
                  {new Date(selectedReport.appealResponse.timestamp).toLocaleString()}
                </small>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
} 