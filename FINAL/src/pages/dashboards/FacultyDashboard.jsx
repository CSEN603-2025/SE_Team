import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUserGraduate, FaClipboardCheck, FaFilter, FaCheck, FaTimes, FaComments, FaChartBar, FaSearch, FaHistory } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [stats, setStats] = useState({
    pendingReports: 15,
    reviewedReports: 45,
    totalStudents: 120,
    activeInternships: 35
  });

  useEffect(() => {
    if (!user || user.type !== 'faculty') {
      navigate('/');
      return;
    }

    // In a real app, this would fetch from an API
    setStats({
      pendingReports: 15,
      reviewedReports: 45,
      totalStudents: 120,
      activeInternships: 35
    });
  }, [user, navigate]);

  const actions = [
    {
      icon: <FaFileAlt />,
      title: "View Reports",
      onClick: () => navigate('/view-reports')
    },
    {
      icon: <FaUserGraduate />,
      title: "Student List",
      onClick: () => navigate('/student-list')
    },
    {
      icon: <FaClipboardCheck />,
      title: "Review Reports",
      onClick: () => navigate('/review-reports')
    },
    {
      icon: <FaFilter />,
      title: "Filter Reports",
      onClick: () => navigate('/filter-reports')
    },
    {
      icon: <FaCheck />,
      title: "Accept Reports",
      onClick: () => navigate('/accept-reports')
    },
    {
      icon: <FaTimes />,
      title: "Flag Reports",
      onClick: () => navigate('/flag-reports')
    },
    {
      icon: <FaComments />,
      title: "Submit Comments",
      onClick: () => navigate('/submit-comments')
    },
    {
      icon: <FaSearch />,
      title: "Search Reports",
      onClick: () => navigate('/search-reports')
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!user) return null;

  return (
    <DashboardLayout title="Faculty Dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Pending Reports</h3>
          <p>{stats.pendingReports}</p>
        </div>
        <div className="stat-card">
          <h3>Reviewed Reports</h3>
          <p>{stats.reviewedReports}</p>
        </div>
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Active Internships</h3>
          <p>{stats.activeInternships}</p>
        </div>
      </div>

      <h2 className="section-title">Quick Actions</h2>
      <div className="action-grid">
        {actions.map((action, index) => (
          <button 
            key={index}
            className="action-button"
            onClick={action.onClick}
          >
            <span className="action-icon">{action.icon}</span>
            {action.title}
          </button>
        ))}
      </div>

      <h2 className="section-title">Recent Reports</h2>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Report Type</th>
              <th>Submission Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sarah Johnson</td>
              <td>Weekly Progress Report</td>
              <td>2024-03-15</td>
              <td><span className="status-badge pending">Pending Review</span></td>
            </tr>
            <tr>
              <td>Michael Chen</td>
              <td>Monthly Evaluation</td>
              <td>2024-03-14</td>
              <td><span className="status-badge success">Reviewed</span></td>
            </tr>
            <tr>
              <td>Emma Davis</td>
              <td>Final Report</td>
              <td>2024-03-13</td>
              <td><span className="status-badge active">In Progress</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard; 