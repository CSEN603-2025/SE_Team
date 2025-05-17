import { useState } from 'react'
import './FilterableApplications.css'

const dummyData = [
  { 
    id: 1, 
    student: 'Mina Adel', 
    company: 'Microsoft', 
    status: 'Pending', 
    date: '2024-05-15',
    major: 'Computer Science',
    position: 'Software Engineer Intern'
  },
  { 
    id: 2, 
    student: 'Laila Hassan', 
    company: 'Vodafone', 
    status: 'Approved', 
    date: '2024-05-15',
    major: 'Computer Engineering',
    position: 'Network Engineer Intern'
  },
  { 
    id: 3, 
    student: 'Omar Salah', 
    company: 'Orange', 
    status: 'Rejected', 
    date: '2024-05-15',
    major: 'Computer Science',
    position: 'Backend Developer Intern'
  },
  { 
    id: 4, 
    student: 'Yasmin Tarek', 
    company: 'IBM', 
    status: 'Pending', 
    date: '2024-05-15',
    major: 'Computer Engineering',
    position: 'Data Science Intern'
  }
]

function FilterableApplications() {
  const [filters, setFilters] = useState({
    status: '',
    company: '',
    major: '',
    position: ''
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const filteredApplications = dummyData.filter(app => {
    return (
      (filters.status === '' || app.status === filters.status) &&
      (filters.company === '' || app.company === filters.company) &&
      (filters.major === '' || app.major === filters.major) &&
      (filters.position === '' || app.position.toLowerCase().includes(filters.position.toLowerCase()))
    )
  })

  // Get unique values for dropdowns
  const companies = [...new Set(dummyData.map(app => app.company))]
  const majors = [...new Set(dummyData.map(app => app.major))]
  const positions = [...new Set(dummyData.map(app => app.position))]

  return (
    <div className="filterable-applications">
      <h1>Filter Applications</h1>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="company">Company:</label>
          <select
            id="company"
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="major">Major:</label>
          <select
            id="major"
            name="major"
            value={filters.major}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {majors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="position">Position:</label>
          <select
            id="position"
            name="position"
            value={filters.position}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {positions.map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="applications-list">
        {filteredApplications.map(app => (
          <div key={app.id} className="application-card">
            <div className="card-header">
              <h3>{app.position}</h3>
              <span className={`status-badge ${app.status.toLowerCase()}`}>
                {app.status}
              </span>
            </div>
            <div className="card-body">
              <p><strong>Student:</strong> {app.student}</p>
              <p><strong>Company:</strong> {app.company}</p>
              <p><strong>Major:</strong> {app.major}</p>
              <p><strong>Date:</strong> {app.date}</p>
            </div>
          </div>
        ))}
        {filteredApplications.length === 0 && (
          <div className="no-results">
            No applications match the selected filters
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterableApplications 