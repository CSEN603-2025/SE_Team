import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProStudentDashboard.css';

export default function ProStudentDashboard() {
  const [stats, setStats] = useState({
    applications: 0,
    interviews: 0,
    workshops: 0,
    profileViews: 0
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentViews, setRecentViews] = useState([]);
  const [skills, setSkills] = useState([]);
  const [nextAssessment, setNextAssessment] = useState(null);

  useEffect(() => {
    // Load data from localStorage
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const workshops = JSON.parse(localStorage.getItem('workshops') || '[]');
    const profileViews = JSON.parse(localStorage.getItem('profile_views') || '[]');
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userSkills = JSON.parse(localStorage.getItem('user_skills') || '[]');
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');

    // Calculate stats
    setStats({
      applications: applications.length,
      interviews: appointments.filter(apt => apt.type === 'mock_interview').length,
      workshops: workshops.filter(w => w.isRegistered).length,
      profileViews: profileViews.length
    });

    // Get upcoming events
    const now = new Date();
    const upcoming = [
      ...workshops.filter(w => w.isRegistered && new Date(w.date) > now),
      ...appointments.filter(apt => apt.status === 'scheduled' && new Date(apt.date) > now)
    ].sort((a, b) => new Date(a.date) - new Date(b.date));
    setUpcomingEvents(upcoming.slice(0, 5));

    // Get recent profile views
    setRecentViews(profileViews.slice(0, 3));

    // Set skills
    setSkills(userSkills);

    // Find next available assessment
    const nextAssessment = assessments.find(assessment => {
      const skill = userSkills.find(s => s.name === assessment.skill);
      return !skill || skill.level < 5;
    });
    setNextAssessment(nextAssessment);
  }, []);

  const getSkillLevelText = (level) => {
    switch (level) {
      case 1: return 'Beginner';
      case 2: return 'Elementary';
      case 3: return 'Intermediate';
      case 4: return 'Advanced';
      case 5: return 'Expert';
      default: return 'Not Verified';
    }
  };

  return (
    <div className="pro-dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {localStorage.getItem('userName')}</h1>
          <div className="pro-badge">
            <span className="badge-icon">⭐</span>
            PRO Student
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-value">{stats.applications}</div>
          <div className="stat-label">Applications</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-value">{stats.interviews}</div>
          <div className="stat-label">Interviews</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-value">{stats.workshops}</div>
          <div className="stat-label">Workshops</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats.profileViews}</div>
          <div className="stat-label">Profile Views</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card upcoming-events">
          <h2>Upcoming Events</h2>
          <div className="events-list">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-item">
                <div className="event-icon">
                  {event.type === 'workshop' ? '🎓' : '📅'}
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <Link
                  to={event.type === 'workshop' ? '/prostudent/workshops' : `/video-call/${event.id}`}
                  className="event-action"
                >
                  {event.type === 'workshop' ? 'Join Workshop' : 'Join Call'}
                </Link>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <p className="no-events">No upcoming events</p>
            )}
          </div>
        </div>

        <div className="dashboard-card profile-views">
          <h2>Recent Profile Views</h2>
          <div className="views-list">
            {recentViews.map(view => (
              <div key={view.id} className="view-item">
                <img src={view.viewerAvatar} alt={view.viewerName} className="viewer-avatar" />
                <div className="viewer-details">
                  <h3>{view.viewerName}</h3>
                  <p>{view.viewerTitle} at {view.viewerCompany}</p>
                  <p className="view-time">{new Date(view.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
            {recentViews.length === 0 && (
              <p className="no-views">No recent profile views</p>
            )}
            <Link to="/prostudent/profile-views" className="view-all">
              View All Analytics
            </Link>
          </div>
        </div>

        <div className="dashboard-card verified-skills">
          <h2>Verified Skills</h2>
          <div className="skills-list">
            {skills.map(skill => (
              <div key={skill.name} className="skill-item">
                <div className="skill-info">
                  <h3>{skill.name}</h3>
                  <p>{getSkillLevelText(skill.level)}</p>
                </div>
                <div className="skill-level">
                  <div className="level-bar">
                    <div
                      className="level-fill"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                  <span className="level-text">{skill.level}/5</span>
                </div>
                <p className="verification-date">
                  Verified: {new Date(skill.verifiedDate).toLocaleDateString()}
                </p>
              </div>
            ))}
            {skills.length === 0 && (
              <p className="no-skills">No verified skills yet</p>
            )}
          </div>
        </div>

        <div className="dashboard-card next-assessment">
          <h2>Next Assessment</h2>
          {nextAssessment ? (
            <div className="assessment-preview">
              <h3>{nextAssessment.title}</h3>
              <p>{nextAssessment.description}</p>
              <div className="assessment-meta">
                <span>Skill: {nextAssessment.skill}</span>
                <span>Level: {nextAssessment.level}</span>
                <span>Duration: {nextAssessment.timeLimit} minutes</span>
              </div>
              <Link to="/prostudent/assessment" className="start-assessment">
                Start Assessment
              </Link>
            </div>
          ) : (
            <p className="no-assessment">All skill assessments completed!</p>
          )}
        </div>

        <div className="dashboard-card quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/prostudent/appointments" className="action-card">
              <div className="action-icon">📅</div>
              <div className="action-text">Schedule Appointment</div>
            </Link>
            <Link to="/prostudent/workshops" className="action-card">
              <div className="action-icon">🎓</div>
              <div className="action-text">Join Workshop</div>
            </Link>
            <Link to="/prostudent/assessment" className="action-card">
              <div className="action-icon">📝</div>
              <div className="action-text">Take Assessment</div>
            </Link>
            <Link to="/prostudent/reports/new" className="action-card">
              <div className="action-icon">📊</div>
              <div className="action-text">Submit Report</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
