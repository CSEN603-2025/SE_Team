import React, { useState, useEffect } from 'react';
import { initialReports, initialCompanies, initialInternships } from '../data';
import './Statistics.css';

export default function Statistics() {
  const [selectedCycle, setSelectedCycle] = useState('2024');
  const [stats, setStats] = useState({
    reportStats: {},
    reviewTime: 0,
    topCourses: [],
    topCompanies: [],
    companyRatings: []
  });

  // Calculate statistics when component mounts or cycle changes
  useEffect(() => {
    calculateStatistics();
  }, [selectedCycle]);

  const calculateStatistics = () => {
    // Filter reports for selected cycle
    const cycleReports = initialReports.filter(r => 
      r.details.start.startsWith(selectedCycle)
    );

    // 1. Report Status Statistics
    const reportStats = {
      total: cycleReports.length,
      accepted: cycleReports.filter(r => r.status === 'Accepted').length,
      rejected: cycleReports.filter(r => r.status === 'Rejected').length,
      flagged: cycleReports.filter(r => r.status === 'Flagged').length,
      pending: cycleReports.filter(r => r.status === 'Pending').length
    };

    // 2. Average Review Time (dummy calculation)
    const reviewTime = 5.2; // days

    // 3. Most Frequent Courses/Majors
    const majorCounts = cycleReports.reduce((acc, report) => {
      acc[report.major] = (acc[report.major] || 0) + 1;
      return acc;
    }, {});
    const topCourses = Object.entries(majorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([major, count]) => ({ major, count }));

    // 4. Top Companies by Internship Count
    const companyCounts = initialInternships.reduce((acc, internship) => {
      acc[internship.company] = (acc[internship.company] || 0) + 1;
      return acc;
    }, {});
    const topCompanies = Object.entries(companyCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([company, count]) => ({ company, count }));

    // 5. Company Ratings (dummy data)
    const companyRatings = initialCompanies.map(company => ({
      name: company.name,
      rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3-5
      reviewCount: Math.floor(Math.random() * 10) + 1
    })).sort((a, b) => b.rating - a.rating).slice(0, 5);

    setStats({
      reportStats,
      reviewTime,
      topCourses,
      topCompanies,
      companyRatings
    });
  };

  const generateReport = (format) => {
    // Create report content
    const reportContent = {
      cycle: selectedCycle,
      generatedAt: new Date().toLocaleString(),
      statistics: {
        reportStatus: stats.reportStats,
        reviewTime: stats.reviewTime,
        topCourses: stats.topCourses,
        topCompanies: stats.topCompanies,
        companyRatings: stats.companyRatings
      }
    };

    if (format === 'pdf') {
      generatePDFReport(reportContent);
    } else if (format === 'excel') {
      generateExcelReport(reportContent);
    }
  };

  const generatePDFReport = (content) => {
    // Create a formatted string for the PDF content
    const pdfContent = `
      SCAD System Statistics Report
      Cycle: ${content.cycle}
      Generated: ${content.generatedAt}

      Report Status:
      - Total Reports: ${content.statistics.reportStatus.total}
      - Accepted: ${content.statistics.reportStatus.accepted}
      - Rejected: ${content.statistics.reportStatus.rejected}
      - Flagged: ${content.statistics.reportStatus.flagged}
      - Pending: ${content.statistics.reportStatus.pending}

      Average Review Time: ${content.statistics.reviewTime} days

      Top Courses in Internships:
      ${content.statistics.topCourses.map(course => 
        `- ${course.major}: ${course.count} internships`
      ).join('\n')}

      Top Companies by Internship Count:
      ${content.statistics.topCompanies.map(company => 
        `- ${company.company}: ${company.count} positions`
      ).join('\n')}

      Top Rated Companies:
      ${content.statistics.companyRatings.map(company => 
        `- ${company.name}: ${company.rating} ⭐ (${company.reviewCount} reviews)`
      ).join('\n')}
    `;

    // Create a Blob with the content
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `scad-statistics-${content.cycle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const generateExcelReport = (content) => {
    // Create CSV content
    const csvContent = [
      ['SCAD System Statistics Report'],
      ['Cycle:', content.cycle],
      ['Generated:', content.generatedAt],
      [],
      ['Report Status'],
      ['Total Reports', content.statistics.reportStatus.total],
      ['Accepted', content.statistics.reportStatus.accepted],
      ['Rejected', content.statistics.reportStatus.rejected],
      ['Flagged', content.statistics.reportStatus.flagged],
      ['Pending', content.statistics.reportStatus.pending],
      [],
      ['Average Review Time (days)', content.statistics.reviewTime],
      [],
      ['Top Courses in Internships'],
      ['Course', 'Count'],
      ...content.statistics.topCourses.map(course => [course.major, course.count]),
      [],
      ['Top Companies by Internship Count'],
      ['Company', 'Count'],
      ...content.statistics.topCompanies.map(company => [company.company, company.count]),
      [],
      ['Top Rated Companies'],
      ['Company', 'Rating', 'Review Count'],
      ...content.statistics.companyRatings.map(company => [company.name, company.rating, company.reviewCount])
    ].map(row => row.join(',')).join('\n');

    // Create a Blob with the content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `scad-statistics-${content.cycle}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="statistics">
      <div className="stats-header">
        <h2>SCAD System Statistics</h2>
        <div className="stats-controls">
          <select 
            value={selectedCycle} 
            onChange={(e) => setSelectedCycle(e.target.value)}
            className="cycle-select"
          >
            <option value="2023">2023 Cycle</option>
            <option value="2024">2024 Cycle</option>
            <option value="2025">2025 Cycle</option>
          </select>
          <div className="report-actions">
            <button 
              onClick={() => generateReport('pdf')}
              className="btn-generate btn-pdf"
            >
              Generate PDF Report
            </button>
            <button 
              onClick={() => generateReport('excel')}
              className="btn-generate btn-excel"
            >
              Generate Excel Report
            </button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {/* Report Status Statistics */}
        <div className="stats-card">
          <h3>Report Status</h3>
          <div className="status-grid">
            <div className="status-item">
              <span className="label">Total Reports</span>
              <span className="value">{stats.reportStats.total}</span>
            </div>
            <div className="status-item accepted">
              <span className="label">Accepted</span>
              <span className="value">{stats.reportStats.accepted}</span>
            </div>
            <div className="status-item rejected">
              <span className="label">Rejected</span>
              <span className="value">{stats.reportStats.rejected}</span>
            </div>
            <div className="status-item flagged">
              <span className="label">Flagged</span>
              <span className="value">{stats.reportStats.flagged}</span>
            </div>
            <div className="status-item pending">
              <span className="label">Pending</span>
              <span className="value">{stats.reportStats.pending}</span>
            </div>
          </div>
        </div>

        {/* Average Review Time */}
        <div className="stats-card">
          <h3>Average Review Time</h3>
          <div className="review-time">
            <span className="value">{stats.reviewTime}</span>
            <span className="unit">days</span>
          </div>
        </div>

        {/* Top Courses */}
        <div className="stats-card">
          <h3>Top Courses in Internships</h3>
          <ul className="ranking-list">
            {stats.topCourses.map(({ major, count }, index) => (
              <li key={major}>
                <span className="rank">{index + 1}</span>
                <span className="name">{major}</span>
                <span className="count">{count} internships</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Companies by Count */}
        <div className="stats-card">
          <h3>Top Companies by Internship Count</h3>
          <ul className="ranking-list">
            {stats.topCompanies.map(({ company, count }, index) => (
              <li key={company}>
                <span className="rank">{index + 1}</span>
                <span className="name">{company}</span>
                <span className="count">{count} positions</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Rated Companies */}
        <div className="stats-card">
          <h3>Top Rated Companies</h3>
          <ul className="ranking-list">
            {stats.companyRatings.map(({ name, rating, reviewCount }, index) => (
              <li key={name}>
                <span className="rank">{index + 1}</span>
                <span className="name">{name}</span>
                <span className="rating">
                  {rating} ⭐ ({reviewCount} reviews)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 