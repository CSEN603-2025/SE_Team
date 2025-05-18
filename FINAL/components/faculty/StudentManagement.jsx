import React, { useState, useEffect } from 'react';
import './StudentManagement.css';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    major: 'all',
    internshipStatus: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // Load students from localStorage
    const loadStudents = () => {
      try {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        setStudents(storedStudents);
      } catch (error) {
        console.error('Error loading students:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStudentUpdate = (studentId, updates) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          ...updates,
          lastModified: new Date().toISOString()
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.id.toLowerCase().includes(filters.search.toLowerCase());
    const matchesMajor = filters.major === 'all' || student.major === filters.major;
    const matchesStatus = filters.internshipStatus === 'all' || student.internshipStatus === filters.internshipStatus;
    
    return matchesSearch && matchesMajor && matchesStatus;
  });

  const majors = [...new Set(students.map(student => student.major))];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="student-management">
      <h2>Student Management</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by student name or ID..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="search-input"
        />

        <select
          value={filters.major}
          onChange={(e) => handleFilterChange('major', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Majors</option>
          {majors.map(major => (
            <option key={major} value={major}>{major}</option>
          ))}
        </select>

        <select
          value={filters.internshipStatus}
          onChange={(e) => handleFilterChange('internshipStatus', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="not_started">Not Started</option>
          <option value="searching">Searching</option>
          <option value="applied">Applied</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="students-grid">
        {filteredStudents.map(student => (
          <div 
            key={student.id} 
            className="student-card"
            onClick={() => setSelectedStudent(student)}
          >
            <div className="student-header">
              <h3>{student.name}</h3>
              <span className={`status ${student.internshipStatus}`}>
                {student.internshipStatus.replace('_', ' ')}
              </span>
            </div>

            <div className="student-details">
              <p><strong>Student ID:</strong> {student.id}</p>
              <p><strong>Major:</strong> {student.major}</p>
              <p><strong>Year:</strong> {student.year}</p>
              {student.company && (
                <p><strong>Company:</strong> {student.company}</p>
              )}
            </div>

            <div className="student-progress">
              <div className="progress-item">
                <span>Reports Submitted</span>
                <span className="count">{student.reportsSubmitted || 0}</span>
              </div>
              <div className="progress-item">
                <span>Evaluations</span>
                <span className="count">{student.evaluationsCompleted || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedStudent && (
        <div className="student-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedStudent(null)}>×</button>
            
            <h2>Student Details</h2>
            <div className="student-info">
              <div className="info-section">
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> {selectedStudent.name}</p>
                <p><strong>ID:</strong> {selectedStudent.id}</p>
                <p><strong>Major:</strong> {selectedStudent.major}</p>
                <p><strong>Year:</strong> {selectedStudent.year}</p>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
              </div>

              <div className="info-section">
                <h3>Internship Status</h3>
                <select
                  value={selectedStudent.internshipStatus}
                  onChange={(e) => handleStudentUpdate(selectedStudent.id, {
                    internshipStatus: e.target.value
                  })}
                  className="status-select"
                >
                  <option value="not_started">Not Started</option>
                  <option value="searching">Searching</option>
                  <option value="applied">Applied</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {selectedStudent.internshipStatus === 'active' && (
                <div className="info-section">
                  <h3>Current Internship</h3>
                  <div className="internship-details">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={selectedStudent.company || ''}
                      onChange={(e) => handleStudentUpdate(selectedStudent.id, {
                        company: e.target.value
                      })}
                      className="detail-input"
                    />
                    <input
                      type="text"
                      placeholder="Position"
                      value={selectedStudent.position || ''}
                      onChange={(e) => handleStudentUpdate(selectedStudent.id, {
                        position: e.target.value
                      })}
                      className="detail-input"
                    />
                    <input
                      type="text"
                      placeholder="Supervisor"
                      value={selectedStudent.supervisor || ''}
                      onChange={(e) => handleStudentUpdate(selectedStudent.id, {
                        supervisor: e.target.value
                      })}
                      className="detail-input"
                    />
                  </div>
                </div>
              )}

              <div className="info-section">
                <h3>Progress</h3>
                <div className="progress-grid">
                  <div className="progress-stat">
                    <span>Reports Submitted</span>
                    <span className="stat-value">{selectedStudent.reportsSubmitted || 0}</span>
                  </div>
                  <div className="progress-stat">
                    <span>Evaluations Completed</span>
                    <span className="stat-value">{selectedStudent.evaluationsCompleted || 0}</span>
                  </div>
                  <div className="progress-stat">
                    <span>Average Rating</span>
                    <span className="stat-value">
                      {selectedStudent.averageRating?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Notes</h3>
                <textarea
                  value={selectedStudent.notes || ''}
                  onChange={(e) => handleStudentUpdate(selectedStudent.id, {
                    notes: e.target.value
                  })}
                  placeholder="Add notes about the student..."
                  className="notes-input"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement; 