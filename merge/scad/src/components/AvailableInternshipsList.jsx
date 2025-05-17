import React, { useState } from 'react';
import { initialInternships } from '../data';
import './AvailableInternshipsList.css';

export default function AvailableInternshipsList() {
  const [query, setQuery]                 = useState('');
  const [industryFilter, setIndustry]     = useState('');
  const [durationFilter, setDuration]     = useState('');
  const [paidFilter, setPaid]             = useState('');
  const [selected, setSelected]           = useState(null);

  // derive dropdown options
  const industries = Array.from(new Set(initialInternships.map(i => i.industry)));
  const durations  = Array.from(new Set(initialInternships.map(i => i.duration)));
  const paidOptions = ['All', 'Paid', 'Unpaid'];

  // filter logic
  const filtered = initialInternships.filter(i => {
    if (query && !(
      i.company.toLowerCase().includes(query.toLowerCase()) ||
      i.title.toLowerCase().includes(query.toLowerCase())
    )) return false;
    if (industryFilter && i.industry !== industryFilter) return false;
    if (durationFilter && i.duration !== durationFilter) return false;
    if (paidFilter === 'Paid' && !i.paid) return false;
    if (paidFilter === 'Unpaid' && i.paid) return false;
    return true;
  });

  return (
    <div className="internships-list">
      <h2>Available Internships</h2>
      <div className="filters" aria-label="Internship filters">
        <input
          className="search-box"
          type="text"
          placeholder="Search by company or job title…"
          value={query}
          aria-label="Search internships by company or job title"
          onChange={e => setQuery(e.target.value)}
        />
        <select
          value={industryFilter}
          aria-label="Filter by industry"
          onChange={e => setIndustry(e.target.value)}
        >
          <option value="">All Industries</option>
          {industries.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
        <select
          value={durationFilter}
          aria-label="Filter by duration"
          onChange={e => setDuration(e.target.value)}
        >
          <option value="">All Durations</option>
          {durations.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={paidFilter}
          aria-label="Filter by paid status"
          onChange={e => setPaid(e.target.value)}
        >
          {paidOptions.map(opt => (
            <option key={opt} value={opt === 'All' ? '' : opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="internships-table-container">
        <table className="internships-table" aria-label="Available internships">
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Duration</th>
              <th>Paid?</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(i => (
                <tr
                  key={i.id}
                  className={selected?.id === i.id ? 'selected' : ''}
                  tabIndex={0}
                  aria-label={`View details for ${i.title} at ${i.company}`}
                  onClick={() => setSelected(i)}
                  onKeyDown={e => { if (e.key === 'Enter') setSelected(i); }}
                >
                  <td>{i.company}</td>
                  <td>{i.title}</td>
                  <td>{i.duration}</td>
                  <td>
                    <span className={`paid-badge ${i.paid ? 'paid' : 'unpaid'}`}>{i.paid ? 'Yes' : 'No'}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results">
                  <div className="empty-icon" aria-hidden="true">💼</div>
                  <div>No internships match your search or filters.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selected && (
        <div className="details-panel" role="region" aria-label="Internship details">
          <button
            className="close-details"
            aria-label="Close details panel"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
          <h3>{selected.title} @ {selected.company}</h3>
          <p><strong>Industry:</strong> {selected.industry}</p>
          <p><strong>Duration:</strong> {selected.duration}</p>
          <p><strong>Paid:</strong> <span className={`paid-badge ${selected.paid ? 'paid' : 'unpaid'}`}>{selected.paid ? 'Yes' : 'No'}</span></p>
          {selected.paid && <p><strong>Salary:</strong> {selected.salary}</p>}
          <p><strong>Skills Required:</strong> {selected.skills.join(', ')}</p>
          <p>{selected.description}</p>
        </div>
      )}
    </div>
  );
}
