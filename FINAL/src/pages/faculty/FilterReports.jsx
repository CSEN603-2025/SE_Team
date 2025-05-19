import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaDownload, FaEye } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const FilterReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    reportType: 'all',
    status: 'all',
    department: 'all',
    company: 'all'
  });

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
        department: 'Computer Science',
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
        department: 'Computer Science',
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
        department: 'Computer Science',
        fileUrl: '#'
      }
    ];
    setReports(mockReports);
    setLoading(false);
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const filteredReports = reports.filter(report => {
    const matchesDateRange = filters.dateRange === 'all' || 
      (filters.dateRange === 'week' && isWithinLastWeek(report.submissionDate)) ||
      (filters.dateRange === 'month' && isWithinLastMonth(report.submissionDate));
    
    const matchesReportType = filters.reportType === 'all' || report.reportType === filters.reportType;
    const matchesStatus = filters.status === 'all' || report.status === filters.status;
    const matchesDepartment = filters.department === 'all' || report.department === filters.department;
    const matchesCompany = filters.company === 'all' || report.company === filters.company;

    return matchesDateRange && matchesReportType && matchesStatus && matchesDepartment && matchesCompany;
  });

  const isWithinLastWeek = (date) => {
    const reportDate = new Date(date);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return reportDate >= oneWeekAgo;
  };

  const isWithinLastMonth = (date) => {
    const reportDate = new Date(date);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return reportDate >= oneMonthAgo;
  };

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
    <DashboardLayout title="Filter Reports">
      <div className="filter-reports-container">
        <div className="filters-section">
          <h3>Filter Options</h3>
          <div className="filter-grid">
            <div className="filter-group">
              <label>Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Report Type</label>
              <select
                value={filters.reportType}
                onChange={(e) => handleFilterChange('reportType', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Weekly Progress Report">Weekly Progress</option>
                <option value="Monthly Evaluation">Monthly Evaluation</option>
                <option value="Final Report">Final Report</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Department</label>
              <select
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Company</label>
              <select
                value={filters.company}
                onChange={(e) => handleFilterChange('company', e.target.value)}
              >
                <option value="all">All Companies</option>
                <option value="Tech Solutions Inc.">Tech Solutions Inc.</option>
                <option value="Digital Innovations">Digital Innovations</option>
                <option value="Global Systems">Global Systems</option>
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
                  <th>Department</th>
                  <th>Company</th>
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
        )}
      </div>
    </DashboardLayout>
  );
};

export default FilterReports; 