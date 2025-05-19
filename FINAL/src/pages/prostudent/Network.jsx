import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const initialConnections = [
  { id: 1, name: 'Ahmed Mostafa', title: 'Software Engineer', company: 'Amazon', status: 'Connected' },
  { id: 2, name: 'Sara Khaled', title: 'Data Scientist', company: 'Google', status: 'Connected' },
  { id: 3, name: 'Omar Fathy', title: 'AI Researcher', company: 'IBM', status: 'Pending' }
];

export default function Network() {
  const [connections, setConnections] = useState(initialConnections);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', title: '', company: '' });

  const filtered = connections.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({ name: '', title: '', company: '' });
    setModal(true);
  };
  const closeModal = () => setModal(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = () => {
    setConnections([...connections, { ...form, id: Date.now(), status: 'Pending' }]);
    closeModal();
  };

  const handleRemove = id => {
    setConnections(connections.filter(c => c.id !== id));
  };

  return (
    <DashboardLayout title="Professional Network">
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Professional Network</h2>
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <input
            placeholder="Search by name, title, or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="modern-input"
            style={{ flex: 1 }}
          />
          <button className="action-button" onClick={openAdd}>Add Connection</button>
        </div>
        <table className="modern-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>No connections found.</td></tr>
            ) : filtered.map(conn => (
              <tr key={conn.id}>
                <td>{conn.name}</td>
                <td>{conn.title}</td>
                <td>{conn.company}</td>
                <td>{conn.status}</td>
                <td>
                  <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={() => handleRemove(conn.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 400, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>Add Connection</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="modern-input" />
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="modern-input" />
                <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="modern-input" />
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <button className="action-button" onClick={handleAdd}>Add</button>
                <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 