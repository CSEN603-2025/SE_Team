import React, { useState } from 'react';
import DashboardLayout from '../src/components/DashboardLayout';
import { FaBriefcase } from 'react-icons/fa';
import '../src/styles/Internships.css';

export default function PostInternship() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    duration: '',
    requirements: '',
    status: 'Open'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Internship posted!');
    setForm({ title: '', description: '', duration: '', requirements: '', status: 'Open' });
  };

  return (
    <DashboardLayout title="Post Internship">
      <div className="report-section">
        <div className="report-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FaBriefcase size={28} style={{ color: '#4F8A8B' }} />
            <h2 style={{ margin: 0 }}>Post New Internship</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} required />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input type="text" name="duration" value={form.duration} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Requirements</label>
            <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={3} />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">Post Internship</button>
        </form>
      </div>
    </DashboardLayout>
  );
} 