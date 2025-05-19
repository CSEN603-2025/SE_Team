import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/ScadDashboard.css';

const mockResults = [
  { id: 1, type: 'Student', name: 'John Smith', info: 'Computer Science' },
  { id: 2, type: 'Company', name: 'Tech Innovators', info: 'Software' },
  { id: 3, type: 'Internship', name: 'Frontend Intern', info: 'Tech Innovators' },
  { id: 4, type: 'Faculty', name: 'Dr. Ahmed Hassan', info: 'Computer Science' },
];

export default function AdvancedSearch() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');

  const filtered = mockResults.filter(r =>
    (type === 'all' || r.type === type) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.info.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout title="Advanced Search">
      <div className="scad-info-section">
        <h2>Advanced Search</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Search by name or info..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '0.5rem', width: 300 }}
          />
          <select value={type} onChange={e => setType(e.target.value)} style={{ padding: '0.5rem' }}>
            <option value="all">All Types</option>
            <option value="Student">Student</option>
            <option value="Company">Company</option>
            <option value="Internship">Internship</option>
            <option value="Faculty">Faculty</option>
          </select>
        </div>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.type}</td>
                  <td>{r.name}</td>
                  <td>{r.info}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={3} style={{ textAlign: 'center' }}>No results found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 