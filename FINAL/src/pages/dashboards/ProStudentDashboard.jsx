import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaBriefcase, FaFileAlt, FaChartLine, 
         FaCalendarAlt, FaUsers, FaCertificate, FaCog } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const ProStudentDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    completedInternships: 3,
    ongoingProjects: 2,
    certifications: 5,
    networkConnections: 150
  });

  const actions = [
    {
      icon: <FaGraduationCap />,
      title: "Academic Progress",
      onClick: () => navigate('/academic-progress')
    },
    {
      icon: <FaBriefcase />,
      title: "Professional Projects",
      onClick: () => navigate('/projects')
    },
    {
      icon: <FaFileAlt />,
      title: "Portfolio",
      onClick: () => navigate('/portfolio')
    },
    {
      icon: <FaChartLine />,
      title: "Skills Development",
      onClick: () => navigate('/skills')
    },
    {
      icon: <FaCalendarAlt />,
      title: "Schedule",
      onClick: () => navigate('/schedule')
    },
    {
      icon: <FaUsers />,
      title: "Professional Network",
      onClick: () => navigate('/network')
    },
    {
      icon: <FaCertificate />,
      title: "Certifications",
      onClick: () => navigate('/certifications')
    },
    {
      icon: <FaCog />,
      title: "Settings",
      onClick: () => navigate('/settings')
    }
  ];

  return (
    <DashboardLayout title="Professional Student Dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Completed Internships</h3>
          <p>{stats.completedInternships}</p>
        </div>
        <div className="stat-card">
          <h3>Ongoing Projects</h3>
          <p>{stats.ongoingProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Certifications</h3>
          <p>{stats.certifications}</p>
        </div>
        <div className="stat-card">
          <h3>Network Connections</h3>
          <p>{stats.networkConnections}</p>
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