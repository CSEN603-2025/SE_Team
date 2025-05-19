import React, { useState } from 'react';
import { internships } from '../../data/dummyData';
import DashboardLayout from '../../components/DashboardLayout';
import { FaSearch, FaBuilding, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../../styles/Internships.css';

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
    <DashboardLayout title="Explore Internships">
      <div className="modern-search-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            name="search"
            placeholder="Search internships..."
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-bar">
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
      </div>
      <div className="internships-grid-modern">
        {filteredInternships.length === 0 ? (
          <div className="empty-state">No internships found.</div>
        ) : (
          filteredInternships.map(internship => (
            <div key={internship.id} className="internship-card-modern">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FaBuilding style={{ color: '#4F8A8B' }} /> {internship.position}
              </h3>
              <p><strong>Company:</strong> {internship.company}</p>
              <p><FaClock style={{ color: '#F9B208', marginRight: 4 }} /><strong> Duration:</strong> {internship.duration}</p>
              <p>
                <strong>Status:</strong> {internship.status === 'Open' ? (
                  <span className="status-badge current"><FaCheckCircle style={{ color: '#4F8A8B' }} /> Open</span>
                ) : (
                  <span className="status-badge completed"><FaTimesCircle style={{ color: '#F76E11' }} /> Closed</span>
                )}
              </p>
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
                className="apply-button-modern"
                disabled={internship.status !== 'Open'}
              >
                {internship.status === 'Open' ? 'Apply Now' : 'Closed'}
              </button>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default ExploreInternships; 