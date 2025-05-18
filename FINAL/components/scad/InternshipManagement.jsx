import React, { useState, useEffect } from 'react';
import './InternshipManagement.css';

const InternshipManagement = () => {
  const [internships, setInternships] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    industry: 'all',
    duration: 'all',
    isPaid: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    // Load internships from localStorage
    const loadInternships = () => {
      try {
        const storedInternships = JSON.parse(localStorage.getItem('internships')) || [];
        setInternships(storedInternships);
      } catch (error) {
        console.error('Error loading internships:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInternships();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      internship.company.toLowerCase().includes(filters.search.toLowerCase());
    const matchesIndustry = filters.industry === 'all' || internship.industry === filters.industry;
    const matchesDuration = filters.duration === 'all' || internship.duration === filters.duration;
    const matchesPaid = filters.isPaid === 'all' || internship.isPaid.toString() === filters.isPaid;
    
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  const industries = [...new Set(internships.map(internship => internship.industry))];
  const durations = [...new Set(internships.map(internship => internship.duration))];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="internship-management">
      <h2>Internship Listings</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title or company..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="search-input"
        />

        <select
          value={filters.industry}
          onChange={(e) => handleFilterChange('industry', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Industries</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>

        <select
          value={filters.duration}
          onChange={(e) => handleFilterChange('duration', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Durations</option>
          {durations.map(duration => (
            <option key={duration} value={duration}>{duration}</option>
          ))}
        </select>

        <select
          value={filters.isPaid}
          onChange={(e) => handleFilterChange('isPaid', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="true">Paid</option>
          <option value="false">Unpaid</option>
        </select>
      </div>

      <div className="internships-grid">
        {filteredInternships.map(internship => (
          <div 
            key={internship.id} 
            className="internship-card"
            onClick={() => setSelectedInternship(internship)}
          >
            <h3>{internship.title}</h3>
            <p className="company">{internship.company}</p>
            <div className="internship-details">
              <span className="industry">{internship.industry}</span>
              <span className="duration">{internship.duration}</span>
              <span className={`payment ${internship.isPaid ? 'paid' : 'unpaid'}`}>
                {internship.isPaid ? 'Paid' : 'Unpaid'}
              </span>
            </div>
            <p className="description">{internship.description}</p>
            <div className="skills">
              {internship.skills.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedInternship && (
        <div className="internship-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedInternship(null)}>×</button>
            <h2>{selectedInternship.title}</h2>
            <h3>{selectedInternship.company}</h3>
            
            <div className="modal-details">
              <div className="detail-item">
                <span className="label">Industry:</span>
                <span>{selectedInternship.industry}</span>
              </div>
              <div className="detail-item">
                <span className="label">Duration:</span>
                <span>{selectedInternship.duration}</span>
              </div>
              <div className="detail-item">
                <span className="label">Payment:</span>
                <span>{selectedInternship.isPaid ? 
                  `Paid - ${selectedInternship.salary || 'Salary not specified'}` : 
                  'Unpaid'}
                </span>
              </div>
            </div>

            <div className="modal-section">
              <h4>Description</h4>
              <p>{selectedInternship.description}</p>
            </div>

            <div className="modal-section">
              <h4>Required Skills</h4>
              <div className="skills">
                {selectedInternship.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h4>Additional Information</h4>
              <p>{selectedInternship.additionalInfo || 'No additional information provided.'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipManagement; 