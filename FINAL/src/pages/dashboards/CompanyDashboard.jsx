import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaUsers, FaFileAlt, FaChartLine, FaUserGraduate, FaClipboardCheck, FaCog, FaSearch } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const statCards = [
  {
    key: 'activeInternships',
    label: 'Active Internships',
    icon: <FaBriefcase size={28} color="#4F8A8B" />,
    color: '#E8F6EF'
  },
  {
    key: 'totalApplications',
    label: 'Total Applications',
    icon: <FaUsers size={28} color="#F9B208" />,
    color: '#FFF9E5'
  },
  {
    key: 'currentInterns',
    label: 'Current Interns',
    icon: <FaUserGraduate size={28} color="#3A6351" />,
    color: '#E4EFE7'
  },
  {
    key: 'completedInternships',
    label: 'Completed Internships',
    icon: <FaClipboardCheck size={28} color="#F76E11" />,
    color: '#FFF3E0'
  }
];

const actions = [
  {
    icon: <FaBriefcase />,
    title: 'Post Internship',
    onClick: (navigate) => navigate('/post-internship')
  },
  {
    icon: <FaUsers />,
    title: 'Manage Applications',
    onClick: (navigate) => navigate('/manage-applications')
  },
  {
    icon: <FaFileAlt />,
    title: 'Internship Reports',
    onClick: (navigate) => navigate('/internship-reports')
  },
  {
    icon: <FaChartLine />,
    title: 'Performance Analytics',
    onClick: (navigate) => navigate('/performance')
  },
  {
    icon: <FaUserGraduate />,
    title: 'Current Interns',
    onClick: (navigate) => navigate('/current-interns')
  },
  {
    icon: <FaClipboardCheck />,
    title: 'Evaluations',
    onClick: (navigate) => navigate('/evaluations')
  },
  {
    icon: <FaCog />,
    title: 'Company Profile',
    onClick: (navigate) => navigate('/company-profile')
  },
  {
    icon: <FaSearch />,
    title: 'Search Students',
    onClick: (navigate) => navigate('/search-students')
  }
];

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeInternships: 12,
    totalApplications: 45,
    currentInterns: 8,
    completedInternships: 24
  });

  return (
    <DashboardLayout title="Company Dashboard">
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

      <h2 className="section-title">Recent Applications</h2>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Position</th>
              <th>Applied Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Smith</td>
              <td>Software Engineer Intern</td>
              <td>2024-03-15</td>
              <td><span className="status-badge pending">Under Review</span></td>
            </tr>
            <tr>
              <td>Emily Brown</td>
              <td>Data Science Intern</td>
              <td>2024-03-14</td>
              <td><span className="status-badge success">Accepted</span></td>
            </tr>
            <tr>
              <td>Michael Wilson</td>
              <td>Frontend Developer Intern</td>
              <td>2024-03-13</td>
              <td><span className="status-badge active">Interviewing</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard; 