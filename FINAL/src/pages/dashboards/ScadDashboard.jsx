import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaBuilding, FaClipboardList, FaChartBar, 
         FaUserTie, FaFileAlt, FaCog, FaSearch } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const ScadDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 150,
    activeInternships: 45,
    partnerCompanies: 25,
    pendingApprovals: 8
  });

  const actions = [
    {
      icon: <FaUserGraduate />,
      title: "Manage Students",
      onClick: () => navigate('/manage-students')
    },
    {
      icon: <FaBuilding />,
      title: "Partner Companies",
      onClick: () => navigate('/partner-companies')
    },
    {
      icon: <FaClipboardList />,
      title: "Internship Programs",
      onClick: () => navigate('/internship-programs')
    },
    {
      icon: <FaChartBar />,
      title: "Analytics & Reports",
      onClick: () => navigate('/analytics')
    },
    {
      icon: <FaUserTie />,
      title: "Faculty Management",
      onClick: () => navigate('/faculty-management')
    },
    {
      icon: <FaFileAlt />,
      title: "Document Templates",
      onClick: () => navigate('/templates')
    },
    {
      icon: <FaCog />,
      title: "System Settings",
      onClick: () => navigate('/settings')
    },
    {
      icon: <FaSearch />,
      title: "Advanced Search",
      onClick: () => navigate('/advanced-search')
    }
  ];

  return (
    <DashboardLayout title="SCAD Dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Active Internships</h3>
          <p>{stats.activeInternships}</p>
        </div>
        <div className="stat-card">
          <h3>Partner Companies</h3>
          <p>{stats.partnerCompanies}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p>{stats.pendingApprovals}</p>
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

      <h2 className="section-title">Recent Activities</h2>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>New Company Registration</td>
              <td>Tech Corp</td>
              <td>2024-03-15</td>
              <td><span className="status-badge pending">Pending Approval</span></td>
            </tr>
            <tr>
              <td>Internship Application</td>
              <td>John Smith</td>
              <td>2024-03-14</td>
              <td><span className="status-badge success">Approved</span></td>
            </tr>
            <tr>
              <td>Report Submission</td>
              <td>Sarah Johnson</td>
              <td>2024-03-13</td>
              <td><span className="status-badge active">Under Review</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ScadDashboard; 