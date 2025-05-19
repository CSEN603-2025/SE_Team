import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';

const initialEvents = [
  { id: 1, title: 'Internship Interview', date: '2024-06-10', time: '14:00', description: 'Interview with Amazon for Cloud Intern.' },
  { id: 2, title: 'Workshop: AI in Industry', date: '2024-06-12', time: '10:00', description: 'Attend online workshop.' },
  { id: 3, title: 'Project Deadline', date: '2024-06-15', time: '23:59', description: 'Submit final project report.' }
];

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Schedule() {
  const [events, setEvents] = useState(initialEvents);
  const [modal, setModal] = useState(null); // {mode: 'add'|'view', event: {...}}
  const [form, setForm] = useState({ title: '', date: '', time: '', description: '' });

  const openAdd = () => {
    setForm({ title: '', date: '', time: '', description: '' });
    setModal({ mode: 'add' });
  };
  const openView = (event) => {
    setModal({ mode: 'view', event });
  };
  const closeModal = () => setModal(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = () => {
    setEvents([...events, { ...form, id: Date.now() }]);
    closeModal();
  };

  return (
    <DashboardLayout title="Schedule">
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 24 }}>Schedule</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button className="action-button" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaPlus /> Add Event
          </button>
        </div>
        <table className="modern-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: 40 }}><FaCalendarAlt /></th>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>No events scheduled.</td></tr>
            ) : events.map(event => (
              <tr key={event.id}>
                <td><FaCalendarAlt color="#4F8A8B" /></td>
                <td>{event.title}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.time}</td>
                <td>
                  <button className="action-button" onClick={() => openView(event)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && modal.mode === 'add' && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 400, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>Add Event</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Event Title" className="modern-input" />
                <input name="date" type="date" value={form.date} onChange={handleChange} className="modern-input" />
                <input name="time" type="time" value={form.time} onChange={handleChange} className="modern-input" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="modern-input" />
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <button className="action-button" onClick={handleSave}>Save</button>
                <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {modal && modal.mode === 'view' && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 400, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>{modal.event.title}</h3>
              <div style={{ margin: '12px 0' }}><b>Date:</b> {formatDate(modal.event.date)}</div>
              <div style={{ margin: '12px 0' }}><b>Time:</b> {modal.event.time}</div>
              <div style={{ margin: '12px 0' }}><b>Description:</b> {modal.event.description}</div>
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <button className="action-button" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 