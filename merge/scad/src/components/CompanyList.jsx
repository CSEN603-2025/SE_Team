import React, { useState } from 'react';
import CompanyDetails from './CompanyDetails';
import './CompanyList.css';

export default function CompanyList({ companies, onAccept, onReject }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // id of company being acted on

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (industryFilter === '' || c.industry === industryFilter)
  );

  // Show details panel if selected
  if (selectedId !== null) {
    const company = companies.find(c => c.id === selectedId);
    return (
      <CompanyDetails
        company={company}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  // Confirm before rejecting
  const handleReject = (id) => {
    if (window.confirm('Are you sure you want to reject this company?')) {
      setActionLoading(id);
      setTimeout(() => {
        onReject(id);
        setFeedback('Company rejected.');
        setActionLoading(null);
        setTimeout(() => setFeedback(null), 2000);
      }, 500);
    }
  };

  // Accept with feedback
  const handleAccept = (id) => {
    setActionLoading(id);
    setTimeout(() => {
      onAccept(id);
      setFeedback('Company accepted!');
      setActionLoading(null);
      setTimeout(() => setFeedback(null), 2000);
    }, 500);
  };

  return (
    <div className="company-list">
      <h2>Companies Applying</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name…"
          value={searchTerm}
          aria-label="Search companies by name"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          value={industryFilter}
          aria-label="Filter by industry"
          onChange={e => setIndustryFilter(e.target.value)}
        >
          <option value="">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Education">Education</option>
        </select>
      </div>
      {feedback && <div className="feedback" role="status">{feedback}</div>}
      <ul>
        {filtered.map(c => (
          <li key={c.id} className="company-item">
            <div className="info-group">
              <div className="company-main">
                <strong className="company-name">{c.name}</strong> <span className="company-industry">({c.industry})</span>
              </div>
              <div className={`status-badge status-${c.status.toLowerCase()}`}>{c.status}</div>
            </div>
            <div className="actions-group">
              <button
                className="view-btn"
                aria-label={`View details for ${c.name}`}
                onClick={() => setSelectedId(c.id)}
              >
                View Details
              </button>
              <button
                className="accept-btn"
                aria-label={`Accept ${c.name}`}
                disabled={c.status === 'Accepted' || actionLoading === c.id}
                onClick={() => handleAccept(c.id)}
                tabIndex={0}
              >
                {actionLoading === c.id && c.status !== 'Accepted' ? 'Accepting…' : 'Accept'}
              </button>
              <button
                className="reject-btn"
                aria-label={`Reject ${c.name}`}
                disabled={c.status === 'Rejected' || actionLoading === c.id}
                onClick={() => handleReject(c.id)}
                tabIndex={0}
              >
                {actionLoading === c.id && c.status !== 'Rejected' ? 'Rejecting…' : 'Reject'}
              </button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="empty-state">
            <div className="empty-icon" aria-hidden="true">🏢</div>
            <div>No companies found. Try adjusting your search or filters.</div>
          </li>
        )}
      </ul>
    </div>
  );
}
