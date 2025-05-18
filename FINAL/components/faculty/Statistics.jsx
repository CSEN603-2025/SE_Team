import React, { useState, useEffect } from 'react';
import './Statistics.css';

const Statistics = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeInternships: 0,
    completedInternships: 0,
    pendingReports: 0,
    averageRating: 0,
    majorDistribution: {},
    companyDistribution: {},
    monthlyProgress: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load and calculate statistics
    const calculateStats = () => {
      try {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        const evaluations = JSON.parse(localStorage.getItem('evaluations')) || [];

        // Calculate major distribution
        const majorDist = students.reduce((acc, student) => {
          acc[student.major] = (acc[student.major] || 0) + 1;
          return acc;
        }, {});

        // Calculate company distribution
        const companyDist = reports.reduce((acc, report) => {
          acc[report.company] = (acc[report.company] || 0) + 1;
          return acc;
        }, {});

        // Calculate monthly progress (last 6 months)
        const today = new Date();
        const monthlyData = Array.from({ length: 6 }, (_, i) => {
          const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
          const monthReports = reports.filter(report => {
            const reportDate = new Date(report.submittedAt);
            return reportDate.getMonth() === month.getMonth() &&
                   reportDate.getFullYear() === month.getFullYear();
          });
          return {
            month: month.toLocaleString('default', { month: 'short' }),
            count: monthReports.length
          };
        }).reverse();

        // Calculate average rating
        const ratings = evaluations.map(evaluation => evaluation.scores?.overall || 0);
        const avgRating = ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;

        setStats({
          totalStudents: students.length,
          activeInternships: students.filter(s => s.internshipStatus === 'active').length,
          completedInternships: students.filter(s => s.internshipStatus === 'completed').length,
          pendingReports: reports.filter(r => r.status === 'pending').length,
          averageRating: avgRating,
          majorDistribution: majorDist,
          companyDistribution: companyDist,
          monthlyProgress: monthlyData
        });
      } catch (error) {
        console.error('Error calculating statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    calculateStats();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="statistics">
      <h2>Faculty Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="stat-value">{stats.totalStudents}</div>
        </div>

        <div className="stat-card">
          <h3>Active Internships</h3>
          <div className="stat-value">{stats.activeInternships}</div>
        </div>

        <div className="stat-card">
          <h3>Completed Internships</h3>
          <div className="stat-value">{stats.completedInternships}</div>
        </div>

        <div className="stat-card">
          <h3>Pending Reports</h3>
          <div className="stat-value">{stats.pendingReports}</div>
        </div>

        <div className="stat-card">
          <h3>Average Rating</h3>
          <div className="stat-value">{stats.averageRating.toFixed(1)}</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Major Distribution</h3>
          <div className="distribution-chart">
            {Object.entries(stats.majorDistribution).map(([major, count]) => (
              <div key={major} className="chart-bar">
                <div className="bar-label">{major}</div>
                <div 
                  className="bar"
                  style={{ 
                    width: `${(count / stats.totalStudents) * 100}%`
                  }}
                >
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Company Distribution</h3>
          <div className="distribution-chart">
            {Object.entries(stats.companyDistribution)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([company, count]) => (
                <div key={company} className="chart-bar">
                  <div className="bar-label">{company}</div>
                  <div 
                    className="bar"
                    style={{ 
                      width: `${(count / Math.max(...Object.values(stats.companyDistribution))) * 100}%`
                    }}
                  >
                    {count}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="chart-card full-width">
          <h3>Monthly Progress</h3>
          <div className="progress-chart">
            {stats.monthlyProgress.map((data, index) => (
              <div key={index} className="progress-bar">
                <div 
                  className="bar"
                  style={{ 
                    height: `${(data.count / Math.max(...stats.monthlyProgress.map(d => d.count))) * 100}%`
                  }}
                >
                  <span className="count">{data.count}</span>
                </div>
                <div className="month">{data.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 