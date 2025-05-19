import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const initialCerts = [
  { id: 1, name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon', date: '2023-08-15', file: null },
  { id: 2, name: 'Google Data Analytics', issuer: 'Google', date: '2022-12-10', file: null }
];

export default function Certifications() {
  const [certs, setCerts] = useState(initialCerts);
  const [modal, setModal] = useState(null); // {mode: 'add'|'edit', cert: {...}}
  const [form, setForm] = useState({ name: '', issuer: '', date: '', file: null });

  const openAdd = () => {
    setForm({ name: '', issuer: '', date: '', file: null });
    setModal({ mode: 'add' });
  };
  const openEdit = (cert) => {
    setForm(cert);
    setModal({ mode: 'edit', cert });
  };
  const closeModal = () => setModal(null);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSave = () => {
    if (modal.mode === 'add') {
      setCerts([...certs, { ...form, id: Date.now() }]);
    } else if (modal.mode === 'edit') {
      setCerts(certs.map(c => c.id === form.id ? form : c));
    }
    closeModal();
  };

  const handleDelete = id => {
    setCerts(certs.filter(c => c.id !== id));
  };

  return (
    <DashboardLayout title="Certifications">
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Certifications</h2>
        <button className="action-button" onClick={openAdd} style={{ marginBottom: 20 }}>Add Certification</button>
        <table className="modern-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Issuer</th>
              <th>Date</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certs.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>No certifications yet.</td></tr>
            ) : certs.map(cert => (
              <tr key={cert.id}>
                <td>{cert.name}</td>
                <td>{cert.issuer}</td>
                <td>{cert.date}</td>
                <td>{cert.file ? cert.file.name : '-'}</td>
                <td>
                  <button className="action-button" onClick={() => openEdit(cert)}>Edit</button>
                  <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={() => handleDelete(cert.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>{modal.mode === 'add' ? 'Add Certification' : 'Edit Certification'}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Certification Name" className="modern-input" />
                <input name="issuer" value={form.issuer} onChange={handleChange} placeholder="Issuer" className="modern-input" />
                <input name="date" type="date" value={form.date} onChange={handleChange} className="modern-input" />
                <input name="file" type="file" onChange={handleChange} className="modern-input" />
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <button className="action-button" onClick={handleSave}>Save</button>
                <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 