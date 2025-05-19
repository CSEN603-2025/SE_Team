import React, { useState } from 'react';
import DashboardLayout from '../src/components/DashboardLayout';
import { FaSearch } from 'react-icons/fa';
import '../src/styles/Internships.css';

const dummyStudents = [
  { id: 1, name: 'John Smith', major: 'CS', year: '3', gpa: 3.7 },
  { id: 2, name: 'Emily Brown', major: 'Data Science', year: '4', gpa: 3.9 }
];

export default function SearchStudents() {
  const [search, setSearch] = useState('');
  const filtered = dummyStudents.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.major.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardLayout title="Search Students">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <FaSearch size={28} style={{ marginRight: 12, color: '#4F8A8B' }} />
        <h2 style={{ margin: 0 }}>Search Students</h2>
      </div>
      <div className="modern-search-section">
        <input
          type="text"
          placeholder="Search by name or major..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 320, padding: '0.75rem', borderRadius: 6, border: '1px solid #e0e0e0' }}
        />
      </div>
      <div className="internships-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Major</th>
              <th>Year</th>
              <th>GPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.major}</td>
                <td>{student.year}</td>
                <td>{student.gpa}</td>
                <td>
                  <button className="action-btn">View</button>
                  <button className="action-btn">Message</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
} 