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
      <div className="filters-section">
        <div className="search-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Company or role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Show:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="current">Current Intern</option>
            <option value="completed">Internship Complete</option>
          </select>
        </div>

        <div className="date-group">
          <div className="date-input">
            <label>From:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="date-input">
            <label>To:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
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