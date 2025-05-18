import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import '../../styles/Internships.css';

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showAll, setShowAll] = useState('all');

  // Dummy data for demonstration
  const internships = [
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
      company: 'TechSoft',
      role: 'Frontend Intern',
      startDate: '2024-02-01',
      endDate: '',
      status: 'Current Intern'
    }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInternshipSelect = (internship) => {
    setSelectedInternship(internship);
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateRange = (!dateRange.from || internship.startDate >= dateRange.from) &&
                           (!dateRange.to || internship.endDate <= dateRange.to || !internship.endDate);
    const matchesStatus = showAll === 'all' || 
                         (showAll === 'current' && internship.status === 'Current Intern') ||
                         (showAll === 'completed' && internship.status === 'Internship Complete');
    
    return matchesSearch && matchesDateRange && matchesStatus;
  });

  return (
    <DashboardLayout title="My Internships">
      <div className="internships-container">
        {/* Search and Filter Section */}
        <div className="search-section">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search company or role..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="date-filters">
            <div className="date-input">
              <label>From:</label>
              <input
                type="date"
                name="from"
                value={dateRange.from}
                onChange={handleDateChange}
              />
            </div>
            <div className="date-input">
              <label>To:</label>
              <input
                type="date"
                name="to"
                value={dateRange.to}
                onChange={handleDateChange}
              />
            </div>
            <select 
              value={showAll} 
              onChange={(e) => setShowAll(e.target.value)}
              className="status-filter"
            >
              <option value="all">All</option>
              <option value="current">Current</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Internships Table */}
        <div className="internships-table">
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
                  <td>{internship.endDate || 'Present'}</td>
                  <td>
                    <span className={`status-badge ${
                      internship.status === 'Internship Complete' ? 'success' : 'active'
                    }`}>
                      {internship.status === 'Internship Complete' ? (
                        <><FaCheckCircle /> Complete</>
                      ) : (
                        <><FaSpinner className="spinning" /> Current</>
                      )}
                    </span>
                  </td>
                  <td>
                    <button
                      className="select-btn"
                      onClick={() => handleInternshipSelect(internship)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Internship Details */}
        {selectedInternship && (
          <div className="internship-details">
            <h2>Selected Internship Details</h2>
            <div className="details-content">
              <div className="detail-item">
                <label>Company:</label>
                <span>{selectedInternship.company}</span>
              </div>
              <div className="detail-item">
                <label>Role:</label>
                <span>{selectedInternship.role}</span>
              </div>
              <div className="detail-item">
                <label>Dates:</label>
                <span>{selectedInternship.startDate} - {selectedInternship.endDate || 'Present'}</span>
              </div>

              {/* Evaluation Section */}
              <div className="evaluation-section">
                <h3>Evaluation</h3>
                <div className="recommend-checkbox">
                  <input type="checkbox" id="recommend" />
                  <label htmlFor="recommend">Recommend to others</label>
                </div>
                <div className="comment-section">
                  <label>Comments:</label>
                  <textarea rows="4"></textarea>
                </div>
              </div>

              {/* Report Section */}
              <div className="report-section">
                <h3>Report</h3>
                <div className="report-form">
                  <div className="form-group">
                    <label>Title:</label>
                    <input type="text" />
                  </div>
                  <div className="form-group">
                    <label>Introduction:</label>
                    <textarea rows="4"></textarea>
                  </div>
                  <div className="form-group">
                    <label>Body:</label>
                    <textarea rows="6"></textarea>
                  </div>
                </div>
              </div>

              {/* Courses Section */}
              <div className="courses-section">
                <h3>Courses that helped me</h3>
                <div className="courses-list">
                  <div className="course-item">
                    <input type="checkbox" id="csen101" />
                    <label htmlFor="csen101">CSEN101 - Introduction to CS</label>
                  </div>
                  <div className="course-item">
                    <input type="checkbox" id="csen201" />
                    <label htmlFor="csen201">CSEN201 - Data Structures</label>
                  </div>
                  <div className="course-item">
                    <input type="checkbox" id="csen301" />
                    <label htmlFor="csen301">CSEN301 - Database</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Internships; 