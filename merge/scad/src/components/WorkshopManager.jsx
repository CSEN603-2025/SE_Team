import React, { useState } from 'react';
import './WorkshopManager.css';

function getInitialWorkshops() {
  return [
    {
      id: 1,
      name: 'Resume Building 101',
      description: 'Learn how to craft a professional resume.',
      startDateTime: '2024-07-01T10:00',
      endDateTime: '2024-07-01T12:00',
      speakerBio: 'Jane Doe, Career Coach',
      agenda: 'Introduction, Resume Tips, Q&A'
    },
    {
      id: 2,
      name: 'Ace Your Interview',
      description: 'Interview strategies and mock interviews.',
      startDateTime: '2024-07-10T14:00',
      endDateTime: '2024-07-10T16:00',
      speakerBio: 'John Smith, HR Specialist',
      agenda: 'Interview Types, Practice, Feedback'
    }
  ];
}

export default function WorkshopManager() {
  const [workshops, setWorkshops] = useState(getInitialWorkshops());
  const [editing, setEditing] = useState(null); // id or null
  const [form, setForm] = useState({
    name: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    speakerBio: '',
    agenda: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [filterUpcoming, setFilterUpcoming] = useState(true);
  const [feedback, setFeedback] = useState(null);

  const resetForm = () => setForm({ name: '', description: '', startDateTime: '', endDateTime: '', speakerBio: '', agenda: '' });

  const handleEdit = (workshop) => {
    setEditing(workshop.id);
    setForm({ ...workshop });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setWorkshops(ws => ws.filter(w => w.id !== id));
    setFeedback('Workshop deleted');
    setTimeout(() => setFeedback(null), 1200);
    if (editing === id) {
      setEditing(null);
      resetForm();
      setShowForm(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setWorkshops(ws => ws.map(w => w.id === editing ? { ...form, id: editing } : w));
      setFeedback('Workshop updated');
    } else {
      setWorkshops(ws => [
        ...ws,
        { ...form, id: Date.now() }
      ]);
      setFeedback('Workshop created');
    }
    setEditing(null);
    resetForm();
    setShowForm(false);
    setTimeout(() => setFeedback(null), 1200);
  };

  const now = new Date();
  const filteredWorkshops = filterUpcoming
    ? workshops.filter(w => new Date(w.startDateTime) > now)
    : workshops;

  return (
    <section className="workshop-manager" aria-labelledby="workshops-heading">
      <h2 id="workshops-heading">Online Career Workshops</h2>
      <div className="workshop-actions-row">
        <button className="add-btn" onClick={() => { setShowForm(true); setEditing(null); resetForm(); }} aria-label="Add new workshop">
          + Add Workshop
        </button>
        <label className="filter-label">
          <input
            type="checkbox"
            checked={filterUpcoming}
            onChange={e => setFilterUpcoming(e.target.checked)}
            aria-checked={filterUpcoming}
            aria-label="Show only upcoming workshops"
          />{' '}
          Show only upcoming
        </label>
      </div>
      {feedback && <div className="feedback-message" role="status">{feedback}</div>}
      {showForm && (
        <form className="workshop-form" onSubmit={handleSubmit} role="form" aria-label={editing ? 'Edit workshop' : 'Create workshop'}>
          <div className="form-row">
            <label htmlFor="workshop-name">Workshop Name:</label>
            <input id="workshop-name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="form-row">
            <label htmlFor="workshop-desc">Short Description:</label>
            <input id="workshop-desc" required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="form-row">
            <label htmlFor="workshop-start">Start Date & Time:</label>
            <input id="workshop-start" required type="datetime-local" value={form.startDateTime} onChange={e => setForm(f => ({ ...f, startDateTime: e.target.value }))} />
          </div>
          <div className="form-row">
            <label htmlFor="workshop-end">End Date & Time:</label>
            <input id="workshop-end" required type="datetime-local" value={form.endDateTime} onChange={e => setForm(f => ({ ...f, endDateTime: e.target.value }))} />
          </div>
          <div className="form-row">
            <label htmlFor="workshop-speaker">Speaker Bio:</label>
            <input id="workshop-speaker" required value={form.speakerBio} onChange={e => setForm(f => ({ ...f, speakerBio: e.target.value }))} />
          </div>
          <div className="form-row">
            <label htmlFor="workshop-agenda">Workshop Agenda:</label>
            <textarea id="workshop-agenda" required value={form.agenda} onChange={e => setForm(f => ({ ...f, agenda: e.target.value }))} />
          </div>
          <div className="form-actions">
            <button className="submit-btn" type="submit">{editing ? 'Update' : 'Create'} Workshop</button>
            <button className="cancel-btn" type="button" onClick={() => { setShowForm(false); setEditing(null); resetForm(); }}>Cancel</button>
          </div>
        </form>
      )}
      <h3 className="workshops-list-title">All Workshops</h3>
      <ul className="workshops-list" role="list">
        {filteredWorkshops.length === 0 && (
          <li className="empty-state" role="status">
            <div className="empty-icon" aria-hidden="true">📭</div>
            <div>No workshops found. {filterUpcoming ? 'Try showing all workshops.' : 'Click "Add Workshop" to create one.'}</div>
          </li>
        )}
        {filteredWorkshops.map(w => (
          <li key={w.id} className="workshop-card" tabIndex={0} aria-label={`Workshop: ${w.name}`}>
            <div className="workshop-card-main">
              <div className="workshop-info">
                <div className="workshop-title-row">
                  <strong className="workshop-title">{w.name}</strong>
                  <span className="workshop-dates">{new Date(w.startDateTime).toLocaleString()} - {new Date(w.endDateTime).toLocaleString()}</span>
                </div>
                <div className="workshop-desc">{w.description}</div>
                <div className="workshop-meta"><b>Speaker:</b> {w.speakerBio}</div>
                <div className="workshop-meta"><b>Agenda:</b> {w.agenda}</div>
              </div>
              <div className="workshop-actions" role="group" aria-label="Workshop actions">
                <button className="edit-btn" onClick={() => handleEdit(w)} aria-label={`Edit ${w.name}`}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(w.id)} aria-label={`Delete ${w.name}`}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
} 