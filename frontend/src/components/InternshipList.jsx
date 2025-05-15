// src/components/InternshipList.jsx

import React, { useState, useEffect } from 'react';             // ← added useEffect
import { jsPDF } from 'jspdf';
import internships from '../data/internships.json';
import courses from '../data/courses.json';
import cycle from '../data/cycle.json';                          // ← import your cycle config
import './MyInternships.css';

export default function InternshipList() {
  // ─── Filters & Selection ──────────────────────────────
  const [searchTerm, setSearchTerm]     = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fromDate, setFromDate]         = useState('');
  const [toDate, setToDate]             = useState('');
  const [selected, setSelected]         = useState(null);

  // ─── Evaluation State (Story 43) ─────────────────────
  const [evaluations, setEvaluations]   = useState({});
  const [evalEditing, setEvalEditing]   = useState(false);
  const [evalForm, setEvalForm]         = useState({ recommend: false, comment: '' });

  // ─── Report State (Story 44) ─────────────────────────
  const [reports, setReports]           = useState({});
  const [reportEditing, setReportEditing] = useState(false);
  const [reportForm, setReportForm]     = useState({ title: '', introduction: '', body: '' });

  // ─── Courses Selection State (Story 46) ──────────────
  const [courseSelections, setCourseSelections] = useState({});
  const [coursesEditing, setCoursesEditing]     = useState(false);
  const [coursesForm, setCoursesForm]           = useState([]);

  // ─── Finalization State (Story 47) ─────────────────
  const [finalized, setFinalized] = useState({});

  // ─── Filter Logic ───────────────────────────────────
  const filtered = internships.filter(item => {
    const matchesSearch =
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Current Intern' && item.status === 'Present') ||
      (statusFilter === 'Internship Complete' && item.status === 'Past');

    const start = new Date(item.startDate);
    const end   = item.endDate ? new Date(item.endDate) : new Date();

    const afterFrom = fromDate ? start >= new Date(fromDate) : true;
    const beforeTo  = toDate   ? end   <= new Date(toDate)   : true;

    return matchesSearch && matchesStatus && afterFrom && beforeTo;
  });

  // ─── Handlers ────────────────────────────────────────
  const handleSelect = intern => {
    setSelected(intern);
    // Prefill evaluation form
    const ev = evaluations[intern.id] || {};
    setEvalForm({ recommend: ev.recommend || false, comment: ev.comment || '' });
    setEvalEditing(false);
    // Prefill report form
    const rp = reports[intern.id] || {};
    setReportForm({
      title: rp.title || '',
      introduction: rp.introduction || '',
      body: rp.body || ''
    });
    setReportEditing(false);
    // Prefill courses form
    setCoursesForm(courseSelections[intern.id] || []);
    setCoursesEditing(false);
  };

  // Evaluation CRUD
  const submitEvaluation = e => {
    e.preventDefault();
    setEvaluations(prev => ({ ...prev, [selected.id]: evalForm }));
    setEvalEditing(false);
  };
  const deleteEvaluation = () => {
    setEvaluations(prev => { const c={...prev}; delete c[selected.id]; return c; });
    setEvalForm({ recommend: false, comment: '' });
    setEvalEditing(false);
  };

  // Report CRUD
  const submitReport = e => {
    e.preventDefault();
    setReports(prev => ({ ...prev, [selected.id]: reportForm }));
    setReportEditing(false);
  };
  const deleteReport = () => {
    setReports(prev => { const c={...prev}; delete c[selected.id]; return c; });
    setReportForm({ title: '', introduction: '', body: '' });
    setReportEditing(false);
  };

  // Courses CRUD
  const submitCourses = e => {
    e.preventDefault();
    setCourseSelections(prev => ({ ...prev, [selected.id]: coursesForm }));
    setCoursesEditing(false);
  };
  const deleteCourses = () => {
    setCourseSelections(prev => { const c={...prev}; delete c[selected.id]; return c; });
    setCoursesForm([]);
    setCoursesEditing(false);
  };

  // Download report as real PDF
  const downloadReport = () => {
    const data = reports[selected.id];
    if (!data) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(data.title, 10, 20);

    doc.setFontSize(12);
    doc.text('Introduction:', 10, 30);
    doc.text(doc.splitTextToSize(data.introduction, 180), 10, 40);

    doc.text('Body:', 10, 80);
    doc.text(doc.splitTextToSize(data.body, 180), 10, 90);

    doc.save(`${selected.company}-${selected.id}-report.pdf`);
  };

  // Submit Final Report (Story 47)
  const finalizeReport = () => {
    if (
      !evaluations[selected.id] ||
      !reports[selected.id] ||
      !courseSelections[selected.id]
    ) {
      return alert(
        'Please complete evaluation, report, and course selection before finalizing.'
      );
    }
    setFinalized(prev => ({ ...prev, [selected.id]: true }));
  };

  // ─── NEW: Notification reminder (Story 50) ───────────
  useEffect(() => {
    if (!('Notification' in window)) return;
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') return;

      const now    = new Date();
      const start  = new Date(cycle.startDate);
      const remind = new Date(start.getTime() - cycle.reminderDays * 24 * 60 * 60 * 1000);

      // remind days before
      if (now.toDateString() === remind.toDateString()) {
        new Notification('Internship Cycle Starting Soon', {
          body: `Next cycle begins in ${cycle.reminderDays} day(s) on ${start.toDateString()}.`
        });
      }
      // on the start date
      if (now.toDateString() === start.toDateString()) {
        new Notification('Internship Cycle Begins Today', {
          body: 'The new internship cycle starts today!'
        });
      }
    });
  }, []);

  // ─── Render ──────────────────────────────────────────
 return (
  <div className="dashboard">
    <header className="dashboard-header">
      <h1>My Internships</h1>
    </header>

    <section className="cards">
      {/* turn each of your summary panels into a <div className="card">…</div> */}
    </section>

    {/* then your existing table + details panels underneath… */}

      {/* Filters */}
<div className="filters">
        <label>
          Search:{' '}
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Company or role"
            style={{ padding: 4 }}
          />
        </label>
        <label>
          Show:{' '}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: 4 }}
          >
            <option>All</option>
            <option>Current Intern</option>
            <option>Internship Complete</option>
          </select>
        </label>
        <label>
          From:{' '}
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            style={{ padding: 4 }}
          />
        </label>
        <label>
          To:{' '}
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            style={{ padding: 4 }}
          />
        </label>
      </div>

      {/* Internships Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr>
            {['#','Company','Role','Start Date','End Date','Status','Select'].map(col => (
              <th
                key={col}
                style={{ border: '1px solid #ccc', padding: 8, textAlign: 'left' }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={item.id}>
              <td style={{ border: '1px solid #eee', padding: 8 }}>{item.id}</td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>{item.company}</td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>{item.position}</td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>{item.startDate}</td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>
                {item.endDate || '—'}
              </td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>
                {item.status === 'Present' ? 'Current Intern' : 'Internship Complete'}
              </td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>
                {item.status === 'Past' ? (
                  <button
                    onClick={() => handleSelect(item)}
                    style={{ padding: '4px 8px' }}
                  >
                    Select
                  </button>
                ) : (
                  '—'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Selected Internship Details */}
      {selected && (
        <div style={{ marginTop: 24, padding: 16, border: '1px solid #ccc' }}>
          <h2>Selected Internship Details</h2>
          <p><strong>Company:</strong> {selected.company}</p>
          <p><strong>Role:</strong> {selected.position}</p>
          <p><strong>Dates:</strong> {selected.startDate} – {selected.endDate || 'Present'}</p>

          {/* Evaluation */}
          <h3>Evaluation </h3>
          {evaluations[selected.id] && !evalEditing ? (
            <div>
              <p><strong>Recommend:</strong> {evaluations[selected.id].recommend ? 'Yes' : 'No'}</p>
              <p><strong>Comment:</strong> {evaluations[selected.id].comment}</p>
              <button onClick={() => setEvalEditing(true)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={deleteEvaluation}>Delete</button>
            </div>
          ) : (
            <form onSubmit={submitEvaluation}>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Recommend to others:{' '}
                <input
                  type="checkbox"
                  checked={evalForm.recommend}
                  onChange={e => setEvalForm(f => ({ ...f, recommend: e.target.checked }))}
                />
              </label>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Comment:
                <textarea
                  value={evalForm.comment}
                  onChange={e => setEvalForm(f => ({ ...f, comment: e.target.value }))}
                  rows={3}
                  style={{ width: '100%', padding: 4 }}
                />
              </label>
              <button type="submit" style={{ marginRight: 8 }}>
                {evaluations[selected.id] ? 'Update' : 'Submit'}
              </button>
              {evaluations[selected.id] && (
                <button type="button" onClick={() => setEvalEditing(false)}>Cancel</button>
              )}
            </form>
          )}

          {/* Report */}
          <h3>Report </h3>
          {reports[selected.id] && !reportEditing ? (
            <div>
              <p><strong>Title:</strong> {reports[selected.id].title}</p>
              <p><strong>Introduction:</strong> {reports[selected.id].introduction}</p>
              <p><strong>Body:</strong> {reports[selected.id].body}</p>
              <button onClick={() => setReportEditing(true)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={deleteReport} style={{ marginRight: 8 }}>Delete</button>
              <button onClick={downloadReport}>Download Report as PDF</button>
            </div>
          ) : (
            <form onSubmit={submitReport}>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Title:
                <input
                  type="text"
                  value={reportForm.title}
                  onChange={e => setReportForm(f => ({ ...f, title: e.target.value }))}
                  style={{ width: '100%', padding: 4 }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Introduction:
                <textarea
                  value={reportForm.introduction}
                  onChange={e => setReportForm(f => ({ ...f, introduction: e.target.value }))}
                  rows={2}
                  style={{ width: '100%', padding: 4 }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Body:
                <textarea
                  value={reportForm.body}
                  onChange={e => setReportForm(f => ({ ...f, body: e.target.value }))}
                  rows={4}
                  style={{ width: '100%', padding: 4 }}
                  required
                />
              </label>
              <button type="submit" style={{ marginRight: 8 }}>
                {reports[selected.id] ? 'Update Report' : 'Submit Report'}
              </button>
              {reports[selected.id] && (
                <button type="button" onClick={() => setReportEditing(false)}>Cancel</button>
              )}
            </form>
          )}

          {/* Courses Selection */}
          <h3>Courses that helped me </h3>
          {courseSelections[selected.id] && !coursesEditing ? (
            <div>
              <ul>
                {courseSelections[selected.id].map(id => {
                  const c = courses.find(x => x.id === id);
                  return <li key={id}>{c.code} – {c.name}</li>;
                })}
              </ul>
              <button onClick={() => setCoursesEditing(true)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={deleteCourses}>Delete</button>
            </div>
          ) : (
            <form onSubmit={submitCourses}>
              {courses.map(c => (
                <label key={c.id} style={{ display: 'block', marginBottom: 4 }}>
                  <input
                    type="checkbox"
                    checked={coursesForm.includes(c.id)}
                    onChange={e => {
                      if (e.target.checked) setCoursesForm(prev => [...prev, c.id]);
                      else setCoursesForm(prev => prev.filter(x => x !== c.id));
                    }}
                  />{' '}
                  {c.code} – {c.name}
                </label>
              ))}
              <button type="submit" style={{ marginRight: 8 }}>Save</button>
              {courseSelections[selected.id] && (
                <button type="button" onClick={() => setCoursesEditing(false)}>Cancel</button>
              )}
            </form>
          )}

          {/* Submit Final Report */}
          <div style={{ marginTop: 24 }}>
            {!finalized[selected.id] ? (
              <button onClick={finalizeReport} style={{ padding: '8px 12px' }}>
                Submit Final Report
              </button>
            ) : (
              <div style={{ padding: 12, background: '#f0f0f0' }}>
                <h3>Final Report Submitted</h3>
                <p>No further edits are allowed.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
