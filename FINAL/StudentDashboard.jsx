import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [recommendedInternships, setRecommendedInternships] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0
  });

  useEffect(() => {
    // Load student data (in real app, this would be an API call)
    const userData = JSON.parse(localStorage.getItem('user'));
    setStudent(userData);

    // Load applications
    const applications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    setRecentApplications(applications.slice(0, 3)); // Show only last 3

    // Calculate stats
    setStats({
      totalApplications: applications.length,
      pendingApplications: applications.filter(app => app.status === 'Pending').length,
      acceptedApplications: applications.filter(app => app.status === 'Accepted').length,
      rejectedApplications: applications.filter(app => app.status === 'Rejected').length
    });

    // Load all internships
    const allInternships = JSON.parse(localStorage.getItem('internships') || '[]');
    
    // Get upcoming deadlines
    const upcoming = allInternships
      .filter(internship => new Date(internship.deadline) > new Date())
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 3);
    setUpcomingDeadlines(upcoming);

    // Get recommended internships based on student's skills and interests
    const recommended = allInternships
      .filter(internship => {
        // Simple recommendation based on matching skills
        // In a real app, this would be more sophisticated
        const studentSkills = userData?.skills || [];
        return internship.skills.some(skill => 
          studentSkills.includes(skill.toLowerCase())
        );
      })
      .slice(0, 3);
    setRecommendedInternships(recommended);
  }, []);

  return (
    <div className="student-dashboard">
      <div className="welcome-section">
        <h2>Welcome back, {student?.name || 'Student'}!</h2>
        <p>Here's your internship journey overview</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p className="stat-number">{stats.totalApplications}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number pending">{stats.pendingApplications}</p>
        </div>
        <div className="stat-card">
          <h3>Accepted</h3>
          <p className="stat-number accepted">{stats.acceptedApplications}</p>
        </div>
        <div className="stat-card">
          <h3>Rejected</h3>
          <p className="stat-number rejected">{stats.rejectedApplications}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recent Applications</h3>
            <Link to="/student/applications" className="view-all">View All</Link>
          </div>
          <div className="applications-list">
            {recentApplications.map(application => (
              <div key={application.id} className="application-card">
                <h4>{application.position}</h4>
                <p className="company">{application.company}</p>
                <span className={`status ${application.status.toLowerCase()}`}>
                  {application.status}
                </span>
                <p className="date">Applied: {application.appliedDate}</p>
              </div>
            ))}
            {recentApplications.length === 0 && (
              <p className="no-data">No applications yet</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recommended Internships</h3>
            <Link to="/student/internships" className="view-all">View All</Link>
          </div>
          <div className="recommendations-list">
            {recommendedInternships.map(internship => (
              <div key={internship.id} className="internship-card">
                <h4>{internship.title}</h4>
                <p className="company">{internship.company}</p>
                <p className="location">{internship.location}</p>
                <div className="skills-list">
                  {internship.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
            {recommendedInternships.length === 0 && (
              <p className="no-data">No recommendations available</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>Upcoming Deadlines</h3>
            <Link to="/student/internships" className="view-all">View All</Link>
          </div>
          <div className="deadlines-list">
            {upcomingDeadlines.map(internship => (
              <div key={internship.id} className="deadline-card">
                <h4>{internship.title}</h4>
                <p className="company">{internship.company}</p>
                <p className="deadline">
                  Deadline: {new Date(internship.deadline).toLocaleDateString()}
                </p>
              </div>
            ))}
            {upcomingDeadlines.length === 0 && (
              <p className="no-data">No upcoming deadlines</p>
            )}
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/student/profile" className="action-button">
          Update Profile
        </Link>
        <Link to="/student/internships" className="action-button primary">
          Browse Internships
        </Link>
      </div>
    </div>
  );
}
