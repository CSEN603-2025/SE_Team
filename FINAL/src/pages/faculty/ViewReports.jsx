import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaDownload, FaEye } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

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
        fileUrl: '#'
      },
      {
        id: 2,
        studentName: 'Michael Chen',
        reportType: 'Monthly Evaluation',
        submissionDate: '2024-03-14',
        status: 'reviewed',
        company: 'Digital Innovations',
        supervisor: 'Emily Brown',
        fileUrl: '#'
      },
      {
        id: 3,
        studentName: 'Emma Davis',
        reportType: 'Final Report',
        submissionDate: '2024-03-13',
        status: 'in_progress',
        company: 'Global Systems',
        supervisor: 'David Wilson',
        fileUrl: '#'
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

  return (
    <DashboardLayout title="View Reports">
      <div className="reports-container">
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
          <div className="reports-table">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Report Type</th>
                  <th>Company</th>
                  <th>Supervisor</th>
                  <th>Submission Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map(report => (
                  <tr key={report.id}>
                    <td>{report.studentName}</td>
                    <td>{report.reportType}</td>
                    <td>{report.company}</td>
                    <td>{report.supervisor}</td>
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
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewReports; 