import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/ScadDashboard.css';

const initialStudents = [
  { id: 1, name: 'John Smith', email: 'john.smith@guc.edu.eg', major: 'Computer Science', status: 'pending' },
  { id: 2, name: 'Emily Brown', email: 'emily.brown@guc.edu.eg', major: 'Finance', status: 'approved' },
  { id: 3, name: 'David Wilson', email: 'david.wilson@guc.edu.eg', major: 'Engineering', status: 'pending' },
  { id: 4, name: 'Sara Lee', email: 'sara.lee@guc.edu.eg', major: 'Pharmacy', status: 'approved' },
];

export default function ManageStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');

  const handleApprove = (id) => {
    setStudents(students => students.map(s => s.id === id ? { ...s, status: 'approved' } : s));
  };
  const handleRemove = (id) => {
    setStudents(students => students.filter(s => s.id !== id));
  };
  const handleEdit = (id) => {
    alert('Edit functionality coming soon!');
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.major.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Manage Students">
      <div className="scad-info-section">
        <h2>Student Management</h2>
        <input
          type="text"
          placeholder="Search by name, email, or major..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: 400 }}
        />
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Major</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.major}</td>
                  <td>
                    <span className={`status ${student.status}`}>{student.status.charAt(0).toUpperCase() + student.status.slice(1)}</span>
                  </td>
                  <td>
                    {student.status === 'pending' && (
                      <button className="approve" onClick={() => handleApprove(student.id)}>Approve</button>
                    )}
                    <button className="edit" onClick={() => handleEdit(student.id)}>Edit</button>
                    <button className="reject" onClick={() => handleRemove(student.id)}>Remove</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center' }}>No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 