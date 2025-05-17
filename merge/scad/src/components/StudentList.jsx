// src/components/StudentList.jsx
import React, { useState } from 'react';
import { initialStudents } from '../data';
import StudentProfile from './StudentProfile';
import './StudentList.css';

export default function StudentList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [majorFilter, setMajorFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Get unique values for filters
  const statuses = Array.from(new Set(initialStudents.map(s => s.internshipStatus)));
  const majors = Array.from(new Set(initialStudents.map(s => s.major)));

  // Filter students based on search term and filters
  const filtered = initialStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || s.internshipStatus === statusFilter;
    const matchesMajor = majorFilter === '' || s.major === majorFilter;
    return matchesSearch && matchesStatus && matchesMajor;
  });

  return (
    <div className="student-list">
      <h2>Student Management</h2>

      <div className="filters" aria-label="Student filters">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search students by name or email"
        />

        <select 
          value={statusFilter} 
          onChange={e => setStatusFilter(e.target.value)}
          className="filter-select"
          aria-label="Filter by internship status"
        >
          <option value="">All Statuses</option>
          {statuses.map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>

        <select 
          value={majorFilter} 
          onChange={e => setMajorFilter(e.target.value)}
          className="filter-select"
          aria-label="Filter by major"
        >
          <option value="">All Majors</option>
          {majors.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {feedback && <div className="feedback" role="status">{feedback}</div>}

      <div className="student-grid-container">
        <div className="student-grid">
          <div className="student-list-header">
            <span>Name</span>
            <span>Email</span>
            <span>Major</span>
            <span>Status</span>
          </div>
          {filtered.map(s => (
            <div
              key={s.id}
              className={`student-item ${selected === s.id ? 'selected' : ''}`}
              tabIndex={0}
              aria-label={`View profile for ${s.name}`}
              onClick={() => {
                setSelected(s.id);
                setFeedback(`Viewing profile for ${s.name}`);
                setTimeout(() => setFeedback(null), 1200);
              }}
              onKeyDown={e => { if (e.key === 'Enter') {
                setSelected(s.id);
                setFeedback(`Viewing profile for ${s.name}`);
                setTimeout(() => setFeedback(null), 1200);
              }}}
            >
              <span>{s.name}</span>
              <span>{s.email}</span>
              <span>{s.major}</span>
              <span className={`status ${s.internshipStatus.toLowerCase()}`}>{s.internshipStatus}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="no-results">
              <div className="empty-icon" aria-hidden="true">🎓</div>
              <div>No students found matching your criteria</div>
            </div>
          )}
        </div>
      </div>

      {selected && (
        <div className="profile-panel" role="region" aria-label="Student profile">
          <button
            className="close-profile"
            aria-label="Close profile panel"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
          <StudentProfile
            student={initialStudents.find(s => s.id === selected)}
            onClose={() => setSelected(null)}
          />
        </div>
      )}
    </div>
  );
}
