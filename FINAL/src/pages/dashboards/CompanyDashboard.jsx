import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaUsers, FaFileAlt, FaChartLine, 
         FaUserGraduate, FaClipboardCheck, FaCog, FaSearch } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeInternships: 12,
    totalApplications: 45,
    currentInterns: 8,
    completedInternships: 24
  });

  const actions = [
    {
      icon: <FaBriefcase />,
      title: "Post Internship",
      onClick: () => navigate('/post-internship')
    },
    {
      icon: <FaUsers />,
      title: "Manage Applications",
      onClick: () => navigate('/manage-applications')
    },
    {
      icon: <FaFileAlt />,
      title: "Internship Reports",
      onClick: () => navigate('/internship-reports')
    },
    {
      icon: <FaChartLine />,
      title: "Performance Analytics",
      onClick: () => navigate('/performance')
    },
    {
      icon: <FaUserGraduate />,
      title: "Current Interns",
      onClick: () => navigate('/current-interns')
    },
    {
      icon: <FaClipboardCheck />,
      title: "Evaluations",
      onClick: () => navigate('/evaluations')
    },
    {
      icon: <FaCog />,
      title: "Company Profile",
      onClick: () => navigate('/company-profile')
    },
    {
      icon: <FaSearch />,
      title: "Search Students",
      onClick: () => navigate('/search-students')
    }
  ];

  return (
    <DashboardLayout title="Company Dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Active Internships</h3>
          <p>{stats.activeInternships}</p>
        </div>
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>{stats.totalApplications}</p>
        </div>
        <div className="stat-card">
          <h3>Current Interns</h3>
          <p>{stats.currentInterns}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Internships</h3>
          <p>{stats.completedInternships}</p>
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