// FINAL/pages/scad/Statistics.jsx
import React, { useState, useEffect } from 'react';
import './Statistics.css';

function Statistics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0], // Start of current year
    endDate: new Date().toISOString().split('T')[0] // Today
  });
  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    activeInternships: 0,
    completedInternships: 0,
    upcomingInternships: 0,
    placementRate: 0,
    industryDistribution: {},
    locationDistribution: {},
    monthlyApplications: [],
    skillsDemand: [],
    companyParticipation: [],
    studentPerformance: {
      excellent: 0,
      good: 0,
      average: 0,
      needsImprovement: 0
    }
  });

  useEffect(() => {
    calculateStatistics();
  }, [dateRange]);

  const calculateStatistics = () => {
    setLoading(true);
    setError(null);

    try {
      // Get data from localStorage
      const internships = JSON.parse(localStorage.getItem('internships') || '[]');
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const companies = JSON.parse(localStorage.getItem('companies') || '[]');
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const evaluations = JSON.parse(localStorage.getItem('evaluations') || '[]');

      // Filter data by date range
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);

      const filteredInternships = internships.filter(internship => {
        const date = new Date(internship.createdAt);
        return date >= startDate && date <= endDate;
      });

      const filteredApplications = applications.filter(application => {
        const date = new Date(application.appliedDate);
        return date >= startDate && date <= endDate;
      });

      const filteredEvaluations = evaluations.filter(evaluation => {
        const date = new Date(evaluation.date);
        return date >= startDate && date <= endDate;
      });

      // Calculate industry distribution
      const industryDist = filteredInternships.reduce((acc, curr) => {
        acc[curr.industry] = (acc[curr.industry] || 0) + 1;
        return acc;
      }, {});

      // Calculate location distribution
      const locationDist = filteredInternships.reduce((acc, curr) => {
        acc[curr.location] = (acc[curr.location] || 0) + 1;
        return acc;
      }, {});

      // Calculate monthly applications
      const monthlyApps = filteredApplications.reduce((acc, curr) => {
        const month = new Date(curr.appliedDate).toLocaleString('default', { month: 'long' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      // Calculate skills demand
      const skillsDemand = filteredInternships.reduce((acc, curr) => {
        curr.skills.forEach(skill => {
          acc[skill] = (acc[skill] || 0) + 1;
        });
        return acc;
      }, {});

      // Sort skills by demand
      const sortedSkills = Object.entries(skillsDemand)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([skill, count]) => ({ skill, count }));

      // Calculate company participation
      const companyParticipation = companies.map(company => {
        const companyInternships = filteredInternships.filter(i => i.company === company.name);
        const companyApplications = filteredApplications.filter(a => 
          companyInternships.some(i => i.id === a.internshipId)
        );
        
        return {
          name: company.name,
          internships: companyInternships.length,
          applications: companyApplications.length,
          hires: companyApplications.filter(a => a.status === 'accepted').length
        };
      }).sort((a, b) => b.internships - a.internships);

      // Calculate student performance
      const performanceCount = filteredEvaluations.reduce((acc, curr) => {
        if (curr.rating >= 90) acc.excellent++;
        else if (curr.rating >= 75) acc.good++;
        else if (curr.rating >= 60) acc.average++;
        else acc.needsImprovement++;
        return acc;
      }, { excellent: 0, good: 0, average: 0, needsImprovement: 0 });

      setStatistics({
        totalStudents: users.filter(u => u.role === 'student').length,
        totalCompanies: companies.length,
        activeInternships: filteredInternships.filter(i => new Date(i.deadline) > new Date()).length,
        completedInternships: filteredApplications.filter(a => a.status === 'completed').length,
        upcomingInternships: filteredInternships.filter(i => new Date(i.deadline) > new Date()).length,
        placementRate: Math.round((filteredApplications.filter(a => a.status === 'accepted').length / filteredApplications.length) * 100) || 0,
        industryDistribution: industryDist,
        locationDistribution: locationDist,
        monthlyApplications: Object.entries(monthlyApps).map(([month, count]) => ({ month, count })),
        skillsDemand: sortedSkills,
        companyParticipation,
        studentPerformance: performanceCount
      });
    } catch (err) {
      setError('Failed to load statistics. Please try again later.');
      console.error('Error calculating statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const exportToPDF = () => {
    // Create a formatted string for the PDF content
    const content = `
      SCAD System Statistics Report
      Generated: ${new Date().toLocaleString()}
      Date Range: ${dateRange.startDate} to ${dateRange.endDate}

      Overview:
      - Total Students: ${statistics.totalStudents}
      - Total Companies: ${statistics.totalCompanies}
      - Active Internships: ${statistics.activeInternships}
      - Placement Rate: ${statistics.placementRate}%

      Industry Distribution:
      ${Object.entries(statistics.industryDistribution)
        .map(([industry, count]) => `- ${industry}: ${count}`)
        .join('\n')}

      Top Skills in Demand:
      ${statistics.skillsDemand
        .map(({ skill, count }) => `- ${skill}: ${count}`)
        .join('\n')}

      Monthly Applications:
      ${statistics.monthlyApplications
        .map(({ month, count }) => `- ${month}: ${count}`)
        .join('\n')}

      Student Performance:
      - Excellent: ${statistics.studentPerformance.excellent}
      - Good: ${statistics.studentPerformance.good}
      - Average: ${statistics.studentPerformance.average}
      - Needs Improvement: ${statistics.studentPerformance.needsImprovement}

      Company Participation:
      ${statistics.companyParticipation
        .map(c => `- ${c.name}: ${c.internships} internships, ${c.applications} applications, ${c.hires} hires`)
        .join('\n')}
    `;

    // Create a Blob and download
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scad-statistics-${dateRange.startDate}-to-${dateRange.endDate}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    // Create CSV content
    const content = [
      ['SCAD System Statistics Report'],
      [`Generated: ${new Date().toLocaleString()}`],
      [`Date Range: ${dateRange.startDate} to ${dateRange.endDate}`],
      [],
      ['Overview'],
      ['Metric', 'Value'],
      ['Total Students', statistics.totalStudents],
      ['Total Companies', statistics.totalCompanies],
      ['Active Internships', statistics.activeInternships],
      ['Placement Rate', `${statistics.placementRate}%`],
      [],
      ['Industry Distribution'],
      ['Industry', 'Count'],
      ...Object.entries(statistics.industryDistribution),
      [],
      ['Top Skills in Demand'],
      ['Skill', 'Count'],
      ...statistics.skillsDemand.map(({ skill, count }) => [skill, count]),
      [],
      ['Monthly Applications'],
      ['Month', 'Count'],
      ...statistics.monthlyApplications.map(({ month, count }) => [month, count]),
      [],
      ['Student Performance'],
      ['Level', 'Count'],
      ['Excellent', statistics.studentPerformance.excellent],
      ['Good', statistics.studentPerformance.good],
      ['Average', statistics.studentPerformance.average],
      ['Needs Improvement', statistics.studentPerformance.needsImprovement],
      [],
      ['Company Participation'],
      ['Company', 'Internships', 'Applications', 'Hires'],
      ...statistics.companyParticipation.map(c => [c.name, c.internships, c.applications, c.hires])
    ].map(row => row.join(',')).join('\n');

    // Create a Blob and download
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scad-statistics-${dateRange.startDate}-to-${dateRange.endDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="statistics-page">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="statistics-page">
      <div className="stats-controls">
        <div className="date-filters">
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
          />
          <span>to</span>
          <input
            type="date"
            name="endDate"
            value={dateRange.endDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="export-buttons">
          <button className="export-btn pdf" onClick={exportToPDF}>
            Export as PDF
          </button>
          <button className="export-btn excel" onClick={exportToExcel}>
            Export as Excel
          </button>
        </div>
      </div>

      <h2>Program Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          {loading ? (
            <div className="loading-overlay">
              <div className="loading-spinner" />
            </div>
          ) : (
            <>
              <h3>Overview</h3>
              <div className="stat-item">
                <span>Total Students</span>
                <span className="stat-value">{statistics.totalStudents}</span>
              </div>
              <div className="stat-item">
                <span>Total Companies</span>
                <span className="stat-value">{statistics.totalCompanies}</span>
              </div>
              <div className="stat-item">
                <span>Active Internships</span>
                <span className="stat-value">{statistics.activeInternships}</span>
              </div>
              <div className="stat-item">
                <span>Placement Rate</span>
                <span className="stat-value">{statistics.placementRate}%</span>
              </div>
            </>
          )}
        </div>

        <div className="stat-card">
          {loading ? (
            <div className="loading-overlay">
              <div className="loading-spinner" />
            </div>
          ) : (
            <>
              <h3>Industry Distribution</h3>
              <div className="chart-container">
                {Object.entries(statistics.industryDistribution).map(([industry, count]) => (
                  <div key={industry} className="bar-chart-item">
                    <div className="bar-label">{industry}</div>
                    <div className="bar-container">
                      <div 
                        className="bar" 
                        style={{ 
                          width: `${(count / Object.values(statistics.industryDistribution).reduce((a, b) => a + b, 0)) * 100}%` 
                        }}
                      />
                      <span className="bar-value">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="stat-card">
          {loading ? (
            <div className="loading-overlay">
              <div className="loading-spinner" />
            </div>
          ) : (
            <>
              <h3>Top Skills in Demand</h3>
              <div className="skills-chart">
                {statistics.skillsDemand.map(({ skill, count }) => (
                  <div key={skill} className="skill-item">
                    <span className="skill-name">{skill}</span>
                    <div className="skill-bar-container">
                      <div 
                        className="skill-bar"
                        style={{ 
                          width: `${(count / statistics.skillsDemand[0].count) * 100}%` 
                        }}
                      />
                      <span className="skill-count">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="stat-card">
          {loading ? (
            <div className="loading-overlay">
              <div className="loading-spinner" />
            </div>
          ) : (
            <>
              <h3>Monthly Applications</h3>
              <div className="line-chart">
                {statistics.monthlyApplications.map(({ month, count }) => (
                  <div key={month} className="month-stat">
                    <span className="month-label">{month}</span>
                    <div className="month-bar-container">
                      <div 
                        className="month-bar"
                        style={{ 
                          height: `${(count / Math.max(...statistics.monthlyApplications.map(m => m.count))) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="month-value">{count}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="stat-card">
          {loading ? (
            <div className="loading-overlay">
              <div className="loading-spinner" />
            </div>
          ) : (
            <>
              <h3>Student Performance</h3>
              <div className="performance-chart">
                {Object.entries(statistics.studentPerformance).map(([level, count]) => (
                  <div key={level} className="performance-item">
                    <span className="performance-label">
                      {level.charAt(0).toUpperCase() + level.slice(1).replace(/([A-Z])/g, ' $1')}
                    </span>
                    <div className="performance-bar-container">
                      <div 
                        className="performance-bar"
                        style={{ 
                          width: `${(count / Object.values(statistics.studentPerformance).reduce((a, b) => a + b, 0)) * 100}%` 
                        }}
                      />
                      <span className="performance-value">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="stat-card">
          {loading ? (
            <div className="loading-overlay">
              <div className="loading-spinner" />
            </div>
          ) : (
            <>
              <h3>Company Participation</h3>
              <div className="company-stats">
                {statistics.companyParticipation.map(company => (
                  <div key={company.name} className="company-stat-item">
                    <span className="company-name">{company.name}</span>
                    <div className="company-metrics">
                      <div className="metric">
                        <span>Internships</span>
                        <span className="metric-value">{company.internships}</span>
                      </div>
                      <div className="metric">
                        <span>Applications</span>
                        <span className="metric-value">{company.applications}</span>
                      </div>
                      <div className="metric">
                        <span>Hires</span>
                        <span className="metric-value">{company.hires}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
