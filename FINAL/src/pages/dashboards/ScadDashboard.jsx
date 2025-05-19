import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaBuilding, FaClipboardList, FaChartBar, 
         FaUserTie, FaFileAlt, FaCog, FaSearch, FaUsers, FaCheckCircle } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const statCards = [
  {
    key: 'totalStudents',
    label: 'Total Students',
    icon: <FaUserGraduate size={32} color="#4F8A8B" />,
    color: '#E8F6EF'
  },
  {
    key: 'activeInternships',
    label: 'Active Internships',
    icon: <FaClipboardList size={32} color="#F9B208" />,
    color: '#FFF9E5'
  },
  {
    key: 'partnerCompanies',
    label: 'Partner Companies',
    icon: <FaBuilding size={32} color="#3A6351" />,
    color: '#E4EFE7'
  },
  {
    key: 'pendingApprovals',
    label: 'Pending Approvals',
    icon: <FaCheckCircle size={32} color="#F76E11" />,
    color: '#FFF3E0'
  }
];

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
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, margin: '32px 0' }}>
        {statCards.map(card => (
          <div
            key={card.key}
            style={{
              background: card.color,
              borderRadius: 16,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 140,
              transition: 'transform 0.15s',
              cursor: 'pointer',
            }}
            className="stat-card-upgraded"
            tabIndex={0}
          >
            <div style={{ marginBottom: 12 }}>{card.icon}</div>
            <div style={{ fontWeight: 600, color: '#333', fontSize: 16, marginBottom: 6 }}>{card.label}</div>
            <div style={{ fontWeight: 700, fontSize: 32, color: '#222' }}>{stats[card.key]}</div>
          </div>
        ))}
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