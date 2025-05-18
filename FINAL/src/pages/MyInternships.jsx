import React, { useState } from 'react';
import '../styles/MyInternships.css';

const MyInternships = () => {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });

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
      company: 'BetaSoft',
      role: 'Frontend Intern',
      startDate: '2025-02-01',
      endDate: '',
      status: 'Current Intern'
    }
  ];

  const handleInternshipSelect = (internship) => {
    setSelectedInternship(internship);
  };

  const courses = [
    'CSEN101 - Introduction to CS',
    'CSEN201 - Data Structures',
    'CSEN301 - Databases'
  ];

  return (
    <div className="internships-container">
      <h2 className="page-title">My Internships</h2>
      
      <div className="search-filters">
        <div className="search-box">
          <label>Search:</label>
          <input 
            type="text" 
            placeholder="Company or role"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="date-filters">
          <label>From:</label>
          <input 
            type="date" 
            value={dateRange.from}
            onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
          />
          
          <label>To:</label>
          <input 
            type="date" 
            value={dateRange.to}
            onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
          />
        </div>
      </div>

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
            {internships.map((internship) => (
              <tr key={internship.id}>
                <td>{internship.id}</td>
                <td>{internship.company}</td>
                <td>{internship.role}</td>
                <td>{internship.startDate}</td>
                <td>{internship.endDate || '—'}</td>
                <td>
                  <span className={`status-badge ${internship.status.toLowerCase().replace(' ', '-')}`}>
                    {internship.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="select-button"
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

      {selectedInternship && (
        <div className="internship-details">
          <h3>Selected Internship Details</h3>
          
          <div className="details-section">
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
          </div>

          <div className="evaluation-section">
            <h4>Evaluation</h4>
            <div className="checkbox-group">
              <input type="checkbox" id="recommend" />
              <label htmlFor="recommend">Recommend to others</label>
            </div>
            <div className="form-group">
              <label>Comment:</label>
              <textarea rows="4"></textarea>
            </div>
          </div>

          <div className="report-section">
            <h4>Report</h4>
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

          <div className="courses-section">
            <h4>Courses that helped me</h4>
            <div className="checkbox-group">
              {courses.map((course, index) => (
                <div key={index}>
                  <input type="checkbox" id={`course-${index}`} />
                  <label htmlFor={`course-${index}`}>{course}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyInternships; 