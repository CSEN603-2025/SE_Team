import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaDownload } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const SearchReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

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
        department: 'Computer Science',
        semester: 'Spring 2024'
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
        department: 'Computer Science',
        semester: 'Spring 2024'
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
        department: 'Computer Science',
        semester: 'Spring 2024'
      }
    ];
    setReports(mockReports);
    setLoading(false);
  }, []);

  const filteredReports = reports.filter(report => {
    const searchTermLower = searchTerm.toLowerCase();
    
    if (searchField === 'all') {
      return (
        report.studentName.toLowerCase().includes(searchTermLower) ||
        report.reportType.toLowerCase().includes(searchTermLower) ||
        report.company.toLowerCase().includes(searchTermLower) ||
        report.supervisor.toLowerCase().includes(searchTermLower) ||
        report.content.toLowerCase().includes(searchTermLower) ||
        report.department.toLowerCase().includes(searchTermLower) ||
        report.semester.toLowerCase().includes(searchTermLower)
      );
    }

    return report[searchField].toLowerCase().includes(searchTermLower);
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

  return (
    <DashboardLayout title="Search Reports">
      <div className="search-reports-container">
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
          <div className="search-field-selector">
            <label>Search in:</label>
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            >
              <option value="all">All Fields</option>
              <option value="studentName">Student Name</option>
              <option value="reportType">Report Type</option>
              <option value="company">Company</option>
              <option value="supervisor">Supervisor</option>
              <option value="department">Department</option>
              <option value="semester">Semester</option>
            </select>
          </div>
        </div>

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
                    <th>Department</th>
                    <th>Company</th>
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
                      <td>{report.department}</td>
                      <td>{report.company}</td>
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
                    <label>Department:</label>
                    <span>{selectedReport.department}</span>
                  </div>
                  <div className="detail-item">
                    <label>Semester:</label>
                    <span>{selectedReport.semester}</span>
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
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SearchReports; 