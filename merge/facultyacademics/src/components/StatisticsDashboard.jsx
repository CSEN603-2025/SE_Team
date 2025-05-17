import React from 'react';
import './StatisticsDashboard.css';

const StatisticsDashboard = ({ stats }) => {
  // Provide safe default values if stats or nested properties are undefined
  const safeStats = {
    acceptedReports: 0,
    rejectedReports: 0,
    flaggedReports: 0,
    avgReviewTime: 0,
    topCompanies: [],
    topCourses: [],
    ...stats // override defaults if stats prop provided
  };

  return (
    <div className="statistics-dashboard">
      <h2>Internship Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Report Status</h3>
          <div className="stat-value">{safeStats.acceptedReports}</div>
          <div className="stat-label">Accepted</div>
          <div className="stat-value">{safeStats.rejectedReports}</div>
          <div className="stat-label">Rejected</div>
          <div className="stat-value">{safeStats.flaggedReports}</div>
          <div className="stat-label">Flagged</div>
        </div>
        <div className="stat-card">
          <h3>Average Review Time</h3>
          <div className="stat-value">{safeStats.avgReviewTime}</div>
          <div className="stat-label">days</div>
        </div>
        <div className="stat-card">
          <h3>Top Rated Companies</h3>
          <ul className="top-list">
            {(safeStats.topCompanies.length > 0) ? safeStats.topCompanies.map((company, index) => (
              <li key={index}>
                <span className="company-name">{company.name}</span>
                <span className="company-rating">{company.rating}/5</span>
              </li>
            )) : <li>No data available</li>}
          </ul>
        </div>
        <div className="stat-card">
          <h3>Most Used Courses</h3>
          <ul className="top-list">
            {(safeStats.topCourses.length > 0) ? safeStats.topCourses.map((course, index) => (
              <li key={index}>
                <span className="course-name">{course.name}</span>
                <span className="course-count">{course.count} mentions</span>
              </li>
            )) : <li>No data available</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
