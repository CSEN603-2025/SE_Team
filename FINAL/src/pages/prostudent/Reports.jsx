import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaFilePdf, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const initialReports = [
  { id: 1, title: 'Amazon Internship Report', internship: 'Cloud Intern', status: 'Submitted', content: 'Summary of my Amazon internship...' },
  { id: 2, title: 'Google Internship Report', internship: 'AI Intern', status: 'Draft', content: 'Summary of my Google internship...' }
];

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [modal, setModal] = useState(null); // {mode: 'view'|'edit'|'add', report: {...}}
  const [form, setForm] = useState({ title: '', internship: '', content: '' });

  const openAdd = () => {
    setForm({ title: '', internship: '', content: '' });
    setModal({ mode: 'add' });
  };
  const openView = (report) => setModal({ mode: 'view', report });
  const openEdit = (report) => { setForm(report); setModal({ mode: 'edit', report }); };
  const closeModal = () => setModal(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = () => {
    if (modal.mode === 'add') {
      setReports([...reports, { ...form, id: Date.now(), status: 'Draft' }]);
    } else if (modal.mode === 'edit') {
      setReports(reports.map(r => r.id === form.id ? { ...form, status: 'Draft' } : r));
    }
    closeModal();
  };

  const handleDelete = id => {
    setReports(reports.filter(r => r.id !== id));
  };

  const handleDownload = (report) => {
    // Dummy PDF download
    const blob = new Blob([`Title: ${report.title}\nInternship: ${report.internship}\n\n${report.content}`], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout title="Internship Reports">
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 24 }}>Internship Reports</h2>
        <button className="action-button" onClick={openAdd} style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><FaPlus /> Add Report</button>
        <table className="modern-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Internship</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center' }}>No reports yet.</td></tr>
            ) : reports.map(report => (
              <tr key={report.id}>
                <td>{report.title}</td>
                <td>{report.internship}</td>
                <td>{report.status}</td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <button className="action-button" title="View" onClick={() => openView(report)}><FaEye /></button>
                  <button className="action-button" title="Edit" onClick={() => openEdit(report)}><FaEdit /></button>
                  <button className="action-button" title="Delete" style={{ background: '#eee', color: '#333' }} onClick={() => handleDelete(report.id)}><FaTrash /></button>
                  <button className="action-button" title="Download as PDF" style={{ background: '#3A6351', color: '#fff' }} onClick={() => handleDownload(report)}><FaFilePdf /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (modal.mode === 'view' || modal.mode === 'edit' || modal.mode === 'add') && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>{modal.mode === 'add' ? 'Add Report' : modal.mode === 'edit' ? 'Edit Report' : 'View Report'}</h3>
              {modal.mode === 'view' ? (
                <>
                  <div style={{ marginBottom: 12 }}><b>Title:</b> {modal.report.title}</div>
                  <div style={{ marginBottom: 12 }}><b>Internship:</b> {modal.report.internship}</div>
                  <div style={{ marginBottom: 12 }}><b>Status:</b> {modal.report.status}</div>
                  <div style={{ marginBottom: 12 }}><b>Content:</b><br />{modal.report.content}</div>
                  <button className="action-button" onClick={closeModal}>Close</button>
                </>
              ) : (
                <>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Report Title" className="modern-input" style={{ marginBottom: 8 }} />
                  <input name="internship" value={form.internship} onChange={handleChange} placeholder="Internship" className="modern-input" style={{ marginBottom: 8 }} />
                  <textarea name="content" value={form.content} onChange={handleChange} placeholder="Report Content" className="modern-input" style={{ marginBottom: 8 }} />
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <button className="action-button" onClick={handleSave}>Save</button>
                    <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={closeModal}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 