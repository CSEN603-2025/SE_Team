import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyInternships.css';

const MyInternships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    // Load internships data
    const loadedInternships = [
      {
        id: 1,
        company: 'Acme Corp',
        role: 'Software Engineering Intern',
        startDate: '2024-01-15',
        endDate: '2024-04-15',
        status: 'Internship Complete'
      },
      {
        id: 2,
        company: 'BetaSoft',
        role: 'Frontend Intern',
        startDate: '2025-02-01',
        endDate: null,
        status: 'Current Intern'
      }
    ];
    setInternships(loadedInternships);
  }, []);

  // Filter internships based on search and filters
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = 
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'current' && internship.status === 'Current Intern') ||
      (statusFilter === 'completed' && internship.status === 'Internship Complete');

    const matchesDate = (!startDate || new Date(internship.startDate) >= new Date(startDate)) &&
                       (!endDate || !internship.endDate || new Date(internship.endDate) <= new Date(endDate));

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="page-container">
      <h1>My Internships</h1>

      {/* Search and Filter Section */}
      <div className="filters-section modern-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{ fontWeight: 600, fontSize: 18, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fas fa-filter" style={{ color: '#00b894' }}></i> Filter Internships
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          <div className="search-group" style={{ flex: 1, minWidth: 220 }}>
            <label><i className="fas fa-search" style={{ marginRight: 6, color: '#4F8A8B' }}></i>Search</label>
            <input
              type="text"
              placeholder="Company or role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group" style={{ flex: 1, minWidth: 180 }}>
            <label><i className="fas fa-list" style={{ marginRight: 6, color: '#F9B208' }}></i>Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="current">Current Intern</option>
              <option value="completed">Internship Complete</option>
            </select>
          </div>
          <div className="date-group" style={{ flex: 2, minWidth: 260, display: 'flex', gap: 12 }}>
            <div className="date-input">
              <label><i className="fas fa-calendar-alt" style={{ marginRight: 6, color: '#1976D2' }}></i>From</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="date-input">
              <label><i className="fas fa-calendar-check" style={{ marginRight: 6, color: '#1976D2' }}></i>To</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
          <button
            className="btn small"
            style={{ background: '#e9ecef', color: '#495057', border: 'none' }}
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setStartDate('');
              setEndDate('');
            }}
          >
            <i className="fas fa-undo" style={{ marginRight: 6 }}></i>Reset
          </button>
          <button
            className="btn small"
            style={{ background: '#00b894', color: 'white', border: 'none' }}
            onClick={() => {}}
          >
            <i className="fas fa-check" style={{ marginRight: 6 }}></i>Apply
          </button>
        </div>
      </div>

      {/* Internships Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Role</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredInternships.map((internship, index) => (
              <tr key={internship.id}>
                <td>{index + 1}</td>
                <td>{internship.company}</td>
                <td>{internship.role}</td>
                <td>{internship.startDate}</td>
                <td>{internship.endDate || '—'}</td>
                <td>
                  <span className={`status-badge ${internship.status === 'Current Intern' ? 'current' : 'completed'}`}>
                    {internship.status}
                  </span>
                </td>
                <td>
                  {internship.status === 'Internship Complete' ? (
                    <Link to={`/internship/${internship.id}`} className="btn primary small">
                      Select
                    </Link>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredInternships.length === 0 && (
        <div className="no-data">
          No internships found matching your criteria
        </div>
      )}
    </div>
  );
};

export default MyInternships; 