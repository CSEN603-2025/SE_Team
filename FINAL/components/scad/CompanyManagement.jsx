import React, { useState, useEffect } from 'react';
import './CompanyManagement.css';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load companies from localStorage
    const loadCompanies = () => {
      try {
        const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
        setCompanies(storedCompanies);
      } catch (error) {
        console.error('Error loading companies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const handleStatusChange = (companyId, newStatus) => {
    const updatedCompanies = companies.map(company => 
      company.id === companyId ? { ...company, status: newStatus } : company
    );
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const industries = [...new Set(companies.map(company => company.industry))];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="company-management">
      <h2>Company Management</h2>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="industry-filter"
        >
          <option value="all">All Industries</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      <div className="companies-list">
        {filteredCompanies.map(company => (
          <div key={company.id} className="company-card">
            <div className="company-info">
              <h3>{company.name}</h3>
              <p className="industry">{company.industry}</p>
              <p className="description">{company.description}</p>
            </div>
            
            <div className="company-actions">
              <button
                className="view-details"
                onClick={() => window.location.href = `/company/${company.id}`}
              >
                View Details
              </button>
              
              {company.status === 'pending' && (
                <div className="approval-buttons">
                  <button
                    className="approve"
                    onClick={() => handleStatusChange(company.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() => handleStatusChange(company.id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              )}
              
              <span className={`status ${company.status}`}>
                {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyManagement; 