import React, { useState, useEffect } from 'react';
import './ProfileViews.css';

export default function ProfileViews() {
  const [profileViews, setProfileViews] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    uniqueViewers: 0,
    companyViews: 0,
    averageViewDuration: 0,
    viewsByDay: {},
    viewsBySource: {}
  });
  const [timeRange, setTimeRange] = useState('week');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load profile views from localStorage
    const savedViews = JSON.parse(localStorage.getItem('profile_views') || '[]');
    setProfileViews(savedViews);

    // Calculate analytics
    calculateAnalytics(savedViews, timeRange);
  }, [timeRange]);

  const calculateAnalytics = (views, range) => {
    const now = new Date();
    const rangeInDays = range === 'week' ? 7 : range === 'month' ? 30 : 365;
    const startDate = new Date(now.setDate(now.getDate() - rangeInDays));

    const filteredViews = views.filter(view => new Date(view.timestamp) >= startDate);

    const uniqueViewers = new Set(filteredViews.map(view => view.viewerId)).size;
    const companyViews = filteredViews.filter(view => view.viewerType === 'company').length;
    const totalDuration = filteredViews.reduce((sum, view) => sum + view.duration, 0);
    const averageViewDuration = filteredViews.length ? totalDuration / filteredViews.length : 0;

    // Views by day
    const viewsByDay = filteredViews.reduce((acc, view) => {
      const date = new Date(view.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Views by source
    const viewsBySource = filteredViews.reduce((acc, view) => {
      acc[view.source] = (acc[view.source] || 0) + 1;
      return acc;
    }, {});

    setAnalytics({
      totalViews: filteredViews.length,
      uniqueViewers,
      companyViews,
      averageViewDuration,
      viewsByDay,
      viewsBySource
    });
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'search': return '🔍';
      case 'direct': return '🔗';
      case 'company': return '🏢';
      case 'referral': return '👥';
      default: return '📱';
    }
  };

  const filteredViews = profileViews.filter(view => {
    if (filter === 'all') return true;
    return view.viewerType === filter;
  });

  return (
    <div className="profile-views-container">
      <div className="analytics-header">
        <h2>Profile Analytics</h2>
        <div className="analytics-controls">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
          </select>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Views</option>
            <option value="company">Company Views</option>
            <option value="student">Student Views</option>
            <option value="recruiter">Recruiter Views</option>
          </select>
        </div>
      </div>

      <div className="analytics-overview">
        <div className="stat-card">
          <div className="stat-value">{analytics.totalViews}</div>
          <div className="stat-label">Total Views</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{analytics.uniqueViewers}</div>
          <div className="stat-label">Unique Viewers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{analytics.companyViews}</div>
          <div className="stat-label">Company Views</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{formatDuration(analytics.averageViewDuration)}</div>
          <div className="stat-label">Avg. View Time</div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-card">
          <h3>Views by Day</h3>
          <div className="bar-chart">
            {Object.entries(analytics.viewsByDay).map(([date, count]) => (
              <div key={date} className="bar-container">
                <div className="bar-label">{date}</div>
                <div className="bar" style={{ height: `${count * 20}px` }}>
                  <span className="bar-value">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Views by Source</h3>
          <div className="source-chart">
            {Object.entries(analytics.viewsBySource).map(([source, count]) => (
              <div key={source} className="source-item">
                <div className="source-info">
                  <span className="source-icon">{getSourceIcon(source)}</span>
                  <span className="source-name">{source}</span>
                </div>
                <div className="source-bar-container">
                  <div
                    className="source-bar"
                    style={{
                      width: `${(count / analytics.totalViews) * 100}%`
                    }}
                  />
                  <span className="source-count">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recent-views">
        <h3>Recent Profile Views</h3>
        <div className="views-list">
          {filteredViews.map(view => (
            <div key={view.id} className="view-card">
              <div className="viewer-info">
                <img src={view.viewerAvatar} alt={view.viewerName} className="viewer-avatar" />
                <div>
                  <h4>{view.viewerName}</h4>
                  <p className="viewer-title">{view.viewerTitle}</p>
                  {view.viewerCompany && (
                    <p className="viewer-company">{view.viewerCompany}</p>
                  )}
                </div>
              </div>
              <div className="view-details">
                <p>
                  <span className="view-icon">🕒</span>
                  {new Date(view.timestamp).toLocaleString()}
                </p>
                <p>
                  <span className="view-icon">{getSourceIcon(view.source)}</span>
                  {view.source}
                </p>
                <p>
                  <span className="view-icon">⏱️</span>
                  {formatDuration(view.duration)}
                </p>
              </div>
              {view.viewerType === 'company' && (
                <div className="view-actions">
                  <button className="connect-button">Connect</button>
                  <button className="message-button">Message</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 