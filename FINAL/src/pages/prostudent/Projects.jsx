import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const initialProjects = [
  { id: 1, title: 'E-commerce Platform', description: 'Built a full-stack e-commerce web app.', status: 'Ongoing', link: '' },
  { id: 2, title: 'Chatbot', description: 'Developed a chatbot for customer support.', status: 'Completed', link: 'https://github.com/janedoe/chatbot' }
];

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [modal, setModal] = useState(null); // {mode: 'add'|'edit', project: {...}}
  const [form, setForm] = useState({ title: '', description: '', status: 'Ongoing', link: '' });

  const openAdd = () => {
    setForm({ title: '', description: '', status: 'Ongoing', link: '' });
    setModal({ mode: 'add' });
  };
  const openEdit = (project) => {
    setForm(project);
    setModal({ mode: 'edit', project });
  };
  const closeModal = () => setModal(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = () => {
    if (modal.mode === 'add') {
      setProjects([...projects, { ...form, id: Date.now() }]);
    } else if (modal.mode === 'edit') {
      setProjects(projects.map(p => p.id === form.id ? form : p));
    }
    closeModal();
  };

  const handleDelete = id => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <DashboardLayout title="Professional Projects">
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Professional Projects</h2>
        <button className="action-button" onClick={openAdd} style={{ marginBottom: 20 }}>Add Project</button>
        <table className="modern-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>No projects yet.</td></tr>
            ) : projects.map(project => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.status}</td>
                <td>{project.link ? <a href={project.link} target="_blank" rel="noopener noreferrer">View</a> : '-'}</td>
                <td>
                  <button className="action-button" onClick={() => openEdit(project)}>Edit</button>
                  <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={() => handleDelete(project.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>{modal.mode === 'add' ? 'Add Project' : 'Edit Project'}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Project Title" className="modern-input" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="modern-input" />
                <select name="status" value={form.status} onChange={handleChange} className="modern-input">
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
                <input name="link" value={form.link} onChange={handleChange} placeholder="Link (optional)" className="modern-input" />
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