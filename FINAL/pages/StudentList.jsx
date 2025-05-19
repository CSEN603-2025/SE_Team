// FINAL/pages/faculty/Students.jsx
import React, { useState } from 'react';
import { FaSearch, FaEye } from 'react-icons/fa';

const students = [
  { id: 1, name: 'Sara Adel', major: 'CSEN', email: 'sara@guc.edu.eg', status: 'Active', gpa: 3.8 },
  { id: 2, name: 'Mostafa Kamal', major: 'DSEN', email: 'mostafa@guc.edu.eg', status: 'On Internship', gpa: 3.5 },
  { id: 3, name: 'Lina Gamal', major: 'CSEN', email: 'lina@guc.edu.eg', status: 'Graduated', gpa: 3.9 }
];

export default function StudentList() {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.major.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Student List</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <FaSearch style={{ alignSelf: 'center', color: '#4F8A8B' }} />
        <input
          className="modern-input"
          placeholder="Search by name, major, or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>
      <table className="modern-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Major</th>
            <th>Email</th>
            <th>Status</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center' }}>No students found.</td></tr>
          ) : filtered.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.major}</td>
              <td>{s.email}</td>
              <td>{s.status}</td>
              <td>{s.gpa}</td>
              <td>
                <button className="action-button" title="View Details" onClick={() => setModal(s)}><FaEye /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 400, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
            <h3>{modal.name}</h3>
            <div><b>Major:</b> {modal.major}</div>
            <div><b>Email:</b> {modal.email}</div>
            <div><b>Status:</b> {modal.status}</div>
            <div><b>GPA:</b> {modal.gpa}</div>
            <button className="action-button" onClick={() => setModal(null)} style={{ marginTop: 16 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
