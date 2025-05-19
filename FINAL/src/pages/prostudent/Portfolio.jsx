import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const initialPortfolio = [
  {
    id: 1,
    title: 'Personal Website',
    description: 'A React-based personal website and blog.',
    link: 'https://janedoe.dev',
    file: null
  },
  {
    id: 2,
    title: 'AI Chatbot',
    description: 'A chatbot using NLP and machine learning.',
    link: '',
    file: null
  }
];

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [modal, setModal] = useState(null); // {mode: 'add'|'edit', item: {...}}
  const [form, setForm] = useState({ title: '', description: '', link: '', file: null });

  const openAdd = () => {
    setForm({ title: '', description: '', link: '', file: null });
    setModal({ mode: 'add' });
  };
  const openEdit = (item) => {
    setForm(item);
    setModal({ mode: 'edit', item });
  };
  const closeModal = () => setModal(null);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSave = () => {
    if (modal.mode === 'add') {
      setPortfolio([...portfolio, { ...form, id: Date.now() }]);
    } else if (modal.mode === 'edit') {
      setPortfolio(portfolio.map(p => p.id === form.id ? form : p));
    }
    closeModal();
  };

  const handleDelete = id => {
    setPortfolio(portfolio.filter(p => p.id !== id));
  };

  return (
    <DashboardLayout title="Portfolio">
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Portfolio</h2>
        <button className="action-button" onClick={openAdd} style={{ marginBottom: 20 }}>Add Portfolio Item</button>
        <table className="modern-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Link</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>No portfolio items yet.</td></tr>
            ) : portfolio.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer">Visit</a> : '-'}</td>
                <td>{item.file ? item.file.name : '-'}</td>
                <td>
                  <button className="action-button" onClick={() => openEdit(item)}>Edit</button>
                  <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>{modal.mode === 'add' ? 'Add Portfolio Item' : 'Edit Portfolio Item'}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="modern-input" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="modern-input" />
                <input name="link" value={form.link} onChange={handleChange} placeholder="Link (optional)" className="modern-input" />
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