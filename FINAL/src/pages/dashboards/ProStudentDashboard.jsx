import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaBriefcase, FaFileAlt, FaChartLine, FaCalendarAlt, FaUsers, FaCertificate, FaCog } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const statCards = [
  {
    key: 'completedInternships',
    label: 'Completed Internships',
    icon: <FaGraduationCap size={28} color="#4F8A8B" />,
    color: '#E8F6EF'
  },
  {
    key: 'ongoingProjects',
    label: 'Ongoing Projects',
    icon: <FaBriefcase size={28} color="#F9B208" />,
    color: '#FFF9E5'
  },
  {
    key: 'certifications',
    label: 'Certifications',
    icon: <FaCertificate size={28} color="#3A6351" />,
    color: '#E4EFE7'
  },
  {
    key: 'networkConnections',
    label: 'Network Connections',
    icon: <FaUsers size={28} color="#F76E11" />,
    color: '#FFF3E0'
  }
];

const actions = [
  {
    icon: <FaGraduationCap />,
    title: 'Academic Progress',
    onClick: (navigate) => navigate('/academic-progress')
  },
  {
    icon: <FaBriefcase />,
    title: 'Professional Projects',
    onClick: (navigate) => navigate('/prostudent/projects')
  },
  {
    icon: <FaFileAlt />,
    title: 'Portfolio',
    onClick: (navigate) => navigate('/prostudent/portfolio')
  },
  {
    icon: <FaChartLine />,
    title: 'Skills Development',
    onClick: (navigate) => navigate('/prostudent/skills')
  },
  {
    icon: <FaCalendarAlt />,
    title: 'Schedule',
    onClick: (navigate) => navigate('/prostudent/schedule')
  },
  {
    icon: <FaUsers />,
    title: 'Professional Network',
    onClick: (navigate) => navigate('/prostudent/network')
  },
  {
    icon: <FaCertificate />,
    title: 'Certifications',
    onClick: (navigate) => navigate('/prostudent/certifications')
  },
  {
    icon: <FaFileAlt />,
    title: 'My Internships',
    onClick: (navigate) => navigate('/prostudent/myinternships')
  },
  {
    icon: <FaFileAlt />,
    title: 'Internship Reports',
    onClick: (navigate) => navigate('/prostudent/reports')
  },
  {
    icon: <FaFileAlt />,
    title: 'Company Evaluation',
    onClick: (navigate) => navigate('/prostudent/companyevaluation')
  },
  {
    icon: <FaFileAlt />,
    title: 'Notifications',
    onClick: (navigate) => navigate('/prostudent/notifications')
  },
  {
    icon: <FaFileAlt />,
    title: 'Online Assessments',
    onClick: (navigate) => navigate('/prostudent/onlineassessments')
  },
  {
    icon: <FaFileAlt />,
    title: 'Workshops',
    onClick: (navigate) => navigate('/prostudent/workshops')
  },
  {
    icon: <FaFileAlt />,
    title: 'Appointments & Video Calls',
    onClick: (navigate) => navigate('/prostudent/appointments')
  },
  {
    icon: <FaCog />,
    title: 'Settings',
    onClick: (navigate) => navigate('/prostudent/settings')
  },
  {
    icon: <FaFileAlt />,
    title: 'Profile',
    onClick: (navigate) => navigate('/prostudent/profile')
  },
];

const ProStudentDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    completedInternships: 3,
    ongoingProjects: 2,
    certifications: 5,
    networkConnections: 150
  });

  return (
    <DashboardLayout title="Pro Student Dashboard">
      <div className="stats-grid">
        {statCards.map(card => (
          <div
            key={card.key}
            className="stat-card"
            tabIndex={0}
            style={{ transition: 'transform 0.15s', cursor: 'pointer' }}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
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

      <h2 className="section-title">Recent Activities</h2>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cloud Computing Project</td>
              <td>Professional Project</td>
              <td>2024-03-15</td>
              <td><span className="status-badge active">In Progress</span></td>
            </tr>
            <tr>
              <td>AWS Certification</td>
              <td>Certification</td>
              <td>2024-03-14</td>
              <td><span className="status-badge success">Completed</span></td>
            </tr>
            <tr>
              <td>Tech Conference</td>
              <td>Networking Event</td>
              <td>2024-03-13</td>
              <td><span className="status-badge pending">Upcoming</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ProStudentDashboard; 