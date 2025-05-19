import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/ScadDashboard.css';

const initialTemplates = [
  { id: 1, name: 'Internship Agreement', file: 'agreement.pdf', uploaded: '2024-03-01' },
  { id: 2, name: 'Evaluation Form', file: 'evaluation.docx', uploaded: '2024-03-10' },
  { id: 3, name: 'Report Template', file: 'report-template.docx', uploaded: '2024-03-15' },
];

export default function DocumentTemplates() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !name) return;
    setTemplates(ts => [
      ...ts,
      { id: Date.now(), name, file: file.name, uploaded: new Date().toISOString().slice(0, 10) }
    ]);
    setFile(null);
    setName('');
  };
  const handleDownload = (id) => {
    alert('Download functionality coming soon!');
  };

  return (
    <DashboardLayout title="Document Templates">
      <div className="scad-info-section">
        <h2>Document Templates</h2>
        <form onSubmit={handleUpload} style={{ marginBottom: '1rem', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Template Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ padding: '0.5rem' }}
          />
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            style={{ padding: '0.5rem' }}
          />
          <button className="approve" type="submit">Upload</button>
        </form>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>File</th>
                <th>Uploaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map(t => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.file}</td>
                  <td>{t.uploaded}</td>
                  <td>
                    <button className="edit" onClick={() => handleDownload(t.id)}>Download</button>
                  </td>
                </tr>
              ))}
              {templates.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: 'center' }}>No templates found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 