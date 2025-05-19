import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUserGraduate, FaClipboardCheck, FaFilter, FaCheck, FaTimes, FaComments, FaChartBar, FaSearch, FaHistory } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const statCards = [
  {
    key: 'pendingReports',
    label: 'Pending Reports',
    icon: <FaClipboardCheck size={28} color="#F76E11" />,
    color: '#FFF3E0'
  },
  {
    key: 'reviewedReports',
    label: 'Reviewed Reports',
    icon: <FaFileAlt size={28} color="#4F8A8B" />,
    color: '#E8F6EF'
  },
  {
    key: 'totalStudents',
    label: 'Total Students',
    icon: <FaUserGraduate size={28} color="#3A6351" />,
    color: '#E4EFE7'
  },
  {
    key: 'activeInternships',
    label: 'Active Internships',
    icon: <FaChartBar size={28} color="#F9B208" />,
    color: '#FFF9E5'
  }
];

const actions = [
  {
    icon: <FaFileAlt />,
    title: 'View Reports',
    onClick: (navigate) => navigate('/view-reports')
  },
  {
    icon: <FaUserGraduate />,
    title: 'Student List',
    onClick: (navigate) => navigate('/student-list')
  },
  {
    icon: <FaClipboardCheck />,
    title: 'Review Reports',
    onClick: (navigate) => navigate('/review-reports')
  },
  {
    icon: <FaFilter />,
    title: 'Filter Reports',
    onClick: (navigate) => navigate('/view-reports')
  },
  {
    icon: <FaCheck />,
    title: 'Accept Reports',
    onClick: (navigate) => navigate('/review-reports')
  },
  {
    icon: <FaTimes />,
    title: 'Flag Reports',
    onClick: (navigate) => navigate('/review-reports')
  },
  {
    icon: <FaComments />,
    title: 'Submit Comments',
    onClick: (navigate) => navigate('/review-reports')
  },
  {
    icon: <FaSearch />,
    title: 'Search Reports',
    onClick: (navigate) => navigate('/view-reports')
  }
];

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
  }, [user, navigate]);

  if (!user) return null;

  return (
    <DashboardLayout title="Faculty Dashboard">
      <div className="stats-grid">
        {statCards.map(card => (
          <div
            key={card.key}
            className="stat-card"
            tabIndex={0}
          >
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-label">{card.label}</div>
            <div className="stat-value">{stats[card.key]}</div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Quick Actions</h2>
      <div className="action-grid">
        {actions.map((action, index) => (
          <button
            key={index}
            className="action-button"
            onClick={() => action.onClick(navigate)}
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