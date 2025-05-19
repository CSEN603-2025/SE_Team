import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaUpload, FaGlobe, FaBook, FaBuilding, FaGraduationCap, FaClipboardCheck, FaEdit, FaSearch } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/DashboardLayout.css';

const statCards = [
  {
    key: 'applications',
    label: 'Applications',
    icon: <FaFileAlt size={28} color="#4F8A8B" />,
    color: '#E8F6EF'
  },
  {
    key: 'activeInternships',
    label: 'Active Internships',
    icon: <FaGlobe size={28} color="#F9B208" />,
    color: '#FFF9E5'
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: <FaGraduationCap size={28} color="#3A6351" />,
    color: '#E4EFE7'
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: <FaClipboardCheck size={28} color="#F76E11" />,
    color: '#FFF3E0'
  }
];

const actions = [
  {
    icon: <FaUser />,
    title: 'View/Edit Profile',
    onClick: (navigate) => navigate('/profile')
  },
  {
    icon: <FaFileAlt />,
    title: 'My Applications',
    onClick: (navigate) => navigate('/applications')
  },
  {
    icon: <FaUpload />,
    title: 'Submit Report',
    onClick: (navigate) => navigate('/submit-report')
  },
  {
    icon: <FaGlobe />,
    title: 'My Internships',
    onClick: (navigate) => navigate('/internships')
  },
  {
    icon: <FaBook />,
    title: 'Major Courses',
    onClick: (navigate) => navigate('/courses')
  },
  {
    icon: <FaBuilding />,
    title: 'Suggested Companies',
    onClick: (navigate) => navigate('/companies')
  },
  {
    icon: <FaGraduationCap />,
    title: 'Select Major & Semester',
    onClick: (navigate) => navigate('/academic-info')
  },
  {
    icon: <FaClipboardCheck />,
    title: 'Company Evaluation',
    onClick: (navigate) => navigate('/evaluation')
  },
  {
    icon: <FaFileAlt />,
    title: 'Internship Report',
    onClick: (navigate) => navigate('/report')
  },
  {
    icon: <FaEdit />,
    title: 'Course Feedback',
    onClick: (navigate) => navigate('/feedback')
  },
  {
    icon: <FaSearch />,
    title: 'Explore Internships',
    onClick: (navigate) => navigate('/explore')
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [stats, setStats] = useState({
    applications: 5,
    activeInternships: 1,
    completed: 0,
    reports: 2
  });

  useEffect(() => {
    if (!user || !['student', 'pro-student'].includes(user.type)) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <DashboardLayout title={`Student Dashboard - ${user.name}`}>
      <div className="stats-grid">
        {statCards.map(card => (
          <div
            key={card.key}
            className="stat-card"
            style={{ background: card.color }}
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
    </DashboardLayout>
  );
};

export default StudentDashboard;
