import React, { useState } from 'react';
import { internships } from '../../data/dummyData';

const ExploreInternships = () => {
  const [filters, setFilters] = useState({
    search: '',
    duration: 'all',
    status: 'all'
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.position.toLowerCase().includes(filters.search.toLowerCase()) ||
                         internship.company.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDuration = filters.duration === 'all' || internship.duration.includes(filters.duration);
    const matchesStatus = filters.status === 'all' || internship.status === filters.status;

    return matchesSearch && matchesDuration && matchesStatus;
  });

  return (
    <div className="win98-container">
      <div className="title-bar">
        <div className="title-bar-text">Explore Internships</div>
      </div>
      
      <div className="window-body">
        <div className="filters">
          <div className="filter-group">
            <input
              type="text"
              name="search"
              placeholder="Search internships..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="duration">Duration:</label>
            <select
              id="duration"
              name="duration"
              value={filters.duration}
              onChange={handleFilterChange}
            >
              <option value="all">All Durations</option>
              <option value="3">3 months</option>
              <option value="6">6 months</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="all">All Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="internships-grid">
          {filteredInternships.map(internship => (
            <div key={internship.id} className="internship-card">
              <h3>{internship.position}</h3>
              <p><strong>Company:</strong> {internship.company}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Status:</strong> {internship.status}</p>
              <div className="requirements">
                <strong>Requirements:</strong>
                <ul>
                  {internship.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <p>{internship.description}</p>
              <button
                className="apply-button"
                disabled={internship.status !== 'Open'}
              >
                {internship.status === 'Open' ? 'Apply Now' : 'Closed'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreInternships; 