import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/ScadDashboard.css';

const initialFaculty = [
  { id: 1, name: 'Dr. Ahmed Hassan', email: 'ahmed.hassan@guc.edu.eg', department: 'Computer Science', assigned: 2 },
  { id: 2, name: 'Dr. Mona Youssef', email: 'mona.youssef@guc.edu.eg', department: 'Finance', assigned: 1 },
  { id: 3, name: 'Dr. Karim Nabil', email: 'karim.nabil@guc.edu.eg', department: 'Engineering', assigned: 0 },
  { id: 4, name: 'Dr. Sara Fathy', email: 'sara.fathy@guc.edu.eg', department: 'Pharmacy', assigned: 3 },
];

export default function FacultyManagement() {
  const [faculty, setFaculty] = useState(initialFaculty);
  const [search, setSearch] = useState('');

  const handleAssign = (id) => {
    setFaculty(faculty => faculty.map(f => f.id === id ? { ...f, assigned: f.assigned + 1 } : f));
  };
  const handleEdit = (id) => {
    alert('Edit faculty info coming soon!');
  };

  const filtered = faculty.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.email.toLowerCase().includes(search.toLowerCase()) ||
    f.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Faculty Management">
      <div className="scad-info-section">
        <h2>Faculty Management</h2>
        <input
          type="text"
          placeholder="Search by name, email, or department..."
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
                <th>Department</th>
                <th>Assigned Internships</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(faculty => (
                <tr key={faculty.id}>
                  <td>{faculty.name}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.department}</td>
                  <td>{faculty.assigned}</td>
                  <td>
                    <button className="approve" onClick={() => handleAssign(faculty.id)}>Assign</button>
                    <button className="edit" onClick={() => handleEdit(faculty.id)}>Edit</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center' }}>No faculty found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 